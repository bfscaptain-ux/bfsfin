import { Metadata } from "next";
import HomeLoanClient from "./HomeLoanClient";
import { PrismaClient } from "@prisma/client";
import { buildLoanGraph } from "@/lib/seo-schema";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Home Loan in India & Agra starting 7.15%* | Bhardwaj Financial Services – Expert Loan Advisor",
  description: "Apply for the best home loan in India & Agra starting 7.15%* p.a. Calculate EMI, check eligibility, view documents required, compare SBI, HDFC, ICICI, PNB rates, and get 5-day fast approval with Bhardwaj Financial Services.",
  keywords: [
    "home loan",
    "home loan interest rate",
    "home loan interest rate 2026",
    "home loan EMI calculator",
    "home loan eligibility calculator",
    "home loan eligibility",
    "home loan documents required",
    "home loan apply online",
    "home loan for salaried employees",
    "home loan for self-employed",
    "best home loan in India",
    "lowest home loan interest rate in India",
    "home loan balance transfer",
    "home loan top up",
    "home loan processing fee",
    "home loan prepayment",
    "home loan consultant in India",
    "home loan advisor online",
    "online home loan assistance",
    "home loan with low CIBIL score",
    "home loan for first-time home buyers India",
    "home loan tax benefit section 80C 24b",
    "home loan for NRI",
    "home loan for under construction property",
    "home loan for plot purchase",
    "home loan for women borrowers",
    "home loan without income proof",
    "home loan DSA India",
    "compare home loan interest rates",
    "financial advisor online India",
    "loan advisor India",
    "online loan consultant",
    "loan assistance service",
    "free loan consultation",
    "financial planning for home buyers",
    "how to choose best home loan",
    "how to get home loan with low CIBIL score",
    "home loan eligibility based on salary",
    "how much home loan can I get on 50000 salary",
    "home loan vs LAP which is better",
    "how to reduce home loan EMI",
    "home loan balance transfer kab karna chahiye",
    "home loan documents for self-employed",
    "how to increase home loan eligibility",
    "home loan rejection reasons",
    "home loan kaise le",
    "home loan kaise milta hai",
    "home loan ke liye eligibility",
    "home loan ke liye documents",
    "sabse kam interest wala home loan",
    "home loan EMI kaise calculate kare",
    "home loan ka interest rate kitna hai",
    "CIBIL score kam ho to home loan kaise milega",
    "home loan in Agra",
    "home loan agent in Agra",
    "home loan consultant Agra",
    "best home loan Agra",
    "home loan DSA Agra",
    "SBI / HDFC / ICICI / Axis home loan Agra",
    "loan consultant near me",
    "loan consultant near Sanjay Place",
    "loan consultant near Kamla Nagar",
    "loan consultant near Sikandra",
    "loan consultant near Dayalbagh",
    "financial services Agra Uttar Pradesh",
    "Bhardwaj Financial Services",
    "BFS Agra"
],
  alternates: { canonical: "https://bfsfin.com/products/home-loan" }
};

export default async function HomeLoanPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: 'products/home-loan' } });
  const rateSetting = await prisma.systemSetting.findUnique({ where: { key: 'homeLoanRate' } });
  const startingRate = rateSetting?.value || "7.15";

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
        question: "Home loan kaise le aur home loan kaise milta hai? (Complete Step-by-Step Process)",
        answer: "Home loan lene ke 4 aasan steps hain: 1) Online apply karein ya Bhardwaj Financial Services (Sanjay Place, Agra) par visit karein. 2) Eligibility check: Income aur CIBIL score ke hisab se best bank (SBI, HDFC, ICICI, PNB, Central Bank) choose karein. 3) Required documents (KYC, Salary Slips/ITR, Property Chain) submit karein. 4) Verification ke baad 5 working days mein loan sanction letter prapt karein."
      },
      {
        question: "Lowest home loan interest rate in India 2026 kitna hai aur sabse kam interest wala home loan kaunsa hai?",
        answer: "India mein 2026 ke current rates ke anusaar, home loan interest rates 7.15%* p.a. se shuru hote hain. Lowest rates 750+ CIBIL score, stable income, aur verified property profiles par milte hain."
      },
      {
        question: "Home loan eligibility based on salary: How much home loan can I get on 50,000 salary?",
        answer: "Banks 50% FOIR (Fixed Obligation to Income Ratio) rule follow karte hain. Agar aapki net monthly salary ₹50,000 hai, toh ₹25,000 ki monthly EMI par 30 saal ke tenure mein lagbhag ₹36 Lakhs se ₹38 Lakhs tak ka home loan sanction ho sakta hai. Agar co-applicant add karte hain toh eligibility aur badh jati hai."
      },
      {
        question: "How to get home loan with low CIBIL score? (CIBIL score kam ho to home loan kaise milega)",
        answer: "Low CIBIL score (600-700) par loan lene ke liye: 1) Ek high CIBIL score wale co-applicant (spouse ya parents) ko add karein. 2) Lower LTV (property cost ka 60-70%) apply karein. 3) Bhardwaj Financial Services ke expert advisor se NBFC ya specialized housing finance banking surrogate routes evaluate karwayein."
      },
      {
        question: "Home loan documents for self-employed and salaried employees: Kya kya chahiye?",
        answer: "Salaried ke liye: PAN, Aadhaar, 3 months salary slips, 6 months bank statement, Form 16 / ITR. Self-employed ke liye: PAN, Aadhaar, 2-3 years ITR with computation, P&L sheet, 12 months bank statements, GST/Udyam certificate, aur property chain registry papers."
      },
      {
        question: "Home loan balance transfer kab karna chahiye aur how to reduce home loan EMI?",
        answer: "Agar aapka existing home loan 8.50% ya usse zyada par chal raha hai aur market mein 7.15%* available hai, toh Balance Transfer se lakhon rupaye interest bachta hai. EMI kam karne ke liye tenure increase kar sakte hain ya part-prepayment karke principal reduce kar sakte hain."
      },
      {
        question: "Home loan vs LAP (Loan Against Property): Which is better?",
        answer: "Home loan sirf nayi property kharidne, flat lene, plot purchase ya construction ke liye hota hai (lowest rate 7.15%*). LAP (Loan Against Property) aapki existing property mortgage karke business growth, personal emergency ya working capital ke liye un-restricted funds deta hai."
      },
      {
        question: "Home loan tax benefit section 80C 24b: Tax savings kaise milti hai?",
        answer: "Old Tax Regime mein Section 24(b) ke tahat interest payment par ₹2 Lakh tak ka annual deduction milta hai, aur Section 80C ke tahat principal repayment par ₹1.5 Lakh tak ka deduction milta hai. Stamp duty par bhi deduction claim kiya ja sakta hai."
      },
      {
        question: "Home loan for first-time home buyers in India & women borrowers ke kya benefits hain?",
        answer: "First-time home buyers aur women co-applicants ko banks 0.05% se 0.10% tak interest rate concession aur state stamp duty mein rebate dete hain."
      },
      {
        question: "Home loan rejection reasons: Agar loan reject ho jaye toh kya karein?",
        answer: "Major rejection reasons hote hain: Low CIBIL score, high existing EMIs (high FOIR), unstable job history, ya property title issues. Rejection ke baad BFS team aapka CIBIL dispute resolve karke, debt consolidate karke, ya co-applicant structure karke re-file karati hai."
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
