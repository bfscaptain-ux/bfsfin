"use client";

import { useState } from "react";
import { Briefcase, CheckCircle2, Clock, FileText, Search, UserCheck } from "lucide-react";

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState([
    {
      appNo: "APP-2024-00123",
      customer: "Rajesh Kumar",
      phone: "9876543210",
      loanType: "Home Loan",
      amount: "₹30,00,000",
      bank: "PNB",
      officer: "Rajesh Sharma",
      status: "DOCUMENTS_VERIFYING",
      progress: 40,
      expected: "May 8, 2026"
    },
    {
      appNo: "APP-2024-00456",
      customer: "Priya Sharma",
      phone: "9987654321",
      loanType: "Balance Transfer",
      amount: "₹25,00,000",
      bank: "Central Bank of India",
      officer: "Rajesh Sharma",
      status: "APPROVED",
      progress: 100,
      expected: "Sanctioned ✅"
    }
  ]);

  const [search, setSearch] = useState("");

  const handleUpdateStatus = (appNo: string, newStatus: string, progress: number) => {
    setApps(apps.map(a => a.appNo === appNo ? { ...a, status: newStatus, progress } : a));
  };

  const filtered = apps.filter(a => a.appNo.toLowerCase().includes(search.toLowerCase()) || a.customer.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-400" /> Application Dockets Manager
          </h1>
          <p className="text-xs text-slate-400 mt-1">Track and transition application stages from document verification to bank disbursal.</p>
        </div>

        <div className="relative w-full sm:w-72 text-xs">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by dossier # or customer..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((a) => (
          <div key={a.appNo} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-blue-400">{a.appNo}</span>
                <h3 className="text-lg font-bold text-white">{a.customer} ({a.phone})</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
                  {a.status} ({a.progress}%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
              <div>
                <div className="text-slate-400">Loan Amount</div>
                <div className="font-bold text-white text-sm">{a.amount}</div>
              </div>
              <div>
                <div className="text-slate-400">Assigned Bank</div>
                <div className="font-bold text-emerald-400 text-sm">{a.bank}</div>
              </div>
              <div>
                <div className="text-slate-400">Assigned Officer</div>
                <div className="font-bold text-slate-200">{a.officer}</div>
              </div>
              <div>
                <div className="text-slate-400">Est. Approval</div>
                <div className="font-bold text-emerald-400">{a.expected}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <div className="text-slate-400">Advance Stage:</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleUpdateStatus(a.appNo, "BANK_SUBMITTED", 60)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 font-bold"
                >
                  Bank Submitted (60%)
                </button>
                <button
                  onClick={() => handleUpdateStatus(a.appNo, "APPROVED", 90)}
                  className="bg-emerald-950 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 px-3 py-1.5 rounded-xl border border-emerald-500/30 font-bold"
                >
                  Approve Sanction (90%)
                </button>
                <button
                  onClick={() => handleUpdateStatus(a.appNo, "DISBURSED", 100)}
                  className="bg-blue-950 text-blue-300 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-xl border border-blue-500/30 font-bold"
                >
                  Disbursed Cheque (100%)
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
