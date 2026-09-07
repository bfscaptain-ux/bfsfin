"use client";

import { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, Phone, Mail, MapPin, ShieldCheck, Bell, Globe, Youtube, Share2, Linkedin } from "lucide-react";

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
            socialFacebook: data.settings.socialFacebook || "",
            socialInstagram: data.settings.socialInstagram || "",
            socialYouTube: data.settings.socialYouTube || "",
            socialTwitter: data.settings.socialTwitter || "",
            socialLinkedIn: data.settings.socialLinkedIn || "",
            socialWhatsAppChannel: data.settings.socialWhatsAppChannel || "",
            socialTelegram: data.settings.socialTelegram || "",
            socialGoogleBusiness: data.settings.socialGoogleBusiness || "",
          }));
        }
      });
  }, []);
  const [settings, setSettings] = useState({
    siteTitle: "BFS AGRA — Bhardwaj Financial Services",
    salesPhone: "7900-979-001",
    supportPhone: "7900-979-002",
    officialEmail: "info@bfsfin.com",
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
    socialFacebook: "",
    socialInstagram: "",
    socialYouTube: "",
    socialTwitter: "",
    socialLinkedIn: "",
    socialWhatsAppChannel: "",
    socialTelegram: "",
    socialGoogleBusiness: "",
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
      "smtpEmail", "smtpPassword",
      "socialFacebook", "socialInstagram", "socialYouTube", "socialTwitter",
      "socialLinkedIn", "socialWhatsAppChannel", "socialTelegram", "socialGoogleBusiness"
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

        {/* Social Media Links Section */}
        <div className="space-y-4 pt-4 border-t border-emerald-800">
          <h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-400" /> Social Media Links
          </h3>
          <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-xl text-emerald-300 text-xs mb-4">
            Yahan apne sabhi social media accounts ke links add karein. Yeh links automatically Footer aur poori website pe reflect honge. Khali fields ke icons website pe nahi dikhenge.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Facebook */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook Page
              </label>
              <input
                type="url"
                value={settings.socialFacebook}
                onChange={(e) => setSettings({ ...settings, socialFacebook: e.target.value })}
                placeholder="https://facebook.com/yourpage"
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Instagram
              </label>
              <input
                type="url"
                value={settings.socialInstagram}
                onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
                placeholder="https://instagram.com/yourhandle"
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-pink-500"
              />
            </div>

            {/* YouTube */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-400" />
                YouTube Channel
              </label>
              <input
                type="url"
                value={settings.socialYouTube}
                onChange={(e) => setSettings({ ...settings, socialYouTube: e.target.value })}
                placeholder="https://youtube.com/@yourchannel"
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Twitter / X */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Twitter / X
              </label>
              <input
                type="url"
                value={settings.socialTwitter}
                onChange={(e) => setSettings({ ...settings, socialTwitter: e.target.value })}
                placeholder="https://x.com/yourhandle"
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-slate-400"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-300" />
                LinkedIn
              </label>
              <input
                type="url"
                value={settings.socialLinkedIn}
                onChange={(e) => setSettings({ ...settings, socialLinkedIn: e.target.value })}
                placeholder="https://linkedin.com/company/yourpage"
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-400"
              />
            </div>

            {/* WhatsApp Channel */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Channel
              </label>
              <input
                type="url"
                value={settings.socialWhatsAppChannel}
                onChange={(e) => setSettings({ ...settings, socialWhatsAppChannel: e.target.value })}
                placeholder="https://whatsapp.com/channel/..."
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Telegram */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-2">
                <svg className="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Telegram Channel
              </label>
              <input
                type="url"
                value={settings.socialTelegram}
                onChange={(e) => setSettings({ ...settings, socialTelegram: e.target.value })}
                placeholder="https://t.me/yourchannel"
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Google Business */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                Google Business Profile
              </label>
              <input
                type="url"
                value={settings.socialGoogleBusiness}
                onChange={(e) => setSettings({ ...settings, socialGoogleBusiness: e.target.value })}
                placeholder="https://g.page/yourbusiness"
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500"
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
