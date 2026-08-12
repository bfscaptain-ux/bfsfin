"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EMICalculator from "@/components/EMICalculator";
import FloatingSupport from "@/components/FloatingSupport";
import SEOContentBlock from "@/components/SEOContentBlock";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  ShieldCheck,
  Percent,
  Wallet,
  Briefcase
} from "lucide-react";

export default function BusinessLoanClient() {
  const [activeTab, setActiveTab] = useState<'unsecured' | 'secured'>('unsecured');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { staggerChildren: 0.2 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-900 selection:text-white transition-colors duration-300">
      <Header />

      {/* 1. PRODUCT HERO (Template Style) */}
      <section className="relative overflow-hidden pt-10 pb-14 lg:pb-16 bg-gradient-to-br from-emerald-50 via-blue-50/80 to-amber-50/30 dark:from-slate-900 dark:via-[#0b132b] dark:to-slate-900">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-1/4 h-1/2 bg-amber-400/[0.08] dark:bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        {/* BFS Logo Watermark */}
        <div className="absolute bottom-0 right-0 pointer-events-none select-none translate-x-1/4 translate-y-1/4 opacity-[0.06] dark:opacity-[0.10] z-[1]">
          <img src="/logo.png" alt="" className="w-[35vw] max-w-[450px] min-w-[200px] h-auto object-contain drop-shadow-[0_0_40px_rgba(16,185,129,0.2)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-4"
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <Briefcase className="w-4 h-4" /> Core Product
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              Fuel Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-amber-500 dark:from-emerald-400 dark:via-blue-400 dark:to-amber-400">Business Growth.</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Whether you need working capital or funds to expand operations, our rapid business loans get you capital in as little as 48 hours.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="/apply" className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-extrabold px-7 py-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/25 flex items-center gap-2 text-sm">
                <span className="relative z-10">Apply Online Now</span> 
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 bg-white/80 dark:bg-slate-900/80 border border-white/50 dark:border-slate-700/50 p-6 rounded-2xl shadow-2xl backdrop-blur-xl"
          >
            <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-200 dark:border-slate-800 pb-3 mb-3 flex items-center gap-2"><span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-emerald-500 via-blue-500 to-amber-500"></span>Quick Glance</h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Starting Rate</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-md">12.50%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Max Tenure</span>
                  <span className="font-bold text-slate-900 dark:text-white">5 Years</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Max Amount</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹5 Cr+</span>
                </div>
            </div>
          </motion.div>
        </div>

        {/* Custom SVG Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[30px] md:h-[50px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-24 py-16">
        
        {/* 2. EMI CALCULATOR (Floating Section) */}
        <motion.section {...fadeIn} className="-mt-32 relative z-20">
          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl backdrop-blur-xl">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Plan Your Repayment</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Use our calculator to estimate your monthly EMI and total interest outflow.</p>
            </div>
            <EMICalculator />
          </div>
        </motion.section>

        {/* 3. ELIGIBILITY CRITERIA & DOCUMENTS */}
        <motion.section {...fadeIn} className="space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Eligibility & Documents</h2>
            <p className="text-slate-600 dark:text-slate-400">We maintain complete transparency. Check what you need before applying.</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => setActiveTab('unsecured')}
                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'unsecured' ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Unsecured Loans
              </button>
              <button 
                onClick={() => setActiveTab('secured')}
                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'secured' ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Secured / Machinery
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Eligibility Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 rounded-3xl shadow-sm flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
                <ShieldCheck className="w-7 h-7 text-emerald-500" /> Minimum Eligibility
              </h3>
              <ul className="space-y-6 flex-1">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">01</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Business Vintage</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Minimum 3 years of continuous operation.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">02</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Annual Turnover</h4>
                    {activeTab === 'unsecured' ? (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Minimum ₹40 Lakhs turnover required.</p>
                    ) : (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Minimum ₹1 Crore turnover with positive net worth.</p>
                    )}
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">03</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Business Profitability</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Business must be profit-making for the last 2 consecutive years.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Documents Card (Themed) */}
            <div className="bg-slate-900 dark:bg-slate-950 border border-emerald-600/30 dark:border-slate-800 p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col h-full relative overflow-hidden group hover:border-emerald-500/50 transition-colors duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />
              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6 relative z-10">
                <FileText className="w-7 h-7 text-blue-400" /> Required Documents
              </h3>
              
              <div className="space-y-6 flex-1 relative z-10">
                <div>
                  <h4 className="text-emerald-400 font-bold text-sm uppercase mb-3">1. KYC Documents</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-3 bg-slate-800/50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-700/50">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> PAN Card of Promoters & Company
                    </li>
                    <li className="flex items-center gap-3 bg-slate-800/50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-700/50">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> Aadhaar Card of Promoters
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-emerald-400 font-bold text-sm uppercase mb-3">2. Business Proof & Financials</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-3 bg-slate-800/50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-700/50"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> GST Registration / Udyam Certificate</li>
                    <li className="flex items-center gap-3 bg-slate-800/50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-700/50"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> Audited ITR & Balance Sheet (Last 3 Years)</li>
                    <li className="flex items-center gap-3 bg-slate-800/50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-700/50"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> Current Account Statement (Last 12 Months)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 4. WHY CHOOSE BFS */}
        <motion.section {...fadeIn} className="space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Why Choose BFS for Business Loans?</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Expand your operations with flexible structuring, higher limits, and fast processing.</p>
          </div>

          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <motion.div variants={fadeIn} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-200 dark:border-emerald-500/20">
                <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">48-Hour Approvals</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Fast-tracked processing for urgent working capital requirements.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-200 dark:border-emerald-500/20">
                <Wallet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Higher Loan Limits</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Funding up to ₹50 Crores for established enterprises and MSMEs.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-200 dark:border-emerald-500/20">
                <Percent className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Flexible Structuring</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Customized overdraft limits or term loans designed around your cash flows.</p>
            </motion.div>

          </motion.div>
        </motion.section>

      </main>

      {/* SEO & AEO Content Block */}
      <SEOContentBlock productName="Business Loan" />

      <Footer />
      <FloatingSupport />
    </div>
  );
}
