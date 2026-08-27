"use client";

import { useState } from "react";
import { FileCheck, CheckCircle2, XCircle, AlertCircle, Eye, RefreshCw } from "lucide-react";

export default function AdminDocumentsPage() {
  const [docQueue, setDocQueue] = useState([
    { id: "d1", client: "Rajesh Kumar (APP-2024-00123)", docName: "Aadhaar Card Copy", status: "REJECTED", reason: "Image quality too low. Blurry scan." },
    { id: "d2", client: "Amit Patel (APP-2024-00456)", docName: "ITR Returns (2 Years)", status: "PENDING", reason: "" },
    { id: "d3", client: "Priya Sharma (APP-2024-00789)", docName: "6 Months Bank Statement", status: "VERIFIED", reason: "" },
  ]);

  const handleVerify = (id: string) => {
    setDocQueue(docQueue.map(d => d.id === id ? { ...d, status: "VERIFIED", reason: "" } : d));
  };

  const handleReject = (id: string) => {
    const reason = prompt("Enter rejection reason for client:", "Blurry image. Please reupload high resolution scan.");
    if (!reason) return;
    setDocQueue(docQueue.map(d => d.id === id ? { ...d, status: "REJECTED", reason } : d));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-900 border border-emerald-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-emerald-400" /> Document Verification Queue
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review customer upload dockets and provide instant verification or rejection feedback.</p>
        </div>
      </div>

      <div className="bg-emerald-900 border border-emerald-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-emerald-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-emerald-800">
              <tr>
                <th className="py-3 px-4">Application &amp; Client</th>
                <th className="py-3 px-4">Document Category</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">Feedback / Note</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {docQueue.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-bold text-white">{item.client}</td>
                  <td className="py-3.5 px-4 text-slate-300 font-semibold">{item.docName}</td>
                  <td className="py-3.5 px-4 font-bold">
                    {item.status === "VERIFIED" && <span className="text-emerald-400">VERIFIED ✅</span>}
                    {item.status === "PENDING" && <span className="text-emerald-400">PENDING ⏳</span>}
                    {item.status === "REJECTED" && <span className="text-red-400">REJECTED ❌</span>}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{item.reason || "-"}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleVerify(item.id)}
                        className="bg-emerald-950 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 px-2.5 py-1 rounded-lg border border-emerald-500/30 text-[10px] font-bold"
                      >
                        Accept ✅
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="bg-red-950 text-red-400 hover:bg-red-500 hover:text-white px-2.5 py-1 rounded-lg border border-red-500/30 text-[10px] font-bold"
                      >
                        Reject ❌
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
