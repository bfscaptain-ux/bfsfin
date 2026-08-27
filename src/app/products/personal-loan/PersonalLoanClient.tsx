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
  Briefcase,
  Heart
} from "lucide-react";

export default function PersonalLoanClient({ heroImageUrl }: { heroImageUrl?: string }) {
  const [activeTab, setActiveTab] = useState<'salaried' | 'self-employed'>('salaried');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-900 selection:text-white transition-colors duration-300">
      <Header />

      {/* 1. PRODUCT HERO */}
      <section className="relative bg-white dark:bg-emerald-950 border-b border-slate-200 dark:border-emerald-800 pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 dark:bg-emerald-900/10 -skew-x-12 translate-x-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-widest">
                <Heart className="w-4 h-4" /> Core Product
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                Achieve Your <span className="text-emerald-700 dark:text-emerald-500">Personal Goals.</span>
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-lg leading-relaxed">
                Fast, unsecured personal loans for medical emergencies, weddings, travel, or debt consolidation with zero collateral required.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-slate-50 dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 px-6 py-4 rounded-xl flex flex-col items-start min-w-[140px]">
                  <Percent className="w-6 h-6 text-emerald-600 dark:text-emerald-500 mb-2" />
                  <span className="text-2xl font-black text-slate-900 dark:text-white">10.50%</span>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Starting Rate</span>
                </div>
                <div className="bg-slate-50 dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 px-6 py-4 rounded-xl flex flex-col items-start min-w-[140px]">
                  <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-500 mb-2" />
                  <span className="text-2xl font-black text-slate-900 dark:text-white">5 Yrs</span>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Max Tenure</span>
                </div>
                <div className="bg-slate-50 dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 px-6 py-4 rounded-xl flex flex-col items-start min-w-[140px]">
                  <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-500 mb-2" />
                  <span className="text-2xl font-black text-slate-900 dark:text-white">₹50 Lakhs</span>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Max Amount</span>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/appointment"
                  className="inline-flex px-8 py-4 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-sm rounded-lg transition-colors items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25"
                >
                  Apply Online Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl hidden lg:block">
              <img 
                src={heroImageUrl || "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
                alt="Happy individual planning goals" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
            </div>
          </div>
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
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">21 years to 60 years (at the time of loan maturity).</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <span className="font-bold text-slate-700 dark:text-slate-300">02</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Income Stability</h4>
                    {activeTab === 'salaried' ? (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Minimum ₹15,000/month net in-hand salary (varies by city).</p>
                    ) : (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Minimum ₹2.5 Lakhs ITR with 2+ years of business vintage.</p>
                    )}
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <span className="font-bold text-slate-700 dark:text-slate-300">03</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Credit Score (CIBIL)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">750+ is mandatory for unsecured personal loans. No past defaults.</p>
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
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> PAN Card, Aadhaar Card, Passport Size Photo
                  </p>
                </div>
                
                <div className="p-4 bg-white dark:bg-emerald-950 rounded-xl border border-slate-200 dark:border-emerald-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">2. Financial Documents</h4>
                  {activeTab === 'salaried' ? (
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Last 3 months Salary Slips</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Last 6 months Bank Statement</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Employment ID Card</li>
                    </ul>
                  ) : (
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ITR with Computation (Last 2 years)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Current Account Statement (Last 6 months)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Business Proof (GST/Udyam)</li>
                    </ul>
                  )}
                </div>

                <div className="p-4 bg-white dark:bg-emerald-950 rounded-xl border border-slate-200 dark:border-emerald-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">3. E-Mandate Setup</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Netbanking / Debit Card for NACH setup
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
          <h2 className="text-3xl font-black mb-12">Why Choose BFS for Personal Loans?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-emerald-200" />
              </div>
              <h3 className="text-xl font-bold">24-Hour Disbursal</h3>
              <p className="text-emerald-100 text-sm">Once approved, funds hit your bank account within 24 hours.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8 text-emerald-200" />
              </div>
              <h3 className="text-xl font-bold">Zero Collateral</h3>
              <p className="text-emerald-100 text-sm">No guarantors or security required. Purely based on your financial strength.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                <Percent className="w-8 h-8 text-emerald-200" />
              </div>
              <h3 className="text-xl font-bold">Best Rate Matching</h3>
              <p className="text-emerald-100 text-sm">We scan offers from 50+ banking partners to get you the lowest interest rate.</p>
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
