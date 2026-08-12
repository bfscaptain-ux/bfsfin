"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveTicker from "@/components/LiveTicker";
import QuickEligibility from "@/components/QuickEligibility";
import FloatingSupport from "@/components/FloatingSupport";
import BankMarquee from "@/components/BankMarquee";
import CoreServices from "@/components/CoreServices";
import BfsAdvantage from "@/components/BfsAdvantage";
import RentVsBuyCalculator from "@/components/RentVsBuyCalculator";
import ProcessTimeline from "@/components/ProcessTimeline";
import ModernBackground from "@/components/ModernBackground";
import SharedContactForm from "@/components/SharedContactForm";
import ReviewMarquee from "@/components/ReviewMarquee";
import { motion } from "framer-motion";

import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Star,
  Quote,
  MapPin,
  PhoneCall,
  Calculator,
  HeartHandshake,
  ChevronDown
} from "lucide-react";

export default function HomeClient() {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [currentHeroPoint, setCurrentHeroPoint] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroPoint((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-900 selection:text-white transition-colors duration-500 relative">
      
      {/* GEN-Z INTERACTIVE BACKGROUND */}
      <ModernBackground />

      <Header />

      {/* 1. HERO SECTION - Perfectly responsive on every screen size */}
      <section className="relative min-h-[calc(100svh-80px)] lg:min-h-[calc(100svh-120px)] overflow-hidden flex items-start lg:items-center bg-transparent z-10 pt-4 pb-16 lg:py-0">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <img 
            src="/hero_image.jpg" 
            alt="Bhardwaj Finance Hero Background" 
            className="w-full h-full object-cover object-[70%_center] lg:object-center opacity-90"
          />
          {/* Universal Dark overlay for text readability, blending image naturally */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
          {/* Very subtle bottom fade for smooth section transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent"></div>
        </div>

        {/* BFS Logo watermark - bottom-right behind content */}
        <div className="absolute bottom-0 right-0 pointer-events-none select-none translate-x-1/4 translate-y-1/4 opacity-[0.04] dark:opacity-[0.08] z-[1] hidden md:block">
          <img src="/logo.png" alt="" className="w-[40vw] max-w-[560px] min-w-[260px] h-auto object-contain" />
        </div>

        {/* Content — centred vertically on large screens, pushed to top on mobile */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 relative z-10 w-full pt-4 lg:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start lg:items-center mt-2 lg:mt-0">
            
            {/* LEFT: Copy */}
            <div className="lg:col-span-7 xl:col-span-6 animate-in slide-in-from-bottom-8 fade-in duration-1000 fill-mode-both space-y-3 sm:space-y-4 lg:space-y-5 xl:space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-[11px] font-bold text-slate-100 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                RBI Registered & Verified Partners
              </div>
              
              <h1 className="
                text-[clamp(2.2rem,5vw,4.2rem)]
                font-extrabold text-white
                leading-[1.1] tracking-tight drop-shadow-md
              ">
                Your Dream Home,
                <br />
                <span className="inline-flex flex-wrap items-center gap-x-2 mt-0.5 lg:mt-1">
                  <span className="text-emerald-400">Funded in</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
                    5 Days.
                  </span>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 shrink-0 w-[clamp(1.8rem,3vw,2.8rem)] h-[clamp(1.8rem,3vw,2.8rem)] drop-shadow-md">
                    <path d="M7 13s2 3 5 3 5-3 5-3" />
                    <line x1="8" y1="9" x2="8.01" y2="9" />
                    <line x1="16" y1="9" x2="16.01" y2="9" />
                  </svg>
                </span>
              </h1>
              
              <div className="flex flex-col gap-2.5 pt-0.5 lg:pt-1">
                {/* Desktop: Static List */}
                <div className="hidden lg:flex flex-col gap-2.5">
                  {[
                    "Lowest Interest Rates Guaranteed (from 6.50%)",
                    "Zero Processing Fees for Direct Applications",
                    "Doorstep Document Pickup & 100% Digital Process",
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[clamp(13px,1.4vw,15px)] font-bold text-slate-100 tracking-tight drop-shadow-sm">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Mobile: Auto-swiping ticker (App-like UI) */}
                <div className="flex lg:hidden relative h-[2.5rem] items-center w-full overflow-hidden bg-white/5 backdrop-blur-md rounded-2xl px-3 border border-white/10 shadow-inner">
                  {[
                    "Lowest Interest Rates Guaranteed (6.50%)",
                    "Zero Processing Fees Applicable",
                    "Doorstep Pickup & 100% Digital",
                  ].map((point, i) => (
                    <div 
                      key={i} 
                      className={`absolute inset-0 px-1 flex items-center gap-2.5 transition-all duration-700 ease-in-out ${
                        currentHeroPoint === i 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : currentHeroPoint < i 
                            ? 'opacity-0 translate-y-6 scale-95 pointer-events-none'
                            : 'opacity-0 -translate-y-6 scale-95 pointer-events-none'
                      }`}
                      style={{ 
                        // Quick fix for looping transition direction
                        transform: currentHeroPoint === 0 && i === 2 ? 'translateY(-1.5rem) scale(0.95)' : undefined 
                      }}
                    >
                      <div className="flex-shrink-0 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="text-[13px] font-bold text-white tracking-wide drop-shadow-md truncate">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-1 lg:pt-3">
                <Link
                  href="/apply"
                  className="relative group w-full sm:w-auto px-7 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-[15px] rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                  Apply For Loan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
                  <Link href="/reviews" className="flex-1 flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                    <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" className="w-4 h-4" />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-0.5 mb-0.5">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[9px] font-semibold text-slate-300 leading-none">
                        <strong className="text-white font-black">4.9/5</strong> (1.2k+ reviews)
                      </span>
                    </div>
                  </Link>

                  <a href="tel:7900979001" className="flex-1 flex items-center justify-center gap-2 bg-black/30 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 group shadow-sm hover:bg-black/40 transition-colors">
                    <div className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <PhoneCall className="relative inline-flex rounded-full w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-300 font-semibold leading-tight">Call Expert</span>
                      <span className="font-bold text-white text-[11px] leading-tight tracking-wide">7900-979-001</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: EMI Card */}
            <div className="lg:col-span-5 xl:col-span-6 relative w-full animate-in slide-in-from-right-8 fade-in duration-1000 delay-200 fill-mode-both flex justify-center lg:justify-end">
              <div className="w-full max-w-full sm:max-w-[380px] xl:max-w-[420px] bg-white/10 backdrop-blur-3xl p-6 sm:p-8 rounded-[2rem] shadow-2xl border border-white/20 relative z-20">
                <div className="absolute -top-3 -right-3 bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-xl shadow-xl border border-amber-300/50 flex items-center gap-1.5 z-30 transform rotate-3 hover:rotate-0 transition-all duration-300 animate-[bounce_3s_infinite]">
                  <HeartHandshake className="w-5 h-5 text-white animate-pulse" />
                  <div className="pr-1">
                    <p className="text-[7px] uppercase font-bold text-amber-100 tracking-wider leading-tight">Success Rate</p>
                    <p className="font-black text-white text-[10px] leading-tight">98% Approvals</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                    <Calculator className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-[15px]">Quick EMI Estimate</h3>
                    <p className="text-[11px] text-slate-300">Move slider to calculate</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Loan Amount</span>
                      <span className="text-lg font-black text-emerald-400">₹{(loanAmount / 100000).toFixed(1)} Lakhs</span>
                    </div>
                    <input 
                      type="range" 
                      min="1000000" 
                      max="10000000" 
                      step="500000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all"
                    />
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center backdrop-blur-md">
                    <div>
                      <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-1">Est. Monthly EMI</p>
                      <p className="text-2xl font-black text-white">
                        ₹{Math.round((loanAmount * 0.065 / 12) / (1 - Math.pow(1 + 0.065 / 12, -240))).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-1">Interest Rate</p>
                      <p className="text-base font-bold text-emerald-400 flex items-center justify-end gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        6.50% p.a.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGE STRIP */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-20 mt-0 sm:mt-4 lg:-mt-8 mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto"
      >
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[1.25rem] sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-white dark:border-slate-800 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 lg:gap-6 mx-auto max-w-sm sm:max-w-none">
          <Link href="/reviews" className="flex items-center gap-3 w-full justify-center lg:justify-start hover:opacity-80 transition-opacity cursor-pointer">
            <div className="flex -space-x-2.5 sm:-space-x-3">
              <img className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover" src="/uploads/avatar1.jpg" alt="Verified Customer" />
              <img className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover" src="/uploads/avatar2.jpg" alt="Verified Customer" />
              <img className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover" src="/uploads/avatar3.jpg" alt="Verified Customer" />
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-slate-800 bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-emerald-700 dark:text-emerald-300">10k+</div>
            </div>
            <div className="text-[13px] sm:text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">
              Trusted by 10,000+ <br/><span className="text-[10px] sm:text-[11px] font-medium text-slate-500">Families across India</span>
            </div>
          </Link>
          <div className="hidden lg:block w-px h-12 bg-slate-200 dark:bg-slate-700"></div>
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 shrink-0">Top Partners:</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg" alt="HDFC" className="h-4 xl:h-5 object-contain shrink-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg" alt="SBI" className="h-5 xl:h-6 object-contain shrink-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg" alt="ICICI" className="h-4 xl:h-5 object-contain shrink-0" />
          </div>
        </div>
      </motion.div>

      {/* NEW MODERN SECTIONS WITH TRANSPARENT WRAPPERS */}
      <BankMarquee />
      <CoreServices />
      <BfsAdvantage />
      <LiveTicker />

      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="py-20 relative z-10 border-y border-slate-200/30 dark:border-slate-800/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickEligibility />
        </div>
      </motion.section>

      <RentVsBuyCalculator />
      <ProcessTimeline />

      {/* FOUNDER & AUTHORITY MESSAGE - PREMIUM REDESIGN */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 relative z-10 border-y border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-[#070b14]/50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Subtle glowing orbs behind the card */}
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.1)] transition-all duration-700 overflow-hidden">
            {/* Elegant Top Border line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Image Section - Magazine Editorial Style (Left side) */}
              <div className="lg:col-span-5 relative h-full min-h-[400px] md:min-h-[500px] lg:min-h-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                {/* Diagonal overlay cut for wide screens */}
                <div className="hidden lg:block absolute inset-y-0 right-0 w-32 bg-white dark:bg-slate-900 transform translate-x-16 skew-x-[-10deg] z-20" />
                
                <img 
                  src="/vinita_sharma.png" 
                  alt="Mrs. Vinita Sharma" 
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                
                {/* Inner gradient to ensure the image sits elegantly */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 lg:hidden" />
                
                {/* Mobile/Tablet Badge (sits on image) */}
                <div className="lg:hidden absolute bottom-6 left-6 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-widest shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Owner's Desk
                </div>
              </div>

              {/* Content Section - Sophisticated Typography (Right side) */}
              <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 relative z-10 flex flex-col justify-center">
                {/* Desktop Badge */}
                <div className="hidden lg:inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-8 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  From the Owner's Desk
                </div>

                <div className="relative">
                  {/* Giant transparent quote mark */}
                  <span className="absolute -top-12 -left-6 text-[120px] leading-none text-slate-100 dark:text-slate-800/50 font-serif select-none pointer-events-none">
                    "
                  </span>
                  
                  <h3 className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-[1.3] tracking-tight mb-8">
                    <span className="text-emerald-600 dark:text-emerald-400">We don't just secure loans;</span> we legally vet your lifetime investment. Total transparency, zero hidden brokerage.
                  </h3>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-8">
                  <div>
                    <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      Mrs. Vinita Sharma
                    </p>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">
                      Owner & Visionary, BFS
                    </p>
                  </div>
                  
                  {/* Seal / Emblem */}
                  <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 opacity-10 dark:opacity-[0.15]">
                    <img src="/logo.png" alt="BFS Seal" className="w-full h-full object-contain grayscale" />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </motion.section>

      {/* HEAD OFFICE / CONTACT BLOCK - Adaptive Glass */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="py-24 relative z-10 overflow-hidden border-t border-slate-200/50 dark:border-slate-800/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/80 dark:border-slate-800/50 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700/50 text-[11px] font-bold uppercase tracking-widest text-blue-600 dark:text-slate-400 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Physical Presence
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight tracking-tight text-slate-900 dark:text-white">Visit Our <br/>Agra Head Office</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-md text-lg leading-relaxed">
                While we process loans digitally across India, our doors are always open for face-to-face consultations. 
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700/50 shadow-sm group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors">
                    <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Corporate Headquarters</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed text-sm font-medium">12/34, Financial District, Sanjay Place,<br/>Agra, Uttar Pradesh 282002</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700/50 shadow-sm group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-colors">
                    <PhoneCall className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Direct Hotline</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed text-sm font-medium">1800-XXX-XXXX (Toll Free)<br/>Available Mon-Sat, 10 AM to 7 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 dark:bg-slate-900/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative text-white lg:min-h-[500px]">
              <h4 className="font-extrabold text-3xl mb-2 text-white tracking-tight">Request a Callback</h4>
              <p className="text-slate-400 text-sm mb-8">Our loan experts will reach out to you within 10 minutes.</p>
              <SharedContactForm variant="dark" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* DYNAMIC CLIENT REVIEWS MARQUEE */}
      <ReviewMarquee />

      {/* FAQ SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="py-24 relative z-10 border-t border-slate-200/30 dark:border-slate-800/30 overflow-hidden"
      >
        {/* BFS Logo watermark - bottom left accent */}
        <div className="absolute bottom-0 left-0 pointer-events-none select-none opacity-[0.04] dark:opacity-[0.06] -translate-x-1/4 translate-y-1/4">
          <img src="/logo.png" alt="" className="w-72 h-72 object-contain" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-4">
            {[
              { q: "What is the minimum CIBIL score required for a home loan?", a: "Ideally, a CIBIL score of 750 or above is preferred by most partner banks for the lowest interest rates (starting at 6.50%). However, we can also process loans for scores between 650-749 with slight variations in the rate." },
              { q: "How does the '5-Day Sanction Guarantee' work?", a: "Once you submit all the required documents (KYC, Income Proof, and Property Papers), our dedicated team processes your file directly through priority banking channels. We ensure a sanction letter is generated within 5 working days." },
              { q: "Do you charge any hidden processing fees?", a: "No. BFS operates with complete transparency. We do not charge any hidden brokerage fees from our clients. You only pay the standard bank processing fee directly to the lending bank." },
              { q: "Can I transfer my existing high-interest loan to a new bank?", a: "Yes! Our Balance Transfer facility allows you to shift your existing loan to a new bank at a much lower interest rate (starting at 6.45%), saving you lakhs in interest over the tenure." }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white/50 dark:bg-slate-900/40 backdrop-blur-md border border-white/50 dark:border-slate-800/50 rounded-[1.5rem] [&_summary::-webkit-details-marker]:hidden transition-all duration-300 open:shadow-lg open:shadow-blue-900/5 open:bg-white/80 dark:open:bg-slate-900/80">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 sm:p-8 text-slate-900 dark:text-white font-bold text-base sm:text-lg select-none">
                  {faq.q}
                  <span className="shrink-0 text-slate-400 group-open:-rotate-180 transition-transform duration-300 bg-white dark:bg-slate-800 p-2 rounded-full shadow-sm">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </summary>
                <div className="px-6 sm:px-8 pb-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base border-t border-slate-200/50 dark:border-slate-800/50 pt-4 font-medium">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </motion.section>

      {/* STRONG FINAL CTA - Adaptive Glass */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="relative py-32 text-center overflow-hidden border-t border-slate-200/50 dark:border-slate-800/30 z-10"
      >
        <div className="max-w-4xl mx-auto px-4 relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border border-slate-200/80 dark:border-slate-800 p-12 md:p-20 rounded-[3rem] shadow-2xl dark:shadow-[0_0_100px_rgba(16,185,129,0.15)]">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-8 relative z-10 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Start Today
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight relative z-10">
            Your dream home is just <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400">5 days away.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed relative z-10">
            Join thousands of families across India who secured their future with BFS safely and transparently.
          </p>
          <Link href="/apply" className="relative z-10 inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white font-bold text-lg rounded-2xl hover:bg-emerald-500 hover:scale-[1.02] transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)]">
            Start Digital Application
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
