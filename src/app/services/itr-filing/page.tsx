"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import SmartTaxpayerReviewMarquee from "@/components/SmartTaxpayerReviewMarquee";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  FileText, ShieldCheck, CheckCircle2, Clock, Award, ArrowRight,
  TrendingUp, Building2, HelpCircle, PhoneCall, MessageCircle, 
  Send, RefreshCw, AlertCircle, Sparkles, Check, Calculator,
  MapPin, Star, Users, ChevronDown, ChevronUp, ChevronRight, Scale, Landmark, Briefcase,
  ExternalLink, FileCheck, Layers, Navigation, BadgeCheck, Calendar, CheckCircle
} from "lucide-react";

const ITR_PROFILES = [
  { id: "salaried", label: "Salaried", sub: "Form 16 / Job", form: "ITR-1 (Sahaj) — Salaried Employees (Form 16)", icon: Briefcase },
  { id: "business", label: "Business / Shop", sub: "Traders / 44AD", form: "ITR-4 (Sugam) — Small Business & Traders (Presumptive 44AD/44ADA)", icon: Building2 },
  { id: "professional", label: "Professional", sub: "Doctor / CA / Freelance", form: "ITR-3 — Business, Proprietary Firm & Professionals (Balance Sheet)", icon: Users },
  { id: "capital_gains", label: "Capital Gains", sub: "Shares / Property", form: "ITR-2 — Capital Gains, Shares & Multiple Properties", icon: TrendingUp },
  { id: "loan", label: "Bank Loan ITR", sub: "Home / Business Loan", form: "Loan-Purpose ITR (Specially structured for Bank Loan Sanctions)", icon: Landmark }
];

const ITR_CATEGORIES = [
  "ITR-1 (Sahaj) — Salaried Employees (Form 16)",
  "ITR-4 (Sugam) — Small Business & Traders (Presumptive 44AD/44ADA)",
  "ITR-3 — Business, Proprietary Firm & Professionals (Balance Sheet)",
  "ITR-2 — Capital Gains, Shares & Multiple Properties",
  "Loan-Purpose ITR (Specially structured for Bank Loan Sanctions)",
  "Past 2–3 Years Backlog ITR Filing (Late Filing Assistance)"
];

const INCOME_SLABS = [
  "Below ₹2.5 Lakhs (Nil Return / Visa Purpose)",
  "₹2.5 Lakhs – ₹5.0 Lakhs (Zero Tax with Rebate)",
  "₹5.0 Lakhs – ₹10.0 Lakhs",
  "₹10.0 Lakhs – ₹20.0 Lakhs",
  "₹20.0 Lakhs – ₹50.0 Lakhs",
  "Above ₹50.0 Lakhs (High Net Worth)"
];

const TOP_CITIES = [
  "Agra", "Mathura", "Firozabad", "Aligarh", "Hathras", "Delhi NCR", "Noida", 
  "Lucknow", "Jaipur", "Kanpur", "Mumbai", "Pune", "Bengaluru", "Hyderabad", "Kolkata", "Pan-India"
];

const FAQS = [
  {
    q: "Why is filing ITR important if my income is below the taxable limit?",
    a: "Filing a Nil or basic ITR creates an authentic financial track record with the Government of India. It is mandatory for applying for Home Loans, Business Loans, Credit Cards, Visa approvals, and claiming TDS refunds."
  },
  {
    q: "How does BFS help in preparing Loan-Ready ITR?",
    a: "Banks reject loans when declared ITR income does not match banking cash-flows. BFS's financial consultants analyze your bank statements first and file your ITR in full compliance with banking credit underwriting norms so your loan gets approved in 5 days."
  },
  {
    q: "Can I file my ITR for previous 2-3 years if I missed the deadline?",
    a: "Yes. Under Section 139(8A) (Updated Return / ITR-U), you can file returns for past 2 financial years with nominal late fees. Our CAs will compute the exact taxes and file your backlog returns smoothly."
  },
  {
    q: "Where is BFS located in Agra for offline CA consultation?",
    a: "BFS's central office is located at Sanjay Place, Commercial Hub, Agra, UP - 282002. Clients across Agra, Mathura, Firozabad, and Aligarh can either visit our office or use our 100% paperless digital desk via WhatsApp (+91-7900979001)."
  },
  {
    q: "What documents are required to file ITR online with BFS?",
    a: "For Salaried individuals: PAN Card, Aadhaar Card, Form 16, and bank account statement. For Traders/Proprietors: Bank statements (12 months), estimated turnover, and GST details (if registered). Our CAs also pull AIS/TIS and Form 26AS directly from the IT portal so you don't have to gather manual paperwork."
  },
  {
    q: "How fast do I get the official Income Tax Acknowledgement (ITR-V)?",
    a: "Once you verify the Aadhaar OTP, your return is e-filed and you receive the official Government of India ITR Acknowledgement (ITR-V) receipt instantly on your WhatsApp and email within 24 to 48 hours."
  },
  {
    q: "What is the difference between New Tax Regime and Old Tax Regime?",
    a: "Under the New Tax Regime (default for AY 2025-26), income up to ₹7.75 Lakhs is completely tax-free (standard deduction ₹75,000 + Section 87A rebate). Under the Old Regime, you can claim 80C (₹1.5L), 80D Mediclaim, and Home Loan interest (₹2L). BFS calculates both and files whichever saves you the maximum tax."
  },
  {
    q: "What if I receive a tax notice or defect query under Section 139(9) / 143(1)?",
    a: "BFS provides complete 100% Notice Protection Guarantee. Any query or intimation received from the CPC Income Tax department is reviewed, drafted, and resolved by our senior CA team at ₹0 additional fee."
  }
];

