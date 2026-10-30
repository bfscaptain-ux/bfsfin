"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Award, ChevronDown, ChevronUp, Info, Share2, Download, MessageCircle, FileText, Check, Copy, Table, FileSpreadsheet, Building2, Sparkles, MapPin, TrendingUp, ShieldCheck } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedToolLogo from "./AnimatedToolLogo";
import CalculatorHuman2D, { CalculatorBgAmbient2D } from "./illustrations/CalculatorHuman2D";

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

  // Read prefilled query parameters from URL for deep linking / Google Search query intent
  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      const qAmount = p.get("amount");
      const qRate = p.get("rate");
      const qTenure = p.get("tenure");
      if (qAmount && !isNaN(Number(qAmount)) && Number(qAmount) >= 500000) setLoanAmount(Number(qAmount));
      if (qRate && !isNaN(Number(qRate)) && Number(qRate) > 0) setRate(Number(qRate));
      if (qTenure && !isNaN(Number(qTenure)) && Number(qTenure) > 0) setTenure(Number(qTenure));
    }
  }, []);

  // Top Indian Bank Rate Comparison for high search intent
  const topBanks = useMemo(() => [
    {
      name: "State Bank of India (SBI)",
      rate: 8.40,
      emi: Math.round((loanAmount * (8.40 / 12 / 100) * Math.pow(1 + 8.40 / 12 / 100, months)) / (Math.pow(1 + 8.40 / 12 / 100, months) - 1)),
      highlight: false,
    },
    {
      name: "HDFC Bank Home Loan",
      rate: 8.50,
      emi: Math.round((loanAmount * (8.50 / 12 / 100) * Math.pow(1 + 8.50 / 12 / 100, months)) / (Math.pow(1 + 8.50 / 12 / 100, months) - 1)),
      highlight: false,
    },
    {
      name: "Punjab National Bank (PNB)",
      rate: 8.45,
      emi: Math.round((loanAmount * (8.45 / 12 / 100) * Math.pow(1 + 8.45 / 12 / 100, months)) / (Math.pow(1 + 8.45 / 12 / 100, months) - 1)),
      highlight: false,
    },
    {
      name: "Bank of Baroda (BoB)",
      rate: 8.40,
      emi: Math.round((loanAmount * (8.40 / 12 / 100) * Math.pow(1 + 8.40 / 12 / 100, months)) / (Math.pow(1 + 8.40 / 12 / 100, months) - 1)),
      highlight: false,
    },
    {
      name: "ICICI Bank Home Loan",
      rate: 8.75,
      emi: Math.round((loanAmount * (8.75 / 12 / 100) * Math.pow(1 + 8.75 / 12 / 100, months)) / (Math.pow(1 + 8.75 / 12 / 100, months) - 1)),
      highlight: false,
    },
    {
      name: "BFS Special Partner Pool",
      rate: 7.15,
      emi: Math.round((loanAmount * (7.15 / 12 / 100) * Math.pow(1 + 7.15 / 12 / 100, months)) / (Math.pow(1 + 7.15 / 12 / 100, months) - 1)),
      highlight: true,
    },
  ], [loanAmount, months]);

  const [copiedLink, setCopiedLink] = useState(false);
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/calculator?amount=${loanAmount}&rate=${rate}&tenure=${tenure}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleDownloadCsv = () => {
    let csv = "Year,Principal Paid (INR),Interest Paid (INR),Total Annual Payment (INR),Outstanding Balance (INR)\n";
    amortizationSchedule.forEach(row => {
      csv += `${row.year},${row.principal},${row.interest},${row.principal + row.interest},${row.balance}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `BFS-Loan-Repayment-Schedule-Rs${loanAmount}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-emerald-950/80 border border-slate-100 dark:border-emerald-800 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-emerald-900/20 backdrop-blur-3xl transition-colors duration-300 relative overflow-hidden print:p-0 print:border-none print:shadow-none print:bg-transparent"
    >
      <div className="print:hidden"><AnimatedToolLogo /></div>
      {/* Subtle 2D Character & Financial Graph Ambient Backdrop Watermark */}
      <div className="absolute -bottom-10 -right-10 w-[420px] h-[300px] pointer-events-none select-none opacity-20 dark:opacity-15 z-0 print:hidden">
        <CalculatorBgAmbient2D className="w-full h-full object-contain" />
      </div>
      
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
              Loan: {loanAmount >= 10000000 ? `₹${(loanAmount / 10000000).toFixed(2)} Cr` : `₹${(loanAmount / 100000).toFixed(1)}L`} • Rate: {rate}% • Term: {tenure} Yrs
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
                min={1000000}
                max={500000000}
                step={500000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2.5 sm:h-3 bg-slate-200 dark:bg-emerald-900/50 rounded-full appearance-none cursor-pointer accent-emerald-600 transition-all hover:h-3.5"
              />
            </div>
            <div className="flex justify-between text-[11px] font-bold text-slate-400 dark:text-emerald-600/60 uppercase tracking-wider">
              <span>₹10 Lakhs (Min)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">₹50 Cr+ (No Upper Limit)</span>
            </div>
            {/* Quick Presets for high ticket loans */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
              <span className="text-[10px] font-semibold text-slate-400 shrink-0">Quick:</span>
              {[
                { label: "₹10L", val: 1000000 },
                { label: "₹25L", val: 2500000 },
                { label: "₹50L", val: 5000000 },
                { label: "₹1 Cr", val: 10000000 },
                { label: "₹5 Cr", val: 50000000 },
                { label: "₹10 Cr", val: 100000000 },
                { label: "₹25 Cr", val: 250000000 },
                { label: "₹50 Cr+", val: 500000000 },
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => setLoanAmount(p.val)}
                  className={`shrink-0 px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all ${
                    loanAmount === p.val
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-emerald-900/40 text-slate-600 dark:text-emerald-200 hover:bg-slate-200 dark:hover:bg-emerald-800 border border-slate-200 dark:border-emerald-800"
                  }`}
                >
                  {p.label}
                </button>
              ))}
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

              {/* 2D Fintech Character Celebrating Calculation */}
              <div className="w-full h-32 sm:h-36 my-2 flex items-center justify-center bg-emerald-950/40 rounded-2xl border border-emerald-800/40 p-2 print:hidden relative overflow-hidden group shadow-inner">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-500/15 rounded-full blur-xl pointer-events-none"></div>
                <CalculatorHuman2D className="w-full h-full object-contain transition-transform group-hover:scale-105 duration-300" />
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

      {/* Action Buttons & Export Suite (GEO & Pro Ready) */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 print:hidden">
        <button
          onClick={handleWhatsAppShare}
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 px-3 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 text-xs sm:text-sm"
          title="Share calculation estimate on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">WhatsApp</span>
        </button>
        
        <button
          onClick={() => setShowAmortization(!showAmortization)}
          className="flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-3.5 px-3 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 text-xs sm:text-sm"
        >
          <Table className="w-4 h-4 shrink-0" />
          <span className="truncate">{showAmortization ? "Hide Schedule" : "View Schedule"}</span>
        </button>

        <button
          onClick={handleDownloadCsv}
          className="flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-bold py-3.5 px-3 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 text-xs sm:text-sm"
          title="Download complete year-wise schedule in Excel CSV"
        >
          <FileSpreadsheet className="w-4 h-4 shrink-0" />
          <span className="truncate">Download Excel</span>
        </button>

        <button
          onClick={handleCopyLink}
          className={`flex items-center justify-center gap-2 border font-bold py-3.5 px-3 rounded-xl transition-all shadow-sm active:scale-95 text-xs sm:text-sm ${
            copiedLink
              ? "bg-emerald-50 dark:bg-emerald-900 border-emerald-500 text-emerald-700 dark:text-emerald-300"
              : "bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
          }`}
          title="Copy exact prefilled link to this calculation"
        >
          {copiedLink ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
          <span className="truncate">{copiedLink ? "Link Copied!" : "Copy Link"}</span>
        </button>

        <button
          onClick={handleDownloadPdf}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-3 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 text-xs sm:text-sm"
          title="Print official loan amortization report"
        >
          <Download className="w-4 h-4 shrink-0" />
          <span className="truncate">Print PDF</span>
        </button>
      </div>

      {/* GEO & Pan-India Institutional Underwriting Trust Banner */}
      <div className="mt-6 p-4 bg-emerald-50/80 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200/80 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs print:hidden">
        <div className="flex items-center gap-2.5 text-emerald-900 dark:text-emerald-200 font-medium">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>Serving Agra, Uttar Pradesh, NCR & All India:</strong> Multi-Bank Institutional Underwriting across 50+ Nationalized Banks & NBFCs with No Upper Limit Sanctions.</span>
        </div>
        <Link
          href="/apply"
          className="shrink-0 font-extrabold text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-white bg-white dark:bg-emerald-900 px-3.5 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-700 shadow-xs flex items-center gap-1"
        >
          <span>Apply in 2 Min</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Top Banks Live Comparison Table (High-intent Google Ranking Keyword Magnet) */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-800/60 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" /> Compare Leading Bank Interest Rates & EMIs (2026)
            </h4>
            <p className="text-xs text-slate-500 dark:text-emerald-400/80">
              Simulate ₹{loanAmount >= 10000000 ? `${(loanAmount / 10000000).toFixed(2)} Cr` : `${(loanAmount / 100000).toFixed(1)}L`} over {tenure} Yrs across India's top lending institutions.
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            1-Click Simulate
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-emerald-800 shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-emerald-900/50 text-slate-700 dark:text-emerald-200 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-emerald-800">
              <tr>
                <th className="py-2.5 px-3">Bank / Institution</th>
                <th className="py-2.5 px-3 text-center">Interest Rate</th>
                <th className="py-2.5 px-3 text-right">Est. Monthly EMI</th>
                <th className="py-2.5 px-3 text-right">Total Interest</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/40">
              {topBanks.map((b) => (
                <tr 
                  key={b.name} 
                  className={b.highlight ? "bg-emerald-50/70 dark:bg-emerald-900/40 font-bold" : "hover:bg-slate-50 dark:hover:bg-emerald-900/20"}
                >
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{b.name}</span>
                    {b.highlight && (
                      <span className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0">
                        BEST OFFER
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center font-extrabold text-emerald-700 dark:text-emerald-300">
                    {b.rate.toFixed(2)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-black text-slate-900 dark:text-white">
                    ₹{b.emi.toLocaleString("en-IN")}
                  </td>
                  <td className="py-2.5 px-3 text-right font-medium text-slate-600 dark:text-slate-400">
                    ₹{Math.max(0, (b.emi * months) - loanAmount).toLocaleString("en-IN")}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => setRate(b.rate)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                        rate === b.rate
                          ? "bg-emerald-600 text-white shadow-xs font-black"
                          : "bg-slate-100 dark:bg-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-800 text-slate-800 dark:text-emerald-200 border border-slate-200 dark:border-emerald-800"
                      }`}
                    >
                      {rate === b.rate ? "Active" : "Simulate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Amortization Table */}
      <div className={`mt-12 overflow-hidden transition-all duration-300 ${showAmortization ? 'block opacity-100' : 'hidden opacity-0'} ${includeReportInPrint ? 'print:block print:opacity-100' : 'print:hidden'}`}>
        <div className="pt-8 border-t border-emerald-100 dark:border-emerald-800/50 print:border-t-2 print:border-emerald-800 print:mt-4 print:pt-2">
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
                    className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors print:break-inside-avoid"
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
