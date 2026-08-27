"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Award, Shield, FileText, CheckCircle2, ShieldCheck, Image as ImageIcon, ChevronDown, Upload } from "lucide-react";
import { motion } from "framer-motion";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  registrationNo: string;
  validity: string;
  description: string;
  imageUrl: string;
}

export default function CertificationsAdmin() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedCert, setExpandedCert] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/certifications")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCertificates(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certificates)
      });
      if (res.ok) alert("Certificates saved successfully!");
    } catch (e) {
      alert("Error saving certificates");
    }
    setSaving(false);
  };

  const addCertificate = () => {
    const newId = Date.now().toString();
    setCertificates([
      { 
        id: newId, 
        title: "", 
        issuer: "", 
        registrationNo: "", 
        validity: "", 
        description: "", 
        imageUrl: "" 
      },
      ...certificates
    ]);
    setExpandedCert(newId);
  };

  const removeCertificate = (id: string) => {
    setCertificates(certificates.filter(c => c.id !== id));
  };

  const updateCertificate = (id: string, field: keyof Certificate, value: string) => {
    setCertificates(certificates.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, certId: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploadingId(certId);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "certifications"); // will save to public/certifications

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        updateCertificate(certId, "imageUrl", data.url);
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (err) {
      alert("Error uploading file");
    } finally {
      setUploadingId(null);
    }
  };

  if (loading) return <div className="p-8 text-emerald-100 font-bold">Loading Legal Vault...</div>;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
            <ShieldCheck className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Legal & Compliance Vault</h2>
            <p className="text-emerald-400/80 text-sm mt-1">Manage official DSA registrations, ISO certs, and MSME licenses.</p>
          </div>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="shrink-0 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
        >
          <Save className="w-5 h-5" /> {saving ? "Saving..." : "Publish Vault"}
        </button>
      </div>

      <button 
        onClick={addCertificate} 
        className="mb-8 w-full flex items-center justify-center gap-2 bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 py-4 rounded-2xl font-bold transition-all border-dashed"
      >
        <Plus className="w-5 h-5" /> Add New Official Certificate
      </button>

      <div className="grid grid-cols-1 gap-6">
        {certificates.map((cert) => {
          const isExpanded = expandedCert === cert.id;

          return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={cert.id} 
            className="bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden group transition-all duration-300 shadow-xl"
          >
            {/* Header / Collapse Trigger */}
            <div 
              className="p-6 md:p-8 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition border-b border-transparent data-[expanded=true]:border-slate-800"
              data-expanded={isExpanded}
              onClick={() => setExpandedCert(isExpanded ? null : cert.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800 shrink-0 shadow-inner">
                  {cert.imageUrl ? (
                    <img src={cert.imageUrl} alt={cert.title} className="w-8 h-8 object-contain opacity-70" />
                  ) : (
                    <Shield className="w-6 h-6 text-slate-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {cert.title || "Untitled Certificate"}
                  </h3>
                  <p className="text-xs font-medium text-emerald-500 mt-1 uppercase tracking-wider">
                    {cert.issuer || "No Issuer"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); removeCertificate(cert.id); }} 
                  className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition opacity-0 group-hover:opacity-100"
                  title="Delete Certificate"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <ChevronDown className={`w-6 h-6 text-slate-500 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="p-6 md:p-8 pt-6 relative z-10 animate-in slide-in-from-top-4 duration-300 fade-in border-t border-slate-800">
                {/* Watermark effect */}
                <div className="absolute right-0 top-0 opacity-[0.02] pointer-events-none transform translate-x-1/3 -translate-y-1/4">
                  <Award className="w-96 h-96" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                  
                  {/* Left Column: Image Preview & URL */}
                  <div className="lg:col-span-3 flex flex-col gap-4">
                    <div className="w-full aspect-square bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center overflow-hidden p-4 relative group/img">
                      {cert.imageUrl ? (
                        <img src={cert.imageUrl} alt="Certificate Logo" className="w-full h-full object-contain filter drop-shadow-lg" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-600">
                          <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                          <span className="text-xs font-bold uppercase tracking-wider">No Logo</span>
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-emerald-500/20 backdrop-blur-md px-2 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3" /> Official Seal
                      </div>

                      {/* Upload Overlay */}
                      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="cursor-pointer bg-emerald-500 text-slate-900 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
                          {uploadingId === cert.id ? "Uploading..." : <><Upload className="w-4 h-4" /> Upload Image</>}
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleFileUpload(e, cert.id)}
                            disabled={uploadingId === cert.id}
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Seal / Logo Image URL</label>
                      <input 
                        type="text" 
                        value={cert.imageUrl} 
                        onChange={(e) => updateCertificate(cert.id, "imageUrl", e.target.value)}
                        placeholder="/banks/sbi.png or URL"
                        className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Right Column: Legal Details */}
                  <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Certificate Title
                      </label>
                      <input 
                        type="text" 
                        value={cert.title} 
                        onChange={(e) => updateCertificate(cert.id, "title", e.target.value)}
                        placeholder="e.g. Direct Selling Agent (DSA)"
                        className="w-full bg-slate-950 border border-slate-800 text-white font-bold text-lg rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Issuing Authority</label>
                      <input 
                        type="text" 
                        value={cert.issuer} 
                        onChange={(e) => updateCertificate(cert.id, "issuer", e.target.value)}
                        placeholder="e.g. State Bank of India"
                        className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Legal Registration No.</label>
                      <input 
                        type="text" 
                        value={cert.registrationNo} 
                        onChange={(e) => updateCertificate(cert.id, "registrationNo", e.target.value)}
                        placeholder="e.g. SBI-DSA-2024-8842"
                        className="w-full bg-emerald-900/10 border border-emerald-500/30 text-emerald-300 font-mono rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 uppercase"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Legal Context / Description</label>
                      <textarea 
                        value={cert.description} 
                        onChange={(e) => updateCertificate(cert.id, "description", e.target.value)}
                        placeholder="Describe what this certificate legally authorizes the company to do..."
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Validity / Expiry</label>
                      <input 
                        type="text" 
                        value={cert.validity} 
                        onChange={(e) => updateCertificate(cert.id, "validity", e.target.value)}
                        placeholder="e.g. Dec 2028 or Lifetime"
                        className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                  </div>
                </div>
              </div>
            )}
          </motion.div>
          );
        })}
      </div>
    </div>
  );
}
