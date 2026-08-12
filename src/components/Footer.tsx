import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube, ArrowRight, CheckCircle, FileText, Landmark, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-[#0b132b] text-slate-700 dark:text-slate-300 font-sans border-t-[6px] border-emerald-600 transition-colors duration-300">
      
      {/* Apply Now / Newsletter CTA Banner */}
      <div className="bg-white dark:bg-[#050a1a] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-700 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="text-white max-w-2xl text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black mb-2">Ready to get your dream home?</h3>
              <p className="text-emerald-50 text-lg">Experience Agra's fastest 5-Day home loan approval with zero hidden charges.</p>
            </div>
            <Link href="/apply" className="shrink-0 bg-white text-emerald-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
              Apply Online Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Top Pre-Footer Priority Actions */}
      <div className="bg-white dark:bg-[#050a1a] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 py-6">
            <div className="flex items-center gap-4 py-4 md:py-0 md:pr-8">
              <div className="bg-emerald-100 dark:bg-emerald-900/40 p-3 rounded-full shrink-0">
                <PhoneCall className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Toll Free Sales</p>
                <a href="tel:7900979001" className="text-xl font-black text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">7900-979-001</a>
              </div>
            </div>
            <div className="flex items-center gap-4 py-4 md:py-0 md:px-8">
              <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full shrink-0">
                <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Grievance Redressal</p>
                <Link href="/contact" className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors">
                  Submit a Complaint <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4 py-4 md:py-0 md:pl-8">
              <div className="bg-slate-200 dark:bg-slate-800 p-3 rounded-full shrink-0">
                <FileText className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Partner Login</p>
                <Link href="/portal/partner" className="text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-slate-300 flex items-center gap-1 transition-colors">
                  DSA / Channel Partner <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Detailed Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
          
          {/* Column 1: Products */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block"></span>
              Loan Products
            </h4>
            <ul className="space-y-3.5 text-[13px] font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/products/home-loan" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home Loan</Link></li>
              <li><Link href="/products/balance-transfer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home Loan Balance Transfer</Link></li>
              <li><Link href="/products/loan-against-property" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Loan Against Property (LAP)</Link></li>
              <li><Link href="/products/personal-loan" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Personal Loan</Link></li>
              <li><Link href="/products/business-loan" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Business / MSME Loan</Link></li>
              <li><Link href="/products/plot-loan" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Plot Purchase Loan</Link></li>
              <li><Link href="/products/construction-loan" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Construction Loan</Link></li>
              <li><Link href="/products/nri-home-loan" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">NRI Home Loan</Link></li>
              <li><Link href="/products/car-loan" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Car / Auto Loan</Link></li>
            </ul>
          </div>

          {/* Column 2: Tools & Calculators */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
              Calculators & Tools
            </h4>
            <ul className="space-y-3.5 text-[13px] font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home Loan EMI Calculator</Link></li>
              <li><Link href="/calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Personal Loan EMI Calculator</Link></li>
              <li><Link href="/eligibility" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Loan Eligibility Calculator</Link></li>
              <li><Link href="/tools/balance-transfer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Balance Transfer Calculator</Link></li>
              <li><Link href="/tools/interest-rate-compare" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Interest Rate Comparison</Link></li>
              <li><Link href="/tools/prepayment" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Prepayment Calculator</Link></li>
              <li><Link href="/tools/stamp-duty" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Stamp Duty Calculator</Link></li>
              <li><Link href="/tools/tax-benefit" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Income Tax Benefit Tool</Link></li>
              <li><Link href="/tools/affordability" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Affordability Checker</Link></li>
            </ul>
          </div>

          {/* Column 3: Partner Banks & Rates */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-500 rounded-full inline-block"></span>
              Partner Banks
            </h4>
            <ul className="space-y-3.5 text-[13px] font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/rates" className="text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors flex items-center gap-1">Live Interest Rates <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span></Link></li>
              <li><Link href="/banks/pnb" className="hover:text-slate-900 dark:hover:text-white transition-colors">Punjab National Bank (PNB)</Link></li>
              <li><Link href="/banks/hdfc" className="hover:text-slate-900 dark:hover:text-white transition-colors">HDFC Bank</Link></li>
              <li><Link href="/banks/icici" className="hover:text-slate-900 dark:hover:text-white transition-colors">ICICI Bank</Link></li>
              <li><Link href="/banks/central-bank" className="hover:text-slate-900 dark:hover:text-white transition-colors">Central Bank of India</Link></li>
              <li><Link href="/banks/sbi" className="hover:text-slate-900 dark:hover:text-white transition-colors">State Bank of India (SBI)</Link></li>
              <li><Link href="/banks/axis" className="hover:text-slate-900 dark:hover:text-white transition-colors">Axis Bank</Link></li>
              <li><Link href="/banks/idbi" className="hover:text-slate-900 dark:hover:text-white transition-colors">IDBI Bank</Link></li>
            </ul>
          </div>

          {/* Column 4: Customer Service & Info */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full inline-block"></span>
              Customer Service
            </h4>
            <ul className="space-y-3.5 text-[13px] font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/faqs" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Help Center & FAQs</Link></li>
              <li><Link href="/resources/process" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Loan Application Process</Link></li>
              <li><Link href="/resources/documents" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Documents Required</Link></li>
              <li><Link href="/resources/downloads" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Download Forms & KYC</Link></li>
              <li><Link href="/resources/credit-score" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Check Credit Score</Link></li>
              <li><Link href="/portal/customer" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Track Application Status</Link></li>
              <li><Link href="/contact" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Locate Nearest Branch</Link></li>
              <li><Link href="/apply" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Book an Appointment</Link></li>
            </ul>
          </div>

          {/* Column 5: Corporate */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block"></span>
              Corporate
            </h4>
            <ul className="space-y-3.5 text-[13px] font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/about" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">About BFS Agra</Link></li>
              <li><Link href="/about/founder" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Leadership & Owner</Link></li>
              <li><Link href="/about/certifications" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">RBI Certifications</Link></li>
              <li><Link href="/about/why-us" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Why Choose Us</Link></li>
              <li><Link href="/testimonials" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Customer Success Stories</Link></li>
              <li><Link href="/blogs" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Financial Blog & News</Link></li>
              <li><Link href="/careers" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Careers & Jobs</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Contact Information</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Brand, Address, and Social (Detailed) */}
      <div className="bg-slate-100 dark:bg-[#080e21] border-t border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            
            {/* Brand and Description */}
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white rounded-lg p-2 inline-block border border-slate-200 dark:border-slate-700 shadow-sm">
                  <img src="/logo.png" alt="Bhardwaj Financial Services Logo" className="h-10 w-auto object-contain" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xl font-black text-[#1f4e79] dark:text-[#3a86c6] leading-none tracking-tight">Bhardwaj Finance</span>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-500 tracking-widest uppercase mt-1">Services</span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-6">
                Bhardwaj Financial Services (BFS Agra) is Uttar Pradesh&apos;s leading mortgage advisory and loan distribution company. We bridge the gap between borrowers and top-tier financial institutions, offering personalized, transparent, and ultra-fast financial solutions tailored to your specific needs.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-sky-500 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-blue-700 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-pink-600 hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-red-600 hover:text-white transition-colors"><Youtube className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Corporate Office */}
            <div className="max-w-sm">
              <h5 className="text-slate-900 dark:text-white font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /> Corporate Office
              </h5>
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                  <p leading-relaxed>
                    Commercial Hub, Sanjay Place,<br />
                    Agra, Uttar Pradesh - 282002<br />
                    India
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0" />
                  <a href="mailto:info@bfsagra.com" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">info@bfsagra.com</a>
                </div>
              </div>
            </div>

            {/* Trust Markers */}
            <div>
              <h5 className="text-slate-900 dark:text-white font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-500" /> Trust & Security
              </h5>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /> RBI Compliant & Registered</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /> 256-Bit SSL Encrypted Portal</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /> Data Privacy Guaranteed</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /> 15+ Years Industry Experience</li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Statutory Disclaimer Block - CRITICAL FOR PROFESSIONAL FINANCE SITES */}
      <div className="bg-white dark:bg-[#050a1a] border-t border-slate-200 dark:border-slate-800 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-500 text-justify mb-4">
            <strong className="text-slate-700 dark:text-slate-400">Disclaimer & Statutory Warning:</strong> Bhardwaj Financial Services (BFS Agra) operates exclusively as a loan distributor / advisory channel partner and is not a Non-Banking Financial Company (NBFC) or a Bank. We do not independently sanction, approve, or disburse loans. All loan approvals, interest rates, processing fees, and disbursements are at the sole discretion of our partnering Banks and NBFCs, subject to their internal credit appraisal process, RBI guidelines, and applicant&apos;s creditworthiness (CIBIL score). Interest rates and EMIs displayed on calculators are indicative and subject to change without prior notice. 
          </p>
          <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-500 text-justify">
            <strong className="text-slate-700 dark:text-slate-400">Fraud Warning:</strong> BFS Agra will never ask for advance processing fees in cash or demand OTPs/passwords over the phone. All official communications are routed exclusively through our registered domains (@bfsagra.com) and official toll-free numbers. For grievance redressal or to report suspicious activity, please contact our nodal officer immediately.
          </p>
        </div>
      </div>

      {/* Copyright & Legal Links */}
      <div className="bg-slate-100 dark:bg-[#030612] py-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-600 dark:text-slate-500 font-medium tracking-wide">
          <p>© {new Date().getFullYear()} Bhardwaj Financial Services. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Legal Disclaimer</Link>
            <Link href="/sitemap" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Site Map</Link>
          </div>
        </div>
        
        {/* Bottom padding for mobile nav bar */}
        <div className="h-[64px] xl:hidden"></div>
      </div>

    </footer>
  );
}
