"use client";

import { useState, useEffect } from "react";
import { Star, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

interface Review {
  id: string;
  applicationId: string | null;
  phone: string | null;
  name: string;
  rating: number;
  title: string;
  content: string;
  status: string;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews?admin=true");
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "APPROVED" ? "HIDDEN" : "APPROVED";
    try {
      await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this review?")) return;
    try {
      await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      setReviews(reviews.filter(r => r.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Review Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Control and moderate client reviews</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Review Content</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {reviews.map(review => (
                  <tr key={review.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">{review.name}</div>
                      <div className="text-xs text-slate-500">App No: {review.applicationId || 'N/A'}</div>
                      <div className="text-xs text-slate-500">Phone: {review.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="font-bold text-slate-900 dark:text-white mb-1 truncate">{review.title}</div>
                      <div className="text-slate-500 text-xs line-clamp-2">{review.content}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        review.status === "APPROVED" 
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" 
                          : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                      }`}>
                        {review.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => toggleStatus(review.id, review.status)}
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                          title={review.status === "APPROVED" ? "Hide from public" : "Approve and show"}
                        >
                          {review.status === "APPROVED" ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        <button 
                          onClick={() => handleDelete(review.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete permanently"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {reviews.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                      No reviews found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
