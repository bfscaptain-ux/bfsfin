"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { motion } from "framer-motion";
import { Target, AlertCircle, CheckCircle, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

const USE_CASES = [
  {
    id: "self-employed",
    title: "The Self-Employed Entrepreneur",
    profile: "Small Business Owner (Kirana Store) in Agra",
    problem: "Applicant had a thriving daily cash business but no formal ITR for the last 3 years. Traditional banks rejected the application due to 'Lack of Income Proof'.",
    solution: "BFS Agra utilized a 'Liquid Income Assessment' framework. We analyzed GST returns, current account banking for 12 months, and conducted a physical business verification.",
    result: "Secured a ₹45 Lakh Home Loan from a leading NBFC at a competitive rate, enabling the family to move from a rented house to their own home."
  },
  {
    id: "low-cibil",
    title: "The CIBIL Recovery Client",
    profile: "IT Professional with a past dispute",
    problem: "CIBIL score dropped to 640 due to a disputed credit card charge from 4 years ago that was marked as 'Written Off'. Current salary was ₹1.2 Lakhs/month, but system automatically rejected.",
    solution: "We initiated our CIBIL Healing process, cleared the ₹3,000 dispute, got an NDC, and drafted a 'Deviation Justification Report' highlighting the strong current income to the credit manager.",
    result: "Approved for a ₹75 Lakh Home Loan from a top PSU bank with only a 0.25% risk premium, saving the client from high-interest private lenders."
  },
  {
    id: "nri-buyer",
    title: "The NRI Investor",
    profile: "Software Engineer working in Dubai",
    problem: "Wanted to invest in a commercial property in Delhi NCR. Faced massive hurdles with remote documentation, POA (Power of Attorney) drafting, and foreign income translation.",
    solution: "Our NRI Desk provided end-to-end digital assistance. We drafted a compliant POA, translated the foreign credit report, and managed the entire property technical valuation remotely.",
    result: "Sanctioned ₹1.5 Cr Loan Against Property within 12 days. The client only had to visit India once for the final registry signing."
  }
];

export default function RealUseCasesPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] font-sans selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300">
      <Header />
      
      <main className="flex-1 relative z-10 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-20 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-6 shadow-sm">
                <Target className="w-4 h-4" />
                Proven Results
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">Use Cases</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                See how we've solved complex financial hurdles for real clients. From low CIBIL scores to non-standard income profiles, we engineer solutions where others see dead ends.
              </p>
            </motion.div>
          </div>

          {/* Use Cases Grid */}
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {USE_CASES.map((useCase) => (
              <motion.div 
                key={useCase.id}
                variants={item}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col"
              >
                {/* Profile Header */}
                <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{useCase.title}</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">{useCase.profile}</p>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col gap-6">
                  {/* Problem */}
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 w-1 h-full bg-rose-500 rounded-full" />
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-rose-500" />
                      <h3 className="font-bold text-slate-900 dark:text-slate-200">The Hurdle</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{useCase.problem}</p>
                  </div>

                  {/* Solution */}
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 rounded-full" />
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-blue-500" />
                      <h3 className="font-bold text-slate-900 dark:text-slate-200">Our Strategy</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{useCase.solution}</p>
                  </div>

                  {/* Result */}
                  <div className="relative pl-6 mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="absolute left-0 top-6 w-1 h-[calc(100%-1.5rem)] bg-emerald-500 rounded-full" />
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <h3 className="font-bold text-emerald-600 dark:text-emerald-400">The Result</h3>
                    </div>
                    <p className="text-slate-900 dark:text-white font-medium text-sm leading-relaxed">{useCase.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Have a complex financial profile?</h2>
            <Link href="/apply" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition transform hover:-translate-y-1">
              Discuss Your Case With Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
