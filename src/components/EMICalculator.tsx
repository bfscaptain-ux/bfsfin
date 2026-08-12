"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Award, ChevronDown, ChevronUp, Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedToolLogo from "./AnimatedToolLogo";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(3500000); // ₹35 Lakhs default
  const [rate, setRate] = useState(6.5); // 6.5% default
  const [tenure, setTenure] = useState(20); // 20 years default
  const [showAmortization, setShowAmortization] = useState(false);

  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;
  const emi = useMemo(() => {
    return Math.round(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
    );
  }, [loanAmount, rate, tenure, monthlyRate, months]);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  const chartData = [
    { name: "Principal Amount", value: loanAmount, color: "#10b981" }, // emerald-500
    { name: "Total Interest", value: Math.max(0, totalInterest), color: "#3b82f6" }, // blue-500
  ];

  // Generate Amortization Schedule
  const amortizationSchedule = useMemo(() => {
    let balance = loanAmount;
    const schedule = [];
    for (let yr = 1; yr <= Math.min(tenure, 30); yr++) {
      let yrInterest = 0;
      let yrPrincipal = 0;
      for (let m = 1; m <= 12; m++) {
        const i = balance * monthlyRate;
        const p = emi - i;
        yrInterest += i;
        yrPrincipal += p;
        balance -= p;
      }
      schedule.push({
        year: yr,
        principal: Math.round(yrPrincipal),
        interest: Math.round(yrInterest),
        balance: Math.max(0, Math.round(balance)),
      });
    }
    return schedule;
  }, [loanAmount, tenure, emi, monthlyRate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl dark:shadow-emerald-900/20 backdrop-blur-xl transition-colors duration-300 relative overflow-hidden"
    >
      <AnimatedToolLogo />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
            <Calculator className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Interactive EMI Calculator
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Accurate Home Loan EMI & Repayment Schedule
            </p>
          </div>
        </div>
        <div className="flex items-center self-start sm:self-auto space-x-2 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-500/30 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span>Live Rate Sync</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Loan Amount */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Desired Loan Amount</span>
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
              max={10000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all hover:h-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
            <div className="flex justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500">
              <span>₹5 Lakhs</span>
              <span>₹50 Lakhs</span>
              <span>₹1 Crore+</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
                Interest Rate (% p.a.)
                <Info className="w-4 h-4 text-slate-400" />
              </span>
              <motion.span
                key={rate}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-blue-600 dark:text-blue-400 font-extrabold text-xl bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-lg"
              >
                {rate.toFixed(2)}%
              </motion.span>
            </div>
            <input
              type="range"
              min={6.5}
              max={12}
              step={0.05}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-all hover:h-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <div className="flex justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500">
              <span>6.50% (PNB Special)</span>
              <span>8.50%</span>
              <span>12.00%</span>
            </div>
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
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all hover:h-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
            <div className="flex justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500">
              <span>5 Years</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

          {/* Recommendation Box */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-5 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/40 dark:to-blue-950/40 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white dark:bg-slate-900 p-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <Award className="w-8 h-8 text-emerald-500 shrink-0" />
              </div>
              <div className="text-sm">
                <div className="font-extrabold text-slate-800 dark:text-slate-200">
                  Recommended: PNB Home Loan
                </div>
                <div className="text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                  Lock in at <strong className="text-emerald-600 dark:text-emerald-400">6.50%</strong> with our 5-day approval guarantee.
                </div>
              </div>
            </div>
            <Link
              href="/apply"
              className="w-full sm:w-auto bg-emerald-500 text-white dark:text-slate-950 text-sm font-bold px-6 py-3 rounded-xl hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all shadow-md hover:shadow-lg text-center whitespace-nowrap"
            >
              Apply Now
            </Link>
          </motion.div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
            {/* Subtle background glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/20 dark:group-hover:bg-emerald-500/30 transition-all duration-500"></div>

            <div className="space-y-6 relative z-10">
              <div>
                <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Calculated Monthly EMI
                </div>
                <motion.div
                  key={emi}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white flex items-baseline gap-1"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-300">
                    ₹{emi.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">/mo</span>
                </motion.div>
              </div>

              {/* Recharts Pie Chart */}
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`}
                      contentStyle={{
                        backgroundColor: "var(--tw-colors-slate-900)",
                        borderColor: "var(--tw-colors-slate-800)",
                        borderRadius: "0.5rem",
                        color: "white",
                        fontSize: "0.875rem",
                      }}
                      itemStyle={{ color: "white" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800/50 text-sm">
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    Principal Amount
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ₹{loanAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    Total Interest
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ₹{totalInterest.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-900 dark:text-slate-100 pt-2 font-bold text-lg border-t border-slate-200 dark:border-slate-800/50 mt-2">
                  <span>Total Payable</span>
                  <span>₹{totalPayment.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/apply"
              className="group w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 dark:from-emerald-500 dark:to-blue-600 dark:hover:from-emerald-400 dark:hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-lg">Get Instant Pre-Approval</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full flex items-center justify-center gap-2 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 py-3 text-sm font-semibold transition-colors rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <span>{showAmortization ? "Hide" : "View"} Year-wise Repayment Schedule</span>
              {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Amortization Table */}
      <AnimatePresence>
        {showAmortization && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-10 overflow-hidden"
          >
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  Amortization Schedule (Year-by-Year)
                </h4>
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs px-3 py-1.5 rounded-lg font-medium">
                  Loan: ₹{(loanAmount / 100000).toFixed(1)}L @ {rate}% for {tenure} Yrs
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300 min-w-[600px]">
                  <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="py-4 px-5">Year</th>
                      <th className="py-4 px-5 text-right">Principal Paid</th>
                      <th className="py-4 px-5 text-right">Interest Paid</th>
                      <th className="py-4 px-5 text-right">Total Payment</th>
                      <th className="py-4 px-5 text-right">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                    {amortizationSchedule.map((row) => (
                      <tr
                        key={row.year}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-3 px-5 font-bold text-slate-900 dark:text-white">
                          Year {row.year}
                        </td>
                        <td className="py-3 px-5 text-right font-medium text-emerald-600 dark:text-emerald-400">
                          ₹{row.principal.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-5 text-right font-medium text-blue-600 dark:text-blue-400">
                          ₹{row.interest.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-5 text-right font-semibold text-slate-700 dark:text-slate-200">
                          ₹{(row.principal + row.interest).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-5 text-right font-medium text-slate-500 dark:text-slate-400">
                          ₹{row.balance.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
