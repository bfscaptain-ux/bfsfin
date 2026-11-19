"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Award, ChevronDown, ChevronUp, Info, Share2, Download, MessageCircle, FileText, Check, Copy, Table, FileSpreadsheet, Building2, Sparkles, MapPin, TrendingUp, ShieldCheck } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedToolLogo from "./AnimatedToolLogo";
import CalculatorHuman2D, { CalculatorBgAmbient2D } from "./illustrations/CalculatorHuman2D";
import { CalculatorLeadStrip, CalculatorLeadModal } from "./calculators/CalculatorLeadCapture";

function formatIndianWords(num: number): string {
  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2);
    return `₹${cr.endsWith(".00") ? cr.slice(0, -3) : cr} Crore`;
  }
  if (num >= 100000) {
    const lk = (num / 100000).toFixed(2);
    return `₹${lk.endsWith(".00") ? lk.slice(0, -3) : lk} Lakh`;
  }
  if (num >= 1000) {
    return `₹${(num / 1000).toFixed(0)}k`;
  }
  return `₹${num}`;
}

export default function EMICalculator({ defaultRate = 6.5 }: { defaultRate?: number }) {
  const [loanAmount, setLoanAmount] = useState(3500000); // ₹35 Lakhs default
  const [rate, setRate] = useState(defaultRate);
  const [tenure, setTenure] = useState(20); // 20 years default
  const [showAmortization, setShowAmortization] = useState(false);
  const [includeReportInPrint, setIncludeReportInPrint] = useState(true);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    try {
      setIsVerified(!!localStorage.getItem("bfs_tool_verified_user"));
    } catch (e) {}
  }, []);

  const handleActionWithVerification = (callback: () => void) => {
    try {
      const verified = !!localStorage.getItem("bfs_tool_verified_user");
      if (verified) {
        callback();
      } else {
        setLeadModalOpen(true);
      }
    } catch (e) {
      setLeadModalOpen(true);
    }
  };

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
      className="bg-white dark:bg-emerald-950/80 border border-slate-100 dark:border-emerald-800 rounded-2xl p-4 sm:p-6 shadow-md dark:shadow-emerald-900/20 backdrop-blur-3xl transition-colors duration-300 relative overflow-hidden print:p-0 print:border-none print:shadow-none print:bg-transparent"
    >
      <div className="print:hidden"><AnimatedToolLogo /></div>
      {/* Subtle Financial Graph Ambient Backdrop Watermark */}
      <div className="absolute -bottom-8 -right-8 w-[280px] h-[180px] pointer-events-none select-none opacity-15 dark:opacity-10 z-0 print:hidden">
        <CalculatorBgAmbient2D className="w-full h-full object-contain" />
      </div>
      
      {/* Header of Calculator inside the card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-emerald-800/50 gap-2 print:mb-2 print:pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner print:hidden">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight print:text-xl print:text-black">
              Smart EMI Calculator
            </h3>
            <p className="text-xs text-slate-500 dark:text-emerald-400/80 font-medium print:text-black">
              Loan: {formatIndianWords(loanAmount)} • Rate: {rate}% • Term: {tenure} Yrs
            </p>
          </div>
        </div>
        
        <div className="hidden print:block text-right">
          <div className="font-bold text-base text-emerald-800">Bhardwaj Financial Services</div>
          <div className="text-xs">www.bfsfin.com</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 print:gap-3 print:flex print:flex-col">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 print:hidden">
          
          {/* Loan Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-emerald-100 tracking-wide">Loan Amount</span>
                <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/50 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-800/50">
                  {formatIndianWords(loanAmount)}
                </span>
              </div>
              <div className="flex items-center bg-emerald-50/50 dark:bg-emerald-900/30 rounded-lg px-2.5 py-1.5 border border-emerald-100 dark:border-emerald-800 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-1 text-sm">₹</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="bg-transparent text-slate-900 dark:text-white font-extrabold text-base sm:text-lg w-28 sm:w-32 outline-none text-right placeholder-slate-300"
                />
              </div>
            </div>
            <div className="relative pt-1">
              <input
                type="range"
                min={1000000}
                max={500000000}
                step={500000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-emerald-900/50 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-emerald-600/60 uppercase tracking-wider">
              <span>₹10 Lakhs (Min)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹50 Cr+ (No Limit)</span>
            </div>
            {/* Quick Presets */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-0.5">
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
                  className={`shrink-0 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold transition-all ${
                    loanAmount === p.val
                      ? "bg-emerald-600 text-white shadow-xs font-bold"
                      : "bg-slate-100 dark:bg-emerald-900/40 text-slate-600 dark:text-emerald-200 hover:bg-slate-200 dark:hover:bg-emerald-800 border border-slate-200 dark:border-emerald-800"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-emerald-100 tracking-wide flex items-center gap-1">
                Interest Rate 
                <Info className="w-3.5 h-3.5 text-emerald-400" />
              </span>
              <div className="flex items-center bg-emerald-50/50 dark:bg-emerald-900/30 rounded-lg px-2.5 py-1.5 border border-emerald-100 dark:border-emerald-800 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
                <input
                  type="number"
                  value={rate}
                  step={0.05}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="bg-transparent text-slate-900 dark:text-white font-extrabold text-base sm:text-lg w-16 sm:w-20 outline-none text-right"
                />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1 text-sm">%</span>
              </div>
            </div>
            <div className="relative pt-1">
              <input
                type="range"
                min={1}
                max={20}
                step={0.05}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-emerald-900/50 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-emerald-600/60 uppercase tracking-wider">
              <span>1%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-emerald-100 tracking-wide">Loan Tenure</span>
              <div className="flex items-center bg-emerald-50/50 dark:bg-emerald-900/30 rounded-lg px-2.5 py-1.5 border border-emerald-100 dark:border-emerald-800 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="bg-transparent text-slate-900 dark:text-white font-extrabold text-base sm:text-lg w-14 sm:w-16 outline-none text-right"
                />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1 text-xs">Yrs</span>
              </div>
            </div>
            <div className="relative pt-1">
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-emerald-900/50 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-emerald-600/60 uppercase tracking-wider">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>

        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 print:w-full flex flex-col gap-4 relative print:block">
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg relative overflow-hidden h-full print:border-none print:shadow-none print:bg-transparent print:p-0 print:h-auto print:block print:mt-2">
            {/* Background Glow inside card */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none print:hidden"></div>

            <div className="space-y-4 relative z-10 print:flex print:flex-row print:items-center print:justify-between print:space-y-0 print:border-t print:border-b print:border-slate-200 print:py-4">
              <div className="text-center sm:text-left">
                <div className="text-emerald-300/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-1 print:text-slate-500">
                  Your Monthly EMI
                </div>
                <motion.div
                  key={emi}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl sm:text-4xl font-black text-white flex items-baseline justify-center sm:justify-start gap-1 tracking-tight print:text-black"
                >
                  <span className="text-2xl sm:text-3xl text-emerald-400/80 print:text-slate-800">₹</span>
                  {emi.toLocaleString("en-IN")}
                  <span className="text-xs text-emerald-400/70 font-semibold ml-1 print:text-slate-600">/mo</span>
                </motion.div>
              </div>

              {/* Recharts Pie Chart (Compact) */}
              <div className="h-36 sm:h-40 w-full relative my-1 print:h-28 print:w-28 print:my-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius="55%"
                      outerRadius="85%"
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={4}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`}
                      contentStyle={{
                         backgroundColor: "#064e3b",
                         borderColor: "#047857",
                         borderRadius: "8px",
                         color: "white",
                         fontWeight: "bold",
                         fontSize: "12px",
                         padding: "6px 10px",
                         boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)"
                      }}
                      itemStyle={{ color: "#ffffff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-emerald-800/60 print:border-none print:pt-0 print:w-64 text-xs sm:text-sm">
                <div className="flex justify-between items-center print:border-b print:border-slate-200 print:pb-1">
                  <span className="flex items-center gap-2 text-emerald-100 font-medium print:text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] print:shadow-none"></span>
                    Principal
                  </span>
                  <span className="font-bold text-white text-sm sm:text-base tracking-wide print:text-black">
                    ₹{loanAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center print:border-b print:border-slate-200 print:pb-1">
                  <span className="flex items-center gap-2 text-emerald-100 font-medium print:text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] print:shadow-none"></span>
                    Interest
                  </span>
                  <span className="font-bold text-white text-sm sm:text-base tracking-wide print:text-black">
                    ₹{totalInterest.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="hidden print:flex justify-between items-center print:pt-1">
                  <span className="flex items-center gap-2 font-bold text-xs text-black">
                    Total Payable
                  </span>
                  <span className="font-black text-black text-sm tracking-wide">
                    ₹{totalPayment.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons & Export Suite (Compact Row) */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 print:hidden">
        <button
          onClick={() => {
            if (isVerified) {
              handleWhatsAppShare();
            } else {
              setLeadModalOpen(true);
            }
          }}
          className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-2 px-2.5 rounded-lg transition-all shadow-sm active:scale-95 text-xs cursor-pointer"
          title="Get verified loan sanction offers on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{isVerified ? "Share WhatsApp" : "WhatsApp Offers"}</span>
        </button>
        
        <button
          onClick={() => handleActionWithVerification(() => setShowAmortization(!showAmortization))}
          className="flex items-center justify-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 px-2.5 rounded-lg transition-all shadow-sm active:scale-95 text-xs cursor-pointer"
        >
          <Table className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{showAmortization ? "Hide Schedule" : "View Schedule"}</span>
        </button>

        <button
          onClick={() => handleActionWithVerification(handleDownloadCsv)}
          className="flex items-center justify-center gap-1.5 bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-2.5 rounded-lg transition-all shadow-sm active:scale-95 text-xs cursor-pointer"
          title="Download complete year-wise schedule in Excel CSV"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Download Excel</span>
        </button>

        <button
          onClick={handleCopyLink}
          className={`flex items-center justify-center gap-1.5 border font-bold py-2 px-2.5 rounded-lg transition-all shadow-xs active:scale-95 text-xs ${
            copiedLink
              ? "bg-emerald-50 dark:bg-emerald-900 border-emerald-500 text-emerald-700 dark:text-emerald-300"
              : "bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
          }`}
          title="Copy exact prefilled link to this calculation"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
          <span className="truncate">{copiedLink ? "Link Copied!" : "Copy Link"}</span>
        </button>

        <button
          onClick={() => handleActionWithVerification(handleDownloadPdf)}
          className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-2.5 rounded-lg transition-all shadow-sm active:scale-95 text-xs col-span-2 sm:col-span-1 cursor-pointer"
          title="Print official loan amortization report"
        >
          <Download className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Print PDF</span>
        </button>
      </div>

      {/* GEO & Pan-India Institutional Underwriting Trust Banner */}
      <div className="mt-4 p-3 bg-emerald-50/80 dark:bg-emerald-950/60 rounded-xl border border-emerald-200/80 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs print:hidden">
        <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-medium">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span><strong>Serving Agra, Uttar Pradesh, NCR & All India:</strong> Multi-Bank Institutional Underwriting across 50+ Nationalized Banks & NBFCs with No Upper Limit Sanctions.</span>
        </div>
        <Link
          href="/apply"
          className="shrink-0 font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-white bg-white dark:bg-emerald-900 px-3 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700 shadow-xs flex items-center gap-1 text-xs"
        >
          <span>Apply in 2 Min</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Top Banks Live Comparison Table */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-emerald-800/60 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1.5">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-600" /> Compare Leading Bank Interest Rates & EMIs (2026)
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-emerald-400/80">
              Simulate {formatIndianWords(loanAmount)} over {tenure} Yrs across India's top lending institutions.
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
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
      <div className={`mt-6 overflow-hidden transition-all duration-300 ${showAmortization ? 'block opacity-100' : 'hidden opacity-0'} ${includeReportInPrint ? 'print:block print:opacity-100' : 'print:hidden'}`}>
        <div className="pt-4 border-t border-emerald-100 dark:border-emerald-800/50 print:border-t-2 print:border-emerald-800 print:mt-4 print:pt-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 print:mb-2">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight print:text-black">
              Year-wise Repayment Schedule
            </h4>
            <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-1.5 rounded-lg font-bold border border-emerald-200 dark:border-emerald-800/50 print:hidden">
              {formatIndianWords(loanAmount)} • {rate}% • {tenure} Yrs
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

      {/* WhatsApp & Email OTP Verification Modal */}
      <CalculatorLeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        toolName="Home Loan EMI Calculator"
        loanAmount={loanAmount}
        monthlyEmi={emi}
        interestRate={rate}
        tenureYears={tenure}
        onSuccess={() => {
          setIsVerified(true);
          setShowAmortization(true);
        }}
      />
    </motion.div>
  );
}
