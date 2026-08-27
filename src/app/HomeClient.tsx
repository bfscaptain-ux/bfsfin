"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import DynamicFaq from "@/components/DynamicFaq";
import Footer from "@/components/Footer";
import LiveTicker from "@/components/LiveTicker";
import QuickEligibility from "@/components/QuickEligibility";
import EMICalculator from "@/components/EMICalculator";
import FloatingSupport from "@/components/FloatingSupport";
import ReviewsSection from "@/components/ReviewsSection";
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building2,
  Award,
  ArrowRight,
  FileCheck,
  Zap,
  ChevronDown,
  Star,
  Quote,
  MapPin,
  Briefcase,
  RefreshCw,
  Landmark,
  PhoneCall,
  Scale,
  Percent,
  Calculator,
  Building,
  HeartHandshake,
  TrendingUp,
  FileText,
  Activity,
  Smile
} from "lucide-react";

export default function HomeClient({ heroConfig, ownerConfig, liveBankRates, homeLoanRate, balanceTransferRate, selfEmployedRate, businessLoanRate, lapRate, personalLoanRate, goldLoanRate, contactPhone, whatsappPhone }: { heroConfig?: any, ownerConfig?: any, liveBankRates?: any[], homeLoanRate?: string, balanceTransferRate?: string, selfEmployedRate?: string, businessLoanRate?: string, lapRate?: string, personalLoanRate?: string, goldLoanRate?: string, contactPhone?: string, whatsappPhone?: string }) {
  
  const owner = ownerConfig || {
    name: "Vineeta Sharma",
    role: "Founder & Managing Director, BFS",
    quote: "We don't just secure loans; we legally vet your lifetime investment. Total transparency, zero hidden brokerage.",
    image: "/owner.png"
  };

  const [loanAmount, setLoanAmount] = useState(2500000);
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackSuccess, setCallbackSuccess] = useState(false);
  const [bankLogos, setBankLogos] = useState<{id: string; bankName: string; logoUrl: string}[]>([]);
  useEffect(() => {
    fetch("/api/bank-logos").then(r => r.json()).then(data => {
      if (Array.isArray(data)) setBankLogos(data);
    }).catch(() => {});
  }, []);  
  // Fallbacks just in case
  const hConfig = heroConfig || {
    imageUrl: "/hero_image.jpg",
    badgeText: "RBI Registered & Verified Partners",
    titlePart1: "Your Dream Home,",
    titlePart2: "Funded in 5 Days.",
    bullet1: "Lowest Interest Rates Guaranteed (from 6.50%)",
    bullet2: "Zero Processing Fees for Direct Applications",
    bullet3: "Doorstep Document Pickup & 100% Digital Process",
    supportText: `Prefer talking to an expert? Call: ${contactPhone || "+91 7900-979-001"}`,
    googleRating: "4.9",
    googleReviewCount: "1,200+"
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-900 selection:text-white transition-colors duration-300">
      <Header />

      {/* 1. EMOTIONAL & TRUST-FOCUSED HERO SECTION (ULTRA-PREMIUM & CLEAN) */}
      <section className="relative pt-6 pb-8 lg:pt-10 lg:pb-12 overflow-hidden flex items-center bg-slate-50 dark:bg-emerald-950">
        
        {/* Absolute Background Image (Subtle Texture) */}
        <div className="absolute inset-0 z-0">
          <img 
            src={hConfig.imageUrl} 
            alt="Bhardwaj Finance Hero Background" 
            className="w-full h-full object-cover object-[center_35%] opacity-100"
          />
          {/* Smooth, Professional Gradient Overlay - Foggy on left for text readability, fading completely to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/40"></div>
          
          {/* A second soft radial gradient to ensure the text area is highly readable without blowing out the rest of the image */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-white/70 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Left Content - Trust & Value (Sophisticated Text) */}
            <div className="lg:col-span-7 space-y-3 animate-in slide-in-from-bottom-8 fade-in duration-1000 fill-mode-both">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-emerald-900/50 backdrop-blur-sm border border-slate-200 dark:border-emerald-800 px-3 py-1.5 rounded-full text-[10.5px] font-bold text-slate-700 dark:text-slate-300 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                {hConfig.badgeText}
              </div>
              
              {/* Premium Main Heading (Clean Typography Highlight with Synchronized Shine) */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight mb-4">
                {hConfig.titlePart1} <br className="hidden sm:block" />
                
                {/* Relative wrapper for synchronized shine effect */}
                <span className="relative inline-block mt-1">
                  
                  {/* 1. Base Colored Text (Normal colors) */}
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-emerald-600 dark:text-emerald-400 pr-1">{hConfig.titlePart2}</span>
                    <svg 
                      width="44" height="44" viewBox="0 0 24 24" fill="none" 
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
                      className="text-emerald-500 dark:text-emerald-400 shrink-0 ml-1"
                    >
                      <path d="M7 13s2 3 5 3 5-3 5-3" />
                      <line x1="8" y1="9" x2="8.01" y2="9" />
                      <line x1="16" y1="9" x2="16.01" y2="9" />
                    </svg>
                  </span>

                  {/* 2. Synchronized Shiny Overlay (White text that only appears during the sweep) */}
                  <span 
                    className="absolute inset-0 inline-flex items-center gap-1.5 text-white/90 dark:text-white pointer-events-none select-none z-10 animate-mask-shine"
                    aria-hidden="true"
                  >
                    <span className="pr-1 drop-shadow-md">{hConfig.titlePart2}</span>
                    <svg 
                      width="44" height="44" viewBox="0 0 24 24" fill="none" 
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
                      className="shrink-0 ml-1"
                    >
                      <path d="M7 13s2 3 5 3 5-3 5-3" />
                      <line x1="8" y1="9" x2="8.01" y2="9" />
                      <line x1="16" y1="9" x2="16.01" y2="9" />
                    </svg>
                  </span>
                </span>
              </h1>
              
              {/* High-Conversion USPs */}
              <div className="flex flex-col gap-3 pt-2 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[15px] sm:text-[17px] font-bold text-slate-700 dark:text-slate-200">
                    {hConfig.bullet1}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[15px] sm:text-[17px] font-bold text-slate-700 dark:text-slate-200">
                    {hConfig.bullet2}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[15px] sm:text-[17px] font-bold text-slate-700 dark:text-slate-200">
                    {hConfig.bullet3}
                  </span>
                </div>
              </div>
              
              {/* Actions & Trust */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                {/* Main CTA */}
                <Link
                  href="/appointment"
                  className="relative group w-full sm:w-auto px-6 py-3 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold text-[14px] rounded-xl transition-all shadow-lg shadow-emerald-600/25 dark:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-emerald-600/40 dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                  Apply For Loan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Google Reviews Badge (Glassmorphism) */}
                <div className="flex items-center gap-2.5 bg-white/90 dark:bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-slate-200 dark:border-white/20 w-full sm:w-auto justify-center sm:justify-start">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 mb-0.5">
                      <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" className="w-3 h-3 mr-0.5" />
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 leading-none">
                      <strong className="text-slate-900 dark:text-white font-black">{hConfig.googleRating}/5</strong> ({hConfig.googleReviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Phone Line (Glassmorphism) */}
              <div className="pt-1">
                <a href={`tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+917900979001"}`} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors bg-white/70 dark:bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-white/10 group">
                  <div className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <ShieldCheck className="relative inline-flex rounded-full w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  {hConfig.supportText}
                </a>
              </div>
            </div>

            {/* Right Content - Interactive Widget ONLY (Floating) */}
            <div className="lg:col-span-5 relative w-full animate-in slide-in-from-right-8 fade-in duration-1000 delay-200 fill-mode-both flex justify-center lg:justify-end mt-8 lg:mt-0">
              
              {/* Interactive EMI Widget */}
              <div className="w-full max-w-sm bg-white/95 dark:bg-emerald-900/95 backdrop-blur-2xl p-5 sm:p-5 rounded-3xl shadow-2xl border border-white/60 dark:border-slate-700/50 relative z-20 hover:shadow-emerald-500/10 transition-shadow duration-500">
                {/* Trust Badge on Top Right of Widget */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-xl shadow-xl border border-amber-300/50 flex items-center gap-1.5 z-30 transform rotate-3 hover:rotate-0 transition-all duration-300 animate-[bounce_3s_infinite]">
                  <HeartHandshake className="w-5 h-5 text-white animate-pulse" />
                  <div className="pr-1">
                    <p className="text-[7px] uppercase font-bold text-amber-100 tracking-wider leading-tight">Success Rate</p>
                    <p className="font-black text-white text-[10px] leading-tight">98% Approvals</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center border border-emerald-100 dark:border-emerald-800/50">
                    <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-[15px]">Quick EMI Estimate</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Move slider to calculate</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Loan Amount</span>
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">₹{(loanAmount / 100000).toFixed(1)} Lakhs</span>
                    </div>
                    <input 
                      type="range" 
                      min="1000000" 
                      max="10000000" 
                      step="500000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 hover:accent-emerald-500 transition-all"
                    />
                  </div>

                  <div className="bg-slate-50/50 dark:bg-emerald-950/50 p-3 rounded-2xl border border-slate-100 dark:border-emerald-800 flex justify-between items-center">
                    <div>
                      <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Est. Monthly EMI</p>
                      <p className="text-xl font-black text-slate-900 dark:text-white">
                        ₹{Math.round((loanAmount * (parseFloat(homeLoanRate || "6.50") / 100) / 12) / (1 - Math.pow(1 + (parseFloat(homeLoanRate || "6.50") / 100) / 12, -240))).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Interest</p>
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-1">
                        <span className="relative flex h-2 w-2 mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        {homeLoanRate || "6.50"}%
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANKING PARTNERS TRUST BAND - MARQUEE */}
      <section className="border-b border-slate-200 dark:border-emerald-800 bg-white dark:bg-emerald-950 py-5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center mb-4">Trusted by Top Banks in India</p>
        </div>
        {bankLogos.length > 0 ? (
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-emerald-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-emerald-950 to-transparent z-10 pointer-events-none"></div>
            {/* Marquee */}
            <div className="flex animate-marquee hover:[animation-play-state:paused]">
              {[...bankLogos, ...bankLogos, ...bankLogos].map((logo, idx) => (
                <div key={idx} className="flex-shrink-0 mx-8 flex items-center justify-center h-12 w-28 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                  <img
                    src={logo.logoUrl}
                    alt={logo.bankName}
                    title={logo.bankName}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-10 opacity-50 grayscale">
            {["HDFC", "ICICI Bank", "PNB", "SBI", "Central Bank"].map((name) => (
              <div key={name} className="flex items-center gap-2">
                <Building className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                <span className="text-lg font-black text-slate-800 dark:text-slate-200 tracking-tighter">{name}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. LIVE TICKER */}
      <LiveTicker rates={liveBankRates} />

                  {/* 3. FOUNDER & AUTHORITY MESSAGE */}
      <section className="py-12 bg-slate-50 dark:bg-emerald-950 relative overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="bg-white dark:bg-emerald-900 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 dark:border-emerald-800 p-8 md:p-10 lg:px-16 lg:py-10 relative overflow-hidden">
            
            {/* Dotted Pattern Background */}
            <div className="absolute top-0 left-0 w-64 h-full bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] dark:bg-[radial-gradient(#064e3b_2px,transparent_2px)] [background-size:16px_16px] opacity-60"></div>
            <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-transparent to-white dark:to-emerald-900"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
              
              {/* Left: Image & Badge */}
              <div className="lg:col-span-4 flex flex-col items-center relative pb-8 lg:pb-0">
                
                {/* Glowing Outer Ring */}
                <div className="relative w-64 h-64 md:w-[260px] md:h-[260px] rounded-full p-2 bg-gradient-to-b from-emerald-200 via-emerald-100 to-transparent dark:from-emerald-700 dark:via-emerald-800 dark:to-transparent flex items-center justify-center shadow-sm">
                  
                  {/* Thick White Border + Image */}
                  <div className="w-[96%] h-[96%] rounded-full overflow-hidden border-[6px] border-white dark:border-emerald-900 shadow-sm bg-slate-100 dark:bg-emerald-800">
                    <img 
                      src={owner.image} 
                      alt={owner.name} 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* VERIFIED Floating Badge */}
                <div className="absolute -bottom-4 bg-white dark:bg-emerald-950 px-6 py-2.5 rounded-2xl shadow-xl border border-slate-100 dark:border-emerald-800 flex flex-col items-center gap-1 min-w-[200px]">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="w-4 h-4 fill-emerald-100" />
                    <span className="text-sm font-black uppercase tracking-wider text-[#003B2A] dark:text-emerald-300">VERIFIED</span>
                  </div>
                  <span className="text-[14px] text-slate-500 dark:text-slate-400 font-medium text-center">{owner.role}</span>
                </div>
              </div>

              {/* Middle: Bio & Title */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-r border-slate-200/60 dark:border-emerald-800 lg:pr-12">
                
                <div className="flex items-center justify-center lg:justify-start gap-3 w-full mb-3">
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1 lg:hidden"></div>
                  <div className="w-9 h-9 rounded-full border-[1.5px] border-emerald-300 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/50">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold text-emerald-700 dark:text-emerald-400 tracking-widest uppercase">MEET OUR FOUNDER</span>
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1 lg:block"></div>
                </div>

                <h3 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.1] font-black text-[#111827] dark:text-white mb-1 tracking-tight">
                  {owner.name}
                </h3>
                <p className="text-[#00A160] dark:text-emerald-400 font-black text-[18px] mb-4 tracking-wide uppercase">
                  {owner.role}
                </p>

                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-4">
                  With 15+ years of experience in financial services, {owner.name} leads Bhardwaj Finance Services with a clear vision — to make loan solutions simple, transparent and accessible for everyone.
                </p>

                <div className="bg-[#F6FBF9] dark:bg-emerald-900/40 px-5 py-3 rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-emerald-200 dark:border-emerald-700 flex items-center justify-center bg-transparent shrink-0">
                    <Landmark className="w-6 h-6 text-[#00A160] dark:text-emerald-400" />
                  </div>
                  <p className="text-base text-slate-800 dark:text-slate-200 font-semibold text-left">
                    Building trust through <br />
                    <span className="text-[#00A160] dark:text-emerald-400">transparent</span> financial solutions.
                  </p>
                </div>

              </div>

              {/* Right: Quote & Button */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full lg:pl-4 pt-8 lg:pt-0 border-t lg:border-t-0 border-slate-200/60 dark:border-emerald-800">
                
                <div className="flex items-center justify-center mb-4">
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#00A160] dark:bg-emerald-600 mx-3 rounded-[1px]"></div>
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                </div>

                <div className="flex-1 flex flex-col justify-center py-4 relative">
                  {/* Huge SVG Quote Mark in the background for exact design match */}
                  <div className="absolute top-0 left-0 text-[#00A160] opacity-90 font-serif text-[80px] leading-none">“</div>
                  <p className="text-2xl md:text-3xl italic font-medium leading-[1.6] text-slate-800 dark:text-slate-200 leading-[1.6] mt-4 z-10 relative">
                    {owner.quote}
                  </p>
                  <div className="absolute bottom-0 right-0 text-[#00A160] opacity-90 font-serif text-[80px] leading-none transform rotate-180 translate-y-8">“</div>
                </div>

                <div className="flex items-center justify-center mt-6 mb-4">
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#00A160] dark:bg-emerald-600 mx-3 rounded-[1px]"></div>
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                </div>

                <Link href="/about/founder" className="w-full max-w-[320px] mx-auto flex items-center justify-center gap-2 text-[15px] font-bold text-white bg-[#009A5A] hover:bg-[#008A50] py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-emerald-500/20 group/btn">
                  <User className="w-5 h-5" />
                  Meet {owner.name.split(' ')[0]} 
                  <ArrowRight className="w-5 h-5 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>

              </div>
              
            </div>
          </div>
        </div>
      </section>{/* 4. OFFICIAL TRUST BADGES */}
      <section className="py-12 bg-white dark:bg-emerald-950 border-y border-slate-200 dark:border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 text-center">
            <div className="flex flex-col items-center p-6 space-y-3">
              <ShieldCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-500" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">100% RBI Compliant</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Strict adherence to national banking guidelines and regulations.</p>
            </div>
            <div className="flex flex-col items-center p-6 space-y-3">
              <Scale className="w-10 h-10 text-emerald-600 dark:text-emerald-500" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Legally Vetted Projects</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Our legal team ensures your property investment is 100% safe.</p>
            </div>
            <div className="flex flex-col items-center p-6 space-y-3">
              <FileCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-500" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Zero Hidden Brokerage</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">You pay processing fees directly to the bank. No hidden charges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOAN OFFERINGS (PREMIUM CARDS) */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Our Products</span>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-2 mb-4">Specialized Financial Solutions</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">End-to-end processing for retail and commercial clients across India.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Building2 className="w-7 h-7" />, title: "Home Loans", desc: "Flat, house, plot or self-construction with up to 30-year tenure.", features: ["₹20L to ₹5Cr+", `Starting at ${homeLoanRate || "6.50"}%`], href: "/products/home-loan", color: "from-emerald-500 to-emerald-600" },
              { icon: <Award className="w-7 h-7" />, title: "Loan Against Property", desc: "Unlock capital by mortgaging residential or commercial property.", features: [`Starting at ${lapRate || "7.50"}%`, "Up to 70% LTV", "15-Year Tenure"], href: "/products/loan-against-property", color: "from-emerald-600 to-emerald-700" },
              { icon: <RefreshCw className="w-7 h-7" />, title: "Balance Transfer", desc: "Shift your loan to a lower rate bank and save lakhs instantly.", features: [`BT Rate ${balanceTransferRate || "6.45"}%`, "Instant Top-Up"], href: "/products/balance-transfer", color: "from-teal-500 to-teal-600" },
              { icon: <Briefcase className="w-7 h-7" />, title: "Business Loans", desc: "Fuel your business growth with rapid unsecured capital.", features: [`Starting at ${businessLoanRate || "12.50"}%`, "Up to ₹5Cr", "48-Hr Approvals"], href: "/products/business-loan", color: "from-emerald-500 to-teal-500" },
              { icon: <Smile className="w-7 h-7" />, title: "Personal Loans", desc: "Quick funds for weddings, travel, medical, or any personal need.", features: [`Starting at ${personalLoanRate || "10.50"}%`, "Minimal Docs", "Instant Approval"], href: "/products/personal-loan", color: "from-teal-600 to-emerald-600" },
              { icon: <Landmark className="w-7 h-7" />, title: "Gold Loan", desc: "Get instant cash against your gold at the most competitive rates.", features: [`Starting at ${goldLoanRate || "8.50"}%`, "90% Gold Value", "Same-Day Cash"], href: "/products/gold-loan", color: "from-amber-500 to-amber-600" }
            ].map((product, idx) => (
              <Link key={idx} href={product.href} className="group bg-white dark:bg-emerald-900 rounded-2xl p-7 border border-slate-200 dark:border-emerald-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full relative overflow-hidden">
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-800/50 border border-emerald-100 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5 group-hover:bg-white/20 group-hover:border-white/30 group-hover:text-white transition-all duration-300">
                    {product.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-white transition-colors">{product.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 flex-grow group-hover:text-white/80 transition-colors">{product.desc}</p>
                  <ul className="space-y-2 mb-5">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-white/90 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 group-hover:text-white/70 transition-colors shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors pt-3 border-t border-slate-100 dark:border-emerald-800 group-hover:border-white/20">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ANIMATED COUNTER STATS */}
      <section className="py-16 bg-gradient-to-b from-emerald-900 to-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cuc3ZnLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAyYzguODM3IDAgMTYgNy4xNjMgMTYgMTZzLTcuMTYzIDE2LTE2IDE2LTE2LTcuMTYzLTE2LTE2IDcuMTYzLTE2IDE2LTE2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2,500+", label: "Loans Disbursed", icon: <FileCheck className="w-6 h-6" /> },
              { number: "₹500 Cr+", label: "Total Volume", icon: <TrendingUp className="w-6 h-6" /> },
              { number: "98%", label: "Approval Rate", icon: <Activity className="w-6 h-6" /> },
              { number: "50+", label: "Banking Partners", icon: <Landmark className="w-6 h-6" /> }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-3 group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-800/50 border border-emerald-700/50 flex items-center justify-center text-emerald-400 mx-auto group-hover:bg-emerald-700/50 group-hover:scale-110 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black text-white">{stat.number}</div>
                <div className="text-xs font-bold text-emerald-300/70 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. QUICK ELIGIBILITY CHECKER */}
      <section className="py-16 bg-slate-50 dark:bg-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickEligibility homeLoanRate={homeLoanRate} selfEmployedRate={selfEmployedRate} />
        </div>
      </section>

      {/* 8. LINEAR PROCESS TIMELINE */}
      <section className="py-20 lg:py-28 bg-white dark:bg-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 mb-4">Standardised 5-Day Processing</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">A fully transparent, step-by-step workflow with zero physical branch visits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 dark:from-emerald-800 dark:via-emerald-600 dark:to-emerald-800"></div>

            {[
              { step: "1", title: "Digital Application", desc: "Complete personal, income & property details on our secure portal.", icon: <FileText className="w-5 h-5" /> },
              { step: "2", title: "Document Verification", desc: "Upload salary slips and KYC. Verified instantly by our legal team.", icon: <ShieldCheck className="w-5 h-5" /> },
              { step: "3", title: "Bank Sanction", desc: "File logged with partner bank. Priority approval secured in 3-4 days.", icon: <Building2 className="w-5 h-5" /> },
              { step: "4", title: "Final Disbursal", desc: "Cheque/RTGS issued directly to the seller or builder account.", icon: <Zap className="w-5 h-5" /> }
            ].map((item, idx) => (
              <div key={idx} className="relative text-center group">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/50 border-2 border-emerald-200 dark:border-emerald-700 flex items-center justify-center mx-auto mb-6 relative z-10 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/50 group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-300 shadow-sm">
                  <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. HEAD OFFICE / CONTACT BLOCK */}
      <section className="py-20 bg-emerald-900 dark:bg-emerald-900 text-white border-t border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Physical Presence</h2>
              <h3 className="text-3xl md:text-4xl font-black mb-6">Visit Our Agra Head Office</h3>
              <p className="text-slate-300 mb-8 max-w-md leading-relaxed">
                While we process loans digitally across India, our doors are always open for face-to-face consultations in Agra. 
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-800/50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Corporate Headquarters</h4>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">Block-C11, Shop No.-5, First Floor,<br/>near MK Tailor, Sanjay Palace, Sanjay Place,<br/>Agra, Uttar Pradesh 282002</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-800/50 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Direct Hotline</h4>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">{contactPhone || "+91 7900-979-001"}<br/>Available Mon-Sat, 10 AM to 7 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-emerald-700/50">
              <h4 className="font-bold text-xl mb-2">Request a Callback</h4>
              <p className="text-sm text-emerald-300/60 mb-6">We'll call you within 30 minutes during business hours.</p>
              {callbackSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h5 className="font-bold text-white text-lg mb-1">Request Submitted!</h5>
                  <p className="text-sm text-emerald-300/60">Our team will contact you shortly.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  if (!callbackName.trim() || !callbackPhone.trim()) return;
                  setCallbackSubmitting(true);
                  try {
                    await fetch('/api/leads', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ name: callbackName, phone: callbackPhone, loanType: 'Callback Request', message: 'Homepage callback request' })
                    });
                    setCallbackSuccess(true);
                  } catch { /* ignore */ }
                  setCallbackSubmitting(false);
                }}>
                  <input type="text" placeholder="Full Name" required value={callbackName} onChange={(e) => setCallbackName(e.target.value)} className="w-full bg-emerald-900/50 border border-emerald-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-500 transition-colors" />
                  <input type="tel" placeholder="Mobile Number" required value={callbackPhone} onChange={(e) => setCallbackPhone(e.target.value)} className="w-full bg-emerald-900/50 border border-emerald-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-500 transition-colors" />
                  <button type="submit" disabled={callbackSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all duration-300 text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/50">
                    {callbackSubmitting ? "Submitting..." : <><PhoneCall className="w-4 h-4" /> Submit Request</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. CLIENT REVIEWS */}
      <ReviewsSection />

      {/* 11. FAQ SECTION */}
      <section className="py-20 bg-white dark:bg-emerald-900 border-t border-slate-200 dark:border-emerald-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h3>
          </div>
          <DynamicFaq category="General" />
        </div>
      </section>



      <Footer />
      <FloatingSupport contactPhone={contactPhone} whatsappPhone={whatsappPhone} />
    </div>
  );
}
