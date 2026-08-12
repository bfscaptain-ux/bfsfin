import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import TaxBenefitCalculator from "@/components/calculators/TaxBenefitCalculator";

export const metadata: Metadata = {
  title: "Home Loan Income Tax Benefit Calculator | bfsfin.in",
  description: "Calculate your income tax savings under Section 80C and Section 24(b) with a home loan from Bhardwaj Financial Services.",
};

export default function TaxBenefitPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />

      <main className="flex-1 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Income Tax <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">Benefit Calculator</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A home loan helps you save massive amounts of tax every year. Calculate your exact savings under Section 80C and Section 24(b).
          </p>
        </div>

        <TaxBenefitCalculator />
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
