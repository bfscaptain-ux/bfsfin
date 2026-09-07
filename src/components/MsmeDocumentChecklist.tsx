"use client";

import React, { useState } from "react";
import { CheckSquare, Square, CheckCircle2, FileCheck, ArrowRight, Sparkles, Building2, Briefcase, Landmark, TrendingUp } from "lucide-react";

interface DocumentItem {
  id: string;
  title: string;
  desc: string;
  required: boolean;
}

const CHECKLIST_DATA: Record<string, { label: string; icon: any; docs: DocumentItem[] }> = {
  proprietorship: {
    label: "Proprietorship",
    icon: Briefcase,
    docs: [
      { id: "p1", title: "Aadhaar Card of Proprietor", desc: "Must be linked to active mobile for instant OTP verification", required: true },
      { id: "p2", title: "PAN Card of Proprietor", desc: "Individual PAN card used for business income", required: true },
      { id: "p3", title: "Bank Account Details", desc: "Savings or Current Account number with IFSC code or cancelled cheque", required: true },
      { id: "p4", title: "Business Address Proof", desc: "Electricity bill, rent agreement, or property tax receipt of unit", required: true },
    ]
  },
  partnership: {
    label: "Partnership / LLP",
    icon: Building2,
    docs: [
      { id: "pt1", title: "Partnership Deed / LLP Agreement", desc: "Official registered partnership deed copy", required: true },
      { id: "pt2", title: "Firm PAN Card", desc: "Separate PAN card issued in the name of the Partnership/LLP", required: true },
      { id: "pt3", title: "Managing Partner Aadhaar & PAN", desc: "Authorized signatory partner's KYC details", required: true },
      { id: "pt4", title: "Firm Current Bank Account", desc: "Bank statement or cancelled cheque in firm's name", required: true },
      { id: "pt5", title: "Registered Office Address Proof", desc: "Utility bill or NOC from property owner", required: true },
    ]
  },
  pvtltd: {
    label: "Pvt Ltd Company",
    icon: Landmark,
    docs: [
      { id: "pv1", title: "Certificate of Incorporation (COI)", desc: "Issued by Ministry of Corporate Affairs (MCA)", required: true },
      { id: "pv2", title: "Company PAN Card", desc: "Corporate PAN issued to the Private Limited entity", required: true },
      { id: "pv3", title: "Authorized Director Aadhaar & PAN", desc: "Director authorized to digitally sign & verify OTP", required: true },
      { id: "pv4", title: "Company Current Bank Account", desc: "Active current account details with IFSC code", required: true },
      { id: "pv5", title: "Board Resolution / Authorization Letter", desc: "Authorizing director to complete Udyam registration", required: false },
    ]
  },
  trader: {
    label: "Retailer / Trader",
    icon: TrendingUp,
    docs: [
      { id: "t1", title: "Aadhaar Card of Shop Owner", desc: "Mobile-linked Aadhaar for digital verification", required: true },
      { id: "t2", title: "PAN Card", desc: "Personal PAN or Firm PAN for business", required: true },
      { id: "t3", title: "Shop Address Proof / Electricity Bill", desc: "Proof of physical retail shop or godown location", required: true },
      { id: "t4", title: "Bank Account / Cancelled Cheque", desc: "Account number for government benefit linking", required: true },
    ]
  }
};

interface MsmeDocumentChecklistProps {
  onApplyClick: () => void;
}

export default function MsmeDocumentChecklist({ onApplyClick }: MsmeDocumentChecklistProps) {
  const [activeTab, setActiveTab] = useState<string>("proprietorship");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    p1: true,
    p2: true,
    pt1: true,
    pt2: true,
    pv1: true,
    pv2: true,
    t1: true,
    t2: true,
  });

  const currentGroup = CHECKLIST_DATA[activeTab];
  const totalDocs = currentGroup.docs.length;
  const readyCount = currentGroup.docs.filter((d) => checkedItems[d.id]).length;
  const isAllReady = readyCount === totalDocs;
  const percentage = Math.round((readyCount / totalDocs) * 100);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCheckAll = () => {
    const updated = { ...checkedItems };
    currentGroup.docs.forEach((d) => {
      updated[d.id] = true;
    });
    setCheckedItems(updated);
  };

  return (
    <section className="py-14 bg-white dark:bg-[#031915] border-t border-slate-200 dark:border-teal-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/70 border border-teal-300 dark:border-teal-800/80 text-teal-800 dark:text-teal-300 text-xs font-bold tracking-wide">
            <FileCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            100% Paperless Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Check Your MSME Document Readiness
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Select your enterprise structure below and tick off the documents you have ready. Zero physical paper submission needed.
          </p>
        </div>

        {/* Card Container */}
        <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900/80 rounded-3xl p-5 sm:p-8 border border-slate-200 dark:border-teal-900/60 shadow-xl space-y-6">
          
          {/* Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            {Object.entries(CHECKLIST_DATA).map(([key, data]) => {
              const IconComp = data.icon;
              const isSelected = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-teal-600 text-white shadow-md shadow-teal-600/20 ring-2 ring-teal-500/30"
                      : "bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-400"
                  }`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span className="truncate">{data.label}</span>
                </button>
              );
            })}
          </div>

          {/* Progress / Readiness Meter */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Readiness Score:
                </span>
                <span className={`font-black ${isAllReady ? "text-emerald-600 dark:text-emerald-400" : "text-teal-600 dark:text-teal-400"}`}>
                  {readyCount} of {totalDocs} Documents Ready ({percentage}%)
                </span>
              </div>
              <button
                onClick={handleCheckAll}
                className="text-[11px] font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
              >
                Mark All as Ready
              </button>
            </div>

            {/* Visual Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isAllReady ? "bg-emerald-500" : "bg-teal-500"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2.5">
            {currentGroup.docs.map((doc) => {
              const isChecked = !!checkedItems[doc.id];
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleCheck(doc.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isChecked
                      ? "bg-teal-50/60 dark:bg-teal-950/40 border-teal-400/80 dark:border-teal-700/80"
                      : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-teal-300"
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      type="button"
                      className="mt-0.5 text-teal-600 dark:text-teal-400 shrink-0"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 fill-teal-600 text-white dark:fill-teal-500 dark:text-slate-900" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs sm:text-sm font-bold ${isChecked ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                          {doc.title}
                        </span>
                        {doc.required ? (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-semibold">
                            Mandatory
                          </span>
                        ) : (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-semibold">
                            Optional
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {doc.desc}
                      </p>
                    </div>
                  </div>

                  {isChecked && (
                    <span className="shrink-0 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Ready</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Action Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 via-[#03201a] to-slate-900 text-white border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black text-white">
                  {isAllReady ? "🎉 You are 100% Ready for Express 24h Registration!" : "Keep soft copies or photos ready on your phone."}
                </div>
                <div className="text-[11px] text-teal-300/80">
                  You can share your documents directly on WhatsApp after filling the 45-second form.
                </div>
              </div>
            </div>

            <button
              onClick={onApplyClick}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-95 text-white font-bold text-xs tracking-wide shadow-md shadow-teal-600/30 transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>Proceed to Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
