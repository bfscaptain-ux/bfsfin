"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, TrendingDown, Zap, Map, Hammer, Globe, 
  Briefcase, Factory, TrendingUp, ShieldCheck, Stethoscope, 
  Award, Store, User, Coins, GraduationCap, ArrowRight, ChevronRight, CheckCircle2 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";

// --- LOAN DATA ---
const LOANS = [
  // HOME LOANS
  {
    id: "new-home-loan",
    category: "Home Loans",
    title: "New Home Loan",
    desc: "Buy a ready flat, under-construction home, or self-built property in Agra with ease.",
    icon: Building2,
    rate: "From 6.50% p.a.",
    feature: "Up to 30 Yrs Tenure",
    link: "/products/home-loan"
  },
  {
    id: "balance-transfer",
    category: "Home Loans",
    title: "Balance Transfer (BT)",
    desc: "Transfer your high-interest home loan to PNB/Cent Bank and save lakhs in interest.",
    icon: TrendingDown,
    rate: "Special 6.45% p.a.",
    feature: "Zero Processing Fee*",
    link: "/products/balance-transfer"
  },
  {
    id: "top-up-loan",
    category: "Home Loans",
    title: "Top-Up Loan",
    desc: "Get instant cash on top of your ongoing home loan for personal or business use.",
    icon: Zap,
    rate: "Lowest BT+TopUp Rates",
    feature: "Up to ₹50 Lakhs",
    link: "/products/top-up-loan"
  },
  {
    id: "plot-loan",
    category: "Home Loans",
    title: "Plot & Land Loan",
    desc: "Finance your dream plot purchase in ADA approved or RERA registered townships.",
    icon: Map,
    rate: "Competitive Rates",
    feature: "Up to 75% LTV",
    link: "/products/plot-loan"
  },
  {
    id: "construction-loan",
    category: "Home Loans",
    title: "Construction Loan",
    desc: "Funds disbursed in stages for building your house on an already owned plot.",
    icon: Hammer,
    rate: "Customized EMIs",
    feature: "Step-up repayment",
    link: "/products/construction-loan"
  },
  {
    id: "nri-home-loan",
    category: "Home Loans",
    title: "NRI Home Loan",
    desc: "Specialized mortgage solutions for Non-Resident Indians investing in UP real estate.",
    icon: Globe,
    rate: "FEMA Compliant",
    feature: "Dedicated RM",
    link: "/products/nri-home-loan"
  },

  // BUSINESS / MSME
  {
    id: "working-capital",
    category: "Business & MSME",
    title: "Working Capital (CC/OD)",
    desc: "Smooth cash flow management for your daily business operations and inventory.",
    icon: Briefcase,
    rate: "Overdraft Facility",
    feature: "Fast Renewal",
    link: "/products/working-capital"
  },
  {
    id: "machinery-loan",
    category: "Business & MSME",
    title: "Machinery & Equipment",
    desc: "Upgrade your manufacturing unit with latest machinery without blocking capital.",
    icon: Factory,
    rate: "Up to 100% Finance",
    feature: "Tax Benefits",
    link: "/products/business-loan"
  },
  {
    id: "business-expansion",
    category: "Business & MSME",
    title: "Business Expansion Loan",
    desc: "Large ticket size term loans for opening new branches, factories, or warehouses.",
    icon: TrendingUp,
    rate: "Flexible Tenure",
    feature: "Up to ₹10 Crore+",
    link: "/products/business-loan"
  },
  {
    id: "cgtmse",
    category: "Business & MSME",
    title: "CGTMSE (Unsecured)",
    desc: "Collateral-free loans for MSMEs backed by Govt. of India credit guarantee trust.",
    icon: ShieldCheck,
    rate: "No Collateral Req.",
    feature: "Up to ₹5 Crore",
    link: "/products/business-loan"
  },
  {
    id: "medical-equipment",
    category: "Business & MSME",
    title: "Medical Equipment Finance",
    desc: "Exclusive low-interest loans for doctors, clinics, and hospitals in Agra.",
    icon: Stethoscope,
    rate: "Special Doctor Rates",
    feature: "Doorstep Service",
    link: "/products/business-loan"
  },

  // LAP & PERSONAL
  {
    id: "lap-residential",
    category: "LAP & Personal",
    title: "LAP (Residential)",
    desc: "Unlock high-value funds by mortgaging your residential property.",
    icon: Award,
    rate: "High LTV Ratio",
    feature: "Cheaper than Personal Loan",
    link: "/products/loan-against-property"
  },
  {
    id: "lap-commercial",
    category: "LAP & Personal",
    title: "LAP (Commercial)",
    desc: "Mortgage your shop, office, or showroom to raise capital for any requirement.",
    icon: Store,
    rate: "Max Funding",
    feature: "Long Repayment",
    link: "/products/loan-against-property"
  },
  {
    id: "personal-loan",
    category: "LAP & Personal",
    title: "Personal Loan",
    desc: "Instant unsecured loans for marriage, medical emergency, or travel.",
    icon: User,
    rate: "From 10.50% p.a.",
    feature: "Disbursal in 48 Hrs",
    link: "/products/personal-loan"
  },
  {
    id: "gold-loan",
    category: "LAP & Personal",
    title: "Gold Loan",
    desc: "Instant cash against your gold ornaments with maximum per gram rate.",
    icon: Coins,
    rate: "Pay interest only",
    feature: "Same Day Cash",
    link: "/products/gold-loan"
  },
  {
    id: "education-loan",
    category: "LAP & Personal",
    title: "Education Loan",
    desc: "Finance higher studies in India or abroad with easy moratorium periods.",
    icon: GraduationCap,
    rate: "Subsidized Rates",
    feature: "Co-borrower flexibility",
    link: "/products/education-loan"
  },
];

