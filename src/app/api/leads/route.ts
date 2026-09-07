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
    // 1. IP Rate Limiting Guard (Max 15 requests per minute per IP)
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(clientIp, 15, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    
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

    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || `no-email-${Date.now()}@callback.local`,
        loanType: `${productCategory} - ${specificType}`,
        loanAmount: parseFloat(body.loanAmount) || 3000000,
        income: parseFloat(body.income) || null,
        city: body.city || "Agra",
        employmentType: body.employmentType || "Salaried",
        source: body.source || "Direct Search",
        message: body.message || `Product: ${productCategory} | Type: ${specificType}`,
        referralCode: body.referralCode || null,
      }
    });

    // -----------------------------------------------------
    // 1. SEND CONFIRMATION EMAIL TO APPLICANT
    // -----------------------------------------------------
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
        console.error("Lead Confirmation Email Error:", emailErr);
      }
    }

    // -----------------------------------------------------
    // 2. GEOLOCATION DETECTION & GOOGLE SHEETS INTEGRATION
    // -----------------------------------------------------
    try {
      const geo = await resolveClientLocation(req, body.lat, body.lng);
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
      console.error("Failed to process lead location or send to Google Sheets:", googleError);
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Failed to create lead:", error);
    return NextResponse.json({ success: false, error: "Failed to create lead" }, { status: 500 });
  }
}
