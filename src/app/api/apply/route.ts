import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check if an application already exists with this mobile number
    const existingLead = await prisma.lead.findFirst({
      where: { phone: body.mobileNumber }
    });

    if (existingLead) {
      return NextResponse.json(
        { success: false, error: "An application with this mobile number already exists. Our team will contact you soon." },
        { status: 409 }
      );
    }

    const newLead = await prisma.lead.create({
      data: {
        name: body.fullName,
        phone: body.mobileNumber,
        email: body.email,
        loanType: body.loanCategory,
        loanSubcategory: body.loanSubcategory || null,
        loanPurpose: body.loanPurpose || null,
        loanAmount: Number(body.loanAmount),
        tenure: Number(body.tenure),
        
        income: body.monthlyIncome ? Number(body.monthlyIncome) : null,
        address: body.address || null,
        pincode: body.pincode || null,
        dob: body.dob || null,
        gender: body.gender || null,
        
        employmentType: body.employmentType || null,
        employerName: body.employerName || null,
        workExperience: body.workExperience || null,
        
        bureauConsent: body.bureauConsent || false,
        bankName: body.bankName || null,
        accountNumber: body.accountNumber || null,
        ifscCode: body.ifscCode || null,

        source: "Online Application Form",
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, id: newLead.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
