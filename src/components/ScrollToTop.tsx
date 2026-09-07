"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show when scrolled down more than 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-20 left-4 sm:bottom-8 sm:left-8 z-[90] transition-all duration-300 ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-75 translate-y-6 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="group relative flex items-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#022c22]/95 hover:bg-emerald-600 text-white shadow-[0_4px_20px_rgba(5,150,105,0.4)] border border-emerald-500/40 hover:border-emerald-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 active:scale-95"
      >
        <div className="w-5 h-5 rounded-full bg-emerald-500/20 group-hover:bg-white/20 flex items-center justify-center transition-colors shrink-0">
          <ArrowUp className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white group-hover:-translate-y-0.5 transition-transform" />
        </div>
        <span className="text-[11px] sm:text-xs font-black tracking-wider text-emerald-100 group-hover:text-white uppercase pr-1">
          Top
        </span>

        {/* Glow effect on hover */}
        <span className="absolute -inset-0.5 rounded-full bg-emerald-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </button>
    </div>
  );
}
