import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendToGoogleSheets } from "@/lib/googleSheets";
import { resolveClientLocation } from "@/lib/geo";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, targetName, subject, description } = body;

    if (!email || !targetName || !subject || !description) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check for existing active complaint for this email
    const existingActiveComplaint = await prisma.complaint.findFirst({
      where: {
        email,
        status: {
          in: ["PENDING", "INVESTIGATING"],
        },
      },
    });

    if (existingActiveComplaint) {
      return NextResponse.json(
        { error: "You already have an active complaint being processed. Please wait until it is resolved before filing another." },
        { status: 400 }
      );
    }

    const complaint = await prisma.complaint.create({
      data: {
        email,
        targetName,
        subject,
        description,
      },
    });

    // Resolve Geolocation of Complainant
    const geo = await resolveClientLocation(req, body.lat, body.lng);

    // Send to Google Sheets (Dedicated "Complaints (Grievance)" & Master Sheet)
    await sendToGoogleSheets({
      formType: "Grievance Complaint",
      email: complaint.email,
      name: `Complainant (${complaint.email.split("@")[0]})`,
      targetName: complaint.targetName,
      subject: complaint.subject,
      description: complaint.description,
      userLocation: geo.fullAddress,
      mapsUrl: geo.mapsUrl,
      city: geo.city,
      state: geo.region,
      message: `[Regarding: ${complaint.targetName}] ${complaint.subject}: ${complaint.description}`,
      status: "Under Review",
    });

    // Send Confirmation Email to Complainant
    const { sendEmail } = await import("@/lib/mailer");
    const { generateGrievanceEmail } = await import("@/lib/emailTemplates");
    const ticketId = complaint.id.slice(-6).toUpperCase();

    const emailContent = generateGrievanceEmail({
      name: complaint.email.split("@")[0] || "Valued Customer",
      email: complaint.email,
      ticketId,
      targetName: complaint.targetName,
      subject: complaint.subject,
      description: complaint.description
    });

    sendEmail({
      to: complaint.email,
      subject: emailContent.subject,
      html: emailContent.html,
    }).catch(console.error);

    return NextResponse.json(complaint, { status: 201 });
  } catch (error) {
    console.error("Error creating complaint:", error);
    return NextResponse.json({ error: "Failed to create complaint" }, { status: 500 });
  }
}
