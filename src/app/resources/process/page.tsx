"use client";

import { motion } from "framer-motion";
import { Workflow, CheckCircle, FileText, Landmark, KeySquare, Handshake } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";

export default function LoanProcessPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const steps = [
    {
      icon: <FileText className="w-8 h-8 text-emerald-500" />,
      title: "Step 1: Application & KYC",
      description: "Submit your basic details, KYC documents, and income proofs either online or through our doorstep collection service."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-emerald-500" />,
      title: "Step 2: Eligibility Check",
      description: "Our experts analyze your CIBIL score and financials to match you with the best bank offering the lowest rate."
    },
    {
      icon: <Landmark className="w-8 h-8 text-emerald-500" />,
      title: "Step 3: Bank Sanction",
      description: "The bank evaluates your profile and issues an In-Principle Sanction Letter detailing your approved loan amount."
    },
    {
      icon: <KeySquare className="w-8 h-8 text-emerald-500" />,
      title: "Step 4: Legal & Technical",
      description: "The bank conducts a legal check on the property title and a technical valuation of the property."
    },
    {
      icon: <Handshake className="w-8 h-8 text-emerald-500" />,
      title: "Step 5: Final Disbursement",
      description: "Sign the loan agreement. The bank issues the cheque or transfers funds directly to the builder/seller."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-900 dark:to-[#0b132b] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full font-bold text-sm">
            <Workflow className="w-4 h-4" /> 5-Day Fast Track
          </motion.div>
          
          <motion.h1 {...fadeIn} className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            The Loan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Process Guide</span>
          </motion.h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20">
        <div className="relative border-l-4 border-emerald-200 dark:border-emerald-900/50 ml-6 md:ml-12 py-10 space-y-16">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: idx * 0.2 }}
              className="relative pl-10 md:pl-16"
            >
              <div className="absolute -left-[38px] top-0 w-16 h-16 bg-white dark:bg-slate-900 border-4 border-emerald-200 dark:border-emerald-800 rounded-full flex items-center justify-center shadow-lg">
                {step.icon}
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
