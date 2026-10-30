"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Users, Briefcase, TrendingUp, Handshake, CheckCircle2, ArrowRight, 
  ShieldCheck, Award, Building2, PhoneCall, Sparkles, Lock 
} from "lucide-react";
import { motion } from "framer-motion";
import B2BPartnerHuman2D from "@/components/illustrations/B2BPartnerHuman2D";

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    state: "Uttar Pradesh",
    profession: "",
    experience: "1 - 3 Years",
    monthlyVolume: "₹25 Lakh - ₹1 Crore",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [partnerId, setPartnerId] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) {
      alert("Please authorize the consent checkbox to register.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          consentGiven: true,
          consentTimestamp: new Date().toISOString()
        })
      });
      if (res.ok) {
        setPartnerId(`BFS-DSA-${Math.floor(10000 + Math.random() * 90000)}`);
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please check your details and try again.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Header />
      
      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Handshake className="w-4 h-4 text-emerald-400" /> Official Channel Partner &amp; DSA Portal
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Partner With <span className="text-emerald-400">Bhardwaj Financial Services</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Direct institutional code with 50+ Banks &amp; HFCs. Highest market payouts, 100% digital file submission, and dedicated RM support for your business.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Value Proposition & Partner Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white dark:bg-[#071711] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-emerald-900/60 shadow-sm space-y-6">
              {/* Relatable 2D B2B Partnership Illustration */}
              <div className="w-full h-44 sm:h-52 flex items-center justify-center bg-emerald-50/50 dark:bg-emerald-950/40 rounded-2xl p-2 border border-emerald-100 dark:border-emerald-800/40">
                <B2BPartnerHuman2D className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Why Top DSAs &amp; Advisors Choose BFS
              </h2>
              
              <div className="space-y-5">
                {[
                  {
                    icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
                    title: "Highest Industry Payouts",
                    desc: "Transparent commission slab up to 1.5%* on retail loan disbursements. Timely monthly disbursement cycle with complete MIS ledger."
                  },
                  {
                    icon: <Building2 className="w-6 h-6 text-emerald-500" />,
                    title: "50+ Institutional Bank Tie-ups",
                    desc: "Direct access to SBI, PNB, HDFC, ICICI, Axis, Central Bank, IDBI, and leading Housing Finance NBFCs under one master desk."
                  },
                  {
                    icon: <Briefcase className="w-6 h-6 text-emerald-500" />,
                    title: "Dedicated Relationship Manager",
                    desc: "In-house credit underwriting desk handles your file login, title search, valuation, and bank sanctioning end-to-end."
                  },
                  {
                    icon: <Award className="w-6 h-6 text-emerald-500" />,
                    title: "Zero Setup or Registration Fees",
                    desc: "100% free channel partner empanelment. No hidden software fees, deposits, or operational charges."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-800/60">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Channel Desk Contact */}
            <div className="bg-emerald-900/20 rounded-2xl p-5 border border-emerald-800/40 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Direct Partner Desk Helpline</p>
                <p className="text-lg font-black text-white">+91 9258-724-227</p>
                <p className="text-xs text-slate-300">Office: C-11, Cloth Market, Sanjay Place, Agra</p>
              </div>
              <a
                href="https://wa.me/917900979001?text=Hello%20BFS%20Team%2C%20I%20want%20to%20apply%20as%20a%20Channel%20Partner%20%2F%20DSA"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
              >
                Chat on WhatsApp →
              </a>
            </div>
          </div>

          {/* Right Column: Dedicated Partner Onboarding Form */}
          <div className="lg:col-span-6">
            <div className="bg-white dark:bg-[#071711] rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 dark:border-emerald-900/60 relative">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-100 dark:border-emerald-800">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    Partner Registration Received!
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for applying to the BFS B2B Partner Network. Our Channel Head will contact you within <strong>24 working hours</strong> to verify your credentials and activate your partner portal.
                  </p>
                  
                  <div className="bg-slate-50 dark:bg-emerald-950/60 p-4 rounded-2xl border border-slate-200 dark:border-emerald-800 inline-block text-left my-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Partner Reference Code</span>
                    <span className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400">{partnerId}</span>
                  </div>

                  <div>
                    <button 
                      onClick={() => {
                        setSubmitted(false);
                        setConsentChecked(false);
                      }} 
                      className="text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:underline"
                    >
                      Submit Another Registration
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="border-b border-slate-100 dark:border-emerald-900/50 pb-3">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      Partner Empanelment Form
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Fill out this quick form to initiate your DSA code activation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Full Name *
                      </label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white text-sm font-medium" 
                        placeholder="e.g. Rajesh Kumar" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Phone / WhatsApp *
                      </label>
                      <input 
                        required 
                        type="tel" 
                        maxLength={10}
                        value={formData.phone} 
                        onChange={e => setFormData({...formData, phone: e.target.value.replace(/[^0-9]/g, '')})} 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white text-sm font-medium" 
                        placeholder="10-digit mobile number" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Email Address *
                      </label>
                      <input 
                        required
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white text-sm font-medium" 
                        placeholder="rajesh@example.com" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Operating City *
                      </label>
                      <input 
                        required 
                        type="text" 
                        value={formData.city} 
                        onChange={e => setFormData({...formData, city: e.target.value})} 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white text-sm font-medium" 
                        placeholder="e.g. Agra, Mathura, Noida" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Current Profession *
                      </label>
                      <select 
                        required 
                        value={formData.profession} 
                        onChange={e => setFormData({...formData, profession: e.target.value})} 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white text-sm font-medium cursor-pointer"
                      >
                        <option value="">-- Select Profession --</option>
                        <option value="Loan Agent / Independent DSA">Loan Agent / Independent DSA</option>
                        <option value="Real Estate Broker / Builder">Real Estate Broker / Builder</option>
                        <option value="Chartered Accountant (CA) / Tax Consultant">CA / CS / Tax Consultant</option>
                        <option value="Insurance Advisor / POSP">Insurance Advisor / POSP</option>
                        <option value="Ex-Banker / Financial Consultant">Ex-Banker / Financial Consultant</option>
                        <option value="Other">Other Financial Professional</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Industry Experience
                      </label>
                      <select 
                        value={formData.experience} 
                        onChange={e => setFormData({...formData, experience: e.target.value})} 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white text-sm font-medium cursor-pointer"
                      >
                        <option value="Fresher / Less than 1 Year">Fresher / Less than 1 Year</option>
                        <option value="1 - 3 Years">1 - 3 Years</option>
                        <option value="3 - 5 Years">3 - 5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                      Expected Monthly File Volume
                    </label>
                    <select 
                      value={formData.monthlyVolume} 
                      onChange={e => setFormData({...formData, monthlyVolume: e.target.value})} 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white text-sm font-medium cursor-pointer"
                    >
                      <option value="₹10 Lakh - ₹25 Lakh">₹10 Lakh - ₹25 Lakh / month</option>
                      <option value="₹25 Lakh - ₹1 Crore">₹25 Lakh - ₹1 Crore / month</option>
                      <option value="₹1 Crore - ₹5 Crore">₹1 Crore - ₹5 Crore / month</option>
                      <option value="₹5 Crore+">₹5 Crore+ / month</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                      Notes / Existing Tie-ups (Optional)
                    </label>
                    <textarea 
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                      rows={2} 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white text-sm font-medium resize-none" 
                      placeholder="Brief details about your existing client base or business..." 
                    />
                  </div>

                  {/* Explicit Consent Checkbox */}
                  <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 p-3.5 rounded-xl text-left">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 dark:text-slate-300 leading-relaxed select-none">
                      <input
                        type="checkbox"
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-emerald-500 text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0 accent-emerald-500"
                      />
                      <span>
                        I authorize Bhardwaj Financial Services to contact me via Call, WhatsApp, SMS, or Email regarding partner onboarding and DSA commercial terms. (Read <Link href="/terms" target="_blank" className="text-emerald-600 dark:text-emerald-400 underline font-semibold">Terms</Link> &amp; <Link href="/privacy-policy" target="_blank" className="text-emerald-600 dark:text-emerald-400 underline font-semibold">Privacy Policy</Link>)
                      </span>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading || !consentChecked}
                    className={`w-full py-4 rounded-xl font-black text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
                      !consentChecked
                        ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25 active:scale-95 cursor-pointer"
                    }`}
                  >
                    {loading ? "Submitting Registration..." : "Submit Partner Registration"}
                    {!loading && <ArrowRight className="w-5 h-5" />}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
