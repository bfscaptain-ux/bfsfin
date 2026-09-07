"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Clock, ShieldAlert } from "lucide-react";

type Complaint = {
  id: string;
  email: string;
  targetName: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
};

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComplaints = async () => {
    try {
      const res = await fetch("/api/admin/complaints");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      setError("Failed to load complaints.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/complaints/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c));
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      alert("Error updating status");
    }
  };

  if (isLoading) return <div className="p-8 text-center text-emerald-400 animate-pulse font-bold">Loading complaints...</div>;
  if (error) return <div className="p-8 text-center text-red-400 font-bold bg-red-900/20 border border-red-500/30 rounded-xl mx-6 mt-6">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-900 border border-emerald-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-emerald-400" /> Complaints & Grievances
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review, investigate, and manage user complaints securely.</p>
        </div>
      </div>

      <div className="bg-emerald-900 border border-emerald-800 rounded-3xl p-6 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-emerald-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-emerald-800">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Target Person/Dept</th>
                <th className="py-3 px-4">Complaint Details</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Update Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 px-4 text-center text-slate-500 font-medium">No complaints found.</td>
                </tr>
              ) : (
                complaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-medium text-emerald-400 whitespace-nowrap">
                      {new Date(complaint.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{complaint.targetName}</div>
                      <div className="text-[10px] text-emerald-400 font-mono mt-0.5">{complaint.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-sm font-bold text-slate-200">{complaint.subject}</div>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 max-w-md">{complaint.description}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {complaint.status === "PENDING" && <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded text-[10px] font-bold">PENDING ⏳</span>}
                      {complaint.status === "INVESTIGATING" && <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded text-[10px] font-bold">INVESTIGATING 🔍</span>}
                      {complaint.status === "RESOLVED" && <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded text-[10px] font-bold">RESOLVED ✅</span>}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={complaint.status}
                        onChange={(e) => updateStatus(complaint.id, e.target.value)}
                        className="bg-emerald-950 border border-emerald-700 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-emerald-400 cursor-pointer"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="INVESTIGATING">Investigating</option>
                        <option value="RESOLVED">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
