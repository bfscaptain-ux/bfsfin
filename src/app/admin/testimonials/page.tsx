"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Plus, Star, Trash2, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialItem {
  id: string;
  slug?: string;
  name: string;
  role: string;
  location: string;
  stars: number;
  quote: string;
  loanAmount: string;
  bankName: string;
  videoUrl?: string;
  photoUrl?: string;
}

export default function AdminTestimonialsCMS() {
  const [reviews, setReviews] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    role: "Property Buyer",
    location: "Agra",
    stars: "5",
    quote: "",
    challenge: "",
    solution: "",
    result: "",
    loanAmount: "₹30 Lakhs",
    bankName: "PNB",
  });

  const fetchReviews = async (p = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/testimonials?page=${p}&limit=10`);
      const data = await res.json();
      setReviews(data.data);
      setTotalPages(data.meta.totalPages || 1);
      setPage(p);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.quote) return;

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (photoFile) formData.append("photoFile", photoFile);
      if (videoFile) formData.append("videoFile", videoFile);

      await fetch("/api/testimonials", {
        method: "POST",
        body: formData
      });
      
      setShowModal(false);
      setPhotoFile(null);
      setVideoFile(null);
      fetchReviews(1); // refresh list
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      setReviews(reviews.filter(r => r.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-400" /> Client Testimonials CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage verified customer reviews displayed on user homepage.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg transition"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-emerald-400">
                    {[...Array(r.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-emerald-400" />
                    ))}
                  </div>
                  <button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-300 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-medium italic">&quot;{r.quote}&quot;</p>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{r.name}</div>
                    <div className="text-[10px] text-slate-400">{r.role} • {r.location}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold block">{r.loanAmount}</span>
                    <span className="text-[10px] text-blue-400 font-semibold">{r.bankName}</span>
                  </div>
                </div>
                {r.slug && (
                  <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 truncate flex justify-between">
                    <span>URL: /testimonials/{r.slug}</span>
                    <div className="flex gap-2">
                      {r.photoUrl && <span className="text-emerald-400">Has Photo</span>}
                      {r.videoUrl && <span className="text-blue-400">Has Video</span>}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {reviews.length === 0 && (
              <div className="col-span-1 md:col-span-2 text-center py-10 text-slate-500">
                No testimonials found.
              </div>
            )}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button 
                onClick={() => fetchReviews(page - 1)} 
                disabled={page === 1}
                className="p-2 bg-slate-800 rounded-lg text-slate-300 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-slate-400 text-sm">Page {page} of {totalPages}</span>
              <button 
                onClick={() => fetchReviews(page + 1)} 
                disabled={page === totalPages}
                className="p-2 bg-slate-800 rounded-lg text-slate-300 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-blue-500/40 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Add Customer Review</h3>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Property Buyer"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Sanjay Place, Agra"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Customer Review Quote (Short for card) *</label>
                <textarea
                  required
                  rows={2}
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder="Approved in 4 days..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-400 font-semibold mb-1">The Challenge (Optional)</label>
                <textarea
                  rows={2}
                  value={form.challenge}
                  onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                  placeholder="e.g. Rejected by 3 banks due to low CIBIL..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-blue-400 font-semibold mb-1">The Solution (Optional)</label>
                <textarea
                  rows={2}
                  value={form.solution}
                  onChange={(e) => setForm({ ...form, solution: e.target.value })}
                  placeholder="e.g. We structured their loan with a co-applicant..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-emerald-400 font-semibold mb-1">The Result (Optional)</label>
                <textarea
                  rows={2}
                  value={form.result}
                  onChange={(e) => setForm({ ...form, result: e.target.value })}
                  placeholder="e.g. Loan approved in 7 days, client moved into dream home."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sanctioned Amount</label>
                  <input
                    type="text"
                    value={form.loanAmount}
                    onChange={(e) => setForm({ ...form, loanAmount: e.target.value })}
                    placeholder="₹30 Lakhs"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sanctioning Bank</label>
                  <input
                    type="text"
                    value={form.bankName}
                    onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                    placeholder="PNB"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Custom URL / Slug (Optional)</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="e.g. rajesh-kumar"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Upload Photo (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-500 file:text-slate-900 hover:file:bg-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Upload Video (Optional)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-400"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Publish Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
