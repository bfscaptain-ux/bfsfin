"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { 
  ShieldCheck, PhoneCall, ChevronDown, ChevronRight, Menu, X, ArrowRight, 
  Home, TrendingUp, Calculator, Building, Building2, Landmark, BadgePercent,
  FileText, Users, Mail, CreditCard, Activity, Sparkles, CalendarCheck, HeartPulse
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
      <header className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
        isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      } ${
        isNavScrolled 
          ? 'bg-white/95 dark:bg-emerald-950/95 backdrop-blur-2xl shadow-xl shadow-slate-900/5 border-b border-slate-200/90 dark:border-emerald-800/80' 
          : 'bg-white/95 dark:bg-emerald-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-emerald-800/80 shadow-sm'
      }`}>
        
        {/* MOBILE TOP BANNER */}
        <div className="md:hidden bg-gradient-to-r from-emerald-900 to-teal-900 text-white text-[10px] font-bold py-1.5 px-4 flex justify-center items-center gap-1.5 shadow-[inset_0_-1px_0_rgba(255,255,255,0.1)]">
          <div className="relative flex h-2 w-2 mr-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          INDIA'S MOST TRUSTED LOAN PARTNER
        </div>

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
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 text-emerald-100/80">
                <span>Talk to a Loan Expert:</span>
                <a href="tel:7900979001" className="flex items-center gap-1.5 text-white hover:text-emerald-300 transition-colors drop-shadow-sm">
                  <PhoneCall className="w-3 h-3 text-emerald-400" /> 
                  <span className="font-bold text-[12px]">7900-979-001</span>
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
                    
                    <button 
                      onMouseEnter={() => setActiveProductTab('credit-cards')}
                      className={`w-full text-left px-5 py-3 rounded-xl font-bold transition-all flex items-center justify-between ${activeProductTab === 'credit-cards' ? 'bg-white dark:bg-[#0f172a] shadow-md text-emerald-600 dark:text-emerald-400 border border-slate-100 dark:border-emerald-800' : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-emerald-900/30'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeProductTab === 'credit-cards' ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-slate-100 dark:bg-slate-800/50'}`}>
                          <CreditCard className="w-5 h-5" />
                        </div>
                        Credit Cards
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeProductTab === 'credit-cards' ? 'translate-x-1' : 'opacity-0 -translate-x-2'}`} />
                    </button>

                    <button 
                      onMouseEnter={() => setActiveProductTab('tax')}
                      className={`w-full text-left px-5 py-3 rounded-xl font-bold transition-all flex items-center justify-between ${activeProductTab === 'tax' ? 'bg-white dark:bg-[#0f172a] shadow-md text-emerald-600 dark:text-emerald-400 border border-slate-100 dark:border-emerald-800' : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-emerald-900/30'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeProductTab === 'tax' ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-slate-100 dark:bg-slate-800/50'}`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        Tax &amp; Compliance
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeProductTab === 'tax' ? 'translate-x-1' : 'opacity-0 -translate-x-2'}`} />
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

                    {/* Credit Cards Content Tab */}
                    <div className={`absolute inset-0 p-10 transition-all duration-300 ${activeProductTab === 'credit-cards' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-4 pointer-events-none'}`}>
                      <div className="grid grid-cols-3 gap-8 text-left">
                        {/* Column 1 */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <CreditCard className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Top Bank Cards</h4>
                          </div>
                          <Link href="/products/credit-cards/hdfc-millennia" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">HDFC Millennia</Link>
                          <Link href="/products/credit-cards/sbi-simplyclick" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">SBI SimplyCLICK</Link>
                          <Link href="/products/credit-cards/icici-amazon-pay" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">ICICI Amazon Pay</Link>
                          <Link href="/products/credit-cards/axis-flipkart" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Axis Flipkart</Link>
                          <Link href="/products/credit-cards" className="block text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:translate-x-1 transition-all mt-4 border-t border-slate-100 dark:border-emerald-800/50 pt-3">View All Cards →</Link>
                        </div>
                        {/* Column 2 */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <TrendingUp className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Browse by Category</h4>
                          </div>
                          <Link href="/products/credit-cards?category=cashback" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Cashback Cards</Link>
                          <Link href="/products/credit-cards?category=travel" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Travel & Lounge Access</Link>
                          <Link href="/products/credit-cards?category=shopping" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Shopping Cards</Link>
                          <Link href="/products/credit-cards?category=fuel" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Fuel Cards</Link>
                          <Link href="/products/credit-cards?category=premium" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Premium & Super Premium</Link>
                        </div>
                        {/* Column 3 Promo */}
                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)]">
                           <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                             <CreditCard className="w-24 h-24 transform rotate-12 translate-x-4 -translate-y-4" />
                           </div>
                           <div className="relative z-10">
                             <div className="inline-block bg-white/20 backdrop-blur-md text-emerald-50 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 border border-white/20 shadow-sm">Instant Approval</div>
                             <div className="font-black text-xl mb-2 leading-tight">Find Your Perfect Credit Card</div>
                             <div className="text-emerald-50/90 text-[13px] leading-relaxed font-medium">Compare 50+ cards and get instant approval with zero joining fee options.</div>
                           </div>
                           <Link href="/products/credit-cards" className="relative z-10 bg-white text-emerald-700 hover:bg-emerald-50 font-bold py-2.5 px-4 rounded-xl text-center text-sm transition-all mt-6 shadow-md hover:shadow-lg active:scale-95">
                             Compare Now
                           </Link>
                        </div>
                      </div>
                    </div>

                    {/* Tax & Compliance Content Tab */}
                    <div className={`absolute inset-0 p-10 transition-all duration-300 ${activeProductTab === 'tax' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-4 pointer-events-none'}`}>
                      <div className="grid grid-cols-3 gap-8 text-left">
                        {/* Column 1: ITR Filing */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <FileText className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">ITR Filing Desk</h4>
                          </div>
                          <Link href="/services/itr-filing" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Salaried ITR (Form 16)</Link>
                          <Link href="/services/itr-filing" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Business &amp; Traders (44AD)</Link>
                          <Link href="/services/itr-filing" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Loan-Purpose Financials</Link>
                          <Link href="/services/itr-filing" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Past 2-3 Years Backlog ITR</Link>
                          <Link href="/services/itr-filing" className="block text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:translate-x-1 transition-all mt-3 border-t border-slate-100 dark:border-emerald-800/50 pt-2">File ITR with CA →</Link>
                        </div>

                        {/* Column 2: MSME & Business Setup */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <Building2 className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">MSME Registration</h4>
                          </div>
                          <Link href="/services/msme-registration" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:translate-x-1 transition-all">New Udyam Registration</Link>
                          <Link href="/services/msme-registration" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:translate-x-1 transition-all">Collateral-Free Loan Scheme</Link>
                          <Link href="/services/msme-registration" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:translate-x-1 transition-all">1% Bank Interest Concession</Link>
                          <Link href="/services/msme-registration" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:translate-x-1 transition-all">MSME Renewal &amp; Updation</Link>
                          <Link href="/services/msme-registration" className="block text-sm font-bold text-teal-600 dark:text-teal-400 hover:translate-x-1 transition-all mt-3 border-t border-slate-100 dark:border-emerald-800/50 pt-2">Apply for Udyam in 24 Hrs →</Link>
                        </div>

                        {/* Column 3: Promo Banner */}
                        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)]">
                          <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none">
                            <FileText className="w-24 h-24 transform rotate-12 translate-x-4 -translate-y-4" />
                          </div>
                          <div className="relative z-10">
                            <div className="inline-block bg-white/20 backdrop-blur-md text-emerald-50 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 border border-white/20 shadow-sm">One-Stop Solution</div>
                            <div className="font-black text-xl mb-2 leading-tight">Need a Loan but No ITR?</div>
                            <div className="text-emerald-50/90 text-[13px] leading-relaxed font-medium">BFS prepares your ITR &amp; MSME Certificate to ensure 100% bank eligibility for Home &amp; Business Loans.</div>
                          </div>
                          <div className="flex gap-2 relative z-10 mt-6">
                            <Link href="/services/itr-filing" className="flex-1 bg-white text-emerald-800 hover:bg-emerald-50 font-bold py-2 px-3 rounded-xl text-center text-xs transition-all shadow-md">
                              File ITR
                            </Link>
                            <Link href="/services/msme-registration" className="flex-1 bg-emerald-950/60 hover:bg-emerald-950 text-white font-bold py-2 px-3 rounded-xl text-center text-xs border border-emerald-400/40 transition-all">
                              Get MSME
                            </Link>
                          </div>
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
                    
                    <button 
                      onMouseEnter={() => setActiveToolTab('credit-cards')}
                      className={`w-full text-left px-5 py-4 rounded-xl font-bold transition-all flex items-center justify-between ${activeToolTab === 'credit-cards' ? 'bg-white dark:bg-[#0f172a] shadow-md text-emerald-600 dark:text-emerald-400 border border-slate-100 dark:border-emerald-800' : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-emerald-900/30'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeToolTab === 'credit-cards' ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-slate-100 dark:bg-slate-800/50'}`}>
                          <CreditCard className="w-5 h-5" />
                        </div>
                        Credit Card Calc
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeToolTab === 'credit-cards' ? 'translate-x-1' : 'opacity-0 -translate-x-2'}`} />
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

                    {/* Credit Cards Tab */}
                    <div className={`absolute inset-0 p-8 transition-all duration-300 ${activeToolTab === 'credit-cards' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-4 pointer-events-none'}`}>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-0 text-left">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-4">
                            <TrendingUp className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Debt Planners</h4>
                          </div>
                          
                          <Link href="/calculator/credit-cards/payoff" className="flex items-start p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-all">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mr-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800 transition-colors shrink-0">
                              <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Credit Card Payoff Tool</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Plan how to clear your dues faster</div>
                            </div>
                          </Link>

                          <Link href="/calculator/credit-cards/minimum-due" className="flex items-start p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-all">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mr-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800 transition-colors shrink-0">
                              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Minimum Due Trap</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">See the real cost of paying minimum</div>
                            </div>
                          </Link>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-4">
                            <BadgePercent className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Value & Rewards</h4>
                          </div>
                          
                          <Link href="/calculator/credit-cards/rewards" className="flex items-start p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-all">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mr-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800 transition-colors shrink-0">
                              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Reward Points Value</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Calculate real cashback value</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
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
                <button className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                  pathname.startsWith('/about') 
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-black shadow-sm" 
                    : "hover:bg-slate-100/70 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}>
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
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="xl:hidden fixed bottom-0 left-0 w-full bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl border-t border-slate-200 dark:border-emerald-800 z-[100] pb-safe flex justify-around items-center h-16 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)] transition-colors duration-300">
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

                    {/* Credit Cards Section */}
                    <div>
                      <div className="font-black text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg mb-2">Credit Cards</div>
                      <div className="pl-4 space-y-2">
                        <Link href="/products/credit-cards/hdfc-millennia" onClick={closeMobileMenu} className="block py-1">HDFC Millennia</Link>
                        <Link href="/products/credit-cards/sbi-simplyclick" onClick={closeMobileMenu} className="block py-1">SBI SimplyCLICK</Link>
                        <Link href="/products/credit-cards/icici-amazon-pay" onClick={closeMobileMenu} className="block py-1">ICICI Amazon Pay</Link>
                        <Link href="/products/credit-cards/axis-flipkart" onClick={closeMobileMenu} className="block py-1">Axis Flipkart</Link>
                        <Link href="/products/credit-cards" onClick={closeMobileMenu} className="block py-1 text-emerald-600 font-bold">View All Cards →</Link>
                      </div>
                    </div>

                    {/* Tax & Compliance Section */}
                    <div>
                      <div className="font-black text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg mb-2">Tax &amp; Compliance</div>
                      <div className="pl-4 space-y-2">
                        <Link href="/services/itr-filing" onClick={closeMobileMenu} className="block py-1 font-semibold text-emerald-600 dark:text-emerald-400">ITR Filing Desk (Salaried &amp; Business)</Link>
                        <Link href="/services/msme-registration" onClick={closeMobileMenu} className="block py-1 font-semibold text-teal-600 dark:text-teal-400">MSME / Udyam Registration (24-48 Hrs)</Link>
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

                    {/* Credit Cards */}
                    <div>
                      <div className="font-black text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg mb-2">Credit Card Tools</div>
                      <div className="pl-4 space-y-2">
                        <Link href="/calculator/credit-cards/payoff" onClick={closeMobileMenu} className="block py-1.5">Debt Payoff Tool</Link>
                        <Link href="/calculator/credit-cards/minimum-due" onClick={closeMobileMenu} className="block py-1.5">Minimum Due Trap</Link>
                        <Link href="/calculator/credit-cards/rewards" onClick={closeMobileMenu} className="block py-1.5">Reward Points Tracker</Link>
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
