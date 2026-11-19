"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, FastForward, Clock } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedToolLogo from "../AnimatedToolLogo";
import CalculatorHuman2D, { CalculatorBgAmbient2D } from "../illustrations/CalculatorHuman2D";
import { CalculatorLeadStrip } from "./CalculatorLeadCapture";

export default function PrepaymentCalculator() {
  const [outstandingAmount, setOutstandingAmount] = useState(3000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [remainingTenure, setRemainingTenure] = useState(15);
  const [prepaymentAmount, setPrepaymentAmount] = useState(500000);

  const monthlyRate = interestRate / 12 / 100;
  const originalMonths = remainingTenure * 12;

  // Calculate current EMI
  const currentEmi = useMemo(() => {
    return Math.round(
      (outstandingAmount * monthlyRate * Math.pow(1 + monthlyRate, originalMonths)) /
        (Math.pow(1 + monthlyRate, originalMonths) - 1)
    );
  }, [outstandingAmount, monthlyRate, originalMonths]);

  const originalTotalInterest = (currentEmi * originalMonths) - outstandingAmount;

  // Calculate new tenure after prepayment, assuming same EMI
  const newOutstanding = Math.max(0, outstandingAmount - prepaymentAmount);
  
  const results = useMemo(() => {
    if (newOutstanding <= 0) {
        return { newMonths: 0, newTotalInterest: 0, interestSaved: originalTotalInterest, monthsSaved: originalMonths };
    }
    
    // Formula for N = -log(1 - (r * P) / E) / log(1 + r)
    // If (r * P) >= E, loan will never be paid off (but here P is always smaller since it's a prepayment)
    const ratio = (monthlyRate * newOutstanding) / currentEmi;
    
    if (ratio >= 1) {
        return { newMonths: originalMonths, newTotalInterest: originalTotalInterest, interestSaved: 0, monthsSaved: 0 };
    }
    
    const newMonthsExact = -Math.log(1 - ratio) / Math.log(1 + monthlyRate);
    const newMonths = Math.ceil(newMonthsExact);
    
    const newTotalPayment = (currentEmi * newMonths);
    const newTotalInterest = newTotalPayment - newOutstanding;
    
    const interestSaved = originalTotalInterest - newTotalInterest;
    const monthsSaved = originalMonths - newMonths;

    return { newMonths, newTotalInterest, interestSaved, monthsSaved };
  }, [newOutstanding, currentEmi, monthlyRate, originalTotalInterest, originalMonths]);

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
            <FastForward className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Prepayment Calculator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              See how part-payments reduce your tenure and save interest
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Outstanding Amount */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Outstanding Loan Amount</span>
              <motion.span
                key={outstandingAmount}
                initial={{ scale: 1.1, color: "#10b981" }}
                animate={{ scale: 1, color: "var(--tw-colors-emerald-500)" }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
              >
                ₹{(outstandingAmount / 100000).toFixed(1)} Lakhs
              </motion.span>
            </div>
            <div className="flex gap-4 items-center w-full">
              <input
              type="range"
              min={500000}
              max={1000000000}
              step={100000}
              value={outstandingAmount}
              onChange={(e) => {
                setOutstandingAmount(Number(e.target.value));
                if (prepaymentAmount > Number(e.target.value)) setPrepaymentAmount(Number(e.target.value));
              }}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all hover:h-4"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Interest Rate (% p.a.)</span>
              <motion.span
                key={interestRate}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
              >
                {interestRate.toFixed(2)}%
              </motion.span>
            </div>
            <input
              type="range"
              min={6.0}
              max={40}
              step={0.05}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-all hover:h-4"
            />
              <input
                type="number"
                value={outstandingAmount}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-emerald-50 border border-emerald-200 dark:bg-slate-800 dark:border-slate-700 rounded-lg text-sm font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Remaining Tenure */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Remaining Tenure</span>
              <motion.span
                key={remainingTenure}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
              >
                {remainingTenure} Years
              </motion.span>
            </div>
            <div className="flex gap-4 items-center w-full">
              <input
              type="range"
              min={1}
              max={40}
              step={1}
              value={remainingTenure}
              onChange={(e) => setRemainingTenure(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all hover:h-4"
            />
              <input
                type="number"
                value={remainingTenure}
                onChange={(e) => setRemainingTenure(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-emerald-50 border border-emerald-200 dark:bg-slate-800 dark:border-slate-700 rounded-lg text-sm font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Prepayment Amount */}
          <div className="space-y-3 p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-emerald-800 dark:text-emerald-400">Prepayment Amount</span>
              <motion.span
                key={prepaymentAmount}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-emerald-700 dark:text-emerald-300 font-black text-xl"
              >
                ₹{prepaymentAmount.toLocaleString("en-IN")}
              </motion.span>
            </div>
            <div className="flex gap-4 items-center w-full">
              <input
              type="range"
              min={10000}
              max={outstandingAmount}
              step={10000}
              value={prepaymentAmount}
              onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
              className="w-full h-2 bg-emerald-200 dark:bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
              <input
                type="number"
                value={prepaymentAmount}
                onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-emerald-50 border border-emerald-200 dark:bg-slate-800 dark:border-slate-700 rounded-lg text-sm font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs relative overflow-hidden h-full">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs tracking-wide">
                <Clock className="w-4 h-4" /> Time & Money Saved
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-emerald-900 p-3 rounded-xl border border-slate-100 dark:border-emerald-800 shadow-xs">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-0.5">Interest Saved</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    ₹{results.interestSaved > 0 ? (results.interestSaved / 100000).toFixed(2) : 0}<span className="text-xs">L</span>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-emerald-900 p-3 rounded-xl border border-slate-100 dark:border-emerald-800 shadow-xs">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-0.5">Time Saved</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {Math.floor(results.monthsSaved / 12)}<span className="text-xs">Y</span> {results.monthsSaved % 12}<span className="text-xs">M</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-emerald-800/60 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span>Current EMI:</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹{currentEmi.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span>New Tenure:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {Math.floor(results.newMonths / 12)} Yrs {results.newMonths % 12} Mos
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 relative z-10">
              <Link
                href="/apply"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl shadow-xs transition-all text-xs"
              >
                <span>Save on your Loan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Lead Capture */}
      <CalculatorLeadStrip
        toolName="Home Loan Prepayment Calculator"
        loanAmount={outstandingAmount}
        monthlyEmi={currentEmi}
        interestRate={interestRate}
        tenureYears={remainingTenure}
        customSummary={`Prepayment: ₹${prepaymentAmount.toLocaleString("en-IN")} | Total Interest Saved: ₹${results.interestSaved.toLocaleString("en-IN")}`}
      />
    </motion.div>
  );
}
