"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText, Database, Server, Mail, ChevronRight, Fingerprint, Activity, Clock, Cookie, ArrowRight, ArrowLeft } from 'lucide-react';

const SECTIONS = [
  { id: "overview", title: "1. Overview & Commitment" },
  { id: "collection", title: "2. Information We Collect" },
  { id: "usage", title: "3. How We Use Data" },
  { id: "sharing", title: "4. Information Sharing" },
  { id: "security", title: "5. Bank-Grade Security" },
  { id: "cookies", title: "6. Cookies & Tracking" },
  { id: "retention", title: "7. Data Retention" },
  { id: "rights", title: "8. Your Privacy Rights" },
  { id: "contact", title: "9. Grievance Desk" },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  // Intersection Observer for highlighting TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-emerald-500/30">
      
      {/* 🚀 BEAUTIFUL SHORT HERO SECTION */}
      <section className="relative pt-12 pb-8 lg:pt-16 lg:pb-10 overflow-hidden bg-slate-900 border-b border-white/10">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-10000" />
          <div className="absolute bottom-[0%] -left-[10%] w-[40%] h-[50%] bg-teal-500/10 rounded-full blur-[80px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.05]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Top Navigation & Logo Area */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <Link href="/" className="group flex items-center gap-3">
                <img src="/logo.png" alt="BFS Logo" className="h-10 w-auto object-contain drop-shadow-sm brightness-0 invert group-hover:scale-105 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-white font-black text-base sm:text-lg leading-none tracking-wider">Bhardwaj Financial Services</span>
                  <span className="text-emerald-400/90 text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5">Privacy Center</span>
                </div>
              </Link>
              
              <Link 
                href="/" 
                className="group relative hidden sm:inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 rounded-full backdrop-blur-md transition-all duration-300"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Home</span>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-bold mb-3 border border-emerald-500/20 backdrop-blur-md">
                <ShieldCheck className="w-3 h-3" />
                <span>Updated: Sep 2026</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2 leading-tight">
                Your Privacy is our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Priority.</span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-2xl font-light">
                Employing bank-grade encryption and RBI-compliant policies to ensure your data remains strictly confidential.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🚀 DETAILED CONTENT SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Table of Contents */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-6">Contents</h3>
              <nav className="space-y-1">
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Privacy Policy Document */}
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 lg:p-16 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/60 dark:border-slate-800/60">
            
            <div className="prose prose-slate dark:prose-invert prose-emerald max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300">
              
              <div id="overview" className="scroll-mt-32">
                <h2 className="flex items-center gap-3 mt-0">
                  <Fingerprint className="w-7 h-7 text-emerald-500" />
                  1. Overview & Commitment
                </h2>
                <p className="text-lg font-medium text-slate-800 dark:text-slate-200">
                  This Privacy Policy details how Bhardwaj Financial Services (&quot;BFS&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) securely collects, utilizes, and shares your personal and financial information across our website, mobile applications, and digital platforms.
                </p>
                <p>
                  As a leading financial advisory in Agra, partnered with major institutions like PNB, HDFC, and IDBI, we adhere strictly to the guidelines set forth by the Reserve Bank of India (RBI) and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                </p>
                
                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 not-prose">
                  {[
                    { icon: Lock, title: "AES-256 Encryption", desc: "Military-grade data protection." },
                    { icon: ShieldCheck, title: "RBI Compliant", desc: "Strict adherence to banking laws." },
                    { icon: Eye, title: "No Data Selling", desc: "Your data is never sold to marketing agencies." }
                  ].map((feat, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                      <feat.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-3" />
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{feat.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 my-10" />

              <div id="collection" className="scroll-mt-32">
                <h2 className="flex items-center gap-3">
                  <Database className="w-7 h-7 text-emerald-500" />
                  2. Information We Collect
                </h2>
                <p>
                  To seamlessly process your loan applications, ITR filings, and MSME registrations, we require certain necessary data. We practice <strong>Data Minimization</strong>—collecting only what is absolutely required.
                </p>
                <ul className="space-y-4">
                  <li>
                    <strong>Personally Identifiable Information (PII):</strong> Full name, date of birth, residential address, email address, and mobile number.
                  </li>
                  <li>
                    <strong>Financial & KYC Data:</strong> PAN card details, Aadhaar number, income bracket, employment status, credit score requirements, and banking history (only when processing loan approvals).
                  </li>
                  <li>
                    <strong>Technical & Usage Data:</strong> IP address, geolocation (to assign the nearest relationship manager), browser type, device information, and interaction metrics on our website.
                  </li>
                </ul>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 my-10" />

              <div id="usage" className="scroll-mt-32">
                <h2 className="flex items-center gap-3">
                  <Activity className="w-7 h-7 text-emerald-500" />
                  3. How We Use Your Data
                </h2>
                <p>
                  Your information is processed in highly secure, restricted environments strictly for business and regulatory purposes:
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800/20 not-prose mb-6">
                  <ul className="space-y-3">
                    {["To underwrite and process home, business, or personal loan applications.",
                      "To compute and file accurate Income Tax Returns (ITR) via official portals.",
                      "To verify identities for Anti-Money Laundering (AML) and KYC compliance.",
                      "To provide instant customer support via WhatsApp, Email, or Telephone.",
                      "To send OTPs (One Time Passwords) for secure login and verification."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckIcon className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 my-10" />

              <div id="sharing" className="scroll-mt-32">
                <h2 className="flex items-center gap-3">
                  <Server className="w-7 h-7 text-emerald-500" />
                  4. Information Sharing & Third Parties
                </h2>
                <p>
                  BFS acts as a bridge between you and the financial ecosystem. We <strong>do not sell, rent, or trade</strong> your personal information. We only share data with authorized entities:
                </p>
                <ul>
                  <li><strong>Banking Partners:</strong> Authorized partner banks (PNB, IDBI, HDFC, Central Bank) solely for the purpose of credit assessment and loan disbursement.</li>
                  <li><strong>Government Authorities:</strong> The Income Tax Department, MSME Ministry, and regulatory bodies (RBI, SEBI) when mandated by law or for official filings on your behalf.</li>
                  <li><strong>Technology Providers:</strong> Vercel (Hosting), Google (Analytics & Workspace), and authorized SMS gateways. These vendors are bound by strict Non-Disclosure Agreements (NDAs).</li>
                </ul>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 my-10" />

              <div id="security" className="scroll-mt-32">
                <h2 className="flex items-center gap-3">
                  <Lock className="w-7 h-7 text-emerald-500" />
                  5. Bank-Grade Security Measures
                </h2>
                <p>
                  We deploy cutting-edge security architecture to thwart unauthorized access, alteration, disclosure, or destruction of your data:
                </p>
                <ul>
                  <li><strong>Transit Encryption:</strong> All data transmitted between your browser and our servers is secured via TLS 1.3 (HTTPS).</li>
                  <li><strong>Rest Encryption:</strong> Sensitive KYC documents and PAN data are encrypted at rest using AES-256 bit encryption.</li>
                  <li><strong>Access Control:</strong> Strict Role-Based Access Control (RBAC) ensures only authorized senior managers can view your financial data.</li>
                </ul>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 my-10" />

              <div id="cookies" className="scroll-mt-32">
                <h2 className="flex items-center gap-3">
                  <Cookie className="w-7 h-7 text-emerald-500" />
                  6. Cookies & Tracking Technologies
                </h2>
                <p>
                  We utilize cookies and similar tracking technologies to elevate your browsing experience and analyze our website traffic.
                </p>
                <p>
                  When you engage with our <strong>Global Cookie Consent Banner</strong>, your explicit preference is stored locally on your device. We use Google Analytics and Meta Pixel to understand traffic patterns and optimize our digital marketing. If you choose to accept cookies, these platforms may collect anonymized data. You can clear your cookies via your browser settings at any time.
                </p>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 my-10" />

              <div id="retention" className="scroll-mt-32">
                <h2 className="flex items-center gap-3">
                  <Clock className="w-7 h-7 text-emerald-500" />
                  7. Data Retention Policy
                </h2>
                <p>
                  We retain your personal and financial information only for as long as is necessary for the purposes set out in this Privacy Policy, or as required by Indian banking and tax laws (typically up to 8 years for tax records and loan agreements). Once the retention period expires, your data is securely purged or anonymized.
                </p>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 my-10" />

              <div id="rights" className="scroll-mt-32">
                <h2 className="flex items-center gap-3">
                  <ShieldCheck className="w-7 h-7 text-emerald-500" />
                  8. Your Privacy Rights
                </h2>
                <p>
                  You possess ultimate control over your data. Under applicable data protection frameworks, you have the right to:
                </p>
                <ul>
                  <li>Request access to the personal data we hold about you.</li>
                  <li>Request correction of inaccurate or incomplete information.</li>
                  <li>Request erasure/deletion of your data (subject to RBI/legal retention mandates).</li>
                  <li>Withdraw your consent at any time for non-essential processing.</li>
                </ul>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 my-10" />

              <div id="contact" className="scroll-mt-32">
                <h2 className="flex items-center gap-3">
                  <Mail className="w-7 h-7 text-emerald-500" />
                  9. Grievance & Compliance Desk
                </h2>
                <p>
                  If you have concerns about your privacy or wish to exercise your rights, please reach out to our dedicated Grievance Officer immediately.
                </p>
                
                {/* Advanced Contact Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-800/40 mt-8 shadow-sm group hover:shadow-md transition-all duration-300 not-prose">
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-teal-500/10 blur-xl group-hover:bg-teal-500/20 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center border border-emerald-100 dark:border-slate-700">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">Bhardwaj Financial Services</h4>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">Data Protection Officer (DPO)</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 mt-4 ml-1">
                      Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Place, Agra, UP - 282002
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 ml-1">
                      <a 
                        href="mailto:info@bfsfin.com" 
                        className="group/link flex items-center gap-3 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors bg-white dark:bg-slate-800/80 px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700/50"
                      >
                        <div className="bg-emerald-100 dark:bg-emerald-900/40 p-1.5 rounded-lg group-hover/link:scale-110 transition-transform">
                          <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="font-semibold text-sm">info@bfsfin.com</span>
                      </a>
                      
                      <a 
                        href="tel:+917900979001" 
                        className="group/link flex items-center gap-3 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors bg-white dark:bg-slate-800/80 px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700/50"
                      >
                        <div className="bg-emerald-100 dark:bg-emerald-900/40 p-1.5 rounded-lg group-hover/link:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-sm">+91 7900-979-001</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
