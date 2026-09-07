const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedTaxFaqs() {
  console.log("Seeding ITR and MSME FAQs into CalculatorFAQ table...");

  const itrFaqs = [
    {
      calculatorId: "itr-filing",
      question: "Why is filing ITR important if my income is below the taxable limit?",
      answer: "Filing a Nil or basic ITR creates an authentic financial track record with the Government of India. It is mandatory for applying for Home Loans, Business Loans, Credit Cards, Visa approvals, and claiming TDS refunds.",
      sortOrder: 1,
      isActive: true,
    },
    {
      calculatorId: "itr-filing",
      question: "How does BFS help in preparing Loan-Ready ITR?",
      answer: "Banks reject loans when declared ITR income does not match banking cash-flows. BFS's financial consultants analyze your bank statements first and file your ITR in full compliance with banking credit underwriting norms so your loan gets approved in 5 days.",
      sortOrder: 2,
      isActive: true,
    },
    {
      calculatorId: "itr-filing",
      question: "Can I file my ITR for previous 2-3 years if I missed the deadline?",
      answer: "Yes. Under Section 139(8A) (Updated Return / ITR-U), you can file returns for past 2 financial years with nominal late fees. Our CAs will compute the exact taxes and file your backlog returns smoothly.",
      sortOrder: 3,
      isActive: true,
    },
    {
      calculatorId: "itr-filing",
      question: "How fast do I get the official Income Tax Acknowledgement (ITR-V)?",
      answer: "Once you verify the OTP, your return is e-filed and you receive the official Government of India ITR Acknowledgement (ITR-V) receipt within 24 to 48 hours.",
      sortOrder: 4,
      isActive: true,
    },
    {
      calculatorId: "itr-filing",
      question: "What is the difference between New Tax Regime and Old Tax Regime?",
      answer: "Under the New Tax Regime, income up to ₹7 Lakhs is completely tax-free with Section 87A rebate, with lower slab rates but no deductions. Under the Old Regime, you can claim 80C (₹1.5L), 80D Mediclaim, and Home Loan interest (₹2L). BFS calculates both and files whichever saves you the maximum tax.",
      sortOrder: 5,
      isActive: true,
    }
  ];

  const msmeFaqs = [
    {
      calculatorId: "msme-registration",
      question: "How fast is the MSME / Udyam Registration certificate issued?",
      answer: "Once your Aadhaar and business details are verified via OTP, BFS submits your application on the official Ministry of MSME portal. The digital government certificate (with QR code and lifetime validity) is issued within 24 to 48 hours.",
      sortOrder: 1,
      isActive: true,
    },
    {
      calculatorId: "msme-registration",
      question: "Can I get a bank loan without collateral after MSME registration?",
      answer: "Yes! Registered MSMEs are eligible for the Government of India's CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises) scheme, offering collateral-free term loans and working capital limits up to ₹5 Crore from PNB, SBI, HDFC, and other banks.",
      sortOrder: 2,
      isActive: true,
    },
    {
      calculatorId: "msme-registration",
      question: "Is GST number compulsory for MSME Udyam registration?",
      answer: "GSTIN is not mandatory for enterprises that are exempt under GST laws (e.g. service providers below ₹20L turnover or traders below ₹40L turnover). A PAN and Aadhaar card are sufficient to obtain your Udyam Certificate.",
      sortOrder: 3,
      isActive: true,
    },
    {
      calculatorId: "msme-registration",
      question: "What is the validity period of an Udyam Certificate?",
      answer: "Udyam Registration has Lifetime Validity. There is no renewal fee or annual re-registration required. However, annual turnover updates can be synced smoothly.",
      sortOrder: 4,
      isActive: true,
    },
    {
      calculatorId: "msme-registration",
      question: "What interest rate discounts do banks offer to registered MSMEs?",
      answer: "Most PSU and private banks provide a 0.50% to 1.00% interest rate rebate on business loans, Cash Credit (CC), and Overdraft (OD) facilities for Udyam registered units in priority sectors.",
      sortOrder: 5,
      isActive: true,
    }
  ];

  for (const faq of [...itrFaqs, ...msmeFaqs]) {
    const existing = await prisma.calculatorFAQ.findFirst({
      where: {
        calculatorId: faq.calculatorId,
        question: faq.question
      }
    });

    if (!existing) {
      await prisma.calculatorFAQ.create({
        data: faq
      });
      console.log(`Created FAQ for ${faq.calculatorId}: ${faq.question.substring(0, 40)}...`);
    } else {
      console.log(`FAQ already exists for ${faq.calculatorId}`);
    }
  }

  console.log("Seeding complete!");
  await prisma.$disconnect();
}

seedTaxFaqs().catch(e => {
  console.error(e);
  process.exit(1);
});
