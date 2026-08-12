"use client";

import { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, Phone, Mail, MapPin, ShieldCheck, Bell, Type, Palette } from "lucide-react";

export default function AdminSettingsCMS() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    siteTitle: "BFS AGRA — Bhardwaj Financial Services",
    salesPhone: "7900-979-001",
    supportPhone: "7900-979-002",
    officialEmail: "info@bfsagra.com",
    officeAddress: "Sanjay Place, Commercial Hub, Agra, UP - 282002",
    tickerText: "⚡ Fastest Home Loan Approval in Agra (5 Days Guarantee)",
    rbiComplianceBadge: "RBI Compliant & Certified Mortgage Broker",
    marqueeText: "Welcome to Bhardwaj Finance - Apka Vishwas Hamari Zimmedari",
    marqueeColor: "#10b981", // Emerald 500 default
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings(prev => ({ ...prev, ...data.settings }));
        }
      } catch (err) {
        console.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white p-8">Loading Settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-400" /> Website Control Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">Configure global hotlines, address, banners &amp; compliance headers.</p>
        </div>

        {saved && (
          <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Settings Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl text-xs">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">Global Helplines &amp; Contact Info</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> Sales Hotline Phone Number *
              </label>
              <input
                type="text"
                required
                value={settings.salesPhone}
                onChange={(e) => setSettings({ ...settings, salesPhone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-blue-400" /> Support Helpline Phone Number *
              </label>
              <input
                type="text"
                required
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> Official Email Address *
              </label>
              <input
                type="email"
                required
                value={settings.officialEmail}
                onChange={(e) => setSettings({ ...settings, officialEmail: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Agra Head Office Address *
              </label>
              <input
                type="text"
                required
                value={settings.officeAddress}
                onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">Header Marquee (Scrolling Text)</h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-3">
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-blue-400" /> Dynamic Marquee Text
              </label>
              <input
                type="text"
                value={settings.marqueeText}
                onChange={(e) => setSettings({ ...settings, marqueeText: e.target.value })}
                placeholder="e.g. Special Offer: 0% Processing Fees..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-emerald-400" /> Marquee Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.marqueeColor}
                  onChange={(e) => setSettings({ ...settings, marqueeColor: e.target.value })}
                  className="h-10 w-16 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer"
                />
                <span className="text-slate-400 font-mono uppercase">{settings.marqueeColor}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">Banner &amp; Ticker Announcement Controls</h3>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
              <Bell className="w-3.5 h-3.5 text-blue-400" /> Top Bar Announcement Ticker Text
            </label>
            <input
              type="text"
              value={settings.tickerText}
              onChange={(e) => setSettings({ ...settings, tickerText: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> RBI Compliance Badge Subtext
            </label>
            <input
              type="text"
              value={settings.rbiComplianceBadge}
              onChange={(e) => setSettings({ ...settings, rbiComplianceBadge: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg transition disabled:opacity-50"
          >
            {saving ? "Saving..." : <><Save className="w-4 h-4" /> Save Site Settings</>}
          </button>
        </div>
      </form>
    </div>
  );
}
