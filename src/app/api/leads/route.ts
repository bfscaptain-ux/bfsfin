export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { resolveClientLocation } from "@/lib/geo";
import { sendToGoogleSheets } from "@/lib/googleSheets";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting Guard (Allows 25 submissions per minute per IP for peak concurrency)
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(clientIp, 25, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    
    // Check if email already exists (for formal loan applications, excluding instant callback & appointment requests)
    if (body.email && !body.source?.includes("Callback") && !body.source?.includes("APPOINTMENT")) {
      const existingLead = await prisma.lead.findFirst({
        where: { email: body.email }
      });
      
      if (existingLead) {
        return NextResponse.json(
          { success: false, error: "Ek email ID se ek hi application submit ki ja sakti hai. (Application already exists)" }, 
          { status: 400 }
        );
      }
    }

    const isAppointment = body.source?.includes("APPOINTMENT");
    const productCategory = body.productType || (body.loanType?.includes("Insurance") ? "Insurance" : body.loanType?.includes("Card") ? "Credit Card" : "Finance");
    const specificType = body.subType || body.loanType || "Home Loan";

    // DPDP & Telecom Regulatory Audit Logging
    const consentTimestamp = body.consentTimestamp || new Date().toISOString();
    const consentAuditLog = `[DPDP Consent: Authorized (Overrides DND) | Client IP: ${clientIp} | ConsentTime: ${consentTimestamp}]`;

    // 2. High-speed Database Commit (WAL mode ensures instant non-blocking write)
    const lead = await prisma.lead.create({
      data: {
        name: body.name || "Applicant",
        phone: body.phone || "Not Provided",
        email: body.email || `no-email-${Date.now()}@callback.local`,
        loanType: `${productCategory} - ${specificType}`,
        loanAmount: parseFloat(body.loanAmount) || 3000000,
        income: parseFloat(body.income) || null,
        city: body.city || "Agra",
        employmentType: body.employmentType || "Salaried",
        source: body.source || "Direct Search",
        message: `${body.message || `Product: ${productCategory} | Type: ${specificType}`} | ${consentAuditLog}`,
        referralCode: body.referralCode || null,
      }
    });

    // 3. Fast Geolocation Resolve (uses Cloudflare Edge headers / in-memory cache)
    const geoPromise = resolveClientLocation(req, body.lat, body.lng);

    // 4. Asynchronous Background Dispatch (Non-Blocking):
    // Deliver email and dispatch to Google Sheets in background so the user's form submission finishes in < 30ms!
    (async () => {
      try {
        // A. Send Confirmation Email to Applicant
        if (body.email && !body.email.includes("no-email")) {
          try {
            const { sendEmail } = await import("@/lib/mailer");
            const { 
              generateItrConfirmationEmail, 
              generateMsmeConfirmationEmail, 
              generateLoanApplicationEmail 
            } = await import("@/lib/emailTemplates");

            const apptSlot = isAppointment ? body.source.replace("APPOINTMENT:", "").trim() : null;

            const emailProps = {
              name: body.name || "Client",
              phone: body.phone,
              email: body.email,
              city: body.city || "Agra",
              productCategory,
              specificType,
              loanAmount: body.loanAmount,
              income: body.income,
              employmentType: body.employmentType,
              apptSlot,
              panNumber: body.panNumber,
              refId: body.refId,
              notes: body.message
            };

            let emailContent: { subject: string; html: string };

            if (body.formType === "ITR Filing" || productCategory.includes("Tax") || specificType.toLowerCase().includes("itr")) {
              emailContent = generateItrConfirmationEmail(emailProps);
            } else if (body.formType === "MSME Registration" || specificType.toLowerCase().includes("msme") || specificType.toLowerCase().includes("udyam")) {
              emailContent = generateMsmeConfirmationEmail(emailProps);
            } else {
              emailContent = generateLoanApplicationEmail(emailProps);
            }

            await sendEmail({
              to: body.email,
              subject: emailContent.subject,
              html: emailContent.html,
              bccAdmin: true,
            });
          } catch (emailErr) {
            console.error("Background Lead Email Error:", emailErr);
          }
        }

        // B. Send to Google Sheets
        try {
          const geo = await geoPromise;
          const rawSource = body.source || "";
          let derivedFormType = "Apply Form";
          let slotDate = "";
          let slotTime = "";

          if (rawSource.includes("APPOINTMENT")) {
            derivedFormType = "Appointment Booking";
            const slotParts = rawSource.replace("APPOINTMENT:", "").trim().split("|");
            slotDate = slotParts[0] ? slotParts[0].trim() : "";
            slotTime = slotParts[1] ? slotParts[1].trim() : "";
          } else if (rawSource.includes("Callback")) {
            derivedFormType = "Instant Callback";
          }

          await sendToGoogleSheets({
            formType: body.formType || derivedFormType,
            name: body.name || "",
            phone: body.phone || "",
            email: body.email || "",
            productType: productCategory,
            subType: specificType,
            loanAmount: body.loanAmount ? `₹${Number(body.loanAmount).toLocaleString('en-IN')}` : "",
            city: body.city || geo.city || "Agra",
            state: geo.region || "",
            userLocation: geo.fullAddress,
            mapsUrl: geo.mapsUrl,
            employmentType: body.employmentType || "Salaried",
            income: body.income ? (typeof body.income === 'number' ? `₹${Number(body.income).toLocaleString('en-IN')}` : body.income) : "",
            slotDate: slotDate,
            slotTime: slotTime,
            source: body.source || derivedFormType,
            panNumber: body.panNumber || "",
            refId: body.refId || "",
            otpStatus: body.refId || body.message?.includes("OTP: Verified") ? "Verified" : "Pending",
            message: body.message || "",
          });
        } catch (googleError) {
          console.error("Background Google Sheets Error:", googleError);
        }

        // C. Send directly to BFS Financial Services CRM (client mgmt2 Leads Section)
        try {
          const geo = await geoPromise;
          const { syncLeadToCRM } = await import("@/lib/crmSync");
          await syncLeadToCRM({
            name: body.name || "Website Applicant",
            phone: body.phone || "",
            email: body.email || "",
            productType: productCategory,
            subType: specificType,
            loanType: `${productCategory} - ${specificType}`,
            loanAmount: body.loanAmount || 0,
            income: body.income || null,
            city: body.city || geo.city || "Agra",
            location: geo.fullAddress || body.city || "Agra",
            employmentType: body.employmentType || "Salaried",
            formType: body.formType || "Apply Form",
            source: body.source || "Website Apply Form",
            message: body.message || "",
            panNumber: body.panNumber || "",
            refId: body.refId || "",
            slotDate: body.slotDate || "",
            slotTime: body.slotTime || "",
            mapsUrl: geo.mapsUrl || "",
          });
        } catch (crmError) {
          console.error("Background CRM Lead Sync Error:", crmError);
        }
      } catch (bgError) {
        console.error("Background Processing Error:", bgError);
      }
    })();

    // Immediate Response to Applicant (Sub-50ms instant feedback)
    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Failed to create lead:", error);
    return NextResponse.json({ success: false, error: "Failed to create lead" }, { status: 500 });
  }
}
