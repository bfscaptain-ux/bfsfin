"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ShieldCheck, PhoneCall, ChevronDown, ChevronRight, Menu, X, ArrowRight, 
  Home, TrendingUp, Calculator, Building, Landmark, BadgePercent,
  FileText, Users, Mail
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [activeProductTab, setActiveProductTab] = useState("finance");
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

  const toggleAccordion = (menu: string) => {
    setOpenAccordion(openAccordion === menu ? null : menu);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenAccordion(null);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-emerald-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-emerald-800/80 shadow-sm transition-colors duration-300">
        {/* PREMIUM TOP BANNER - Dark Corporate Look */}
        <div className="hidden md:flex bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 px-4 py-2.5 text-[11px] font-medium tracking-wide text-emerald-100/70 justify-between items-center border-b border-emerald-800/50">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-emerald-300 drop-shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" /> 
                <span className="font-semibold">RBI Registered & Compliant</span>
              </span>
              <span className="text-emerald-800">|</span>
              <span className="flex items-center gap-1.5 text-emerald-50 drop-shadow-sm">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                <span className="font-semibold">Fastest 5-Day Home Loan Approvals</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-emerald-100/80">
                <span>Talk to a Loan Expert:</span>
                <a href="tel:7900979001" className="flex items-center gap-1.5 text-white hover:text-emerald-300 transition-colors drop-shadow-sm">
                  <PhoneCall className="w-3 h-3 text-emerald-400" /> 
                  <span className="font-bold text-[12px]">7900-979-001</span>
                </a>
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION BAR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand Name */}
            <Link href="/" className="flex items-center gap-2 group shrink-0 pr-8">
              <img src="/logo.png" alt="BFS Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="flex flex-col justify-center">
                <span className="text-xl font-black text-slate-900 dark:text-white leading-none tracking-tight">Bhardwaj Finance</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase mt-1">Services</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden xl:flex items-center gap-1 lg:gap-2 text-[14px] font-bold text-slate-700 dark:text-slate-200">
              <Link href="/" className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">Home</Link>

              {/* Products Mega Menu */}
              <div className="relative group py-6" onMouseLeave={() => setActiveProductTab('finance')}>
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
                  <span>Products</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300 opacity-70" />
                </button>
                
                {/* Unified Mega Menu Box */}
                <style dangerouslySetInnerHTML={{__html: `
  @keyframes live-glow {
    0%, 100% { box-shadow: 0 0 50px -10px rgba(16,185,129,0.2); transform: translateX(-50%); }
    50% { box-shadow: 0 0 150px 15px rgba(16,185,129,0.45); transform: translateX(-50%); }
  }
  .animate-live-glow {
    animation: live-glow 3.5s ease-in-out infinite;
  }
`}} />
                <div className="absolute left-1/2 top-[70px] hidden group-hover:flex w-[950px] min-h-[420px] bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-emerald-800 rounded-2xl ring-1 ring-slate-200 dark:ring-emerald-800 overflow-hidden z-[100] animate-live-glow">
                  
                  {/* Left Sidebar Tabs */}
                  <div className="w-[280px] shrink-0 bg-slate-50/80 dark:bg-emerald-950/20 border-r border-slate-100 dark:border-emerald-800/50 p-6 flex flex-col gap-3">
                    <div className="text-xs font-black tracking-widest text-slate-400 uppercase mb-2 px-2">Select Category</div>
                    
                    <button 
                      onMouseEnter={() => setActiveProductTab('finance')}
                      className={`w-full text-left px-5 py-4 rounded-xl font-bold transition-all flex items-center justify-between ${activeProductTab === 'finance' ? 'bg-white dark:bg-[#0f172a] shadow-md text-emerald-600 dark:text-emerald-400 border border-slate-100 dark:border-emerald-800' : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-emerald-900/30'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeProductTab === 'finance' ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-slate-100 dark:bg-slate-800/50'}`}>
                          <Landmark className="w-5 h-5" />
                        </div>
                        Finance Services
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeProductTab === 'finance' ? 'translate-x-1' : 'opacity-0 -translate-x-2'}`} />
                    </button>
                    
                    <button 
                      onMouseEnter={() => setActiveProductTab('insurance')}
                      className={`w-full text-left px-5 py-4 rounded-xl font-bold transition-all flex items-center justify-between ${activeProductTab === 'insurance' ? 'bg-white dark:bg-[#0f172a] shadow-md text-emerald-600 dark:text-emerald-400 border border-slate-100 dark:border-emerald-800' : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-emerald-900/30'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeProductTab === 'insurance' ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-slate-100 dark:bg-slate-800/50'}`}>
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        Insurance Services
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeProductTab === 'insurance' ? 'translate-x-1' : 'opacity-0 -translate-x-2'}`} />
                    </button>
                    
                    {/* Bottom Promo Banner in Sidebar */}
                    <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-20"><BadgePercent className="w-12 h-12" /></div>
                      <div className="font-black text-sm relative z-10">Lowest ROI Guaranteed</div>
                      <div className="text-xs text-emerald-100 mt-1 relative z-10">Compare 15+ banks in 2 mins.</div>
                    </div>
                  </div>

                  {/* Right Content Area */}
                  <div className="flex-1 relative bg-white dark:bg-[#0f172a]">
                    
                    {/* Finance Content Tab */}
                    <div className={`absolute inset-0 p-10 transition-all duration-300 ${activeProductTab === 'finance' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-4 pointer-events-none'}`}>
                      <div className="grid grid-cols-3 gap-8 text-left">
                        {/* Column 1 */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <Home className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Housing Loans</h4>
                          </div>
                          <Link href="/products/home-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Home Loan</Link>
                          <Link href="/products/balance-transfer" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Balance Transfer</Link>
                          <Link href="/products/top-up-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Top-Up Loan</Link>
                          <Link href="/products/plot-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Plot / Land Purchase</Link>
                          <Link href="/products/construction-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Construction Loan</Link>
                        </div>
                        {/* Column 2 */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <Building className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Property & Retail</h4>
                          </div>
                          <Link href="/products/loan-against-property" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Loan Against Property</Link>
                          <Link href="/products/home-renovation" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Home Renovation</Link>
                          <Link href="/products/nri-home-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">NRI Home Loan</Link>
                          <Link href="/products/personal-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Personal Loan</Link>
                          <Link href="/products/education-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Education Loan</Link>
                        </div>
                        {/* Column 3 */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <Landmark className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Business & Auto</h4>
                          </div>
                          <Link href="/products/business-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Business / MSME Loan</Link>
                          <Link href="/products/working-capital" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Working Capital</Link>
                          <Link href="/products/loan-against-securities" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Loan Against Securities</Link>
                          <Link href="/products/car-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Car Loan</Link>
                          <Link href="/products/gold-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Gold Loan</Link>
                        </div>
                      </div>
                    </div>

                    {/* Insurance Content Tab */}
                    <div className={`absolute inset-0 p-10 transition-all duration-300 ${activeProductTab === 'insurance' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-4 pointer-events-none'}`}>
                      <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-5 mb-8 flex items-center justify-between border border-emerald-100 dark:border-emerald-900/50">
                        <div>
                          <div className="font-black text-emerald-800 dark:text-emerald-400 text-xl">Insurance Vertical Launching Soon</div>
                          <div className="text-emerald-600 dark:text-emerald-500 text-sm mt-1 font-medium">We are bringing India's best insurance policies to Agra.</div>
                        </div>
                        <div className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">Coming 2026</div>
                      </div>
                      <div className="grid grid-cols-2 gap-10 text-left">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <Users className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Life & Health</h4>
                          </div>
                          <button onClick={() => setShowInsuranceModal(true)} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Term Life Insurance</button>
                          <button onClick={() => setShowInsuranceModal(true)} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Health Insurance</button>
                          <button onClick={() => setShowInsuranceModal(true)} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Family Floater Plans</button>
                          <button onClick={() => setShowInsuranceModal(true)} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Critical Illness Cover</button>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <ShieldCheck className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">General Insurance</h4>
                          </div>
                          <button onClick={() => setShowInsuranceModal(true)} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Comprehensive Car Insurance</button>
                          <button onClick={() => setShowInsuranceModal(true)} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Two Wheeler Insurance</button>
                          <button onClick={() => setShowInsuranceModal(true)} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Home Property Insurance</button>
                          <button onClick={() => setShowInsuranceModal(true)} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Business / Shop Insurance</button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Tools */}
              <div className="relative group py-6">
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
                  <span>Tools</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300 opacity-70" />
                </button>
                <div className="absolute left-0 top-[70px] hidden group-hover:block w-72 bg-white dark:bg-emerald-900 border border-slate-100 dark:border-emerald-800 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none p-3 z-50 text-left grid grid-cols-2 gap-1">
                  <div className="col-span-2 px-3 pb-2 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Financial Calculators</span>
                  </div>
                  <Link href="/calculator" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium transition text-[13px]">EMI Calc</Link>
                  <Link href="/eligibility" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium transition text-[13px]">Eligibility</Link>
                  <Link href="/tools/balance-transfer" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium transition text-[13px]">Balance Transfer</Link>
                  <Link href="/tools/prepayment" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium transition text-[13px]">Prepayment</Link>
                  <Link href="/tools/stamp-duty" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium transition text-[13px]">Stamp Duty</Link>
                  <Link href="/tools/tax-benefit" className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium transition text-[13px]">Tax Benefit</Link>
                </div>
              </div>

              {/* Resources */}
              <div className="relative group py-6">
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
                  <span>Resources</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300 opacity-70" />
                </button>
                <div className="absolute left-0 top-[70px] hidden group-hover:block w-64 bg-white dark:bg-emerald-900 border border-slate-100 dark:border-emerald-800 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none p-3 z-50 text-left">
                  <Link href="/blog" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 transition font-bold">
                    <FileText className="w-4 h-4 text-emerald-500" /> Blog & Articles
                  </Link>
                  <div className="my-1 border-t border-slate-100 dark:border-emerald-800" />
                  <Link href="/resources/documents" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Documents Required</Link>
                  <Link href="/resources/process" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Loan Process Guide</Link>
                  <Link href="/resources/credit-score" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Credit Score Guide</Link>
                  <Link href="/faq" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">FAQs</Link>
                </div>
              </div>

              {/* About Us */}
              <div className="relative group py-6">
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
                  <span>About Us</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300 opacity-70" />
                </button>
                <div className="absolute left-0 top-[70px] hidden group-hover:block w-56 bg-white dark:bg-emerald-900 border border-slate-100 dark:border-emerald-800 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none p-3 z-50 text-left">
                  <Link href="/about" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 transition font-bold">
                    <Users className="w-4 h-4 text-emerald-500" /> Our Story
                  </Link>
                  <div className="my-1 border-t border-slate-100 dark:border-emerald-800" />
                  <Link href="/about/founder" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Founder & Team</Link>
                  <Link href="/about/why-us" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Why Choose Us</Link>
                  <Link href="/about/certifications" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Trust & Certifications</Link>
                </div>
              </div>

              {/* Contact */}
              <div className="relative group py-6">
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
                  <span>Contact</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300 opacity-70" />
                </button>
                <div className="absolute right-0 top-[70px] hidden group-hover:block w-56 bg-white dark:bg-emerald-900 border border-slate-100 dark:border-emerald-800 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none p-3 z-50 text-left">
                  <Link href="/contact" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 transition font-bold">
                    <Mail className="w-4 h-4 text-emerald-500" /> Contact Support
                  </Link>
                  <div className="my-1 border-t border-slate-100 dark:border-emerald-800" />
                  <Link href="/contact/locations" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Office Locations</Link>
                  <Link href="/appointment" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Book Appointment</Link>
                </div>
              </div>
            </nav>

            {/* Premium Apply Action Button (Desktop Only) */}
            <div className="hidden xl:flex items-center shrink-0 pl-6 border-l border-slate-200 dark:border-emerald-800">
              <Link
                href="/apply"
                className="relative group inline-flex items-center justify-center gap-2 bg-emerald-600 dark:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 text-[14px]">Apply Now</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile Top Header (only shows Theme Toggle now, menu moved to bottom nav) */}
            <div className="flex items-center gap-2 xl:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="xl:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-[#0f172a] border-t border-slate-200 dark:border-emerald-800 z-[100] pb-safe flex justify-around items-center h-16 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] transition-colors duration-300">
        <Link href="/" onClick={closeMobileMenu} className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition">
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/rates" onClick={closeMobileMenu} className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition">
          <TrendingUp className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Rates</span>
        </Link>
        <Link href="/calculator" onClick={closeMobileMenu} className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition">
          <Calculator className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">EMI</span>
        </Link>
        <button onClick={() => setMobileMenuOpen(true)} className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition">
          <Menu className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Menu</span>
        </button>
      </div>

      {/* Mobile Bottom Sheet Menu (Accordions) */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-[110] flex flex-col justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-sm transition-opacity" onClick={closeMobileMenu}></div>
          
          {/* Sheet */}
          <div className="relative w-full bg-white dark:bg-[#0f172a] rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col transform transition-transform duration-300 animate-in slide-in-from-bottom">
            {/* Header of sheet */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-emerald-800 shrink-0">
              <h3 className="font-black text-lg text-slate-900 dark:text-white">Main Menu</h3>
              <button onClick={closeMobileMenu} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-red-500 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-4 py-4 space-y-1 pb-24">
              
              {/* Mobile Contact & Login (Moved from Top Banner) */}
              <div className="flex gap-2 mb-4">
                <a href="tel:7900979001" className="flex-1 flex flex-col items-center justify-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 py-3 rounded-xl border border-emerald-200 dark:border-emerald-800/30 hover:bg-emerald-100 transition-colors">
                  <PhoneCall className="w-5 h-5" />
                  <span className="text-xs font-bold">Call Us</span>
                </a>

              </div>
              
              {/* Mobile Products Accordion */}
              <div>
                <button onClick={() => toggleAccordion('products')} className="w-full flex items-center justify-between py-3 px-4 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <span>Products</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openAccordion === 'products' ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>
                {openAccordion === 'products' && (
                  <div className="pl-4 pr-4 py-2 space-y-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl mt-1 text-sm text-slate-600 dark:text-slate-300">
                    
                    {/* Finance Section */}
                    <div>
                      <div className="font-black text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg mb-2">Finance Services</div>
                      <div className="pl-4 space-y-2">
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-1">Housing</div>
                        <Link href="/products/home-loan" onClick={closeMobileMenu} className="block py-1">Home Loan</Link>
                        <Link href="/products/balance-transfer" onClick={closeMobileMenu} className="block py-1">Balance Transfer</Link>
                        <Link href="/products/top-up-loan" onClick={closeMobileMenu} className="block py-1">Top-Up Loan</Link>
                        <Link href="/products/plot-loan" onClick={closeMobileMenu} className="block py-1">Plot Loan</Link>
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700">Property & Retail</div>
                        <Link href="/products/loan-against-property" onClick={closeMobileMenu} className="block py-1">Loan Against Property</Link>
                        <Link href="/products/personal-loan" onClick={closeMobileMenu} className="block py-1">Personal Loan</Link>
                        <Link href="/products/education-loan" onClick={closeMobileMenu} className="block py-1">Education Loan</Link>
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700">Business & Auto</div>
                        <Link href="/products/business-loan" onClick={closeMobileMenu} className="block py-1">Business Loan</Link>
                        <Link href="/products/working-capital" onClick={closeMobileMenu} className="block py-1">Working Capital</Link>
                        <Link href="/products/car-loan" onClick={closeMobileMenu} className="block py-1">Car Loan</Link>
                      </div>
                    </div>

                    {/* Insurance Section */}
                    <div>
                      <div className="font-black text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg mb-2 flex items-center justify-between" onClick={() => setShowInsuranceModal(true)}>
                        <span>Insurance Services</span>
                        <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Coming Soon</span>
                      </div>
                      <div className="pl-4 space-y-2">
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-1">Life & Health</div>
                        <button onClick={() => setShowInsuranceModal(true)} className="block py-1 text-left w-full">Term Life Insurance</button>
                        <button onClick={() => setShowInsuranceModal(true)} className="block py-1 text-left w-full">Health Insurance</button>
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700">General</div>
                        <button onClick={() => setShowInsuranceModal(true)} className="block py-1 text-left w-full">Car Insurance</button>
                        <button onClick={() => setShowInsuranceModal(true)} className="block py-1 text-left w-full">Two Wheeler Insurance</button>
                        <button onClick={() => setShowInsuranceModal(true)} className="block py-1 text-left w-full">Home Insurance</button>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Mobile Tools Accordion */}
              <div>
                <button onClick={() => toggleAccordion('tools')} className="w-full flex items-center justify-between py-3 px-4 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <span>Tools & Calculators</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openAccordion === 'tools' ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>
                {openAccordion === 'tools' && (
                  <div className="pl-8 pr-4 py-2 space-y-2 bg-slate-50 dark:bg-slate-800/30 rounded-xl mt-1 text-sm text-slate-600 dark:text-slate-300">
                    <Link href="/calculator" onClick={closeMobileMenu} className="block py-1.5">EMI Calculator</Link>
                    <Link href="/eligibility" onClick={closeMobileMenu} className="block py-1.5">Eligibility Calculator</Link>
                    <Link href="/tools/interest-rate-compare" onClick={closeMobileMenu} className="block py-1.5">Interest Rate Compare</Link>
                    <Link href="/tools/balance-transfer" onClick={closeMobileMenu} className="block py-1.5">Balance Transfer</Link>
                    <Link href="/tools/prepayment" onClick={closeMobileMenu} className="block py-1.5">Prepayment Calculator</Link>
                    <Link href="/tools/stamp-duty" onClick={closeMobileMenu} className="block py-1.5">Stamp Duty</Link>
                    <Link href="/tools/tax-benefit" onClick={closeMobileMenu} className="block py-1.5">Tax Benefit Tool</Link>
                    <Link href="/tools/affordability" onClick={closeMobileMenu} className="block py-1.5">Affordability Checker</Link>
                  </div>
                )}
              </div>

              {/* Mobile Resources Accordion */}
              <div>
                <button onClick={() => toggleAccordion('resources')} className="w-full flex items-center justify-between py-3 px-4 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <span>Resources</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openAccordion === 'resources' ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>
                {openAccordion === 'resources' && (
                  <div className="pl-8 pr-4 py-2 space-y-2 bg-slate-50 dark:bg-slate-800/30 rounded-xl mt-1 text-sm text-slate-600 dark:text-slate-300">
                    <Link href="/blog" onClick={closeMobileMenu} className="block py-1.5 font-bold">Blog</Link>
                    <Link href="/resources/documents" onClick={closeMobileMenu} className="block py-1.5">Documents Required</Link>
                    <Link href="/resources/process" onClick={closeMobileMenu} className="block py-1.5">Loan Process Guide</Link>
                    <Link href="/resources/credit-score" onClick={closeMobileMenu} className="block py-1.5">Credit Score Guide</Link>
                    <Link href="/faq" onClick={closeMobileMenu} className="block py-1.5">FAQs</Link>
                    <Link href="/testimonials" onClick={closeMobileMenu} className="block py-1.5 text-emerald-600 dark:text-emerald-400 font-bold">Testimonials</Link>
                  </div>
                )}
              </div>
              
              <Link href="/about" onClick={closeMobileMenu} className="block w-full text-left py-3 px-4 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">About Us</Link>
              <Link href="/contact" onClick={closeMobileMenu} className="block w-full text-left py-3 px-4 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">Contact</Link>

              <div className="pt-4 pb-8 flex flex-col gap-3 px-2">
                <Link
                  href="/apply"
                  onClick={closeMobileMenu}
                  className="w-full text-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-lg"
                >
                  Apply Online Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    
      {/* Insurance Coming Soon Modal */}
      {showInsuranceModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop with heavy blur */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
            onClick={() => setShowInsuranceModal(false)}
          ></div>
          
          {/* Modal Content - Modern Glassmorphism & Gradient */}
          <div className="relative bg-white dark:bg-[#0f172a] w-full max-w-md rounded-3xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.25)] overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-slate-200/50 dark:border-emerald-800/50">
            
            {/* Glowing Orb Background Effects */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            
            <div className="absolute top-4 right-4 z-10">
              <button onClick={() => setShowInsuranceModal(false)} className="p-2 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 backdrop-blur-sm rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative p-10 text-center flex flex-col items-center">
              
              {/* Logo Presentation */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/40 rounded-full blur-xl scale-150 opacity-70"></div>
                <div className="relative w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-xl border border-slate-100 dark:border-slate-700 rotate-3 transition-transform hover:rotate-0">
                  <img src="/logo.png" alt="Bhardwaj Finance" className="w-16 h-auto object-contain -rotate-3 hover:rotate-0 transition-transform" />
                </div>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Coming in 2026
              </div>

              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
                Insurance Vertical
              </h2>
              
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium px-2">
                We are currently building India's most transparent and affordable insurance marketplace, exclusively for Agra.
              </p>
              
              {/* Waitlist Form Area */}
              <div className="w-full bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center shadow-inner mb-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address..." 
                  className="w-full bg-transparent border-none focus:ring-0 text-sm px-4 text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none"
                />
                <button 
                  onClick={() => {
                    alert('Thank you for joining the waitlist! We will notify you when we launch.');
                    setShowInsuranceModal(false);
                  }} 
                  className="shrink-0 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all active:scale-95 text-sm"
                >
                  Notify Me
                </button>
              </div>
              
              <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                Be the first to get exclusive early-bird discounts.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
