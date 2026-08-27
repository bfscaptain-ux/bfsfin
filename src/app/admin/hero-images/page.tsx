"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, RefreshCw, CheckCircle2, Type } from "lucide-react";

export default function HeroContentCMS() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  
  const [activeTab, setActiveTab] = useState("home");
  const [pageImages, setPageImages] = useState<Record<string, string>>({
    home: "", about: "", products: "", contact: "", reviews: ""
  });
  
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [heroText, setHeroText] = useState({
    heroBadgeText: "RBI Registered & Verified Partners",
    heroTitlePart1: "Your Dream Home,",
    heroTitlePart2: "Funded in 5 Days.",
    heroBullet1: "Lowest Interest Rates Guaranteed (from 6.50%)",
    heroBullet2: "Zero Processing Fees for Direct Applications",
    heroBullet3: "Doorstep Document Pickup & 100% Digital Process",
    heroSupportText: "Prefer talking to an expert? Call: 7900-979-001",
    googleRating: "4.9",
    googleReviewCount: "1,200+"
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Home Hero Image
      const heroRes = await fetch("/api/hero-images");
      if (heroRes.ok) {
        const images = await heroRes.json();
        const newPageImages: Record<string, string> = {};
        images.forEach((img: any) => {
          newPageImages[img.pageId] = img.imageUrl;
        });
        setPageImages(newPageImages);
        setImageUrl(newPageImages[activeTab as keyof typeof newPageImages] || "");
      }

      // Fetch Hero Settings
      const settingsRes = await fetch("/api/settings");
      if (settingsRes.ok) {
        const data = await settingsRes.json();
        if (data.success && data.settings) {
          setHeroText(prev => ({
            heroBadgeText: data.settings.heroBadgeText || prev.heroBadgeText,
            heroTitlePart1: data.settings.heroTitlePart1 || prev.heroTitlePart1,
            heroTitlePart2: data.settings.heroTitlePart2 || prev.heroTitlePart2,
            heroBullet1: data.settings.heroBullet1 || prev.heroBullet1,
            heroBullet2: data.settings.heroBullet2 || prev.heroBullet2,
            heroBullet3: data.settings.heroBullet3 || prev.heroBullet3,
            heroSupportText: data.settings.heroSupportText || prev.heroSupportText,
            googleRating: data.settings.googleRating || prev.googleRating,
            googleReviewCount: data.settings.googleReviewCount || prev.googleReviewCount,
          }));
        }
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
    setLoading(false);
  };

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // 1. Upload File if selected, or use existing URL
      let finalImageUrl = imageUrl;
      
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData
        });
        
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          if (uploadData.success) {
            finalImageUrl = uploadData.url;
            setImageUrl(finalImageUrl);
          }
        }
      }

      // 2. Update Image in DB
      if (finalImageUrl) {
        await fetch("/api/hero-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pageId: activeTab, imageUrl: finalImageUrl })
        });
      }

      // 3. Update Texts (Only if Home tab is active)
      if (activeTab === "home") {
        const keys = Object.keys(heroText) as Array<keyof typeof heroText>;
        for (const key of keys) {
          await fetch("/api/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key, value: heroText[key] })
          });
        }
      }

      setSuccessMsg("Hero section updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Failed to update hero", error);
    }
    setSubmitting(false);
  };

  return (
    <div className="p-8">
      {successMsg && (
        <div className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm mb-8 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-bold">{successMsg}</span>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
          <ImageIcon className="w-7 h-7 text-emerald-600" /> Hero Section Content Manager
        </h3>
        <p className="text-slate-500 mb-8 font-medium">Control the main image, typography, and bullet points displayed on the homepage hero section.</p>
        
        {loading ? (
          <p className="text-slate-500 font-bold animate-pulse">Loading hero configuration...</p>
        ) : (
          <>
            <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <label className="block text-sm font-black text-emerald-900 mb-2 uppercase tracking-wide">Select Page to Update Image</label>
              <select 
                value={activeTab}
                onChange={(e) => {
                  const val = e.target.value;
                  setActiveTab(val);
                  setImageUrl(pageImages[val] || "");
                  setPreviewUrl("");
                  setSelectedFile(null);
                }}
                className="w-full sm:w-auto min-w-[300px] bg-white border-2 border-emerald-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-800 shadow-sm"
              >
                <optgroup label="Main Website Pages">
                  <option value="home">Home Page (Main)</option>
                  <option value="about">About Us Page</option>
                  <option value="contact">Contact Us Page</option>
                  <option value="reviews">Client Reviews Page</option>
                </optgroup>
                <optgroup label="Loan Products">
                  <option value="products/home-loan">Home Loan</option>
                  <option value="products/personal-loan">Personal Loan</option>
                  <option value="products/business-loan">Business Loan</option>
                  <option value="products/car-loan">Car Loan</option>
                  <option value="products/gold-loan">Gold Loan</option>
                  <option value="products/education-loan">Education Loan</option>
                  <option value="products/loan-against-property">Loan Against Property (LAP)</option>
                  <option value="products/balance-transfer">Balance Transfer</option>
                  <option value="products/top-up-loan">Top Up Loan</option>
                  <option value="products/plot-loan">Plot Purchase (P&L Purchase)</option>
                  <option value="products/construction-loan">Construction Loan</option>
                  <option value="products/home-renovation">Home Renovation</option>
                  <option value="products/nri-home-loan">NRI Home Loan</option>
                  <option value="products/working-capital">Working Capital</option>
                  <option value="products/loan-against-securities">Loan Against Securities</option>
                </optgroup>
                <optgroup label="Partner Banks">
                  <option value="banks/hdfc">HDFC Bank</option>
                  <option value="banks/icici">ICICI Bank</option>
                  <option value="banks/pnb">PNB</option>
                  <option value="banks/central-bank">Central Bank</option>
                </optgroup>
              </select>
              <p className="text-xs text-emerald-600 mt-2 font-medium">Tip: Select a page from the dropdown to update its specific background image.</p>
            </div>
          <form onSubmit={handleHeroSubmit} className="space-y-8">
            {/* Image Section */}
            <div className="p-6 border border-slate-100 bg-slate-50 rounded-2xl space-y-4">
              <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
                <ImageIcon className="w-5 h-5 text-emerald-500" /> 1. Background Image
              </h4>
              <div className="aspect-[21/9] w-full max-w-3xl rounded-xl overflow-hidden bg-slate-200 relative shadow-inner border border-slate-200">
                {previewUrl || imageUrl ? (
                  <img src={previewUrl || imageUrl} alt="Home Hero Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-slate-400">No Image Preview</div>
                )}
              </div>
              
              <div className="max-w-3xl space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Upload New Image (From Your System)</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                        setPreviewUrl(URL.createObjectURL(file));
                      }
                    }} 
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" 
                  />
                </div>
                
                {/* URL input removed as per your request - only local uploads are allowed now */}
              </div>
            </div>

            {/* Typography Section (Only for Home) */}
            {activeTab === "home" && (
            <div className="p-6 border border-slate-100 bg-slate-50 rounded-2xl space-y-6">
              <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
                <Type className="w-5 h-5 text-emerald-500" /> 2. Hero Typography & Content
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Top Trust Badge Text</label>
                <input 
                  type="text" 
                  value={heroText.heroBadgeText} 
                  onChange={(e) => setHeroText({ ...heroText, heroBadgeText: e.target.value })} 
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Main Title (Part 1 - Dark Text)</label>
                  <input 
                    type="text" 
                    value={heroText.heroTitlePart1} 
                    onChange={(e) => setHeroText({ ...heroText, heroTitlePart1: e.target.value })} 
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Main Title (Part 2 - Highlighted)</label>
                  <input 
                    type="text" 
                    value={heroText.heroTitlePart2} 
                    onChange={(e) => setHeroText({ ...heroText, heroTitlePart2: e.target.value })} 
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Value Proposition Bullets (3 items)</label>
                <input 
                  type="text" 
                  value={heroText.heroBullet1} 
                  onChange={(e) => setHeroText({ ...heroText, heroBullet1: e.target.value })} 
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" 
                />
                <input 
                  type="text" 
                  value={heroText.heroBullet2} 
                  onChange={(e) => setHeroText({ ...heroText, heroBullet2: e.target.value })} 
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" 
                />
                <input 
                  type="text" 
                  value={heroText.heroBullet3} 
                  onChange={(e) => setHeroText({ ...heroText, heroBullet3: e.target.value })} 
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Bottom Support Text</label>
                <input 
                  type="text" 
                  value={heroText.heroSupportText} 
                  onChange={(e) => setHeroText({ ...heroText, heroSupportText: e.target.value })} 
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Google Rating (e.g., 4.9)</label>
                  <input 
                    type="text" 
                    value={heroText.googleRating} 
                    onChange={(e) => setHeroText({ ...heroText, googleRating: e.target.value })} 
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" 
                  />
                </div>
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Total Reviews (e.g., 1,200+)</label>
                  <input 
                    type="text" 
                    value={heroText.googleReviewCount} 
                    onChange={(e) => setHeroText({ ...heroText, googleReviewCount: e.target.value })} 
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" 
                  />
                </div>
              </div>
            </div>
            )}

            <button 
              type="submit" 
              disabled={submitting} 
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-10 rounded-xl shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              {submitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Save Hero Content System-Wide'}
            </button>
          </form>
          </>
        )}
      </div>
    </div>
  );
}
