"use client";

import { Users, Briefcase, TrendingUp, CheckCircle2, Clock, Activity, FileCheck } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const metrics = [
    { label: "Total Leads", value: "1,248", change: "+12%", trend: "up", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Active Applications", value: "384", change: "+5%", trend: "up", icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Pending Verifications", value: "42", change: "-2%", trend: "down", icon: FileCheck, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Disbursed (This Month)", value: "₹4.2 Cr", change: "+18%", trend: "up", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const recentActivity = [
    { id: "1", title: "New Lead Registered", desc: "Rajesh Kumar applied for Home Loan (₹30L)", time: "2 mins ago", icon: Users },
    { id: "2", title: "Document Verified", desc: "Aadhaar verified for Application #APP-2024-00123", time: "1 hour ago", icon: CheckCircle2 },
    { id: "3", title: "Bank Submission", desc: "Dossier sent to PNB for Priya Sharma", time: "3 hours ago", icon: Activity },
    { id: "4", title: "Application Approved", desc: "Loan Against Property approved (₹50L)", time: "5 hours ago", icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-900 border border-emerald-800 p-6 rounded-3xl shadow-xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">Enterprise metrics and real-time activity tracking.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-emerald-900 border border-emerald-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
              <m.icon className={`w-16 h-16 ${m.color}`} />
            </div>
            <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center mb-4 border border-white/5`}>
              <m.icon className={`w-5 h-5 ${m.color}`} />
            </div>
            <p className="text-sm text-slate-400 font-bold mb-1">{m.label}</p>
            <h3 className="text-3xl font-black text-white">{m.value}</h3>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold">
              <span className={m.trend === 'up' ? 'text-emerald-400' : 'text-amber-400'}>
                {m.change}
              </span>
              <span className="text-slate-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-emerald-900 border border-emerald-800 rounded-3xl p-6 shadow-xl">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" /> Recent Activity Stream
          </h3>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="relative mt-1">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <activity.icon className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="absolute top-8 left-1/2 -ml-[1px] w-[2px] h-full bg-slate-800 -z-10" />
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-white">{activity.title}</h4>
                    <span className="text-[10px] text-slate-500 font-bold">{activity.time}</span>
                  </div>
                  <p className="text-xs text-slate-400">{activity.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-emerald-900 border border-emerald-800 rounded-3xl p-6 shadow-xl">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-500" /> Quick Actions
          </h3>
          <div className="space-y-3">
            <Link href="/admin/leads" className="block w-full p-4 rounded-2xl border border-emerald-800 bg-slate-800/50 hover:bg-slate-800 transition">
              <h4 className="text-sm font-bold text-emerald-400 mb-1">Process Leads</h4>
              <p className="text-xs text-slate-400">View and assign 15 pending new leads.</p>
            </Link>
            <Link href="/admin/applications" className="block w-full p-4 rounded-2xl border border-emerald-800 bg-slate-800/50 hover:bg-slate-800 transition">
              <h4 className="text-sm font-bold text-emerald-400 mb-1">Approve Applications</h4>
              <p className="text-xs text-slate-400">3 applications awaiting final bank submission.</p>
            </Link>
            <Link href="/admin/hero-images" className="block w-full p-4 rounded-2xl border border-emerald-800 bg-slate-800/50 hover:bg-slate-800 transition">
              <h4 className="text-sm font-bold text-purple-400 mb-1">Update Website Assets</h4>
              <p className="text-xs text-slate-400">Modify hero images and site configurations.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
