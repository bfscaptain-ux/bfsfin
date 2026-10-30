import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import BalanceTransferCalculator from "@/components/calculators/BalanceTransferCalculator";
import { CalculatorFAQ, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

export const metadata: Metadata = {
  title: "Home Loan Balance Transfer Calculator India (2026) | EMI Savings | BFS",
  description: "Calculate exact net interest and EMI savings by switching your high-interest home loan to lowest bank rates (SBI, PNB, BoB, HDFC). Calculate takeover fees and top-up eligibility in Agra & UP.",
  keywords: ["Home Loan Balance Transfer Calculator", "Loan Takeover Savings Calculator", "Switch Home Loan to SBI PNB", "Reduce Home Loan Interest Rate", "Balance Transfer Calculator India", "Home Loan Transfer Agra UP", "Bhardwaj Finance Balance Transfer"],
  alternates: {
    canonical: "https://bfsfin.com/tools/balance-transfer",
  },
  openGraph: {
    title: "Home Loan Balance Transfer Calculator India (2026) | EMI Savings | BFS",
    description: "Calculate exact net interest and EMI savings by switching your high-interest home loan to lowest bank rates (SBI, PNB, BoB, HDFC). Calculate takeover fees and top-up eligibility in Agra & UP.",
    url: "https://bfsfin.com/tools/balance-transfer",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
  },
  other: {
    "geo.region": "IN-UP",
    "geo.placename": "Agra, Uttar Pradesh, India",
    "geo.position": "27.1983;78.0069",
    "ICBM": "27.1983, 78.0069",
  }
};

import { PrismaClient } from "@prisma/client";

export default async function BalanceTransferPage() {
  const prisma = new PrismaClient();
  const settings = await prisma.systemSetting.findMany();
  const rateSetting = settings.find(s => s.key === "balanceTransferRate")?.value || "6.45";
  const defaultRate = parseFloat(rateSetting);
    const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bfsfin.com/tools/balance-transfer#app",
        "name": "Home Loan Balance Transfer & Savings Calculator - Bhardwaj Finance",
        "url": "https://bfsfin.com/tools/balance-transfer",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "description": "Calculate exact net interest and EMI savings by switching your high-interest home loan to lowest bank rates (SBI, PNB, BoB, HDFC). Calculate takeover fees and top-up eligibility in Agra & UP.",
        "creator": {
          "@type": "FinancialService",
          "name": "Bhardwaj Financial Services",
          "url": "https://bfsfin.com"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://bfsfin.com/tools/balance-transfer#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://bfsfin.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Financial Tools",
            "item": "https://bfsfin.com/tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Home Loan Balance Transfer & Savings Calculator",
            "item": "https://bfsfin.com/tools/balance-transfer"
          }
        ]
      },
      {
        "@type": "FinancialService",
        "name": "Bhardwaj Financial Services",
        "telephone": "+91-7900-979-001",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sanjay Place Commercial Hub",
          "addressLocality": "Agra",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "282002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 27.1983,
          "longitude": 78.0069
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <div className="print:hidden"><Header /></div>
      {/* Search Engine Rich Snippet Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 py-8 sm:py-12 lg:py-16 w-full max-w-[1600px] 2xl:max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 space-y-10 sm:space-y-14">
        <div className="text-center w-full max-w-5xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Balance <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600 dark:from-emerald-400 dark:to-emerald-400">Transfer Savings</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Switch your existing loan to a lower interest rate and save lakhs. Use our calculator to see your exact net savings.
          </p>
        </div>

        <BalanceTransferCalculator defaultRate={defaultRate} />

        <div className="print:hidden">

        <HowToUse steps={[
          "Enter your Outstanding Loan Balance.",
          "Enter your Existing Interest Rate.",
          "Enter the New Interest Rate offered by the target bank.",
          "Enter your Remaining Loan Tenure in months.",
          "The calculator will show your exact monthly EMI savings and total interest saved."
        ]} />

        <CalculatorFAQ calculatorId="balance-transfer" />

        <RelatedCalculators tools={[
          { name: "EMI Calculator", link: "/calculator", desc: "Calculate your exact monthly payments." },
          { name: "Prepayment Savings", link: "/tools/prepayment", desc: "See how part-payments can reduce your loan tenure." },
          { name: "Loan Eligibility Calculator", link: "/eligibility", desc: "Check how much loan you are eligible for based on your income." }
        ]} />
      </div>
      </main>

      <div className="print:hidden"><Footer /></div>
      <div className="print:hidden"><FloatingSupport /></div>
    </div>
  );
}
