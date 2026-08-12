const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding BFS Agra Database...');

  // 1. Bank Rates
  await prisma.bankRate.deleteMany();
  await prisma.bankRate.createMany({
    data: [
      {
        bankName: "Punjab National Bank (PNB)",
        category: "Salaried",
        interestRate: 6.50,
        minRate: 6.50,
        maxRate: 7.10,
        processingFee: "₹2,500 + GST",
        speedDays: 5,
        badge: "Lowest Interest Rate",
      },
      {
        bankName: "Central Bank of India",
        category: "Salaried",
        interestRate: 6.70,
        minRate: 6.70,
        maxRate: 7.25,
        processingFee: "₹2,000 Zero Fee Special",
        speedDays: 7,
        badge: "Fast Disbursal",
      },
      {
        bankName: "IDBI Bank",
        category: "Salaried",
        interestRate: 6.60,
        minRate: 6.60,
        maxRate: 7.20,
        processingFee: "₹2,200",
        speedDays: 6,
        badge: "Best for Self-Employed",
      },
      {
        bankName: "HDFC Bank",
        category: "Salaried",
        interestRate: 6.75,
        minRate: 6.75,
        maxRate: 7.50,
        processingFee: "₹3,000",
        speedDays: 8,
        badge: "Highest Approval Rate",
      },
      {
        bankName: "ICICI Bank",
        category: "Salaried",
        interestRate: 6.80,
        minRate: 6.80,
        maxRate: 7.60,
        processingFee: "₹3,500",
        speedDays: 9,
        badge: "Pre-Approved Offers",
      },
      {
        bankName: "State Bank of India (SBI)",
        category: "Salaried",
        interestRate: 6.85,
        minRate: 6.85,
        maxRate: 7.40,
        processingFee: "₹1,500",
        speedDays: 10,
        badge: "Government Bank Trust",
      },
      {
        bankName: "PNB Housing",
        category: "Balance Transfer",
        interestRate: 6.45,
        minRate: 6.45,
        maxRate: 6.95,
        processingFee: "₹1,999 Special BT",
        speedDays: 5,
        badge: "Special BT Rates",
      }
    ]
  });

  // 2. Users
  await prisma.user.deleteMany();
  const admin = await prisma.user.create({
    data: {
      name: "Adv. Praveen Bhardwaj",
      email: "admin@bfsagra.com",
      phone: "7900979001",
      role: "ADMIN",
      city: "Agra",
      referralCode: "BFS-ADMIN-001"
    }
  });

  const officer = await prisma.user.create({
    data: {
      name: "Rajesh Sharma",
      email: "rajesh.officer@bfsagra.com",
      phone: "7900979002",
      role: "EMPLOYEE",
      city: "Agra",
      referralCode: "BFS-EMP-001"
    }
  });

  const customer = await prisma.user.create({
    data: {
      name: "Rajesh Kumar",
      email: "rajesh@email.com",
      phone: "9876543210",
      role: "CUSTOMER",
      city: "Agra",
      referralCode: "BFS-RAJESH-CUST001"
    }
  });

  const partner = await prisma.user.create({
    data: {
      name: "Amit Patel (Patel & Co.)",
      email: "patel.partner@email.com",
      phone: "9812345678",
      role: "PARTNER",
      city: "Agra",
      referralCode: "BFS-PATEL-DEALER01"
    }
  });

  // 3. Applications
  await prisma.application.deleteMany();
  const app = await prisma.application.create({
    data: {
      appNo: "APP-2024-00123",
      customerId: customer.id,
      assignedOfficerId: officer.id,
      loanType: "Home Loan",
      loanAmount: 3000000,
      tenureYears: 20,
      purpose: "Self-Occupied Residential Property",
      propertyLocation: "Sanjay Place, Agra",
      monthlyEmi: 22367,
      processingFee: 2500,
      estimatedRate: 6.50,
      assignedBank: "PNB",
      secondaryBank: "Central Bank of India",
      employmentType: "Salaried",
      companyName: "XYZ Corporation Pvt Ltd",
      designation: "Senior Software Engineer",
      annualIncome: 1800000,
      status: "DOCUMENTS_VERIFYING",
      progress: 40,
      expectedApproval: new Date(Date.now() + 3 * 86400000),
      documents: {
        create: [
          {
            category: "Salary Slip",
            title: "Salary Slips (Last 3 Months)",
            fileUrl: "/docs/sample_salary_slip.pdf",
            status: "VERIFIED",
            verifiedBy: "Priya Gupta",
            verifiedAt: new Date()
          },
          {
            category: "Bank Statement",
            title: "Bank Statement (Last 6 Months)",
            fileUrl: "/docs/sample_bank_stmt.pdf",
            status: "VERIFIED",
            verifiedBy: "Priya Gupta",
            verifiedAt: new Date()
          },
          {
            category: "PAN Card",
            title: "PAN Card Document",
            fileUrl: "/docs/sample_pan.pdf",
            status: "PENDING"
          },
          {
            category: "Aadhaar Card",
            title: "Aadhaar Card Copy",
            fileUrl: "/docs/sample_aadhaar.jpg",
            status: "REJECTED",
            rejectReason: "Image quality too blurry. Please upload high-resolution scan."
          }
        ]
      },
      timeline: {
        create: [
          {
            title: "Application Received",
            description: "Your application has been received into BFS Agra portal.",
            status: "COMPLETED",
            timestamp: new Date(Date.now() - 48 * 3600000)
          },
          {
            title: "Initial Verification Done",
            description: "Income documents verified. Aadhaar requested for reupload.",
            status: "COMPLETED",
            timestamp: new Date(Date.now() - 24 * 3600000)
          },
          {
            title: "Document Re-verification",
            description: "Awaiting clear Aadhaar reupload.",
            status: "IN_PROGRESS",
            timestamp: new Date()
          },
          {
            title: "Bank Submission",
            description: "Dossier will be submitted to PNB Agra Branch.",
            status: "PENDING"
          },
          {
            title: "Bank Sanction & Disbursal",
            description: "Final approval letter and cheque issuance.",
            status: "PENDING"
          }
        ]
      }
    }
  });

  // 4. Leads
  await prisma.lead.deleteMany();
  await prisma.lead.createMany({
    data: [
      {
        name: "Rajesh Kumar",
        phone: "9876543210",
        email: "rajesh@email.com",
        loanType: "Home Loan",
        loanAmount: 3000000,
        income: 1800000,
        city: "Agra",
        employmentType: "Salaried",
        source: "Dealer Referral",
        referralCode: "BFS-PATEL-DEALER01",
        status: "APPROVED",
        userId: customer.id
      },
      {
        name: "Priya Sharma",
        phone: "9987654321",
        email: "priya.s@gmail.com",
        loanType: "Balance Transfer",
        loanAmount: 2500000,
        income: 1200000,
        city: "Agra",
        employmentType: "Salaried",
        source: "Facebook Ads",
        status: "APPLICATION_FILED"
      },
      {
        name: "Amit Patel",
        phone: "9765432109",
        email: "amit.patel@business.com",
        loanType: "Loan Against Property",
        loanAmount: 5000000,
        income: 3000000,
        city: "Agra",
        employmentType: "Self-Employed",
        source: "Google Search",
        status: "APPROVED"
      },
      {
        name: "Neha Singh",
        phone: "9876512345",
        email: "neha.singh@yahoo.com",
        loanType: "Home Loan",
        loanAmount: 2000000,
        income: 900000,
        city: "Agra",
        employmentType: "Salaried",
        source: "Direct Search",
        status: "NEW"
      }
    ]
  });

  // 5. Testimonials
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Rajesh Kumar",
        role: "Property Buyer",
        location: "Sanjay Place, Agra",
        stars: 5,
        quote: "Approved in 4 days! Process was super smooth. Highly recommended.",
        detail: "Got my ₹30 Lakh Home Loan approved through PNB at just 6.50% interest. No hidden charges and complete support.",
        loanAmount: "₹30 Lakhs",
        daysTaken: "4 Days",
        bankName: "PNB",
        rate: "6.50%"
      },
      {
        name: "Priya Sharma",
        role: "Senior Teacher",
        location: "Naya Bans, Agra",
        stars: 5,
        quote: "Best service ever! No hassle, no hidden fees. BFS is the real deal.",
        detail: "Switched my existing loan via Balance Transfer and saved over ₹14 Lakhs in interest over 20 years!",
        loanAmount: "₹25 Lakhs",
        daysTaken: "3 Days",
        bankName: "Central Bank of India",
        rate: "6.70%"
      },
      {
        name: "Patel & Co. (Amit Patel)",
        role: "Real Estate Partner",
        location: "Fatehabad Road, Agra",
        stars: 5,
        quote: "Best partner portal for my clients. Fast approval and prompt commission payout.",
        detail: "Referred 15+ home buyers to BFS Agra. Every application was handled with extreme care and zero delays.",
        loanAmount: "₹50 Lakhs Avg",
        daysTaken: "5 Days",
        bankName: "IDBI Bank",
        rate: "6.60%"
      }
    ]
  });

  // 6. Blog Articles
  await prisma.blogArticle.deleteMany();
  await prisma.blogArticle.createMany({
    data: [
      {
        title: "Tax Benefits of Home Loans in 2026: Save Up to ₹5 Lakhs",
        slug: "tax-benefits-home-loan-guide-2026",
        summary: "Understand Section 24, Section 80C, and 80EEA to maximize your income tax deductions on home loan principal and interest.",
        category: "Tax Guidance",
        readTime: "5 min read",
        content: `Home loan borrowers in Agra and across India can claim significant tax deductions under the Income Tax Act...`
      },
      {
        title: "Home Loan Balance Transfer Guide: Save Millions on Interest",
        slug: "balance-transfer-ultimate-guide",
        summary: "Are you paying more than 7.5% interest on your existing home loan? Learn how transferring to PNB or Cent Bank can cut your EMI.",
        category: "Balance Transfer",
        readTime: "7 min read",
        content: `A Home Loan Balance Transfer allows you to switch your existing home loan balance to a new bank offering lower interest rates...`
      },
      {
        title: "5 Proven Ways to Boost Your CIBIL Score Above 750 Fast",
        slug: "boost-cibil-score-home-loan-approval",
        summary: "Your credit score dictates your loan interest rate. Here is how to fix errors, lower credit utilization, and get instant 6.5% rate eligibility.",
        category: "Credit Rating",
        readTime: "4 min read",
        content: `A CIBIL score of 750+ opens the doors to preferred interest rates starting at 6.50% p.a...`
      }
    ]
  });

  // 7. Payouts
  await prisma.payout.deleteMany();
  await prisma.payout.createMany({
    data: [
      {
        userId: partner.id,
        amount: 15000,
        status: "PAID",
        leadName: "Rajesh Kumar",
        loanAmount: 3000000,
        date: new Date(Date.now() - 10 * 86400000)
      },
      {
        userId: partner.id,
        amount: 25000,
        status: "PAID",
        leadName: "Amit Patel",
        loanAmount: 5000000,
        date: new Date(Date.now() - 5 * 86400000)
      },
      {
        userId: partner.id,
        amount: 12000,
        status: "PENDING",
        leadName: "Priya Sharma",
        loanAmount: 2500000,
        date: new Date()
      }
    ]
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
