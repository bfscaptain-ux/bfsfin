'use client';

import React, { useState } from 'react';
import { User, Building, CreditCard, Lock, Save, Camera, Check, MessageSquare } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Account Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your personal information, business details, and payout preferences.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 min-h-[600px] relative z-10">
          {/* Settings Navigation */}
          <div className="border-r border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-950/50">
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('personal')}
                className={`w-full flex items-center px-4 py-3 rounded-xl font-bold transition-all ${
                  activeTab === 'personal' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:bg-slate-900 hover:text-slate-900 dark:text-white border border-transparent'
                }`}
              >
                <User className="w-5 h-5 mr-3" />
                Personal Info
              </button>
              <button 
                onClick={() => setActiveTab('business')}
                className={`w-full flex items-center px-4 py-3 rounded-xl font-bold transition-all ${
                  activeTab === 'business' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:bg-slate-900 hover:text-slate-900 dark:text-white border border-transparent'
                }`}
              >
                <Building className="w-5 h-5 mr-3" />
                Business Details
              </button>
              <button 
                onClick={() => setActiveTab('payouts')}
                className={`w-full flex items-center px-4 py-3 rounded-xl font-bold transition-all ${
                  activeTab === 'payouts' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:bg-slate-900 hover:text-slate-900 dark:text-white border border-transparent'
                }`}
              >
                <CreditCard className="w-5 h-5 mr-3" />
                Bank & Payouts
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-4 py-3 rounded-xl font-bold transition-all ${
                  activeTab === 'security' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:bg-slate-900 hover:text-slate-900 dark:text-white border border-transparent'
                }`}
              >
                <Lock className="w-5 h-5 mr-3" />
                Security
              </button>
              <button 
                onClick={() => setActiveTab('whatsapp')}
                className={`w-full flex items-center px-4 py-3 rounded-xl font-bold transition-all ${
                  activeTab === 'whatsapp' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:bg-slate-900 hover:text-slate-900 dark:text-white border border-transparent'
                }`}
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                WhatsApp Alerts
              </button>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="col-span-3 p-8 md:p-10">
            {activeTab === 'personal' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">Personal Information</h2>
                
                <form onSubmit={handleSave} className="space-y-8">
                  <div className="flex items-center mb-8">
                    <div className="relative group cursor-pointer">
                      <div className="h-24 w-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 text-3xl font-black mr-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        JD
                      </div>
                      <div className="absolute inset-0 bg-white dark:bg-slate-900/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity mr-6 border-2 border-emerald-400">
                        <Camera className="w-8 h-8 text-slate-900 dark:text-white" />
                      </div>
                    </div>
                    <div>
                      <button type="button" className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-700 transition-colors shadow-lg">
                        Upload New Photo
                      </button>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 font-medium">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">First Name</label>
                      <input type="text" defaultValue="John" className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 dark:text-white outline-none transition-all shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 dark:text-white outline-none transition-all shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Email Address</label>
                      <input type="email" defaultValue="john.doe@example.com" className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 dark:text-white outline-none transition-all shadow-inner" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Phone Number</label>
                      <input type="tel" defaultValue="+91 9876543210" className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 dark:text-white outline-none transition-all shadow-inner" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Address</label>
                      <textarea rows={3} defaultValue="123 Business Avenue, Block C, New Delhi, 110001" className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 dark:text-white outline-none transition-all shadow-inner resize-none"></textarea>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-end items-center space-x-4">
                    {saved && (
                      <span className="text-emerald-400 font-bold flex items-center text-sm animate-in fade-in">
                        <Check className="w-4 h-4 mr-1" /> Saved successfully
                      </span>
                    )}
                    <button 
                      type="submit" 
                      disabled={isSaving}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'whatsapp' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3 text-emerald-500" />
                  WhatsApp Integrations
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
                  Receive instant updates for your referred leads directly on your WhatsApp number.
                </p>
                
                <form onSubmit={handleSave} className="space-y-8">
                  <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lead Status Alerts</h3>
                        <p className="text-sm text-slate-500">Get notified when a lead's status changes (e.g., Sanctioned, Disbursed).</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Verified WhatsApp Number</label>
                      <div className="flex space-x-4">
                        <input type="tel" defaultValue="+91 9876543210" className="w-full max-w-md px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 dark:text-white outline-none transition-all" />
                        <button type="button" className="bg-blue-600 text-white px-5 py-3 rounded-xl font-bold shadow-md hover:bg-blue-500 transition-colors">
                          Verify
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-end items-center space-x-4">
                    {saved && (
                      <span className="text-emerald-400 font-bold flex items-center text-sm animate-in fade-in">
                        <Check className="w-4 h-4 mr-1" /> Saved successfully
                      </span>
                    )}
                    <button 
                      type="submit" 
                      disabled={isSaving}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab !== 'personal' && activeTab !== 'whatsapp' && (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
                  {activeTab === 'business' && <Building className="w-12 h-12 text-slate-600 dark:text-slate-400" />}
                  {activeTab === 'payouts' && <CreditCard className="w-12 h-12 text-slate-600 dark:text-slate-400" />}
                  {activeTab === 'security' && <Lock className="w-12 h-12 text-slate-600 dark:text-slate-400" />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Section under construction</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-sm">This settings area is currently being updated for the new platform version.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
