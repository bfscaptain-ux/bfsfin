"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeftRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedToolLogo from "../AnimatedToolLogo";
import CalculatorHuman2D, { CalculatorBgAmbient2D } from "../illustrations/CalculatorHuman2D";
import { CalculatorLeadStrip } from "./CalculatorLeadCapture";

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
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Balance Transfer Calculator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Calculate exact savings when switching to a better bank
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Outstanding Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Outstanding Loan Amount</span>
              <div className="flex items-center bg-emerald-50 dark:bg-emerald-950/50 rounded-lg px-2.5 py-1 border border-emerald-200 dark:border-emerald-800">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-1 text-sm">₹</span>
                <input
                  type="number"
                  value={outstandingAmount}
                  onChange={(e) => setOutstandingAmount(Number(e.target.value))}
                  className="bg-transparent text-emerald-600 dark:text-emerald-400 font-extrabold text-base w-28 outline-none text-right"
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
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Remaining Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Remaining Tenure</span>
              <div className="flex items-center bg-emerald-50 dark:bg-emerald-950/50 rounded-lg px-2.5 py-1 border border-emerald-200 dark:border-emerald-800">
                <input
                  type="number"
                  value={remainingTenure}
                  onChange={(e) => setRemainingTenure(Number(e.target.value))}
                  className="bg-transparent text-emerald-600 dark:text-emerald-400 font-extrabold text-base w-12 outline-none text-right"
                />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1 text-xs">Yrs</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={remainingTenure}
              onChange={(e) => setRemainingTenure(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Current Rate */}
            <div className="space-y-2 p-3 bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 rounded-xl">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500 dark:text-slate-400">Current Rate</span>
                <div className="flex items-center bg-slate-200 dark:bg-slate-800 rounded-md px-2 py-0.5">
                  <input
                    type="number"
                    value={currentRate}
                    onChange={(e) => setCurrentRate(Number(e.target.value))}
                    className="bg-transparent text-slate-900 dark:text-slate-100 font-extrabold text-sm w-16 outline-none text-right"
                  />
                  <span className="text-slate-900 dark:text-slate-100 font-bold ml-1 text-xs">%</span>
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
            <div className="space-y-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-emerald-600 dark:text-emerald-400">New Rate</span>
                <div className="flex items-center bg-emerald-100 dark:bg-emerald-900/50 rounded-md px-2 py-0.5">
                  <input
                    type="number"
                    value={newRate}
                    onChange={(e) => setNewRate(Number(e.target.value))}
                    className="bg-transparent text-emerald-700 dark:text-emerald-300 font-extrabold text-sm w-16 outline-none text-right"
                  />
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold ml-1 text-xs">%</span>
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
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs relative overflow-hidden h-full">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs tracking-wide">
                <CheckCircle2 className="w-4 h-4" /> Your Net Savings
              </div>

              <div>
                <motion.div
                  key={netSavings}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white"
                >
                  ₹{netSavings > 0 ? netSavings.toLocaleString("en-IN") : "0"}
                </motion.div>
                {netSavings > 0 ? (
                  <p className="text-emerald-600 dark:text-emerald-400 mt-1 text-xs font-bold">
                    Net savings after paying ₹{processingFee.toLocaleString("en-IN")} fees!
                  </p>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 mt-1 text-xs font-medium">
                    Not beneficial to transfer at these rates.
                  </p>
                )}
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-emerald-800/60 text-xs sm:text-sm">
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

            <div className="pt-4 relative z-10">
              <Link
                href="/apply"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl shadow-xs transition-all text-xs"
              >
                <span>Transfer Loan Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Lead Capture */}
      <CalculatorLeadStrip
        toolName="Home Loan Balance Transfer"
        loanAmount={outstandingAmount}
        monthlyEmi={newEmi}
        interestRate={newRate}
        tenureYears={remainingTenure}
        customSummary={`Net Savings: ₹${netSavings.toLocaleString("en-IN")} | Current Rate: ${currentRate}% -> New Rate: ${newRate}%`}
      />
    </motion.div>
  );
}
