"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShieldCheck, PhoneCall, ChevronDown, Menu, X, ArrowRight, UserCheck, Briefcase, Lock, Home, TrendingUp, Calculator, Zap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const [marqueeText, setMarqueeText] = useState("");
  const [marqueeColor, setMarqueeColor] = useState("#10b981");
  const [rbiBadge, setRbiBadge] = useState("RBI Compliant & Certified");
  const [ticker, setTicker] = useState("Fastest Home Loan Approval");
  const [salesPhone, setSalesPhone] = useState("7900-979-001");

  // Smart Header States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Shrink and add shadow when scrolled past top
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          if (data.settings.marqueeText) setMarqueeText(data.settings.marqueeText);
          if (data.settings.marqueeColor) setMarqueeColor(data.settings.marqueeColor);
          if (data.settings.rbiComplianceBadge) setRbiBadge(data.settings.rbiComplianceBadge);
          if (data.settings.tickerText) setTicker(data.settings.tickerText);
          if (data.settings.salesPhone) setSalesPhone(data.settings.salesPhone);
        }
      })
      .catch(console.error);
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
      <header className={`sticky top-0 z-[100] transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled 
          ? "backdrop-blur-2xl bg-white/95 dark:bg-slate-950/95 shadow-md border-b border-slate-200/80 dark:border-slate-800/80" 
          : "backdrop-blur-none bg-white dark:bg-slate-950 shadow-none border-b-transparent"
      }`}>
        {/* Sleek Minimalist Top Banner - Shrinks on scroll */}
        <div className={`hidden md:flex bg-slate-900 dark:bg-slate-50 text-slate-300 dark:text-slate-700 px-4 lg:px-10 justify-center items-center text-xs transition-all duration-500 overflow-hidden ${
          isScrolled ? "h-0 opacity-0 py-0 border-transparent" : "h-10 opacity-100 py-2 border-b border-slate-800 dark:border-slate-200"
        }`}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4 font-medium tracking-wide">
              <div className="flex items-center gap-1.5 text-emerald-950 dark:text-white bg-emerald-400 dark:bg-emerald-600 px-3 py-1 rounded-full font-bold shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" /> 
                <span className="text-[10px] uppercase tracking-wider">{rbiBadge}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-950 dark:text-slate-900 bg-amber-400 px-3 py-1 rounded-full font-bold shadow-md">
                <Zap className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-wider">{ticker}</span>
              </div>
            </div>

            {/* Marquee Center */}
            {marqueeText && (
              <div className="flex-1 mx-8 overflow-hidden flex items-center h-full opacity-80">
                {/* @ts-ignore */}
                <marquee className="whitespace-nowrap font-medium" style={{ color: marqueeColor }}>
                  {marqueeText}
                {/* @ts-ignore */}
                </marquee>
              </div>
            )}

            <div className="flex items-center gap-4 font-medium tracking-wide">
              <ThemeToggle />
              <div className="w-px h-4 bg-slate-700 dark:bg-slate-300" />
              <a href={`tel:${salesPhone.replace(/\D/g, '')}`} className="flex items-center gap-1.5 hover:text-white dark:hover:text-emerald-600 transition-colors">
                <PhoneCall className="w-3.5 h-3.5" /> 
                <span>{salesPhone}</span>
              </a>
              <div className="w-px h-4 bg-slate-700 dark:bg-slate-300" />
              <Link href="/login" className="flex items-center gap-1.5 hover:text-white dark:hover:text-emerald-600 transition-colors">
                <Lock className="w-3.5 h-3.5" />
                <span>Partner Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "h-16" : "h-20"}`}>
            {/* Logo & Brand Name */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0 pr-4">
              <div className="relative h-10 bg-white rounded-lg px-2 py-1 shadow-sm border border-emerald-500/20 group-hover:border-emerald-400 transition-all duration-300">
                <img src="/logo.png" alt="Bhardwaj Financial Services Logo" className="h-full w-auto object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-lg font-black text-[#1f4e79] dark:text-[#3a86c6] leading-none tracking-tight">Bhardwaj Finance</span>
                <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase mt-0.5 tracking-wide">Aapka Vishwas, Hamari Zimmedari.</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-[13px] font-semibold dark:text-slate-200 text-slate-700">
              <Link href="/" className="hover:text-blue-700 dark:hover:text-emerald-400 transition">Home</Link>

              {/* Products Mega Menu */}
              <div className="relative group py-4">
                <button className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  <span>Products</span>
                  <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-[52px] hidden group-hover:block w-[750px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/80 rounded-2xl shadow-2xl p-6 z-50">
                  <div className="grid grid-cols-3 gap-8 text-left">
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">Housing Loans</h4>
                      <Link href="/products/home-loan" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Home Loan</Link>
                      <Link href="/products/balance-transfer" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Balance Transfer</Link>
                      <Link href="/products/top-up-loan" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Top-Up Loan</Link>
                      <Link href="/products/plot-loan" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Plot / Land Purchase</Link>
                      <Link href="/products/construction-loan" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Construction Loan</Link>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">Property & Retail</h4>
                      <Link href="/products/loan-against-property" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Loan Against Property</Link>
                      <Link href="/products/home-renovation" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Home Renovation</Link>
                      <Link href="/products/nri-home-loan" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">NRI Home Loan</Link>
                      <Link href="/products/personal-loan" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Personal Loan</Link>
                      <Link href="/products/education-loan" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Education Loan</Link>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">Business & Auto</h4>
                      <Link href="/products/business-loan" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Business / MSME Loan</Link>
                      <Link href="/products/working-capital" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Working Capital</Link>
                      <Link href="/products/loan-against-securities" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Loan Against Securities</Link>
                      <Link href="/products/car-loan" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Car Loan</Link>
                      <Link href="/products/gold-loan" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Gold Loan</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compare Banks */}
              <div className="relative group py-4">
                <button className="flex items-center gap-1 hover:text-blue-700 dark:hover:text-emerald-400 transition">
                  <span>Compare</span>
                  <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute left-0 top-[52px] hidden group-hover:block w-60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/80 rounded-xl shadow-2xl p-3 z-50 text-left">
                  <Link href="/rates" className="block px-3 py-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 font-bold text-emerald-600 dark:text-emerald-400 transition">Live Bank Rates 🟢</Link>
                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                  <Link href="/compare/interest-rates" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Interest Rate Table</Link>
                  <Link href="/compare/processing-fees" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Processing Fees</Link>
                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                  <Link href="/banks/pnb" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">PNB Home Loan</Link>
                  <Link href="/banks/hdfc" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">HDFC Home Loan</Link>
                  <Link href="/banks/icici" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">ICICI Home Loan</Link>
                  <Link href="/banks/central-bank" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Central Bank Loan</Link>
                </div>
              </div>

              {/* Tools */}
              <div className="relative group py-4">
                <button className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  <span>Tools</span>
                  <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute left-0 top-[52px] hidden group-hover:block w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/80 rounded-xl shadow-2xl p-3 z-50 text-left">
                  <Link href="/calculator" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">EMI Calculator</Link>
                  <Link href="/eligibility" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Eligibility Calculator</Link>
                  <Link href="/tools/interest-rate-compare" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Interest Rate Comparison</Link>
                  <Link href="/tools/balance-transfer" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Loan Balance Transfer</Link>
                  <Link href="/tools/prepayment" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Prepayment Calculator</Link>
                  <Link href="/tools/stamp-duty" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Stamp Duty Calculator</Link>
                  <Link href="/faqs" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">FAQs</Link>
                  <Link href="/tools/tax-benefit" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Income Tax Benefit Tool</Link>
                  <Link href="/tools/affordability" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Affordability Checker</Link>
                </div>
              </div>

              {/* Resources */}
              <div className="relative group py-4">
                <button className="flex items-center gap-1 hover:text-blue-700 dark:hover:text-emerald-400 transition">
                  <span>Resources</span>
                  <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-[52px] hidden group-hover:block w-[550px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/80 rounded-2xl shadow-2xl p-6 z-50">
                  <div className="grid grid-cols-2 gap-8 text-left">
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">Insights & Education</h4>
                      <Link href="/blogs" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition font-bold">Blog & Articles</Link>
                      <Link href="/resources/insights" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Expert Insights</Link>
                      <Link href="/resources/statistics" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Industry Statistics</Link>
                      <Link href="/resources/interviews" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Expert Interviews</Link>
                      <Link href="/resources/frameworks" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Financial Frameworks</Link>
                      <Link href="/resources/use-cases" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Real Use Cases</Link>
                      <Link href="/testimonials" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 transition font-bold mt-2">Success Stories</Link>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">Guides & Support</h4>
                      <Link href="/resources/process" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Loan Process Guide</Link>
                      <Link href="/resources/documents" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Documents Required</Link>
                      <Link href="/resources/credit-score" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Credit Score Guide</Link>
                      <Link href="/faq" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">FAQs / Help Center</Link>
                      <Link href="/resources/downloads" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Downloads & Forms</Link>
                      <div className="pt-2 mt-2 border-t border-transparent" />
                      <Link href="/reviews" className="block px-3 py-2 -mx-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 transition font-bold mt-2">Client Reviews</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Us */}
              <div className="relative group py-4">
                <button className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  <span>About Us</span>
                  <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute left-0 top-[52px] hidden group-hover:block w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/80 rounded-xl shadow-2xl p-3 z-50 text-left">
                  <Link href="/about" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Our Story</Link>
                  <Link href="/about/founder" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Owner & Team</Link>
                  <Link href="/about/why-us" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Why Choose Us</Link>
                  <Link href="/about/certifications" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">RBI Registrations</Link>
                  <Link href="/careers" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Careers</Link>
                </div>
              </div>

              {/* Contact */}
              <div className="relative group py-4">
                <button className="flex items-center gap-1 hover:text-blue-700 dark:hover:text-emerald-400 transition">
                  <span>Contact</span>
                  <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute right-0 top-[52px] hidden group-hover:block w-48 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/80 rounded-xl shadow-2xl p-3 z-50 text-left">
                  <Link href="/contact" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Contact Form</Link>
                  <Link href="/contact/locations" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Office Locations</Link>
                  <Link href="/apply" className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition">Book Appointment</Link>
                </div>
              </div>
            </nav>

            {/* Action Buttons (Desktop Only) */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-5 shrink-0 pl-2">
              <Link
                href="/apply"
                className="relative inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/25 transition transform hover:-translate-y-0.5 text-sm"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Top Header (only shows Theme Toggle now, menu moved to bottom nav) */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-[#0f172a] border-t border-slate-200 dark:border-slate-800 z-[100] pb-safe flex justify-around items-center h-16 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] transition-colors duration-300">
        <Link href="/" onClick={closeMobileMenu} className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition">
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/rates" onClick={closeMobileMenu} className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition">
          <TrendingUp className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Rates</span>
        </Link>
        <Link href="/calculators" onClick={closeMobileMenu} className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition">
          <Calculator className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Calculators</span>
        </Link>
        <button onClick={() => setMobileMenuOpen(true)} className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition">
          <Menu className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Menu</span>
        </button>
      </div>

      {/* Mobile Bottom Sheet Menu (Accordions) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[110] flex flex-col justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={closeMobileMenu}></div>
          
          {/* Sheet */}
          <div className="relative w-full bg-white dark:bg-[#0f172a] rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col transform transition-transform duration-300 animate-in slide-in-from-bottom">
            {/* Header of sheet */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
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
                <Link href="/login" onClick={closeMobileMenu} className="flex-1 flex flex-col items-center justify-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-3 rounded-xl border border-blue-200 dark:border-blue-800/30 hover:bg-blue-100 transition-colors">
                  <UserCheck className="w-5 h-5" />
                  <span className="text-xs font-bold">Client Login</span>
                </Link>
                <Link href="/login" onClick={closeMobileMenu} className="flex-1 flex flex-col items-center justify-center gap-1 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 py-3 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:bg-slate-100 transition-colors">
                  <Briefcase className="w-5 h-5" />
                  <span className="text-xs font-bold">DSA Login</span>
                </Link>
              </div>
              
              {/* Mobile Products Accordion */}
              <div>
                <button onClick={() => toggleAccordion('products')} className="w-full flex items-center justify-between py-3 px-4 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <span>Products</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openAccordion === 'products' ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>
                {openAccordion === 'products' && (
                  <div className="pl-8 pr-4 py-2 space-y-2 bg-slate-50 dark:bg-slate-800/30 rounded-xl mt-1 text-sm text-slate-600 dark:text-slate-300">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-2">Housing</div>
                    <Link href="/products/home-loan" onClick={closeMobileMenu} className="block py-1.5">Home Loan</Link>
                    <Link href="/products/balance-transfer" onClick={closeMobileMenu} className="block py-1.5">Balance Transfer</Link>
                    <Link href="/products/top-up-loan" onClick={closeMobileMenu} className="block py-1.5">Top-Up Loan</Link>
                    <Link href="/products/plot-loan" onClick={closeMobileMenu} className="block py-1.5">Plot Loan</Link>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700">Property & Retail</div>
                    <Link href="/products/loan-against-property" onClick={closeMobileMenu} className="block py-1.5">Loan Against Property</Link>
                    <Link href="/products/personal-loan" onClick={closeMobileMenu} className="block py-1.5">Personal Loan</Link>
                    <Link href="/products/education-loan" onClick={closeMobileMenu} className="block py-1.5">Education Loan</Link>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700">Business & Auto</div>
                    <Link href="/products/business-loan" onClick={closeMobileMenu} className="block py-1.5">Business Loan</Link>
                    <Link href="/products/working-capital" onClick={closeMobileMenu} className="block py-1.5">Working Capital</Link>
                    <Link href="/products/car-loan" onClick={closeMobileMenu} className="block py-1.5">Car Loan</Link>
                  </div>
                )}
              </div>

              {/* Mobile Compare Accordion */}
              <div>
                <button onClick={() => toggleAccordion('compare')} className="w-full flex items-center justify-between py-3 px-4 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <span>Compare Banks</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openAccordion === 'compare' ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>
                {openAccordion === 'compare' && (
                  <div className="pl-8 pr-4 py-2 space-y-2 bg-slate-50 dark:bg-slate-800/30 rounded-xl mt-1 text-sm text-slate-600 dark:text-slate-300">
                    <Link href="/rates" onClick={closeMobileMenu} className="block py-1.5 text-emerald-600 dark:text-emerald-400 font-bold">Live Rates</Link>
                    <Link href="/compare/interest-rates" onClick={closeMobileMenu} className="block py-1.5">Interest Table</Link>
                    <Link href="/banks/pnb" onClick={closeMobileMenu} className="block py-1.5">PNB Home Loan</Link>
                    <Link href="/banks/hdfc" onClick={closeMobileMenu} className="block py-1.5">HDFC Home Loan</Link>
                    <Link href="/banks/icici" onClick={closeMobileMenu} className="block py-1.5">ICICI Home Loan</Link>
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
                    <Link href="/blogs" onClick={closeMobileMenu} className="block py-1.5 font-bold">Blog</Link>
                    <Link href="/resources/insights" onClick={closeMobileMenu} className="block py-1.5">Expert Insights</Link>
                    <Link href="/resources/statistics" onClick={closeMobileMenu} className="block py-1.5">Industry Statistics</Link>
                    <Link href="/resources/interviews" onClick={closeMobileMenu} className="block py-1.5">Expert Interviews</Link>
                    <Link href="/resources/documents" onClick={closeMobileMenu} className="block py-1.5">Documents Required</Link>
                    <Link href="/resources/process" onClick={closeMobileMenu} className="block py-1.5">Loan Process Guide</Link>
                    <Link href="/resources/credit-score" onClick={closeMobileMenu} className="block py-1.5">Credit Score Guide</Link>
                    <Link href="/resources/frameworks" onClick={closeMobileMenu} className="block py-1.5">Financial Frameworks</Link>
                    <Link href="/resources/use-cases" onClick={closeMobileMenu} className="block py-1.5">Real Use Cases</Link>
                    <Link href="/faq" onClick={closeMobileMenu} className="block py-1.5">FAQs</Link>
                    <Link href="/testimonials" onClick={closeMobileMenu} className="block py-1.5 text-emerald-600 dark:text-emerald-400 font-bold">Testimonials</Link>
                    <Link href="/reviews" onClick={closeMobileMenu} className="block py-1.5 text-emerald-600 dark:text-emerald-400 font-bold">Client Reviews</Link>
                  </div>
                )}
              </div>
              
              <Link href="/about" onClick={closeMobileMenu} className="block w-full text-left py-3 px-4 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">About Us</Link>
              <Link href="/contact" onClick={closeMobileMenu} className="block w-full text-left py-3 px-4 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">Contact</Link>

              <div className="pt-4 pb-8 flex flex-col gap-3 px-2">
                <Link
                  href="/apply"
                  onClick={closeMobileMenu}
                  className="w-full text-center bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg"
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
