import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import AffordabilityCalculator from "@/components/calculators/AffordabilityCalculator";

export const metadata: Metadata = {
  title: "Home Loan Affordability Calculator | bfsfin.in",
  description: "Find out your maximum property budget and how much home loan you can easily afford with Bhardwaj Financial Services.",
};

export default function AffordabilityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />

      <main className="flex-1 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Affordability <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600 dark:from-emerald-400 dark:to-emerald-400">Calculator</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Planning to buy a house? Find out exactly how much property you can afford based on your income and existing obligations.
          </p>
        </div>

        <AffordabilityCalculator />
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
