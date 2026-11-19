"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, ArrowRight, X, Mail, Phone, User, 
  KeyRound, RefreshCw, CheckCircle2, Loader2, Sparkles, AlertCircle, Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface CalculatorLeadProps {
  toolName?: string;
  loanAmount: number;
  monthlyEmi?: number;
  interestRate?: number;
  tenureYears?: number;
  customSummary?: string;
  onSuccess?: () => void;
}

/**
 * Format Indian Lakhs / Crores
 */
export function formatAmount(num: number): string {
  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2);
    return `₹${cr.endsWith(".00") ? cr.slice(0, -3) : cr} Crore`;
  }
  if (num >= 100000) {
    const lk = (num / 100000).toFixed(1);
    return `₹${lk.endsWith(".0") ? lk.slice(0, -2) : lk} Lakh`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}

/**
 * Submits lead to /api/leads which triggers CRM ingestion & WhatsApp template dispatch
 */
export async function submitToolLeadToCRM(payload: {
  name: string;
  phone: string;
  email: string;
  toolName: string;
  loanAmount: number;
  monthlyEmi?: number;
  interestRate?: number;
  tenureYears?: number;
  customSummary?: string;
  otpVerified?: boolean;
}) {
  const cleanPhone = payload.phone.replace(/[^0-9]/g, "").slice(-10);
  const emiText = payload.monthlyEmi ? ` | EMI: ₹${payload.monthlyEmi.toLocaleString("en-IN")}/mo` : "";
  const rateText = payload.interestRate ? ` | Rate: ${payload.interestRate}%` : "";
  const tenureText = payload.tenureYears ? ` | Term: ${payload.tenureYears} Yrs` : "";
  const summaryText = payload.customSummary ? ` | ${payload.customSummary}` : "";

  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name.trim(),
      phone: cleanPhone,
      email: payload.email.trim(),
      loanAmount: payload.loanAmount,
      loanType: `${payload.toolName || "Home Loan Calculator"}`,
      productType: "Finance",
      subType: "Home Loan",
      formType: "Tools Lead",
      source: `Website Tool (${payload.toolName || "Calculator"})`,
      city: "Agra",
      otpVerified: payload.otpVerified ?? true,
      otpStatus: payload.otpVerified ? "Verified" : "Pending",
      toolName: payload.toolName || "Loan Calculator",
      monthlyEmi: payload.monthlyEmi || 0,
      interestRate: payload.interestRate || 0,
      tenureYears: payload.tenureYears || 0,
      customSummary: payload.customSummary || "",
      message: `User verified email via OTP for ${payload.toolName || "Loan Tool"} simulation of ${formatAmount(payload.loanAmount)}${emiText}${rateText}${tenureText}${summaryText}. Authenticated lead ingested to tools_data.`,
      consentTimestamp: new Date().toISOString()
    })
  });

  return res.json();
}

/**
 * 1. Inline Quick Lead Strip
 * User requested: "ESE FIELD MT DO" - Returns null so no inline fields clutter the calculator tool.
 */
export function CalculatorLeadStrip(_props: CalculatorLeadProps) {
  return null;
}

/**
 * 2. High-Converting Email OTP Verification Modal
 * As requested: "BS ESA HO KI TOOLS KO USE KRE TO USKE NAM OR NUMBER OR EMAIL HUME CHAIYE USKE BSS EMAIL OTP SE VERIFY HOKE OK VO DETAILS HUMARE CRM MAIN AAJAYE"
 */
