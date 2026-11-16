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
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
