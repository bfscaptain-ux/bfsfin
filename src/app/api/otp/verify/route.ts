import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ success: false, error: "Email and code are required" }, { status: 400 });
    }

    // Find the most recent OTP for this email
    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        email: email,
        code: code,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!otpRecord) {
      return NextResponse.json({ success: false, error: "Invalid OTP" }, { status: 400 });
    }

    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json({ success: false, error: "OTP has expired" }, { status: 400 });
    }

    // OTP is valid. Delete it so it can't be used again.
    await prisma.otpCode.delete({
      where: {
        id: otpRecord.id,
      },
    });

    return NextResponse.json({ success: true, message: "OTP verified successfully" });

  } catch (error) {
    console.error("OTP Verify Error:", error);
    return NextResponse.json({ success: false, error: "Failed to verify OTP" }, { status: 500 });
  }
}
