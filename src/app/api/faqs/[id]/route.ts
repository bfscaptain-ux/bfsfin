import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const updatedFaq = await prisma.faq.update({
      where: { id },
      data: {
        question: body.question,
        answer: body.answer,
        category: body.category,
        slug: body.slug,
        isPublished: body.isPublished,
      },
    });

    return NextResponse.json({ success: true, faq: updatedFaq }, { status: 200 });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.faq.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    const faq = await prisma.faq.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ]
      }
    });

    if (!faq) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, faq }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
