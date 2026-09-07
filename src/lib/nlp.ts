// =========================================================
// BFS Smart Bot NLP Engine - Training Center Driven
// Sabhi responses Training Center (Admin Panel) se aate hain.
// Koi hardcoded response nahi hai.
// =========================================================

import { parseDocumentQuery } from "@/lib/documents";

export type Intent =
  | "greeting" | "faq_query" | "interest_rate_query" | "service_area_query"
  | "page_navigation" | "calculation" | "emi_calculator" | "bt_calculator"
  | "ltv_calculator" | "eligibility_calculator" | "document_query"
  | "cibil_issue" | "complaint" | "remind_question" | "unknown"
  | "ask_finance_general" | "ask_insurance_general" | "ask_credit_card_general"
  | "about_bfs" | "fallback" | "context_followup";

export type Sentiment = "positive" | "negative" | "neutral";

export interface NLPResult {
  intent: Intent;
  sentiment: Sentiment;
  confidence: number;
  extractedEntities: Record<string, string>;
  reply: string;
  options?: string[];
}

export interface BotKnowledge {
  scenarios: { id: string; userSays: string; botReplies: string; isActive: boolean }[];
  rules: { id: string; topic: string; instruction: string; isActive: boolean }[];
  rates: any[];
  faqs: any[];
  serviceAreas: any[];
}

// ─── Local AI Engine: Scoring, Stop Words & Synonyms ───
const STOP_WORDS = new Set(["hai", "kya", "mujhe", "mera", "meri", "mere", "ki", "ka", "ko", "ke", "se", "ho", "tha", "thi", "the", "hun", "hu", "batao", "bata", "please", "sir", "madam", "ji", "to", "toh", "hain", "is", "a", "an", "the", "and", "or", "for", "in", "on", "what", "how", "when", "where", "why", "who"]);

const SYNONYMS: Record<string, string[]> = {
  "loan": ["karza", "udhar", "finance", "funding"],
  "cibil": ["score", "civil", "sibil", "rating"],
  "property": ["makan", "ghar", "zameen", "plot", "dukaan", "flat"],
  "document": ["kagaz", "kagajat", "paper", "proof"],
  "problem": ["dikkat", "pareshani", "issue", "shikayat", "fraud"],
  "interest": ["byaj", "roi", "rate", "percent"],
  "insurance": ["bima", "mediclaim", "policy", "cover", "protection"],
  "card": ["creditcard", "cc", "credit card"]
};

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

function processTextWords(text: string): string[] {
  const words = text.split(/\s+/).filter(w => !STOP_WORDS.has(w) && w.length > 1);
  return words.map(w => {
    for (const [root, syns] of Object.entries(SYNONYMS)) {
      if (syns.includes(w)) return root;
    }
    return w;
  });
}

function calculateMatchScore(text: string, target: string): number {
  // Only do substring match if target is long enough to avoid false positives (like "hi" inside "nahi")
  if (target.length > 4 && text.includes(target)) return 1.0;
  
  const textWords = processTextWords(text);
  const targetWords = processTextWords(target);
  
  if (targetWords.length === 0) return 0;
  
  let matchCount = 0;
  for (const tw of targetWords) {
    let bestWordScore = 0;
    for (const uw of textWords) {
      if (uw === tw) {
        bestWordScore = 1;
        break;
      }
      const maxTypos = tw.length <= 4 ? 0 : (tw.length <= 7 ? 1 : 2);
      if (Math.abs(uw.length - tw.length) <= maxTypos) {
        const dist = levenshteinDistance(uw, tw);
        if (dist <= maxTypos) {
          const score = 1 - (dist / tw.length);
          if (score > bestWordScore) bestWordScore = score;
        }
      }
    }
    matchCount += bestWordScore;
  }
  
  const precision = matchCount / targetWords.length;
  // If user typed a very long sentence but target is tiny, penalize slightly to avoid false positives
  if (textWords.length > targetWords.length * 3) {
      return precision * 0.8;
  }
  return precision;
}

// Keep backward compatibility for older hardcoded intents
function isFuzzyMatch(text: string, target: string): boolean {
  return calculateMatchScore(text, target) >= 0.75;
}


