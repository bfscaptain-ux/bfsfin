"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { 
  CalendarCheck, 
  Home, 
  Building2, 
  Briefcase, 
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Shield,
  CreditCard,
  HeartPulse,
  ShoppingBag,
  Sparkles,
  Plane,
  Mail,
  KeyRound,
  ShieldCheck,
  Check,
  RotateCw,
  AlertCircle,
  FileCheck,
  Percent
} from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

type PrimaryCategory = "Loan" | "Insurance" | "Credit Card";

interface SubOption {
  id: string;
  title: string;
  desc: string;
  badge?: string;
  icon: any;
}

const APPOINTMENT_CATEGORIES: Record<PrimaryCategory, {
  label: string;
  tagline: string;
  icon: any;
  color: string;
  activeBorder: string;
  badgeBg: string;
  options: SubOption[];
}> = {
  "Loan": {
    label: "Loan Advisory",
    tagline: "Lowest ROI from 7.15%*, ₹0 Advance & Legal Title Check",
    icon: Home,
    color: "emerald",
    activeBorder: "border-emerald-500",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    options: [
      { id: "Home Loan", title: "Home Loan", desc: "Fresh property purchase, construction or resale", badge: "From 7.15%* ROI", icon: Home },
      { id: "LAP", title: "Loan Against Property (LAP)", desc: "High-value fund against residential or commercial asset", badge: "Up to 75% Value", icon: Building2 },
      { id: "Balance Transfer", title: "Balance Transfer & Top-Up", desc: "Switch high ROI loan to lower bank rate + extra cash", badge: "Save up to 40% EMI", icon: RefreshCw },
      { id: "Business & MSME Loan", title: "Business / MSME Funding", desc: "Collateral & non-collateral working capital limits", badge: "Fast 48-Hour Sanction", icon: Briefcase },
      { id: "Personal & Express Loan", title: "Personal / Emergency Loan", desc: "Unsecured loan for medical, travel or personal needs", badge: "Instant Sanction", icon: Percent },
      { id: "Property Legal Vetting", title: "Legal & Title Verification", desc: "Complete 30-year deed search by verified advocate", badge: "100% Risk Free", icon: FileCheck }
    ]
  },
  "Insurance": {
    label: "Insurance Desk",
    tagline: "100% Cashless Mediclaim & Zero-Deduction Claim Assistance",
    icon: Shield,
    color: "teal",
    activeBorder: "border-teal-500",
    badgeBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    options: [
      { id: "Cashless Health Mediclaim", title: "Cashless Health Mediclaim", desc: "10,000+ network hospitals with zero out-of-pocket room rent", badge: "10,000+ Hospitals", icon: HeartPulse },
      { id: "Term Life Bima Cover", title: "Term Life Insurance / Bima", desc: "High financial security cover with 105% return of premium options", badge: "Up to ₹5 Cr Cover", icon: ShieldCheck },
      { id: "Family Floater Plan", title: "Family Floater Comprehensive", desc: "Single umbrella policy covering parents, spouse and children", badge: "Complete Family", icon: Shield },
      { id: "Senior Citizen Health Cover", title: "Senior Citizen Specialized Plan", desc: "Pre-existing ailments covered with minimal waiting period", badge: "Age 60+ Ready", icon: HeartPulse },
      { id: "Critical Illness & Cancer Cover", title: "Critical Illness & Cancer Care", desc: "Lump-sum payout upon diagnosis of 36+ major illnesses", badge: "Direct Cash Payout", icon: ShieldCheck },
      { id: "Commercial & Fire Policy", title: "Commercial, Fire & Marine Cover", desc: "Factory, godown, transit inventory and shop risk safeguard", badge: "Business Asset", icon: Building2 }
    ]
  },
  "Credit Card": {
    label: "Credit Card Desk",
    tagline: "Lifetime Free Cards, 5% Flat Cashback & Lounge Access",
    icon: CreditCard,
    color: "amber",
    activeBorder: "border-amber-500",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    options: [
      { id: "Lifetime Free Card", title: "Lifetime Free Card (LTF)", desc: "Zero annual charge and zero joining fee forever with basic perks", badge: "₹0 Annual Fee", icon: CreditCard },
      { id: "Airport Lounge & Travel Card", title: "Airport Lounge & Travel Pass", desc: "Complimentary domestic & international VIP airport lounge visits", badge: "Free Lounge Access", icon: Plane },
      { id: "5% Flat Cashback Shopping Card", title: "5% Flat Cashback Shopping", desc: "Direct cashback on Amazon, Flipkart, Swiggy, Zomato and Myntra", badge: "5% Auto-Credit", icon: ShoppingBag },
      { id: "Fuel Surcharge Waiver Card", title: "Fuel Surcharge Waiver & Fastag", desc: "Complete 100% fuel surcharge exemption across IOCL, BPCL & HPCL", badge: "100% Fuel Waiver", icon: Sparkles },
      { id: "Credit Score Builder (FD Based)", title: "Credit Score Booster (FD Card)", desc: "Guaranteed approval for low or zero CIBIL score applicants", badge: "100% Instant Approval", icon: ShieldCheck },
      { id: "Business & Corporate Card", title: "Business & Expense Card", desc: "High spend limits with GST invoice input tax benefit credit", badge: "GST Expense Input", icon: Briefcase }
    ]
  }
};

