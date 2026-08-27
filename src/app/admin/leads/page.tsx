"use client";

import { useState, useEffect } from "react";
import { Users, Search, Filter, Plus, Edit2, Phone, Mail, CheckCircle2, XCircle, Clock } from "lucide-react";

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  loanType: string;
  loanAmount: number;
  income: number | null;
  city: string;
  employmentType: string | null;
  source: string;
  referralCode: string | null;
  status: string;
  createdAt?: string;
}

export default function AdminLeadsCRM() {
  const [leads, setLeads] = useState<LeadItem[]>([
    { id: "1245", name: "Rajesh Kumar", phone: "9876543210", email: "rajesh@email.com", loanType: "Home Loan", loanAmount: 3000000, income: 1800000, city: "Agra", employmentType: "Salaried", source: "Dealer Referral", referralCode: "BFS-PATEL-DEALER01", status: "APPROVED" },
    { id: "1244", name: "Priya Sharma", phone: "9987654321", email: "priya.s@gmail.com", loanType: "Balance Transfer", loanAmount: 2500000, income: 1200000, city: "Agra", employmentType: "Salaried", source: "Facebook Ads", referralCode: null, status: "APPLICATION_FILED" },
    { id: "1243", name: "Amit Patel", phone: "9765432109", email: "amit.patel@business.com", loanType: "Loan Against Property", loanAmount: 5000000, income: 3000000, city: "Agra", employmentType: "Self-Employed", source: "Google Search", referralCode: null, status: "APPROVED" },
    { id: "1242", name: "Neha Singh", phone: "9876512345", email: "neha.singh@yahoo.com", loanType: "Home Loan", loanAmount: 2000000, income: 900000, city: "Agra", employmentType: "Salaried", source: "Direct Search", referralCode: null, status: "NEW" },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    email: "",
    loanType: "Home Loan",
    loanAmount: "3000000",
    income: "1500000",
    city: "Agra",
    employmentType: "Salaried",
    source: "Manual Admin Entry",
  });

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success && data.leads) {
        const fullLeads = data.leads.filter((l: any) => l.loanType !== "Callback Request" && !l.source.startsWith("APPOINTMENT:"));
        if(fullLeads.length > 0) setLeads(fullLeads);
        else setLeads([]);
      }
    } catch (e) { console.log(e); }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.phone) return;

    const leadObj: LeadItem = {
      id: Date.now().toString(),
      name: newLead.name,
      phone: newLead.phone,
      email: newLead.email,
      loanType: newLead.loanType,
      loanAmount: parseFloat(newLead.loanAmount),
      income: parseFloat(newLead.income),
      city: newLead.city,
      employmentType: newLead.employmentType,
      source: newLead.source,
      referralCode: null,
      status: "NEW"
    };

    setLeads([leadObj, ...leads]);
    setShowAddModal(false);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead)
      });
    } catch (e) { console.log(e); }
  };

  const handleUpdateStatus = (id: string, status: string) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
  };

  const filtered = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search) || l.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-900 border border-emerald-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" /> Website Leads Collector
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review public inquiries from the website and export them to your main CRM.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg transition"
        >
          <Plus className="w-4 h-4" /> Add Lead Manually
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-emerald-900 border border-emerald-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, phone or email..."
            className="w-full bg-emerald-950 border border-emerald-800 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-400 font-semibold">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Statuses ({leads.length})</option>
            <option value="NEW">New Inquiries ⭕</option>
            <option value="CONTACTED">Contacted ⏳</option>
            <option value="EXPORTED">Exported to CRM ✅</option>
            <option value="JUNK">Junk ❌</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-emerald-900 border border-emerald-800 rounded-3xl p-6 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-emerald-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-emerald-800">
              <tr>
                <th className="py-3 px-4">Client Contact</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Loan Needed</th>
                <th className="py-3 px-4">Income &amp; Profile</th>
                <th className="py-3 px-4">Lead Source</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white block text-sm">{l.name}</span>
                    <span className="text-slate-400 text-[11px]">{l.phone} | {l.email}</span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-emerald-400">
                    ₹{(l.loanAmount / 100000).toFixed(1)} Lakhs
                    <span className="block text-[10px] text-slate-400 font-normal">{l.loanType}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-slate-200 font-semibold">{l.employmentType || "Salaried"}</span>
                    <span className="block text-[10px] text-slate-400">
                      Income: ₹{l.income ? (l.income / 100000).toFixed(1) + "L/yr" : "N/A"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {l.source}
                    {l.referralCode && <span className="block text-[10px] text-emerald-400 font-mono">{l.referralCode}</span>}
                  </td>
                  <td className="py-3.5 px-4 font-bold">
                    {l.status === "EXPORTED" && <span className="text-emerald-400">EXPORTED ✅</span>}
                    {l.status === "CONTACTED" && <span className="text-purple-400">CONTACTED ⏳</span>}
                    {l.status === "NEW" && <span className="text-emerald-400">NEW INQUIRY ⭕</span>}
                    {l.status === "JUNK" && <span className="text-slate-500">JUNK ❌</span>}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => handleUpdateStatus(l.id, "EXPORTED")}
                        className="bg-emerald-950 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 px-2 py-1 rounded border border-emerald-500/30 text-[10px] font-bold"
                      >
                        Sent to CRM
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(l.id, "JUNK")}
                        className="bg-slate-800 text-slate-400 hover:bg-slate-700 px-2 py-1 rounded border border-slate-700 text-[10px] font-bold"
                      >
                        Mark Junk
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-emerald-900 border border-emerald-500/40 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Add New Client Lead</h3>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  placeholder="Client Name"
                  className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="client@email.com"
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Loan Category</label>
                  <select
                    value={newLead.loanType}
                    onChange={(e) => setNewLead({ ...newLead, loanType: e.target.value })}
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  >
                    <option value="Home Loan">Home Loan</option>
                    <option value="Balance Transfer">Balance Transfer</option>
                    <option value="Top-Up Loan">Top-Up Loan</option>
                    <option value="Loan Against Property">LAP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={newLead.loanAmount}
                    onChange={(e) => setNewLead({ ...newLead, loanAmount: e.target.value })}
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Create Lead Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
