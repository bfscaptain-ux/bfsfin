"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Wallet,
  Activity,
  Briefcase,
  FileText
} from "lucide-react";
import Link from "next/link";

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  loanType: string;
  loanAmount: number;
  status: string;
  createdAt: string;
}

export default function AdminOverviewDashboard() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/leads");
        const data = await res.json();
        if (data.success) {
          setLeads(data.leads);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Calculate Metrics
  const totalLeads = leads.length;
  const newInquiries = leads.filter(l => l.status === "NEW").length;
  const inVerification = leads.filter(l => l.status === "APPLICATION_FILED").length;
  const sanctioned = leads.filter(l => l.status === "APPROVED");
  const totalSanctionedAmount = sanctioned.reduce((sum, l) => sum + l.loanAmount, 0);

  // Get 5 most recent leads
  const recentLeads = [...leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-100 tracking-tight">Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Monitor your enterprise metrics and recent applications.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/leads" className="px-4 py-2 bg-slate-100 text-slate-900 hover:bg-white text-sm font-medium rounded-lg transition-colors">
            View All Leads
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Leads */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Total Inquiries</h3>
            <Users className="w-4 h-4 text-slate-500" />
          </div>
          <div>
            <div className="text-3xl font-semibold text-slate-100">{loading ? "-" : totalLeads}</div>
            <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% from last month
            </div>
          </div>
        </div>

        {/* Metric 2: Sanctioned Amount */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Sanctioned Amount</h3>
            <Wallet className="w-4 h-4 text-slate-500" />
          </div>
          <div>
            <div className="text-3xl font-semibold text-slate-100">
              {loading ? "-" : `₹${(totalSanctionedAmount / 10000000).toFixed(2)} Cr`}
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Across {sanctioned.length} approvals
            </div>
          </div>
        </div>

        {/* Metric 3: New Pipeline */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">New Applications</h3>
            <CheckCircle2 className="w-4 h-4 text-slate-500" />
          </div>
          <div>
            <div className="text-3xl font-semibold text-slate-100">{loading ? "-" : newInquiries}</div>
            <div className="text-xs text-blue-400 mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Requires action
            </div>
          </div>
        </div>

        {/* Metric 4: In Verification */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">In Verification</h3>
            <Clock className="w-4 h-4 text-slate-500" />
          </div>
          <div>
            <div className="text-3xl font-semibold text-slate-100">{loading ? "-" : inVerification}</div>
            <div className="text-xs text-slate-500 mt-2">
              Processing documents
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Applications (Takes up 2/3) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-100">Recent Applications</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/50 text-slate-500 text-xs border-b border-slate-800">
                <tr>
                  <th className="py-3 px-5 font-medium">Client</th>
                  <th className="py-3 px-5 font-medium">Loan</th>
                  <th className="py-3 px-5 font-medium">Status</th>
                  <th className="py-3 px-5 font-medium text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">Loading data...</td>
                  </tr>
                ) : recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">No applications found.</td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-3 px-5">
                        <div className="font-medium text-slate-200">{lead.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{lead.phone}</div>
                      </td>
                      <td className="py-3 px-5">
                        <div className="font-medium text-slate-200">₹{(lead.loanAmount / 100000).toFixed(1)} L</div>
                        <div className="text-xs text-slate-500 mt-0.5">{lead.loanType}</div>
                      </td>
                      <td className="py-3 px-5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                          lead.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          lead.status === "NEW" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                          lead.status === "APPLICATION_FILED" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                          "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          {lead.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-right text-xs text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions (Takes up 1/3) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-base font-semibold text-slate-100 mb-4">Quick Links</h3>
          <div className="space-y-2">
            <Link href="/admin/leads" className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-slate-700 hover:bg-slate-800/50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="text-slate-400 group-hover:text-slate-200 transition-colors">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-200">Lead CRM</div>
                  <div className="text-xs text-slate-500">Manage all inquiries</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
            </Link>

            <Link href="/admin/articles" className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-slate-700 hover:bg-slate-800/50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="text-slate-400 group-hover:text-slate-200 transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-200">Content CMS</div>
                  <div className="text-xs text-slate-500">Update blogs & FAQs</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
