import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import PrepaymentCalculator from "@/components/calculators/PrepaymentCalculator";
import { CalculatorFAQ, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

export const metadata: Metadata = {
  title: "Loan Prepayment & Part-Payment Calculator (2026) | Tenure Reduction | BFS",
  description: "Calculate how part-payments and annual prepayments reduce your loan tenure and save lakhs in compound interest. Exact amortization impact for Indian home loans in Agra & UP.",
  keywords: ["Loan Prepayment Calculator India", "Home Loan Part Payment Calculator", "Tenure Reduction Calculator", "Part Prepayment Interest Savings", "Prepay Loan Early Calculator", "Home Loan Prepayment Agra UP", "Bhardwaj Finance Prepayment Tool"],
  alternates: {
    canonical: "https://bfsfin.com/tools/prepayment",
  },
  openGraph: {
    title: "Loan Prepayment & Part-Payment Calculator (2026) | Tenure Reduction | BFS",
    description: "Calculate how part-payments and annual prepayments reduce your loan tenure and save lakhs in compound interest. Exact amortization impact for Indian home loans in Agra & UP.",
    url: "https://bfsfin.com/tools/prepayment",
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

export default function PrepaymentPage() {
    const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bfsfin.com/tools/prepayment#app",
        "name": "Home Loan Prepayment & Tenure Reduction Calculator - Bhardwaj Finance",
        "url": "https://bfsfin.com/tools/prepayment",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "description": "Calculate how part-payments and annual prepayments reduce your loan tenure and save lakhs in compound interest. Exact amortization impact for Indian home loans in Agra & UP.",
        "creator": {
          "@type": "FinancialService",
          "name": "Bhardwaj Financial Services",
          "url": "https://bfsfin.com"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://bfsfin.com/tools/prepayment#breadcrumb",
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
            "name": "Home Loan Prepayment & Tenure Reduction Calculator",
            "item": "https://bfsfin.com/tools/prepayment"
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
            Prepayment <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600 dark:from-emerald-400 dark:to-emerald-400">Savings Calculator</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Making part-payments towards your principal can drastically reduce your loan tenure and save you massive amounts of interest. Find out how much.
          </p>
        </div>

        <PrepaymentCalculator />

        <div className="print:hidden">

        <HowToUse steps={[
          "Enter your Current Outstanding Loan Amount.",
          "Enter your Interest Rate and Remaining Tenure.",
          "Enter the Prepayment Amount you plan to pay.",
          "The calculator will instantly show your revised tenure and total interest saved."
        ]} />

        <CalculatorFAQ calculatorId="prepayment" />

        <RelatedCalculators tools={[
          { name: "EMI Calculator", link: "/calculator", desc: "Calculate your exact monthly payments." },
          { name: "Balance Transfer Tool", link: "/tools/balance-transfer", desc: "Calculate savings by switching to a lower interest rate." },
          { name: "Stamp Duty Calculator", link: "/tools/stamp-duty", desc: "Estimate the property registration cost in your state." }
        ]} />
      </div>
      </main>

      <div className="print:hidden"><Footer /></div>
      <div className="print:hidden"><FloatingSupport /></div>
    </div>
  );
}
