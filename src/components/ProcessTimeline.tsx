"use client";

import { motion } from "framer-motion";
import { Laptop, FileCheck, Building, Rocket } from "lucide-react";

const steps = [
  {
    icon: Laptop,
    title: "1. Digital Application",
    desc: "Complete personal, income & property details on our secure portal in 5 minutes.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: FileCheck,
    title: "2. Document Verification",
    desc: "Upload salary slips and KYC. Verified instantly by our legal team.",
    color: "from-teal-500 to-teal-600"
  },
  {
    icon: Building,
    title: "3. Bank Sanction",
    desc: "File logged with partner bank. Priority approval secured in 3-4 days.",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: Rocket,
    title: "4. Final Disbursal",
    desc: "Cheque/RTGS issued directly to the seller or builder account.",
    color: "from-amber-400 to-orange-500"
  }
];

export default function ProcessTimeline() {
  return (
    <section className="py-24 relative overflow-hidden z-10 border-t border-slate-200 dark:border-slate-800">
      {/* BFS Logo watermark behind the heading */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04] dark:opacity-[0.06]">
        <img src="/logo.png" alt="" className="w-[350px] h-[350px] object-contain" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            How It Works
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            The 5-Day Processing Track
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed"
          >
            A fully transparent, step-by-step workflow with zero physical branch visits required. Fast, secure, and hassle-free.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0 rounded-full">
            <motion.div 
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500 rounded-full"
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Connecting Line (Mobile) */}
                {idx !== steps.length - 1 && (
                  <div className="md:hidden absolute top-[5rem] bottom-[-4rem] left-1/2 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 -z-10">
                    <motion.div 
                      initial={{ scaleY: 0, originY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.2 }}
                      className={`absolute inset-0 bg-gradient-to-b ${step.color}`}
                    ></motion.div>
                  </div>
                )}

                {/* Node */}
                <div className="mb-8 relative">
                  <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-transparent transition-all duration-300 relative z-10 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <step.icon className="w-8 h-8 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors relative z-10" />
                  </div>
                  {/* Pulse Effect on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}></div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:-translate-y-1 transition-transform duration-300 tracking-tight">{step.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors leading-relaxed px-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
