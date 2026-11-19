import type { Metadata } from "next";
import CalculatorNavSwitcher from "@/components/calculators/CalculatorNavSwitcher";
import AllCalculatorsHub from "@/components/calculators/AllCalculatorsHub";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import TaxBenefitCalculator from "@/components/calculators/TaxBenefitCalculator";

export const metadata: Metadata = {
  title: "Home Loan Tax Benefit Calculator (FY 2025-26) | Section 24(b) & 80C | BFS",
  description: "Calculate your annual income tax savings under Section 24(b) (up to ₹2 Lakhs on interest) and Section 80C (up to ₹1.5 Lakhs on principal) under Old vs New Tax Regimes in India.",
  keywords: [
    "home loan tax benefit section 80C 24b",
    "Home Loan Tax Benefit Calculator FY 2025-26",
    "Section 24b Interest Deduction Calculator",
    "Section 80C Home Loan Principal Rebate",
    "Income Tax Savings on Home Loan India",
    "Old vs New Tax Regime Home Loan Benefit",
    "Bhardwaj Financial Services Tax Calculator"
  ],
  alternates: {
    canonical: "https://bfsfin.com/tools/tax-benefit",
  },
  openGraph: {
    title: "Home Loan Tax Benefit Calculator (FY 2025-26) | Section 24(b) & 80C | BFS",
    description: "Calculate your annual income tax savings under Section 24(b) (up to ₹2 Lakhs on interest) and Section 80C (up to ₹1.5 Lakhs on principal) under Old vs New Tax Regimes in India.",
    url: "https://bfsfin.com/tools/tax-benefit",
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

export default function TaxBenefitPage() {
    const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bfsfin.com/tools/tax-benefit#app",
        "name": "Home Loan Income Tax Benefit Calculator - Bhardwaj Financial Services",
        "url": "https://bfsfin.com/tools/tax-benefit",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "description": "Calculate your annual income tax savings under Section 24(b) (up to ₹2 Lakhs on interest) and Section 80C (up to ₹1.5 Lakhs on principal) under Old vs New Tax Regimes in India.",
        "creator": {
          "@type": "FinancialService",
          "name": "Bhardwaj Financial Services",
          "url": "https://bfsfin.com"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://bfsfin.com/tools/tax-benefit#breadcrumb",
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
            "name": "Home Loan Income Tax Benefit Calculator",
            "item": "https://bfsfin.com/tools/tax-benefit"
          }
        ]
      },
      {
        "@type": "FinancialService",
        "name": "Bhardwaj Financial Services",
        "telephone": "+91-9258-724-227",
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
        <CalculatorNavSwitcher currentToolId="tax-benefit" />
        <div className="text-center w-full max-w-2xl mx-auto space-y-1 mb-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Income Tax <span className="text-emerald-600 dark:text-emerald-400">Benefit Calculator</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            A home loan helps you save massive amounts of tax every year. Calculate your exact savings under Section 80C and Section 24(b).
          </p>
        </div>

        <TaxBenefitCalculator />

        {/* Complete Interlinked Calculators Suite */}
        <AllCalculatorsHub currentToolId="tax-benefit" />
      </main>

      <div className="print:hidden"><Footer /></div>
      <div className="print:hidden"><FloatingSupport /></div>
    </div>
  );
}
