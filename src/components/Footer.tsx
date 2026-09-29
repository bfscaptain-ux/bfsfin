"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, PhoneCall, ChevronDown, MessageCircle, ExternalLink, MapPin,
  ShieldCheck, Lock
} from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

export default function Footer({ contactPhone: propContactPhone, whatsappPhone: propWhatsappPhone }: { contactPhone?: string; whatsappPhone?: string }) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Dynamic phones with admin sync
  const [phones, setPhones] = useState({
    callPhone: propContactPhone || "+91 9258-724-227",
    rawCall: "9258724227",
    whatsappDisplay: "+91 7900-979-001",
    whatsappRaw: propWhatsappPhone || "917900979001"
  });

  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          const cp = data.settings.contactPhone || propContactPhone || "+91 9258-724-227";
          const wp = data.settings.whatsappPhone || propWhatsappPhone || "917900979001";
          setPhones({
            callPhone: cp.includes("+91") ? cp : `+91 ${cp}`,
            rawCall: cp.replace(/[^0-9]/g, "").slice(-10),
            whatsappDisplay: "+91 7900-979-001",
            whatsappRaw: wp.replace(/[^0-9]/g, "")
          });
          setSocialLinks({
            facebook: data.settings.socialFacebook || "",
            instagram: data.settings.socialInstagram || "",
            youtube: data.settings.socialYouTube || "",
            twitter: data.settings.socialTwitter || "",
            linkedin: data.settings.socialLinkedIn || "",
            whatsappChannel: data.settings.socialWhatsAppChannel || "",
            telegram: data.settings.socialTelegram || "",
            googleBusiness: data.settings.socialGoogleBusiness || "",
          });
        }
      })
      .catch(() => {});
  }, [propContactPhone, propWhatsappPhone]);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const partnerBanks = [
    { name: "Punjab National Bank", href: "/banks/pnb" },
    { name: "State Bank of India", href: "/banks/sbi" },
    { name: "HDFC Bank", href: "/banks/hdfc" },
    { name: "ICICI Bank", href: "/banks/icici" },
    { name: "Axis Bank", href: "/banks/axis" },
    { name: "Central Bank of India", href: "/banks/central-bank" },
    { name: "IDBI Bank", href: "/banks/idbi" },
    { name: "Bank of Baroda", href: "/banks/bob" },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#031d15] via-[#021711] to-[#010e0a] text-slate-300 font-sans border-t-4 border-emerald-500 transition-colors duration-300 relative overflow-hidden">
      
      {/* 1. TOP INTERACTIVE CALL & WHATSAPP STRIP (Exact Emerald Theme Match) */}
      <div className="border-b border-emerald-900/60 bg-[#02140e] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Header */}
            <div className="md:col-span-4 text-center md:text-left">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 block mb-1">
                Official Helpdesk • Agra HQ
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Need Help with Your Loan?
              </h3>
              <p className="text-xs text-emerald-100/70 mt-1">
                Talk directly with our senior financial advisors.
              </p>
            </div>

            {/* Right: Calling & WhatsApp Direct Action Cards */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Call Card */}
              <a 
                href={`tel:${phones.rawCall || '9258724227'}`}
                className="group p-4 sm:p-5 rounded-2xl bg-[#04261c] border border-emerald-800/60 hover:border-emerald-400 hover:bg-[#063326] transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-emerald-900/30"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/80 block">
                      Call Loan Specialist
                    </span>
                    <span className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-300 transition-colors block">
                      +91 9258-724-227
                    </span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-900/60 group-hover:bg-emerald-500 text-emerald-200 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* WhatsApp Card */}
              <a 
                href={`https://wa.me/917900979001?text=${encodeURIComponent("Hello BFS Team, I would like to consult regarding a Loan / Insurance.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 sm:p-5 rounded-2xl bg-[#04261c] border border-emerald-800/60 hover:border-emerald-400 hover:bg-[#063326] transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-emerald-900/30"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0 relative">
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                      WhatsApp Active Now
                    </span>
                    <span className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-300 transition-colors block">
                      +91 7900-979-001
                    </span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-900/60 group-hover:bg-emerald-500 text-emerald-200 group-hover:text-white flex items-center justify-center transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>

            </div>

          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION SECTION (Zero Clutter, Clean Headings) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Column 1: Loans & Mortgages */}
          <div className="border-b md:border-b-0 border-emerald-900/60 pb-4 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection("loans")}
              className="w-full flex items-center justify-between md:cursor-default text-left pb-2.5 mb-4 border-b border-emerald-800/60"
            >
              <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-wider">
                Loans & Mortgages
              </h4>
              <ChevronDown className={`w-4 h-4 text-emerald-400 md:hidden transition-transform ${openSection === "loans" ? "rotate-180" : ""}`} />
            </button>
            <ul className={`space-y-2.5 text-xs sm:text-sm font-medium text-emerald-100/75 ${openSection === "loans" ? "block" : "hidden md:block"}`}>
              <li><Link href="/products/home-loan" className="hover:text-white transition-colors block py-0.5">Home Loan (Purchase)</Link></li>
              <li><Link href="/products/balance-transfer" className="hover:text-white transition-colors block py-0.5">Balance Transfer (Lower EMI)</Link></li>
              <li><Link href="/products/loan-against-property" className="hover:text-white transition-colors block py-0.5">Loan Against Property (LAP)</Link></li>
              <li><Link href="/products/business-loan" className="hover:text-white transition-colors block py-0.5">Business / MSME Loan</Link></li>
              <li><Link href="/products/personal-loan" className="hover:text-white transition-colors block py-0.5">Personal Loan</Link></li>
              <li><Link href="/products/plot-loan" className="hover:text-white transition-colors block py-0.5">Plot & Land Loan</Link></li>
              <li><Link href="/products/construction-loan" className="hover:text-white transition-colors block py-0.5">Construction Loan</Link></li>
              <li><Link href="/products/gold-loan" className="hover:text-white transition-colors block py-0.5">Gold Loan</Link></li>
              <li><Link href="/services/itr-filing" className="text-emerald-400 hover:underline font-bold transition-colors block py-0.5">ITR Filing Desk</Link></li>
              <li><Link href="/services/msme-registration" className="text-teal-400 hover:underline font-bold transition-colors block py-0.5">MSME / Udyam Registration</Link></li>
            </ul>
          </div>

          {/* Column 2: Insurance Plans */}
          <div className="border-b md:border-b-0 border-emerald-900/60 pb-4 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection("insurance")}
              className="w-full flex items-center justify-between md:cursor-default text-left pb-2.5 mb-4 border-b border-emerald-800/60"
            >
              <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-wider">
                Insurance Plans
              </h4>
              <ChevronDown className={`w-4 h-4 text-emerald-400 md:hidden transition-transform ${openSection === "insurance" ? "rotate-180" : ""}`} />
            </button>
            <ul className={`space-y-2.5 text-xs sm:text-sm font-medium text-emerald-100/75 ${openSection === "insurance" ? "block" : "hidden md:block"}`}>
              <li><Link href="/products/insurance" className="text-emerald-400 font-bold hover:underline block py-0.5">View All 50+ Policies →</Link></li>
              <li><Link href="/products/insurance/health-insurance" className="hover:text-white transition-colors block py-0.5">Health Insurance</Link></li>
              <li><Link href="/products/insurance/term-life" className="hover:text-white transition-colors block py-0.5">Term Life Insurance</Link></li>
              <li><Link href="/products/insurance/family-floater" className="hover:text-white transition-colors block py-0.5">Family Floater Plans</Link></li>
              <li><Link href="/products/insurance/critical-illness" className="hover:text-white transition-colors block py-0.5">Critical Illness Cover</Link></li>
              <li><Link href="/products/insurance/car-insurance" className="hover:text-white transition-colors block py-0.5">Car / Motor Insurance</Link></li>
              <li><Link href="/products/insurance/two-wheeler-insurance" className="hover:text-white transition-colors block py-0.5">Two Wheeler Policy</Link></li>
              <li><Link href="/products/insurance/home-insurance" className="hover:text-white transition-colors block py-0.5">Home & Fire Insurance</Link></li>
            </ul>
          </div>

          {/* Column 3: Credit Cards */}
          <div className="border-b md:border-b-0 border-emerald-900/60 pb-4 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection("cards")}
              className="w-full flex items-center justify-between md:cursor-default text-left pb-2.5 mb-4 border-b border-emerald-800/60"
            >
              <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-wider">
                Credit Cards
              </h4>
              <ChevronDown className={`w-4 h-4 text-emerald-400 md:hidden transition-transform ${openSection === "cards" ? "rotate-180" : ""}`} />
            </button>
            <ul className={`space-y-2.5 text-xs sm:text-sm font-medium text-emerald-100/75 ${openSection === "cards" ? "block" : "hidden md:block"}`}>
              <li><Link href="/products/credit-cards" className="text-emerald-400 font-bold hover:underline block py-0.5">Compare Best Cards →</Link></li>
              <li><Link href="/products/credit-cards/hdfc-millennia" className="hover:text-white transition-colors block py-0.5">HDFC Millennia</Link></li>
              <li><Link href="/products/credit-cards/sbi-simplyclick" className="hover:text-white transition-colors block py-0.5">SBI SimplyCLICK</Link></li>
              <li><Link href="/products/credit-cards/icici-amazon-pay" className="hover:text-white transition-colors block py-0.5">ICICI Amazon Pay</Link></li>
              <li><Link href="/products/credit-cards/axis-flipkart" className="hover:text-white transition-colors block py-0.5">Axis Flipkart Card</Link></li>
              <li><Link href="/products/credit-cards?category=cashback" className="hover:text-white transition-colors block py-0.5">Cashback Cards</Link></li>
              <li><Link href="/products/credit-cards?category=travel" className="hover:text-white transition-colors block py-0.5">Airport Lounge Cards</Link></li>
              <li><Link href="/products/credit-cards?category=free" className="hover:text-white transition-colors block py-0.5">Lifetime Free Cards</Link></li>
            </ul>
          </div>

          {/* Column 4: Tools & Calculators */}
          <div className="border-b md:border-b-0 border-emerald-900/60 pb-4 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection("tools")}
              className="w-full flex items-center justify-between md:cursor-default text-left pb-2.5 mb-4 border-b border-emerald-800/60"
            >
              <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-wider">
                Tools & Calculators
              </h4>
              <ChevronDown className={`w-4 h-4 text-emerald-400 md:hidden transition-transform ${openSection === "tools" ? "rotate-180" : ""}`} />
            </button>
            <ul className={`space-y-2.5 text-xs sm:text-sm font-medium text-emerald-100/75 ${openSection === "tools" ? "block" : "hidden md:block"}`}>
              <li><Link href="/calculator" className="hover:text-white transition-colors block py-0.5">Home Loan EMI Calculator</Link></li>
              <li><Link href="/eligibility" className="hover:text-white transition-colors block py-0.5">Loan Eligibility Checker</Link></li>
              <li><Link href="/tools/balance-transfer" className="hover:text-white transition-colors block py-0.5">Balance Transfer Savings</Link></li>
              <li><Link href="/tools/stamp-duty" className="hover:text-white transition-colors block py-0.5">Stamp Duty Calculator</Link></li>
              <li><Link href="/tools/prepayment" className="hover:text-white transition-colors block py-0.5">Prepayment Impact Tool</Link></li>
              <li><Link href="/calculator/insurance/hlv" className="hover:text-white transition-colors block py-0.5">Human Life Value (HLV)</Link></li>
              <li><Link href="/calculator/insurance/tax-saver" className="hover:text-white transition-colors block py-0.5">80C & 80D Tax Benefit Tool</Link></li>
              <li><Link href="/calculator/credit-cards/payoff" className="hover:text-white transition-colors block py-0.5">Credit Card Debt Payoff</Link></li>
            </ul>
          </div>

          {/* Column 5: Company & Trust */}
          <div className="border-b md:border-b-0 border-emerald-900/60 pb-4 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection("company")}
              className="w-full flex items-center justify-between md:cursor-default text-left pb-2.5 mb-4 border-b border-emerald-800/60"
            >
              <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-wider">
                Company & Trust
              </h4>
              <ChevronDown className={`w-4 h-4 text-emerald-400 md:hidden transition-transform ${openSection === "company" ? "rotate-180" : ""}`} />
            </button>
            <ul className={`space-y-2.5 text-xs sm:text-sm font-medium text-emerald-100/75 ${openSection === "company" ? "block" : "hidden md:block"}`}>
              <li><Link href="/about" className="hover:text-white transition-colors block py-0.5">About BFS Agra</Link></li>
              <li><Link href="/about/founder" className="hover:text-white transition-colors block py-0.5">Founder & Leadership</Link></li>
              <li><Link href="/about/why-us" className="hover:text-white transition-colors block py-0.5">Why Choose BFS</Link></li>
              <li><Link href="/about/certifications" className="hover:text-white transition-colors block py-0.5">RBI Compliance Status</Link></li>
              <li><Link href="/testimonials" className="hover:text-white transition-colors block py-0.5">Customer Reviews (4.9★)</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors block py-0.5">Financial Blog & Guides</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors block py-0.5">Careers & DSA Partner</Link></li>
              <li><Link href="/appointment" className="hover:text-white transition-colors block py-0.5">Book Appointment</Link></li>
            </ul>
          </div>

        </div>

        {/* Banking Partners Row */}
        <div className="mt-10 pt-8 border-t border-emerald-900/60">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold text-emerald-300/80 uppercase tracking-wider shrink-0">
              Authorized Banking Partners:
            </span>
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2">
              {partnerBanks.map((bank) => (
                <Link
                  key={bank.name}
                  href={bank.href}
                  className="px-3 py-1.5 rounded-lg bg-[#04261c] hover:bg-[#063326] border border-emerald-800/60 hover:border-emerald-400 text-xs font-semibold text-emerald-100 hover:text-white transition-all"
                >
                  {bank.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. CORPORATE HEADQUARTERS & CREDENTIALS */}
      <div className="bg-[#02140e] border-t border-emerald-900/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            
            {/* Brand column */}
            <div className="lg:col-span-5 space-y-3 text-center lg:text-left">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center p-2 shrink-0 border border-emerald-400/30 group-hover:scale-105 transition-transform">
                  <img src="/logo.png" alt="Bhardwaj Financial Services Logo" className="h-full w-full object-contain" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xl font-black text-white leading-none tracking-tight group-hover:text-emerald-300 transition-colors">Bhardwaj Financial</span>
                  <span className="text-[10.5px] font-extrabold text-emerald-400 tracking-[0.2em] uppercase mt-1">Services</span>
                </div>
              </Link>
              <p className="text-xs leading-relaxed text-emerald-100/70 max-w-md">
                Uttar Pradesh&apos;s certified loan advisory, insurance distributor, and credit consultancy. Facilitating 100% digital and doorstep loan processing across India.
              </p>
              
              {/* Social Media Icons */}
              {Object.values(socialLinks).some(v => v) && (
                <div className="flex items-center gap-2.5 pt-2 justify-center lg:justify-start flex-wrap">
                  {socialLinks.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#04261c] border border-emerald-800/60 flex items-center justify-center text-emerald-100/60 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all duration-300" title="Facebook">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#04261c] border border-emerald-800/60 flex items-center justify-center text-emerald-100/60 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-pink-500 hover:text-white transition-all duration-300" title="Instagram">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#04261c] border border-emerald-800/60 flex items-center justify-center text-emerald-100/60 hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white transition-all duration-300" title="YouTube">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#04261c] border border-emerald-800/60 flex items-center justify-center text-emerald-100/60 hover:bg-black hover:border-slate-600 hover:text-white transition-all duration-300" title="Twitter / X">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#04261c] border border-emerald-800/60 flex items-center justify-center text-emerald-100/60 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300" title="LinkedIn">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  )}
                  {socialLinks.whatsappChannel && (
                    <a href={socialLinks.whatsappChannel} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#04261c] border border-emerald-800/60 flex items-center justify-center text-emerald-100/60 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300" title="WhatsApp Channel">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </a>
                  )}
                  {socialLinks.telegram && (
                    <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#04261c] border border-emerald-800/60 flex items-center justify-center text-emerald-100/60 hover:bg-[#0088cc] hover:border-[#0088cc] hover:text-white transition-all duration-300" title="Telegram">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    </a>
                  )}
                  {socialLinks.googleBusiness && (
                    <a href={socialLinks.googleBusiness} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#04261c] border border-emerald-800/60 flex items-center justify-center text-emerald-100/60 hover:bg-[#4285F4] hover:border-[#4285F4] hover:text-white transition-all duration-300" title="Google Business">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Corporate Address */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-1 text-xs text-emerald-100/70">
              <div className="font-extrabold text-white uppercase tracking-wider text-[11px] mb-1.5 flex items-center justify-center lg:justify-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Agra Corporate Headquarters
              </div>
              <p>Block-C11, Shop No.-5, First Floor, near MK Tailor,</p>
              <p>Sanjay Palace, Sanjay Place, Agra, Uttar Pradesh - 282002</p>
              <div className="pt-2 flex flex-col gap-1 text-emerald-200 font-semibold">
                <p>Call Helpline: <a href="tel:9258724227" className="text-emerald-400 hover:underline">+91 9258-724-227</a></p>
                <p>WhatsApp Desk: <a href="https://wa.me/917900979001" className="text-emerald-400 hover:underline">+91 7900-979-001</a></p>
                <p>Email: <a href="mailto:info@bfsfin.com" className="hover:text-emerald-400">info@bfsfin.com</a></p>
              </div>
            </div>

            {/* Trust badge */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
              <div className="bg-[#032319] p-4 rounded-2xl border border-emerald-800/60 space-y-1.5 text-xs text-emerald-100/80 max-w-xs text-left shadow-lg">
                <div className="font-bold text-white text-[12px]">
                  100% RBI Compliant Brokerage
                </div>
                <p className="text-[11px] leading-relaxed text-emerald-100/70">
                  Strict zero upfront brokerage policy. Processing fees are paid directly to the partner lending bank.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. STATUTORY DISCLAIMER STRIP (Clean & Positive with Link to Full Legal Page) */}
      <div className="bg-[#010a07] border-t border-emerald-950 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] leading-relaxed text-emerald-100/60">
          <p className="text-center md:text-left max-w-4xl">
            <strong className="text-emerald-300 font-bold">Regulatory Disclosure:</strong> Bhardwaj Financial Services is an authorized corporate channel partner for leading Banks and NBFCs across India. Credit sanctions, interest rates, and disbursals are governed exclusively by lending bank norms. BFS operates strictly under a zero upfront fee policy.
          </p>
          <Link 
            href="/disclaimer" 
            className="shrink-0 text-emerald-400 hover:text-white font-bold underline transition-colors"
          >
            Read Full Legal Disclaimer →
          </Link>
        </div>
      </div>

      {/* 5. BOTTOM STRIP & LEGAL PROTECTION */}
      <div className="bg-black py-6 border-t border-emerald-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-100/50">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <p>© {new Date().getFullYear()} Bhardwaj Financial Services. All Rights Reserved.</p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-[10px] font-bold text-emerald-400">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  DMCA PROTECTED
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300">
                  <Lock className="w-2.5 h-2.5 text-emerald-400" />
                  256-BIT SSL ENCRYPTED
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-emerald-100/60 font-medium">
              <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
              <Link href="/disclaimer" className="hover:text-emerald-400 transition-colors">Disclaimer</Link>
              <Link href="/sitemap" className="hover:text-emerald-400 transition-colors">Sitemap</Link>
            </div>
          </div>

          <p className="text-[10px] text-center md:text-left text-emerald-100/30 leading-relaxed border-t border-emerald-950/60 pt-3">
            <strong>Copyright & IP Notice:</strong> All proprietary financial algorithms, EMI calculator formulas, website design layout, trademarks, and editorial content are protected under the Indian Copyright Act, 1957. Unauthorized automated scraping, source code decompilation, or cloning is strictly punishable by law.
          </p>
        </div>
        {/* Mobile clearance padding */}
        <div className="h-16 xl:hidden" />
      </div>

      {/* 6. FLOATING SCROLL TO TOP BUTTON (Bottom-Left, unobstructed & accessible) */}
      <ScrollToTop />

    </footer>
  );
}
