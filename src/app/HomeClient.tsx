"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmartMarquee from "@/components/SmartMarquee";
import LiveTicker from "@/components/LiveTicker";
import QuickEligibility from "@/components/QuickEligibility";
import EMICalculator from "@/components/EMICalculator";
import InteractiveStatsMarquee from "@/components/InteractiveStatsMarquee";

// Lazy-loaded below-the-fold components to accelerate First Contentful Paint
const DynamicFaq = dynamic(() => import("@/components/DynamicFaq"), { ssr: false });
const FloatingSupport = dynamic(() => import("@/components/FloatingSupport"), { ssr: false });
const ReviewsSection = dynamic(() => import("@/components/ReviewsSection"), { ssr: false });
const Scrolled3DBackground = dynamic(() => import("@/components/Scrolled3DBackground"), { ssr: false });

import { motion, AnimatePresence } from "framer-motion";
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
  Smile,
  CreditCard,
  HeartPulse,
  Sparkles,
  Plane,
  ShoppingBag,
  Fuel,
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
  RotateCw,
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
  },
  "Credit Card": {
    label: "Credit Card Desk",
    subTypes: [
      "Lifetime Free Card (₹0 Annual Fee)",
      "Airport Lounge Access & Travel Card",
      "5% Flat Cashback & Shopping Card",
      "Fuel Surcharge Waiver Card",
      "Business & Corporate Expense Card",
      "Premium Rewards & Dining Card"
    ],
    amountLabel: "Monthly Income / Spend Band",
    amounts: [
      "₹25,000 – ₹50,000 / month",
      "₹50,000 – ₹1,00,000 / month",
      "₹1,00,000 – ₹2,50,000 / month",
      "₹2,50,000+ / month",
      "Business Turnover Based"
    ]
  },
  "Tax & Compliance": {
    label: "Tax & Compliance Desk",
    subTypes: [
      "Online ITR Filing (CA-Assisted / AY 2025-26)",
      "MSME / Udyam Registration (Govt Certificate)",
      "Loan Computation Sheet & Balance Sheet Audit",
      "CGTMSE Collateral-Free Loan Advisory",
      "GST / Business Filing Assistance",
      "Notice Reply & Tax Optimization"
    ],
    amountLabel: "Annual Income / Business Turnover",
    amounts: [
      "Up to ₹5 Lakh (Salaried / Small Business)",
      "₹5 Lakh – ₹15 Lakh",
      "₹15 Lakh – ₹50 Lakh",
      "₹50 Lakh – ₹2 Crore",
      "₹2 Crore – ₹10 Crore+",
      "New Business / Just Starting"
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

export default function HomeClient({ heroConfig, ownerConfig, liveBankRates, homeLoanRate, balanceTransferRate, selfEmployedRate, businessLoanRate, lapRate, personalLoanRate, goldLoanRate, contactPhone, whatsappPhone }: { heroConfig?: any, ownerConfig?: any, liveBankRates?: any[], homeLoanRate?: string, balanceTransferRate?: string, selfEmployedRate?: string, businessLoanRate?: string, lapRate?: string, personalLoanRate?: string, goldLoanRate?: string, contactPhone?: string, whatsappPhone?: string }) {
  
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

  // Flagship Home Loan Showcase Interactive State
  const [hlCategory, setHlCategory] = useState<'purchase' | 'transfer' | 'construction' | 'renovation'>('purchase');
  const [hlAmount, setHlAmount] = useState<number>(5000000);
  const [hlTenure, setHlTenure] = useState<number>(20);

  // Derived Home Loan Showcase Calculations
  const currentHlRate = parseFloat(homeLoanRate || "7.15");
  const hlMonthlyRate = (currentHlRate / 100) / 12;
  const hlMonths = hlTenure * 12;
  const calculatedHlEmi = Math.round(
    (hlAmount * hlMonthlyRate * Math.pow(1 + hlMonthlyRate, hlMonths)) /
    (Math.pow(1 + hlMonthlyRate, hlMonths) - 1)
  );
  const standardMonthlyRate = (8.75 / 100) / 12;
  const standardEmi = Math.round(
    (hlAmount * standardMonthlyRate * Math.pow(1 + standardMonthlyRate, hlMonths)) /
    (Math.pow(1 + standardMonthlyRate, hlMonths) - 1)
  );
  const estimatedHlSavings = Math.max(0, (standardEmi - calculatedHlEmi) * hlMonths);

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
    const trimmedEmail = callbackEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setOtpError("Please enter a valid email address first.");
      return;
    }
    setIsOtpSending(true);
    setOtpError("");
    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsOtpSent(true);
        setOtpCooldown(60);
        if (data.mockOtp) {
          setMockOtpHint(data.mockOtp);
        }
      } else {
        setOtpError(data.error || "Failed to send verification OTP.");
      }
    } catch {
      setOtpError("Network connection error. Could not dispatch OTP.");
    }
    setIsOtpSending(false);
  };

  const handleVerifyOtp = async () => {
    const trimmedEmail = callbackEmail.trim().toLowerCase();
    const trimmedOtp = callbackOtp.trim();
    if (trimmedOtp.length !== 6) {
      setOtpError("Please enter the 6-digit OTP received in your email.");
      return;
    }
    setIsOtpVerifying(true);
    setOtpError("");
    try {
      const res = await fetch("/api/otp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, otp: trimmedOtp })
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
  const [bankLogos, setBankLogos] = useState<{id: string; bankName: string; logoUrl: string}[]>([]);
  const [activeBullet, setActiveBullet] = useState(0);
  const [heroWidgetTab, setHeroWidgetTab] = useState<"loan" | "insurance" | "card">("loan");
  const [activeLoanFilter, setActiveLoanFilter] = useState<"all" | "home" | "business" | "lap">("all");
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [cardRotate, setCardRotate] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rX = -(y / (rect.height / 2)) * 14;
    const rY = (x / (rect.width / 2)) * 14;
    setCardRotate({ x: rX, y: rY });
  };

  const handleCardMouseLeave = () => {
    setCardRotate({ x: 0, y: 0 });
  };

  const creditCardCategories = [
    {
      id: "lounge",
      categoryName: "Airport Lounge Elite",
      shortLabel: "Lounge & Travel",
      tagline: "Unlimited Airport Comfort & Global Air Miles",
      cardName: "BFS Obsidian Black Reserve",
      tier: "WORLD PRIVILEGE",
      cardNumber: "4829  9912  3841  8842",
      validThru: "12/30",
      theme: "amber",
      accentBg: "from-amber-500/15 via-yellow-500/10 to-transparent",
      accentBorder: "border-amber-400/50",
      accentText: "text-amber-700 dark:text-amber-400",
      cardGlow: "from-amber-500/25 via-yellow-500/15 to-amber-600/25",
      pillActive: "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25",
      cardBg: "from-zinc-950 via-neutral-900 to-black",
      cardBorder: "border-amber-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.35)]",
      chipColor: "from-amber-200 via-amber-400 to-amber-500 border-amber-300",
      holoBadge: "WORLD ELITE",
      annualFee: "Lifetime Free ₹0",
      joiningBonus: "₹10,000 Vouchers",
      estSavings: "₹24,000 / yr",
      bullet1: "4 Free domestic & international lounge passes per quarter with gourmet meals",
      bullet2: "1:1 Air Miles conversion on premier airlines + $50k overseas medical shield",
      icon: <Plane className="w-4 h-4" />
    },
    {
      id: "cashback",
      categoryName: "5% Super Cashback",
      shortLabel: "5% Cashback",
      tagline: "Direct Statement Credits on Everyday Spends",
      cardName: "BFS Sapphire Cashback",
      tier: "INFINITE CASHBACK",
      cardNumber: "5210  4418  9273  4129",
      validThru: "08/30",
      theme: "emerald",
      accentBg: "from-emerald-500/15 via-teal-500/10 to-transparent",
      accentBorder: "border-emerald-400/50",
      accentText: "text-emerald-700 dark:text-emerald-400",
      cardGlow: "from-emerald-500/30 via-teal-500/20 to-emerald-600/30",
      pillActive: "bg-emerald-600 text-white shadow-md shadow-emerald-600/25",
      cardBg: "from-emerald-950 via-teal-950 to-slate-950",
      cardBorder: "border-emerald-500/40 shadow-[0_20px_50px_rgba(6,78,59,0.35)]",
      chipColor: "from-emerald-200 via-teal-300 to-emerald-400 border-emerald-300",
      holoBadge: "INFINITE SELECT",
      annualFee: "₹0 Annual Fee",
      joiningBonus: "Flat ₹500 Back",
      estSavings: "₹18,500 / yr",
      bullet1: "5% Unlimited cashback on Amazon, Flipkart, Myntra, Swiggy & Zomato",
      bullet2: "Monthly auto statement credit with ₹0 redemption fee & zero expiry",
      icon: <ShoppingBag className="w-4 h-4" />
    },
    {
      id: "fuel",
      categoryName: "Fuel Surcharge & Highway",
      shortLabel: "Fuel & Highway",
      tagline: "100% Surcharge Waiver + FASTag Highway Perks",
      cardName: "BFS Turbo Octane",
      tier: "TURBO HIGHWAY",
      cardNumber: "6011  7890  1254  6301",
      validThru: "11/29",
      theme: "orange",
      accentBg: "from-orange-500/15 via-amber-500/10 to-transparent",
      accentBorder: "border-orange-400/50",
      accentText: "text-orange-700 dark:text-orange-400",
      cardGlow: "from-orange-500/30 via-amber-500/20 to-red-500/30",
      pillActive: "bg-orange-500 text-white shadow-md shadow-orange-500/25",
      cardBg: "from-stone-950 via-amber-950 to-orange-950",
      cardBorder: "border-orange-500/40 shadow-[0_20px_50px_rgba(124,45,18,0.35)]",
      chipColor: "from-amber-200 via-amber-300 to-orange-400 border-orange-300",
      holoBadge: "OCTANE MOTOR",
      annualFee: "₹0 Joining Fee",
      joiningBonus: "1,500 Fuel Points",
      estSavings: "₹14,200 / yr",
      bullet1: "1% Fuel Surcharge waiver across all IOCL, BPCL & HPCL petrol pumps",
      bullet2: "Up to 68 Litres free fuel annually + 5X points on highway FASTags",
      icon: <Fuel className="w-4 h-4" />
    },
    {
      id: "builder",
      categoryName: "Credit Score Builder",
      shortLabel: "Credit Builder",
      tagline: "100% Guaranteed Approval (Low CIBIL / First-Time)",
      cardName: "BFS Step-Up Booster",
      tier: "CIBIL STEP-UP",
      cardNumber: "4020  8391  0294  9924",
      validThru: "06/31",
      theme: "purple",
      accentBg: "from-purple-500/15 via-indigo-500/10 to-transparent",
      accentBorder: "border-purple-400/50",
      accentText: "text-purple-700 dark:text-purple-400",
      cardGlow: "from-purple-500/30 via-indigo-500/20 to-purple-600/30",
      pillActive: "bg-purple-600 text-white shadow-md shadow-purple-600/25",
      cardBg: "from-slate-950 via-purple-950 to-indigo-950",
      cardBorder: "border-purple-500/40 shadow-[0_20px_50px_rgba(88,28,135,0.35)]",
      chipColor: "from-purple-200 via-purple-300 to-indigo-400 border-purple-300",
      holoBadge: "GUARANTEED STEP-UP",
      annualFee: "100% Free Lifetime",
      joiningBonus: "Zero Income Proof",
      estSavings: "750+ CIBIL in 6 Mos",
      bullet1: "100% Guaranteed approval with ₹10k fixed deposit earning 7.5% p.a. interest",
      bullet2: "Builds CIBIL score to 750+ in 6 months with monthly credit bureau reporting",
      icon: <Sparkles className="w-4 h-4" />
    }
  ];

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
    fetch("/api/bank-logos").then(r => r.json()).then(data => {
      if (Array.isArray(data)) setBankLogos(data);
    }).catch(() => {});
  }, []);

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
    titlePart2: "Loans, Insurance & Cards.",
    bullet1: `Lowest Interest Rates Guaranteed (from ${homeLoanRate || "7.15"}%*)`,
    bullet2: "100% Cashless Health Bima & Free Claim Assistance",
    bullet3: "Lifetime-Free Credit Cards with Airport Lounge Access",
    supportText: `Prefer talking to an expert? Call: ${contactPhone || "+91 9258-724-227"}`,
    googleRating: "4.9",
    googleReviewCount: "555+"
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-900 selection:text-white transition-colors duration-300 relative w-full">
      {/* 3D Scrolled Background Animation Layer */}
      <Scrolled3DBackground />

      <Header />

      {/* 1. EMOTIONAL & TRUST-FOCUSED HERO SECTION (MOBILE OPTIMIZED & ANIMATED) */}
      <section className="relative pt-4 pb-8 sm:pt-8 sm:pb-12 lg:pt-12 lg:pb-16 overflow-hidden flex items-center bg-slate-50 dark:bg-emerald-950">
        
        {/* Absolute Background Image (Subtle Texture) */}
        <div className="absolute inset-0 z-0">
          <img 
            src={hConfig.imageUrl} 
            alt="Bhardwaj Finance Hero Background" 
            loading="eager"
            // @ts-ignore
            fetchPriority="high"
            decoding="sync"
            className="w-full h-full object-cover object-[center_35%] opacity-100"
          />
          {/* Smooth, Professional Gradient Overlay - vertical on mobile, horizontal on desktop */}
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white/95 via-white/85 md:via-white/70 to-white/40 md:to-transparent dark:from-slate-950/95 dark:via-slate-950/90 dark:to-slate-950/40"></div>
          
          {/* A second soft radial gradient to ensure the text area is highly readable without blowing out the rest of the image */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] md:bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Left Content - Trust & Value (Sophisticated Text & Motion) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 space-y-3 sm:space-y-4"
            >
              {/* Premium Main Heading with Animated Glowing Accent */}
              <h1 className="text-2xl sm:text-4xl lg:text-[3.5rem] font-extrabold text-slate-900 dark:text-white leading-[1.3] sm:leading-[1.25] tracking-tight mb-2 sm:mb-4 overflow-visible">
                {hConfig.titlePart1} <br className="hidden sm:block" />
                
                <span className="inline-flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 pb-1 overflow-visible">
                  <span className="shine-text-glow font-extrabold tracking-tight inline-block">
                    {hConfig.titlePart2}
                  </span>
                  <svg 
                    width="36" height="36" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
                    className="text-emerald-500 dark:text-emerald-400 shrink-0 w-7 h-7 sm:w-10 sm:h-10 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]"
                  >
                    <path d="M7 13s2 3 5 3 5-3 5-3" />
                    <line x1="8" y1="9" x2="8.01" y2="9" />
                    <line x1="16" y1="9" x2="16.01" y2="9" />
                  </svg>
                </span>
              </h1>
              
              {/* High-Conversion USPs (Rotating smartly) */}
              <div className="relative pt-1 pb-2 sm:pt-2 sm:pb-3 h-[42px] sm:h-[50px] overflow-hidden">
                {[(hConfig.bullet1 || `Lowest Interest Rates Guaranteed (from ${homeLoanRate || "7.15"}%*)`).replace(/6\.50/g, "7.15"), hConfig.bullet2, hConfig.bullet3].map((bullet, idx) => (
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
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes shine {
                      0% { transform: translateX(-150%) skewX(-15deg); }
                      40%, 100% { transform: translateX(250%) skewX(-15deg); }
                    }
                    .animate-button-shine {
                      animation: shine 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                    }
                  `}} />
                  <Link
                    href="/appointment"
                    className="relative group w-full sm:w-max px-7 py-3.5 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-extrabold text-[15px] rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.55)] flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95 overflow-hidden ring-2 ring-emerald-500/30 ring-offset-2 dark:ring-offset-emerald-950 text-center"
                  >
                    <div className="absolute top-0 bottom-0 left-0 w-1/2 -translate-x-full animate-button-shine bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                    Apply For Loan (7.15%*) <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/insurance"
                    className="w-full sm:w-max px-5 py-3.5 bg-white/90 dark:bg-emerald-900/60 hover:bg-slate-100 dark:hover:bg-emerald-800/80 text-emerald-900 dark:text-emerald-200 font-bold text-[14px] rounded-2xl transition-all border border-emerald-300/80 dark:border-emerald-700/60 flex items-center justify-center gap-2 text-center active:scale-95 shadow-sm"
                  >
                    <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Cashless Bima
                  </Link>
              </div>

              {/* Instant Compliance Services Strip (Direct Backlinks to ITR & MSME) */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1">
                  <BadgePercent className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  Tax & Govt Desk:
                </span>
                <Link
                  href="/services/itr-filing"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-teal-200 border border-teal-300/70 dark:border-teal-700/60 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-300 shadow-sm transition-all hover:scale-105"
                  title="File CA-Assisted ITR Online in 24 Hours"
                >
                  <Receipt className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>ITR Filing (24h CA Desk)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                </Link>
                <Link
                  href="/services/msme-registration"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-teal-200 border border-teal-300/70 dark:border-teal-700/60 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-300 shadow-sm transition-all hover:scale-105"
                  title="Govt MSME / Udyam Certificate Registration"
                >
                  <Factory className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>MSME / Udyam Reg.</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 rounded font-black">Govt Approved</span>
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
                  href={`tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+919258724227"}`} 
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
                <div className="grid grid-cols-3 bg-slate-100 dark:bg-emerald-950/80 p-1 rounded-2xl mb-4 text-xs font-bold gap-1">
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
                  <button
                    onClick={() => setHeroWidgetTab("card")}
                    className={`py-2 px-1 rounded-xl flex items-center justify-center gap-1 transition-all ${
                      heroWidgetTab === "card"
                        ? "bg-white dark:bg-emerald-800 text-emerald-700 dark:text-white shadow-sm font-black scale-100"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span className="truncate">Cards</span>
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
                        <span className="text-base font-black text-emerald-600 dark:text-emerald-400">₹{(loanAmount / 100000).toFixed(1)} Lakhs</span>
                      </div>
                      <input 
                        type="range" 
                        min="1000000" 
                        max="10000000" 
                        step="500000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 hover:accent-emerald-500 transition-all touch-none"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>₹10 L</span>
                        <span>₹50 L</span>
                        <span>₹1 Cr</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Tenure (Years)</span>
                        <span className="text-base font-black text-emerald-600 dark:text-emerald-400">{loanTenure} Years</span>
                      </div>
                      <input 
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

                    <div className="bg-slate-50/70 dark:bg-emerald-950/60 p-3 rounded-2xl border border-slate-100 dark:border-emerald-800 flex justify-between items-center">
                      <div>
                        <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Est. Monthly EMI</p>
                        <p className="text-lg font-black text-slate-900 dark:text-white">
                          ₹{Math.round((loanAmount * (parseFloat(homeLoanRate || "7.15") / 100) / 12) / (1 - Math.pow(1 + (parseFloat(homeLoanRate || "7.15") / 100) / 12, -(loanTenure * 12)))).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <Link
                        href="/appointment"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1"
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
                      href="/insurance"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 mt-2"
                    >
                      Explore Cashless Bima <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>
                )}

                {/* TAB 3: CURATED CREDIT CARDS */}
                {heroWidgetTab === "card" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3.5"
                  >
                    <div className="p-3 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 dark:from-sky-900/30 dark:to-indigo-900/30 rounded-2xl border border-sky-200/50 dark:border-sky-800">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        <span className="text-xs font-black text-slate-900 dark:text-white">Smart Credit Cards</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                        Handpicked cards with ₹0 joining fees, luxury travel lounge passes, and maximum cashback.
                      </p>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                        <span><strong>Lifetime-Free Cards</strong> (₹0 Annual & Renewal Fee)</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                        <span><strong>Complimentary Airport Lounge</strong> passes every quarter</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                        <span><strong>Low CIBIL / FD-Backed</strong> cards for guaranteed approval</span>
                      </div>
                    </div>

                    <Link
                      href="/products/credit-cards"
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-700 dark:hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 mt-2"
                    >
                      Compare & Apply Cards <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. BANKING PARTNERS TRUST BAND - COMPACT SLEEK MARQUEE */}
      <section className="border-b border-slate-200/80 dark:border-emerald-800/60 bg-slate-50/50 dark:bg-emerald-950/80 py-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative flex items-center justify-center mb-1">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-emerald-700/60 to-transparent flex-1 max-w-[120px] sm:max-w-[200px]"></div>
          <p className="relative z-10 text-[9px] sm:text-[10px] font-extrabold text-slate-500 dark:text-emerald-300/80 uppercase tracking-[0.2em] text-center px-3">
            50+ Institutional Partner Pools
          </p>
          <div className="h-px bg-gradient-to-r from-slate-300 dark:from-emerald-700/60 via-transparent to-transparent flex-1 max-w-[120px] sm:max-w-[200px]"></div>
        </div>
        {bankLogos.length > 0 ? (
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-50 dark:from-emerald-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-50 dark:from-emerald-950 to-transparent z-10 pointer-events-none"></div>
            <SmartMarquee items={bankLogos} speed={0.5} />
          </div>
        ) : (
          <div className="flex justify-center items-center gap-6 sm:gap-10 opacity-50 grayscale text-xs sm:text-base">
            {["Nationalized Banks", "Private Banks", "Housing Finance NBFCs", "Institutional Pools"].map((name) => (
              <div key={name} className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                <span className="font-bold text-slate-800 dark:text-slate-200 tracking-tight">{name}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. LIVE TICKER */}
      <LiveTicker rates={liveBankRates} />

      {/* 2.5 FLAGSHIP SIGNATURE CORE PRODUCT: HOME LOANS SHOWCASE */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-emerald-50/40 to-slate-50 dark:from-emerald-950/90 dark:via-emerald-950/60 dark:to-[#021811] border-b border-emerald-500/20 dark:border-emerald-800/60 relative overflow-hidden">
        {/* Subtle Decorative Ambient Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Flagship Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto mb-10 sm:mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Apna Dream Home Banao, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-300">
                Direct Institutional Bank Sanctions
              </span> Ke Saath.
            </h2>
            
            <p className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Home loans are Bhardwaj Financial Services’ foundational core expertise. We bridge homebuyers directly with credit committees across 50+ nationalized & private institutional banks — unlocking up to <strong className="text-slate-900 dark:text-white font-bold">90% property funding</strong>, lowest benchmark rates starting from <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{homeLoanRate || "7.15"}%* ROI</strong>, and formal sanctions in <strong className="text-slate-900 dark:text-white font-bold">5 business days</strong> with zero hidden broker commissions.
            </p>

            {/* 4 Trust Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-6 sm:mt-8 max-w-3xl mx-auto text-left">
              <div className="bg-white/90 dark:bg-emerald-900/50 backdrop-blur-xs border border-emerald-500/20 rounded-2xl p-3 sm:p-3.5 shadow-xs">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">5-Day Sanction</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Direct bank credit desk liaison, zero retail queues.</p>
              </div>

              <div className="bg-white/90 dark:bg-emerald-900/50 backdrop-blur-xs border border-emerald-500/20 rounded-2xl p-3 sm:p-3.5 shadow-xs">
                <div className="flex items-center gap-2 mb-1">
                  <BadgePercent className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Up to 90% LTV</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Maximum property valuation sanction approval.</p>
              </div>

              <div className="bg-white/90 dark:bg-emerald-900/50 backdrop-blur-xs border border-emerald-500/20 rounded-2xl p-3 sm:p-3.5 shadow-xs">
                <div className="flex items-center gap-2 mb-1">
                  <Percent className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">From {homeLoanRate || "7.15"}%* ROI</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Direct wholesale institutional lending pool rates.</p>
              </div>

              <div className="bg-white/90 dark:bg-emerald-900/50 backdrop-blur-xs border border-emerald-500/20 rounded-2xl p-3 sm:p-3.5 shadow-xs">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Zero Brokerage</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Free legal title search & doorstep assistance.</p>
              </div>
            </div>
          </motion.div>

          {/* Interactive Flagship Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Loan Variant Tabs & Details */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 flex flex-col gap-4"
            >
              {/* Category Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100/90 dark:bg-emerald-900/40 p-1.5 rounded-2xl border border-slate-200/80 dark:border-emerald-800/80">
                {[
                  { id: 'purchase', label: 'New Purchase', icon: Home, badge: '90% LTV' },
                  { id: 'transfer', label: 'Balance Transfer', icon: RefreshCw, badge: 'Save ₹3.5k' },
                  { id: 'construction', label: 'Plot + Build', icon: Building2, badge: 'Tranches' },
                  { id: 'renovation', label: 'Renovation', icon: Key, badge: 'Top-Up' }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = hlCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setHlCategory(tab.id as any)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-white dark:bg-emerald-700 text-emerald-800 dark:text-white shadow-md border border-emerald-500/30'
                          : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white/50 dark:hover:bg-emerald-800/30'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600 dark:text-emerald-300' : 'text-slate-400'}`} />
                        <span className="truncate">{tab.label}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                        isActive 
                          ? 'bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200' 
                          : 'bg-slate-200/70 dark:bg-emerald-950/60 text-slate-500 dark:text-slate-400'
                      }`}>
                        {tab.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Details Card */}
              <div className="bg-white dark:bg-emerald-900/40 rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200/90 dark:border-emerald-800/80 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={hlCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {hlCategory === 'purchase' && (
                      <div className="space-y-3.5 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-800/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold shrink-0">
                              <Home className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">New Home Purchase</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Flats, Villas, Builder Floors & Resale Properties</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-800/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 w-max">
                            Up to 30 Yrs Tenure
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Finance up to 90% of your property value with institutional sanction pools. We clear legal vetting, verify property titles, and lock in the lowest interest rates from day one.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Pre-Approved Sanctions:</strong> Letter ready before property finalization.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Free Title Search:</strong> 100% legal verification by senior advocates.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>PMAY Subsidy (CLSS):</strong> Interest subsidy guidance up to ₹2.67 Lakh.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Zero Brokerage:</strong> No hidden commission from applicant.</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {hlCategory === 'transfer' && (
                      <div className="space-y-3.5 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-800/70 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold shrink-0">
                              <RefreshCw className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">Home Loan Balance Transfer</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Slash Running High-Interest EMI + Get Instant Top-Up</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-800/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700 w-max">
                            Save ₹3,500/Mo
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Still paying 8.5%–9.5% on an old home loan? Switch to our institutional desk rate pools. We manage entire documentation retrieval, NOC, and title deed handover from your current bank.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                            <span><strong>Instant Rate Slash:</strong> Bring ROI down to wholesale benchmark.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                            <span><strong>Top-Up Liquidity:</strong> Up to ₹50 Lakh extra for personal/business use.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                            <span><strong>Zero Hassle Takeover:</strong> BFS team handles inter-bank NOC clearance.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                            <span><strong>Substantial Savings:</strong> Save up to ₹5–8 Lakhs in remaining interest.</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {hlCategory === 'construction' && (
                      <div className="space-y-3.5 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-800/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold shrink-0">
                              <Building2 className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">Plot Purchase + Construction Loan</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Independent Villa & Self-Build Phased Financing</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-800/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 w-max">
                            Milestone Tranches
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Build your house step by step. Get joint financing for land acquisition and structural civil construction, with funds released smoothly as work progresses.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Pay Only on Disbursed Funds:</strong> Zero interest on unreleased loan.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Tranche Alignment:</strong> Released on foundation, plinth, slab & finishing.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Sanctioned Map Approvals:</strong> Complete ADA & layout compliance help.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Architect Estimate Vetting:</strong> Fast valuation engineer clearance.</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {hlCategory === 'renovation' && (
                      <div className="space-y-3.5 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-800/70 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold shrink-0">
                              <Key className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">Home Renovation & Extension</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Modular Kitchen, Floor Addition & Premium Interiors</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-800/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700 w-max">
                            Lowest Interest
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Don’t take high-interest 14% personal loans for interior furnishing or adding a floor. Unlock low-cost home loan funds with long repayment flexibility.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span><strong>Cheaper than Personal Loans:</strong> Save up to 5%–7% in yearly interest.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span><strong>Comfortable 15-Yr Tenure:</strong> Extremely manageable monthly installments.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span><strong>48-Hour Rapid Sanction:</strong> Minimal document formalities.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span><strong>Sec 24 Tax Exemption:</strong> Claim income tax rebate on interest paid.</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Action Bar */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      Live Sanction Desk Active • 50+ Bank Panels
                    </span>
                  </div>
                  <Link
                    href="/products/home-loan"
                    className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-4"
                  >
                    View All Home Loan Guidelines & Policies <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Live Interactive Flagship Home Loan EMI & Savings Calculator */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 bg-gradient-to-b from-white to-slate-50 dark:from-emerald-900/60 dark:to-emerald-950/80 rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-emerald-500/30 dark:border-emerald-700/80 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
                    Live Sanction Estimator
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    Calculate Your Home EMI
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
                    {homeLoanRate || "7.15"}%* ROI
                  </span>
                </div>
              </div>

              {/* Amount Quick Presets */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-600 dark:text-slate-300">Loan Amount:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm font-black">
                    ₹{(hlAmount / 100000).toLocaleString('en-IN')} Lakhs
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                  {[2500000, 5000000, 7500000, 10000000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setHlAmount(amt)}
                      className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                        hlAmount === amt
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-emerald-800/50 text-slate-600 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-800'
                      }`}
                    >
                      ₹{amt >= 10000000 ? "1Cr" : `${amt / 100000}L`}
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min={1500000}
                  max={20000000}
                  step={250000}
                  value={hlAmount}
                  onChange={(e) => setHlAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>₹15 Lakhs</span>
                  <span>₹2.0 Crore</span>
                </div>
              </div>

              {/* Tenure Selector */}
              <div className="mb-5">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-600 dark:text-slate-300">Repayment Tenure:</span>
                  <span className="text-slate-900 dark:text-white font-black">{hlTenure} Years</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[15, 20, 25, 30].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setHlTenure(yr)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                        hlTenure === yr
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                          : 'bg-slate-100 dark:bg-emerald-800/40 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {yr} Yrs
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated EMI Display Box */}
              <div className="bg-emerald-50/80 dark:bg-emerald-950/90 border border-emerald-300/80 dark:border-emerald-700/80 rounded-2xl p-4 mb-4 text-center">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-0.5">
                  Estimated Monthly EMI
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-300">
                  ₹{calculatedHlEmi.toLocaleString('en-IN')}
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1">/ month</span>
                </div>
                {estimatedHlSavings > 0 && (
                  <p className="mt-1.5 text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-100/70 dark:bg-teal-900/50 py-1 px-2.5 rounded-lg inline-block">
                    💡 Save approx ₹{(estimatedHlSavings / 100000).toFixed(1)} Lakhs vs standard 8.75% retail desk rates!
                  </p>
                )}
              </div>

              {/* Trust Features Checklist */}
              <div className="space-y-1.5 mb-5 text-[11px] text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Direct Bank Sanction Letter in 5 Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Zero Processing Brokerage Paid by Customer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Doorstep Document Pick & Free Legal Clearance in Agra & NCR</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <Link
                  href="/products/home-loan"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm text-center shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all group"
                >
                  <span>Apply For Home Loan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/calculator"
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-emerald-800/50 dark:hover:bg-emerald-700/60 text-slate-800 dark:text-emerald-100 font-bold text-xs sm:text-sm text-center border border-slate-300 dark:border-emerald-700 transition-all flex items-center justify-center gap-1.5"
                >
                  <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Full Calculator</span>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. THE 3 CORE PILLARS SHOWCASE (FINANCE, INSURANCE, CREDIT CARDS) - INTERACTIVE & MOBILE OPTIMIZED */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 dark:bg-emerald-950/60 border-b border-slate-200/80 dark:border-emerald-800/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Unified Financial Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              One Trusted Partner. <br className="hidden sm:block" />
              <span className="text-emerald-600 dark:text-emerald-400">Three Financial Pillars.</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Bhardwaj Financial Services integrates institutional lending, healthcare safety nets, and premium lifestyle cards under single legal oversight in Sanjay Place, Agra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {/* PILLAR 1: FINANCE & LOANS */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ y: -6 }}
              className="group bg-white dark:bg-emerald-900/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-emerald-800/80 shadow-md hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-800/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
                    From {homeLoanRate || "7.15"}%* ROI
                  </span>
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
                    <span><strong>Business Loans & LAP:</strong> Up to ₹5 Cr without collaterals</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/products/home-loan"
                className="w-full py-3 sm:py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                Apply for Loan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* PILLAR 2: COMPREHENSIVE INSURANCE */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -6 }}
              className="group bg-white dark:bg-emerald-900/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-emerald-800/80 shadow-md hover:shadow-2xl hover:border-teal-500/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-100 dark:bg-teal-800/60 text-teal-700 dark:text-teal-300 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-800 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700">
                    100% Free Claim Help
                  </span>
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
                href="/insurance"
                className="w-full py-3 sm:py-3.5 px-4 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20"
              >
                Explore Insurance <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* PILLAR 3: CURATED CREDIT CARDS */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{ y: -6 }}
              className="group bg-white dark:bg-emerald-900/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-emerald-800/80 shadow-md hover:shadow-2xl hover:border-sky-500/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-100 dark:bg-sky-800/60 text-sky-700 dark:text-sky-300 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <CreditCard className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-800 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-700">
                    Lifetime Free ₹0 Fee
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 sm:mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  Curated Credit Cards
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 sm:mb-6">
                  Lifestyle and reward credit cards matched to your spending habits, travel requirements, and CIBIL score tier.
                </p>
                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span><strong>Airport Lounge Access:</strong> Free visits every quarter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span><strong>Up to 5% Cashback:</strong> Fuel, dining, and online shopping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span><strong>Credit Builder Cards:</strong> Instant issuance for low CIBIL</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/products/credit-cards"
                className="w-full py-3 sm:py-3.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-700 dark:hover:bg-emerald-600 active:scale-95 text-white font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
              >
                Find Best Card <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CASHLESS INSURANCE & CLAIM ADVOCACY SHOWCASE (THEME HARMONIZED & RESPONSIVE) */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-teal-50/40 to-slate-100/70 dark:from-teal-950 dark:via-emerald-950 dark:to-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300 border-y border-teal-100/80 dark:border-teal-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.12),transparent_55%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-4 sm:space-y-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-400/30">
                <HeartPulse className="w-3.5 h-3.5 text-teal-600 dark:text-teal-300" />
                Zero-Stress Medical Safety
              </span>
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
                  href="/insurance"
                  className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-black text-sm rounded-xl shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
                >
                  Explore Insurance Plans <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+919258724227"}`}
                  className="px-5 py-3.5 bg-white hover:bg-teal-50 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white font-bold text-sm rounded-xl border border-teal-200 dark:border-white/20 shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
                >
                  <PhoneCall className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Emergency Claim Desk
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 bg-white dark:bg-white/5 border border-teal-200/80 dark:border-white/10 p-5 sm:p-8 rounded-3xl shadow-lg shadow-teal-500/5 backdrop-blur-md"
            >
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
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

      {/* 5. CURATED CREDIT CARDS SHOWCASE (ULTRA-INTERACTIVE 3D TILT & FLIP, COMPACT SINGLE-SCREEN) */}
      <section className="py-10 sm:py-14 bg-gradient-to-b from-slate-100/70 via-slate-50 to-white dark:from-slate-950 dark:via-emerald-950/40 dark:to-slate-950 border-b border-slate-200/80 dark:border-emerald-800/80 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
        {/* Ambient Glow Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 dark:bg-emerald-400/15 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header & Tabs In Single Clean Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 mb-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                Interactive Card Showcase
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Smart Spending Power & Privilege
              </h2>
            </div>

            {/* Category Filter Pills with animated layout pill (No Scrollbar bug) */}
            <div 
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {creditCardCategories.map((cat, idx) => {
                const isActive = activeCardIdx === idx;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCardIdx(idx);
                      setIsCardFlipped(false);
                    }}
                    className={`relative shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                      isActive
                        ? "text-white font-black shadow-md"
                        : "bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700 shadow-sm"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCreditCategoryPill"
                        className={`absolute inset-0 rounded-xl ${cat.pillActive}`}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat.icon}</span>
                    <span className="relative z-10">{cat.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SINGLE-SCREEN SHOWCASE BOX */}
          {(() => {
            const curCard = creditCardCategories[activeCardIdx];
            return (
              <div className="relative rounded-3xl p-5 sm:p-7 lg:p-8 bg-white/95 dark:bg-slate-900/85 border border-slate-200/90 dark:border-emerald-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-md">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                  
                  {/* LEFT: 3D INTERACTIVE TILT & FLIP VIRTUAL CARD */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                    
                    {/* Ambient Glow Aura behind card */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${curCard.cardGlow} blur-2xl rounded-3xl opacity-75 scale-95 pointer-events-none transition-all duration-500`}></div>

                    {/* 3D Perspective Canvas Container */}
                    <div 
                      className="w-full max-w-[360px] relative select-none"
                      style={{ perspective: 1200 }}
                    >
                      {/* Floating Top Fee Pill */}
                      <div className="absolute -top-3 right-3 z-30 pointer-events-none">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black bg-slate-900 text-white border border-slate-700 shadow-lg">
                          <Crown className="w-3 h-3 text-amber-400" />
                          {curCard.annualFee}
                        </span>
                      </div>

                      {/* Interactive Tilting & Flipping Card Object */}
                      <motion.div
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        onClick={() => setIsCardFlipped(!isCardFlipped)}
                        animate={{
                          rotateX: cardRotate.x,
                          rotateY: cardRotate.y + (isCardFlipped ? 180 : 0),
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 24,
                          mass: 0.5
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                        className="w-full aspect-[1.586/1] relative cursor-pointer rounded-2xl sm:rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)] transition-shadow hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.55)] group"
                      >
                        {/* ================= CARD FRONT FACE ================= */}
                        <div 
                          style={{ backfaceVisibility: "hidden" }}
                          className={`absolute inset-0 rounded-2xl sm:rounded-3xl p-5 sm:p-6 overflow-hidden bg-gradient-to-br ${curCard.cardBg} border ${curCard.cardBorder} flex flex-col justify-between text-white select-none`}
                        >
                          {/* Animated Shimmer Light Beam */}
                          <motion.div
                            animate={{ x: ["-150%", "250%"] }}
                            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-25 pointer-events-none z-20"
                          />

                          {/* Dynamic Glare Reflection that tracks mouse tilt */}
                          <div 
                            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
                            style={{
                              background: `radial-gradient(circle at ${50 + cardRotate.y * 3.5}% ${50 - cardRotate.x * 3.5}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
                            }}
                          />

                          {/* Card Top: Monogram + Privilege + NFC + Badge */}
                          <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center font-black text-white text-xs tracking-tighter shadow-inner backdrop-blur-md">
                                BFS
                              </div>
                              <div>
                                <div className="text-[10px] font-black tracking-widest uppercase text-white/95 leading-tight">
                                  BHARDWAJ
                                </div>
                                <div className="text-[8px] font-bold text-amber-300 tracking-wider uppercase leading-none">
                                  {curCard.tier}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <Wifi className="w-4 h-4 text-white/70 rotate-90" />
                              <span className="text-[8px] font-black px-2 py-0.5 rounded-md bg-white/15 text-white/95 border border-white/20 tracking-wider uppercase backdrop-blur-sm">
                                {curCard.holoBadge}
                              </span>
                            </div>
                          </div>

                          {/* Card Center: Realistic Gold EMV Smart Chip & Monospace Number */}
                          <div className="relative z-10 space-y-2 my-auto">
                            <div className="flex items-center justify-between">
                              {/* Realistic Gold Chip */}
                              <div className={`w-11 h-8 rounded-md bg-gradient-to-br ${curCard.chipColor} p-1 shadow-inner relative overflow-hidden flex flex-col justify-between border border-black/25`}>
                                <div className="w-full h-full border border-black/25 rounded-[3px] grid grid-cols-3 gap-0.5 opacity-70">
                                  <div className="border-r border-black/20"></div>
                                  <div className="border-r border-black/20"></div>
                                  <div></div>
                                </div>
                              </div>
                              <span className="text-[9px] font-mono text-white/50 tracking-widest">
                                CONTACTLESS
                              </span>
                            </div>

                            {/* 16-Digit Monospace Number with embossed drop-shadow */}
                            <div className="text-base sm:text-lg font-mono font-bold tracking-[0.22em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                              {curCard.cardNumber}
                            </div>
                          </div>

                          {/* Card Bottom: Cardholder, Expiry, Dual Hologram Spheres */}
                          <div className="relative z-10 flex items-end justify-between text-white/80 text-[9px]">
                            <div>
                              <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Cardholder</div>
                              <div className="text-xs font-black tracking-wider uppercase text-white drop-shadow-sm">
                                PREMIUM MEMBER
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Expires</div>
                              <div className="text-xs font-mono font-bold text-white">
                                {curCard.validThru}
                              </div>
                            </div>

                            {/* Dual Interlocking Frosted Security Circles */}
                            <div className="flex items-center -space-x-2">
                              <div className="w-6 h-6 rounded-full bg-emerald-400/80 backdrop-blur-md shadow-md border border-white/20"></div>
                              <div className="w-6 h-6 rounded-full bg-teal-300/80 backdrop-blur-md shadow-md border border-white/20"></div>
                            </div>
                          </div>
                        </div>

                        {/* ================= CARD BACK FACE (FLIPPED 180 DEG) ================= */}
                        <div 
                          style={{ 
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)"
                          }}
                          className={`absolute inset-0 rounded-2xl sm:rounded-3xl p-5 sm:p-6 overflow-hidden bg-gradient-to-br ${curCard.cardBg} border ${curCard.cardBorder} flex flex-col justify-between text-white select-none`}
                        >
                          {/* Top Magnetic Stripe */}
                          <div className="-mx-5 sm:-mx-6 -mt-1 h-9 sm:h-11 bg-slate-950 border-y border-white/15 shadow-inner flex items-center justify-end px-4">
                            <span className="text-[7px] font-mono tracking-widest text-slate-400/70">BFS SECURE MAGNETIC STRIPE</span>
                          </div>

                          {/* Signature Strip & CVV Security Box */}
                          <div className="space-y-1.5 my-auto">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-7 bg-slate-100 rounded border border-white/40 flex items-center px-2 bg-[repeating-linear-gradient(45deg,#e2e8f0,#e2e8f0_6px,#f8fafc_6px,#f8fafc_12px)] shadow-inner">
                                <span className="text-[7px] font-mono font-bold text-slate-500 tracking-wider select-none">
                                  AUTHORIZED SIGNATURE
                                </span>
                              </div>
                              <div className="bg-white text-slate-950 font-mono font-black text-xs px-2.5 py-1 rounded shadow-md flex items-center gap-1 border border-slate-300">
                                <Lock className="w-2.5 h-2.5 text-amber-600" />
                                <span>842</span>
                              </div>
                            </div>
                            <div className="text-[7px] text-slate-400 tracking-wider">
                              Do not share your 3-digit CVV with anyone. BFS representatives will never ask for your PIN/OTP.
                            </div>
                          </div>

                          {/* Back Footer: Toll-Free Desk & Hologram Compliance */}
                          <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[8px] text-slate-300/80">
                            <div>
                              <div className="font-semibold text-white/90">24x7 Privilege Desk</div>
                              <div>+91 9258-724-227</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-amber-400">CHIP & PIN PROTECTED</div>
                              <div className="text-[7px] text-slate-400">RBI Regulated Co-Brand</div>
                            </div>
                          </div>
                        </div>

                      </motion.div>

                      {/* Interactive 3D Flip Action Badge */}
                      <div className="mt-3 flex items-center justify-between px-1">
                        <button
                          type="button"
                          onClick={() => setIsCardFlipped(!isCardFlipped)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                          <RotateCw className={`w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 transition-transform duration-500 ${isCardFlipped ? "rotate-180" : ""}`} />
                          <span>{isCardFlipped ? "Click to View Front" : "Click to 3D Flip Card"}</span>
                        </button>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> 60-Sec Digital KYC
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: CLEAN & CONCISE HIGH-IMPACT DETAILS */}
                  <div className="lg:col-span-7 space-y-3.5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-slate-100 dark:bg-emerald-900/60 border border-slate-200 dark:border-emerald-700 ${curCard.accentText}`}>
                          {curCard.categoryName}
                        </span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          {curCard.annualFee}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        {curCard.cardName}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                        {curCard.tagline}
                      </p>
                    </div>

                    {/* 3 Clean Highlight Pills in 1 Row */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 shadow-sm">
                        <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Annual Fee</div>
                        <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5">{curCard.annualFee}</div>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 shadow-sm">
                        <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Annual Value</div>
                        <div className={`text-xs sm:text-sm font-black ${curCard.accentText} mt-0.5`}>{curCard.estSavings}</div>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 shadow-sm">
                        <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Welcome Gift</div>
                        <div className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">{curCard.joiningBonus}</div>
                      </div>
                    </div>

                    {/* 2 Concise High-Impact Perks */}
                    <div className="space-y-1.5 py-0.5">
                      <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{curCard.bullet1}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{curCard.bullet2}</span>
                      </div>
                    </div>

                    {/* Direct CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
                      <Link
                        href="/products/credit-cards"
                        className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95 text-center"
                      >
                        Apply For This Card <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/products/credit-cards"
                        className="w-full sm:w-auto px-4 py-3 sm:py-2.5 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95 text-center"
                      >
                        Browse All 50+ Cards
                      </Link>
                    </div>

                  </div>
                </div>

              </div>
            );
          })()}

        </div>
      </section>

      {/* 6. ONLINE ITR FILING SHOWCASE (CA-ASSISTED, TAX REFUND & LOAN-READY COMPUTATIONS) */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-slate-50/80 via-emerald-50/20 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950 border-b border-slate-200/80 dark:border-emerald-800/80 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-400/10 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 dark:bg-teal-400/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/90 dark:border-emerald-700/80 mb-3 shadow-sm">
                <Receipt className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Income Tax Compliance & Refund Desk
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                CA-Assisted ITR Filing. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400">
                  Maximum Refunds, 100% Notice-Proof.
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you are a salaried employee with Form 16, a business proprietor needing audit-ready balance sheets, or preparing ITR for banking loan approval — our chartered tax specialists file accurately in 24 hours.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/services/itr-filing"
                className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/25 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>File Your ITR Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 4 Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-white dark:bg-emerald-900/30 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-emerald-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-800/50 border border-emerald-100 dark:border-emerald-700/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <BadgePercent className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Max Tax Refund</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Full optimization under Section 80C, 80D, 24(b) home loan interest, and 87A rebate for lowest tax outgo.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="bg-white dark:bg-emerald-900/30 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-emerald-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-800/50 border border-emerald-100 dark:border-emerald-700/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Bank Loan-Ready ITR</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Income computation sheets aligned with banking credit appraisal norms for fast home & business loan approvals.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white dark:bg-emerald-900/30 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-emerald-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-800/50 border border-emerald-100 dark:border-emerald-700/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">100% Notice-Safe</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Automatic cross-matching with AIS, TIS, and Form 26AS portal data before submission to eliminate scrutiny risk.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="bg-white dark:bg-emerald-900/30 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-emerald-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-800/50 border border-emerald-100 dark:border-emerald-700/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">24h Express Filing</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Dedicated tax manager assigned to file and send official ITR-V acknowledgment directly to your WhatsApp & Email.
              </p>
            </motion.div>
          </div>

          {/* Interactive Profile Selector Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 border border-emerald-500/30"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/10 blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10 space-y-2 sm:space-y-3 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                AY 2025-26 & Past Backlog Returns (ITR-U)
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black">
                Select Your Filing Category & Get CA Guidance
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl leading-relaxed">
                Covering ITR-1 (Salaried / Form 16), ITR-4 (Presumptive 44AD Small Business), ITR-3 (Audit / Balance Sheet), and Capital Gains.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/services/itr-filing"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/25 active:scale-95 flex items-center justify-center gap-2 text-center group cursor-pointer"
              >
                <span>Open ITR Portal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="https://wa.me/917900979001?text=Hi%20BFS,%20I%20need%20help%20with%20ITR%20filing."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-emerald-500/30 backdrop-blur-sm transition-all flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat with CA</span>
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 7. OFFICIAL MSME / UDYAM REGISTRATION SHOWCASE (GOVT BENEFITS & CGTMSE LOANS) */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-slate-50/50 via-teal-50/15 to-white dark:from-slate-950 dark:via-teal-950/20 dark:to-slate-950 border-b border-slate-200/80 dark:border-emerald-800/80 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-teal-500/10 dark:bg-teal-400/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/90 dark:border-emerald-700/80 mb-3 shadow-sm">
                <Factory className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Ministry of MSME Govt Gateway
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Official MSME / Udyam Registration. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400">
                  Unlock ₹5 Cr Collateral-Free Bank Loans.
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Empower your proprietorship, partnership, private limited company, or retail shop with Government of India Udyam recognition. Get lifetime valid certificate, priority lending, and direct interest subsidies.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/services/msme-registration"
                className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/25 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Register MSME Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-white dark:bg-emerald-900/30 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-emerald-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-800/50 border border-emerald-100 dark:border-emerald-700/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">₹5 Cr CGTMSE Loans</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Priority sanction for collateral-free bank working capital and machinery loans backed by CGTMSE credit guarantee.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="bg-white dark:bg-emerald-900/30 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-emerald-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-800/50 border border-emerald-100 dark:border-emerald-700/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Percent className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">1% Interest Subvention</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Avail up to 1% annual interest rate rebate on business overdraft and term loans from scheduled commercial banks.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white dark:bg-emerald-900/30 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-emerald-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-800/50 border border-emerald-100 dark:border-emerald-700/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">50% Trademark Subsidy</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                50% concession on government trademark, patent, and IP filing fees to protect your brand name and logo legally.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="bg-white dark:bg-emerald-900/30 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-emerald-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-800/50 border border-emerald-100 dark:border-emerald-700/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">24h Digital Certificate</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Official Udyam Registration number with QR-coded downloadable government certificate valid for lifetime.
              </p>
            </motion.div>
          </div>

          {/* Quick Registration Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 border border-emerald-500/30"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/10 blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10 space-y-2 sm:space-y-3 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                Micro, Small & Medium Enterprise Certificate
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black">
                Start Your Business Registration Online in 2 Minutes
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl leading-relaxed">
                100% paperless Aadhaar-linked verification. Zero physical visits needed. Trusted by 2,500+ businesses across Agra & Pan-India.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/services/msme-registration"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/25 active:scale-95 flex items-center justify-center gap-2 text-center group cursor-pointer"
              >
                <span>Apply for Udyam Certificate</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="https://wa.me/917900979001?text=Hi%20BFS,%20I%20want%20to%20apply%20for%20MSME%20Udyam%20Registration."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-emerald-500/30 backdrop-blur-sm transition-all flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 8. FOUNDER & AUTHORITY MESSAGE */}
      <section className="pt-6 pb-12 bg-slate-50 dark:bg-emerald-950 relative overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="bg-white dark:bg-emerald-900 rounded-2xl sm:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 dark:border-emerald-800 p-5 sm:p-8 md:p-10 lg:px-16 lg:py-10 relative overflow-hidden">
            
            {/* Dotted Pattern Background */}
            <div className="absolute top-0 left-0 w-64 h-full bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] dark:bg-[radial-gradient(#064e3b_2px,transparent_2px)] [background-size:16px_16px] opacity-60"></div>
            <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-transparent to-white dark:to-emerald-900"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
              
              {/* Left: Image & Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-4 flex flex-col items-center relative pb-8 lg:pb-0"
              >
                
                {/* Glowing Outer Ring */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-[260px] md:h-[260px] rounded-full p-2 bg-gradient-to-b from-emerald-200 via-emerald-100 to-transparent dark:from-emerald-700 dark:via-emerald-800 dark:to-transparent flex items-center justify-center shadow-sm">
                  
                  {/* Thick White Border + Image */}
                  <div className="w-[96%] h-[96%] rounded-full overflow-hidden border-[6px] border-white dark:border-emerald-900 shadow-sm bg-slate-100 dark:bg-emerald-800">
                    <img 
                      src={owner.image} 
                      alt={owner.name} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
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
                viewport={{ once: true }}
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
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-4 flex flex-col justify-between h-full lg:pl-4 pt-8 lg:pt-0 border-t lg:border-t-0 border-slate-200/60 dark:border-emerald-800"
              >
                
                <div className="flex items-center justify-center mb-4">
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#00A160] dark:bg-emerald-600 mx-3 rounded-[1px]"></div>
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                </div>

                <div className="flex-1 flex flex-col justify-center py-4 relative">
                  {/* Huge SVG Quote Mark in the background for exact design match */}
                  <div className="absolute top-0 left-0 text-[#00A160] opacity-90 font-serif text-[60px] sm:text-[80px] leading-none">“</div>
                  <p className="text-xl sm:text-2xl md:text-3xl italic font-medium leading-[1.6] text-slate-800 dark:text-slate-200 mt-4 z-10 relative">
                    {owner.quote}
                  </p>
                  <div className="absolute bottom-0 right-0 text-[#00A160] opacity-90 font-serif text-[60px] sm:text-[80px] leading-none transform rotate-180 translate-y-6 sm:translate-y-8">“</div>
                </div>

                <div className="flex items-center justify-center mt-4 sm:mt-6 mb-4">
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#00A160] dark:bg-emerald-600 mx-3 rounded-[1px]"></div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="flex flex-col items-center p-5 sm:p-6 space-y-2.5 sm:space-y-3"
            >
              <ShieldCheck className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-600 dark:text-emerald-500" />
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">100% RBI & IRDAI Compliant</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Strict adherence to national banking & insurance regulatory standards.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col items-center p-5 sm:p-6 space-y-2.5 sm:space-y-3"
            >
              <Scale className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-600 dark:text-emerald-500" />
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Legally Vetted Projects</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Our in-house legal advocate team protects your lifelong financial safety.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-col items-center p-5 sm:p-6 space-y-2.5 sm:space-y-3"
            >
              <FileCheck className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-600 dark:text-emerald-500" />
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Zero Hidden Brokerage</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Direct institutional pricing with 100% transparent documentation.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. LOAN OFFERINGS (INTERACTIVE & MOBILE-FIRST FILTERABLE CARDS) */}
      <section className="py-14 sm:py-20 lg:py-28 bg-slate-50 dark:bg-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "bg-white dark:bg-emerald-900/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-emerald-800 hover:border-emerald-400"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { id: "home", icon: <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />, title: "Home Loans", desc: "Flat, independent house, plot purchase or self-construction with flexible up to 30-year tenure.", features: ["₹20L to ₹5Cr+", `Starting at ${homeLoanRate || "7.15"}%* ROI`, "5-Day Express Sanctions"], href: "/products/home-loan", color: "from-emerald-500 to-emerald-600", badge: "Most Popular" },
              { id: "home", icon: <RefreshCw className="w-6 h-6 sm:w-7 sm:h-7" />, title: "Balance Transfer", desc: "Shift existing high-cost loan to lowest rate partner pools and slash your EMIs immediately.", features: [`BT Rate from ${balanceTransferRate || "6.45"}%`, "Instant Top-Up Capital", "Zero Foreclosure Stress"], href: "/products/balance-transfer", color: "from-teal-500 to-teal-600", badge: "Instant Savings" },
              { id: "lap", icon: <Award className="w-6 h-6 sm:w-7 sm:h-7" />, title: "Loan Against Property", desc: "Unlock high-value liquidity by mortgaging your residential, commercial, or industrial property.", features: [`Starting at ${lapRate || "7.50"}%`, "Up to 70% Property LTV", "15-Year Long Tenure"], href: "/products/loan-against-property", color: "from-emerald-600 to-emerald-700" },
              { id: "business", icon: <Briefcase className="w-6 h-6 sm:w-7 sm:h-7" />, title: "Business Loans", desc: "Accelerate your enterprise with rapid unsecured capital. No property pledge needed.", features: [`Starting at ${businessLoanRate || "12.50"}%`, "Up to ₹5 Cr Limit", "48-Hr Priority Sanction"], href: "/products/business-loan", color: "from-emerald-500 to-teal-500", badge: "Collateral-Free" },
              { id: "lap", icon: <Smile className="w-6 h-6 sm:w-7 sm:h-7" />, title: "Personal Loans", desc: "Immediate liquidity for weddings, emergency medical bills, travel, or child education.", features: [`Starting at ${personalLoanRate || "10.50"}%`, "Minimal Documentation", "Same-Day Disbursal"], href: "/products/personal-loan", color: "from-teal-600 to-emerald-600" },
              { id: "lap", icon: <Landmark className="w-6 h-6 sm:w-7 sm:h-7" />, title: "Gold Loan", desc: "Unlock immediate liquid cash against gold ornaments at nationalized benchmark interest rates.", features: [`Starting at ${goldLoanRate || "8.50"}%`, "Up to 90% Gold Valuation", "Instant 30-Min Release"], href: "/products/gold-loan", color: "from-amber-500 to-amber-600" }
            ].filter((product) => activeLoanFilter === "all" || product.id === activeLoanFilter).map((product, idx) => (
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
                      {product.badge && (
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 transition-colors">
                          {product.badge}
                        </span>
                      )}
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
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 mb-3">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Transparent Workflow
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1 mb-3 tracking-tight">
              Standardised 5-Day Processing
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
              A fully digital, legally vetted step-by-step process with zero branch visits and complete real-time tracking.
            </p>
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
                viewport={{ once: true }}
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

      {/* 9. HEAD OFFICE / CONTACT BLOCK (MOBILE OPTIMIZED) */}
      <section className="py-14 sm:py-20 bg-emerald-950 text-white border-t border-emerald-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.1),transparent_60%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-5"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-800/60 text-emerald-300 border border-emerald-700/60">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Physical Headquarters
              </span>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
                Visit Our Agra Head Office
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                While we disburse loans, issue insurance, and deliver credit cards digitally across India, our head office doors are always open for direct in-person legal & financial consultations in Sanjay Place, Agra.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="w-11 h-11 rounded-xl bg-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">Corporate Headquarters</h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Palace, Sanjay Place, Agra, UP 282002
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
                      {contactPhone || "+91 9258-724-227"} / {whatsappPhone || "+91 7900-979-001"}<br />
                      <span className="text-emerald-400 text-xs">Available Mon–Sat: 10:00 AM – 7:00 PM</span>
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
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-6 bg-white/5 backdrop-blur-md p-4 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-black text-lg sm:text-xl text-white">Request an Instant Callback</h4>
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-emerald-300 bg-emerald-950/90 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-500/30">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>30-Min Response Desk</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                Connect directly with our dedicated loan, insurance, or credit card underwriting desk.
              </p>
              {callbackSuccess ? (
                <div className="text-center py-10 px-4 bg-emerald-950/60 rounded-2xl border border-emerald-500/40 shadow-inner relative overflow-hidden">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/40 shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                    Verified Priority Dispatch
                  </div>
                  <h5 className="font-black text-white text-2xl mb-1.5">Priority Callback Confirmed!</h5>
                  <p className="text-xs sm:text-sm text-emerald-200/90 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{callbackName}</strong>. Your verified submission for <span className="text-emerald-300 font-semibold">{callbackCategory} — {callbackSubType}</span> has been dispatched to our underwriting desk.
                  </p>
                  <p className="text-xs text-emerald-300/90 mt-2">
                    An advisor will reach out at <span className="text-white font-mono font-bold">+91 {callbackPhone}</span> ({callbackTime}) and your verification receipt has been logged for <span className="text-white font-mono font-bold">{callbackEmail}</span>.
                  </p>
                  <div className="mt-5 pt-4 border-t border-emerald-800/60 flex items-center justify-center gap-4 text-xs text-emerald-300/80">
                    <span>Reference ID: #BFS-{Date.now().toString().slice(-6)}</span>
                    <span>•</span>
                    <span>Direct Desk: +91 9258-724-227</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCallbackSuccess(false);
                      setCallbackName("");
                      setCallbackPhone("");
                      setCallbackEmail("");
                      setCallbackOtp("");
                      setIsEmailVerified(false);
                      setIsOtpSent(false);
                      setCallbackNotes("");
                      setFormTouched(false);
                    }}
                    className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
                  >
                    Request Another Callback
                  </button>
                </div>
              ) : (
                <form className="space-y-3.5 sm:space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  setFormTouched(true);
                  const isNameValid = callbackName.trim().length >= 3 && /^[a-zA-Z\s.'-]+$/.test(callbackName.trim());
                  const isPhoneValid = /^[6-9]\d{9}$/.test(callbackPhone.trim());
                  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(callbackEmail.trim().toLowerCase());
                  const isCityValid = callbackCity.trim().length >= 2;
                  
                  if (!isNameValid || !isPhoneValid || !isEmailValid || !isCityValid) {
                    return;
                  }
                  if (!isEmailVerified) {
                    setOtpError("Mandatory email OTP verification required before submitting.");
                    return;
                  }
                  
                  setCallbackSubmitting(true);
                  try {
                    const numericAmount = 
                      callbackCategory === "Loan"
                        ? (callbackAmount.includes("1.5 Crore – ₹5 Crore") ? 30000000 
                           : callbackAmount.includes("75 Lakh – ₹1.5") ? 15000000 
                           : callbackAmount.includes("35 Lakh – ₹75") ? 7500000 
                           : callbackAmount.includes("15 Lakh – ₹35") ? 3500000 
                           : callbackAmount.includes("5 Lakh – ₹15") ? 1500000 
                           : 2500000)
                        : callbackCategory === "Insurance"
                        ? (callbackAmount.includes("1 Crore") ? 10000000
                           : callbackAmount.includes("50 Lakh") ? 5000000
                           : callbackAmount.includes("25 Lakh") ? 2500000
                           : callbackAmount.includes("10 Lakh") ? 1000000
                           : callbackAmount.includes("5 Lakh") ? 500000
                           : 1000000)
                        : 0;

                    await fetch('/api/leads', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        name: callbackName.trim(),
                        phone: callbackPhone.trim(),
                        email: callbackEmail.trim().toLowerCase(),
                        productType: callbackCategory,
                        subType: callbackSubType,
                        loanType: `${callbackCategory} - ${callbackSubType}`,
                        loanAmount: numericAmount,
                        city: callbackCity.trim() || "Agra",
                        source: "Homepage Instant Callback Desk",
                        message: `Category: ${callbackCategory} | Sub-Type: ${callbackSubType} | Slot: ${callbackTime} | Band: ${callbackAmount} | Email: ${callbackEmail.trim().toLowerCase()} | City: ${callbackCity} | Note: ${callbackNotes.trim() || "Standard Callback"}`
                      })
                    });
                    triggerCelebration();
                    setCallbackSuccess(true);
                  } catch { /* ignore */ }
                  setCallbackSubmitting(false);
                }}>
                  
                  {/* Category Selector Tabs */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      1. Select Category <span className="text-emerald-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-emerald-950/80 p-1.5 rounded-xl border border-emerald-700/60">
                      {(["Loan", "Insurance", "Credit Card", "Tax & Compliance"] as CallbackCategory[]).map((cat) => {
                        const isSelected = callbackCategory === cat;
                        const CatIcon = cat === "Loan" ? Landmark : cat === "Insurance" ? ShieldCheck : cat === "Credit Card" ? CreditCard : Receipt;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setCallbackCategory(cat);
                              setCallbackSubType(CALLBACK_SERVICES[cat].subTypes[0]);
                              setCallbackAmount(CALLBACK_SERVICES[cat].amounts[0]);
                            }}
                            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                              isSelected
                                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                                : "text-slate-300 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <CatIcon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-slate-950" : "text-emerald-400"}`} />
                            <span className="truncate">{cat === "Tax & Compliance" ? "Tax & MSME" : cat}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 1: Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Your Full Name <span className="text-emerald-400">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="e.g. Rahul Sharma" 
                          required 
                          value={callbackName} 
                          onChange={(e) => setCallbackName(e.target.value)} 
                          className={`w-full bg-emerald-950/70 border ${
                            formTouched && (!callbackName.trim() || callbackName.trim().length < 3 || !/^[a-zA-Z\s.'-]+$/.test(callbackName.trim()))
                              ? "border-rose-500" 
                              : callbackName.trim().length >= 3 && /^[a-zA-Z\s.'-]+$/.test(callbackName.trim())
                              ? "border-emerald-500" 
                              : "border-emerald-700/60"
                          } rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 transition-colors pr-9`} 
                        />
                        {callbackName.trim().length >= 3 && /^[a-zA-Z\s.'-]+$/.test(callbackName.trim()) && (
                          <Check className="w-4 h-4 text-emerald-400 absolute right-3 top-3" />
                        )}
                      </div>
                      {formTouched && (!callbackName.trim() || callbackName.trim().length < 3 || !/^[a-zA-Z\s.'-]+$/.test(callbackName.trim())) && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Legal name required (min 3 letters, alphabets only)</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        10-Digit Mobile Number <span className="text-emerald-400">*</span>
                      </label>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-emerald-700/60 bg-emerald-900/80 text-emerald-300 text-xs font-bold select-none">
                          +91
                        </span>
                        <input 
                          type="tel" 
                          maxLength={10}
                          pattern="[0-9]{10}"
                          placeholder="9876543210" 
                          required 
                          value={callbackPhone} 
                          onChange={(e) => setCallbackPhone(e.target.value.replace(/\D/g, ''))} 
                          className={`w-full bg-emerald-950/70 border ${
                            formTouched && !/^[6-9]\d{9}$/.test(callbackPhone.trim())
                              ? "border-rose-500"
                              : /^[6-9]\d{9}$/.test(callbackPhone.trim())
                              ? "border-emerald-500"
                              : "border-emerald-700/60"
                          } rounded-r-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 transition-colors pr-9`} 
                        />
                        {/^[6-9]\d{9}$/.test(callbackPhone.trim()) && (
                          <Check className="w-4 h-4 text-emerald-400 absolute right-3 top-3" />
                        )}
                      </div>
                      {formTouched && !/^[6-9]\d{9}$/.test(callbackPhone.trim()) && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Enter valid 10-digit number (starting with 6, 7, 8, 9)</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email Address & Mandatory OTP Verification */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Email Address (OTP Verification Required)</span>
                        <span className="text-emerald-400">*</span>
                      </label>
                      {isEmailVerified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded-md border border-emerald-500/40">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="relative flex">
                      <input 
                        type="email" 
                        placeholder="e.g. rahul.sharma@gmail.com" 
                        disabled={isEmailVerified}
                        required 
                        value={callbackEmail} 
                        onChange={(e) => {
                          setCallbackEmail(e.target.value);
                          if (isEmailVerified) setIsEmailVerified(false);
                          setIsOtpSent(false);
                          setCallbackOtp("");
                          setOtpError("");
                        }} 
                        className={`w-full bg-emerald-950/70 border ${
                          isEmailVerified 
                            ? "border-emerald-500 text-emerald-200 font-medium" 
                            : formTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(callbackEmail.trim())
                            ? "border-rose-500" 
                            : "border-emerald-700/60"
                        } rounded-l-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 transition-colors`}
                      />
                      {isEmailVerified ? (
                        <button
                          type="button"
                          onClick={() => {
                            setIsEmailVerified(false);
                            setIsOtpSent(false);
                            setCallbackOtp("");
                          }}
                          className="px-3.5 rounded-r-xl border border-l-0 border-emerald-700/60 bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-300 text-xs font-bold transition-colors cursor-pointer select-none"
                        >
                          Change
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(callbackEmail.trim()) || isOtpSending || otpCooldown > 0}
                          className="px-3.5 rounded-r-xl border border-l-0 border-emerald-600/70 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-slate-950 text-xs font-black transition-colors cursor-pointer select-none shrink-0 flex items-center gap-1.5"
                        >
                          {isOtpSending ? (
                            <>
                              <RotateCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : otpCooldown > 0 ? (
                            <span>Resend ({otpCooldown}s)</span>
                          ) : isOtpSent ? (
                            <span>Resend OTP</span>
                          ) : (
                            <>
                              <KeyRound className="w-3.5 h-3.5" />
                              <span>Send OTP</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    {formTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(callbackEmail.trim()) && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>Please enter a valid email address (e.g. name@example.com)</span>
                      </p>
                    )}

                    {/* Inline OTP Verification Panel */}
                    {isOtpSent && !isEmailVerified && (
                      <motion.div 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2.5 p-3 rounded-xl bg-slate-950/90 border border-emerald-500/40 shadow-inner"
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-slate-200 font-bold flex items-center gap-1.5">
                            <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                            Enter 6-Digit OTP sent to your email
                          </span>
                          {otpCooldown > 0 && (
                            <span className="text-[11px] text-slate-400">Valid for 10 mins</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={6}
                            placeholder="123456"
                            value={callbackOtp}
                            onChange={(e) => setCallbackOtp(e.target.value.replace(/\D/g, ''))}
                            className="w-full bg-emerald-950/80 border border-emerald-600/60 rounded-lg px-3 py-2 text-center text-base font-mono font-bold tracking-[0.3em] text-white focus:outline-none focus:border-emerald-400"
                          />
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={isOtpVerifying || callbackOtp.length !== 6}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 shadow-md"
                          >
                            {isOtpVerifying ? (
                              <RotateCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Check className="w-3.5 h-3.5" />
                            )}
                            <span>Verify OTP</span>
                          </button>
                        </div>
                        {mockOtpHint && (
                          <p className="text-[11px] text-amber-300/90 mt-1.5 font-mono">
                            Dev Mode Code: <strong className="text-amber-200 underline">{mockOtpHint}</strong>
                          </p>
                        )}
                        {otpError && (
                          <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{otpError}</span>
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Row 3: Dynamic Sub-Type & Requirement Amount */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-30">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        {callbackCategory} Sub-Type <span className="text-emerald-400">*</span>
                      </label>
                      <CustomSelect 
                        value={callbackSubType}
                        onChange={setCallbackSubType}
                        options={CALLBACK_SERVICES[callbackCategory].subTypes}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        {CALLBACK_SERVICES[callbackCategory].amountLabel}
                      </label>
                      <CustomSelect 
                        value={callbackAmount}
                        onChange={setCallbackAmount}
                        options={CALLBACK_SERVICES[callbackCategory].amounts}
                      />
                    </div>
                  </div>

                  {/* Row 4: City & Preferred Callback Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-20">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        City / Location <span className="text-emerald-400">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="e.g. Agra, Mathura, Delhi NCR" 
                          value={callbackCity} 
                          onChange={(e) => setCallbackCity(e.target.value)} 
                          className={`w-full bg-emerald-950/70 border ${
                            formTouched && callbackCity.trim().length < 2
                              ? "border-rose-500" 
                              : callbackCity.trim().length >= 2
                              ? "border-emerald-500" 
                              : "border-emerald-700/60"
                          } rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 transition-colors pr-9`} 
                        />
                        {callbackCity.trim().length >= 2 && (
                          <Check className="w-4 h-4 text-emerald-400 absolute right-3 top-3" />
                        )}
                      </div>
                      {formTouched && callbackCity.trim().length < 2 && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>City/location is required (min 2 characters)</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Preferred Callback Slot
                      </label>
                      <CustomSelect 
                        value={callbackTime}
                        onChange={setCallbackTime}
                        options={CALLBACK_SLOTS}
                      />
                    </div>
                  </div>

                  {/* Row 5: Specific Note (Optional) */}
                  <div className="relative z-10">
                    <label className="block text-xs font-bold text-slate-200 mb-1">
                      Requirement Details / Notes <span className="text-[11px] font-normal text-slate-400">(Optional)</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Lowest ROI on Agra residential plot / Balance transfer from existing bank" 
                      value={callbackNotes} 
                      onChange={(e) => setCallbackNotes(e.target.value)} 
                      className="w-full bg-emerald-950/70 border border-emerald-700/60 rounded-xl px-3.5 py-2 text-base sm:text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 transition-colors" 
                    />
                  </div>

                  {/* Submit Button */}
                  {!isEmailVerified ? (
                    <button
                      type="button"
                      onClick={() => {
                        setFormTouched(true);
                        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(callbackEmail.trim().toLowerCase());
                        if (!isEmailValid) {
                          setOtpError("Please enter a valid email address first.");
                        } else if (!isOtpSent) {
                          handleSendOtp();
                        } else {
                          setOtpError("Please enter the 6-digit OTP to verify your email.");
                        }
                      }}
                      className="w-full bg-slate-800/90 hover:bg-slate-800 text-slate-200 font-bold py-3 sm:py-3.5 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 border border-emerald-500/30 cursor-pointer mt-2 shadow-inner group"
                    >
                      <KeyRound className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>Verify Email OTP to Submit Request</span>
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      disabled={callbackSubmitting} 
                      className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 disabled:opacity-50 text-slate-950 font-black py-3 sm:py-3.5 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 mt-2 cursor-pointer"
                    >
                      {callbackSubmitting ? (
                        <>
                          <RotateCw className="w-4 h-4 animate-spin" />
                          <span>Submitting Verified Request...</span>
                        </>
                      ) : (
                        <>
                          <PhoneCall className="w-4 h-4" /> 
                          <span>Request Priority Callback</span>
                        </>
                      )}
                    </button>
                  )}

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-300/80 pt-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>100% Confidential • In-House Senior Advisory Desk • Direct Bank Liaison</span>
                  </div>
                </form>
              )}
            </motion.div>
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



      <Footer contactPhone={contactPhone} whatsappPhone={whatsappPhone} />
      <FloatingSupport contactPhone={contactPhone} whatsappPhone={whatsappPhone} />
    </div>
  );
}
