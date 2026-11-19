import Link from "next/link";
import { ArrowRight, FileCheck, Newspaper, RefreshCw } from "lucide-react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import EMICalculator from "@/components/EMICalculator";
import CalculatorHuman2D, { CalculatorBgAmbient2D } from "@/components/illustrations/CalculatorHuman2D";
import { CalculatorFAQ, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";
import CalculatorNavSwitcher from "@/components/calculators/CalculatorNavSwitcher";
import AllCalculatorsHub from "@/components/calculators/AllCalculatorsHub";
import { prisma } from "@/lib/prisma";
import { MapPin, ShieldCheck, Award, Building2, TrendingUp, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator India (2026) | Compare Bank Rates & Prepayment | BFS",
  description: "Calculate exact Home Loan, LAP & Business Loan EMIs in 2026. Compare SBI, HDFC, ICICI, PNB & Axis Bank rates starting 7.15%*. Learn how to calculate home loan EMI, how to reduce home loan EMI, and download year-by-year amortization schedules.",
  keywords: [
    "home loan EMI calculator",
    "home loan interest rate 2026",
    "home loan EMI kaise calculate kare",
    "how to reduce home loan EMI",
    "home loan prepayment",
    "compare home loan interest rates",
    "home loan eligibility calculator",
    "SBI home loan EMI calculator",
    "HDFC loan EMI calculator",
    "ICICI Bank home loan EMI calculator",
    "PNB home loan calculator",
    "lowest home loan interest rate in India",
    "home loan in Agra",
    "home loan balance transfer",
    "Bhardwaj Financial Services Calculator"
  ],
  alternates: {
    canonical: "https://bfsfin.com/calculator",
  },
  openGraph: {
    title: "Advanced Home Loan EMI Calculator | 100% Exact Repayment Schedule",
    description: "Calculate your monthly EMI, total interest, and year-by-year amortization schedule instantly. Compare top bank rates (SBI, HDFC, PNB) with BFS special rates starting 7.15%*.",
    url: "https://bfsfin.com/calculator",
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

export default async function CalculatorPage() {
  const [settings, heroImage] = await Promise.all([
    prisma.systemSetting.findMany(),
    prisma.heroImage.findUnique({ where: { pageId: 'calculator' } })
  ]);
  const rateSetting = settings.find(s => s.key === "homeLoanRate")?.value || "6.50";
  const defaultRate = parseFloat(rateSetting);
  const heroImageUrl = heroImage?.imageUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bfsfin.com/calculator#app",
        "name": "Advanced Home Loan EMI Calculator - Bhardwaj Finance",
        "url": "https://bfsfin.com/calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "featureList": [
          "Exact Month-by-Month Amortization Schedule",
          "Loan amounts starting ₹10 Lakhs with No Upper Limit",
          "Compare Top Indian Banks (SBI, HDFC, ICICI, PNB, BoB)",
          "Instant Excel CSV and PDF Download",
          "Interactive Sliders with Direct Numerical Input",
          "Shareable Pre-filled Calculation Links"
        ],
        "description": "Calculate exact Home Loan, Loan Against Property (LAP), and Business Loan EMIs. Instant amortization schedule, total interest breakdown, and bank rate comparison.",
        "creator": {
          "@type": "FinancialService",
          "name": "Bhardwaj Financial Services",
          "url": "https://bfsfin.com"
        }
      },
      {
        "@type": "FinancialProduct",
        "@id": "https://bfsfin.com/calculator#product",
        "name": "Home Loan & Mortgage Sanction",
        "annualPercentageRate": defaultRate,
        "feesAndCommissionsSpecification": "Zero upfront evaluation fee. Complete transparent multi-bank institutional underwriting.",
        "areaServed": [
          { "@type": "City", "name": "Agra" },
          { "@type": "AdministrativeArea", "name": "Uttar Pradesh" },
          { "@type": "Country", "name": "India" }
        ],
        "provider": {
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://bfsfin.com/calculator#breadcrumb",
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
            "name": "Home Loan EMI Calculator",
            "item": "https://bfsfin.com/calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://bfsfin.com/calculator#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is Home Loan EMI calculated in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Home Loan EMI is calculated using the standard mathematical formula: EMI = [P x r x (1+r)^n] / [(1+r)^n - 1], where P is Principal Loan Amount, r is Monthly Interest Rate (Annual Rate / 12 / 100), and n is Tenure in Months. Our calculator performs this instantly with 100% precision."
            }
          },
          {
            "@type": "Question",
            "name": "Which bank has the lowest Home Loan interest rate currently?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Top PSU banks like SBI, PNB, and Bank of Baroda offer home loan rates starting around 8.40% to 8.65%. Through Bhardwaj Finance's institutional partner pool, eligible borrowers with strong profiles can access special promotional sanction rates starting from 7.15%*."
            }
          },
          {
            "@type": "Question",
            "name": "What is the maximum loan amount I can calculate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "At Bhardwaj Finance, we process loans starting from ₹10 Lakhs with No Upper Limit. You can simulate loan amounts from ₹10 Lakhs up to ₹50 Crores, ₹100 Crores+, or any custom figure."
            }
          },
          {
            "@type": "Question",
            "name": "Can I download my loan amortization schedule in Excel or PDF?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our calculator provides instant 1-click Download Amortization Schedule in both CSV/Excel format and official formatted PDF for bank presentation or tax planning."
            }
          },
          {
            "@type": "Question",
            "name": "How can I apply for an in-principle loan sanction in Agra / Uttar Pradesh?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can apply directly online through our digital portal at bfsfin.com/apply or visit our Sanjay Place office in Agra. In-principle sanction assessment is completed within 48 to 72 hours across 50+ partner banks."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 print:min-h-0 print:block print:bg-white">
      {/* Search Engine Rich Snippet Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="print:hidden"><Header /></div>

      <main className="flex-1 py-6 sm:py-10 w-full max-w-[1600px] 2xl:max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 space-y-8 print:block print:py-0 print:m-0 print:space-y-0">
        {/* Sleek Top Switcher Bar */}
        <CalculatorNavSwitcher currentToolId="emi-calculator" />

        <div className="text-center w-full max-w-3xl mx-auto space-y-2 mb-6 print:hidden">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Home Loan <span className="text-emerald-600 dark:text-emerald-400">EMI Calculator</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Simulate your monthly installment, compare top bank rates, and download your complete year-by-year amortization schedule.
          </p>
        </div>

        <EMICalculator defaultRate={defaultRate} />
        
        {/* Guidance and FAQs */}
        <div className="print:hidden space-y-8">
          <HowToUse steps={[
            "Enter your desired Loan Amount (from ₹10 Lakhs to unlimited).",
            "Set the Interest Rate based on current market offers or click any top bank to auto-load.",
            "Choose your preferred Loan Tenure in years (up to 30 years).",
            "View your exact EMI, Total Interest, and download the full Excel CSV or formatted PDF schedule."
          ]} />

          <CalculatorFAQ calculatorId="emi" />
        </div>

        {/* Complete Interlinked Calculators Suite */}
        <AllCalculatorsHub currentToolId="emi-calculator" />
      </main>

      <div className="print:hidden">
        <Footer />
        <FloatingSupport />
      </div>
    </div>
  );
}
