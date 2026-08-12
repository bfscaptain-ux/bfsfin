"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Zap, ShieldCheck, Banknote } from "lucide-react";

const advantages = [
  {
    icon: Zap,
    title: "Processing Time",
    market: "15-20 Days",
    bfs: "5 Days Guarantee",
    highlight: true,
  },
  {
    icon: Banknote,
    title: "Processing Fees",
    market: "₹10,000 - ₹25,000",
    bfs: "Zero Hidden Brokerage",
    highlight: true,
  },
  {
    icon: ShieldCheck,
    title: "Legal Vet & Security",
    market: "Basic Bank Checks",
    bfs: "Expert Legal Vetting",
    highlight: false,
  },
  {
    icon: CheckCircle2,
    title: "Process Type",
    market: "Multiple Branch Visits",
    bfs: "100% Digital / Doorstep",
    highlight: false,
  }
];

export default function BfsAdvantage() {
  return (
    <section className="py-24 relative overflow-hidden z-10 border-t border-slate-200/50 dark:border-slate-800/50">
      {/* BFS Logo watermark - Right side accent */}
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.04] dark:opacity-[0.06]">
        <img src="/logo.png" alt="" className="w-[400px] h-[400px] object-contain" />
      </div>
      {/* Background abstract shape */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[11px] font-bold uppercase tracking-widest mb-8 border border-blue-100 dark:border-blue-800/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              The BFS Advantage
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
              Why go directly to the bank and wait?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed">
              We process your files through priority banking channels, ensuring the fastest approvals with absolute transparency and <strong className="text-amber-500 dark:text-amber-400">zero hidden costs</strong>.
            </p>
            
            <div className="hidden lg:block relative p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="font-extrabold text-slate-900 dark:text-white mb-3 text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Did you know?
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Over <strong className="text-emerald-600 dark:text-emerald-400">70%</strong> of direct bank applications face delays due to improper documentation. Our legal team pre-vets your file to guarantee a 98% first-pass success rate.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            {/* The Comparison Table / Grid */}
            <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-900/5 overflow-hidden relative">
              
              {/* Header */}
              <div className="grid grid-cols-12 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                <div className="col-span-4 p-5 sm:p-8 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Features</div>
                <div className="col-span-4 p-5 sm:p-8 text-center text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest border-l border-slate-200 dark:border-slate-800">Direct Banks</div>
                <div className="col-span-4 p-5 sm:p-8 text-center text-[10px] sm:text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest border-l border-slate-200 dark:border-slate-800 bg-emerald-50/50 dark:bg-emerald-900/10">Bhardwaj Finance</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {advantages.map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    key={idx} 
                    className="grid grid-cols-12 group hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="col-span-4 p-5 sm:p-8 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{item.title}</span>
                    </div>
                    
                    <div className="col-span-4 p-5 sm:p-8 flex flex-col justify-center items-center text-center border-l border-slate-100 dark:border-slate-800">
                      <XCircle className="w-5 h-5 text-slate-300 dark:text-slate-600 mb-2" />
                      <span className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">{item.market}</span>
                    </div>
                    
                    <div className={`col-span-4 p-5 sm:p-8 flex flex-col justify-center items-center text-center border-l border-slate-100 dark:border-slate-800 relative overflow-hidden ${item.highlight ? 'bg-emerald-50/30 dark:bg-emerald-900/10' : ''}`}>
                      {item.highlight && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                      )}
                      <CheckCircle2 className={`w-6 h-6 mb-2 drop-shadow-sm ${item.highlight ? 'text-amber-500' : 'text-emerald-500'}`} />
                      <span className="text-[11px] sm:text-sm font-black text-slate-900 dark:text-white">{item.bfs}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
