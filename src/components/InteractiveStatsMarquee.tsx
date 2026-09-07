"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface MilestoneItem {
  id: string;
  category: string;
  number: string;
  label: string;
  subtext: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  actionText: string;
  href: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    id: "disbursed",
    category: "RETAIL & MSME CREDIT",
    number: "₹500 Cr+",
    label: "Capital Disbursed",
    subtext: "Disbursed across India at market-lowest ROI starting from 7.15%*.",
    badge: "From 7.15%*",
    badgeColor: "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    accentColor: "border-t-emerald-500",
    actionText: "Check Loan ROI",
    href: "/products/home-loan"
  },
  {
    id: "insured",
    category: "HEALTH & TERM COVER",
    number: "10,000+",
    label: "Families Insured",
    subtext: "100% cashless hospitalization across 10,000+ empaneled hospitals.",
    badge: "10k+ Hospitals",
    badgeColor: "bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800",
    accentColor: "border-t-teal-500",
    actionText: "Explore Mediclaim",
    href: "/insurance"
  },
  {
    id: "cards",
    category: "EXCLUSIVE REWARD CARDS",
    number: "15,000+",
    label: "Cards Delivered",
    subtext: "Curated lifestyle cards with airport lounge access & 5% cashback.",
    badge: "₹0 Annual Fee",
    badgeColor: "bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    accentColor: "border-t-sky-500",
    actionText: "Browse Cards",
    href: "/products/credit-cards"
  },
  {
    id: "ratio",
    category: "LEGAL ADVOCACY DESK",
    number: "99.8%",
    label: "Approval & Claim Ratio",
    subtext: "In-house zero-brokerage legal vetting & direct bank manager advocacy.",
    badge: "Legal Vetting",
    badgeColor: "bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    accentColor: "border-t-amber-500",
    actionText: "Why BFS Desk",
    href: "/about/why-us"
  },
  {
    id: "express",
    category: "DIGITAL EXPRESS TAT",
    number: "5 Days",
    label: "Sanction Turnaround",
    subtext: "End-to-end digital verification with dedicated relationship manager.",
    badge: "Fast Track",
    badgeColor: "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    accentColor: "border-t-emerald-500",
    actionText: "Start Sanction",
    href: "/apply"
  },
  {
    id: "pools",
    category: "INSTITUTIONAL SYNDICATION",
    number: "50+",
    label: "Banking Partner Pools",
    subtext: "Multi-partner lending desk across top nationalized & private lenders.",
    badge: "50+ Lenders",
    badgeColor: "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    accentColor: "border-t-indigo-500",
    actionText: "Meet Advisory Desk",
    href: "/appointment"
  }
];

