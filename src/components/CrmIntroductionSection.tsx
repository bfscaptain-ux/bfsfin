"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Lock,
  ExternalLink,
  ArrowRight,
  Cpu,
  Layers,
  Calendar,
  Users2,
  Trophy,
  CheckCircle2,
  Sparkles,
  Zap
} from "lucide-react";

interface SlideData {
  id: string;
  tabLabel: string;
  badge: string;
  icon: typeof Layers;
  image: string;
  title: string;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  highlights: string[];
}

const slides: SlideData[] = [
  {
    id: "leads",
    tabLabel: "Lead Funnel Desk",
    badge: "Multi-Channel Intake",
    icon: Layers,
    image: "/crm-showcase/lead-management.png",
    title: "Lead Management Engine",
    tagline: "Centralized Sourcing, Dynamic Priority & Automated RM Allocation",
    description:
      "Website, partner referrals aur DSA network se aane wale sabhi prospects ek hi unified pipeline me auto-intake hote hain. Hot/Warm scoring ke sath nearest in-office Relationship Manager ko instant assign kiya jata hai.",
    stats: [
      { label: "Active Pipeline", value: "32 Prospects" },
      { label: "Priority Hot Leads", value: "4 Hot Leads" },
      { label: "Lead Sourcing", value: "Multi-Partner" },
    ],
    highlights: [
      "Dynamic Priority Scoring (Hot / Warm / Fresh)",
      "1-Click Direct WhatsApp & Calling Triggers",
      "Table & Visual Kanban Funnel Views with Filters"
    ]
  },
  {
    id: "los",
    tabLabel: "LOS 360° Workbench",
    badge: "5-Phase Loan Tracker",
    icon: Zap,
    image: "/crm-showcase/los-workbench.png",
    title: "Search & CRM Track (LOS 360°)",
    tagline: "End-to-End Loan Origination, FOIR Eligibility & Encrypted Vault",
    description:
      "Applicant profile se lekar 5-Phase pipeline tracking (KYC -> Docs -> Bank Sanction -> Disbursal -> Payout). Real-time FOIR calculation, max borrowing eligibility check aur 256-bit encrypted document locker.",
    stats: [
      { label: "Pipeline Status", value: "5-Phase Audit" },
      { label: "Calculated FOIR", value: "0.0% to 50%" },
      { label: "Doc Vault", value: "256-Bit SSL" },
    ],
    highlights: [
      "5-Phase Lifecycle: KYC, Docs, Sanction, Disburse & Payout",
      "Income Clubbing & Automated Maximum Loan Eligibility",
      "1-Click ZIP Bundle Download & Document Hub Manager"
    ]
  },
  {
    id: "appointments",
    tabLabel: "Appointments Desk",
    badge: "Live Calendar Sync",
    icon: Calendar,
    image: "/crm-showcase/appointments-desk.png",
    title: "Website Appointments Desk",
    tagline: "Direct Web Booking Sync, Doorstep Routing & Google Calendar",
    description:
      "bfsfin.com/appointment se book kiye gaye doorstep visits aur branch consultation meeting slots automatically CRM desk par aate hain. In-office RM assignment ke sath direct Google Calendar invite sync hoti hai.",
    stats: [
      { label: "Booking Sync", value: "Instant Live" },
      { label: "Calendar Sync", value: "Google Cal + .ICS" },
      { label: "Advisory Type", value: "Doorstep / Office" },
    ],
    highlights: [
      "Direct Web Intake from bfsfin.com/appointment",
      "Automatic Google Calendar Invite Generation with RM Mapping",
      "Doorstep Visit vs In-Office Meeting Capsule Routing"
    ]
  },
  {
    id: "partners",
    tabLabel: "Partner & DSA Directory",
    badge: "Channel Ecosystem",
    icon: Users2,
    image: "/crm-showcase/dsa-partner-directory.png",
    title: "Partner & DSA Directory",
    tagline: "Multi-Tier Network Management, KYC Badging & Instant Payouts",
    description:
      "External DSAs, Chartered Accountants, Builders aur Real Estate Agents ke liye dedicated ecosystem. Real-time KYC completion badges, transparent commission ledger (up to 1.5%) aur 1-click external portal access switch.",
    stats: [
      { label: "Disbursed Volume", value: "₹8.15 Cr+" },
      { label: "Conversion Rate", value: "18.4% Passed" },
      { label: "Network Sourcing", value: "11 Partners" },
    ],
    highlights: [
      "Dedicated Roles: DSAs, CAs, Builders & Channel Agents",
      "1-Click Instant Portal Access ON/OFF Switch",
      "Transparent Commission Slabs & Automated Payout Ledger"
    ]
  },
  {
    id: "leaderboard",
    tabLabel: "RM Velocity Leaderboard",
    badge: "Performance Intelligence",
    icon: Trophy,
    image: "/crm-showcase/rm-leaderboard.png",
    title: "RM Disbursal Champions",
    tagline: "Production Velocity, Sanctioned File Velocity & Monthly Targets",
    description:
      "Relationship Managers ki live production velocity, sanctioned files count aur month-to-date targets ka real-time leaderboard. Transparent incentive calculation aur team productivity tracking.",
    stats: [
      { label: "Total RM Disbursed", value: "₹1.95 Cr+" },
      { label: "Sanctioned Cases", value: "6 High-Value" },
      { label: "Ranked Officers", value: "4 Officers" },
    ],
    highlights: [
      "Executive Spotlight: Champion RM, Silver RM & Bronze RM",
      "Month-to-Date Sanctioned Target Progress %",
      "Automated Sales Incentive & Commission Calculation"
    ]
  }
];

