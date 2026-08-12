"use client";

import { motion } from "framer-motion";
import { Building2, RefreshCw, Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "home-loan",
    title: "Buy Your Dream Home",
    subtitle: "Home Loan",
    desc: "From plots to ready-to-move flats. Get up to ₹5Cr+ with rates starting at 6.50%.",
    icon: Building2,
    accent: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    link: "/apply"
  },
  {
    id: "balance-transfer",
    title: "Lower Your EMI",
    subtitle: "Balance Transfer",
    desc: "Shift your high-interest loan to our partner banks and save lakhs in interest.",
    icon: RefreshCw,
    accent: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    link: "/apply"
  },
  {
    id: "lap",
    title: "Unlock Property Value",
    subtitle: "Loan Against Property",
    desc: "Get high-value cash for business or personal needs without selling your asset.",
    icon: Landmark,
    accent: "group-hover:text-amber-500 dark:group-hover:text-amber-400",
    link: "/apply"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 }
  }
};

export default function CoreServices() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden z-10">
      {/* BFS Logo watermark behind section title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <img src="/logo.png" alt="" className="w-[300px] md:w-[500px] h-[300px] md:h-[500px] object-contain opacity-[0.03] dark:opacity-[0.05]" />
      </div>
      {/* Professional subtle background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/50 dark:bg-emerald-900/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 dark:bg-blue-900/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4 md:mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Our Core Solutions
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tight">
            What are you looking for today?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg leading-relaxed">
            Choose your financial goal. We handle the paperwork, legal checks, and secure your funding in record time.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8"
        >
          {services.map((service, idx) => (
            <motion.div key={service.id} variants={itemVariants} className="h-full">
              <Link href={service.link} className="block h-full outline-none group">
                <div className="h-full bg-white dark:bg-slate-900/50 rounded-2xl p-6 md:p-10 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/5 relative overflow-hidden flex flex-col">
                  
                  {/* Subtle top border highlight on hover based on theme colors */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="mb-5 md:mb-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:bg-white dark:group-hover:bg-slate-900 transition-colors duration-500 shadow-sm">
                      <service.icon className={`w-6 h-6 md:w-8 md:h-8 text-slate-700 dark:text-slate-300 transition-colors duration-300 ${service.accent}`} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider mb-3 md:mb-5 text-slate-500 dark:text-slate-400">
                    {service.subtitle}
                  </p>
                  
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-grow text-sm md:text-base">
                    {service.desc}
                  </p>
                  
                  <div className="mt-6 md:mt-10 flex items-center text-[13px] md:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    <span className="mr-3">Explore Option</span>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