export default function InteractiveStatsMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollPosRef = useRef(0);
  const oneSetWidthRef = useRef(0);

  // Dragging state for desktop mouse
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false
  });

  // Tripled list for infinite seamless wrap-around loop
  const items = [...MILESTONES, ...MILESTONES, ...MILESTONES];

  // Measure single-set width without layout thrashing in animation frames
  const updateMetrics = useCallback(() => {
    if (scrollRef.current) {
      const fullWidth = scrollRef.current.scrollWidth;
      const oneSet = fullWidth / 3;
      oneSetWidthRef.current = oneSet;
      
      // If at start, jump to middle set seamlessly
      if (scrollRef.current.scrollLeft === 0 && oneSet > 0) {
        scrollRef.current.scrollLeft = oneSet;
        scrollPosRef.current = oneSet;
      } else {
        scrollPosRef.current = scrollRef.current.scrollLeft;
      }
    }
  }, []);

  // Pause helper
  const pauseAutoGlide = useCallback(() => {
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  // Resume helper with grace period
  const scheduleResume = useCallback((delayMs = 2500) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      if (scrollRef.current) {
        scrollPosRef.current = scrollRef.current.scrollLeft;
      }
      isInteractingRef.current = false;
    }, delayMs);
  }, []);

  // Initialize metrics on mount and handle window resize
  useEffect(() => {
    // Measure after fonts and DOM paint
    const timer = setTimeout(updateMetrics, 100);
    window.addEventListener("resize", updateMetrics);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateMetrics);
    };
  }, [updateMetrics]);

  // Butter-smooth 60fps/120fps continuous drift loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    // 18 pixels per second: steady, silky-smooth calm drift
    const PIXELS_PER_SECOND = 18;

    const step = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      const el = scrollRef.current;
      const oneSet = oneSetWidthRef.current;

      if (el && !isInteractingRef.current && oneSet > 0) {
        scrollPosRef.current += PIXELS_PER_SECOND * dt;

        // Invisible wrap-around
        if (scrollPosRef.current >= oneSet * 2) {
          scrollPosRef.current -= oneSet;
        } else if (scrollPosRef.current <= 10) {
          scrollPosRef.current += oneSet;
        }

        el.scrollLeft = scrollPosRef.current;
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Touch handlers for mobile swipe left / right
  const handleTouchStart = () => {
    pauseAutoGlide();
    if (scrollRef.current) {
      scrollPosRef.current = scrollRef.current.scrollLeft;
    }
  };

  const handleTouchMove = () => {
    pauseAutoGlide();
  };

  const handleTouchEnd = () => {
    scheduleResume(2200);
  };

  // On scroll listener (syncs float accumulator and handles manual boundary wrapping)
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    // If user is actively touching or dragging, keep auto-glide paused
    if (isInteractingRef.current) {
      scrollPosRef.current = el.scrollLeft;
      scheduleResume(2200);
    }

    const oneSet = oneSetWidthRef.current;
    if (oneSet > 0) {
      if (el.scrollLeft >= oneSet * 2) {
        el.scrollLeft -= oneSet;
        scrollPosRef.current = el.scrollLeft;
      } else if (el.scrollLeft <= 10) {
        el.scrollLeft += oneSet;
        scrollPosRef.current = el.scrollLeft;
      }
    }
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    pauseAutoGlide();
    dragRef.current.isDown = true;
    dragRef.current.startX = e.pageX - el.offsetLeft;
    dragRef.current.scrollLeft = el.scrollLeft;
    dragRef.current.hasMoved = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!dragRef.current.isDown || !el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragRef.current.startX) * 1.5;
    if (Math.abs(walk) > 4) dragRef.current.hasMoved = true;
    el.scrollLeft = dragRef.current.scrollLeft - walk;
    scrollPosRef.current = el.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    if (dragRef.current.isDown) {
      dragRef.current.isDown = false;
      scheduleResume(2000);
    }
  };

  // Desktop Hover pause
  const handleMouseEnter = () => {
    pauseAutoGlide();
  };

  const handleMouseLeaveContainer = () => {
    if (dragRef.current.isDown) {
      dragRef.current.isDown = false;
    }
    scheduleResume(1500);
  };

  // Manual Chevron navigation (left / right smooth slide)
  const handleManualSlide = (offset: number) => {
    const el = scrollRef.current;
    if (!el) return;
    pauseAutoGlide();
    el.scrollBy({ left: offset, behavior: "smooth" });
    scheduleResume(3000);
  };

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-b from-slate-50 via-emerald-50/40 to-slate-50 dark:from-slate-950 dark:via-emerald-950/60 dark:to-slate-950 border-y border-emerald-100/90 dark:border-emerald-800/70 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Ambient background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 dark:bg-emerald-400/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-6 sm:mb-8 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-widest bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 mb-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
          Verified National Scale & Impact
        </span>
        <h3 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          BFS Milestones Driving Real Lives
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-1 leading-relaxed">
          Over a decade of transparent loan disbursals, zero-hassle cashless insurance claims, and curated credit cards across India.
        </p>
      </div>

      {/* INFINITE INTERACTIVE MARQUEE CONTAINER */}
      <div 
        className="relative w-full overflow-hidden select-none py-2 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeaveContainer}
      >
        
        {/* Soft Left & Right Edge Gradient Fades for Seamless Look */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-28 bg-gradient-to-r from-slate-50 via-slate-50/90 dark:from-slate-950 dark:via-slate-950/90 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-28 bg-gradient-to-l from-slate-50 via-slate-50/90 dark:from-slate-950 dark:via-slate-950/90 to-transparent z-20 pointer-events-none"></div>

        {/* Floating Manual Left Chevron Button (Desktop only, so mobile cards stay unobstructed) */}
        <button
          type="button"
          onClick={() => handleManualSlide(-320)}
          className="hidden md:flex absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:border-emerald-400 hover:text-emerald-600 transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Slide left"
          title="Slide left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Floating Manual Right Chevron Button (Desktop only) */}
        <button
          type="button"
          onClick={() => handleManualSlide(320)}
          className="hidden md:flex absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:border-emerald-400 hover:text-emerald-600 transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Slide right"
          title="Slide right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Continuous Smooth Scrolling Track (Freely swipeable on touch & draggable with mouse) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing px-6 sm:px-12 py-2 touch-pan-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {items.map((stat, idx) => (
            <Link
              key={`${stat.id}-${idx}`}
              href={stat.href}
              onClick={(e) => {
                if (dragRef.current.hasMoved) {
                  e.preventDefault(); // Avoid unintentional click when dragging
                }
              }}
              className={`w-[260px] sm:w-[290px] shrink-0 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 ${stat.accentColor} border-t-[3px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(16,185,129,0.12)] hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between group/card`}
            >
              <div>
                {/* Top Row: Financial Category & Status Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      {stat.category}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${stat.badgeColor}`}>
                    {stat.badge}
                  </span>
                </div>

                {/* Middle: Big Metric Number & Title */}
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight group-hover/card:text-emerald-600 dark:group-hover/card:text-emerald-400 transition-colors">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                  {stat.label}
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {stat.subtext}
                </p>
              </div>

              {/* Bottom Row: Tailored Action Link */}
              <div className="pt-3.5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover/card:text-emerald-700 dark:group-hover/card:text-emerald-300 transition-colors">
                <span>{stat.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>

    </section>
  );
}
