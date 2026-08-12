import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: {
        slug: params.slug,
      },
    });

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 });
  }
}
