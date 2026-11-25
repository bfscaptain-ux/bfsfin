"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HomeLoanHuman2D from "@/components/illustrations/HomeLoanHuman2D";
import InsuranceHuman2D from "@/components/illustrations/InsuranceHuman2D";
import HealthHeroHuman2D from "@/components/illustrations/HealthHeroHuman2D";
import ProcessHuman2D from "@/components/illustrations/ProcessHuman2D";
import HeroAdvisorHuman2D from "@/components/illustrations/HeroAdvisorHuman2D";
import ProcessBgAmbient2D from "@/components/illustrations/ProcessBgAmbient2D";
import { PillarsLeftBg2D, PillarsRightBg2D } from "@/components/illustrations/PillarsBgCharacters2D";
import { LoanPortfolioLeftBg2D, LoanPortfolioRightBg2D } from "@/components/illustrations/LoanPortfolioBg2D";
import { CashlessBimaLeftBg2D, CashlessBimaRightBg2D } from "@/components/illustrations/CashlessBimaBg2D";
import LegalAdvisorBg2D from "@/components/illustrations/LegalAdvisorBg2D";


import Footer from "@/components/Footer";
const SmartMarquee = dynamic(() => import("@/components/SmartMarquee"));
const QuickEligibility = dynamic(() => import("@/components/QuickEligibility"), { ssr: false });
const InteractiveStatsMarquee = dynamic(() => import("@/components/InteractiveStatsMarquee"), { ssr: false });

// Lazy-loaded below-the-fold components to accelerate First Contentful Paint
const DynamicFaq = dynamic(() => import("@/components/DynamicFaq"), { ssr: true });
const FloatingSupport = dynamic(() => import("@/components/FloatingSupport"), { ssr: false });
const ReviewsSection = dynamic(() => import("@/components/ReviewsSection"), { ssr: false });
const CrmIntroductionSection = dynamic(() => import("@/components/CrmIntroductionSection"), { ssr: true });

import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building2,
  Wallet,
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
  Smile,
  HeartPulse,
  Sparkles,
  Check,
  Shield,
  Stethoscope,
  Umbrella,
  ZapOff,
  Wifi,
  Crown,
  Gift,
  Layers,
  ChevronRight,
  Lock,
  Mail,
  KeyRound,
  AlertCircle,
  BadgePercent,
  Receipt,
  Factory,
  CheckSquare,
  Home,
  Key,
  MessageCircle
} from "lucide-react";

const CALLBACK_SERVICES = {
  "Loan": {
    label: "Loan Advisory",
    subTypes: [
      "Home Loan (From 7.15%* ROI)",
      "Business & MSME Working Capital",
      "Loan Against Property (LAP)",
      "Personal & Express Loan",
      "Balance Transfer & Top-Up",
      "Commercial Property Purchase",
      "Property Legal & Title Vetting"
    ],
    amountLabel: "Estimated Loan Requirement",
    amounts: [
      "₹5 Lakh – ₹15 Lakh",
      "₹15 Lakh – ₹35 Lakh",
      "₹35 Lakh – ₹75 Lakh",
      "₹75 Lakh – ₹1.5 Crore",
      "₹1.5 Crore – ₹5 Crore+",
      "General Consultation / Undecided"
    ]
  },
  "Insurance": {
    label: "Insurance Desk",
    subTypes: [
      "Cashless Health Mediclaim (10,000+ Hospitals)",
      "Term Life Insurance / Bima Cover",
      "Family Floater Health Plan",
      "Senior Citizen Comprehensive Cover",
      "Critical Illness & Cancer Cover",
      "Commercial & Fire Insurance",
      "Motor & Vehicle Insurance"
    ],
    amountLabel: "Required Sum Insured Cover",
    amounts: [
      "₹5 Lakh Sum Insured",
      "₹10 Lakh Sum Insured",
      "₹25 Lakh Sum Insured",
      "₹50 Lakh Sum Insured",
      "₹1 Crore+ Sum Insured",
      "Policy Audit / Claim Assistance"
    ]
  }
} as const;

type CallbackCategory = keyof typeof CALLBACK_SERVICES;

