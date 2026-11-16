import Link from "next/link";
import { ArrowRight, FileCheck, RefreshCw, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import QuickEligibility from "@/components/QuickEligibility";
import { CalculatorFAQ, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

export const metadata: Metadata = {
  title: "Home Loan Eligibility Calculator India | Salary Based Loan Check | BFS",
  description: "Check your home loan eligibility instantly. Find out home loan eligibility based on salary, how much home loan can I get on 50000 salary, how to increase home loan eligibility, and FOIR calculation for SBI, HDFC, ICICI, PNB across India.",
  keywords: [
    "home loan eligibility calculator",
    "home loan eligibility based on salary",
    "how much home loan can I get on 50000 salary",
    "how to increase home loan eligibility",
    "home loan ke liye eligibility",
    "home loan ke liye kitni salary chahiye",
    "home loan with low CIBIL score",
    "CIBIL score kam ho to home loan kaise milega",
    "home loan for salaried employees",
    "home loan for self-employed",
    "free loan consultation",
    "Bhardwaj Financial Services"
  ],
  alternates: {
    canonical: "https://bfsfin.com/eligibility",
  }
};

export default function EligibilityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />

      <main className="flex-1 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block text-xs uppercase font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 tracking-wider shadow-sm">
            Instant Loan Assessment
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Check Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600 dark:from-emerald-400 dark:to-emerald-400">Home Loan Eligibility</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Calculate your maximum loan sanction amount instantly. Based on your income, age, and our advanced FOIR matching algorithms for top banks across India.
          </p>
        </div>

        <QuickEligibility />

        <HowToUse steps={[
          "Enter your Net Monthly Income (take-home salary).",
          "Input the total of all your existing EMIs (car loan, personal loan, etc.).",
          "Select the loan tenure you want (usually 15-20 years).",
          "The calculator will instantly show the maximum home loan amount you can get approved for."
        ]} />

        <CalculatorFAQ calculatorId="eligibility" />

        <RelatedCalculators tools={[
          { name: "EMI Calculator", link: "/calculator", desc: "Calculate your exact monthly payments for the eligible loan amount." },
          { name: "Prepayment Savings", link: "/tools/prepayment", desc: "See how part-payments can reduce your loan tenure." },
          { name: "Stamp Duty Calculator", link: "/tools/stamp-duty", desc: "Estimate the property registration cost in your state." }
        ]} />

        {/* Actionable Next Steps & Product Interlinking */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-[#020617] text-white border border-emerald-500/30 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-extrabold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                Instant Sanction Route
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                Eligible for a Loan? Lock In BFS Starting Rates from 7.15%*
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Get free eligibility vetting with FOIR calculation across 50+ lenders, zero hidden fees, and doorstep documentation.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/products/home-loan"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
              >
                Apply Home Loan <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products/balance-transfer"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-teal-400" /> Balance Transfer
              </Link>
              <Link
                href="/resources/credit-score"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> CIBIL Guide
              </Link>
              <Link
                href="/resources/documents"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <FileCheck className="w-3.5 h-3.5 text-amber-400" /> Documents
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
