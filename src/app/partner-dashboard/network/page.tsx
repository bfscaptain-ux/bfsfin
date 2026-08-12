'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Users, TrendingUp, Link as LinkIcon, ExternalLink, AlertCircle } from 'lucide-react';
import { getPartnerNetwork } from '@/app/actions/partner';

export default function NetworkPage() {
  const [network, setNetwork] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const referralCode = 'JOHN2026';

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getPartnerNetwork();
        if (res.success && res.data) {
          setNetwork(res.data);
        } else {
          setHasError(true);
        }
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Failed to load Network</h3>
      </div>
    );
  }
  
  const totalSubPartners = network.length;
  // Calculate mock total earnings from sub-partners
  const totalPassiveIncome = network.reduce((acc, curr) => acc + (parseFloat(curr.totalEarnings.replace(/[^0-9.-]+/g,"")) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center">
          <Network className="w-8 h-8 text-purple-500 mr-3" />
          My Network
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Track your sub-partners and earn passive income from their successful referrals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Stats */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-xl border border-slate-300 dark:border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 relative z-10">Network Overview</h2>
          
          <div className="space-y-6 relative z-10">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-bold uppercase mb-1">Total Sub-Partners</p>
              <div className="flex items-center">
                <Users className="w-6 h-6 text-purple-400 mr-3" />
                <span className="text-3xl font-black text-slate-900 dark:text-white">{totalSubPartners}</span>
              </div>
            </div>
            
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-bold uppercase mb-1">Passive Income Earned</p>
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 text-emerald-400 mr-3" />
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalPassiveIncome)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-300 dark:border-slate-700/50 relative z-10">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Invite more CAs and Builders to earn 10% of their base commission!</p>
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700">
              <span className="text-purple-400 font-bold tracking-widest">{referralCode}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(referralCode)}
                className="text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors flex items-center"
              >
                <LinkIcon className="w-3 h-3 mr-1" /> Copy
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Partner List */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/30">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Downline</h2>
          </div>
          
          {network.length === 0 ? (
            <div className="p-10 text-center">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No sub-partners yet</h3>
              <p className="text-slate-500">Share your referral code to start building your network.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-500 dark:text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800/50">
                      <th className="px-6 py-5 font-bold">Partner Details</th>
                      <th className="px-6 py-5 font-bold text-center">Active Leads</th>
                      <th className="px-6 py-5 font-bold text-right">Your Earnings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {network.map((partner) => (
                      <tr key={partner.id} className="hover:bg-slate-100 dark:bg-slate-800/50 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-white">{partner.name}</span>
                            <div className="flex items-center mt-1">
                              <span className="w-2 h-2 rounded-full mr-2 bg-emerald-500"></span>
                              <span className="text-xs text-slate-600 dark:text-slate-400">Joined: {new Date(partner.joinDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="font-black text-slate-900 dark:text-white text-lg">{partner.activeLeads}</span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className="font-black text-emerald-400">{partner.totalEarnings}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Cards */}
              <div className="block sm:hidden p-4 space-y-4 bg-slate-50 dark:bg-slate-950/30">
                {network.map((partner) => (
                  <motion.div 
                    key={partner.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base">{partner.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Joined {new Date(partner.joinDate).toLocaleDateString()}</p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {partner.tier}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-2 pt-3 border-t border-slate-100 dark:border-slate-800/50">
                      <div>
                        <p className="text-[10px] text-slate-500 font-medium">Active Leads</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{partner.activeLeads}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-500 font-medium">Your Earnings</p>
                        <p className="text-sm font-bold text-emerald-400">{partner.totalEarnings}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
          
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-center">
            <a href="#" className="text-sm font-bold text-purple-400 hover:text-purple-300 inline-flex items-center">
              View Detailed Network Tree <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
