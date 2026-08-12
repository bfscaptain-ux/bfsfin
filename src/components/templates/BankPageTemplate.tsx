"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, MapPin, Phone, Check, Building2, Info, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BankRateData } from "@/types/bank";
import { getLiveRates } from "@/actions/rates";

interface BankPageTemplateProps {
  data: BankRateData;
}

export default function BankPageTemplate({ data }: BankPageTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [liveData, setLiveData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const live = await getLiveRates();
      setLiveData(live);
    }
    load();
  }, []);

  const bankData = liveData && liveData.banks[data.slug] 
    ? { ...data, ...liveData.banks[data.slug] } 
    : data;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Structured Data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": `${data.name} Home Loan`,
    "description": data.seoDescription,
    "brand": {
      "@type": "Brand",
      "name": data.name
    },
    "provider": {
      "@type": "Organization",
      "name": "Bhardwaj Financial Services"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://bfsfin.com/banks/${data.slug}`,
      "priceCurrency": "INR"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-900 dark:to-[#0b132b] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full font-bold text-sm shadow-sm border border-emerald-100 dark:border-slate-700">
              <Building2 className="w-4 h-4" /> Partner Bank
            </motion.div>
            
            <motion.h1 {...fadeIn} className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {data.name} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Home Loan</span>
            </motion.h1>
            
            <motion.p {...fadeIn} transition={{ delay: 0.1 }} className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
              Get instant approvals, flexible tenures, and exclusive processing fee waivers when you apply for a {data.name} Home Loan through Bhardwaj Financial Services.
            </motion.p>
            
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <Link href="/apply" className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition transform hover:-translate-y-0.5 text-center">
                Apply for Loan
              </Link>
              <a href="tel:7900979001" className="w-full sm:w-auto bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold px-8 py-3.5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition text-center flex justify-center items-center gap-2">
                <Phone className="w-4 h-4" /> Call 7900-979-001
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-3xl blur opacity-20 dark:opacity-40 animate-pulse"></div>
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <Building2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">Current Rates</h3>
              
              <div className="w-full space-y-4 relative">
                {!isAuthenticated && (
                  <div className="absolute inset-0 z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[6px] rounded-2xl flex flex-col items-center justify-center border border-slate-200/50 dark:border-slate-700/50 transition-all m-0">
                    <Lock className="w-6 h-6 text-slate-600 dark:text-slate-400 mb-2" />
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 text-center px-4">Confidential Rates</span>
                    <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-colors shadow-lg">
                      Login to View
                    </Link>
                  </div>
                )}
                
                <div className={`bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center ${!isAuthenticated ? 'blur-[6px] opacity-50 select-none' : ''}`}>
                  <span className="text-sm font-bold text-slate-500">Salaried</span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{isAuthenticated ? bankData.salariedRate : "8.50% - 9.15%"}</span>
                </div>
                <div className={`bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center ${!isAuthenticated ? 'blur-[6px] opacity-50 select-none' : ''}`}>
                  <span className="text-sm font-bold text-slate-500">Self-Employed</span>
                  <span className="text-xl font-black text-blue-600 dark:text-blue-400">{isAuthenticated ? bankData.selfEmployedRate : "8.65% - 9.25%"}</span>
                </div>
                <div className={`bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800 flex justify-between items-center ${!isAuthenticated ? 'blur-[6px] opacity-50 select-none' : ''}`}>
                  <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Processing Fee</span>
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 text-right">{isAuthenticated ? bankData.processingFee : "0.35% (Max ₹10,000)"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20 space-y-16">
        
        {/* Overview & Benefits */}
        <section className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">About {data.name} Home Loans</h2>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
              {data.overview.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm h-full">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Key Benefits</h3>
              <ul className="space-y-4">
                {data.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Why choose {data.name}?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.features.map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Documents & Calculator Split */}
        <section className="grid lg:grid-cols-2 gap-12">
          {/* Documents */}
          <div className="bg-slate-900 dark:bg-slate-950 p-8 sm:p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
            <h3 className="text-2xl font-black mb-8 relative z-10">Documents Required</h3>
            <div className="space-y-8 relative z-10">
              {data.documents.map((docCategory, idx) => (
                <div key={idx}>
                  <h4 className="font-bold text-emerald-400 mb-3 uppercase tracking-wider text-sm">{docCategory.category}</h4>
                  <ul className="space-y-2">
                    {docCategory.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-slate-300">
                        <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800 relative z-10">
              <Link href="/resources/documents" className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                View complete documentation guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick EMI CTA */}
          <div className="bg-emerald-50 dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 p-8 sm:p-10 rounded-3xl flex flex-col justify-center text-center">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Calculate Your EMI</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm mx-auto">
              Use our advanced EMI calculator to plan your home loan repayment with {data.name}'s current interest rates.
            </p>
            <Link href="/calculator" className="bg-slate-900 dark:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-slate-800 dark:hover:bg-emerald-500 transition-colors shadow-xl mx-auto inline-flex items-center gap-2">
              Open EMI Calculator <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="font-bold text-slate-900 dark:text-white pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-2xl p-4 flex gap-3 text-sm text-amber-800 dark:text-amber-200 mt-8">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            <strong>Disclaimer:</strong> {data.name} interest rates and fees mentioned are for informational purposes based on current market data. Final approval, rates, and fee waivers are at the sole discretion of the bank based on the applicant's credit profile.
          </p>
        </div>

      </main>
      
      <Footer />
      <FloatingSupport />
    </div>
  );
}
