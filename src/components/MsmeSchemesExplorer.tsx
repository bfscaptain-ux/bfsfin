"use client";

import React, { useState } from "react";
import { Award, ShieldCheck, CheckCircle2, ChevronRight, DollarSign, Clock, HelpCircle, Layers, ArrowRight } from "lucide-react";

interface Scheme {
  id: string;
  name: string;
  shortTag: string;
  headline: string;
  benefit: string;
  eligibility: string;
  keyPoints: string[];
  docRequired: string;
  ctaText: string;
}

const SCHEMES: Scheme[] = [
  {
    id: "cgtmse",
    name: "CGTMSE Collateral-Free Loans",
    shortTag: "₹5 Cr No Collateral",
    headline: "Credit Guarantee Scheme for Micro & Small Enterprises",
    benefit: "Up to ₹5 Crore bank loan without pledging property, land, or third-party collateral guarantee.",
    eligibility: "All new and existing Micro and Small enterprises holding a valid Udyam Registration.",
    keyPoints: [
      "Government of India provides up to 85% credit guarantee to the lending bank",
      "Available for Term Loans (machinery/expansion) & Working Capital (Cash Credit/OD)",
      "Applicable across all public sector banks (PNB, SBI, BOB) and top private banks"
    ],
    docRequired: "Udyam Certificate, 12 months Bank Statement, 2–3 Years ITR, and Business Profile",
    ctaText: "Apply MSME for CGTMSE"
  },
  {
    id: "pmegp",
    name: "PMEGP Capital Subsidy",
    shortTag: "Up to 35% Subsidy",
    headline: "Prime Minister Employment Generation Programme",
    benefit: "Direct government subsidy of 15% to 35% on total project cost for setting up new units or expanding.",
    eligibility: "Any individual above 18 years establishing a new manufacturing or service unit.",
    keyPoints: [
      "Manufacturing projects up to ₹50 Lakhs and Service units up to ₹20 Lakhs eligible",
      "Rural projects receive higher 25% to 35% subsidy compared to urban 15% to 25%",
      "Subsidy is credited directly to the entrepreneur's bank account after 3-year lock-in"
    ],
    docRequired: "Udyam Certificate, Detailed Project Report (DPR), Aadhaar, PAN, and Caste/Category proof",
    ctaText: "Get DPR & Udyam Support"
  },
  {
    id: "samadhaan",
    name: "MSME Samadhaan Protection",
    shortTag: "Delayed Payment Shield",
    headline: "Legal Shield Against Delayed Buyer Payments",
    benefit: "Legal statutory recovery of overdue payments with 3x RBI compound interest if buyer delays payment past 45 days.",
    eligibility: "All registered Micro & Small enterprises supplying goods or services to corporate, PSU, or private buyers.",
    keyPoints: [
      "Mandatory 45-day maximum credit period defined under Section 15 of MSME Act, 2006",
      "Buyer must pay compound interest with monthly rests at three times the RBI bank rate",
      "Direct online case filing on Ministry of MSME facilitation council portal"
    ],
    docRequired: "Udyam Certificate, Tax Invoice copy, Purchase Order (PO), and Delivery Challan",
    ctaText: "Secure Samadhaan Protection"
  },
  {
    id: "zed",
    name: "ZED & Patent / Trademark Subsidy",
    shortTag: "80% Fee Rebate",
    headline: "Zero Defect Zero Effect & Intellectual Property Rebate",
    benefit: "Up to 80% discount on Trademark and Patent Government fees + up to ₹5 Lakhs subsidy for ISO/ZED certification.",
    eligibility: "Manufacturing MSMEs striving for world-class quality standards and branding.",
    keyPoints: [
      "Government covers up to 80% cost of Trademark & Patent official filing fees",
      "Financial assistance for green technology, energy audits, and testing equipment",
      "Certification unlocks preferential consideration in Central Government tenders"
    ],
    docRequired: "Udyam Certificate, Trade Name / Logo details, and Manufacturing license",
    ctaText: "Claim Patent & ZED Subsidy"
  },
  {
    id: "treds",
    name: "TReDS Bill Discounting",
    shortTag: "48h Invoice Cash",
    headline: "Trade Receivables Electronic Discounting System",
    benefit: "Convert unpaid corporate and government invoices into instant bank liquidity within 48 hours without collateral.",
    eligibility: "All MSMEs with supply contracts to Corporates, PSUs, and Government departments.",
    keyPoints: [
      "Competitive bidding by multiple financial institutions ensures lowest discounting rates",
      "Zero recourse to the MSME seller once the accepted invoice is discounted",
      "Drastically improves working capital cycle without increasing balance sheet bank debt"
    ],
    docRequired: "Udyam Certificate, Accepted buyer invoice, and Bank mandate",
    ctaText: "Unlock Invoice Liquidity"
  }
];

interface MsmeSchemesExplorerProps {
  onApplyClick: () => void;
}

export default function MsmeSchemesExplorer({ onApplyClick }: MsmeSchemesExplorerProps) {
  const [activeSchemeId, setActiveSchemeId] = useState<string>("cgtmse");
  const activeScheme = SCHEMES.find((s) => s.id === activeSchemeId) || SCHEMES[0];

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#021714] border-t border-slate-200 dark:border-teal-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/70 border border-teal-300 dark:border-teal-800/80 text-teal-800 dark:text-teal-300 text-xs font-bold tracking-wide">
            <Award className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            Central Government MSME Schemes
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Government Subsidies &amp; Schemes Unlocked by Udyam
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A single Udyam Registration gives your enterprise legal eligibility to tap into these central government support programs.
          </p>
        </div>

        {/* Interactive Scheme Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto">
          
          {/* Left: Scheme Navigation Tabs */}
          <div className="lg:col-span-5 space-y-2">
            {SCHEMES.map((scheme) => {
              const isSelected = scheme.id === activeSchemeId;
              return (
                <button
                  key={scheme.id}
                  onClick={() => setActiveSchemeId(scheme.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all cursor-pointer border flex items-center justify-between group ${
                    isSelected
                      ? "bg-white dark:bg-slate-900 border-teal-500 shadow-md ring-2 ring-teal-500/20"
                      : "bg-white/60 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-teal-400/60"
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black truncate ${isSelected ? "text-teal-600 dark:text-teal-400" : "text-slate-800 dark:text-slate-200"}`}>
                        {scheme.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {scheme.shortTag}
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                    isSelected
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-teal-500"
                  }`}>
                    {isSelected ? "Active" : "Explore →"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Active Scheme Deep Dive Card */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-teal-900/60 shadow-xl space-y-5">
            
            <div className="space-y-1.5 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Official Ministry Benefit
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {activeScheme.headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium pt-1">
                {activeScheme.benefit}
              </p>
            </div>

            {/* Key Advantages */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Highlights</span>
              <div className="space-y-2">
                {activeScheme.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility & Documents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Who is Eligible</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                  {activeScheme.eligibility}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Documents Needed</span>
                <span className="text-xs font-bold text-teal-700 dark:text-teal-300 mt-0.5 block">
                  {activeScheme.docRequired}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Udyam Certificate is mandatory to apply for this scheme.
              </div>
              <button
                onClick={onApplyClick}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-teal-600/30 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>{activeScheme.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
