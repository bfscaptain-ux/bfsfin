import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import StampDutyCalculator from "@/components/calculators/StampDutyCalculator";
import { CalculatorFAQ, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

export const metadata: Metadata = {
  title: "Stamp Duty & Property Registration Calculator (2026) | UP, Delhi, Haryana | BFS",
  description: "Calculate exact stamp duty and registry charges for property purchase in Uttar Pradesh (Agra, Noida, Lucknow, Mathura), Delhi, Haryana, and Maharashtra. Female rebate calculations included.",
  keywords: ["Stamp Duty Calculator UP", "Agra Property Registration Charges", "Uttar Pradesh Stamp Duty Calculator", "Property Registry Fee Calculator", "Stamp Duty Female Rebate UP", "Circle Rate Registry Calculator Agra", "Bhardwaj Finance Stamp Duty Tool"],
  alternates: {
    canonical: "https://bfsfin.com/tools/stamp-duty",
  },
  openGraph: {
    title: "Stamp Duty & Property Registration Calculator (2026) | UP, Delhi, Haryana | BFS",
    description: "Calculate exact stamp duty and registry charges for property purchase in Uttar Pradesh (Agra, Noida, Lucknow, Mathura), Delhi, Haryana, and Maharashtra. Female rebate calculations included.",
    url: "https://bfsfin.com/tools/stamp-duty",
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

export default function StampDutyPage() {
    const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bfsfin.com/tools/stamp-duty#app",
        "name": "Stamp Duty & Property Registry Calculator - Bhardwaj Finance",
        "url": "https://bfsfin.com/tools/stamp-duty",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "description": "Calculate exact stamp duty and registry charges for property purchase in Uttar Pradesh (Agra, Noida, Lucknow, Mathura), Delhi, Haryana, and Maharashtra. Female rebate calculations included.",
        "creator": {
          "@type": "FinancialService",
          "name": "Bhardwaj Financial Services",
          "url": "https://bfsfin.com"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://bfsfin.com/tools/stamp-duty#breadcrumb",
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
            "name": "Stamp Duty & Property Registry Calculator",
            "item": "https://bfsfin.com/tools/stamp-duty"
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
            Stamp Duty <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600 dark:from-emerald-400 dark:to-emerald-400">& Registration Calculator</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Plan your property purchase better by estimating the mandatory government charges. Female buyers often get a rebate in many states.
          </p>
        </div>

        <StampDutyCalculator />

        <div className="print:hidden">

        <HowToUse steps={[
          "Select the State where the property is located.",
          "Enter the total Property Value (or Circle Rate, whichever is higher).",
          "Select the Owner Gender to see if you qualify for a rebate.",
          "The calculator will display the total Stamp Duty and Registration Charges you need to pay."
        ]} />

        <CalculatorFAQ calculatorId="stamp-duty" />

        <RelatedCalculators tools={[
          { name: "EMI Calculator", link: "/calculator", desc: "Calculate your exact monthly home loan payments." },
          { name: "Loan Eligibility Calculator", link: "/eligibility", desc: "Check how much loan you are eligible for based on your income." },
          { name: "Prepayment Savings", link: "/tools/prepayment", desc: "See how part-payments can reduce your loan tenure." }
        ]} />
      </div>
      </main>

      <div className="print:hidden"><Footer /></div>
      <div className="print:hidden"><FloatingSupport /></div>
    </div>
  );
}
