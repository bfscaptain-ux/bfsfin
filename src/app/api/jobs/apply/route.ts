import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check for existing application (prevent duplicates)
    const existing = await prisma.jobApplication.findFirst({
      where: {
        jobId: body.jobId,
        OR: [
          { email: body.email },
          { phone: body.phone }
        ]
      }
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "You have already applied for this position." },
        { status: 400 }
      );
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId: body.jobId,
        name: body.name,
        email: body.email,
        phone: body.phone,
        city: body.city,
        experience: body.experience,
        currentSalary: body.currentSalary,
        resumeUrl: body.resumeUrl,
        coverText: body.coverText,
      }
    });

    // Email Sending Logic
    try {
      const { sendEmail } = await import("@/lib/mailer");
      const { generateJobApplicationEmail } = await import("@/lib/emailTemplates");
      const job = await prisma.jobPost.findUnique({ where: { id: body.jobId } });

      const emailContent = generateJobApplicationEmail({
        name: body.name,
        email: body.email,
        phone: body.phone,
        city: body.city || "Agra",
        jobTitle: job?.title || "Job Application",
        experience: body.experience || "N/A",
      });

      await sendEmail({
        to: body.email,
        subject: emailContent.subject,
        html: emailContent.html,
        bccAdmin: true,
      });
    } catch (emailError) {
      console.error("Failed to send applicant email:", emailError);
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 500 });
  }
}
