import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { existsSync, unlinkSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const images = await prisma.heroImage.findMany();
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { pageId, imageUrl } = await req.json();
    
    // Check if an existing image exists and if it's a local upload
    const existing = await prisma.heroImage.findUnique({ where: { pageId } });
    
    if (existing && existing.imageUrl !== imageUrl && existing.imageUrl.startsWith("/uploads/")) {
      // Delete the old file from the file system
      const filePath = path.join(process.cwd(), "public", existing.imageUrl);
      if (existsSync(filePath)) {
        try {
          unlinkSync(filePath);
          console.log(`Deleted old image: ${filePath}`);
        } catch (e) {
          console.error("Failed to delete old image:", e);
        }
      }
    }

    const image = await prisma.heroImage.upsert({
      where: { pageId },
      update: { imageUrl },
      create: { pageId, imageUrl }
    });
    
    return NextResponse.json(image, { status: 200 });
  } catch (error) {
    console.error("Hero Image POST error:", error);
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 });
  }
}
