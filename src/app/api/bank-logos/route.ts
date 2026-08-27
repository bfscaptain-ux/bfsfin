import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

// GET all bank logos
export async function GET() {
  try {
    const logos = await prisma.bankLogo.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(logos);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch logos" }, { status: 500 });
  }
}

// POST - create a new bank logo (expects FormData with bankName + file)
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const bankName = formData.get("bankName") as string;
    const file = formData.get("file") as File;
    const sortOrder = parseInt(formData.get("sortOrder") as string || "0");

    if (!bankName || !file) {
      return NextResponse.json({ error: "Bank name and logo file required" }, { status: 400 });
    }

    // Save file to public/uploads/bank-logos/
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "bank-logos");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = file.name.split(".").pop() || "png";
    const fileName = `${bankName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}.${ext}`;
    const filePath = path.join(uploadsDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const logoUrl = `/uploads/bank-logos/${fileName}`;

    const logo = await prisma.bankLogo.create({
      data: { bankName, logoUrl, sortOrder },
    });

    return NextResponse.json(logo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to upload logo" }, { status: 500 });
  }
}

// DELETE - remove a bank logo
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const logo = await prisma.bankLogo.findUnique({ where: { id } });
    if (logo) {
      // Delete file from disk
      const filePath = path.join(process.cwd(), "public", logo.logoUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      await prisma.bankLogo.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete logo" }, { status: 500 });
  }
}
