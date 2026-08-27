"use client";

import { motion } from "framer-motion";
import { FileCheck, CheckCircle2, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { useState } from "react";

export default function DocumentsRequiredPage() {
  const [openDoc, setOpenDoc] = useState<number | null>(0);

  const toggleDoc = (index: number) => {
    setOpenDoc(openDoc === index ? null : index);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const documentCategories = [
    {
      title: "Salaried Employees",
      items: [
        "KYC: PAN Card & Aadhaar Card",
        "Identity Proof: Passport / Voter ID / Driving License",
        "Address Proof: Latest Utility Bill / Rent Agreement",
        "Income Proof: Last 3 months Salary Slips",
        "Bank Statements: Last 6 months salary account statement",
        "Tax Documents: Form 16 / ITR for last 2 years",
        "Photographs: 2 Passport size photos"
      ]
    },
    {
      title: "Self-Employed Professionals",
      items: [
        "KYC: PAN Card & Aadhaar Card",
        "Business Proof: GST Registration / Shop Act / Udyam Aadhar",
        "Address Proof (Business & Residence)",
        "Income Proof: ITR with computation of income for last 3 years",
        "Financials: Audited Balance Sheet & P&L Statement for last 3 years",
        "Bank Statements: Last 12 months (Current & Savings Account)",
        "Qualification Proof (for Doctors/CAs/Architects)"
      ]
    },
    {
      title: "Property Documents",
      items: [
        "Agreement to Sell (ATS) / Builder Allotment Letter",
        "Chain of title deeds (if resale property)",
        "Approved Building Plan & Layout",
        "NOC from Society/Builder",
        "Payment receipts made to builder/seller",
        "Possession Letter (if ready to move)"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-emerald-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full font-bold text-sm">
            <FileCheck className="w-4 h-4" /> Be Prepared
          </motion.div>
          
          <motion.h1 {...fadeIn} className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Documents <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600">Required</span>
          </motion.h1>
          <motion.p {...fadeIn} transition={{ delay: 0.1 }} className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            A comprehensive checklist of documents needed to ensure your loan application is processed smoothly and quickly.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {documentCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-3xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleDoc(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span className="text-xl font-bold text-slate-900 dark:text-white pr-4">{category.title}</span>
                <ChevronDown className={`w-6 h-6 text-emerald-500 shrink-0 transition-transform duration-300 ${openDoc === index ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                  openDoc === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-emerald-800">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
