import { Metadata } from "next";
import PersonalLoanClient from "./PersonalLoanClient";
import { prisma } from "@/lib/prisma";
import { buildLoanGraph } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Personal Loan in Agra, Mathura & NCR | Instant Approval & 50+ Top Banks | BFS",
  description: "Bhardwaj Financial Services se payein apni zaroorat anusaar personal loan. Collateral-free funding from ₹50,000 to ₹25 Lakhs, 24-48 hours disbursal across Agra, Mathura & Delhi-NCR. 100% Free Consultation.",
  keywords: [
    "Personal Loan Agra",
    "Instant Personal Loan Agra",
    "Personal Loan Mathura",
    "Personal Loan NCR",
    "Personal loan eligibility check",
    "Low CIBIL personal loan Agra",
    "Personal loan for salaried employees",
    "Personal loan for self employed",
    "Debt consolidation personal loan",
    "Bhardwaj Financial Services Personal Loan",
    "Personal Loan Sanjay Place Agra",
    "Quick personal loan disbursal"
  ],
  alternates: { canonical: "https://bfsfin.com/products/personal-loan" }
};

export default async function PersonalLoanPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: 'products/personal-loan' } });

  const structuredData = buildLoanGraph({
    name: "Personal Loan",
    description: "Fast collateral-free personal loans from ₹50,000 to ₹25 Lakhs with 50+ leading bank and NBFC partners, same-day verification, and 24-48 hours disbursal across Agra, Mathura & NCR.",
    slug: "personal-loan",
    minAmount: 50000,
    maxAmount: 2500000,
    tenureYears: 5,
    faqs: [
      {
        question: "Agar pehle kisi bank se dikkat ya pareshani aayi ho, toh kya Personal Loan mil sakta hai?",
        answer: "Ji haan. Har bank ki internal policy aur CIBIL criteria alag hota hai. Hum aapki profile evaluate karke sahi bank ya NBFC mein aapki file lagate hain jahan aasan approval mil sake."
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
