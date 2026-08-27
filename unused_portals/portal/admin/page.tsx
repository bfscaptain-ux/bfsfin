"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import {
  Lock,
  Users,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Building2,
  FileText,
  UserCheck,
  XCircle,
  Plus
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | leads | docs
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const [leadsList, setLeadsList] = useState([
    { id: "1245", name: "Rajesh Kumar", phone: "9876543210", amount: "₹30 Lakhs", type: "Home Loan", source: "Dealer Ref (Patel)", status: "APPROVED", bank: "PNB (6.50%)" },
    { id: "1244", name: "Priya Sharma", phone: "9987654321", amount: "₹25 Lakhs", type: "Balance Transfer", source: "Facebook Ads", status: "APPLICATION_FILED", bank: "Central Bank" },
    { id: "1243", name: "Amit Patel", phone: "9765432109", amount: "₹50 Lakhs", type: "LAP", source: "Google Ads", status: "APPROVED", bank: "IDBI Bank" },
    { id: "1242", name: "Neha Singh", phone: "9876512345", amount: "₹20 Lakhs", type: "Home Loan", source: "Direct Search", status: "NEW", bank: "Unassigned" },
    { id: "1241", name: "Suresh Verma", phone: "9812398123", amount: "₹35 Lakhs", type: "Home Loan", source: "Email Lead", status: "REJECTED", bank: "Low Credit Score" },
  ]);

  const updateLeadStatus = (id: string, newStatus: string) => {
    setLeadsList(leadsList.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const filteredLeads = leadsList.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.phone.includes(searchQuery) || l.id.includes(searchQuery);
    const matchesStatus = selectedStatus === "ALL" || l.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0b132b] text-slate-100 font-sans">
      <Header />

      {/* Admin Header Strip */}
      <div className="bg-slate-900 border-b border-blue-500/20 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">BFS Agra Enterprise Admin CRM</h1>
                <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/30">
                  Adv. Praveen Bhardwaj (Super Admin)
                </span>
              </div>
              <p className="text-xs text-slate-400">System Status: ✅ All 7 Bank Pipelines &amp; Lead Systems Active</p>
            </div>
          </div>

          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === "dashboard" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === "leads" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              Lead Management CRM ({leadsList.length})
            </button>
            <button
              onClick={() => setActiveTab("docs")}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === "docs" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              Doc Verification Queue
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Today's Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1">
                <div className="text-slate-400 text-xs font-semibold">Today&apos;s New Leads</div>
                <div className="text-3xl font-black text-white">24</div>
                <div className="text-[11px] text-emerald-400 font-bold">+18% vs yesterday</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1">
                <div className="text-slate-400 text-xs font-semibold">Applications Filed</div>
                <div className="text-3xl font-black text-white">18</div>
                <div className="text-[11px] text-slate-400">75% Conversion Rate</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1">
                <div className="text-slate-400 text-xs font-semibold">Sanctions Approved Today</div>
                <div className="text-3xl font-black text-emerald-400">5</div>
                <div className="text-[11px] text-emerald-400 font-bold">Avg 4.8 Days Turnaround</div>
              </div>
              <div className="bg-slate-900/90 border border-blue-500/30 p-5 rounded-2xl space-y-1 bg-gradient-to-br from-slate-900 to-blue-950">
                <div className="text-slate-300 text-xs font-semibold">Approx Daily Revenue</div>
                <div className="text-3xl font-black text-blue-300">₹50,000</div>
                <div className="text-[11px] text-slate-300">Commission Earned</div>
              </div>
            </div>

            {/* YTD Performance & Pending Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white">YTD Disbursal &amp; Revenue Analytics</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                  <div>
                    <div className="text-slate-400">Total Leads Generated</div>
                    <div className="text-xl font-bold text-white">1,245</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Total Applications</div>
                    <div className="text-xl font-bold text-white">890</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Loans Sanctioned</div>
                    <div className="text-xl font-bold text-emerald-400">445</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Total Disbursed</div>
                    <div className="text-xl font-black text-white">₹125 Crores</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Gross Revenue</div>
                    <div className="text-xl font-black text-emerald-400">₹22.5 Lakhs</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Partner Payouts</div>
                    <div className="text-xl font-bold text-blue-400">₹18.5 Lakhs</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-300">Lead Source Channel Performance</div>
                  <div className="grid grid-cols-4 gap-2 text-[11px] text-center">
                    <div className="bg-slate-900 p-2 rounded-xl">
                      <span className="text-slate-400 block">Google Ads</span>
                      <span className="text-emerald-400 font-bold">35%</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-xl">
                      <span className="text-slate-400 block">Facebook</span>
                      <span className="text-emerald-400 font-bold">40%</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-xl">
                      <span className="text-slate-400 block">Dealers</span>
                      <span className="text-emerald-400 font-bold">20%</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-xl">
                      <span className="text-slate-400 block">Organic</span>
                      <span className="text-emerald-400 font-bold">5%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Action Center */}
              <div className="lg:col-span-4 bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-emerald-400" /> Pending System Actions
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-emerald-300">12 Documents Need Verification</div>
                      <div className="text-[10px] text-slate-400">Queue: PAN &amp; Bank Stmt</div>
                    </div>
                    <button onClick={() => setActiveTab("docs")} className="text-emerald-400 font-bold hover:underline">Verify</button>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">5 Leads Not Contacted (&gt;12hr)</div>
                      <div className="text-[10px] text-slate-400">Assigned to Rajesh Sharma</div>
                    </div>
                    <button onClick={() => setActiveTab("leads")} className="text-emerald-400 font-bold hover:underline">View CRM</button>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">3 Dealer Payouts Due</div>
                      <div className="text-[10px] text-slate-400">Total: ₹37,000 for Patel &amp; Co.</div>
                    </div>
                    <button className="text-blue-400 font-bold hover:underline">Approve</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEAD MANAGEMENT CRM (PAGE 42) */}
        {activeTab === "leads" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Lead Management CRM System</h2>
                <p className="text-xs text-slate-400">Manage all public inquiries, application dockets, and bank assignments</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, phone, ID..."
                    className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="NEW">New ⭕</option>
                  <option value="APPLICATION_FILED">Application Filed ⏳</option>
                  <option value="APPROVED">Approved ✅</option>
                  <option value="REJECTED">Rejected ❌</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3">Lead ID &amp; Client</th>
                    <th className="py-3 px-3">Loan Amount &amp; Type</th>
                    <th className="py-3 px-3">Channel Source</th>
                    <th className="py-3 px-3">Bank Assignment</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3">
                        <span className="font-mono text-blue-400 font-bold block">#{lead.id}</span>
                        <span className="font-bold text-white">{lead.name}</span>
                        <span className="block text-[10px] text-slate-400">{lead.phone}</span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-emerald-400">
                        {lead.amount}
                        <span className="block text-[10px] text-slate-400 font-normal">{lead.type}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-300">{lead.source}</td>
                      <td className="py-3 px-3 font-bold text-blue-400">{lead.bank}</td>
                      <td className="py-3 px-3 font-bold">
                        {lead.status === "APPROVED" && <span className="text-emerald-400">APPROVED ✅</span>}
                        {lead.status === "APPLICATION_FILED" && <span className="text-emerald-400">IN VERIFICATION ⏳</span>}
                        {lead.status === "NEW" && <span className="text-blue-400">NEW LEAD ⭕</span>}
                        {lead.status === "REJECTED" && <span className="text-red-400">REJECTED ❌</span>}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateLeadStatus(lead.id, "APPROVED")}
                            className="bg-emerald-950 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 px-2 py-1 rounded border border-emerald-500/30 text-[10px] font-bold"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateLeadStatus(lead.id, "REJECTED")}
                            className="bg-red-950 text-red-400 hover:bg-red-500 hover:text-white px-2 py-1 rounded border border-red-500/30 text-[10px] font-bold"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENT VERIFICATION CENTER (PAGE 43) */}
        {activeTab === "docs" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">Document Verification Center</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Lead #1243 - Amit Patel (₹50L LAP)</span>
                  <span className="text-emerald-400 font-bold">Pending Review</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 flex justify-between items-center">
                    <span>📄 ITR Return (Last 2 Years - ₹25L/yr)</span>
                    <button onClick={() => alert("Verified ITR")} className="bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px]">Verify ✅</button>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 flex justify-between items-center">
                    <span>📄 PAN Card Scan (XXXXX5678)</span>
                    <button onClick={() => alert("Verified PAN")} className="bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px]">Verify ✅</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