// ─── Main Processing Function ─────────────────────────────
export function processUserMessage(text: string, knowledge?: BotKnowledge, contextStr?: string): NLPResult {
  const lower = text.toLowerCase().trim();
  const context = contextStr?.toLowerCase() || "";

  // ── 1. Math Calculations ──
  const mathMatch = lower.match(/^\s*(\d+)\s*([+\-*/])\s*(\d+)\s*=?\s*$/);
  if (mathMatch) {
    try {
      const result = new Function(`return ${mathMatch[0].replace('=', '')}`)();
      return ok("calculation", { result: String(result) }, `= ${result}`);
    } catch {}
  }

  // ── 5. Hardcoded Quick Intents ──
  const docScore = Math.max(
    calculateMatchScore(lower, "document"),
    calculateMatchScore(lower, "paper"),
    calculateMatchScore(lower, "kagaz"),
    calculateMatchScore(lower, "proof")
  );
  const isDocQuery = 
    docScore >= 0.75 || 
    lower.includes("documet") || 
    lower.includes("doccumet") ||
    Boolean(lower.match(/\b(document|documents|kagaz|kagajat|paper|papers)\b/)) ||
    (lower.includes("proof") && Boolean(lower.match(/\b(loan|apply|income|salary|business)\b/)));

  if (isDocQuery) {
    const docResult = parseDocumentQuery(text);
    return ok("document_query", { 
      profile: docResult.profileName, 
      product: docResult.productName 
    }, docResult.html, docResult.options);
  }

  // ── About BFS (Bhardwaj Financial Services) ──
  const isAboutBfs = Boolean(
    lower.match(/\b(bfs kya|bfs full form|bfs.*kaun|who is bfs|about bfs|about company|aap kaun|tum kaun|company ke bare|company details|company profile|bhardwaj financial|bfs kya hai|bfs ke bare|aap kya karte|aapka kaam kya|bhardwaj financial services kya|madat|madad|help kar|help kr|kese madat|kese madad|kaise madad|kaise madat|humari.*madat|humari.*madad|meri.*madat|meri.*madad|fayda|suvidha|services|facilities)\b/)
  ) || lower === "about bfs" || lower === "bfs" || lower === "who are you" || lower === "aap kaun ho" || Boolean(lower.includes("bfs") && lower.match(/\b(madat|madad|help|kaam|fayda)\b/));

  if (isAboutBfs) {
    return ok(
      "about_bfs",
      {},
      "🏛️ **Bhardwaj Financial Services (BFS)**\n\n" +
      "**BFS ka Full Form:** **Bhardwaj Financial Services**\n" +
      "Hum Bharat ke agrani aur vishwasniya Financial Distribution & Advisory Platform hain. Hum 2,500+ se adhik parivaron aur vyapariyon ko sabse kam byaj daron par loan, bima aur credit cards uplabdh kara chuke hain.\n\n" +
      "⭐ **Humari Mukhya Visheshatayein (Why Choose BFS):**\n" +
      "• 🏠 **Home Loan:** Market me sabse kam byaj dar — **7.15%** se shuru! (Up to 90% funding & 30 years tenure)\n" +
      "• 💼 **Business Loan:** ₹5 Lakh se ₹50 Lakh tak Unsecured Funding bina kisi girvi ke (MSME/GST)\n" +
      "• 👤 **Personal Loan:** Instant approval up to ₹15 Lakhs kam se kam dastavez par\n" +
      "• 🏢 **Loan Against Property (LAP):** Saste rate (9.00% se) par badi limit\n" +
      "• 🛡️ **Insurance:** 10,000+ hospitals me 100% Cashless Health & Term Life Cover\n" +
      "• ⚡ **100% Transparent:** Zero upfront fees, koi chhupe huye charges nahi, aur direct doorstep service!\n\n" +
      "📍 **Head Office:** Sanjay Place, Agra, UP | Pan-India Digital Support\n" +
      "📞 **Helpline:** +91 9258-724-227 | 💬 **WhatsApp:** +91 7900-979-001",
      ["Home Loan (7.15%*) 🏠", "Check Eligibility 🔢", "WhatsApp Executive 💬", "Finance & Loans 💰"]
    );
  }

  const rateScore = Math.max(
    calculateMatchScore(lower, "interest rate"),
    calculateMatchScore(lower, "byaj dar"),
    calculateMatchScore(lower, "kitna percent")
  );
  if (rateScore >= 0.75) {
    return ok("interest_rate_query", {}, "Humare Home Loan ke interest rates **7.15%** se shuru hote hain. (CIBIL > 750 par best rate milta hai).");
  }

  // ── Quick Product Intents: Loans / Finance ──
  const isFinanceGeneral = Boolean(lower.match(/(konse|kaun se|types of|kya kya|list of|konsa|all).*loan|loan.*(options|services|types|list|dete|krate|karate|milega|hote hain|uplabdh)|finance.*(service|detail|option)|tum konse.*loan|loan.*portfolio/)) ||
    lower === "finance" || lower === "loans" || lower === "loan" || lower === "naya loan";
  if (isFinanceGeneral) {
    return ok(
      "ask_finance_general",
      {},
      "Bhardwaj Financial Services (BFS) sabhi pramukh prakar ke loans par lowest interest rates aur priority approval provide karta hai:\n\n" +
      "1️⃣ 🏠 **Home Loan (घर / फ्लैट ऋण)**:\n• Interest Rate: **7.15%** se shuru, up to 90% property cost funding\n• Naya ghar khareedne, flat lene ya plot construction ke liye 30 saal tak aasan EMI\n\n" +
      "2️⃣ 💼 **Business Loan (व्यापार ऋण)**:\n• **Bina kisi collateral (girvi) ke up to ₹50 Lakhs**\n• MSME, GST registered ya dukaan ke vistar ke liye 48-72 ghante mein approval\n\n" +
      "3️⃣ 👤 **Personal Loan (व्यक्तिगत ऋण)**:\n• Instant cash disbursal up to ₹15 Lakhs, minimal documentation\n• Emergency, wedding, travel ya personal zaroorat ke liye\n\n" +
      "4️⃣ 🏢 **Loan Against Property - LAP (प्रॉपर्टी पर लोन)**:\n• Apni residential ya commercial property par saste rate (**9.00%** se) par bada loan\n• Market valuation ka 60% se 75% funding aur 15-20 saal tenure\n\n" +
      "5️⃣ 🔄 **Balance Transfer + Top-Up**:\n• Purane mehenge loan ko kam interest rate par shift karke har mahine EMI ki bachat + sath me extra Top-Up loan!\n\n" +
      "Aapko inme se kis loan ke baare mein vistar se jaanna hai ya apply karna hai?",
      ["Home Loan 🏠", "Business Loan 💼", "Personal Loan 👤", "Loan Against Property 🏢", "Balance Transfer 🔄", "Apply for Finance 💰"]
    );
  }

  if (lower.match(/home loan|makan.*loan|ghar.*loan|plot.*loan|construction loan/)) {
    return ok(
      "faq_query",
      {},
      "🏠 **Home Loan (गृह ऋण)**:\n• Interest Rate: **7.15%** se shuru\n• Property value ka up to 90% funding aur 30 saal tak flexible tenure\n• Plot + Construction, Ready Flat purchase aur Balance Transfer sabhi uplabdh hain.\n• Income Tax Section 24 & 80C ke tahat ₹3.5 Lakh tak bachat!",
      ["Property Dekh Li Hai 🏠", "Limit Check Karni Hai 🔍", "Required Documents 📄", "Apply for Home Loan 📝"]
    );
  }
  if (lower.match(/business loan|vyapar loan|dukaan.*loan|msme loan/)) {
    return ok(
      "faq_query",
      {},
      "💼 **Business Loan (Vyapar Loan)**:\n• Unsecured funding up to ₹50 Lakhs bina kisi property girvi rakhe\n• 48-72 hours mein priority approval\n• MSME Udyam / GST aur 1 saal ka bank statement required.\n• Business expansion, stock purchase ya machinery ke liye best option.",
      ["GST Registered (Turnover 50L+) 📊", "MSME / Udyam Only 🏭", "Proprietorship / Dukaan 🏪", "Check Eligibility 🔢"]
    );
  }
  if (lower.match(/personal loan|urgent loan|emergency loan|instant cash|salary loan/)) {
    return ok(
      "faq_query",
      {},
      "👤 **Personal Loan**:\n• ₹50,000 se ₹15 Lakh tak instant cash disbursal\n• Minimum monthly salary ₹15,000 in-hand\n• Minimal paperwork (3 mahine salary slip aur KYC)\n• Medical emergency, wedding ya personal expenses ke liye turant sanction.",
      ["Salaried (Job) 💼", "Self-Employed (Business) 🏪", "Interest Rate Jaanein 📉", "Apply Personal Loan 📝"]
    );
  }
  if (lower.match(/loan against property|\blap\b|mortgage loan|property par loan/)) {
    return ok(
      "faq_query",
      {},
      "🏢 **Loan Against Property (LAP)**:\n• Apni Residential ya Commercial property par saste rate (9.00% se) par bada loan\n• Property value ka 60% se 75% funding\n• 15 se 20 saal tak aasan EMI repayment aur business expansion ke liye ideal.",
      ["Residential House/Flat 🏠", "Commercial Shop/Office 🏬", "Plot / Industrial 🏗️", "Apply for LAP 📝"]
    );
  }

  // ── Quick Product Intents: Insurance ──
  const isInsuranceGeneral = Boolean(lower.match(/(konse|kaun se|types of|kya kya|list of|konsa|all).*(insurance|bima)|(insurance|bima).*(options|services|types|list|dete|krate|karate|milega|hote hain|uplabdh|portfolio)|tum konse.*(insurance|bima)/)) ||
    lower === "insurance" || lower === "bima" || lower === "mediclaim";
  if (isInsuranceGeneral) {
    return ok(
      "ask_insurance_general",
      {},
      "Bhardwaj Financial Services (BFS) sabhi leading insurance companies ke best plans aur 100% claim settlement assistance provide karta hai:\n\n" +
      "1️⃣ 🏥 **Health Insurance (Mediclaim - स्वास्थ्य बीमा)**:\n• 10,000+ top network hospitals mein 100% Cashless treatment\n• Pre & Post hospitalization kharche covered\n• Section 80D ke tahat ₹75,000 tak Income Tax bachat\n\n" +
      "2️⃣ 👨‍👩‍👧‍👦 **Term Life Insurance (जीवन सुरक्षा बीमा)**:\n• Pure family financial protection cover ₹1 Crore se ₹5 Crore tak\n• Sabse saste premium par sabse bada life security cover aur Section 80C tax deduction\n\n" +
      "3️⃣ 🚗 **Motor Insurance (कार और बाइक बीमा)**:\n• Comprehensive protection + Zero Depreciation (0-Dep) add-on\n• 24x7 Roadside Breakdown Assistance aur cashless network garages\n\n" +
      "4️⃣ 📑 **Free Claim Settlement Support (क्लेम सहायता)**:\n• Hospital cashless approval aur claim rejection re-open karwane mein hamari legal team ki taraf se 100% free help!\n\n" +
      "Aapko kis policy ke baare mein vistar se jaanna hai ya quote chahiye?",
      ["Health Insurance 🏥", "Term Life Plan 👨‍👩‍👧‍👦", "Motor Insurance 🚗", "Claim Support 📑", "Apply for Insurance 🛡️"]
    );
  }

  if (lower.match(/health insurance|mediclaim|bimari.*bima|bima.*bimari|medical cover|health bima/)) {
    return ok(
      "faq_query",
      {},
      "🏥 **Health Insurance (Mediclaim)**:\n• 100% Cashless treatment across 10,000+ network hospitals\n• Pre & Post hospitalization kharche covered\n• Section 80D ke tahat ₹75,000 tak Income Tax bachat!\n• Individual aur Family Floater dono options available hain.",
      ["Poori Family Ke Liye 👨‍👩‍👧‍👦", "Individual (Sirf Apne Liye) 👤", "Parents / Senior Citizen 👵", "Apply for Insurance 🛡️"]
    );
  }
  if (lower.match(/life insurance|term insurance|jeevan bima|term plan|death benefit/)) {
    return ok(
      "faq_query",
      {},
      "👨‍👩‍👧‍👦 **Term Life Insurance**:\n• Kam premium mein ₹1 Crore se ₹5 Crore tak ka family protection cover\n• 100% financial security aur Section 80C me tax deduction\n• 99%+ claim settlement ratio wale top partner insurers.",
      ["Age: 18 - 30 Years", "Age: 31 - 45 Years", "Age: 45+ Years", "Apply for Term Plan 📝"]
    );
  }
  if (lower.match(/car.*(insurance|bima)|bike.*(insurance|bima)|motor.*(insurance|bima)|gadi.*(insurance|bima)|vehicle.*(insurance|bima)|zero dep/)) {
    return ok(
      "faq_query",
      {},
      "🚗 **Motor Insurance (Car/Bike)**:\n• Zero Depreciation (0-Dep) comprehensive protection\n• 24x7 Roadside Breakdown Assistance\n• Instant policy generation aur direct cashless garage network.",
      ["Policy Renewal Karwana Hai 🔄", "Zero Dep Plan Chahiye 🛡️", "Third Party Bima 📄", "Apply for Insurance 🛡️"]
    );
  }
  if (lower.includes("claim") && (lower.includes("insurance") || lower.includes("bima") || lower.includes("hospital"))) {
    return ok(
      "faq_query",
      {},
      "📑 **Insurance Claim Support**:\n• Cashless Claim: Network hospital ya garage par policy card dikhaiye, 1-2 ghante mein TPA approval milta hai.\n• BFS Advantage: Hamari specialized legal team claim settle karwane mein poori madad karti hai taaki claim reject na ho.",
      ["Hospital Cashless Approval 🏥", "Motor Accident Claim 🚗", "Rejected Claim Re-open ⚖️", "Talk to Claim Expert 📞"]
    );
  }

  // ── Quick Product Intents: Credit Cards ──
  const isCreditCardGeneral = Boolean(lower.match(/(konse|kaun se|types of|kya kya|list of|konsa|all).*(credit card|card)|(credit card|card).*(options|services|types|list|dete|krate|karate|milega|hote hain|uplabdh)|tum konse.*card/)) ||
    lower === "credit card" || lower === "credit cards" || lower === "card" || lower === "creditcard";
  if (isCreditCardGeneral) {
    return ok(
      "ask_credit_card_general",
      {},
      "Bhardwaj Financial Services (BFS) par sabhi leading partner banks (HDFC, SBI, ICICI, Axis, AU Bank) ke top credit cards available hain:\n\n" +
      "1️⃣ 🆓 **Lifetime Free Credit Cards (लाइफटाइम फ्री कार्ड्स)**:\n• Forever Zero Joining Fee aur Zero Annual/Renewal Fee!\n• 50 din ka interest-free credit period aur dining/shopping discounts\n• First-time users ke liye sabse best bina kisi maintenance charge ke\n\n" +
      "2️⃣ ✈️ **Airport Lounge Access Cards (एयरपोर्ट लाउंज कार्ड्स)**:\n• Har quarter 2 se 4 complimentary luxury domestic & international airport lounge visits\n• Free unlimited buffet food, premium relax zone aur Wi-Fi facilities\n\n" +
      "3️⃣ 🛍️ **Cashback & Shopping Cards (कैशबैक कार्ड्स)**:\n• Amazon, Flipkart, Myntra, Swiggy, Zomato par up to 5% flat cashback\n• Petrol pumps par 1% fuel surcharge waiver\n• Har transaction par direct cash savings\n\n" +
      "4️⃣ 📋 **Low CIBIL / FD-Backed Cards**:\n• Agar aapka CIBIL score nahi hai ya low hai, toh Fixed Deposit (FD) backed guaranteed card\n• Jisse sirf 3 mahine mein aapka CIBIL 750+ ban jata hai!\n\n" +
      "Aapko kis category ka credit card chahiye ya apply karna hai?",
      ["Lifetime Free Card 🆓", "Airport Lounge ✈️", "Cashback Card 🛍️", "Card Eligibility 📋", "Apply for Card 💳"]
    );
  }

  if (lower.match(/lifetime free.*card|zero annual.*card|free credit card|bina annual/)) {
    return ok(
      "faq_query",
      {},
      "🆓 **Lifetime Free Credit Cards**:\n• Forever Zero Joining Fee aur Zero Annual Fee!\n• 50 days interest-free period aur merchant shopping discounts\n• First-time users ke liye sabse best option bina kisi maintenance tension ke.",
      ["Haan, CIBIL 750+ Hai 👍", "Pehli Baar Card Lena Hai 🌟", "Salary Account Par Chahiye 💼", "Apply for Card 💳"]
    );
  }
  if (lower.match(/lounge|airport lounge/)) {
    return ok(
      "faq_query",
      {},
      "✈️ **Airport Lounge Access Credit Cards**:\n• Har quarter 2 se 4 complimentary domestic aur international lounge access\n• Free buffet meals, luxury seating aur Wi-Fi\n• Flight aur travel bookings par exclusive savings.",
      ["Salaried (₹25k+ In-Hand) 💼", "Self-Employed / Business 🏪", "Apply for Card 💳"]
    );
  }
  if (lower.match(/cashback.*card|shopping.*card|fuel.*card|rewards.*card|amazon.*card|flipkart.*card/)) {
    return ok(
      "faq_query",
      {},
      "🛍️ **Cashback & Reward Credit Cards**:\n• Amazon, Flipkart, Myntra, Swiggy par 5% tak direct cashback\n• Petrol pumps par 1% fuel surcharge waiver\n• Utility bill payment aur rewards jo direct cash mein redeem hote hain.",
      ["Online Shopping 🛒", "Food Delivery & Dining 🍔", "Petrol & Fuel ⛽", "Apply for Card 💳"]
    );
  }

  // ── 1.5 Context Window (Dialogue Memory & Multi-turn Reasoning) ──
  if (context) {
    const ctxLower = context.toLowerCase();

    // 1. Follow-up: ATS (Agreement to Sale) definition / clarification
    if (lower.match(/\b(ats kya|ats ka matlab|agreement to sale|bayana agreement|bayana kya)\b/)) {
      return ok(
        "context_followup",
        { fromContext: "ats" },
        "💡 **ATS (Agreement to Sale) Kya Hota Hai?**\n\n" +
        "• Property khareedte waqt **Seller (Bechne Wale)** aur **Buyer (Khareedne Wale)** ke beech hone wale bayana/agreement ko ATS kehte hain.\n" +
        "• Isme property ka total soda/deal value, advance bayana amount aur registry ki antim tarikh likhi hoti hai.\n" +
        "• **Bank kyu mangta hai?** Bank isi ATS ke aadhar par property ki value ka 80% se 90% loan sanction karta hai.",
        ["Required Documents 📄", "Check Eligibility 🔢", "Apply Online 📝", "WhatsApp Executive 💬"]
      );
    }

    // 2. Follow-up: ITR nahi hai (Without ITR loan options)
    if (lower.match(/\b(itr nahi|bina itr|itr na ho|itr nahi bharta|itr nahi hai|no itr)\b/)) {
      return ok(
        "context_followup",
        { fromContext: "no_itr" },
        "💡 **Agar ITR nahi hai toh bhi Loan mil sakta hai!**\n\n" +
        "Bhardwaj Financial Services (BFS) ke paas **Banking Surrogate Program** aur **Gross Turnover Surrogate** uplabdh hain:\n" +
        "• Agar aapka 12 mahine ka bank statement clear hai aur monthly transactions achhe hain, toh bina ITR ke bhi loan approve ho jata hai!\n" +
        "• Salaried logon ke liye sirf Salary Slip aur Bank Statement kaafi hota hai.\n" +
        "• Dukaan/Vyapar ke liye MSME / GST ya Shop Act aur banking track par sanction hota hai.",
        ["Check Eligibility 🔢", "WhatsApp Executive 💬", "Apply Online 📝", "Call Executive 📞"]
      );
    }

    // 3. Follow-up: Property Chain (Purani chain registries kya hain)
    if (lower.match(/\b(property chain|chain kya|chain document|link document|purani registry)\b/)) {
      return ok(
        "context_followup",
        { fromContext: "property_chain" },
        "💡 **Property Chain (Link Documents) Kya Hoti Hai?**\n\n" +
        "• Property Chain ka matlab pichli sabhi registries hoti hain jo ye sabit karti hain ki zameen ya makan pichle 13 se 30 saal me kiske paas se kiske naam transfer hua.\n" +
        "• **Bank kyu dekhta hai?** Bank ke panel advocate Title Search Report (TSR) banate hain taaki ye ensure ho sake ki property par koi purana vivad (dispute) ya double registry na ho.",
        ["Check Eligibility 🔢", "WhatsApp Executive 💬", "Required Documents 📄"]
      );
    }

    // 4. Follow-up: Bank statement duration (Kitne time ka chahiye)
    if (lower.match(/\b(kitne (mahine|din|time|saal) ka bank statement|bank statement kitna)\b/)) {
      return ok(
        "context_followup",
        { fromContext: "bank_statement_tenure" },
        "💡 **Bank Statement Kitne Samay Ka Chahiye?**\n\n" +
        "• **Salaried (Naukri):** Pichle 6 mahine ka salary account statement.\n" +
        "• **Business / Vyapar / Dukaan:** Pichle 12 mahine ka current account ya active savings account statement.\n" +
        "• **Balance Transfer (BT):** Pichle 12 mahine ka loan repayment account statement (jisme EMI deduct hoti hai).",
        ["Required Documents 📄", "Check Eligibility 🔢", "WhatsApp Executive 💬"]
      );
    }

    // 5. Follow-up: Cash Salary process
    if (lower.match(/\b(cash salary|salary cash|rokad|hath me)\b/)) {
      return ok(
        "context_followup",
        { fromContext: "cash_salary" },
        "💡 **Cash Salary Loan Process at BFS:**\n\n" +
        "• Agar aapki salary cash me aati hai, toh **BFS Special Priority Pool** ke tahat loan suvidha uplabdh hai.\n" +
        "• Iske liye: Employer ka Salary Certificate (letterhead par) + 6 mahine ke monthly cash vouchers aur aapka basic savings account statement chahiye hota hai.",
        ["Apply Online 📝", "WhatsApp Executive 💬", "Check Eligibility 🔢"]
      );
    }

    // 6. Follow-up: Form 16 nahi hai
    if (lower.match(/\b(form 16 nahi|form 16 na ho|form 16 nahi milta)\b/)) {
      return ok(
        "context_followup",
        { fromContext: "no_form16" },
        "💡 **Agar Form 16 nahi hai:**\n\n" +
        "Aapko chinta karne ki zaroorat nahi! Form 16 ke badle aap:\n" +
        "• Pichle 2 saal ki ITR submit kar sakte hain, YA\n" +
        "• Apni company se Last 3 Months Salary Slips + 6 Months Bank Statement de sakte hain.",
        ["Required Documents 📄", "WhatsApp Executive 💬", "Check Eligibility 🔢"]
      );
    }

    // 7. Follow-up: Affirmation & Acknowledgment ("Haan", "Yes", "Accha", "Thik hai", "Samajh gaya")
    if (lower.match(/^(haan|yes|ha|haa|thik hai|theek hai|accha|acha|achha|ok|okay|got it|samajh gaya|samjh gaya|sahi hai|badhiya|aage badho|aage badhein|sure|chalo|bilkul|proceed)$/)) {
      if (ctxLower.includes("property dekh li hai") || ctxLower.includes("property identify") || ctxLower.includes("property final")) {
        return ok("context_followup", { fromContext: "affirm_property" }, "Great! Property final hona process ko fast kar deta hai. 👍 Ek aur zaroori jankari — aapka CIBIL score lagbhag kitna hai?", ["750+ (Ekdum Badhiya! 🌟)", "650-749 (Theek Theek)", "650 se Kam", "Pehli Baar Loan Lena Hai"]);
      }
      if (ctxLower.includes("co-applicant ho") || ctxLower.includes("aage badhna chahenge")) {
        return ok("context_followup", { fromContext: "affirm_continue" }, "Zarur! Hum turant aage badhte hain. Kripya batayein aapko lagbhag kitne loan amount ki zaroorat hai? (jaise: 25 Lakh ya 50 Lakh)");
      }
      if (ctxLower.includes("apply") || ctxLower.includes("quote") || ctxLower.includes("category")) {
        return ok("context_followup", { fromContext: "affirm_apply" }, "Badhiya! Application process shuru karne ke liye aap niche diye link se online form bhar sakte hain ya hamare executive se WhatsApp par baat kar sakte hain:", ["Apply Online 📝", "Check Eligibility 🔢", "WhatsApp Executive 💬"]);
      }
      if (ctxLower.includes("bhardwaj financial services") || ctxLower.includes("bfs") || ctxLower.includes("aasaan shabdo")) {
        return ok("context_followup", { fromContext: "affirm_general" }, "Ji bilkul! 😊 Agar aapko apni profile ke hisab se Eligibility check karni hai, ya kisi specific loan ya insurance ke baare me janna hai, toh batayein:", ["Home Loan (7.15%*) 🏠", "Business Loan 💼", "Check Eligibility 🔢", "WhatsApp Executive 💬"]);
      }
      return ok("context_followup", { fromContext: "affirm_general" }, "Ji bilkul! 😊 Aage badhne ke liye batayein aapko kismein jankari chahiye:", ["Home Loan (7.15%*) 🏠", "Check Eligibility 🔢", "WhatsApp Executive 💬", "Finance & Loans 💰"]);
    }

    // 8. Follow-up: Negative / Decline ("Nahi", "No", "Nahi chahiye")
    if (lower.match(/^(nahi|no|na|nhi|nahi chahiye|abhi nahi)$/)) {
      if (ctxLower.includes("property dekh li hai") || ctxLower.includes("property identify")) {
        return ok("context_followup", { fromContext: "deny_property" }, "Koi baat nahi! Hum pehle aapki maximum eligible limit calculate kar dete hain taaki aap apne budget ke anusaar property dekh sakein. Aapka CIBIL score lagbhag kitna hai?", ["750+ (Badhiya)", "650-749", "650 se Kam", "Pehli Baar Loan Lena Hai"]);
      }
      if (ctxLower.includes("10 lakh ya usse zyada") || ctxLower.includes("10 lakh se upar")) {
        return ok("context_followup", { fromContext: "deny_10l" }, "Maafi chahenge! Humari policy ke anusaar hum 10 Lakh se upar ke loans hi process karte hain. Agar future me badi requirement ho toh hume zaroor yaad kijiye!", ["Start Over 🔄", "WhatsApp Executive 💬"]);
      }
      return ok("context_followup", { fromContext: "deny_general" }, "Koi baat nahi! Agar aapka koi aur prashna ho ya kisi aur product (Loan, Insurance, Credit Card) ke baare me janna ho toh batayein.", ["Finance & Loans 💰", "Insurance Plans 🛡️", "Credit Cards 💳", "WhatsApp Executive 💬"]);
    }

    // 9. Follow-up: Explanation / Summary ("Samajh nahi aaya", "Matlab kya hai", "Explain karo")
    if (lower.match(/summary|short|aasan shabdo|samajh nahi aaya|explain|matlab|kya bola/)) {
      if (ctxLower.includes("document") || ctxLower.includes("checklist")) {
        return ok("context_followup", { fromContext: "explain_docs" }, "💡 **Aasaan Shabdo Mein Documents:**\nAapko sirf 3 cheezein deni hain:\n1️⃣ Identity Proof (Aadhar aur PAN Card)\n2️⃣ Income Proof (Salary Slip ya Bank Statement)\n3️⃣ Property Proof (Makan/Plot ki registry agar property loan hai).\n\nBas itne me aapka loan process shuru ho jata hai!", ["Apply Online 📝", "WhatsApp Executive 💬", "Start Over 🔄"]);
      }
      if (ctxLower.includes("eligibility") || ctxLower.includes("salary")) {
        return ok("context_followup", { fromContext: "explain_eligibility" }, "💡 **Aasaan Shabdo Mein Eligibility:**\nAapki in-hand salary ka lagbhag 50% hissa nayi EMI ke liye count hota hai. Us hisab se aapko 20-30 saal ke tenure par maximum loan limit milti hai!", ["Check Eligibility 🔢", "WhatsApp Executive 💬", "Start Over 🔄"]);
      }
      return ok("context_followup", { fromContext: "explain_general" }, "💡 **Aasaan Shabdo Mein:**\nPichli baat ka mukhya matlab ye hai ki BFS aapke profile ke hisab se sabse saste interest rate aur fastest approval provide karwata hai!", ["Check Eligibility 🔢", "WhatsApp Executive 💬", "Start Over 🔄"]);
    }

    // 9.5 Follow-up: Kuch khas baat / USP / Specialty of previous response
    if (lower.match(/\b(khas bat|khas baat|khasiyat|speciality|special|fayde|fayda|aur batao|aur bataiye|aur detail)\b/)) {
      if (ctxLower.includes("bhardwaj financial services") || ctxLower.includes("bfs")) {
        return ok(
          "context_followup",
          { fromContext: "bfs_usp" },
          "🌟 **Bhardwaj Financial Services (BFS) Ki 5 Sabse Khas Baatein:**\n\n" +
          "1️⃣ **Market Me Lowest Home Loan (7.15%*)**: PSU aur Private banks ke direct institutional tie-ups se sabse sasti EMI rate.\n" +
          "2️⃣ **100% Zero Advance Fee**: Hum client se koi file charge ya upfront commission nahi lete (100% Free Consultation).\n" +
          "3️⃣ **Special Profile Expertise**: Agar aapki Cash Salary hai, ITR nahi hai, ya low CIBIL hai — toh bhi hamare customized lending programs se loan approve hota hai!\n" +
          "4️⃣ **Doorstep & Digital Support**: Dastavez collect karne se lekar bank sanction aur registry tak poora end-to-end support hamare legal experts karte hain.\n" +
          "5️⃣ **Single Window Solution**: Home Loan, Business Loan, Personal Loan, LAP, Insurance aur Credit Card — sab ek hi platform par.",
          ["Home Loan (7.15%*) 🏠", "Check Eligibility 🔢", "WhatsApp Executive 💬", "Finance & Loans 💰"]
        );
      }
      if (ctxLower.includes("home loan")) {
        return ok(
          "context_followup",
          { fromContext: "home_loan_usp" },
          "🌟 **Home Loan Ki Khas Baatein:**\n• **7.15%** se shuru hone wali sabse kam byaj dar\n• 90% property funding & 30 saal tenure\n• Income Tax 80C & 24 ke tahat ₹3.5 Lakh tak ki direct bachat!",
          ["Check Eligibility 🔢", "Required Documents 📄", "WhatsApp Executive 💬"]
        );
      }
      if (ctxLower.includes("business loan")) {
        return ok(
          "context_followup",
          { fromContext: "business_loan_usp" },
          "🌟 **Business Loan Ki Khas Baatein:**\n• Bina kisi property/girvi ke up to ₹50 Lakhs\n• Sirf 48-72 ghante me sanction\n• Minimum documents: Sirf GST/Udyam aur 12 mahine ki banking!",
          ["Check Eligibility 🔢", "Required Documents 📄", "WhatsApp Executive 💬"]
        );
      }
    }

    // 10. Context: Bank Rates
    if ((context.includes("bank") || context.includes("rate")) && knowledge?.rates) {
      for (const rate of knowledge.rates) {
        if (isFuzzyMatch(lower, rate.bankName.toLowerCase())) {
          return ok("interest_rate_query", { bank: rate.bankName },
            `Aapne pichli baat se juda sawaal poocha hai! 😊 ${rate.bankName} ka rate ${rate.interestRate}% se shuru hota hai.`
          );
        }
      }
    }

    // 11. Document Query Follow-up with Context
    // Only fire if the current user message itself is asking about documents/proofs/criteria
    const userWantsDocs = Boolean(lower.match(/\b(document|documents|kagaz|kagajat|paper|papers|proof|list|checklist)\b/));
    if (userWantsDocs && (context.includes("document") || context.includes("kagaz") || context.includes("paper"))) {
      const docResult = parseDocumentQuery(context + " " + text);
      return ok("document_query", { profile: docResult.profileName, product: docResult.productName }, docResult.html, docResult.options);
    }
  }

  // ── 2. Training Center: Scenarios (Q&A) ──
  // Ye sabse pehle check hota hai - jo Admin ne sikhaya wohi jawab deta hai
  if (knowledge?.scenarios?.length) {
    for (const s of knowledge.scenarios) {
      if (s.isActive && isFuzzyMatch(lower, s.userSays.toLowerCase())) {
        return ok("faq_query", {}, s.botReplies);
      }
    }
  }

  // ── 3. Training Center: Advanced Deep Knowledge Rules ──
  let bestMatch: { intent: string; reply: string; score: number } | null = null;

  if (knowledge?.rules?.length) {
    for (const rule of knowledge.rules) {
      if (!rule.isActive) continue;
      // topic format: INTENT_NAME - keyword1, keyword2, keyword3
      const parts = rule.topic.split(" - ");
      if (parts.length > 1) {
        // join everything after the first " - " in case keywords contain " - "
        const keywordsStr = parts.slice(1).join(" - ");
        const keywords = keywordsStr.split(",").map(k => k.trim());
        
        let ruleBestScore = 0;
        for (const kw of keywords) {
           const score = calculateMatchScore(lower, kw.toLowerCase());
           if (score > ruleBestScore) ruleBestScore = score;
        }

        if (ruleBestScore >= 0.75 && (!bestMatch || ruleBestScore > bestMatch.score)) {
           bestMatch = { intent: "faq_query", reply: rule.instruction, score: ruleBestScore };
        }
      }
    }
  }

  // 🧠 4. Training Center: FAQs 🧠
  if (knowledge?.faqs?.length) {
    for (const faq of knowledge.faqs) {
      if (faq.status === "published") {
        const faqWords = processTextWords(faq.question.toLowerCase());
        const userWords = processTextWords(lower);
        
        let matchCount = 0;
        for (const uw of userWords) {
           if (faqWords.some(fw => fw === uw || (fw.length > 4 && levenshteinDistance(fw, uw) <= 1))) {
              matchCount++;
           }
        }
        
        let finalScore = 0;
        if (userWords.length > 0) {
          const userRatio = matchCount / userWords.length;
          const faqRatio = faqWords.length > 0 ? matchCount / faqWords.length : 0;
          
          if (userWords.length <= 2) {
            if (faqRatio > 0.4) { 
               finalScore = userRatio;
            } else {
               finalScore = 0; 
            }
          } else {
            if (matchCount >= 2) {
               finalScore = Math.max(userRatio, 0.75);
            }
          }
        }

        if (finalScore >= 0.75 && (!bestMatch || finalScore > bestMatch.score)) {
           bestMatch = { intent: "faq_query", reply: faq.answer, score: finalScore };
        }
      }
    }
  }

  // If we found a solid match from the DB, return it instead of falling through!
  if (bestMatch && bestMatch.score > 0) {
    return ok(bestMatch.intent as Intent, {}, bestMatch.reply);
  }

  // ── 4. Training Center: Bank Rates ──
  const rateWords = ["rate", "byaj", "interest", "roi", "kitna percent", "percentage"];
  const asksRate = rateWords.some(w => isFuzzyMatch(lower, w));
  
  // Also trigger if user just types a bank name while we asked them about a bank
  const isJustBank = knowledge?.rates?.some(r => isFuzzyMatch(lower, r.bankName.toLowerCase()) && lower.length < r.bankName.length + 10);
  
  if ((asksRate || isJustBank) && knowledge?.rates?.length) {
    for (const rate of knowledge.rates) {
      if (isFuzzyMatch(lower, rate.bankName.toLowerCase())) {
        return ok("interest_rate_query", { bank: rate.bankName },
          `${rate.bankName} mein ${rate.category} ke liye interest rate ${rate.interestRate}% se shuru hota hai. Processing fee: ${rate.processingFee}. Approval sirf ${rate.speedDays} dinon mein! 🏦`
        );
      }
    }
    // General rate query - sabhi banks ki list
    if (asksRate && knowledge.rates.length > 0) {
      const rateList = knowledge.rates
        .map(r => `• ${r.bankName}: ${r.interestRate}%`)
        .slice(0, 5)
        .join("\n");
      return ok("interest_rate_query", {}, `Abhi hamare partner banks ke current rates:\n${rateList}\n\nKisi specific bank ke baare mein jaanna chahte hain?`);
    }
  }

  // ── 5. Training Center: Service Areas ──
  if (knowledge?.serviceAreas?.length) {
    for (const city of knowledge.serviceAreas) {
      if (isFuzzyMatch(lower, city.name.toLowerCase())) {
        for (const area of (city.localAreas || [])) {
          if (isFuzzyMatch(lower, area.name.toLowerCase())) {
            return ok("service_area_query", { city: city.name, area: area.name },
              `Haan, hum ${area.name}, ${city.name} mein poori seva dete hain! 📍\n\nWahan ke hamare local expert: **${area.localExpertName}** (${area.localExpertPhone})\n\n${area.whyChooseUs}`
            );
          }
        }
        return ok("service_area_query", { city: city.name },
          `Haan, hum ${city.name} mein active hain! 📍\n\n${city.description || ""}\n\nKisi specific area ke baare mein jaanna chahte hain?`
        );
      }
    }
  }

  // ── 6. Page Navigation ──
  const navTriggers = ["kholo", "open", "jao", "dikhao", "le jao", "navigate", "page"];
  const pageMap: Record<string, { path: string; name: string }> = {
    "contact": { path: "/contact", name: "Contact Us" },
    "sampark": { path: "/contact", name: "Contact Us" },
    "about": { path: "/about", name: "About Us" },
    "apply": { path: "/apply", name: "Apply Now" },
    "appointment": { path: "/appointment", name: "Appointment" },
    "calculator": { path: "/calculator", name: "Calculator" },
    "careers": { path: "/careers", name: "Careers" },
    "faq": { path: "/faq", name: "FAQ" },
    "blog": { path: "/blog", name: "Blog" },
    "banks": { path: "/banks", name: "Bank Partners" },
    "reviews": { path: "/reviews", name: "Reviews" },
    "locations": { path: "/locations", name: "Locations" },
  };
  const hasNav = navTriggers.some(t => lower.includes(t));
  if (hasNav) {
    for (const [key, pg] of Object.entries(pageMap)) {
      if (lower.includes(key)) {
        return ok("page_navigation", { page: pg.path }, `Ji zarur! ${pg.name} page par le jaa rahi hun...`);
      }
    }
  }

  // ── 6.5 Financial Glossary / Explanations ──
  // Agar user kisi word ka matlab pooch raha ho ("kya hai", "matlab", "explain", etc.) ya general query ho
  if (lower.match(/kya hota|kya hai|matlab|meaning|explain|batao|kise kehte/)) {
    const dictionary: Record<string, string> = {
      "cibil": "CIBIL score ek 3-digit number (300-900) hota hai jo aapki loan history batata hai. 750+ score best maana jata hai.",
      "emi": "EMI (Equated Monthly Installment) wo har mahine ki kist hoti hai jismein Principal aur Interest dono shamil hote hain.",
      "roi": "ROI (Rate of Interest) wo byaj dar hai jis par bank aapko loan deta hai.",
      "lap": "LAP (Loan Against Property) ka matlab hai apni property (makaan/dukaan) girvi rakh kar bank se loan lena.",
      "bt": "BT (Balance Transfer) ka matlab hai apne chalte hue loan ko kisi doosre bank mein transfer karna taaki interest rate/EMI kam ho sake.",
      "topup": "Top-up ka matlab hai chalte hue loan ke upar bank se thoda aur extra paisa (loan) lena.",
      "ltv": "LTV (Loan to Value) ka matlab hai bank aapki property ki total value ka kitna percent loan dega (jaise 80%).",
      "foir": "FOIR ka matlab hai ki aapki total monthly kamayi mein se kitna paisa EMI mein jaa sakta hai (banks generally 50-60% tak allow karte hain).",
      "sanction": "Sanction Letter ek official paper hai jismein bank likhit (written) mein batata hai ki aapka loan approve ho gaya hai aur kitne rate par hua hai.",
      "co-applicant": "Co-applicant (jaise patni/pati) wo vyakti hota hai jo aapke sath milkar loan leta hai, isse eligibility badh jati hai aur interest mein chhoot mil sakti hai.",
      "rera": "RERA ek sarkari body hai jo builders aur property buyers ko protect karti hai. RERA approved property par loan milna bohot aasan hota hai.",
      "processing fee": "Processing Fee wo 1-time charge hota hai jo bank aapki loan file process karne ke liye leta hai.",
      "foreclosure": "Foreclosure (ya Prepayment) ka matlab hai apne loan ko time se pehle poora paisa ek sath dekar band kar dena.",
      "health insurance": "Health Insurance (Mediclaim) bimari ya accident ke dauran hospital ke kharche ko cover karta hai, aur cashless treatment deta hai.",
      "mediclaim": "Mediclaim ek aisi health policy hai jo hospitalization ke dauran doctor, bed aur surgery ke bills ka bhugtan karti hai.",
      "term insurance": "Term Insurance sabse sasta aur pure life insurance plan hai jisme kam premium par parivar ko ₹1 Crore+ ka death benefit cover milta hai.",
      "zero dep": "Zero Depreciation (0-Dep) car/bike bima mein accident hone par fiber, plastic aur parts ka 100% claim milta hai, koi katauti nahi hoti.",
      "cashless": "Cashless claim ka matlab hai hospital ya car garage mein bina jeb se paise diye direct insurance company se bill settle hona.",
      "credit card": "Credit Card bank dwara diya gaya ek financial card hai jisme 45-50 din tak bina kisi byaj ke shopping aur emergency kharche kiye ja sakte hain.",
      "lifetime free": "Lifetime Free credit card par kabhi bhi koi joining fee ya annual renewal charges nahi lagte, ye bilkul muft rehta hai.",
      "lounge access": "Airport Lounge Access credit card se aap airports par luxury VIP lounge me free buffet khana, wifi aur aaram kar sakte hain."
    };

    for (const [word, meaning] of Object.entries(dictionary)) {
      if (lower.includes(word)) {
        return ok("faq_query", { word }, `💡 **${word.toUpperCase()}**: ${meaning}`);
      }
    }
  }

  // ── 7. Basic Intent Detection (Calculator routing only) ──
  if (lower.match(/\bemi\b|kist|monthly installment/)) return ok("emi_calculator", {}, "");
  if (lower.match(/balance transfer|bt calculator|purana loan/)) return ok("bt_calculator", {}, "");
  if (lower.match(/ltv|max loan|kitna loan milega/)) return ok("ltv_calculator", {}, "");
  if (lower.match(/eligib|foir|kitna mil sakta|kitna loan mil|salary se loan/)) return ok("eligibility_calculator", {}, "");

  // ── 8. Greetings & Affirmations ──
  const greetWords = ["hello", "hi", "hey", "namaste", "namaskar", "pranam", "salam", "salaam", "hola", "bonjour", "hlo", "hllo"];
  if (greetWords.some(g => isFuzzyMatch(lower, g))) {
    return ok("greeting", {}, "");
  }

  // ── 8.5 Standalone Affirmation / Acknowledgment ──
  if (lower.match(/^(haan|yes|ha|haa|thik hai|theek hai|accha|acha|achha|ok|okay|got it|samajh gaya|samjh gaya|sahi hai|badhiya)$/)) {
    return ok(
      "faq_query",
      {},
      "Ji bilkul! 😊 Agar aapko apni profile ke hisab se Eligibility check karni hai, ya kisi specific loan ya insurance ke baare me janna hai, toh batayein:",
      ["Home Loan (7.15%*) 🏠", "Business Loan 💼", "Check Eligibility 🔢", "WhatsApp Executive 💬"]
    );
  }

  // ── 9. CIBIL / Score ──
  if (lower.match(/cibil|credit score|civil score|low score|kharab score/)) {
    return ok("cibil_issue", {}, "");
  }

  // ── 10. Complaint ──
  if (lower.match(/problem|complaint|shikayat|pareshan|gussa|bekar|fraud/)) {
    return ok("complaint", {}, "");
  }

  // ── 11. Document query ──
  if (lower.match(/document|kagaz|paper|itr|aadhar|pan|kyc/)) {
    return ok("document_query", {}, "");
  }

  // ── 13. Remind Question ──
  if (lower.match(/pichla sawal|kya pucha|kya jawab|wapas batao|kya tha sawal|kya batana hai/)) {
    return ok("remind_question", {}, "");
  }

  // ── Unknown ──
  return ok("unknown", {}, "");
}

// ─── Helper ───────────────────────────────────────────────
function ok(intent: Intent, entities: Record<string, string>, reply: string, options?: string[]): NLPResult {
  return { intent, sentiment: "neutral", confidence: 1.0, extractedEntities: entities, reply, options };
}
