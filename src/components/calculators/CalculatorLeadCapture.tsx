"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, CheckCircle2, ShieldCheck, ArrowRight, X, Sparkles, User, Phone, Loader2 } from "lucide-react";
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
function formatAmount(num: number): string {
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
async function submitCalculatorLead(payload: {
  name: string;
  phone: string;
  toolName: string;
  loanAmount: number;
  monthlyEmi?: number;
  interestRate?: number;
  tenureYears?: number;
  customSummary?: string;
}) {
  const cleanPhone = payload.phone.replace(/[^0-9]/g, "").slice(-10);
  const emiText = payload.monthlyEmi ? ` | Calculated EMI: ₹${payload.monthlyEmi.toLocaleString("en-IN")}/mo` : "";
  const rateText = payload.interestRate ? ` | Rate: ${payload.interestRate}%` : "";
  const tenureText = payload.tenureYears ? ` | Term: ${payload.tenureYears} Yrs` : "";
  const summaryText = payload.customSummary ? ` | ${payload.customSummary}` : "";

  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name.trim(),
      phone: cleanPhone,
      loanAmount: payload.loanAmount,
      loanType: `${payload.toolName || "Home Loan Calculator"}`,
      productType: "Finance",
      subType: "Home Loan",
      formType: "Calculator Lead",
      source: `Website Tool (${payload.toolName || "Calculator"})`,
      city: "Agra",
      message: `User simulated ${payload.toolName || "Loan"} of ${formatAmount(payload.loanAmount)}${emiText}${rateText}${tenureText}${summaryText}. Customer requested instant WhatsApp sanction offers.`,
      consentTimestamp: new Date().toISOString()
    })
  });

  return res.json();
}

/**
 * 1. Inline Quick Lead Strip (Embeds directly inside calculator card)
 */
export function CalculatorLeadStrip({
  toolName = "Home Loan EMI Calculator",
  loanAmount,
  monthlyEmi,
  interestRate,
  tenureYears,
  customSummary,
  onSuccess
}: CalculatorLeadProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Check if previously submitted in this browser session
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bfs_calculator_lead");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) setName(parsed.name);
        if (parsed?.phone) setPhone(parsed.phone);
      }
    } catch (e) {}
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanName = name.trim();
    const cleanPhone = phone.replace(/[^0-9]/g, "").slice(-10);

    if (cleanName.length < 2) {
      setError("Kripya apna poora naam enter karein.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError("Kripya 10-digit ka valid WhatsApp mobile number enter karein.");
      return;
    }

    setLoading(true);
    try {
      await submitCalculatorLead({
        name: cleanName,
        phone: cleanPhone,
        toolName,
        loanAmount,
        monthlyEmi,
        interestRate,
        tenureYears,
        customSummary
      });

      try {
        localStorage.setItem("bfs_calculator_lead", JSON.stringify({ name: cleanName, phone: cleanPhone, submittedAt: Date.now() }));
      } catch (err) {}

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Server se connect nahi ho paya. Kripya punah prayas karein.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/80 text-emerald-900 dark:text-emerald-100 flex items-start gap-3 shadow-xs"
      >
        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-extrabold text-sm text-emerald-800 dark:text-emerald-300">
            Shukriya {name}! Loan details aapke WhatsApp par bhej di gayi hain.
          </p>
          <p className="text-emerald-700 dark:text-emerald-300/80">
            Hamare WhatsApp CRM se aapke number <strong>+91 {phone.slice(-10)}</strong> par message bhej diya gaya hai. Hamare Senior Loan Officer aapse turant connect karenge.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/90 dark:via-teal-950/80 dark:to-emerald-950/90 border border-emerald-200 dark:border-emerald-800/80 shadow-xs relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#25D366] text-white shadow-xs">
            <MessageCircle className="w-3.5 h-3.5" />
          </span>
          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
            Kya aapko is loan ki need hai? <span className="text-emerald-600 dark:text-emerald-400 font-bold">WhatsApp par Offer paayein</span>
          </h4>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-700 self-start sm:self-auto">
          {formatAmount(loanAmount)} {monthlyEmi ? `• EMI ₹${monthlyEmi.toLocaleString("en-IN")}/mo` : ""}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
        {/* Name Input */}
        <div className="sm:col-span-4 relative">
          <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            placeholder="Aapka Naam (Full Name)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-emerald-800 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
          />
        </div>

        {/* Mobile Input */}
        <div className="sm:col-span-5 relative">
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <span>+91</span>
          </div>
          <input
            type="tel"
            required
            maxLength={10}
            placeholder="WhatsApp Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-emerald-800 rounded-lg pl-10 pr-2.5 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold tracking-wider"
          />
        </div>

        {/* Submit CTA */}
        <div className="sm:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] disabled:bg-slate-400 text-white font-extrabold py-1.5 px-3 rounded-lg shadow-sm active:scale-95 transition-all text-xs cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <>
                <span>Get Offer</span>
                <ArrowRight className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <p className="text-[11px] font-bold text-red-600 dark:text-red-400 mt-1.5">{error}</p>
      )}

      <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-600" /> 100% Confidential • Direct 50+ Bank Underwriting
        </span>
        <span className="text-emerald-700 dark:text-emerald-300 font-semibold">Special BFS Rate 7.15%*</span>
      </div>
    </div>
  );
}

