import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const jobs = await prisma.careerJob.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, department, location, type, description, requirements, slug, isActive } = body;

    const newJob = await prisma.careerJob.create({
      data: {
        title,
        department,
        location,
        type,
        description,
        requirements,
        slug,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ success: true, job: newJob });
  } catch (error) {
    console.error("Failed to create job:", error);
    return NextResponse.json({ success: false, error: "Failed to create job" }, { status: 500 });
  }
}
