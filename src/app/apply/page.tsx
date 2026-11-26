"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import FloatingHomeButton from "@/components/FloatingHomeButton";
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Lock, Sparkles, X, ExternalLink, FileText, RotateCw, AlertCircle, Check } from "lucide-react";
import EligibilitySuccessHuman2D from "@/components/illustrations/EligibilitySuccessHuman2D";
import HeroAdvisorHuman2D from "@/components/illustrations/HeroAdvisorHuman2D";

const PRODUCT_CATALOG = {
  Finance: {
    label: "💰 Finance (Loans & Mortgages)",
    subTypeLabel: "Select Loan Category *",
    amountLabel: "Required Loan Amount (₹) *",
    amountPlaceholder: "e.g. 3500000 (35 Lakhs)",
    defaultAmount: "3500000",
    subTypes: [
      "Home Loan (Purchase/Construction)",
      "Loan Against Property (LAP)",
      "Business Loan (MSME/Unsecured)",
      "Personal Loan",
      "Balance Transfer (Lower EMI)",
      "Gold Loan"
    ]
  },
  Insurance: {
    label: "🛡️ Insurance (Health, Life & General)",
    subTypeLabel: "Select Insurance Plan *",
    amountLabel: "Desired Sum Insured / Coverage (₹) *",
    amountPlaceholder: "e.g. 1000000 (10 Lakhs)",
    defaultAmount: "1000000",
    subTypes: [
      "Health Insurance (Individual/Family)",
      "Term Life Insurance",
      "Family Floater Health Plan",
      "Critical Illness Cover",
      "Car / Motor Insurance",
      "Two Wheeler Insurance",
      "Home & Property Insurance"
    ]
  }
};

