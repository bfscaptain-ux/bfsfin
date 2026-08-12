import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { title, department, location, type, description, requirements, slug, isActive } = body;

    const updatedJob = await prisma.careerJob.update({
      where: { id },
      data: {
        title,
        department,
        location,
        type,
        description,
        requirements,
        slug,
        isActive,
      },
    });

    return NextResponse.json({ success: true, job: updatedJob });
  } catch (error) {
    console.error("Failed to update job:", error);
    return NextResponse.json({ success: false, error: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    await prisma.careerJob.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete job:", error);
    return NextResponse.json({ success: false, error: "Failed to delete job" }, { status: 500 });
  }
}
