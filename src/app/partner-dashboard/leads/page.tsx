'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, MoreVertical, Download, AlertCircle, Phone, IndianRupee, FileText } from 'lucide-react';
import AddLeadModal from '@/components/partner/AddLeadModal';
import { getPartnerLeads } from '@/app/actions/partner';

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);

  // Pagination & Data State
  const [leads, setLeads] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch leads
  useEffect(() => {
    async function loadLeads() {
      setIsLoading(true);
      setHasError(false);
      try {
        const res = await getPartnerLeads(currentPage, 5, debouncedSearch);
        if (res.success && res.data) {
          setLeads(res.data.leads);
          setTotalCount(res.data.totalCount);
          setTotalPages(res.data.totalPages);
        } else {
          setHasError(true);
        }
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadLeads();
  }, [currentPage, debouncedSearch]);

  const getStatusBadge = (status: string) => {
    const s = status.toUpperCase();
    if (s.includes('APPROVED')) return { bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-500 shadow-[0_0_5px_#10b981]' };
    if (s.includes('PROGRESS')) return { bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: 'bg-blue-500 shadow-[0_0_5px_#3b82f6]' };
    if (s.includes('PENDING') || s.includes('CONTACTED')) return { bg: 'bg-orange-500/10 text-orange-400 border-orange-500/20', dot: 'bg-orange-500 shadow-[0_0_5px_#f97316]' };
    if (s.includes('REJECTED')) return { bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20', dot: 'bg-rose-500 shadow-[0_0_5px_#f43f5e]' };
    return { bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20', dot: 'bg-slate-500' };
  };

  return (
    <div className="space-y-6">
      <AddLeadModal isOpen={isAddLeadModalOpen} onClose={() => setIsAddLeadModalOpen(false)} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">My Leads</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Track and manage all the clients you have referred.</p>
        </div>
        <div className="flex w-full sm:w-auto space-x-3">
          <button className="flex-1 sm:flex-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:bg-slate-800 hover:text-slate-900 dark:text-white px-3 sm:px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button 
            onClick={() => setIsAddLeadModalOpen(true)}
            className="flex-1 sm:flex-none bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 sm:px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Add Lead
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-emerald-500/50 blur-xl"></div>
        
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50 dark:bg-slate-950/30">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name, ID or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 dark:text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>
          <button className="flex items-center justify-center space-x-2 px-4 py-2.5 w-full sm:w-auto bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:bg-slate-800 transition-colors font-bold text-sm">
            <Filter className="w-4 h-4" />
            <span>Filter Status</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
          ) : hasError ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-6">
              <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Error Loading Leads</h3>
              <button onClick={() => setCurrentPage(1)} className="text-emerald-500 font-bold hover:underline">Try Again</button>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-6">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No leads found</h3>
              <p className="text-sm text-slate-500">Try adjusting your search query.</p>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Lead Details</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Loan Info</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {leads.map((lead, index) => {
                      const badge = getStatusBadge(lead.status);
                      return (
                        <React.Fragment key={lead.id}>
                          <motion.tr 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setExpandedLeadId(expandedLeadId === lead.id ? null : lead.id)}
                            className="hover:bg-slate-100 dark:bg-slate-800/30 transition-colors group cursor-pointer"
                          >
                            <td className="px-6 py-5">
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-400 transition-colors">{lead.name}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-500 mt-1 font-medium">{lead.id} • {new Date(lead.date).toLocaleDateString()}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{lead.phone}</span>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900 dark:text-white">{lead.amount}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-500 font-medium">{lead.loanType}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold border ${badge.bg}`}>
                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${badge.dot}`}></span>
                                {lead.status}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-right">
                              <button className="text-slate-500 dark:text-slate-500 hover:text-emerald-400 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                <MoreVertical className="w-5 h-5" />
                              </button>
                            </td>
                          </motion.tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS (Hidden on sm screens) */}
              <div className="block sm:hidden p-4 space-y-4 bg-slate-50 dark:bg-slate-950/30">
                {leads.map((lead, index) => {
                  const badge = getStatusBadge(lead.status);
                  return (
                    <motion.div 
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-base">{lead.name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{lead.id} • {new Date(lead.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold border ${badge.bg}`}>
                          {lead.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center">
                          <IndianRupee className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
                          <div>
                            <p className="text-[10px] text-slate-500 font-medium">Loan Amount</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{lead.amount}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
                          <div>
                            <p className="text-[10px] text-slate-500 font-medium">Loan Type</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{lead.loanType}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/50">
                        <div className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                          <Phone className="w-4 h-4 mr-1.5 text-emerald-500" />
                          {lead.phone}
                        </div>
                        <button className="text-xs font-bold text-emerald-500 hover:text-emerald-400">View Details</button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-500">
            Showing {(currentPage - 1) * 5 + 1} to {Math.min(currentPage * 5, totalCount)} of {totalCount} entries
          </span>
          <div className="flex space-x-1 sm:space-x-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1 || isLoading}
              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Prev
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                disabled={isLoading}
                className={`px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
                  currentPage === page 
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0 || isLoading}
              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