/**
 * 2. High-Converting Popup Modal for WhatsApp Delivery
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
  title = "Unlock Best Bank Offers on WhatsApp",
  subtitle
}: CalculatorLeadProps & {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bfs_calculator_lead");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) setName(parsed.name);
        if (parsed?.phone) setPhone(parsed.phone);
      }
    } catch (e) {}
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanName = name.trim();
    const cleanPhone = phone.replace(/[^0-9]/g, "").slice(-10);

    if (cleanName.length < 2) {
      setError("Kripya apna poora naam enter karein.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError("Kripya 10-digit ka valid WhatsApp mobile number enter karein.");
      return;
    }

    setLoading(true);
    try {
      await submitCalculatorLead({
        name: cleanName,
        phone: cleanPhone,
        toolName,
        loanAmount,
        monthlyEmi,
        interestRate,
        tenureYears,
        customSummary
      });

      try {
        localStorage.setItem("bfs_calculator_lead", JSON.stringify({ name: cleanName, phone: cleanPhone, submittedAt: Date.now() }));
      } catch (err) {}

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 3500);
    } catch (err) {
      setError("Server se connect nahi ho paya. Kripya punah prayas karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans print:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-2xl p-5 sm:p-6 w-full max-w-md shadow-2xl relative overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/60 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Message Sent to WhatsApp!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs mx-auto">
                Shukriya <strong>{name}</strong>! Aapke WhatsApp number <strong>+91 {phone.slice(-10)}</strong> par confirmation bhej diya gaya hai.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {title}
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    {subtitle || "Kya aapko is loan ki need hai? Hamare direct desk se baat karein."}
                  </p>
                </div>
              </div>

              {/* Calculated Loan Summary Badge */}
              <div className="bg-emerald-50 dark:bg-emerald-900/40 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/60 my-3 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold uppercase">Calculated Loan</span>
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">{formatAmount(loanAmount)}</span>
                </div>
                {monthlyEmi && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold uppercase">Estimated EMI</span>
                    <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">₹{monthlyEmi.toLocaleString("en-IN")}/mo</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 mt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Aapka Poora Naam (Full Name) *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-emerald-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    WhatsApp Mobile Number *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-slate-500">
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="98XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-emerald-800 rounded-xl pl-12 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold tracking-wider"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs font-bold text-red-600 dark:text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] disabled:bg-slate-400 text-white font-extrabold py-2.5 rounded-xl shadow-md active:scale-95 transition-all text-xs cursor-pointer mt-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Par Offers Payein</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-3 text-center text-[10px] text-slate-400">
                <span>🔒 100% Privacy Protected • Direct Multi-Bank Underwriting</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
