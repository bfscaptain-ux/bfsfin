"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Receipt, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedToolLogo from "../AnimatedToolLogo";

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
      className="bg-white dark:bg-emerald-900/90 border border-slate-200 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl dark:shadow-emerald-900/20 backdrop-blur-xl transition-colors duration-300 relative overflow-hidden"
    >
      <AnimatedToolLogo />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-emerald-800 gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
            <Receipt className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Income Tax Benefit Calculator
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Calculate tax savings under Section 80C and 24(b)
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
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden h-full group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-emerald-500/20" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wide">
                <Landmark className="w-5 h-5" /> Estimated Yearly Tax Saved
              </div>

              <div>
                <motion.div
                  key={totalTaxSaved}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white"
                >
                  ₹{Math.round(totalTaxSaved).toLocaleString("en-IN")}
                </motion.div>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">
                  First year tax savings under Old Tax Regime.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-emerald-800/60 text-sm">
                <div className="bg-white dark:bg-emerald-900 p-4 rounded-xl border border-slate-100 dark:border-emerald-800 flex justify-between items-center">
                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase mb-1">Under Section 80C (Principal)</div>
                    <div className="text-slate-700 dark:text-slate-300 text-xs">Eligible: ₹{Math.round(sec80CEligible).toLocaleString("en-IN")}</div>
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                    ₹{Math.round(taxSaved80C).toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="bg-white dark:bg-emerald-900 p-4 rounded-xl border border-slate-100 dark:border-emerald-800 flex justify-between items-center">
                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase mb-1">Under Section 24(b) (Interest)</div>
                    <div className="text-slate-700 dark:text-slate-300 text-xs">Eligible: ₹{Math.round(sec24bEligible).toLocaleString("en-IN")}</div>
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                    ₹{Math.round(taxSaved24b).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/apply"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-500 hover:to-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all"
              >
                <span>Apply for Home Loan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
