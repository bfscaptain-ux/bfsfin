"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Mail, Lock } from "lucide-react";

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Agra",
    empType: "Salaried",
    income: "1500000",
    loanType: "Home Loan",
    loanAmount: "3500000",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [otpHash, setOtpHash] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);

  const handleSendOtp = async () => {
    if (!formData.email) return alert("Please enter your email first.");
    
    setSendingOtp(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, name: formData.name })
      });
      const data = await res.json();
      
      if (data.success) {
        setOtpHash(data.hash);
        setOtpSent(true);
        alert("OTP sent to your email!");
      } else {
        alert(data.error || "Failed to send OTP. Check admin settings.");
      }
    } catch (e) {
      alert("Network error. Could not send OTP.");
    }
    setSendingOtp(false);
  };

  const handleVerifyOtp = () => {
    if (!otpInput) return;
    const inputHash = btoa(`${otpInput}-BFS2026`);
    
    if (inputHash === otpHash) {
      setOtpVerified(true);
    } else {
      alert("Invalid OTP! Please check your email and try again.");
    }
  };

  const nextStep = () => {
    if (step === 1 && !otpVerified) {
      alert("Please verify your email to continue.");
      return;
    }
    setStep(s => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          loanType: formData.loanType,
          loanAmount: formData.loanAmount,
          income: formData.income,
          city: formData.city,
          employmentType: formData.empType,
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setErrorMsg(data.error || "An error occurred");
        setSubmitting(false);
        return;
      }

      const generatedId = `APP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setAppId(generatedId);
      setSubmitted(true);
    } catch (error) {
      setErrorMsg("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />

      <main className="flex-1 py-16 max-w-3xl mx-auto px-4 sm:px-6 w-full">
        {!submitted ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 text-[11px] uppercase font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full tracking-wider mb-4">
                <Lock className="w-3 h-3" /> Secure 256-bit Form
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Check Eligibility in 2 Mins</h1>
              <p className="text-sm text-slate-500 mt-3 font-medium">No documents required right now. Get instant processing and best rates.</p>
            </div>

            {errorMsg && (
              <div className="mb-8 bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> {errorMsg}
              </div>
            )}

            <div className="mb-10">
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-2.5">
                <span className="uppercase tracking-wider">Step {step} of 3</span>
                <span className="text-emerald-600">{Math.round((step / 3) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h3 className="text-xl font-black text-slate-900">1. Contact Details</h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Where should we send your loan updates?</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="As per PAN card" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Mobile Number *</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all" />
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address *</label>
                      <div className="flex gap-3">
                        <input type="email" name="email" required disabled={otpVerified} value={formData.email} onChange={handleChange} placeholder="For loan sanction letter" className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none disabled:opacity-60 disabled:bg-slate-100 transition-all" />
                        {!otpVerified && (
                          <button type="button" onClick={handleSendOtp} disabled={sendingOtp} className="bg-emerald-900 hover:bg-slate-800 text-white text-sm font-bold px-6 rounded-xl transition-all shadow-md active:scale-95 shrink-0 disabled:opacity-50">
                            {sendingOtp ? 'Sending...' : 'Send OTP'}
                          </button>
                        )}
                      </div>
                    </div>

                    {otpSent && !otpVerified && (
                      <div className="flex gap-3 items-end animate-in fade-in slide-in-from-top-2 pt-2 border-t border-slate-200">
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide text-emerald-600">Enter OTP Sent to Email</label>
                          <input type="text" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} placeholder="4-digit code" className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-medium placeholder-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all" />
                        </div>
                        <button type="button" onClick={handleVerifyOtp} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 rounded-xl transition-all shadow-md active:scale-95 h-[48px]">Verify</button>
                      </div>
                    )}
                    
                    {otpVerified && (
                      <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                        <CheckCircle2 className="w-5 h-5" /> Email Verified Successfully
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-6">
                    <button type="button" onClick={nextStep} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all">
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h3 className="text-xl font-black text-slate-900">2. Desired Loan Details</h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Tell us what you are looking for.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Loan Requirement *</label>
                      <select name="loanType" value={formData.loanType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-bold focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all cursor-pointer">
                        <option value="Home Loan">🏠 Home Loan (Purchase/Construction)</option>
                        <option value="Loan Against Property">🏢 Loan Against Property (LAP)</option>
                        <option value="Business Loan">💼 Business Loan (MSME)</option>
                        <option value="Balance Transfer">🔄 Balance Transfer (Lower EMI)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Required Amount (₹) *</label>
                      <input type="number" name="loanAmount" required value={formData.loanAmount} onChange={handleChange} placeholder="e.g. 5000000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-bold focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all" />
                    </div>
                  </div>

                  <div className="flex justify-between pt-6 border-t border-slate-100">
                    <button type="button" onClick={() => setStep(1)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl text-sm flex items-center gap-2 transition-all active:scale-95">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all">
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h3 className="text-xl font-black text-slate-900">3. Income & Submit</h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Final step to check your eligibility.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Employment Type *</label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`border rounded-xl p-3 text-center cursor-pointer transition-all ${formData.empType === 'Salaried' ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 font-medium'}`}>
                          <input type="radio" name="empType" value="Salaried" checked={formData.empType === 'Salaried'} onChange={handleChange} className="hidden" />
                          Salaried (Job)
                        </label>
                        <label className={`border rounded-xl p-3 text-center cursor-pointer transition-all ${formData.empType === 'Self-Employed' ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 font-medium'}`}>
                          <input type="radio" name="empType" value="Self-Employed" checked={formData.empType === 'Self-Employed'} onChange={handleChange} className="hidden" />
                          Self-Employed
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">City of Residence *</label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-medium focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                        {formData.empType === 'Salaried' ? 'Yearly Inhand Salary (₹) *' : 'Yearly Business Profit/ITR (₹) *'}
                      </label>
                      <input type="number" name="income" required value={formData.income} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-bold focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all text-lg" />
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex gap-3 text-xs text-slate-600 leading-relaxed font-medium">
                    <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                    <p>By clicking submit, I authorize Bhardwaj Finance Services and its representatives to contact me via call, SMS, or WhatsApp to process this application. My data is 100% secure.</p>
                  </div>

                  <div className="flex justify-between pt-6 border-t border-slate-100">
                    <button type="button" onClick={() => setStep(2)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl text-sm flex items-center gap-2 transition-all active:scale-95">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="submit" disabled={submitting} className="bg-emerald-900 hover:bg-black text-white font-black px-10 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-xl shadow-slate-900/20 active:scale-95 transition-all disabled:opacity-50">
                      {submitting ? 'Processing...' : 'Submit Application'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-xl animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-emerald-100">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Application Received!</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto font-medium">
              Your loan request has been securely registered in our system. Our executive will call you within 2-4 working hours.
            </p>
            <div className="bg-slate-50 inline-block px-8 py-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block mb-1">Application Reference Number</span>
              <span className="text-2xl font-mono font-black text-slate-900">{appId}</span>
            </div>
            <div className="mt-10 pt-8 border-t border-slate-100 text-xs text-slate-500 font-medium flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" /> 256-bit Encrypted & Secure Database Transmission
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
