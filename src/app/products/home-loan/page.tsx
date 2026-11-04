import { Metadata } from "next";
import HomeLoanClient from "./HomeLoanClient";
import { PrismaClient } from "@prisma/client";
import { buildLoanGraph } from "@/lib/seo-schema";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Best Home Loans in Agra & India starting 7.15%* | Fast 5-Day Sanction | Bhardwaj Finance",
  description: "Apply for the lowest interest rate home loans starting 7.15%* with direct bank approvals (HDFC, SBI, ICICI, PNB). Up to 90% property funding with 30-year tenure, zero brokerage, and doorstep document pickup across Agra, UP & India.",
  keywords: [
    "Home Loan Provider Agra",
    "Home Loan Agra",
    "Home Loan in Sanjay Place",
    "Home Loan in Kamla Nagar",
    "Home Loan in Dayalbagh",
    "Home Loan in Shahganj",
    "Best home loan Agra",
    "Top home loan Agra",
    "Low interest home loan Agra",
    "Near me home loan Agra",
    "Quick approval home loan Agra",
    "Mortgage Loan Agra",
    "Finance Broker Agra",
    "Mortgage Broker Agra",
    "Loan Consultant Agra",
    "Bhardwaj Financial Services Home Loan",
    "Bhardwaj Financial Services Agra"
  ],
  alternates: { canonical: "https://bfsfin.com/products/home-loan" }
};

export default async function HomeLoanPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: 'products/home-loan' } });
  const rateSetting = await prisma.systemSetting.findUnique({ where: { key: 'homeLoanRate' } });
  const startingRate = rateSetting?.value || "6.50";

  const structuredData = buildLoanGraph({
    name: "Home Loan",
    description: "Get up to 90% financing for your dream home with zero hidden brokerage and 30-year tenure from BFS.",
    slug: "home-loan",
    startingRate: startingRate,
    minAmount: 500000,
    maxAmount: 100000000,
    tenureYears: 30,
    faqs: [
      {
        question: "What is the minimum interest rate for a Home Loan at BFS?",
        answer: "Home loan interest rates at BFS start from 6.50% to 7.15% per annum based on CIBIL score, income stability, and loan amount."
      },
      {
        question: "How much loan amount can I get for a Home Loan?",
        answer: "BFS offers financing up to 85%-90% of the property value, with loan amounts ranging from ₹10 Lakhs up to ₹10 Crores."
      },
      {
        question: "What is the maximum repayment tenure for a home loan?",
        answer: "The maximum repayment tenure offered for home loans is up to 30 years."
      },
      {
        question: "What documents are required to apply for a Home Loan?",
        answer: "PAN card, Aadhaar card, last 3 months salary slips or 2 years ITR for self-employed, last 6 months bank statements, and property chain documents."
      }
    ]
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeLoanClient 
        heroImageUrl={heroImage?.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
        startingRate={startingRate}
      />
    </>
  );
}