export default function AppointmentClient() {
  // Step 1: Category & SubType Selection
  // Step 2: Date & Slot Pick
  // Step 3: Contact & Email OTP Verification
  // Step 4: Confirmed & Celebration
  const [step, setStep] = useState(1);
  
  // Selected Service
  const [category, setCategory] = useState<PrimaryCategory>("Loan");
  const [subType, setSubType] = useState<string>("Home Loan");

  // Schedule Slot
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // User details & OTP verification state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Agra"
  });

  const [otpCode, setOtpCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [otpError, setOtpError] = useState("");
  const [mockOtpHint, setMockOtpHint] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-set first subType whenever category changes
  const handleCategoryChange = (newCat: PrimaryCategory) => {
    setCategory(newCat);
    setSubType(APPOINTMENT_CATEGORIES[newCat].options[0].id);
  };

  // Cooldown timer for resending OTP
  useEffect(() => {
    if (otpCooldown <= 0) return;
    const timer = setInterval(() => {
      setOtpCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCooldown]);

  // Generate next 7 days (skipping Sundays)
  const getNext7Days = () => {
    const dates = [];
    for (let i = 1; i <= 8; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      if (date.getDay() === 0) continue; // Skip Sunday
      dates.push(date);
      if (dates.length === 6) break;
    }
    return dates;
  };
  const availableDates = getNext7Days();

  const availableTimes = [
    "10:00 AM – 11:30 AM",
    "11:30 AM – 01:00 PM",
    "02:00 PM – 03:30 PM",
    "03:30 PM – 05:00 PM",
    "05:00 PM – 06:30 PM",
    "06:30 PM – 08:00 PM"
  ];

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#10b981', '#34d399', '#059669', '#fbbf24', '#38bdf8', '#ffffff']
      });
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.65 },
          colors: ['#10b981', '#34d399', '#fbbf24', '#f43f5e']
        });
      }, 200);
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.65 },
          colors: ['#10b981', '#34d399', '#38bdf8', '#a855f7']
        });
      }, 350);
    } catch (err) {
      console.error("Celebration error:", err);
    }
  };

  const handleSendOtp = async () => {
    const trimmedEmail = formData.email.trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
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
        setOtpError(data.error || "Failed to send verification code. Please check email address.");
      }
    } catch {
      setOtpError("Network connection error. Could not dispatch OTP.");
    }
    setIsOtpSending(false);
  };

  const handleVerifyOtp = async () => {
    const trimmedEmail = formData.email.trim().toLowerCase();
    const trimmedOtp = otpCode.trim();
    if (trimmedOtp.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP received in your email.");
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
        setOtpError(data.error || "Incorrect or expired OTP code.");
      }
    } catch {
      setOtpError("OTP verification failed. Please try again.");
    }
    setIsOtpVerifying(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailVerified) {
      setOtpError("Please verify your email via OTP before confirming the appointment.");
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim().toLowerCase(),
          productType: category,
          subType: subType,
          loanType: `${category} - ${subType}`,
          city: formData.city || "Agra",
          source: `APPOINTMENT: ${selectedDate} | ${selectedTime}`
        })
      });
      triggerCelebration();
      setStep(4);
    } catch (error) {
      console.error(error);
      setOtpError("Could not confirm appointment. Please check network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -18 },
    transition: { duration: 0.35 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 font-sans selection:bg-emerald-500/30">
      <Header />
      
      <main className="py-12 sm:py-16 lg:py-24 relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
        {/* Ambient Glows */}
        <div className="absolute inset-0 z-0 bg-slate-50 dark:bg-emerald-950 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[130px] rounded-full transform -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[110px] rounded-full transform translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header Title (Steps 1, 2, 3) */}
          {step < 4 && (
            <div className="text-center mb-8 sm:mb-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-300/60 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-widest uppercase mb-3.5 shadow-sm"
              >
                <CalendarCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Direct Consultation</span>
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                Schedule a Consultation
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
                Select your financial requirement, choose a slot, and get instant verified booking with email confirmation.
              </p>
            </div>
          )}

          {/* Stepper Indicator */}
          {step < 4 && (
            <div className="mb-8 relative max-w-md mx-auto px-4">
              <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-200 dark:bg-emerald-800/80 -translate-y-1/2 rounded-full z-0" />
              <div 
                className="absolute top-1/2 left-8 h-1 bg-emerald-600 rounded-full transition-all duration-500 ease-in-out -translate-y-1/2 z-0"
                style={{ width: `calc(${((step - 1) / 2) * 100}% * 0.8)` }}
              />
              <div className="relative flex justify-between z-10">
                {[
                  { num: 1, label: "Requirement" },
                  { num: 2, label: "Slot & Time" },
                  { num: 3, label: "OTP Verification" }
                ].map((item) => (
                  <div key={item.num} className="flex flex-col items-center">
                    <div 
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border-2 transition-all duration-300 shadow-sm ${
                        step >= item.num 
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-emerald-500/20' 
                          : 'border-slate-200 dark:border-emerald-800 bg-white dark:bg-emerald-900 text-slate-400'
                      } ${step === item.num ? 'ring-4 ring-emerald-200 dark:ring-emerald-800' : ''}`}
                    >
                      {step > item.num ? <Check className="w-4 h-4 text-white" /> : item.num}
                    </div>
                    <span className={`text-[11px] font-semibold mt-1.5 transition-colors ${
                      step === item.num ? 'text-emerald-700 dark:text-emerald-300 font-bold' : 'text-slate-400'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Form Container Card */}
          <div className="bg-white dark:bg-emerald-900/90 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-emerald-800/70 shadow-2xl shadow-slate-200/60 dark:shadow-black/40 overflow-hidden relative min-h-[440px]">
            <AnimatePresence mode="wait">
              
              {/* ================= STEP 1: Category & Need ================= */}
              {step === 1 && (
                <motion.div key="step1" {...fadeInUp} className="p-6 sm:p-8 md:p-10">
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      1. What service do you need an appointment for?
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Choose among Loan Advisory, Insurance Desk or Credit Cards to view specialized options.
                    </p>
                  </div>

                  {/* Primary 3 Categories Switcher */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {(Object.keys(APPOINTMENT_CATEGORIES) as PrimaryCategory[]).map((catKey) => {
                      const cat = APPOINTMENT_CATEGORIES[catKey];
                      const isSelected = category === catKey;
                      const Icon = cat.icon;
                      return (
                        <button
                          key={catKey}
                          type="button"
                          onClick={() => handleCategoryChange(catKey)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/60 shadow-md shadow-emerald-600/10'
                              : 'border-slate-200 dark:border-emerald-800/80 bg-slate-50/50 dark:bg-emerald-950/20 hover:border-emerald-400 dark:hover:border-emerald-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-emerald-800 text-slate-600 dark:text-emerald-300'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-extrabold text-base text-slate-900 dark:text-white mb-0.5">
                              {catKey}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {cat.tagline}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Sub-needs Grid for Selected Category */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-3.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Select specific {category} requirement:
                      </h3>
                      <span className="text-xs text-slate-400">
                        {APPOINTMENT_CATEGORIES[category].options.length} verified options
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {APPOINTMENT_CATEGORIES[category].options.map((opt) => {
                        const isSubSelected = subType === opt.id;
                        const OptIcon = opt.icon;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSubType(opt.id)}
                            className={`p-4 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer flex items-start gap-3.5 ${
                              isSubSelected
                                ? 'border-emerald-600 bg-white dark:bg-emerald-950/90 shadow-sm ring-2 ring-emerald-500/20'
                                : 'border-slate-100 dark:border-emerald-800/60 bg-white dark:bg-emerald-950/30 hover:border-emerald-300 dark:hover:border-emerald-700'
                            }`}
                          >
                            <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                              isSubSelected 
                                ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300' 
                                : 'bg-slate-100 dark:bg-emerald-900/30 text-slate-500 dark:text-slate-400'
                            }`}>
                              <OptIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className={`font-bold text-sm truncate ${
                                  isSubSelected ? 'text-emerald-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'
                                }`}>
                                  {opt.title}
                                </span>
                                {opt.badge && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/50 whitespace-nowrap">
                                    {opt.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                {opt.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Next Action */}
                  <div className="mt-8 pt-5 border-t border-slate-100 dark:border-emerald-800/80 flex items-center justify-between">
                    <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                      Selected: <strong className="text-slate-800 dark:text-slate-200">{category} ({subType})</strong>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!subType}
                      className="ml-auto px-7 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-xl shadow-md hover:shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer text-sm"
                    >
                      Next: Choose Slot <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ================= STEP 2: Date & Time Slot ================= */}
              {step === 2 && (
                <motion.div key="step2" {...fadeInUp} className="p-6 sm:p-8 md:p-10">
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      2. Pick your Preferred Date & Slot
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Consultation for: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{category} — {subType}</span>
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Date Selection */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                        <Calendar className="w-4 h-4 text-emerald-500" /> Available Consultation Dates
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                        {availableDates.map((date, i) => {
                          const dateString = date.toISOString().split('T')[0];
                          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                          const dayNum = date.getDate();
                          const monthName = date.toLocaleDateString('en-US', { month: 'short' });
                          const isSelected = selectedDate === dateString;
                          
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setSelectedDate(dateString)}
                              className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                                  : 'border-slate-200 dark:border-emerald-800/80 bg-slate-50/80 dark:bg-emerald-950/40 hover:border-emerald-400 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              <span className={`text-[11px] uppercase font-bold mb-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>{dayName}</span>
                              <span className={`text-xl font-black ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{dayNum}</span>
                              <span className={`text-[11px] ${isSelected ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>{monthName}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                        <Clock className="w-4 h-4 text-emerald-500" /> Available Consultation Slots
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {availableTimes.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-3 px-4 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                                  : 'border-slate-200 dark:border-emerald-800/70 bg-white dark:bg-emerald-950/30 hover:border-emerald-300 dark:hover:border-emerald-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <span>{time}</span>
                              {isSelected && <Check className="w-4 h-4 text-emerald-500" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-100 dark:border-emerald-800/80 flex justify-between items-center">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 text-slate-500 hover:text-slate-800 dark:hover:text-white font-bold transition-colors flex items-center gap-1.5 cursor-pointer text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button 
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className="px-7 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-xl shadow-md hover:shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer text-sm"
                    >
                      Next: Verify Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ================= STEP 3: Contact & Email OTP Verification ================= */}
              {step === 3 && (
                <motion.div key="step3" {...fadeInUp} className="p-6 sm:p-8 md:p-10">
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      3. Verification & Appointment Confirmation
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Enter your details and verify your email OTP. An instant confirmation receipt will be delivered to your inbox.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Summary Sidebar */}
                    <div className="md:col-span-5 bg-slate-50 dark:bg-emerald-950/60 p-5 rounded-2xl border border-slate-200 dark:border-emerald-800/80 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-emerald-800/60 pb-3">
                        <span className="text-xs font-black tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
                          Booking Overview
                        </span>
                        <span className="text-[11px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                          100% Free
                        </span>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <div className="text-slate-400 font-medium">Service Category</div>
                          <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{category}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 font-medium">Specific Requirement</div>
                          <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">{subType}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 font-medium">Appointment Date</div>
                          <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                            {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-400 font-medium">Booked Time Slot</div>
                          <div className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedTime}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 font-medium">Advisory Mode</div>
                          <div className="font-bold text-slate-900 dark:text-white mt-0.5">Priority Call / Branch Meeting</div>
                        </div>
                      </div>

                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
                        🔒 Verified with BFS Official Booking Desk. Zero spam guaranteed.
                      </div>
                    </div>

                    {/* Form & OTP Input */}
                    <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4">
                      {/* Name */}
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 block">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text" required
                            value={formData.name} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-emerald-950/70 border border-slate-200 dark:border-emerald-800/80 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                            placeholder="e.g. Ramesh Chandra"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 block">
                          Phone Number (For WhatsApp & Call Reminder) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">+91</span>
                          <input 
                            type="tel" required
                            value={formData.phone} 
                            onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                            className="w-full bg-slate-50 dark:bg-emerald-950/70 border border-slate-200 dark:border-emerald-800/80 text-slate-900 dark:text-white rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                            placeholder="9876543210"
                          />
                        </div>
                      </div>

                      {/* Email + OTP Verification Block */}
                      <div className="bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/80 rounded-2xl p-4 space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                              Email Address (Mandatory for Confirmation) *
                            </label>
                            {isEmailVerified && (
                              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Email Verified
                              </span>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input 
                                type="email" 
                                required
                                disabled={isEmailVerified}
                                value={formData.email} 
                                onChange={(e) => {
                                  setFormData({...formData, email: e.target.value});
                                  if (isEmailVerified) setIsEmailVerified(false);
                                }}
                                className="w-full bg-white dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800/80 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 disabled:opacity-75"
                                placeholder="name@example.com"
                              />
                            </div>
                            
                            {!isEmailVerified && (
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={isOtpSending || otpCooldown > 0 || !formData.email.includes("@")}
                                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-xl text-xs whitespace-nowrap transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                              >
                                {isOtpSending ? (
                                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                                ) : otpCooldown > 0 ? (
                                  `Resend (${otpCooldown}s)`
                                ) : isOtpSent ? (
                                  "Resend OTP"
                                ) : (
                                  "Send OTP"
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* OTP Verification Input Row */}
                        {isOtpSent && !isEmailVerified && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="pt-2 border-t border-slate-200 dark:border-emerald-800/60 space-y-2"
                          >
                            <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium flex items-center justify-between">
                              <span>Enter the 6-digit code sent to your email:</span>
                              {mockOtpHint && (
                                <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">
                                  Dev Code: {mockOtpHint}
                                </span>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                  type="text"
                                  maxLength={6}
                                  value={otpCode}
                                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                  placeholder="6-digit OTP"
                                  className="w-full bg-white dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2 text-sm font-mono tracking-widest text-center font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={isOtpVerifying || otpCode.length !== 6}
                                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                              >
                                {isOtpVerifying ? (
                                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <>
                                    <Check className="w-3.5 h-3.5" /> Verify
                                  </>
                                )}
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {otpError && (
                          <div className="text-xs text-rose-500 flex items-center gap-1.5 font-medium pt-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{otpError}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t border-slate-100 dark:border-emerald-800/80 flex justify-between items-center">
                        <button 
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-4 py-2.5 text-slate-500 hover:text-slate-800 dark:hover:text-white font-bold transition-colors flex items-center gap-1 cursor-pointer text-sm"
                        >
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                        <button 
                          type="submit" 
                          disabled={isSubmitting || !formData.name || formData.phone.length < 10 || !isEmailVerified}
                          className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer text-sm"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <RotateCw className="w-4 h-4 animate-spin" /> Confirming...
                            </span>
                          ) : (
                            <>
                              <CalendarCheck className="w-4 h-4" /> Confirm Appointment
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* ================= STEP 4: Success & Confetti ================= */}
              {step === 4 && (
                <motion.div 
                  key="step4" 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 sm:p-12 md:p-16 text-center flex flex-col items-center justify-center min-h-[440px]"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.55, delay: 0.15 }}
                    className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-emerald-600/20"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-200 dark:border-emerald-800">
                    <Sparkles className="w-3.5 h-3.5" /> Verified Booking Dispatched
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                    Appointment Successfully Confirmed!
                  </h2>
                  
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
                    Thank you, <strong className="text-slate-900 dark:text-white">{formData.name}</strong>. Your consultation for <strong className="text-emerald-600 dark:text-emerald-400">{category} ({subType})</strong> has been scheduled for:
                  </p>

                  {/* Confirmed Slot Badge */}
                  <div className="bg-slate-50 dark:bg-emerald-950/70 border border-slate-200 dark:border-emerald-800 rounded-2xl p-5 mb-6 max-w-md w-full shadow-sm">
                    <div className="text-sm font-black text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-2 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Slot: {selectedTime}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-emerald-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Official confirmation sent to <strong>{formData.email}</strong></span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
                    Our verified Relationship Manager will call you at <strong>+91 {formData.phone}</strong> prior to the meeting.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link 
                      href="/" 
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all text-sm"
                    >
                      Return to Homepage
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setSelectedDate(null);
                        setSelectedTime(null);
                        setIsEmailVerified(false);
                        setIsOtpSent(false);
                        setOtpCode("");
                      }}
                      className="px-6 py-3 bg-slate-100 dark:bg-emerald-950/80 hover:bg-slate-200 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 font-bold rounded-xl border border-slate-200 dark:border-emerald-800 transition-all text-sm cursor-pointer"
                    >
                      Book Another Slot
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}

