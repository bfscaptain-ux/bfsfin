import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const admin = searchParams.get("admin") === "true";

    let whereClause: any = {};
    if (!admin) {
      whereClause.isPublished = true;
    }

    if (category && category !== "All") {
      whereClause.category = category;
    }
    
    if (search) {
      whereClause.question = { contains: search };
    }

    const faqs = await prisma.faq.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, faqs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newFaq = await prisma.faq.create({
      data: {
        question: body.question,
        answer: body.answer,
        category: body.category || "General",
        slug: body.slug,
        isPublished: body.isPublished !== undefined ? body.isPublished : true,
      },
    });

    return NextResponse.json({ success: true, faq: newFaq }, { status: 201 });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create FAQ. Ensure slug is unique." },
      { status: 500 }
    );
  }
}
