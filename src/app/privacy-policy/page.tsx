import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, Database, Server, Mail, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bhardwaj Financial Services',
  description: 'Privacy Policy and data protection guidelines for Bhardwaj Financial Services (BFS Agra). Learn how we secure your financial data and comply with RBI and GDPR regulations.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16 selection:bg-emerald-500/30">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-50 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl opacity-50 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-slate-200 font-medium">Privacy Policy</span>
        </nav>

        {/* Header Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold mb-6 shadow-sm border border-emerald-200/50 dark:border-emerald-800/50">
            <ShieldCheck className="w-4 h-4" />
            <span>Updated: September 2026</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            Privacy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Data Protection</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            At Bhardwaj Financial Services (BFS Agra), we take your privacy and data security seriously. As an RBI-compliant financial advisory, we implement enterprise-grade security to ensure your personal and financial information remains strictly confidential.
          </p>
        </div>

        {/* Content Container - Glassmorphic Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden">
          
          {/* Top Line Gradient */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600"></div>

          <div className="prose prose-slate dark:prose-invert prose-emerald max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300">
            
            <p className="text-base font-medium">
              This Privacy Policy describes how Bhardwaj Financial Services (&quot;BFS&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, and shares your personal information when you visit our website, use our services, or interact with our digital platforms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <Database className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 mt-0">Data Collection</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 m-0">We only collect data that is strictly necessary for processing your financial applications and providing advisory services.</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <Lock className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 mt-0">Bank-Grade Security</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 m-0">Your documents and PAN data are encrypted using 256-bit AES encryption before being routed to our partner banks.</p>
              </div>
            </div>

            <h2 className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-emerald-500" />
              1. Information We Collect
            </h2>
            <p>
              To provide you with loans, insurance, MSME registration, or ITR filing services, we may collect the following types of information:
            </p>
            <ul>
              <li><strong>Personal Identifiers:</strong> Name, email address, phone number, and physical address.</li>
              <li><strong>Financial Information:</strong> Income details, employment type, loan requirements, and PAN card number (when explicitly provided by you for ITR or loan processing).</li>
              <li><strong>Technical Data (Cookies & Analytics):</strong> IP address, device type, browser information, and geolocation (to route your request to the nearest branch).</li>
            </ul>

            <h2 className="flex items-center gap-3">
              <Server className="w-6 h-6 text-emerald-500" />
              2. How We Use Your Information
            </h2>
            <p>
              Your data is utilized strictly for business purposes under strict confidentiality agreements. We use your information to:
            </p>
            <ul>
              <li>Process and verify your loan, insurance, or compliance applications.</li>
              <li>Communicate with you regarding the status of your applications via Call, SMS, Email, or WhatsApp.</li>
              <li>Share necessary details with our official banking partners (e.g., PNB, HDFC, IDBI) solely for loan approvals.</li>
              <li>Improve our website&apos;s performance and user experience using Analytics.</li>
              <li>Comply with legal, regulatory, and RBI guidelines for KYC and Anti-Money Laundering (AML).</li>
            </ul>

            <h2 className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-emerald-500" />
              3. Cookies and Tracking Technologies
            </h2>
            <p>
              Our website uses cookies to distinguish you from other users, providing a personalized and advanced browsing experience. 
            </p>
            <p>
              When you interact with our Cookie Consent banner, your preference is saved locally on your device. We use tracking technologies (like Google Analytics and Meta Pixel) strictly for optimizing our marketing campaigns. If you accept cookies, these third-party services may collect anonymized traffic data to help us serve you better. We do not sell your personal data to any third-party marketing agencies.
            </p>

            <h2 className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              4. Data Sharing and Third Parties
            </h2>
            <p>
              BFS acts as a bridge between you and financial institutions. We may share your data with:
            </p>
            <ul>
              <li><strong>Banking Partners:</strong> Authorized banks and NBFCs to process your loan applications.</li>
              <li><strong>Government Portals:</strong> Income Tax Department or MSME Ministry for specific compliance filings.</li>
              <li><strong>Service Providers:</strong> Secure cloud hosting, SMS/OTP gateways, and email dispatchers.</li>
            </ul>
            <p>
              We ensure all our partners adhere to strict data protection regulations. We <strong>never</strong> sell your data to unauthorized third parties.
            </p>

            <h2 className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-emerald-500" />
              5. Contacting Our Grievance Officer
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding your data, or if you wish to withdraw your consent for data processing, please contact our Grievance and Compliance Desk:
            </p>
            
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-800/40 mt-8 shadow-sm group hover:shadow-md transition-all duration-300 not-prose">
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-teal-500/10 blur-xl group-hover:bg-teal-500/20 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center border border-emerald-100 dark:border-slate-700">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Bhardwaj Financial Services</h4>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">Grievance & Compliance Desk</p>
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

        {/* Footer spacing */}
        <div className="h-12"></div>
      </div>
    </div>
  );
}
