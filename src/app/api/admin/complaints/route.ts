import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const complaints = await prisma.complaint.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(complaints, { status: 200 });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return NextResponse.json({ error: "Failed to fetch complaints", details: String(error) }, { status: 500 });
  }
}
