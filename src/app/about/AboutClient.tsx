"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2, Building2, Users, Rocket, Clock, Banknote, TrendingUp, Zap, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

const row1 = [
  { name: "State Bank of India", shortName: "SBI", logo: "/banks/sbi.png", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800" },
  { name: "HDFC Bank", shortName: "HDFC", logo: "/banks/hdfc.png", color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/40 border-red-200 dark:border-red-800" },
  { name: "ICICI Bank", shortName: "ICICI", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/40 border-orange-200 dark:border-orange-800" },
  { name: "Punjab National Bank", shortName: "PNB", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/40 border-amber-200 dark:border-amber-800" },
  { name: "Bank of Baroda", shortName: "BOB", color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/40 border-orange-200 dark:border-orange-800" },
  { name: "Axis Bank", shortName: "AXIS", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/40 border-rose-200 dark:border-rose-800" },
];

const row2 = [
  { name: "Kotak Mahindra", shortName: "Kotak", color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/40 border-red-200 dark:border-red-800" },
  { name: "Canara Bank", shortName: "Canara", logo: "/banks/canara.png", color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800" },
  { name: "Union Bank", shortName: "Union", logo: "/banks/union.png", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800" },
  { name: "IDFC First", shortName: "IDFC", color: "text-rose-800 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/40 border-rose-200 dark:border-rose-800" },
  { name: "IndusInd Bank", shortName: "Indus", color: "text-amber-800 dark:text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/40 border-amber-200 dark:border-amber-800" },
  { name: "Yes Bank", shortName: "YES", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800" },
];

const row3 = [
  { name: "Bajaj Finserv", shortName: "Bajaj", logo: "/banks/bajaj.png", color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800" },
  { name: "Muthoot Finance", shortName: "Muthoot", color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/40 border-red-200 dark:border-red-800" },
  { name: "Tata Capital", shortName: "TATA", color: "text-blue-800 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800" },
  { name: "Cholamandalam", shortName: "Chola", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800" },
  { name: "L&T Finance", shortName: "L&T", color: "text-yellow-600 dark:text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/40 border-yellow-200 dark:border-yellow-800" },
  { name: "Mahindra Finance", shortName: "Mahindra", color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/40 border-red-200 dark:border-red-800" },
];

export default function AboutClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300">
      <Header />

      <main className="flex-1 w-full">
        {/* PREMIUM SPLIT HERO SECTION */}
        <section className="relative pt-4 pb-12 lg:pt-8 lg:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center">
          {/* Elegant Background Elements */}
          <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 bg-slate-50 dark:bg-[#0b132b]">
            {/* Glow behind the right-side logo */}
            <div className="absolute top-[20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-emerald-400/20 dark:bg-emerald-500/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[120px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* LEFT SIDE: CONTENT */}
            <div className="space-y-5 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-sm text-xs sm:text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite]" />
                  Agra's Premium Financial Partner
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight"
              >
                Building Dreams, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-500 relative">
                  Funding Futures.
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-500/30 dark:text-emerald-400/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                We eliminate red tape, hidden charges, and delays. Get your loan approved in <strong className="text-emerald-600 dark:text-emerald-400 font-bold">5 days</strong> with absolute transparency and the lowest rates.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2"
              >
                {["15+ Years Ex.", "Zero Hidden Fees", "5-Day Guarantee"].map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold border border-emerald-200 dark:border-emerald-500/20 shadow-[0_4px_10px_rgba(16,185,129,0.05)]">
                    <CheckCircle2 className="w-4 h-4" />
                    {badge}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT SIDE: PREMIUM UI COMPOSITION (NO OVERLAP) */}
            <div className="relative mx-auto lg:ml-auto w-full max-w-[450px] mt-8 lg:mt-0 flex flex-col gap-4 z-10">
              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-600/20 rounded-[3rem] blur-[60px] animate-pulse -z-10" />
              
              {/* Main Dashboard Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, type: "spring" }}
                className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-xl p-5 sm:p-6 overflow-hidden relative"
              >
                {/* Watermark Logo Background */}
                <div className="absolute -right-6 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none w-40 h-40 rotate-[-15deg]">
                  <Image src="/logo.png" alt="Watermark" fill className="object-contain grayscale" />
                </div>

                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Sanctioned</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">₹500+ Crores</h3>
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center p-2">
                    <Image src="/logo.png" alt="BFS Logo" width={40} height={40} className="object-contain" />
                  </div>
                </div>
                
                {/* CSS Bar Chart */}
                <div className="flex items-end justify-between gap-2 h-16 pt-3 border-t border-slate-100 dark:border-slate-800 relative z-10">
                  {[40, 60, 45, 80, 55, 90, 100].map((height, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                      className={`w-full rounded-t-sm ${i === 6 ? 'bg-gradient-to-t from-emerald-500 to-blue-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-200 dark:bg-slate-800'}`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Bottom Cards (Side by side) */}
              <div className="grid grid-cols-2 gap-4">
                {/* Element 1: Approval Rate */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5, type: "spring" }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-lg flex flex-col items-center justify-center text-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none mb-1">Approval Rate</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white leading-none">99.9%</p>
                  </div>
                </motion.div>

                {/* Element 2: 5 Days Tag */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7, type: "spring" }}
                  className="bg-emerald-500 rounded-2xl p-4 border border-emerald-400 shadow-lg shadow-emerald-500/20 text-white flex flex-col items-center justify-center text-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-400/30 flex items-center justify-center">
                    <Zap className="w-4 h-4 fill-white text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] text-emerald-50 font-medium leading-none mb-1">Processing Time</p>
                    <p className="text-lg font-bold leading-none">5 Days Max</p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>

          {/* Bottom Curve Divider with Glowing Smooth Edge */}
          <div className="absolute bottom-[-1px] left-[-4px] w-[calc(100%+8px)] overflow-hidden leading-none z-20 pointer-events-none">
            <svg 
              className="relative block w-full h-[40px] sm:h-[60px] lg:h-[80px]" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1440 120" 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hero-curve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" /> {/* emerald-500 */}
                  <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
                </linearGradient>
                <filter id="smoothGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* Solid Background Fill */}
              <path 
                d="M0,60 C288,120 576,120 720,60 C864,0 1152,0 1440,60 V125 H0 V125 Z" 
                className="fill-white dark:fill-slate-900" 
              />
              {/* Smooth Glowing Stroke Line */}
              <path 
                d="M0,60 C288,120 576,120 720,60 C864,0 1152,0 1440,60" 
                fill="none"
                stroke="url(#hero-curve-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#smoothGlow)"
                style={{ vectorEffect: "non-scaling-stroke" }}
              />
            </svg>
          </div>
        </section>

        {/* TRUST METRICS (Animated Counters Concept) */}
        <section className="pt-8 pb-16 relative z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-slate-200 dark:divide-slate-800/50"
            >
              {[
                { label: "Years of Trust", value: "15+", icon: Clock },
                { label: "Crores Disbursed", value: "₹500+", icon: Banknote },
                { label: "Happy Families", value: "2500+", icon: Users },
                { label: "Approval Time", value: "5 Days", icon: Rocket }
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp} className="text-center px-4">
                  <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* THE FOUNDER'S DESK - PREMIUM EDITORIAL LAYOUT */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/80 dark:border-slate-800/80 rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Elegant Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
              
              {/* IMAGE SECTION (LEFT SIDE FOR BETTER EDITORIAL FLOW) */}
              <div className="lg:col-span-5 relative mx-auto w-full max-w-md lg:max-w-full lg:order-1 order-2 group/photo">
                
                {/* Blue & Green Hover Glow (Behind the Image) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-[2.5rem] blur-2xl opacity-0 group-hover/photo:opacity-60 transition-all duration-700 -z-10 scale-95 group-hover/photo:scale-105" />

                <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden group-hover/photo:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-700 border border-slate-100 dark:border-slate-700/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 opacity-60 pointer-events-none" />
                  <Image 
                    src="/praveen_bhardwaj.png" 
                    alt="Mrs. Vinita Sharma" 
                    fill 
                    className="object-cover object-top group-hover/photo:scale-[1.03] transition-transform duration-700 ease-out bg-white dark:bg-slate-900"
                  />
                  {/* Floating Experience Badge */}
                  <div className="absolute bottom-6 left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 text-white shadow-xl transform translate-y-4 opacity-0 group-hover/photo:translate-y-0 group-hover/photo:opacity-100 transition-all duration-500 delay-100">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-emerald-100 uppercase tracking-wider mb-1">Experience</p>
                      <p className="text-xl font-bold leading-none">15+ Years</p>
                    </div>
                  </div>
                </div>
                {/* Decorative floating ring */}
                <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-dashed border-emerald-500/30 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none transition-opacity duration-500 opacity-100 group-hover/photo:opacity-0" />
              </div>

              {/* CONTENT SECTION */}
              <div className="lg:col-span-7 space-y-8 lg:pl-12 lg:order-2 order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-widest shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  The Visionary
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                    Mrs. Vinita Sharma
                  </h2>
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-500 font-bold text-xl tracking-wide uppercase">
                    Owner
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg sm:text-xl font-medium">
                  With dual expertise in Law (LLB) and Finance (MBA), Mrs. Vinita Sharma established BFS Agra in 2010 to bridge the gap between complex banking procedures and common homebuyers.
                </p>
                
                <div className="relative p-6 sm:p-8 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-3xl border border-emerald-100 dark:border-slate-700/50 group-hover:shadow-lg transition-shadow duration-500">
                  <div className="absolute top-0 left-8 -translate-y-1/2 bg-white dark:bg-slate-900 px-3 py-1 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <span className="text-3xl text-emerald-500 dark:text-emerald-400 font-serif leading-none">"</span>
                  </div>
                  <blockquote className="relative text-slate-700 dark:text-slate-200 text-lg italic leading-relaxed font-medium">
                    Our mission is simple: Complete transparency, the absolute lowest interest rates, and an unwavering commitment to getting your loan sanctioned in 5 days. We don't just process loans; we help build homes.
                  </blockquote>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* CORE LEADERSHIP TEAM */}
        <section className="py-24 bg-slate-100/50 dark:bg-slate-950/50 border-y border-slate-200 dark:border-slate-800 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 dark:via-blue-500/30 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">The Core Leadership</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Behind every successful sanction is a dedicated team working relentlessly to ensure your files move faster than ever.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {/* Anuj Kumar */}
              <motion.div variants={fadeInUp} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)] text-center shadow-sm">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 p-1 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-3xl font-black text-slate-800 dark:text-white shadow-inner">
                    AK
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Anuj Kumar</h3>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-wide mb-3">IT Manager</div>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Driving our digital transformation and ensuring seamless, secure tech operations for 5-day approvals.
                </p>
              </motion.div>

              {/* Vivek Sharma (Placeholder) */}
              <motion.div variants={fadeInUp} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] text-center shadow-sm">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-3xl font-black text-slate-800 dark:text-white shadow-inner">
                    VS
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Vivek Sharma</h3>
                <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wide mb-3">Sales Head</div>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Leading the front lines, ensuring every customer gets personalized attention and the best bank offers.
                </p>
              </motion.div>

              {/* Sneha Gupta (Placeholder) */}
              <motion.div variants={fadeInUp} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(168,85,247,0.1)] text-center shadow-sm">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-3xl font-black text-slate-800 dark:text-white shadow-inner">
                    SG
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Sneha Gupta</h3>
                <div className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-wide mb-3">Credit Manager</div>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Meticulous financial analysis to maximize loan eligibility while minimizing rejection risks.
                </p>
              </motion.div>

              {/* Rahul Singh (Placeholder) */}
              <motion.div variants={fadeInUp} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)] text-center shadow-sm">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 p-1 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-3xl font-black text-slate-800 dark:text-white shadow-inner">
                    RS
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Rahul Singh</h3>
                <div className="text-amber-600 dark:text-amber-400 font-semibold text-sm uppercase tracking-wide mb-3">Operations Head</div>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Coordinating with bank partners to ensure zero friction from document collection to final disbursement.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* OUR JOURNEY (TIMELINE) */}
        <section className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Our Journey</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">From a small office in Agra to a Pan-India financial powerhouse.</p>
          </motion.div>
          <div className="relative border-l-2 border-emerald-500/20 ml-3 md:ml-6 space-y-12">
            {[
              { year: "2010", title: "The Foundation", desc: "Established in Sanjay Place, Agra with a vision to simplify home loans and eliminate complex banking red tape." },
              { year: "2015", title: "Premium DSA Approval", desc: "Officially partnered with major nationalized and private banks, allowing us to guarantee lowest interest rates." },
              { year: "2020", title: "2500+ Families Funded", desc: "Crossed a major milestone of successfully securing dream homes for over 2,500 families." },
              { year: "2024", title: "Pan-India Expansion", desc: "Expanded operations nationwide including Mathura, Noida, Gurgaon, Mumbai, Bangalore, and Jaipur." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative pl-8 md:pl-12"
              >
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] border-2 border-white dark:border-slate-900" />
                <div className="text-emerald-600 dark:text-emerald-400 font-black text-xl mb-1 tracking-wider">{item.year}</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US (Core Values) */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">The BFS Advantage</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Why 2500+ families chose us over direct bank applications.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: ShieldCheck, 
                title: "100% Transparency", 
                desc: "No hidden charges, no surprises. We lay out every single fee structure before you sign anything.",
                color: "text-emerald-600 dark:text-emerald-400",
                bg: "bg-emerald-500/10 border-emerald-500/20"
              },
              { 
                icon: Building2, 
                title: "Premium Partnerships", 
                desc: "Direct tie-ups with PNB, Central Bank of India and others guarantee you the absolute lowest rates in the market.",
                color: "text-blue-600 dark:text-blue-400",
                bg: "bg-blue-500/10 border-blue-500/20"
              },
              { 
                icon: CheckCircle2, 
                title: "5-Day Guarantee", 
                desc: "Our unique pre-verification process means your file moves 3x faster than normal bank channels.",
                color: "text-purple-600 dark:text-purple-400",
                bg: "bg-purple-500/10 border-purple-500/20"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${feature.bg} ${feature.color}`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      {/* PAN-INDIA REACH & DSA APPROVAL (GEO/SEO OPTIMIZED) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4" /> Nationwide Presence
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
              Rooted in Agra, <br /> Expanding Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-500">India.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              While our head office remains proudly at <strong>Sanjay Place, Agra</strong>, our operations and network have rapidly expanded. As an officially <strong>DSA Approved</strong> financial partner, we hold direct connections with <strong>every major bank and NBFC across India</strong>.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              {['Agra (HQ)', 'Mathura', 'Noida', 'Gurgaon', 'Mumbai', 'Bangalore', 'Jaipur'].map((city, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium bg-slate-100 dark:bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  {city}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 rounded-3xl blur-2xl" />
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Bank & NBFC Partners</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Being a highly reputed DSA, we process files seamlessly across all nationalized banks, private sectors, and top NBFCs, ensuring your loan gets approved wherever you are.
              </p>
              
              <div className="relative overflow-hidden w-full flex flex-col gap-4 py-2 group">
                {/* Fade Overlays */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
                
                {/* Row 1: Left moving */}
                <motion.div 
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                  className="flex w-max gap-4"
                >
                  {[...row1, ...row1].map((bank, i) => (
                    <div key={i} className="flex-none px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
                       {bank.logo ? (
                         <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 p-1.5 flex-shrink-0 shadow-sm">
                           <Image src={bank.logo} alt={bank.name} width={32} height={32} className="object-contain w-full h-full" />
                         </div>
                       ) : (
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm tracking-tight border flex-shrink-0 shadow-sm ${bank.bg} ${bank.color}`}>
                           {bank.shortName}
                         </div>
                       )}
                       <span className="font-bold text-slate-700 dark:text-slate-200 pr-2">{bank.name}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Row 2: Right moving */}
                <motion.div 
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                  className="flex w-max gap-4"
                >
                  {[...row2, ...row2].map((bank, i) => (
                    <div key={i} className="flex-none px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
                       {bank.logo ? (
                         <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 p-1.5 flex-shrink-0 shadow-sm">
                           <Image src={bank.logo} alt={bank.name} width={32} height={32} className="object-contain w-full h-full" />
                         </div>
                       ) : (
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm tracking-tight border flex-shrink-0 shadow-sm ${bank.bg} ${bank.color}`}>
                           {bank.shortName}
                         </div>
                       )}
                       <span className="font-bold text-slate-700 dark:text-slate-200 pr-2">{bank.name}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Row 3: Left moving (NBFCs) */}
                <motion.div 
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ ease: "linear", duration: 28, repeat: Infinity }}
                  className="flex w-max gap-4"
                >
                  {[...row3, ...row3].map((bank, i) => (
                    <div key={i} className="flex-none px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
                       {bank.logo ? (
                         <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 p-1.5 flex-shrink-0 shadow-sm">
                           <Image src={bank.logo} alt={bank.name} width={32} height={32} className="object-contain w-full h-full" />
                         </div>
                       ) : (
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm tracking-tight border flex-shrink-0 shadow-sm ${bank.bg} ${bank.color}`}>
                           {bank.shortName}
                         </div>
                       )}
                       <span className="font-bold text-slate-700 dark:text-slate-200 pr-2">{bank.name}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION (AEO OPTIMIZED) */}
      <section className="py-24 bg-slate-100/50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Everything you need to know about our financial services.</p>
          </motion.div>
          
          <div className="space-y-4">
            {[
              {
                q: "What makes Bhardwaj Finance the best finance company in Agra?",
                a: "Bhardwaj Finance (BFS) stands out in Agra due to our 100% transparent process, zero hidden fees, and our unique 5-Day Loan Sanction Guarantee. As a DSA Approved partner, we connect directly with top banks to secure the absolute lowest interest rates for our clients."
              },
              {
                q: "Do you provide services outside of Agra?",
                a: "Yes! While our head office is located in Sanjay Place, Agra, we are actively expanding and providing financial services in Mathura, Noida, Gurgaon, Mumbai, Bangalore, and Jaipur."
              },
              {
                q: "What does it mean to be a DSA Approved partner?",
                a: "Being a Direct Selling Agent (DSA) means we are officially authorized by banks and NBFCs across India to process loan applications on their behalf. This allows us to fast-track your file and negotiate the best possible terms."
              },
              {
                q: "How can you guarantee a 5-day loan sanction?",
                a: "Our expert team, led by Mrs. Vinita Sharma, conducts thorough pre-verifications of all legal and financial documents before submitting them to the bank. This eliminates back-and-forth delays, resulting in lightning-fast approvals."
              }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MASSIVE CLOSING CTA */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0d1b3e] to-emerald-900 z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 blur-[120px] rounded-full z-0 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-7xl font-black text-white leading-[1.1] tracking-tight"
          >
            Your Dream Home is <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">5 Days Away.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Stop waiting months for bank approvals. Join thousands of happy families who trusted our guaranteed 5-day sanction process.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95">
              Apply For Loan Now
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95">
              Talk to an Expert
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
