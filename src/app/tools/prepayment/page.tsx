import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import PrepaymentCalculator from "@/components/calculators/PrepaymentCalculator";
import { CalculatorFAQ, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

export const metadata: Metadata = {
  title: "Home Loan Prepayment Calculator | bfsfin.in",
  description: "Calculate your savings by making part-payments on your home loan. See how much tenure and interest you can save.",
};

export default function PrepaymentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />

      <main className="flex-1 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Prepayment <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600 dark:from-emerald-400 dark:to-emerald-400">Savings Calculator</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Making part-payments towards your principal can drastically reduce your loan tenure and save you massive amounts of interest. Find out how much.
          </p>
        </div>

        <PrepaymentCalculator />

        <HowToUse steps={[
          "Enter your Current Outstanding Loan Amount.",
          "Enter your Interest Rate and Remaining Tenure.",
          "Enter the Prepayment Amount you plan to pay.",
          "The calculator will instantly show your revised tenure and total interest saved."
        ]} />

        <CalculatorFAQ calculatorId="prepayment" />

        <RelatedCalculators tools={[
          { name: "EMI Calculator", link: "/calculator", desc: "Calculate your exact monthly payments." },
          { name: "Balance Transfer Tool", link: "/tools/balance-transfer", desc: "Calculate savings by switching to a lower interest rate." },
          { name: "Stamp Duty Calculator", link: "/tools/stamp-duty", desc: "Estimate the property registration cost in your state." }
        ]} />
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
