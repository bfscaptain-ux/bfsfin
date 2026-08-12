"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Building, ArrowRight, Clock, User } from "lucide-react";
import Link from "next/link";

const INSIGHTS_DATA = [
  {
    id: 1,
    title: "The Future of Repo Rates and Impact on Home Loans",
    category: "Economic Trends",
    author: "Adv. Praveen Bhardwaj (Legal Advisor)",
    date: "August 12, 2026",
    readTime: "6 min read",
    icon: <TrendingUp className="w-6 h-6" />,
    summary: "An in-depth analysis of RBI's monetary policy shifts and how prospective homebuyers in Agra and Delhi NCR can lock in the lowest EMI structures.",
    imageBg: "bg-gradient-to-br from-blue-900 to-indigo-900",
    tags: ["RBI Policy", "Interest Rates", "EMI Planning"]
  },
  {
    id: 2,
    title: "Real Estate vs Mutual Funds: A 2026 Perspective",
    category: "Investment",
    author: "Financial Research Team",
    date: "August 05, 2026",
    readTime: "8 min read",
    icon: <Building className="w-6 h-6" />,
    summary: "Comparing long-term capital appreciation of physical real estate in Tier-2 cities versus SIPs in the current bullish market.",
    imageBg: "bg-gradient-to-br from-emerald-900 to-teal-900",
    tags: ["Real Estate", "Mutual Funds", "Wealth Creation"]
  },
  {
    id: 3,
    title: "Unlocking Property Value: Loan Against Property Dynamics",
    category: "Business Finance",
    author: "Adv. Praveen Bhardwaj (Legal Advisor)",
    date: "July 28, 2026",
    readTime: "5 min read",
    icon: <Lightbulb className="w-6 h-6" />,
    summary: "How SMEs and MSMEs are leveraging commercial and residential real estate to fund working capital needs at lower interest rates.",
    imageBg: "bg-gradient-to-br from-purple-900 to-fuchsia-900",
    tags: ["LAP", "MSME Funding", "Business Growth"]
  }
];

export default function ExpertInsightsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] font-sans selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300">
      <Header />
      
      <main className="flex-1 relative z-10 pt-24 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-sm mb-6 shadow-sm">
              <Lightbulb className="w-4 h-4 fill-amber-400" />
              Premium Knowledge Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
              Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Insights</span> & Analysis
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Deep dives, original opinions, and comprehensive research from our top financial experts to help you make informed borrowing and investment decisions.
            </p>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INSIGHTS_DATA.map((insight) => (
              <motion.article 
                key={insight.id}
                variants={item}
                className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Graphic/Header */}
                <div className={`h-48 ${insight.imageBg} relative overflow-hidden flex flex-col justify-between p-6`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  
                  {/* Category Badge */}
                  <div className="relative z-10 flex justify-between items-start">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                      {insight.category}
                    </span>
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                      {insight.icon}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {insight.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span>{insight.date}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {insight.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                    {insight.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {insight.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-200">{insight.author}</span>
                    </div>
                    
                    <Link href={`/blogs?category=insights`} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
          
          <div className="mt-16 text-center">
             <Link href="/blogs" className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 hover:dark:bg-emerald-900/20 font-bold px-8 py-3.5 rounded-xl transition-colors shadow-sm">
                View All Articles
                <ArrowRight className="w-5 h-5" />
             </Link>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
