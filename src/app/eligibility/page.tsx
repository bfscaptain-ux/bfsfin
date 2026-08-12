import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import QuickEligibility from "@/components/QuickEligibility";

export const metadata: Metadata = {
  title: "Check Home Loan Eligibility Online India | bfsfin.in",
  description: "Calculate your Home Loan Eligibility instantly. Find out your maximum loan sanction amount based on income, age, and existing EMIs. Lowest rates guaranteed across India.",
  keywords: ["Home Loan Eligibility India", "Check Home Loan Eligibility", "Home Loan Calculator India", "bfsfin.in", "bfsfin.com", "Bhardwaj Financial Services", "Online Home Loan Approval"],
  alternates: {
    canonical: "https://bfsfin.in/eligibility",
  }
};

export default function EligibilityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />

      <main className="flex-1 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block text-xs uppercase font-extrabold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-500/30 tracking-wider shadow-sm">
            Instant Loan Assessment
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Check Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">Home Loan Eligibility</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Calculate your maximum loan sanction amount instantly. Based on your income, age, and our advanced FOIR matching algorithms for top banks across India.
          </p>
        </div>

        <QuickEligibility />
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
