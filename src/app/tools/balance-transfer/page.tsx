import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import BalanceTransferCalculator from "@/components/calculators/BalanceTransferCalculator";
import { CalculatorFAQ, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

export const metadata: Metadata = {
  title: "Home Loan Balance Transfer Calculator | bfsfin.in",
  description: "Calculate your savings by transferring your existing home loan to a lower interest rate with Bhardwaj Financial Services.",
};

import { PrismaClient } from "@prisma/client";

export default async function BalanceTransferPage() {
  const prisma = new PrismaClient();
  const settings = await prisma.systemSetting.findMany();
  const rateSetting = settings.find(s => s.key === "balanceTransferRate")?.value || "6.45";
  const defaultRate = parseFloat(rateSetting);
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />

      <main className="flex-1 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Balance <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600 dark:from-emerald-400 dark:to-emerald-400">Transfer Savings</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Switch your existing loan to a lower interest rate and save lakhs. Use our calculator to see your exact net savings.
          </p>
        </div>

        <BalanceTransferCalculator defaultRate={defaultRate} />

        <HowToUse steps={[
          "Enter your Outstanding Loan Balance.",
          "Enter your Existing Interest Rate.",
          "Enter the New Interest Rate offered by the target bank.",
          "Enter your Remaining Loan Tenure in months.",
          "The calculator will show your exact monthly EMI savings and total interest saved."
        ]} />

        <CalculatorFAQ calculatorId="balance-transfer" />

        <RelatedCalculators tools={[
          { name: "EMI Calculator", link: "/calculator", desc: "Calculate your exact monthly payments." },
          { name: "Prepayment Savings", link: "/tools/prepayment", desc: "See how part-payments can reduce your loan tenure." },
          { name: "Loan Eligibility Calculator", link: "/eligibility", desc: "Check how much loan you are eligible for based on your income." }
        ]} />
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
