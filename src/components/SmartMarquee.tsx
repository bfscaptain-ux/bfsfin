"use client";

import React from "react";
import "./SmartMarquee.css";

export default function SmartMarquee({ items, speed = 1 }: { items: any[], speed?: number }) {
  if (!items || items.length === 0) return null;

  // Convert old JS pixel-based speed to CSS seconds. 
  // If speed is e.g. 0.5, we want ~60s duration. If 1, we want ~30s.
  const cssDuration = speed < 10 ? Math.floor(30 / speed) : speed;

  return (
    <div className="smart-marquee-container w-full overflow-hidden relative group">
      <div 
        className="smart-marquee-track flex whitespace-nowrap will-change-transform"
        style={{ animationDuration: `${cssDuration}s` }}
      >
        {/* Set 1 */}
        <div className="flex shrink-0 items-center justify-around min-w-full">
          {items.map((logo, idx) => (
            <div key={`first-${idx}`} className="flex-shrink-0 mx-2 sm:mx-4 flex items-center justify-center h-5 sm:h-7 w-14 sm:w-20 opacity-90 hover:opacity-100 transition-all duration-300">
              <img width={80} height={30}
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
        <div className="flex shrink-0 items-center justify-around min-w-full">
          {items.map((logo, idx) => (
            <div key={`second-${idx}`} className="flex-shrink-0 mx-2 sm:mx-4 flex items-center justify-center h-5 sm:h-7 w-14 sm:w-20 opacity-90 hover:opacity-100 transition-all duration-300">
              <img width={80} height={30}
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
      </div>
    </div>
  );
}
