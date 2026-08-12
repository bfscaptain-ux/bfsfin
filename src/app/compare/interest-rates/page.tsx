"use client";

import { motion } from "framer-motion";
import { ArrowRight, Info, Check, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import Link from "next/link";
import { banksData, lastUpdated } from "@/data/banksData";

export default function InterestRatesComparisonPage() {
  const banks = Object.values(banksData);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-900 dark:to-[#0b132b] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full font-bold text-sm">
            <Shield className="w-4 h-4" /> Comprehensive Comparison
          </motion.div>
          
          <motion.h1 {...fadeIn} className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Home Loan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Interest Rates</span>
          </motion.h1>
          <motion.p {...fadeIn} transition={{ delay: 0.1 }} className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Compare interest rates across top Indian banks to find the perfect home loan for your salaried or self-employed profile.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20 space-y-12">
        
        {/* Comparison Table */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 dark:text-slate-200">Interest Rate Comparison Table</h2>
            <span className="text-xs text-slate-500 font-medium">Updated: {lastUpdated}</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="py-5 px-6 font-bold text-slate-900 dark:text-white">Bank Name</th>
                  <th className="py-5 px-6 font-bold text-emerald-700 dark:text-emerald-400">Salaried Rates</th>
                  <th className="py-5 px-6 font-bold text-blue-700 dark:text-blue-400">Self-Employed Rates</th>
                  <th className="py-5 px-6 font-bold text-slate-900 dark:text-white">Max LTV</th>
                  <th className="py-5 px-6 font-bold text-slate-900 dark:text-white text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {banks.map((bank) => (
                  <tr key={bank.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-5 px-6 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 text-xs">
                        B
                      </div>
                      <Link href={`/banks/${bank.slug}`} className="hover:text-emerald-600 transition-colors">
                        {bank.name}
                      </Link>
                    </td>
                    <td className="py-5 px-6 font-bold text-emerald-600 dark:text-emerald-400">{bank.salariedRate}</td>
                    <td className="py-5 px-6 font-bold text-blue-600 dark:text-blue-400">{bank.selfEmployedRate}</td>
                    <td className="py-5 px-6 text-slate-600 dark:text-slate-400 font-medium">{bank.maxLTV}</td>
                    <td className="py-5 px-6 text-right">
                      <Link href="/apply" className="inline-flex items-center gap-1 text-sm font-bold text-white bg-slate-900 dark:bg-emerald-600 px-4 py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-emerald-500 transition-colors">
                        Apply <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Info Blocks */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-emerald-50 dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Why Rates Differ?</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>CIBIL Score:</strong> A score above 750 usually secures the lowest possible rates.</span>
              </li>
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Income Profile:</strong> Salaried employees in top MNCs often get special discounted rates compared to self-employed individuals.</span>
              </li>
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Loan Amount:</strong> High value loans (e.g., above ₹75 Lakhs) sometimes carry slightly higher interest brackets.</span>
              </li>
            </ul>
          </div>
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-3xl p-8 flex flex-col justify-center text-amber-900 dark:text-amber-100">
            <Info className="w-8 h-8 mb-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-xl font-bold mb-2">Important Disclaimer</h3>
            <p className="text-sm leading-relaxed">
              The interest rates provided in the comparison table are based on the latest available data. However, final rates are determined exclusively by the bank during the underwriting process. Bhardwaj Financial Services acts as an authorized DSA/Broker to help you negotiate the best terms.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
