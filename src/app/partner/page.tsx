"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Briefcase, TrendingUp, Handshake, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    profession: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Header />
      
      {/* Slim Hero Banner */}
      <div className="w-full h-48 sm:h-64 lg:h-72 relative overflow-hidden mt-[72px]">
        <img 
          src="/partner-hero.jpg" 
          alt="BFS Partnership" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent"></div>
        <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white max-w-2xl">
            Partner With Excellence
          </h1>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-bold mb-6">
              <Handshake className="w-4 h-4" /> B2B Partnership Program
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white leading-[1.1]">
              Grow Your Business with <span className="text-emerald-600 dark:text-emerald-400">BFS</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-emerald-100/70 mb-10 leading-relaxed">
              Join our elite network of DSA partners, Real Estate Agents, and CAs. Offer your clients the lowest home loan rates, zero processing fees, and 100% cashless insurance while earning industry-leading payouts.
            </p>

            <div className="space-y-6">
              {[
                { icon: <TrendingUp className="w-6 h-6 text-emerald-500" />, title: "Highest Market Payouts", desc: "Earn transparent, timely, and high commissions on every successful loan disbursement." },
                { icon: <Briefcase className="w-6 h-6 text-emerald-500" />, title: "Direct Bank Sanctions", desc: "Leverage our deep institutional tie-ups with 50+ banks for fastest approvals." },
                { icon: <Users className="w-6 h-6 text-emerald-500" />, title: "Dedicated RM Support", desc: "Get a dedicated Relationship Manager to handle your files end-to-end." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-emerald-900/50 flex items-center justify-center shrink-0 shadow-sm border border-slate-100 dark:border-emerald-800/50">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-emerald-100/60">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-emerald-900/40 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 dark:border-emerald-800/50 relative overflow-hidden"
          >
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Request Received!</h3>
                <p className="text-slate-600 dark:text-emerald-100/70 text-lg mb-8">
                  Our B2B Partnership Team will contact you within 24 hours to discuss the onboarding process.
                </p>
                <button onClick={() => setSubmitted(false)} className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Partner Registration Form</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name *</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone Number *</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white" placeholder="9876543210" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">City *</label>
                    <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white" placeholder="e.g. Agra, Delhi" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Current Profession *</label>
                  <select required value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white">
                    <option value="">-- Select Profession --</option>
                    <option value="Real Estate Agent / Builder">Real Estate Agent / Builder</option>
                    <option value="CA / CS / Tax Consultant">CA / CS / Tax Consultant</option>
                    <option value="Loan Agent / DSA">Loan Agent / DSA</option>
                    <option value="Insurance Agent">Insurance Agent</option>
                    <option value="Financial Planner">Financial Planner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message (Optional)</label>
                  <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={3} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800/50 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-white resize-none" placeholder="Tell us a bit about your current business volume..." />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting Request..." : "Become a Partner"}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
                <p className="text-center text-xs text-slate-500 dark:text-emerald-100/50 mt-4">
                  By submitting, you agree to our privacy policy and consent to be contacted.
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
