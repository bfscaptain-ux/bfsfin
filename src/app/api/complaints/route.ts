import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendToGoogleSheets } from "@/lib/googleSheets";
import { resolveClientLocation } from "@/lib/geo";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, targetName, subject, description, name, phone, category, refNumber, incidentDate } = body;

    if (!email || !targetName || !subject || !description) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
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
        { error: "You already have an active grievance being investigated. Our Nodal Officer will contact you within 48 hours." },
        { status: 400 }
      );
    }

    const complainantName = name || email.split("@")[0] || "Client";
    const complainantPhone = phone || "Not Provided";
    const complaintCategory = category || "Staff Misconduct / Service Deficiency";
    const refTag = refNumber ? ` | Loan/Ref ID: ${refNumber}` : "";
    const dateTag = incidentDate ? ` | Incident Date: ${incidentDate}` : "";

    const fullSubject = `[${complaintCategory}] Regarding ${targetName} - ${subject}`;
    const fullDescription = `Complainant: ${complainantName} | Phone: ${complainantPhone}${refTag}${dateTag}\nAgainst Executive/Staff: ${targetName}\nGrievance Category: ${complaintCategory}\n\nIncident Statement:\n${description}\n\n[Review Desk: Praveen Bhardwaj (Nodal Grievance Officer) | TAT: 48 Working Hours | Logged: ${new Date().toISOString()}]`;

    // Fast Database Write in WAL mode
    const complaint = await prisma.complaint.create({
      data: {
        email,
        targetName,
        subject: fullSubject,
        description: fullDescription,
      },
    });

    const ticketId = `BFS-GRV-${complaint.id.slice(-6).toUpperCase()}`;

    // Fast Geolocation Promise
    const geoPromise = resolveClientLocation(req, body.lat, body.lng);

    // Background Async Dispatch (Non-Blocking)
    (async () => {
      try {
        const geo = await geoPromise;
        // Send to Google Sheets (Dedicated "Complaints (Grievance)" & Master Sheet)
        await sendToGoogleSheets({
          formType: "Grievance Complaint",
          email: complaint.email,
          name: `${complainantName} (Phone: ${complainantPhone})`,
          targetName: complaint.targetName,
          subject: fullSubject,
          description: fullDescription,
          userLocation: geo.fullAddress,
          mapsUrl: geo.mapsUrl,
          city: geo.city,
          state: geo.region,
          message: `[Ticket: ${ticketId}] Against: ${targetName} | Category: ${complaintCategory}`,
          status: "Under Review",
        });

        // Send Confirmation Email to Complainant
        const { sendEmail } = await import("@/lib/mailer");
        const { generateGrievanceEmail } = await import("@/lib/emailTemplates");

        const emailContent = generateGrievanceEmail({
          name: complainantName,
          email: complaint.email,
          ticketId,
          targetName: complaint.targetName,
          subject: fullSubject,
          description: fullDescription
        });

        await sendEmail({
          to: complaint.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });
      } catch (e) {
        console.error("Background complaint notification error:", e);
      }
    })();

    // Instant Response to User
    return NextResponse.json({ ...complaint, ticketId }, { status: 201 });
  } catch (error) {
    console.error("Error creating complaint:", error);
    return NextResponse.json({ error: "Failed to create complaint" }, { status: 500 });
  }
}
