"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown, ChevronRight, HelpCircle, ChevronLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FAQ } from "@/types/faq";
import Script from "next/script";

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  
  const categories = ["All", "Eligibility", "Home Loans", "Processing Fees", "Documentation"];

  useEffect(() => {
    fetchFaqs();
  }, [page]);

  const fetchFaqs = () => {
    setLoading(true);
    fetch(`/api/faqs?page=${page}&limit=500&status=published`)
      .then(res => res.json())
      .then(res => {
        setFaqs(res.data || []);
        setTotalPages(res.meta?.totalPages || 1);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load FAQs", err);
        setLoading(false);
      });
  };

  const filteredFaqs = faqs.filter(f => {
    const matchesSearch = f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || f.category === category;
    return matchesSearch && matchesCategory;
  });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Generate JSON-LD Schema for FAQs loaded on current page
  const generateSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": filteredFaqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer.replace(/<[^>]*>?/gm, '') // Strip HTML for schema
        }
      }))
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      {/* Schema Injection */}
      {!loading && filteredFaqs.length > 0 && (
        <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }} />
      )}

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-slate-900 dark:to-emerald-950 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-emerald-200/50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 px-4 py-2 rounded-full font-bold text-sm">
            <HelpCircle className="w-4 h-4" /> Got Questions?
          </motion.div>
          
          <motion.h1 {...fadeIn} className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">Questions</span>
          </motion.h1>
          <motion.p {...fadeIn} transition={{ delay: 0.1 }} className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Find quick answers to common questions about home loans, processing fees, and eligibility.
          </motion.p>

          {/* Search & Filter Bar */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="max-w-3xl mx-auto mt-10 space-y-6">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-500/60" />
              <input 
                type="text" 
                placeholder="Search for any question..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-full bg-white dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-semibold text-slate-800 dark:text-slate-200 text-base sm:text-lg"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(c => (
                <button 
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm hover:shadow-md ${
                    category === c 
                      ? 'bg-emerald-500 text-slate-900 scale-105 ring-2 ring-emerald-400 ring-offset-2 ring-offset-emerald-50 dark:ring-offset-emerald-950' 
                      : 'bg-white dark:bg-emerald-800/40 text-slate-600 dark:text-slate-300 border border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20">
        
        {loading ? (
          <div className="space-y-4">
            {/* SKELETON LOADERS */}
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="bg-white dark:bg-emerald-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-emerald-800 animate-pulse flex justify-between items-center">
                <div className="h-5 bg-emerald-200 dark:bg-emerald-800/50 rounded w-3/4"></div>
                <div className="h-5 w-5 bg-emerald-200 dark:bg-emerald-800/50 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-emerald-900 rounded-3xl border border-slate-200 dark:border-emerald-800 shadow-xl">
            <HelpCircle className="w-16 h-16 text-emerald-500/50 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-slate-700 dark:text-slate-300">No FAQs found.</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search criteria or contact support.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => (
              <motion.div 
                key={faq.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <Link href={`/faq/${faq.slug}`} className="flex justify-between items-center p-6 w-full text-left">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors pr-8">
                    {faq.question}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-full bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300 disabled:opacity-50 hover:bg-emerald-50 dark:hover:bg-emerald-800 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="font-bold text-slate-600 dark:text-slate-400">
              Page {page} of {totalPages}
            </span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-full bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300 disabled:opacity-50 hover:bg-emerald-50 dark:hover:bg-emerald-800 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* CTA Card */}
        <div className="mt-16 bg-emerald-900 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <HelpCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4 relative z-10" />
           <h3 className="text-2xl font-black text-white mb-2 relative z-10">Still have questions?</h3>
           <p className="text-emerald-100 mb-8 max-w-md mx-auto relative z-10">Can't find the answer you're looking for? Please chat to our friendly team.</p>
           <Link href="/contact" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black px-8 py-3 rounded-full transition shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 relative z-10">
             Contact Support
           </Link>
        </div>

      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
