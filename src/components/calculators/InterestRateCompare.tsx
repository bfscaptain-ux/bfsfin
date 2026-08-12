"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, PiggyBank, Scale } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedToolLogo from "../AnimatedToolLogo";

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
      className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl dark:shadow-emerald-900/20 backdrop-blur-xl transition-colors duration-300 relative overflow-hidden"
    >
      <AnimatedToolLogo />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
            <Scale className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Interest Rate Comparison Tool
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              See how much you save with a lower interest rate
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Loan Amount */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Loan Amount</span>
              <motion.span
                key={loanAmount}
                initial={{ scale: 1.1, color: "#10b981" }}
                animate={{ scale: 1, color: "var(--tw-colors-emerald-500)" }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
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
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all hover:h-4"
            />
          </div>

          {/* Tenure */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Loan Tenure</span>
              <motion.span
                key={tenure}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
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
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all hover:h-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Rate 1 */}
            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-500 dark:text-slate-400">Bank 1 Rate</span>
                <span className="text-slate-900 dark:text-slate-100 font-extrabold text-lg">{rate1.toFixed(2)}%</span>
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
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-2xl">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-blue-600 dark:text-blue-400">Bank 2 Rate</span>
                <span className="text-blue-700 dark:text-blue-300 font-extrabold text-lg">{rate2.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min={6.0}
                max={15.0}
                step={0.05}
                value={rate2}
                onChange={(e) => setRate2(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 dark:bg-blue-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl p-6 sm:p-8 flex flex-col shadow-lg text-white relative overflow-hidden group h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:bg-white/20 transition-all duration-500" />

            <div className="space-y-6 relative z-10 flex-1">
              <div className="flex items-center gap-2 font-bold text-sm tracking-wide text-emerald-100">
                <PiggyBank className="w-5 h-5" /> Your Total Savings
              </div>

              <div>
                <motion.div
                  key={totalSavings}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-5xl font-black tracking-tight"
                >
                  ₹{totalSavings > 0 ? totalSavings.toLocaleString("en-IN") : "0"}
                </motion.div>
                {totalSavings > 0 && (
                  <p className="text-emerald-100 mt-2 text-sm font-medium">
                    You save <span className="font-bold text-white">₹{emiSavings.toLocaleString("en-IN")}</span> every month!
                  </p>
                )}
                {totalSavings <= 0 && (
                  <p className="text-white/80 mt-2 text-sm font-medium">
                    Bank 1 is offering a better or equal rate.
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-6 border-t border-white/20 text-sm">
                <div className="flex justify-between items-center text-white/90">
                  <span>Bank 1 EMI:</span>
                  <span className="font-bold">₹{emi1.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-white/90">
                  <span>Bank 2 EMI:</span>
                  <span className="font-bold">₹{emi2.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-white/90 pt-2 border-t border-white/10">
                  <span>Bank 1 Total Interest:</span>
                  <span className="font-bold">₹{totalInterest1.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-white/90">
                  <span>Bank 2 Total Interest:</span>
                  <span className="font-bold">₹{totalInterest2.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/apply"
                className="w-full flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-emerald-50 font-bold py-3.5 rounded-xl shadow-md transition-colors"
              >
                <span>Apply for Lowest Rate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
