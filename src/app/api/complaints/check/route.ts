import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const existingActiveComplaint = await prisma.complaint.findFirst({
      where: {
        email,
        status: {
          in: ["PENDING", "INVESTIGATING"],
        },
      },
    });

    if (existingActiveComplaint) {
      return NextResponse.json({
        hasActiveComplaint: true,
        message: "You already have an active complaint being processed. Please wait until it is resolved before filing another."
      });
    }

    return NextResponse.json({ hasActiveComplaint: false });
  } catch (error) {
    console.error("Error checking complaint status:", error);
    return NextResponse.json({ error: "Failed to check complaint status" }, { status: 500 });
  }
}
