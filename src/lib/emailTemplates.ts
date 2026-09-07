/**
 * Centralized, Beautiful & Professional HTML Email Confirmation Templates
 * For Bhardwaj Financial Services (BFS)
 */

interface BaseEmailProps {
  name: string;
  phone?: string;
  email?: string;
  city?: string;
}

export interface LeadEmailProps extends BaseEmailProps {
  productCategory: string; // "Finance", "Insurance", "Credit Card", "Tax & Compliance"
  specificType: string;    // e.g. "Home Loan", "MSME Registration", "ITR Filing", "Cashless Health Bima"
  loanAmount?: string | number;
  income?: string | number;
  employmentType?: string;
  apptSlot?: string | null;
  panNumber?: string;
  refId?: string;
  notes?: string;
}

export interface CallbackEmailProps extends BaseEmailProps {
  category: string;
  subType: string;
  amountBand?: string;
  preferredSlot?: string;
  notes?: string;
}

export interface GrievanceEmailProps extends BaseEmailProps {
  ticketId: string;
  targetName: string;
  subject: string;
  description: string;
}

export interface JobApplicationEmailProps extends BaseEmailProps {
  jobTitle: string;
  experience?: string;
  resumeUrl?: string;
}

const BRAND = {
  name: "Bhardwaj Financial Services",
  shortName: "BFS Agra",
  tagline: "Premier Financial Advisory & Compliance Hub",
  address: "Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Place, Agra, UP - 282002",
  phone: "+91 9258-724-227",
  whatsapp: "+91 7900-979-001",
  website: "https://bhardwajfinance.com",
};

/**
 * Universal Wrapper for consistent, high-end responsive branding
 */
