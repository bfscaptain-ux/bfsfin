"use client";

import { useState, useEffect } from "react";
import { PhoneCall, Search, Phone, CheckCircle2, Clock, CalendarDays } from "lucide-react";

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  loanType: string;
  source: string;
  status: string;
  createdAt: string;
}

export default function AdminAppointments() {
  const [callbacks, setCallbacks] = useState<LeadItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCallbacks = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success && data.leads) {
        // Filter ONLY Callback Requests
        const onlyCallbacks = data.leads.filter((l: any) => l.source.startsWith("APPOINTMENT:"));
        setCallbacks(onlyCallbacks);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallbacks();
  }, []);

  const filteredCallbacks = callbacks.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.phone.includes(search)
  );

  const formatDateTime = (dateString: string) => {
    if (!dateString) return { date: "N/A", time: "N/A" };
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    };
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-900 border border-emerald-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-500/20 rounded-2xl border border-amber-500/30 flex items-center justify-center">
              <PhoneCall className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                Consultation Appointments
              </h1>
              <p className="text-sm text-emerald-300 font-medium mt-1">
                Scheduled face-to-face or virtual consultations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="w-full bg-emerald-900 border border-emerald-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="text-sm font-bold text-amber-400 bg-amber-400/10 px-4 py-2 rounded-xl border border-amber-400/20">
          {filteredCallbacks.length} Appointments Scheduled
        </div>
      </div>

      <div className="bg-emerald-900/50 border border-emerald-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-950/80 border-b border-emerald-800 text-[10px] uppercase tracking-wider text-emerald-500 font-black">
                <th className="p-4">Client Contact</th>
                <th className="p-4">Scheduled Slot</th>
                <th className="p-4">Subject / Topic</th>
                <th className="p-4">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-800/50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-emerald-400 font-bold">Loading requests...</td>
                </tr>
              ) : filteredCallbacks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">No callback requests found.</td>
                </tr>
              ) : (
                filteredCallbacks.map((item) => {
                  
                  const isAppt = item.source.startsWith("APPOINTMENT:");
                  const slotParts = isAppt ? item.source.replace("APPOINTMENT:", "").trim().split("|") : [];
                  const slotDate = slotParts[0] ? new Date(slotParts[0].trim()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A";
                  const slotTime = slotParts[1] ? slotParts[1].trim() : "N/A";

                  return (
                    <tr key={item.id} className="hover:bg-emerald-800/30 transition group">
                      <td className="p-4">
                        <div className="font-bold text-white text-[15px]">{item.name}</div>
                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-500" /> {item.phone}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                          <CalendarDays className="w-4 h-4 text-emerald-400" /> {slotDate}
                        </div>
                        <div className="text-xs text-emerald-100 font-bold mt-1 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-amber-400" /> {slotTime}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-xs font-bold text-white bg-slate-800 inline-block px-3 py-1 rounded border border-slate-700">{item.loanType}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded uppercase tracking-wider transition">
                            Mark Attended
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
})
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
