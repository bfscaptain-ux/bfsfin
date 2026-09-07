import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import StampDutyCalculator from "@/components/calculators/StampDutyCalculator";
import { CalculatorFAQ, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

export const metadata: Metadata = {
  title: "Stamp Duty & Registration Calculator | bfsfin.in",
  description: "Calculate stamp duty and property registration charges across states in India. Get accurate estimates based on gender rebates.",
};

export default function StampDutyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />

      <main className="flex-1 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Stamp Duty <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600 dark:from-emerald-400 dark:to-emerald-400">& Registration Calculator</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Plan your property purchase better by estimating the mandatory government charges. Female buyers often get a rebate in many states.
          </p>
        </div>

        <StampDutyCalculator />

        <HowToUse steps={[
          "Select the State where the property is located.",
          "Enter the total Property Value (or Circle Rate, whichever is higher).",
          "Select the Owner Gender to see if you qualify for a rebate.",
          "The calculator will display the total Stamp Duty and Registration Charges you need to pay."
        ]} />

        <CalculatorFAQ calculatorId="stamp-duty" />

        <RelatedCalculators tools={[
          { name: "EMI Calculator", link: "/calculator", desc: "Calculate your exact monthly home loan payments." },
          { name: "Loan Eligibility Calculator", link: "/eligibility", desc: "Check how much loan you are eligible for based on your income." },
          { name: "Prepayment Savings", link: "/tools/prepayment", desc: "See how part-payments can reduce your loan tenure." }
        ]} />
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
