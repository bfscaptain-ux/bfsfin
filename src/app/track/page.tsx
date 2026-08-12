import Link from "next/link";
import { Radar, ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Application Status | Coming Soon - BFS AGRA",
  description: "Track your home loan application status with BFS Agra.",
};

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1121] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 max-w-md w-full bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl shadow-xl shadow-emerald-500/5 p-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <Radar className="w-12 h-12 text-emerald-600 dark:text-emerald-400 animate-[spin_4s_linear_infinite]" />
          <div className="absolute top-0 right-0 w-6 h-6 bg-amber-400 border-4 border-white dark:border-slate-900 rounded-full animate-pulse flex items-center justify-center">
            <Clock className="w-3 h-3 text-amber-900" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
          Coming Soon
        </h1>
        
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          We are building an advanced tracking system. Very soon, you will be able to track your home loan application status, document verification, and disbursement details in <span className="font-semibold text-emerald-600 dark:text-emerald-400">real-time!</span>
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-emerald-600/30"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
      
      {/* Decorative dots pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
    </div>
  );
}
