"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import SmartMsmeReviewMarquee from "@/components/SmartMsmeReviewMarquee";
import UdyamCertificateModal from "@/components/UdyamCertificateModal";
import MsmeDocumentChecklist from "@/components/MsmeDocumentChecklist";
import MsmeSchemesExplorer from "@/components/MsmeSchemesExplorer";
import MsmeMobileActionBar from "@/components/MsmeMobileActionBar";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  Building2, ShieldCheck, CheckCircle2, Clock, Award, ArrowRight,
  TrendingUp, Percent, Send, RefreshCw, AlertCircle, Sparkles, Check,
  MessageCircle, PhoneCall, Factory, Briefcase, Landmark, Star,
  MapPin, ChevronDown, ChevronUp, ChevronRight, Layers, HelpCircle, Users, Calendar
} from "lucide-react";

const MSME_PROFILES = [
  { id: "proprietor", label: "Proprietorship", sub: "Individual Owner", form: "Proprietorship Firm (Single Owner)", icon: Briefcase },
  { id: "partnership", label: "Partnership / LLP", sub: "2+ Partners", form: "Partnership Firm / LLP", icon: Building2 },
  { id: "pvtltd", label: "Pvt Ltd Company", sub: "Registered Company", form: "Private Limited Company (Pvt Ltd)", icon: Landmark },
  { id: "trader", label: "Trader / Retailer", sub: "Shop & Distribution", form: "Individual Trader / Retailer", icon: TrendingUp },
  { id: "factory", label: "Manufacturing", sub: "Factory / Production", form: "Manufacturing Unit / Factory", icon: Factory }
];

const BUSINESS_TYPES = [
  "Proprietorship Firm (Single Owner)",
  "Partnership Firm / LLP",
  "Private Limited Company (Pvt Ltd)",
  "Individual Trader / Retailer",
  "Service Provider / Consultant",
  "Manufacturing Unit / Factory"
];

const TURNOVER_SLABS = [
  "Micro: Turnover up to ₹5 Crore (Investment < ₹1 Cr)",
  "Small: Turnover ₹5 Crore – ₹50 Crore (Investment < ₹10 Cr)",
  "Medium: Turnover ₹50 Crore – ₹250 Crore (Investment < ₹50 Cr)",
  "New Business / Startup (Zero Turnover Yet)"
];

const TOP_CITIES = [
  "Agra", "Mathura", "Firozabad", "Aligarh", "Hathras", "Delhi NCR", "Noida", 
  "Lucknow", "Jaipur", "Kanpur", "Mumbai", "Pune", "Bengaluru", "Hyderabad", "Kolkata", "Pan-India"
];

const FAQS = [
  {
    q: "How fast is the MSME / Udyam Registration certificate issued?",
    a: "Once your Aadhaar and business details are verified via OTP, BFS submits your application on the official Ministry of MSME portal. The digital government certificate (with QR code and lifetime validity) is issued within 24 to 48 hours."
  },
  {
    q: "Can I get a bank loan without collateral after MSME registration?",
    a: "Yes! Registered MSMEs are eligible for the Government of India's CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises) scheme, offering collateral-free term loans and working capital limits up to ₹5 Crore from PNB, SBI, HDFC, and other banks."
  },
  {
    q: "Is GST number compulsory for MSME Udyam registration?",
    a: "GSTIN is not mandatory for enterprises that are exempt under GST laws (e.g. service providers below ₹20L turnover or traders below ₹40L turnover). A PAN and Aadhaar card are sufficient to obtain your Udyam Certificate."
  },
  {
    q: "What is the validity period of an Udyam Certificate?",
    a: "Udyam Registration has Lifetime Validity. There is no renewal fee or annual re-registration required. However, annual turnover updates can be synced smoothly."
  },
  {
    q: "What interest rate discounts do banks offer to registered MSMEs?",
    a: "Most PSU and private banks provide a 0.50% to 1.00% interest rate rebate on business loans, Cash Credit (CC), and Overdraft (OD) facilities for Udyam registered units in priority sectors."
  }
];

