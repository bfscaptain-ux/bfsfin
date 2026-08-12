"use client";

import { useState, useEffect } from "react";
import { Users, Search, Filter, Plus, Edit2, Phone, Mail, CheckCircle2, XCircle, Clock, MapPin, Briefcase, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  loanType: string;
  loanSubcategory: string | null;
  loanPurpose: string | null;
  loanAmount: number;
  tenure: number | null;
  income: number | null;
  city: string;
  address: string | null;
  pincode: string | null;
  dob: string | null;
  gender: string | null;
  employmentType: string | null;
  employerName: string | null;
  workExperience: string | null;
  bureauConsent: boolean;
  bankName: string | null;
  accountNumber: string | null;
  ifscCode: string | null;
  source: string;
  referralCode: string | null;
  status: string;
  createdAt: string;
}

export default function AdminLeadsCRM() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination & Filtering State
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

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
      setLoading(true);
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success && data.leads.length > 0) {
        setLeads(data.leads);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.phone) return;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead)
      });
      if(res.ok) {
        fetchLeads();
        setShowAddModal(false);
      }
    } catch (e) { console.log(e); }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    // Optimistic update
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
    
    // Send to backend (Assuming there is a PUT endpoint)
    try {
      await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Filter Logic
  const filtered = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || 
                          l.phone.includes(search) || 
                          l.email.toLowerCase().includes(search.toLowerCase()) ||
                          l.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedLeads = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 if filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-lg">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" /> Lead Management CRM System
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage public inquiries, applications, and bank sanction dockets.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> Add Lead Manually
        </button>
      </div>

      {/* Advanced Filters Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm shadow-md">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, ID, phone or email..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="ALL">All Statuses ({leads.length})</option>
            <option value="NEW">New Inquiries ⭕</option>
            <option value="APPLICATION_FILED">In Verification ⏳</option>
            <option value="APPROVED">Approved Sanction ✅</option>
            <option value="REJECTED">Rejected ❌</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-1 shadow-xl overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-800">
              <tr>
                <th className="py-4 px-6 rounded-tl-2xl">Client Details</th>
                <th className="py-4 px-6">Loan & Finance</th>
                <th className="py-4 px-6">Profile & Employment</th>
                <th className="py-4 px-6">Source & Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 rounded-tr-2xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-medium">
                    <div className="animate-pulse flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      Loading Leads...
                    </div>
                  </td>
                </tr>
              ) : paginatedLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-medium">
                    No leads found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300">
                          {l.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-white block text-sm group-hover:text-blue-400 transition-colors">{l.name}</span>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                            <span className="flex items-center gap-0.5"><Phone className="w-3 h-3"/> {l.phone}</span>
                            <span className="text-slate-600">|</span>
                            <span className="flex items-center gap-0.5"><Mail className="w-3 h-3"/> {l.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-black text-emerald-400 block text-sm">
                        ₹{(l.loanAmount / 100000).toFixed(1)} Lakhs
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500/20 border border-emerald-500/50"></span>
                        {l.loanType} {l.tenure ? `(${l.tenure}M)` : ''}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-slate-200 font-semibold text-sm flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-slate-500"/>
                        {l.employmentType || "Salaried"}
                      </span>
                      <span className="block text-[11px] text-slate-400 mt-0.5">
                        Income: <strong className="text-slate-300">₹{l.income ? (l.income / 100000).toFixed(1) + "L/yr" : "N/A"}</strong>
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-slate-300 text-xs block font-medium">{l.source}</span>
                      <span className="block text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3"/> 
                        {new Date(l.createdAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold">
                      {l.status === "APPROVED" && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20"><CheckCircle2 className="w-3 h-3"/> Sanctioned</span>}
                      {l.status === "APPLICATION_FILED" && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs border border-amber-500/20"><Clock className="w-3 h-3"/> Verifying</span>}
                      {l.status === "NEW" && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20"><div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div> New Inquiry</span>}
                      {l.status === "REJECTED" && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-xs border border-red-500/20"><XCircle className="w-3 h-3"/> Rejected</span>}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedLead(l)}
                          className="p-2 bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white rounded-lg transition-colors tooltip-trigger"
                          title="View Formatted Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <select 
                          value={l.status}
                          onChange={(e) => handleUpdateStatus(l.id, e.target.value)}
                          className="bg-slate-950 border border-slate-700 text-slate-300 text-xs px-2 py-1.5 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                          <option value="NEW">Mark New</option>
                          <option value="APPLICATION_FILED">Mark Verifying</option>
                          <option value="APPROVED">Mark Approved</option>
                          <option value="REJECTED">Mark Rejected</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/50">
            <p className="text-xs text-slate-400">
              Showing <strong className="text-white">{(currentPage - 1) * itemsPerPage + 1}</strong> to <strong className="text-white">{Math.min(currentPage * itemsPerPage, filtered.length)}</strong> of <strong className="text-white">{filtered.length}</strong> entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-700 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${currentPage === idx + 1 ? 'bg-blue-600 text-white border border-blue-500' : 'bg-transparent text-slate-400 hover:bg-slate-800 border border-transparent'}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-700 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detailed View Modal (Formatted Details) */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setSelectedLead(null)}
              className="absolute top-6 right-6 p-2 bg-slate-800 hover:bg-red-500 hover:text-white text-slate-400 rounded-full transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
            
            <div className="p-8">
              <div className="flex items-center gap-4 border-b border-slate-800 pb-6 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-black text-white shadow-lg">
                  {selectedLead.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">{selectedLead.name}</h2>
                  <p className="text-sm text-blue-400 font-medium">Application ID: <span className="font-mono text-slate-300">{selectedLead.id.substring(0,8).toUpperCase()}</span></p>
                </div>
                <div className="ml-auto">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider border ${
                    selectedLead.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    selectedLead.status === 'REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {selectedLead.status.replace("_", " ")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4"/> Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Mobile Number</p>
                      <p className="text-sm text-slate-200 font-semibold">{selectedLead.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Email Address</p>
                      <p className="text-sm text-slate-200 font-semibold">{selectedLead.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Date of Birth</p>
                      <p className="text-sm text-slate-200 font-semibold">{selectedLead.dob || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Address</p>
                      <p className="text-sm text-slate-200 font-semibold">{selectedLead.address || "N/A"}, {selectedLead.city} {selectedLead.pincode}</p>
                    </div>
                  </div>
                </div>

                {/* Loan Info */}
                <div className="bg-emerald-950/20 rounded-2xl p-6 border border-emerald-900/30">
                  <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4"/> Loan Requirements
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-emerald-600/70 font-medium">Required Amount</p>
                      <p className="text-xl text-emerald-400 font-black">₹{selectedLead.loanAmount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-emerald-600/70 font-medium">Category</p>
                      <p className="text-sm text-slate-200 font-semibold">{selectedLead.loanType} {selectedLead.loanSubcategory ? `- ${selectedLead.loanSubcategory}` : ''}</p>
                    </div>
                    <div>
                      <p className="text-xs text-emerald-600/70 font-medium">Tenure</p>
                      <p className="text-sm text-slate-200 font-semibold">{selectedLead.tenure ? `${selectedLead.tenure} Months` : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-emerald-600/70 font-medium">Purpose</p>
                      <p className="text-sm text-slate-200 font-semibold">{selectedLead.loanPurpose || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Income Info */}
                <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Profile & Income
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Employment Type</p>
                      <p className="text-sm text-slate-200 font-semibold">{selectedLead.employmentType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Income/Turnover</p>
                      <p className="text-sm text-emerald-400 font-bold">₹{selectedLead.income ? selectedLead.income.toLocaleString('en-IN') : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Employer/Business Name</p>
                      <p className="text-sm text-slate-200 font-semibold">{selectedLead.employerName || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Work Experience</p>
                      <p className="text-sm text-slate-200 font-semibold">{selectedLead.workExperience || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Consent & Bank */}
                <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Banking & Consents
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Bank Name</p>
                      <p className="text-sm text-slate-200 font-semibold">{selectedLead.bankName || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Account Info</p>
                      <p className="text-sm text-slate-200 font-semibold">{selectedLead.accountNumber || "N/A"} <span className="text-slate-500 ml-2">{selectedLead.ifscCode}</span></p>
                    </div>
                    <div className="pt-4 border-t border-slate-800">
                      <div className="flex items-center gap-2">
                        {selectedLead.bureauConsent ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                        <span className="text-sm text-slate-300 font-medium">Bureau Check Consent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal (Manual) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-blue-500/40 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Add New Client Lead</h3>
            <form onSubmit={handleCreateLead} className="space-y-3 text-sm">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  placeholder="Client Name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">Email Address</label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="client@email.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">Loan Category</label>
                  <select
                    value={newLead.loanType}
                    onChange={(e) => setNewLead({ ...newLead, loanType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Home Loan">Home Loan</option>
                    <option value="Balance Transfer">Balance Transfer</option>
                    <option value="Top-Up Loan">Top-Up Loan</option>
                    <option value="Loan Against Property">LAP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={newLead.loanAmount}
                    onChange={(e) => setNewLead({ ...newLead, loanAmount: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-800 text-slate-300 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-blue-500/20"
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
