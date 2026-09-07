const fs = require('fs');

let content = fs.readFileSync('src/app/admin/bank-logos/page.tsx', 'utf8');

// I will completely replace this file to be a powerful Banks JSON editor
const newCode = `"use client";

import { useState, useEffect } from "react";
import { Building, Save, Plus, Edit2, CheckCircle2 } from "lucide-react";

export default function AdminBanksCMS() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/banks-json")
      .then(res => res.json())
      .then(res => {
        setData(res.data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/banks-json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateBank = (key: string, field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      banksData: {
        ...prev.banksData,
        [key]: {
          ...prev.banksData[key],
          [field]: value
        }
      }
    }));
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-emerald-900 border border-emerald-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <Building className="w-7 h-7 text-emerald-400" />
            Bank Partners & Rates CMS
          </h1>
          <p className="text-sm text-emerald-200/60 mt-1">Manage all bank logos, ROIs, and processing fees here. This acts as the SINGLE SOURCE OF TRUTH for the entire website.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
        >
          {saving ? "Saving..." : saved ? <><CheckCircle2 className="w-5 h-5"/> Saved</> : <><Save className="w-5 h-5"/> Save All Changes</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(data.banksData).map(key => {
          const bank = data.banksData[key];
          return (
            <div key={key} className="bg-emerald-950 border border-emerald-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-4 border-b border-emerald-800/50 pb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-inner">
                  {/* If logo is a URL, show it, otherwise show building */}
                  {bank.logo && bank.logo.startsWith('http') ? <img src={bank.logo} className="w-full h-full object-contain" /> : <Building className="w-6 h-6 text-slate-400" />}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight">{bank.name}</h3>
                  <p className="text-xs text-emerald-400 font-mono mt-1">ID: {key}</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Salaried ROI</label>
                  <input 
                    type="text" 
                    value={bank.salariedRate || ""} 
                    onChange={(e) => updateBank(key, 'salariedRate', e.target.value)}
                    className="w-full bg-emerald-900/50 border border-emerald-800 rounded-lg px-3 py-2 text-white font-mono text-sm mt-1 focus:outline-none focus:border-emerald-500" 
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Self Employed ROI</label>
                  <input 
                    type="text" 
                    value={bank.selfEmployedRate || ""} 
                    onChange={(e) => updateBank(key, 'selfEmployedRate', e.target.value)}
                    className="w-full bg-emerald-900/50 border border-emerald-800 rounded-lg px-3 py-2 text-white font-mono text-sm mt-1 focus:outline-none focus:border-emerald-500" 
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Base Rate (RLLR/EBLR)</label>
                  <input 
                    type="text" 
                    value={bank.baseRateValue || ""} 
                    onChange={(e) => updateBank(key, 'baseRateValue', e.target.value)}
                    className="w-full bg-emerald-900/50 border border-emerald-800 rounded-lg px-3 py-2 text-white font-mono text-sm mt-1 focus:outline-none focus:border-emerald-500" 
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Processing Fee</label>
                  <input 
                    type="text" 
                    value={bank.processingFee || ""} 
                    onChange={(e) => updateBank(key, 'processingFee', e.target.value)}
                    className="w-full bg-emerald-900/50 border border-emerald-800 rounded-lg px-3 py-2 text-white text-sm mt-1 focus:outline-none focus:border-emerald-500" 
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Logo URL (Optional)</label>
                  <input 
                    type="text" 
                    value={bank.logo || ""} 
                    onChange={(e) => updateBank(key, 'logo', e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-emerald-900/50 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-300 text-xs mt-1 focus:outline-none focus:border-emerald-500" 
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`;

fs.writeFileSync('src/app/admin/bank-logos/page.tsx', newCode);
console.log('Replaced Bank Logos CMS with Unified Banks CMS!');
