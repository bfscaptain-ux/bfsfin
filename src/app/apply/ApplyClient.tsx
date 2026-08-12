"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import ModernBackground from "@/components/ModernBackground";
import { 
  User, Mail, Phone, MapPin, Calendar as CalendarIcon, 
  Briefcase, DollarSign, Building2, TrendingUp,
  FileText, CreditCard, ShieldCheck, CheckCircle2,
  ArrowRight, ArrowLeft, Info, Home, Truck, GraduationCap, Link2, Key, ChevronDown
} from "lucide-react";
import Link from "next/link";

// --- Types ---
type EmploymentType = "Salaried" | "Self-Employed";
type LoanCategory = "Personal Loan" | "Business Loan" | "Home / Housing Loan" | "Vehicle / Auto Loan" | "Loan Against Property / Collateral" | "Education / Student Loan";

// --- Constants ---
const LOAN_CATEGORIES = [
  { id: "Personal Loan", icon: User, desc: "Wedding, Travel, Emergency, Consolidation" },
  { id: "Business Loan", icon: Briefcase, desc: "Working Capital, Machinery, Expansion, MSME" },
  { id: "Home / Housing Loan", icon: Home, desc: "Purchase, Construction, Renovation, LAP" },
  { id: "Vehicle / Auto Loan", icon: Truck, desc: "Car, Two-Wheeler, Commercial, EV" },
  { id: "Loan Against Property / Collateral", icon: Key, desc: "LAP, Gold Loan, Loan against FD/Shares" },
  { id: "Education / Student Loan", icon: GraduationCap, desc: "Domestic & Overseas Education, Skill Development" }
];

const LOAN_SUBCATEGORIES: Record<string, string[]> = {
  "Personal Loan": ["Salaried Personal Loan", "Self-Employed Personal Loan", "Instant / Micro Personal Loan", "Medical Emergency Loan", "Wedding / Travel Loan", "Debt Consolidation Loan"],
  "Business Loan": ["Working Capital Loan", "Machinery / Equipment Loan", "MSME / SME Loan", "Merchant Cash Advance / POS", "Business Expansion Loan", "Letter of Credit / Trade Finance"],
  "Home / Housing Loan": ["Home Purchase Loan", "Home Construction Loan", "Plot / Land Purchase Loan", "Home Improvement / Renovation", "Home Extension Loan", "Balance Transfer (Top-Up)"],
  "Vehicle / Auto Loan": ["New Car / Two-Wheeler Loan", "Pre-Owned / Used Car Loan", "Commercial Vehicle Loan", "Electric Vehicle (EV) Loan"],
  "Loan Against Property / Collateral": ["Loan Against Property (LAP)", "Gold Loan", "Loan Against Mutual Funds / Shares / FD"],
  "Education / Student Loan": ["Domestic Education Loan", "Overseas Education Loan", "Skill Development / Certification Loan"]
};

