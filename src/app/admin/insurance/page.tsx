"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Umbrella, ShieldAlert, Heart, Car } from "lucide-react";

const DUMMY_INSURANCE = [
  { id: 1, name: "Max Life Term Plan", provider: "Max Life", type: "Life", coverage: "₹1 Crore", active: true },
  { id: 2, name: "HDFC Ergo Optima Restore", provider: "HDFC Ergo", type: "Health", coverage: "₹10 Lakhs", active: true },
  { id: 3, name: "ICICI Lombard Motor", provider: "ICICI Lombard", type: "Motor", coverage: "Comprehensive", active: true },
  { id: 4, name: "Star Family Health Optima", provider: "Star Health", type: "Health", coverage: "₹5 Lakhs", active: false },
];

export default function InsuranceAdmin() {
  const [searchTerm, setSearchTerm] = useState("");

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Life': return <ShieldAlert className="w-4 h-4 text-emerald-400" />;
      case 'Health': return <Heart className="w-4 h-4 text-red-400" />;
      case 'Motor': return <Car className="w-4 h-4 text-blue-400" />;
      default: return <Umbrella className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Umbrella className="w-6 h-6 text-emerald-400" />
            Insurance Products Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage life, health, and general insurance products.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition shadow-lg shadow-emerald-900/50 shrink-0">
          <Plus className="w-4 h-4" /> Add New Policy
        </button>
      </div>

      <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by policy name or provider..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-emerald-950 border border-emerald-800/50 text-white rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-emerald-500 transition placeholder-slate-500"
          />
        </div>
        <div className="text-sm font-bold text-slate-400">
          Total Policies: <span className="text-emerald-400">{DUMMY_INSURANCE.length}</span>
        </div>
      </div>

      <div className="bg-[#0f172a]/50 border border-emerald-500/20 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-emerald-900/50 text-emerald-400 text-xs uppercase font-black tracking-wider border-b border-emerald-500/20">
              <tr>
                <th className="px-6 py-4">Policy Name</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Coverage</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-800/30">
              {DUMMY_INSURANCE.map((policy) => (
                <tr key={policy.id} className="hover:bg-emerald-900/20 transition">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                      {getIconForType(policy.type)}
                    </div>
                    {policy.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-300">{policy.provider}</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/50 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
                      {policy.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-emerald-400">{policy.coverage}</td>
                  <td className="px-6 py-4 text-center">
                    {policy.active ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 text-xs font-bold bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/50 rounded-lg transition">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
