// =========================================================
// BFS Intelligent Document Underwriting Engine
// Automatically extracts User Profile + Product from Natural Language
// and generates a precise, personalized document checklist.
// Zero competitor bank names - 100% BFS proprietary guidelines.
// =========================================================

export interface DocumentChecklistResult {
  title: string;
  profileName: string;
  productName: string;
  summaryText: string;
  html: string;
  options: string[];
}

export function parseDocumentQuery(text: string): DocumentChecklistResult {
  const lower = text.toLowerCase();

  // 1. Detect Employment / Profile
  let empProfile: "salaried_bank" | "salaried_cash" | "business_gst" | "business_small" | "professional" | "unknown" = "unknown";
  let empLabel = "";

  if (lower.match(/cash salary|rokad|hath me salary|cash milti|salary in cash/)) {
    empProfile = "salaried_cash";
    empLabel = "Salaried (Cash / Non-Banking Salary)";
  } else if (lower.match(/doctor|dr\b|mbbs|ca\b|chartered accountant|advocate|lawyer|architect/)) {
    empProfile = "professional";
    empLabel = "Self-Employed Professional (Doctor / CA / Legal / Technical)";
  } else if (lower.match(/gst|turnover|pvt ltd|private limited|limited firm|large business|wholesaler|manufacturer/)) {
    empProfile = "business_gst";
    empLabel = "Self-Employed (GST Registered / Firm / Company)";
  } else if (lower.match(/dukaan|dukan|shop|kirana|retail|store|vyapar|vyapari|small business|chota business|apna kaam|msme|udyam|trader/)) {
    empProfile = "business_small";
    empLabel = "Self-Employed (Dukaan / Kirana / MSME / Trader)";
  } else if (lower.match(/salaried|naukri|job|service|pvt ltd employee|mnc|govt|sarkari|salary/)) {
    empProfile = "salaried_bank";
    empLabel = "Salaried (Job - Govt / Private / MNC)";
  }

  // 2. Detect Product / Loan Type
  let product: "home_loan" | "business_loan" | "personal_loan" | "lap" | "balance_transfer" | "health_insurance" | "term_insurance" | "motor_insurance" | "credit_card" | "general" = "general";
  let productLabel = "";

  if (lower.match(/home loan|ghar ka loan|makan|flat|plot|construction|renovation/)) {
    product = "home_loan";
    productLabel = "Home Loan (घर / फ्लैट ऋण)";
  } else if (lower.match(/business loan|vyapar loan|msme loan|dukaan ka loan|working capital/)) {
    product = "business_loan";
    productLabel = "Business Loan (व्यापार ऋण - Unsecured)";
  } else if (lower.match(/personal loan|salary loan|instant cash|emergency fund/)) {
    product = "personal_loan";
    productLabel = "Personal Loan (व्यक्तिगत ऋण)";
  } else if (lower.match(/lap\b|loan against property|property par loan|mortgage|property loan/)) {
    product = "lap";
    productLabel = "Loan Against Property - LAP (प्रॉपर्टी पर लोन)";
  } else if (lower.match(/balance transfer|bt\b|loan shift|purana loan transfer/)) {
    product = "balance_transfer";
    productLabel = "Balance Transfer + Top-Up (मौजूदा लोन ट्रांसफर)";
  } else if (lower.match(/health insurance|mediclaim|medical insurance|bima|hospital/)) {
    product = "health_insurance";
    productLabel = "Health Insurance (मेडिक्लेम / स्वास्थ्य बीमा)";
  } else if (lower.match(/term life|term insurance|life insurance|jeevan bima/)) {
    product = "term_insurance";
    productLabel = "Term Life Insurance (जीवन सुरक्षा बीमा)";
  } else if (lower.match(/motor insurance|car insurance|bike insurance|gadi ka bima|vehicle/)) {
    product = "motor_insurance";
    productLabel = "Motor Insurance (कार / बाइक बीमा)";
  } else if (lower.match(/credit card|card|cc\b|lifetime free card|lounge card/)) {
    product = "credit_card";
    productLabel = "Credit Card (क्रेडिट कार्ड)";
  }

  if (product === "general") productLabel = "All Finance & Loans (सामान्य सूची)";
  if (empProfile === "unknown") empLabel = "General Applicant (Salaried & Business Both)";

  // 3. Construct Personalized Document Categories
  const kycDocs = [
    "✅ **PAN Card**: Borrower aur Co-Applicant dono ka (CIBIL & tax verification ke liye).",
    "✅ **Aadhar Card**: Address & Identity proof (Mobile linked for instant digital KYC).",
    "✅ **2 Passport Size Photos**: Borrower aur Co-Applicant dono ki.",
    "✅ **Current Residence Proof**: Latest Bijli Bill, Water Bill ya Valid Rent Agreement."
  ];

  const incomeDocs: string[] = [];
  if (empProfile === "salaried_bank") {
    incomeDocs.push("✅ **Last 3 Months Salary Slips**: Authorized company stamp/digital sign ke sath.");
    incomeDocs.push("✅ **Last 6 Months Bank Statement**: Salary account ka net in-hand salary credits reflect karta hua.");
    incomeDocs.push("✅ **Form 16 (Last 2 Years) ya ITR**: Income tax proof ke roop me.");
    incomeDocs.push("✅ **Employee ID Card / Appointment Letter**: Current employment status verification ke liye.");
  } else if (empProfile === "salaried_cash") {
    incomeDocs.push("✅ **Salary Certificate**: Employer ke official letterhead par monthly salary & designation mention.");
    incomeDocs.push("✅ **Monthly Cash Vouchers / Attendance Register Copy**: Last 6 months ka.");
    incomeDocs.push("✅ **Last 6 Months Savings Bank Statement**: Jo bhi account aap use karte hain.");
    incomeDocs.push("💡 *BFS Note*: Cash salary profiles ko **BFS Special Priority Pool** ke tahat process kiya jata hai!");
  } else if (empProfile === "business_gst") {
    incomeDocs.push("✅ **Last 2-3 Years ITR**: CA-Audited Computation of Income, Balance Sheet & Profit & Loss Statement.");
    incomeDocs.push("✅ **Last 12 Months GST Returns (GSTR-3B)**: Business turnover validation ke liye.");
    incomeDocs.push("✅ **Last 12 Months Current Account Bank Statement**: Firm/Company account ki banking track.");
    incomeDocs.push("✅ **Business Registration**: GST Certificate, Partnership Deed / MOA-AOA, PAN of Entity.");
  } else if (empProfile === "business_small") {
    incomeDocs.push("✅ **Business Proof**: Udyam/MSME Registration Certificate ya Shop Act (Gumasta) License.");
    incomeDocs.push("✅ **Last 12 Months Bank Statement**: Savings ya Current account ka pura statement.");
    incomeDocs.push("✅ **Last 2 Years ITR** (Agar available ho, na hone par banking track basis par approval).");
    incomeDocs.push("✅ **Shop Photographs & Kachha Khata**: Dukaan ke board/stock ke photo aur daily sales register.");
  } else if (empProfile === "professional") {
    incomeDocs.push("✅ **Professional Degree & Registration**: MBBS, MD, CA Membership Certificate, ya Bar Council ID.");
    incomeDocs.push("✅ **Certificate of Practice (COP)**: Professional practice proof.");
    incomeDocs.push("✅ **Last 2 Years ITR**: Computation of Income & Balance Sheet ke sath.");
    incomeDocs.push("✅ **Last 12 Months Bank Statement**: Clinic/Office account ka.");
  } else {
    incomeDocs.push("🔹 **Agar aap Salaried (Job) hain:**");
    incomeDocs.push("  • Last 3 Months Salary Slips");
    incomeDocs.push("  • Last 6 Months Bank Statement (Salary Account)");
    incomeDocs.push("  • Form 16 / Last 2 Years ITR");
    incomeDocs.push("🔹 **Agar aapka Apna Business / Dukaan hai:**");
    incomeDocs.push("  • Last 2-3 Years ITR with Computation Sheet");
    incomeDocs.push("  • Last 12 Months Current/Savings Bank Statement");
    incomeDocs.push("  • Business Proof: GST Certificate, Udyam (MSME), ya Shop Act");
  }

  const productDocs: string[] = [];
  if (product === "home_loan") {
    if (lower.match(/plot|construction/)) {
      productDocs.push("✅ **Plot Registry / Title Deed**: Plot ki registered sale deed.");
      productDocs.push("✅ **Construction Estimate**: Certified Architect/Civil Engineer se construction cost estimate.");
      productDocs.push("✅ **Approved Construction Map**: Nagar Nigam ya Development Authority se approved naksha.");
    } else {
      productDocs.push("✅ **Property Agreement to Sale (ATS)**: Seller ke sath bayana/token agreement.");
      productDocs.push("✅ **Previous Chain Registries**: Pichle 13 se 30 saal ki registry chain documents.");
      productDocs.push("✅ **Approved Map / Sanction Plan**: Nagar Nigam ya Competent Authority se pass naksha.");
      productDocs.push("✅ **Latest Property Tax Receipt**: Nagar Nigam house tax slip.");
    }
  } else if (product === "business_loan") {
    productDocs.push("🎉 **Bina Collateral (Girvi) Ke:** Business Loan ke liye kisi bhi property ke paper ki zaroorat nahi!");
    productDocs.push("✅ **Minimum 1-2 Saal Vintage Proof**: Dukaan/vyapar purana hone ka proof (MSME/GST/Rent Agreement).");
    productDocs.push("✅ **Business Ownership Proof**: Dukaan ki ownership slip ya rent agreement.");
  } else if (product === "personal_loan") {
    productDocs.push("⚡ **Minimal Documentation:** Kisi property, guarantor ya collateral ki zaroorat nahi hoti.");
    productDocs.push("✅ **Salary Account Banking**: Sirf salary credit proof aur KYC se instant sanction!");
  } else if (product === "lap") {
    productDocs.push("✅ **Original Property Title Deed**: Residential, Commercial ya Industrial property ki mool registry.");
    productDocs.push("✅ **Complete 13-30 Years Chain**: Property ki purani chain registries.");
    productDocs.push("✅ **Approved Map & Khatauni / Khasra**: Zameen/makan ka revenue record aur naksha.");
    productDocs.push("✅ **No Encumbrance Certificate (EC)**: Property par koi purana bakaaya na hone ka certificate.");
  } else if (product === "balance_transfer") {
    productDocs.push("✅ **Existing Loan Sanction Letter**: Purane lender ka original sanction letter.");
    productDocs.push("✅ **Last 12 Months Loan Statement**: Purane loan ki sabhi EMIs clear hone ka track record.");
    productDocs.push("✅ **List of Documents (LOD)**: Maujooda bank se milne wali documents ki list.");
    productDocs.push("✅ **Foreclosure / Outstanding Principal Letter**: Loan close karne ke liye amount letter.");
  } else if (product === "health_insurance") {
    productDocs.push("✅ **Family KYC**: Sabhi insured members ke Aadhar Card.");
    productDocs.push("✅ **Medical Records** (Sirf agar pehle se koi critical bimari/surgery hui ho, otherwise no medical report).");
    productDocs.push("❌ **No Income Proof Required**: Mediclaim ke liye koi salary slip ya ITR zaroori nahi!");
  } else if (product === "term_insurance") {
    productDocs.push("✅ **Income Validation**: Form 16 / Salary Slips (Salaried) ya 2 Years ITR (Business) cover limit set karne ke liye.");
    productDocs.push("✅ **Free Doorstep Health Checkup**: BFS partner lab dwara free routine test (agar requirement ho).");
  } else if (product === "motor_insurance") {
    productDocs.push("✅ **Vehicle RC**: Gadi ka Registration Certificate copy.");
    productDocs.push("✅ **Purani Policy Copy**: No Claim Bonus (NCB) discount transfer ke liye.");
  } else if (product === "credit_card") {
    productDocs.push("✅ **Income Proof**: 1 Month Salary Slip (Salaried) ya 1 Year ITR (Self-Employed).");
    productDocs.push("💡 *Low CIBIL Option*: Fixed Deposit (FD) backed card ke liye **Zero Income Proof** required!");
  }

  // Generate HTML Card
  const html = `
<div class="mt-2.5 bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white border border-emerald-200 rounded-2xl p-4 text-slate-800 shadow-sm font-sans">
  <div class="flex items-center justify-between border-b border-emerald-100 pb-2.5 mb-3">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
        📄
      </div>
      <div>
        <h4 class="font-bold text-emerald-900 text-[13.5px] leading-tight">Document Checklist: ${productLabel}</h4>
        <p class="text-[11px] text-emerald-700 font-medium">Aapki Profile: <strong>${empLabel}</strong></p>
      </div>
    </div>
    <span class="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
      BFS Verified
    </span>
  </div>

  <div class="space-y-3 text-[12.5px] leading-relaxed">
    <div>
      <h5 class="font-bold text-slate-900 text-[12px] uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
        <span>1️⃣ Identity & Residence Proof (KYC)</span>
      </h5>
      <ul class="space-y-1 text-slate-700 ml-1">
        ${kycDocs.map(d => `<li>${d}</li>`).join("")}
      </ul>
    </div>

    <div>
      <h5 class="font-bold text-slate-900 text-[12px] uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
        <span>2️⃣ Income & Financial Eligibility Proof (${empLabel})</span>
      </h5>
      <ul class="space-y-1 text-slate-700 ml-1">
        ${incomeDocs.map(d => `<li>${d}</li>`).join("")}
      </ul>
    </div>

    ${productDocs.length > 0 ? `
    <div>
      <h5 class="font-bold text-slate-900 text-[12px] uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
        <span>3️⃣ Product / Property Specific Papers (${productLabel})</span>
      </h5>
      <ul class="space-y-1 text-slate-700 ml-1">
        ${productDocs.map(d => `<li>${d}</li>`).join("")}
      </ul>
    </div>
    ` : ""}
  </div>

  <div class="mt-3.5 pt-2.5 border-t border-emerald-100 flex flex-wrap items-center justify-between gap-2">
    <span class="text-[11px] text-slate-500 font-medium">Ye documents taiyar hain ya guidance chahiye?</span>
    <div class="flex items-center gap-2">
      <a href="/apply?product=${product === 'general' ? 'finance' : product.replace('_', '-')}" class="text-[11px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg transition shadow-xs">
        Apply Online 📝
      </a>
      <a href="https://wa.me/917900979001?text=${encodeURIComponent(`Namaste BFS Team, mujhe ${productLabel} (${empLabel}) ke documents verify karwane hain.`)}" target="_blank" class="text-[11px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-3 py-1.5 rounded-lg transition shadow-xs">
        WhatsApp Desk 💬
      </a>
    </div>
  </div>
</div>
`;

  const summaryText = `Aapki profile (**${empLabel}**) aur requirement (**${productLabel}**) ke anusaar zaroori documents ki poori list neeche di gayi hai:`;

  let options: string[] = [];
  if (product === "home_loan") {
    options = ["Apply Online 📝", "Check Eligibility 🔢", "WhatsApp Executive 💬", "Start Over 🔄"];
  } else if (product === "business_loan") {
    options = ["Apply Business Loan 📝", "Check Eligibility 🔢", "WhatsApp Executive 💬", "Start Over 🔄"];
  } else if (product === "personal_loan") {
    options = ["Apply Personal Loan 📝", "Check Eligibility 🔢", "WhatsApp Executive 💬", "Start Over 🔄"];
  } else if (product === "lap") {
    options = ["Apply for LAP 📝", "Check Eligibility 🔢", "WhatsApp Executive 💬", "Start Over 🔄"];
  } else if (product === "balance_transfer") {
    options = ["Transfer Loan 🔄", "Check Eligibility 🔢", "WhatsApp Executive 💬", "Start Over 🔄"];
  } else {
    options = ["Home Loan Documents 🏠", "Business Loan Documents 💼", "Personal Loan Documents 👤", "WhatsApp Executive 💬"];
  }

  return {
    title: `Documents for ${productLabel}`,
    profileName: empLabel,
    productName: productLabel,
    summaryText,
    html,
    options
  };
}
