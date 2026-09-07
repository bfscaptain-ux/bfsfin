'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Star, MapPin, Search, MessageSquarePlus, X, Loader2, CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, ShieldCheck } from 'lucide-react';

interface InteractiveReviewGridProps {
  initialReviews: any[];
  totalPages: number;
  currentPage: number;
  initialTotalCount?: number;
  initialCategoryCounts?: Record<string, number>;
}

export default function InteractiveReviewGrid({
  initialReviews,
  totalPages: initialTotalPages,
  currentPage: initialCurrentPage,
  initialTotalCount = 860,
  initialCategoryCounts = {}
}: InteractiveReviewGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(initialCurrentPage || 1);
  const [totalPages, setTotalPages] = useState(initialTotalPages || 41);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [reviewsList, setReviewsList] = useState<any[]>(initialReviews || []);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', rating: 5, text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const gridContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Clean category definitions with database count badges
  const categories = [
    { id: 'all', label: 'All Reviews', count: initialCategoryCounts.all || 860 },
    { id: 'itr', label: 'ITR & Tax', count: initialCategoryCounts.itr || 166 },
    { id: 'msme', label: 'MSME & Business', count: initialCategoryCounts.msme || 174 },
    { id: 'loan', label: 'Home & LAP Loans', count: initialCategoryCounts.loan || 184 },
    { id: 'credit', label: 'Credit & CIBIL', count: initialCategoryCounts.credit || 126 },
    { id: 'insurance', label: 'Insurance', count: initialCategoryCounts.insurance || 112 }
  ];

  // Core fetch function connecting to database
  const executeSearch = useCallback(async (cat: string, pageNum: number, search: string, rating: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (cat && cat !== 'all') params.set('category', cat);
      if (search.trim()) params.set('search', search.trim());
      if (rating > 0) params.set('rating', String(rating));
      params.set('page', String(pageNum));
      params.set('limit', '21');

      const res = await fetch(`/api/reviews?${params.toString()}&t=${Date.now()}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      
      if (data && Array.isArray(data.reviews)) {
        setReviewsList(data.reviews);
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.totalCount || 0);
        setCurrentPage(data.page || 1);
      }
    } catch (err) {
      console.error('Failed to fetch filtered reviews:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const scrollToGrid = () => {
    if (gridContainerRef.current) {
      const topOffset = gridContainerRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
    }
  };

  // Category switch
  const handleCategoryChange = (cat: string) => {
    if (categoryFilter === cat) return;
    setCategoryFilter(cat);
    setCurrentPage(1);
    executeSearch(cat, 1, searchTerm, ratingFilter);
    scrollToGrid();
  };

  // Rating switch
  const handleRatingChange = (stars: number) => {
    if (ratingFilter === stars) return;
    setRatingFilter(stars);
    setCurrentPage(1);
    executeSearch(categoryFilter, 1, searchTerm, stars);
    scrollToGrid();
  };

  // Page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    executeSearch(categoryFilter, newPage, searchTerm, ratingFilter);
    scrollToGrid();
  };

  // Reset all filters
  const handleResetFilters = () => {
    setCategoryFilter('all');
    setRatingFilter(0);
    setSearchTerm('');
    setCurrentPage(1);
    executeSearch('all', 1, '', 0);
    scrollToGrid();
  };

  // Debounced search input
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setCurrentPage(1);
      executeSearch(categoryFilter, 1, searchTerm, ratingFilter);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchTerm, executeSearch]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setIsSuccess(false);
          setFormData({ name: '', location: '', rating: 5, text: '' });
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startIndex = totalCount === 0 ? 0 : (currentPage - 1) * 21 + 1;
  const endIndex = Math.min(currentPage * 21, totalCount);
  const activeCategoryObj = categories.find(c => c.id === categoryFilter) || categories[0];
  const hasActiveFilters = categoryFilter !== 'all' || ratingFilter > 0 || searchTerm.trim() !== '';

  return (
    <div ref={gridContainerRef} className="max-w-7xl mx-auto -mt-16 sm:-mt-20 relative z-30 pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* Unified Minimalist Filter & Search Console */}
      <div className="bg-white dark:bg-emerald-950 rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/80 dark:border-emerald-800/80 p-3 sm:p-4 mb-8 backdrop-blur-md">
        
        {/* Row 1: Search & Rating Segmented Control */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Search Bar */}
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-emerald-500" />
            <input 
              type="text" 
              placeholder="Search reviews by client name, keyword (e.g. ITR-4, Mudra, Home Loan) or city..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-emerald-900/40 rounded-2xl border border-slate-200/80 dark:border-emerald-800/80 py-2.5 pl-11 pr-9 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-emerald-500/70 outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Rating Segmented Control */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-emerald-900/60 p-1 rounded-2xl w-full md:w-auto shrink-0 justify-between md:justify-start">
            {[
              { stars: 0, label: 'All Ratings' },
              { stars: 5, label: '5 Stars' },
              { stars: 4, label: '4+ Stars' },
            ].map(({ stars, label }) => {
              const isRatingActive = ratingFilter === stars;
              return (
                <button 
                  key={stars}
                  onClick={() => handleRatingChange(stars)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer flex-1 md:flex-initial ${
                    isRatingActive 
                      ? 'bg-white dark:bg-emerald-700 text-emerald-700 dark:text-white shadow-sm' 
                      : 'text-slate-600 dark:text-emerald-200/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {stars === 0 ? (
                    label
                  ) : (
                    <>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {label}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Category Tabs Track */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-emerald-800/50 flex items-center gap-1.5 sm:gap-2 overflow-x-auto hide-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const isActive = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm font-bold'
                    : 'bg-transparent text-slate-600 dark:text-emerald-200/80 hover:bg-slate-100 dark:hover:bg-emerald-900/40 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-emerald-700/70 text-white'
                      : 'bg-slate-200/70 dark:bg-emerald-900 text-slate-600 dark:text-emerald-300'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Simple Clean Status Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6 px-1 text-xs sm:text-sm text-slate-500 dark:text-emerald-300/80">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="text-slate-800 dark:text-white font-bold">{startIndex}–{endIndex}</strong> of <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{totalCount}</strong> reviews
          </span>
          <span className="text-slate-300 dark:text-emerald-800">•</span>
          <span className="font-semibold text-slate-700 dark:text-emerald-200">{activeCategoryObj.label}</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-emerald-600 dark:text-emerald-300 dark:hover:text-emerald-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="py-24 text-center bg-white/60 dark:bg-emerald-950/40 rounded-3xl border border-slate-200/80 dark:border-emerald-800/60">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto mb-2" />
          <p className="text-slate-700 dark:text-emerald-200 font-semibold text-sm">Loading reviews...</p>
        </div>
      ) : reviewsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review, i) => (
            <div key={review.id} className="block group animate-in fade-in slide-in-from-bottom-4 fill-mode-both" style={{ animationDelay: `${i * 30}ms` }}>
              <Link href={`/reviews/${review.id}`} className="block h-full">
                <div className="bg-white dark:bg-emerald-900/80 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative h-full flex flex-col border border-slate-200/80 dark:border-emerald-800/70">
                  
                  {/* Top Bar: Stars + Verified Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`w-4 h-4 ${idx < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-100 dark:fill-emerald-950 dark:text-emerald-950'}`} 
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800/50">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 dark:text-emerald-100/90 mb-6 font-normal leading-relaxed text-sm sm:text-base flex-grow">
                    "{review.text}"
                  </p>

                  {/* User Profile */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-emerald-800/50 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-800/80 flex items-center justify-center text-emerald-800 dark:text-emerald-200 font-bold text-sm uppercase shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{review.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-emerald-300/70 flex items-center gap-1 truncate mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0 text-slate-400 dark:text-emerald-400" />
                        {review.location || "India"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white/60 dark:bg-emerald-950/40 rounded-3xl border border-slate-200/80 dark:border-emerald-800/60">
          <Search className="w-10 h-10 text-slate-400 dark:text-emerald-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No matching reviews found</h3>
          <p className="text-slate-500 dark:text-emerald-300/70 mb-5 text-sm">
            Try adjusting your search keyword or selected category.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            Show All 860 Reviews
          </button>
        </div>
      )}

      {/* Clean Modern Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80 dark:border-emerald-800/60">
          
          <div className="text-xs sm:text-sm text-slate-500 dark:text-emerald-300 font-medium">
            Page <strong className="text-slate-900 dark:text-white font-bold">{currentPage}</strong> of <strong className="text-slate-900 dark:text-white font-bold">{totalPages}</strong> ({totalCount} total reviews)
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
            <button
              disabled={currentPage <= 1 || loading}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-white dark:bg-emerald-900 text-slate-700 dark:text-white text-xs font-semibold hover:bg-slate-50 dark:hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {/* Smart page pill numbers */}
            {Array.from({ length: totalPages }, (_, idx) => idx + 1)
              .filter((p) => {
                if (p === 1 || p === totalPages) return true;
                if (Math.abs(p - currentPage) <= 1) return true;
                return false;
              })
              .reduce((acc: (number | string)[], p, index, arr) => {
                if (index > 0 && typeof arr[index - 1] === 'number' && (p as number) - (arr[index - 1] as number) > 1) {
                  acc.push('...');
                }
                acc.push(p);
                return acc;
              }, [])
              .map((item, index) => {
                if (item === '...') {
                  return (
                    <span key={`dots-${index}`} className="px-1 text-slate-400 dark:text-emerald-500 font-bold text-xs">
                      ...
                    </span>
                  );
                }
                const pageNum = Number(item);
                const isCurrent = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white dark:bg-emerald-900/80 text-slate-700 dark:text-emerald-200 border border-slate-200 dark:border-emerald-800/80 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

            <button
              disabled={currentPage >= totalPages || loading}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-white dark:bg-emerald-900 text-slate-700 dark:text-white text-xs font-semibold hover:bg-slate-50 dark:hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-1 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-[0_8px_30px_rgba(16,185,129,0.35)] transition-all hover:scale-105 flex items-center gap-2.5 group border border-emerald-400/30 cursor-pointer"
      >
        <MessageSquarePlus className="w-5 h-5" />
        <span className="hidden group-hover:inline font-semibold text-sm pr-1">Write a Review</span>
      </button>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)}></div>
          
          <div className="relative bg-white dark:bg-emerald-950 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-emerald-800">
            <div className="bg-emerald-50 dark:bg-emerald-900/50 p-5 flex justify-between items-center border-b border-emerald-100 dark:border-emerald-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Share Your Experience
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-900 dark:text-emerald-200 dark:hover:text-white transition-colors bg-white dark:bg-emerald-900 p-1.5 rounded-full shadow-sm">
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSuccess ? (
              <div className="p-10 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Thank You!</h4>
                <p className="text-slate-600 dark:text-emerald-200/80 text-sm">Your review has been submitted and is pending approval.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="p-5 sm:p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-emerald-100">How would you rate BFS?</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} 
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star className={`w-7 h-7 ${formData.rating >= star ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200 dark:fill-emerald-900 dark:text-emerald-800'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-emerald-100">Your Name *</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-emerald-900/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-emerald-100">Location</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Agra, UP"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-emerald-900/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-emerald-100">Your Review *</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Tell us about your experience getting a loan, ITR, or MSME registration with Bhardwaj Financial Services..."
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-emerald-900/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  ) : (
                    'Submit Review'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
