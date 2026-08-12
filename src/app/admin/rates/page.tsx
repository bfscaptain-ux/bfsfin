"use client";

import { useState, useEffect } from "react";
import { Save, Building2, TrendingDown, RefreshCw, Loader2 } from "lucide-react";
import { getLiveRates, updateLiveRates } from "@/actions/rates";

export default function AdminRatesPage() {
  const [data, setData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const liveData = await getLiveRates();
      if (liveData) {
        setData(liveData);
      }
      setIsLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateLiveRates(data);
    alert("Rates updated successfully! Changes are live on the public website.");
    setIsSaving(false);
  };

  const handleBankChange = (slug: string, field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      banks: {
        ...prev.banks,
        [slug]: {
          ...prev.banks[slug],
          [field]: value
        }
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!data) return <div className="p-8 text-white">Error loading rates data.</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-emerald-400" /> Bank Interest Rates CMS
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Update the Live Ticker &amp; User Rate Chart on the public website instantly.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving Live..." : "Publish Changes"}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Global RBI Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
            <Building2 className="w-5 h-5 text-blue-400" /> Global Macro Indicators
          </h2>
          <div className="max-w-xs">
            <label className="block text-slate-300 font-semibold mb-2">RBI Repo Rate</label>
            <input
              type="text"
              value={data.rbiRepoRate}
              onChange={(e) => setData({ ...data, rbiRepoRate: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-emerald-400 font-black focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Bank Rates Editor */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
           <h2 className="text-lg font-bold text-white mb-6">Partner Bank Rates</h2>
           <div className="space-y-6">
             {Object.entries(data.banks).map(([slug, bank]: [string, any]) => (
               <div key={slug} className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
                 <h3 className="font-bold text-white text-lg mb-4">{bank.name}</h3>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                   <div>
                     <label className="block text-xs text-slate-400 font-semibold mb-1">Salaried Rate</label>
                     <input
                       type="text"
                       value={bank.salariedRate}
                       onChange={(e) => handleBankChange(slug, "salariedRate", e.target.value)}
                       className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-emerald-500 outline-none"
                     />
                   </div>
                   <div>
                     <label className="block text-xs text-slate-400 font-semibold mb-1">Self-Employed Rate</label>
                     <input
                       type="text"
                       value={bank.selfEmployedRate}
                       onChange={(e) => handleBankChange(slug, "selfEmployedRate", e.target.value)}
                       className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-emerald-500 outline-none"
                     />
                   </div>
                   <div>
                     <label className="block text-xs text-slate-400 font-semibold mb-1">Base Rate Value ({bank.baseRateType})</label>
                     <input
                       type="text"
                       value={bank.baseRateValue}
                       onChange={(e) => handleBankChange(slug, "baseRateValue", e.target.value)}
                       className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-emerald-500 outline-none"
                     />
                   </div>
                   <div>
                     <label className="block text-xs text-slate-400 font-semibold mb-1">Processing Fee</label>
                     <input
                       type="text"
                       value={bank.processingFee}
                       onChange={(e) => handleBankChange(slug, "processingFee", e.target.value)}
                       className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-emerald-500 outline-none"
                     />
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </form>

    </div>
  );
}
