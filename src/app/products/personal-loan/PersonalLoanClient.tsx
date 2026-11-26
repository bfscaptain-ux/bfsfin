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
  Percent,
  Wallet,
  Briefcase,
  ChevronDown,
  Building2,
  PhoneCall
} from "lucide-react";

export default function PersonalLoanClient({ heroImageUrl }: { heroImageUrl?: string }) {
  const [activeTab, setActiveTab] = useState<"salaried" | "self-employed">("salaried");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dedicated Personal Loan EMI Calculator State
  const [calcAmount, setCalcAmount] = useState<number>(500000); // Default ₹5 Lakhs
  const [calcRate, setCalcRate] = useState<number>(10.50); // Default 10.50%
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
      q: "Mera loan ek bank se reject ho gaya hai, kya mujhe Personal Loan mil sakta hai?",
      a: "Ji haan. Har bank ki internal policy aur CIBIL criteria alag hota hai. Hum aapki rejection wajah dekh kar doosre sahi bank ya NBFC mein aapki file lagate hain jahan approval mil sake."
    },
    {
      q: "Loan approve hone mein kitna samay lagta hai?",
      a: "Sahi documents aur bank statement milne ke baad aksar 24 se 48 ghante mein sanction aur disbursement process poora ho jata hai."
    },
    {
      q: "Kya Bhardwaj Financial Services koi advance fee leta hai?",
      a: "Nahi, hum file check karne ya eligibility batane ke liye koi advance paisa nahi lete. Bank ki jo bhi official processing fee hoti hai, woh seedha aapke loan amount se adjust hoti hai."
    },
    {
      q: "Aap kin shehron mein Personal Loan ki service dete hain?",
      a: "Hamara mukhya office Block-C11, Shop No.-5, First Floor, Sanjay Place, Agra mein hai. Hum Agra, Mathura, Firozabad, Hathras, Aligarh, Mainpuri aur Delhi-NCR (Noida/Gurgaon) mein fast doorstep service dete hain."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-900 selection:text-white transition-colors duration-300">
      <Header />

      {/* 1. HERO SECTION (CURVED DARK HERO - CLEAN & PROFESSIONAL) */}
      <section className="relative bg-[#020617] pt-20 pb-28 lg:pt-24 lg:pb-36 overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dbx2j0g8j/image/upload/v1700000000/grid-pattern_qwe.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"></div>

        {/* Deep ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[320px] bg-emerald-600/20 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 right-0 w-[420px] h-[420px] bg-teal-600/20 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          {/* Main Headline (H1) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.18] tracking-tight mb-5 drop-shadow-sm max-w-4xl">
            Bank Aapko Personal Loan Nahi De Raha Hai?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">
              Sahi Bank &amp; Sahi Salah Payein!
            </span>
          </h1>

          {/* Sub-Headline */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium max-w-3xl leading-relaxed mb-8">
            Chahe aapki loan file kisi bank se reject ho gayi ho, CIBIL score thoda kam ho, ya aapko emergency mein turant paison ki zaroorat ho—Bhardwaj Financial Services par hum aapki salary aur profile ke hisaab se sahi bank chunte hain, bina kisi hidden charge ke.
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
              <span>Zero Upfront Fees • 100% Free Consultation</span>
            </div>
          </div>

          {/* 3 Key Highlights (Cards) */}
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

            {/* Card 2: Starting Interest Rate */}
            <div className="flex-1 w-full flex flex-col items-center text-center px-4 pt-6 sm:pt-0">
              <div className="flex items-center gap-2 mb-2 text-emerald-300">
                <Percent className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Starting Interest Rate</span>
              </div>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                10.50% p.a.*
              </span>
              <span className="text-[11px] text-slate-400 mt-1 font-medium">50+ Top Banks &amp; NBFC Partners</span>
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

      {/* 2. WHY CHOOSE BHARDWAJ FINANCIAL SERVICES? (CLEAN & MINIMAL 4 CARDS) */}
      <section className="py-20 bg-slate-50 dark:bg-emerald-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              Har Bank ke Rules Alag Hote Hain —{" "}
              <span className="text-emerald-700 dark:text-emerald-400">Hum Aapke Liye Sahi Bank Chunte Hain</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
              Agar ek bank ne loan mana kiya hai toh nirash na hon. BFS expert team aapki profile evaluate karke right bank mein application file karti hai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Card 1: Rejected File Specialist */}
            <div className="bg-white dark:bg-emerald-900/30 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800/80 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-400 transition-all">
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                01 • Solution
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Rejected File Specialist
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Agar aapka loan pehle reject ho chuka hai, toh baar-baar apply karke CIBIL aur kharab na karein. Hum pehle aapki profile check karke wahi bank suggest karte hain jahan approval ke chances sabse zyada hon.
              </p>
            </div>

            {/* Card 2: 100% Transparent Process */}
            <div className="bg-white dark:bg-emerald-900/30 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800/80 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-400 transition-all">
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                02 • Transparency
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                100% Transparent Process
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Loan sanction hone se pehle aapko interest rate, processing fee aur EMI ki poori jankari saaf-saaf batai jaati hai—koi chhupa hua kharcha nahi.
              </p>
            </div>

            {/* Card 3: Credit Card & Multiple EMIs Consolidation */}
            <div className="bg-white dark:bg-emerald-900/30 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800/80 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-400 transition-all">
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                03 • Cost Saving
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Credit Card &amp; Multiple EMIs Consolidation
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                3–4 alag-alag chhote loans aur 36% interest wale credit card bill ko ek kam byaj wale Personal Loan mein badlein aur har mahine apni bachat badhayein.
              </p>
            </div>

            {/* Card 4: Local Office Support */}
            <div className="bg-white dark:bg-emerald-900/30 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800/80 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-400 transition-all">
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                04 • Physical Presence
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Local Office Support
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Online farzi apps se bachein. Aap hamare Sanjay Place, Agra office ya Mathura, Noida, Gurgaon branches mein aakar face-to-face salah le sakte hain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEDICATED PERSONAL LOAN EMI CALCULATOR */}
      <section className="py-20 bg-slate-100 dark:bg-emerald-900/40 border-y border-slate-200 dark:border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3">
              Calculate Your Monthly EMI &amp; Interest
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Apni zaroorat ke anusaar monthly EMI aur kul byaj estimate karein (Starting from 10.50%* p.a.).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Calculator Sliders (Left 7 Cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-emerald-950 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-emerald-800 shadow-sm space-y-8">
              {/* Slider 1: Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Loan Amount
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

              {/* Slider 2: Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Interest Rate (% p.a.)
                  </label>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {calcRate.toFixed(2)}%*
                  </span>
                </div>
                <input
                  type="range"
                  min="10.50"
                  max="24.00"
                  step="0.25"
                  value={calcRate}
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>10.50% (Lowest)</span>
                  <span>15.00% (Avg)</span>
                  <span>24.00% (NBFC Max)</span>
                </div>
              </div>

              {/* Slider 3: Loan Tenure */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Tenure (Years)
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
            </div>

            {/* Calculation Output Card (Right 5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white p-7 sm:p-8 rounded-3xl border border-emerald-700/40 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-emerald-300 uppercase tracking-widest font-bold mb-4">
                  <span>Estimated Repayment</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                    Instant Quote
                  </span>
                </div>

                <div className="mb-6">
                  <div className="text-xs text-slate-400">Estimated Monthly EMI</div>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                    ₹{monthlyEmi.toLocaleString("en-IN")}
                    <span className="text-xs font-normal text-slate-400"> / month</span>
                  </div>
                </div>

                <div className="space-y-3 py-4 border-y border-emerald-800/60 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Principal Amount</span>
                    <span className="font-bold text-white">₹{calcAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total Interest Outflow</span>
                    <span className="font-bold text-emerald-300">₹{totalInterest.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total Payable ({totalMonths} Mos)</span>
                    <span className="font-bold text-white">₹{totalPayable.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Partner Bank Benchmark Strip */}
                <div className="mt-5 pt-1">
                  <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold mb-2">
                    Live Partner Rates (Agra, Mathura &amp; NCR):
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>• HDFC Bank Personal Loan</span>
                      <span className="font-semibold text-emerald-300">From 10.50%*</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• ICICI Bank Quick Disbursal</span>
                      <span className="font-semibold text-emerald-300">From 10.65%*</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Axis Bank 24h Personal Loan</span>
                      <span className="font-semibold text-emerald-300">From 10.75%*</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• SBI Xpress Credit</span>
                      <span className="font-semibold text-emerald-300">From 11.00%*</span>
                    </div>
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
                  *Indicative EMI. Final terms depend on lender credit appraisal.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ELIGIBILITY CRITERIA */}
      <section className="py-20 bg-white dark:bg-emerald-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3">
              Personal Loan Eligibility (Salaried &amp; Self-Employed)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Chahe aap naukri karte hon ya vyapar, check karein standard eligibility requirements:
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
                <Briefcase className="w-4 h-4" /> For Salaried Employees (Naukri Pesha)
              </button>
              <button
                onClick={() => setActiveTab("self-employed")}
                className={`px-6 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === "self-employed"
                    ? "bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Building2 className="w-4 h-4" /> For Self-Employed / Business Owners
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
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Current company mein 6M aur total 1 saal ka anubhav</p>
                </div>

                <div className="p-5 bg-white dark:bg-emerald-950/70 rounded-2xl border border-slate-200/80 dark:border-emerald-800">
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                    04 • Credit Score
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">CIBIL 700+</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">650–699 walon ke liye special NBFC options uplabdh</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-white dark:bg-emerald-950/70 rounded-2xl border border-slate-200/80 dark:border-emerald-800">
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                    01 • Age
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">23 se 65 saal</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Business owner / partner aayu criteria</p>
                </div>

                <div className="p-5 bg-white dark:bg-emerald-950/70 rounded-2xl border border-slate-200/80 dark:border-emerald-800">
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                    02 • Business Vintage
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Kam se kam 2 saal</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Purana business, shop, ya firm operation</p>
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

      {/* 5. REQUIRED DOCUMENTS */}
      <section className="py-20 bg-slate-50 dark:bg-emerald-900/30 border-t border-slate-200 dark:border-emerald-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3">
              Required Documents (Kam se Kam Kagazat)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Tez processing ke liye bas ye basic digital documents prepare rakhein:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. KYC Documents */}
            <div className="bg-white dark:bg-emerald-950/80 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm">
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                Part A
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                KYC Documents (Sabhi ke Liye)
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

            {/* 2. Income Proof (Salaried) */}
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

            {/* 3. Income Proof (Self-Employed) */}
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
                  <span>Pichhle 1 saal ka Bank Statement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>ITR (Pichhle 1–2 saal with Computation Sheet)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Business Proof (GST / Udyam / Registration)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS (FAQS) */}
      <section className="py-20 bg-white dark:bg-emerald-950 border-t border-slate-200 dark:border-emerald-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Personal loan se jude aapke ahem sawalon ke sahi aur satik jawab:
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

      {/* 7. BOTTOM CTA BANNER (PAGE KE SABSE NICHE) */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-800 via-emerald-900 to-[#022c22] text-white overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-5 leading-tight tracking-tight">
            Apni Free Personal Loan Eligibility Check Karein{" "}
            <span className="text-emerald-300 block sm:inline">(Bina CIBIL Score Kharab Kiye)</span>
          </h2>

          <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Abhi form bharein—hamare loan advisor aapko 10 minute ke andar call karke sahi bank aur EMI ki jankari denge.
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
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Zero File Charges
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Doorstep Document Pickup
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> 50+ Bank &amp; NBFC Tie-ups
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
