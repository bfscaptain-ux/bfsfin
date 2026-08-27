"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, Award, ArrowRight, AlertCircle, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedToolLogo from "./AnimatedToolLogo";

export default function QuickEligibility({ homeLoanRate, selfEmployedRate }: { homeLoanRate?: string, selfEmployedRate?: string }) {
  const [empType, setEmpType] = useState("salaried");
  const [annualIncome, setAnnualIncome] = useState(1500000); // ₹15L default
  const [age, setAge] = useState(32);
  const [existingEmi, setExistingEmi] = useState(0);

  // FOIR (Fixed Obligation to Income Ratio): ~50-60% of monthly income
  const monthlyIncome = annualIncome / 12;
  const maxMonthlyEmiCapacity = Math.max(0, monthlyIncome * 0.55 - existingEmi);
  
  // Approx loan eligible based on 6.5% for 20 years (EMI ~ ₹746 per Lakh)
  const eligibleLoanLakhs = useMemo(() => {
    return Math.round((maxMonthlyEmiCapacity / 746) * 10) / 10;
  }, [maxMonthlyEmiCapacity]);

  const recommendedBank = empType === "salaried" ? "Top Nationalised Banks" : "Leading Private Banks";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-emerald-900/90 border border-slate-200 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl dark:shadow-emerald-900/20 backdrop-blur-xl transition-colors duration-300 relative overflow-hidden"
    >
      <AnimatedToolLogo />
      <div className="text-center mb-8 border-b border-slate-200 dark:border-emerald-800 pb-6">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/30">
          <TrendingUp className="w-3.5 h-3.5" />
          2-Minute Instant Calculator
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-4 tracking-tight">Check Home Loan Eligibility</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">Get your exact loan sanction estimate & interest rates tailored for you across India</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Input Form */}
        <div className="space-y-6">
          {/* Employment Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Employment Category</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEmpType("salaried")}
                className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all duration-300 ${
                  empType === "salaried"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md transform scale-[1.02]"
                    : "bg-slate-50 dark:bg-emerald-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-slate-700"
                }`}
              >
                Salaried Employee
              </button>
              <button
                type="button"
                onClick={() => setEmpType("self-employed")}
                className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all duration-300 ${
                  empType === "self-employed"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md transform scale-[1.02]"
                    : "bg-slate-50 dark:bg-emerald-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-slate-700"
                }`}
              >
                Self-Employed / Business
              </button>
            </div>
          </div>

          {/* Annual Income */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Annual Income (ITR / Gross Salary)</span>
              <motion.span
                key={annualIncome}
                initial={{ scale: 1.1, color: "#10b981" }}
                animate={{ scale: 1, color: "var(--tw-colors-emerald-500)" }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-lg bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
              >
                ₹{(annualIncome / 100000).toFixed(1)} Lakhs / yr
              </motion.span>
            </div>
            <div className="flex gap-4 items-center w-full">
              <input
              type="range"
              min={300000}
              max={1000000000}
              step={100000}
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all hover:h-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-emerald-50 border border-emerald-200 dark:bg-slate-800 dark:border-slate-700 rounded-lg text-sm font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Age */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Applicant Age</span>
              <motion.span
                key={age}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-lg bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
              >
                {age} Years
              </motion.span>
            </div>
            <div className="flex gap-4 items-center w-full">
              <input
              type="range"
              min={21}
              max={65}
              step={1}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-all hover:h-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-emerald-50 border border-emerald-200 dark:bg-slate-800 dark:border-slate-700 rounded-lg text-sm font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Existing EMI */}
          <div className="pt-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Existing Monthly EMIs (Car/Personal Loans)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₹</span>
              <input
                type="number"
                value={existingEmi || ""}
                onChange={(e) => setExistingEmi(Number(e.target.value))}
                placeholder="e.g. 15000 (Enter 0 if none)"
                className="w-full bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-xl pl-8 pr-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Results Banner */}
        <div className="bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between h-full shadow-sm group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-emerald-500/10 dark:group-hover:bg-emerald-500/20" />

          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wide">
              <CheckCircle2 className="w-5 h-5" /> Instant Eligibility Result
            </div>

            <div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Maximum Eligible Loan Amount</div>
              <motion.div
                key={eligibleLoanLakhs}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white"
              >
                ₹{eligibleLoanLakhs.toFixed(1)} <span className="text-emerald-600 dark:text-emerald-400 text-3xl sm:text-4xl">Lakhs</span>
              </motion.div>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-emerald-800/60 text-sm">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span>Monthly EMI Capacity:</span>
                <span className="font-bold text-slate-900 dark:text-white text-base">₹{Math.round(maxMonthlyEmiCapacity).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span>Recommended Tenure:</span>
                <span className="font-bold text-slate-900 dark:text-white text-base">{Math.min(30, 65 - age)} Years</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span>Recommended Partners:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{recommendedBank}</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs sm:text-sm text-emerald-800 dark:text-slate-400 flex items-start gap-3 mt-4">
              <AlertCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">Sanction letter can be generated within 5 business days across India upon digital document verification.</span>
            </div>
          </div>

          <div className="pt-8 relative z-10">
            <Link
              href="/apply"
              className="group/btn w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-500 hover:to-emerald-500 dark:from-emerald-500 dark:to-emerald-600 dark:hover:from-emerald-400 dark:hover:to-emerald-500 text-white font-extrabold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-lg">Apply For ₹{eligibleLoanLakhs.toFixed(1)}L Now</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
