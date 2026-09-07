import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads/knowledge
    const uploadDir = path.join(process.cwd(), "public", "uploads", "knowledge");
    
    // Ensure dir exists
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const safeFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadDir, safeFilename);

    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/knowledge/${safeFilename}`;

    // Add to database
    const doc = await prisma.knowledgeDocument.create({
      data: {
        filename: file.name,
        fileUrl: fileUrl,
        status: "PROCESSED", // Mocking the parsing status
      }
    });

    return NextResponse.json({ success: true, document: doc });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const docs = await prisma.knowledgeDocument.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch docs" }, { status: 500 });
  }
}
