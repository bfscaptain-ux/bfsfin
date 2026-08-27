import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "bank-logos");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = file.name.split(".").pop() || "png";
    const fileName = `logo-${Date.now()}.${ext}`;
    const filePath = path.join(uploadsDir, fileName);
    
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const logoUrl = `/uploads/bank-logos/${fileName}`;

    return NextResponse.json({ url: logoUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to upload logo" }, { status: 500 });
  }
}
