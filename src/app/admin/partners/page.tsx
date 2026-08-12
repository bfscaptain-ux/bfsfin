"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShieldCheck, AlertTriangle, Search, Filter, CheckCircle2, XCircle,
  Settings, FileText, MessageSquare, Building, User, Send, Download, ChevronDown, X,
  Wallet, Network, Trophy, GraduationCap, ArrowUpRight, CreditCard, Award, BookOpen, Clock, Activity,
  FolderLock, HeadphonesIcon, BarChart3, Image, History, UploadCloud, Video, PhoneCall
} from 'lucide-react';

type TabType = 'profile' | 'leads' | 'documents' | 'earnings' | 'network' | 'rewards' | 'training' | 'support' | 'marketing' | 'analytics' | 'activity' | 'communication';

export default function AdminPartnersControl() {
  const [partners, setPartners] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [is360ModalOpen, setIs360ModalOpen] = useState(false);
  const [activePartnerId, setActivePartnerId] = useState<string | null>(null);
  const [activePartnerData, setActivePartnerData] = useState<any | null>(null);
  const [is360Loading, setIs360Loading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // Fetch list of partners on load
  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/partners');
      const data = await res.json();
      if (data.success) setPartners(data.partners);
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openPartner360 = async (partnerId: string) => {
    setActivePartnerId(partnerId);
    setIs360ModalOpen(true);
    setActiveTab('profile');
    setIs360Loading(true);
    
    try {
      const res = await fetch(`/api/admin/partners/${partnerId}`);
      const data = await res.json();
      if (data.success) {
        setActivePartnerData(data.partner);
      }
    } catch (error) {
      console.error("Error fetching partner 360 data:", error);
    } finally {
      setIs360Loading(false);
    }
  };

  const closePartner360 = () => {
    setIs360ModalOpen(false);
    setTimeout(() => {
      setActivePartnerId(null);
      setActivePartnerData(null);
    }, 300);
  };

  const handleApprove = async () => {
    if (!activePartnerId) return;
    try {
      const res = await fetch(`/api/admin/partners/${activePartnerId}/approve`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        // Refresh the list
        fetchPartners();
        // Update the active partner data so the modal shows the new code and status
        setActivePartnerData({ ...activePartnerData, partnerProfile: { ...activePartnerData.partnerProfile, status: 'Active', partnerCode: data.partnerCode }});
      } else {
        alert("Failed to approve partner: " + data.error);
      }
    } catch (e) {
      alert("Error approving partner");
    }
  };

  // Filtering
  const filteredPartners = partners.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.partnerCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (showPendingOnly) {
      return matchesSearch && p.status === 'Pending Approval';
    }
    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mr-3" /> 
            Partner Control Hub
          </h1>
          <p className="text-slate-400 mt-1">Full 360-degree connectivity. Manage every aspect of your partner network.</p>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Name, Email, or Partner Code (e.g. BFS-PT-001)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl py-2.5 pl-9 pr-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => setShowPendingOnly(!showPendingOnly)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition w-full md:w-auto justify-center text-sm font-bold ${showPendingOnly ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-amber-400 hover:bg-slate-700'}`}
            >
              <AlertTriangle className="w-4 h-4" /> 
              {showPendingOnly ? "View All" : "Partner Requests"}
            </button>
            <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition w-full md:w-auto justify-center text-sm font-medium">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Partner Code & Name</th>
                <th className="py-4 px-6">Tier & Commission</th>
                <th className="py-4 px-6 text-center">Total Leads</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {isLoading ? (
                <tr><td colSpan={5} className="py-12 text-center text-slate-500">Loading partners...</td></tr>
              ) : filteredPartners.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-slate-500">No partners found.</td></tr>
              ) : (
                filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400">
                          {partner.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-100 flex items-center gap-2">
                            {partner.name}
                          </div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">{partner.partnerCode} • {partner.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-block px-2.5 py-1 rounded text-xs font-bold border ${
                        partner.tier === 'Platinum' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                        partner.tier === 'Gold' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}>
                        {partner.tier}
                      </div>
                      <div className="text-xs text-emerald-400 mt-1 font-bold">{partner.commission}</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="font-bold text-lg text-white">{partner.totalLeads}</div>
                      <div className="text-[10px] text-slate-500">Submissions</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        partner.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        partner.status === 'Pending Approval' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {partner.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => openPartner360(partner.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition shadow-lg shadow-blue-500/20"
                      >
                        Partner 360
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 360 Modal */}
      <AnimatePresence>
        {is360ModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closePartner360}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              {is360Loading ? (
                <div className="p-20 text-center text-slate-400 flex flex-col items-center justify-center">
                  <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
                  Loading Partner Ecosystem Data...
                </div>
              ) : activePartnerData ? (
                <>
                  <div className="flex flex-col md:flex-row">
                    
                    {/* Left Sidebar Menu */}
                    <div className="w-full md:w-64 bg-slate-950/50 border-b md:border-b-0 md:border-r border-slate-800 p-4 shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto">
                      <div className="hidden md:block text-center mb-6 pt-4">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center text-3xl font-black text-blue-400 mb-3">
                          {activePartnerData.name?.charAt(0)}
                        </div>
                        <h2 className="font-bold text-white text-lg leading-tight">{activePartnerData.name}</h2>
                        <p className="text-xs text-slate-400 mt-1">{activePartnerData.partnerProfile?.partnerCode}</p>
                      </div>

                      <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition whitespace-nowrap ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <User className="w-4 h-4" /> Profile Info
                      </button>
                      <button onClick={() => setActiveTab('leads')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition whitespace-nowrap ${activeTab === 'leads' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <Users className="w-4 h-4" /> Leads & Pipeline
                      </button>
                      <button onClick={() => setActiveTab('earnings')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition whitespace-nowrap ${activeTab === 'earnings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <Wallet className="w-4 h-4" /> Earnings & Payouts
                      </button>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1 overflow-y-auto bg-slate-900 relative">
                      <button onClick={closePartner360} className="absolute top-4 right-4 p-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition z-10">
                        <X className="w-5 h-5" />
                      </button>

                      <div className="p-6 md:p-8 min-h-[500px]">
                        
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                          <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Partner Profile</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Email Address</label>
                                  <div className="text-sm text-slate-200 mt-1 font-medium">{activePartnerData.email}</div>
                                </div>
                                <div>
                                  <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Phone Number</label>
                                  <div className="text-sm text-slate-200 mt-1 font-medium">{activePartnerData.phone}</div>
                                </div>
                                <div>
                                  <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">City</label>
                                  <div className="text-sm text-slate-200 mt-1 font-medium">{activePartnerData.city}</div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Joined Date</label>
                                  <div className="text-sm text-slate-200 mt-1 font-medium">{activePartnerData.joinedDate}</div>
                                </div>
                                <div>
                                  <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Tier</label>
                                  <div className="text-sm text-slate-200 mt-1 font-medium">{activePartnerData.partnerProfile?.tier}</div>
                                </div>
                                <div>
                                  <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Company</label>
                                  <div className="text-sm text-slate-200 mt-1 font-medium">{activePartnerData.partnerProfile?.companyName || "N/A"}</div>
                                </div>
                              </div>
                            </div>
                            
                            {activePartnerData.partnerProfile?.status === 'Pending Approval' && (
                              <div className="mt-8 pt-6 border-t border-slate-800">
                                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-center justify-between">
                                  <div>
                                    <h4 className="text-amber-400 font-bold">Partner Request Pending</h4>
                                    <p className="text-sm text-slate-400 mt-1">This user is waiting to be approved into the BFS Partner Network.</p>
                                  </div>
                                  <button 
                                    onClick={handleApprove}
                                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                                  >
                                    <CheckCircle2 className="w-5 h-5" /> Approve Partner
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Leads Tab */}
                        {activeTab === 'leads' && (
                          <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Leads Submitted</h3>
                            {activePartnerData.leads.length === 0 ? (
                              <p className="text-slate-500 text-sm">No leads submitted yet.</p>
                            ) : (
                              <div className="space-y-3">
                                {activePartnerData.leads.map((lead: any) => (
                                  <div key={lead.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                                    <div>
                                      <div className="font-bold text-slate-200">{lead.name}</div>
                                      <div className="text-xs text-slate-500 mt-1">{lead.loanType} - ₹{lead.loanAmount.toLocaleString('en-IN')}</div>
                                    </div>
                                    <div className="text-right">
                                      <span className="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded uppercase">
                                        {lead.status}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Earnings Tab */}
                        {activeTab === 'earnings' && (
                          <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Earnings</h3>
                            
                            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 p-6 rounded-2xl flex items-center justify-between mb-6">
                              <div>
                                <div className="text-sm text-blue-200 font-medium">Total Lifetime Earnings</div>
                                <div className="text-4xl font-black text-white mt-1">₹{activePartnerData.totalEarnings.toLocaleString('en-IN')}</div>
                              </div>
                              <Wallet className="w-12 h-12 text-blue-400 opacity-50" />
                            </div>

                            <h4 className="text-sm font-bold text-slate-400 mb-3">Payout History</h4>
                            {activePartnerData.payouts.length === 0 ? (
                              <p className="text-slate-500 text-sm">No payouts yet.</p>
                            ) : (
                              <div className="space-y-2">
                                {activePartnerData.payouts.map((payout: any) => (
                                  <div key={payout.id} className="bg-slate-950 p-4 rounded-xl flex justify-between border border-slate-800">
                                    <div>
                                      <div className="text-slate-200 font-medium">{payout.leadName || "Lead Commission"}</div>
                                      <div className="text-xs text-slate-500">{new Date(payout.date).toLocaleDateString()}</div>
                                    </div>
                                    <div className="font-bold text-emerald-400">
                                      +₹{payout.amount.toLocaleString('en-IN')}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
