"use client";

import React from "react";
import "./SmartMarquee.css";

export default function SmartMarquee({ items, speed = 1 }: { items: any[], speed?: number }) {
  if (!items || items.length === 0) return null;

  // CSS Duration for smooth, professional scrolling
  const cssDuration = speed < 10 ? Math.floor(16 / speed) : speed;

  return (
    <div className="smart-marquee-container w-full overflow-hidden relative flex py-1.5">
      <div 
        className="smart-marquee-track flex whitespace-nowrap will-change-transform w-max"
        style={{ animationDuration: `${cssDuration}s` }}
      >
        {/* Set 1 - 100% Vibrant Color */}
        <div className="flex shrink-0 items-center gap-6 sm:gap-10 px-4 sm:px-6">
          {items.map((logo, idx) => (
            <div 
              key={`first-${idx}`} 
              className="flex-shrink-0 flex items-center justify-center h-9 sm:h-11 w-24 sm:w-32 px-2.5 py-1.5 bg-white dark:bg-white/95 rounded-xl border border-slate-200/90 dark:border-white/20 shadow-xs hover:shadow-md hover:scale-105 transition-all duration-300"
            >
              <img 
                width={110} 
                height={40}
                src={logo.logoUrl || logo.logo || logo}
                alt={logo.bankName || logo.name || 'Bank Partner'}
                title={logo.bankName || logo.name || 'Bank Partner'}
                loading="lazy"
                fetchPriority="low"
                className="max-h-full max-w-full object-contain select-none pointer-events-none filter-none"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Set 2 - 100% Vibrant Color (Seamless Infinite Loop) */}
        <div className="flex shrink-0 items-center gap-6 sm:gap-10 px-4 sm:px-6">
          {items.map((logo, idx) => (
            <div 
              key={`second-${idx}`} 
              className="flex-shrink-0 flex items-center justify-center h-9 sm:h-11 w-24 sm:w-32 px-2.5 py-1.5 bg-white dark:bg-white/95 rounded-xl border border-slate-200/90 dark:border-white/20 shadow-xs hover:shadow-md hover:scale-105 transition-all duration-300"
            >
              <img 
                width={110} 
                height={40}
                src={logo.logoUrl || logo.logo || logo}
                alt={logo.bankName || logo.name || 'Bank Partner'}
                title={logo.bankName || logo.name || 'Bank Partner'}
                loading="lazy"
                fetchPriority="low"
                className="max-h-full max-w-full object-contain select-none pointer-events-none filter-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
