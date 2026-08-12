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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rate = await prisma.bankRate.create({
      data: {
        bankName: body.bankName,
        category: body.category || "Salaried",
        interestRate: parseFloat(body.interestRate),
        minRate: parseFloat(body.minRate) || parseFloat(body.interestRate),
        maxRate: parseFloat(body.maxRate) || parseFloat(body.interestRate) + 0.6,
        processingFee: body.processingFee || "₹2,500 + GST",
        speedDays: parseInt(body.speedDays) || 5,
        badge: body.badge || "Special Rate",
      }
    });

    return NextResponse.json({ success: true, rate });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create rate" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const rate = await prisma.bankRate.update({
      where: { id: body.id },
      data: {
        bankName: body.bankName,
        category: body.category,
        interestRate: parseFloat(body.interestRate),
        processingFee: body.processingFee,
        speedDays: parseInt(body.speedDays),
        badge: body.badge,
      }
    });

    return NextResponse.json({ success: true, rate });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update rate" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });

    await prisma.bankRate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete rate" }, { status: 500 });
  }
}
