"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Award, ChevronDown, ChevronUp, Info, Share2, Download, MessageCircle, FileText } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedToolLogo from "./AnimatedToolLogo";

export default function EMICalculator({ defaultRate = 6.5 }: { defaultRate?: number }) {
  const [loanAmount, setLoanAmount] = useState(3500000); // ₹35 Lakhs default
  const [rate, setRate] = useState(defaultRate);
  const [tenure, setTenure] = useState(20); // 20 years default
  const [showAmortization, setShowAmortization] = useState(false);
  const [includeReportInPrint, setIncludeReportInPrint] = useState(true);

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
    { name: "Total Interest", value: Math.max(0, totalInterest), color: "#f59e0b" }, // amber-500
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

  const handleWhatsAppShare = () => {
    const text = `🏠 *My Home Loan EMI Estimate* 🏠\n\n💰 Loan Amount: ₹${loanAmount.toLocaleString('en-IN')}\n📈 Interest Rate: ${rate}% p.a.\n⏳ Tenure: ${tenure} Years\n\n✨ *Monthly EMI: ₹${emi.toLocaleString('en-IN')}*\nTotal Interest: ₹${totalInterest.toLocaleString('en-IN')}\nTotal Payment: ₹${totalPayment.toLocaleString('en-IN')}\n\nCalculated using the advanced BFSFIN EMI Tool. Calculate yours at: https://bfsfin.com/calculator`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-emerald-950/80 border border-slate-100 dark:border-emerald-800 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-emerald-900/20 backdrop-blur-3xl transition-colors duration-300 relative overflow-hidden print:p-0 print:border-none print:shadow-none print:bg-transparent"
    >
      <div className="print:hidden"><AnimatedToolLogo /></div>
      
      {/* Header of Calculator inside the card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 pb-6 border-b border-slate-100 dark:border-emerald-800/50 gap-4 print:mb-4 print:pb-4">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner print:hidden">
            <Calculator className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight print:text-2xl print:text-black">
              Smart EMI Calculator
            </h3>
            <p className="text-sm text-slate-500 dark:text-emerald-400/80 font-medium mt-1 print:text-black">
              Loan: ₹{(loanAmount / 100000).toFixed(1)}L • Rate: {rate}% • Term: {tenure} Yrs
            </p>
          </div>
        </div>
        
        <div className="hidden print:block text-right">
          <div className="font-bold text-lg text-emerald-800">Bhardwaj Finance</div>
          <div className="text-sm">www.bfsfin.com</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 print:gap-4 print:flex print:flex-col">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-12 print:hidden">
          
          {/* Loan Amount */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
              <span className="text-sm font-bold text-slate-700 dark:text-emerald-100 tracking-wide">Loan Amount</span>
              <div className="flex items-center bg-emerald-50/50 dark:bg-emerald-900/30 rounded-xl px-4 py-2.5 border border-emerald-100 dark:border-emerald-800 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
                <span className="text-emerald-600 dark:text-emerald-400 font-black mr-1 text-lg">₹</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="bg-transparent text-slate-900 dark:text-white font-black text-2xl w-32 sm:w-40 outline-none text-right placeholder-slate-300"
                />
              </div>
            </div>
            <div className="relative pt-2">
              <input
                type="range"
                min={500000}
                max={100000000}
                step={100000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2.5 sm:h-3 bg-slate-200 dark:bg-emerald-900/50 rounded-full appearance-none cursor-pointer accent-emerald-600 transition-all hover:h-3.5"
              />
            </div>
            <div className="flex justify-between text-[11px] font-bold text-slate-400 dark:text-emerald-600/60 uppercase tracking-wider">
              <span>5 Lakhs</span>
              <span>10 Cr</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
              <span className="text-sm font-bold text-slate-700 dark:text-emerald-100 tracking-wide flex items-center gap-1.5">
                Interest Rate 
                <Info className="w-4 h-4 text-emerald-400" />
              </span>
              <div className="flex items-center bg-emerald-50/50 dark:bg-emerald-900/30 rounded-xl px-4 py-2.5 border border-emerald-100 dark:border-emerald-800 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="bg-transparent text-slate-900 dark:text-white font-black text-2xl w-20 sm:w-24 outline-none text-right"
                />
                <span className="text-emerald-600 dark:text-emerald-400 font-black ml-1 text-lg">%</span>
              </div>
            </div>
            <div className="relative pt-2">
              <input
                type="range"
                min={1}
                max={20}
                step={0.05}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2.5 sm:h-3 bg-slate-200 dark:bg-emerald-900/50 rounded-full appearance-none cursor-pointer accent-emerald-600 transition-all hover:h-3.5"
              />
            </div>
            <div className="flex justify-between text-[11px] font-bold text-slate-400 dark:text-emerald-600/60 uppercase tracking-wider">
              <span>1%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
              <span className="text-sm font-bold text-slate-700 dark:text-emerald-100 tracking-wide">Loan Tenure</span>
              <div className="flex items-center bg-emerald-50/50 dark:bg-emerald-900/30 rounded-xl px-4 py-2.5 border border-emerald-100 dark:border-emerald-800 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="bg-transparent text-slate-900 dark:text-white font-black text-2xl w-20 sm:w-24 outline-none text-right"
                />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1.5 text-base">Yrs</span>
              </div>
            </div>
            <div className="relative pt-2">
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2.5 sm:h-3 bg-slate-200 dark:bg-emerald-900/50 rounded-full appearance-none cursor-pointer accent-emerald-600 transition-all hover:h-3.5"
              />
            </div>
            <div className="flex justify-between text-[11px] font-bold text-slate-400 dark:text-emerald-600/60 uppercase tracking-wider">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>

        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 print:w-full flex flex-col gap-6 relative print:block">
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full print:border-none print:shadow-none print:bg-transparent print:p-0 print:h-auto print:block print:mt-4">
            {/* Background Glow inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none print:hidden"></div>

            <div className="space-y-8 relative z-10 print:flex print:flex-row print:items-center print:justify-between print:space-y-0 print:border-t print:border-b print:border-slate-200 print:py-6">
              <div className="text-center sm:text-left">
                <div className="text-emerald-300/80 text-xs font-bold uppercase tracking-[0.25em] mb-3 print:text-slate-500 print:mb-1">
                  Your Monthly EMI
                </div>
                <motion.div
                  key={emi}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl sm:text-6xl font-black text-white flex items-baseline justify-center sm:justify-start gap-1 tracking-tighter print:text-black print:text-5xl"
                >
                  <span className="text-3xl sm:text-4xl text-emerald-400/70 print:text-slate-800">₹</span>
                  {emi.toLocaleString("en-IN")}
                  <span className="text-base text-emerald-400/70 font-medium ml-1 print:text-slate-600">/mo</span>
                </motion.div>
              </div>

              {/* Recharts Pie Chart */}
              <div className="h-56 w-full relative my-6 print:h-32 print:w-32 print:my-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="90%"
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={6}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`}
                      contentStyle={{
                         backgroundColor: "#064e3b", // emerald-900
                         borderColor: "#047857", // emerald-700
                         borderRadius: "12px",
                         color: "white",
                         fontWeight: "bold",
                         boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)"
                      }}
                      itemStyle={{ color: "#ffffff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-5 pt-6 border-t border-emerald-800/60 print:border-none print:pt-0 print:w-64">
                <div className="flex justify-between items-center print:border-b print:border-slate-200 print:pb-2">
                  <span className="flex items-center gap-3 text-emerald-100 font-medium text-sm print:text-slate-700">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)] print:shadow-none"></span>
                    Principal
                  </span>
                  <span className="font-bold text-white text-lg tracking-wide print:text-black">
                    ₹{loanAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center print:border-b print:border-slate-200 print:pb-2">
                  <span className="flex items-center gap-3 text-emerald-100 font-medium text-sm print:text-slate-700">
                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)] print:shadow-none"></span>
                    Interest
                  </span>
                  <span className="font-bold text-white text-lg tracking-wide print:text-black">
                    ₹{totalInterest.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="hidden print:flex justify-between items-center print:pt-1">
                  <span className="flex items-center gap-3 font-bold text-sm text-black">
                    Total Payable
                  </span>
                  <span className="font-black text-black text-lg tracking-wide">
                    ₹{totalPayment.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons (Themed) */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print:hidden">
        <button
          onClick={handleWhatsAppShare}
          className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="tracking-wide">WhatsApp</span>
        </button>
        
        <button
          onClick={() => setShowAmortization(!showAmortization)}
          className="flex items-center justify-center gap-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-4 px-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <Calculator className="w-5 h-5" />
          <span className="tracking-wide">{showAmortization ? "Hide Details" : "View Schedule"}</span>
        </button>

        {/* PDF Print Controls */}
        <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-2 rounded-2xl">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer pl-4 w-full sm:w-auto flex-1">
            <input 
              type="checkbox" 
              checked={includeReportInPrint}
              onChange={(e) => setIncludeReportInPrint(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 accent-emerald-600 cursor-pointer"
            />
            Include Detailed Report
          </label>
          <button
            onClick={handleDownloadPdf}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-3 px-6 rounded-xl transition-all border border-emerald-200"
          >
            <Download className="w-5 h-5" />
            <span className="tracking-wide">Print PDF</span>
          </button>
        </div>
      </div>

      {/* Amortization Table */}
      <div className={`mt-12 overflow-hidden transition-all duration-300 ${showAmortization ? 'block opacity-100' : 'hidden opacity-0'} ${includeReportInPrint ? 'print:block print:opacity-100' : 'print:hidden'}`}>
        <div className="pt-8 border-t border-emerald-100 dark:border-emerald-800/50 print:border-t-2 print:border-emerald-800 print:mt-12 print:pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 print:mb-2">
            <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight print:text-black">
              Year-wise Repayment Schedule
            </h4>
            <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm px-4 py-2.5 rounded-xl font-bold border border-emerald-200 dark:border-emerald-800/50 print:hidden">
              ₹{(loanAmount / 100000).toFixed(1)}L • {rate}% • {tenure} Yrs
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-emerald-100 dark:border-emerald-800 shadow-sm bg-white dark:bg-emerald-950/30 print:shadow-none print:border-none">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300 min-w-[600px] print:text-black print:text-xs">
              <thead className="bg-emerald-50/80 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 uppercase text-[11px] font-black tracking-widest border-b border-emerald-100 dark:border-emerald-800 print:bg-slate-100 print:text-slate-800">
                <tr>
                  <th className="py-5 px-6 print:py-2">Year</th>
                  <th className="py-5 px-6 text-right print:py-2">Principal Paid</th>
                  <th className="py-5 px-6 text-right print:py-2">Interest Paid</th>
                  <th className="py-5 px-6 text-right print:py-2">Total Payment</th>
                  <th className="py-5 px-6 text-right print:py-2">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50 dark:divide-emerald-900/40 print:divide-slate-200">
                {amortizationSchedule.map((row) => (
                  <tr
                    key={row.year}
                    className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors"
                  >
                    <td className="py-4 px-6 font-black text-slate-900 dark:text-white print:py-1 print:text-black">
                      Year {row.year}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-emerald-600 dark:text-emerald-400 print:py-1 print:text-black">
                      ₹{row.principal.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-amber-500 dark:text-amber-400 print:py-1 print:text-black">
                      ₹{row.interest.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-slate-700 dark:text-slate-200 print:py-1 print:text-black">
                      ₹{(row.principal + row.interest).toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-6 text-right font-semibold text-slate-400 dark:text-slate-500 print:py-1 print:text-black">
                      ₹{row.balance.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
