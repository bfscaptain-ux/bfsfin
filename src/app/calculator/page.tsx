import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import EMICalculator from "@/components/EMICalculator";

export const metadata: Metadata = {
  title: "Advanced Home Loan EMI Calculator (100% Accurate) | Bhardwaj Finance",
  description: "Calculate exact Home Loan, Business Loan, and LAP EMIs. View detailed month-by-month amortization schedules, interest breakdowns, and loan eligibility instantly. Best EMI Calculator in Agra.",
  keywords: ["Advanced EMI Calculator", "Home Loan EMI Calculator India", "Business Loan Calculator", "Loan Against Property EMI", "Amortization Schedule Calculator", "Exact EMI calculation", "Agra best loan calculator", "Mortgage repayment calculator", "Bhardwaj Finance EMI", "Calculate home loan interest"],
  alternates: {
    canonical: "https://bfsagra.com/calculator",
  }
};

import { PrismaClient } from "@prisma/client";

export default async function CalculatorPage() {
  const prisma = new PrismaClient();
  const settings = await prisma.systemSetting.findMany();
  const rateSetting = settings.find(s => s.key === "homeLoanRate")?.value || "6.50";
  const defaultRate = parseFloat(rateSetting);
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />

      <main className="flex-1 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block text-xs uppercase font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 tracking-wider shadow-sm">
            Precision Financial Tool
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-400">Home Loan EMI</span> Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Simulate your home loan interest rates, tenure, and down payment. Get an instant, accurate visualization of your complete year-by-year repayment schedule and total interest payable.
          </p>
        </div>

        <EMICalculator defaultRate={defaultRate} />
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
