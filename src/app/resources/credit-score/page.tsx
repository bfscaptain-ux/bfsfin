"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { Activity, Gauge, TrendingUp, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";

export default function CreditScorePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-emerald-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full font-bold text-sm">
            <Activity className="w-4 h-4" /> Know Your Score
          </motion.div>
          
          <motion.h1 {...fadeIn} className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Credit Score <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600">Guide</span>
          </motion.h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20 space-y-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-emerald-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-emerald-800 text-center">
          <Gauge className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black mb-4">Why CIBIL Matters?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Your CIBIL score (ranging from 300 to 900) determines your creditworthiness. A score above 750 is considered excellent and guarantees the lowest interest rates on home loans.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-8 rounded-3xl text-center">
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">750 - 900</div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Excellent</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Instant approvals, lowest interest rates, zero processing fees.</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-8 rounded-3xl text-center">
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">650 - 749</div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Good</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Loan approved, but interest rates might be slightly higher.</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-8 rounded-3xl text-center">
            <div className="text-3xl font-black text-red-600 dark:text-red-400 mb-2">300 - 649</div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Poor</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">High chances of rejection. Requires co-applicant or guarantor.</p>
          </div>
        </div>

        <div className="bg-emerald-900 dark:bg-emerald-950 p-10 rounded-3xl text-white shadow-2xl flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-2"><TrendingUp className="text-emerald-400" /> How to Improve Your Score?</h3>
            <ul className="space-y-3 text-slate-300">
              <li>1. Always pay your EMIs and credit card bills on time.</li>
              <li>2. Keep your credit utilization below 30% of your limit.</li>
              <li>3. Do not apply for multiple loans or credit cards simultaneously.</li>
              <li>4. Maintain a healthy mix of secured (Home Loan) and unsecured (Credit Card) loans.</li>
            </ul>
          </div>
        </div>

        {/* CIBIL Interlinking Hub & Next Action Steps */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 shadow-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/30">
                Next Steps for Borrowers
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                Have Credit Questions or Score Below 700?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                Get free credit profile evaluation from Adv. Praveen Bhardwaj. Learn how to structure co-applicants, remove wrong bureau reporting, and secure approvals.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/blog/how-to-get-home-loan-with-low-cibil-score"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
              >
                Low CIBIL Home Loan Guide &rarr;
              </Link>
              <Link
                href="/news/new-cibil-score-rules-hard-inquiries-impact"
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-emerald-800 transition-all"
              >
                15-Day Reporting Rules &rarr;
              </Link>
              <Link
                href="/products/home-loan"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs transition-all"
              >
                Apply Home Loan (7.15%*)
              </Link>
              <Link
                href="/calculator"
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-emerald-800 transition-all"
              >
                EMI Calculator
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
