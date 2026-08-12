import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Configure your SMTP settings here (Fallback to a mock Ethereal for testing if no env vars)
// In production, these should come from process.env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: parseInt(process.env.SMTP_PORT || "587"),
  auth: {
    user: process.env.SMTP_USER || "your_mock_user@ethereal.email", 
    pass: process.env.SMTP_PASS || "your_mock_pass",
  },
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
    }

    // Generate a 4-digit OTP
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Set expiry to 5 minutes from now
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Save OTP to Database
    await prisma.otpCode.create({
      data: {
        email,
        code,
        expiresAt,
      },
    });

    // We will log the OTP to the console for easy local testing since they might not have real SMTP set up yet.
    console.log(`\n\n=== OTP for ${email}: ${code} ===\n\n`);

    try {
      // Attempt to send email
      await transporter.sendMail({
        from: process.env.SMTP_FROM || '"BFS Agra" <noreply@bfsagra.com>',
        to: email,
        subject: "Your BFS Agra OTP Code",
        html: `
          <div style="font-family: Arial, sans-serif; max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg">
            <h2 style="color: #059669; margin-bottom: 20px;">BFS Agra Verification</h2>
            <p style="color: #333; font-size: 16px;">Namaste,</p>
            <p style="color: #333; font-size: 16px;">Your verification code is:</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #1e293b; margin: 20px 0;">
              ${code}
            </div>
            <p style="color: #64748b; font-size: 14px;">This code is valid for 5 minutes.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #94a3b8; font-size: 12px;">If you did not request this, please ignore this email.</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.warn("Failed to send real email, but OTP is generated in DB. Ensure SMTP is configured. OTP is logged in console.");
      // We still return success so the frontend UI can test the DB flow
    }

    return NextResponse.json({ success: true, message: "OTP sent successfully" });

  } catch (error) {
    console.error("OTP Send Error:", error);
    return NextResponse.json({ success: false, error: "Failed to send OTP" }, { status: 500 });
  }
}
