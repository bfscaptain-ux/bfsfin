import { BankRateData } from "@/types/bank";

export const rbiRepoRate = "6.50%";
export const lastUpdated = "Today";

export const banksData: Record<string, BankRateData> = {
  "pnb": {
    id: "pnb",
    slug: "pnb",
    name: "Punjab National Bank (PNB)",
    logo: "Building", // We'll map this to a Lucide icon or use a real logo if available
    seoTitle: "PNB Home Loan Interest Rates 2026 | Zero Processing Fee",
    seoDescription: "Get the lowest PNB Home Loan interest rates starting at 8.40% p.a. Check your eligibility, processing fees, and apply online through Bhardwaj Financial Services.",
    salariedRate: "8.40% - 9.10%",
    selfEmployedRate: "8.50% - 9.25%",
    maxLTV: "90%",
    processingFee: "Zero / Waived (Special Offer)",
    processingFeeValue: 0,
    baseRateType: "RLLR",
    baseRateValue: "6.50%",
    overview: [
      "Punjab National Bank (PNB) is one of India's oldest and most trusted public sector banks. Known for its highly competitive interest rates and customer-friendly policies, PNB Home Loans are an excellent choice for both salaried and self-employed individuals looking to purchase, construct, or renovate a home.",
      "At Bhardwaj Financial Services, we hold a special partnership with PNB that allows us to secure preferential terms for our clients. One of the biggest advantages of choosing PNB through us is the complete waiver of processing fees and documentation charges during special festive periods, saving you thousands of rupees upfront.",
      "PNB home loans are linked to the Repo Linked Lending Rate (RLLR), ensuring absolute transparency. When the RBI reduces repo rates, the benefit is automatically and immediately passed on to you, lowering your monthly EMI."
    ],
    benefits: [
      "Extremely low interest rates starting from 8.40% p.a. for high CIBIL scores.",
      "Complete waiver of processing fees and upfront charges for eligible profiles.",
      "No pre-payment or foreclosure penalties on floating rate loans.",
      "Long repayment tenure up to 30 years to minimize your EMI burden.",
      "Doorstep service and dedicated relationship managers via Bhardwaj Financial Services."
    ],
    features: [
      {
        icon: "Percent",
        title: "Lowest Rates",
        description: "PNB consistently offers some of the lowest interest rates in the public sector banking space."
      },
      {
        icon: "Shield",
        title: "Transparent RLLR",
        description: "Your interest rate is directly linked to the RBI Repo Rate, ensuring 100% transparency."
      },
      {
        icon: "CheckCircle",
        title: "Zero Processing Fee",
        description: "Enjoy absolutely zero processing fees when you apply through our authorized channels."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card", "Passport size photographs"]
      },
      {
        category: "Income Proof",
        items: ["Last 3 months salary slips", "Last 6 months bank statement", "Form 16 / Last 2 years ITR"]
      },
      {
        category: "Property Documents",
        items: ["Agreement to Sell", "Allotment Letter", "Approved Building Plan (for construction)"]
      }
    ],
    faqs: [
      { question: "What is the PNB Home Loan interest rate for salaried employees?", answer: "Currently, PNB home loan interest rates for salaried employees start at 8.40% p.a., subject to a CIBIL score of 750 and above." },
      { question: "Does PNB charge a processing fee?", answer: "Normally, PNB charges a nominal fee of 0.35%, but currently, they have a 100% processing fee waiver under their festive bonanza scheme." },
      { question: "What is RLLR in PNB?", answer: "RLLR stands for Repo Linked Lending Rate. It means your home loan interest rate is directly tied to the RBI's repo rate. PNB's current base RLLR is linked to the 6.50% repo rate." }
    ]
  },
  "hdfc": {
    id: "hdfc",
    slug: "hdfc",
    name: "HDFC Bank",
    logo: "Building",
    seoTitle: "HDFC Home Loan Interest Rates 2026 | Fast Processing",
    seoDescription: "Apply for HDFC Home Loans with interest rates starting at 8.50% p.a. Experience lightning-fast approvals, flexible tenures, and minimal documentation.",
    salariedRate: "8.50% - 9.05%",
    selfEmployedRate: "8.65% - 9.35%",
    maxLTV: "90%",
    processingFee: "₹3,000 + GST (Flat)",
    processingFeeValue: 3000,
    baseRateType: "EBLR",
    baseRateValue: "6.50%",
    overview: [
      "HDFC Bank is India's premier private sector bank and a market leader in home financing. If speed, convenience, and premium customer service are your top priorities, an HDFC Home Loan is the ultimate choice. They offer a completely digitized loan sanction process that can approve your loan in record time.",
      "Through Bhardwaj Financial Services, applying for an HDFC home loan becomes even smoother. HDFC is renowned for its highly flexible credit policies. Whether you are a salaried employee in an MNC, a self-employed professional, or a business owner, HDFC customizes the loan structure to suit your specific cash flows.",
      "HDFC home loans are linked to their External Benchmark Lending Rate (EBLR). They offer specialized products like HDFC Home Loan Plus (which includes a top-up for renovation) and rural housing loans, ensuring there is a perfect product for every type of property buyer."
    ],
    benefits: [
      "Lightning-fast approvals with a fully digital, paperless onboarding process.",
      "Highly competitive interest rates starting at 8.50% p.a. for prime profiles.",
      "Customized repayment options including step-up and step-down EMIs.",
      "Integrated Top-Up loan facility available at the time of balance transfer.",
      "Vast network of pre-approved builder projects requiring zero legal checks."
    ],
    features: [
      {
        icon: "Zap",
        title: "Instant Approvals",
        description: "HDFC is known for its incredible turnaround time (TAT), ensuring you never lose out on a property deal."
      },
      {
        icon: "Map",
        title: "Pre-Approved Projects",
        description: "Thousands of builder projects across India are already pre-approved by HDFC for instant funding."
      },
      {
        icon: "Users",
        title: "Flexible Policies",
        description: "HDFC is highly accommodating of complex income profiles and co-applicant structures."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN, Aadhaar", "Voter ID / Passport"]
      },
      {
        category: "Income Proof",
        items: ["Latest 3 months salary slips", "Last 6 months salary account statement", "Form 16"]
      },
      {
        category: "Property Documents",
        items: ["Receipt of payment made to developer", "Allotment Letter / Buyer Agreement"]
      }
    ],
    faqs: [
      { question: "How fast can HDFC approve a home loan?", answer: "With a strong CIBIL score and proper digital income proofs, HDFC can generate an in-principle sanction within 24 to 48 hours." },
      { question: "Are there any prepayment charges in HDFC?", answer: "No, as per RBI mandates, HDFC does not charge any foreclosure or part-payment penalties on floating rate home loans for individuals." },
      { question: "What is the processing fee for HDFC Home Loans?", answer: "HDFC typically charges a flat login/processing fee of ₹3,000 + GST for standard salaried profiles, making it highly cost-effective." }
    ]
  },
  "icici": {
    id: "icici",
    slug: "icici",
    name: "ICICI Bank",
    logo: "Building",
    seoTitle: "ICICI Home Loan Interest Rates 2026 | Instant Sanction",
    seoDescription: "Get ICICI Bank Home Loans starting at 8.50% p.a. Enjoy instant digital sanctions, long tenures up to 30 years, and overdraft facilities.",
    salariedRate: "8.50% - 9.15%",
    selfEmployedRate: "8.65% - 9.40%",
    maxLTV: "90%",
    processingFee: "0.50% (Max ₹10,000)",
    processingFeeValue: 10000,
    baseRateType: "EBLR",
    baseRateValue: "6.50%",
    overview: [
      "ICICI Bank stands at the forefront of digital banking innovation in India. Their Home Loan products reflect this technological edge, offering customers the ability to get instant, AI-driven 'Express Home Loan' sanctions entirely online. If you are an existing ICICI bank customer, the process is practically frictionless.",
      "Bhardwaj Financial Services highly recommends ICICI Bank for customers looking for advanced loan products like the 'ICICI Home Overdraft'. This unique facility allows you to park your surplus savings in your home loan account to reduce your interest burden, and withdraw those funds whenever a need arises—giving you the ultimate liquidity.",
      "ICICI Bank offers extremely competitive interest rates starting at 8.50% p.a., with tenures extending up to 30 years. Their aggressive stance on balance transfers makes them a prime choice if you are looking to switch your existing expensive home loan to a cheaper rate."
    ],
    benefits: [
      "Express Home Loan facility for instant, digital in-principle sanctions.",
      "Home Overdraft (OD) facility to save interest while maintaining liquidity.",
      "Special, discounted interest rates for women borrowers.",
      "Aggressive balance transfer offers with instant Top-Up loan approvals.",
      "Seamless digital tracking and account management via the iMobile app."
    ],
    features: [
      {
        icon: "RefreshCw",
        title: "Home Overdraft Facility",
        description: "Park your surplus cash to reduce interest, and withdraw it anytime you need it."
      },
      {
        icon: "Zap",
        title: "Express Sanctions",
        description: "Existing customers and strong profiles can get digital sanctions in a matter of minutes."
      },
      {
        icon: "Box",
        title: "Easy Balance Transfers",
        description: "Switch your loan to ICICI with minimal paperwork and instant Top-Up limits."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Last 3 months salary slips", "Last 6 months bank statement", "Form 16"]
      },
      {
        category: "Property Documents",
        items: ["Agreement to Sell", "Chain deeds (for resale properties)"]
      }
    ],
    faqs: [
      { question: "What is the interest rate for women in ICICI?", answer: "ICICI Bank generally offers a concession of 0.05% (5 basis points) on the standard home loan interest rate if a woman is the primary applicant or co-applicant." },
      { question: "How does the ICICI Home Overdraft work?", answer: "It works like a current account linked to your home loan. Any surplus money you deposit reduces your outstanding principal for interest calculation, but you can withdraw that surplus anytime." },
      { question: "What is the maximum loan tenure in ICICI?", answer: "ICICI offers home loans with repayment tenures stretching up to 30 years, subject to the applicant's retirement age." }
    ]
  },
  "central-bank": {
    id: "central-bank",
    slug: "central-bank",
    name: "Central Bank of India",
    logo: "Building",
    seoTitle: "Central Bank of India Home Loan Rates 2026 | Cent Home Loan",
    seoDescription: "Apply for the Cent Home Loan at Central Bank of India. Enjoy lowest public sector rates starting at 8.35% p.a. and no hidden charges.",
    salariedRate: "8.35% - 9.10%",
    selfEmployedRate: "8.45% - 9.25%",
    maxLTV: "90%",
    processingFee: "Waived / Zero",
    processingFeeValue: 0,
    baseRateType: "RBLR",
    baseRateValue: "6.50%",
    overview: [
      "The Central Bank of India is a stalwart of the Indian public banking sector, known for offering some of the most aggressive and consumer-friendly loan schemes in the market. Their flagship 'Cent Home Loan' scheme is immensely popular for its rock-bottom interest rates and zero hidden charges.",
      "For cost-conscious borrowers, Central Bank of India is often the best choice. Starting at incredibly low rates of 8.35% p.a. (subject to CIBIL score), it significantly undercuts many private sector competitors. Furthermore, through Bhardwaj Financial Services, clients frequently benefit from 100% waivers on processing fees and documentation charges.",
      "The bank offers excellent terms for the purchase of new flats, construction on existing plots, and even for the purchase of older resale properties. Their rates are directly linked to the Repo Based Lending Rate (RBLR), ensuring complete transparency and immediate transmission of RBI rate cuts."
    ],
    benefits: [
      "Among the lowest interest rates in the market, starting at just 8.35% p.a.",
      "100% processing fee waivers available during campaign periods.",
      "No foreclosure or pre-payment penalties for floating rate loans.",
      "Flexible margin money (down payment) requirements depending on the loan quantum.",
      "Transparent RBLR pricing structure with zero hidden administrative costs."
    ],
    features: [
      {
        icon: "Percent",
        title: "Rock-Bottom Rates",
        description: "Enjoy one of the lowest starting interest rates in the entire banking industry."
      },
      {
        icon: "ShieldCheck",
        title: "No Hidden Costs",
        description: "Public sector transparency ensures you won't be hit with unexpected administrative or legal fees."
      },
      {
        icon: "Building",
        title: "Wide Acceptance",
        description: "Funds available for new builds, resale purchases, and even long-term leasehold properties."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card", "2 Passport size photographs"]
      },
      {
        category: "Income Proof",
        items: ["Last 3 months salary slips", "Last 6 months salary account statement", "Last 2 years ITR"]
      },
      {
        category: "Property Documents",
        items: ["Allotment Letter", "Agreement to Sell", "Approved layout plan"]
      }
    ],
    faqs: [
      { question: "What is the Cent Home Loan interest rate?", answer: "The Cent Home Loan interest rate starts at 8.35% p.a. for applicants with an excellent CIBIL score." },
      { question: "Is there a processing fee for Central Bank home loans?", answer: "Currently, Central Bank of India offers a complete waiver on processing fees for home loans under their retail loan campaigns." },
      { question: "Can NRIs apply for a Central Bank home loan?", answer: "Yes, the bank offers specialized 'Cent NRI Home Loan' schemes specifically designed for Non-Resident Indians." }
    ]
  },
  "sbi": {
    id: "sbi",
    slug: "sbi",
    name: "State Bank of India (SBI)",
    logo: "Building",
    seoTitle: "SBI Home Loan Interest Rates 2026 | Lowest Rates",
    seoDescription: "Apply for SBI Home Loans with the lowest interest rates starting at 8.40% p.a. Flexible repayment tenures and minimal processing fees.",
    salariedRate: "8.40% - 9.15%",
    selfEmployedRate: "8.55% - 9.25%",
    maxLTV: "90%",
    processingFee: "0.35% (Max ₹10,000)",
    processingFeeValue: 10000,
    baseRateType: "EBR",
    baseRateValue: "6.50%",
    overview: [
      "State Bank of India (SBI) is the largest and most trusted public sector bank in India, holding the highest market share in home loans. SBI Home Loans are synonymous with trust, transparency, and affordability.",
      "SBI offers a variety of specialized home loan schemes like SBI Regular Home Loan, SBI Balance Transfer, NRI Home Loans, and SBI Flexipay. When you apply through Bhardwaj Financial Services, we ensure seamless processing and competitive rates.",
      "With SBI, your interest rates are linked to the External Benchmark Rate (EBR), ensuring you get the direct benefit of any RBI rate cuts immediately."
    ],
    benefits: [
      "Extremely low interest rates starting from 8.40% p.a.",
      "No hidden administrative or legal charges.",
      "No foreclosure or pre-payment penalty.",
      "Concession for women borrowers.",
      "Home loan overdraft facility (SBI Maxgain) available."
    ],
    features: [
      {
        icon: "Percent",
        title: "Lowest Interest Rates",
        description: "SBI consistently offers the most competitive rates in the market."
      },
      {
        icon: "Shield",
        title: "Absolute Transparency",
        description: "No hidden charges, ensuring complete peace of mind."
      },
      {
        icon: "CheckCircle",
        title: "Women Concession",
        description: "Special discounted rates are available for women co-applicants."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card", "Passport size photographs"]
      },
      {
        category: "Income Proof",
        items: ["Last 3 months salary slips", "Last 6 months bank statement", "Form 16 / Last 3 years ITR"]
      },
      {
        category: "Property Documents",
        items: ["Agreement to Sell", "Approved Building Plan", "Occupancy Certificate"]
      }
    ],
    faqs: [
      { question: "What is the SBI Home Loan interest rate?", answer: "SBI home loan rates start at 8.40% p.a. for borrowers with high CIBIL scores." },
      { question: "Does SBI offer a home loan overdraft?", answer: "Yes, SBI offers the popular 'SBI Maxgain' scheme which functions as an overdraft facility on your home loan." },
      { question: "Is there a penalty for foreclosing an SBI Home Loan?", answer: "No, there are zero pre-payment or foreclosure charges on floating rate home loans." }
    ]
  },
  "axis": {
    id: "axis",
    slug: "axis",
    name: "Axis Bank",
    logo: "Building",
    seoTitle: "Axis Bank Home Loan Rates 2026 | Instant Approval",
    seoDescription: "Get Axis Bank Home Loans with interest rates starting at 8.55% p.a. Enjoy flexible EMIs, quick sanctions, and minimal documentation.",
    salariedRate: "8.55% - 9.10%",
    selfEmployedRate: "8.75% - 9.40%",
    maxLTV: "90%",
    processingFee: "Up to 1% of loan amount",
    processingFeeValue: 10000,
    baseRateType: "Repo Rate",
    baseRateValue: "6.50%",
    overview: [
      "Axis Bank is a leading private sector bank in India, offering home loans that are designed for speed, flexibility, and customer convenience. Whether you are buying a ready-to-move apartment or constructing a new house, Axis Bank has a tailored solution for you.",
      "They offer innovative products like the 'Asha Home Loan' for affordable housing and 'Fast Forward Home Loans' where 12 EMIs can be waived off for regular payers. With Bhardwaj Financial Services, the Axis Bank loan process is incredibly fast and hassle-free.",
      "Axis Bank's home loan rates are tied to the RBI Repo Rate, providing you with transparent pricing and the flexibility of floating rates."
    ],
    benefits: [
      "Fast and completely digital loan sanction process.",
      "EMI waivers available under specific Axis Bank schemes.",
      "Balance transfer facility with attractive top-up loan options.",
      "Long repayment tenure up to 30 years.",
      "Doorstep service and dedicated relationship management."
    ],
    features: [
      {
        icon: "Zap",
        title: "Fast Approvals",
        description: "Enjoy one of the quickest turnaround times in the private banking sector."
      },
      {
        icon: "Gift",
        title: "EMI Waivers",
        description: "Get up to 12 EMIs waived on regular, timely repayments under the Fast Forward scheme."
      },
      {
        icon: "Box",
        title: "Easy Balance Transfers",
        description: "Seamless process to transfer your existing high-interest loan to Axis Bank."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card or Passport"]
      },
      {
        category: "Income Proof",
        items: ["Latest 3 months salary slips", "Last 6 months bank statement", "Latest Form 16"]
      },
      {
        category: "Property Documents",
        items: ["Allotment Letter", "Agreement for Sale", "Registration Receipt"]
      }
    ],
    faqs: [
      { question: "What is the interest rate for Axis Bank home loans?", answer: "Rates start at 8.55% p.a. for salaried professionals with excellent credit scores." },
      { question: "How does the EMI waiver work?", answer: "Under the Fast Forward Home Loan scheme, Axis Bank waives 12 EMIs if you maintain a flawless repayment record for a specific period." },
      { question: "Can I get a top-up loan from Axis Bank?", answer: "Yes, you can easily avail a top-up loan on your existing home loan or when doing a balance transfer." }
    ]
  },
  "idbi": {
    id: "idbi",
    slug: "idbi",
    name: "IDBI Bank",
    logo: "Building",
    seoTitle: "IDBI Bank Home Loan Rates 2026 | Easy Financing",
    seoDescription: "Secure your dream home with IDBI Bank Home Loans starting at 8.45% p.a. Flexible terms, long tenures, and transparent processing.",
    salariedRate: "8.45% - 9.15%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% (Max ₹10,000)",
    processingFeeValue: 10000,
    baseRateType: "RLLR",
    baseRateValue: "6.50%",
    overview: [
      "IDBI Bank is renowned for its robust housing finance division, offering tailored home loan products to meet diverse customer needs. Their loans come with competitive interest rates and highly transparent terms.",
      "IDBI Home Loans cater to a wide range of requirements, including the purchase of constructed houses, construction on own plots, and home improvement. They have specially designed products like IDBI Home Loan Interest Saver which functions like an overdraft facility.",
      "Applying for an IDBI Bank home loan through Bhardwaj Financial Services ensures you get the best possible terms, quick processing, and complete assistance with documentation."
    ],
    benefits: [
      "Competitive interest rates linked to external benchmarks (RLLR).",
      "Flexible repayment options with step-up and step-down EMIs.",
      "Home Loan Interest Saver (Overdraft) facility available.",
      "No prepayment charges on floating rate home loans.",
      "Special rates for defense personnel and government employees."
    ],
    features: [
      {
        icon: "Percent",
        title: "Attractive Rates",
        description: "Benefit from highly competitive RLLR-linked interest rates."
      },
      {
        icon: "RefreshCw",
        title: "Interest Saver OD",
        description: "Deposit your surplus funds to save on interest outgo while retaining liquidity."
      },
      {
        icon: "Users",
        title: "Flexible Repayment",
        description: "Customize your EMIs according to your future income projections."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card", "Utility Bill (for address proof)"]
      },
      {
        category: "Income Proof",
        items: ["Last 3 months salary slips", "Last 6 months salary account statement", "Form 16 or ITR"]
      },
      {
        category: "Property Documents",
        items: ["Title Deeds", "Approved Plan", "NOC from Builder/Society"]
      }
    ],
    faqs: [
      { question: "What is the starting interest rate for IDBI Home Loans?", answer: "The starting interest rate is around 8.45% p.a. for applicants with good CIBIL scores." },
      { question: "What is the IDBI Home Loan Interest Saver?", answer: "It is an overdraft facility linked to your home loan account. Any surplus funds parked in it reduce your interest liability." },
      { question: "Does IDBI Bank provide loans for plot purchase?", answer: "Yes, IDBI Bank offers loans for the purchase of plots, provided construction is completed within a stipulated timeframe." }
    ]
  },
  "bob": {
    id: "bob",
    slug: "bob",
    name: "Bank of Baroda",
    logo: "Building",
    seoTitle: "Bank of Baroda Home Loan Rates 2026",
    seoDescription: "Get the best Bank of Baroda Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "RLLR",
    baseRateValue: "6.50%",
    overview: [
      "Bank of Baroda offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with Bank of Baroda is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for Bank of Baroda?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "boi": {
    id: "boi",
    slug: "boi",
    name: "Bank of India",
    logo: "Building",
    seoTitle: "Bank of India Home Loan Rates 2026",
    seoDescription: "Get the best Bank of India Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "RLLR",
    baseRateValue: "6.50%",
    overview: [
      "Bank of India offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with Bank of India is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for Bank of India?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "union-bank": {
    id: "union-bank",
    slug: "union-bank",
    name: "Union Bank of India",
    logo: "Building",
    seoTitle: "Union Bank of India Home Loan Rates 2026",
    seoDescription: "Get the best Union Bank of India Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "RLLR",
    baseRateValue: "6.50%",
    overview: [
      "Union Bank of India offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with Union Bank of India is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for Union Bank of India?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "canara-bank": {
    id: "canara-bank",
    slug: "canara-bank",
    name: "Canara Bank",
    logo: "Building",
    seoTitle: "Canara Bank Home Loan Rates 2026",
    seoDescription: "Get the best Canara Bank Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "RLLR",
    baseRateValue: "6.50%",
    overview: [
      "Canara Bank offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with Canara Bank is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for Canara Bank?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "indian-bank": {
    id: "indian-bank",
    slug: "indian-bank",
    name: "Indian Bank",
    logo: "Building",
    seoTitle: "Indian Bank Home Loan Rates 2026",
    seoDescription: "Get the best Indian Bank Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "RLLR",
    baseRateValue: "6.50%",
    overview: [
      "Indian Bank offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with Indian Bank is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for Indian Bank?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "kotak": {
    id: "kotak",
    slug: "kotak",
    name: "Kotak Mahindra Bank",
    logo: "Building",
    seoTitle: "Kotak Mahindra Bank Home Loan Rates 2026",
    seoDescription: "Get the best Kotak Mahindra Bank Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "Repo Rate",
    baseRateValue: "6.50%",
    overview: [
      "Kotak Mahindra Bank offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with Kotak Mahindra Bank is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for Kotak Mahindra Bank?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "indusind": {
    id: "indusind",
    slug: "indusind",
    name: "IndusInd Bank",
    logo: "Building",
    seoTitle: "IndusInd Bank Home Loan Rates 2026",
    seoDescription: "Get the best IndusInd Bank Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "Repo Rate",
    baseRateValue: "6.50%",
    overview: [
      "IndusInd Bank offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with IndusInd Bank is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for IndusInd Bank?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "yes-bank": {
    id: "yes-bank",
    slug: "yes-bank",
    name: "Yes Bank",
    logo: "Building",
    seoTitle: "Yes Bank Home Loan Rates 2026",
    seoDescription: "Get the best Yes Bank Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "Repo Rate",
    baseRateValue: "6.50%",
    overview: [
      "Yes Bank offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with Yes Bank is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for Yes Bank?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "federal-bank": {
    id: "federal-bank",
    slug: "federal-bank",
    name: "Federal Bank",
    logo: "Building",
    seoTitle: "Federal Bank Home Loan Rates 2026",
    seoDescription: "Get the best Federal Bank Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "Repo Rate",
    baseRateValue: "6.50%",
    overview: [
      "Federal Bank offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with Federal Bank is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for Federal Bank?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "idfc": {
    id: "idfc",
    slug: "idfc",
    name: "IDFC First Bank",
    logo: "Building",
    seoTitle: "IDFC First Bank Home Loan Rates 2026",
    seoDescription: "Get the best IDFC First Bank Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "Repo Rate",
    baseRateValue: "6.50%",
    overview: [
      "IDFC First Bank offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with IDFC First Bank is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for IDFC First Bank?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "bandhan": {
    id: "bandhan",
    slug: "bandhan",
    name: "Bandhan Bank",
    logo: "Building",
    seoTitle: "Bandhan Bank Home Loan Rates 2026",
    seoDescription: "Get the best Bandhan Bank Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "Repo Rate",
    baseRateValue: "6.50%",
    overview: [
      "Bandhan Bank offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with Bandhan Bank is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for Bandhan Bank?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "bajaj": {
    id: "bajaj",
    slug: "bajaj",
    name: "Bajaj Housing Finance",
    logo: "Building",
    seoTitle: "Bajaj Housing Finance Home Loan Rates 2026",
    seoDescription: "Get the best Bajaj Housing Finance Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "PLR",
    baseRateValue: "6.50%",
    overview: [
      "Bajaj Housing Finance offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with Bajaj Housing Finance is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for Bajaj Housing Finance?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "lic": {
    id: "lic",
    slug: "lic",
    name: "LIC Housing Finance",
    logo: "Building",
    seoTitle: "LIC Housing Finance Home Loan Rates 2026",
    seoDescription: "Get the best LIC Housing Finance Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "PLR",
    baseRateValue: "6.50%",
    overview: [
      "LIC Housing Finance offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with LIC Housing Finance is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for LIC Housing Finance?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "tata-capital": {
    id: "tata-capital",
    slug: "tata-capital",
    name: "Tata Capital",
    logo: "Building",
    seoTitle: "Tata Capital Home Loan Rates 2026",
    seoDescription: "Get the best Tata Capital Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "PLR",
    baseRateValue: "6.50%",
    overview: [
      "Tata Capital offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with Tata Capital is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for Tata Capital?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "pnb-housing": {
    id: "pnb-housing",
    slug: "pnb-housing",
    name: "PNB Housing Finance",
    logo: "Building",
    seoTitle: "PNB Housing Finance Home Loan Rates 2026",
    seoDescription: "Get the best PNB Housing Finance Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "PLR",
    baseRateValue: "6.50%",
    overview: [
      "PNB Housing Finance offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with PNB Housing Finance is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for PNB Housing Finance?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "lnt-finance": {
    id: "lnt-finance",
    slug: "lnt-finance",
    name: "L&T Finance",
    logo: "Building",
    seoTitle: "L&T Finance Home Loan Rates 2026",
    seoDescription: "Get the best L&T Finance Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "PLR",
    baseRateValue: "6.50%",
    overview: [
      "L&T Finance offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with L&T Finance is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for L&T Finance?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
  "chola": {
    id: "chola",
    slug: "chola",
    name: "Cholamandalam",
    logo: "Building",
    seoTitle: "Cholamandalam Home Loan Rates 2026",
    seoDescription: "Get the best Cholamandalam Home Loan interest rates. Check eligibility and apply online.",
    salariedRate: "8.50% - 9.20%",
    selfEmployedRate: "8.60% - 9.35%",
    maxLTV: "90%",
    processingFee: "0.50% - 1%",
    processingFeeValue: 5000,
    baseRateType: "PLR",
    baseRateValue: "6.50%",
    overview: [
      "Cholamandalam offers highly competitive home loan products designed to meet diverse financial needs.",
      "With flexible tenures and simplified documentation, applying for a home loan with Cholamandalam is a seamless experience."
    ],
    benefits: [
      "Competitive interest rates.",
      "Flexible repayment options.",
      "Quick and transparent processing."
    ],
    features: [
      {
        icon: "Shield",
        title: "Reliable & Secure",
        description: "Trusted financing with transparent charges."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick approval for eligible profiles."
      }
    ],
    documents: [
      {
        category: "KYC Documents",
        items: ["PAN Card", "Aadhaar Card"]
      },
      {
        category: "Income Proof",
        items: ["Salary Slips", "Bank Statements"]
      }
    ],
    faqs: [
      { question: "What is the minimum interest rate for Cholamandalam?", answer: "Rates start from 8.50% p.a. depending on your CIBIL score." }
    ]
  },
};
