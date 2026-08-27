"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, Trash2, Building, GripVertical } from "lucide-react";

interface BankLogo {
  id: string;
  bankName: string;
  logoUrl: string;
  sortOrder: number;
}

export default function AdminBankLogos() {
  const [logos, setLogos] = useState<BankLogo[]>([]);
  const [bankName, setBankName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchLogos = () => {
    fetch("/api/bank-logos").then(r => r.json()).then(data => {
      if (Array.isArray(data)) setLogos(data);
    });
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  }

  async function handleUpload() {
    if (!bankName.trim() || !file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("bankName", bankName);
      formData.append("file", file);
      formData.append("sortOrder", String(logos.length));

      await fetch("/api/bank-logos", { method: "POST", body: formData });
      setBankName("");
      setFile(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      fetchLogos();
    } catch (err) {
      alert("Upload failed");
    }
    setUploading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this bank logo?")) return;
    await fetch("/api/bank-logos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchLogos();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <Building className="w-7 h-7 text-emerald-600" />
          Bank Partner Logos CMS
        </h1>
        <p className="text-slate-500 mt-1">Upload bank logos here. They will appear in the marquee on the homepage to build trust.</p>
      </div>

      <div className="bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-3xl p-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-emerald-500" /> Add New Bank Logo
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Bank Name</label>
            <input
              type="text"
              placeholder="e.g. HDFC Bank"
              value={bankName}
              onChange={e => setBankName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none"
            />
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Logo Image</label>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleFileChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>
          
          <div className="md:col-span-1 flex items-end">
            <button
              onClick={handleUpload}
              disabled={!bankName.trim() || !file || uploading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl transition-all"
            >
              {uploading ? "Uploading..." : "Upload Logo"}
            </button>
          </div>
        </div>
        
        {preview && (
          <div className="mt-4 p-4 border border-dashed border-emerald-300 dark:border-emerald-700 rounded-xl inline-block bg-white dark:bg-slate-800">
            <p className="text-xs text-slate-400 mb-2">Preview:</p>
            <img src={preview} alt="Preview" className="h-12 object-contain" />
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-3xl p-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Uploaded Logos ({logos.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {logos.map(logo => (
            <div key={logo.id} className="relative group border border-slate-200 dark:border-emerald-800 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-emerald-400 bg-slate-50 dark:bg-emerald-950 transition-all">
              <div className="h-12 flex items-center justify-center w-full">
                <img src={logo.logoUrl} alt={logo.bankName} className="max-h-full max-w-full object-contain" />
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase text-center">{logo.bankName}</p>
              
              <button
                onClick={() => handleDelete(logo.id)}
                className="absolute top-2 right-2 p-1.5 bg-red-50 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}