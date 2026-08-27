"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import {
  UserCheck,
  FileCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Upload,
  PhoneCall,
  MessageSquare,
  Share2,
  Calculator,
  ArrowUpRight,
  ShieldCheck,
  XCircle,
  FileText
} from "lucide-react";

export default function CustomerDashboard() {
  const [aadhaarUploaded, setAadhaarUploaded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b132b] text-slate-100 font-sans">
      <Header />

      {/* Top Banner */}
      <div className="bg-slate-900 border-b border-emerald-500/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-xl">
              RK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Welcome back, Rajesh Kumar!</h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Verified Customer
                </span>
              </div>
              <p className="text-xs text-slate-400">Customer ID: CUST-AGRA-98765 | Sanjay Place Branch</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Link
              href="/apply"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition"
            >
              + Apply New Loan
            </Link>
            <Link
              href="/calculator"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl border border-slate-700 transition flex items-center gap-1"
            >
              <Calculator className="w-4 h-4 text-emerald-400" /> Calculator
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        {/* Urgent Action Alert if Aadhaar Rejected */}
        {!aadhaarUploaded && (
          <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-white">Action Required: Aadhaar Card Reupload</h3>
                <p className="text-xs text-slate-300">
                  Officer Rajesh Sharma marked your Aadhaar document as blurry. Please reupload high resolution scan to maintain 5-day sanction timeline.
                </p>
              </div>
            </div>
            <label className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer flex items-center gap-1">
              <Upload className="w-4 h-4" /> Reupload Aadhaar
              <input type="file" onChange={() => setAadhaarUploaded(true)} className="hidden" />
            </label>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Active Application Card */}
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Active Dossier</span>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Application APP-2024-00123
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/40">
                    UNDER VERIFICATION (40%)
                  </span>
                </div>
              </div>

              {/* Loan Overview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                <div>
                  <div className="text-slate-400">Loan Amount</div>
                  <div className="text-lg font-black text-white">₹30,00,000</div>
                </div>
                <div>
                  <div className="text-slate-400">Assigned Bank</div>
                  <div className="text-lg font-extrabold text-emerald-400">PNB (6.50%)</div>
                </div>
                <div>
                  <div className="text-slate-400">Tenure</div>
                  <div className="text-lg font-bold text-white">20 Years</div>
                </div>
                <div>
                  <div className="text-slate-400">Est. Monthly EMI</div>
                  <div className="text-lg font-bold text-white">₹22,367/mo</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Sanction Timeline Progress</span>
                  <span className="text-emerald-400">Estimated Sanction: May 8, 2026</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="w-[40%] bg-emerald-500 h-full" />
                </div>
              </div>

              {/* Milestone Tracker */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold text-white">Application Received (May 1, 2:30 PM)</div>
                    <div className="text-slate-400 text-[11px]">Personal &amp; income profile created.</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold text-white">Initial Verification Done (May 2, 10:00 AM)</div>
                    <div className="text-slate-400 text-[11px]">Salary slip &amp; bank statement approved.</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-emerald-400">
                  <Clock className="w-5 h-5 shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold">Document Re-verification (In Progress)</div>
                    <div className="text-slate-400 text-[11px]">Awaiting Aadhaar reupload.</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-700 flex items-center justify-center text-[10px] shrink-0">4</div>
                  <div className="flex-1">
                    <div>PNB Bank Submission (Expected May 4)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Verification Queue */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" /> Uploaded Document Docket
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white">Salary Slips (Last 3 Months)</div>
                      <div className="text-[10px] text-slate-400">Verified by Priya Gupta (May 2)</div>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full text-[10px]">
                    VERIFIED ✅
                  </span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white">Bank Statement (6 Months)</div>
                      <div className="text-[10px] text-slate-400">Avg Monthly Inflow: ₹1.5 Lakhs</div>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full text-[10px]">
                    VERIFIED ✅
                  </span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white">PAN Card Document</div>
                      <div className="text-[10px] text-slate-400">Under verification</div>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full text-[10px]">
                    PENDING ⏳
                  </span>
                </div>

                <div className="p-3 bg-slate-950 border border-red-500/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="font-bold text-white">Aadhaar Card Copy</div>
                      <div className="text-[10px] text-red-400">
                        {aadhaarUploaded ? "Reuploaded - Pending Review" : "Rejected: Blurry Scan"}
                      </div>
                    </div>
                  </div>
                  <label className="bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-500/30 text-xs font-bold cursor-pointer">
                    {aadhaarUploaded ? "Done" : "Reupload"}
                    <input type="file" onChange={() => setAadhaarUploaded(true)} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Assigned Officer Card */}
            <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 space-y-4">
              <div className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Assigned Loan Officer</div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center text-xl border-2 border-blue-400">
                  RS
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Rajesh Sharma</h4>
                  <p className="text-xs text-slate-400">Senior Loan Officer • 8 Yrs Exp</p>
                  <div className="text-[11px] text-emerald-400 font-bold">⭐⭐⭐⭐⭐ 4.9 Rating</div>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <a
                  href="tel:7900979001"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition"
                >
                  <PhoneCall className="w-4 h-4" /> Call Officer (Ext 123)
                </a>
                <a
                  href="https://wa.me/917900979001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold py-2.5 rounded-xl transition"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Officer
                </a>
              </div>
            </div>

            {/* Refer & Earn Card */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 border border-emerald-500/40 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">Refer &amp; Earn Cash</h4>
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  ₹1,000 / Referral
                </span>
              </div>

              <p className="text-xs text-slate-300">
                Share your personal code with friends buying property. Earn ₹1,000 cash for every loan sanctioned!
              </p>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">BFS-RAJESH-CUST001</span>
                <button
                  onClick={() => alert("Referral link copied!")}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-center">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Friends Referred</div>
                  <div className="text-lg font-bold text-white">3</div>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Earned</div>
                  <div className="text-lg font-bold text-emerald-400">₹1,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
