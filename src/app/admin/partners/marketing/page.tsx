'use client';

import React, { useEffect, useState } from 'react';
import { FileText, Plus, Image as ImageIcon, Link as LinkIcon, FileCheck } from 'lucide-react';
import { getAdminMarketingAssets, createMarketingAsset } from '@/app/actions/adminEcosystem';

export default function MarketingAdminPage() {
  const [assets, setAssets] = useState<any[]>([]);
  
  const [title, setTitle] = useState('');
  const [assetUrl, setAssetUrl] = useState('');
  const [fileType, setFileType] = useState('JPG');
  const [userId, setUserId] = useState(''); // Optional partner ID

  const loadData = async () => {
    const res = await getAdminMarketingAssets();
    if (res.success && res.data) {
      setAssets(res.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMarketingAsset({
      title, assetUrl, fileType, userId: userId ? userId : undefined
    });
    setTitle(''); setAssetUrl(''); setUserId('');
    loadData();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center">
          <FileText className="w-6 h-6 text-indigo-500 mr-2" />
          Marketing Asset CMS
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Upload banners and flyers for partners to download.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Assets Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {assets.length === 0 ? (
              <div className="col-span-2 text-center p-8 text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
                No marketing assets uploaded yet.
              </div>
            ) : (
              assets.map(asset => (
                <div key={asset.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group">
                  <div className="h-40 bg-slate-950 flex items-center justify-center relative overflow-hidden">
                    {asset.fileType === 'JPG' || asset.fileType === 'PNG' ? (
                      <img src={asset.assetUrl} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="text-slate-600 font-bold flex flex-col items-center">
                        <FileText className="w-10 h-10 mb-2 opacity-50" />
                        {asset.fileType} Document
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-black px-2 py-1 rounded-md backdrop-blur border border-slate-700">
                      {asset.fileType}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white line-clamp-1">{asset.title}</h3>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                      {asset.user ? (
                        <span className="text-rose-400 font-medium">Specific to: {asset.user.name}</span>
                      ) : (
                        <span className="text-emerald-400 font-medium">Available to ALL Partners</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upload Form */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit sticky top-24">
          <h2 className="text-lg font-bold text-white mb-4">Upload New Asset</h2>
          <form onSubmit={handleCreate} className="space-y-4 text-sm">
            <div>
              <label className="text-slate-400 font-medium block mb-1">Asset Title</label>
              <input required value={title} onChange={e=>setTitle(e.target.value)} type="text" placeholder="e.g. Diwali Mega Flyer" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="text-slate-400 font-medium block mb-1">Asset URL</label>
              <input required value={assetUrl} onChange={e=>setAssetUrl(e.target.value)} type="url" placeholder="https://..." className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="text-slate-400 font-medium block mb-1">File Type</label>
              <select value={fileType} onChange={e=>setFileType(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500">
                <option value="JPG">JPG Image</option>
                <option value="PNG">PNG Image</option>
                <option value="PDF">PDF Document</option>
                <option value="MP4">MP4 Video</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 font-medium block mb-1">Specific Partner ID (Optional)</label>
              <input value={userId} onChange={e=>setUserId(e.target.value)} type="text" placeholder="Leave blank for all partners..." className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500" />
            </div>
            
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl mt-2 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add Marketing Asset
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}
