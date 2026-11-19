"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, PiggyBank, Scale } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedToolLogo from "../AnimatedToolLogo";
import { CalculatorLeadStrip } from "./CalculatorLeadCapture";

export default function InterestRateCompare() {
  const [loanAmount, setLoanAmount] = useState(3500000);
  const [tenure, setTenure] = useState(20);
  const [rate1, setRate1] = useState(8.5);
  const [rate2, setRate2] = useState(6.5);

  const calculateEMI = (amount: number, rate: number, years: number) => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    return Math.round(
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  const emi1 = useMemo(() => calculateEMI(loanAmount, rate1, tenure), [loanAmount, rate1, tenure]);
  const emi2 = useMemo(() => calculateEMI(loanAmount, rate2, tenure), [loanAmount, rate2, tenure]);

  const totalInterest1 = emi1 * tenure * 12 - loanAmount;
  const totalInterest2 = emi2 * tenure * 12 - loanAmount;

  const totalSavings = totalInterest1 - totalInterest2;
  const emiSavings = emi1 - emi2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-emerald-900/90 border border-slate-200 dark:border-emerald-500/30 rounded-2xl p-4 sm:p-6 shadow-md dark:shadow-emerald-900/20 backdrop-blur-xl transition-colors duration-300 relative overflow-hidden"
    >
      <AnimatedToolLogo />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-emerald-800 gap-2 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Interest Rate Comparison Tool
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              See how much you save with a lower interest rate
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Loan Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Loan Amount</span>
              <motion.span
                key={loanAmount}
                initial={{ scale: 1.1, color: "#10b981" }}
                animate={{ scale: 1, color: "var(--tw-colors-emerald-500)" }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-md"
              >
                ₹{(loanAmount / 100000).toFixed(1)} Lakhs
              </motion.span>
            </div>
            <input
              type="range"
              min={500000}
              max={20000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Loan Tenure</span>
              <motion.span
                key={tenure}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-md"
              >
                {tenure} Years
              </motion.span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Rate 1 */}
            <div className="space-y-2 p-3 bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 rounded-xl">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500 dark:text-slate-400">Bank 1 Rate</span>
                <span className="text-slate-900 dark:text-slate-100 font-extrabold text-sm">{rate1.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min={6.0}
                max={15.0}
                step={0.05}
                value={rate1}
                onChange={(e) => setRate1(Number(e.target.value))}
                className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-500"
              />
            </div>

            {/* Rate 2 */}
            <div className="space-y-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-emerald-600 dark:text-emerald-400">Bank 2 Rate</span>
                <span className="text-emerald-700 dark:text-emerald-300 font-extrabold text-sm">{rate2.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min={6.0}
                max={15.0}
                step={0.05}
                value={rate2}
                onChange={(e) => setRate2(Number(e.target.value))}
                className="w-full h-2 bg-emerald-200 dark:bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-4 sm:p-5 flex flex-col shadow-md text-white relative overflow-hidden h-full">
            <div className="space-y-4 relative z-10 flex-1">
              <div className="flex items-center gap-1.5 font-bold text-xs tracking-wide text-emerald-100">
                <PiggyBank className="w-4 h-4" /> Your Total Savings
              </div>

              <div>
                <motion.div
                  key={totalSavings}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-3xl sm:text-4xl font-black tracking-tight"
                >
                  ₹{totalSavings > 0 ? totalSavings.toLocaleString("en-IN") : "0"}
                </motion.div>
                {totalSavings > 0 && (
                  <p className="text-emerald-100 mt-1 text-xs font-medium">
                    You save <span className="font-bold text-white">₹{emiSavings.toLocaleString("en-IN")}</span> every month!
                  </p>
                )}
                {totalSavings <= 0 && (
                  <p className="text-white/80 mt-1 text-xs font-medium">
                    Bank 1 is offering a better or equal rate.
                  </p>
                )}
              </div>

              <div className="space-y-2 pt-3 border-t border-white/20 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-white/90">
                  <span>Bank 1 EMI:</span>
                  <span className="font-bold">₹{emi1.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-white/90">
                  <span>Bank 2 EMI:</span>
                  <span className="font-bold">₹{emi2.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-white/90 pt-1.5 border-t border-white/10">
                  <span>Bank 1 Total Interest:</span>
                  <span className="font-bold">₹{totalInterest1.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-white/90">
                  <span>Bank 2 Total Interest:</span>
                  <span className="font-bold">₹{totalInterest2.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 relative z-10">
              <Link
                href="/apply"
                className="w-full flex items-center justify-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 font-bold py-2.5 rounded-xl shadow-xs transition-colors text-xs"
              >
                <span>Apply for Lowest Rate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Lead Capture */}
      <CalculatorLeadStrip
        toolName="Interest Rate Compare"
        loanAmount={loanAmount}
        monthlyEmi={emi2}
        interestRate={rate2}
        tenureYears={tenure}
        customSummary={`Rate Comparison: ${rate1}% (EMI ₹${emi1.toLocaleString("en-IN")}) vs ${rate2}% (EMI ₹${emi2.toLocaleString("en-IN")}) | Savings: ₹${totalSavings.toLocaleString("en-IN")}`}
      />
    </motion.div>
  );
}
