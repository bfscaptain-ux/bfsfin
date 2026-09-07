import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.jobPost.findMany({
      orderBy: { createdAt: "desc" },
      include: { applications: true }
    });
    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const job = await prisma.jobPost.create({
      data: {
        title: body.title,
        department: body.department,
        location: body.location || "Agra",
        type: body.type || "Full-time",
        experience: body.experience,
        salary: body.salary || "Industry Standard",
        incentive: body.incentive,
        description: body.description,
        requirements: body.requirements,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
      }
    });
    return NextResponse.json({ success: true, job });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create job" }, { status: 500 });
  }
}
