import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import BalanceTransferCalculator from "@/components/calculators/BalanceTransferCalculator";

export const metadata: Metadata = {
  title: "Home Loan Balance Transfer Calculator | bfsfin.in",
  description: "Calculate your savings by transferring your existing home loan to a lower interest rate with Bhardwaj Financial Services.",
};

export default function BalanceTransferPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />

      <main className="flex-1 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Balance <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">Transfer Savings</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Switch your existing loan to a lower interest rate and save lakhs. Use our calculator to see your exact net savings.
          </p>
        </div>

        <BalanceTransferCalculator />
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