function emailLayout({
  badgeText,
  badgeIcon = "🛡️",
  bannerTitle,
  bannerSubtitle,
  recipientName,
  introAlertHtml,
  promiseTitle = "हम आपसे बहुत जल्द संपर्क करेंगे (We Will Contact You Shortly)",
  promiseBodyHtml,
  tableTitle,
  tableRows,
  footerNote,
  accentGradient = "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
  accentColor = "#059669",
  accentBg = "#ecfdf5",
  accentBorder = "#a7f3d0",
}: {
  badgeText: string;
  badgeIcon?: string;
  bannerTitle: string;
  bannerSubtitle: string;
  recipientName: string;
  introAlertHtml: string;
  promiseTitle?: string;
  promiseBodyHtml: string;
  tableTitle: string;
  tableRows: { label: string; value: string; isHighlight?: boolean }[];
  footerNote?: string;
  accentGradient?: string;
  accentColor?: string;
  accentBg?: string;
  accentBorder?: string;
}) {
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${bannerTitle} - ${BRAND.name}</title>
</head>
<body style="margin: 0; padding: 24px 10px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
    
    <!-- Top Header Banner -->
    <div style="background: ${accentGradient}; padding: 36px 24px; text-align: center; color: #ffffff;">
      <div style="display: inline-block; background-color: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3); border-radius: 9999px; padding: 5px 15px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
        ${badgeIcon} ${badgeText}
      </div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff; line-height: 1.2;">
        ${BRAND.name}
      </h1>
      <p style="margin: 8px 0 0; font-size: 14px; color: #d1fae5; font-weight: 500;">
        ${bannerSubtitle}
      </p>
    </div>

    <!-- Main Content Container -->
    <div style="padding: 32px 24px;">
      
      <!-- Greeting -->
      <h2 style="color: #0f172a; margin: 0 0 16px; font-size: 20px; font-weight: 800;">
        नमस्ते ${recipientName || "Valued Customer"},
      </h2>

      <!-- Status Alert Box -->
      <div style="background-color: ${accentBg}; border-left: 4px solid ${accentColor}; padding: 16px 20px; border-radius: 10px; margin-bottom: 22px;">
        <p style="margin: 0; color: #065f46; font-size: 14px; font-weight: 600; line-height: 1.6;">
          ${introAlertHtml}
        </p>
      </div>

      <!-- Quick Contact Promise Box -->
      <div style="background: linear-gradient(135deg, ${accentBg} 0%, #ffffff 100%); border: 1px solid ${accentBorder}; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="font-size: 20px; line-height: 1;">📞</span>
          <h3 style="margin: 0; color: ${accentColor}; font-size: 15px; font-weight: 800;">
            ${promiseTitle}
          </h3>
        </div>
        <p style="margin: 0; color: #334155; font-size: 13.5px; line-height: 1.6;">
          ${promiseBodyHtml}
        </p>
      </div>

      <!-- Application / Ticket Data Table -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
          <span style="font-size: 12px; text-transform: uppercase; color: ${accentColor}; letter-spacing: 0.8px; font-weight: 800;">
            ${tableTitle}
          </span>
          <span style="font-size: 11px; background-color: #ecfdf5; color: #047857; padding: 3px 8px; border-radius: 9999px; font-weight: 700;">
            ✓ VERIFIED
          </span>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px; color: #334155;">
          ${tableRows
            .map(
              (row) => `
            <tr>
              <td style="padding: 9px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; width: 42%; color: #64748b;">
                ${row.label}:
              </td>
              <td style="padding: 9px 0; border-bottom: 1px solid #e2e8f0; color: ${row.isHighlight ? accentColor : '#0f172a'}; font-weight: ${row.isHighlight ? '800' : '600'};">
                ${row.value}
              </td>
            </tr>`
            )
            .join("")}
        </table>
      </div>

      <!-- Assurance / Security Policy -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; margin-bottom: 22px;">
        <p style="margin: 0; color: #475569; font-size: 12.5px; line-height: 1.6;">
          🛡️ <strong>100% Free Consultation Policy:</strong> Bhardwaj Financial Services (BFS) कभी भी किसी भी सर्विस, लोन अप्रूवल या अपॉइंटमेंट के लिए कोई एडवांस कैश या अनधिकृत चार्ज नहीं लेता। समस्त ऋण प्रक्रियाएं पार्टनर बैंकों एवं सरकारी नियमों के तहत पूरी की जाती हैं।
        </p>
      </div>

      ${
        footerNote
          ? `<div style="background-color: #f0fdf4; border: 1px dashed ${accentColor}; border-radius: 10px; padding: 12px 16px; margin-bottom: 22px;">
              <p style="margin: 0; color: #047857; font-size: 12.5px; font-weight: 600;">
                ${footerNote}
              </p>
            </div>`
          : ""
      }

      <!-- Support & Helpdesk Contacts -->
      <p style="color: #64748b; font-size: 13px; margin: 0 0 6px; line-height: 1.5;">
        तत्काल सहायता या सवाल के लिए हमारी सीनियर डेस्क पर संपर्क करें:
      </p>
      <p style="color: #0f172a; font-size: 13.5px; margin: 0 0 20px; font-weight: 700;">
        📞 <a href="tel:${BRAND.phone}" style="color: #059669; text-decoration: none;">${BRAND.phone}</a> &nbsp;|&nbsp; 
        💬 <a href="https://wa.me/917900979001" style="color: #059669; text-decoration: none;">WhatsApp: ${BRAND.whatsapp}</a>
      </p>

      <!-- Signature -->
      <div style="border-top: 1px solid #e2e8f0; margin-top: 20px; padding-top: 16px;">
        <p style="color: #475569; font-size: 13px; margin: 0; line-height: 1.6;">
           सादर धन्यवाद,<br>
          <strong style="color: #0f172a; font-size: 14px;">Senior Advisory & Operations Desk</strong><br>
          <span style="color: ${accentColor}; font-weight: 800;">${BRAND.name}</span><br>
          <span style="color: #94a3b8; font-size: 11.5px;">${BRAND.address}</span>
        </p>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div style="background-color: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11.5px; color: #94a3b8;">
      © ${currentYear} ${BRAND.name}. All Rights Reserved. • Direct Banking & Institutional Channel Partner.
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * 1. ITR Filing Online Confirmation Template
 */
export function generateItrConfirmationEmail(props: LeadEmailProps): { subject: string; html: string } {
  const ref = props.refId || "ITR-" + Math.floor(100000 + Math.random() * 900000);
  const subject = `✅ ITR आवेदन प्राप्त: पावती संख्या #${ref} | Bhardwaj Financial Services`;

  const html = emailLayout({
    badgeText: "ITR FILING APPLICATION SUBMITTED",
    badgeIcon: "🧾",
    bannerTitle: "ITR Filing Confirmation",
    bannerSubtitle: "आपकी ऑनलाइन ITR फाइलिंग एप्लीकेशन सफलतापूर्वक दर्ज हो गई है",
    recipientName: props.name,
    introAlertHtml: `आपने <strong>Bhardwaj Financial Services</strong> पर <strong>Online ITR Filing (${props.specificType || "CA-Assisted"})</strong> के लिए आवेदन किया था। आपकी रिक्वेस्ट <strong>Ref #${ref}</strong> के तहत हमारे टैक्स अनुभाग में सुरक्षित रूप से दर्ज कर ली गई है।`,
    promiseTitle: "टैक्स एक्सपर्ट आपसे संपर्क करेंगे (Tax Desk Verification)",
    promiseBodyHtml: `हमारी चार्टर्ड अकाउंटेंट (CA) टीम अगले <strong>2 से 4 कार्य घंटों</strong> में आपके नंबर <strong>${props.phone || "रजिस्टर्ड नंबर"}</strong> पर संपर्क करेगी। AIS/TIS डेटा का मिलान, अधिकतम टैक्स रिफंड और बैंक लोन हेतु सटीक कंप्यूटेशन शीट तैयार करने में पूरी सहायता की जाएगी।`,
    tableTitle: "ITR APPLICATION DETAILS",
    tableRows: [
      { label: "Reference ID", value: `#${ref}`, isHighlight: true },
      { label: "Applicant Name", value: props.name },
      { label: "PAN Card Number", value: props.panNumber ? `${props.panNumber.slice(0, 5)}****${props.panNumber.slice(-1)}` : "Verified via Desk" },
      { label: "Filing Category", value: props.specificType || "Salaried / Business" },
      { label: "Annual Income Slab", value: props.income ? `₹${props.income}` : "As Declared" },
      { label: "Assessment Year", value: "AY 2025–26 (FY 2024–25)", isHighlight: true },
      { label: "Contact Phone", value: props.phone || "N/A" },
      { label: "City", value: props.city || "Agra" },
    ],
    footerNote: "✓ BFS पर ITR फाइलिंग 100% नोटिस-फ्री एवं बैंक लोन कम्प्यूटेशन शीट के साथ की जाती है।",
    accentGradient: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
    accentColor: "#0f766e",
    accentBg: "#f0fdfa",
    accentBorder: "#99f6e4",
  });

  return { subject, html };
}

/**
 * 2. MSME / Udyam Registration Confirmation Template
 */
export function generateMsmeConfirmationEmail(props: LeadEmailProps): { subject: string; html: string } {
  const ref = props.refId || "MSME-" + Math.floor(100000 + Math.random() * 900000);
  const subject = `✅ MSME उद्यम पंजीकरण आवेदन: Ref #${ref} | Bhardwaj Financial Services`;

  const html = emailLayout({
    badgeText: "MSME / UDYAM REGISTRATION INITIATED",
    badgeIcon: "📜",
    bannerTitle: "MSME Registration Confirmation",
    bannerSubtitle: "आपके उद्यम प्रमाण पत्र का आवेदन दर्ज कर लिया गया है",
    recipientName: props.name,
    introAlertHtml: `आपने <strong>Bhardwaj Financial Services</strong> पर <strong>MSME / Udyam Registration</strong> के लिए फॉर्म भरा था। आपकी एप्लीकेशन <strong>Ref #${ref}</strong> के साथ एमएसME डेस्क पर दर्ज हो गई है।`,
    promiseTitle: "उद्यम सहायता टीम द्वारा संपर्क (24-Hour Certificate Desk)",
    promiseBodyHtml: `हमारे MSME कंप्लायंस स्पेशलिस्ट अगले <strong>2 से 4 कार्य घंटों</strong> में आपके नंबर <strong>${props.phone || "रजिस्टर्ड नंबर"}</strong> पर कॉल एवं WhatsApp करेंगे। उद्यम प्रमाण पत्र जनरेशन (QR कोड सत्यापित), CGTMSE बिना गारंटी लोन पात्रता और सरकारी सब्सिडी की पूरी जानकारी दी जाएगी।`,
    tableTitle: "UDYAM REGISTRATION DETAILS",
    tableRows: [
      { label: "Application Ref", value: `#${ref}`, isHighlight: true },
      { label: "Applicant Name", value: props.name },
      { label: "Enterprise Type", value: props.employmentType || "Proprietorship / LLP / Pvt Ltd" },
      { label: "Turnover Bracket", value: props.income ? `₹${props.income}` : "Standard Category" },
      { label: "Govt Subsidies Active", value: "1% ROI Subvention + CGTMSE ₹5 Cr Loan Scheme", isHighlight: true },
      { label: "Turnaround Time", value: "24 to 48 Hours" },
      { label: "Registered Mobile", value: props.phone || "N/A" },
      { label: "City", value: props.city || "Agra" },
    ],
    footerNote: "✓ भारत सरकार MSME मंत्रालय द्वारा जारी उद्यम रजिस्ट्रेशन प्रमाण पत्र आजीवन मान्य (Lifetime Valid) होता है।",
    accentGradient: "linear-gradient(135deg, #047857 0%, #10b981 100%)",
    accentColor: "#047857",
    accentBg: "#ecfdf5",
    accentBorder: "#a7f3d0",
  });

  return { subject, html };
}

/**
 * 3. Loan & Credit Product Application Confirmation Template
 */
export function generateLoanApplicationEmail(props: LeadEmailProps): { subject: string; html: string } {
  const isAppointment = !!props.apptSlot;
  const subject = isAppointment
    ? `✅ अपॉइंटमेंट कन्फर्मेशन: आपकी एप्लीकेशन सबमिट हो गई है | Bhardwaj Financial Services`
    : `✅ एप्लीकेशन प्राप्त हुई: ${props.specificType} | Bhardwaj Financial Services`;

  const html = emailLayout({
    badgeText: isAppointment ? "APPOINTMENT CONFIRMED" : "APPLICATION SUBMITTED",
    badgeIcon: isAppointment ? "🗓️" : "🏦",
    bannerTitle: isAppointment ? "Appointment Confirmation" : "Application Received",
    bannerSubtitle: isAppointment
      ? "आपकी अपॉइंटमेंट एप्लीकेशन सफलतापूर्वक सबमिट कर दी गई है"
      : "आपकी एप्लीकेशन सफलतापूर्वक दर्ज हो गई है",
    recipientName: props.name,
    introAlertHtml: isAppointment
      ? `आपने <strong>Bhardwaj Financial Services</strong> पर <strong>${props.productCategory} (${props.specificType})</strong> के लिए अपॉइंटमेंट फॉर्म भरा था। आपकी एप्लीकेशन और स्लॉट बुकिंग सफलतापूर्वक सबमिट (दर्ज) कर दी गई है।`
      : `आपने <strong>Bhardwaj Financial Services</strong> पर <strong>${props.specificType}</strong> के लिए फॉर्म भरा था। आपकी एप्लीकेशन सफलतापूर्वक सबमिट हो गई है।`,
    promiseTitle: "हम आपसे बहुत जल्द संपर्क करेंगे (We Will Contact You Shortly)",
    promiseBodyHtml: isAppointment
      ? `हमारे सीनियर रिलेशनशिप मैनेजर आपके द्वारा चुने गए समय पर (या उससे पहले अगले <strong>2 से 4 कार्य घंटों</strong> के भीतर) आपके रजिस्टर्ड मोबाइल नंबर <strong>${props.phone}</strong> पर कॉल एवं WhatsApp के माध्यम से सीधे संपर्क करेंगे।`
      : `हमारे लोन स्पेशलिस्ट अगले <strong>2 से 4 कार्य घंटों</strong> में आपके नंबर <strong>${props.phone}</strong> पर कॉल करेंगे और न्यूनतम ब्याज दरों (Rates starting @ 7.15%*) के साथ पूरी प्रक्रिया में सहायता करेंगे।`,
    tableTitle: isAppointment ? "APPOINTMENT DETAILS (स्लॉट विवरण)" : "APPLICATION DETAILS",
    tableRows: [
      { label: "Applicant Name", value: props.name },
      { label: "Category (सेवा वर्ग)", value: props.productCategory },
      { label: "Selected Requirement", value: props.specificType, isHighlight: true },
      ...(props.apptSlot
        ? [
            { label: "Booked Slot (तारीख व समय)", value: props.apptSlot, isHighlight: true },
            { label: "Consultation Mode", value: "Priority Call / WhatsApp / Branch Desk" },
          ]
        : []),
      ...(props.loanAmount
        ? [
            {
              label: "Estimated Amount",
              value: `₹${Number(props.loanAmount).toLocaleString("en-IN")}`,
            },
          ]
        : []),
      { label: "Registered Mobile", value: props.phone || "N/A" },
      { label: "City", value: props.city || "Agra" },
    ],
    footerNote: "✓ कॉल के दौरान आपको आवश्यक दस्तावेजों, पात्रता एवं न्यूनतम ब्याज दरों की पूरी जानकारी दी जाएगी।",
    accentGradient: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
    accentColor: "#059669",
    accentBg: "#ecfdf5",
    accentBorder: "#a7f3d0",
  });

  return { subject, html };
}

/**
 * 4. Instant Callback / Quick Inquiry Confirmation Template
 */
export function generateCallbackEmail(props: CallbackEmailProps): { subject: string; html: string } {
  const subject = `✅ पूछताछ दर्ज: ${props.category} - हम आपसे बहुत जल्द संपर्क करेंगे | Bhardwaj Finance`;

  const html = emailLayout({
    badgeText: "CALLBACK INQUIRY RECEIVED",
    badgeIcon: "⚡",
    bannerTitle: "Callback Request Confirmed",
    bannerSubtitle: "आपकी कॉल-बैक पूछताछ सफलतापूर्वक दर्ज कर ली गई है",
    recipientName: props.name,
    introAlertHtml: `आपने <strong>Bhardwaj Financial Services</strong> पर <strong>${props.category} (${props.subType})</strong> के लिए संपर्क फॉर्म भरा था। आपकी प्राथमिकता कॉल-बैक रिक्वेस्ट सिस्टम में दर्ज हो चुकी है।`,
    promiseTitle: "सीनियर एडवाइजर द्वारा तुरंत कॉल (Priority Callback)",
    promiseBodyHtml: `हमारे सीनियर एडवाइजर आपके पसंदीदा स्लॉट (<strong>${props.preferredSlot || "Within 30 Mins"}</strong>) के अनुसार आपके मोबाइल नंबर <strong>${props.phone}</strong> पर कॉल एवं WhatsApp के माध्यम से सीधे संपर्क करेंगे।`,
    tableTitle: "INQUIRY SPECIFICATIONS",
    tableRows: [
      { label: "Customer Name", value: props.name },
      { label: "Phone Number", value: props.phone || "N/A" },
      { label: "Service Desk", value: props.category },
      { label: "Selected Requirement", value: props.subType, isHighlight: true },
      ...(props.amountBand ? [{ label: "Requirement Band", value: props.amountBand }] : []),
      ...(props.preferredSlot ? [{ label: "Preferred Slot", value: props.preferredSlot, isHighlight: true }] : []),
      { label: "Location", value: props.city || "Agra" },
    ],
    accentGradient: "linear-gradient(135deg, #064e3b 0%, #047857 100%)",
    accentColor: "#047857",
    accentBg: "#ecfdf5",
    accentBorder: "#a7f3d0",
  });

  return { subject, html };
}

/**
 * 5. Vigilance & Grievance Complaint Confirmation Template
 */
export function generateGrievanceEmail(props: GrievanceEmailProps): { subject: string; html: string } {
  const subject = `🛡️ शिकायत दर्ज (Ticket #${props.ticketId}) | Bhardwaj Financial Services Vigilance`;

  const html = emailLayout({
    badgeText: `GRIEVANCE REGISTERED #${props.ticketId}`,
    badgeIcon: "🛡️",
    bannerTitle: "Grievance Complaint Registered",
    bannerSubtitle: `आपकी शिकायत दर्ज कर ली गई है (Ticket #${props.ticketId})`,
    recipientName: props.name,
    introAlertHtml: `आपने <strong>Bhardwaj Financial Services</strong> पर शिकायत/ग्रीवेंस फॉर्म भरा था। आपकी शिकायत हमारे विजिलेंस डेस्क पर <strong>Ticket #${props.ticketId}</strong> के तहत सफलतापूर्वक दर्ज कर ली गई है।`,
    promiseTitle: "कड़ी जांच एवं समाधान (Strict 24-48h Review)",
    promiseBodyHtml: `हमारी सीनियर ग्रीवेंस रिड्रेसल टीम अगले <strong>24 से 48 कार्य घंटों</strong> के भीतर निष्पक्ष जांच शुरू करेगी और आपके रजिस्टर्ड ईमेल/फोन पर सीधा संपर्क करके समाधान प्रदान करेगी।`,
    tableTitle: "GRIEVANCE DETAILS",
    tableRows: [
      { label: "Ticket ID", value: `#GRV-${props.ticketId}`, isHighlight: true },
      { label: "Regarding (व्यक्ति / विभाग)", value: props.targetName },
      { label: "Complaint Subject", value: props.subject },
      { label: "Summary", value: props.description },
      { label: "Status", value: "Under Strict Investigation", isHighlight: true },
    ],
    accentGradient: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
    accentColor: "#dc2626",
    accentBg: "#fef2f2",
    accentBorder: "#fecdd3",
  });

  return { subject, html };
}

/**
 * 6. Career / Job Application Confirmation Template
 */
export function generateJobApplicationEmail(props: JobApplicationEmailProps): { subject: string; html: string } {
  const subject = `💼 Application Received: ${props.jobTitle} | Bhardwaj Financial Services`;

  const html = emailLayout({
    badgeText: "CAREER APPLICATION RECEIVED",
    badgeIcon: "💼",
    bannerTitle: "Job Application Submitted",
    bannerSubtitle: "आपका जॉब आवेदन सफलतापूर्वक दर्ज कर लिया गया है",
    recipientName: props.name,
    introAlertHtml: `Thank you for applying for the position of <strong>${props.jobTitle}</strong> at <strong>Bhardwaj Financial Services</strong>. Your resume and credentials have been routed to our Human Resources Department.`,
    promiseTitle: "HR Screening Process",
    promiseBodyHtml: `Our talent acquisition team will review your qualifications and experience. If your profile matches our active requirements, our HR coordinator will contact you on <strong>${props.phone || "your phone"}</strong> within <strong>3 to 5 business days</strong> for an interview discussion.`,
    tableTitle: "APPLICATION SUMMARY",
    tableRows: [
      { label: "Candidate Name", value: props.name },
      { label: "Applied Position", value: props.jobTitle, isHighlight: true },
      { label: "Experience Level", value: props.experience || "Fresh / Experienced" },
      { label: "Location", value: props.city || "Agra" },
      { label: "Phone", value: props.phone || "N/A" },
    ],
    accentGradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    accentColor: "#059669",
    accentBg: "#f8fafc",
    accentBorder: "#cbd5e1",
  });

  return { subject, html };
}