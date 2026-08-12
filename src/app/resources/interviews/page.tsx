"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { motion } from "framer-motion";
import { Mic, User, Award, CheckCircle2, MessageSquareQuote } from "lucide-react";
import Image from "next/image";

const INTERVIEW_QA = [
  {
    q: "In today's high-interest market, what is the best strategy for a first-time homebuyer?",
    a: "The most crucial step is pre-approval. Don't go house hunting without knowing your exact eligibility. With repo rates fluctuating, locking in a pre-approved sanction gives you negotiating power with the builder. Secondly, always opt for a floating rate from a major PSU bank rather than a fixed rate right now, as we anticipate rates to cool down in the next 18 months."
  },
  {
    q: "Many self-employed individuals struggle to get loans due to lack of ITR. How does BFS Agra help them?",
    a: "This is a very common issue in Tier-2 and Tier-3 cities. We specialize in non-standard income profiles. Instead of just looking at ITRs, our framework involves liquid income assessment, GST return analysis, and physical business verification. We partner with NBFCs and housing finance companies that understand cash-flow based lending, ensuring self-employed clients aren't rejected."
  },
  {
    q: "What is the biggest mistake borrowers make when transferring their home loan (Balance Transfer)?",
    a: "Looking only at the interest rate. A bank might offer you 0.5% less, but if they charge a 1% processing fee, legal charges, and valuation fees, your 'savings' are wiped out. We always calculate the 'Net Benefit' for our clients over a 5-year horizon before advising a balance transfer."
  },
  {
    q: "How important is CIBIL score really? Can someone with a score of 650 get a loan?",
    a: "A score above 750 gets you the best rates. However, a score of 650 doesn't mean immediate rejection. If the low score is due to a delayed credit card payment 3 years ago, but current income is strong, we can write a strong deviation justification to the credit manager. If it's a recent default, we advise a 6-month 'CIBIL Healing' program before applying."
  }
];

export default function ExpertInterviewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] font-sans selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300">
      <Header />
      
      <main className="flex-1 relative z-10 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 blur-[80px] rounded-full pointer-events-none" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 font-bold text-sm mb-6 shadow-sm">
                <Mic className="w-4 h-4" />
                Exclusive Q&A Series
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">Interviews</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Direct insights from industry veterans on navigating the complex world of Indian mortgages and finance.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column - Expert Profile (Sticky) */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-slate-800 to-slate-950 dark:from-black dark:to-slate-900" />
                  
                  <div className="relative z-10 flex flex-col items-center mt-12 mb-6">
                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 bg-slate-200 overflow-hidden shadow-2xl mb-4 relative">
                      {/* Placeholder for Expert Image */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white">
                        <User className="w-12 h-12" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white text-center">Adv. Praveen Bhardwaj</h2>
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold mb-4 text-center">Chief Legal Advisor</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center w-full mb-6">
                      <span className="flex items-center gap-1 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        <Award className="w-3 h-3" /> 15+ Yrs Exp
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> 10k+ Loans Settled
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm text-center leading-relaxed italic border-t border-slate-100 dark:border-slate-800 pt-6">
                      "Our goal is not just to get you a loan, but to engineer the most mathematically efficient debt structure for your family's future."
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column - Q&A Chat Style */}
            <div className="lg:col-span-8 space-y-8">
              {INTERVIEW_QA.map((qa, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-6"
                >
                  {/* Question Bubble */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center border border-slate-300 dark:border-slate-700">
                      <span className="font-bold text-slate-500">Q</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl rounded-tl-none p-5 md:p-6 shadow-sm">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                        {qa.q}
                      </h3>
                    </div>
                  </div>

                  {/* Answer Bubble */}
                  <div className="flex gap-4 flex-row-reverse">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-slate-900">
                      <MessageSquareQuote className="w-5 h-5" />
                    </div>
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl rounded-tr-none p-6 md:p-8 shadow-xl max-w-[90%]">
                      <p className="text-slate-200 text-[15px] md:text-base leading-relaxed">
                        {qa.a}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
