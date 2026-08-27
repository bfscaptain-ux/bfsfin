'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Star, MapPin, Search, Filter, MessageSquarePlus, X, Loader2, CheckCircle2 } from 'lucide-react';

export default function InteractiveReviewGrid({ initialReviews, totalPages, currentPage }: { initialReviews: any[], totalPages: number, currentPage: number }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', rating: 5, text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
  const gridRef = useRef<HTMLDivElement>(null);

  // Spotlight effect logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const cards = gridRef.current.getElementsByClassName('review-card') as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredReviews = initialReviews.filter((review: any) => {
    const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (review.location && review.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         review.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === 0 || review.rating >= ratingFilter;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="max-w-7xl mx-auto -mt-24 relative z-30 pb-20 px-4 sm:px-6 lg:px-8">
      
      {/* Interactive Search Bar */}
      <div className="bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 p-2 rounded-2xl md:rounded-full shadow-xl mb-12 flex flex-col md:flex-row items-center gap-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 relative z-40">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-emerald-500" />
          <input 
            type="text" 
            placeholder="Search reviews by name or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-emerald-500/70 py-3.5 pl-14 pr-4 outline-none font-medium"
          />
        </div>
        
        <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-emerald-800"></div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto px-2 pb-2 md:pb-0 hide-scrollbar shrink-0">
          {[0, 5, 4].map(stars => (
            <button 
              key={stars}
              onClick={() => setRatingFilter(stars)}
              className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${ratingFilter === stars ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 dark:bg-emerald-950/50 text-slate-600 dark:text-emerald-300 hover:bg-slate-200 dark:hover:bg-emerald-800'}`}
            >
              {stars === 0 ? 'All Reviews' : <><Star className="w-4 h-4 fill-current" /> {stars}+ Stars</>}
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .review-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: inherit;
          padding: 2px;
          background: radial-gradient(
            800px circle at var(--mouse-x, 0) var(--mouse-y, 0), 
            rgba(52, 211, 153, 0.4),
            transparent 40%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .review-card:hover::before {
          opacity: 1;
        }
        .review-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x, 0) var(--mouse-y, 0), 
            rgba(255, 255, 255, 0.06),
            transparent 40%
          );
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .review-card:hover::after {
          opacity: 1;
        }
      `}</style>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReviews.length > 0 ? filteredReviews.map((review, i) => (
          <div key={review.id} className="block group animate-in fade-in slide-in-from-bottom-8 fill-mode-both" style={{ animationDelay: `${i * 100}ms` }}>
            <Link href={`/reviews/${review.id}`} className="block h-full">
              <div className="review-card bg-white dark:bg-emerald-900/90 p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative h-full flex flex-col border border-slate-200 dark:border-emerald-800">
                <div className="absolute top-6 right-6">
                  <img src="/logo.png" alt="BFS" className="h-6 w-auto opacity-20 grayscale transition-opacity group-hover:opacity-60" />
                </div>
                <div className="flex gap-0.5 mb-6 relative z-10">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className={`w-5 h-5 ${idx < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-100 dark:fill-emerald-950 dark:text-emerald-950'}`} />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-emerald-50/90 mb-8 font-medium leading-relaxed text-base flex-grow relative z-10">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-emerald-800/50 mt-auto relative z-10">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-black text-lg uppercase shrink-0 ring-2 ring-transparent group-hover:ring-emerald-400 transition-all">
                    {review.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base truncate">{review.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-emerald-200/60 flex items-center gap-1 truncate">
                      <MapPin className="w-4 h-4 shrink-0" />
                      {review.location || "India"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
            <Search className="w-12 h-12 text-emerald-200/50 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No reviews found</h3>
            <p className="text-emerald-100/70">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Pagination (Only show if not filtering) */}
      {!searchTerm && ratingFilter === 0 && totalPages > 1 && (
        <div className="mt-16 flex justify-center gap-2 flex-wrap relative z-20">
          {currentPage > 1 && (
            <Link href={`/reviews?page=${currentPage - 1}`} className="px-6 py-3 rounded-xl border border-slate-300 dark:border-emerald-700 bg-white dark:bg-emerald-900/80 text-slate-700 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-emerald-800 transition-colors shadow-sm">
              Previous
            </Link>
          )}
          
          <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-emerald-900/80 border border-slate-200 dark:border-emerald-700 shadow-sm">
            <span className="text-slate-500 dark:text-emerald-100/60 font-medium">Page</span>
            <span className="font-black text-emerald-600 dark:text-emerald-400">{currentPage}</span>
            <span className="text-slate-500 dark:text-emerald-100/60 font-medium">of {totalPages}</span>
          </div>

          {currentPage < totalPages && (
            <Link href={`/reviews?page=${currentPage + 1}`} className="px-6 py-3 rounded-xl border border-slate-300 dark:border-emerald-700 bg-white dark:bg-emerald-900/80 text-slate-700 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-emerald-800 transition-colors shadow-sm">
              Next
            </Link>
          )}
        </div>
      )}


      {/* Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-[0_10px_40px_rgba(16,185,129,0.4)] transition-all hover:scale-110 flex items-center gap-3 group border border-emerald-400/30"
      >
        <MessageSquarePlus className="w-6 h-6" />
        <span className="hidden group-hover:inline font-bold pr-2 whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-right-4">Write a Review</span>
      </button>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)}></div>
          
          <div className="relative bg-white dark:bg-emerald-950 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-emerald-800">
            {/* Header */}
            <div className="bg-emerald-50 dark:bg-emerald-900/50 p-6 flex justify-between items-center border-b border-emerald-100 dark:border-emerald-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Share Your Experience
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-900 dark:text-emerald-200 dark:hover:text-white transition-colors bg-white dark:bg-emerald-900 p-2 rounded-full shadow-sm">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            {isSuccess ? (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6 animate-in zoom-in">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Thank You!</h4>
                <p className="text-slate-600 dark:text-emerald-200/80">Your review has been submitted and is pending approval.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="p-6 sm:p-8 space-y-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">How would you rate BFS?</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} 
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star className={`w-8 h-8 ${formData.rating >= star ? 'fill-amber-400 text-amber-400 drop-shadow-md' : 'fill-slate-100 text-slate-200 dark:fill-emerald-900 dark:text-emerald-800'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">Your Name *</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-emerald-900/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">Location (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Agra, UP"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-emerald-900/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">Your Review *</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Tell us about your experience getting a loan with Bhardwaj Financial Services..."
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-emerald-900/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
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