export default function ItrFilingPage() {
  // Dynamic Hero Banner Image & Owner Authority from Admin CMS
  const [heroBannerUrl, setHeroBannerUrl] = useState<string>("");
  const [ownerPhoto, setOwnerPhoto] = useState<string>("/uploads/1787661063143-20211226_163523.jpg");
  const [ownerName, setOwnerName] = useState("Vineeta Sharma");
  const [ownerRole, setOwnerRole] = useState("Founder & Managing Director, BFS");

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Agra");
  const [category, setCategory] = useState(ITR_CATEGORIES[0]);
  const [income, setIncome] = useState(INCOME_SLABS[1]);
  const [panNumber, setPanNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isFormFocused, setIsFormFocused] = useState(false);

  // Interactive Document Checklist State
  const [docTab, setDocTab] = useState<"salaried" | "business" | "loan">("salaried");
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    "salaried_pan": true,
    "salaried_f16": true,
    "salaried_bank": true,
    "salaried_ded": false,
    "business_pan": true,
    "business_bank": true,
    "business_turnover": false,
    "business_gst": false,
    "loan_itr": true,
    "loan_bs": true,
    "loan_cap": false,
    "loan_sanction": false
  });

  // Interactive Deductions for Old Regime in Tax Calculator
  const [has80C, setHas80C] = useState(true);
  const [has80D, setHas80D] = useState(true);
  const [hasHomeLoan, setHasHomeLoan] = useState(false);
  const [hasHra, setHasHra] = useState(false);

  // Interactive 4-Step Process Active Step
  const [activeStep, setActiveStep] = useState<number>(1);

  // OTP State
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [otpInput, setOtpInput] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);
  const [mockOtpHint, setMockOtpHint] = useState("");
  const [refId, setRefId] = useState("");

  // Interactive Tax Calculator State
  const [calcIncome, setCalcIncome] = useState<number>(750000);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic FAQs from Admin CMS
  const [faqsList, setFaqsList] = useState(FAQS);

  // Live Reviews fetched from Database with Category Filters
  const [liveReviews, setLiveReviews] = useState<any[]>([]);
  const [totalReviewsCount, setTotalReviewsCount] = useState<number>(860);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [activeReviewTab, setActiveReviewTab] = useState<"itr" | "msme" | "loan" | "credit" | "insurance">("itr");

  // Load Hero Image, Settings & Dynamic FAQs from Admin
  useEffect(() => {
    // 1. Fetch Owner Profile & Photo from Admin Settings
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          if (data.settings.ownerName) setOwnerName(data.settings.ownerName);
          if (data.settings.ownerRole) setOwnerRole(data.settings.ownerRole);
          if (data.settings.ownerImage) setOwnerPhoto(data.settings.ownerImage);
        }
      })
      .catch(() => {});

    // 2. Fetch specific page hero banner override if set by admin
    fetch("/api/hero-images")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const match = data.find((item: any) => item.pageId === "services/itr-filing" || item.pageId === "itr-filing");
          if (match?.imageUrl) setHeroBannerUrl(match.imageUrl);
        }
      })
      .catch(() => {});

    fetch("/api/calculator-faqs?id=itr-filing")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqsList(data.map((f: any) => ({ q: f.question, a: f.answer })));
        }
      })
      .catch(() => {});
  }, []);

  // Fetch strictly ITR & Tax Reviews for this page
  useEffect(() => {
    setReviewsLoading(true);
    fetch(`/api/reviews?category=itr&limit=20&t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.reviews)) {
          setLiveReviews(data.reviews);
          if (data.totalCount) setTotalReviewsCount(data.totalCount);
        }
      })
      .catch((err) => console.error("Reviews fetch error:", err))
      .finally(() => setReviewsLoading(false));
  }, []);

  useEffect(() => {
    let interval: any;
    if (step === "otp" && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  // Tax Calculator Logic with User-Selected Deductions
  const calculateEstimatedTax = (amt: number) => {
    // New Regime 115BAC (FY 2024-25 / 2025-26) with standard deduction 75,000
    const taxableNew = Math.max(0, amt - 75000);
    let taxNew = 0;
    if (taxableNew <= 700000) {
      taxNew = 0; // 87A rebate makes tax zero up to 7L
    } else {
      if (taxableNew > 300000) taxNew += Math.min(300000, taxableNew - 300000) * 0.05;
      if (taxableNew > 600000) taxNew += Math.min(300000, taxableNew - 600000) * 0.10;
      if (taxableNew > 900000) taxNew += Math.min(300000, taxableNew - 900000) * 0.15;
      if (taxableNew > 1200000) taxNew += Math.min(300000, taxableNew - 1200000) * 0.20;
      if (taxableNew > 1500000) taxNew += (taxableNew - 1500000) * 0.30;
      taxNew = Math.round(taxNew * 1.04); // Cess 4%
    }

    // Old Regime with Dynamic Deductions
    let totalDeductions = 50000; // Standard deduction for salaried
    if (has80C) totalDeductions += 150000;
    if (has80D) totalDeductions += 25000;
    if (hasHomeLoan) totalDeductions += 200000;
    if (hasHra) totalDeductions += 100000;

    const taxableOld = Math.max(0, amt - totalDeductions);
    let taxOld = 0;
    if (taxableOld <= 250000) {
      taxOld = 0;
    } else if (taxableOld <= 500000) {
      taxOld = 0; // Rebate under 87A (up to 5L)
    } else if (taxableOld <= 1000000) {
      taxOld = 12500 + (taxableOld - 500000) * 0.20;
      taxOld = Math.round(taxOld * 1.04);
    } else {
      taxOld = 112500 + (taxableOld - 1000000) * 0.30;
      taxOld = Math.round(taxOld * 1.04);
    }

    const recommended = taxNew <= taxOld ? "New Tax Regime" : "Old Tax Regime";
    const recommendedForm = amt > 5000000 ? "ITR-2 / ITR-3" : "ITR-1 (Sahaj) or ITR-4";
    const diff = Math.abs(taxOld - taxNew);

    return { taxNew, taxOld, recommended, recommendedForm, diff, totalDeductions };
  };

  const calcResult = calculateEstimatedTax(calcIncome);

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      return updated;
    });
  };

  const handleSelectProfile = (profileForm: string) => {
    setCategory(profileForm);
    setIsFormFocused(true);
    triggerGrandCelebration();
    const el = document.getElementById("itr-form-card");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const triggerGrandCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#059669', '#34d399', '#f59e0b', '#3b82f6']
      });
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#10b981', '#34d399', '#fbbf24']
        });
      }, 250);
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#10b981', '#3b82f6', '#ec4899']
        });
      }, 400);
    } catch (e) {
      console.error(e);
    }
  };

  const handleInitiateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPan = panNumber.trim().toUpperCase();
    if (!name.trim() || !phone.trim() || !email.trim() || !cleanPan) {
      alert("Please fill all required fields (Name, Mobile, Email & PAN Card Number)");
      return;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(cleanPan)) {
      setOtpError("Please enter a valid 10-digit PAN Card number (e.g. ABCDE1234F)");
      return;
    }

    if (phone.trim().length !== 10) {
      setOtpError("Please enter a valid 10-digit mobile number");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (data.mockOtp) setMockOtpHint(data.mockOtp);
        setStep("otp");
        setOtpTimer(60);
      } else {
        setOtpError(data.error || "Unable to send verification OTP. Please check email.");
      }
    } catch (err) {
      setOtpError("Network error. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtpAndSubmit = async () => {
    if (!otpInput.trim()) {
      setOtpError("Please enter the 6-digit OTP");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      const verifyRes = await fetch("/api/otp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), otp: otpInput.trim() })
      });
      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        setOtpError(verifyData.error || "Incorrect OTP code. Please try again.");
        setOtpLoading(false);
        return;
      }

      const generatedRef = "ITR-" + Math.floor(100000 + Math.random() * 900000);
      setRefId(generatedRef);
      const cleanPan = panNumber.trim().toUpperCase();

      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim().toLowerCase(),
          city: city.trim() || "Agra",
          productType: "Tax & Compliance",
          loanType: "Tax & Compliance - ITR Filing",
          subType: category,
          loanAmount: "0",
          income: income,
          employmentType: category.includes("Salaried") ? "Salaried" : "Self-Employed",
          formType: "ITR Filing",
          source: `ITR Online Filing [Ref: ${generatedRef}]`,
          panNumber: cleanPan,
          refId: generatedRef,
          message: `PAN: ${cleanPan} | Profile: ${category} | Annual Income: ${income} | City: ${city.trim() || "Agra"} | OTP: Verified`
        })
      });

      setStep("success");
      triggerGrandCelebration();

    } catch (err) {
      setOtpError("Failed to submit request. Please retry.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (otpTimer > 0) return;
    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });
      const data = await res.json();
      if (data.mockOtp) setMockOtpHint(data.mockOtp);
      setOtpTimer(60);
    } catch (e) {
      setOtpError("Failed to resend code.");
    } finally {
      setOtpLoading(false);
    }
  };

  // Structured Data (JSON-LD) for SEO / AEO / Google Rich Snippets
  // Structured Data (JSON-LD) for SEO / AEO / GEO & Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://bfsfin.com/services/itr-filing#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://bfsfin.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://bfsfin.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "ITR Filing Online",
            "item": "https://bfsfin.com/services/itr-filing"
          }
        ]
      },
      {
        "@type": "FinancialService",
        "@id": "https://bfsfin.com/services/itr-filing#organization",
        "name": "Bhardwaj Financial Services (BFS Agra)",
        "alternateName": ["BFS Fin", "BFS Tax Advisory Desk", "BFS Sanjay Place Agra"],
        "url": "https://bfsfin.com/services/itr-filing",
        "logo": "https://bfsfin.com/owner.png",
        "image": "https://bfsfin.com/owner.png",
        "telephone": "+91-7900979001",
        "priceRange": "₹499 - ₹2999",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, Credit Card, UPI, Net Banking",
        "openingHours": "Mo-Sa 10:00-19:30",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sanjay Place, Commercial Hub",
          "addressLocality": "Agra",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "282002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 27.1983,
          "longitude": 78.0069
        },
        "areaServed": [
          { "@type": "City", "name": "Agra" },
          { "@type": "City", "name": "Mathura" },
          { "@type": "City", "name": "Firozabad" },
          { "@type": "City", "name": "Aligarh" },
          { "@type": "City", "name": "Hathras" },
          { "@type": "City", "name": "Delhi NCR" },
          { "@type": "City", "name": "Noida" },
          { "@type": "City", "name": "Lucknow" },
          { "@type": "City", "name": "Jaipur" },
          { "@type": "Country", "name": "India" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1250",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "Person",
        "@id": "https://bfsfin.com/#vineeta-sharma",
        "name": ownerName || "Vineeta Sharma",
        "jobTitle": ownerRole || "Founder & Managing Director",
        "worksFor": { "@id": "https://bfsfin.com/services/itr-filing#organization" },
        "image": "https://bfsfin.com/owner.png",
        "description": "Leading Financial Consultant & Tax Advisor in Agra with over 15 years experience in banking compliance, MSME finance, and Income Tax e-filing."
      },
      {
        "@type": "HowTo",
        "@id": "https://bfsfin.com/services/itr-filing#howto",
        "name": "How to File Income Tax Return (ITR) Online with BFS in 4 Easy Steps",
        "description": "Step-by-step guide to e-file your Income Tax Return online with certified CA assistance, maximum refund calculation, and instant ITR-V acknowledgment receipt.",
        "totalTime": "PT24H",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Submit Basic Details & Select Filing Profile",
            "text": "Fill the 2-minute online form with your name, phone, PAN, and select your profile (Salaried, Business, Capital Gains, or Loan Purpose).",
            "url": "https://bfsfin.com/services/itr-filing#itr-form-card"
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "CA Review & Tax Computation",
            "text": "Our certified tax experts extract your AIS, TIS, and Form 26AS directly from the IT portal and compute your maximum tax refund under the optimal tax regime."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Aadhaar OTP E-Verification",
            "text": "Verify the prepared return securely via a 6-digit Aadhaar OTP directly linked to the Income Tax Department portal."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Download ITR-V & Bank-Ready Computation Sheet",
            "text": "Receive the official Government ITR-V acknowledgment receipt and CA-signed financial statements delivered directly on WhatsApp and email."
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://bfsfin.com/services/itr-filing#service",
        "name": "CA-Assisted Income Tax Return (ITR) Filing Online",
        "serviceType": "Income Tax Filing & Bank Loan Financial Statements",
        "description": "Government-authorized, CA-assisted online ITR filing with maximum tax refund guarantee, zero notice protection, and loan-approved computation statements for Home Loans and Business Loans.",
        "provider": { "@id": "https://bfsfin.com/services/itr-filing#organization" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "ITR Filing Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Salaried ITR-1 Filing (Form 16)" }, "price": "499", "priceCurrency": "INR" },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Small Business & Trader ITR-4 (Presumptive 44AD)" }, "price": "999", "priceCurrency": "INR" },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bank Loan-Ready ITR with Balance Sheet & Computation" }, "price": "1499", "priceCurrency": "INR" },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Capital Gains & Share Market ITR-2" }, "price": "1499", "priceCurrency": "INR" },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Past 2-3 Years Backlog Late ITR Assistance (ITR-U)" }, "price": "1999", "priceCurrency": "INR" }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://bfsfin.com/services/itr-filing#faq",
        "mainEntity": faqsList.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#061e16] text-slate-800 dark:text-slate-100 font-sans transition-colors">
      <Header />

      {/* SEO / AEO JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section - 50% Reduced Height, Ultra-Compact, Executive & High-Trust */}
      <section className="relative bg-[#021c15] text-white py-2 sm:py-3.5 overflow-hidden">
        {/* Dynamic Hero Background Image from Admin CMS */}
        {heroBannerUrl && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 pointer-events-none transition-opacity duration-700" 
              style={{ backgroundImage: `url('${heroBannerUrl}')` }} 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#021c15]/95 via-[#021c15]/80 to-[#021c15]/60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021c15] via-transparent to-[#021c15]/70 pointer-events-none" />
          </>
        )}

        {/* Soft Ambient Radial Glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-5 items-center">
          
          {/* Mobile Header */}
          <div className="lg:hidden space-y-1 text-center pb-0.5">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-semibold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </span>
              CA e-Filing Desk • AY 2025–26
            </div>

            <div className="text-lg font-black tracking-tight text-white leading-tight">
              Income Tax Return (ITR) <span className="text-emerald-400">in 24 Hours</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-300 font-medium">
              <span className="text-emerald-300 font-bold">₹0 Advance</span>
              <span>•</span>
              <span>100% Notice Safe</span>
              <span>•</span>
              <span>Bank-Approved ITR</span>
            </div>
          </div>

          {/* Desktop Left Content (Ultra-Compact, Executive Layout) */}
          <div className="hidden lg:block lg:col-span-6 space-y-2.5 pr-2">
            {/* Live Status Badges */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                </span>
                Official CA Desk • AY 2025–26
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/10 text-slate-300 text-[10px] font-medium backdrop-blur-sm">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Govt. e-Filing Compliant
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-xl xl:text-2xl font-black tracking-tight text-white leading-tight">
              File Your Income Tax Return{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
                Online in 24 Hours
              </span>
            </h1>

            <p className="text-slate-300 text-xs leading-relaxed max-w-lg">
              Agra &amp; Pan-India&apos;s trusted CA filing desk. Maximum tax refund calculation, 100% notice protection, and loan-approved computation statements.
            </p>

            {/* Unified Compact Leadership & Contact Strip */}
            <div className="p-2 rounded-xl bg-white/[0.06] border border-emerald-500/20 backdrop-blur-md flex items-center justify-between gap-2.5 max-w-lg shadow-sm">
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative shrink-0 w-8 h-8 rounded-full overflow-hidden border border-emerald-400 shadow-xs ring-1 ring-emerald-400/30">
                  <img
                    src={ownerPhoto || "/owner.png"}
                    alt={ownerName}
                    className="w-full h-full object-cover object-top"
                    style={{ width: "32px", height: "32px" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/owner.png";
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-white truncate flex items-center gap-1.5">
                    <span>{ownerName}</span>
                    <span className="text-amber-300 font-semibold text-[10px] flex items-center">
                      <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300 mr-0.5" /> 4.9
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-300/80 truncate">Verified CA Desk Head</div>
                </div>
              </div>

              {/* Consultation Quick Links */}
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href="https://wa.me/917900979001?text=Hello%20BFS%20Team%2C%20I%20want%20to%20file%20my%20ITR%20online."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:7900979001"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-[11px] border border-white/15 transition-all active:scale-95"
                >
                  <PhoneCall className="w-3 h-3 text-emerald-400" />
                  <span>Call CA</span>
                </a>
              </div>
            </div>

            {/* Clean Trust Strip in 1 Line */}
            <div className="flex items-center gap-2 max-w-lg text-[10px] text-slate-300 font-medium">
              <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-emerald-300 font-bold">₹0 Advance</span>
              <span>•</span>
              <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-emerald-300 font-bold">100% Notice Safe</span>
              <span>•</span>
              <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-emerald-300 font-bold">Bank Approved ITR</span>
            </div>
          </div>

          {/* Right Hero Form Card with Animated Glow on Hover, Focus & Active Filling */}
          <div className="lg:col-span-5 relative group/form">
            {/* Animated Halo Glow behind form: triggers on hover, on click/focus, and on typing */}
            <div 
              className={`absolute -inset-3 sm:-inset-4 rounded-[2.5rem] transition-all duration-500 pointer-events-none ${
                (isFormFocused || name.trim() || phone.trim() || email.trim() || step === "otp")
                  ? "bg-gradient-to-r from-emerald-500/60 via-teal-400/50 to-emerald-400/60 animate-form-halo opacity-100 scale-100"
                  : "bg-gradient-to-r from-emerald-500/30 via-teal-400/25 to-emerald-400/30 blur-2xl opacity-0 group-hover/form:opacity-90 group-hover/form:animate-form-halo group-hover/form:scale-100 scale-95"
              }`}
            />

            <div 
              id="itr-form-card" 
              onClick={() => setIsFormFocused(true)}
              onFocus={() => setIsFormFocused(true)}
              className={`bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl relative transition-all duration-300 ${
                (isFormFocused || name.trim() || phone.trim() || email.trim() || step === "otp")
                  ? "border-2 border-emerald-400 shadow-emerald-500/30 ring-4 ring-emerald-500/25 active-form-glow"
                  : "border border-slate-200/90 dark:border-emerald-800/80 shadow-slate-900/30 group-hover/form:border-emerald-400/80 group-hover/form:ring-2 group-hover/form:ring-emerald-500/20"
              }`}
            >
              
              {/* Step 1: Request Info Form (Ultra-Compact, 50% Reduced Height) */}
              {step === "form" && (
                <form onSubmit={handleInitiateRequest} className="space-y-2">
                  {/* Step Header with Clean Progress */}
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white text-[8px] font-bold flex items-center justify-center">1</span>
                      <h2 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                        CA-Assisted ITR Filing
                      </h2>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                      Free CA Consultation
                    </span>
                  </div>

                  {/* Primary Income Source Pills - 1 Row Compact Scroll */}
                  <div>
                    <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar pb-0.5">
                      {ITR_PROFILES.map((p) => {
                        const isSelected = category.includes(p.label) || category === p.form;
                        return (
                          <button
                            type="button"
                            key={p.id}
                            onClick={() => setCategory(p.form)}
                            className={`px-2 py-0.5 rounded-lg text-left transition-all cursor-pointer whitespace-nowrap text-[10px] font-bold shrink-0 ${
                              isSelected
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                            }`}
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2-Column Inputs Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Taxpayer Full Name */}
                    <div>
                      <label className="block text-[10px] font-bold mb-0.5 text-slate-700 dark:text-slate-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ramesh Sharma"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    {/* Mobile (+91) */}
                    <div>
                      <label className="block text-[10px] font-bold mb-0.5 text-slate-700 dark:text-slate-300">
                        Mobile Number *
                      </label>
                      <div className="flex rounded-lg border border-slate-300 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 focus-within:ring-1 focus-within:ring-emerald-500">
                        <span className="px-2 py-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 border-r border-slate-300 dark:border-slate-600 flex items-center">
                          +91
                        </span>
                        <input
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          required
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          placeholder="10-digit mobile"
                          className="w-full px-2 py-1.5 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-medium focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* PAN Card Number */}
                    <div>
                      <label className="block text-[10px] font-bold mb-0.5 text-slate-700 dark:text-slate-300">
                        PAN Card Number *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={10}
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                        placeholder="ABCDE1234F"
                        className="w-full uppercase px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 font-mono text-xs font-bold focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-[10px] font-bold mb-0.5 text-slate-700 dark:text-slate-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        inputMode="email"
                        autoCapitalize="none"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    {/* City / Location */}
                    <div>
                      <label className="block text-[10px] font-bold mb-0.5 text-slate-700 dark:text-slate-300">
                        City / District *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Agra, UP"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    {/* Annual Gross Income */}
                    <div>
                      <label className="block text-[10px] font-bold mb-0.5 text-slate-700 dark:text-slate-300">
                        Gross Income Slabs *
                      </label>
                      <select
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                      >
                        {INCOME_SLABS.map((s) => (
                          <option key={s} value={s} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {otpError && (
                    <div className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 p-1.5 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{otpError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={otpLoading}
                    className="w-full mt-1 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    {otpLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Verification Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Proceed to Verify with OTP</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                    <a
                      href="https://wa.me/917900979001?text=Hello%20BFS%20Team%2C%20I%20want%20to%20file%20my%20ITR%20via%20WhatsApp."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Chat on WhatsApp →</span>
                    </a>
                    <span>100% Tax Notice Safe • ₹0 Advance</span>
                  </div>
                </form>
              )}

              {/* Step 2: OTP Verification */}
              {step === "otp" && (
                <div className="space-y-3.5 py-1">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-black flex items-center justify-center">2</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Step 2 of 2: OTP Verification</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md">
                        Safe &amp; Secure
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                      Enter Verification Code
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      We sent a 6-digit OTP code to <strong className="text-emerald-600 dark:text-emerald-400">{email}</strong>
                    </p>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full w-full rounded-full transition-all duration-300" />
                    </div>
                  </div>

                  {mockOtpHint && (
                    <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-700 dark:text-amber-300 text-center font-mono">
                      Test Code: <strong>{mockOtpHint}</strong>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold mb-1 text-center text-slate-700 dark:text-slate-300">
                      6-Digit OTP
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      autoFocus
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
                      placeholder="• • • • • •"
                      className="w-full text-center text-2xl tracking-[0.4em] font-black py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  {otpError && (
                    <div className="text-xs text-rose-500 font-semibold text-center flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{otpError}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleVerifyOtpAndSubmit}
                    disabled={otpLoading || otpInput.length < 4}
                    className="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {otpLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verify OTP &amp; Submit Request</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => setStep("form")}
                      className="text-slate-500 hover:underline font-semibold"
                    >
                      ← Edit Details
                    </button>

                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={otpTimer > 0}
                      className={`font-semibold ${otpTimer > 0 ? "text-slate-400 cursor-not-allowed" : "text-emerald-600 dark:text-emerald-400 hover:underline"}`}
                    >
                      {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Resend OTP"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: SUCCESS CONFIRMATION CARD */}
              {step === "success" && (
                <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-400">
                  <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                      Request Confirmed
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      Thank You, {name}!
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Your ITR filing request is logged in our priority desk. A certified tax consultant will call you shortly.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Reference ID:</span>
                      <span className="font-mono font-black text-emerald-700 dark:text-emerald-400">{refId}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Filing Category:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">{category}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Priority Queue:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Callback Within 30 Mins</span>
                    </div>
                  </div>

                  {/* Direct Contact Action Buttons with Pre-filled Document WhatsApp Handover */}
                  <div className="space-y-2 pt-1">
                    <a
                      href={`https://wa.me/917900979001?text=${encodeURIComponent(
                        `Hello BFS Team, I have submitted my ITR Filing request on your portal.\n\n*Tracking Ref ID:* ${refId}\n*Taxpayer Name:* ${name}\n*PAN Number:* ${panNumber}\n*Category:* ${category}\n\nI am sharing my documents (Form 16 / Bank Statement) here for CA review.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Share Documents on WhatsApp Now →</span>
                    </a>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="tel:7900979001"
                        className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Direct Helpline</span>
                      </a>
                      <button
                        onClick={() => { setStep("form"); setName(""); setPhone(""); setEmail(""); setPanNumber(""); }}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                      >
                        File Another ITR
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* High-Urgency Legal Deadlines & 3-Step Document Flow Strip - Guaranteed 1-Line Professional Ribbon */}
      <section className="relative z-20 bg-[#021812] border-y border-emerald-500/20 text-white py-2 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto hide-scrollbar whitespace-nowrap text-xs">
            
            {/* Left: Important Tax Deadlines in ONE single line */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-[11px] shrink-0">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400"></span>
                </span>
                <Calendar className="w-3 h-3 text-amber-300" />
                <span>AY 2025–26 Deadlines</span>
              </div>

              <span className="text-slate-300 text-xs">
                <strong className="text-white">31 July:</strong> Salaried / Non-Audit
              </span>
              <span className="text-emerald-500/40">•</span>
              <span className="text-slate-300 text-xs">
                <strong className="text-white">31 Oct:</strong> Audit &amp; MSME
              </span>
              <span className="text-emerald-500/40">•</span>
              <span className="text-emerald-400 font-semibold text-xs inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Past 2 Years (ITR-U): Open Now
              </span>
            </div>

            {/* Right: Instant Paperless Process Stepper in ONE single line */}
            <div className="flex items-center gap-2 shrink-0 text-xs">
              <span className="text-slate-400 text-[11px] font-medium hidden md:inline">Paperless Process:</span>
              <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-slate-200 text-[11px] font-medium">
                1. Submit Form
              </span>
              <ChevronRight className="w-3 h-3 text-emerald-500/50 shrink-0" />
              <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-slate-200 text-[11px] font-medium">
                2. WhatsApp Docs
              </span>
              <ChevronRight className="w-3 h-3 text-emerald-500/50 shrink-0" />
              <span className="bg-emerald-600 text-white px-2.5 py-0.5 rounded-md font-bold text-[11px] inline-flex items-center gap-1 shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-white" />
                3. ITR-V in 24h
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Redesigned Modern Interactive Tool: Instant ITR Tax & Regime Comparator */}
      <section className="py-16 bg-slate-50 dark:bg-[#031510] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Live Tax Calculator • AY 2025–26
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Compare Old vs New Tax Regime
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Slide your annual gross income to see instant tax savings under New vs Old tax slabs.
            </p>
          </div>

          {/* Luxury Fintech Card */}
          <div className="bg-white dark:bg-[#07241c] rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-emerald-900/60 relative overflow-hidden">
            {/* Soft Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Left Column: Interactive Income Slider */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-slate-50 dark:bg-slate-900/70 p-5 rounded-2xl border border-slate-200/80 dark:border-emerald-900/50 space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Annual Gross Income
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5">
                        ₹{Number(calcIncome).toLocaleString("en-IN")}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      Standard ₹75k Deducted
                    </span>
                  </div>

                  {/* Range Slider */}
                  <div className="space-y-2 pt-2">
                    <input
                      type="range"
                      min={300000}
                      max={5000000}
                      step={50000}
                      value={calcIncome}
                      onChange={(e) => setCalcIncome(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                    />
                    <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                      <span>₹3L</span>
                      <span>₹12L</span>
                      <span>₹25L</span>
                      <span>₹50L</span>
                    </div>
                  </div>

                  {/* Preset Income Quick Chips */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/80">
                    <span className="text-[11px] font-semibold text-slate-400">Quick Select:</span>
                    {[500000, 750000, 1000000, 1500000, 2500000].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setCalcIncome(val)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                          calcIncome === val
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        ₹{(val / 100000).toFixed(val % 100000 === 0 ? 0 : 1)}L
                      </button>
                    ))}
                  </div>

                  {/* Interactive Deductions Toggles (Old Regime Customizer) */}
                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Interactive Deductions (Old Regime)
                      </span>
                      <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">
                        Total: ₹{calcResult.totalDeductions.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                        has80C 
                          ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold" 
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500"
                      }`}>
                        <input
                          type="checkbox"
                          checked={has80C}
                          onChange={(e) => setHas80C(e.target.checked)}
                          className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                        />
                        <span className="text-[11px]">80C: ₹1.5L (LIC/PPF)</span>
                      </label>

                      <label className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                        has80D 
                          ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold" 
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500"
                      }`}>
                        <input
                          type="checkbox"
                          checked={has80D}
                          onChange={(e) => setHas80D(e.target.checked)}
                          className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                        />
                        <span className="text-[11px]">80D: ₹25k (Health)</span>
                      </label>

                      <label className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                        hasHomeLoan 
                          ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold" 
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500"
                      }`}>
                        <input
                          type="checkbox"
                          checked={hasHomeLoan}
                          onChange={(e) => setHasHomeLoan(e.target.checked)}
                          className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                        />
                        <span className="text-[11px]">Home Loan: ₹2L</span>
                      </label>

                      <label className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                        hasHra 
                          ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold" 
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500"
                      }`}>
                        <input
                          type="checkbox"
                          checked={hasHra}
                          onChange={(e) => setHasHra(e.target.checked)}
                          className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                        />
                        <span className="text-[11px]">HRA Rent: ₹1L</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Comparative Results & Live Savings Counter */}
              <div className="lg:col-span-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* New Tax Regime Card */}
                  <div className={`p-4 rounded-2xl transition-all border ${
                    calcResult.recommended === "New Tax Regime"
                      ? "bg-emerald-500/10 dark:bg-emerald-950/60 border-emerald-500/60 ring-2 ring-emerald-500/20 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-80"
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">New Tax Regime</span>
                      {calcResult.recommended === "New Tax Regime" && (
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/80 px-2 py-0.5 rounded-full animate-pulse">
                          Best Value
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      ₹{calcResult.taxNew.toLocaleString("en-IN")}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Zero tax up to ₹7.75 Lakh (Sec 87A rebate)
                    </p>
                  </div>

                  {/* Old Tax Regime Card */}
                  <div className={`p-4 rounded-2xl transition-all border ${
                    calcResult.recommended === "Old Tax Regime"
                      ? "bg-amber-500/10 dark:bg-amber-950/60 border-amber-500/60 ring-2 ring-amber-500/20 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-80"
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Old Tax Regime</span>
                      {calcResult.recommended === "Old Tax Regime" && (
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/80 px-2 py-0.5 rounded-full animate-pulse">
                          Best Value
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                      ₹{calcResult.taxOld.toLocaleString("en-IN")}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      With active deductions applied
                    </p>
                  </div>
                </div>

                {/* Animated Tax Savings Difference Banner */}
                {calcResult.diff > 0 && (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs animate-in fade-in duration-300">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                        ₹
                      </span>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          You Save <span className="text-emerald-600 dark:text-emerald-400 font-black text-sm">₹{calcResult.diff.toLocaleString("en-IN")}</span> with BFS Guidance!
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          Opting for {calcResult.recommended} reduces your tax liability to the minimum.
                        </div>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block px-2 py-1 rounded-md bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider">
                      Verified
                    </span>
                  </div>
                )}

                {/* Final Recommendation Strip */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md shadow-emerald-700/20">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100 block">
                      BFS Chartered Tax Recommendation
                    </span>
                    <div className="text-sm font-black mt-0.5">
                      Opt for {calcResult.recommended} • File via {calcResult.recommendedForm}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      triggerGrandCelebration();
                      setIsFormFocused(true);
                      const el = document.getElementById("itr-form-card");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-black text-xs shrink-0 transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    File with this Slab →
                  </button>
                </div>
              </div>

            </div>

            {/* Machine-Readable Slabs Comparison Table (AEO / LLM Citations) */}
            <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-emerald-900/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    Income Tax Slab Rates for AY 2025–26 (FY 2024–25)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Standard deduction increased to ₹75,000 under New Tax Regime. Income up to ₹7.75 Lakhs is 100% tax-free with Section 87A rebate.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/20 shrink-0 self-start sm:self-auto">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Budget 2024–25 Verified
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-3.5">Gross Total Income</th>
                      <th className="py-3 px-3.5 text-emerald-700 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40">
                        New Tax Regime (Default)
                      </th>
                      <th className="py-3 px-3.5">Old Tax Regime (Optional)</th>
                      <th className="py-3 px-3.5">Key Deductions &amp; Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                      <td className="py-3 px-3.5 font-semibold text-slate-900 dark:text-white">Up to ₹3,00,000</td>
                      <td className="py-3 px-3.5 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20">Nil</td>
                      <td className="py-3 px-3.5">Nil (Up to ₹2.5 Lakh)</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500 dark:text-slate-400">Zero basic tax liability</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                      <td className="py-3 px-3.5 font-semibold text-slate-900 dark:text-white">₹3,00,001 to ₹7,00,000</td>
                      <td className="py-3 px-3.5 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20">
                        5% <span className="text-[11px] font-normal text-emerald-700 dark:text-emerald-300">(₹0 Tax via Sec 87A)</span>
                      </td>
                      <td className="py-3 px-3.5">5% to 20%</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500 dark:text-slate-400">Full tax rebate up to ₹7L (plus ₹75k std deduction = ₹7.75L)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                      <td className="py-3 px-3.5 font-semibold text-slate-900 dark:text-white">₹7,00,001 to ₹10,00,000</td>
                      <td className="py-3 px-3.5 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20">10%</td>
                      <td className="py-3 px-3.5">20%</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500 dark:text-slate-400">Old regime allows 80C, 80D, HRA &amp; Home Loan deductions</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                      <td className="py-3 px-3.5 font-semibold text-slate-900 dark:text-white">₹10,00,001 to ₹12,00,000</td>
                      <td className="py-3 px-3.5 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20">15%</td>
                      <td className="py-3 px-3.5">30%</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500 dark:text-slate-400">New regime provides significant slab savings</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                      <td className="py-3 px-3.5 font-semibold text-slate-900 dark:text-white">₹12,00,001 to ₹15,00,000</td>
                      <td className="py-3 px-3.5 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20">20%</td>
                      <td className="py-3 px-3.5">30%</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500 dark:text-slate-400">BFS CA computes your optimal regime automatically</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                      <td className="py-3 px-3.5 font-semibold text-slate-900 dark:text-white">Above ₹15,00,000</td>
                      <td className="py-3 px-3.5 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20">30%</td>
                      <td className="py-3 px-3.5">30%</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500 dark:text-slate-400">Surcharge applicable above ₹50L income</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 4-Step E-Filing Process Section (AEO & Interactive Walkthrough) */}
      <section className="py-16 bg-white dark:bg-[#021812] border-t border-slate-200 dark:border-emerald-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10 max-w-3xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
              Interactive 4-Step Walkthrough
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              How BFS CA Desk Files Your ITR in 4 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Click any step below to see how our certified tax experts process your return seamlessly.
            </p>
          </div>

          {/* Interactive Step Selector Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                num: 1,
                time: "2 mins",
                title: "1. Share Basic Details",
                desc: "Fill the 2-minute quick form or message our CA desk on WhatsApp with your PAN and basic income details.",
                icon: FileText,
                detail: "We just need basic PAN, Aadhaar, and income summary to start. No advance fees needed."
              },
              {
                num: 2,
                time: "30 mins",
                title: "2. CA Computation & AIS Review",
                desc: "Our chartered tax experts download your official 26AS, AIS/TIS, reconcile TDS, and calculate maximum tax refund.",
                icon: Calculator,
                detail: "Full verification of interest, dividends, mutual fund trades & Form 16 to guarantee zero notice risk."
              },
              {
                num: 3,
                time: "5 mins",
                title: "3. Aadhaar OTP E-Verification",
                desc: "You receive a secure 6-digit verification OTP from the Income Tax portal. Once shared, your return is officially verified.",
                icon: ShieldCheck,
                detail: "100% secure Government ITD portal verification without sharing any bank passwords."
              },
              {
                num: 4,
                time: "Instant",
                title: "4. Official ITR-V Ack Receipt",
                desc: "Receive the official Govt. of India ITR-V receipt and bank loan-approved computation sheet directly on WhatsApp.",
                icon: Award,
                detail: "Official e-Filing receipt with acknowledgment number + CA-signed computation sheet for bank loans."
              }
            ].map((s) => {
              const Icon = s.icon;
              const isActive = activeStep === s.num;
              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStep(s.num)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer relative group ${
                    isActive
                      ? "bg-emerald-500/10 dark:bg-emerald-950/70 border-emerald-500 shadow-lg ring-2 ring-emerald-500/30 scale-[1.02]"
                      : "bg-slate-50 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-emerald-400/50 hover:bg-slate-100/70"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isActive
                        ? "bg-emerald-500 text-slate-950 shadow-md"
                        : "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                      {s.time}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>

                  {isActive && (
                    <div className="mt-3 pt-3 border-t border-emerald-500/20 text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1.5 animate-in fade-in duration-300">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{s.detail}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Documents Checklist Explorer (With Real-Time Checkbox Readiness Bar) */}
      <section className="py-14 bg-slate-50 dark:bg-[#031510] border-t border-slate-200 dark:border-emerald-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-8 max-w-3xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
              Interactive Checklist Explorer
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Check Your Document Readiness in 10 Seconds
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Select your category below and tick off the documents you have handy.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => setDocTab("salaried")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                docTab === "salaried"
                  ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30 scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Salaried (ITR-1 / Form 16)</span>
            </button>

            <button
              type="button"
              onClick={() => setDocTab("business")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                docTab === "business"
                  ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30 scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Traders &amp; Small Business (ITR-4)</span>
            </button>

            <button
              type="button"
              onClick={() => setDocTab("loan")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                docTab === "loan"
                  ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30 scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100"
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Bank Loan Borrowers (Balance Sheet)</span>
            </button>
          </div>

          {/* Interactive Checklist Box with Real-time Readiness Meter */}
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-emerald-900/60 shadow-lg space-y-6">
            {/* Dynamic Items Based on Tab */}
            {docTab === "salaried" && (
              <div className="space-y-3">
                {[
                  { id: "salaried_pan", title: "PAN Card & Aadhaar Card", desc: "Mandatory for Income Tax Department portal login & OTP verification" },
                  { id: "salaried_f16", title: "Form 16 from Employer (Part A & B)", desc: "Contains employer TAN, gross salary break-up & TDS deducted" },
                  { id: "salaried_bank", title: "Bank Statements / Interest Certificates", desc: "Savings account interest, Fixed Deposit TDS certificates" },
                  { id: "salaried_ded", title: "Tax Saving Proofs (80C, 80D, HRA)", desc: "PPF, LIC, Mediclaim policy or Home Loan interest certificate" }
                ].map((item) => (
                  <label
                    key={item.id}
                    onClick={() => toggleDoc(item.id)}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                      checkedDocs[item.id]
                        ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-400 text-slate-900 dark:text-white"
                        : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedDocs[item.id]}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-bold">{item.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {docTab === "business" && (
              <div className="space-y-3">
                {[
                  { id: "business_pan", title: "PAN, Aadhaar & Business Name", desc: "Proprietorship firm or individual trader trade details" },
                  { id: "business_bank", title: "12 Months Banking Statements", desc: "Current and savings account statements showing total receipts" },
                  { id: "business_turnover", title: "Annual Gross Turnover / Sales Estimate", desc: "Section 44AD presumptive profit (6% digital / 8% cash)" },
                  { id: "business_gst", title: "GSTR-1 & GSTR-3B Summary", desc: "Required only if business is GST registered" }
                ].map((item) => (
                  <label
                    key={item.id}
                    onClick={() => toggleDoc(item.id)}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                      checkedDocs[item.id]
                        ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-400 text-slate-900 dark:text-white"
                        : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedDocs[item.id]}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-bold">{item.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {docTab === "loan" && (
              <div className="space-y-3">
                {[
                  { id: "loan_itr", title: "Past 2–3 Years ITR-V Acknowledgments", desc: "Required by SBI, HDFC, PNB, ICICI credit underwriting desks" },
                  { id: "loan_bs", title: "Chartered Balance Sheet & P&L Statement", desc: "Prepared by BFS CA to showcase strong debt repayment capacity" },
                  { id: "loan_cap", title: "Capital Account & Depreciation Schedule", desc: "Prevents bank technical queries and valuation discrepancies" },
                  { id: "loan_sanction", title: "Existing Loan Track & Sanction Letter", desc: "For calculating FOIR / DSCR eligibility for highest sanction amount" }
                ].map((item) => (
                  <label
                    key={item.id}
                    onClick={() => toggleDoc(item.id)}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                      checkedDocs[item.id]
                        ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-400 text-slate-900 dark:text-white"
                        : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedDocs[item.id]}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-bold">{item.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Real-Time Readiness Score Bar */}
            {(() => {
              const ids = docTab === "salaried"
                ? ["salaried_pan", "salaried_f16", "salaried_bank", "salaried_ded"]
                : docTab === "business"
                ? ["business_pan", "business_bank", "business_turnover", "business_gst"]
                : ["loan_itr", "loan_bs", "loan_cap", "loan_sanction"];
              const count = ids.filter((id) => checkedDocs[id]).length;
              const pct = Math.round((count / ids.length) * 100);

              return (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Document Readiness Score:
                    </span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">
                      {pct}% Ready ({count} of {ids.length} Checked)
                    </span>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {pct === 100
                        ? "🎉 Perfect! You're 100% ready for instant CA e-filing."
                        : "Even if some documents are missing, our CA desk extracts AIS/26AS directly."}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        triggerGrandCelebration();
                        setIsFormFocused(true);
                        const el = document.getElementById("itr-form-card");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 shadow-sm transition-all active:scale-95 cursor-pointer"
                    >
                      Proceed to E-File with Ready Docs →
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* BFS Loan-Ready ITR Specialization Section (High Trust & High Conversion) */}
      <section className="py-14 bg-slate-50 dark:bg-[#041a13] border-t border-slate-200 dark:border-emerald-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10 max-w-3xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
              The BFS Difference for Loan Borrowers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Why Nationalized Banks Prefer BFS Loan-Ready ITR
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Most regular ITR filings get flagged or rejected by bank credit managers because they lack proper balance sheet schedules. BFS specially curates loan-approved financial statements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Regular Filing */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-black text-base text-slate-700 dark:text-slate-300">Regular / Self ITR Filing</h3>
                <span className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-0.5 rounded-md">High Loan Rejection Risk</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Basic ITR-V only; no detailed tax computation sheet provided.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Unverified presumptive turnover that bank credit underwriters frequently query.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>No capital account reconciliation or depreciation schedule.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>User is left alone if CPC sends a Section 139(9) defective notice.</span>
                </li>
              </ul>
            </div>

            {/* BFS Chartered Desk */}
            <div className="p-6 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/40 border-2 border-emerald-500 shadow-md space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                Bank Approved
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200/60 dark:border-emerald-800/60">
                <h3 className="font-black text-base text-slate-900 dark:text-white">BFS CA-Assisted Loan ITR</h3>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-0.5 rounded-md">100% Loan Sanction Ready</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-200 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Complete Chartered Computation Sheet accepted by SBI, HDFC, PNB, ICICI &amp; BOB.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Curated P&amp;L and Balance Sheet structured to maximize Home Loan &amp; Business Loan eligibility.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>CMA Data &amp; Banking turnover alignment for seamless CC Limit / OD approvals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% Tax Notice Protection — Free CA response handling for any CPC query.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AEO Direct Answer Engine (Optimized for Google AI Overviews, Perplexity & Voice Search) */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-2 mb-10 max-w-3xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
            AEO &amp; Direct Answer Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Quick Answers to Important ITR Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Direct facts and regulatory guidance curated by our Certified Tax Advisors for quick reference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Which ITR form for Home Loans?</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Salaried borrowers need <strong>ITR-1 (Sahaj)</strong> with Form 16. Business applicants require <strong>ITR-4</strong> or <strong>ITR-3</strong> accompanied by a certified Tax Computation Sheet and Balance Sheet.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Can I file ITR without Form 16?</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Yes. With your PAN and Aadhaar, BFS extracts your official <strong>AIS/TIS and 26AS records</strong> directly from the Income Tax portal, ensuring 100% matching and zero notice risk.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">How fast is ITR-V Ack generated?</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Upon verifying via Aadhaar OTP, your official <strong>ITR-V Acknowledgment</strong> is generated instantly (within 10 minutes) and sent directly to your WhatsApp and email.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">What if I receive a Tax Notice?</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              BFS provides complete <strong>Notice Protection Guarantee</strong>. Any intimation under Section 143(1) or clarification query is drafted and answered by our CA desk at zero extra cost.
            </p>
          </div>
        </div>
      </section>

      {/* Transparent Pricing & Fee Plans (₹0 Advance Policy) */}
      <section className="py-14 bg-white dark:bg-[#031510] border-t border-slate-200 dark:border-emerald-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
              100% Transparent Fee Structure
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Affordable CA Filing Plans with ₹0 Advance
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Zero hidden costs. Pay only after reviewing your verified tax computation draft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Tier 1: Salaried */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-400 transition-all group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Salaried Individuals
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md">
                    Fast Track
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">ITR-1 (Sahaj)</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">₹499</span>
                    <span className="text-xs text-slate-400 font-medium">/ filing</span>
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">₹0 Advance • Pay after draft</p>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Single / Multiple Form 16</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Salary, House Property &amp; Interest</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>AIS / 26AS Tax Credit Matching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Maximum Refund Guaranteed</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCategory("ITR-1 (Sahaj) — Salaried Employees (Form 16)");
                  setIsFormFocused(true);
                  const el = document.getElementById("itr-form-card");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition-all text-center group-hover:bg-emerald-600 cursor-pointer"
              >
                Select Salaried Plan →
              </button>
            </div>

            {/* Tier 2: Small Business / MSME (Featured) */}
            <div className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/40 border-2 border-emerald-500 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                Most Popular
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                    Business / MSME / Traders
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">ITR-4 (Sugam / 44AD)</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">₹999</span>
                    <span className="text-xs text-slate-400 font-medium">/ filing</span>
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">₹0 Advance • Pay after draft</p>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200 pt-2 border-t border-emerald-200 dark:border-emerald-800/60 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Presumptive 44AD / 44ADA Scheme</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Banking Turnover &amp; Cash Flow Analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>GST Turnover Reconciliation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Free Notice Protection Included</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCategory("ITR-4 (Sugam) — Small Business & Traders (Presumptive 44AD/44ADA)");
                  setIsFormFocused(true);
                  const el = document.getElementById("itr-form-card");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all text-center cursor-pointer"
              >
                Select Business Plan →
              </button>
            </div>

            {/* Tier 3: Loan Purpose & Capital Gains */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-400 transition-all group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Bank Loans &amp; Capital Gains
                  </span>
                  <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 px-2 py-0.5 rounded-md">
                    Loan Ready
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">ITR-2 / ITR-3 + Balance Sheet</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">₹1,499</span>
                    <span className="text-xs text-slate-400 font-medium">/ filing</span>
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">₹0 Advance • Pay after draft</p>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Chartered Balance Sheet &amp; P&amp;L</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Home &amp; Business Loan Sanction Approval</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Share Trading / Mutual Fund Capital Gains</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Past Backlog Years (ITR-U Assistance)</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCategory("Loan-Purpose ITR (Specially structured for Bank Loan Sanctions)");
                  setIsFormFocused(true);
                  const el = document.getElementById("itr-form-card");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition-all text-center group-hover:bg-emerald-600 cursor-pointer"
              >
                Select Loan ITR Plan →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Real Verified Client Reviews & Trust Testimonials - Exclusively for ITR & Tax Filing (Smart Infinite Marquee) */}
      <section className="py-14 bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-50 dark:from-[#041a14] dark:via-[#06241c] dark:to-[#041a14] border-t border-slate-200 dark:border-emerald-950/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2.5 mb-8 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0 Rated by Taxpayers ({totalReviewsCount}+ Verified ITR Filings)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Real Taxpayer Reviews &amp; E-Filing Experiences
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-emerald-200/70 max-w-xl mx-auto">
              Real-time feedback from salaried professionals, shop owners, and MSME traders who e-filed their ITR with certified CA assistance through BFS.
            </p>
          </div>
        </div>

        {/* Smart Marquee Stream */}
        {reviewsLoading ? (
          <div className="py-16 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" />
            <span>Loading verified ITR client reviews...</span>
          </div>
        ) : (
          <SmartTaxpayerReviewMarquee 
            reviews={liveReviews} 
            totalReviewsCount={totalReviewsCount} 
            loading={reviewsLoading} 
          />
        )}

        {/* View All Reviews CTA */}
        <div className="text-center mt-6">
          <Link
            href="/reviews?category=itr"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            <span>Explore All {totalReviewsCount}+ ITR Reviews on BFS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Pan-India & Regional Geographic Footprint (GEO Optimization) */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-slate-200 dark:border-emerald-900/40">
        <div className="text-center space-y-2 mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
            Regional Hubs &amp; Pan-India Coverage (GEO)
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Serving Agra, Uttar Pradesh &amp; Pan-India Taxpayers
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Headquartered at Sanjay Place, Commercial Hub, Agra with specialized digital filing desks across all major districts and metro cities.
          </p>
        </div>

        {/* Infinite Scrolling City Ticker (Marquee) */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Left & Right Gradient Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 dark:from-[#061e16] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 dark:from-[#061e16] to-transparent z-10 pointer-events-none" />

          {/* Infinite Marquee Track */}
          <div className="flex w-max animate-stats-marquee gap-3 hover:[animation-play-state:paused] cursor-pointer py-1">
            {[...TOP_CITIES, ...TOP_CITIES].map((c, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-emerald-800/60 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:scale-105 transition-all whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                <span>{c}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Local Head-Office & Regional Clusters Card (GEO Local SEO) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-emerald-900/60 shadow-sm">
          {/* Left: Physical NAP Office Card */}
          <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-4 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 pb-6 lg:pb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              Central CA Head-Office
            </div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white">
              Bhardwaj Financial Services (BFS)
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Sanjay Place Commercial Complex, Agra, Uttar Pradesh - 282002</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Mon – Sat: 10:00 AM – 7:30 PM (Sunday by Appointment)</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Direct CA Desk: +91-7900979001</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href="https://maps.google.com/?q=Sanjay+Place+Agra+Uttar+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs hover:bg-slate-800 transition-all shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Get Directions (Google Maps)</span>
              </a>
              <a
                href="https://wa.me/917900979001?text=Hello%20BFS%2C%20I%20want%20to%20consult%20for%20ITR%20filing."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Right: Regional Industrial & Business Clusters */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Specialized Regional Industry &amp; Trade Desks
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Agra Hub</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Footwear manufacturers, leather exports, tourism &amp; hospitality enterprises.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Firozabad Cluster</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Glassware, bangle manufacturing units &amp; brassware trading MSMEs.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Aligarh Belt</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Lock industry, metal fabrication units, hardware traders &amp; educational professionals.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Mathura &amp; Delhi NCR</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Commercial merchants, petroleum ancillaries, IT &amp; corporate salaried employees.</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
              *All returns are directly prepared by Certified Chartered Accountants compliant with ICAI guidelines and ITD e-filing protocols.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section (AEO & Voice Search Optimization) */}
      <section className="py-16 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200 dark:border-emerald-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              Frequently Asked Questions (FAQ)
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">
              Everything You Need to Know About ITR
            </h3>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-emerald-800/60 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Financial Services (SEO Internal Linking & Domain Topical Authority) */}
      <section className="py-12 bg-slate-50 dark:bg-[#021714] border-t border-slate-200 dark:border-emerald-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Integrated Financial Solutions
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Explore Other BFS Financial &amp; Compliance Desks
              </h3>
            </div>
            <Link
              href="/"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All BFS Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/products/home-loan"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Home Loans in Agra
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Sanctioned in 5 days starting @ 6.50% p.a. with SBI, PNB, HDFC &amp; BOB priority processing.
              </p>
            </Link>

            <Link
              href="/services/msme-registration"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                MSME (Udyam) Registration
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                100% digital Udyam certificate generation in 24 hours. Avail collateral-free CGTMSE bank loans.
              </p>
            </Link>

            <Link
              href="/products/loan-against-property"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Loan Against Property (LAP)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Unlock property equity up to ₹5 Cr for business expansion, working capital, or debt consolidation.
              </p>
            </Link>

            <Link
              href="/products/balance-transfer"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Loan Balance Transfer
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Transfer high-interest loans to save up to ₹5–15 Lakhs in interest with instant Top-Up sanction.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
