"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { 
  ShieldCheck, PhoneCall, ChevronDown, ChevronRight, Menu, X, ArrowRight, 
  Home, TrendingUp, Calculator, Building, Building2, Landmark, BadgePercent,
  FileText, Users, Mail, Activity, Sparkles, CalendarCheck, HeartPulse, Newspaper, MessageCircle
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [activeProductTab, setActiveProductTab] = useState("finance");
  const [activeToolTab, setActiveToolTab] = useState("finance");
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

  // Smart Navbar Scroll Behavior (Smooth hysteresis & scroll direction lock)
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const scrollDelta = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsNavScrolled(currentScrollY > 20);

          const diff = currentScrollY - lastScrollY.current;
          scrollDelta.current += diff;

          // If scrolled near top, always show (background transparent)
          if (currentScrollY <= 80) {
            setIsNavVisible(true);
            scrollDelta.current = 0;
          } 
          // Scrolling down significantly
          else if (diff > 8 && currentScrollY > 120) {
            setIsNavVisible(false);
          } 
          // Scrolling up with minimum threshold to avoid jitter
          else if (diff < -8) {
            setIsNavVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAccordion = (menu: string) => {
    setOpenAccordion(openAccordion === menu ? null : menu);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenAccordion(null);
  };

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ease-in-out print:hidden ${
        isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      } ${
        isNavScrolled 
          ? 'bg-white/98 dark:bg-[#062b20]/98 backdrop-blur-2xl shadow-xl shadow-slate-900/5 border-b border-slate-200/90 dark:border-emerald-800/80' 
          : 'bg-white/98 dark:bg-[#062b20]/98 backdrop-blur-xl border-b border-slate-200/80 dark:border-emerald-800/80 shadow-sm'
      }`}>
        
        {/* MOBILE TOP BANNER */}
        <div className="xl:hidden bg-gradient-to-r from-emerald-900 to-teal-900 text-white text-[10px] font-bold py-1.5 px-3 sm:px-4 flex justify-center items-center gap-1.5 shadow-[inset_0_-1px_0_rgba(255,255,255,0.1)] truncate">
          <div className="relative flex h-2 w-2 mr-0.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="truncate">Authorized Loan Facilitator • Udyam Registered • Serving Agra & UP</span>
        </div>

        {/* PREMIUM TOP BANNER - Dark Corporate Look */}
        <div className="hidden xl:flex bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 px-4 py-2.5 text-[11px] font-medium tracking-wide text-emerald-100/70 justify-between items-center border-b border-emerald-800/50">
          <div className="w-full max-w-[1920px] mx-auto flex justify-between items-center px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="flex items-center gap-3 lg:gap-4">
              <span className="flex items-center gap-1.5 text-emerald-300 drop-shadow-sm font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 
                <span>Authorized Loan Facilitator</span>
              </span>
              <span className="text-emerald-700 font-bold">•</span>
              <span className="text-emerald-100 font-semibold drop-shadow-sm">
                Udyam Registered
              </span>
              <span className="text-emerald-700 font-bold">•</span>
              <span className="text-emerald-100 font-semibold drop-shadow-sm">
                Serving Agra & UP
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 text-emerald-100/80">
                <span>Talk to a Loan Expert:</span>
                <a href="tel:+919258724227" className="flex items-center gap-1.5 text-white hover:text-emerald-300 transition-colors drop-shadow-sm" title="Call Loan Expert (+91 9258-724-227)">
                  <PhoneCall className="w-3 h-3 text-emerald-400" /> 
                  <span className="font-bold text-[12px]">Call: 9258-724-227</span>
                </a>
                <span className="text-emerald-800">|</span>
                <a href="https://wa.me/919286683232?text=Hi%20BFS,%20I%20am%20looking%20for%20loan%20assistance." target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors drop-shadow-sm" title="WhatsApp Desk (+91 9286-683-232)">
                  <span className="font-bold text-[12px]">WhatsApp: 9286-683-232</span>
                </a>
              </div>
              <span className="text-emerald-800">|</span>
              <Link 
                href="/appointment"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-200 hover:text-white border border-emerald-400/40 text-[11px] font-bold transition-all shadow-sm group"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Book Appointment</span>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                </span>
              </Link>
              <span className="text-emerald-800">|</span>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION BAR */}
        <div className="w-full max-w-[1920px] mx-auto px-3 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-20 gap-2">
            {/* Logo & Brand Name */}
            <Link href="/" className="flex items-center gap-2 group shrink-0 pr-2 sm:pr-4 xl:pr-6">
              <img src="/logo.png" alt="BFS Logo" className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105 shrink-0" />
              <div className="flex flex-col justify-center">
                <span className="text-base sm:text-lg xl:text-xl font-black text-slate-900 dark:text-white leading-none tracking-tight whitespace-nowrap">Bhardwaj Financial</span>
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 dark:text-emerald-400 tracking-widest uppercase mt-0.5 sm:mt-1 whitespace-nowrap">Services</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden xl:flex items-center gap-1 lg:gap-2 text-[14px] font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">
              <Link 
                href="/" 
                className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                  pathname === "/" 
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-black shadow-sm" 
                    : "hover:bg-slate-100/70 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                Home
              </Link>

              {/* Products Mega Menu */}
              <div className="relative group py-6" onMouseLeave={() => setActiveProductTab('finance')}>
                <button className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                  pathname.startsWith('/products') 
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-black shadow-sm" 
                    : "hover:bg-slate-100/70 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}>
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
                      <div className="font-black text-sm relative z-10">Competitive Partner Rates*</div>
                      <div className="text-xs text-emerald-100 mt-1 relative z-10">Compare 50+ partner banks in 2 mins.</div>
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
                      <Link href="/products/insurance" className="block bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/40 rounded-xl p-5 mb-8 flex items-center justify-between border border-emerald-100 dark:border-emerald-900/50 transition-colors group">
                        <div>
                          <div className="font-black text-emerald-800 dark:text-emerald-400 text-xl group-hover:text-emerald-700 transition-colors">Protect What Matters Most</div>
                          <div className="text-emerald-600 dark:text-emerald-500 text-sm mt-1 font-medium">Compare and buy top insurance policies from 50+ providers.</div>
                        </div>
                        <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase shadow-sm flex items-center gap-2 group-hover:bg-emerald-500 transition-colors">
                          Explore All <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                      <div className="grid grid-cols-2 gap-10 text-left">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <Users className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Life & Health</h4>
                          </div>
                          <Link href="/products/insurance/term-life" className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Term Life Insurance</Link>
                          <Link href="/products/insurance/health-insurance" className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Health Insurance</Link>
                          <Link href="/products/insurance/family-floater" className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Family Floater Plans</Link>
                          <Link href="/products/insurance/critical-illness" className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Critical Illness Cover</Link>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <ShieldCheck className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">General Insurance</h4>
                          </div>
                          <Link href="/products/insurance/car-insurance" className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Comprehensive Car Insurance</Link>
                          <Link href="/products/insurance/two-wheeler-insurance" className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Two Wheeler Insurance</Link>
                          <Link href="/products/insurance/home-insurance" className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Home Property Insurance</Link>
                          <Link href="/products/insurance/business-insurance" className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Business / Shop Insurance</Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Tools Mega Menu */}
              <div className="relative group py-6" onMouseLeave={() => setActiveToolTab('finance')}>
                <button className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                  pathname.startsWith('/tools') || pathname.startsWith('/calculator')
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-black shadow-sm" 
                    : "hover:bg-slate-100/70 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}>
                  <span>Tools</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300 opacity-70" />
                </button>
                
                {/* Unified Mega Menu Box */}
                <div className="absolute left-1/2 top-[70px] hidden group-hover:flex w-[800px] min-h-[420px] bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-emerald-800 rounded-2xl ring-1 ring-slate-200 dark:ring-emerald-800 overflow-hidden z-[100] animate-live-glow">
                  
                  {/* Left Sidebar */}
                  <div className="w-64 bg-slate-50/80 dark:bg-[#0f172a]/80 border-r border-slate-100 dark:border-emerald-800/50 p-4 shrink-0 flex flex-col gap-1 relative z-10">
                    <button 
                      onMouseEnter={() => setActiveToolTab('finance')}
                      className={`w-full text-left px-5 py-4 rounded-xl font-bold transition-all flex items-center justify-between ${activeToolTab === 'finance' ? 'bg-white dark:bg-[#0f172a] shadow-md text-emerald-600 dark:text-emerald-400 border border-slate-100 dark:border-emerald-800' : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-emerald-900/30'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeToolTab === 'finance' ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-slate-100 dark:bg-slate-800/50'}`}>
                          <Calculator className="w-5 h-5" />
                        </div>
                        Financial Calc
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeToolTab === 'finance' ? 'translate-x-1' : 'opacity-0 -translate-x-2'}`} />
                    </button>
                    
                    <button 
                      onMouseEnter={() => setActiveToolTab('insurance')}
                      className={`w-full text-left px-5 py-4 rounded-xl font-bold transition-all flex items-center justify-between ${activeToolTab === 'insurance' ? 'bg-white dark:bg-[#0f172a] shadow-md text-emerald-600 dark:text-emerald-400 border border-slate-100 dark:border-emerald-800' : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-emerald-900/30'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeToolTab === 'insurance' ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-slate-100 dark:bg-slate-800/50'}`}>
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        Insurance Calc
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeToolTab === 'insurance' ? 'translate-x-1' : 'opacity-0 -translate-x-2'}`} />
                    </button>
                    
                                       <div className="mt-auto p-5 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-900 text-white shadow-xl shadow-emerald-900/20 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500"><TrendingUp className="w-16 h-16" /></div>
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                      <div className="font-black text-base relative z-10">Smart Planning</div>
                      <div className="text-xs text-emerald-100 mt-1.5 relative z-10 max-w-[90%] leading-relaxed">Use free tools to optimize your loans and save lakhs in interest.</div>
                    </div>
                  </div>

                  {/* Right Content Area */}
                  <div className="flex-1 relative bg-white dark:bg-[#0f172a]">
                    
                    {/* Financial Tab */}
                    <div className={`absolute inset-0 p-8 transition-all duration-300 ${activeToolTab === 'finance' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-4 pointer-events-none'}`}>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-0 text-left">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-4">
                            <Home className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Loan Calculators</h4>
                          </div>
                          
                          <Link href="/calculator" className="flex items-start p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-all">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mr-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800 transition-colors shrink-0">
                              <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">EMI Calculator</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Calculate your monthly installments instantly</div>
                            </div>
                          </Link>

                          <Link href="/eligibility" className="flex items-start p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-all">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mr-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800 transition-colors shrink-0">
                              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Loan Eligibility</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Check how much loan you can get</div>
                            </div>
                          </Link>
                          
                          <Link href="/tools/balance-transfer" className="flex items-start p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-all">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mr-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800 transition-colors shrink-0">
                              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Balance Transfer</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">See your potential savings by switching</div>
                            </div>
                          </Link>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-4">
                            <Building className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Property & Tax</h4>
                          </div>
                          
                          <Link href="/tools/stamp-duty" className="flex items-start p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-all">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mr-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800 transition-colors shrink-0">
                              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Stamp Duty Calculator</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Estimate registry & stamp duty charges</div>
                            </div>
                          </Link>
                          
                          <Link href="/tools/prepayment" className="flex items-start p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-all">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mr-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800 transition-colors shrink-0">
                              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Prepayment Impact</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Calculate savings on early repayment</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Insurance Tab */}
                    <div className={`absolute inset-0 p-8 transition-all duration-300 ${activeToolTab === 'insurance' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-4 pointer-events-none'}`}>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-0 text-left">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-4">
                            <Users className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Life & Tax Needs</h4>
                          </div>
                          
                          <Link href="/calculator/insurance/hlv" className="flex items-start p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-all">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mr-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800 transition-colors shrink-0">
                              <HeartPulse className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Human Life Value (HLV)</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Calculate the right life cover amount</div>
                            </div>
                          </Link>

                          <Link href="/calculator/insurance/tax-saver" className="flex items-start p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-all">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mr-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800 transition-colors shrink-0">
                              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">80C & 80D Tax Saver</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Optimize your tax savings legally</div>
                            </div>
                          </Link>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-4">
                            <Activity className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Health Estimators</h4>
                          </div>
                          
                          <Link href="/calculator/insurance/health-premium" className="flex items-start p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-all">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mr-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800 transition-colors shrink-0">
                              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Health Premium Estimator</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Find the best health plan cost</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>


                                    </div>
                </div>
              </div>

              {/* Direct News Nav Link */}
              <Link 
                href="/news" 
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all duration-200 ${
                  pathname.startsWith('/news') 
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-black shadow-sm" 
                    : "hover:bg-slate-100/70 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                <Newspaper className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>News</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </Link>

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
                <button className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 whitespace-nowrap ${
                  pathname.startsWith('/about') 
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-black shadow-sm" 
                    : "hover:bg-slate-100/70 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}>
                  <span className="whitespace-nowrap">About Us</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300 opacity-70 shrink-0" />
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
                <button className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                  pathname.startsWith('/contact') || pathname.startsWith('/complaint') || pathname.startsWith('/appointment')
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-black shadow-sm" 
                    : "hover:bg-slate-100/70 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}>
                  <span>Contact</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300 opacity-70" />
                </button>
                <div className="absolute right-0 top-[70px] hidden group-hover:block w-60 bg-white dark:bg-emerald-900 border border-slate-100 dark:border-emerald-800 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none p-3 z-50 text-left">
                  <Link href="/contact" className="flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 transition font-bold">
                    <Mail className="w-4 h-4 text-emerald-500" /> Contact Support
                  </Link>
                  <Link href="/appointment" className="flex items-center justify-between px-4 py-2.5 rounded-lg hover:bg-emerald-50/70 dark:hover:bg-emerald-950/50 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition font-bold">
                    <span className="flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-emerald-500" /> Book Appointment
                    </span>
                    <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-800/80 text-emerald-700 dark:text-emerald-300">Free</span>
                  </Link>
                  <div className="my-1 border-t border-slate-100 dark:border-emerald-800" />
                  <Link href="/contact/locations" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Office Locations</Link>
                  <Link href="/complaint" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">File a Complaint</Link>
                </div>
              </div>
            </nav>

            {/* Premium Apply & Partner Action Buttons (Desktop Only) */}
            <div className="hidden xl:flex items-center shrink-0 pl-6 border-l border-slate-200 dark:border-emerald-800 gap-3">
              <Link
                href="/partner"
                className="relative group inline-flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-emerald-900/40 hover:bg-slate-200 dark:hover:bg-emerald-900/70 text-slate-700 dark:text-emerald-100 font-bold px-4 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[14px]">Partner With Us</span>
              </Link>
              <Link
                href="/apply"
                className="relative group inline-flex items-center justify-center gap-2 bg-emerald-600 dark:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 text-[14px]">Apply Now</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile Top Header (Language switcher & Theme Toggle) */}
            <div className="flex items-center gap-1.5 sm:gap-2 xl:hidden shrink-0">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="xl:hidden fixed bottom-0 left-0 w-full bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl border-t border-slate-200 dark:border-emerald-800 z-[100] pb-safe flex justify-around items-center h-16 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)] transition-colors duration-300 print:hidden">
        <Link 
          href="/" 
          onClick={closeMobileMenu} 
          className={`flex flex-col items-center justify-center w-full h-full transition ${
            pathname === "/" ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </Link>
        <button 
          onClick={() => { setMobileMenuOpen(true); setOpenAccordion('products'); }} 
          className={`flex flex-col items-center justify-center w-full h-full transition ${
            pathname.startsWith('/products') ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400"
          }`}
        >
          <Building className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Products</span>
        </button>
        <Link 
          href="/appointment" 
          onClick={closeMobileMenu} 
          className={`flex flex-col items-center justify-center w-full h-full transition relative ${
            pathname === "/appointment" ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          <div className="relative">
            <CalendarCheck className="w-5 h-5 mb-0.5" />
            <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="text-[10px]">Book</span>
        </Link>
        <button 
          onClick={() => { setMobileMenuOpen(true); setOpenAccordion('tools'); }} 
          className={`flex flex-col items-center justify-center w-full h-full transition ${
            pathname.startsWith('/tools') || pathname.startsWith('/calculator') ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400"
          }`}
        >
          <Calculator className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Tools</span>
        </button>
        <button 
          onClick={() => setMobileMenuOpen(true)} 
          className={`flex flex-col items-center justify-center w-full h-full transition ${
            mobileMenuOpen || pathname.startsWith('/about') || pathname.startsWith('/contact') || pathname.startsWith('/complaint') ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400"
          }`}
        >
          <Menu className="w-5 h-5 mb-0.5" />
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
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-1 pb-24">
              
              {/* Mobile Contact Quick Actions */}
              <div className="flex gap-2 mb-4">
                <a href="tel:+919258724227" className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-sm">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold">Call Us</span>
                </a>
                <a href="https://wa.me/919286683232?text=Hi%20BFS,%20I%20am%20looking%20for%20loan%20assistance." target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl transition-colors shadow-sm">
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span className="text-xs font-bold">WhatsApp</span>
                </a>
              </div>
              
              {/* Mobile Financial News Link */}
              <Link 
                href="/news" 
                onClick={closeMobileMenu}
                className={`flex items-center justify-between py-3 px-4 rounded-xl font-bold transition mb-1 ${
                  pathname.startsWith('/news')
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : "text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Newspaper className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Financial News & Alerts</span>
                </div>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  LIVE
                </span>
              </Link>

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
                      <div className="font-black text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg mb-2 flex items-center justify-between">
                        <span>Insurance Services</span>
                      </div>
                      <div className="pl-4 space-y-2">
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-1">Life & Health</div>
                        <Link href="/products/insurance/term-life" onClick={closeMobileMenu} className="block py-1 text-left w-full">Term Life Insurance</Link>
                        <Link href="/products/insurance/health-insurance" onClick={closeMobileMenu} className="block py-1 text-left w-full">Health Insurance</Link>
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700">General</div>
                        <Link href="/products/insurance/car-insurance" onClick={closeMobileMenu} className="block py-1 text-left w-full">Car Insurance</Link>
                        <Link href="/products/insurance/two-wheeler-insurance" onClick={closeMobileMenu} className="block py-1 text-left w-full">Two Wheeler Insurance</Link>
                        <Link href="/products/insurance/home-insurance" onClick={closeMobileMenu} className="block py-1 text-left w-full">Home Insurance</Link>
                        <Link href="/products/insurance" onClick={closeMobileMenu} className="block py-1 text-left w-full text-emerald-600 font-bold mt-1">View All Plans →</Link>
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
                  <div className="pl-4 pr-4 py-4 space-y-6 bg-slate-50 dark:bg-slate-800/30 rounded-xl mt-1 text-sm text-slate-600 dark:text-slate-300">
                    
                    {/* Financial */}
                    <div>
                      <div className="font-black text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg mb-2">Financial Calculators</div>
                      <div className="pl-4 space-y-2">
                        <Link href="/calculator" onClick={closeMobileMenu} className="block py-1.5">EMI Calculator</Link>
                        <Link href="/eligibility" onClick={closeMobileMenu} className="block py-1.5">Eligibility Calculator</Link>
                        <Link href="/tools/balance-transfer" onClick={closeMobileMenu} className="block py-1.5">Balance Transfer Savings</Link>
                        <Link href="/tools/prepayment" onClick={closeMobileMenu} className="block py-1.5">Prepayment Impact</Link>
                        <Link href="/tools/stamp-duty" onClick={closeMobileMenu} className="block py-1.5">Stamp Duty</Link>
                      </div>
                    </div>

                    {/* Insurance */}
                    <div>
                      <div className="font-black text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg mb-2">Insurance Planners</div>
                      <div className="pl-4 space-y-2">
                        <Link href="/calculator/insurance/hlv" onClick={closeMobileMenu} className="block py-1.5">Human Life Value (HLV)</Link>
                        <Link href="/calculator/insurance/health-premium" onClick={closeMobileMenu} className="block py-1.5">Health Premium Estimator</Link>
                        <Link href="/calculator/insurance/tax-saver" onClick={closeMobileMenu} className="block py-1.5">80C & 80D Tax Saver</Link>
                      </div>
                    </div>


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
                    <Link href="/news" onClick={closeMobileMenu} className="block py-1.5 font-bold text-emerald-600 dark:text-emerald-400">Financial News & Alerts</Link>
                    <Link href="/blog" onClick={closeMobileMenu} className="block py-1.5 font-bold">Blog</Link>
                    <Link href="/resources/documents" onClick={closeMobileMenu} className="block py-1.5">Documents Required</Link>
                    <Link href="/resources/process" onClick={closeMobileMenu} className="block py-1.5">Loan Process Guide</Link>
                    <Link href="/resources/credit-score" onClick={closeMobileMenu} className="block py-1.5">Credit Score Guide</Link>
                    <Link href="/faq" onClick={closeMobileMenu} className="block py-1.5">FAQs</Link>
                    <Link href="/testimonials" onClick={closeMobileMenu} className="block py-1.5 text-emerald-600 dark:text-emerald-400 font-bold">Testimonials</Link>
                  </div>
                )}
              </div>
              {/* Mobile About Us Accordion */}
              <div>
                <button onClick={() => toggleAccordion('about')} className="w-full flex items-center justify-between py-3 px-4 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <span>About Us</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openAccordion === 'about' ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>
                {openAccordion === 'about' && (
                  <div className="pl-8 pr-4 py-2 space-y-2 bg-slate-50 dark:bg-slate-800/30 rounded-xl mt-1 text-sm text-slate-600 dark:text-slate-300">
                    <Link href="/about" onClick={closeMobileMenu} className="block py-1.5 font-bold text-emerald-600 dark:text-emerald-400">Our Story</Link>
                    <Link href="/about/founder" onClick={closeMobileMenu} className="block py-1.5">Founder & Team</Link>
                    <Link href="/about/why-us" onClick={closeMobileMenu} className="block py-1.5">Why Choose Us</Link>
                    <Link href="/about/certifications" onClick={closeMobileMenu} className="block py-1.5">Trust & Certifications</Link>
                  </div>
                )}
              </div>

              {/* Mobile Contact Accordion */}
              <div>
                <button onClick={() => toggleAccordion('contact')} className="w-full flex items-center justify-between py-3 px-4 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <span>Contact</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openAccordion === 'contact' ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>
                {openAccordion === 'contact' && (
                  <div className="pl-8 pr-4 py-2 space-y-2 bg-slate-50 dark:bg-slate-800/30 rounded-xl mt-1 text-sm text-slate-600 dark:text-slate-300">
                    <Link href="/contact" onClick={closeMobileMenu} className="block py-1.5 font-bold text-emerald-600 dark:text-emerald-400">Contact Support</Link>
                    <Link href="/contact/locations" onClick={closeMobileMenu} className="block py-1.5">Office Locations</Link>
                    <Link href="/appointment" onClick={closeMobileMenu} className="block py-1.5">Book Appointment</Link>
                    <Link href="/complaint" onClick={closeMobileMenu} className="block py-1.5">File a Complaint</Link>
                  </div>
                )}
              </div>

              <div className="pt-4 pb-8 flex flex-col gap-3 px-2">
                <Link
                  href="/partner"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Partner With Us
                </Link>
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
    </>
  );
}
