'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, CheckCircle2, Download, History, CreditCard } from 'lucide-react';
import { getPartnerEarnings } from '@/app/actions/partner';

export default function EarningsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [dbData, setDbData] = useState<{ totalWithdrawn: string, payoutHistory: any[] } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getPartnerEarnings();
        if (res.success && res.data) {
          setDbData(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6 animate-pulse px-2 sm:px-0">
        <div className="h-16 bg-white dark:bg-slate-900 rounded-2xl w-full"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="h-32 sm:h-48 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl"></div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="h-24 sm:h-48 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl"></div>
            <div className="h-24 sm:h-48 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl"></div>
          </div>
        </div>
        <div className="h-96 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl w-full mt-8"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-10">
      <div className="bg-white dark:bg-slate-900/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Earnings & Payouts</h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 mt-1">Track your commissions and manage your payout settings.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Wallet Balance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-hero-gradient p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-[0_0_30px_rgba(30,58,138,0.3)] text-slate-900 dark:text-white relative overflow-hidden border border-slate-300 dark:border-slate-700/50"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 hidden sm:block">
            <Wallet className="w-40 h-40" />
          </div>
          <div className="absolute top-0 right-0 p-2 opacity-10 transform translate-x-2 -translate-y-2 block sm:hidden">
            <Wallet className="w-24 h-24" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-blue-200 font-bold tracking-wide uppercase text-xs sm:text-sm">Available Balance</h3>
            <p className="text-4xl sm:text-5xl font-black mt-1 sm:mt-2 mb-4 sm:mb-8 drop-shadow-md">₹24,500</p>
            <div className="flex space-x-3">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-slate-900 dark:text-white border border-white/20 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold transition-all shadow-lg flex items-center">
                Withdraw Funds
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center relative overflow-hidden group hover:border-blue-500/30 transition-colors"
          >
            <div className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
            <div className="flex items-center text-slate-600 dark:text-slate-400 mb-2 sm:mb-3 relative z-10">
              <div className="bg-blue-500/10 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3 border border-blue-500/20 text-blue-400">
                <History className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-bold text-sm sm:text-base">Total Withdrawn</span>
            </div>
            <p className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white relative z-10">{dbData?.totalWithdrawn || '₹0'}</p>
            <div className="mt-2 sm:mt-4 flex items-center text-xs sm:text-sm relative z-10">
              <span className="text-emerald-400 flex items-center font-bold bg-emerald-400/10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md border border-emerald-400/20">
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" /> +15%
              </span>
              <span className="text-slate-500 dark:text-slate-500 font-medium ml-2 sm:ml-3">from last month</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
          >
            <div className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
            <div className="flex items-center text-slate-600 dark:text-slate-400 mb-2 sm:mb-3 relative z-10">
              <div className="bg-emerald-500/10 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3 border border-emerald-500/20 text-emerald-400">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-bold text-sm sm:text-base">Next Payout Date</span>
            </div>
            <p className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white relative z-10">15th Aug</p>
            <div className="mt-2 sm:mt-4 flex items-center text-xs sm:text-sm relative z-10">
              <span className="text-blue-400 font-bold bg-blue-500/10 border border-blue-500/20 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg shadow-inner">
                Auto-withdrawal Enabled
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden mt-4 sm:mt-8">
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-slate-950/30">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Payout History</h2>
          <button className="text-[10px] sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-400 flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl transition-colors shadow-md">
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Download Statement</span>
            <span className="inline sm:hidden">Download</span>
          </button>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden sm:block p-0 sm:p-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 dark:text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800/50">
                  <th className="px-6 py-5 font-bold">Transaction ID</th>
                  <th className="px-6 py-5 font-bold">Date</th>
                  <th className="px-6 py-5 font-bold">Lead Details</th>
                  <th className="px-6 py-5 font-bold">Amount</th>
                  <th className="px-6 py-5 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {dbData?.payoutHistory?.map((tx: any, i: number) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={tx.id} 
                    className="hover:bg-slate-100 dark:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <span className="font-bold text-slate-700 dark:text-slate-300">{tx.id}</span>
                    </td>
                    <td className="px-6 py-5 text-slate-600 dark:text-slate-400 text-sm font-medium">
                      {new Date(tx.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{tx.leadName}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-black text-emerald-400">{tx.amount}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="inline-flex items-center text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg w-fit">
                          <CheckCircle2 className="w-4 h-4 mr-1.5" />
                          {tx.status}
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 font-medium">To {tx.bankAccount}</p>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden p-4 space-y-3 bg-slate-50 dark:bg-slate-950/30">
          {dbData?.payoutHistory?.map((tx: any, i: number) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={tx.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{tx.leadName}</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">ID: {tx.id}</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-emerald-400 text-base">{tx.amount}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800/50 mt-2">
                <span className="text-[10px] text-slate-500 font-medium">
                  {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {tx.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
