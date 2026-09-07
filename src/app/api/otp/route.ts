import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from "@/lib/prisma";
import nodemailer from 'nodemailer';

const otpFilePath = path.join(process.cwd(), 'src', 'data', 'otps.json');

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit
    
    let otps: any = {};
    try {
      const file = await fs.readFile(otpFilePath, 'utf8');
      otps = JSON.parse(file);
    } catch(e) {}

    otps[email] = {
      code: otp,
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 mins
    };

    // Ensure dir exists
    await fs.mkdir(path.dirname(otpFilePath), { recursive: true }).catch(() => {});
    await fs.writeFile(otpFilePath, JSON.stringify(otps));

    // Fetch SMTP Settings from DB
    const smtpEmailSetting = await prisma.systemSetting.findUnique({ where: { key: 'smtpEmail' } });
    const smtpPasswordSetting = await prisma.systemSetting.findUnique({ where: { key: 'smtpPassword' } });

    const smtpEmail = smtpEmailSetting?.value?.trim();
    const smtpPassword = smtpPasswordSetting?.value?.replace(/\s+/g, '');

    if (smtpEmail && smtpPassword) {
      // Send real email via nodemailer
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpEmail,
            pass: smtpPassword,
          },
        });

        await transporter.sendMail({
          from: `"Bhardwaj Financial Services" <${smtpEmail}>`,
          to: email,
          subject: `${otp} is your BFS Instant Verification Code`,
          text: `Hello,\n\nYour BFS verification code is: ${otp}\nThis code will expire in 10 minutes.\n\nRegards,\nBhardwaj Financial Services`,
          html: `<div style="font-family: sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #10b981; border-radius: 12px;">
            <h2 style="color: #047857; margin-bottom: 8px;">Bhardwaj Financial Services</h2>
            <p style="color: #334155; font-size: 14px;">Hello,</p>
            <p style="color: #334155; font-size: 14px;">Your verification code for the callback request is:</p>
            <div style="background: #ecfdf5; padding: 14px; border-radius: 8px; text-align: center; margin: 16px 0;">
              <span style="font-size: 32px; font-weight: 800; color: #065f46; letter-spacing: 6px;">${otp}</span>
            </div>
            <p style="color: #64748b; font-size: 13px;">This code will expire in 10 minutes.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-top: 24px;" />
            <p style="color: #94a3b8; font-size: 11px;">🔒 Confidential • Official Verification Desk • Bhardwaj Financial Services</p>
          </div>`
        });

        console.log(`\n=== REAL EMAIL SENT VIA NODEMAILER TO: ${email} ===\n`);
        return NextResponse.json({ success: true, message: 'OTP sent successfully to your email.' });
      } catch (emailError) {
        console.error("Nodemailer failed, falling back to mock OTP for dev/testing:", emailError);
        return NextResponse.json({ 
          success: true, 
          message: 'OTP generated (SMTP fallback active)', 
          mockOtp: otp 
        });
      }
    } else {
      // Fallback to Mock OTP if SMTP not configured
      console.log(`\n\n=== MOCK EMAIL SENDER ===\nTo: ${email}\nYour BFS OTP is: ${otp}\n=========================\n\n`);
      return NextResponse.json({ success: true, message: 'OTP sent successfully (Check server console for code in Dev Mode)', mockOtp: otp });
    }
  } catch (error) {
    console.error("OTP POST Error:", error);
    return NextResponse.json({ error: 'Failed to process OTP request', details: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { email, otp } = await request.json();
    if (!email || !otp) return NextResponse.json({ error: 'Email and OTP required' }, { status: 400 });

    let otps: any = {};
    try {
      const file = await fs.readFile(otpFilePath, 'utf8');
      otps = JSON.parse(file);
    } catch(e) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    const record = otps[email];
    if (!record) return NextResponse.json({ error: 'No OTP requested for this email' }, { status: 400 });
    
    if (Date.now() > record.expiresAt) {
      delete otps[email];
      await fs.writeFile(otpFilePath, JSON.stringify(otps));
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
    }

    if (record.code !== otp) {
      return NextResponse.json({ error: 'Incorrect OTP' }, { status: 400 });
    }

    // Success - consume OTP
    delete otps[email];
    await fs.writeFile(otpFilePath, JSON.stringify(otps));

    return NextResponse.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
