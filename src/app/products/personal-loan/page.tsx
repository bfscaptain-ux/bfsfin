import { Metadata } from "next";
import PersonalLoanClient from "./PersonalLoanClient";
import { prisma } from "@/lib/prisma";
import { buildLoanGraph } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Instant Personal Loans in Agra & India up to ₹50 Lakhs | Bhardwaj Finance",
  description: "Instant personal loans up to ₹50 Lakhs for salaried and self-employed professionals with lowest interest rates, same-day approval, and digital processing in Agra, UP & India.",
  keywords: [
    "Personal Loan Agra",
    "Best personal loan Agra",
    "Top personal loan Agra",
    "Low interest personal loan Agra",
    "Quick approval personal loan Agra",
    "Near me personal loan Agra",
    "Personal Loan Sanjay Place Agra",
    "Personal Loan Kamla Nagar Agra",
    "Personal Loan Dayalbagh Agra",
    "Personal Loan Shahganj Agra",
    "Instant Personal Loan India",
    "Bhardwaj Financial Services Personal Loan"
  ],
  alternates: { canonical: "https://bfsfin.com/products/personal-loan" }
};

export default async function PersonalLoanPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: 'products/personal-loan' } });

  const structuredData = buildLoanGraph({
    name: "Personal Loan",
    description: "Fast unsecured personal loans up to ₹50 Lakhs with minimum documentation, instant sanction, and competitive interest rates.",
    slug: "personal-loan",
    startingRate: "10.50",
    minAmount: 50000,
    maxAmount: 5000000,
    tenureYears: 7,
    faqs: [
      {
        question: "What is the minimum salary required for a personal loan?",
        answer: "A net take-home monthly salary of ₹20,000 or more is required for salaried applicants."
      },
      {
        question: "Can I pre-pay or foreclose my personal loan early?",
        answer: "Yes, part-prepayment and full foreclosure options are available as per standard bank terms."
      },
      {
        question: "How long does personal loan disbursement take?",
        answer: "Disbursement happens in as quick as 24 hours after digital KYC and income verification."
      }
    ]
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PersonalLoanClient heroImageUrl={heroImage?.imageUrl || undefined} />
    </>
  );
}
