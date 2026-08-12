"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Wallet, Home } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedToolLogo from "../AnimatedToolLogo";

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
      className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl dark:shadow-emerald-900/20 backdrop-blur-xl transition-colors duration-300 relative overflow-hidden"
    >
      <AnimatedToolLogo />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
            <Home className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Affordability Calculator
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Find out your maximum property budget (Kitna loan mil sakta hai)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Monthly Income */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Gross Monthly Income</span>
              <motion.span
                key={monthlyIncome}
                initial={{ scale: 1.1, color: "#10b981" }}
                animate={{ scale: 1, color: "var(--tw-colors-emerald-500)" }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
              >
                ₹{(monthlyIncome / 1000).toFixed(0)}k
              </motion.span>
            </div>
            <input
              type="range"
              min={25000}
              max={1000000}
              step={5000}
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all hover:h-4"
            />
          </div>

          {/* Down Payment */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Available Down Payment</span>
              <motion.span
                key={downPayment}
                initial={{ scale: 1.1, color: "#10b981" }}
                animate={{ scale: 1, color: "var(--tw-colors-emerald-500)" }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
              >
                ₹{(downPayment / 100000).toFixed(1)} Lakhs
              </motion.span>
            </div>
            <input
              type="range"
              min={100000}
              max={20000000}
              step={100000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all hover:h-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Existing EMI */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Existing EMIs (Monthly)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₹</span>
                <input
                  type="number"
                  value={existingEmi || ""}
                  onChange={(e) => setExistingEmi(Number(e.target.value))}
                  placeholder="0"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-8 pr-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Expected Rate</span>
                <span className="text-blue-600 dark:text-blue-400 font-extrabold">{interestRate.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min={6.0}
                max={12.0}
                step={0.05}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl p-6 sm:p-8 flex flex-col shadow-lg text-white relative overflow-hidden h-full group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:bg-white/20 transition-all duration-500" />

            <div className="space-y-6 relative z-10 flex-1">
              <div className="flex items-center gap-2 font-bold text-sm tracking-wide text-blue-100">
                <Wallet className="w-5 h-5" /> Your Maximum Budget
              </div>

              <div>
                <motion.div
                  key={maxPropertyBudget}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-4xl sm:text-5xl font-black tracking-tight"
                >
                  ₹{maxPropertyBudget > 0 ? (maxPropertyBudget / 100000).toFixed(2) : 0} <span className="text-2xl font-bold text-white/80">Lakhs</span>
                </motion.div>
                <p className="text-blue-100 mt-2 text-sm font-medium">
                  Total property value you can easily afford.
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/20 text-sm">
                <div className="flex justify-between items-center text-white/90">
                  <span>Eligible Home Loan:</span>
                  <span className="font-bold text-lg text-white">₹{maxLoanAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-white/90">
                  <span>Estimated Monthly EMI:</span>
                  <span className="font-bold text-emerald-100">₹{Math.round(maxHomeLoanEmi).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/apply"
                className="w-full flex items-center justify-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 font-bold py-3.5 rounded-xl shadow-md transition-colors"
              >
                <span>Get Pre-Approved</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
