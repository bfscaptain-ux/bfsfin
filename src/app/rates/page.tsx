"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Info, ShieldCheck, Zap, Building2, TrendingDown, Lock, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import Link from "next/link";
import { banksData, lastUpdated } from "@/data/banksData";
import { getLiveRates } from "@/actions/rates";

export default function LiveRatesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [liveData, setLiveData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getLiveRates();
      setLiveData(data);
    }
    load();
  }, []);

  // Merge static UI data (icons, slugs) with dynamic rate data
  const banks = Object.values(banksData).map(staticBank => {
    if (liveData && liveData.banks[staticBank.slug]) {
      return { ...staticBank, ...liveData.banks[staticBank.slug] };
    }
    return staticBank;
  });

  const rbiRepoRate = liveData ? liveData.rbiRepoRate : "6.50%";

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
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full font-bold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Bank Rates Updated
          </motion.div>
          
          <motion.h1 {...fadeIn} className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Current Home Loan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Interest Rates</span>
          </motion.h1>
          <motion.p {...fadeIn} transition={{ delay: 0.1 }} className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Track the latest RBI Repo Rates and partner bank lending rates in real-time. Apply through us for special discounted processing fees.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20 space-y-12">
        
        {/* RBI Macro Indicator */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
              <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Macro Indicator</p>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">RBI Repo Rate</h2>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="text-5xl font-black text-emerald-600 dark:text-emerald-400">{rbiRepoRate}</div>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Last Updated: {lastUpdated}</p>
          </div>
        </motion.div>

        {/* Live Rates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banks.map((bank, idx) => (
            <motion.div key={bank.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{bank.name}</h3>
                  <p className="text-sm text-slate-500 font-medium">Base Rate ({bank.baseRateType}): {isAuthenticated ? bank.baseRateValue : <span className="blur-[4px] select-none text-slate-400">6.50%</span>}</p>
                </div>
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                  <Building2 className="w-6 h-6 text-slate-400" />
                </div>
              </div>
              
              <div className="relative mb-8 flex-1">
                {!isAuthenticated && (
                  <div className="absolute inset-0 z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[6px] rounded-2xl flex flex-col items-center justify-center border border-slate-200/50 dark:border-slate-700/50 transition-all">
                    <Lock className="w-6 h-6 text-slate-600 dark:text-slate-400 mb-2" />
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 text-center px-4">Confidential Rates</span>
                    <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-colors">
                      Login to View
                    </Link>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Salaried</p>
                    <p className={`text-xl font-black text-emerald-600 dark:text-emerald-400 ${!isAuthenticated ? 'blur-[6px] select-none opacity-50' : ''}`}>
                      {isAuthenticated ? bank.salariedRate : '8.50% - 9.15%'}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Self-Employed</p>
                    <p className={`text-xl font-black text-blue-600 dark:text-blue-400 ${!isAuthenticated ? 'blur-[6px] select-none opacity-50' : ''}`}>
                      {isAuthenticated ? bank.selfEmployedRate : '8.65% - 9.40%'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto relative z-20">
                <Link href={`/banks/${bank.slug}`} className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1">
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/apply" className="bg-slate-900 dark:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-emerald-500 transition-colors shadow-lg">
                  Apply Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-2xl p-4 flex gap-3 text-sm text-amber-800 dark:text-amber-200">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            <strong>Disclaimer:</strong> The interest rates displayed above are indicative and subject to change without prior notice as per bank policies and RBI guidelines. The final interest rate offered depends on various factors including your CIBIL score, income profile, and loan amount.
          </p>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
