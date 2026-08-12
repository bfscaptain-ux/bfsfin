"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ChevronDown, PieChart, Activity, ShieldCheck, HeartPulse } from "lucide-react";

const FRAMEWORKS = [
  {
    id: "50-30-20",
    title: "The 50/30/20 EMI Rule",
    icon: <PieChart className="w-6 h-6 text-emerald-500" />,
    description: "A universally accepted budgeting framework modified by BFS Agra specifically for home loan borrowers to ensure they never default.",
    steps: [
      { step: "50% - Needs & Fixed Costs", desc: "Half of your net monthly income should cover essential living expenses AND your new Home Loan EMI. If your EMI pushes this category above 50%, the loan is mathematically unaffordable." },
      { step: "30% - Wants & Lifestyle", desc: "This portion covers dining out, entertainment, and vacations. In case of unexpected repo rate hikes, you can easily dip into this 30% bucket to cover the increased EMI." },
      { step: "20% - Savings & Prepayments", desc: "Reserve this strictly for investments (SIPs) and creating an emergency fund. Once you have a 6-month emergency corpus, use this 20% to make annual prepayments on your home loan principal." }
    ]
  },
  {
    id: "cibil-healing",
    title: "The CIBIL Healing Framework",
    icon: <HeartPulse className="w-6 h-6 text-rose-500" />,
    description: "A proven 6-month protocol used by our experts to resurrect sub-650 CIBIL scores back to prime lending territory.",
    steps: [
      { step: "Month 1: The Audit", desc: "Pull a detailed CIBIL report. Identify incorrect write-offs, duplicate accounts, and settle any minor outstanding amounts (less than ₹5,000) immediately." },
      { step: "Month 2-3: The Credit Mix", desc: "Open a secure credit card against a Fixed Deposit (FD). This immediately injects fresh, positive repayment data into your credit file without requiring prior credit." },
      { step: "Month 4-6: The 30% Utilization Cap", desc: "Use the secure credit card, but strictly keep the utilization ratio below 30% of the limit. Pay the total due exactly 3 days before the due date." }
    ]
  },
  {
    id: "risk-matrix",
    title: "The Property Valuation Risk Matrix",
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    description: "How banks legally and technically evaluate your property before sanctioning the final disbursement.",
    steps: [
      { step: "Zone 1: Market Value vs Agreement Value", desc: "Banks always fund based on whichever is lower. If you agree to buy a house for 50 Lakhs, but the technical valuer assesses it at 45 Lakhs, your 80% funding will be calculated on 45 Lakhs." },
      { step: "Zone 2: Title Search Report (TSR)", desc: "A bank panel advocate traces the property's ownership chain back 13 to 30 years to ensure there are no legal disputes or pending litigations." },
      { step: "Zone 3: Approved Maps & Deviations", desc: "The physical structure must match the municipality-approved map. Any illegal construction (e.g., extra floors) will result in negative valuation." }
    ]
  }
];

export default function FinancialFrameworksPage() {
  const [activeId, setActiveId] = useState<string>("50-30-20");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] font-sans selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300">
      <Header />
      
      <main className="flex-1 relative z-10 pt-24 pb-20">
        <div className="absolute top-0 inset-x-0 h-[600px] bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 dark:opacity-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-6 shadow-sm">
                <Layers className="w-4 h-4" />
                Strategic Models
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Frameworks</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Unique, step-by-step methodologies engineered by our experts to ensure absolute financial stability before, during, and after taking a loan.
              </p>
            </motion.div>
          </div>

          {/* Accordion Frameworks */}
          <div className="space-y-6">
            {FRAMEWORKS.map((framework, index) => {
              const isActive = activeId === framework.id;
              
              return (
                <motion.div 
                  key={framework.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white dark:bg-slate-900 border rounded-3xl overflow-hidden transition-all duration-300 shadow-sm ${isActive ? 'border-emerald-500 dark:border-emerald-500/50 shadow-xl' : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800'}`}
                >
                  <button 
                    onClick={() => setActiveId(isActive ? "" : framework.id)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors ${isActive ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                        {framework.icon}
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{framework.title}</h2>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${isActive ? 'rotate-180 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-8 md:px-8 md:pb-10 pt-0">
                          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg pb-6 border-b border-slate-100 dark:border-slate-800">
                            {framework.description}
                          </p>
                          
                          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:to-blue-500">
                            {framework.steps.map((step, idx) => (
                              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-emerald-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md relative z-10">
                                  {idx + 1}
                                </div>
                                
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
                                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{step.step}</h3>
                                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
