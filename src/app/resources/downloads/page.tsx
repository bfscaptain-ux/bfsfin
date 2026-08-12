"use client";

import { motion } from "framer-motion";
import { Download, FileText, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";

export default function DownloadsPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const forms = [
    { title: "Standard KYC Form", size: "1.2 MB", type: "PDF" },
    { title: "Loan Application Form", size: "3.5 MB", type: "PDF" },
    { title: "Self-Declaration Format", size: "0.8 MB", type: "PDF" },
    { title: "Income Tax ITR V Form", size: "2.1 MB", type: "PDF" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-900 dark:to-[#0b132b] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full font-bold text-sm">
            <Download className="w-4 h-4" /> Downloads Hub
          </motion.div>
          
          <motion.h1 {...fadeIn} className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Important <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Downloads & Forms</span>
          </motion.h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {forms.map((form, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{form.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{form.type} • {form.size}</p>
                </div>
              </div>
              <button className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Prefer a Digital Application?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">You don't need to fill out physical forms. Apply online for instant processing.</p>
          <a href="/apply" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
            Apply Online <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
