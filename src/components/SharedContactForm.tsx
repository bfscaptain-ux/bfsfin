"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { State, City } from 'country-state-city';
import clsx from "clsx";

interface SharedContactFormProps {
  variant?: "default" | "dark";
}

export default function SharedContactForm({ variant = "default" }: SharedContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    stateIso: "",
    city: "",
    loanAmount: "",
    loanType: "Home Loan",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "stateIso") {
      const stateObj = State.getStateByCodeAndCountry(value, 'IN');
      setFormData({ ...formData, stateIso: value, state: stateObj?.name || "", city: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    
    try {
      const response = await fetch("/api/contact/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to initiate request");
      }
      
      setShowOTP(true);
    } catch (error: any) {
      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOTPAndSubmit = async () => {
    if (otp !== "123456") {
      setOtpError("Invalid OTP. For this demo, please use 123456.");
      return;
    }
    
    setIsSubmitting(true);
    setOtpError("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to submit");
      
      setShowOTP(false);
      setOtp("");
      setIsSubmitted(true);
      setFormData({ name: "", phone: "", email: "", state: "", stateIso: "", city: "", loanAmount: "", loanType: "Home Loan", message: "" });
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      setOtpError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styling based on variant
  const isDark = variant === "dark";
  
  const inputClass = clsx(
    "w-full rounded-2xl px-5 py-4 outline-none transition-all duration-300 text-[15px] font-medium placeholder:font-normal backdrop-blur-xl",
    isDark 
      ? "bg-slate-900/40 border border-slate-700/50 text-white placeholder:text-slate-500/70 hover:bg-slate-800/60 hover:border-slate-600 focus:bg-slate-900/80 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" 
      : "bg-slate-50/80 border border-slate-200/80 text-slate-900 placeholder:text-slate-400 hover:bg-white hover:border-slate-300 focus:bg-white focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
  );

  const labelClass = clsx(
    "block text-[10px] font-extrabold tracking-[0.2em] uppercase mb-2 ml-1 flex items-center gap-1",
    isDark ? "text-slate-400/80" : "text-slate-500"
  );

  return (
    <div className="relative w-full">
      <form onSubmit={handleSendOTP} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
            <input 
              type="text" id="name" name="name" required
              value={formData.name} onChange={handleChange}
              className={inputClass} placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
            <input 
              type="tel" id="phone" name="phone" required
              value={formData.phone} onChange={handleChange}
              className={inputClass} placeholder="+91 99999 99999"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="email" className={labelClass}>Email Address <span className="text-red-500">*</span></label>
            <input 
              type="email" id="email" name="email" required
              value={formData.email} onChange={handleChange}
              className={inputClass} placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="loanType" className={labelClass}>Loan Product <span className="text-red-500">*</span></label>
            <select 
              id="loanType" name="loanType" required
              value={formData.loanType} onChange={handleChange}
              className={clsx(inputClass, "appearance-none")}
            >
              <option value="Home Loan">Home Loan</option>
              <option value="Loan Against Property (LAP)">Loan Against Property (LAP)</option>
              <option value="Balance Transfer">Balance Transfer</option>
              <option value="Project Funding">Project Funding / Construction</option>
              <option value="Business Loan">Business Loan</option>
              <option value="Other">Other Query</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="stateIso" className={labelClass}>State <span className="text-red-500">*</span></label>
            <select 
              id="stateIso" name="stateIso" required
              value={formData.stateIso} onChange={handleChange}
              className={clsx(inputClass, "appearance-none")}
            >
              <option value="" disabled>Select State</option>
              {State.getStatesOfCountry('IN').map(state => (
                <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="city" className={labelClass}>City <span className="text-red-500">*</span></label>
            <select 
              id="city" name="city" required disabled={!formData.stateIso}
              value={formData.city} onChange={handleChange}
              className={clsx(inputClass, "appearance-none disabled:opacity-50")}
            >
              <option value="" disabled>Select City</option>
              {formData.stateIso && City.getCitiesOfState('IN', formData.stateIso).map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="loanAmount" className={labelClass}>Required Amount (₹)</label>
          <input 
            type="text" id="loanAmount" name="loanAmount"
            value={formData.loanAmount} onChange={handleChange}
            className={inputClass} placeholder="e.g. 50,000,00"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className={labelClass}>Additional Details (Optional)</label>
          <textarea 
            id="message" name="message" rows={3}
            value={formData.message} onChange={handleChange}
            className={clsx(inputClass, "resize-none")}
            placeholder="Tell us about your property or financial requirements..."
          />
        </div>

        <div className={clsx(
          "flex items-center gap-2 text-xs p-3 rounded-lg border",
          isDark ? "bg-slate-900/50 border-slate-800 text-slate-400" : "bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
        )}>
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Your data is 100% secure. We do not share your information with third-party marketers.</span>
        </div>

        {formError && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl border border-red-200 dark:border-red-800/50">
            {formError}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting || isSubmitted}
          className="group relative w-full overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-70 text-white font-extrabold text-[15px] py-4 md:py-5 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-3 uppercase tracking-wider mt-8 hover:-translate-y-1"
        >
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
          {isSubmitting ? (
            <span className="flex items-center gap-2 relative z-10">Authenticating <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/></span>
          ) : (
            <span className="flex items-center gap-2 relative z-10">Request Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
          )}
        </button>
      </form>

      {/* Success Overlay */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={clsx(
              "absolute inset-0 z-50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-8 text-center",
              isDark ? "bg-slate-900/95" : "bg-white/95 dark:bg-slate-900/95"
            )}
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-500 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
            <h3 className={clsx("text-3xl font-black mb-2", isDark ? "text-white" : "text-slate-900 dark:text-white")}>Request Received!</h3>
            <p className={clsx("mb-8 max-w-md", isDark ? "text-slate-400" : "text-slate-600 dark:text-slate-400")}>
              Thank you, {formData.name || 'friend'}. One of our senior loan experts will review your request and call you shortly.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className={clsx(
                "px-6 py-2.5 font-bold rounded-lg transition",
                isDark ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
              )}
            >
              Submit Another Request
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OTP Overlay */}
      <AnimatePresence>
        {showOTP && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={clsx(
              "absolute inset-0 z-40 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-8 text-center",
              isDark ? "bg-slate-900/95" : "bg-white/95 dark:bg-slate-900/95"
            )}
          >
            <h3 className={clsx("text-2xl font-black mb-2", isDark ? "text-white" : "text-slate-900 dark:text-white")}>Verify Mobile Number</h3>
            <p className={clsx("mb-6 max-w-sm text-sm", isDark ? "text-slate-400" : "text-slate-600 dark:text-slate-400")}>
              We've sent a 6-digit OTP to <span className="font-bold">{formData.phone}</span>. Enter it below. (Use <span className="font-bold">123456</span> for testing).
            </p>
            
            <div className="w-full max-w-xs space-y-4">
              <input 
                type="text" 
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className={clsx(
                  "w-full text-center text-2xl tracking-[0.5em] font-bold border rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all",
                  isDark ? "bg-slate-950 text-white border-slate-800" : "bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800"
                )}
              />
              {otpError && (
                <p className="text-red-500 text-xs font-medium">{otpError}</p>
              )}
              
              <div className="flex gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setShowOTP(false)}
                  className={clsx(
                    "flex-1 px-4 py-3 font-bold rounded-xl transition",
                    isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  )}
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={verifyOTPAndSubmit}
                  disabled={isSubmitting || otp.length !== 6}
                  className="flex-[2] bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 dark:disabled:bg-slate-700 text-white font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Verifying..." : "Verify"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
