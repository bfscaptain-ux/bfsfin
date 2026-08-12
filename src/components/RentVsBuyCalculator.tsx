"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, TrendingDown, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RentVsBuyCalculator() {
  const [rent, setRent] = useState(25000);
  const years = 20;

  let totalRentPaid = 0;
  let currentRent = rent;
  for (let i = 0; i < years; i++) {
    totalRentPaid += currentRent * 12;
    currentRent *= 1.05; // 5% annual rent increase
  }

  const r = 0.065 / 12;
  const n = years * 12;
  const equivalentHomeValue = rent * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));

  return (
    <section className="py-24 relative overflow-hidden z-10 transition-colors duration-500">
      
      {/* BFS Logo watermark - left side accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 pointer-events-none select-none opacity-[0.05] dark:opacity-[0.08]">
        <img src="/logo.png" alt="" className="w-[450px] h-[450px] object-contain" />
      </div>

      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-emerald-600/5 to-blue-600/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Interactive Input */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Smart Calculator
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-slate-900 dark:text-white">
              Stop paying your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-500">Landlord's EMI.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-lg leading-relaxed">
              Paying rent gives you zero returns. See how much wealth you are losing and what asset you could own instead with the same monthly amount.
            </p>

            <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-xl dark:shadow-2xl">
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-6">
                What is your current monthly rent?
              </label>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-black text-amber-500">₹</span>
                <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{rent.toLocaleString('en-IN')}</span>
              </div>
              
              <input 
                type="range" 
                min="10000" 
                max="100000" 
                step="5000"
                value={rent}
                onChange={(e) => setRent(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400 transition-all mb-4"
              />
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-wider">
                <span>₹10,000</span>
                <span>₹1,00,000+</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Dramatic Output */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-[2.5rem] blur-xl pointer-events-none"></div>
            <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl dark:shadow-[0_0_50px_rgba(16,185,129,0.05)] relative overflow-hidden flex flex-col">
              
              <div className="mb-10 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center border border-amber-200 dark:border-amber-500/20">
                    <TrendingDown className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                  </div>
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Money Lost in 20 Years</p>
                </div>
                <p className="text-4xl sm:text-5xl font-black text-amber-600 dark:text-amber-500 tracking-tight">
                  ₹{(totalRentPaid / 100000).toFixed(2)} Lakhs
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-3 font-medium">*Assuming a standard 5% annual rent increase</p>
              </div>

              <div className="w-full h-px bg-slate-200 dark:bg-slate-800 mb-10"></div>

              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20">
                    <Home className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Home you could buy instead</p>
                </div>
                <p className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  ₹{(equivalentHomeValue / 100000).toFixed(2)} Lakhs
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium">Zero money wasted. 100% Asset Creation.</p>
              </div>

              <Link 
                href="/apply"
                className="group relative w-full flex items-center justify-center gap-4 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-5 rounded-2xl font-bold text-lg transition-all overflow-hidden shadow-lg shadow-emerald-600/30 dark:shadow-emerald-900/50 hover:shadow-emerald-500/40"
              >
                <span className="relative z-10">Claim Your Asset Now</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
