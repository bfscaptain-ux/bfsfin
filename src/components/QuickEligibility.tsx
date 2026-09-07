"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, TrendingUp, Sparkles, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedToolLogo from "./AnimatedToolLogo";

export default function QuickEligibility({ homeLoanRate, selfEmployedRate }: { homeLoanRate?: string, selfEmployedRate?: string }) {
  const [empType, setEmpType] = useState<"salaried" | "self-employed">("salaried");
  const [annualIncome, setAnnualIncome] = useState(1500000); // ₹15L default
  const [age, setAge] = useState(32);
  const [existingEmi, setExistingEmi] = useState(0);

  // FOIR (Fixed Obligation to Income Ratio): ~50-60% of monthly income
  const monthlyIncome = annualIncome / 12;
  const maxMonthlyEmiCapacity = Math.max(0, monthlyIncome * 0.55 - existingEmi);
  
  // Approx loan eligible based on 7.15% for 20-30 years (EMI ~ ₹675-₹746 per Lakh)
  const eligibleLoanLakhs = useMemo(() => {
    return Math.round((maxMonthlyEmiCapacity / 715) * 10) / 10;
  }, [maxMonthlyEmiCapacity]);

  const recommendedPool = empType === "salaried" 
    ? "BFS Prime Salaried Pool (Grade A+)" 
    : "BFS MSME & Business Growth Pool";

  const incomePresets = [
    { label: "₹5L", value: 500000 },
    { label: "₹10L", value: 1000000 },
    { label: "₹15L", value: 1500000 },
    { label: "₹25L", value: 2500000 },
    { label: "₹50L", value: 5000000 },
    { label: "₹1Cr", value: 10000000 },
  ];

  const agePresets = [25, 30, 35, 42, 50];
  const emiPresets = [
    { label: "₹0 (None)", value: 0 },
    { label: "₹10k", value: 10000 },
    { label: "₹25k", value: 25000 },
    { label: "₹50k", value: 50000 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-emerald-950/80 border border-slate-200 dark:border-emerald-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 shadow-xl backdrop-blur-xl transition-colors duration-300 relative overflow-hidden"
    >
      {/* Watermark logo hidden on small mobile to avoid header collision */}
      <div className="hidden sm:block">
        <AnimatedToolLogo />
      </div>

      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-8 border-b border-slate-100 dark:border-emerald-800/60 pb-4 sm:pb-6">
        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest font-black text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700 shadow-sm">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          2-Minute Instant Calculator
        </span>
        <h3 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2.5 sm:mt-3 tracking-tight">
          Check Home Loan Eligibility
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl mx-auto leading-relaxed">
          Instant bank-grade assessment with customized tenure and maximum sanction power across India.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* LEFT COLUMN: User Inputs */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          
          {/* 1. Employment Category */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
              Employment Category
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setEmpType("salaried")}
                className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 ${
                  empType === "salaried"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md font-black"
                    : "bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400"
                }`}
              >
                {empType === "salaried" && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                <span>Salaried Employee</span>
              </button>
              <button
                type="button"
                onClick={() => setEmpType("self-employed")}
                className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 ${
                  empType === "self-employed"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md font-black"
                    : "bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400"
                }`}
              >
                {empType === "self-employed" && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                <span>Self-Employed / Business</span>
              </button>
            </div>
          </div>

          {/* 2. Annual Income (With Quick Tap Preset Chips) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Annual Gross Income
                <span className="text-[10px] sm:text-xs font-normal text-slate-500 dark:text-slate-400 ml-1">
                  (ITR / Salary)
                </span>
              </label>
              <span className="text-emerald-700 dark:text-emerald-300 font-black text-xs sm:text-sm bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-lg whitespace-nowrap shadow-sm">
                ₹{(annualIncome / 100000).toFixed(1)} Lakh/yr
              </span>
            </div>

            {/* Full-width Touch Slider */}
            <input
              type="range"
              min={300000}
              max={10000000}
              step={50000}
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full h-2.5 sm:h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-500 transition-all"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
              <span>Min ₹3 Lakh</span>
              <span>₹1 Crore+</span>
            </div>

            {/* Quick Tap Chips for Mobile Speed */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
              <span className="text-[10px] font-semibold text-slate-400 shrink-0">Quick:</span>
              {incomePresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setAnnualIncome(preset.value)}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    annualIncome === preset.value
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 border border-slate-200/80 dark:border-slate-700"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Applicant Age (With Quick Tap Chips) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Applicant Age
              </label>
              <span className="text-emerald-700 dark:text-emerald-300 font-black text-xs sm:text-sm bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-lg whitespace-nowrap shadow-sm">
                {age} Years
              </span>
            </div>

            {/* Full-width Touch Slider */}
            <input
              type="range"
              min={21}
              max={65}
              step={1}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-2.5 sm:h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-500 transition-all"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
              <span>21 Yrs</span>
              <span>65 Yrs</span>
            </div>

            {/* Quick Age Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
              <span className="text-[10px] font-semibold text-slate-400 shrink-0">Quick:</span>
              {agePresets.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAge(a)}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    age === a
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 border border-slate-200/80 dark:border-slate-700"
                  }`}
                >
                  {a} Yrs
                </button>
              ))}
            </div>
          </div>

          {/* 4. Existing Monthly EMIs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Existing Monthly EMIs
                <span className="text-[10px] sm:text-xs font-normal text-slate-500 dark:text-slate-400 ml-1">
                  (Car/Personal/Card Loans)
                </span>
              </label>
              <span className="text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm">
                ₹{existingEmi.toLocaleString("en-IN")}/mo
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                value={existingEmi || ""}
                onChange={(e) => setExistingEmi(Math.max(0, Number(e.target.value)))}
                placeholder="Enter existing EMI (or 0 if none)"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>

            {/* Quick EMI Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
              <span className="text-[10px] font-semibold text-slate-400 shrink-0">Quick:</span>
              {emiPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setExistingEmi(preset.value)}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    existingEmi === preset.value
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 border border-slate-200/80 dark:border-slate-700"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-emerald-50/40 dark:from-slate-900 dark:to-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 rounded-2xl p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between shadow-md">
          
          <div className="space-y-4">
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Sanction Assessment
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                Rate from {homeLoanRate || "7.15"}%*
              </span>
            </div>

            {/* Main Loan Amount Display */}
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Maximum Eligible Loan
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mt-1">
                ₹{eligibleLoanLakhs.toFixed(1)}{" "}
                <span className="text-emerald-600 dark:text-emerald-400 text-2xl sm:text-3xl">
                  Lakhs
                </span>
              </div>
            </div>

            {/* 3 Metric Rows */}
            <div className="space-y-2.5 pt-3 border-t border-slate-200/80 dark:border-emerald-800/60 text-xs sm:text-sm">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span>Monthly EMI Capacity:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">
                  ₹{Math.round(maxMonthlyEmiCapacity).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span>Max Tenure Horizon:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">
                  {Math.min(30, 65 - age)} Years
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span>BFS Underwriting Pool:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 truncate max-w-[190px] text-right">
                  {recommendedPool}
                </span>
              </div>
            </div>

            {/* Guarantee Note */}
            <div className="p-3 bg-white/80 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 rounded-xl text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-snug">
                Official in-principle sanction letter issued within 5 business days upon digital document upload.
              </span>
            </div>
          </div>

          {/* Action CTA with ample margin so it doesn't get obscured on mobile */}
          <div className="pt-4 sm:pt-6 mb-2 sm:mb-0">
            <Link
              href="/apply"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition-all text-sm sm:text-base text-center"
            >
              <span>Apply For ₹{eligibleLoanLakhs.toFixed(1)}L Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
