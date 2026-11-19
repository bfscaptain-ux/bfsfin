"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  ArrowRightLeft,
  TrendingDown,
  PiggyBank,
  Percent,
  Landmark,
  FileText,
  Share2,
  Copy,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { ALL_CALCULATORS, CalculatorTool } from "@/data/calculatorsData";

const PRIMARY_TOOLS: { id: string; name: string; path: string; icon: React.ElementType }[] = [
  { id: "emi-calculator", name: "EMI Calculator", path: "/calculator", icon: Calculator },
  { id: "balance-transfer", name: "Balance Transfer", path: "/tools/balance-transfer", icon: ArrowRightLeft },
  { id: "prepayment", name: "Prepayment", path: "/tools/prepayment", icon: TrendingDown },
  { id: "affordability", name: "Affordability", path: "/tools/affordability", icon: PiggyBank },
  { id: "interest-rate-compare", name: "Rate Compare", path: "/tools/interest-rate-compare", icon: Percent },
  { id: "stamp-duty", name: "Stamp Duty", path: "/tools/stamp-duty", icon: Landmark },
  { id: "tax-benefit", name: "Tax Benefit", path: "/tools/tax-benefit", icon: FileText },
];

const OTHER_TOOLS = ALL_CALCULATORS.filter(
  (tool) => !PRIMARY_TOOLS.some((p) => p.path === tool.path)
);

interface CalculatorNavSwitcherProps {
  currentToolId?: string;
}

export default function CalculatorNavSwitcher({ currentToolId }: CalculatorNavSwitcherProps) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeTool =
    ALL_CALCULATORS.find((t) => t.id === currentToolId) ||
    ALL_CALCULATORS.find((t) => t.path === pathname) ||
    ALL_CALCULATORS[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    if (moreOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [moreOpen]);

  // Scroll active tab into view
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector("[data-active='true']") as HTMLElement;
      if (activeEl) {
        const container = scrollRef.current;
        const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [pathname]);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const text = encodeURIComponent(
        `📊 Check out this ${activeTool.name} by Bhardwaj Financial Services:\n${window.location.href}`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    }
  };

  const isOtherActive = OTHER_TOOLS.some((t) => t.path === pathname || t.id === activeTool.id);

  return (
    <nav className="w-full mb-6 print:hidden font-sans">
      <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-1.5 shadow-xs">
        
        {/* Scrollable Clean Tabs */}
        <div
          ref={scrollRef}
          className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5 px-0.5 flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PRIMARY_TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = tool.path === pathname || tool.id === activeTool.id;

            return (
              <Link
                key={tool.id}
                href={tool.path}
                data-active={isActive ? "true" : "false"}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 select-none ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-emerald-600 dark:text-emerald-400"}`} />
                <span>{tool.name}</span>
              </Link>
            );
          })}

          {/* More Tools Dropdown */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                isOtherActive
                  ? "bg-emerald-600 text-white font-bold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <span>{isOtherActive ? activeTool.shortName : "More Tools"}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>

            {moreOpen && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                  Insurance & Credit Tools
                </div>
                <div className="space-y-0.5">
                  {OTHER_TOOLS.map((tool) => {
                    const isActive = tool.path === pathname || tool.id === activeTool.id;
                    return (
                      <Link
                        key={tool.id}
                        href={tool.path}
                        onClick={() => setMoreOpen(false)}
                        className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-colors ${
                          isActive
                            ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        <span>{tool.name}</span>
                        {isActive && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Minimal Action Icons on the Right */}
        <div className="flex items-center gap-1 shrink-0 border-l border-slate-200 dark:border-slate-800 pl-2 pr-1">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Copy calculator link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg text-[#25D366] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
            title="Share on WhatsApp"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

      </div>
    </nav>
  );
}
