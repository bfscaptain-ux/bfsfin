"use client";

import { TrendingDown, TrendingUp, Minus, BellRing } from "lucide-react";

export default function LiveTicker({ rates: propRates }: { rates?: any[] }) {
  const defaultRates = [
    { bank: "PNB Home Loan", rate: "6.50%", change: "down", time: "Updated 15 mins ago", tag: "Lowest Rate" },
    { bank: "Central Bank of India", rate: "6.70%", change: "stable", time: "Updated 45 mins ago", tag: "Zero Processing Fee" },
    { bank: "IDBI Bank", rate: "6.60%", change: "up", time: "Updated 1 hour ago", tag: "Self-Employed Special" },
    { bank: "HDFC Bank", rate: "6.75%", change: "down", time: "Updated 30 mins ago", tag: "Pre-approved Sanction" },
    { bank: "ICICI Bank", rate: "6.80%", change: "stable", time: "Updated 2 hours ago", tag: "Instant Digital Docket" },
    { bank: "SBI Home Loan", rate: "6.85%", change: "down", time: "Updated 10 mins ago", tag: "Govt Partner" },
  ];

  const getTimeAgo = (date: string | Date) => {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `Updated ${diffMins} mins ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `Updated ${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHrs / 24);
    return `Updated ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const rates = propRates && propRates.length > 0 
    ? propRates.map((r, _i, arr) => {
        const avgRate = arr.reduce((sum, x) => sum + x.interestRate, 0) / arr.length;
        return {
          bank: r.bankName,
          rate: `${r.interestRate.toFixed(2)}%`,
          change: r.interestRate < avgRate ? "down" : r.interestRate > avgRate ? "up" : "stable",
          time: r.updatedAt ? getTimeAgo(r.updatedAt) : "Updated recently",
          tag: r.badge || r.category || "Featured"
        };
      })
    : defaultRates;

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-y border-emerald-800/60 py-1.5 overflow-hidden shadow-inner">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center gap-2 sm:gap-3">
        {/* Live Indicator */}
        <div className="shrink-0 flex items-center gap-1 bg-emerald-400/10 text-emerald-300 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-emerald-400/20 text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-sm z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          <span className="hidden sm:inline">Live Pan-India Rates</span>
          <span className="sm:hidden">Live Rates</span>
        </div>

        {/* Scrolling Ticker */}
        <div className="flex-1 relative overflow-hidden flex items-center">
          {/* Edge gradients for smooth scrolling effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-emerald-950 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-emerald-950 to-transparent z-10"></div>
          
          <div className="animate-ticker flex items-center gap-4 sm:gap-8 text-xs font-medium pl-4">
            {[...rates, ...rates, ...rates].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                <span className="text-slate-200 font-semibold">{item.bank}:</span>
                <span className="text-emerald-400 font-bold">{item.rate}</span>
                {item.change === "down" && <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />}
                {item.change === "up" && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
                {item.change === "stable" && <Minus className="w-3.5 h-3.5 text-emerald-400" />}
                <span className="text-[10px] text-slate-400">({item.time})</span>
              </div>
            ))}
          </div>
        </div>

        <button className="shrink-0 hidden md:flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-500/30 transition">
          <BellRing className="w-3.5 h-3.5" /> Rate Alert
        </button>
      </div>
    </div>
  );
}
