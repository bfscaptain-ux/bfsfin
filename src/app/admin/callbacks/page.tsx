"use client";

import { useState, useEffect } from "react";
import { PhoneCall, Trash2, CheckCircle2, Clock, XCircle, Search } from "lucide-react";
import { CallbackRequest } from "@/types/callback";

export default function AdminCallbacks() {
  const [callbacks, setCallbacks] = useState<CallbackRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCallbacks = () => {
    setLoading(true);
    fetch("/api/callbacks")
      .then(res => res.json())
      .then(res => {
        setCallbacks(Array.isArray(res) ? res : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCallbacks();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/callbacks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      fetchCallbacks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this request?")) return;
    try {
      await fetch(`/api/callbacks?id=${id}`, { method: "DELETE" });
      fetchCallbacks();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = callbacks.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-900 border border-emerald-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <PhoneCall className="w-6 h-6 text-emerald-400" /> Callback Requests
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage verified leads from the Contact Us page.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-emerald-950 border border-emerald-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="bg-emerald-900 border border-emerald-800 rounded-3xl p-6 shadow-xl space-y-4">
        {loading ? (
          <div className="text-center py-10 text-emerald-400 animate-pulse">Loading leads...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10 text-slate-400">No callback requests found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-emerald-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-emerald-800">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {new Date(c.date).toLocaleDateString()} <br/>
                      <span className="text-[9px] text-slate-500">{new Date(c.date).toLocaleTimeString()}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{c.name}</div>
                      <div className="text-emerald-400">{c.phone}</div>
                      <div className="text-slate-400 text-[10px]">{c.email}</div>
                      <div className="text-slate-500 text-[10px]">{c.city}{c.state ? `, ${c.state}` : ''}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded border border-slate-700 text-[10px] mb-1 inline-block">
                        {c.loanType}
                      </span>
                      {c.loanSubType && (
                        <div className="font-bold text-emerald-400 text-xs mt-1">{c.loanSubType}</div>
                      )}
                      {c.message && <div className="text-slate-400 text-[10px] mt-1 max-w-[200px] truncate" title={c.message}>{c.message}</div>}
                    </td>
                    <td className="py-3.5 px-4">
                      <select 
                        value={c.status}
                        onChange={(e) => updateStatus(c.id, e.target.value)}
                        className={`text-[10px] font-bold px-2 py-1 rounded border outline-none ${
                          c.status === 'New' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                          c.status === 'Contacted' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                          'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4">
                      <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-300 p-1 bg-red-400/10 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
