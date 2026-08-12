"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { motion, useAnimation, useInView } from "framer-motion";
import { PieChart, TrendingDown, ArrowUpRight, CheckCircle2, Percent, IndianRupee, Clock, Activity } from "lucide-react";

// Animated counter component
const AnimatedCounter = ({ from = 0, to, duration = 2, suffix = "" }: { from?: number, to: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(from);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        // Easing function (easeOutQuad)
        const easeProgress = progress * (2 - progress);
        setCount(Math.floor(easeProgress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, to, from, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function IndustryStatisticsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] font-sans selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300">
      <Header />
      
      <main className="flex-1 relative z-10 pt-24 pb-20">
        <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 dark:from-blue-900/20 to-transparent pointer-events-none" />

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10 text-center">
           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-sm mb-6 shadow-sm">
              <PieChart className="w-4 h-4" />
              Data & Research
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
              Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Statistics</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Real-time market insights, interest rate trends, and performance metrics from the Indian housing and finance sector for 2026.
            </motion.p>
        </div>

        {/* Dashboard Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            {/* Stat Card 1 */}
            <motion.div variants={item} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
               <div className="flex items-center gap-3 mb-4 text-emerald-600 dark:text-emerald-400">
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Avg. Home Loan Rate</h3>
               </div>
               <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">
                  <AnimatedCounter from={10} to={8} duration={1.5} suffix=".35%" />
               </div>
               <div className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                 <ArrowUpRight className="w-4 h-4 rotate-180" />
                 <span>Down 0.45% YoY</span>
               </div>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div variants={item} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
               <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <IndianRupee className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Housing Market Growth</h3>
               </div>
               <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">
                  <AnimatedCounter to={14} duration={2} suffix="%" />
               </div>
               <div className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 font-bold">
                 <ArrowUpRight className="w-4 h-4" />
                 <span>CAGR in Tier-2 Cities</span>
               </div>
            </motion.div>

            {/* Stat Card 3 */}
            <motion.div variants={item} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
               <div className="flex items-center gap-3 mb-4 text-amber-600 dark:text-amber-400">
                  <div className="p-2.5 bg-amber-50 dark:bg-amber-900/30 rounded-xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Avg. Disbursal Time</h3>
               </div>
               <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">
                  <AnimatedCounter to={5} duration={1} suffix=" Days" />
               </div>
               <div className="flex items-center gap-1.5 text-sm text-amber-600 dark:text-amber-400 font-bold">
                 <Activity className="w-4 h-4" />
                 <span>BFS Fast Track Average</span>
               </div>
            </motion.div>

            {/* Stat Card 4 */}
            <motion.div variants={item} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
               <div className="flex items-center gap-3 mb-4 text-purple-600 dark:text-purple-400">
                  <div className="p-2.5 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Approval Rate</h3>
               </div>
               <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">
                  <AnimatedCounter to={96} duration={2.5} suffix="%" />
               </div>
               <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                 <span>Across all prime applications</span>
               </div>
            </motion.div>
          </motion.div>

          {/* Deep Dive Progress Bars Section */}
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 lg:p-12 shadow-sm">
            <div className="max-w-3xl mb-10">
               <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Loan Distribution by Purpose</h2>
               <p className="text-slate-600 dark:text-slate-400">Analysis of the current financial year's disbursements across Northern India.</p>
            </div>
            
            <div className="space-y-8">
              {[
                { label: "New Home Purchase", value: 65, color: "bg-emerald-500" },
                { label: "Loan Against Property (LAP)", value: 20, color: "bg-blue-500" },
                { label: "Balance Transfer (BT)", value: 10, color: "bg-amber-500" },
                { label: "Home Renovation", value: 5, color: "bg-purple-500" }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-slate-900 dark:text-slate-200">{item.label}</span>
                    <span className="font-black text-slate-900 dark:text-white">{item.value}%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
