'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Megaphone, Download, Share2, Image as ImageIcon, X, Palette, Phone } from 'lucide-react';
import { getPartnerMarketingAssets } from '@/app/actions/partner';

export default function PartnerMarketingStudio() {
  const [assets, setAssets] = useState<any[]>([]);
  const [partner, setPartner] = useState<any>(null);
  const [activeAsset, setActiveAsset] = useState<any | null>(null);
  
  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [themeColor, setThemeColor] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    async function load() {
      const res = await getPartnerMarketingAssets();
      if (res.success && res.data) {
        setAssets(res.data.assets);
        setPartner(res.data.partner);
      }
    }
    load();
  }, []);

  // Co-branding Engine (Draws to Canvas)
  useEffect(() => {
    if (activeAsset && partner && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = "anonymous"; // Important for external URLs
      img.src = activeAsset.assetUrl;
      
      img.onload = () => {
        // Set canvas to match image dimensions for high-quality export
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the base template
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Configure branding bar at the bottom
        const barHeight = canvas.height * 0.15; // 15% of height for the branding strip
        const barY = canvas.height - barHeight;
        
        // Draw the branding background strip
        ctx.fillStyle = themeColor === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        ctx.fillRect(0, barY, canvas.width, barHeight);

        // Add a primary color accent line
        ctx.fillStyle = '#10B981'; // Emerald 500
        ctx.fillRect(0, barY, canvas.width, 10); // 10px accent line

        // Text settings
        const textColor = themeColor === 'dark' ? '#FFFFFF' : '#0F172A';
        const subTextColor = themeColor === 'dark' ? '#94A3B8' : '#64748B'; // Slate 400 / 500
        
        // Scale fonts relative to image size to maintain proportions
        const titleFontSize = Math.max(30, canvas.width * 0.04);
        const subFontSize = Math.max(20, canvas.width * 0.025);
        const padding = canvas.width * 0.05;

        // Draw Partner Name (Left aligned)
        ctx.fillStyle = textColor;
        ctx.font = `bold ${titleFontSize}px 'Inter', sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.fillText(partner.name, padding, barY + (barHeight / 2) - 15);

        // Draw "Authorized Partner" (Left aligned below name)
        ctx.fillStyle = '#10B981'; // Emerald tag
        ctx.font = `bold ${subFontSize}px 'Inter', sans-serif`;
        ctx.fillText('AUTHORIZED BFS PARTNER', padding, barY + (barHeight / 2) + 25);

        // Draw Phone Number (Right aligned)
        ctx.fillStyle = textColor;
        ctx.font = `bold ${titleFontSize}px 'Inter', sans-serif`;
        ctx.textAlign = 'right';
        ctx.fillText(partner.phone || '+91 9876543210', canvas.width - padding, barY + (barHeight / 2) - 15);

        // Draw Email/Website (Right aligned below phone)
        ctx.fillStyle = subTextColor;
        ctx.font = `${subFontSize}px 'Inter', sans-serif`;
        ctx.fillText(partner.email, canvas.width - padding, barY + (barHeight / 2) + 25);
      };
    }
  }, [activeAsset, partner, themeColor]);

  const handleDownload = () => {
    if (!canvasRef.current || !activeAsset) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      try {
        const dataUrl = canvasRef.current!.toDataURL('image/jpeg', 0.9);
        const link = document.createElement('a');
        link.download = `CoBranded_${activeAsset.title.replace(/\s+/g, '_')}.jpg`;
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.error("Canvas export error:", e);
        alert("Could not download image. If the image is hosted externally, it might be blocked by CORS policy.");
      }
      setIsGenerating(false);
    }, 500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center">
          <Megaphone className="w-6 h-6 text-emerald-500 mr-2" />
          Co-branded Marketing Studio
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Select a template to automatically generate personalized marketing assets for your social media.</p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.length === 0 ? (
          <div className="col-span-full p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
            <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Templates Available</h3>
            <p className="text-slate-500 mt-1">Check back later for new marketing templates.</p>
          </div>
        ) : (
          assets.map(asset => (
            <div 
              key={asset.id} 
              onClick={() => setActiveAsset(asset)}
              className="group bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl hover:border-emerald-500/50 transition-all"
            >
              <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
                <img src={asset.assetUrl} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-bold flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Open in Studio
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 dark:text-white truncate">{asset.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Ready for Co-branding</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Studio Modal */}
      {activeAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl max-h-[95vh] flex flex-col lg:flex-row overflow-hidden shadow-2xl">
            
            {/* Canvas Preview Area (Left) */}
            <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-6 flex items-center justify-center overflow-auto custom-scrollbar relative border-r border-slate-200 dark:border-slate-800">
              <canvas 
                ref={canvasRef} 
                className="max-w-full h-auto max-h-[70vh] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800"
              />
            </div>

            {/* Controls Area (Right) */}
            <div className="w-full lg:w-96 p-6 sm:p-8 flex flex-col bg-white dark:bg-[#0F172A]">
              <div className="flex justify-between items-start mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Studio Editor</h2>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{activeAsset.title}</p>
                </div>
                <button onClick={() => setActiveAsset(null)} className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-3">Branding Theme</label>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setThemeColor('dark')}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-colors ${themeColor === 'dark' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                      Dark Strip
                    </button>
                    <button 
                      onClick={() => setThemeColor('light')}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-colors ${themeColor === 'light' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                      Light Strip
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Your Details</h4>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{partner?.name}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-2"><Phone className="w-4 h-4"/> {partner?.phone || '+91 9876543210'}</p>
                    <p className="text-sm font-bold text-emerald-500">Authorized Partner</p>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4 italic">* Details are pulled automatically from your profile.</p>
                </div>
              </div>

              <div className="mt-6 space-y-3 shrink-0 border-t border-slate-200 dark:border-slate-800 pt-6">
                <button 
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  <Download className="w-5 h-5" /> {isGenerating ? 'Generating...' : 'Download for WhatsApp'}
                </button>
                <p className="text-center text-[10px] text-slate-500 font-medium">Exports as high-quality JPG</p>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
