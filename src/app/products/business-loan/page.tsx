import { Metadata } from "next";
import BusinessLoanClient from "./BusinessLoanClient";
import { PrismaClient } from "@prisma/client";
import { buildLoanGraph } from "@/lib/seo-schema";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Business Loans up to ₹1 Cr | BFS",
  description: "Fuel your business growth with unsecured business loans. Quick 48-hour approvals and flexible repayment options.",
  alternates: { canonical: "https://bfsfin.com/products/business-loan" }
};

export default async function BusinessLoanPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: 'products/business-loan' } });
  const rateSetting = await prisma.systemSetting.findUnique({ where: { key: 'businessLoanRate' } });
  const startingRate = rateSetting?.value || "12.50";

  const structuredData = buildLoanGraph({
    name: "Business Loan",
    description: "Unsecured business loans up to ₹1 Crore for MSMEs and enterprises with 48-hour disbursement and flexible tenure.",
    slug: "business-loan",
    startingRate: startingRate,
    minAmount: 100000,
    maxAmount: 10000000,
    tenureYears: 5,
    faqs: [
      {
        question: "Is collateral required for a BFS Business Loan?",
        answer: "No, our collateral-free business loans up to ₹50 Lakhs - ₹1 Crore require zero property mortgage or collateral."
      },
      {
        question: "How fast is a business loan approved and disbursed?",
        answer: "In-principle approvals are granted within 24-48 hours upon submitting valid GST returns, bank statements, and business KYC."
      },
      {
        question: "What is the minimum CIBIL score required for business loans?",
        answer: "A CIBIL score of 650 or higher is preferred for quick sanction at the lowest interest rates."
      }
    ]
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BusinessLoanClient 
        heroImageUrl={heroImage?.imageUrl || "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
        startingRate={startingRate}
      />
    </>
  );
}
