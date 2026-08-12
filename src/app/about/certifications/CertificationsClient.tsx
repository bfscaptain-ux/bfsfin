"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { 
  ShieldCheck, 
  FileCheck, 
  Lock, 
  Landmark, 
  Award, 
  Scale, 
  UserCheck, 
  CheckCircle2,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function CertificationsClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-500/30">
      <Header />
      
      {/* 1. PREMIUM TRUST HERO SECTION */}
      <section className="relative flex items-center justify-center overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        {/* Professional Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-0 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 shadow-inner"
              >
                <ShieldCheck className="w-4 h-4" /> Official Registrations
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-6"
              >
                Regulated. Certified. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-400">100% Trusted.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-8 max-w-xl"
              >
                Bhardwaj Financial Services operates as a fully authorized Direct Selling Agent (DSA) compliant with Reserve Bank of India (RBI) guidelines. Your financial data and dreams are in the safest hands.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center gap-6"
              >
                <div className="flex -space-x-4">
                  <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-sm">
                    <img src="/banks/sbi.png" alt="SBI" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-sm">
                    <img src="/banks/hdfc.png" alt="HDFC" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-sm">
                    <img src="/banks/icici.png" alt="ICICI" className="w-6 h-6 object-contain" />
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 leading-tight">
                  Authorized Partner of <br/><span className="text-slate-900 dark:text-white font-black">50+ Top Banks</span>
                </div>
              </motion.div>
            </div>
            
            {/* Right Content: Premium Verification Card */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-[2rem] transform rotate-3 blur-xl" />
              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 p-8 rounded-[2rem] shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10" />
                
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-inner">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Verified
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">DSA Authorization</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                  Certified by the Reserve Bank of India framework to operate as a Direct Selling Agent for financial products.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Registration Level</span>
                    <span className="text-slate-900 dark:text-white font-bold">Pan-India (Tier 1)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Data Protection</span>
                    <span className="text-slate-900 dark:text-white font-bold">256-bit AES ISO Std.</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Active Partners</span>
                    <span className="text-slate-900 dark:text-white font-bold">50+ Institutions</span>
                  </div>
                </div>
                
                <div className="mt-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-center gap-3 border border-slate-100 dark:border-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Compliance verified and updated for Q3 2026. Zero penalty record.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. OUR OFFICIAL CERTIFICATIONS (DIGITAL BADGES) */}
      <section className="py-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Badge 1 */}
            <motion.div 
              {...fadeInUp}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full transition-transform group-hover:scale-110" />
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                <Landmark className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Authorized DSA</h3>
              <div className="w-10 h-1 bg-blue-500 mb-4 rounded-full" />
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Officially empanelled with over 50+ RBI-regulated Banks and Non-Banking Financial Companies (NBFCs) across India.
              </p>
            </motion.div>

            {/* Badge 2 */}
            <motion.div 
              {...fadeInUp} transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full transition-transform group-hover:scale-110" />
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Data Privacy Assured</h3>
              <div className="w-10 h-1 bg-amber-500 mb-4 rounded-full" />
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Operating with bank-grade 256-bit encryption and strict adherence to the Information Technology Act for data protection.
              </p>
            </motion.div>

            {/* Badge 3 */}
            <motion.div 
              {...fadeInUp} transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full transition-transform group-hover:scale-110" />
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                <FileCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Quality Standards</h3>
              <div className="w-10 h-1 bg-emerald-500 mb-4 rounded-full" />
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Maintaining internal ISO-equivalent quality management systems to ensure error-free loan processing and underwriting assistance.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. RBI GUIDELINES & COMPLIANCE FRAMEWORK */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div {...fadeInUp} className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl transform -rotate-3" />
                <div className="relative bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-3xl">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center shrink-0">
                      <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">Fair Practices Code</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Adopted from RBI Guidelines</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-4">
                    {[
                      "Complete transparency in interest rates and processing fees.",
                      "No coercion or undue pressure during the recovery process.",
                      "Clear communication of terms and conditions in vernacular languages.",
                      "Prompt grievance redressal mechanism within 30 days."
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">
                Operating strictly under <br className="hidden md:block"/>
                <span className="text-blue-600 dark:text-blue-400">RBI Guidelines.</span>
              </h2>
              <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400">
                <p>
                  As an intermediary between you and financial institutions, Bhardwaj Financial Services is legally bound by the Code of Conduct prescribed for Direct Selling Agents by the Reserve Bank of India.
                </p>
                <p>
                  This means we do not charge any upfront hidden fees from customers, we do not misuse your KYC documents, and we ensure that the loan products we recommend genuinely match your financial repayment capacity.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
                  <Award className="w-4 h-4 text-amber-500" /> Trusted Partner
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
                  <UserCheck className="w-4 h-4 text-emerald-500" /> Verified Agents
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. WHY IT MATTERS TO YOU */}
      <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">
              How Our Certifications Protect You
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Compliance isn't just about paperwork; it's about giving you peace of mind during your home buying journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Zero Hidden Fees",
                desc: "We are prohibited from taking secret cuts. What you see on the bank's sanction letter is exactly what you pay."
              },
              {
                title: "KYC Security",
                desc: "Your PAN, Aadhar, and bank statements are shared only via encrypted channels directly to the bank's servers."
              },
              {
                title: "No Unsolicited Calls",
                desc: "We respect your privacy. Your number is never sold to third-party marketers or telecallers."
              },
              {
                title: "Accurate CIBIL",
                desc: "We run soft checks and match you with the right bank to prevent multiple hard inquiries from dropping your CIBIL score."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp} transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Apply with Confidence.</h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Experience India's most secure and transparent home loan process.</p>
        <Link href="/apply" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-transform">
          Start Your Secure Application <ShieldCheck className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
