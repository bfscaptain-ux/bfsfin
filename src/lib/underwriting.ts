export type ProductType = "Home Loan" | "Personal Loan" | "Business Loan" | "LAP" | "Credit Card" | "Insurance";
export type EmpType = "Salaried" | "Self-Employed";
export type SalaryMode = "bank_transfer" | "cash_cheque";
export type CibilTier = "750+" | "700-749" | "650-699" | "<650" | "new_to_credit";
export type AgeBracket = "21-30" | "31-45" | "46-55" | "55+";

export interface UnderwritingInput {
  product: ProductType;
  empType: EmpType;
  salaryMode: SalaryMode;
  monthlyIncome: number;
  existingEmi: number;
  cibilTier: CibilTier;
  ageBracket: AgeBracket;
  hasEmiBounce: boolean;
  propertyType?: string;
  cardPerk?: "free" | "lounge" | "cashback";
  insuranceType?: "health" | "term" | "motor";
}

export interface UnderwritingResult {
  status: "APPROVED_PRIME" | "APPROVED_STANDARD" | "CONDITIONAL_COAPPLICANT" | "SPECIAL_ASSISTANCE";
  badge: string;
  badgeColor: "emerald" | "blue" | "amber" | "purple";
  eligibleAmount: number;
  eligibleAmountFormatted: string;
  maxTenureYears: number;
  interestRateBand: string;
  estimatedMonthlyEmi: number;
  lendingPool: string;
  foirPercent: number;
  keyInsights: string[];
  recommendation: string;
}

