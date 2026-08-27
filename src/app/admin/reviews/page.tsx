"use client";

import { useState, useEffect } from "react";
import { Star, Trash2, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";

type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  createdAt: string;
  status: string;
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchReviews = async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/reviews?page=${pageNum}&limit=20&t=${Date.now()}`);
      const data = await res.json();
      setReviews(data.reviews || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.totalCount || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(page);
  }, [page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchReviews(page); // refresh current page
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-900 border border-emerald-800 p-6 rounded-3xl shadow-xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-400" />
            Manage Reviews
          </h1>
          <p className="text-xs text-slate-400 mt-1">View and manage all customer reviews displaying on the website.</p>
        </div>
        <div className="bg-emerald-950/50 px-4 py-2 rounded-xl border border-emerald-800">
          <span className="text-xs font-bold text-slate-400">Total Approved:</span>
          <span className="ml-2 text-lg font-black text-emerald-400">{totalCount}</span>
        </div>
      </div>

      {/* Reviews Content */}
      <div className="bg-emerald-900 border border-emerald-800 rounded-3xl shadow-xl overflow-hidden flex flex-col min-h-[500px]">
        {loading && reviews.length === 0 ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2 flex-grow justify-center">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2 flex-grow justify-center">
            <MessageSquare className="w-12 h-12 text-slate-600 mb-2" />
            No reviews found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse relative">
              <thead className="bg-emerald-950/50 text-emerald-100">
                <tr>
                  <th className="px-6 py-4 font-bold border-b border-emerald-800">Reviewer</th>
                  <th className="px-6 py-4 font-bold border-b border-emerald-800">Rating</th>
                  <th className="px-6 py-4 font-bold border-b border-emerald-800">Review Content</th>
                  <th className="px-6 py-4 font-bold border-b border-emerald-800">Date Added</th>
                  <th className="px-6 py-4 font-bold border-b border-emerald-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-800 text-slate-300">
                {reviews.map(review => (
                  <tr key={review.id} className="hover:bg-emerald-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{review.name}</div>
                      <div className="text-xs text-slate-500">{review.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-700 text-slate-700'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-md line-clamp-2 text-xs leading-relaxed" title={review.text}>
                        {review.text}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-400 whitespace-nowrap">
                      {new Date(review.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(review.id)}
                        className="p-2.5 text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-all shadow-sm flex items-center justify-center ml-auto"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="mt-auto border-t border-emerald-800 bg-emerald-950/30 p-4 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Showing page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
                className="p-2 rounded-lg bg-emerald-900 border border-emerald-800 text-emerald-100 disabled:opacity-50 hover:bg-emerald-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
                className="p-2 rounded-lg bg-emerald-900 border border-emerald-800 text-emerald-100 disabled:opacity-50 hover:bg-emerald-800 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
