import { Metadata } from "next";
import HomeLoanClient from "./HomeLoanClient";
import { PrismaClient } from "@prisma/client";
import { buildLoanGraph } from "@/lib/seo-schema";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Home Loan in Agra | Bhardwaj Financial Services – Expert Loan Advisor",
  description: "Looking for the best home loan in Agra? Bhardwaj Financial Services is Agra's top home loan DSA & consultant at Sanjay Place. Lowest interest rates starting 7.15%*, fast 5-day sanction, SBI, HDFC, ICICI & PNB bank approvals. Apply today!",
  keywords: [
    "home loan in Agra",
    "home loan agent in Agra",
    "home loan consultant Agra",
    "best home loan Agra",
    "home loan DSA Agra",
    "home loan interest rate 2026",
    "home loan eligibility calculator",
    "home loan EMI calculator",
    "home loan documents required",
    "home loan for salaried / self-employed",
    "home loan for salaried",
    "home loan for self-employed",
    "home loan balance transfer",
    "home loan top up",
    "LAP (loan against property) Agra",
    "plot loan / construction loan Agra",
    "plot loan Agra",
    "construction loan Agra",
    "home loan for first-time buyers",
    "low interest home loan",
    "home loan approval fast",
    "SBI / HDFC / ICICI / Axis home loan Agra",
    "SBI home loan Agra",
    "HDFC home loan Agra",
    "ICICI home loan Agra",
    "Axis home loan Agra",
    "financial advisor in Agra",
    "loan advisor Agra",
    "loan consultant near me",
    "financial consultant Agra",
    "loan broker in Agra",
    "best financial services in Agra",
    "CIBIL score improvement advice",
    "loan planning consultant",
    "Agra mein home loan kaise le",
    "ghar ke liye loan Agra",
    "sabse sasta home loan",
    "home loan ke liye kitni salary chahiye",
    "loan agent near me",
    "ghar kharidne ke liye loan",
    "CIBIL score kam ho to loan milega kya",
    "home loan near me",
    "loan consultant near Sanjay Place",
    "loan consultant near Kamla Nagar",
    "loan consultant near Sikandra",
    "loan consultant near Dayalbagh",
    "financial services Agra Uttar Pradesh",
    "Bhardwaj Financial Services",
    "BFS Agra",
    "Praveen Bhardwaj loan consultant Agra",
    "Cash salary home loan Agra",
    "Home loan without ITR Agra"
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
        question: "Home loan in Agra: Bhardwaj Financial Services se loan lene ke kya benefits hain?",
        answer: "Bhardwaj Financial Services (BFS) Agra ka #1 Home Loan DSA aur financial consultant hai (Sanjay Place HQ). Hum PNB, SBI, HDFC, ICICI aur Axis Bank se direct priority processing, lowest starting rate from 7.15%* p.a., 5-day fast sanction, aur zero hidden charges provide karte hain."
      },
      {
        question: "Agra mein home loan kaise le? (Full Process)",
        answer: "Agra mein home loan lene ke 3 aasan steps hain: 1) BFS Sanjay Place office visit karein ya WhatsApp (+91 79009-79001 / +91 92587-24227) par sampark karein. 2) Apne basic documents (Aadhaar, PAN, Salary Slip/ITR, Property Chain) share karein. 3) Hamari Senior Loan Advisor team aapke liye best bank chun kar 5 din mein loan sanction karati hai."
      },
      {
        question: "Ghar ke liye loan Agra mein sabse sasta kahan milega?",
        answer: "Sabse sasta home loan nationalized aur private banks jaise PNB, SBI, HDFC aur ICICI mein starting from 7.15%* p.a. se shuru hota hai. Final interest rate aapke CIBIL score, income stability aur property profile par depend karta hai."
      },
      {
        question: "Home loan ke liye kitni salary chahiye?",
        answer: "Salaried applicants ke liye minimum net monthly take-home salary ₹15,000 se ₹25,000 honi chahiye. Agar aap cash salary ya self-employed hain aur ITR nahi hai, toh bhi BFS alternative banking aur surrogate programs ke through loan arrange karata hai."
      },
      {
        question: "CIBIL score kam ho to loan milega kya?",
        answer: "Haan, agar aapka CIBIL score kam hai (650-700) ya CIBIL -1 (fresh history) hai, toh bhi co-applicant add karke, collateral structuring, ya housing finance company route se loan sanction karaya ja sakta hai. BFS free CIBIL score improvement advice bhi provide karta hai."
      },
      {
        question: "Home loan documents required: Kaun-kaun se documents chahiye?",
        answer: "1) KYC: PAN Card aur Aadhaar Card. 2) Income: Salaried ke liye last 3 months salary slips aur 6 months bank statement; Self-employed ke liye 2 years ITR aur 12 months bank statement. 3) Property: Registry, chain documents, approved map aur Agreement to Sale."
      },
      {
        question: "Home loan balance transfer aur top up loan Agra mein kaise karwaye?",
        answer: "Agar aapka existing loan kisi bank mein high interest rate (8.5% - 9.5%+) par chal raha hai, toh BFS ke through 7.15%* par switch (balance transfer) karayein aur saath hi emergency ya business ke liye extra Top-Up Loan fund prapt karein."
      },
      {
        question: "Loan consultant near me: Sanjay Place, Kamla Nagar, Sikandra, Dayalbagh mein service available hai?",
        answer: "Haan, Bhardwaj Financial Services Sanjay Place, Kamla Nagar, Dayalbagh, Sikandra, Shahganj, Bodla, Fatehabad Road aur poore Agra mein free doorstep document pickup aur financial advisor assistance provide karta hai."
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
