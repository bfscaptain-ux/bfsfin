import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, state, city, loanType, loanAmount, message } = body;

    // Basic validation
    if (!name || !phone || !email || !state || !city || !loanType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Double check the limit before inserting
    const existingRequest = await prisma.contactRequest.findFirst({
      where: { phone, status: { not: "RESOLVED" } }
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: "Limit Reached", message: "You already have an active request." },
        { status: 403 }
      );
    }

    const contactRequest = await prisma.contactRequest.create({
      data: {
        name,
        phone,
        email,
        state,
        city,
        loanType,
        loanAmount: loanAmount || null,
        message: message || null,
      },
    });

    return NextResponse.json(
      { success: true, data: contactRequest },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact request:", error);
    return NextResponse.json(
      { error: "Failed to submit contact request" },
      { status: 500 }
    );
  }
}
