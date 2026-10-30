import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import AffordabilityCalculator from "@/components/calculators/AffordabilityCalculator";

export const metadata: Metadata = {
  title: "Home Loan Affordability Calculator India (2026) | Maximum Property Budget | BFS",
  description: "Calculate your maximum property purchase budget and eligible home loan based on salary, existing EMIs, and down payment. Compliant with RBI & bank FOIR limits in Agra, UP & India.",
  keywords: ["Home Loan Affordability Calculator", "Property Budget Calculator India", "How much loan can I get on my salary", "Home loan eligibility calculator Agra", "FOIR calculator India", "Maximum home loan limit calculator", "Bhardwaj Finance Affordability Tool"],
  alternates: {
    canonical: "https://bfsfin.com/tools/affordability",
  },
  openGraph: {
    title: "Home Loan Affordability Calculator India (2026) | Maximum Property Budget | BFS",
    description: "Calculate your maximum property purchase budget and eligible home loan based on salary, existing EMIs, and down payment. Compliant with RBI & bank FOIR limits in Agra, UP & India.",
    url: "https://bfsfin.com/tools/affordability",
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

export default function AffordabilityPage() {
    const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bfsfin.com/tools/affordability#app",
        "name": "Property Affordability & Budget Calculator - Bhardwaj Finance",
        "url": "https://bfsfin.com/tools/affordability",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "description": "Calculate your maximum property purchase budget and eligible home loan based on salary, existing EMIs, and down payment. Compliant with RBI & bank FOIR limits in Agra, UP & India.",
        "creator": {
          "@type": "FinancialService",
          "name": "Bhardwaj Financial Services",
          "url": "https://bfsfin.com"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://bfsfin.com/tools/affordability#breadcrumb",
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
            "name": "Property Affordability & Budget Calculator",
            "item": "https://bfsfin.com/tools/affordability"
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
            Affordability <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600 dark:from-emerald-400 dark:to-emerald-400">Calculator</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Planning to buy a house? Find out exactly how much property you can afford based on your income and existing obligations.
          </p>
        </div>

        <AffordabilityCalculator />
      </main>

      <div className="print:hidden"><Footer /></div>
      <div className="print:hidden"><FloatingSupport /></div>
    </div>
  );
}
