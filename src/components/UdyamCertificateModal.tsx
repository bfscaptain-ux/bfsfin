"use client";

import React, { useEffect } from "react";
import { X, ShieldCheck, Award, CheckCircle2, QrCode, ArrowRight } from "lucide-react";

interface UdyamCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyNow: () => void;
}

export default function UdyamCertificateModal({ isOpen, onClose, onApplyNow }: UdyamCertificateModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-teal-800/80 text-slate-800 dark:text-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white border-b border-slate-800 rounded-t-2xl sm:rounded-t-3xl">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-teal-400">Official Document Preview</div>
              <div className="text-sm font-bold text-white">Government of India Udyam Certificate Replica</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Replica Canvas */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="relative border-4 border-double border-teal-700/60 dark:border-teal-600/60 bg-gradient-to-b from-amber-50/40 via-white to-teal-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-[#03201a] p-5 sm:p-8 rounded-xl shadow-inner overflow-hidden">
            
            {/* Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04] dark:opacity-[0.05]">
              <span className="text-8xl sm:text-9xl font-black uppercase tracking-widest text-slate-900 dark:text-white -rotate-12">
                UDYAM
              </span>
            </div>

            {/* Official Header */}
            <div className="text-center space-y-1.5 pb-4 border-b-2 border-teal-600/30 dark:border-teal-500/30">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-widest text-teal-800 dark:text-teal-300">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="w-2 h-2 rounded-full bg-white border border-slate-300"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Government of India • Ministry of MSME</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black tracking-wider text-slate-900 dark:text-white uppercase font-serif">
                Udyam Registration Certificate
              </h2>
              <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">
                (Issued under the Micro, Small and Medium Enterprises Development Act, 2006)
              </div>
            </div>

            {/* Certificate Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 items-start">
              
              {/* Left Column: QR Code & Status */}
              <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-white/70 dark:bg-slate-800/60 rounded-xl border border-teal-500/20 shadow-xs">
                {/* QR Code representation */}
                <div className="w-28 h-28 bg-white dark:bg-slate-900 border-2 border-slate-800 dark:border-teal-500/50 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center relative group">
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center border border-dashed border-teal-600">
                    <QrCode className="w-16 h-16 text-slate-900 dark:text-teal-400" />
                  </div>
                  <span className="absolute bottom-1 bg-teal-600 text-white text-[8px] font-bold px-1 rounded">GOVT VERIFIED</span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 font-mono">
                  Scan for Live Govt Registry
                </span>

                <div className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Lifetime Validity</span>
                </div>
              </div>

              {/* Right Column: Key Details */}
              <div className="md:col-span-8 space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">UDYAM REGISTRATION NUMBER</span>
                  <span className="font-mono font-black text-teal-800 dark:text-teal-300 text-xs sm:text-sm">
                    UDYAM-UP-01-0089241
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Name of Enterprise</div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5 text-xs truncate">
                      M/S SHARMA ENTERPRISES
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Type of Enterprise</div>
                    <div className="font-bold text-teal-700 dark:text-teal-300 mt-0.5 text-xs">
                      MICRO (Manufacturing)
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Major Activity</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 text-xs">
                      MANUFACTURING &amp; TRADING
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Official Location</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 text-xs">
                      Sanjay Place, Agra, Uttar Pradesh
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] uppercase font-bold text-slate-400">National Industry Classification (NIC 4-Digit)</div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">
                      <strong>NIC 1520:</strong> Footwear / Leather Goods
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">
                      <strong>NIC 4711:</strong> Retail Trading
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Govt Seal & Notice */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 gap-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Digitally signed &amp; verified by Ministry of MSME, Govt of India</span>
              </div>
              <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">No Physical Renewal Required</span>
            </div>

          </div>

          {/* Quick Notice Banner */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80 text-xs text-teal-900 dark:text-teal-200">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span>BFS Agra submits and completes this official certificate on your behalf within 24 to 48 hours without office visits.</span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 rounded-b-2xl sm:rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Preview
          </button>
          
          <button
            onClick={() => {
              onClose();
              onApplyNow();
            }}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-md shadow-teal-600/30 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Apply for Your Certificate Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
