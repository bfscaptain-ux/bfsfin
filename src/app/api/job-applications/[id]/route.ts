import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status } = body;

    const updated = await prisma.jobApplication.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, application: updated });
  } catch (error) {
    console.error("Failed to update application status:", error);
    return NextResponse.json({ success: false, error: "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    await prisma.jobApplication.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete application:", error);
    return NextResponse.json({ success: false, error: "Failed to delete application" }, { status: 500 });
  }
}
