"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Download, X, Sparkles, CheckCircle2 } from "lucide-react";

export default function MobileInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Register service worker for PWA
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // 2. Check if already installed (standalone mode)
    const isRunningStandalone = 
      window.matchMedia("(display-mode: standalone)").matches || 
      (window.navigator as any).standalone === true;
    
    if (isRunningStandalone) {
      setIsStandalone(true);
      return;
    }

    // 3. Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 4. Capture native browser beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = sessionStorage.getItem("bfs_install_dismissed");
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 5. Fallback only if mobile or tablet device
    const timer = setTimeout(() => {
      const isMobile = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent) || window.innerWidth <= 768;
      const dismissed = sessionStorage.getItem("bfs_install_dismissed");
      if (isMobile && !isRunningStandalone && !dismissed) {
        setShowPrompt(true);
      }
    }, 2000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      alert("iPhone / iPad पर Install करने के लिए:\n\n1. नीचे Safari ब्राउज़र के 'Share' (⬆️) बटन पर टैप करें।\n2. मेनू में 'Add to Home Screen' चुनें।");
    } else {
      alert("Android पर Install करने के लिए:\n\nऊपर Chrome ब्राउज़र के मेनू (⋮ 3 डॉट्स) पर टैप करें और 'Install App' या 'Add to Home Screen' चुनें।");
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    try {
      sessionStorage.setItem("bfs_install_dismissed", "true");
    } catch {}
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-[99990] animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto">
      {/* Luxury Glassmorphic Card (White / Emerald Accent) */}
      <div className="relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-500/25 shadow-[0_16px_45px_rgba(16,185,129,0.18)] p-3.5 sm:p-4 text-slate-900 transition-all hover:shadow-[0_20px_50px_rgba(16,185,129,0.25)]">
        
        {/* Subtle Ambient Top Border Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-teal-500 to-sky-500" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close install prompt"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Row */}
        <div className="flex items-center gap-3 pr-6">
          {/* Logo in Clean Elevated Circle */}
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-50 to-teal-50 p-1.5 shrink-0 border border-emerald-200/80 shadow-sm flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="BFS Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title & Micro USP */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Official App
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">100% Free</span>
            </div>
            <h4 className="text-sm font-extrabold text-slate-900 truncate">
              Bhardwaj Financial Services
            </h4>
            <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>1-Tap Instant Loan &amp; Track Status</span>
            </p>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 py-2.5 px-3 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isIOS ? "Install on iPhone" : "Install App (Free)"}</span>
          </button>

          <button
            onClick={handleDismiss}
            className="py-2 px-3 text-slate-400 hover:text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors"
          >
            Later
          </button>
        </div>

      </div>
    </div>
  );
}
