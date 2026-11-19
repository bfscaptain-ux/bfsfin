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
  ShieldCheck,
  Landmark,
  FileText,
  HeartPulse,
  Shield,
  Sparkles,
  CreditCard,
  AlertTriangle,
  Award,
  Share2,
  Copy,
  Check,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Flame,
  X,
  Search,
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

interface CalculatorNavSwitcherProps {
  currentToolId?: string;
}

export default function CalculatorNavSwitcher({
  currentToolId,
}: CalculatorNavSwitcherProps) {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-detect current tool based on pathname if not provided
  const activeTool =
    ALL_CALCULATORS.find((t) => t.id === currentToolId) ||
    ALL_CALCULATORS.find((t) => t.path === pathname) ||
    ALL_CALCULATORS[0];

  // Set category tab if active tool belongs to a specific category
  useEffect(() => {
    if (activeTool && activeTool.category) {
      // Keep "all" or sync to category
    }
  }, [activeTool]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dropdownOpen]);

  // Scroll active tab into view in the horizontal switcher
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector(
        "[data-active='true']"
      ) as HTMLElement;
      if (activeEl) {
        const container = scrollContainerRef.current;
        const scrollLeft =
          activeEl.offsetLeft -
          container.offsetWidth / 2 +
          activeEl.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [pathname]);

  const scrollPills = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleWhatsAppShare = () => {
    if (typeof window !== "undefined") {
      const toolTitle = activeTool?.name || "Financial Calculator";
      const currentUrl = window.location.href;
      const shareText = encodeURIComponent(
        `📊 Check out this 100% Free & Accurate ${toolTitle} by Bhardwaj Financial Services:\n👉 ${currentUrl}\n\nCalculate instant EMIs, interest savings, and bank rates!`
      );
      window.open(`https://api.whatsapp.com/send?text=${shareText}`, "_blank");
    }
  };

  const filteredTools = ALL_CALCULATORS.filter((tool) => {
    const matchesCategory =
      activeCategory === "all" || tool.category === activeCategory;
    const matchesSearch =
      !searchFilter ||
      tool.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full relative z-30 mb-8 sm:mb-12 print:hidden font-sans">
      {/* 1. TOP MARKETING / VIRAL ACTION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-2 sm:px-1">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-700 dark:text-emerald-300 uppercase tracking-wider">
            All-in-One Financial Suite
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-500 dark:text-slate-400 font-medium border-l border-slate-300 dark:border-slate-700 pl-2">
            14 Free Precision Tools • 100% RBI Standard
          </span>
        </div>

        {/* Viral Marketing & Share Buttons */}
        <div className="flex items-center gap-2 text-xs">
          {/* Quick Dropdown Trigger for Mobile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-200 font-semibold transition-all flex items-center gap-1.5 shadow-xs"
              aria-label="Switch Calculator"
            >
              <span className="hidden sm:inline">Switch Tool:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold max-w-[130px] sm:max-w-[160px] truncate">
                {activeTool.shortName}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Quick Switch Dropdown Popup */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white">
                    Jump to Any Calculator
                  </span>
                  <button
                    onClick={() => setDropdownOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Dropdown Search */}
                <div className="relative mb-2.5">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search calculator..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="max-h-72 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {filteredTools.map((tool) => {
                    const Icon = ICON_MAP[tool.iconName] || Calculator;
                    const isCurrent =
                      tool.path === pathname || tool.id === activeTool.id;
                    return (
                      <Link
                        key={tool.id}
                        href={tool.path}
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-start gap-2.5 p-2 rounded-xl transition-all ${
                          isCurrent
                            ? "bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-500/40 text-emerald-900 dark:text-emerald-200"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isCurrent
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs truncate">
                              {tool.name}
                            </span>
                            {tool.badge && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded font-black uppercase bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                                {tool.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {tool.tagline}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-semibold transition-all flex items-center gap-1.5 shadow-xs"
            title="Copy calculator link to share"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400 font-bold">
                  Copied!
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Copy Link</span>
              </>
            )}
          </button>

          {/* WhatsApp Share Button */}
          <button
            onClick={handleWhatsAppShare}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-[#25D366]/20 active:scale-95"
            title="Share this calculator on WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* 2. CATEGORY FILTER PILLS (COMPACT & MODERN) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CALCULATOR_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? "bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-sm"
                  : "bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  isActive
                    ? "bg-white/20 dark:bg-slate-950/20 text-white dark:text-slate-950"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. HORIZONTAL SWIPEABLE CALCULATOR CAROUSEL / PILL BAR */}
      <div className="relative group/carousel mt-1 bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-2 sm:p-2.5 shadow-md shadow-slate-200/50 dark:shadow-none backdrop-blur-md">
        {/* Left Arrow (Desktop) */}
        <button
          onClick={() => scrollPills("left")}
          className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-lg items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-slate-950 transition-all z-20 cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto scroll-smooth py-1 px-1 custom-scrollbar scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredTools.map((tool) => {
            const Icon = ICON_MAP[tool.iconName] || Calculator;
            const isCurrent =
              tool.path === pathname || tool.id === activeTool.id;

            return (
              <Link
                key={tool.id}
                href={tool.path}
                data-active={isCurrent ? "true" : "false"}
                className={`group flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all shrink-0 relative select-none ${
                  isCurrent
                    ? "bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 font-black scale-[1.02]"
                    : "bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-400/50 font-bold"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                    isCurrent
                      ? "bg-white/20 text-white"
                      : "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm whitespace-nowrap">
                      {tool.shortName}
                    </span>
                    {tool.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold uppercase whitespace-nowrap ${
                          isCurrent
                            ? "bg-white/25 text-white"
                            : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-700/50"
                        }`}
                      >
                        {tool.badge}
                      </span>
                    )}
                  </div>
                </div>

                {isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-0.5" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Arrow (Desktop) */}
        <button
          onClick={() => scrollPills("right")}
          className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-lg items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-slate-950 transition-all z-20 cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
