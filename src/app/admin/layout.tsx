import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { ShieldCheck, Bell, Search, Lock, Plus } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Top Navigation */}
        <header className="h-16 bg-slate-900/90 border-b border-blue-500/20 px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold text-blue-300">
              <Lock className="w-3.5 h-3.5 text-blue-400" /> Enterprise Control Center
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">|</span>
            <span className="text-xs text-emerald-400 font-medium hidden sm:flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Database Pipelines Active
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Link
              href="/admin/leads"
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition"
            >
              <Plus className="w-4 h-4" /> Add Lead / Client
            </Link>
          </div>
        </header>

        {/* Dynamic Admin Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
