"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { NewsArticle } from "@/types/news";
import {
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Calculator,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  HelpCircle
} from "lucide-react";

export default function NewsArticleClient({
  article,
  relatedArticles
}: {
  article: NewsArticle;
  relatedArticles: NewsArticle[];
}) {
  const [copied, setCopied] = useState(false);

  const articleUrl = typeof window !== "undefined" ? window.location.href : `https://bfsfin.com/news/${article.slug}`;
  const shareMessage = `${article.title} - Read the full analysis on BFS Financial News: ${articleUrl}`;

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const renderContextualCTA = () => {
    switch (article.ctaType) {
      case "business-loan":
        return (
          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900/90 via-slate-900 to-emerald-950 text-white border border-blue-500/40 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-2">
                  MSME Growth Catalyst
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold mb-1">
                  Need Collateral-Free Business Expansion Capital?
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Get up to ₹1 Crore sanctioned in 48 hours with minimal documentation from BFS India.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/products/business-loan"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-colors flex items-center gap-1.5"
                >
                  Apply Business Loan <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        );

      case "cibil-check":
        return (
          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-900/90 via-slate-900 to-indigo-950 text-white border border-purple-500/40 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-2">
                  Credit Health Desk
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold mb-1">
                  Struggling with Low CIBIL or Multiple Inquiries?
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Get a free 1-on-1 credit restoration and loan eligibility consultation with BFS experts.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-colors flex items-center gap-1.5"
                >
                  Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        );

      case "home-loan":
      default:
        return (
          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-[#020617] text-white border border-emerald-500/40 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                  Special Rate Alert
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold mb-1">
                  Looking for Lowest Home Loan ROI or Balance Transfer?
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Rates starting from 7.15%* min ROI with zero processing fee deals & 100% legal title vetting.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/calculator"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Calculator className="w-4 h-4 text-emerald-400" /> Calculate EMI
                </Link>
                <Link
                  href="/products/home-loan"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-colors flex items-center gap-1.5"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />

      <main className="flex-grow py-8 sm:py-12">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* BREADCRUMB */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/news" className="hover:text-emerald-500 transition-colors">Financial News</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-xs">{article.category}</span>
          </nav>

          {/* CATEGORY & META */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          {/* HEADLINE */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.18] tracking-tight mb-6">
            {article.title}
          </h1>

          {/* AUTHOR & SHARE ROW */}
          <div className="flex items-center justify-between py-4 border-y border-slate-200 dark:border-slate-800 mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{article.author}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">BFS Financial Editorial Desk</p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline-block">Share:</span>
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-sm"
              >
                LinkedIn
              </a>
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* FEATURED IMAGE */}
          <div className="rounded-2xl overflow-hidden mb-8 border border-slate-200 dark:border-slate-800 shadow-md">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full max-h-[460px] object-cover"
            />
          </div>

          {/* TL;DR BOX (QUICK SUMMARY) */}
          {article.tldr && article.tldr.length > 0 && (
            <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border-l-4 border-emerald-500 shadow-sm">
              <h3 className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                In a Nutshell (TL;DR Quick Summary)
              </h3>
              <ul className="space-y-2 text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                {article.tldr.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ARTICLE MAIN CONTENT */}
          <div
            className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed font-normal
              prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:my-4 prose-p:leading-relaxed
              prose-strong:text-slate-900 dark:prose-strong:text-white
              prose-table:my-6 prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-td:border-slate-200 dark:prose-td:border-slate-700"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* CONTEXTUAL IN-ARTICLE CTA */}
          {renderContextualCTA()}

          {/* DISCLAIMER & FOOTNOTE */}
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 leading-relaxed my-8">
            <p><strong>Disclaimer:</strong> Financial policy updates and interest rates mentioned in this article are subject to change by respective lending institutions and regulatory bodies. For verified live sanction eligibility and personalized debt advice, consult our certified financial desk.</p>
          </div>

          {/* RELATED ARTICLES */}
          {relatedArticles && relatedArticles.length > 0 && (
            <div className="pt-10 border-t border-slate-200 dark:border-slate-800 mt-12">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Related Financial Updates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.slice(0, 3).map(related => (
                  <Link
                    key={related.id}
                    href={`/news/${related.slug}`}
                    className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-emerald-500/40 transition-all flex flex-col"
                  >
                    <div className="h-32 overflow-hidden">
                      <img
                        src={related.imageUrl}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-500 transition-colors mb-2">
                        {related.title}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        {new Date(related.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <FloatingSupport />
      <Footer />
    </div>
  );
}
