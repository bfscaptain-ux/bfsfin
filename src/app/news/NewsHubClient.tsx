"use client";

import { useState, useMemo } from "react";
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
  Tag
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const trendingArticle = useMemo(() => {
    return initialArticles.find(a => a.isTrending) || initialArticles[0];
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    return initialArticles.filter(article => {
      const matchesCategory =
        selectedCategory === "All" ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.tldr.some(t => t.toLowerCase().includes(query)) ||
        article.content.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Banking & RBI":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "Loans & EMIs":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "CIBIL & Credit":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "Taxes & MSME":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      default:
        return "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />

      <main className="flex-grow">
        {/* HERO HEADER */}
        <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-emerald-950 via-slate-950 to-[#020617] text-white">
          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dbx2j0g8j/image/upload/v1700000000/grid-pattern_qwe.png')] bg-center opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                Live Financial Intelligence & Insights
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                BFS Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">News & Alerts</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Stay updated with verified RBI policy updates, home loan interest rate cuts, tax changes, and smart borrowing strategies curated by financial experts.
              </p>
            </div>

            {/* TRENDING / BREAKING BANNER */}
            {trendingArticle && (
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 backdrop-blur-md overflow-hidden shadow-2xl hover:border-emerald-500/50 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-5 relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={trendingArticle.imageUrl}
                      alt={trendingArticle.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-rose-600 text-white shadow-lg animate-pulse">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Breaking Update
                    </div>
                  </div>

                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getCategoryBadgeClass(trendingArticle.category)}`}>
                          {trendingArticle.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          {trendingArticle.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(trendingArticle.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-3 hover:text-emerald-400 transition-colors">
                        <Link href={`/news/${trendingArticle.slug}`}>
                          {trendingArticle.title}
                        </Link>
                      </h2>

                      {trendingArticle.tldr && trendingArticle.tldr.length > 0 && (
                        <p className="text-slate-300 text-sm line-clamp-3 mb-4 leading-relaxed">
                          {trendingArticle.tldr[0]}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Reported by <strong className="text-slate-200">{trendingArticle.author}</strong>
                      </span>
                      <Link
                        href={`/news/${trendingArticle.slug}`}
                        className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold text-sm group"
                      >
                        Read Full Story
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CONTROLS: CATEGORIES & SEARCH */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                      : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search news, RBI, CIBIL..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </section>

        {/* ARTICLES GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-500" />
              {selectedCategory === "All" ? "All Latest News" : `${selectedCategory} Updates`}
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {filteredArticles.length}
              </span>
            </h3>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
              <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">No articles found</h4>
              <p className="text-sm text-slate-500 mb-4">Try clearing your search query or selecting another category.</p>
              <button
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map(article => (
                <article
                  key={article.id}
                  className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <Link href={`/news/${article.slug}`} className="relative h-48 overflow-hidden block">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold border backdrop-blur-md ${getCategoryBadgeClass(article.category)}`}>
                      {article.category}
                    </span>
                  </Link>

                  {/* Body */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-emerald-500 transition-colors line-clamp-2">
                        <Link href={`/news/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h4>

                      {article.tldr && article.tldr.length > 0 && (
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                          {article.tldr[0]}
                        </p>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">
                        By {article.author}
                      </span>
                      <Link
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform"
                      >
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <FloatingSupport />
      <Footer />
    </div>
  );
}
