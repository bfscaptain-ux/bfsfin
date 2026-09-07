"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Users, 
  Rocket, 
  Clock, 
  Banknote, 
  TrendingUp, 
  Zap, 
  MapPin, 
  ChevronDown, 
  CreditCard, 
  HeartPulse, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Percent, 
  BadgePercent, 
  PhoneCall, 
  FileText, 
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { useState, useEffect } from "react";
import DynamicFaq from "@/components/DynamicFaq";

export default function AboutClient({ 
  ownerConfig = { 
    name: "Adv. Praveen Bhardwaj", 
    role: "Founder & Managing Director", 
    desc: "With dual expertise in Law (LLB) and Finance (MBA), Adv. Praveen Bhardwaj established BFS in Sanjay Place, Agra to bridge the gap between complex banking procedures and common consumers.", 
    image: "/praveen_bhardwaj.png" 
  } 
}: { ownerConfig?: any }) {
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [bankLogos, setBankLogos] = useState<any[]>([]);
  const [serviceAreas, setServiceAreas] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/hero-images")
      .then(res => res.json())
      .then(images => {
        const matching = images.find((img: any) => img.pageId === "about");
        if (matching) {
          setHeroImageUrl(matching.imageUrl);
        }
      })
      .catch(console.error);

    fetch("/api/bank-logos")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBankLogos(data);
      })
      .catch(console.error);

    fetch("/api/service-areas")
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          const cities = res.data.map((area: any) => area.name);
          setServiceAreas(cities);
        }
      })
      .catch(console.error);

    fetch("/api/team")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTeamMembers(data);
      })
      .catch(console.error);
  }, []);

  // Split bank logos into 3 rows for the marquee
  const r1 = bankLogos.slice(0, Math.ceil(bankLogos.length / 3)) || [];
  const r2 = bankLogos.slice(Math.ceil(bankLogos.length / 3), Math.ceil((bankLogos.length * 2) / 3)) || [];
  const r3 = bankLogos.slice(Math.ceil((bankLogos.length * 2) / 3)) || [];
  
  const row1 = r1.length > 0 ? r1 : bankLogos;
  const row2 = r2.length > 0 ? r2 : bankLogos;
  const row3 = r3.length > 0 ? r3 : bankLogos;

  const fadeInUp = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.15 }
  };

  // High-authority fallback leadership desks in case CMS team array is empty
  const defaultTeam = [
    {
      name: ownerConfig?.name || "Adv. Praveen Bhardwaj",
      role: ownerConfig?.role || "Founder & Managing Director",
      desc: ownerConfig?.desc || "Dual expertise in Corporate Law (LLB) and Banking Finance (MBA). Spearheading transparent multi-institution lending & consumer financial advisory across North India.",
      color: "emerald",
      initials: "PB",
      imageUrl: ownerConfig?.image || "/praveen_bhardwaj.png"
    },
    {
      name: "Credit Underwriting Desk",
      role: "Head of Multi-Bank Sanctions",
      desc: "Direct coordination across 50+ institutional lending pools ensuring Home & Business Loans get approved at minimum ROI with express 5-day TAT.",
      color: "blue",
      initials: "CU"
    },
    {
      name: "Insurance & Claims Concierge",
      role: "Head of Bima & Cashless Settlements",
      desc: "Providing 100% free claim settlement assistance across 10,000+ cashless network hospitals and 0-depreciation motor insurance claims.",
      color: "purple",
      initials: "IC"
    },
    {
      name: "Cards & Credit Advisory",
      role: "Lead Portfolio & CIBIL Specialist",
      desc: "Curating lifetime-free credit cards, airport lounge privileges, and personalized credit score rebuilding strategies.",
      color: "orange",
      initials: "CS"
    }
  ];

  const displayTeam = teamMembers && teamMembers.length > 0 ? teamMembers : defaultTeam;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300">
      <Header />

      <main className="flex-1 w-full">
        {/* PREMIUM SPLIT HERO SECTION */}
        <section className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center">
          {/* Dynamic Background Image overlay from CMS */}
          {heroImageUrl && (
            <>
              <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-normal pointer-events-none -z-10" style={{ backgroundImage: `url('${heroImageUrl}')` }}></div>
              <div className="absolute inset-0 bg-white/70 dark:bg-emerald-950/85 pointer-events-none -z-10"></div>
            </>
          )}
          {/* Elegant Background Elements */}
          <div className="absolute inset-0 w-full h-full overflow-hidden -z-20 bg-slate-50 dark:bg-emerald-950">
            <div className="absolute top-[20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-emerald-400/20 dark:bg-emerald-500/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 dark:bg-emerald-600/10 blur-[120px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* LEFT SIDE: CONTENT */}
            <div className="space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-emerald-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-sm text-xs sm:text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite]" />
                  Agra's #1 Premier Financial Distribution Hub
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight"
              >
                Building Wealth, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 relative">
                  Securing Every Future.
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-500/30 dark:text-emerald-400/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                Bhardwaj Financial Services (BFS) is your single-window financial ecosystem in Agra & across India — delivering <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Home Loans from 7.15%* ROI</strong>, <strong className="text-emerald-600 dark:text-emerald-400 font-bold">100% Cashless Insurance</strong> with free claim support, and <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Lifetime-Free Credit Cards</strong>.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2"
              >
                {[
                  "Home Loans @ 7.15%* ROI",
                  "100% Cashless Bima",
                  "Lifetime-Free Cards",
                  "5-Day Fast Sanction"
                ].map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-semibold border border-emerald-200 dark:border-emerald-500/20 shadow-[0_4px_10px_rgba(16,185,129,0.05)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    {badge}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT SIDE: 3-IN-1 METRIC DASHBOARD */}
            <div className="relative mx-auto lg:ml-auto w-full max-w-[460px] mt-6 lg:mt-0 flex flex-col gap-4 z-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-[3rem] blur-[60px] animate-pulse -z-10" />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, type: "spring" }}
                className="w-full bg-white/95 dark:bg-emerald-900/90 backdrop-blur-2xl rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-xl p-5 sm:p-6 overflow-hidden relative"
              >
                <div className="absolute -right-6 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none w-40 h-40 rotate-[-15deg]">
                  <Image src="/logo.png" alt="Watermark" fill className="object-contain grayscale" />
                </div>

                <div className="flex justify-between items-center mb-4 relative z-10">
                  <div>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">3-in-1 Financial Volume</p>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">₹500+ Cr Funded</h3>
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center p-2">
                    <Image src="/logo.png" alt="BFS Logo" width={40} height={40} className="object-contain" />
                  </div>
                </div>

                {/* 3 Pillar Micro Badges */}
                <div className="grid grid-cols-3 gap-2 mb-4 relative z-10">
                  <div className="bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl text-center border border-slate-100 dark:border-slate-700">
                    <Banknote className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Loans</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">7.15%* Min</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl text-center border border-slate-100 dark:border-slate-700">
                    <HeartPulse className="w-4 h-4 text-rose-500 mx-auto mb-1" />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Insurance</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">10K+ Cashless</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl text-center border border-slate-100 dark:border-slate-700">
                    <CreditCard className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Credit Cards</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">₹0 Lifetime</p>
                  </div>
                </div>
                
                {/* CSS Bar Chart */}
                <div className="flex items-end justify-between gap-2 h-14 pt-2 border-t border-slate-100 dark:border-emerald-800 relative z-10">
                  {[40, 60, 45, 80, 55, 90, 100].map((height, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                      className={`w-full rounded-t-sm ${i === 6 ? 'bg-gradient-to-t from-emerald-500 to-teal-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-200 dark:bg-slate-800'}`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Bottom Cards (Side by side) */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5, type: "spring" }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-lg flex flex-col items-center justify-center text-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none mb-1">Approval & Claims</p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-none">99.9% Ratio</p>
                  </div>
                </motion.div>

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
                    <p className="text-[11px] text-emerald-50 font-medium leading-none mb-1">Processing TAT</p>
                    <p className="text-base sm:text-lg font-bold leading-none">5 Days Max</p>
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
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <filter id="smoothGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path 
                d="M0,60 C288,120 576,120 720,60 C864,0 1152,0 1440,60 V125 H0 V125 Z" 
                className="fill-white dark:fill-emerald-900" 
              />
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

        {/* 3 CORE PRODUCT SUITE (TRI-PILLAR FINANCIAL HUB) */}
        <section className="py-20 bg-white dark:bg-emerald-900 relative z-10 border-b border-slate-200 dark:border-emerald-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3 shadow-inner">
                <Sparkles className="w-3.5 h-3.5" /> 3 Core Financial Pillars
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                One Trusted Partner. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
                  Three Financial Pillars.
                </span>
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
                Whether you are securing your dream home in Agra, protecting your family with cashless healthcare, or maximizing daily spending with lifetime-free credit cards — BFS offers complete transparency under one roof.
              </p>
            </div>

            {/* 3 Pillar Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* PILLAR 1: FINANCE & LOANS */}
              <motion.div 
                {...fadeInUp}
                className="group relative bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                      <Banknote className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                      ROI from 7.15%*
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Loans & Lending
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
                    Fast-track lending solutions with parallel pre-approvals across 50+ institutional channels.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Home Loans (Starting @ 7.15%* min ROI)",
                      "Unsecured Business Loans up to ₹50 Lakhs",
                      "Instant Personal Loans & LAP",
                      "Balance Transfer with ₹0 Switch Penalty"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 font-medium">
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span>Guaranteed 5-Day TAT</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Zero Hidden Brokerage</span>
                  </div>
                  <Link 
                    href="/apply"
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-500/20 transition-all"
                  >
                    Apply for Loan <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* PILLAR 2: INSURANCE SOLUTIONS */}
              <motion.div 
                {...fadeInUp}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="group relative bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                      <HeartPulse className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold border border-teal-500/20">
                      100% Free Claim Help
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    Comprehensive Insurance
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
                    Protect what matters most with cashless healthcare, term life protection, and motor covers.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      "100% Cashless Health Bima (10,000+ Hospitals)",
                      "Term Life Cover (₹1 Cr - ₹5 Cr Coverage)",
                      "Motor & Commercial Vehicle Bima (0-Dep)",
                      "Dedicated Claim Settlement Concierge"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 font-medium">
                        <Check className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span>10,000+ Cashless Network</span>
                    <span className="font-semibold text-teal-600 dark:text-teal-400">99.8% Settlement</span>
                  </div>
                  <Link 
                    href="/insurance"
                    className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-teal-500/20 transition-all"
                  >
                    Explore Insurance <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* PILLAR 3: CREDIT CARDS */}
              <motion.div 
                {...fadeInUp}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="group relative bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-700/80 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                      <CreditCard className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold border border-cyan-500/20">
                      Lifetime Free Cards
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    Credit Cards
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
                    Curated credit cards with airport lounge access, high cashback, and credit builder options.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Lifetime Free Cards (₹0 Annual & Joining Fees)",
                      "Airport Lounge Access (2–4 visits/quarter)",
                      "Up to 5% Cashback & Fuel Surcharge Waivers",
                      "Secured Cards for Low CIBIL Improvement"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 font-medium">
                        <Check className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span>100% Digital Process</span>
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">Pre-Approved Limits</span>
                  </div>
                  <Link 
                    href="/credit-cards"
                    className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-cyan-500/20 transition-all"
                  >
                    Explore Credit Cards <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP & SPECIALIZED DESKS */}
        <section className="py-20 relative z-10 bg-slate-50 dark:bg-emerald-950/70 border-b border-slate-200 dark:border-emerald-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2 block">
                Leadership & Advisory Council
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                The Experts Behind Your Sanctions
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                Our specialized desks oversee lending, insurance claim settlements, and card portfolios with legal and financial precision.
              </p>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {displayTeam.map((member, i) => {
                const color = member.color || "emerald";
                
                const colorClasses: Record<string, { bg: string, text: string }> = {
                  emerald: { bg: "from-emerald-500 to-emerald-600", text: "text-emerald-600 dark:text-emerald-400" },
                  orange: { bg: "from-orange-500 to-red-500", text: "text-orange-600 dark:text-orange-400" },
                  purple: { bg: "from-purple-500 to-pink-500", text: "text-purple-600 dark:text-purple-400" },
                  blue: { bg: "from-blue-500 to-cyan-500", text: "text-blue-600 dark:text-blue-400" },
                };
                const currentColors = colorClasses[color] || colorClasses.emerald;

                return (
                  <motion.div key={member.id || i} variants={fadeInUp} className="group relative bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-3xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)] text-center shadow-sm">
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${currentColors.bg} p-1 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-full bg-white dark:bg-emerald-900 flex items-center justify-center text-2xl font-black text-slate-800 dark:text-white shadow-inner overflow-hidden relative">
                        {member.imageUrl ? (
                          <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                        ) : (
                          member.initials
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                    <div className={`${currentColors.text} font-semibold text-xs uppercase tracking-wide mb-3`}>{member.role}</div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                      {member.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* OUR JOURNEY (TIMELINE) */}
        <section className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Our Journey</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">From a single office in Sanjay Place, Agra to a Pan-India financial powerhouse.</p>
          </motion.div>
          <div className="relative border-l-2 border-emerald-500/20 ml-3 md:ml-6 space-y-12">
            {[
              { year: "2010", title: "The Foundation in Agra", desc: "Established in Sanjay Place, Agra with a clear mission to simplify lending and eliminate tedious banking red tape for homebuyers." },
              { year: "2015", title: "Authorized Institutional Network", desc: "Expanded direct channel partnerships across 50+ institutional lending pools, guaranteeing lowest market interest rates." },
              { year: "2020", title: "5,000+ Families Funded", desc: "Achieved the major milestone of funding dream homes and commercial spaces for over 5,000 satisfied families." },
              { year: "2024 - 2026", title: "Tri-Product Financial Powerhouse", desc: "Successfully expanded into a complete financial hub: offering Lowest ROI Loans, 100% Cashless Health & Life Insurance with Free Claim Assistance, and Lifetime-Free Credit Cards across Agra and Pan-India." }
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
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US (The BFS Advantage) */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-emerald-800">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">The BFS Advantage</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Why 10,000+ clients choose BFS over single-bank branch visits.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: ShieldCheck, 
                title: "100% Transparency & Low Rates", 
                desc: "Home Loans starting from 7.15%* min ROI with transparent fee breakdowns. Zero hidden consultation fees.",
                color: "text-emerald-600 dark:text-emerald-400",
                bg: "bg-emerald-500/10 border-emerald-500/20"
              },
              { 
                icon: Building2, 
                title: "50+ Institutional Partner Pools", 
                desc: "We check your eligibility across leading nationalized banks, private institutions, and top NBFCs simultaneously with zero CIBIL harm.",
                color: "text-teal-600 dark:text-teal-400",
                bg: "bg-teal-500/10 border-teal-500/20"
              },
              { 
                icon: HeartPulse, 
                title: "End-to-End Claim Protection", 
                desc: "Dedicated personal claim assistance for health and motor policies. We manage hospital paperwork so you never fight alone.",
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
                className="bg-white dark:bg-emerald-900/50 backdrop-blur-sm border border-slate-200 dark:border-emerald-800 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
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

        {/* PAN-INDIA REACH & REGULATORY COMPLIANCE (GEO / AEO) */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-emerald-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4" /> Nationwide Reach
              </div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                Rooted in Agra, <br /> Serving Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400">India.</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                While our head office stands at <strong>Sanjay Place, Agra</strong>, our digital processing and direct lending networks support clients nationwide. Whether you require a home loan in Agra, Mathura, Noida, Gurgaon, or Pan-India, our team ensures seamless doorstep and online fulfillment.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                {(serviceAreas.length > 0 ? serviceAreas : ['Agra (HQ)', 'Mathura', 'Firozabad', 'Noida', 'Gurgaon', 'Delhi NCR', 'Mumbai', 'Bangalore', 'Jaipur']).map((city, idx) => (
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
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-3xl blur-2xl" />
              <div className="relative bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Multi-Bank Sourcing Network</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Through our official institutional partner channels, we process applications seamlessly across leading public sector banks, private financial institutions, and specialized NBFCs.
                </p>
                
                {bankLogos && bankLogos.length > 0 && (
                  <div className="relative overflow-hidden w-full flex flex-col gap-4 py-2 group">
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
                    
                    <motion.div 
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                      className="flex w-max gap-4"
                    >
                      {[...row1, ...row1].map((bank, i) => (
                        <div key={i} className="flex-none px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl flex items-center gap-3 shadow-sm">
                          {bank.logoUrl ? (
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 p-1.5 flex-shrink-0 shadow-sm">
                              <Image src={bank.logoUrl} alt={bank.bankName} width={32} height={32} className="object-contain w-full h-full" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm tracking-tight border flex-shrink-0 shadow-sm bg-emerald-100 text-emerald-600 border-emerald-200">
                              {bank.bankName?.substring(0, 3).toUpperCase()}
                            </div>
                          )}
                          <span className="font-bold text-slate-700 dark:text-slate-200 pr-2">{bank.bankName}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ SECTION (AEO OPTIMIZED) */}
        <section className="py-24 bg-slate-100/50 dark:bg-emerald-950/50 border-t border-slate-200 dark:border-emerald-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Everything you need to know about our Loans, Insurance, and Credit Cards.</p>
            </motion.div>
            
            <div className="space-y-4">
              <DynamicFaq category="General" />
            </div>
          </div>
        </section>

        {/* COMPACT CLOSING CTA (50% REDUCED HEIGHT) */}
        <section className="relative py-10 sm:py-14 overflow-hidden border-t border-slate-200 dark:border-emerald-800/80">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0a192f] to-emerald-950 z-0" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/15 blur-[90px] rounded-full z-0 pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight"
            >
              Your Complete Financial Future{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Under One Roof.
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              From Home Loans @ 7.15%* min ROI to 100% Cashless Health Insurance and Lifetime-Free Credit Cards — experience Agra's most transparent financial hub.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3 justify-center pt-2"
            >
              <Link 
                href="/apply" 
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Apply for Loan <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/insurance" 
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Explore Insurance & Cards
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
