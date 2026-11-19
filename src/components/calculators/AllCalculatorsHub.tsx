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
  MessageCircle,
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

interface AllCalculatorsHubProps {
  currentToolId?: string;
}

export default function AllCalculatorsHub({ currentToolId }: AllCalculatorsHubProps) {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const currentTool =
    ALL_CALCULATORS.find((t) => t.id === currentToolId) ||
    ALL_CALCULATORS.find((t) => t.path === pathname) ||
    ALL_CALCULATORS[0];

  const filteredTools = ALL_CALCULATORS.filter((tool) => {
    if (selectedCategory === "all") return true;
    return tool.category === selectedCategory;
  });

  return (
    <section className="mt-8 sm:mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 print:hidden font-sans space-y-5">
      {/* Clean Header & Category Filter in 1 Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Explore Other Calculators
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            100% free financial decision tools by Bhardwaj Financial Services.
          </p>
        </div>

        {/* Minimal Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {CALCULATOR_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  isActive
                    ? "bg-slate-900 dark:bg-emerald-600 text-white font-bold shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clean, Lightweight Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {filteredTools.map((tool) => {
          const Icon = ICON_MAP[tool.iconName] || Calculator;
          const isCurrent = tool.path === pathname || tool.id === currentTool?.id;

          if (isCurrent) return null; // Don't show current tool in other tools list

          return (
            <Link
              key={tool.id}
              href={tool.path}
              className="group p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/60 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {tool.categoryLabel}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {tool.tagline}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                <span>Calculate now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Minimalist Bottom Assistance Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/50 text-xs sm:text-sm">
        <div className="text-center sm:text-left text-slate-700 dark:text-slate-300">
          <span className="font-bold text-slate-900 dark:text-white">Need personal guidance?</span> Get special partner rates (from 7.15%*) directly with our credit desk.
        </div>
        <a
          href="https://wa.me/919286683232?text=Hello%20BFS%20Team%2C%20I%20used%20your%20Loan%20Calculator%20and%20want%20to%20consult%20with%20an%20expert."
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center gap-1.5 shadow-xs"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp Advisor
        </a>
      </div>
    </section>
  );
}
