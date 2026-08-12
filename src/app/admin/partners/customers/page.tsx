'use client';

import React, { useState } from 'react';
import { Search, User, Briefcase, Phone, Mail, MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { searchClientOrigin } from '@/app/actions/adminEcosystem';

export default function ClientTrackerPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ leads: any[], customers: any[] }>({ leads: [], customers: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length < 2) return;
    
    setIsSearching(true);
    const res = await searchClientOrigin(query);
    if (res.success && res.data) {
      setResults(res.data);
    }
    setIsSearching(false);
    setHasSearched(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center">
          <Search className="w-6 h-6 text-blue-500 mr-2" />
          Client Origin Tracker
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Trace the complete origin chain of any lead or registered customer back to the referring partner.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Client Name, Email, Phone, or ID..."
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSearching}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition disabled:opacity-50"
          >
            {isSearching ? 'Tracking...' : 'Trace Origin'}
          </button>
        </form>
      </div>

      {hasSearched && results.leads.length === 0 && results.customers.length === 0 && (
        <div className="text-center p-12 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
          <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-300">No Records Found</h3>
          <p className="text-slate-500 text-sm">Could not find any leads or customers matching "{query}".</p>
        </div>
      )}

      {hasSearched && (results.leads.length > 0 || results.customers.length > 0) && (
        <div className="space-y-8">
          {/* LEADS TRACKING */}
          {results.leads.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4 px-2 border-b border-slate-800 pb-2">Lead Origin Chain</h2>
              <div className="space-y-4">
                {results.leads.map(lead => (
                  <div key={lead.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                    {/* Client Side */}
                    <div className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-800 relative w-full">
                      <span className="absolute -top-3 -left-2 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Lead</span>
                      <div className="font-bold text-white text-lg">{lead.name}</div>
                      <div className="text-slate-400 text-sm mt-1 flex items-center gap-3">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone}</span>
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</span>
                      </div>
                      <div className="mt-3 inline-block bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-md font-medium border border-slate-700">
                        {lead.loanType} - ₹{(lead.loanAmount / 100000).toFixed(1)}L
                      </div>
                    </div>

                    {/* Connection Arrow */}
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <div className="text-[10px] font-bold uppercase mb-1 tracking-widest text-emerald-500">Originated By</div>
                      <ArrowRight className="w-6 h-6 text-emerald-500" />
                    </div>

                    {/* Partner Side */}
                    <div className="flex-1 bg-emerald-950/20 p-4 rounded-xl border border-emerald-900/30 relative w-full">
                       <span className="absolute -top-3 -right-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Referring Partner</span>
                       {lead.user ? (
                         <>
                           <div className="font-bold text-emerald-400 text-lg flex items-center gap-2">
                             {lead.user.name} <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                           </div>
                           <div className="text-slate-400 text-sm mt-1 flex items-center gap-3">
                             <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {lead.user.partnerProfile?.companyName || 'Freelance Partner'}</span>
                           </div>
                           <div className="mt-3 flex gap-2">
                             <span className="inline-block bg-emerald-900/40 text-emerald-300 text-xs px-2 py-1 rounded-md font-bold border border-emerald-800/50">
                               {lead.user.partnerProfile?.tier || 'Silver'} Tier
                             </span>
                             <span className="inline-block bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-md font-medium border border-slate-700">
                               ID: {lead.user.id.substring(0,6).toUpperCase()}
                             </span>
                           </div>
                         </>
                       ) : (
                         <div className="text-slate-500 italic py-4">Direct Organic Lead (No Partner)</div>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOMERS TRACKING */}
          {results.customers.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4 px-2 border-b border-slate-800 pb-2 mt-8">Registered Customer Origin Chain</h2>
              <div className="space-y-4">
                {results.customers.map(customer => (
                  <div key={customer.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                    {/* Client Side */}
                    <div className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-800 relative w-full">
                      <span className="absolute -top-3 -left-2 bg-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">App Customer</span>
                      <div className="font-bold text-white text-lg">{customer.name}</div>
                      <div className="text-slate-400 text-sm mt-1 flex items-center gap-3">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {customer.phone}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {customer.city}</span>
                      </div>
                    </div>

                    {/* Connection Arrow */}
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <div className="text-[10px] font-bold uppercase mb-1 tracking-widest text-emerald-500">Referred By</div>
                      <ArrowRight className="w-6 h-6 text-emerald-500" />
                    </div>

                    {/* Partner Side */}
                    <div className="flex-1 bg-emerald-950/20 p-4 rounded-xl border border-emerald-900/30 relative w-full">
                       <span className="absolute -top-3 -right-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Upline Partner</span>
                       {customer.referredBy ? (
                         <>
                           <div className="font-bold text-emerald-400 text-lg flex items-center gap-2">
                             {customer.referredBy.name} <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                           </div>
                           <div className="mt-3 flex gap-2">
                             <span className="inline-block bg-emerald-900/40 text-emerald-300 text-xs px-2 py-1 rounded-md font-bold border border-emerald-800/50">
                               Ref Code: {customer.referredBy.referralCode || 'N/A'}
                             </span>
                           </div>
                         </>
                       ) : (
                         <div className="text-slate-500 italic py-4">Direct Sign Up (No Referral)</div>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