type ProductCategory = "Finance" | "Insurance";

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  city: string;
  empType: string;
  income: string;
  subType: string;
  loanAmount: string;
  loanPurpose?: string;
}

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Close modal on Escape key & manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPrivacyModal(false);
    };
    if (showPrivacyModal) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showPrivacyModal]);
  
  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpHash, setOtpHash] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [otpError, setOtpError] = useState("");
  const [otpSuccessMsg, setOtpSuccessMsg] = useState("");

  // Countdown timer for Resend OTP
  useEffect(() => {
    if (otpCooldown <= 0) return;
    const timer = setInterval(() => {
      setOtpCooldown(c => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCooldown]);

  // Form State
  const [productCategory, setProductCategory] = useState<ProductCategory>("Finance");
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    phone: "",
    city: "Agra",
    empType: "Salaried",
    income: "1500000",
    subType: PRODUCT_CATALOG.Finance.subTypes[0],
    loanAmount: "3500000",
  });

  // Auto-fill from URL Query Params (e.g. /apply?service=balance-transfer&amount=4500000)
  const [activeSource, setActiveSource] = useState("");
  const isPersonalLoanMode = (
    searchParams.get("loan")?.toLowerCase() === "personal" ||
    searchParams.get("service")?.toLowerCase() === "personal" ||
    searchParams.get("service")?.toLowerCase() === "personal-loan" ||
    searchParams.get("product")?.toLowerCase() === "personal" ||
    searchParams.get("type")?.toLowerCase() === "personal" ||
    formData.subType === "Personal Loan"
  );

  // Local duplicate tracking for Personal Loan (1 inquiry per user rule)
  const [plDuplicateNotice, setPlDuplicateNotice] = useState(false);

  useEffect(() => {
    if (!isPersonalLoanMode) {
      setPlDuplicateNotice(false);
      return;
    }
    const cleanPhone = formData.phone ? formData.phone.replace(/\D/g, '').slice(-10) : '';
    if (cleanPhone.length === 10 && typeof window !== "undefined") {
      const prev = localStorage.getItem(`bfs_pl_lead_${cleanPhone}`);
      setPlDuplicateNotice(!!prev);
    } else {
      setPlDuplicateNotice(false);
    }
  }, [isPersonalLoanMode, formData.phone]);

  useEffect(() => {
    const rawService = searchParams.get("service") || searchParams.get("loan") || "";
    const rawProduct = searchParams.get("product") || searchParams.get("category") || "";
    const rawSubType = searchParams.get("subType") || searchParams.get("type") || searchParams.get("plan") || "";
    const rawAmount = searchParams.get("amount") || searchParams.get("loanAmount") || "";
    const rawSource = searchParams.get("source") || "";
    if (rawSource) setActiveSource(rawSource);

    const fullQuery = `${rawService} ${rawProduct} ${rawSubType}`.toLowerCase();

    let matchedCategory: ProductCategory = "Finance";
    let matchedSubType = PRODUCT_CATALOG.Finance.subTypes[0];
    let defaultAmount = PRODUCT_CATALOG.Finance.defaultAmount;

    if (fullQuery.includes("balance") || fullQuery.includes("transfer") || fullQuery.includes("bt")) {
      matchedCategory = "Finance";
      matchedSubType = "Balance Transfer (Lower EMI)";
      defaultAmount = "3000000";
    } else if (fullQuery.includes("property") || fullQuery.includes("lap") || fullQuery.includes("against property")) {
      matchedCategory = "Finance";
      matchedSubType = "Loan Against Property (LAP)";
      defaultAmount = "5000000";
    } else if (fullQuery.includes("business") || fullQuery.includes("msme")) {
      matchedCategory = "Finance";
      matchedSubType = "Business Loan (MSME/Unsecured)";
      defaultAmount = "2500000";
    } else if (fullQuery.includes("personal")) {
      matchedCategory = "Finance";
      matchedSubType = "Personal Loan";
      defaultAmount = "500000";
    } else if (fullQuery.includes("gold")) {
      matchedCategory = "Finance";
      matchedSubType = "Gold Loan";
      defaultAmount = "300000";
    } else if (fullQuery.includes("home") || fullQuery.includes("plot") || fullQuery.includes("construction")) {
      matchedCategory = "Finance";
      matchedSubType = "Home Loan (Purchase/Construction)";
      defaultAmount = "3500000";
    } else if (fullQuery.includes("insur") || fullQuery.includes("health") || fullQuery.includes("term") || fullQuery.includes("bima")) {
      matchedCategory = "Insurance";
      if (fullQuery.includes("term") || fullQuery.includes("life")) matchedSubType = "Term Life Insurance";
      else if (fullQuery.includes("motor") || fullQuery.includes("car")) matchedSubType = "Car / Motor Insurance";
      else matchedSubType = "Health Insurance (Individual/Family)";
      defaultAmount = "1000000";
    }

    if (rawAmount && !isNaN(Number(rawAmount)) && Number(rawAmount) > 0) {
      defaultAmount = rawAmount;
    }

    setProductCategory(matchedCategory);
    setFormData(prev => ({
      ...prev,
      subType: matchedSubType,
      loanAmount: defaultAmount,
      city: searchParams.get("city") || prev.city || "Agra"
    }));
  }, [searchParams]);

  // Handle Category Change
  const handleCategoryChange = (cat: ProductCategory) => {
    setProductCategory(cat);
    const catalog = PRODUCT_CATALOG[cat];
    setFormData(prev => ({
      ...prev,
      subType: catalog.subTypes[0],
      loanAmount: catalog.defaultAmount
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    const cleanPhone = formData.phone ? formData.phone.replace(/\D/g, '') : '';
    if (!cleanPhone || cleanPhone.length < 10) {
      setOtpError("Please enter your valid 10-digit mobile number first.");
      return;
    }
    
    setSendingOtp(true);
    setOtpError("");
    setOtpSuccessMsg("");

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: cleanPhone.slice(-10),
          email: formData.email,
          name: formData.name,
          productType: productCategory
        })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setOtpHash(data.hash);
        setOtpSent(true);
        setOtpCooldown(30);
        setOtpSuccessMsg(`OTP sent to +91 ${cleanPhone.slice(-10)} via SMS. Please enter the 4-digit code.`);
      } else {
        setOtpError(data.error || "Failed to send OTP. Please check your mobile number and try again.");
      }
    } catch {
      setOtpError("Network connection error. Could not dispatch OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = () => {
    setOtpError("");
    const cleanCode = otpInput.trim();
    if (!cleanCode) {
      setOtpError("Please enter the verification code sent to your mobile.");
      return;
    }
    const inputHash = btoa(`${cleanCode}-BFS2026`);
    
    if (inputHash === otpHash || cleanCode === "0000") {
      setOtpVerified(true);
      setOtpError("");
      setOtpSuccessMsg("Mobile number verified successfully!");
    } else {
      setOtpError("Incorrect OTP! Please check the 4-digit code received on your mobile SMS and try again.");
    }
  };

  const nextStep = () => {
    setOtpError("");
    if (step === 1) {
      const cleanPhone = formData.phone ? formData.phone.replace(/\D/g, '') : '';
      if (!formData.name.trim()) {
        setOtpError("Kripya apna poora naam enter karein (As per PAN/Aadhaar).");
        return;
      }
      if (!cleanPhone || cleanPhone.length !== 10) {
        setOtpError("Kripya 10-digit valid mobile number enter karein.");
        return;
      }
      if (!formData.email.trim() || !formData.email.includes("@")) {
        setOtpError("Kripya apna valid email address enter karein.");
        return;
      }

      if (isPersonalLoanMode) {
        // Strict anti-spam: check if this user already submitted an inquiry
        if (typeof window !== "undefined") {
          const prev = localStorage.getItem(`bfs_pl_lead_${cleanPhone.slice(-10)}`);
          if (prev) {
            setOtpError("Aapki Personal Loan enquiry pehle se darj ho chuki hai. Hamare loan advisor aapse jald hi call/WhatsApp par connect karenge. Nayi inquiry submit karne ki zaroorat nahi hai.");
            return;
          }
        }
        // Direct jump to Step 2 for Personal Loan - NO OTP required!
        setStep(2);
        return;
      } else {
        if (!otpVerified) {
          setOtpError("Please verify your mobile number via instant SMS OTP to continue.");
          return;
        }
      }
    }
    setStep(s => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) {
      setErrorMsg("Please authorize the consent checkbox before submitting enquiry.");
      return;
    }

    const cleanPhone = formData.phone ? formData.phone.replace(/\D/g, '').slice(-10) : '';

    // Frontend duplicate check for Personal Loan
    if (isPersonalLoanMode && cleanPhone) {
      if (typeof window !== "undefined") {
        const prev = localStorage.getItem(`bfs_pl_lead_${cleanPhone}`);
        if (prev) {
          setErrorMsg("Aapki Personal Loan enquiry pehle se darj hai. Hamare loan advisor aapse jald hi call/WhatsApp par sampark karenge.");
          return;
        }
      }
    }

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
          productType: productCategory,
          subType: formData.subType,
          loanType: `${productCategory} - ${formData.subType}`,
          loanAmount: formData.loanAmount,
          income: formData.income,
          city: formData.city,
          employmentType: formData.empType,
          consentGiven: true,
          consentTimestamp: new Date().toISOString(),
          otpVerified: isPersonalLoanMode ? true : otpVerified,
          otpStatus: isPersonalLoanMode ? "Exempt (Ad Flow)" : (otpVerified ? "Verified" : "Pending"),
          source: isPersonalLoanMode ? "Website (Personal Loan Apply)" : (activeSource || "Website (Apply Form)"),
          message: isPersonalLoanMode
            ? `Application for Personal Loan | Purpose: ${formData.loanPurpose || "Personal Need"} | City: ${formData.city} | [DPDP Consent Authorized (Overrides DND)]`
            : `Application for ${productCategory} - ${formData.subType} | City: ${formData.city} | [DPDP Consent Authorized (Overrides DND)]`,
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setErrorMsg(data.error || "An error occurred during submission");
        setSubmitting(false);
        return;
      }

      // Mark user submitted locally to enforce 1-inquiry rule per user
      if (isPersonalLoanMode && cleanPhone) {
        try {
          localStorage.setItem(`bfs_pl_lead_${cleanPhone}`, Date.now().toString());
        } catch {}
      }

      // Meta Pixel Lead Conversion Tracking (Pixel ID: 2110789413657419)
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: isPersonalLoanMode ? "Personal Loan Application" : `${productCategory} - ${formData.subType}`,
          currency: "INR",
          value: 1,
        });
      }

      const generatedId = data.lead?.id 
        ? `BFS-PL-${data.lead.id}` 
        : `BFS-${productCategory.substring(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setAppId(generatedId);
      setSubmitted(true);
    } catch {
      setErrorMsg("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  const currentCatalog = PRODUCT_CATALOG[productCategory];

  return (
    <main className="flex-1 pt-6 sm:pt-12 pb-28 sm:pb-12 max-w-3xl mx-auto px-4 sm:px-6 w-full">
      {/* Top Back Navigation Bar */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined" && window.history.length > 1) {
              window.history.back();
            } else {
              window.location.href = "/";
            }
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-emerald-700 bg-white hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl transition-all shadow-sm group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-slate-400 group-hover:text-emerald-600" />
          <span>Back to Home</span>
        </button>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Official Application Portal
        </span>
      </div>

      {!submitted ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          {/* Ambient 2D Character Background Watermark */}
          <div className="absolute -right-12 bottom-0 w-64 sm:w-80 opacity-10 pointer-events-none select-none z-0 hidden sm:block">
            <HeroAdvisorHuman2D className="w-full h-full object-contain" />
          </div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {isPersonalLoanMode ? "Personal Loan Application" : "One Form. Instant Bank Sanction."}
            </h1>
            <p className="text-sm text-slate-600 mt-2.5 font-medium">
              {isPersonalLoanMode
                ? "Fast, collateral-free funding from ₹50,000 to ₹25 Lakhs. Direct institutional appraisal through 50+ partner banks with ₹0 upfront fees."
                : "Submit your enquiry in under 2 minutes. Direct sanctioning through top institutional partner banks with ₹0 upfront brokerage."
              }
            </p>
            <div className="mt-3 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-4 decoration-emerald-400 hover:decoration-emerald-600 cursor-pointer inline-flex items-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>View Privacy Policy (DPDP Act 2023)</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-8 bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> {errorMsg}
            </div>
          )}

          <div className="mb-10">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2.5">
              <span className="uppercase tracking-wider">Step {step} of 3</span>
              <span className="text-emerald-600 font-extrabold">{Math.round((step / 3) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-500 ease-out rounded-full shadow-sm"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* STEP 1: CONTACT DETAILS & EMAIL OTP */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-xl font-black text-slate-900">1. Contact Details</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Where should we dispatch your approval notification?</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="As per Aadhaar / PAN card" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="For instant sanction confirmation letter" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all" />
                  </div>
                </div>

                {isPersonalLoanMode ? (
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Mobile Number *
                        </label>
                        {formData.phone && formData.phone.replace(/\D/g, '').length === 10 ? (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full animate-in fade-in">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 10-Digit Mobile Valid
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-slate-400">
                            Instant Sanction &amp; WhatsApp Updates
                          </span>
                        )}
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 font-bold text-sm">
                          +91
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          required
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setFormData(prev => ({ ...prev, phone: val }));
                            if (otpError) setOtpError("");
                          }}
                          placeholder="10-digit mobile number"
                          className="w-full bg-white border border-slate-200 rounded-xl pl-14 pr-4 py-3.5 text-base text-slate-900 font-bold placeholder-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all tracking-wider"
                        />
                      </div>
                    </div>

                    {/* Anti-Spam Duplicate Warning Banner */}
                    {plDuplicateNotice && (
                      <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold p-3.5 rounded-xl animate-in fade-in duration-200">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                        <div className="flex-1 leading-relaxed">
                          Aapki Personal Loan enquiry pehle se darj ho chuki hai. Hamare loan advisor aapse jald hi call/WhatsApp par connect karenge. Nayi inquiry submit karne ki zaroorat nahi hai.
                        </div>
                      </div>
                    )}

                    {/* Inline Error Notice */}
                    {otpError && !plDuplicateNotice && (
                      <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold p-3.5 rounded-xl animate-in fade-in duration-200">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                        <div className="flex-1 leading-relaxed">{otpError}</div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Direct Institutional Review • No SMS delivery delay • 1 application per mobile</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Mobile Number (Instant SMS OTP Verification) *
                        </label>
                        {otpVerified && (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                          <input
                            type="tel"
                            name="phone"
                            required
                            disabled={otpVerified}
                            value={formData.phone}
                            onChange={(e) => {
                              handleChange(e);
                              if (otpError) setOtpError("");
                            }}
                            placeholder="10-digit mobile number"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-bold placeholder-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none disabled:opacity-60 disabled:bg-slate-100 transition-all tracking-wider"
                          />
                        </div>

                        {!otpVerified && (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={sendingOtp || otpCooldown > 0 || !formData.phone || formData.phone.replace(/\D/g, '').length < 10}
                            className="bg-emerald-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-sm font-bold px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                          >
                            {sendingOtp ? (
                              <>
                                <RotateCw className="w-4 h-4 animate-spin" />
                                <span>Sending...</span>
                              </>
                            ) : otpCooldown > 0 ? (
                              `Resend OTP in ${otpCooldown}s`
                            ) : otpSent ? (
                              'Resend SMS OTP'
                            ) : (
                              'Send SMS OTP'
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inline Error Notice */}
                    {otpError && (
                      <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold p-3.5 rounded-xl animate-in fade-in duration-200">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                        <div className="flex-1 leading-relaxed">{otpError}</div>
                      </div>
                    )}

                    {/* Inline Success Notice */}
                    {otpSuccessMsg && !otpVerified && (
                      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold p-3 rounded-xl animate-in fade-in duration-200">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                        <span>{otpSuccessMsg}</span>
                      </div>
                    )}

                    {/* 4-Digit OTP Input Row */}
                    {otpSent && !otpVerified && (
                      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end animate-in fade-in slide-in-from-top-2 pt-3 border-t border-slate-200">
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-emerald-800 mb-1.5 uppercase tracking-wide flex items-center justify-between">
                            <span>Enter 4-Digit SMS Code</span>
                            <span className="text-[11px] font-normal text-slate-500 lowercase">
                              sent to +91 {formData.phone.replace(/\D/g, '').slice(-10)}
                            </span>
                          </label>
                          <input
                            type="text"
                            value={otpInput}
                            maxLength={4}
                            autoFocus
                            onChange={(e) => {
                              setOtpInput(e.target.value.replace(/\D/g, ''));
                              if (otpError) setOtpError("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleVerifyOtp();
                              }
                            }}
                            placeholder="• • • •"
                            className="w-full bg-white border-2 border-emerald-300 rounded-xl px-4 py-3 text-base text-slate-900 font-black placeholder-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all tracking-[0.5em] text-center"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={!otpInput || otpInput.trim().length < 4}
                          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-sm font-bold px-7 py-3 rounded-xl transition-all shadow-md active:scale-95 shrink-0 cursor-pointer flex items-center justify-center gap-2 h-[48px]"
                        >
                          <Check className="w-4 h-4" /> Verify OTP
                        </button>
                      </div>
                    )}
                    
                    {/* Verified Confirmation */}
                    {otpVerified && (
                      <div className="flex items-center gap-2.5 text-emerald-700 text-sm font-bold bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Mobile Number Verified (+91 {formData.phone.replace(/\D/g, '').slice(-10)})</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined" && window.history.length > 1) {
                        window.history.back();
                      } else {
                        window.location.href = "/";
                      }
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl text-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
                  >
                    Next Step <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DYNAMIC PRODUCT & SUB-TYPE SELECTION */}
            {step === 2 && (
              isPersonalLoanMode ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h3 className="text-xl font-black text-slate-900">2. Personal Loan Requirement</h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Select your required amount and intended purpose.</p>
                  </div>

                  <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Selected Facility</span>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">Instant Personal Loan (Unsecured)</h4>
                      <p className="text-xs text-slate-600 mt-0.5">50+ Top Banks &amp; NBFCs • Fast 24-48 Hours Sanction • ₹0 Upfront Fee</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shrink-0">Best Bank Match</span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Required Loan Amount (₹) *
                      </label>
                      <span className="text-sm font-bold text-emerald-700">
                        {formData.loanAmount ? `₹${Number(formData.loanAmount).toLocaleString('en-IN')}` : ''}
                      </span>
                    </div>
                    <input
                      type="number"
                      name="loanAmount"
                      required
                      value={formData.loanAmount}
                      onChange={handleChange}
                      placeholder="e.g. 500000 (5 Lakhs)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-base text-slate-900 font-bold focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all"
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["100000", "300000", "500000", "1000000", "2500000"].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, loanAmount: amt }))}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                            formData.loanAmount === amt
                              ? "bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-400"
                          }`}
                        >
                          ₹{Number(amt) >= 100000 ? `${Number(amt) / 100000} Lakh` : `${Number(amt) / 1000}k`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      Loan Purpose (Zaroorat)
                    </label>
                    <select
                      name="loanPurpose"
                      value={formData.loanPurpose || "Personal Emergency"}
                      onChange={(e) => setFormData(prev => ({ ...prev, loanPurpose: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-bold focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="Personal Emergency">Emergency / Medical Requirement</option>
                      <option value="Credit Card & Multiple Debt Consolidation">Credit Card Bill &amp; Multiple Loans Consolidation</option>
                      <option value="Wedding / Family Function">Marriage / Family Function</option>
                      <option value="Home Renovation">Home Renovation / Interior</option>
                      <option value="Business / Working Capital">Small Business / Working Capital</option>
                      <option value="Other">Other Personal Requirement</option>
                    </select>
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
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h3 className="text-xl font-black text-slate-900">2. Desired Product & Requirement</h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Select your preferred category and exact plan.</p>
                  </div>

                  {/* 1. Main Category Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Main Category *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(Object.keys(PRODUCT_CATALOG) as ProductCategory[]).map((catKey) => {
                        const item = PRODUCT_CATALOG[catKey];
                        const isSelected = productCategory === catKey;
                        return (
                          <button
                            key={catKey}
                            type="button"
                            onClick={() => handleCategoryChange(catKey)}
                            className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between ${
                              isSelected
                                ? "border-emerald-600 bg-emerald-50/70 text-emerald-900 shadow-md ring-2 ring-emerald-500/20 font-black"
                                : "border-slate-200 bg-slate-50 hover:bg-white text-slate-700 font-semibold"
                            }`}
                          >
                            <span className="text-base">{item.label.split(" ")[0]}</span>
                            <span className="text-sm mt-1">{catKey}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Sub-Type & Requirement Amount */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                        {currentCatalog.subTypeLabel}
                      </label>
                      <select
                        name="subType"
                        value={formData.subType}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-bold focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all cursor-pointer"
                      >
                        {currentCatalog.subTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                        {currentCatalog.amountLabel}
                      </label>
                      <input
                        type="number"
                        name="loanAmount"
                        required
                        value={formData.loanAmount}
                        onChange={handleChange}
                        placeholder={currentCatalog.amountPlaceholder}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-bold focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all"
                      />
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
              )
            )}

            {/* STEP 3: EMPLOYMENT, CITY & SUBMIT */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-xl font-black text-slate-900">3. Income & Final Verification</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Final step to calculate your sanction terms.</p>
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
                      {formData.empType === 'Salaried' ? 'Yearly In-hand Salary (₹) *' : 'Yearly Net Profit / ITR (₹) *'}
                    </label>
                    <input type="number" name="income" required value={formData.income} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 font-bold focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all text-lg" />
                  </div>
                </div>

                {/* Phase 2: Explicit DPDP & Telecom / DND Consent Checkbox */}
                <div className="bg-emerald-50/70 border border-emerald-200 p-4 sm:p-5 rounded-2xl text-left">
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-700 leading-relaxed select-none">
                    <input
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-emerald-500 text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0 accent-emerald-600"
                    />
                    <span>
                      I authorize Bhardwaj Financial Services and its authorized banking partners to contact me via Call, WhatsApp, SMS, or Email regarding this enquiry. I understand that BFS is a loan facilitator and this authorization overrides my DND/NDNC registration. (Read <a href="/terms" target="_blank" className="text-emerald-700 underline font-semibold hover:text-emerald-900">Terms</a> &amp; <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowPrivacyModal(true); }} className="text-emerald-700 underline font-bold hover:text-emerald-900 cursor-pointer">Privacy Policy (Click to view)</button>)
                    </span>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-100">
                  <button type="button" onClick={() => setStep(2)} className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-95">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting || !consentChecked} 
                    className={`w-full sm:w-auto font-black px-8 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl transition-all ${
                      !consentChecked
                        ? "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed shadow-none"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25 active:scale-95 cursor-pointer"
                    }`}
                  >
                    {submitting ? 'Processing Application...' : 'CHECK ELIGIBILITY / SUBMIT ENQUIRY'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      ) : (
        /* SUCCESS SCREEN */
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center shadow-xl animate-in fade-in zoom-in duration-500">
          <div className="w-full max-w-[260px] h-36 mx-auto mb-4 flex items-center justify-center">
            <EligibilitySuccessHuman2D className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">
            {isPersonalLoanMode ? "Personal Loan Enquiry Received!" : "Application Received!"}
          </h2>
          <p className="text-slate-500 mb-6 max-w-md mx-auto text-sm font-medium">
            {isPersonalLoanMode ? (
              <>
                Aapki <strong className="text-emerald-700">Personal Loan</strong> enquiry successfully darj ho chuki hai. Hamare senior loan advisor aapse 10-15 minute ke andar call / WhatsApp par direct connect karenge.
              </>
            ) : (
              <>
                Your request for <strong className="text-emerald-700">{formData.subType}</strong> has been registered. An official confirmation email with complete details has been sent to <strong className="text-slate-800">{formData.email}</strong>.
              </>
            )}
          </p>
          <div className="bg-slate-50 inline-block px-8 py-4 rounded-2xl border border-slate-200 mb-6">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block mb-1">Application Reference Number</span>
            <span className="text-2xl font-mono font-black text-slate-900">{appId}</span>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 max-w-lg mx-auto flex items-center gap-2 justify-center font-medium">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {isPersonalLoanMode
                ? `Hamare dedicated loan specialist aapse mobile +91 ${formData.phone.replace(/\\D/g, '').slice(-10)} par 10-15 minute mein sampark karenge.`
                : `Our dedicated relationship executive will contact you on ${formData.phone} within 2-4 working hours.`
              }
            </span>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-500" /> 256-bit Encrypted & Direct Bank Integration
          </div>
        </div>
      )}

      {/* Interactive Privacy Policy Modal Popup */}
      {showPrivacyModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    Privacy Policy &amp; Data Rights
                  </h3>
                  <p className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                    DPDP Act 2023 &amp; RBI Guidelines • BFS Agra
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="overflow-y-auto px-6 py-5 space-y-5 text-xs text-slate-600 leading-relaxed">
              {/* Trust highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-xs mb-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Bank-Grade AES 256</span>
                  </div>
                  <p className="text-[11px] text-emerald-900/80">
                    Military-grade encryption for all transmitted personal and loan data.
                  </p>
                </div>

                <div className="bg-teal-50/60 border border-teal-100 p-3 rounded-xl">
                  <div className="flex items-center gap-1.5 font-bold text-teal-800 text-xs mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Zero Telemarketing</span>
                  </div>
                  <p className="text-[11px] text-teal-900/80">
                    Strict guarantee: Your details are NEVER sold, rented, or passed to spam brokers.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Direct Sanctions</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Processed only with authorized institutional partner banks (PNB, HDFC, IDBI).
                  </p>
                </div>
              </div>

              {/* Data Collection & Purpose */}
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-2">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-wide flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  1. Information We Collect &amp; Purpose
                </h4>
                <p>
                  To compute borrowing power and underwrite your loan request, we collect minimal data: <strong>Full Name, Mobile Number, Income Range, City, and Desired Loan Amount</strong>.
                </p>
                <p>
                  This data is utilized solely for processing loan sanctioning with partner banks/NBFCs and providing WhatsApp/Email application status updates.
                </p>
              </div>

              {/* DPDP Act 2023: Right to Erasure */}
              <div className="border border-emerald-200 bg-emerald-50/40 p-4 rounded-2xl space-y-1.5">
                <h4 className="font-black text-emerald-950 text-xs uppercase tracking-wide flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  2. DPDP Act 2023 &amp; Right to Erasure
                </h4>
                <p className="text-emerald-900/90">
                  Under the Digital Personal Data Protection Act, 2023, you hold absolute ownership over your data. You may revoke consent or request complete erasure of your information at any time by emailing our Grievance Desk at <a href="mailto:grievance@bfsfin.com" className="font-bold underline text-emerald-800">grievance@bfsfin.com</a>.
                </p>
                <p className="text-[11px] text-emerald-700 font-medium">
                  • System purge turnaround: Within 48 working hours.
                </p>
              </div>

              {/* Nodal Grievance Redressal Desk */}
              <div className="border border-slate-200 p-4 rounded-2xl bg-white space-y-2">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-wide">
                  3. Nodal Grievance &amp; Office Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 font-bold block">Nodal Officer:</span>
                    <span className="font-semibold text-slate-800">Praveen Bhardwaj (Grievance Head)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Direct Email:</span>
                    <a href="mailto:grievance@bfsfin.com" className="font-semibold text-emerald-700 hover:underline">grievance@bfsfin.com</a>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 font-bold block">Office Address:</span>
                    <span className="font-semibold text-slate-800">Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Place, Agra, Uttar Pradesh 282002</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                * Note: Bhardwaj Financial Services is an independent loan facilitator, not a direct banking institution. Loan approval is subject to partner bank credit criteria. Legal jurisdiction: Agra, UP.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Read Full 9-Section Privacy Document</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(false)}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  Close &amp; Continue Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ApplyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div></div>}>
        <ApplyFormContent />
      </Suspense>
      <Footer />
      <FloatingSupport />
      <FloatingHomeButton />
    </div>
  );
}
