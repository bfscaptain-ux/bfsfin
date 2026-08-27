"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building,
  ShieldCheck,
  Check,
  Loader2
} from "lucide-react";
import { STATES_AND_CITIES } from "@/lib/indianStatesAndCities";
import { ChevronDown } from "lucide-react";

function CustomSelect({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  disabled = false,
  name
}: { 
  value: string; 
  onChange: (name: string, val: string) => void; 
  options: string[]; 
  placeholder: string;
  disabled?: boolean;
  name: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      // Small timeout prevents immediate close on the opening click
      setTimeout(() => document.addEventListener('click', handleClickOutside), 0);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`relative ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between bg-slate-50 dark:bg-emerald-900/30 border border-slate-200 dark:border-emerald-800 text-slate-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm font-medium"
      >
        <span className={value ? '' : 'text-slate-500'}>{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-xl shadow-xl overflow-hidden"
          >
            <ul className="max-h-60 overflow-y-auto hide-scrollbar py-2">
              {options.length === 0 ? (
                <li className="px-4 py-2 text-sm text-slate-500 italic">No options</li>
              ) : (
                options.map(opt => (
                  <li 
                    key={opt}
                    onClick={() => {
                      onChange(name, opt);
                      setIsOpen(false);
                    }}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/50 transition-colors ${value === opt ? 'bg-emerald-50 dark:bg-emerald-900/50 font-bold text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    {opt}
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [settings, setSettings] = useState({
    officeAddress: "Block-C11, Shop No.-5, First Floor, near MK Tailor,\nSanjay Palace, Sanjay Place,\nAgra, Uttar Pradesh - 282002\nIndia",
    contactPhone: "+91 7900-979-001",
    officialEmail: "info@bfsfin.com",
    workingHours: "Mon-Sat: 10AM - 6PM"
  });

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSettings(prev => ({
            ...prev,
            officeAddress: data.settings.officeAddress || prev.officeAddress,
            contactPhone: data.settings.contactPhone || prev.contactPhone,
            officialEmail: data.settings.officialEmail || prev.officialEmail,
            workingHours: data.settings.workingHours || prev.workingHours,
          }));
        }
      })
      .catch(console.error);
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    loanAmount: "",
    loanType: "Home Loan",
    loanSubType: "",
    state: "",
    city: "",
    message: ""
  });

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");

  // Constants for Dropdowns
  const LOAN_PRODUCTS: Record<string, string[]> = {
    "Home Loan": ["Fresh Home Loan", "Home Extension", "Home Renovation", "Plot Purchase"],
    "Loan Against Property": ["Residential LAP", "Commercial LAP", "Industrial LAP"],
    "Balance Transfer": ["Home Loan BT", "LAP BT", "Top-up Loan"],
    "Project Funding": ["Builder Finance", "Construction Loan", "Land Acquisition"]
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Reset dependent dropdowns when parent changes
    if (name === "state") {
      setFormData({ ...formData, state: value, city: "" });
      return;
    }
    if (name === "loanType") {
      setFormData({ ...formData, loanType: value, loanSubType: "" });
      return;
    }

    setFormData({ ...formData, [name]: value });
    // If they change the email after verification, require verification again
    if (name === 'email' && otpVerified) {
      setOtpVerified(false);
      setOtpSent(false);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    // Reset dependent dropdowns when parent changes
    if (name === "state") {
      setFormData({ ...formData, state: value, city: "" });
      return;
    }
    if (name === "loanType") {
      setFormData({ ...formData, loanType: value, loanSubType: "" });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSendOTP = async () => {
    if (!formData.email || !formData.email.includes('@')) {
      setOtpError("Please enter a valid email address");
      return;
    }
    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        if (data.mockOtp) {
          console.log("MOCK OTP RECEIVED:", data.mockOtp);
          alert(`[DEV MODE] Your mock OTP is: ${data.mockOtp}`);
        } else {
          alert("A verification code has been sent to your email!");
        }
      } else {
        setOtpError(data.error || "Failed to send OTP");
      }
    } catch (err) {
      setOtpError("Network error. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpCode || otpCode.length < 5) return;
    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch('/api/otp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: otpCode })
      });
      const data = await res.json();
      if (data.success) {
        setOtpVerified(true);
      } else {
        setOtpError(data.error || "Invalid OTP");
      }
    } catch (err) {
      setOtpError("Network error. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) {
      setOtpError("Please verify your email first.");
      return;
    }
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/callbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", phone: "", email: "", loanAmount: "", loanType: "Home Loan", loanSubType: "", state: "", city: "", message: "" });
        setOtpSent(false);
        setOtpVerified(false);
        setOtpCode("");
        setTimeout(() => setIsSubmitted(false), 8000);
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b132b] font-sans selection:bg-emerald-500/30 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-24">
        <div className="bg-white dark:bg-emerald-900/20 rounded-3xl lg:rounded-[2.5rem] shadow-2xl border border-slate-200/50 dark:border-emerald-800/50 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Panel - Premium Brand Info */}
          <div className="w-full lg:w-[45%] bg-emerald-950 p-6 sm:p-10 lg:p-16 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-72 lg:w-96 h-72 lg:h-96 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-emerald-500/20 text-emerald-400 mb-6 lg:mb-8 backdrop-blur-sm border border-emerald-500/30">
                <Building className="w-6 h-6 lg:w-8 lg:h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 lg:mb-6 leading-tight">
                Let's discuss your financial goals.
              </h1>
              <p className="text-emerald-100/80 text-base lg:text-lg mb-8 lg:mb-12 max-w-md">
                Our senior consultants are ready to provide tailored advice for your exact requirements. Request a callback today.
              </p>

              <div className="space-y-6 lg:space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1 text-sm lg:text-base">Headquarters</h4>
                    <p className="text-emerald-200/60 text-xs lg:text-sm whitespace-pre-wrap leading-relaxed">{settings.officeAddress}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1 text-sm lg:text-base">Direct Sales</h4>
                    <p className="text-emerald-200/60 text-xs lg:text-sm">{settings.contactPhone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1 text-sm lg:text-base">General Inquiries</h4>
                    <p className="text-emerald-200/60 text-xs lg:text-sm">{settings.officialEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 lg:mt-16 pt-6 lg:pt-8 border-t border-emerald-800 flex items-center gap-3 lg:gap-4">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-500 shrink-0" />
              <p className="text-emerald-200/60 text-xs lg:text-sm">Available {settings.workingHours}</p>
            </div>
          </div>

          {/* Right Panel - The Form */}
          <div className="w-full lg:w-[55%] p-6 sm:p-10 lg:p-16 relative bg-white dark:bg-transparent">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
              >
                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Request Received!</h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                    Thank you! Your email was verified and your request is securely stored. An expert will call you shortly.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form {...fadeInUp} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name *</label>
                    <input 
                      type="text" name="name" required
                      value={formData.name} onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-emerald-900/30 border border-slate-200 dark:border-emerald-800 text-slate-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm font-medium"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number *</label>
                    <input 
                      type="tel" name="phone" required
                      value={formData.phone} onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-emerald-900/30 border border-slate-200 dark:border-emerald-800 text-slate-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm font-medium"
                      placeholder="+91 99999 99999"
                    />
                  </div>
                </div>

                {/* Email Verification Section */}
                <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-emerald-900/20 border border-slate-200 dark:border-emerald-800 rounded-xl relative overflow-hidden">
                  {otpVerified && <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />}
                  
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Email Address *</span>
                    {otpVerified && <span className="text-emerald-500 flex items-center gap-1 text-[10px]"><Check className="w-3 h-3"/> Verified</span>}
                  </label>
                  
                  <div className="flex gap-2">
                    <input 
                      type="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      disabled={otpVerified}
                      className={`w-full bg-white dark:bg-emerald-950/50 border ${otpVerified ? 'border-emerald-500/50 text-emerald-700 dark:text-emerald-400' : 'border-slate-200 dark:border-emerald-800 text-slate-900 dark:text-white'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm font-medium`}
                      placeholder="john@example.com"
                    />
                    {!otpVerified && (
                      <button 
                        type="button" 
                        onClick={handleSendOTP}
                        disabled={otpLoading}
                        className="px-4 py-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-bold text-sm rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition whitespace-nowrap"
                      >
                        {otpLoading && !otpSent ? <Loader2 className="w-4 h-4 animate-spin" /> : (otpSent ? 'Resend OTP' : 'Send OTP')}
                      </button>
                    )}
                  </div>

                  {otpError && <p className="text-xs text-red-500 font-medium mt-1">{otpError}</p>}
                  
                  {/* OTP Input slides down if sent and not yet verified */}
                  <AnimatePresence>
                    {otpSent && !otpVerified && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pt-3"
                      >
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={otpCode} onChange={(e) => setOtpCode(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            className="w-full bg-white dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 text-slate-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm font-bold tracking-widest text-center"
                          />
                          <button 
                            type="button" 
                            onClick={handleVerifyOTP}
                            disabled={otpLoading || otpCode.length < 5}
                            className="px-6 py-3 bg-slate-900 dark:bg-emerald-600 text-white font-bold text-sm rounded-lg hover:bg-slate-800 dark:hover:bg-emerald-500 transition disabled:opacity-50"
                          >
                            {otpLoading && otpSent ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm'}
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 text-center">Check your server terminal logs for the mock OTP code in Dev Mode.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">State *</label>
                    <CustomSelect 
                      name="state" 
                      value={formData.state} 
                      onChange={handleSelectChange}
                      options={Object.keys(STATES_AND_CITIES).sort()}
                      placeholder="Select State"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">City *</label>
                    <CustomSelect 
                      name="city" 
                      disabled={!formData.state}
                      value={formData.city} 
                      onChange={handleSelectChange}
                      options={formData.state ? [...STATES_AND_CITIES[formData.state]].sort() : []}
                      placeholder="Select City"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loan Product *</label>
                    <CustomSelect 
                      name="loanType" 
                      value={formData.loanType} 
                      onChange={handleSelectChange}
                      options={Object.keys(LOAN_PRODUCTS)}
                      placeholder="Select Product"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loan Sub-type *</label>
                    <CustomSelect 
                      name="loanSubType" 
                      disabled={!formData.loanType}
                      value={formData.loanSubType} 
                      onChange={handleSelectChange}
                      options={formData.loanType ? LOAN_PRODUCTS[formData.loanType] : []}
                      placeholder="Select Sub-type"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message (Optional)</label>
                  <textarea 
                    name="message" rows={3}
                    value={formData.message} onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-emerald-900/30 border border-slate-200 dark:border-emerald-800 text-slate-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm font-medium resize-none"
                    placeholder="Tell us briefly about your requirement..."
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting || !otpVerified}
                  className={`w-full font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                    otpVerified 
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:shadow-emerald-500/25 cursor-pointer' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">Submitting Request <Loader2 className="w-5 h-5 animate-spin" /></span>
                  ) : otpVerified ? (
                    <span className="flex items-center gap-2">Submit Callback Request <Send className="w-5 h-5" /></span>
                  ) : (
                    <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Verify Email to Submit</span>
                  )}
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
