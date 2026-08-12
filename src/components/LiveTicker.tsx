"use client";

import { TrendingDown, TrendingUp, Minus, BellRing } from "lucide-react";

export default function LiveTicker() {
  const rates = [
    { bank: "PNB Home Loan", rate: "6.50%", change: "down", time: "Updated 15 mins ago", tag: "Lowest Rate" },
    { bank: "Central Bank of India", rate: "6.70%", change: "stable", time: "Updated 45 mins ago", tag: "Zero Processing Fee" },
    { bank: "IDBI Bank", rate: "6.60%", change: "up", time: "Updated 1 hour ago", tag: "Self-Employed Special" },
    { bank: "HDFC Bank", rate: "6.75%", change: "down", time: "Updated 30 mins ago", tag: "Pre-approved Sanction" },
    { bank: "ICICI Bank", rate: "6.80%", change: "stable", time: "Updated 2 hours ago", tag: "Instant Digital Docket" },
    { bank: "SBI Home Loan", rate: "6.85%", change: "down", time: "Updated 10 mins ago", tag: "Govt Partner" },
  ];

  return (
    <div className="bg-slate-900/90 border-y border-emerald-500/20 py-2.5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        <div className="shrink-0 flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          Live Pan-India Rates:
        </div>

        <div className="overflow-hidden relative w-full">
          <div className="animate-ticker flex items-center gap-8 text-xs font-medium">
            {[...rates, ...rates].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                <span className="text-slate-200 font-semibold">{item.bank}:</span>
                <span className="text-emerald-400 font-bold">{item.rate}</span>
                {item.change === "down" && <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />}
                {item.change === "up" && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
                {item.change === "stable" && <Minus className="w-3.5 h-3.5 text-blue-400" />}
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
