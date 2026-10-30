"use client";

import { useState } from "react";
import { MessageCircle, PhoneCall, Bot, Sparkles } from "lucide-react";
import SmartBot from "./SmartBot";

export default function FloatingSupport({ 
  contactPhone, 
  whatsappPhone 
}: { 
  contactPhone?: string; 
  whatsappPhone?: string; 
  hideWheel?: boolean; 
}) {
  const [chatOpen, setChatOpen] = useState(false);

  const cleanWhatsapp = (whatsappPhone || "917900979001").replace(/[^0-9]/g, "");
  const cleanPhone = (contactPhone || "+917900979001").replace(/[^0-9+]/g, "");

  return (
    <>
      {/* Sleek, Minimal, Professional Bottom-Right Floating Support */}
      <aside 
        aria-label="Quick Support Contacts" 
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-3 items-end pointer-events-auto select-none"
      >
        {/* WhatsApp Quick Connect */}
        <a 
          href={`https://wa.me/${cleanWhatsapp}?text=Hi%20BFS,%20I%20am%20looking%20for%20loan%20assistance.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2.5 pl-3.5 pr-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-700/25 hover:shadow-xl hover:shadow-emerald-600/40 border border-emerald-400/40 transition-all duration-300 hover:scale-105 active:scale-95"
          title="Direct WhatsApp Support"
        >
          <span className="hidden sm:inline-block text-xs font-bold tracking-wide">
            WhatsApp
          </span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
        </a>

        {/* Instant Phone Call */}
        <a 
          href={`tel:${cleanPhone}`}
          className="group relative flex items-center gap-2.5 pl-3.5 pr-3 py-2 bg-slate-900/90 hover:bg-slate-900 text-white rounded-full shadow-lg shadow-slate-900/30 hover:shadow-xl border border-slate-700/60 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
          title="Call Relationship Desk"
        >
          <span className="hidden sm:inline-block text-xs font-bold text-slate-200 tracking-wide">
            Call Advisor
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <PhoneCall className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </div>
        </a>

        {/* AI Chatbot Trigger (Optional Discreet Pill) */}
        {!chatOpen && (
          <button 
            type="button"
            onClick={() => setChatOpen(true)}
            className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 shadow-md flex items-center justify-center text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
            title="Chat with BFS AI Assistant"
            aria-label="Open AI Assistant"
          >
            <Bot className="w-5 h-5" />
            <Sparkles className="w-2.5 h-2.5 text-amber-400 absolute top-1 right-1" />
          </button>
        )}
      </aside>

      {/* Expanded Smart Chat Box */}
      <SmartBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
