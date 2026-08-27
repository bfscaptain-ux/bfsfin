"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, User, Search, Filter, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BlogPost } from "@/types/blog";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Home Loans", "Tax Guidance", "Balance Transfer", "Credit Rating", "Market Trends"];

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const fetchBlogs = () => {
    setLoading(true);
    fetch(`/api/blogs?page=${page}&limit=10&status=published`)
      .then(res => res.json())
      .then(res => {
        setBlogs(res.data || []);
        setTotalPages(res.meta?.totalPages || 1);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load blogs", err);
        setLoading(false);
      });
  };

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || (b.excerpt && b.excerpt.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category === "All" || b.category === category;
    return matchesSearch && matchesCategory;
  });

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

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20">
        
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SKELETON LOADERS */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-emerald-900 rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-emerald-800 animate-pulse">
                <div className="h-48 bg-emerald-200 dark:bg-emerald-800/50 w-full"></div>
                <div className="p-6 space-y-4">
                  <div className="flex gap-2">
                    <div className="h-4 bg-emerald-200 dark:bg-emerald-800/50 rounded w-1/4"></div>
                    <div className="h-4 bg-emerald-200 dark:bg-emerald-800/50 rounded w-1/4"></div>
                  </div>
                  <div className="h-6 bg-emerald-300 dark:bg-emerald-700/50 rounded w-3/4"></div>
                  <div className="h-4 bg-emerald-200 dark:bg-emerald-800/50 rounded w-full"></div>
                  <div className="h-4 bg-emerald-200 dark:bg-emerald-800/50 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-emerald-900 rounded-3xl border border-slate-200 dark:border-emerald-800 shadow-xl">
            <BookOpen className="w-16 h-16 text-emerald-500/50 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-slate-700 dark:text-slate-300">No articles found.</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, idx) => (
              <motion.article 
                key={blog.id} 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col"
              >
                <Link href={`/blog/${blog.slug}`} className="block h-48 overflow-hidden relative cursor-pointer">
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-500 text-slate-900 font-bold px-3 py-1 rounded-full text-xs shadow-lg">
                    {blog.category}
                  </div>
                </Link>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-emerald-500" /> {blog.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-500" /> {blog.readTime || '3 min read'}</span>
                  </div>
                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
                    {blog.excerpt || (blog.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...')}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-emerald-800/50 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <User className="w-4 h-4 text-emerald-500" /> {blog.author}
                    </span>
                    <Link href={`/blog/${blog.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors group/link">
                      Read <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
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

      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
