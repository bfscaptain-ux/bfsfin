"use client";

import { useState, useEffect, useRef } from "react";
import { Star, MapPin, X, PlusCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  createdAt: string;
};

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Smart Marquee Ref and State
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const floatPosition = useRef(0);

  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      if (scrollRef.current && !isHovered.current && reviews.length > 0) {
        // scrollLeft only accepts integers on most browsers, so we accumulate the float manually
        floatPosition.current += 0.5; 
        if (floatPosition.current >= 1) {
          scrollRef.current.scrollLeft += 1;
          floatPosition.current -= 1;
        }
        
        // Loop back smoothly
        if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth / 2)) {
          scrollRef.current.scrollLeft = 1;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    // Start animation
    animationId = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animationId);
  }, [reviews.length]);


  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    text: "",
  });

  const fetchReviews = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/reviews?page=${pageNum}&limit=20&t=${Date.now()}`);
      const data = await res.json();
      
      if (pageNum === 1) {
        setReviews(data.reviews || []);
      } else {
        setReviews(prev => [...prev, ...(data.reviews || [])]);
      }
      
      setTotalCount(data.totalCount || 0);
      setAverageRating(data.averageRating || 0);
      setHasMore(data.page < data.totalPages);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(1);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: "", location: "", rating: 5, text: "" });
        setPage(1);
        fetchReviews(1);
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-emerald-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="text-center md:text-left max-w-2xl">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Real Client Feedback</span>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-2 mb-4">Client Success Stories</h3>
            <p className="text-slate-500 dark:text-slate-400">Trusted by thousands of families across India.</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            {/* Stats Badge */}
            {!loading && totalCount > 0 && (
              <div className="flex items-center gap-4 bg-white dark:bg-emerald-900/50 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-emerald-800">
                <div className="text-center px-4 border-r border-slate-200 dark:border-emerald-700">
                  <div className="text-3xl font-black text-slate-900 dark:text-white">{averageRating.toFixed(1)}</div>
                  <div className="flex gap-1 justify-center mt-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-3 h-3 ${i <= Math.round(averageRating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                    ))}
                  </div>
                </div>
                <div className="text-center px-2">
                  <div className="text-2xl font-bold text-slate-700 dark:text-slate-300">{totalCount}</div>
                  <div className="text-xs text-slate-500 font-medium">Total Reviews</div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <Link href="/reviews" className="group flex items-center justify-center gap-2 bg-white dark:bg-emerald-900 hover:bg-emerald-50 dark:hover:bg-emerald-800 text-slate-700 hover:text-emerald-700 dark:text-white border-2 border-slate-200 hover:border-emerald-200 dark:border-emerald-700 dark:hover:border-emerald-600 h-14 px-8 rounded-2xl font-bold transition-all duration-300 shadow-sm hover:shadow-md">
                See All Reviews
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-emerald-600 hover:border-emerald-500 h-14 px-8 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:-translate-y-0.5"
              >
                <PlusCircle className="w-5 h-5" />
                Write a Review
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Reviews Marquee - Full Width */}
      <div className="relative overflow-hidden w-full py-4 group">
        {loading && page === 1 ? (
          <div className="flex overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="mr-8 w-[85vw] max-w-[350px] shrink-0 h-[280px] bg-white dark:bg-emerald-900 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm animate-pulse relative">
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map((_, idx) => <div key={idx} className="w-4 h-4 bg-slate-200 dark:bg-emerald-800 rounded-sm" />)}
                </div>
                <div className="h-4 bg-slate-200 dark:bg-emerald-800 rounded mb-3 w-full" />
                <div className="h-4 bg-slate-200 dark:bg-emerald-800 rounded mb-3 w-5/6" />
                <div className="h-4 bg-slate-200 dark:bg-emerald-800 rounded mb-6 w-4/6" />
                
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-emerald-800 absolute bottom-8 left-8 right-8">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-emerald-800 shrink-0" />
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 dark:bg-emerald-800 rounded w-24" />
                    <div className="h-2 bg-slate-200 dark:bg-emerald-800 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div 
            ref={scrollRef}
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={() => { isHovered.current = false; }}
            onTouchStart={() => { isHovered.current = true; }}
            onTouchEnd={() => { isHovered.current = false; }}
            className="flex overflow-x-auto w-full gap-8 scrollbar-hide py-4 px-4 sm:px-8 "
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {/* We duplicate the array to allow seamless scrolling */}
            {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
              <Link href={`/reviews/${review.id}`} key={review.id + index} className="block cursor-pointer w-[85vw] max-w-[350px] shrink-0 h-[280px] bg-white dark:bg-emerald-900 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm hover:shadow-lg transition-all duration-300 relative ">
                <div className="absolute top-6 right-6">
                  <img src="/logo.png" alt="BFS" className="h-6 w-auto opacity-30 grayscale transition-opacity" />
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-100 dark:fill-slate-700 dark:text-slate-700'}`} />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6 font-medium leading-relaxed text-sm line-clamp-4">"{review.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-emerald-800 absolute bottom-8 left-8 right-8">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-black text-sm uppercase shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{review.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {review.location || "India"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 w-full">
            No reviews yet. Be the first to share your experience!
          </div>
        )}
        
        {/* Fading Edges for Marquee effect */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 dark:from-emerald-950 to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 dark:from-emerald-950 to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-emerald-950 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 dark:border-emerald-800 flex justify-between items-center bg-slate-50 dark:bg-emerald-900/30">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Share Your Experience</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-emerald-800 rounded-full text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({...formData, rating: num})}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star className={`w-8 h-8 ${formData.rating >= num ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-300 dark:fill-slate-800 dark:text-slate-700'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-emerald-800 bg-white dark:bg-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">City/Location</label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-emerald-800 bg-white dark:bg-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
                    placeholder="e.g., Agra"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Your Review</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({...formData, text: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-emerald-800 bg-white dark:bg-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white resize-none"
                  placeholder="Tell others about your experience with our services..."
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
