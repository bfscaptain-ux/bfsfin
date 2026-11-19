"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Wallet, Home } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedToolLogo from "../AnimatedToolLogo";
import CalculatorHuman2D, { CalculatorBgAmbient2D } from "../illustrations/CalculatorHuman2D";

export default function AffordabilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [existingEmi, setExistingEmi] = useState(15000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  // FOIR (Fixed Obligation to Income Ratio) rule of thumb: max 50-60% of income goes to EMIs.
  // We'll use 55% as a standard benchmark.
  const foir = 0.55;
  
  const maxTotalEmiCapacity = monthlyIncome * foir;
  const maxHomeLoanEmi = Math.max(0, maxTotalEmiCapacity - existingEmi);

  const monthlyRate = interestRate / 12 / 100;
  const months = tenure * 12;

  // Reverse EMI formula to find Principal: P = E * ((1 + r)^n - 1) / (r * (1 + r)^n)
  const maxLoanAmount = useMemo(() => {
    if (maxHomeLoanEmi <= 0) return 0;
    return Math.round(
      (maxHomeLoanEmi * (Math.pow(1 + monthlyRate, months) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, months))
    );
  }, [maxHomeLoanEmi, monthlyRate, months]);

  const maxPropertyBudget = maxLoanAmount + downPayment;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-emerald-900/90 border border-slate-200 dark:border-emerald-500/30 rounded-2xl p-4 sm:p-6 shadow-md dark:shadow-emerald-900/20 backdrop-blur-xl transition-colors duration-300 relative overflow-hidden"
    >
      <AnimatedToolLogo />
      {/* Subtle Financial Ambient Watermark */}
      <div className="absolute -bottom-8 -right-8 w-60 h-44 pointer-events-none select-none opacity-15 dark:opacity-10 z-0">
        <CalculatorBgAmbient2D className="w-full h-full object-contain" />
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-emerald-800 gap-2 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Affordability Calculator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Find out your maximum property budget (Kitna loan mil sakta hai)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Monthly Income */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Gross Monthly Income</span>
              <motion.span
                key={monthlyIncome}
                initial={{ scale: 1.1, color: "#10b981" }}
                animate={{ scale: 1, color: "var(--tw-colors-emerald-500)" }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-md"
              >
                ₹{(monthlyIncome / 1000).toFixed(0)}k
              </motion.span>
            </div>
            <div className="flex gap-3 items-center w-full">
              <input
                type="range"
                min={25000}
                max={1000000}
                step={5000}
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-20 px-2 py-1 bg-emerald-50 border border-emerald-200 dark:bg-slate-800 dark:border-slate-700 rounded-md text-xs font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Down Payment */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Available Down Payment</span>
              <motion.span
                key={downPayment}
                initial={{ scale: 1.1, color: "#10b981" }}
                animate={{ scale: 1, color: "var(--tw-colors-emerald-500)" }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-md"
              >
                ₹{(downPayment / 100000).toFixed(1)} Lakhs
              </motion.span>
            </div>
            <div className="flex gap-3 items-center w-full">
              <input
                type="range"
                min={100000}
                max={100000000}
                step={100000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-20 px-2 py-1 bg-emerald-50 border border-emerald-200 dark:bg-slate-800 dark:border-slate-700 rounded-md text-xs font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Existing EMI */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Existing EMIs (Monthly)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-xs">₹</span>
                <input
                  type="number"
                  value={existingEmi || ""}
                  onChange={(e) => setExistingEmi(Number(e.target.value))}
                  placeholder="0"
                  className="w-full bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-lg pl-6 pr-3 py-1.5 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Expected Rate</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{interestRate.toFixed(2)}%</span>
              </div>
              <div className="flex gap-2 items-center w-full">
                <input
                  type="range"
                  min={6.0}
                  max={12.0}
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-16 px-1.5 py-1 bg-emerald-50 border border-emerald-200 dark:bg-slate-800 dark:border-slate-700 rounded-md text-xs font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-md text-white relative overflow-hidden h-full">
            <div className="space-y-4 relative z-10 flex-1">
              <div className="flex items-center gap-1.5 font-bold text-xs tracking-wide text-emerald-100">
                <Wallet className="w-4 h-4" /> Your Maximum Budget
              </div>

              <div>
                <motion.div
                  key={maxPropertyBudget}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-3xl sm:text-4xl font-black tracking-tight"
                >
                  ₹{maxPropertyBudget > 0 ? (maxPropertyBudget / 100000).toFixed(2) : 0} <span className="text-xl font-bold text-white/80">Lakhs</span>
                </motion.div>
                <p className="text-emerald-100 mt-1 text-xs font-medium">
                  Total property value you can easily afford.
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-white/20 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-white/90">
                  <span>Eligible Home Loan:</span>
                  <span className="font-bold text-white">₹{maxLoanAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-white/90">
                  <span>Estimated Monthly EMI:</span>
                  <span className="font-bold text-emerald-100">₹{Math.round(maxHomeLoanEmi).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 relative z-10">
              <Link
                href="/apply"
                className="w-full flex items-center justify-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 font-bold py-2.5 rounded-xl shadow-xs transition-colors text-xs"
              >
                <span>Get Pre-Approved</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
