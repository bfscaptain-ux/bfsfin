export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rates = await prisma.bankRate.findMany({
      orderBy: { interestRate: "asc" }
    });
    return NextResponse.json({ success: true, rates });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch bank rates" }, { status: 500 });
  }
}
