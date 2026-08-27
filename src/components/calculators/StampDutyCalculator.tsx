"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedToolLogo from "../AnimatedToolLogo";

export default function StampDutyCalculator() {
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [state, setState] = useState("delhi");
  const [gender, setGender] = useState("male");

  // Simplified typical rates (for illustration)
  // Delhi: Male 6%, Female 4%, Joint 5%. Reg: 1%
  // Haryana: Male 7%, Female 5%, Joint 6%. Reg: ~1% (depends on slab, using 1% flat here)
  // UP: 7% flat, females get 1% rebate up to 10L. We'll simplify to Male 7%, Female 6%
  // Maharashtra: 6% flat. Reg: 1% (capped at 30k)
  const rates: Record<string, { male: number; female: number; joint: number; reg: number }> = {
    delhi: { male: 6, female: 4, joint: 5, reg: 1 },
    haryana: { male: 7, female: 5, joint: 6, reg: 1 },
    up: { male: 7, female: 6, joint: 6.5, reg: 1 },
    maharashtra: { male: 6, female: 5, joint: 5.5, reg: 1 },
    other: { male: 6, female: 6, joint: 6, reg: 1 },
  };

  const getStampDutyRate = () => {
    const stateRates = rates[state] || rates.other;
    if (gender === "male") return stateRates.male;
    if (gender === "female") return stateRates.female;
    return stateRates.joint;
  };

  const stampDutyRate = getStampDutyRate();
  const regRate = (rates[state] || rates.other).reg;

  const stampDutyAmount = useMemo(() => (propertyValue * stampDutyRate) / 100, [propertyValue, stampDutyRate]);
  const registrationAmount = useMemo(() => {
    let amt = (propertyValue * regRate) / 100;
    if (state === "maharashtra" && amt > 30000) amt = 30000;
    return amt;
  }, [propertyValue, regRate, state]);

  const totalAmount = stampDutyAmount + registrationAmount;

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
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Stamp Duty Calculator
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Estimate Stamp Duty and Registration charges for your property
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Property Value */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Property Value / Agreement Value</span>
              <motion.span
                key={propertyValue}
                initial={{ scale: 1.1, color: "#10b981" }}
                animate={{ scale: 1, color: "var(--tw-colors-emerald-500)" }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
              >
                ₹{(propertyValue / 100000).toFixed(1)} Lakhs
              </motion.span>
            </div>
            <div className="flex gap-4 items-center w-full">
              <input
              type="range"
              min={1000000}
              max={1000000000}
              step={500000}
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all hover:h-4"
            />
              <input
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-emerald-50 border border-emerald-200 dark:bg-slate-800 dark:border-slate-700 rounded-lg text-sm font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* State */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Select State</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: "delhi", label: "Delhi" },
                { id: "haryana", label: "Haryana" },
                { id: "up", label: "Uttar Pradesh" },
                { id: "maharashtra", label: "Maharashtra" },
                { id: "other", label: "Other States" },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setState(s.id)}
                  className={`py-2.5 px-4 rounded-xl border text-sm font-bold transition-all duration-300 ${
                    state === s.id
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                      : "bg-slate-50 dark:bg-emerald-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-slate-700"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gender / Ownership */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Property Ownership By</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "male", label: "Male" },
                { id: "female", label: "Female" },
                { id: "joint", label: "Joint (M+F)" },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGender(g.id)}
                  className={`py-2.5 px-4 rounded-xl border text-sm font-bold transition-all duration-300 ${
                    gender === g.id
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-md"
                      : "bg-slate-50 dark:bg-emerald-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-slate-700"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden h-full group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-emerald-500/10" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wide">
                <CheckCircle2 className="w-5 h-5" /> Estimated Total Cost
              </div>

              <div>
                <motion.div
                  key={totalAmount}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white"
                >
                  ₹{totalAmount.toLocaleString("en-IN")}
                </motion.div>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">
                  Additional Govt. charges above property value.
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-emerald-800/60 text-sm">
                <div className="bg-white dark:bg-emerald-900 p-4 rounded-xl border border-slate-100 dark:border-emerald-800 flex justify-between items-center">
                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-1">Stamp Duty ({stampDutyRate}%)</div>
                    <div className="font-bold text-lg text-slate-900 dark:text-white">₹{stampDutyAmount.toLocaleString("en-IN")}</div>
                  </div>
                  <div className="text-emerald-500 font-bold text-sm bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                    {gender === 'female' || gender === 'joint' ? 'Rebate Applied' : 'Standard'}
                  </div>
                </div>

                <div className="bg-white dark:bg-emerald-900 p-4 rounded-xl border border-slate-100 dark:border-emerald-800 flex justify-between items-center">
                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-1">Registration ({regRate}%)</div>
                    <div className="font-bold text-lg text-slate-900 dark:text-white">₹{registrationAmount.toLocaleString("en-IN")}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/apply"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-500 hover:to-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all"
              >
                <span>Need a Loan including Registry?</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
