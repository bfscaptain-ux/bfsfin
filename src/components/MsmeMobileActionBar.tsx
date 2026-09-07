"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, PhoneCall, ArrowUp, Sparkles, Building2 } from "lucide-react";

interface MsmeMobileActionBarProps {
  onApplyClick: () => void;
}

export default function MsmeMobileActionBar({ onApplyClick }: MsmeMobileActionBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down more than 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#021b16]/95 backdrop-blur-xl border-t border-teal-500/30 p-2.5 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-2">
        {/* Call Helpline */}
        <a
          href="tel:7900979001"
          className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-95"
          title="Call MSME Helpline"
        >
          <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
          <span>Call Desk</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href="https://wa.me/917900979001?text=Hello%20BFS%20Team%2C%20I%20want%20to%20apply%20for%20MSME%20Udyam%20Registration."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-95 shadow-sm shadow-emerald-600/30"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        {/* Apply Now (Scrolls up to form) */}
        <button
          onClick={onApplyClick}
          className="flex-1 py-2.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black flex items-center justify-center gap-1.5 text-xs transition-all active:scale-95 shadow-md shadow-teal-500/30 cursor-pointer"
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Apply Now</span>
        </button>
      </div>
    </div>
  );
}
