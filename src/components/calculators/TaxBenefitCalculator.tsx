"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Receipt, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedToolLogo from "../AnimatedToolLogo";
import CalculatorHuman2D, { CalculatorBgAmbient2D } from "../illustrations/CalculatorHuman2D";

export default function TaxBenefitCalculator() {
  const [loanAmount, setLoanAmount] = useState(3500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [taxSlab, setTaxSlab] = useState(30);
  const [propertyType, setPropertyType] = useState("self");

  const monthlyRate = interestRate / 12 / 100;
  const months = tenure * 12;

  // Calculate EMI
  const emi = useMemo(() => {
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
  }, [loanAmount, monthlyRate, months]);

  // First year principal and interest
  const firstYearBreakdown = useMemo(() => {
    let balance = loanAmount;
    let interestSum = 0;
    let principalSum = 0;

    for (let i = 0; i < 12; i++) {
      const interest = balance * monthlyRate;
      const principal = emi - interest;
      interestSum += interest;
      principalSum += principal;
      balance -= principal;
    }

    return { interest: interestSum, principal: principalSum };
  }, [loanAmount, emi, monthlyRate]);

  // Section 80C limit: 1.5 Lakhs
  const sec80CEligible = Math.min(firstYearBreakdown.principal, 150000);
  
  // Section 24(b) limit: 2 Lakhs for Self Occupied, actual for Let Out
  const sec24bEligible = propertyType === "self" ? Math.min(firstYearBreakdown.interest, 200000) : firstYearBreakdown.interest;

  // Approx Tax Saved
  const taxSaved80C = (sec80CEligible * taxSlab) / 100;
  const taxSaved24b = (sec24bEligible * taxSlab) / 100;
  const totalTaxSaved = taxSaved80C + taxSaved24b;

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
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Income Tax Benefit Calculator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Calculate tax savings under Section 80C and 24(b)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
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
            <div className="flex gap-4 items-center w-full">
              <input
              type="range"
              min={500000}
              max={1000000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all hover:h-4"
            />
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-emerald-50 border border-emerald-200 dark:bg-slate-800 dark:border-slate-700 rounded-lg text-sm font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Interest Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Rate (% p.a.)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{interestRate.toFixed(2)}%</span>
              </div>
              <div className="flex gap-4 items-center w-full">
              <input
                type="range"
                min={6.0}
                max={40}
                step={0.05}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-emerald-50 border border-emerald-200 dark:bg-slate-800 dark:border-slate-700 rounded-lg text-sm font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            </div>
            {/* Tenure */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Tenure</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{tenure} Yrs</span>
              </div>
              <div className="flex gap-4 items-center w-full">
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-emerald-50 border border-emerald-200 dark:bg-slate-800 dark:border-slate-700 rounded-lg text-sm font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Tax Slab */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Your Tax Slab</label>
              <select 
                value={taxSlab}
                onChange={(e) => setTaxSlab(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value={10}>10% Bracket</option>
                <option value={20}>20% Bracket</option>
                <option value={30}>30% Bracket</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Property Usage</label>
              <select 
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="self">Self Occupied</option>
                <option value="letout">Let Out / Rented</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs relative overflow-hidden h-full">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs tracking-wide">
                <Landmark className="w-4 h-4" /> Estimated Yearly Tax Saved
              </div>

              <div>
                <motion.div
                  key={totalTaxSaved}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white"
                >
                  ₹{Math.round(totalTaxSaved).toLocaleString("en-IN")}
                </motion.div>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-xs font-medium">
                  First year tax savings under Old Tax Regime.
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-emerald-800/60 text-xs sm:text-sm">
                <div className="bg-white dark:bg-emerald-900 p-2.5 rounded-lg border border-slate-100 dark:border-emerald-800 flex justify-between items-center">
                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase mb-0.5">Under Section 80C (Principal)</div>
                    <div className="text-slate-700 dark:text-slate-300 text-xs">Eligible: ₹{Math.round(sec80CEligible).toLocaleString("en-IN")}</div>
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm sm:text-base">
                    ₹{Math.round(taxSaved80C).toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="bg-white dark:bg-emerald-900 p-2.5 rounded-lg border border-slate-100 dark:border-emerald-800 flex justify-between items-center">
                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase mb-0.5">Under Section 24(b) (Interest)</div>
                    <div className="text-slate-700 dark:text-slate-300 text-xs">Eligible: ₹{Math.round(sec24bEligible).toLocaleString("en-IN")}</div>
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm sm:text-base">
                    ₹{Math.round(taxSaved24b).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 relative z-10">
              <Link
                href="/apply"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl shadow-xs transition-all text-xs"
              >
                <span>Apply for Home Loan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
