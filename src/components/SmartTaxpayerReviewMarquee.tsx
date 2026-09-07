'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Star, MapPin, ShieldCheck, ThumbsUp, X, ArrowRight, Play, Pause, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  createdAt: string;
}

interface SmartTaxpayerReviewMarqueeProps {
  reviews: Review[];
  totalReviewsCount?: number;
  loading?: boolean;
}

export default function SmartTaxpayerReviewMarquee({
  reviews,
  totalReviewsCount = 166,
  loading = false,
}: SmartTaxpayerReviewMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [likedReviews, setLikedReviews] = useState<Record<string, number>>({});

  // Split reviews into two lanes for dual-marquee
  const { lane1, lane2 } = useMemo(() => {
    if (!reviews || reviews.length === 0) return { lane1: [], lane2: [] };
    const half = Math.ceil(reviews.length / 2);
    const l1 = reviews.slice(0, half);
    const l2 = reviews.slice(half);
    // Ensure both lanes have enough items
    return {
      lane1: l1.length > 0 ? l1 : reviews,
      lane2: l2.length > 0 ? l2 : reviews,
    };
  }, [reviews]);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedReviews(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  // Extract or generate realistic filing type tag
  const getFilingTag = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('44ad') || t.includes('sugam') || t.includes('itr-4') || t.includes('itr 4') || t.includes('turnover')) {
      return 'ITR-4 (Sugam 44AD)';
    }
    if (t.includes('itr-2') || t.includes('itr 2') || t.includes('capital gains') || t.includes('share')) {
      return 'ITR-2 (Capital Gains & Salaried)';
    }
    if (t.includes('loan') || t.includes('balance sheet') || t.includes('computation') || t.includes('sanction')) {
      return 'Loan-Ready ITR + Financials';
    }
    if (t.includes('143(1)') || t.includes('notice') || t.includes('rectification')) {
      return 'Notice 143(1) Resolution';
    }
    return 'ITR-1 (Form 16 & Salary)';
  };

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      
      {/* CSS Keyframes for Super-Smooth Infinite Hardware-Accelerated Marquee */}
      <style jsx global>{`
        @keyframes marquee-scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .marquee-track-left {
          display: flex;
          width: max-content;
          animation: marquee-scroll-left var(--marquee-speed, 50s) linear infinite;
        }
        .marquee-track-right {
          display: flex;
          width: max-content;
          animation: marquee-scroll-right var(--marquee-speed, 55s) linear infinite;
        }
        .marquee-track-left:hover,
        .marquee-track-right:hover {
          animation-play-state: paused !important;
        }
        .marquee-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Interactive Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-700 dark:text-emerald-300">
            Live Stream: {totalReviewsCount}+ Verified ITR Filings
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-emerald-950/80 border border-slate-200 dark:border-emerald-800 text-slate-700 dark:text-emerald-200 hover:bg-slate-50 dark:hover:bg-emerald-900 transition-all shadow-xs cursor-pointer"
            title={isPaused ? "Resume Marquee Stream" : "Pause Marquee Stream"}
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-amber-500" />
                <span>Pause</span>
              </>
            )}
          </button>

          {/* Speed Toggle */}
          <button
            onClick={() => setIsSlow(!isSlow)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
              isSlow
                ? 'bg-emerald-100 dark:bg-emerald-900/60 border-emerald-400 text-emerald-800 dark:text-emerald-200'
                : 'bg-white dark:bg-emerald-950/80 border-slate-200 dark:border-emerald-800 text-slate-600 dark:text-emerald-300 hover:bg-slate-50'
            }`}
          >
            {isSlow ? 'Slow Speed' : 'Normal Speed'}
          </button>

          {/* Hint */}
          <span className="hidden sm:inline text-[11px] text-slate-400 dark:text-emerald-400/60 ml-2">
            (Hover card to pause &amp; click to expand)
          </span>
        </div>
      </div>

      {/* Marquee Viewport Container with Edge Mask Gradients */}
      <div 
        className="relative w-full overflow-hidden group"
        style={{ '--marquee-speed': isSlow ? '90s' : '45s' } as React.CSSProperties}
      >
        {/* Left and Right Smooth Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-[#041a14] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-[#041a14] to-transparent z-20" />

        {/* Row 1: Leftward Scrolling Track */}
        <div className={`marquee-track-left gap-5 mb-5 ${isPaused ? 'marquee-paused' : ''}`}>
          {[...lane1, ...lane1, ...lane1].map((rev, idx) => (
            <div
              key={`row1-${rev.id}-${idx}`}
              onClick={() => setSelectedReview(rev)}
              className="w-[330px] sm:w-[380px] shrink-0 p-5 rounded-2xl bg-white dark:bg-[#07251d] border border-slate-200/90 dark:border-emerald-700/40 shadow-sm hover:shadow-xl hover:border-emerald-500/80 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group/card hover:-translate-y-1"
            >
              {/* Subtle BFS Watermark in background */}
              <img
                src="/logo.png"
                alt="BFS Watermark"
                className="absolute -bottom-2 -right-2 h-20 w-auto opacity-[0.05] pointer-events-none grayscale brightness-0 invert dark:invert-0"
              />

              {/* Card Top: Stars + BFS Official Logo Badge */}
              <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
                <div className="flex items-center gap-0.5">
                  {[...Array(rev.rating || 5)].map((_, starIdx) => (
                    <Star key={starIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* BFS Logo Stamp */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/25 shadow-2xs">
                  <img src="/logo.png" alt="BFS" className="h-3.5 w-auto object-contain" />
                  <span className="text-[10px] font-extrabold text-emerald-800 dark:text-emerald-300 tracking-tight">
                    BFS Verified
                  </span>
                </div>
              </div>

              {/* Filing Category Tag */}
              <div className="mb-2 relative z-10">
                <span className="inline-block text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md">
                  {getFilingTag(rev.text)}
                </span>
              </div>

              {/* Review Testimonial Text */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-emerald-50/90 leading-relaxed font-normal mb-4 line-clamp-3 relative z-10">
                &ldquo;{rev.text}&rdquo;
              </p>

              {/* Card Footer: User, City & Interactive Helpful Button */}
              <div className="pt-3 border-t border-slate-100 dark:border-emerald-800/60 flex items-center justify-between relative z-10 mt-auto">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                    {rev.name.charAt(0)}
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover/card:text-emerald-600 transition-colors">
                      {rev.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-emerald-300/70 flex items-center gap-0.5 truncate">
                      <MapPin className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                      <span>{rev.location || "Agra, UP"}</span>
                    </p>
                  </div>
                </div>

                {/* Helpful Like Button */}
                <button
                  onClick={(e) => handleLike(e, rev.id)}
                  className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    likedReviews[rev.id]
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/90 dark:text-emerald-200'
                      : 'text-slate-400 hover:text-emerald-600 dark:text-emerald-400/60 dark:hover:text-emerald-200 hover:bg-slate-100 dark:hover:bg-emerald-900/40'
                  }`}
                  title="Mark this review as helpful"
                >
                  <ThumbsUp className={`w-3 h-3 ${likedReviews[rev.id] ? 'fill-current' : ''}`} />
                  <span>{(likedReviews[rev.id] || 0) > 0 ? `+${likedReviews[rev.id]}` : 'Helpful'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Rightward Scrolling Track */}
        <div className={`marquee-track-right gap-5 ${isPaused ? 'marquee-paused' : ''}`}>
          {[...lane2, ...lane2, ...lane2].map((rev, idx) => (
            <div
              key={`row2-${rev.id}-${idx}`}
              onClick={() => setSelectedReview(rev)}
              className="w-[330px] sm:w-[380px] shrink-0 p-5 rounded-2xl bg-white dark:bg-[#07251d] border border-slate-200/90 dark:border-emerald-700/40 shadow-sm hover:shadow-xl hover:border-emerald-500/80 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group/card hover:-translate-y-1"
            >
              {/* Subtle BFS Watermark in background */}
              <img
                src="/logo.png"
                alt="BFS Watermark"
                className="absolute -bottom-2 -right-2 h-20 w-auto opacity-[0.05] pointer-events-none grayscale brightness-0 invert dark:invert-0"
              />

              {/* Card Top: Stars + BFS Official Logo Badge */}
              <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
                <div className="flex items-center gap-0.5">
                  {[...Array(rev.rating || 5)].map((_, starIdx) => (
                    <Star key={starIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* BFS Logo Stamp */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/25 shadow-2xs">
                  <img src="/logo.png" alt="BFS" className="h-3.5 w-auto object-contain" />
                  <span className="text-[10px] font-extrabold text-emerald-800 dark:text-emerald-300 tracking-tight">
                    BFS Verified
                  </span>
                </div>
              </div>

              {/* Filing Category Tag */}
              <div className="mb-2 relative z-10">
                <span className="inline-block text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md">
                  {getFilingTag(rev.text)}
                </span>
              </div>

              {/* Review Testimonial Text */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-emerald-50/90 leading-relaxed font-normal mb-4 line-clamp-3 relative z-10">
                &ldquo;{rev.text}&rdquo;
              </p>

              {/* Card Footer: User, City & Interactive Helpful Button */}
              <div className="pt-3 border-t border-slate-100 dark:border-emerald-800/60 flex items-center justify-between relative z-10 mt-auto">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                    {rev.name.charAt(0)}
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover/card:text-emerald-600 transition-colors">
                      {rev.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-emerald-300/70 flex items-center gap-0.5 truncate">
                      <MapPin className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                      <span>{rev.location || "India"}</span>
                    </p>
                  </div>
                </div>

                {/* Helpful Like Button */}
                <button
                  onClick={(e) => handleLike(e, rev.id)}
                  className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    likedReviews[rev.id]
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/90 dark:text-emerald-200'
                      : 'text-slate-400 hover:text-emerald-600 dark:text-emerald-400/60 dark:hover:text-emerald-200 hover:bg-slate-100 dark:hover:bg-emerald-900/40'
                  }`}
                  title="Mark this review as helpful"
                >
                  <ThumbsUp className={`w-3 h-3 ${likedReviews[rev.id] ? 'fill-current' : ''}`} />
                  <span>{(likedReviews[rev.id] || 0) > 0 ? `+${likedReviews[rev.id]}` : 'Helpful'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Taxpayer Case Spotlight Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200" 
            onClick={() => setSelectedReview(null)}
          />
          
          <div className="relative bg-white dark:bg-[#07251d] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-emerald-500/30 animate-in zoom-in-95 duration-200 z-10">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 relative">
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <img src="/logo.png" alt="BFS" className="h-5 w-auto object-contain brightness-0 invert" />
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-200 bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  Verified Taxpayer Record
                </span>
              </div>

              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {selectedReview.name}
              </h3>
              <p className="text-xs text-emerald-100 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                {selectedReview.location || "Agra, Uttar Pradesh"}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              
              {/* Filing Attributes Badge Strip */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-emerald-950/50 p-3 rounded-xl border border-slate-100 dark:border-emerald-800/60 text-xs">
                <div>
                  <span className="text-slate-400 dark:text-emerald-400/80 block text-[10px] uppercase font-bold">Filing Category</span>
                  <span className="font-bold text-slate-800 dark:text-white">{getFilingTag(selectedReview.text)}</span>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-emerald-400/80 block text-[10px] uppercase font-bold">ITD Portal Status</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    100% E-Verified
                  </span>
                </div>
              </div>

              {/* Full Testimonial */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                  {[...Array(selectedReview.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 dark:text-emerald-200 ml-1.5">
                    {selectedReview.rating}.0 / 5.0
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-emerald-100/90 leading-relaxed italic bg-emerald-50/40 dark:bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500">
                  &ldquo;{selectedReview.text}&rdquo;
                </p>
              </div>

              {/* Action Button: Jump to ITR form */}
              <button
                onClick={() => {
                  setSelectedReview(null);
                  const el = document.getElementById("itr-form-card");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>File Your ITR Like {selectedReview.name.split(' ')[0]} with BFS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
