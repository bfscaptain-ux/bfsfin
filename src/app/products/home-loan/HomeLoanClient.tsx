"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EMICalculator from "@/components/EMICalculator";
import FloatingSupport from "@/components/FloatingSupport";
import {
  Building2,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  ShieldCheck,
  Percent,
  Wallet,
  Briefcase
} from "lucide-react";

export default function HomeLoanClient({ heroImageUrl, startingRate }: { heroImageUrl?: string; startingRate?: string }) {
  const [activeTab, setActiveTab] = useState<'salaried' | 'self-employed'>('salaried');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-900 selection:text-white transition-colors duration-300">
      <Header />

      {/* 1. ULTRA PREMIUM DARK HERO */}
      <section className="relative bg-[#020617] pt-16 pb-28 lg:pt-20 lg:pb-36 overflow-hidden">
        {/* Dynamic Background Image overlay */}
        {heroImageUrl && (
          <div className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-normal" style={{ backgroundImage: `url('${heroImageUrl}')` }}></div>
        )}
        {/* Dark overlay to ensure white text readability */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
        {/* Deep, rich background gradients & grid */}
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dbx2j0g8j/image/upload/v1700000000/grid-pattern_qwe.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-300 uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)] mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
            Core Product
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4 drop-shadow-sm">
            Unlock Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-400 to-emerald-600">
              Dream Home.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-400 font-medium max-w-2xl leading-relaxed mb-8">
            Get up to <strong className="text-white">90% financing</strong> for your new flat, independent house, or self-construction with India's most trusted loan consultancy.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
            <Link
              href="/appointment"
              className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-500 hover:to-emerald-500 text-white font-bold px-8 py-3 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative z-10 text-[15px] tracking-wide">Check Your Eligibility</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium px-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Zero hidden fees
            </div>
          </div>

          {/* Floating Glassmorphism Stats Bar */}
          <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            
            <div className="flex-1 w-full flex flex-col items-center text-center px-4 pt-4 sm:pt-0">
              <div className="flex items-center gap-2 mb-2 text-emerald-300">
                <Percent className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Starting Rate</span>
              </div>
              <span className="text-3xl sm:text-4xl font-black text-white">{startingRate || "6.50"}%</span>
            </div>

            <div className="flex-1 w-full flex flex-col items-center text-center px-4 pt-8 sm:pt-0">
              <div className="flex items-center gap-2 mb-2 text-emerald-300">
                <Clock className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Max Tenure</span>
              </div>
              <span className="text-3xl sm:text-4xl font-black text-white">30 Yrs</span>
            </div>

            <div className="flex-1 w-full flex flex-col items-center text-center px-4 pt-8 sm:pt-0 pb-4 sm:pb-0">
              <div className="flex items-center gap-2 mb-2 text-purple-300">
                <Wallet className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Max Amount</span>
              </div>
              <span className="text-3xl sm:text-4xl font-black text-white">₹5 Cr+</span>
            </div>

          </div>
        </div>

        {/* Custom SVG Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-emerald-950" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. EMI CALCULATOR */}
      <section className="py-20 bg-slate-50 dark:bg-emerald-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Plan Your Repayment</h2>
            <p className="text-slate-600 dark:text-slate-400">Use our calculator to estimate your monthly EMI and total interest outflow.</p>
          </div>
          <EMICalculator />
        </div>
      </section>

      {/* 3. ELIGIBILITY CRITERIA & DOCUMENTS */}
      <section className="py-20 bg-white dark:bg-emerald-950 border-t border-slate-200 dark:border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Eligibility & Documents</h2>
            <p className="text-slate-600 dark:text-slate-400">We maintain complete transparency. Check what you need before applying.</p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-slate-100 dark:bg-emerald-900 p-1 rounded-xl border border-slate-200 dark:border-emerald-800">
              <button 
                onClick={() => setActiveTab('salaried')}
                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'salaried' ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Salaried Employees
              </button>
              <button 
                onClick={() => setActiveTab('self-employed')}
                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'self-employed' ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Self-Employed / Business
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Eligibility Block */}
            <div className="bg-slate-50 dark:bg-emerald-900 rounded-2xl p-8 border border-slate-200 dark:border-emerald-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" /> Minimum Eligibility
              </h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <span className="font-bold text-slate-700 dark:text-slate-300">01</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Age Requirement</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">21 years to 60 years (at the time of maturity).</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <span className="font-bold text-slate-700 dark:text-slate-300">02</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Income Stability</h4>
                    {activeTab === 'salaried' ? (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Minimum ₹25,000/month with 2+ years of total work experience.</p>
                    ) : (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Minimum ₹3 Lakhs ITR with 3+ years of business vintage.</p>
                    )}
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <span className="font-bold text-slate-700 dark:text-slate-300">03</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Credit Score (CIBIL)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">750+ for best rates. 650+ considered on a case-by-case basis.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Documents Block */}
            <div className="bg-slate-50 dark:bg-emerald-900 rounded-2xl p-8 border border-slate-200 dark:border-emerald-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-emerald-600" /> Required Documents
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-emerald-950 rounded-xl border border-slate-200 dark:border-emerald-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">1. Basic KYC</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> PAN Card, Aadhaar Card, Passport Size Photos
                  </p>
                </div>
                
                <div className="p-4 bg-white dark:bg-emerald-950 rounded-xl border border-slate-200 dark:border-emerald-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">2. Financial Documents</h4>
                  {activeTab === 'salaried' ? (
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Last 3 months Salary Slips</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Last 6 months Bank Statement</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Form 16 (Latest 2 years)</li>
                    </ul>
                  ) : (
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ITR with Computation (Last 3 years)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> CA Certified Balance Sheet</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Current Account Statement (Last 12 months)</li>
                    </ul>
                  )}
                </div>

                <div className="p-4 bg-white dark:bg-emerald-950 rounded-xl border border-slate-200 dark:border-emerald-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">3. Property Documents</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Agreement to Sell / Chain Deeds / Approved Map
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE BFS */}
      <section className="py-20 bg-emerald-700 dark:bg-emerald-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-12">Why Choose BFS for Your Home Loan?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                <Briefcase className="w-8 h-8 text-emerald-200" />
              </div>
              <h3 className="text-xl font-bold">Doorstep Service</h3>
              <p className="text-emerald-100 text-sm">We collect documents from your home or office. Zero branch visits required.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8 text-emerald-200" />
              </div>
              <h3 className="text-xl font-bold">Legal Vetting</h3>
              <p className="text-emerald-100 text-sm">Our founder's legal team thoroughly vets your property papers to ensure 100% safety.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                <Wallet className="w-8 h-8 text-emerald-200" />
              </div>
              <h3 className="text-xl font-bold">No Hidden Fees</h3>
              <p className="text-emerald-100 text-sm">We do not charge any hidden brokerage. You only pay the official bank processing fee.</p>
            </div>
          </div>
          
          <div className="mt-16">
            <Link href="/appointment" className="inline-flex px-8 py-4 bg-white text-emerald-800 hover:bg-slate-100 font-bold text-sm rounded-lg transition-colors">
              Start Your Application
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
