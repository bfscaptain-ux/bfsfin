import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import EMICalculator from "@/components/EMICalculator";
import CalculatorHuman2D, { CalculatorBgAmbient2D } from "@/components/illustrations/CalculatorHuman2D";
import { CalculatorFAQ, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";
import { prisma } from "@/lib/prisma";
import { MapPin, ShieldCheck, Award, Building2, TrendingUp, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Advanced Home Loan EMI Calculator India (2026) | Bank Rate Comparison | Bhardwaj Finance",
  description: "Calculate exact Home Loan, LAP & Business Loan EMIs. Compare SBI, HDFC, ICICI, PNB & Bank of Baroda rates. Download year-by-year amortization schedule in Excel/PDF. Loans from ₹10 Lakhs with No Upper Limit in Agra, UP & India.",
  keywords: [
    "Home Loan EMI Calculator",
    "Advanced EMI Calculator India",
    "SBI Home Loan EMI Calculator",
    "HDFC Loan EMI Calculator",
    "PNB Home Loan Calculator",
    "Bank of Baroda EMI Calculator",
    "Loan Against Property EMI",
    "Business Loan Calculator",
    "Amortization Schedule Excel Download",
    "Home loan interest rate calculator",
    "Agra best loan calculator",
    "UP Home Loan EMI Calculator",
    "Bhardwaj Finance Calculator"
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
    "geo.position": "27.1983;78.0069",
    "ICBM": "27.1983, 78.0069",
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

      <main className="flex-1 py-8 sm:py-12 lg:py-16 w-full max-w-[1600px] 2xl:max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 space-y-10 sm:space-y-14 print:block print:py-0 print:m-0 print:space-y-0">
        <div className="text-center w-full max-w-5xl mx-auto space-y-4 print:hidden relative py-2 sm:py-4">
          {/* Ambient 2D Character & Growth Watermark */}
          <div className="absolute inset-0 -top-12 -bottom-12 pointer-events-none select-none opacity-25 dark:opacity-20 z-0 flex items-center justify-center">
            <CalculatorBgAmbient2D className="w-full max-w-3xl h-full object-contain" />
          </div>
          {heroImageUrl && (
            <div className="absolute inset-0 -mx-8 -my-4 rounded-3xl bg-cover bg-center opacity-10" style={{ backgroundImage: `url('${heroImageUrl}')` }}></div>
          )}
          <span className="inline-block text-xs uppercase font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 tracking-wider shadow-sm">
            Precision Financial Tool • GEO Agra & Pan-India
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-400">Home Loan EMI</span> Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Simulate your home loan, LAP, and business loan interest rates, tenure, and repayments. Compare live bank rates (SBI, HDFC, PNB) and export your exact year-by-year amortization schedule.
          </p>
        </div>

        <EMICalculator defaultRate={defaultRate} />
        
        {/* GEO & Local Authority Explainer for Google SEO */}
        <section className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 print:hidden w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Why Calculate Your Loan with Bhardwaj Financial Services (BFS)?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Agra's premier financial consultancy with 50+ institutional bank tie-ups & doorstep advisory across Uttar Pradesh & India.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" /> 100% Mathematical Accuracy
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Bank-standard reducing balance formula strictly aligned with RBI and nationalized bank underwriting benchmarks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" /> ₹10 Lakhs to Unlimited
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether you need a ₹15 Lakh home loan or a ₹50 Crore commercial industrial property loan, our underwriting desk has zero upper cap.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <Award className="w-4 h-4" /> Multi-Bank Rate Compare
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Compare current offers from SBI, HDFC, ICICI, PNB, and Bank of Baroda with BFS special partner concession rates starting from 7.15%*.
              </p>
            </div>
          </div>
        </section>

        {/* Guidance and FAQs hidden strictly on print so only the loan schedule prints */}
        <div className="print:hidden">
          <HowToUse steps={[
            "Enter your desired Loan Amount (from ₹10 Lakhs to unlimited).",
            "Set the Interest Rate based on current market offers or click any top bank to auto-load.",
            "Choose your preferred Loan Tenure in years (up to 30 years).",
            "View your exact EMI, Total Interest, and download the full Excel CSV or formatted PDF schedule."
          ]} />

          <CalculatorFAQ calculatorId="emi" />

          <RelatedCalculators tools={[
            { name: "Loan Eligibility Calculator", link: "/eligibility", desc: "Check how much loan you are eligible for based on your income." },
            { name: "Prepayment Savings", link: "/tools/prepayment", desc: "See how part-payments can reduce your loan tenure." },
            { name: "Balance Transfer Tool", link: "/tools/balance-transfer", desc: "Calculate savings by switching to a lower interest rate." },
            { name: "Property Affordability", link: "/tools/affordability", desc: "Find out your maximum property purchase budget." },
            { name: "Stamp Duty Calculator", link: "/tools/stamp-duty", desc: "Calculate registry and stamp duty charges for UP, Delhi & NCR." },
            { name: "Tax Benefit Calculator", link: "/tools/tax-benefit", desc: "Calculate tax deduction under Section 24(b) & 80C." }
          ]} />
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
        <FloatingSupport />
      </div>
    </div>
  );
}
