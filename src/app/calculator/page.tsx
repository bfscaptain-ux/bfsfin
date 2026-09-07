import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import EMICalculator from "@/components/EMICalculator";
import { CalculatorFAQ, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

export const metadata: Metadata = {
  title: "Advanced Home Loan EMI Calculator (100% Accurate) | Bhardwaj Finance",
  description: "Calculate exact Home Loan, Business Loan, and LAP EMIs. View detailed month-by-month amortization schedules, interest breakdowns, and loan eligibility instantly. Best EMI Calculator in Agra.",
  keywords: ["Advanced EMI Calculator", "Home Loan EMI Calculator India", "Business Loan Calculator", "Loan Against Property EMI", "Amortization Schedule Calculator", "Exact EMI calculation", "Agra best loan calculator", "Mortgage repayment calculator", "Bhardwaj Finance EMI", "Calculate home loan interest"],
  alternates: {
    canonical: "https://bfsfin.com/calculator",
  }
};

import { prisma } from "@/lib/prisma";

export default async function CalculatorPage() {
  const [settings, heroImage] = await Promise.all([
    prisma.systemSetting.findMany(),
    prisma.heroImage.findUnique({ where: { pageId: 'calculator' } })
  ]);
  const rateSetting = settings.find(s => s.key === "homeLoanRate")?.value || "6.50";
  const defaultRate = parseFloat(rateSetting);
  const heroImageUrl = heroImage?.imageUrl;
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 print:min-h-0 print:block print:bg-white">
      <div className="print:hidden"><Header /></div>

      <main className="flex-1 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10 print:block print:py-0 print:m-0 print:space-y-0">
        <div className="text-center max-w-3xl mx-auto space-y-4 print:hidden relative">
          {heroImageUrl && (
            <div className="absolute inset-0 -mx-8 -my-4 rounded-3xl bg-cover bg-center opacity-10" style={{ backgroundImage: `url('${heroImageUrl}')` }}></div>
          )}
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
        
        <HowToUse steps={[
          "Enter your desired Loan Amount.",
          "Set the Interest Rate based on current market offers.",
          "Choose your preferred Loan Tenure in years.",
          "View your exact EMI, Total Interest, and the month-by-month amortization schedule instantly."
        ]} />

        <CalculatorFAQ calculatorId="emi" />

        <RelatedCalculators tools={[
          { name: "Loan Eligibility Calculator", link: "/eligibility", desc: "Check how much loan you are eligible for based on your income." },
          { name: "Prepayment Savings", link: "/tools/prepayment", desc: "See how part-payments can reduce your loan tenure." },
          { name: "Balance Transfer Tool", link: "/tools/balance-transfer", desc: "Calculate savings by switching to a lower interest rate." }
        ]} />
      </main>

      <div className="print:hidden">
        <Footer />
        <FloatingSupport />
      </div>
    </div>
  );
}
