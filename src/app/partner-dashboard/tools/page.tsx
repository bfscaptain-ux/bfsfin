'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Home, 
  RefreshCcw, 
  TrendingDown, 
  FileSignature, 
  Percent,
  CheckCircle2
} from 'lucide-react';

const toolsList = [
  { 
    id: 1, 
    title: 'EMI & Eligibility Calculator', 
    desc: 'Check if your client is eligible for a loan and calculate exact EMIs.',
    path: '/partner-dashboard/tools/calculator',
    icon: Calculator,
    color: 'emerald'
  },
  { 
    id: 2, 
    title: 'Home Loan Affordability', 
    desc: 'Calculate how much home your client can comfortably afford.',
    path: '/partner-dashboard/tools/affordability',
    icon: Home,
    color: 'blue'
  },
  { 
    id: 3, 
    title: 'Balance Transfer Savings', 
    desc: 'Show clients how much they can save by switching their loan to BFSFIN.',
    path: '/partner-dashboard/tools/balance-transfer',
    icon: RefreshCcw,
    color: 'purple'
  },
  { 
    id: 4, 
    title: 'Interest Rate Comparison', 
    desc: 'Compare BFSFIN rates with other top banks instantly.',
    path: '/partner-dashboard/tools/interest-rate-compare',
    icon: Percent,
    color: 'rose'
  },
  { 
    id: 5, 
    title: 'Prepayment Calculator', 
    desc: 'Calculate savings when prepaying parts of an existing loan.',
    path: '/partner-dashboard/tools/prepayment',
    icon: TrendingDown,
    color: 'amber'
  },
  { 
    id: 6, 
    title: 'Stamp Duty Calculator', 
    desc: 'Calculate state-wise stamp duty and registration charges.',
    path: '/partner-dashboard/tools/stamp-duty',
    icon: FileSignature,
    color: 'cyan'
  },
];

export default function PartnerToolsPage() {
  return (
    <div className="space-y-4 sm:space-y-8 pb-20 sm:pb-10">
      <div className="bg-white dark:bg-slate-900/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm hidden sm:block">
        <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center">
          <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mr-2 sm:mr-3" />
          The Ultimate Toolkit
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 sm:mt-2">Everything you need to give instant answers to your clients, right at your fingertips.</p>
      </div>

      <div className="sm:hidden mb-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Quick Tools</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {toolsList.map((tool, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={tool.id}
          >
            <Link href={tool.path} className="block h-full group">
              <div className="h-full bg-white dark:bg-slate-900 rounded-xl sm:rounded-3xl p-3 sm:p-6 shadow-md sm:shadow-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all group-hover:-translate-y-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                
                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-5
                  ${tool.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20' : ''}
                  ${tool.color === 'blue' ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20' : ''}
                  ${tool.color === 'purple' ? 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20' : ''}
                  ${tool.color === 'rose' ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20' : ''}
                  ${tool.color === 'amber' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20' : ''}
                  ${tool.color === 'cyan' ? 'bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20' : ''}
                `}>
                  <tool.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                
                <h3 className="text-xs sm:text-xl font-bold text-slate-900 dark:text-white sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">{tool.title}</h3>
                <p className="hidden sm:block text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{tool.desc}</p>
                
                <div className="hidden sm:flex items-center text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                  Open Tool <CheckCircle2 className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