const CALLBACK_SLOTS = [
  "Immediate (Within 30 Mins)",
  "Morning (10:00 AM – 01:00 PM)",
  "Afternoon (01:00 PM – 04:00 PM)",
  "Evening (04:00 PM – 07:00 PM)"
] as const;

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  className = ""
}: {
  value: string;
  onChange: (val: string) => void;
  options: readonly string[] | string[];
  placeholder?: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-emerald-950/70 hover:bg-emerald-950/90 active:scale-[0.99] border border-emerald-700/60 focus:border-emerald-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white flex items-center justify-between gap-2 transition-all duration-200 outline-none text-left cursor-pointer shadow-inner group"
      >
        <span className="truncate font-medium text-slate-100">
          {value || placeholder || "Select..."}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-emerald-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-emerald-300" : "group-hover:text-emerald-300"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-slate-900/95 backdrop-blur-2xl border border-emerald-500/30 rounded-2xl shadow-2xl shadow-black/90 p-1.5 max-h-64 overflow-y-auto"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(16, 185, 129, 0.3) transparent" }}
          >
            {options.map((opt) => {
              const isSelected = opt === value;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between gap-2.5 transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 shadow-sm"
                      : "text-slate-200 hover:bg-emerald-500/10 hover:text-white"
                  }`}
                >
                  <span className="leading-snug">{opt}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomeClient({ heroConfig, ownerConfig, bankLogos = [], homeLoanRate, balanceTransferRate, selfEmployedRate, businessLoanRate, lapRate, personalLoanRate, goldLoanRate, contactPhone, whatsappPhone }: { heroConfig?: any, ownerConfig?: any, bankLogos?: { id: string; bankName: string; logoUrl: string }[], homeLoanRate?: string, balanceTransferRate?: string, selfEmployedRate?: string, businessLoanRate?: string, lapRate?: string, personalLoanRate?: string, goldLoanRate?: string, contactPhone?: string, whatsappPhone?: string }) {
  
  const owner = ownerConfig || {
    name: "Vineeta Sharma",
    role: "Founder & Managing Director, BFS",
    quote: "We don't just secure loans; we legally vet your lifetime investment. Total transparency, zero hidden brokerage.",
    image: "/owner.png"
  };

  const [loanAmount, setLoanAmount] = useState(2500000);
  const [loanTenure, setLoanTenure] = useState(20);
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackEmail, setCallbackEmail] = useState("");
  const [callbackOtp, setCallbackOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [otpError, setOtpError] = useState("");
  const [mockOtpHint, setMockOtpHint] = useState("");
  const [formTouched, setFormTouched] = useState(false);
  const [callbackCategory, setCallbackCategory] = useState<CallbackCategory>("Loan");
  const [callbackSubType, setCallbackSubType] = useState<string>(CALLBACK_SERVICES["Loan"].subTypes[0]);
  const [callbackAmount, setCallbackAmount] = useState<string>(CALLBACK_SERVICES["Loan"].amounts[1]);
  const [callbackCity, setCallbackCity] = useState("Agra");
  const [callbackTime, setCallbackTime] = useState("Immediate (Within 30 Mins)");
  const [callbackNotes, setCallbackNotes] = useState("");
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackSuccess, setCallbackSuccess] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  // Flagship Home Loan Showcase Interactive State

  useEffect(() => {
    if (otpCooldown <= 0) return;
    const timer = setInterval(() => {
      setOtpCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCooldown]);

  const triggerCelebration = async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#059669', '#fbbf24', '#38bdf8', '#ffffff']
      });
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#10b981', '#34d399', '#fbbf24', '#f43f5e']
        });
      }, 200);
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#10b981', '#34d399', '#38bdf8', '#a855f7']
        });
      }, 350);
    } catch (err) {
      console.error("Celebration confetti error:", err);
    }
  };

  const handleSendOtp = async () => {
    const cleanPhone = callbackPhone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setOtpError("Please enter a valid 10-digit mobile number first.");
      return;
    }
    setIsOtpSending(true);
    setOtpError("");
    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: cleanPhone.slice(-10),
          email: callbackEmail?.trim()?.toLowerCase(),
          name: callbackName,
          formName: "Instant Callback"
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsOtpSent(true);
        setOtpCooldown(60);
        if (data.mockOtp) {
          setMockOtpHint(data.mockOtp);
        }
      } else {
        setOtpError(data.error || "Failed to send verification SMS.");
      }
    } catch {
      setOtpError("Network connection error. Could not dispatch OTP.");
    }
    setIsOtpSending(false);
  };

  const handleVerifyOtp = async () => {
    const trimmedOtp = callbackOtp.trim();
    if (trimmedOtp.length !== 6) {
      setOtpError("Please enter the 6-digit OTP received via SMS.");
      return;
    }
    setIsOtpVerifying(true);
    setOtpError("");
    try {
      const res = await fetch("/api/otp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: callbackPhone.replace(/\D/g, "").slice(-10),
          email: callbackEmail?.trim()?.toLowerCase(),
          otp: trimmedOtp
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsEmailVerified(true);
        setOtpError("");
        setMockOtpHint("");
      } else {
        setOtpError(data.error || "Incorrect or expired OTP.");
      }
    } catch {
      setOtpError("Verification failed. Please try again.");
    }
    setIsOtpVerifying(false);
  };
  const [activeBullet, setActiveBullet] = useState(0);
  const [heroWidgetTab, setHeroWidgetTab] = useState<"loan" | "insurance">("loan");
  const [activeLoanFilter, setActiveLoanFilter] = useState<"all" | "home" | "business" | "lap">("all");
  
  // Framer motion variants for smooth staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };



  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBullet((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(timer);
  }, []);
  // Fallbacks just in case
  const hConfig = heroConfig || {
    imageUrl: "/hero_image.jpg",
    badgeText: "RBI Registered & Verified Partners",
    titlePart1: "Building Wealth, Securing Lives,",
    titlePart2: "Loans & Complete Insurance.",
    bullet1: `Lowest Institutional Rates Starting from ${homeLoanRate || "7.15"}%* p.a.`, 
    bullet2: "100% Cashless Health Bima & Free Claim Assistance",
    bullet3: "Direct Access to 50+ Top Banks & Transparent Approvals",
    supportText: `Prefer talking to an expert? Call: ${contactPhone || "+91 9258-724-227"}`, 
    googleRating: "4.9",
    googleReviewCount: "555+"
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-900 selection:text-white transition-colors duration-300 relative w-full">


      <Header />

      {/* 0. LIVE FINANCIAL ALERT & BREAKING NEWS TICKER */}
      <div className="bg-slate-900 text-white border-b border-emerald-500/20 py-2 px-4 text-xs relative z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-extrabold uppercase tracking-wider text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              Breaking Alert
            </span>
          </div>
          <div className="truncate flex-grow text-slate-300 font-medium text-xs sm:text-sm">
            <Link href="/news" className="hover:text-emerald-400 transition-colors">
              Special Festive Home Loan ROI Starting from 7.15%* p.a. • Express 3-5 Day In-Principle Sanctions* • Compare Top Banks →
            </Link>
          </div>
          <Link href="/news" className="shrink-0 text-emerald-400 hover:text-emerald-300 font-bold hidden md:inline-flex items-center gap-1 text-xs">
            All News <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 1. EMOTIONAL & TRUST-FOCUSED HERO SECTION (MOBILE OPTIMIZED & ANIMATED) */}
      <section className="relative pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-24 xl:pt-14 xl:pb-20 overflow-hidden flex items-center bg-slate-50 dark:bg-emerald-950">
        
        {/* Absolute Background Image (Framed so the couple is visible between text and calculator) */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={hConfig.imageUrl} 
            alt="Bhardwaj Financial Services Hero Background" 
            priority
            fill
            sizes="100vw"
            quality={80}
            className="object-cover object-[70%_35%] lg:object-[66%_35%] xl:object-[63%_35%] opacity-90 dark:opacity-40"
          />
          {/* Smooth, High-Contrast Gradient Overlay: left side solid/semi-translucent white so text is 100% crisp, transitioning smoothly before the family cutout */}
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white via-white/95 md:via-white/90 lg:via-white/80 to-white/30 lg:to-transparent dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950/50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-white/90 via-transparent to-transparent hidden md:block"></div>
        </div>

        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
            
            {/* Left Content - Trust & Value (Sophisticated Text & Motion) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 max-w-xl xl:max-w-2xl space-y-3 sm:space-y-4"
            >
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs sm:text-[13px] font-bold w-max shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{hConfig.badgeText || "Direct Banking Partner • 50+ Top Banks & NBFCs"}</span>
              </div>

              {/* Premium Main Heading with High-Contrast Animated Glow */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3.25rem] font-black text-slate-900 dark:text-white leading-[1.2] tracking-tight mb-2 sm:mb-3">
                <span className="block">{hConfig.titlePart1}</span>
                <span className="shine-text-glow font-black tracking-tight inline-block mt-0.5 sm:mt-1">
                  {hConfig.titlePart2}
                </span>
              </h1>
              
              {/* High-Conversion USPs (Rotating smartly) */}
              <div className="relative pt-1 pb-2 sm:pt-2 sm:pb-3 h-[42px] sm:h-[50px] overflow-hidden">
                {[(hConfig.bullet1 || `Lowest Institutional Rates Starting from ${homeLoanRate || "7.15"}%* p.a.`).replace(/6\.50/g, "7.15"), hConfig.bullet2, hConfig.bullet3].map((bullet, idx) => (
                  <div 
                    key={idx} 
                    className={`absolute inset-0 flex items-center gap-2.5 sm:gap-3 transition-all duration-500 ease-in-out ${
                      idx === activeBullet 
                        ? 'opacity-100 translate-y-0' 
                        : idx < activeBullet 
                          ? 'opacity-0 -translate-y-8' 
                          : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                    </div>
                    <span className="text-[13px] sm:text-[17px] font-bold text-slate-700 dark:text-slate-200 line-clamp-1">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* CTAs & Mobile Quick-Action Strip */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href="/appointment"
                    className="relative group w-full sm:w-max px-7 py-3.5 bg-emerald-700 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-700 text-white font-extrabold text-[15px] rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.55)] flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95 overflow-hidden ring-2 ring-emerald-500/30 ring-offset-2 dark:ring-offset-emerald-950 text-center"
                  >
                    <div className="absolute top-0 bottom-0 left-0 w-1/2 -translate-x-full animate-button-shine bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                    Apply For Loan (7.15%*) <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/products/insurance"
                    className="w-full sm:w-max px-5 py-3.5 bg-white/90 dark:bg-emerald-900/60 hover:bg-slate-100 dark:hover:bg-emerald-800/80 text-emerald-900 dark:text-emerald-200 font-bold text-[14px] rounded-2xl transition-all border border-emerald-300/80 dark:border-emerald-700/60 flex items-center justify-center gap-2 text-center active:scale-95 shadow-sm"
                  >
                    <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Cashless Bima
                  </Link>
              </div>

              {/* Unified Trust & Support Bar (Strictly Single Clean Line on Mobile & Desktop) */}
              <div className="flex items-center justify-between sm:justify-start gap-1.5 sm:gap-3 bg-white/95 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/90 dark:border-slate-700/70 p-1.5 sm:p-2 w-full sm:w-max mt-2">
                {/* Rating / Reviews */}
                <Link 
                  href="/testimonials" 
                  className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2.5 py-1 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 rounded-xl transition-colors shrink min-w-0"
                  title="View Verified Customer Reviews"
                >
                  <img src="/logo.png" alt="BFS" className="h-4 sm:h-5 w-auto object-contain shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-tight whitespace-nowrap mt-0.5">
                      <strong className="text-slate-900 dark:text-slate-100 font-black">{hConfig.googleRating}</strong>/5 ({hConfig.googleReviewCount} reviews)
                    </span>
                  </div>
                </Link>

                {/* Vertical Divider */}
                <div className="h-6 sm:h-7 w-px bg-slate-200 dark:bg-slate-700/80 shrink-0"></div>

                {/* Phone Line */}
                <a 
                  href={`tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+919286683232"}`} 
                  className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2.5 py-1 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-colors group shrink-0"
                  title="Call BFS Advisory Desk"
                >
                  <div className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 dark:bg-emerald-800 opacity-60"></span>
                    <PhoneCall className="w-3 h-3 relative z-10" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider leading-none mb-0.5">
                      Advisory Desk
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-black text-slate-800 dark:text-white leading-none whitespace-nowrap">
                      {contactPhone || "+91 9258-724-227"}
                    </span>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right Content - Interactive Multi-Product Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative w-full flex justify-center lg:justify-end mt-4 sm:mt-6 lg:mt-0"
            >
              {/* Interactive Multi-Product Widget */}
              <div className="w-full max-w-md bg-white/95 dark:bg-emerald-900/95 backdrop-blur-2xl p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/60 dark:border-slate-700/50 relative z-20 hover:shadow-emerald-500/10 transition-shadow duration-500 mx-auto">
                {/* Trust Badge on Top Right of Widget */}
                <div className="absolute -top-3 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-br from-amber-400 to-amber-600 px-2.5 py-1.5 rounded-xl shadow-xl border border-amber-300/50 flex items-center gap-1.5 z-30 transform rotate-2 hover:rotate-0 transition-all duration-300 scale-90 sm:scale-100">
                  <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" />
                  <div className="pr-0.5">
                    <p className="text-[6px] sm:text-[7px] uppercase font-bold text-amber-100 tracking-wider leading-tight">Fast Process</p>
                    <p className="font-black text-white text-[9px] sm:text-[10px] leading-tight">5-Day Sanctions</p>
                  </div>
                </div>

                {/* 3 Interactive Tabs (Mobile Touch Friendly) */}
                <div className="grid grid-cols-2 bg-slate-100 dark:bg-emerald-950/80 p-1 rounded-2xl mb-4 text-xs font-bold gap-1">
                  <button
                    onClick={() => setHeroWidgetTab("loan")}
                    className={`py-2 px-1 rounded-xl flex items-center justify-center gap-1 transition-all ${
                      heroWidgetTab === "loan"
                        ? "bg-white dark:bg-emerald-800 text-emerald-700 dark:text-white shadow-sm font-black scale-100"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                    }`}
                  >
                    <Calculator className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Loans</span>
                  </button>
                  <button
                    onClick={() => setHeroWidgetTab("insurance")}
                    className={`py-2 px-1 rounded-xl flex items-center justify-center gap-1 transition-all ${
                      heroWidgetTab === "insurance"
                        ? "bg-white dark:bg-emerald-800 text-emerald-700 dark:text-white shadow-sm font-black scale-100"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                    }`}
                  >
                    <HeartPulse className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">Insurance</span>
                  </button>
                </div>

                {/* TAB 1: LOAN EMI CALCULATOR */}
                {heroWidgetTab === "loan" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-emerald-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/40 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-slate-900 dark:text-white">Home Loan EMI</h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Calculated @ {homeLoanRate || "7.15"}%* ROI</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-black bg-emerald-50 dark:bg-emerald-800/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-700">
                        {homeLoanRate || "7.15"}%* Min ROI
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Loan Amount</span>
                        <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                          {loanAmount >= 10000000 ? `₹${(loanAmount / 10000000).toFixed(2)} Cr` : `₹${(loanAmount / 100000).toFixed(1)} Lakhs`}
                        </span>
                      </div>
                      <input aria-label="Input field" 
                        type="range" 
                        min="1000000" 
                        max="250000000" 
                        step="500000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 hover:accent-emerald-500 transition-all touch-none"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>₹10 L (Min)</span>
                        <span>₹10 Cr</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹25 Cr+ (No Limit)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Tenure (Years)</span>
                        <span className="text-base font-black text-emerald-600 dark:text-emerald-400">{loanTenure} Years</span>
                      </div>
                      <input aria-label="Input field" 
                        type="range" 
                        min="1" 
                        max="30" 
                        step="1"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 hover:accent-emerald-500 transition-all touch-none"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>1 Yr</span>
                        <span>15 Yrs</span>
                        <span>30 Yrs</span>
                      </div>
                    </div>

                    <div className="bg-slate-50/70 dark:bg-emerald-950/60 p-3 rounded-2xl border border-slate-100 dark:border-emerald-800 flex justify-between items-center relative overflow-hidden">
                      <div className="relative z-10">
                        <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Est. Monthly EMI</p>
                        <p className="text-lg font-black text-slate-900 dark:text-white">
                          ₹{Math.round((loanAmount * (parseFloat(homeLoanRate || "7.15") / 100) / 12) / (1 - Math.pow(1 + (parseFloat(homeLoanRate || "7.15") / 100) / 12, -(loanTenure * 12)))).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <Link
                        href={`/apply?service=home-loan&amount=${loanAmount}&source=hero_calculator`}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1 shrink-0 relative z-10"
                      >
                        Apply <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: CASHLESS BIMA & FREE CLAIM */}
                {heroWidgetTab === "insurance" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3.5"
                  >
                    <div className="p-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl border border-emerald-200/50 dark:border-emerald-800">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs font-black text-slate-900 dark:text-white">100% Cashless Coverage</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                        Immediate admission across 10,000+ top hospitals in Agra & Pan-India. Zero out-of-pocket stress.
                      </p>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span><strong>100% Free Claim Settlement</strong> — Dedicated concierge</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span><strong>₹1 Cr - ₹5 Cr Term Life</strong> with critical illness cover</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span><strong>Zero Dep Motor Bima</strong> with instant roadside assistance</span>
                      </div>
                    </div>

                    <Link
                      href="/apply?product=Insurance&source=hero_insurance"
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 mt-2"
                    >
                      Explore Cashless Bima <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>
                )}

                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. BANKING PARTNERS TRUST BAND - COMPACT SLEEK MARQUEE */}
      <section className="border-b border-slate-200/80 dark:border-emerald-800/60 bg-slate-100/60 dark:bg-emerald-950/80 py-2 sm:py-2.5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative flex items-center justify-center mb-1.5">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-emerald-700/60 to-transparent flex-1 max-w-[120px] sm:max-w-[200px]"></div>
          <p className="relative z-10 text-[10px] sm:text-[11px] font-black text-slate-700 dark:text-emerald-300 uppercase tracking-wider text-center px-3">
            Facilitating loans through leading Banks & HFCs
          </p>
          <div className="h-px bg-gradient-to-r from-slate-300 dark:from-emerald-700/60 via-transparent to-transparent flex-1 max-w-[120px] sm:max-w-[200px]"></div>
        </div>
        {bankLogos.length > 0 ? (
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-100/60 dark:from-emerald-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-100/60 dark:from-emerald-950 to-transparent z-10 pointer-events-none"></div>
            <SmartMarquee items={bankLogos} speed={0.5} />
          </div>
        ) : (
          <div className="flex justify-center items-center gap-6 sm:gap-10 text-xs sm:text-base">
            {["Nationalized Banks", "Private Banks", "Housing Finance NBFCs", "Institutional Pools"].map((name) => (
              <div key={name} className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                <span className="font-bold text-slate-800 dark:text-slate-200 tracking-tight">{name}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. CORE PILLARS SHOWCASE (FINANCE & INSURANCE) - INTERACTIVE & MOBILE OPTIMIZED */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 dark:bg-emerald-950/60 border-b border-slate-200/80 dark:border-emerald-800/60 relative overflow-hidden">
        {/* Ambient 2D Character Background Artworks (Flanking the 3 Pillars) */}
        <div className="absolute -left-10 lg:left-0 bottom-4 w-56 sm:w-72 lg:w-80 opacity-20 dark:opacity-25 pointer-events-none select-none z-0 hidden md:block">
          <PillarsLeftBg2D className="w-full h-full object-contain" />
        </div>
        <div className="absolute -right-10 lg:right-0 top-16 w-56 sm:w-72 lg:w-80 opacity-20 dark:opacity-25 pointer-events-none select-none z-0 hidden md:block">
          <PillarsRightBg2D className="w-full h-full object-contain" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              One Trusted Partner. <br className="hidden sm:block" />
              <span className="text-emerald-600 dark:text-emerald-400">Complete Financial Protection & Capital.</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Bhardwaj Financial Services integrates institutional lending and comprehensive healthcare protection under direct advisory in Sanjay Place, Agra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-6 sm:gap-8">
            {/* PILLAR 1: FINANCE & LOANS */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ y: -6 }}
              className="group bg-white dark:bg-emerald-900/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-emerald-800/80 shadow-md hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 dark:bg-emerald-800/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
                    From {homeLoanRate || "7.15"}%* ROI
                  </span>
                </div>
                {/* Relatable 2D Human Character Graphic */}
                <div className="w-full h-36 sm:h-40 mb-4 flex items-center justify-center bg-slate-50/70 dark:bg-slate-900/40 rounded-2xl p-2 border border-slate-100 dark:border-slate-800/60 group-hover:scale-[1.02] transition-transform duration-300">
                  <HomeLoanHuman2D className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 sm:mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Finance & Loans
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 sm:mb-6">
                  Low-interest retail and commercial capital with zero upfront legal risk. Direct access to 50+ institutional banking pools.
                </p>
                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Home Loans:</strong> Minimum ROI from 7.15%*</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>5-Day Fast Sanctions:</strong> Express file processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Unsecured Business Loans:</strong> Up to ₹5 Cr • <strong>LAP:</strong> Up to ₹15 Cr (Mortgage)</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/apply?service=home-loan"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
              >
                Apply for Loan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* PILLAR 2: COMPREHENSIVE INSURANCE */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -6 }}
              className="group bg-white dark:bg-emerald-900/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-emerald-800/80 shadow-md hover:shadow-2xl hover:border-teal-500/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-teal-100 dark:bg-teal-800/60 text-teal-700 dark:text-teal-300 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/80 dark:border-teal-800/60">
                    100% Free Claim Help
                  </span>
                </div>
                {/* Relatable 2D Human Character Graphic */}
                <div className="w-full h-36 sm:h-40 mb-4 flex items-center justify-center bg-slate-50/70 dark:bg-slate-900/40 rounded-2xl p-2 border border-slate-100 dark:border-slate-800/60 group-hover:scale-[1.02] transition-transform duration-300">
                  <InsuranceHuman2D className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 sm:mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  Insurance Solutions
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 sm:mb-6">
                  Comprehensive family, medical, term life, and motor coverage backed by personal claim advocates who fight on your behalf.
                </p>
                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span><strong>100% Cashless Hospitals:</strong> 10,000+ national network</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span><strong>Free Claim Settlement:</strong> Dedicated on-ground support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span><strong>High Cover Term Life:</strong> ₹1 Cr to ₹5 Cr financial safety</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/apply?service=insurance"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
              >
                Explore Insurance <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            </div>
        </div>
      </section>

      {/* 4. LOAN OFFERINGS PORTFOLIO (INTERACTIVE & FILTERABLE CARDS) */}
      <section className="py-14 sm:py-20 lg:py-28 bg-slate-50 dark:bg-emerald-900/30 relative overflow-hidden">
        {/* Ambient 2D Character Background Artworks (Flanking the Loan Portfolio Grid) */}
        <div className="absolute -left-12 lg:left-2 bottom-12 w-60 sm:w-72 lg:w-80 opacity-20 dark:opacity-25 pointer-events-none select-none z-0 hidden md:block">
          <LoanPortfolioLeftBg2D className="w-full h-full object-contain" />
        </div>
        <div className="absolute -right-12 lg:right-2 top-20 w-60 sm:w-72 lg:w-80 opacity-20 dark:opacity-25 pointer-events-none select-none z-0 hidden md:block">
          <LoanPortfolioRightBg2D className="w-full h-full object-contain" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Our Loan Portfolio</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mt-2 mb-3">Specialized Financial Solutions</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg">Transparent retail and commercial financing processed directly with 50+ institutional pools across India.</p>
            
            {/* Interactive Filter Pills for Mobile & Desktop */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 sm:mt-8">
              {[
                { id: "all", label: "All Financing" },
                { id: "home", label: "Home Loans & BT (7.15%*)" },
                { id: "business", label: "Business & MSME" },
                { id: "lap", label: "LAP & Personal" }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveLoanFilter(filter.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 ${
                    activeLoanFilter === filter.id
                      ? "bg-emerald-700 text-white shadow-md shadow-emerald-600/30"
                      : "bg-white dark:bg-emerald-900/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-emerald-800 hover:border-emerald-400"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {(() => {
            const allLoanProducts = [
              { id: "home", icon: <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />, title: "Home Loans", desc: "Flat, independent house, plot purchase or self-construction with flexible up to 30-year tenure.", features: ["₹10L to Unlimited (No Cap)", `Starting at ${homeLoanRate || "7.15"}%* ROI`, "5-Day Express Sanctions"], href: "/products/home-loan", color: "from-emerald-500 to-emerald-600" },
              { id: "home", icon: <RefreshCw className="w-6 h-6 sm:w-7 sm:h-7" />, title: "Balance Transfer", desc: "Shift existing high-cost loan to lowest rate partner pools and slash your EMIs immediately.", features: [`BT Rate from ${balanceTransferRate || "6.45"}%`, "Instant Top-Up Capital", "Zero Foreclosure Stress"], href: "/products/balance-transfer", color: "from-teal-500 to-teal-600" },
              { id: "lap", icon: <Award className="w-6 h-6 sm:w-7 sm:h-7" />, title: "Loan Against Property", desc: "Unlock high-value liquidity by mortgaging your residential, commercial, or industrial property.", features: [`Starting at ${lapRate || "7.50"}%`, "₹10L to Unlimited", "15-Year Long Tenure"], href: "/products/loan-against-property", color: "from-emerald-600 to-emerald-700" },
              { id: "business", icon: <Briefcase className="w-6 h-6 sm:w-7 sm:h-7" />, title: "Business Loans", desc: "Accelerate your enterprise with rapid unsecured capital. No property pledge needed.", features: [`Starting at ${businessLoanRate || "12.50"}%`, "₹10L to Unlimited", "48-Hr Priority Sanction"], href: "/products/business-loan", color: "from-emerald-500 to-teal-500" },
              { id: "lap", icon: <Smile className="w-6 h-6 sm:w-7 sm:h-7" />, title: "Personal Loans", desc: "Immediate liquidity for weddings, emergency medical bills, travel, or child education.", features: [`Starting at ${personalLoanRate || "10.50"}%`, "Minimal Documentation", "Same-Day Disbursal"], href: "/products/personal-loan", color: "from-teal-600 to-emerald-600" },
              { id: "lap", icon: <Landmark className="w-6 h-6 sm:w-7 sm:h-7" />, title: "Gold Loan", desc: "Unlock immediate liquid cash against gold ornaments at nationalized benchmark interest rates.", features: [`Starting at ${goldLoanRate || "8.50"}%`, "Up to 90% Gold Valuation", "Instant 30-Min Release"], href: "/products/gold-loan", color: "from-amber-500 to-amber-600" }
            ];
            const filteredLoans = allLoanProducts.filter((p) => activeLoanFilter === "all" || p.id === activeLoanFilter);
            const gridClass = filteredLoans.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
            return (
              <div className={`grid gap-6 ${gridClass}`}>
                {filteredLoans.map((product, idx) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <Link href={product.href} className="group bg-white dark:bg-emerald-900/60 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-emerald-800 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-800/50 border border-emerald-100 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-white/20 group-hover:border-white/30 group-hover:text-white transition-all duration-300">
                        {product.icon}
                      </div>

                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-white transition-colors">{product.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5 flex-grow group-hover:text-white/80 transition-colors leading-relaxed">{product.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-white/90 transition-colors">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 group-hover:text-white/80 transition-colors shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors pt-3 border-t border-slate-100 dark:border-emerald-800 group-hover:border-white/20 mt-auto">
                      View Details & Eligibility <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      

      {/* 4. CASHLESS INSURANCE & CLAIM ADVOCACY SHOWCASE (THEME HARMONIZED & RESPONSIVE) */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-teal-50/40 to-slate-100/70 dark:from-teal-950 dark:via-emerald-950 dark:to-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300 border-y border-teal-100/80 dark:border-teal-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.12),transparent_55%)] pointer-events-none"></div>
        {/* Ambient 2D Healthcare & Claim Protection Background Artworks */}
        <div className="absolute -left-10 lg:left-0 bottom-4 w-56 sm:w-72 lg:w-80 opacity-20 dark:opacity-25 pointer-events-none select-none z-0 hidden md:block">
          <CashlessBimaLeftBg2D className="w-full h-full object-contain" />
        </div>
        <div className="absolute -right-10 lg:right-0 top-12 w-56 sm:w-72 lg:w-80 opacity-20 dark:opacity-25 pointer-events-none select-none z-0 hidden md:block">
          <CashlessBimaRightBg2D className="w-full h-full object-contain" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-4 sm:space-y-6"
            >

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight text-slate-900 dark:text-white">
                100% Cashless Health Bima with <br />
                <span className="text-teal-600 dark:text-teal-400">Free Claim Settlement Concierge.</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                During medical emergencies, dealing with Third-Party Administrators (TPAs), hospital bill itemizations, and document approvals is the last thing you need. BFS provides hands-on claim assistance completely free of charge.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
                <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-teal-200/80 dark:border-white/10 shadow-sm backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl font-black text-teal-700 dark:text-teal-300 mb-1">10,000+</div>
                  <div className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400">Cashless Network Hospitals</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Instant admission without deposits across top multi-specialty centers.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-teal-200/80 dark:border-white/10 shadow-sm backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl font-black text-teal-700 dark:text-teal-300 mb-1">₹0 Charge</div>
                  <div className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400">Claim Concierge Service</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Our dedicated team coordinates with insurance desks until final discharge.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 sm:pt-4">
                <Link
                  href="/products/insurance"
                  className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-black text-sm rounded-xl shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
                >
                  Explore Insurance Plans <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+919286683232"}`}
                  className="px-5 py-3.5 bg-white hover:bg-teal-50 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white font-bold text-sm rounded-xl border border-teal-200 dark:border-white/20 shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
                >
                  <PhoneCall className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Emergency Claim Desk
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 bg-white dark:bg-white/5 border border-teal-200/80 dark:border-white/10 p-5 sm:p-8 rounded-3xl shadow-lg shadow-teal-500/5 backdrop-blur-md"
            >
              {/* Relatable 2D Healthcare Illustration */}
              <div className="w-full h-40 sm:h-44 mb-4 flex items-center justify-center bg-teal-50/60 dark:bg-slate-900/50 rounded-2xl p-2 border border-teal-100 dark:border-teal-900/40">
                <HealthHeroHuman2D className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" /> Insurance Portfolio Highlights
              </h3>
              <div className="space-y-3 sm:space-y-4 text-sm">
                <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-slate-900/60 border border-teal-200/70 dark:border-teal-500/20">
                  <div className="font-bold text-teal-800 dark:text-teal-300 mb-0.5">Family Floater Health Bima</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Covers pre & post-hospitalization, daycare procedures, AYUSH treatments, and annual health checkups.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-slate-900/60 border border-teal-200/70 dark:border-teal-500/20">
                  <div className="font-bold text-teal-800 dark:text-teal-300 mb-0.5">Term Life Insurance (₹1 Cr - ₹5 Cr)</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Pure protection plans with critical illness riders and accidental disability coverage at affordable premiums.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-slate-900/60 border border-teal-200/70 dark:border-teal-500/20">
                  <div className="font-bold text-teal-800 dark:text-teal-300 mb-0.5">Zero-Depreciation Motor Insurance</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Quick cashless garage repairs, engine protect cover, and 24x7 roadside towing assistance across India.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. FOUNDER & AUTHORITY MESSAGE */}
      <section className="pt-6 pb-12 bg-slate-50 dark:bg-emerald-950 relative overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="bg-white dark:bg-emerald-900 rounded-2xl sm:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 dark:border-emerald-800 p-5 sm:p-8 md:p-10 lg:px-16 lg:py-10 relative overflow-hidden">
            
            {/* Dotted Pattern Background */}
            <div className="absolute top-0 left-0 w-64 h-full bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] dark:bg-[radial-gradient(#064e3b_2px,transparent_2px)] [background-size:16px_16px] opacity-60"></div>
            <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-transparent to-white dark:to-emerald-900"></div>

            {/* Ambient 2D Legal Advocate & Governance Background Character */}
            <div className="absolute right-0 bottom-0 w-64 sm:w-80 lg:w-96 opacity-15 dark:opacity-20 pointer-events-none select-none z-0 hidden md:block">
              <LegalAdvisorBg2D className="w-full h-full object-contain" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
              
              {/* Left: Image & Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "150px" }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-4 flex flex-col items-center relative pb-8 lg:pb-0"
              >
                
                {/* Glowing Outer Ring */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-[260px] md:h-[260px] rounded-full p-2 bg-gradient-to-b from-emerald-200 via-emerald-100 to-transparent dark:from-emerald-700 dark:via-emerald-800 dark:to-transparent flex items-center justify-center shadow-sm">
                  
                  {/* Thick White Border + Image */}
                  <div className="relative w-[96%] h-[96%] rounded-full overflow-hidden border-[6px] border-white dark:border-emerald-900 shadow-sm bg-slate-100 dark:bg-emerald-800">
                    <Image 
                      src={owner.image} 
                      alt={owner.name} 
                      fill
                      sizes="(max-width: 768px) 256px, 260px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* VERIFIED Floating Badge */}
                <div className="absolute -bottom-4 bg-white dark:bg-emerald-950 px-5 sm:px-6 py-2 sm:py-2.5 rounded-2xl shadow-xl border border-slate-100 dark:border-emerald-800 flex flex-col items-center gap-1 min-w-[180px] sm:min-w-[200px]">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="w-4 h-4 fill-emerald-100" />
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#003B2A] dark:text-emerald-300">VERIFIED</span>
                  </div>
                  <span className="text-xs sm:text-[14px] text-slate-500 dark:text-slate-400 font-medium text-center">{owner.role}</span>
                </div>
              </motion.div>

              {/* Middle: Bio & Title */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "150px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-r border-slate-200/60 dark:border-emerald-800 lg:pr-12"
              >
                
                <div className="flex items-center justify-center lg:justify-start gap-3 w-full mb-3">
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1 lg:hidden"></div>
                  <div className="w-9 h-9 rounded-full border-[1.5px] border-emerald-300 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/50">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold text-emerald-700 dark:text-emerald-400 tracking-widest uppercase">MEET OUR FOUNDER</span>
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1 lg:block"></div>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.1] font-black text-[#111827] dark:text-white mb-1 tracking-tight">
                  {owner.name}
                </h3>
                <p className="text-[#00A160] dark:text-emerald-400 font-black text-base sm:text-[18px] mb-3 sm:mb-4 tracking-wide uppercase">
                  {owner.role}
                </p>

                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-4">
                  With 15+ years of experience in financial services, {owner.name} leads Bhardwaj Financial Services with a clear vision — to make loan solutions simple, transparent and accessible for everyone.
                </p>

                <div className="bg-[#F6FBF9] dark:bg-emerald-900/40 px-4 sm:px-5 py-3 rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-3 sm:gap-4 w-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-emerald-200 dark:border-emerald-700 flex items-center justify-center bg-transparent shrink-0">
                    <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-[#00A160] dark:text-emerald-400" />
                  </div>
                  <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-semibold text-left">
                    Building trust through <br />
                    <span className="text-[#00A160] dark:text-emerald-400">transparent</span> financial solutions.
                  </p>
                </div>

              </motion.div>

              {/* Right: Quote & Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "150px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-4 flex flex-col justify-between h-full lg:pl-4 pt-8 lg:pt-0 border-t lg:border-t-0 border-slate-200/60 dark:border-emerald-800"
              >
                
                <div className="flex items-center justify-center mb-4">
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#00A160] dark:bg-emerald-700 mx-3 rounded-[1px]"></div>
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                </div>

                <div className="flex-1 flex flex-col justify-center py-6 px-4 sm:px-6 bg-slate-50 dark:bg-emerald-950/40 rounded-2xl border border-slate-100 dark:border-emerald-800/40 relative">
                  <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-slate-800 dark:text-slate-200 italic">
                    &ldquo;{owner.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-center mt-4 sm:mt-6 mb-4">
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#00A160] dark:bg-emerald-700 mx-3 rounded-[1px]"></div>
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                </div>

                <Link href="/about/founder" className="w-full max-w-[320px] mx-auto flex items-center justify-center gap-2 text-sm sm:text-[15px] font-bold text-white bg-[#009A5A] hover:bg-[#008A50] py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-emerald-500/20 group/btn">
                  <User className="w-5 h-5" />
                  Meet {owner.name.split(' ')[0]} 
                  <ArrowRight className="w-5 h-5 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>

              </motion.div>
              
            </div>
          </div>
        </div>
      </section>

      {/* 7. OFFICIAL TRUST BADGES */}
      <section className="py-10 sm:py-12 bg-white dark:bg-emerald-950 border-y border-slate-200 dark:border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-2.5"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Authorized Banking Channel Partner</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Direct authorized institutional facilitator for 50+ national &amp; private partner banks.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-2.5"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Scale className="w-6 h-6" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Legally Vetted Projects</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Our in-house legal advocate team protects your lifelong financial safety.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-2.5"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <FileCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Zero Hidden Brokerage</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Direct institutional pricing with 100% transparent documentation.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. VERIFIED MILESTONES & NATIONAL IMPACT (TOUCH/SWIPE INTERACTIVE SMART MARQUEE) */}
      <InteractiveStatsMarquee />

      {/* 7. QUICK ELIGIBILITY CHECKER */}
      <section className="py-16 bg-slate-50 dark:bg-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickEligibility homeLoanRate={homeLoanRate} selfEmployedRate={selfEmployedRate} />
        </div>
      </section>

      {/* 8. LINEAR PROCESS TIMELINE (MOBILE OPTIMIZED & ANIMATED) */}
      <section className="py-14 sm:py-20 lg:py-28 bg-white dark:bg-emerald-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "150px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
          >

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1 mb-3 tracking-tight">
              Standardised 5-Day Processing
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
              A fully digital, legally vetted step-by-step process with zero branch visits and complete real-time tracking.
            </p>
            {/* Relatable 2D Fast Sanction Character Graphic */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto h-36 sm:h-44 mt-4 flex items-center justify-center">
              <ProcessHuman2D className="w-full h-full object-contain" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300 dark:from-emerald-800 dark:via-emerald-600 dark:to-emerald-800 pointer-events-none"></div>

            {[
              { step: "01", title: "Digital Application", desc: "Share basic property and income profile on our 256-bit encrypted portal.", icon: <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
              { step: "02", title: "Document & Legal Check", desc: "In-house legal advocate team verifies chain deeds, title search & KYC.", icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
              { step: "03", title: "Multi-Bank Auction", desc: "File logged across 50+ banking pools to negotiate the lowest ROI (7.15%*).", icon: <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
              { step: "04", title: "Express Disbursal", desc: "Sanction letter issued in 48-72 hrs. Direct RTGS to builder or seller.", icon: <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "150px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="relative text-center p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-emerald-900/30 border border-slate-200/80 dark:border-emerald-800/80 hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-emerald-800/70 border-2 border-emerald-200 dark:border-emerald-700 flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:scale-110 group-hover:border-emerald-500 transition-all duration-300 shadow-md">
                  <span className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-300">{item.step}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CRM ENTERPRISE INTRO SECTION */}
      <CrmIntroductionSection />

      {/* 9. HEAD OFFICE / CONTACT BLOCK (MOBILE OPTIMIZED) */}
      <section className="py-14 sm:py-20 bg-emerald-950 text-white border-t border-emerald-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.1),transparent_60%)] pointer-events-none"></div>
        {/* Ambient 2D Character Collaboration Background Watermark */}
        <div className="absolute -left-12 -bottom-10 w-72 sm:w-96 lg:w-[480px] opacity-15 dark:opacity-20 pointer-events-none select-none z-0">
          <ProcessBgAmbient2D className="w-full h-full object-contain" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-5"
            >

              <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
                Visit Our Agra Head Office
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                While we facilitate loans and issue insurance digitally across India, our head office doors are always open for direct in-person legal & financial consultations in Sanjay Place, Agra.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="w-11 h-11 rounded-xl bg-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">Corporate Headquarters</h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Place, Agra, Uttar Pradesh 282002
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="w-11 h-11 rounded-xl bg-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">Direct Customer Hotline</h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      {contactPhone || "+91 9258-724-227"} / {whatsappPhone || "+91 9286-683-232"}<br />
                      <span className="text-emerald-400 text-xs">Available Mon–Sat: 10:00 AM – 6:30 PM</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="w-11 h-11 rounded-xl bg-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">In-House Legal & Banking Desk</h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      Zero-brokerage in-person title vetting, claim advocacy, and direct multi-bank sanction syndication.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-6 bg-white/5 backdrop-blur-md p-5 sm:p-8 rounded-3xl border border-white/15 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-black text-xl sm:text-2xl text-white">Unified Smart Application Desk</h4>
                </div>
                {/* Relatable 2D Banking Advisor Character Graphic */}
                <div className="w-full h-36 sm:h-40 mb-4 flex items-center justify-center bg-white/5 rounded-2xl p-2 border border-white/10">
                  <HeroAdvisorHuman2D className="w-full h-full object-contain" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                  Select your requirement below to open our intelligent, zero-lag single application desk. Direct multi-bank sanctioning across 50+ institutional partners.
                </p>

                {/* Quick Selection Grid - Themed Icons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Home Loan", query: "home-loan", icon: Building2, sub: "From 7.15%*" },
                    { label: "Balance Transfer", query: "balance-transfer", icon: RefreshCw, sub: "Slash EMI 35%" },
                    { label: "Loan Against Property", query: "lap", icon: Landmark, sub: "₹10L to Unlimited" },
                    { label: "Business Loan", query: "business-loan", icon: Briefcase, sub: "Collateral-Free" },
                    { label: "Personal Loan", query: "personal-loan", icon: Wallet, sub: "Same Day Funds" },
                    { label: "Cashless Insurance", query: "insurance", icon: ShieldCheck, sub: "100% Free Claim" },
                  ].map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.query}
                        href={`/apply?service=${item.query}&source=homepage_hub`}
                        className="group p-3.5 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 hover:border-emerald-400 transition-all duration-300 flex flex-col text-left shadow-sm hover:shadow-lg hover:shadow-emerald-950/50 hover:-translate-y-0.5 active:scale-95"
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-900/90 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-2.5 group-hover:bg-emerald-400 group-hover:text-slate-950 group-hover:border-emerald-300 transition-all duration-300 shadow-sm">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black text-white group-hover:text-emerald-300 leading-tight">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold mt-1">
                          {item.sub}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {/* Master CTA */}
                <Link
                  href="/apply?source=homepage_universal"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black py-4 px-6 rounded-2xl text-center text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/50 transition-all cursor-pointer group"
                >
                  <span>Open Universal Smart Application Desk</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Direct Action Chips */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-300">
                  <a href="tel:9286683232" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Helpline: +91 9286-683-232</span>
                  </a>
                  <a href="https://wa.me/919286683232?text=Hi%20BFS,%20I%20am%20looking%20for%20loan%20assistance." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 font-semibold border border-emerald-700/60 transition-colors">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Desk: 9286-683-232</span>
                  </a>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-emerald-300/80 pt-1 text-center">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>DPDP Act Compliant • 256-Bit SSL • Strictly Zero Upfront Brokerage Policy</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. CLIENT REVIEWS */}
      <ReviewsSection />

      {/* 11. FAQ SECTION */}
      <section className="py-20 bg-white dark:bg-emerald-900 border-t border-slate-200 dark:border-emerald-800 relative overflow-hidden">
        {/* Ambient 2D Financial Advisor Support Watermark */}
        <div className="absolute -left-10 lg:left-4 bottom-8 w-56 sm:w-72 lg:w-80 opacity-15 dark:opacity-20 pointer-events-none select-none z-0 hidden md:block">
          <HeroAdvisorHuman2D className="w-full h-full object-contain" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h3>
          </div>
          <DynamicFaq category="General" />
        </div>
      </section>



      <Footer contactPhone={contactPhone} whatsappPhone={whatsappPhone} />
      <FloatingSupport contactPhone={contactPhone} whatsappPhone={whatsappPhone} />
    </div>
  );
}
