import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import InterestRateCompare from "@/components/calculators/InterestRateCompare";

export const metadata: Metadata = {
  title: "Compare Bank Home Loan Interest Rates (2026) | SBI vs HDFC vs PNB | BFS",
  description: "Compare current home loan interest rates, processing fees, and monthly EMIs across top Indian banks (SBI, HDFC, ICICI, PNB, Bank of Baroda) vs BFS special partner rates.",
  keywords: ["Compare Bank Home Loan Rates India", "SBI vs HDFC Home Loan Comparison", "PNB vs Bank of Baroda Home Loan", "Lowest Interest Rate Bank India", "Home Loan Rate Comparison Agra UP", "Bhardwaj Finance Bank Comparison Tool"],
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
    "geo.position": "27.1983;78.0069",
    "ICBM": "27.1983, 78.0069",
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
            Compare <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600 dark:from-emerald-400 dark:to-emerald-400">Interest Rates</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Small differences in interest rates can save you Lakhs over your loan tenure. Compare and see the difference.
          </p>
        </div>

        <InterestRateCompare />
      </main>

      <div className="print:hidden"><Footer /></div>
      <div className="print:hidden"><FloatingSupport /></div>
    </div>
  );
}
