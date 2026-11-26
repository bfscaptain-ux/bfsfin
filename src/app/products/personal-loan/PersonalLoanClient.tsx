"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Wallet,
  Briefcase,
  ChevronDown,
  Building2,
  PhoneCall,
  ShieldCheck,
  FileCheck2,
  Zap,
  BadgePercent,
  MapPin
} from "lucide-react";

export default function PersonalLoanClient({ heroImageUrl }: { heroImageUrl?: string }) {
  const [activeTab, setActiveTab] = useState<"salaried" | "self-employed">("salaried");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Personal Loan Indicative EMI Calculator State
  const [calcAmount, setCalcAmount] = useState<number>(500000); // Default ₹5 Lakhs
  const [calcRate, setCalcRate] = useState<number>(12.0); // Standard indicative rate for slider
  const [calcTenure, setCalcTenure] = useState<number>(3); // Default 3 Years

  // EMI Math Formula
  const monthlyRate = calcRate / 12 / 100;
  const totalMonths = calcTenure * 12;
  const monthlyEmi = Math.round(
    (calcAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalPayable = monthlyEmi * totalMonths;
  const totalInterest = totalPayable - calcAmount;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Kya Bhardwaj Financial Services koi advance fee ya file charge leta hai?",
      a: "Nahi, hum file evaluate karne ya eligibility check karne ke liye koi bhi advance paisa nahi lete. 100% free consultation hai. Bank ki official processing fee seedha loan amount se hi adjust hoti hai."
    },
    {
      q: "Agar pehle kisi bank se dikkat aayi ho, toh kya mujhe Personal Loan mil sakta hai?",
      a: "Ji haan. Har bank aur NBFC ki internal credit policy alag hoti hai. Hum pehle aapki profile analyse karte hain aur fir wahi bank suggest karte hain jahan aapko turant aur bina pareshani ke sanction mil sake."
    },
    {
      q: "Personal Loan approve aur disburse hone mein kitna samay lagta hai?",
      a: "Sabhi zaroori documents (PAN, Aadhaar, salary slip/bank statement) verify hone ke baad aksar 24 se 48 ghante ke andar loan amount aapke account mein transfer ho jata hai."
    },
    {
      q: "Personal Loan ka byaj (interest rate) kis cheez par depend karta hai?",
      a: "Exact interest rate aapki monthly salary ya business turnover, company category, credit history (CIBIL score) aur bank ki credit policy ke aadhar par tay hota hai. Hamara prayas rehta hai ki aapko sabse lowest market EMI mile."
    },
    {
      q: "Aap kin shehron mein service dete hain?",
      a: "Hamara physical head office Block-C11, Shop No.-5, First Floor, Sanjay Place, Agra mein hai. Hum poore Agra, Mathura, Firozabad, Hathras, Aligarh, Mainpuri aur Delhi-NCR (Noida, Greater Noida, Gurgaon) mein doorstep aur fast digital support dete hain."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-900 selection:text-white transition-colors duration-300">
      <Header />

      {/* 1. HERO SECTION (CURVED DARK HERO - CLEAN, RESPECTFUL & MODERN) */}
      <section className="relative bg-[#020617] pt-20 pb-28 lg:pt-24 lg:pb-36 overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>

        {/* Ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[340px] bg-emerald-600/15 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 right-0 w-[420px] h-[420px] bg-teal-600/15 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          {/* Main Headline (H1) - Positive & Dignified */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.2] tracking-tight mb-5 max-w-4xl">
            Aapki Zaroorat Aur Budget Ke Anusaar{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">
              Sahi Personal Loan Chunein
            </span>
          </h1>

          {/* Sub-Headline */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal max-w-3xl leading-relaxed mb-8">
            Emergency zaroorat ho, business requirement, wedding ya koi zaroori personal kharcha—Bhardwaj Financial Services par hum aapki profile ke anusaar best bank aur aasan EMI suvidha arrange karate hain. 100% Free Consultation.
          </p>

          {/* Primary CTA Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
            <Link
              href="/apply?loan=personal"
              className="group relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold px-9 py-4 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_45px_rgba(16,185,129,0.55)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden text-base tracking-wide"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative z-10">Apply for Personal Loan</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium px-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Upfront Fees • Instant 10-Min Eligibility Check</span>
            </div>
          </div>

          {/* 3 Key Highlights (Cards - STRICT ZERO ROI PERCENTAGE) */}
          <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {/* Card 1: Loan Amount */}
            <div className="flex-1 w-full flex flex-col items-center text-center px-4 pt-2 sm:pt-0">
              <div className="flex items-center gap-2 mb-2 text-emerald-300">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Loan Amount</span>
              </div>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                ₹50k – ₹25 Lakhs
              </span>
              <span className="text-[11px] text-slate-400 mt-1 font-medium">Collateral-Free Direct Funding</span>
            </div>

            {/* Card 2: Bank Policy Matching (No ROI Number) */}
            <div className="flex-1 w-full flex flex-col items-center text-center px-4 pt-6 sm:pt-0">
              <div className="flex items-center gap-2 mb-2 text-emerald-300">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Bank Policy Match</span>
              </div>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                150+ Top Banks
              </span>
              <span className="text-[11px] text-slate-400 mt-1 font-medium">Lowest Market EMI &amp; Easy Approval</span>
            </div>

            {/* Card 3: Fast Approval & Disbursal */}
            <div className="flex-1 w-full flex flex-col items-center text-center px-4 pt-6 sm:pt-0 pb-2 sm:pb-0">
              <div className="flex items-center gap-2 mb-2 text-teal-300">
                <Clock className="w-5 h-5 text-teal-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Approval &amp; Disbursal</span>
              </div>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                24–48 Hours
              </span>
              <span className="text-[11px] text-slate-400 mt-1 font-medium">Same-Day Digital Verification</span>
            </div>
          </div>
        </div>

        {/* Custom SVG Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            className="relative block w-full h-[45px] sm:h-[65px] md:h-[80px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              className="fill-slate-50 dark:fill-emerald-950"
              d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* 2. WHY CHOOSE BHARDWAJ FINANCIAL SERVICES? (4 CLEAN ADVISORY CARDS) */}
      <section className="py-20 bg-slate-50 dark:bg-emerald-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              Har Bank Ke Rules Alag Hote Hain —{" "}
              <span className="text-emerald-700 dark:text-emerald-400">Hum Aapke Liye Sahi Bank Chunte Hain</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
              Agar pehle kisi bank se pareshani aayi ho, toh bina soche-samjhe baar-baar apply karke apna CIBIL score kharab na karein. Hamari expert team aapki profile ke anukool best bank chunti hai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Card 1: Smart Profile Matching */}
            <div className="bg-white dark:bg-emerald-900/30 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800/80 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 font-black text-sm">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Smart Bank Policy Matching
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Har bank ka salary cut-off, company category aur eligibility criteria alag hota hai. Hum pehle aapki profile check karke wahi bank suggest karte hain jahan approval ke chances sabse zyada hon.
              </p>
            </div>

            {/* Card 2: 100% Transparent Process */}
            <div className="bg-white dark:bg-emerald-900/30 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800/80 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 font-black text-sm">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                100% Transparent Process
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Loan sanction hone se pehle aapko tenure, processing fee aur monthly EMI ki poori jankari saaf-saaf batai jaati hai—koi bhi hidden charges ya surprise fees nahi hoti.
              </p>
            </div>

            {/* Card 3: Multiple EMIs Consolidation */}
            <div className="bg-white dark:bg-emerald-900/30 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800/80 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 font-black text-sm">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Credit Card &amp; Multiple Loans Consolidation
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Agar aapke upar 3–4 alag-alag chhote loans ya high-interest credit card dues chal rahe hain, toh unhe ek single aasan Personal Loan mein merge karke monthly bachat karein.
              </p>
            </div>

            {/* Card 4: Local Physical Office */}
            <div className="bg-white dark:bg-emerald-900/30 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800/80 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 font-black text-sm">
                04
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Sanjay Place Agra Physical Office
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Online unverified apps ke chakkar mein na fasein. Aap hamare Sanjay Place, Agra office aakar hamare financial experts se aamne-saamne milkar guidance le sakte hain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIMPLE 4-STEP PROCESS (NEW MODERN PROGRESSION) */}
      <section className="py-20 bg-white dark:bg-emerald-950/60 border-t border-slate-200 dark:border-emerald-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
              Fast &amp; Simple
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">
              Personal Loan Milne Ka 4-Step Process
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Bina kisi jhanjhat ke sirf basic digital verification ke sath aasan process:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-50 dark:bg-emerald-900/30 p-6 rounded-2xl border border-slate-200 dark:border-emerald-800/70 relative">
              <span className="text-3xl font-black text-emerald-600/30 dark:text-emerald-400/20 absolute top-4 right-4">
                01
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Apply Online / WhatsApp</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Sirf apna naam, mobile number aur basic loan requirement submit karein.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 dark:bg-emerald-900/30 p-6 rounded-2xl border border-slate-200 dark:border-emerald-800/70 relative">
              <span className="text-3xl font-black text-emerald-600/30 dark:text-emerald-400/20 absolute top-4 right-4">
                02
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">10-Min Advisor Call</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                BFS relationship manager aapse call karke best matching bank shortlist karega.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 dark:bg-emerald-900/30 p-6 rounded-2xl border border-slate-200 dark:border-emerald-800/70 relative">
              <span className="text-3xl font-black text-emerald-600/30 dark:text-emerald-400/20 absolute top-4 right-4">
                03
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Paperless Docs Check</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Aadhaar, PAN aur 3-month statement digital WhatsApp ya portal par share karein.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 dark:bg-emerald-900/30 p-6 rounded-2xl border border-slate-200 dark:border-emerald-800/70 relative">
              <span className="text-3xl font-black text-emerald-600/30 dark:text-emerald-400/20 absolute top-4 right-4">
                04
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">24–48h Direct Disbursal</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Bank approval milte hi approved loan amount seedhe aapke account mein transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEDICATED PERSONAL LOAN EMI & REPAYMENT ESTIMATOR */}
      <section className="py-20 bg-slate-100 dark:bg-emerald-900/40 border-y border-slate-200 dark:border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3">
              Personal Loan EMI &amp; Repayment Estimator
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Apne anukul loan amount aur repayment tenure chunein aur anumanit monthly EMI dekhein.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Calculator Sliders (Left 7 Cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-emerald-950 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-emerald-800 shadow-sm space-y-8">
              {/* Slider 1: Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Required Loan Amount
                  </label>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    ₹{(calcAmount / 100000).toFixed(calcAmount % 100000 === 0 ? 0 : 2)} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="2500000"
                  step="25000"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {[100000, 300000, 500000, 1000000, 2500000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setCalcAmount(amt)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                        calcAmount === amt
                          ? "bg-emerald-50 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border-emerald-400"
                          : "bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-emerald-800/80 hover:border-emerald-300"
                      }`}
                    >
                      ₹{amt >= 100000 ? `${amt / 100000} Lakh` : `${amt / 1000}k`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 2: Loan Tenure */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Repayment Tenure (Years)
                  </label>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {calcTenure} {calcTenure === 1 ? "Year" : "Years"} ({calcTenure * 12} Months)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={calcTenure}
                  onChange={(e) => setCalcTenure(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex gap-2 mt-3">
                  {[1, 2, 3, 4, 5].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setCalcTenure(yr)}
                      className={`flex-1 text-xs font-semibold py-1.5 rounded-lg border text-center transition-all ${
                        calcTenure === yr
                          ? "bg-emerald-50 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border-emerald-400"
                          : "bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-emerald-800/80 hover:border-emerald-300"
                      }`}
                    >
                      {yr} {yr === 1 ? "Yr" : "Yrs"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-emerald-900/20 border border-slate-200 dark:border-emerald-800/60 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Transparent Guidance:</strong> Aapki monthly income, company category aur CIBIL ke aadhar par hamari team 150+ lenders mein se sabse kam EMI wala bank shortlist karti hai.
                </span>
              </div>
            </div>

            {/* Calculation Output Card (Right 5 Cols - NO HARDCODED ROI RATES) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white p-7 sm:p-8 rounded-3xl border border-emerald-700/40 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-emerald-300 uppercase tracking-widest font-bold mb-4">
                  <span>Estimated Repayment</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                    Instant Quote
                  </span>
                </div>

                <div className="mb-6">
                  <div className="text-xs text-slate-400">Indicative Monthly EMI</div>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                    ₹{monthlyEmi.toLocaleString("en-IN")}
                    <span className="text-xs font-normal text-slate-400"> / month</span>
                  </div>
                </div>

                <div className="space-y-3 py-4 border-y border-emerald-800/60 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Loan Amount</span>
                    <span className="font-bold text-white">₹{calcAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Repayment Period</span>
                    <span className="font-bold text-white">{calcTenure * 12} Months ({calcTenure} {calcTenure === 1 ? "Year" : "Years"})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Estimated Total Payable</span>
                    <span className="font-bold text-emerald-300">₹{totalPayable.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Key BFS Assurance Badges */}
                <div className="mt-5 pt-1 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>150+ Top Bank &amp; NBFC Policy Matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Same-Day Digital Eligibility Verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Zero Advance Payment / File Charges</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={`/apply?loan=personal&amount=${calcAmount}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm shadow-lg hover:shadow-emerald-500/30 transition-all"
                >
                  Apply for Personal Loan <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="text-[11px] text-center text-slate-400 mt-2">
                  *Anumanit EMI calculation. Exact terms bank credit appraisal par tay hoti hain.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ELIGIBILITY CRITERIA (SALARIED & SELF-EMPLOYED) */}
      <section className="py-20 bg-white dark:bg-emerald-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3">
              Personal Loan Eligibility Criteria
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Chahe aap salaried hon ya business owner, check karein aasan eligibility:
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-slate-100 dark:bg-emerald-900/60 p-1.5 rounded-2xl border border-slate-200 dark:border-emerald-800">
              <button
                onClick={() => setActiveTab("salaried")}
                className={`px-6 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === "salaried"
                    ? "bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Briefcase className="w-4 h-4" /> For Salaried (Naukri Pesha)
              </button>
              <button
                onClick={() => setActiveTab("self-employed")}
                className={`px-6 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === "self-employed"
                    ? "bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Building2 className="w-4 h-4" /> For Self-Employed / Vyapari
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-slate-50 dark:bg-emerald-900/30 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-emerald-800 shadow-sm">
            {activeTab === "salaried" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-white dark:bg-emerald-950/70 rounded-2xl border border-slate-200/80 dark:border-emerald-800">
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                    01 • Age
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">21 se 58 saal</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Loan maturity ke samay tak ki aayu</p>
                </div>

                <div className="p-5 bg-white dark:bg-emerald-950/70 rounded-2xl border border-slate-200/80 dark:border-emerald-800">
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                    02 • Monthly Salary
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">₹18,000+ per month</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Bank account mein salary credit honi chahiye</p>
                </div>

                <div className="p-5 bg-white dark:bg-emerald-950/70 rounded-2xl border border-slate-200/80 dark:border-emerald-800">
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                    03 • Work Experience
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Kam se kam 6 mahine</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Current job mein 6M aur overall 1 saal ka experience</p>
                </div>

                <div className="p-5 bg-white dark:bg-emerald-950/70 rounded-2xl border border-slate-200/80 dark:border-emerald-800">
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                    04 • Credit History
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">CIBIL 650+ Acceptable</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Multiple bank &amp; NBFC partner tie-ups available</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-white dark:bg-emerald-950/70 rounded-2xl border border-slate-200/80 dark:border-emerald-800">
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                    01 • Age
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">23 se 65 saal</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Business owner / proprietor aayu criteria</p>
                </div>

                <div className="p-5 bg-white dark:bg-emerald-950/70 rounded-2xl border border-slate-200/80 dark:border-emerald-800">
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                    02 • Business Vintage
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Kam se kam 2 saal</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Shop, firm ya business operation</p>
                </div>

                <div className="p-5 bg-white dark:bg-emerald-950/70 rounded-2xl border border-slate-200/80 dark:border-emerald-800 md:col-span-2">
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                    03 • Tax &amp; Banking Documents
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">GST / Udyam Certificate &amp; 1–2 Saal ITR</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Pichhle 12 mahine ka continuous bank statement zaroori</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. REQUIRED DOCUMENTS CHECKLIST */}
      <section className="py-20 bg-slate-50 dark:bg-emerald-900/30 border-t border-slate-200 dark:border-emerald-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3">
              Required Documents (Kam Se Kam Kagazat)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Tez verification ke liye bas ye basic digital documents prepare rakhein:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Part A: KYC */}
            <div className="bg-white dark:bg-emerald-950/80 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm">
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                Part A
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                KYC Documents (Sabhi Ke Liye)
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>PAN Card</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Aadhaar Card (Mobile linked)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>1 Passport Size Photo</span>
                </li>
              </ul>
            </div>

            {/* Part B: Salaried */}
            <div className="bg-white dark:bg-emerald-950/80 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm">
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                Part B
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Income Proof (Salaried)
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Pichhle 3 mahine ki Salary Slip</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>6 mahine ka Salary Account Statement (PDF)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Company ID Card / Appointment Letter</span>
                </li>
              </ul>
            </div>

            {/* Part C: Self-Employed */}
            <div className="bg-white dark:bg-emerald-950/80 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm">
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                Part C
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Income Proof (Self-Employed)
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Pichhle 1 saal ka Current/Savings Bank Statement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>ITR (Pichhle 1–2 saal with Computation Sheet)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Business Proof (GST / Udyam Registration)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQS) */}
      <section className="py-20 bg-white dark:bg-emerald-950 border-t border-slate-200 dark:border-emerald-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Personal loan se jude aapke sawalon ke transparent aur satik jawab:
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-emerald-800/90 bg-slate-50 dark:bg-emerald-900/30 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span className="text-base sm:text-lg flex items-center gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-black shrink-0">
                      Q{idx + 1}
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-emerald-800/60">
                    <p className="pl-10">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CTA BANNER */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-800 via-emerald-900 to-[#022c22] text-white overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-5 leading-tight tracking-tight">
            Apni Free Personal Loan Eligibility Check Karein{" "}
            <span className="text-emerald-300 block sm:inline">(Bina CIBIL Score Par Asar Dale)</span>
          </h2>

          <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Abhi online form bharein ya call karein—hamare loan advisor aapko 10 minute ke andar best bank aur EMI options arrange karke denge.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/apply?loan=personal"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-white text-emerald-900 hover:bg-emerald-50 font-black text-base rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Check Eligibility Now <ArrowRight className="w-5 h-5 text-emerald-700" />
            </Link>

            <a
              href="tel:9258724227"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-emerald-700/60 hover:bg-emerald-700/80 border border-emerald-400/30 text-white font-bold text-sm rounded-xl transition-all"
            >
              <PhoneCall className="w-4 h-4 text-emerald-300" /> Call Advisor: 9258-724-227
            </a>
          </div>

          {/* Trust badges strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-emerald-200 font-semibold border-t border-emerald-700/50 pt-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Zero Advance File Fees
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Doorstep Document Pickup
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> 150+ Bank &amp; NBFC Partners
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}