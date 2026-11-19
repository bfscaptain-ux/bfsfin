"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  ArrowRightLeft,
  TrendingDown,
  PiggyBank,
  Percent,
  ShieldCheck,
  Landmark,
  FileText,
  HeartPulse,
  Shield,
  Sparkles,
  CreditCard,
  AlertTriangle,
  Award,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Zap,
} from "lucide-react";
import {
  ALL_CALCULATORS,
  CALCULATOR_CATEGORIES,
  CalculatorTool,
} from "@/data/calculatorsData";

const ICON_MAP: Record<string, React.ElementType> = {
  Calculator,
  ArrowRightLeft,
  TrendingDown,
  PiggyBank,
  Percent,
  ShieldCheck,
  Landmark,
  FileText,
  HeartPulse,
  Shield,
  Sparkles,
  CreditCard,
  AlertTriangle,
  Award,
};

// Smart Recommendations Map: what pairs best with what
const RECOMMENDATIONS: Record<string, string[]> = {
  "emi-calculator": ["balance-transfer", "prepayment", "affordability"],
  "balance-transfer": ["emi-calculator", "prepayment", "interest-rate-compare"],
  prepayment: ["emi-calculator", "balance-transfer", "tax-benefit"],
  affordability: ["emi-calculator", "stamp-duty", "loan-eligibility"],
  "interest-rate-compare": [
    "emi-calculator",
    "balance-transfer",
    "affordability",
  ],
  "loan-eligibility": ["affordability", "emi-calculator", "stamp-duty"],
  "stamp-duty": ["emi-calculator", "tax-benefit", "affordability"],
  "tax-benefit": ["emi-calculator", "prepayment", "stamp-duty"],
  "health-premium": ["tax-saver-insurance", "hlv", "emi-calculator"],
  hlv: ["health-premium", "tax-saver-insurance", "affordability"],
  "tax-saver-insurance": ["health-premium", "hlv", "tax-benefit"],
  "cc-payoff": ["cc-minimum-due", "cc-rewards", "balance-transfer"],
  "cc-minimum-due": ["cc-payoff", "cc-rewards", "emi-calculator"],
  "cc-rewards": ["cc-payoff", "cc-minimum-due", "health-premium"],
};

interface AllCalculatorsHubProps {
  currentToolId?: string;
}

export default function AllCalculatorsHub({
  currentToolId,
}: AllCalculatorsHubProps) {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const currentTool =
    ALL_CALCULATORS.find((t) => t.id === currentToolId) ||
    ALL_CALCULATORS.find((t) => t.path === pathname) ||
    ALL_CALCULATORS[0];

  const recIds = RECOMMENDATIONS[currentTool?.id] || [
    "emi-calculator",
    "balance-transfer",
    "prepayment",
  ];
  const recommendedTools = ALL_CALCULATORS.filter((t) =>
    recIds.includes(t.id)
  );

  const filteredTools = ALL_CALCULATORS.filter((tool) => {
    if (selectedCategory === "all") return true;
    return tool.category === selectedCategory;
  });

  return (
    <section className="my-14 sm:my-20 w-full print:hidden font-sans space-y-12">
      {/* 1. CONTEXTUAL "FREQUENTLY USED TOGETHER" SMART RECOMMENDATIONS */}
      <div className="bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" /> Smart Recommendations
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Calculators Frequently Used with {currentTool.shortName}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/70 mt-1">
              Borrowers exploring this calculation usually compare these
              companion tools next.
            </p>
          </div>

          <Link
            href="/apply"
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 shrink-0"
          >
            Apply for Loan Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
          {recommendedTools.map((recTool) => {
            const Icon = ICON_MAP[recTool.iconName] || Calculator;
            return (
              <Link
                key={recTool.id}
                href={recTool.path}
                className="group p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    {recTool.badge && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {recTool.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                    {recTool.name}
                  </h4>
                  <p className="text-xs text-slate-300/80 mt-1.5 leading-relaxed line-clamp-2">
                    {recTool.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Open Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 2. COMPLETE ALL-IN-ONE CALCULATOR SUITE SHOWCASE */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-6 bg-emerald-600 rounded-full" />
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                100% Free • Multi-Tool Financial Hub
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Complete Financial Calculator Suite
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
              Calculate EMIs, optimize taxes, reduce interest, and plan your
              wealth with Agra&apos;s most reliable financial advisory tools.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CALCULATOR_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-black"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Tool Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredTools.map((tool) => {
            const Icon = ICON_MAP[tool.iconName] || Calculator;
            const isCurrent =
              tool.path === pathname || tool.id === currentTool?.id;

            return (
              <div
                key={tool.id}
                className={`group relative rounded-2xl p-5 transition-all flex flex-col justify-between ${
                  isCurrent
                    ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-2 border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                    : "bg-white dark:bg-slate-900/70 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-400/50 hover:shadow-lg"
                }`}
              >
                <div>
                  {/* Card Header: Icon & Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold transition-transform group-hover:scale-105 ${
                        isCurrent
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                          : "bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isCurrent && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                          Active Tool
                        </span>
                      )}
                      {tool.badge && !isCurrent && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-black text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {tool.tagline}
                  </p>

                  {/* Key Benefit Pill */}
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{tool.keyBenefit}</span>
                  </div>
                </div>

                {/* Card CTA Link */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  {isCurrent ? (
                    <span className="font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      Currently Using <span className="text-lg">✓</span>
                    </span>
                  ) : (
                    <Link
                      href={tool.path}
                      className="w-full py-2 px-3 rounded-lg bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all flex items-center justify-center gap-1.5 group-hover:shadow-md"
                    >
                      <span>Open Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. MARKETING PROMO BANNER FOR ADVISORY CONVERSION */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-emerald-900/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left relative z-10 max-w-2xl">
          <span className="text-[11px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
            Institutional Bank Tie-ups
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Need Expert Underwriting for Lowest ROI?
          </h3>
          <p className="text-sm text-emerald-50 leading-relaxed">
            Calculators give you estimates, but our Credit Desk directly negotiates
            with 50+ Banks &amp; NBFCs (SBI, HDFC, PNB, ICICI) to lock promotional
            rates starting at just 7.15%*.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 shrink-0 w-full md:w-auto">
          <a
            href="https://wa.me/919286683232?text=Hello%20BFS%20Desk%2C%20I%20used%20your%20Loan%20Calculator%20and%20want%20to%20know%20the%20best%20bank%20rates%20for%20my%20profile."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" /> Chat on WhatsApp
          </a>

          <a
            href="tel:9258724227"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-950 text-white border border-white/20 font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" /> Call Advisor (+91 9258-724-227)
          </a>
        </div>
      </div>
    </section>
  );
}