export default function CrmIntroductionSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide every 6 seconds unless paused
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeSlide = slides[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/90 dark:from-emerald-950 dark:via-slate-950 dark:to-emerald-950 text-slate-900 dark:text-white relative overflow-hidden border-t border-slate-200/80 dark:border-emerald-800/80 transition-colors duration-300">
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[140px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/15 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700/60 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span>Institutional FinTech Infrastructure</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Powered by <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">BFS Circle™</span> Enterprise Engine
          </h2>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Humara in-house proprietary CRM &amp; LOS operating system — jahan har loan application, appointment, partner referral aur RM milestone <strong className="text-slate-900 dark:text-white font-semibold">100% digital aur bank-grade precision</strong> ke sath live track hota hai.
          </p>
        </motion.div>

        {/* Top Interactive Module Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 sm:mb-10">
          {slides.map((slide, idx) => {
            const Icon = slide.icon;
            const isActive = idx === currentIdx;
            return (
              <button
                key={slide.id}
                onClick={() => {
                  setCurrentIdx(idx);
                  setIsAutoPlaying(false);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 dark:bg-emerald-600 text-white shadow-lg shadow-emerald-500/15 scale-105 border border-slate-700 dark:border-emerald-400"
                    : "bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-emerald-900/70 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-500 dark:text-slate-400"}`} />
                <span>{slide.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Centerpiece: Photorealistic Laptop Mockup with Sliding Screenshots */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Laptop Screen Outer Frame (Bezel) */}
          <div className="relative mx-auto rounded-t-[24px] sm:rounded-t-[32px] p-2.5 sm:p-4 bg-gradient-to-b from-[#1e2433] via-[#0f131c] to-[#0a0d14] border-t-2 border-x-2 border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.45)]">
            
            {/* Top Laptop Bezel with Camera Dot */}
            <div className="flex items-center justify-between px-3 pb-2 text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              
              {/* Centered Camera Lens */}
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/50">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 inline-block"></span>
                <span className="text-[11px] font-mono text-slate-300">crm.bfsfin.cloud</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
              </div>

              {/* Security Pill */}
              <div className="hidden sm:flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>256-Bit SSL</span>
              </div>
            </div>

            {/* Inner Screen Display (16:9 Aspect Ratio) */}
            <div className="relative aspect-[16/9.5] sm:aspect-[16/9] w-full overflow-hidden rounded-lg sm:rounded-xl bg-slate-950 border border-slate-800 shadow-inner group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 1100px"
                    className="object-contain sm:object-cover object-top select-none"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Slide Floating Arrows */}
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700/80 flex items-center justify-center backdrop-blur-md transition-all duration-150 opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700/80 flex items-center justify-center backdrop-blur-md transition-all duration-150 opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Screen Bottom Overlay Info Pill */}
              <div className="absolute bottom-2 sm:bottom-4 left-3 right-3 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-white shadow-lg pointer-events-auto flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs sm:text-sm font-bold">{activeSlide.title}</span>
                  <span className="text-[10px] sm:text-xs text-slate-400 hidden md:inline">· {activeSlide.badge}</span>
                </div>

                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold text-slate-300 shadow-lg">
                  {currentIdx + 1} / {slides.length}
                </div>
              </div>
            </div>
          </div>

          {/* Laptop Keyboard Deck & Base Hinge */}
          <div className="relative mx-auto w-[104%] -ml-[2%] h-3.5 sm:h-5 bg-gradient-to-b from-[#2d3545] via-[#1a202c] to-[#0c1017] rounded-b-xl sm:rounded-b-2xl shadow-2xl border-t border-slate-600/50">
            {/* Center Thumb Notch / Display Opener Indent */}
            <div className="w-20 sm:w-32 h-1 bg-slate-500/60 mx-auto rounded-b"></div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIdx(idx);
                  setIsAutoPlaying(false);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIdx
                    ? "w-8 h-2 bg-emerald-500 dark:bg-emerald-400"
                    : "w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Clean, Synchronized Module Details Card (No Fluff, 100% Screen-Accurate) */}
        <div className="mt-10 sm:mt-12 max-w-5xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-emerald-800/70 shadow-sm transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-200/60 dark:border-emerald-800/60 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activeSlide.badge}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {activeSlide.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300 mt-1">
                  {activeSlide.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5">
                  {activeSlide.description}
                </p>
              </div>

              {/* Quick Module Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 shrink-0">
                {activeSlide.stats.map((st, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 text-center min-w-[90px] sm:min-w-[110px]"
                  >
                    <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                      {st.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Core Highlights for this screen */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {activeSlide.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/40 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Protected by 256-bit AES Encryption &amp; Role-Based Authorization</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/appointment"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://crm.bfsfin.cloud/login.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CRM Portal Login</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
