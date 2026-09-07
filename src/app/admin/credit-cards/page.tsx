"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, CreditCard, CheckCircle, XCircle } from "lucide-react";

const DUMMY_CARDS = [
  { id: 1, name: "HDFC Millennia", provider: "HDFC Bank", type: "Cashback", fee: "₹1,000", active: true },
  { id: 2, name: "SBI SimplyCLICK", provider: "SBI Card", type: "Shopping", fee: "₹499", active: true },
  { id: 3, name: "Axis Flipkart", provider: "Axis Bank", type: "Shopping", fee: "₹500", active: true },
  { id: 4, name: "ICICI Amazon Pay", provider: "ICICI Bank", type: "Cashback", fee: "Lifetime Free", active: true },
  { id: 5, name: "American Express Platinum", provider: "Amex", type: "Travel", fee: "₹60,000", active: false },
];

export default function CreditCardsAdmin() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-400" />
            Credit Cards Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">Add, edit, or remove credit card products from the frontend catalog.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition shadow-lg shadow-emerald-900/50 shrink-0">
          <Plus className="w-4 h-4" /> Add New Card
        </button>
      </div>

      <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by card name or bank..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-emerald-950 border border-emerald-800/50 text-white rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-emerald-500 transition placeholder-slate-500"
          />
        </div>
        <div className="text-sm font-bold text-slate-400">
          Total Cards: <span className="text-emerald-400">{DUMMY_CARDS.length}</span>
        </div>
      </div>

      <div className="bg-[#0f172a]/50 border border-emerald-500/20 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-emerald-900/50 text-emerald-400 text-xs uppercase font-black tracking-wider border-b border-emerald-500/20">
              <tr>
                <th className="px-6 py-4">Card Name</th>
                <th className="px-6 py-4">Bank / Provider</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Annual Fee</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-800/30">
              {DUMMY_CARDS.map((card) => (
                <tr key={card.id} className="hover:bg-emerald-900/20 transition">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center border border-slate-700">💳</div>
                    {card.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-300">{card.provider}</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/50 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
                      {card.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-emerald-400">{card.fee}</td>
                  <td className="px-6 py-4 text-center">
                    {card.active ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg">
                        <CheckCircle className="w-3.5 h-3.5" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 text-xs font-bold bg-slate-800 px-2 py-1 rounded-lg">
                        <XCircle className="w-3.5 h-3.5" /> Inactive
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
