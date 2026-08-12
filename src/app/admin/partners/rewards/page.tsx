'use client';

import React, { useEffect, useState } from 'react';
import { Gift, Plus, CheckCircle, XCircle, Trash2, Power } from 'lucide-react';
import { getAdminRewardTargets, createRewardTarget, toggleRewardTarget, getAdminRewardClaims, updateClaimStatus } from '@/app/actions/adminEcosystem';

export default function RewardsAdminPage() {
  const [targets, setTargets] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  
  // New Target Form
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [value, setValue] = useState('');
  const [image, setImage] = useState('');

  const loadData = async () => {
    const [tRes, cRes] = await Promise.all([getAdminRewardTargets(), getAdminRewardClaims()]);
    if (tRes.success) setTargets(tRes.data || []);
    if (cRes.success) setClaims(cRes.data || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddTarget = async (e: React.FormEvent) => {
    e.preventDefault();
    await createRewardTarget({
      title, description: desc, targetValue: parseFloat(value), imageUrl: image
    });
    setTitle(''); setDesc(''); setValue(''); setImage('');
    loadData();
  };

  const handleToggle = async (id: string, current: boolean) => {
    await toggleRewardTarget(id, !current);
    loadData();
  };

  const handleClaimStatus = async (id: string, status: string) => {
    await updateClaimStatus(id, status);
    loadData();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center">
          <Gift className="w-6 h-6 text-rose-500 mr-2" />
          Rewards & Claims Control
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Manage dynamic targets and approve partner claims.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Targets List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-white px-2">Active Targets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {targets.map(t => (
              <div key={t.id} className={`bg-slate-900 border rounded-2xl p-5 relative overflow-hidden ${t.isActive ? 'border-slate-700' : 'border-slate-800 opacity-60'}`}>
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <div className="bg-slate-950 px-2 py-1 rounded text-xs font-bold text-slate-300 border border-slate-800">
                    ₹{t.targetValue} Cr Target
                  </div>
                  <button onClick={() => handleToggle(t.id, t.isActive)} className="text-slate-500 hover:text-white">
                    <Power className={`w-5 h-5 ${t.isActive ? 'text-emerald-500' : ''}`} />
                  </button>
                </div>
                <h3 className="font-bold text-white text-lg relative z-10 leading-tight mb-1" dangerouslySetInnerHTML={{__html: t.title}}></h3>
                <p className="text-slate-400 text-xs relative z-10 line-clamp-2">{t.description}</p>
                <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center relative z-10">
                   <span className="text-xs text-slate-500 font-bold">{t._count.claims} Total Claims</span>
                </div>
                
                {/* Bg Image faint overlay */}
                {t.imageUrl && (
                  <div className="absolute inset-0 opacity-10 mix-blend-screen pointer-events-none">
                    <img src={t.imageUrl} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <h2 className="text-lg font-bold text-white px-2 mt-8">Recent Claim Requests</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-400">
                <tr>
                  <th className="p-4 font-medium">Partner</th>
                  <th className="p-4 font-medium">Reward Claimed</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {claims.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-500">No claims yet.</td></tr>
                ) : (
                  claims.map(c => (
                    <tr key={c.id}>
                      <td className="p-4 text-white font-medium">{c.user.name}</td>
                      <td className="p-4 text-slate-300">
                        <div dangerouslySetInnerHTML={{__html: c.reward.title}}></div>
                        <div className="text-[10px] text-emerald-500">₹{c.reward.targetValue} Cr Target</div>
                      </td>
                      <td className="p-4 text-slate-400">{new Date(c.claimedAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          c.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500' :
                          c.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {c.status === 'PENDING' && (
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleClaimStatus(c.id, 'APPROVED')} className="p-1.5 bg-emerald-500/20 text-emerald-500 rounded hover:bg-emerald-500/40"><CheckCircle className="w-4 h-4" /></button>
                            <button onClick={() => handleClaimStatus(c.id, 'REJECTED')} className="p-1.5 bg-rose-500/20 text-rose-500 rounded hover:bg-rose-500/40"><XCircle className="w-4 h-4" /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Target Form */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit sticky top-24">
          <h2 className="text-lg font-bold text-white mb-4">Add New Target</h2>
          <form onSubmit={handleAddTarget} className="space-y-4 text-sm">
            <div>
              <label className="text-slate-400 font-medium block mb-1">Target Title (HTML allowed)</label>
              <input required value={title} onChange={e=>setTitle(e.target.value)} type="text" placeholder="e.g. Win a Trip to Dubai! 🏝️" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white" />
            </div>
            <div>
              <label className="text-slate-400 font-medium block mb-1">Description</label>
              <textarea required value={desc} onChange={e=>setDesc(e.target.value)} rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white" />
            </div>
            <div>
              <label className="text-slate-400 font-medium block mb-1">Target Disbursed (in Crores)</label>
              <input required value={value} onChange={e=>setValue(e.target.value)} type="number" step="0.1" placeholder="e.g. 50" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white" />
            </div>
            <div>
              <label className="text-slate-400 font-medium block mb-1">Background Image URL (Optional)</label>
              <input value={image} onChange={e=>setImage(e.target.value)} type="text" placeholder="https://unsplash.com/..." className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white" />
            </div>
            
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl mt-2 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Create Target
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}
