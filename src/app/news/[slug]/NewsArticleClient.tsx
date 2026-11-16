"use client";

import { useState, useEffect, useMemo } from "react";
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
  ChevronLeft,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Eye,
  Landmark,
  Printer,
  Copy,
  ExternalLink,
  ThumbsUp,
  BookOpen,
  FileCheck,
  Percent,
  RefreshCw,
  Building2
} from "lucide-react";

interface NewsArticleClientProps {
  article: NewsArticle;
  relatedArticles: NewsArticle[];
  prevArticle?: NewsArticle | null;
  nextArticle?: NewsArticle | null;
}

export default function NewsArticleClient({
  article,
  relatedArticles,
  prevArticle,
  nextArticle
}: NewsArticleClientProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [feedbackGiven, setFeedbackGiven] = useState<"helpful" | "unhelpful" | null>(null);

  // Mini Sidebar EMI Calculator state
  const [calcAmount, setCalcAmount] = useState<number>(3500000); // 35 Lakhs default
  const [calcTenure, setCalcTenure] = useState<number>(20); // 20 years default
  const startingRate = 7.15;

  const monthlyEMI = useMemo(() => {
    const monthlyRate = startingRate / 12 / 100;
    const months = calcTenure * 12;
    const emi = (calcAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  }, [calcAmount, calcTenure]);

  // Scroll Progress Tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const articleUrl = typeof window !== "undefined" ? window.location.href : `https://bfsfin.com/news/${article.slug}`;
  const shareMessage = `*${article.title}*\n\nRead the verified financial analysis on Bhardwaj Financial Services:\n${articleUrl}`;

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Font size definitions that forcefully style all children elements
  const fontStyles = {
    normal: {
      fontSize: "16px",
      lineHeight: "1.8",
      cssClass: "[&_p]:text-[16px] [&_p]:leading-[1.8] [&_li]:text-[16px] [&_li]:leading-[1.8] [&_td]:text-[14px]"
    },
    large: {
      fontSize: "19px",
      lineHeight: "1.85",
      cssClass: "[&_p]:text-[19px] [&_p]:leading-[1.85] [&_li]:text-[19px] [&_li]:leading-[1.85] [&_td]:text-[16px]"
    },
    xlarge: {
      fontSize: "22px",
      lineHeight: "1.9",
      cssClass: "[&_p]:text-[22px] [&_p]:leading-[1.9] [&_li]:text-[22px] [&_li]:leading-[1.9] [&_td]:text-[18px]"
    }
  };

  const currentFont = fontStyles[fontSize];

  const renderContextualCTA = () => {
    switch (article.ctaType) {
      case "business-loan":
        return (
          <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white border border-blue-500/40 shadow-2xl relative overflow-hidden print:hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <Landmark className="w-3.5 h-3.5 text-blue-400" /> MSME Growth Catalyst
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  Need Collateral-Free Business Expansion Capital?
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                  Get up to ₹5 Crores sanctioned with CGTMSE government guarantee & low interest rates through BFS institutional banking desks.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://wa.me/919258724227?text=Hi%20Adv%20Praveen%20Bhardwaj,%20I%20am%20interested%20in%20Business%20Loan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Desk
                </a>
                <Link
                  href="/products/business-loan"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-colors flex items-center gap-1.5"
                >
                  Apply Online <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        );

      case "cibil-check":
        return (
          <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white border border-purple-500/40 shadow-2xl relative overflow-hidden print:hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Credit Health Desk
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  Struggling with Low CIBIL or Multiple Inquiries?
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                  Get a 1-on-1 confidential credit consultation with Adv. Praveen Bhardwaj. Learn how to rectify disputes and qualify for low-rate home loans.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="tel:+919258724227"
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-4 h-4 text-purple-400" /> Call Advisor
                </a>
                <Link
                  href="/resources/credit-score"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-colors flex items-center gap-1.5"
                >
                  CIBIL Improvement Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        );

      case "home-loan":
      default:
        return (
          <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-950 to-[#020617] text-white border border-emerald-500/40 shadow-2xl relative overflow-hidden print:hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Priority Home Loan Desk
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  Looking for Lowest Home Loan ROI or Balance Transfer?
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                  Interest rates starting from <strong>7.15%* p.a.</strong> with 5-day sanction guarantee, zero hidden brokerages, and doorstep document pickup across Agra & Pan-India.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/calculator"
                  className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Calculator className="w-4 h-4 text-emerald-400" /> Calculate EMI
                </Link>
                <Link
                  href="/products/home-loan"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-colors flex items-center gap-1.5"
                >
                  Apply Today <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* 0. PRINT-SPECIFIC CSS RULES (Guarantees clean 100% whitepaper print) */}
      <style jsx global>{`
        @media print {
          /* Hide all headers, footers, navigation, sidebars and floating overlays */
          header, footer, nav, aside,
          .floating-support, [data-floating],
          .no-print, .share-toolbar, .reading-progress,
          .feedback-box, .prev-next-nav, .related-news-section,
          button, a[href^="tel:"], a[href^="https://wa.me"] {
            display: none !important;
          }

          body, html {
            background: #ffffff !important;
            color: #000000 !important;
            font-size: 11pt !important;
            line-height: 1.5 !important;
          }

          main {
            padding: 0 !important;
            margin: 0 !important;
          }

          .print-article-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .print-header-letterhead {
            display: block !important;
            border-bottom: 2px solid #059669;
            padding-bottom: 12px;
            margin-bottom: 20px;
          }

          .print-footer-notice {
            display: block !important;
            border-top: 1px solid #cbd5e1;
            padding-top: 12px;
            margin-top: 30px;
            font-size: 9pt;
            color: #64748b;
          }

          h1, h2, h3 {
            page-break-after: avoid;
            break-after: avoid;
            color: #0f172a !important;
          }

          table, figure, blockquote, .briefing-box {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin: 14px 0 !important;
          }

          th, td {
            border: 1px solid #94a3b8 !important;
            padding: 6px 8px !important;
            color: #0f172a !important;
          }

          th {
            background-color: #f1f5f9 !important;
            font-weight: bold !important;
          }

          /* Ensure images don't overflow paper */
          img {
            max-width: 100% !important;
            max-height: 220px !important;
            object-fit: contain !important;
          }
        }
      `}</style>

      {/* 1. TOP READING PROGRESS BAR (Screen only) */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-200/50 dark:bg-slate-800/50 z-50 print:hidden reading-progress">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 transition-all duration-150 ease-out shadow-sm shadow-emerald-500/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="print:hidden">
        <Header />
      </div>

      <main className="flex-grow py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print-article-wrapper">
          
          {/* PRINT-ONLY OFFICIAL BFS LETTERHEAD */}
          <div className="hidden print:block print-header-letterhead">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-black text-emerald-800 uppercase tracking-tight m-0">
                  BHARDWAJ FINANCIAL SERVICES (BFS)
                </h2>
                <p className="text-xs text-slate-700 font-semibold m-0 mt-0.5">
                  Institutional Financial Advisory &amp; Legal Desk • Sanjay Place, Agra
                </p>
                <p className="text-[11px] text-slate-500 m-0">
                  Helpline: +91 92587-24227 | WhatsApp: +91 79009-79001 | Portal: https://bfsfin.com
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block text-[10px] font-black uppercase px-2 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded">
                  Official Research Report
                </span>
                <p className="text-[10px] text-slate-400 mt-1">
                  Printed: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>

          {/* TOP BAR: BACK NAVIGATION & BREADCRUMBS (Screen only) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/80 print:hidden">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                All News
              </Link>
              <span className="text-slate-300 dark:text-slate-700">/</span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">Financial Intelligence</span>
              <span className="text-slate-300 dark:text-slate-700">/</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold truncate max-w-[200px]">
                {article.category}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Verified Editorial
              </span>
            </div>
          </div>

          {/* ARTICLE HEADLINE & META */}
          <header className="max-w-4xl mb-8">
            <div className="flex items-center gap-2.5 mb-4 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shadow-sm">
                {article.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-teal-500" />
                {article.readTime}
              </span>
              <span className="text-slate-300 dark:text-slate-700 print:hidden">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium print:hidden">
                <Eye className="w-3.5 h-3.5 text-blue-500" />
                {article.views ? article.views.toLocaleString() : "1,420"} reads
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.18] tracking-tight mb-4">
              {article.title}
            </h1>

            {article.metaDescription && (
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                {article.metaDescription}
              </p>
            )}
          </header>

          {/* AUTHOR & TOOLBAR ROW (Screen only) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 print:hidden share-toolbar">
            {/* Author Profile */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-base shadow-md">
                  PB
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] border-2 border-white dark:border-slate-900" title="Verified Senior Financial Advisor">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-black text-slate-900 dark:text-white">{article.author}</p>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    High Court Advocate
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Managing Director, Bhardwaj Financial Services (BFS Agra)
                </p>
              </div>
            </div>

            {/* Actions: Font Size & Share Bar */}
            <div className="flex items-center gap-2.5 flex-wrap self-end sm:self-auto">
              
              {/* WORKING FONT SIZE ADJUSTER BUTTONS */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-xl p-1 border border-slate-200 dark:border-slate-700 gap-1">
                <button
                  type="button"
                  onClick={() => setFontSize("normal")}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                    fontSize === "normal"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                  title="Default font size (16px)"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize("large")}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                    fontSize === "large"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                  title="Large font size (19px)"
                >
                  A+
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize("xlarge")}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                    fontSize === "xlarge"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                  title="Extra Large font size (22px)"
                >
                  A++
                </button>
              </div>

              {/* FLAWLESS PRINT BUTTON */}
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 font-bold text-xs"
                title="Print Clean Article Report"
              >
                <Printer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Print</span>
              </button>

              {/* WhatsApp Share */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black transition-all shadow-sm shadow-[#25D366]/30"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              {/* LinkedIn Share */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-black transition-all shadow-sm shadow-[#0077b5]/30"
                title="Share on LinkedIn"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>

              {/* Copy Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                title="Copy Article Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* MAIN 2-COLUMN LAYOUT (CONTENT + STICKY SIDEBAR) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ======================================================== */}
            {/* LEFT COLUMN: MAIN ARTICLE (COL-SPAN-8)                   */}
            {/* ======================================================== */}
            <div className="lg:col-span-8 space-y-8 print:w-full print:max-w-full">
              
              {/* FEATURED HERO IMAGE WITH CAPTION */}
              <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900 group hero-image-wrapper">
                <div className="relative overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full max-h-[460px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none print:hidden"></div>
                  <div className="absolute bottom-3 left-4 right-4 text-xs text-slate-300 font-medium flex items-center justify-between print:hidden">
                    <span>Market Intelligence &amp; Policy Benchmark Analysis</span>
                    <span className="hidden sm:inline-block text-slate-400">BFS Editorial Desk</span>
                  </div>
                </div>
              </div>

              {/* TL;DR EXECUTIVE SUMMARY BRIEFING BOX */}
              {article.tldr && article.tldr.length > 0 && (
                <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 dark:border-emerald-500/20 shadow-md briefing-box">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-500/20">
                    <h3 className="text-xs sm:text-sm font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse print:hidden" />
                      Executive Briefing • Key Highlights
                    </h3>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      60-Sec Summary
                    </span>
                  </div>

                  <ul className="space-y-3 text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                    {article.tldr.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                          {index + 1}
                        </div>
                        <span className="font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Quick Rate Metric Strip */}
                  <div className="mt-5 pt-4 border-t border-emerald-500/20 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-white/80 dark:bg-slate-900/80 rounded-xl p-3 border border-slate-200/80 dark:border-slate-800 text-center">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Benchmark Repo Rate</p>
                      <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white">6.50%</p>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/80 rounded-xl p-3 border border-slate-200/80 dark:border-slate-800 text-center">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Home Loan Starting</p>
                      <p className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">7.15%*</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 bg-white/80 dark:bg-slate-900/80 rounded-xl p-3 border border-slate-200/80 dark:border-slate-800 text-center">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Sanction Time</p>
                      <p className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400">5 Working Days</p>
                    </div>
                  </div>
                </div>
              )}

              {/* IN-ARTICLE INTERLINKING QUICK SHORTCUTS (Screen only) */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs print:hidden">
                <span className="font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2.5">
                  📌 Related BFS Lending Tools &amp; Solutions:
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/calculator"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold hover:border-emerald-500 border border-slate-200 dark:border-slate-700 shadow-xs"
                  >
                    <Calculator className="w-3.5 h-3.5" /> EMI Calculator
                  </Link>
                  <Link
                    href="/eligibility"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:text-emerald-500 border border-slate-200 dark:border-slate-700 shadow-xs"
                  >
                    <Percent className="w-3.5 h-3.5 text-blue-500" /> Check Eligibility
                  </Link>
                  <Link
                    href="/products/balance-transfer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:text-emerald-500 border border-slate-200 dark:border-slate-700 shadow-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-teal-500" /> Balance Transfer (Save Lakhs)
                  </Link>
                  <Link
                    href="/resources/credit-score"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:text-emerald-500 border border-slate-200 dark:border-slate-700 shadow-xs"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-500" /> CIBIL Score Advice
                  </Link>
                  <Link
                    href="/resources/documents"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:text-emerald-500 border border-slate-200 dark:border-slate-700 shadow-xs"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-amber-500" /> Documents Checklist
                  </Link>
                  <Link
                    href="/products/home-loan"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 shadow-xs"
                  >
                    Apply Home Loan (7.15%*) &rarr;
                  </Link>
                </div>
              </div>

              {/* ARTICLE BODY PROSE CONTENT (Responsive to font size switch) */}
              <div
                className={`prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 transition-all duration-150 ${currentFont.cssClass}
                  prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
                  prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-800 prose-h2:pb-3
                  prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:my-5 prose-p:leading-relaxed
                  prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-black
                  prose-table:my-8 prose-table:w-full prose-table:border-collapse prose-table:rounded-2xl prose-table:overflow-hidden prose-table:shadow-md
                  prose-th:bg-slate-900 prose-th:text-white prose-th:p-4 prose-th:font-extrabold prose-th:text-xs prose-th:uppercase prose-th:tracking-wider
                  prose-td:p-3.5 prose-td:border-b prose-td:border-slate-200 dark:prose-td:border-slate-800 prose-td:text-xs sm:prose-td:text-sm
                  prose-tr:nth-child(even):bg-slate-50 dark:prose-tr:nth-child(even):bg-slate-900/50`}
                style={{
                  fontSize: currentFont.fontSize,
                  lineHeight: currentFont.lineHeight
                }}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* CONTEXTUAL ACTION CTA */}
              {renderContextualCTA()}

              {/* WAS THIS ANALYSIS HELPFUL? INTERACTIVE FEEDBACK (Screen only) */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden feedback-box">
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">
                    Was this financial analysis helpful?
                  </h4>
                  <p className="text-xs text-slate-500">
                    Your feedback helps our editorial desk improve future borrowing guides.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedbackGiven("helpful")}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      feedbackGiven === "helpful"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    {feedbackGiven === "helpful" ? "Thank you!" : "Yes, Helpful"}
                  </button>
                  <a
                    href="https://wa.me/919258724227?text=Hi%20Adv%20Praveen%20Bhardwaj,%20I%20have%20a%20question%20regarding%20your%20news%20article."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                    Ask Question
                  </a>
                </div>
              </div>

              {/* AUTHOR BIO & CREDENTIALS BOX */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg print:hidden">
                    PB
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-lg font-black text-slate-900 dark:text-white">
                        {article.author}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        Senior Loan Advisor Desk
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Advocate Praveen Bhardwaj is a High Court Advocate and the Managing Director of <strong>Bhardwaj Financial Services (BFS)</strong>, Sanjay Place, Agra. With over 15 years in financial jurisprudence and institutional mortgage lending, he advises homebuyers and business owners on optimal debt structuring, lowest ROI acquisition, and dispute resolution.
                    </p>
                    <div className="pt-2 flex items-center gap-4 text-xs font-bold">
                      <a
                        href="tel:+919258724227"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                      >
                        <PhoneCall className="w-3.5 h-3.5" /> +91 92587-24227
                      </a>
                      <a
                        href="https://wa.me/919258724227"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 print:hidden"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Desk
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* PREVIOUS & NEXT ARTICLE NAVIGATION (Screen only) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 print:hidden prev-next-nav">
                {prevArticle ? (
                  <Link
                    href={`/news/${prevArticle.slug}`}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-sm"
                  >
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-2">
                      <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      Previous Article
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-500 transition-colors">
                      {prevArticle.title}
                    </h5>
                  </Link>
                ) : (
                  <div className="hidden sm:block"></div>
                )}

                {nextArticle && (
                  <Link
                    href={`/news/${nextArticle.slug}`}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between text-right group shadow-sm"
                  >
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-end gap-1 mb-2">
                      Next Article
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-500 transition-colors">
                      {nextArticle.title}
                    </h5>
                  </Link>
                )}
              </div>

              {/* EDITORIAL DISCLAIMER */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 leading-relaxed">
                <p>
                  <strong>Disclaimer:</strong> Financial policy updates, repo rates, and lending guidelines are published for public educational and news awareness. Specific rate sanctions, processing concessions, and loan approvals are determined by individual lending banks (SBI, HDFC, ICICI, PNB) following physical document evaluation and CIBIL credit vetting.
                </p>
              </div>

              {/* PRINT-ONLY FOOTER NOTICE */}
              <div className="hidden print:block print-footer-notice">
                <p>
                  &copy; {new Date().getFullYear()} Bhardwaj Financial Services (BFS). Published for informational and client guidance. Direct Call Helpline: +91 92587-24227 | WhatsApp: +91 79009-79001 | Office: Shop No. 4, Friends Center, Sanjay Place, Agra.
                </p>
              </div>

            </div>

            {/* ======================================================== */}
            {/* RIGHT COLUMN: STICKY EDITORIAL SIDEBAR (COL-SPAN-4)      */}
            {/* ======================================================== */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 print:hidden">
              
              {/* SIDEBAR WIDGET 1: DIRECT SENIOR LOAN ADVISOR DESK */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-900 to-[#020617] text-white border border-emerald-500/30 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                      Live Senior Advisor Desk
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-white">Adv. Praveen Bhardwaj</h4>
                    <p className="text-xs text-slate-300">Senior Financial &amp; Legal Advisor</p>
                    <p className="text-[11px] text-emerald-400 font-medium mt-1">
                      Shop No. 4, Friends Center, Sanjay Place, Agra
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Have questions about how this policy affects your EMI? Talk directly with our senior desk.
                  </p>

                  <div className="pt-1 flex flex-col gap-2.5">
                    <a
                      href="tel:+919258724227"
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                    >
                      <PhoneCall className="w-4 h-4" /> Call: +91 92587-24227
                    </a>
                    <a
                      href="https://wa.me/917900979001?text=Hello%20BFS,%20I%20have%20an%20inquiry%20regarding%20the%20recent%20news%20update."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-white/20"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" /> WhatsApp Desk
                    </a>
                  </div>
                </div>
              </div>

              {/* SIDEBAR WIDGET 2: QUICK INTERACTIVE EMI CALCULATOR */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-emerald-500" />
                    Quick EMI Estimator
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    7.15%* ROI
                  </span>
                </div>

                {/* Amount Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">Loan Amount</span>
                    <span className="text-slate-900 dark:text-white">₹{(calcAmount / 100000).toFixed(1)} Lakhs</span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={15000000}
                    step={500000}
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Tenure Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">Tenure</span>
                    <span className="text-slate-900 dark:text-white">{calcTenure} Years</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={calcTenure}
                    onChange={(e) => setCalcTenure(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Calculated Result Box */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-center">
                  <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Estimated Monthly EMI</p>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                    ₹{monthlyEMI.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">Calculated @ 7.15%* starting rate</p>
                </div>

                <Link
                  href="/calculator"
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  Full Amortization Calculator <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* SIDEBAR WIDGET 3: LIVE BENCHMARK RATES CARD */}
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  Live Lending Benchmarks
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Home Loan (Starting)</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">7.15%* p.a.</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Loan Against Property</span>
                    <span className="font-black text-slate-900 dark:text-white">8.50%* p.a.</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Business Loan (MSME)</span>
                    <span className="font-black text-slate-900 dark:text-white">9.99%* p.a.</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="font-bold text-slate-700 dark:text-slate-300">RBI Repo Rate</span>
                    <span className="font-black text-blue-600 dark:text-blue-400">6.50% (Steady)</span>
                  </div>
                </div>
              </div>

              {/* SIDEBAR WIDGET 4: TRENDING UPDATES */}
              {relatedArticles && relatedArticles.length > 0 && (
                <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                    Trending Intelligence
                  </h4>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {relatedArticles.slice(0, 3).map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/news/${rel.slug}`}
                        className="py-3 flex items-start gap-3 group first:pt-1 last:pb-1"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-800">
                          <img
                            src={rel.imageUrl}
                            alt={rel.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                            {rel.category}
                          </span>
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-500 transition-colors leading-snug">
                            {rel.title}
                          </h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </aside>

          </div>

          {/* BOTTOM RELATED ARTICLES CAROUSEL/GRID (Screen only) */}
          {relatedArticles && relatedArticles.length > 0 && (
            <section className="pt-16 mt-16 border-t border-slate-200 dark:border-slate-800 print:hidden related-news-section">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-emerald-500" />
                    More Financial News &amp; Analysis
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Stay informed with verified policy shifts, tax reforms, and interest rate movements.
                  </p>
                </div>
                <Link
                  href="/news"
                  className="hidden sm:inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm hover:underline"
                >
                  View All News <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {relatedArticles.slice(0, 3).map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/news/${rel.slug}`}
                    className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all flex flex-col"
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950/80 text-white backdrop-blur-md">
                        {rel.category}
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                          <Calendar className="w-3 h-3 text-emerald-500" />
                          {new Date(rel.publishedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          {rel.readTime}
                        </div>
                        <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-500 transition-colors">
                          {rel.title}
                        </h4>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                        Read Story <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <div className="print:hidden">
        <FloatingSupport />
        <Footer />
      </div>
    </div>
  );
}
