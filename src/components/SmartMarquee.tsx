"use client";

import React from "react";
import "./SmartMarquee.css";

export default function SmartMarquee({ items, speed = 1 }: { items: any[], speed?: number }) {
  if (!items || items.length === 0) return null;

  // Make it faster: e.g., if speed=0.5, duration=25s (was 60s)
  const cssDuration = speed < 10 ? Math.floor(12.5 / speed) : speed;

  // Duplicate items heavily to ensure it NEVER runs out of track even on ultra-wide 4K screens
  const safeItems = [...items, ...items, ...items, ...items];

  return (
    <div className="smart-marquee-container w-full overflow-hidden relative flex">
      <div 
        className="smart-marquee-track flex whitespace-nowrap will-change-transform w-max"
        style={{ animationDuration: `${cssDuration}s` }}
      >
        {/* Set 1 */}
        <div className="flex shrink-0 items-center gap-10 sm:gap-16 px-5 sm:px-8">
          {safeItems.map((logo, idx) => (
            <div key={`first-${idx}`} className="flex-shrink-0 flex items-center justify-center h-5 sm:h-7 w-16 sm:w-24 opacity-80 hover:opacity-100 transition-all duration-300">
              <img width={90} height={35}
                src={logo.logoUrl || logo.logo || logo}
                alt={logo.bankName || logo.name || 'Bank'}
                title={logo.bankName || logo.name || 'Bank'}
                loading="lazy"
                fetchPriority="low"
                className="max-h-full max-w-full object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
        {/* Set 2 */}
        <div className="flex shrink-0 items-center gap-10 sm:gap-16 px-5 sm:px-8">
          {safeItems.map((logo, idx) => (
            <div key={`second-${idx}`} className="flex-shrink-0 flex items-center justify-center h-5 sm:h-7 w-16 sm:w-24 opacity-80 hover:opacity-100 transition-all duration-300">
              <img width={90} height={35}
                src={logo.logoUrl || logo.logo || logo}
                alt={logo.bankName || logo.name || 'Bank'}
                title={logo.bankName || logo.name || 'Bank'}
                loading="lazy"
                fetchPriority="low"
                className="max-h-full max-w-full object-contain select-none pointer-events-none grayscale hover:grayscale-0"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
