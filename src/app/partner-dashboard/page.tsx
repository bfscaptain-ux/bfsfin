'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Wallet, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import AddLeadModal from '@/components/partner/AddLeadModal';

const earningsData = [
  { name: 'Jan', amount: 12000 },
  { name: 'Feb', amount: 19000 },
  { name: 'Mar', amount: 15000 },
  { name: 'Apr', amount: 28000 },
  { name: 'May', amount: 22000 },
  { name: 'Jun', amount: 35000 },
];

const recentLeads = [
  { id: 1, name: 'Amit Sharma', status: 'Approved', amount: '₹50,00,000', date: '2026-08-01' },
  { id: 2, name: 'Priya Patel', status: 'In Progress', amount: '₹75,00,000', date: '2026-08-03' },
  { id: 3, name: 'Rajesh Kumar', status: 'Pending Docs', amount: '₹30,00,000', date: '2026-08-05' },
  { id: 4, name: 'Neha Gupta', status: 'Approved', amount: '₹1,20,00,000', date: '2026-08-06' },
];

export default function PartnerDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-white dark:bg-slate-900 rounded-2xl w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-40 bg-white dark:bg-slate-900 rounded-2xl"></div>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-white dark:bg-slate-900 rounded-2xl"></div>
          <div className="h-96 bg-white dark:bg-slate-900 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AddLeadModal isOpen={isAddLeadModalOpen} onClose={() => setIsAddLeadModalOpen(false)} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">Welcome back, John!</h1>
          <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 mt-0.5">Here is what is happening with your referrals today.</p>
        </div>
        <button 
          onClick={() => setIsAddLeadModalOpen(true)}
          className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-[#0F172A] px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center shadow-lg shadow-emerald-500/20"
        >
          <Users className="w-4 h-4 mr-2" />
          Add New Lead
        </button>
      </div>

      {/* Metrics Grid - Optimized for Mobile 2x2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-emerald-500/30 transition-colors flex flex-col justify-between"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors"></div>
          <div className="flex items-center justify-between relative z-10 mb-2 sm:mb-0">
            <div className="p-2 sm:p-3 bg-blue-500/10 text-blue-400 rounded-lg sm:rounded-xl border border-blue-500/20">
              <Users className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <span className="flex items-center text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              +12% <ArrowUpRight className="w-2 h-2 sm:w-3 sm:h-3 ml-0.5" />
            </span>
          </div>
          <div>
            <h3 className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-sm font-medium mt-2 sm:mt-5 relative z-10">Total Referrals</h3>
            <p className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5 sm:mt-1 relative z-10">124</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-emerald-500/30 transition-colors flex flex-col justify-between"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors"></div>
          <div className="flex items-center justify-between relative z-10 mb-2 sm:mb-0">
            <div className="p-2 sm:p-3 bg-emerald-500/10 text-emerald-400 rounded-lg sm:rounded-xl border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <span className="flex items-center text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              +5% <ArrowUpRight className="w-2 h-2 sm:w-3 sm:h-3 ml-0.5" />
            </span>
          </div>
          <div>
            <h3 className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-sm font-medium mt-2 sm:mt-5 relative z-10 line-clamp-1">Conversions</h3>
            <p className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5 sm:mt-1 relative z-10">48</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-emerald-500/30 transition-colors flex flex-col justify-between"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-colors"></div>
          <div className="flex items-center justify-between relative z-10 mb-2 sm:mb-0">
            <div className="p-2 sm:p-3 bg-purple-500/10 text-purple-400 rounded-lg sm:rounded-xl border border-purple-500/20">
              <Wallet className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <span className="flex items-center text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              +18% <ArrowUpRight className="w-2 h-2 sm:w-3 sm:h-3 ml-0.5" />
            </span>
          </div>
          <div>
            <h3 className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-sm font-medium mt-2 sm:mt-5 relative z-10 line-clamp-1">Total Earnings</h3>
            <p className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5 sm:mt-1 relative z-10">₹1.31L</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-emerald-500/30 transition-colors flex flex-col justify-between"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-xl group-hover:bg-orange-500/20 transition-colors"></div>
          <div className="flex items-center justify-between relative z-10 mb-2 sm:mb-0">
            <div className="p-2 sm:p-3 bg-orange-500/10 text-orange-400 rounded-lg sm:rounded-xl border border-orange-500/20">
              <Clock className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div>
            <h3 className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-sm font-medium mt-2 sm:mt-5 relative z-10 line-clamp-1">Pending Payouts</h3>
            <p className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5 sm:mt-1 relative z-10">₹24.5K</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
              Earnings Overview
            </h2>
            <select className="text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 focus:ring-emerald-500 focus:border-emerald-500 px-3 py-1.5 outline-none">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="colorAmountDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Earnings']}
                />
                <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAmountDark)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Recent Leads</h2>
            <button className="text-xs sm:text-sm text-emerald-400 font-medium hover:text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-lg">View All</button>
          </div>
          <div className="space-y-3 flex-1">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/50 rounded-2xl hover:bg-slate-100 dark:bg-slate-800 transition-colors group cursor-pointer">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-400 transition-colors">{lead.name}</p>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-500 mt-1">
                    <span className="font-medium text-slate-600 dark:text-slate-400">{lead.amount}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(lead.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border
                    ${lead.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      lead.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                      'bg-orange-500/10 text-orange-400 border-orange-500/20'}
                  `}>
                    {lead.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-900/20 rounded-2xl border border-blue-800/30 flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-blue-300">Need help converting?</p>
              <p className="text-xs text-blue-400/70 mt-1">Share our new home loan brochure with your pending clients.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
