"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, ChevronDown, Percent, Target, Wallet, TrendingDown, Zap, PiggyBank, ShieldCheck, Clock, Map, CheckCircle, Shield, Hammer, Building, RefreshCw, Globe, Users, Briefcase, Unlock, GraduationCap, Box, Car } from "lucide-react";
import { ProductData } from "@/types/product";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import DynamicFaq from "@/components/DynamicFaq";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";

// Map string names from data to Lucide Icons
const iconMap: Record<string, React.FC<any>> = {
  Percent, Target, Wallet, TrendingDown, Zap, PiggyBank, ShieldCheck, 
  Clock, Map, CheckCircle, Shield, Hammer, Building, RefreshCw, 
  Globe, Users, Briefcase, Unlock, GraduationCap, Box, Car
};

export default function ProductPageTemplate({ data, calculator }: { data: ProductData; calculator?: React.ReactNode }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroImageUrl, setHeroImageUrl] = useState("");

  useEffect(() => {
    fetch("/api/hero-images")
      .then(res => res.json())
      .then(images => {
        const matching = images.find((img: any) => img.pageId === `products/${data.slug}`);
        if (matching) {
          setHeroImageUrl(matching.imageUrl);
        }
      })
      .catch(err => console.error(err));
  }, [data.slug]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { staggerChildren: 0.2 }
  };

  // Structured Data for SEO/AEO (FAQ Schema)
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

  // Structured Data for FinancialProduct
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": data.name,
    "brand": {
      "@type": "Brand",
      "name": "Bhardwaj Financial Services"
    },
    "description": data.heroDescription,
    "offers": {
      "@type": "Offer",
      "url": `https://bfsfin.in/products/${data.slug}`
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      {/* Inject Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {/* Hero Section with Bottom Curve */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pb-40 bg-gradient-to-br from-emerald-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-950">
        {/* Dynamic Background Image overlay from CMS */}
        {heroImageUrl && (
          <>
            {/* The Image */}
            <div className="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-40 mix-blend-multiply dark:mix-blend-normal pointer-events-none" style={{ backgroundImage: `url('${heroImageUrl}')` }}></div>
            
            {/* The Ultimate Gradient Mask for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-emerald-50/95 to-emerald-50/0 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900/10 pointer-events-none"></div>
          </>
        )}
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="inline-block text-xs uppercase font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 tracking-wider shadow-sm">
              {data.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              {data.heroHeadline.split(' ').map((word, i, arr) => {
                if (i >= arr.length - 2) {
                  return <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600 dark:from-emerald-400 dark:to-emerald-400">{word} </span>;
                }
                return word + " ";
              })}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              {data.heroDescription}
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/apply" className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-600 text-white font-extrabold px-8 py-4 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/25 flex items-center gap-2">
                <span className="relative z-10">Apply For {data.name}</span> 
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 bg-white/80 dark:bg-emerald-900/80 border border-white/50 dark:border-slate-700/50 p-8 rounded-3xl shadow-2xl backdrop-blur-xl"
          >
            <h3 className="font-bold text-slate-900 dark:text-white text-lg border-b border-slate-200 dark:border-emerald-800 pb-4 mb-4">Quick Glance</h3>
            <div className="space-y-4 text-sm">
              {data.quickFacts.map((fact, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-emerald-800/60 last:border-0">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">{fact.label}</span>
                  <span className={`font-bold ${fact.highlight ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-md' : 'text-slate-900 dark:text-white'}`}>
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Custom SVG Bottom Curve (Clean & Professional) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-24 py-16">
        
        {/* Optional Interactive Calculator Injection */}
        {calculator && (
          <motion.section {...fadeIn} className="-mt-32 relative z-20">
            {calculator}
          </motion.section>
        )}

        {/* Overview & Benefits Section */}
        <motion.section {...fadeIn} className={`mt-16 grid grid-cols-1 ${data.benefits && data.benefits.length > 0 ? 'lg:grid-cols-3 gap-12' : ''}`}>
          
          {/* Detailed Overview Content */}
          <div className={data.benefits && data.benefits.length > 0 ? "lg:col-span-2 space-y-6" : "max-w-4xl mx-auto space-y-6"}>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">About {data.name}</h2>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
              {data.overview?.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Key Benefits Side Card */}
          {data.benefits && data.benefits.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-100 dark:border-emerald-500/20 p-8 rounded-3xl h-full shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /> Key Benefits
                </h3>
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
          )}
        </motion.section>

        {/* Why Choose Us Features */}
        <motion.section {...fadeIn} className="space-y-10 mt-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Why Choose Our {data.name}?</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">We partner with top banks to bring you unbeatable terms, transparency, and zero hidden charges.</p>
          </div>

          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || CheckCircle2;
              return (
                <motion.div key={index} variants={fadeIn} className="bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-200 dark:border-emerald-500/20">
                    <IconComponent className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Eligibility & Documents */}
        <motion.section {...fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 p-8 sm:p-10 rounded-3xl shadow-sm flex flex-col h-full">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-7 h-7 text-emerald-500" /> Who Can Apply?
            </h3>
            <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300 flex-1">
              {data.eligibility.map((criteria, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">{index + 1}</span>
                  <span><strong>{criteria.title}:</strong> {criteria.description}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-900 dark:bg-emerald-950 border border-emerald-600/30 dark:border-emerald-800 p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />
            <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6 relative z-10">
              <FileText className="w-7 h-7 text-emerald-400" /> Document Checklist
            </h3>
            <div className="space-y-6 flex-1 relative z-10">
              {data.documents.map((category, index) => (
                <div key={index}>
                  <h4 className="text-emerald-400 font-bold text-sm uppercase mb-3">{category.category}</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 bg-slate-800/50 dark:bg-emerald-900/50 p-2.5 rounded-xl border border-slate-700/50">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FAQs */}
        <motion.section {...fadeIn} className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <DynamicFaq category={data.name} />
          </div>
        </motion.section>

      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