const CATEGORIES = ["All Loans", "Home Loans", "Business & MSME", "LAP & Personal"];

export default function ProductsLanding() {
  const [activeCategory, setActiveCategory] = useState("All Loans");

  const filteredLoans = activeCategory === "All Loans" 
    ? LOANS 
    : LOANS.filter(loan => loan.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans selection:bg-emerald-500/30">
      <Header />

      {/* 🚀 PREMIUM HERO SECTION (Matches Privacy Page Style) */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-slate-900 border-b border-white/10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-10000" />
          <div className="absolute bottom-[0%] -left-[10%] w-[40%] h-[50%] bg-teal-500/20 rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.05]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <nav className="flex items-center gap-2 text-sm text-emerald-100/60 mb-6">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Loan Products</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs sm:text-sm font-bold mb-4 border border-emerald-500/20 backdrop-blur-md">
              <Award className="w-4 h-4" />
              <span>Enterprise Loan Suite</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
              Loans for every <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Dream & Need.</span>
            </h1>
            
            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-light mb-8">
              Processing ₹20L to ₹1Cr+ loans with a 5-day sanction guarantee across top banking partners like PNB, Central Bank, and HDFC.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-emerald-100/80 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Lowest Interest
              </div>
              <div className="flex items-center gap-2 text-emerald-100/80 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Hidden Fees
              </div>
              <div className="flex items-center gap-2 text-emerald-100/80 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Doorstep Service
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🚀 LOANS GRID & FILTERS */}
      <main className="flex-1 py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white shadow-[0_4px_14px_rgba(16,185,129,0.4)]"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredLoans.map((loan) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={loan.id}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Decorative Hover Blob */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>

                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-100 dark:border-emerald-800/50 group-hover:scale-110 transition-transform duration-300">
                    <loan.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/40 px-2.5 py-1 rounded-lg">
                    {loan.category}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">
                  {loan.title}
                </h2>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1 relative z-10">
                  {loan.desc}
                </p>

                <div className="flex items-center gap-4 mb-6 relative z-10 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Interest Rate</p>
                    <p className="text-sm font-black text-slate-900 dark:text-emerald-400">{loan.rate}</p>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Highlight</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white">{loan.feature}</p>
                  </div>
                </div>

                <div className="flex gap-3 relative z-10 mt-auto">
                  <Link 
                    href="/apply" 
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center shadow-[0_4px_10px_-2px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-1.5"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link 
                    href={loan.link} 
                    className="flex-1 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl text-xs text-center border border-slate-200 dark:border-slate-700 transition-all"
                  >
                    Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
