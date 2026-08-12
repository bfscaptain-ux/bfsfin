"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, FastForward, Clock } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedToolLogo from "../AnimatedToolLogo";

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
      className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl dark:shadow-emerald-900/20 backdrop-blur-xl transition-colors duration-300 relative overflow-hidden"
    >
      <AnimatedToolLogo />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
            <FastForward className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Prepayment Calculator
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              See how part-payments reduce your tenure and save interest
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
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
            <input
              type="range"
              min={500000}
              max={20000000}
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
                className="text-blue-600 dark:text-blue-400 font-extrabold text-xl bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-lg"
              >
                {interestRate.toFixed(2)}%
              </motion.span>
            </div>
            <input
              type="range"
              min={6.0}
              max={15.0}
              step={0.05}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-all hover:h-4"
            />
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
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={remainingTenure}
              onChange={(e) => setRemainingTenure(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all hover:h-4"
            />
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
            <input
              type="range"
              min={10000}
              max={outstandingAmount}
              step={10000}
              value={prepaymentAmount}
              onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
              className="w-full h-2 bg-emerald-200 dark:bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden h-full group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-emerald-500/20" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wide">
                <Clock className="w-5 h-5" /> Time & Money Saved
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Interest Saved</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                    ₹{results.interestSaved > 0 ? (results.interestSaved / 100000).toFixed(2) : 0}<span className="text-sm">L</span>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Time Saved</div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                    {Math.floor(results.monthsSaved / 12)}<span className="text-sm">Y</span> {results.monthsSaved % 12}<span className="text-sm">M</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800/60 text-sm">
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span>Current EMI (Unchanged):</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹{currentEmi.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span>New Tenure:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {Math.floor(results.newMonths / 12)} Years {results.newMonths % 12} Months
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/apply"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all"
              >
                <span>Save on your Loan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
