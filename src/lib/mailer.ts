import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  bccAdmin?: boolean;
}

export async function sendEmail({ to, subject, html, bccAdmin = true }: SendMailOptions): Promise<boolean> {
  try {
    if (!to || to.includes("no-email") || to.includes("callback.local")) {
      return false;
    }

    const settings = await prisma.systemSetting.findMany({
      where: { key: { in: ["smtpEmail", "smtpPassword"] } },
    });

    const smtpEmail = settings.find((s) => s.key === "smtpEmail")?.value;
    const smtpPassword = settings.find((s) => s.key === "smtpPassword")?.value;

    if (!smtpEmail || !smtpPassword) {
      console.warn("SMTP settings missing. Email not sent to:", to);
      return false;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
    });

    const shouldBcc = bccAdmin && smtpEmail && to.toLowerCase() !== smtpEmail.toLowerCase();

    await transporter.sendMail({
      from: `"Bhardwaj Financial Services" <${smtpEmail}>`,
      to,
      bcc: shouldBcc ? smtpEmail : undefined,
      subject,
      html,
    });

    return true;
  } catch (err) {
    console.error("sendEmail error:", err);
    return false;
  }
}
