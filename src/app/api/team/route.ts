export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const initials = formData.get("initials") as string;
    const color = formData.get("color") as string || "emerald";
    const desc = formData.get("desc") as string;
    const file = formData.get("image") as File | null;
    let imageUrl = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const filename = "team_" + Date.now() + "_" + file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const uploadDir = path.join(process.cwd(), "public/team");
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const filepath = path.join(uploadDir, filename);
      fs.writeFileSync(filepath, buffer);
      
      imageUrl = "/team/" + filename;
    }

    const maxOrder = await prisma.teamMember.aggregate({
      _max: { sortOrder: true }
    });
    const nextOrder = (maxOrder._max.sortOrder || 0) + 1;

    const newMember = await prisma.teamMember.create({
      data: {
        name,
        role,
        initials,
        color,
        desc,
        imageUrl,
        sortOrder: nextOrder,
      }
    });

    return NextResponse.json({ success: true, member: newMember });
  } catch (error: any) {
    console.error("Team upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const member = await prisma.teamMember.findUnique({ where: { id } });
    if (member && member.imageUrl) {
      try {
        const filepath = path.join(process.cwd(), "public", member.imageUrl);
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      } catch (e) {
        console.error("Failed to delete image file:", e);
      }
    }

    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
