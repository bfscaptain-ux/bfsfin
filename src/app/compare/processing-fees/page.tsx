"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileCheck, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import Link from "next/link";
import { banksData, lastUpdated } from "@/data/banksData";

export default function ProcessingFeesComparisonPage() {
  const banks = Object.values(banksData).sort((a, b) => a.processingFeeValue - b.processingFeeValue);

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
            <FileCheck className="w-4 h-4" /> Save Thousands on Fees
          </motion.div>
          
          <motion.h1 {...fadeIn} className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Compare Bank <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Processing Fees</span>
          </motion.h1>
          <motion.p {...fadeIn} transition={{ delay: 0.1 }} className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Don't let hidden charges surprise you. See upfront processing fees, login fees, and exclusive waiver offers available through Bhardwaj Financial Services.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20 space-y-12">
        
        {/* Fees Table */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 dark:text-slate-200">Standard vs. Discounted Processing Fees</h2>
            <span className="text-xs text-slate-500 font-medium">Updated: {lastUpdated}</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="py-5 px-6 font-bold text-slate-900 dark:text-white">Bank Name</th>
                  <th className="py-5 px-6 font-bold text-slate-700 dark:text-slate-300">Standard Market Fee</th>
                  <th className="py-5 px-6 font-bold text-emerald-700 dark:text-emerald-400">Offer via BFS</th>
                  <th className="py-5 px-6 font-bold text-slate-900 dark:text-white text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {banks.map((bank) => (
                  <tr key={bank.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-5 px-6 font-bold text-slate-900 dark:text-white">
                      <Link href={`/banks/${bank.slug}`} className="hover:text-emerald-600 transition-colors">
                        {bank.name}
                      </Link>
                    </td>
                    <td className="py-5 px-6 text-slate-500 dark:text-slate-400 line-through decoration-red-500 decoration-2">
                      {bank.processingFeeValue === 0 ? '0.50% of Loan Amount' : '₹5,000 - ₹10,000 + GST'}
                    </td>
                    <td className="py-5 px-6 font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> {bank.processingFee}
                    </td>
                    <td className="py-5 px-6 text-right">
                      <Link href="/apply" className="inline-flex items-center gap-1 text-sm font-bold text-white bg-slate-900 dark:bg-emerald-600 px-4 py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-emerald-500 transition-colors">
                        Claim Offer <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-3xl font-black mb-4">Why pay extra?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Because of our massive volumes and direct DSA partnerships with top banks, we can often secure complete processing fee waivers for our clients that you cannot get by walking directly into a bank branch.
          </p>
          <Link href="/contact" className="inline-block bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition transform hover:-translate-y-1">
            Talk to our Experts Today
          </Link>
        </div>

      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
