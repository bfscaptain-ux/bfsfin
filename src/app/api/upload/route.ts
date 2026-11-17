import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get("file");
    if (!file) {
      return NextResponse.json({ error: "File parameter required" }, { status: 400, headers: corsHeaders });
    }

    const safeFile = path.basename(file);
    const folder = searchParams.get("folder") || "uploads/news";
    
    // Check multiple candidate locations on disk
    const candidates = [
      path.join(process.cwd(), "public", folder, safeFile),
      path.join(process.cwd(), "public", "uploads", safeFile),
      path.join(process.cwd(), "public", "news", safeFile),
      path.join(process.cwd(), "public", safeFile),
    ];

    let foundPath = null;
    for (const c of candidates) {
      if (existsSync(c)) {
        foundPath = c;
        break;
      }
    }

    if (!foundPath) {
      return NextResponse.json({ error: "Image not found on disk" }, { status: 404, headers: corsHeaders });
    }

    const buffer = await readFile(foundPath);
    const ext = path.extname(safeFile).toLowerCase();
    const mimeMap: Record<string, string> = {
      ".webp": "image/webp",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".gif": "image/gif",
    };
    const contentType = mimeMap[ext] || "application/octet-stream";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        ...corsHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read image" }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400, headers: corsHeaders });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_.-]/g, "_");
    const filename = `${Date.now()}-${safeName}`;
    const folder = (formData.get("folder") as string) || "uploads/news";

    const uploadDir = path.join(process.cwd(), "public", folder);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return direct static path AND dynamic API streaming path
    const fileUrl = `/${folder}/${filename}`;
    const streamUrl = `/api/upload?file=${filename}&folder=${folder}`;

    return NextResponse.json(
      {
        success: true,
        url: fileUrl,
        streamUrl: streamUrl,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500, headers: corsHeaders });
  }
}
