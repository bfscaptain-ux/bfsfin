"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check, Shield } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already made a cookie choice
    const consent = localStorage.getItem("bfs_cookie_consent");
    if (!consent) {
      // Show subtly after 1.5 seconds
      const timer = setTimeout(() => {
        setShow(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem("bfs_cookie_consent", "all");
    } catch {}
    setShow(false);
  };

  const handleEssentialsOnly = () => {
    try {
      localStorage.setItem("bfs_cookie_consent", "essentials");
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-3 left-3 right-3 sm:bottom-5 sm:left-6 sm:right-6 md:left-auto md:right-6 md:max-w-lg z-[9999]"
        >
          <div className="bg-slate-950/95 text-slate-100 backdrop-blur-xl border border-emerald-500/40 shadow-2xl rounded-2xl p-4 sm:p-5 relative overflow-hidden ring-1 ring-emerald-500/20">
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />
            
            <button 
              onClick={handleEssentialsOnly}
              className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Dismiss cookie notice"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3.5 pr-6">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                <Cookie className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-black text-white tracking-wide uppercase">
                    Cookie & Data Notice
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                    <Shield className="w-2.5 h-2.5" /> DPDP
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300/90 leading-relaxed font-normal">
                  We use essential cookies and tracking analytics to provide loan assessment services and enhance user experience. By continuing to browse, you agree to our{" "}
                  <Link href="/privacy-policy" className="text-emerald-400 hover:text-emerald-300 underline font-semibold transition-colors">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 underline font-semibold transition-colors">
                    Terms of Service
                  </Link>.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap sm:flex-nowrap gap-2 justify-end">
              <button 
                onClick={handleEssentialsOnly}
                type="button"
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all text-center"
              >
                ESSENTIALS ONLY
              </button>
              <button 
                onClick={handleAcceptAll}
                type="button"
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                ACCEPT ALL
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
