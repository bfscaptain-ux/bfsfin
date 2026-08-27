"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeftRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedToolLogo from "../AnimatedToolLogo";

export default function BalanceTransferCalculator({ defaultRate = 6.5 }: { defaultRate?: number }) {
  const [outstandingAmount, setOutstandingAmount] = useState(3000000);
  const [remainingTenure, setRemainingTenure] = useState(15);
  const [currentRate, setCurrentRate] = useState(8.5);
  const [newRate, setNewRate] = useState(defaultRate);
  const [processingFeePercent, setProcessingFeePercent] = useState(0.5);

  const calculateEMI = (amount: number, rate: number, years: number) => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    return Math.round(
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  const currentEmi = useMemo(() => calculateEMI(outstandingAmount, currentRate, remainingTenure), [outstandingAmount, currentRate, remainingTenure]);
  const newEmi = useMemo(() => calculateEMI(outstandingAmount, newRate, remainingTenure), [outstandingAmount, newRate, remainingTenure]);

  const currentTotalInterest = (currentEmi * remainingTenure * 12) - outstandingAmount;
  const newTotalInterest = (newEmi * remainingTenure * 12) - outstandingAmount;
  
  const processingFee = (outstandingAmount * processingFeePercent) / 100;
  
  const totalSavings = currentTotalInterest - newTotalInterest;
  const netSavings = totalSavings - processingFee;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-emerald-900/90 border border-slate-200 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl dark:shadow-emerald-900/20 backdrop-blur-xl transition-colors duration-300 relative overflow-hidden"
    >
      <AnimatedToolLogo />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-emerald-800 gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
            <ArrowLeftRight className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Balance Transfer Calculator
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Calculate exact savings when switching to a better bank
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
              <div className="flex items-center bg-emerald-50 dark:bg-emerald-950/50 rounded-lg px-2 py-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-1">₹</span>
                <input
                  type="number"
                  value={outstandingAmount}
                  onChange={(e) => setOutstandingAmount(Number(e.target.value))}
                  className="bg-transparent text-emerald-600 dark:text-emerald-400 font-extrabold text-xl w-32 outline-none text-right"
                />
              </div>
            </div>
            <input
              type="range"
              min={100000}
              max={1000000000}
              step={100000}
              value={outstandingAmount}
              onChange={(e) => setOutstandingAmount(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all hover:h-4"
            />
          </div>

          {/* Remaining Tenure */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Remaining Tenure</span>
              <div className="flex items-center bg-emerald-50 dark:bg-emerald-950/50 rounded-lg px-2 py-1">
                <input
                  type="number"
                  value={remainingTenure}
                  onChange={(e) => setRemainingTenure(Number(e.target.value))}
                  className="bg-transparent text-emerald-600 dark:text-emerald-400 font-extrabold text-xl w-16 outline-none text-right"
                />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">Yrs</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              step={1}
              value={remainingTenure}
              onChange={(e) => setRemainingTenure(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-all hover:h-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Current Rate */}
            <div className="space-y-3 p-4 bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 rounded-2xl">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-500 dark:text-slate-400">Current Rate</span>
                <div className="flex items-center bg-slate-200 dark:bg-slate-800 rounded-lg px-2 py-1">
                <input
                  type="number"
                  value={currentRate}
                  onChange={(e) => setCurrentRate(Number(e.target.value))}
                  className="bg-transparent text-slate-900 dark:text-slate-100 font-extrabold text-lg w-20 outline-none text-right"
                />
                <span className="text-slate-900 dark:text-slate-100 font-bold ml-1">%</span>
              </div>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={0.05}
                value={currentRate}
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-500"
              />
            </div>

            {/* New Rate */}
            <div className="space-y-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-emerald-600 dark:text-emerald-400">New Rate</span>
                <div className="flex items-center bg-emerald-100 dark:bg-emerald-900/50 rounded-lg px-2 py-1">
                <input
                  type="number"
                  value={newRate}
                  onChange={(e) => setNewRate(Number(e.target.value))}
                  className="bg-transparent text-emerald-700 dark:text-emerald-300 font-extrabold text-lg w-20 outline-none text-right"
                />
                <span className="text-emerald-700 dark:text-emerald-300 font-bold ml-1">%</span>
              </div>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={0.05}
                value={newRate}
                onChange={(e) => setNewRate(Number(e.target.value))}
                className="w-full h-2 bg-emerald-200 dark:bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden h-full group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-emerald-500/20" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wide">
                <CheckCircle2 className="w-5 h-5" /> Your Net Savings
              </div>

              <div>
                <motion.div
                  key={netSavings}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-black text-slate-900 dark:text-white"
                >
                  ₹{netSavings > 0 ? netSavings.toLocaleString("en-IN") : "0"}
                </motion.div>
                {netSavings > 0 ? (
                  <p className="text-emerald-600 dark:text-emerald-400 mt-2 text-sm font-bold">
                    Net savings after paying ₹{processingFee.toLocaleString("en-IN")} in fees!
                  </p>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">
                    Not beneficial to transfer at these rates.
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-emerald-800/60 text-sm">
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span>Current EMI:</span>
                  <span className="font-medium text-slate-900 dark:text-white">₹{currentEmi.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span>New EMI:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{newEmi.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span>Gross Interest Saved:</span>
                  <span className="font-medium text-slate-900 dark:text-white">₹{totalSavings > 0 ? totalSavings.toLocaleString("en-IN") : 0}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/apply"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-500 hover:to-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all"
              >
                <span>Transfer Loan Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
