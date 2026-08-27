"use client";

import { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, Phone, Mail, MapPin, ShieldCheck, Bell } from "lucide-react";

export default function AdminSettingsCMS() {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSettings(prev => ({
            ...prev,
            siteTitle: data.settings.siteTitle || prev.siteTitle,
            salesPhone: data.settings.salesPhone || prev.salesPhone,
            supportPhone: data.settings.supportPhone || prev.supportPhone,
            officialEmail: data.settings.officialEmail || prev.officialEmail,
            officeAddress: data.settings.officeAddress || prev.officeAddress,
            tickerText: data.settings.tickerText || prev.tickerText,
            rbiComplianceBadge: data.settings.rbiComplianceBadge || prev.rbiComplianceBadge,
            maxLoanCap: data.settings.maxLoanCap || prev.maxLoanCap,
            minInterestRate: data.settings.minInterestRate || prev.minInterestRate,
            smtpEmail: data.settings.smtpEmail || "",
            smtpPassword: data.settings.smtpPassword || "",
            homeLoanRate: data.settings.homeLoanRate || prev.homeLoanRate,
            selfEmployedRate: data.settings.selfEmployedRate || prev.selfEmployedRate,
            businessLoanRate: data.settings.businessLoanRate || prev.businessLoanRate,
            lapRate: data.settings.lapRate || prev.lapRate,
            personalLoanRate: data.settings.personalLoanRate || prev.personalLoanRate,
            balanceTransferRate: data.settings.balanceTransferRate || prev.balanceTransferRate,
            goldLoanRate: data.settings.goldLoanRate || prev.goldLoanRate,
            contactPhone: data.settings.contactPhone || prev.contactPhone,
            whatsappPhone: data.settings.whatsappPhone || prev.whatsappPhone,
            ownerName: data.settings.ownerName || prev.ownerName,
            ownerRole: data.settings.ownerRole || prev.ownerRole,
            ownerQuote: data.settings.ownerQuote || prev.ownerQuote,
            ownerImage: data.settings.ownerImage || prev.ownerImage,
          }));
        }
      });
  }, []);
  const [settings, setSettings] = useState({
    siteTitle: "BFS AGRA — Bhardwaj Financial Services",
    salesPhone: "7900-979-001",
    supportPhone: "7900-979-002",
    officialEmail: "info@bfsagra.com",
    officeAddress: "Sanjay Place, Commercial Hub, Agra, UP - 282002",
    tickerText: "⚡ Fastest Home Loan Approval in Agra (5 Days Guarantee)",
    rbiComplianceBadge: "RBI Compliant & Certified Mortgage Broker",
    maxLoanCap: "₹1 Crore+",
    minInterestRate: "6.50%",
    smtpEmail: "",
    smtpPassword: "",
    homeLoanRate: "6.50",
    selfEmployedRate: "6.50",
    businessLoanRate: "12.50",
    lapRate: "7.50",
    personalLoanRate: "10.50",
    balanceTransferRate: "6.45",
    goldLoanRate: "1.00",
    contactPhone: "+91 7900-979-001",
    whatsappPhone: "917900979001",
    ownerName: "Vineeta Sharma",
    ownerRole: "Founder & Managing Director, BFS",
    ownerQuote: "We don't just secure loans; we legally vet your lifetime investment. Total transparency, zero hidden brokerage.",
    ownerImage: "/owner.png",
  });

  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setSettings({ ...settings, ownerImage: data.url });
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      alert("Upload error");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const allKeysToSave = [
      "siteTitle", "salesPhone", "supportPhone", "officialEmail", "officeAddress",
      "tickerText", "rbiComplianceBadge", "maxLoanCap", "minInterestRate",
      "homeLoanRate", "businessLoanRate", "lapRate", "personalLoanRate", 
      "balanceTransferRate", "contactPhone", "whatsappPhone",
      "ownerName", "ownerRole", "ownerQuote", "ownerImage",
      "smtpEmail", "smtpPassword"
    ] as const;

    for (const key of allKeysToSave) {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: settings[key] })
      });
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-900 border border-emerald-800 p-6 rounded-3xl">
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

      <form onSubmit={handleSave} className="bg-emerald-900 border border-emerald-800 rounded-3xl p-8 space-y-6 shadow-xl text-xs">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2">Global Helplines &amp; Contact Info</h3>

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
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> Support Helpline Phone Number *
              </label>
              <input
                type="text"
                required
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
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
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
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
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        
        <div className="space-y-4 pt-4 border-t border-emerald-800">
          <h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2">Contact & WhatsApp Numbers</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Primary Call Number *
              </label>
              <input
                type="text"
                required
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-bold"
                placeholder="+91 7900-979-001"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                WhatsApp Number (without +) *
              </label>
              <input
                type="text"
                required
                value={settings.whatsappPhone}
                onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-bold"
                placeholder="917900979001"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-emerald-800">
          <h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2">Product Starting Interest Rates (%)</h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">Salaried (Home) *</label>
              <input type="text" value={settings.homeLoanRate} onChange={(e) => setSettings({ ...settings, homeLoanRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">Self-Employed (Home) *</label>
              <input type="text" value={settings.selfEmployedRate} onChange={(e) => setSettings({ ...settings, selfEmployedRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">Business Loan *</label>
              <input type="text" value={settings.businessLoanRate} onChange={(e) => setSettings({ ...settings, businessLoanRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">LAP Rate *</label>
              <input type="text" value={settings.lapRate} onChange={(e) => setSettings({ ...settings, lapRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">Personal Loan *</label>
              <input type="text" value={settings.personalLoanRate} onChange={(e) => setSettings({ ...settings, personalLoanRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">BT Rate *</label>
              <input type="text" value={settings.balanceTransferRate} onChange={(e) => setSettings({ ...settings, balanceTransferRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">Gold Loan *</label>
              <input type="text" value={settings.goldLoanRate} onChange={(e) => setSettings({ ...settings, goldLoanRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-emerald-800">
          <h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2">Banner &amp; Ticker Announcement Controls</h3>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
              <Bell className="w-3.5 h-3.5 text-emerald-400" /> Top Bar Announcement Ticker Text
            </label>
            <input
              type="text"
              value={settings.tickerText}
              onChange={(e) => setSettings({ ...settings, tickerText: e.target.value })}
              className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
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
              className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-emerald-800">
          <h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2">SMTP Email Settings (For OTP)</h3>
          
          <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-xl text-emerald-300 text-xs mb-4">
            Enable Email verification for leads by providing your Google App Password (2FA must be enabled on Google).
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> Sender Email Address (e.g. gmail)
              </label>
              <input
                type="email"
                value={settings.smtpEmail || ""}
                onChange={(e) => setSettings({ ...settings, smtpEmail: e.target.value })}
                placeholder="youremail@gmail.com"
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Google App Password (16-digits)
              </label>
              <input
                type="password"
                value={settings.smtpPassword || ""}
                onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                placeholder="abcd efgh ijkl mnop"
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        </div>

        
        <div className="space-y-4 pt-4 border-t border-emerald-800">
          <h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2">Owner Profile Settings</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Owner Name *</label>
              <input
                type="text"
                required
                value={settings.ownerName}
                onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Owner Role *</label>
              <input
                type="text"
                required
                value={settings.ownerRole}
                onChange={(e) => setSettings({ ...settings, ownerRole: e.target.value })}
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Owner Quote *</label>
              <textarea
                required
                value={settings.ownerQuote}
                onChange={(e) => setSettings({ ...settings, ownerQuote: e.target.value })}
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                rows={2}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Owner Photo</label>
              <div className="flex items-center gap-4">
                {settings.ownerImage && (
                  <img src={settings.ownerImage} alt="Owner" className="w-16 h-16 rounded-full object-cover border border-emerald-700" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-emerald-800 file:text-emerald-100 hover:file:bg-emerald-700 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg transition"
          >
            <Save className="w-4 h-4" /> Save Site Settings
          </button>
        </div>
      </form>
    </div>
  );
}
