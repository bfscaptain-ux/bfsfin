import { Metadata } from "next";
import LoanAgainstPropertyClient from "./LoanAgainstPropertyClient";
import { PrismaClient } from "@prisma/client";
import { buildLoanGraph } from "@/lib/seo-schema";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Loan Against Property (LAP) & Mortgage Loan Agra | Up to ₹15 Cr | Bhardwaj Finance",
  description: "Unlock up to 75% market value of your residential, commercial, or industrial property at low starting ROI (from 7.50%*). Fast sanction, 20-year tenure, zero brokerage in Agra, UP & India.",
  keywords: [
    "Loan Against Property Agra",
    "Mortgage Loan Agra",
    "Mortgage Broker Agra",
    "Mortgage Lender Agra",
    "Best loan against property Agra",
    "Top loan against property Agra",
    "Low interest loan against property Agra",
    "Near me loan against property Agra",
    "Loan Against Property Sanjay Place Agra",
    "Loan Against Property Kamla Nagar Agra",
    "Loan Against Property Dayalbagh Agra",
    "Loan Against Property Shahganj Agra",
    "LAP Loan Consultant Agra",
    "Bhardwaj Financial Services LAP"
  ],
  alternates: { canonical: "https://bfsfin.com/products/loan-against-property" }
};

export default async function LoanAgainstPropertyPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: 'products/loan-against-property' } });
  const rateSetting = await prisma.systemSetting.findUnique({ where: { key: 'lapRate' } });
  const startingRate = rateSetting?.value || "7.50";

  const structuredData = buildLoanGraph({
    name: "Loan Against Property (LAP)",
    description: "Unlock high-value liquidity up to ₹15 Crores by mortgaging residential, commercial, or industrial property at low starting ROI.",
    slug: "loan-against-property",
    startingRate: startingRate,
    minAmount: 1000000,
    maxAmount: 150000000,
    tenureYears: 20,
    faqs: [
      {
        question: "What types of property can be pledged for LAP?",
        answer: "Freehold residential properties, commercial offices, retail shops, and select industrial units can be mortgaged."
      },
      {
        question: "What is the maximum LTV (Loan-to-Value) available for LAP?",
        answer: "BFS offers up to 65%-75% of the market valuation of residential property and up to 60% for commercial units."
      }
    ]
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LoanAgainstPropertyClient 
        heroImageUrl={heroImage?.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
        startingRate={startingRate}
      />
    </>
  );
}