export default function ApplyClient() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  
  // OTP Verification State
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Category
    loanCategory: "" as LoanCategory | "",
    loanSubcategory: "",
    loanPurpose: "",
    
    // Step 2: Primary Info
    fullName: "",
    mobileNumber: "",
    email: "",
    address: "",
    pincode: "",
    dob: "",
    gender: "",
    
    // Step 3: Income & Employment
    employmentType: "Salaried" as EmploymentType,
    monthlyIncome: "",
    employerName: "",
    workExperience: "",
    
    // Step 4: Loan Details
    loanAmount: 500000,
    tenure: 24, // months
    
    // Step 5: Consents
    bureauConsent: false,
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    termsAccepted: false
  });

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const sendOTP = async () => {
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: "Valid email is required to send OTP" }));
      return;
    }
    setIsSendingOtp(true);
    setErrors(prev => ({ ...prev, otp: "" }));
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
      } else {
        setErrors(prev => ({ ...prev, otp: data.error || "Failed to send OTP" }));
      }
    } catch (err) {
      setErrors(prev => ({ ...prev, otp: "Error connecting to server" }));
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOTP = async () => {
    const code = otp.join("");
    if (code.length === 4) {
      setIsVerifyingOtp(true);
      setErrors(prev => ({ ...prev, otp: "" }));
      try {
        const res = await fetch("/api/otp/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, code }),
        });
        const data = await res.json();
        if (data.success) {
          setOtpVerified(true);
        } else {
          setErrors(prev => ({ ...prev, otp: data.error || "Invalid OTP" }));
        }
      } catch (err) {
        setErrors(prev => ({ ...prev, otp: "Error connecting to server" }));
      } finally {
        setIsVerifyingOtp(false);
      }
    } else {
      setErrors(prev => ({ ...prev, otp: "Please enter a valid 4-digit OTP" }));
    }
  };

  // --- Validation ---
  const validateStep = (currentStep: number) => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.loanCategory) {
        newErrors.loanCategory = "Please select a loan category";
        isValid = false;
      }
      if (formData.loanCategory && !formData.loanSubcategory) {
        newErrors.loanSubcategory = "Please select a sub-category";
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.fullName) { newErrors.fullName = "Full name is required"; isValid = false; }
      if (!formData.mobileNumber || formData.mobileNumber.length !== 10) { newErrors.mobileNumber = "Valid 10-digit mobile number required"; isValid = false; }
      if (!otpVerified) { newErrors.otp = "Please verify your email address"; isValid = false; }
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) { newErrors.email = "Valid email is required"; isValid = false; }
      if (!formData.address) { newErrors.address = "Address is required"; isValid = false; }
      if (!formData.pincode || formData.pincode.length !== 6) { newErrors.pincode = "Valid 6-digit pincode required"; isValid = false; }
      if (!formData.dob) { newErrors.dob = "Date of Birth is required"; isValid = false; }
      if (!formData.gender) { newErrors.gender = "Gender is required"; isValid = false; }
    } else if (currentStep === 3) {
      if (!formData.monthlyIncome) { newErrors.monthlyIncome = "Income/Turnover is required"; isValid = false; }
      if (!formData.employerName) { newErrors.employerName = "Employer/Business name is required"; isValid = false; }
      if (!formData.workExperience) { newErrors.workExperience = "Work experience is required"; isValid = false; }
    } else if (currentStep === 4) {
      if (!formData.loanAmount) { newErrors.loanAmount = "Loan amount is required"; isValid = false; }
      if (!formData.tenure) { newErrors.tenure = "Tenure is required"; isValid = false; }
    } else if (currentStep === 6) { // Consents
      if (!formData.bureauConsent) { newErrors.bureauConsent = "You must consent to bureau checks"; isValid = false; }
      if (!formData.bankName) { newErrors.bankName = "Bank name is required"; isValid = false; }
      if (!formData.accountNumber) { newErrors.accountNumber = "Account number is required"; isValid = false; }
      if (!formData.ifscCode) { newErrors.ifscCode = "IFSC code is required"; isValid = false; }
      if (!formData.termsAccepted) { newErrors.termsAccepted = "You must accept the terms and conditions"; isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(6)) {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Use the returned ID, or fallback to a generated one if undefined
          const generatedAppId = data.id || `BFS-${Math.floor(100000 + Math.random() * 900000)}`;
          setAppId(generatedAppId.substring(0, 10).toUpperCase()); // Shorten UUID for display
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          alert(data.error || "Failed to submit application. Please try again.");
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // --- Animation Variants ---
  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-900 selection:text-white transition-colors duration-500 relative">
      <ModernBackground />
      <Header />

      <main className="flex-1 py-12 md:py-20 relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {!submitted ? (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/60 dark:border-slate-700/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-shadow hover:shadow-emerald-900/10 duration-500">
            {/* Watermark Logo */}
            <div className="absolute -bottom-20 -right-20 pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05]">
              <img src="/logo.png" alt="" className="w-[500px] h-[500px] object-contain" />
            </div>

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
                <ShieldCheck className="w-4 h-4" /> Secure 256-bit Encryption
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">
                Fast & Secure Loan Application
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-3 font-medium">
                Complete this form in 5 minutes to get instant pre-approval and 5-day sanction processing.
              </p>
            </div>

            {/* Progress Stepper */}
            <div className="mb-10 relative z-10 hidden sm:block">
              <div className="flex justify-between relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 rounded-full" />
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500 ease-in-out -translate-y-1/2"
                  style={{ width: `${((step - 1) / 5) * 100}%` }}
                />
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-2 relative">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 relative z-10
                        ${step > i ? 'bg-emerald-500 border-emerald-500 text-white' : 
                          step === i ? 'bg-white dark:bg-slate-900 border-emerald-500 text-emerald-600 dark:text-emerald-400 ring-4 ring-emerald-100 dark:ring-emerald-900/30' : 
                          'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400'}
                      `}
                    >
                      {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider absolute -bottom-6 w-24 text-center ${step === i ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                      {i === 1 && "Category"}
                      {i === 2 && "Personal"}
                      {i === 3 && "Income"}
                      {i === 4 && "Details"}
                      {i === 5 && "Docs"}
                      {i === 6 && "Consent"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-6"></div> {/* Spacer for absolute text */}
            </div>

            {/* Mobile Progress */}
            <div className="mb-8 sm:hidden text-center relative z-10">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Step {step} of 6</span>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${(step / 6) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: LOAN CATEGORY */}
                {step === 1 && (
                  <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Select Loan Category</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {LOAN_CATEGORIES.map((cat) => (
                        <div 
                          key={cat.id}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, loanCategory: cat.id as LoanCategory }));
                            setErrors(prev => ({ ...prev, loanCategory: "" }));
                          }}
                          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                            formData.loanCategory === cat.id 
                              ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-900/20 shadow-md shadow-emerald-500/10' 
                              : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-white dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className={`p-3 rounded-xl ${formData.loanCategory === cat.id ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                            <cat.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className={`font-bold text-base ${formData.loanCategory === cat.id ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>{cat.id}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{cat.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.loanCategory && <p className="text-red-500 text-sm font-medium mt-2 animate-pulse flex items-center gap-1"><Info className="w-4 h-4"/> {errors.loanCategory}</p>}

                    {formData.loanCategory && (
                      <div className="form-group mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                        <label className="form-label text-slate-800 dark:text-slate-200">Select Specific {formData.loanCategory} Type *</label>
                        <div className="relative">
                          <select 
                            name="loanSubcategory" 
                            value={formData.loanSubcategory} 
                            onChange={handleChange} 
                            className={`form-input mt-2 appearance-none pr-10 ${errors.loanSubcategory ? 'border-red-500' : ''}`}
                          >
                            <option value="">-- Choose Sub-category --</option>
                            {LOAN_SUBCATEGORIES[formData.loanCategory]?.map(sub => (
                              <option key={sub} value={sub}>{sub}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-6 w-5 h-5 text-slate-400 pointer-events-none" />
                        </div>
                        {errors.loanSubcategory && <p className="form-error">{errors.loanSubcategory}</p>}
                      </div>
                    )}

                    <div className="pt-6 flex justify-end border-t border-slate-200 dark:border-slate-800">
                      <button type="button" onClick={nextStep} className="btn-primary">
                        Next Step <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: PRIMARY INFO */}
                {step === 2 && (
                  <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Primary Information (As per KYC)</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="form-label">Full Name (As per PAN/Aadhaar) *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`form-input pl-10 ${errors.fullName ? 'border-red-500' : ''}`} placeholder="e.g. Ramesh Kumar" />
                        </div>
                        {errors.fullName && <p className="form-error">{errors.fullName}</p>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <div className="relative flex">
                          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 text-sm font-medium">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            disabled={otpVerified}
                            className={`form-input rounded-l-none flex-1 ${errors.email ? 'border-red-500' : ''} ${otpVerified ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 border-emerald-500' : ''}`} 
                            placeholder="ramesh@example.com" 
                          />
                          {!otpVerified && /^\S+@\S+\.\S+$/.test(formData.email) && (
                            <button 
                              type="button" 
                              onClick={sendOTP}
                              disabled={isSendingOtp}
                              className="absolute right-2 top-2 px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition disabled:opacity-50"
                            >
                              {isSendingOtp ? "Sending..." : "Get OTP"}
                            </button>
                          )}
                          {otpVerified && <CheckCircle2 className="absolute right-3 top-3 w-5 h-5 text-emerald-500" />}
                        </div>
                        {errors.email && <p className="form-error">{errors.email}</p>}
                        
                        {/* OTP Input UI */}
                        {otpSent && !otpVerified && (
                          <div className="mt-3 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50 animate-in fade-in slide-in-from-top-2">
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Enter 4-digit OTP sent to your email</label>
                            <div className="flex items-center gap-2">
                              {otp.map((digit, i) => (
                                <input
                                  key={i}
                                  id={`otp-${i}`}
                                  type="text"
                                  maxLength={1}
                                  value={digit}
                                  onChange={(e) => handleOTPChange(i, e.target.value)}
                                  className="w-12 h-12 text-center text-lg font-black bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                              ))}
                              <button type="button" onClick={verifyOTP} disabled={isVerifyingOtp} className="ml-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition disabled:opacity-50">
                                {isVerifyingOtp ? "Verifying..." : "Verify"}
                              </button>
                            </div>
                            {errors.otp && <p className="form-error mt-2">{errors.otp}</p>}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Mobile Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                          <input type="tel" name="mobileNumber" maxLength={10} value={formData.mobileNumber} onChange={handleChange} className={`form-input pl-10 ${errors.mobileNumber ? 'border-red-500' : ''}`} placeholder="9876543210" />
                        </div>
                        {errors.mobileNumber && <p className="form-error">{errors.mobileNumber}</p>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Date of Birth *</label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={`form-input pl-10 ${errors.dob ? 'border-red-500' : ''}`} />
                        </div>
                        {errors.dob && <p className="form-error">{errors.dob}</p>}
                      </div>

                      <div className="form-group md:col-span-2">
                        <label className="form-label">Current Address *</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                          <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className={`form-input pl-10 resize-none ${errors.address ? 'border-red-500' : ''}`} placeholder="House/Flat No, Street, Landmark" />
                        </div>
                        {errors.address && <p className="form-error">{errors.address}</p>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Pincode *</label>
                        <input type="text" name="pincode" maxLength={6} value={formData.pincode} onChange={handleChange} className={`form-input ${errors.pincode ? 'border-red-500' : ''}`} placeholder="e.g. 282002" />
                        {errors.pincode && <p className="form-error">{errors.pincode}</p>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Gender *</label>
                        <div className="relative">
                          <select name="gender" value={formData.gender} onChange={handleChange} className={`form-input appearance-none pr-10 ${errors.gender ? 'border-red-500' : ''}`}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                        </div>
                        {errors.gender && <p className="form-error">{errors.gender}</p>}
                      </div>
                    </div>

                    <div className="pt-6 flex justify-between border-t border-slate-200 dark:border-slate-800">
                      <button type="button" onClick={prevStep} className="btn-secondary">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                      </button>
                      <button type="button" onClick={nextStep} className="btn-primary">
                        Next Step <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: INCOME & EMPLOYMENT */}
                {step === 3 && (
                  <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Income & Employment Details</h2>
                    
                    <div className="mb-6">
                      <label className="form-label mb-3">Employment Type *</label>
                      <div className="flex gap-4 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-md">
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, employmentType: "Salaried" }));
                            setErrors({});
                          }}
                          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${
                            formData.employmentType === "Salaried" 
                              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                          }`}
                        >
                          Salaried
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, employmentType: "Self-Employed" }));
                            setErrors({});
                          }}
                          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${
                            formData.employmentType === "Self-Employed" 
                              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                          }`}
                        >
                          Self-Employed / Business
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="form-group">
                        <label className="form-label">{formData.employmentType === "Salaried" ? "Net Monthly Salary (₹)" : "Annual Gross Turnover (₹)"} *</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                          <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} className={`form-input pl-10 ${errors.monthlyIncome ? 'border-red-500' : ''}`} placeholder={formData.employmentType === "Salaried" ? "e.g. 45000" : "e.g. 5000000"} />
                        </div>
                        {errors.monthlyIncome && <p className="form-error">{errors.monthlyIncome}</p>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">{formData.employmentType === "Salaried" ? "Company / Employer Name" : "Business / Shop Name"} *</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                          <input type="text" name="employerName" value={formData.employerName} onChange={handleChange} className={`form-input pl-10 ${errors.employerName ? 'border-red-500' : ''}`} placeholder="Name of organization" />
                        </div>
                        {errors.employerName && <p className="form-error">{errors.employerName}</p>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">{formData.employmentType === "Salaried" ? "Current Work Experience" : "Business Vintage (Years in operation)"} *</label>
                        <div className="relative">
                          <TrendingUp className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                          <select name="workExperience" value={formData.workExperience} onChange={handleChange} className={`form-input pl-10 appearance-none pr-10 ${errors.workExperience ? 'border-red-500' : ''}`}>
                            <option value="">Select duration</option>
                            <option value="Less than 1 year">Less than 1 year</option>
                            <option value="1-3 years">1-3 years</option>
                            <option value="3-5 years">3-5 years</option>
                            <option value="More than 5 years">More than 5 years</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                        </div>
                        {errors.workExperience && <p className="form-error">{errors.workExperience}</p>}
                      </div>
                    </div>

                    <div className="pt-6 flex justify-between border-t border-slate-200 dark:border-slate-800">
                      <button type="button" onClick={prevStep} className="btn-secondary">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                      </button>
                      <button type="button" onClick={nextStep} className="btn-primary">
                        Next Step <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: LOAN REQUIREMENTS */}
                {step === 4 && (
                  <motion.div key="step4" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Loan Requirements</h2>
                    
                    <div className="bg-slate-50/50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <div className="mb-8">
                        <div className="flex justify-between items-end mb-4">
                          <label className="form-label mb-0">Required Loan Amount *</label>
                          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                            ₹{(formData.loanAmount / 100000).toFixed(1)} Lakhs
                          </span>
                        </div>
                        <input 
                          type="range" 
                          name="loanAmount"
                          min="50000" 
                          max="10000000" 
                          step="50000"
                          value={formData.loanAmount}
                          onChange={handleChange}
                          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
                          <span>₹50K</span>
                          <span>₹100L (1Cr)</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-end mb-4">
                          <label className="form-label mb-0">Expected Tenure (Months) *</label>
                          <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                            {formData.tenure} Months <span className="text-sm text-slate-500 font-medium">({(formData.tenure / 12).toFixed(1)} Yrs)</span>
                          </span>
                        </div>
                        <input 
                          type="range" 
                          name="tenure"
                          min="6" 
                          max="240" 
                          step="6"
                          value={formData.tenure}
                          onChange={handleChange}
                          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
                          <span>6 M</span>
                          <span>240 M (20 Yrs)</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Specific Purpose of Loan (Optional)</label>
                      <textarea name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} rows={2} className="form-input resize-none" placeholder="e.g. Wedding expenses, Machinery purchase, Home construction" />
                    </div>

                    <div className="pt-6 flex justify-between border-t border-slate-200 dark:border-slate-800">
                      <button type="button" onClick={prevStep} className="btn-secondary">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                      </button>
                      <button type="button" onClick={nextStep} className="btn-primary">
                        Next Step <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: KYC & DOCUMENTS */}
                {step === 5 && (
                  <motion.div key="step5" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Required KYC Documents</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Based on your profile as <strong className="text-emerald-600 dark:text-emerald-400">{formData.employmentType}</strong> looking for a <strong className="text-emerald-600 dark:text-emerald-400">{formData.loanCategory || 'Loan'}</strong>, please prepare the following documents. You don't need to upload them right now; our representative will collect them digitally or physically meet you to collect them.</p>
                    
                    <div className="space-y-3">
                      {/* Common: KYC */}
                      <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Identity & Address Proof (KYC)</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">PAN Card & Aadhaar Card (Mandatory). Latest Utility Bill, Rent Agreement, or Passport/Voter ID for address.</p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                      </div>

                      {/* Employment Specific */}
                      {formData.employmentType === "Salaried" ? (
                        <>
                          <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-left-2">
                            <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                              <DollarSign className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Income Proof (Salaried)</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last 3-6 months Salary Slips, 6 months Bank Statement, and Form 16 / ITR.</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                          </div>
                          <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-left-2">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                              <Briefcase className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Employment Proof</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Company ID Card, HR Offer Letter/Appointment Letter, or Official Email Verification.</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-left-2">
                            <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                              <DollarSign className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Financial & Tax Proof (Business)</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last 2-3 years ITR with Computation, Audited Balance Sheet & P&L, 12 months Bank Statements (Current & Savings).</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                          </div>
                          <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-left-2">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                              <Building2 className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Business Proof</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">GST Registration & Returns, Udyam/MSME, Shop License, Partnership Deed/MOA, and Business Utility Bill.</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                          </div>
                        </>
                      )}

                      {/* Loan Category Specific */}
                      {(formData.loanCategory === "Home / Housing Loan" || formData.loanCategory === "Loan Against Property / Collateral") && (
                        <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-left-2">
                          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                            <Home className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Property Documents</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Original Sale/Mother Deed, Khasra/Khata/Mutation, Non-Encumbrance Certificate (NEC), Property Tax Receipt, Approved Building Map, or Existing Loan Sanction Letter.</p>
                          </div>
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                        </div>
                      )}

                      {formData.loanCategory === "Vehicle / Auto Loan" && (
                        <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-left-2">
                          <div className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded-lg text-rose-600 dark:text-rose-400 shrink-0 mt-0.5">
                            <Truck className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Vehicle Documents</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Dealer Proforma Invoice (New), Vehicle RC, Insurance, Fitness Certificate, Road Tax receipt, or Transport Permit.</p>
                          </div>
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                        </div>
                      )}

                      {formData.loanCategory === "Education / Student Loan" && (
                        <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-left-2">
                          <div className="p-2 bg-sky-50 dark:bg-sky-900/30 rounded-lg text-sky-600 dark:text-sky-400 shrink-0 mt-0.5">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Academic & Co-Applicant Proof</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">10th/12th/Grad Marksheets, Entrance Exam Scorecard, Admission/Offer Letter, Fee Structure Sheet. Complete financials & asset proofs of parent/guardian (Co-applicant).</p>
                          </div>
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                        </div>
                      )}

                      {/* Common: Photograph */}
                      <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400 shrink-0 mt-0.5">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Photograph</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Recent Passport Size Photo or Live Selfie (e-KYC)</p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                      </div>
                    </div>

                    <div className="pt-6 flex justify-between border-t border-slate-200 dark:border-slate-800">
                      <button type="button" onClick={prevStep} className="btn-secondary">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                      </button>
                      <button type="button" onClick={nextStep} className="btn-primary">
                        Acknowledge & Proceed <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 6: LEGAL & BANK */}
                {step === 6 && (
                  <motion.div key="step6" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Final Verification & Consents</h2>
                    
                    <div className="bg-blue-50/50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800/50 mb-6 flex gap-3 items-start">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                        Please provide basic bank details for NACH/e-NACH mandate setup and disbursal. Your data is encrypted and securely transmitted directly to partner banks.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="form-group">
                        <label className="form-label">Primary Bank Name *</label>
                        <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className={`form-input ${errors.bankName ? 'border-red-500' : ''}`} placeholder="e.g. HDFC Bank, SBI" autoComplete="off" />
                        {errors.bankName && <p className="form-error">{errors.bankName}</p>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Account Number *</label>
                        <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className={`form-input ${errors.accountNumber ? 'border-red-500' : ''}`} placeholder="Account for disbursal" autoComplete="off" />
                        {errors.accountNumber && <p className="form-error">{errors.accountNumber}</p>}
                      </div>
                      <div className="form-group sm:col-span-2">
                        <label className="form-label">IFSC Code *</label>
                        <input type="text" name="ifscCode" maxLength={11} value={formData.ifscCode} onChange={handleChange} className={`form-input uppercase ${errors.ifscCode ? 'border-red-500' : ''}`} placeholder="e.g. HDFC0001234" autoComplete="off" />
                        {errors.ifscCode && <p className="form-error">{errors.ifscCode}</p>}
                      </div>
                    </div>

                    <div className="space-y-4 mt-8">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-1">
                          <input type="checkbox" name="bureauConsent" checked={formData.bureauConsent} onChange={handleChange} className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 cursor-pointer" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 transition-colors">Bureau Check Consent *</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">I authorize Bhardwaj Finance and its lending partners to fetch my CIBIL / Experian credit report to assess my loan eligibility.</p>
                        </div>
                      </label>
                      {errors.bureauConsent && <p className="form-error ml-8">{errors.bureauConsent}</p>}

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-1">
                          <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 cursor-pointer" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 transition-colors">Terms & Privacy Policy *</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">I accept the Terms & Conditions and Privacy Policy. I understand my data is processed as per data privacy guidelines.</p>
                        </div>
                      </label>
                      {errors.termsAccepted && <p className="form-error ml-8">{errors.termsAccepted}</p>}
                    </div>

                    <div className="pt-6 flex justify-between border-t border-slate-200 dark:border-slate-800">
                      <button type="button" onClick={prevStep} disabled={isSubmitting} className="btn-secondary">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                      </button>
                      <button type="submit" disabled={isSubmitting} className="btn-primary bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-500/30">
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Processing...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Submit Application <CheckCircle2 className="w-4 h-4 ml-2" />
                          </span>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        ) : (
          /* SUCCESS SCREEN */
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-emerald-200 dark:border-emerald-800/50 rounded-3xl p-8 sm:p-16 text-center shadow-2xl relative overflow-hidden max-w-2xl mx-auto mt-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/30 relative z-10 animate-bounce-slow">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="relative z-10 space-y-3 mb-8">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Application Approved!</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Your digital application has been successfully securely transmitted to our processing center.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-8 inline-block text-left relative z-10 w-full sm:w-auto min-w-[300px]">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Application Reference ID</p>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-wider">{appId}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Loan Type</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{formData.loanCategory}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Amount</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">₹{(formData.loanAmount / 100000).toFixed(1)} L</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link href="/" className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl text-sm transition-colors">
                Back to Home
              </Link>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
      <FloatingSupport />

    </div>
  );
}
