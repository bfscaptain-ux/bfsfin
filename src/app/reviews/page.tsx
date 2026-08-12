"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WriteReviewModal from "@/components/WriteReviewModal";
import { Star, ShieldCheck, Trash2, Loader2, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [myReviews, setMyReviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReviews = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/reviews?page=${page}&limit=10`);
      const data = await res.json();
      setReviews(data.reviews || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.page || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(1);
    const stored = JSON.parse(localStorage.getItem("my_reviews") || "[]");
    setMyReviews(stored);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      setReviews(reviews.filter(r => r.id !== id));
      
      const newMyReviews = myReviews.filter(rid => rid !== id);
      setMyReviews(newMyReviews);
      localStorage.setItem("my_reviews", JSON.stringify(newMyReviews));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-900 dark:to-[#0b132b] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full font-bold text-sm shadow-sm border border-emerald-100 dark:border-slate-700 mb-6">
            <ShieldCheck className="w-4 h-4" /> 100% Verified Customers
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Reviews</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Read authentic reviews from thousands of clients who secured their dream homes through Bhardwaj Financial Services.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-2 hover:-translate-y-0.5"
          >
            Write a Review
          </button>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 dark:text-slate-400">No reviews yet. Be the first to write one!</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={review.id} 
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all break-inside-avoid relative group"
              >
                {myReviews.includes(review.id) && (
                  <button 
                    onClick={() => handleDelete(review.id)}
                    className="absolute top-6 right-6 w-8 h-8 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-500/20 z-20"
                    title="Delete your review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'}`} />
                  ))}
                </div>
                
                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3 pr-8">{review.title}</h3>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 relative z-10">
                  <Quote className="w-8 h-8 text-slate-100 dark:text-slate-800 absolute -top-2 -left-2 -z-10" />
                  {review.content}
                </p>
                
                <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center font-black text-emerald-600 dark:text-emerald-400">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                      {review.name}
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-500" title="Verified Customer" />
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button 
              onClick={() => fetchReviews(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-white dark:bg-slate-900 rounded-xl font-bold border border-slate-200 dark:border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
              Previous
            </button>
            <span className="text-slate-600 dark:text-slate-400 font-bold bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => fetchReviews(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <Footer />
      <WriteReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchReviews}
      />
    </div>
  );
}
