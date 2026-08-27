import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    // 1. Fetch SMTP Settings from DB
    const settings = await prisma.systemSetting.findMany({
      where: { key: { in: ["smtpEmail", "smtpPassword"] } }
    });
    
    const smtpEmail = settings.find(s => s.key === "smtpEmail")?.value;
    const smtpPassword = settings.find(s => s.key === "smtpPassword")?.value;

    if (!smtpEmail || !smtpPassword) {
      return NextResponse.json(
        { success: false, error: "SMTP configuration missing in Admin Settings." }, 
        { status: 500 }
      );
    }

    // 2. Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit OTP

    // 3. Create Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
    });

    // 4. Beautiful HTML Email Template
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #059669; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">Bhardwaj Financial Services</h1>
          <p style="color: #6ee7b7; margin: 8px 0 0 0; font-size: 14px;">Enterprise Home Loan Portal</p>
        </div>
        
        <div style="padding: 32px 24px; background-color: #ffffff;">
          <h2 style="color: #1e293b; margin-top: 0; font-size: 20px;">Email Verification</h2>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 24px;">
            Dear ${name || "Client"},<br><br>
            Thank you for initiating your loan application with BFS Agra. Please use the One Time Password (OTP) below to verify your email address and proceed with your application.
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <div style="display: inline-block; background-color: #f1f5f9; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 16px 48px;">
              <span style="font-size: 32px; font-weight: bold; color: #0f172a; letter-spacing: 6px;">${otp}</span>
            </div>
          </div>
          
          <p style="color: #475569; line-height: 1.6; font-size: 14px;">
            This OTP is valid for the next 10 minutes. If you did not request this verification, please ignore this email.
          </p>
          <p style="color: #475569; line-height: 1.6; font-size: 14px; margin-top: 24px;">
            Best Regards,<br>
            <strong>BFS Agra Team</strong><br>
            <span style="color: #64748b; font-size: 12px;">RBI Compliant & Certified Mortgage Broker</span>
          </p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; color: #94a3b8; font-size: 12px;">
            © ${new Date().getFullYear()} Bhardwaj Financial Services. All rights reserved.<br>
            Sanjay Place, Commercial Hub, Agra, UP - 282002
          </p>
        </div>
      </div>
    `;

    // 5. Send Email
    await transporter.sendMail({
      from: `"BFS Agra - Support" <${smtpEmail}>`,
      to: email,
      subject: `${otp} is your BFS Application Verification Code`,
      html: htmlTemplate,
    });

    // Simple security for frontend validation without DB (Base64 encoding OTP + Secret Salt)
    const encodedHash = Buffer.from(`${otp}-BFS2026`).toString('base64');

    return NextResponse.json({ success: true, hash: encodedHash });
  } catch (error: any) {
    console.error("OTP Send Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email. Please check your SMTP settings in Admin." },
      { status: 500 }
    );
  }
}