export function evaluateUnderwriting(input: UnderwritingInput): UnderwritingResult {
  const { product, empType, salaryMode, monthlyIncome, existingEmi, cibilTier, ageBracket, hasEmiBounce } = input;

  // Approximate median age from bracket
  const approxAge = ageBracket === "21-30" ? 27 : ageBracket === "31-45" ? 38 : ageBracket === "46-55" ? 50 : 58;

  // --- 1. SPECIAL CASE: CREDIT CARD ---
  if (product === "Credit Card") {
    if (salaryMode === "cash_cheque" || cibilTier === "<650" || hasEmiBounce) {
      return {
        status: "SPECIAL_ASSISTANCE",
        badge: "BFS Credit Builder Approval",
        badgeColor: "purple",
        eligibleAmount: 50000,
        eligibleAmountFormatted: "₹50,000 - ₹2.0 Lakhs (Secured Limit)",
        maxTenureYears: 0,
        interestRateBand: "45-50 Days Interest-Free",
        estimatedMonthlyEmi: 0,
        lendingPool: "BFS Credit Rebuilding Pool",
        foirPercent: 0,
        keyInsights: [
          "Cash salary ya low CIBIL par unsecured cards issue nahi hote hain.",
          "BFS Guaranteed FD-Backed Credit Card: 100% Approval bina income proof ke.",
          "90 din me aapka CIBIL score 750+ ban jayega."
        ],
        recommendation: "BFS Guaranteed Credit Builder Card lein taaki aapki profile prime ho sake."
      };
    }

    const isPrime = (cibilTier === "750+" || cibilTier === "700-749") && monthlyIncome >= 25000;
    return {
      status: isPrime ? "APPROVED_PRIME" : "APPROVED_STANDARD",
      badge: isPrime ? "BFS Prime Card Pre-Approved" : "BFS Standard Card Approved",
      badgeColor: isPrime ? "emerald" : "blue",
      eligibleAmount: Math.round(monthlyIncome * (isPrime ? 3.5 : 2.0)),
      eligibleAmountFormatted: `₹${(Math.round(monthlyIncome * (isPrime ? 3.5 : 2.0)) / 100000).toFixed(1)} Lakhs Limit`,
      maxTenureYears: 0,
      interestRateBand: "50 Days Interest-Free (0% Annual Fee)",
      estimatedMonthlyEmi: 0,
      lendingPool: isPrime ? "BFS Executive Card Network" : "BFS Starter Card Network",
      foirPercent: 0,
      keyInsights: [
        isPrime ? "Pre-approved for Lifetime Free Card + Airport Lounge Access." : "Zero annual fee starter card with online cashback.",
        "Instant digital KYC verification with minimal documentation."
      ],
      recommendation: "Aap prime credit card ke liye eligible hain bina kisi hidden charges ke."
    };
  }

  // --- 2. SPECIAL CASE: INSURANCE ---
  if (product === "Insurance") {
    const isHealth = input.insuranceType !== "term" && input.insuranceType !== "motor";
    if (isHealth) {
      return {
        status: "APPROVED_PRIME",
        badge: "BFS Comprehensive Health Cover",
        badgeColor: "emerald",
        eligibleAmount: 1500000,
        eligibleAmountFormatted: "₹15 Lakhs - ₹25 Lakhs (100% Cashless)",
        maxTenureYears: 1,
        interestRateBand: "Tax Saving u/s 80D (Up to ₹75,000)",
        estimatedMonthlyEmi: Math.round((monthlyIncome * 0.02)),
        lendingPool: "BFS Healthcare Protection Pool",
        foirPercent: 0,
        keyInsights: [
          "10,000+ cashless network hospitals pan-India.",
          "Zero co-payment & pre-existing diseases covered post standard waiting period.",
          "24x7 BFS dedicated in-house claim settlement assistance."
        ],
        recommendation: "Hospital cashless hospitalization & Section 80D tax saving plan."
      };
    } else if (input.insuranceType === "term") {
      const coverAmount = Math.max(10000000, monthlyIncome * 12 * 18);
      return {
        status: "APPROVED_PRIME",
        badge: "BFS Pure Term Life Protection",
        badgeColor: "emerald",
        eligibleAmount: coverAmount,
        eligibleAmountFormatted: `₹${(coverAmount / 10000000).toFixed(1)} Crore Sum Assured`,
        maxTenureYears: Math.max(10, 65 - approxAge),
        interestRateBand: "Tax Saving u/s 80C (Up to ₹1.5 Lakhs)",
        estimatedMonthlyEmi: 850,
        lendingPool: "BFS Life Assurance Pool",
        foirPercent: 0,
        keyInsights: [
          "Sum Assured: 15x-20x of annual income for family financial security.",
          "Claim Settlement Ratio 99%+ with critical illness rider option.",
          "Tele-medical consultation without physical clinic visit."
        ],
        recommendation: "₹1+ Crore family term life cover at lowest premium bracket."
      };
    } else {
      // Motor
      return {
        status: "APPROVED_PRIME",
        badge: "BFS Zero-Depreciation Motor Policy",
        badgeColor: "blue",
        eligibleAmount: 0,
        eligibleAmountFormatted: "100% Bumper-to-Bumper Cover",
        maxTenureYears: 1,
        interestRateBand: "Up to 50% NCB Discount",
        estimatedMonthlyEmi: 0,
        lendingPool: "BFS Motor Assurance Pool",
        foirPercent: 0,
        keyInsights: [
          "Zero-Depreciation & 24x7 roadside assistance.",
          "Instant digital policy issue within 2 minutes."
        ],
        recommendation: "Instant vehicle policy renewal with maximum NCB discount."
      };
    }
  }

  // --- 3. LOAN UNDERWRITING (Home, Personal, Business, LAP) ---

  // Underwriting Rule A: Age & Retirement Horizon
  const retirementAge = empType === "Salaried" ? 60 : 65;
  const maxAllowableTenure = Math.max(3, retirementAge - approxAge);
  let standardTenure = product === "Home Loan" ? 30 : product === "LAP" ? 15 : product === "Personal Loan" ? 5 : 4;
  const applicableTenure = Math.min(standardTenure, maxAllowableTenure);

  // Underwriting Rule B: FOIR (Fixed Obligation to Income Ratio)
  let foirPercent = 0.50;
  if (monthlyIncome < 30000) foirPercent = 0.45;
  else if (monthlyIncome >= 75000) foirPercent = 0.60;
  else foirPercent = 0.50;

  const maxPermissibleEmi = Math.max(0, (monthlyIncome * foirPercent) - existingEmi);

  // Underwriting Rule C: Cash Salary / High Bounce Restrictions
  if (salaryMode === "cash_cheque" && (product === "Personal Loan" || product === "Business Loan")) {
    return {
      status: "SPECIAL_ASSISTANCE",
      badge: "BFS Alternate Asset-Backed Facility",
      badgeColor: "purple",
      eligibleAmount: 300000,
      eligibleAmountFormatted: "₹3.0 Lakhs - ₹10.0 Lakhs (Collateral Pathway)",
      maxTenureYears: 5,
      interestRateBand: "Asset-Backed Starting @ 9.00%",
      estimatedMonthlyEmi: 6500,
      lendingPool: "BFS Asset & Micro-Funding Pool",
      foirPercent: 40,
      keyInsights: [
        "Unsecured personal/business loan ke liye direct bank account salary credit anivarya hai.",
        "Cash income par BFS Gold Loan ya Co-Applicant (jinki bank salary ho) ke zariye funding karwayenge.",
        "0% CIBIL impact aur 48 ghante me instant approval."
      ],
      recommendation: "Co-applicant jodein ya Gold/Asset backed loan chunein."
    };
  }

  // Underwriting Rule D: CIBIL Score & Rate Band Determination
  let interestRate = 8.35;
  let lendingPool = "BFS Prime Lending Pool";
  let status: UnderwritingResult["status"] = "APPROVED_PRIME";
  let badge = "BFS Prime Pre-Approved";
  let badgeColor: UnderwritingResult["badgeColor"] = "emerald";
  const notes: string[] = [];

  if (cibilTier === "750+" && !hasEmiBounce) {
    status = "APPROVED_PRIME";
    badge = "BFS Prime Pre-Approved (Grade A+)";
    badgeColor = "emerald";
    lendingPool = "BFS Prime Lending Pool";
    interestRate = product === "Home Loan" ? 8.35 : product === "LAP" ? 9.00 : product === "Personal Loan" ? 10.50 : 11.25;
    notes.push("Clean 750+ CIBIL track: Lowest interest rate & zero processing fee concessions.");
  } else if (cibilTier === "700-749" || (cibilTier === "750+" && hasEmiBounce)) {
    status = "APPROVED_STANDARD";
    badge = "BFS Standard Pre-Sanction";
    badgeColor = "blue";
    lendingPool = "BFS Fast-Track Priority Pool";
    interestRate = product === "Home Loan" ? 8.75 : product === "LAP" ? 9.50 : product === "Personal Loan" ? 11.75 : 12.50;
    notes.push(hasEmiBounce ? "Minor EMI bounce noted: Routed to BFS Fast-Track approval network." : "Standard credit profile: Fast-track approval with minimal paperwork.");
  } else if (cibilTier === "650-699") {
    status = "CONDITIONAL_COAPPLICANT";
    badge = "BFS Conditional Approval (Deviation Required)";
    badgeColor = "amber";
    lendingPool = "BFS Flexible Partner Pool";
    interestRate = product === "Home Loan" ? 9.25 : product === "LAP" ? 10.00 : product === "Personal Loan" ? 13.00 : 14.00;
    notes.push("CIBIL score 650-700: Co-applicant (Spouse/Father) add karne par interest rate 0.5% kam ho sakta hai.");
  } else {
    // <650 or New to Credit
    status = "SPECIAL_ASSISTANCE";
    badge = "BFS Special Assistance Facility";
    badgeColor = "purple";
    lendingPool = "BFS Specialized NBFC & Restructuring Pool";
    interestRate = product === "Home Loan" ? 9.75 : product === "LAP" ? 10.50 : product === "Personal Loan" ? 14.50 : 15.00;
    notes.push("Low CIBIL / CIBIL Settlement case: BFS specialized credit deviation team will handle sanctioning.");
  }

  // Underwriting Rule E: Age Tenure Capping Insight
  if (applicableTenure < standardTenure) {
    notes.push(`Age Retirement Rule: Tenure capped at ${applicableTenure} Years (Retirement age ${retirementAge} limit).`);
  }

  // Underwriting Rule F: Loan Amount Calculation via Banking Annuity Formula
  let eligibleAmount = 0;
  if (product === "Personal Loan") {
    const multiplier = cibilTier === "750+" ? 18 : cibilTier === "700-749" ? 14 : 9;
    eligibleAmount = Math.max(0, Math.min(1500000, (monthlyIncome * multiplier) - (existingEmi * 12)));
  } else if (product === "Business Loan") {
    const turnoverMultiplier = cibilTier === "750+" ? 0.8 : 0.5;
    eligibleAmount = Math.max(0, Math.min(5000000, (monthlyIncome * 12) * turnoverMultiplier));
  } else {
    // Home Loan / LAP
    const monthlyRate = interestRate / 12 / 100;
    const n = applicableTenure * 12;
    eligibleAmount = maxPermissibleEmi > 0
      ? Math.round((maxPermissibleEmi * (Math.pow(1 + monthlyRate, n) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, n)))
      : 0;
  }

  const r = interestRate / 12 / 100;
  const n = applicableTenure * 12;
  const estimatedMonthlyEmi = eligibleAmount > 0 ? Math.round((eligibleAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) : 0;

  return {
    status,
    badge,
    badgeColor,
    eligibleAmount,
    eligibleAmountFormatted: `₹${(eligibleAmount / 100000).toFixed(1)} Lakhs`,
    maxTenureYears: applicableTenure,
    interestRateBand: `${interestRate.toFixed(2)}% Starting ROI`,
    estimatedMonthlyEmi,
    lendingPool,
    foirPercent: Math.round(foirPercent * 100),
    keyInsights: notes,
    recommendation: eligibleAmount > 0
      ? `Aap ₹${(eligibleAmount / 100000).toFixed(1)} Lakhs tak ${applicableTenure} saal ke tenure par lene ke liye qualify karte hain.`
      : "Existing EMI zyada hone ki wajah se capacity limit exceed ho rahi hai. Co-applicant jodein."
  };
}
