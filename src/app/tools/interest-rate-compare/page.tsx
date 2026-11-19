import type { Metadata } from "next";
import CalculatorNavSwitcher from "@/components/calculators/CalculatorNavSwitcher";
import AllCalculatorsHub from "@/components/calculators/AllCalculatorsHub";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import InterestRateCompare from "@/components/calculators/InterestRateCompare";

export const metadata: Metadata = {
  title: "Compare Bank Home Loan Interest Rates (2026) | SBI vs HDFC vs PNB | BFS",
  description: "Compare current home loan interest rates, processing fees, and monthly EMIs across top Indian banks (SBI, HDFC, ICICI, PNB, Bank of Baroda) vs BFS special partner rates.",
  keywords: [
    "compare home loan interest rates",
    "lowest home loan interest rate in India",
    "home loan interest rate 2026",
    "home loan processing fee",
    "SBI vs HDFC vs ICICI vs PNB Home Loan Rates",
    "Repo Linked Lending Rate RLLR Comparison",
    "Bhardwaj Finance Bank Comparison Tool"
  ],
  alternates: {
    canonical: "https://bfsfin.com/tools/interest-rate-compare",
  },
  openGraph: {
    title: "Compare Bank Home Loan Interest Rates (2026) | SBI vs HDFC vs PNB | BFS",
    description: "Compare current home loan interest rates, processing fees, and monthly EMIs across top Indian banks (SBI, HDFC, ICICI, PNB, Bank of Baroda) vs BFS special partner rates.",
    url: "https://bfsfin.com/tools/interest-rate-compare",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
  },
  other: {
    "geo.region": "IN-UP",
    "geo.placename": "Agra, Uttar Pradesh, India",
    "geo.position": "27.199777;78.006699",
    "ICBM": "27.199777, 78.006699",
  }
};

export default function InterestRateComparePage() {
    const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bfsfin.com/tools/interest-rate-compare#app",
        "name": "Multi-Bank Interest Rate & EMI Comparison Tool - Bhardwaj Finance",
        "url": "https://bfsfin.com/tools/interest-rate-compare",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "description": "Compare current home loan interest rates, processing fees, and monthly EMIs across top Indian banks (SBI, HDFC, ICICI, PNB, Bank of Baroda) vs BFS special partner rates.",
        "creator": {
          "@type": "FinancialService",
          "name": "Bhardwaj Financial Services",
          "url": "https://bfsfin.com"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://bfsfin.com/tools/interest-rate-compare#breadcrumb",
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
            "name": "Multi-Bank Interest Rate & EMI Comparison Tool",
            "item": "https://bfsfin.com/tools/interest-rate-compare"
          }
        ]
      },
      {
        "@type": "FinancialService",
        "name": "Bhardwaj Financial Services",
        "telephone": "+91-7900-979-001",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Place",
          "addressLocality": "Agra",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "282002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 27.199777,
          "longitude": 78.006699
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

      <main className="flex-1 py-4 sm:py-6 w-full max-w-4xl 2xl:max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Interactive Top Switcher Bar */}
        <CalculatorNavSwitcher currentToolId="interest-rate-compare" />
        <div className="text-center w-full max-w-2xl mx-auto space-y-1 mb-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Compare <span className="text-emerald-600 dark:text-emerald-400">Interest Rates</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Small differences in interest rates can save you Lakhs over your loan tenure. Compare and see the difference.
          </p>
        </div>

        <InterestRateCompare />

        {/* Complete Interlinked Calculators Suite */}
        <AllCalculatorsHub currentToolId="interest-rate-compare" />
      </main>

      <div className="print:hidden"><Footer /></div>
      <div className="print:hidden"><FloatingSupport /></div>
    </div>
  );
}
