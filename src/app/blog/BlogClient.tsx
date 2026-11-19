"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, User, Search, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BlogPost } from "@/types/blog";

export default function BlogClient({ initialBlogs = [] }: { initialBlogs: BlogPost[] }) {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Home Loans", "Tax Guidance", "Balance Transfer", "Credit Rating", "Market Trends"];

  // Optionally fetch updates from API on mount
  useEffect(() => {
    fetch(`/api/blogs?limit=500&status=published`)
      .then(res => res.json())
      .then(res => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setBlogs(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || (b.excerpt && b.excerpt.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category === "All" || b.category === category;
    return matchesSearch && matchesCategory;
  });

  const itemsPerPage = 12;
  const totalClientPages = Math.max(1, Math.ceil(filteredBlogs.length / itemsPerPage));
  const paginatedBlogs = filteredBlogs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setPage(1);
  }, [search, category]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-slate-900 dark:to-emerald-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-emerald-200/50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 px-4 py-2 rounded-full font-bold text-sm">
            <BookOpen className="w-4 h-4" /> BFS Knowledge Base
          </motion.div>
          
          <motion.h1 {...fadeIn} className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">Blog & Articles</span>
          </motion.h1>
          <motion.p {...fadeIn} transition={{ delay: 0.1 }} className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Stay updated with the latest trends in real estate, home loans, and personal finance. Expert advice directly from industry insiders.
          </motion.p>

          {/* Search & Filter Bar */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="max-w-4xl mx-auto mt-10 space-y-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-500/60" />
              <input 
                type="text" 
                placeholder="Search for articles, guides, or keywords..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-full bg-white dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-semibold text-slate-800 dark:text-slate-200 text-base sm:text-lg placeholder:text-slate-400"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(c => (
                <button 
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer ${
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

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20">
        {paginatedBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-emerald-900/30 rounded-3xl border border-emerald-100 dark:border-emerald-800 shadow-xl max-w-xl mx-auto p-8">
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">No articles found</p>
            <p className="text-slate-500 text-sm mt-2">Try searching for something else or reset your filter.</p>
            <button 
              onClick={() => { setSearch(""); setCategory("All"); }}
              className="mt-6 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-xl transition-all shadow-md cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedBlogs.map((b) => (
                <article 
                  key={b.id || b.slug} 
                  className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  {b.imageUrl && (
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img 
                        src={b.imageUrl} 
                        alt={b.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-slate-100 dark:border-slate-800 shadow-sm">
                        {b.category || "Finance"}
                      </span>
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                          {b.date ? new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Recent"}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-emerald-500" />
                          {b.author || "BFS Research"}
                        </span>
                      </div>

                      <h2 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blog/${b.slug}`}>
                          {b.title}
                        </Link>
                      </h2>

                      {b.excerpt && (
                        <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                          {b.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <Link 
                        href={`/blog/${b.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:gap-2.5 transition-all"
                      >
                        Read Article <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {totalClientPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-14">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-200 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400 px-3">
                  Page {page} of {totalClientPages}
                </span>
                <button
                  disabled={page >= totalClientPages}
                  onClick={() => setPage(p => Math.min(totalClientPages, p + 1))}
                  className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-200 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
