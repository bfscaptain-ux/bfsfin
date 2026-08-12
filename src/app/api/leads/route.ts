import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        loanType: body.loanType || "Home Loan",
        loanAmount: parseFloat(body.loanAmount) || 3000000,
        income: parseFloat(body.income) || null,
        city: body.city || "Agra",
        employmentType: body.employmentType || "Salaried",
        source: body.source || "Direct Search",
        referralCode: body.referralCode || null,
      }
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create lead" }, { status: 500 });
  }
}
