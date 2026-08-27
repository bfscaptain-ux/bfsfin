"use client";
import { useState, useEffect } from "react";
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
  const [bankLogos, setBankLogos] = useState<{ id: string, bankName: string, logoUrl: string }[]>([]);
  const [certifications, setCertificates] = useState<{
    id: string; title: string; issuer: string; registrationNo: string; validity: string; description: string; imageUrl: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    fetch("/api/bank-logos")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBankLogos(data);
        }
      })
      .catch(console.error);

    fetch("/api/certifications")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setCertificates(data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 font-sans selection:bg-emerald-500/30">
      <Header />
      
      {/* 1. SIMPLE & PREMIUM HERO SECTION */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 bg-white overflow-hidden border-b border-slate-100">
        {/* Subtle Premium Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-50/80 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold tracking-[0.15em] uppercase mb-8"
            >
              <ShieldCheck className="w-4 h-4" /> Official Compliance & Registrations
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight"
            >
              Regulated. Certified. <br />
              <span className="text-emerald-600">100% Trusted.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-500 leading-relaxed font-light mb-12 max-w-3xl mx-auto"
            >
              Bhardwaj Financial Services operates as a fully authorized Direct Selling Agent (DSA) compliant with Reserve Bank of India (RBI) guidelines. Your financial data and dreams are in the safest hands.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 bg-white p-4 pr-6 rounded-full border border-slate-200 shadow-xl shadow-slate-200/40 max-w-2xl"
            >
              <div className="text-sm font-semibold text-slate-500 leading-tight shrink-0 pl-4">
                Authorized Partner of <br/><span className="text-slate-900 font-black text-lg">50+ Top Banks</span>
              </div>

              <div className="w-[1px] h-10 bg-slate-200 hidden sm:block mx-2" />

              <div className="relative flex-1 overflow-hidden h-12 flex items-center w-full max-w-sm">
                {/* Gradient Masks for Marquee */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />
                
                {bankLogos.length > 0 ? (
                  <motion.div 
                    className="flex items-center gap-6 pr-6"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  >
                    {[...bankLogos, ...bankLogos, ...bankLogos, ...bankLogos].map((logo, idx) => (
                      <div key={idx} className="w-10 h-10 shrink-0 rounded-full border border-slate-100 bg-white flex items-center justify-center p-1.5 shadow-sm">
                        <img src={logo.logoUrl} alt={logo.bankName} className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-4">
                    {/* Fallback Static Logos if DB is empty */}
                    <div className="w-10 h-10 rounded-full border border-slate-100 bg-white flex items-center justify-center p-1.5 shadow-sm">
                      <img src="/banks/sbi.png" alt="SBI" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-100 bg-white flex items-center justify-center p-1.5 shadow-sm">
                      <img src="/banks/hdfc.png" alt="HDFC" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-100 bg-white flex items-center justify-center p-1.5 shadow-sm">
                      <img src="/banks/icici.png" alt="ICICI" className="w-full h-full object-contain" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. OFFICIAL REGISTRY / LEGAL DOCUMENTS */}
      <section className="py-20 bg-slate-100 dark:bg-emerald-950/50 border-y border-slate-200 dark:border-slate-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Official Legal Vault</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our verifiable business registrations, licenses, and official compliances.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {loading ? (
              // Skeleton Loaders
              [1, 2, 3].map((_, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative animate-pulse">
                  <div className="h-2 w-full bg-slate-200" />
                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="w-24 h-24 bg-slate-200 rounded-2xl shrink-0" />
                    <div className="flex-1 space-y-4 w-full">
                      <div className="h-4 bg-slate-200 rounded w-1/4" />
                      <div className="h-8 bg-slate-200 rounded w-3/4" />
                      <div className="h-16 bg-slate-200 rounded w-full" />
                    </div>
                    <div className="w-32 flex flex-col gap-2 items-end">
                      <div className="h-6 w-24 bg-slate-200 rounded-full" />
                      <div className="h-4 w-16 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
              ))
            ) : certifications.length > 0 ? (
              <>
                {certifications.slice(0, visibleCount).map((cert, idx) => (
                  <motion.div 
                    key={cert.id}
                    {...fadeInUp} transition={{ delay: (idx % visibleCount) * 0.1 }}
                    className="relative group perspective"
                  >
                    {/* Outer Premium Frame */}
                    <div className="bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.15)] transition-all duration-500 overflow-hidden relative transform group-hover:-translate-y-1 border border-slate-200">
                      
                      {/* Top Accent Bar */}
                      <div className="h-2 w-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600" />
                      
                      <div className="p-6 md:p-10 relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
                        
                        {/* Massive Faint Background Seal */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center overflow-hidden">
                          <Award className="w-[800px] h-[800px] text-emerald-900 absolute -right-20" />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                          
                          {/* Logo Area */}
                          <div className="flex flex-col items-center md:items-start shrink-0">
                            <div className="w-24 h-24 bg-white rounded-2xl p-3 shadow-[0_5px_20px_rgba(0,0,0,0.05)] flex items-center justify-center border border-slate-100 mb-4">
                              {cert.imageUrl ? (
                                <img src={cert.imageUrl} alt={cert.issuer || "Logo"} className="w-full h-full object-contain" />
                              ) : (
                                <FileText className="w-10 h-10 text-slate-300" />
                              )}
                            </div>
                            <div className="text-center md:text-left">
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-2 border border-emerald-100 shadow-sm">
                                <CheckCircle2 className="w-3 h-3" /> Verified
                              </div>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                                Valid: <span className="text-slate-700">{cert.validity || "N/A"}</span>
                              </p>
                            </div>
                          </div>

                          {/* Body: Titles & Description */}
                          <div className="flex-1 text-center md:text-left border-l-0 md:border-l-2 md:border-emerald-500/20 md:pl-8">
                            <h4 className="text-[10px] font-bold text-emerald-600 mb-2 uppercase tracking-[0.3em]">
                              {cert.issuer || "Issuing Authority"}
                            </h4>
                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 font-serif leading-tight">
                              {cert.title || "Official Certification"}
                            </h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed italic font-serif mb-6">
                              "{cert.description || "Authorized and verified entity."}"
                            </p>
                            
                            {/* Footer inside Body */}
                            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-200/60 gap-4">
                              <div className="text-center sm:text-left">
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Official Registration No.</p>
                                <p className="font-mono text-slate-800 font-bold tracking-tight bg-slate-100 px-3 py-1 rounded border border-slate-200 inline-block text-sm">
                                  {cert.registrationNo || "PENDING"}
                                </p>
                              </div>
                              
                              {/* Premium Golden/Emerald Seal */}
                              <div className="w-14 h-14 relative shrink-0">
                                <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500 fill-current animate-[spin_60s_linear_infinite] drop-shadow-md">
                                  <path d="M50 0l5 15h15l-10 10 5 15-15-5-15 5 5-15-10-10h15z" />
                                  <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="4" strokeDasharray="6 3"/>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <ShieldCheck className="w-5 h-5 text-white drop-shadow-sm" />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {visibleCount < certifications.length && (
                  <div className="flex justify-center pt-8">
                    <button 
                      onClick={() => setVisibleCount(prev => prev + 3)}
                      className="px-8 py-3 bg-white border-2 border-emerald-500 text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 hover:scale-105 transition-all shadow-md"
                    >
                      Load More Certificates
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 text-slate-500 font-bold bg-white rounded-xl border border-slate-200">
                No legal certificates loaded.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. RBI GUIDELINES & COMPLIANCE FRAMEWORK */}
      <section className="py-16 md:py-24 bg-white dark:bg-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div {...fadeInUp} className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl transform -rotate-3" />
                <div className="relative bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-3xl">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shrink-0">
                      <Scale className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
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
                <span className="text-emerald-600 dark:text-emerald-400">RBI Guidelines.</span>
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
      <section className="py-20 md:py-32 bg-slate-50 dark:bg-emerald-950">
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
                className="bg-white dark:bg-emerald-900 p-6 rounded-2xl border border-slate-200 dark:border-emerald-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
              >
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
      <FloatingSupport />
    </div>
  );
}
