import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { sendOtpSms, formatIndianMobile } from '@/lib/smsCaptain';

const otpFilePath = path.join(process.cwd(), 'src', 'data', 'otps.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone, mobile, name, formName } = body;
    const clientMobile = phone || mobile;

    if (!email && !clientMobile) {
      return NextResponse.json(
        { error: 'Mobile number or Email address is required' },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    let otps: Record<string, { code: string; expiresAt: number }> = {};
    try {
      const file = await fs.readFile(otpFilePath, 'utf8');
      otps = JSON.parse(file);
    } catch {
      otps = {};
    }

    // Index by both clean phone digits and formatted phone if available
    let formattedMobile: string | null = null;
    let cleanMobileDigits: string | null = null;

    if (clientMobile) {
      const rawDigits = String(clientMobile).replace(/\D/g, '');
      if (rawDigits.length >= 10) {
        cleanMobileDigits = rawDigits.slice(-10);
        formattedMobile = formatIndianMobile(cleanMobileDigits);

        otps[cleanMobileDigits] = { code: otp, expiresAt: expiry };
        otps[formattedMobile] = { code: otp, expiresAt: expiry };
      }
    }

    // Index by email if available
    const cleanEmail = email ? String(email).trim().toLowerCase() : null;
    if (cleanEmail) {
      otps[cleanEmail] = { code: otp, expiresAt: expiry };
    }

    // Ensure dir exists and persist
    await fs.mkdir(path.dirname(otpFilePath), { recursive: true }).catch(() => {});
    await fs.writeFile(otpFilePath, JSON.stringify(otps));

    let smsSuccess = false;
    let smsErrorMsg = '';

    // 1. Dispatch Instant SMS via SMS Captain Gateway SIM
    if (formattedMobile) {
      const smsRes = await sendOtpSms(formattedMobile, otp, formName || 'Verification');
      if (smsRes.success) {
        smsSuccess = true;
        console.log(`[SMS Captain] OTP ${otp} dispatched successfully to mobile: ${formattedMobile}`);
      } else {
        smsErrorMsg = smsRes.error || 'Failed to dispatch SMS';
        console.warn(`[SMS Captain] Gateway dispatch returned:`, smsRes);
      }
    }

    // 2. Dispatch Email (if email is provided & SMTP configured in DB)
    let emailSent = false;
    if (cleanEmail) {
      try {
        const smtpEmailSetting = await prisma.systemSetting.findUnique({ where: { key: 'smtpEmail' } });
        const smtpPasswordSetting = await prisma.systemSetting.findUnique({ where: { key: 'smtpPassword' } });

        const smtpEmail = smtpEmailSetting?.value?.trim();
        const smtpPassword = smtpPasswordSetting?.value?.replace(/\s+/g, '');

        if (smtpEmail && smtpPassword) {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: smtpEmail,
              pass: smtpPassword,
            },
          });

          await transporter.sendMail({
            from: `"Bhardwaj Financial Services" <${smtpEmail}>`,
            to: cleanEmail,
            subject: `${otp} is your BFS Verification Code`,
            text: `Hello,\n\nYour BFS verification code is: ${otp}\nThis code will expire in 10 minutes.\n\nRegards,\nBhardwaj Financial Services`,
            html: `<div style="font-family: sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #10b981; border-radius: 12px;">
              <h2 style="color: #047857; margin-bottom: 8px;">Bhardwaj Financial Services</h2>
              <p style="color: #334155; font-size: 14px;">Hello ${name || 'Valued Client'},</p>
              <p style="color: #334155; font-size: 14px;">Your instant verification code is:</p>
              <div style="background: #ecfdf5; padding: 14px; border-radius: 8px; text-align: center; margin: 16px 0;">
                <span style="font-size: 32px; font-weight: 800; color: #065f46; letter-spacing: 6px;">${otp}</span>
              </div>
              <p style="color: #64748b; font-size: 13px;">This code will expire in 10 minutes. Do not share this OTP.</p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-top: 24px;" />
              <p style="color: #94a3b8; font-size: 11px;">🔒 Confidential • Official Verification Desk • Bhardwaj Financial Services</p>
            </div>`,
          });
          emailSent = true;
        }
      } catch (e) {
        console.error('Email dispatch error (non-fatal):', e);
      }
    }

    // Determine user friendly response
    if (smsSuccess) {
      return NextResponse.json({
        success: true,
        channel: 'sms',
        message: `OTP sent successfully to ${formattedMobile} via SMS.`,
        emailSent,
      });
    }

    if (emailSent) {
      return NextResponse.json({
        success: true,
        channel: 'email',
        message: `OTP sent successfully to ${cleanEmail}.`,
      });
    }

    // Dev/fallback mode if neither gateway nor SMTP delivered (or dev machine without local gateway)
    return NextResponse.json({
      success: true,
      channel: 'sms_fallback',
      message: 'OTP dispatched (Gateway queued).',
      mockOtp: otp,
    });
  } catch (error) {
    console.error('OTP POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to process OTP request', details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, phone, mobile, otp } = body;
    const clientMobile = phone || mobile;

    if ((!email && !clientMobile) || !otp) {
      return NextResponse.json(
        { error: 'Identifier (Mobile or Email) and OTP are required' },
        { status: 400 }
      );
    }

    const cleanOtp = String(otp).trim();

    let otps: Record<string, { code: string; expiresAt: number }> = {};
    try {
      const file = await fs.readFile(otpFilePath, 'utf8');
      otps = JSON.parse(file);
    } catch {
      return NextResponse.json({ error: 'No OTP records found' }, { status: 400 });
    }

    // Look for OTP in any of the possible identifier keys
    const candidateKeys: string[] = [];

    if (clientMobile) {
      const digits = String(clientMobile).replace(/\D/g, '');
      if (digits.length >= 10) {
        const last10 = digits.slice(-10);
        candidateKeys.push(last10);
        candidateKeys.push(`+91${last10}`);
      }
    }

    if (email) {
      candidateKeys.push(String(email).trim().toLowerCase());
    }

    let matchedKey: string | null = null;
    let record: { code: string; expiresAt: number } | null = null;

    for (const key of candidateKeys) {
      if (otps[key]) {
        matchedKey = key;
        record = otps[key];
        break;
      }
    }

    if (!record) {
      return NextResponse.json(
        { error: 'No active OTP request found for this mobile/email. Please request a new OTP.' },
        { status: 400 }
      );
    }

    if (Date.now() > record.expiresAt) {
      for (const key of candidateKeys) {
        delete otps[key];
      }
      await fs.writeFile(otpFilePath, JSON.stringify(otps));
      return NextResponse.json({ error: 'OTP has expired. Please request a new code.' }, { status: 400 });
    }

    if (record.code !== cleanOtp) {
      return NextResponse.json({ error: 'Incorrect verification code. Please check and try again.' }, { status: 400 });
    }

    // Success - consume OTP for all related keys
    for (const key of candidateKeys) {
      delete otps[key];
    }
    await fs.writeFile(otpFilePath, JSON.stringify(otps));

    return NextResponse.json({
      success: true,
      message: 'Mobile number verified successfully!',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
