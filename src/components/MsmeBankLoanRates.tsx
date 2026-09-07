"use client";

import React from "react";
import { Landmark, Percent, CheckCircle2, ArrowRight, ShieldCheck, TrendingDown, Sparkles, PhoneCall } from "lucide-react";

interface BankRateItem {
  bankName: string;
  scheme: string;
  startingRate: string;
  maxLimit: string;
  processingTime: string;
  tag?: string;
}

const BANK_RATES: BankRateItem[] = [
  {
    bankName: "Punjab National Bank (PNB)",
    scheme: "PNB MSME Credit & PMEGP",
    startingRate: "8.95% p.a.",
    maxLimit: "Up to ₹5.00 Crore",
    processingTime: "48–72 Hours",
    tag: "Lowest PSU Rate"
  },
  {
    bankName: "State Bank of India (SBI)",
    scheme: "SBI SME Pratham / CGTMSE",
    startingRate: "9.20% p.a.",
    maxLimit: "Up to ₹5.00 Crore",
    processingTime: "3–5 Days",
    tag: "High Disbursal"
  },
  {
    bankName: "Bank of Baroda (BOB)",
    scheme: "Baroda MSME Sanjeevani",
    startingRate: "9.10% p.a.",
    maxLimit: "Up to ₹5.00 Crore",
    processingTime: "48 Hours",
  },
  {
    bankName: "HDFC Bank",
    scheme: "Vyapar Credit Line & Working Capital",
    startingRate: "9.99% p.a.",
    maxLimit: "Up to ₹2.00 Crore Unsecured",
    processingTime: "24–48 Hours",
    tag: "Fastest Disbursal"
  },
  {
    bankName: "ICICI Bank",
    scheme: "SME InstaOD & Machinery Term Loan",
    startingRate: "9.50% p.a.",
    maxLimit: "Up to ₹2.50 Crore",
    processingTime: "48 Hours",
  }
];

interface MsmeBankLoanRatesProps {
  onApplyClick: () => void;
}

export default function MsmeBankLoanRates({ onApplyClick }: MsmeBankLoanRatesProps) {
  return (
    <section className="py-14 bg-white dark:bg-[#031b17] border-t border-slate-200 dark:border-teal-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/70 border border-teal-300 dark:border-teal-800/80 text-teal-800 dark:text-teal-300 text-xs font-bold tracking-wide">
            <Percent className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            1.00% Official Govt Interest Rebate
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Partner Banks MSME Loan Interest Rates
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Registered MSMEs receive an automatic 1% interest subvention and collateral-free loan access under Government of India CGTMSE norms.
          </p>
        </div>

        {/* 1% Rebate Benefit Showcase Box */}
        <div className="max-w-4xl mx-auto mb-8 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-teal-900 via-[#03241c] to-emerald-900 text-white border border-teal-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center shrink-0">
              <TrendingDown className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-teal-300 tracking-wider">
                Why Udyam Certificate Matters for Bank Loans
              </div>
              <div className="text-sm sm:text-base font-black text-white mt-0.5">
                Save ₹1,60,000+ on a ₹50 Lakh Loan with 1% Interest Subvention
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Banks cannot ask for third-party collateral guarantee for loans up to ₹5 Crore under CGTMSE.
              </div>
            </div>
          </div>

          <button
            onClick={onApplyClick}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs shrink-0 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Apply MSME First →
          </button>
        </div>

        {/* Rates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {BANK_RATES.map((b, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-teal-900/60 shadow-sm space-y-3 flex flex-col justify-between hover:border-teal-400 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-black text-sm">
                    <Landmark className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>{b.bankName}</span>
                  </div>
                  {b.tag && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-500/20">
                      {b.tag}
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {b.scheme}
                </div>

                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting Rate</span>
                    <span className="text-lg font-black text-teal-600 dark:text-teal-400">{b.startingRate}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Sanction Limit</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{b.maxLimit}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Speed: {b.processingTime}</span>
                <span className="text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> CGTMSE Cover
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Assistance Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1 font-bold">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Need bank loan consultation after Udyam registration?
            </span>
            <span>BFS liaisons directly with PNB, SBI, BOB &amp; HDFC bank credit managers for your unit.</span>
            <a
              href="https://wa.me/917900979001?text=Hello%20BFS%2C%20I%20want%20to%20consult%20regarding%20MSME%20Bank%20Loan."
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
            >
              Chat with Loan Desk →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
