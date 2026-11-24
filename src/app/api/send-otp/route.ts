import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sendOtpSms, formatIndianMobile } from "@/lib/smsCaptain";

export async function POST(req: Request) {
  try {
    // 0. Protect against OTP SMS/SMTP bombing (Max 6 requests per minute per IP)
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`otp-${clientIp}`, 6, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many OTP requests from this IP. Please wait 1 minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, phone, mobile, name, formType, productType } = body;
    const clientMobile = phone || mobile;

    if (!email && !clientMobile) {
      return NextResponse.json({ success: false, error: "Mobile number or Email is required" }, { status: 400 });
    }

    // 1. Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit OTP
    const encodedHash = Buffer.from(`${otp}-BFS2026`).toString('base64');

    let smsSuccess = false;
    let emailSuccess = false;

    // 2. Dispatch SMS via SMS Captain Gateway SIM
    if (clientMobile) {
      const formattedMobile = formatIndianMobile(clientMobile);
      const category = formType || productType || 'Application';
      const smsRes = await sendOtpSms(formattedMobile, otp, category);
      if (smsRes.success) {
        smsSuccess = true;
        console.log(`[send-otp] SMS OTP ${otp} dispatched to ${formattedMobile}`);
      } else {
        console.warn(`[send-otp] SMS dispatch failed:`, smsRes);
      }
    }

    // 3. Dispatch Email via Nodemailer (if email provided)
    if (email) {
      try {
        const settings = await prisma.systemSetting.findMany({
          where: { key: { in: ["smtpEmail", "smtpPassword"] } }
        });
        
        const smtpEmail = settings.find(s => s.key === "smtpEmail")?.value?.trim();
        const smtpPassword = settings.find(s => s.key === "smtpPassword")?.value?.replace(/\s+/g, '');

        if (smtpEmail && smtpPassword) {
          const type = formType || productType || "Application";
          let portalName = "Bhardwaj Financial Services";
          let initMessage = "Thank you for initiating your application with BFS Agra.";

          if (type.toLowerCase().includes("itr") || type.toLowerCase().includes("tax")) {
            portalName = "BFS E-Filing Tax Portal";
            initMessage = "Thank you for initiating your ITR Filing request with BFS Agra.";
          } else if (type.toLowerCase().includes("msme") || type.toLowerCase().includes("udyam")) {
            portalName = "BFS MSME Registration Desk";
            initMessage = "Thank you for initiating your MSME / Udyam Registration request with BFS Agra.";
          } else if (type.toLowerCase().includes("loan") || type.toLowerCase().includes("finance")) {
            portalName = "Enterprise Home Loan Portal";
            initMessage = "Thank you for initiating your loan application with BFS Agra.";
          }

          const htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <div style="background-color: #059669; padding: 24px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">Bhardwaj Financial Services</h1>
                <p style="color: #6ee7b7; margin: 8px 0 0 0; font-size: 14px;">${portalName}</p>
              </div>
              
              <div style="padding: 32px 24px; background-color: #ffffff;">
                <h2 style="color: #1e293b; margin-top: 0; font-size: 20px;">Verification Code</h2>
                <p style="color: #475569; line-height: 1.6; margin-bottom: 24px;">
                  Dear ${name || "Client"},<br><br>
                  ${initMessage} Please use the One Time Password (OTP) below to verify and proceed with your request.
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
                  <span style="color: #64748b; font-size: 12px;">RBI Compliant & Certified Financial Advisory</span>
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

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: smtpEmail, pass: smtpPassword },
          });

          await transporter.sendMail({
            from: `"BFS Agra - Support" <${smtpEmail}>`,
            to: email,
            subject: `${otp} is your BFS Verification Code`,
            html: htmlTemplate,
          });
          emailSuccess = true;
        }
      } catch (e) {
        console.error("Nodemailer error in send-otp:", e);
      }
    }

    if (smsSuccess || emailSuccess) {
      return NextResponse.json({
        success: true,
        hash: encodedHash,
        channel: smsSuccess ? "sms" : "email",
        message: smsSuccess ? "OTP sent to your mobile via SMS." : "OTP sent to your email."
      });
    }

    // Fallback mode if gateway is queued or offline
    return NextResponse.json({
      success: true,
      hash: encodedHash,
      channel: "fallback",
      message: "Verification code generated.",
      mockOtp: otp
    });
  } catch (error: any) {
    console.error("OTP Send Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send verification code. Please try again." },
      { status: 500 }
    );
  }
}
