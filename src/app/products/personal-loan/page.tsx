import { Metadata } from "next";
import PersonalLoanClient from "./PersonalLoanClient";
import { prisma } from "@/lib/prisma";
import { buildLoanGraph } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Instant Personal Loan in Agra, Mathura & NCR | Bank Reject Solution & Best Rates 10.50%*",
  description: "Bank ne Personal Loan reject kar diya? Bhardwaj Financial Services se payein sahi bank aur sahi salah. Instant approval from ₹50,000 to ₹25 Lakhs, 10.50%* starting rate, 24-48 hr disbursal in Agra, Mathura & NCR.",
  keywords: [
    "Personal Loan Agra",
    "Instant Personal Loan Agra",
    "Personal Loan Mathura",
    "Personal Loan NCR",
    "Personal loan reject hone par kya kare",
    "Low CIBIL personal loan Agra",
    "Personal loan for salaried employees",
    "Personal loan for self employed",
    "Debt consolidation personal loan",
    "Bhardwaj Financial Services Personal Loan",
    "Personal Loan Sanjay Place Agra",
    "10.50 personal loan interest rate"
  ],
  alternates: { canonical: "https://bfsfin.com/products/personal-loan" }
};

export default async function PersonalLoanPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: 'products/personal-loan' } });

  const structuredData = buildLoanGraph({
    name: "Personal Loan",
    description: "Fast collateral-free personal loans from ₹50,000 to ₹25 Lakhs with 10.50%* starting interest rate, rejected file solutions, and 24-48 hours disbursal across Agra, Mathura & NCR.",
    slug: "personal-loan",
    startingRate: "10.50",
    minAmount: 50000,
    maxAmount: 2500000,
    tenureYears: 5,
    faqs: [
      {
        question: "Mera loan ek bank se reject ho gaya hai, kya mujhe Personal Loan mil sakta hai?",
        answer: "Ji haan. Har bank ki internal policy aur CIBIL criteria alag hota hai. Hum aapki rejection wajah dekh kar doosre sahi bank ya NBFC mein aapki file lagate hain jahan approval mil sake."
      },
      {
        question: "Loan approve hone mein kitna samay lagta hai?",
        answer: "Sahi documents aur bank statement milne ke baad aksar 24 se 48 ghante mein sanction aur disbursement process poora ho jata hai."
      },
      {
        question: "Kya Bhardwaj Financial Services koi advance fee leta hai?",
        answer: "Nahi, hum file check karne ya eligibility batane ke liye koi advance paisa nahi lete. Bank ki jo bhi official processing fee hoti hai, woh seedha aapke loan amount se adjust hoti hai."
      },
      {
        question: "Aap kin shehron mein Personal Loan ki service dete hain?",
        answer: "Hamara mukhya office Block-C11, Shop No.-5, First Floor, Sanjay Place, Agra mein hai. Hum Agra, Mathura, Firozabad, Hathras, Aligarh, Mainpuri aur Delhi-NCR (Noida/Gurgaon) mein fast doorstep service dete hain."
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
