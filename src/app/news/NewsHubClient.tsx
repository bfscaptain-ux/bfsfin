"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { NewsArticle } from "@/types/news";
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  Building2,
  FileCheck2,
  HelpCircle,
  Tag,
  Landmark,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  X,
  Eye,
  CheckCircle2
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Loans & EMIs",
  "CIBIL & Credit",
  "Banking & RBI",
  "Taxes & MSME",
  "BFS Official"
];

export default function NewsHubClient({ initialArticles }: { initialArticles: NewsArticle[] }) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles || []);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Real-time live client sync with API to guarantee immediate reflection of deletes/edits
  useEffect(() => {
    let isMounted = true;
    fetch(`/api/news?status=published&_t=${Date.now()}`, { cache: "no-store" })
      .then(res => res.json())
      .then(json => {
        if (isMounted && json && Array.isArray(json.data)) {
          setArticles(json.data);
        }
      })
      .catch(err => {
        console.warn("Live news sync:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const trendingArticle = useMemo(() => {
    return articles.find(a => a.isTrending) || articles[0];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory =
        selectedCategory === "All" ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        (article.tldr && article.tldr.some(t => t.toLowerCase().includes(query))) ||
        article.content.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: articles.length };
    articles.forEach(a => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, [articles]);

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Banking & RBI":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25";
      case "Loans & EMIs":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25";
      case "CIBIL & Credit":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25";
      case "Taxes & MSME":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25";
      default:
        return "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/25";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />

      <main className="flex-grow">
        
        {/* LIVE FINANCIAL TICKER STRIP */}
        <div className="bg-slate-900 text-slate-300 border-b border-slate-800 text-[11px] sm:text-xs py-2 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-extrabold uppercase tracking-wider text-emerald-400">
                Market Pulse:
              </span>
              <span className="text-white font-medium">
                RBI Repo Rate: <strong className="text-emerald-400">6.50% (Steady)</strong>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-white font-medium">
                Home Loan Starting: <strong className="text-emerald-400">7.15%* p.a.</strong>
              </span>
              <span className="text-slate-600 hidden md:inline">•</span>
              <span className="text-slate-300 hidden md:inline">
                5-Day Fast Sanction Desk Active
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-4 text-slate-400 font-medium">
              <span className="text-emerald-400">Agra HQ Desk: +91 9258-724-227</span>
              <span>Shop No. 4, Friends Center, Sanjay Place</span>
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-emerald-950 via-slate-950 to-[#070d19] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_50%)] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4 shadow-sm">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                Financial Intelligence & Policy Insights
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
                BFS Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">News & Alerts</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                Real-time updates on RBI monetary decisions, home loan interest rate benchmark shifts, tax exemptions, and smart borrowing strategies curated by our senior advisors.
              </p>
            </div>

            {/* FEATURED / TRENDING LEAD BANNER */}
            {trendingArticle && (
              <div className="rounded-3xl border border-slate-700/80 bg-slate-900/90 backdrop-blur-md overflow-hidden shadow-2xl hover:border-emerald-500/50 transition-all duration-300 group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-5 relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={trendingArticle.imageUrl}
                      alt={trendingArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-lg animate-pulse">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Editor&apos;s Pick
                    </div>
                  </div>

                  <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getCategoryBadgeClass(trendingArticle.category)}`}>
                          {trendingArticle.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                          <Clock className="w-3.5 h-3.5 text-teal-400" />
                          {trendingArticle.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          {new Date(trendingArticle.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-3 hover:text-emerald-400 transition-colors leading-snug">
                        <Link href={`/news/${trendingArticle.slug}`}>
                          {trendingArticle.title}
                        </Link>
                      </h2>

                      {trendingArticle.tldr && trendingArticle.tldr.length > 0 && (
                        <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                          {trendingArticle.tldr[0]}
                        </p>
                      )}
                    </div>

                    <div className="pt-5 border-t border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-600/30 text-emerald-400 font-bold flex items-center justify-center text-xs border border-emerald-500/30">
                          PB
                        </div>
                        <span className="text-xs text-slate-400">
                          Analysis by <strong className="text-white">{trendingArticle.author}</strong>
                        </span>
                      </div>
                      <Link
                        href={`/news/${trendingArticle.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all group-hover:translate-x-1"
                      >
                        Read Full Analysis
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CONTROLS: CATEGORIES & SEARCH FILTER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map(category => {
                const count = categoryCounts[category] || 0;
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                      isSelected
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span>{category}</span>
                    {count > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isSelected ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search repo rate, CIBIL, EMI..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ARTICLES GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-500" />
              {selectedCategory === "All" ? "All Financial News Stories" : `${selectedCategory} Updates`}
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {filteredArticles.length}
              </span>
            </h3>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">No matching articles found</h4>
              <p className="text-sm text-slate-500 mb-4">Try clearing your search keyword or selecting &quot;All&quot; category.</p>
              <button
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map(article => (
                <article
                  key={article.id}
                  className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <Link href={`/news/${article.slug}`} className="relative h-52 overflow-hidden block bg-slate-800">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border backdrop-blur-md shadow-sm ${getCategoryBadgeClass(article.category)}`}>
                      {article.category}
                    </span>
                  </Link>

                  {/* Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                          {new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-teal-500" />
                          {article.readTime}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug mb-2.5 group-hover:text-emerald-500 transition-colors line-clamp-2">
                        <Link href={`/news/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h4>

                      {article.tldr && article.tldr.length > 0 && (
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {article.tldr[0]}
                        </p>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-medium">
                        By {article.author}
                      </span>
                      <Link
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform"
                      >
                        Read Analysis <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* BOTTOM EXPERT ADVISOR BANNER */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-[#020617] text-white border border-emerald-500/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Doorstep Loan Assistance
              </span>
              <h3 className="text-2xl font-black text-white">
                Have questions about rate cuts or bank balance transfers?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
                Adv. Praveen Bhardwaj and our Senior Loan Advisor Team provide free 1-on-1 eligibility vetting at our Sanjay Place office or right at your doorstep in Agra.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
              <a
                href="tel:+919258724227"
                className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" /> +91 9258-724-227
              </a>
              <a
                href="https://wa.me/919286683232?text=Hello%20BFS,%20I%20want%20to%20consult%20regarding%20home%20loan%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Desk
              </a>
            </div>
          </div>

        </section>

      </main>

      <FloatingSupport />
      <Footer />
    </div>
  );
}
