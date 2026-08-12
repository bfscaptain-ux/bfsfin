"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import {
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  QrCode,
  Download,
  Share2,
  DollarSign,
  TrendingUp,
  Award,
  Plus
} from "lucide-react";

export default function PartnerDashboard() {
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [leads, setLeads] = useState([
    { id: 1, name: "Rajesh Kumar", amount: "₹30 Lakhs", type: "Home Loan", status: "APPROVED ✅", commission: "₹1,500 (Paid)", date: "May 1" },
    { id: 2, name: "Priya Sharma", amount: "₹25 Lakhs", type: "Balance Transfer", status: "PENDING ⏳", commission: "₹1,250 (Pending)", date: "May 2" },
    { id: 3, name: "Amit Patel", amount: "₹50 Lakhs", type: "LAP", status: "APPROVED ✅", commission: "₹2,500 (Paid)", date: "Apr 28" },
  ]);

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadPhone) return;
    setLeads([
      { id: Date.now(), name: newLeadName, amount: "₹35 Lakhs", type: "Home Loan", status: "NEW ⭕", commission: "Pending", date: "Just now" },
      ...leads
    ]);
    setNewLeadName("");
    setNewLeadPhone("");
    setShowAddLeadModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b132b] text-slate-100 font-sans">
      <Header />

      {/* Top Banner */}
      <div className="bg-slate-900 border-b border-blue-500/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-xl">
              AP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Amit Patel (Patel &amp; Co. Real Estate)</h1>
                <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-blue-500/30">
                  🌟 Premier Dealer Partner
                </span>
              </div>
              <p className="text-xs text-slate-400">Partner Code: BFS-PATEL-DEALER01 | Member Since Jan 2024</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddLeadModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg transition"
            >
              <Plus className="w-4 h-4" /> Refer Client / Add Lead
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="text-slate-400 text-xs font-semibold flex items-center justify-between">
              <span>Total Leads Sent</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white">45</div>
            <div className="text-[11px] text-emerald-400 font-bold">+8 leads this week</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="text-slate-400 text-xs font-semibold flex items-center justify-between">
              <span>Applications Filed</span>
              <Briefcase className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">32</div>
            <div className="text-[11px] text-slate-400">71% Conversion Rate</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="text-slate-400 text-xs font-semibold flex items-center justify-between">
              <span>Loans Approved</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">24</div>
            <div className="text-[11px] text-slate-400">75% Approval Rate</div>
          </div>

          <div className="bg-slate-900/90 border border-emerald-500/30 p-5 rounded-2xl space-y-2 bg-gradient-to-br from-slate-900 to-emerald-950">
            <div className="text-slate-300 text-xs font-semibold flex items-center justify-between">
              <span>Earnings This Month</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">₹24,000</div>
            <div className="text-[11px] text-slate-300">₹12,000 Pending Payout</div>
          </div>
        </div>

        {/* Lead Table & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Referrals Table (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Referred Clients &amp; Lead Tracker</h3>
                <p className="text-xs text-slate-400">Live progress of home loans referred by Patel &amp; Co.</p>
              </div>
              <button
                onClick={() => setShowAddLeadModal(true)}
                className="text-xs text-blue-400 hover:text-blue-300 font-bold"
              >
                + Add Client
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3">Client Name</th>
                    <th className="py-3 px-3">Loan Details</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Commission Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-white">
                        {lead.name}
                        <span className="block text-[10px] text-slate-400 font-normal">{lead.date}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-emerald-400">{lead.amount}</span>
                        <span className="block text-[10px] text-slate-400">{lead.type}</span>
                      </td>
                      <td className="py-3 px-3 font-bold">{lead.status}</td>
                      <td className="py-3 px-3 font-semibold text-blue-400">{lead.commission}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Marketing & Link Tools (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-blue-500/30 rounded-3xl p-6 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-blue-400" /> Your Partner QR &amp; Link
              </h4>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-3">
                <div className="w-28 h-28 bg-white p-2 rounded-xl mx-auto flex items-center justify-center font-bold text-slate-950 text-xs">
                  [ QR Code ]
                </div>
                <div className="text-[11px] text-slate-400">Scan to apply via Patel &amp; Co. link</div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono">
                <span className="text-blue-400 truncate">https://bfsagra.com/apply?ref=BFS-PATEL-DEALER01</span>
                <button onClick={() => alert("Link copied!")} className="text-slate-400 hover:text-white p-1">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs transition">
                <Download className="w-4 h-4" /> Download Marketing Pamphlets (PDF)
              </button>
            </div>
          </div>
        </div>

        {/* Modal for adding lead */}
        {showAddLeadModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-blue-500/40 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
              <h3 className="text-lg font-bold text-white">Refer New Client Lead</h3>
              <form onSubmit={handleAddLead} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    placeholder="e.g. Neha Singh"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Client Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddLeadModal(false)}
                    className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl"
                  >
                    Submit Referral Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