export default function MsmeRegistrationPage() {
  // Dynamic Hero Image & Owner Authority from Admin CMS
  const [ownerPhoto, setOwnerPhoto] = useState<string>("/uploads/1787661063143-20211226_163523.jpg");
  const [heroBannerUrl, setHeroBannerUrl] = useState<string>("");
  const [ownerName, setOwnerName] = useState("Vineeta Sharma");
  const [ownerRole, setOwnerRole] = useState("Founder & Managing Director, BFS");

  // Form State
  const [enterpriseName, setEnterpriseName] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Agra");
  const [businessType, setBusinessType] = useState(BUSINESS_TYPES[0]);
  const [turnover, setTurnover] = useState(TURNOVER_SLABS[0]);
  const [message, setMessage] = useState("");
  const [isFormFocused, setIsFormFocused] = useState(false);

  // OTP State
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [otpInput, setOtpInput] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);
  const [mockOtpHint, setMockOtpHint] = useState("");
  const [refId, setRefId] = useState("");
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const scrollToForm = () => {
    const el = document.getElementById("msme-form-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsFormFocused(true);
    }
  };

  // Interactive MSME Category & Subsidy Tool State
  const [investAmount, setInvestAmount] = useState<number>(25); // In Lakhs
  const [turnoverAmount, setTurnoverAmount] = useState<number>(100); // In Lakhs
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic FAQs from Admin CMS
  const [faqsList, setFaqsList] = useState(FAQS);

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
          const match = data.find((item: any) => item.pageId === "services/msme-registration" || item.pageId === "msme-registration");
          if (match?.imageUrl) setHeroBannerUrl(match.imageUrl);
        }
      })
      .catch(() => {});

    fetch("/api/calculator-faqs?id=msme-registration")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqsList(data.map((f: any) => ({ q: f.question, a: f.answer })));
        }
      })
      .catch(() => {});
  }, []);

  // Fetch strictly MSME & Business Reviews
  const [msmeReviews, setMsmeReviews] = useState<any[]>([]);
  const [totalMsmeCount, setTotalMsmeCount] = useState<number>(174);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/reviews?category=msme&limit=20&t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.reviews)) {
          setMsmeReviews(data.reviews);
          if (data.totalCount) setTotalMsmeCount(data.totalCount);
        }
      })
      .catch(() => {})
      .finally(() => setReviewsLoading(false));
  }, []);

  useEffect(() => {
    let interval: any;
    if (step === "otp" && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  // MSME Category Evaluator
  const evaluateMsmeCategory = (investLakhs: number, turnoverLakhs: number) => {
    const investCr = investLakhs / 100;
    const turnoverCr = turnoverLakhs / 100;

    let category = "Micro Enterprise";
    let loanLimit = "Up to ₹1 Crore Collateral-Free";
    let subsidy = "100% Tax & Tender Exemptions + 1% Bank ROI Discount";

    if (investCr <= 1 && turnoverCr <= 5) {
      category = "Micro Enterprise (सूक्ष्म उद्यम)";
      loanLimit = "Up to ₹1 Crore Collateral-Free (CGTMSE)";
      subsidy = "1% Interest Subsidy + 50% Trademark Discount";
    } else if (investCr <= 10 && turnoverCr <= 50) {
      category = "Small Enterprise (लघु उद्यम)";
      loanLimit = "Up to ₹5 Crore Collateral-Free (CGTMSE)";
      subsidy = "0.75% Interest Rebate + Priority Sector Lending";
    } else {
      category = "Medium Enterprise (मध्यम उद्यम)";
      loanLimit = "Consortium Loan & Working Capital Priority";
      subsidy = "Govt. Subsidized Technology Upgradation";
    }

    return { category, loanLimit, subsidy };
  };

  const evalResult = evaluateMsmeCategory(investAmount, turnoverAmount);

  const triggerGrandCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#059669', '#34d399', '#f59e0b', '#8b5cf6']
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
          colors: ['#10b981', '#8b5cf6', '#ec4899']
        });
      }, 400);
    } catch (e) {
      console.error(e);
    }
  };

  const handleInitiateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enterpriseName.trim() || !applicantName.trim() || !phone.trim() || !email.trim()) {
      alert("Please fill in Enterprise Name, Applicant Name, Mobile & Email");
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
        setOtpError(data.error || "Unable to send verification OTP. Please check your email.");
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

      const generatedRef = "MSME-" + Math.floor(100000 + Math.random() * 900000);
      setRefId(generatedRef);

      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: applicantName.trim(),
          phone: phone.trim(),
          email: email.trim().toLowerCase(),
          city: city.trim(),
          productType: "Tax & Compliance",
          loanType: "Tax & Compliance - MSME Registration",
          subType: "MSME Udyam Registration",
          loanAmount: "0",
          income: turnover,
          employmentType: businessType,
          formType: "MSME Registration",
          source: `MSME Registration Request [Ref: ${generatedRef}]`,
          message: `Enterprise: ${enterpriseName.trim()} | Business Type: ${businessType} | Slab: ${turnover} | Notes: ${message || "N/A"}`
        })
      });

      setStep("success");
      triggerGrandCelebration();

    } catch (err) {
      setOtpError("Failed to submit registration request. Please retry.");
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

  // Structured Data (JSON-LD) for SEO / AEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://bfsfin.com/services/msme-registration#service",
        "name": "MSME Udyam Registration Online Facilitation",
        "serviceType": "Government Business Registration & Subsidy Consulting",
        "description": "Government authorized online MSME (Udyam) registration in 24-48 hours. Get official certificate, collateral-free bank loans up to 5 Cr, and 1% interest rebate.",
        "provider": {
          "@type": "FinancialService",
          "name": "Bhardwaj Financial Services (BFS Agra)",
          "url": "https://bfsfin.com",
          "telephone": "+91-7900979001",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Sanjay Place, Commercial Hub",
            "addressLocality": "Agra",
            "addressRegion": "Uttar Pradesh",
            "postalCode": "282002",
            "addressCountry": "IN"
          }
        },
        "areaServed": [
          { "@type": "Country", "name": "India" },
          { "@type": "City", "name": "Agra" },
          { "@type": "City", "name": "Delhi" },
          { "@type": "City", "name": "Noida" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "980"
        }
      },
      {
        "@type": "FAQPage",
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#021714] text-slate-800 dark:text-slate-100 font-sans transition-colors">
      <Header />

      {/* SEO / AEO JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section - 50% Reduced Height, Ultra-Compact, Executive & High-Trust */}
      <section className="relative bg-[#021c17] text-white py-2 sm:py-3.5 overflow-hidden">
        {/* Dynamic Hero Background Image from Admin CMS */}
        {heroBannerUrl && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 pointer-events-none transition-opacity duration-700" 
              style={{ backgroundImage: `url('${heroBannerUrl}')` }} 
            />
            {/* Elegant contrast gradient overlay so text remains 100% readable while image is clearly visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#021c17]/95 via-[#021c17]/80 to-[#021c17]/60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021c17] via-transparent to-[#021c17]/70 pointer-events-none" />
          </>
        )}

        {/* Soft Ambient Radial Glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-5 items-center">
          
          {/* Mobile Header (Sleek, Compact, Beautiful - No Clutter!) */}
          <div className="lg:hidden space-y-1 text-center pb-0.5">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-[10px] font-semibold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-400"></span>
              </span>
              Official MSME Facilitation Desk
            </div>

            <div className="text-lg font-black tracking-tight text-white leading-tight">
              MSME / Udyam Registration <span className="text-teal-300">in 24–48 Hours</span>
            </div>

            {/* Quick 3-point Trust Strip */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-300 font-medium">
              <span className="text-teal-300 font-bold">₹5 Cr Loan Eligible</span>
              <span>•</span>
              <span>1% Interest Rebate</span>
              <span>•</span>
              <span>Lifetime Validity</span>
            </div>

            {/* Quick Certificate Preview Link for Mobile */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={() => setIsCertModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-400/10 text-teal-300 text-[10px] font-bold border border-teal-400/30 active:scale-95 cursor-pointer"
              >
                <Award className="w-3 h-3 text-teal-400" />
                <span>Preview Sample Udyam Certificate →</span>
              </button>
            </div>
          </div>

          {/* Desktop Left Content (Ultra-Compact, Executive Layout) */}
          <div className="hidden lg:block lg:col-span-6 space-y-2.5 pr-2">
            {/* Live Status & Govt Badges */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-[10px] font-bold backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-400"></span>
                </span>
                Official MSME Facilitation Desk
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/10 text-slate-300 text-[10px] font-medium backdrop-blur-sm">
                <ShieldCheck className="w-3 h-3 text-teal-400" />
                Ministry of MSME Recognized
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-xl xl:text-2xl font-black tracking-tight text-white leading-tight">
              Official MSME / Udyam{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-teal-400">
                Registration in 24–48 Hours
              </span>
            </h1>

            <p className="text-slate-300 text-xs leading-relaxed max-w-lg">
              Empower your enterprise with official Government recognition. Unlock collateral-free bank loans up to ₹5 Crore, 1% interest rebate, and government subsidies with BFS.
            </p>

            {/* Unified Compact Leadership & Contact Strip */}
            <div className="p-2 rounded-xl bg-white/[0.06] border border-teal-500/20 backdrop-blur-md flex items-center justify-between gap-2.5 max-w-lg shadow-sm">
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative shrink-0 w-8 h-8 rounded-full overflow-hidden border border-teal-400 shadow-xs ring-1 ring-teal-400/30">
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
                  <div className="text-[10px] text-teal-300/80 truncate">{ownerRole || "Verified MSME Desk Head"}</div>
                </div>
              </div>

              {/* Consultation Quick Links */}
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href="https://wa.me/917900979001?text=Hello%20BFS%20Team%2C%20I%20want%20to%20apply%20for%20MSME%20Udyam%20Registration."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-[11px] shadow-xs transition-all active:scale-95 cursor-pointer"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:7900979001"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-[11px] border border-white/15 transition-all active:scale-95"
                  title="Direct Call"
                >
                  <PhoneCall className="w-3 h-3 text-teal-400" />
                  <span>Call MSME</span>
                </a>
              </div>
            </div>

            {/* Clean Trust Strip in 1 Line */}
            <div className="flex items-center gap-2 max-w-lg text-[10px] text-slate-300 font-medium">
              <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-teal-300 font-bold">₹5 Cr Loan Eligible</span>
              <span>•</span>
              <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-teal-300 font-bold">1% Interest Rebate</span>
              <span>•</span>
              <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-teal-300 font-bold">Lifetime Validity</span>
            </div>

            {/* View Official Sample Certificate Button */}
            <div className="pt-0.5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCertModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-teal-400/10 hover:bg-teal-400/20 border border-teal-400/30 text-teal-300 font-bold text-xs transition-all cursor-pointer active:scale-95 shadow-xs"
              >
                <Award className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Preview Official Sample Certificate (GOI Replica) →</span>
              </button>
            </div>
          </div>

          {/* Right Hero Form Card with Animated Glow on Hover, Focus & Active Filling */}
          <div className="lg:col-span-6 relative group/form">
            {/* Animated Halo Glow behind form: triggers on hover, on click/focus, and on typing */}
            <div 
              className={`absolute -inset-3 sm:-inset-4 rounded-[2.5rem] transition-all duration-500 pointer-events-none ${
                (isFormFocused || enterpriseName.trim() || applicantName.trim() || phone.trim() || email.trim() || step === "otp")
                  ? "bg-gradient-to-r from-teal-500/60 via-emerald-400/50 to-teal-400/60 animate-form-halo opacity-100 scale-100"
                  : "bg-gradient-to-r from-teal-500/30 via-emerald-400/25 to-teal-400/30 blur-2xl opacity-0 group-hover/form:opacity-90 group-hover/form:animate-form-halo group-hover/form:scale-100 scale-95"
              }`}
            />

            <div 
              id="msme-form-card" 
              onClick={() => setIsFormFocused(true)}
              onFocus={() => setIsFormFocused(true)}
              className={`bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-2xl relative transition-all duration-300 ${
                (isFormFocused || enterpriseName.trim() || applicantName.trim() || phone.trim() || email.trim() || step === "otp")
                  ? "border-2 border-teal-400 shadow-teal-500/30 ring-4 ring-teal-500/25 active-form-glow"
                  : "border border-slate-200/90 dark:border-teal-800/80 shadow-slate-900/30 group-hover/form:border-teal-400/80 group-hover/form:ring-2 group-hover/form:ring-teal-500/20"
              }`}
            >
              
              {/* Step 1: Request Info Form */}
              {step === "form" && (
                <form onSubmit={handleInitiateRequest} className="space-y-2.5">
                  {/* Step & Trust Header */}
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                    <div className="flex justify-between items-center mb-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-[9px] font-black flex items-center justify-center">1</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Step 1 of 2: Enterprise Details
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 px-2 py-0.5 rounded-md">
                        Govt Recognized
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight">
                        Apply for Udyam Certificate
                      </h2>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        45-sec submission • Lifetime validity
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-teal-500 h-full rounded-full w-1/2 transition-all duration-300"></div>
                    </div>
                  </div>

                  {/* 1-Tap Enterprise Type Selector - Compact Horizontal Scrollable Pills */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                        Enterprise Type *
                      </label>
                      <span className="text-[9px] text-slate-400">Scroll for more types →</span>
                    </div>
                    <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-0.5">
                      {MSME_PROFILES.map((p) => {
                        const IconComponent = p.icon;
                        const isSelected = businessType === p.form;
                        return (
                          <button
                            type="button"
                            key={p.id}
                            onClick={() => setBusinessType(p.form)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? "bg-teal-600 text-white shadow-xs"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                            }`}
                          >
                            <IconComponent className="w-3 h-3 shrink-0" />
                            <span>{p.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 1: Enterprise Name & Applicant Name in 2 columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold mb-1 text-slate-800 dark:text-slate-200">
                        Enterprise / Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={enterpriseName}
                        onChange={(e) => setEnterpriseName(e.target.value)}
                        placeholder="e.g. Sharma Enterprises"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-semibold focus:ring-1.5 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-xs transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold mb-1 text-slate-800 dark:text-slate-200">
                        Applicant / Proprietor Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-semibold focus:ring-1.5 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-xs transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Mobile (+91 prefix) & Email in 2 columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold mb-1 text-slate-800 dark:text-slate-200">
                        Mobile Number *
                      </label>
                      <div className="flex rounded-lg border border-slate-300 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 focus-within:ring-1.5 focus-within:ring-teal-500 focus-within:border-teal-500 shadow-xs transition-all">
                        <span className="px-2 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 border-r border-slate-300 dark:border-slate-600 flex items-center">
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
                          className="w-full px-2 py-1.5 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-semibold focus:outline-none"
                        />
                        {phone.length === 10 && (
                          <span className="pr-2 flex items-center text-teal-600 dark:text-teal-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold mb-1 text-slate-800 dark:text-slate-200">
                        Email (for Certificate) *
                      </label>
                      <input
                        type="email"
                        inputMode="email"
                        autoCapitalize="none"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@example.com"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-semibold focus:ring-1.5 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-xs transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Turnover & City in 2 columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold mb-1 text-slate-800 dark:text-slate-200">
                        Annual Turnover Sizing *
                      </label>
                      <select
                        value={turnover}
                        onChange={(e) => setTurnover(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:ring-1.5 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-xs transition-all cursor-pointer"
                      >
                        {TURNOVER_SLABS.map((t, i) => (
                          <option key={i} value={t} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold mb-1 text-slate-800 dark:text-slate-200">
                        City / Town (Optional)
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Agra, Delhi, Jaipur"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-semibold focus:ring-1.5 focus:ring-teal-500 focus:border-teal-500 focus:outline-none shadow-xs transition-all"
                      />
                    </div>
                  </div>

                  {otpError && (
                    <div className="text-xs text-rose-500 font-semibold flex items-center gap-1.5 p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{otpError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={otpLoading}
                    className="w-full mt-1 py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs tracking-wide shadow-md shadow-teal-600/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
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
                      href="https://wa.me/917900979001?text=Hello%20BFS%20Team%2C%20I%20want%20to%20apply%20for%20MSME%20Registration%20via%20WhatsApp."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 dark:text-teal-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Chat on WhatsApp →</span>
                    </a>
                    <span>Govt. Recognized • 100% Paperless</span>
                  </div>
                </form>
              )}

              {/* Step 2: OTP Verification */}
              {step === "otp" && (
                <div className="space-y-3.5 py-1">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-[9px] font-black flex items-center justify-center">2</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Step 2 of 2: OTP Verification</span>
                      </div>
                      <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/80 px-2 py-0.5 rounded-md">
                        Safe &amp; Secure
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                      Enter Verification Code
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      We sent a 6-digit OTP code to <strong className="text-teal-600 dark:text-teal-400">{email}</strong>
                    </p>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-teal-500 h-full w-full rounded-full transition-all duration-300" />
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
                      className="w-full text-center text-2xl tracking-[0.4em] font-black py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
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
                    className="w-full py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-md shadow-teal-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {otpLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verify OTP &amp; Submit Registration</span>
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
                      className={`font-semibold ${otpTimer > 0 ? "text-slate-400 cursor-not-allowed" : "text-teal-600 dark:text-teal-400 hover:underline"}`}
                    >
                      {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Resend OTP"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: SUCCESS CONFIRMATION CARD */}
              {step === "success" && (
                <div className="text-center py-2 space-y-3 animate-in zoom-in-95 duration-400">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mx-auto border border-teal-200 dark:border-teal-800 shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div className="space-y-0.5">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold text-[10px] uppercase tracking-wider border border-teal-200 dark:border-teal-800">
                      Application Logged
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      Congratulations, {applicantName}!
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Your Udyam / MSME registration for <strong>{enterpriseName}</strong> is logged.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Reference ID:</span>
                      <span className="font-mono font-black text-teal-700 dark:text-teal-400">{refId}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Enterprise Name:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">{enterpriseName}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Estimated Delivery:</span>
                      <span className="font-bold text-teal-600 dark:text-teal-400">Within 24–48 Hours</span>
                    </div>
                  </div>

                  {/* Direct Contact Action Buttons with Pre-filled Document WhatsApp Handover */}
                  <div className="space-y-1.5 pt-1">
                    <a
                      href={`https://wa.me/917900979001?text=${encodeURIComponent(
                        `Hello BFS Team, I have submitted my MSME Registration request on your portal.\n\n*Ref ID:* ${refId}\n*Enterprise:* ${enterpriseName}\n*Applicant:* ${applicantName}\n\nI am sharing my Aadhaar & PAN details here for Udyam processing.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full p-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-600/30 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Share Documents on WhatsApp Now →</span>
                    </a>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="tel:7900979001"
                        className="p-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 border border-slate-700 transition-all"
                      >
                        <PhoneCall className="w-3 h-3 text-teal-400" />
                        <span>Direct Helpline</span>
                      </a>
                      <button
                        onClick={() => { setStep("form"); setEnterpriseName(""); setApplicantName(""); setPhone(""); setEmail(""); }}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                      >
                        Apply Another
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </section>

      {/* High-Impact MSME Govt Benefits & 3-Step Paperless Process Strip - Smart Infinite Marquee */}
      <section className="relative z-20 bg-[#021812] border-y border-teal-500/25 text-white py-2.5 overflow-hidden shadow-sm">
        {/* Left & Right Soft Fade Gradient Masks for Ultra-Sleek Infinite Floating Illusion */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#021812] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#021812] to-transparent z-10 pointer-events-none" />

        {/* Infinite Moving Marquee Track */}
        <div className="flex w-max animate-ribbon-marquee hover:[animation-play-state:paused] cursor-pointer items-center">
          {[1, 2, 3].map((loopIndex) => (
            <div key={loopIndex} className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8 text-xs whitespace-nowrap">
              
              {/* MSME Govt Benefits Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 font-bold text-[11px] shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
                </span>
                <Building2 className="w-3.5 h-3.5 text-teal-300" />
                <span>MSME Govt Benefits</span>
              </div>

              {/* Benefit 1 */}
              <span className="text-slate-300 text-xs">
                <strong className="text-white">Up to 45%:</strong> Capital Subsidy (PMEGP Scheme)
              </span>

              <span className="text-teal-500/50">•</span>

              {/* Benefit 2 */}
              <span className="text-slate-300 text-xs">
                <strong className="text-white">₹5 Crore:</strong> Collateral-Free Bank Loans (CGTMSE)
              </span>

              <span className="text-teal-500/50">•</span>

              {/* Benefit 3 */}
              <span className="text-teal-300 font-semibold text-xs inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                1% Bank Interest Rebate &amp; TReDS Bill Protection
              </span>

              <span className="text-teal-500/50">•</span>

              {/* Benefit 4 */}
              <span className="text-slate-300 text-xs">
                <strong className="text-white">Lifetime Validity:</strong> No Periodic Renewal Needed
              </span>

              <span className="text-teal-500/50">•</span>

              {/* Paperless Stepper */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-teal-400 text-[11px] font-bold">Paperless Process:</span>
                <span className="bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-md text-slate-200 text-[11px] font-medium">
                  1. Submit Details
                </span>
                <ChevronRight className="w-3 h-3 text-teal-400/70 shrink-0" />
                <span className="bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-md text-slate-200 text-[11px] font-medium">
                  2. Aadhaar OTP
                </span>
                <ChevronRight className="w-3 h-3 text-teal-400/70 shrink-0" />
                <span className="bg-teal-600 text-white px-2.5 py-0.5 rounded-md font-bold text-[11px] inline-flex items-center gap-1 shadow-xs">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                  3. Udyam Certificate in 24h
                </span>
              </div>

              <span className="text-teal-500/50">•</span>

              {/* Verified Authority Badge */}
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>100% Tax Notice Safe • Zero Office Visit</span>
              </span>

              <span className="text-teal-500/50">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* Redesigned Modern Interactive Tool: MSME Category & Loan Subsidy Evaluator */}
      <section className="py-16 bg-slate-50 dark:bg-[#031510] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/70 border border-teal-300 dark:border-teal-800/80 text-teal-800 dark:text-teal-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              Official MSME Slabs &amp; Subsidies
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Know Your Enterprise Category &amp; Bank Benefits
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Enter your investment and annual turnover to check your official MSME category and collateral-free loan limit under CGTMSE.
            </p>
          </div>

          {/* Luxury Fintech Card */}
          <div className="bg-white dark:bg-[#07241c] rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-teal-900/60 relative overflow-hidden">
            {/* Soft Ambient Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Left Column: Sliders */}
              <div className="lg:col-span-6 space-y-6">
                {/* Investment Slider */}
                <div className="bg-slate-50 dark:bg-slate-900/70 p-5 rounded-2xl border border-slate-200/80 dark:border-teal-900/50 space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Plant &amp; Machinery Investment
                    </span>
                    <div className="text-xl font-black text-teal-600 dark:text-teal-400">
                      ₹{investAmount} Lakhs
                    </div>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={1500}
                    step={5}
                    value={investAmount}
                    onChange={(e) => setInvestAmount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                    <span>₹5L</span>
                    <span>₹1 Cr (Micro Limit)</span>
                    <span>₹10 Cr (Small)</span>
                    <span>₹15 Cr</span>
                  </div>
                </div>

                {/* Turnover Slider */}
                <div className="bg-slate-50 dark:bg-slate-900/70 p-5 rounded-2xl border border-slate-200/80 dark:border-teal-900/50 space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Annual Business Turnover
                    </span>
                    <div className="text-xl font-black text-teal-600 dark:text-teal-400">
                      ₹{turnoverAmount} Lakhs
                    </div>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={5000}
                    step={25}
                    value={turnoverAmount}
                    onChange={(e) => setTurnoverAmount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                    <span>₹10L</span>
                    <span>₹5 Cr (Micro)</span>
                    <span>₹50 Cr (Small)</span>
                    <span>₹50 Cr+</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Category Evaluator Output */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-5 rounded-2xl bg-teal-500/10 dark:bg-teal-950/60 border border-teal-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Assigned Category
                    </span>
                    <span className="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/80 px-2.5 py-0.5 rounded-full">
                      Ministry of MSME Recognized
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-300">
                    {evalResult.category}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Bank Loan Limit (CGTMSE):</span>
                    <div className="text-base font-black text-slate-900 dark:text-white">
                      {evalResult.loanLimit}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Applicable Subsidy:</span>
                    <div className="text-sm font-bold text-teal-700 dark:text-teal-300">
                      {evalResult.subsidy}
                    </div>
                  </div>
                </div>

                {/* Direct Action Strip */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-700 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md shadow-teal-700/20">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-teal-100 block">
                      Ready to Register?
                    </span>
                    <div className="text-sm font-black mt-0.5">
                      Get your Official Udyam Certificate in 24 Hours
                    </div>
                  </div>
                  <a
                    href="#msme-form-card"
                    className="px-4 py-2.5 rounded-xl bg-white text-teal-900 hover:bg-teal-50 font-black text-xs shrink-0 transition-all shadow-sm active:scale-95"
                  >
                    Apply Now →
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Interactive Document Readiness Checklist */}
      <MsmeDocumentChecklist onApplyClick={scrollToForm} />

      {/* Central Government Subsidies & Schemes Explorer */}
      <MsmeSchemesExplorer onApplyClick={scrollToForm} />

      {/* Pan-India Geographic Footprint (GEO Optimization) */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-2 mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-500/20">
            Pan-India Udyam Registration Service
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Registering Enterprises Across All Major Industrial Hubs
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            From Agra’s footwear &amp; handicrafts to Delhi NCR’s IT parks, Mumbai’s traders, and Pan-India manufacturing units, BFS delivers your Udyam Certificate 100% digitally.
          </p>
        </div>

        {/* Infinite Scrolling City Ticker (Marquee) */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Left & Right Gradient Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 dark:from-[#021714] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 dark:from-[#021714] to-transparent z-10 pointer-events-none" />

          {/* Infinite Marquee Track */}
          <div className="flex w-max animate-stats-marquee gap-3 hover:[animation-play-state:paused] cursor-pointer py-1">
            {[...TOP_CITIES, ...TOP_CITIES].map((c, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-teal-800/60 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 hover:scale-105 transition-all whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0 animate-pulse" />
                <span>{c}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Verified MSME & Business Client Reviews - Smart Dual-Lane Infinite Marquee */}
      <SmartMsmeReviewMarquee
        reviews={msmeReviews}
        totalReviewsCount={totalMsmeCount}
        loading={reviewsLoading}
      />

      {/* FAQs Section (AEO & Voice Search Optimization) */}
      <section className="py-16 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200 dark:border-teal-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest">
              Frequently Asked Questions (FAQ)
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">
              Everything You Need to Know About MSME (Udyam)
            </h3>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-teal-800/60 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-teal-500 shrink-0" />
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

      <Footer />
      <FloatingSupport />

      {/* Mobile Sticky Quick-Action Bar */}
      <MsmeMobileActionBar onApplyClick={scrollToForm} />

      {/* Interactive Official Udyam Certificate Preview Modal */}
      <UdyamCertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        onApplyNow={scrollToForm}
      />
    </div>
  );
}