export function CalculatorLeadModal({
  isOpen,
  onClose,
  toolName = "Home Loan EMI Calculator",
  loanAmount,
  monthlyEmi,
  interestRate,
  tenureYears,
  customSummary,
  title = "Unlock Full Bank Calculation & Amortization Schedule",
  subtitle = "Verify your email to get official bank sanction rates & detailed year-wise breakdown.",
  onSuccess
}: CalculatorLeadProps & {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}) {
  const [step, setStep] = useState<"DETAILS" | "OTP" | "VERIFIED">("DETAILS");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Pre-fill if already saved in browser
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bfs_tool_verified_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) setName(parsed.name);
        if (parsed?.phone) setPhone(parsed.phone);
        if (parsed?.email) setEmail(parsed.email);
      }
    } catch (e) {}
  }, []);

  // Resend OTP countdown
  useEffect(() => {
    let interval: any;
    if (step === "OTP" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isOpen) return null;

  // Step 1: Send OTP to Email
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanName = name.trim();
    const cleanPhone = phone.replace(/[^0-9]/g, "").slice(-10);
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2) {
      setError("Kripya apna poora naam enter karein.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError("Kripya 10-digit ka valid WhatsApp mobile number enter karein.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Kripya valid email address enter karein.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStep("OTP");
        setResendTimer(30);
        setCanResend(false);
      } else {
        setError(data.error || "OTP bhejne me dikkat aayi. Kripya punah prayas karein.");
      }
    } catch (err) {
      setError("Server se sampark nahi ho paya. Kripya apna internet connection check karein.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP & Ingest Lead into CRM
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanOtp = otp.trim().replace(/[^0-9]/g, "");
    if (cleanOtp.length < 4) {
      setError("Kripya poora OTP code enter karein.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/otp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp: cleanOtp
        })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        // Submit authenticated lead to CRM
        await submitToolLeadToCRM({
          name: name.trim(),
          phone: phone.replace(/[^0-9]/g, "").slice(-10),
          email: email.trim().toLowerCase(),
          toolName,
          loanAmount,
          monthlyEmi,
          interestRate,
          tenureYears,
          customSummary,
          otpVerified: true
        });

        // Save authenticated status locally
        try {
          localStorage.setItem(
            "bfs_tool_verified_user",
            JSON.stringify({
              name: name.trim(),
              phone: phone.replace(/[^0-9]/g, "").slice(-10),
              email: email.trim().toLowerCase(),
              verified: true,
              verifiedAt: Date.now()
            })
          );
        } catch (e) {}

        setStep("VERIFIED");
        if (onSuccess) onSuccess();

        // Auto close after 1.8 seconds
        setTimeout(() => {
          onClose();
        }, 1800);
      } else {
        setError(data.error || "Galat OTP code. Kripya check karke dobara enter karein.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!canResend) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResendTimer(30);
        setCanResend(false);
      } else {
        setError(data.error || "Failed to resend OTP.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-emerald-800/80 rounded-2xl shadow-2xl overflow-hidden p-5 sm:p-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                {title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Active Simulation Pill */}
          <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 rounded-xl p-2.5 mb-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{toolName}</span>
            </div>
            <div className="font-extrabold text-slate-900 dark:text-white">
              {formatAmount(loanAmount)} {monthlyEmi ? `• EMI ₹${monthlyEmi.toLocaleString("en-IN")}/mo` : ""}
            </div>
          </div>

          {/* STAGE 1: ENTER NAME, MOBILE & EMAIL */}
          {step === "DETAILS" && (
            <form onSubmit={handleSendOtp} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Aapka Naam (Full Name) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  WhatsApp Mobile Number *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-slate-500">
                    <Phone className="w-3.5 h-3.5 text-slate-400 mr-0.5" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-14 pr-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold tracking-wider"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address (for instant OTP verification) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-bold bg-red-50 dark:bg-red-950/50 p-2 rounded-lg border border-red-200 dark:border-red-900">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white font-extrabold py-2.5 px-4 rounded-xl shadow-md active:scale-95 transition-all text-xs sm:text-sm cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Email OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Verification Code (OTP)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400 mt-2">
                🔒 100% Confidential • Instant Direct 50+ Bank Underwriting
              </p>
            </form>
          )}

          {/* STAGE 2: ENTER OTP */}
          {step === "OTP" && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 text-xs">
                <p className="text-emerald-800 dark:text-emerald-300 font-medium">
                  Verification code has been sent to: <strong>{email}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => { setStep("DETAILS"); setError(""); }}
                  className="text-emerald-600 dark:text-emerald-400 font-bold underline mt-1 text-[11px] block"
                >
                  Change Email Address
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 text-center">
                  Enter 6-Digit Email OTP
                </label>
                <div className="relative max-w-xs mx-auto">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    placeholder="• • • • • •"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-center text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-[0.3em] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-bold bg-red-50 dark:bg-red-950/50 p-2 rounded-lg border border-red-200 dark:border-red-900">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Didn't receive email?</span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend || loading}
                  className={`font-bold flex items-center gap-1 ${
                    canResend
                      ? "text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      : "text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] disabled:opacity-50 text-white font-extrabold py-2.5 px-4 rounded-xl shadow-md active:scale-95 transition-all text-xs sm:text-sm cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify & Unlock Calculation</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STAGE 3: VERIFIED CELEBRATION */}
          {step === "VERIFIED" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-3"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                Email Verified Successfully!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                Shukriya <strong>{name}</strong>! Aapka loan simulation data hamare CRM me successfully sync ho gaya hai aur details aapke WhatsApp par bhej di gayi hain.
              </p>
              <div className="inline-block bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
                ✓ Full Amortization & Bank Offers Unlocked
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
