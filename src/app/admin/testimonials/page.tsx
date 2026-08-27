"use client";

import { useState } from "react";
import { MessageSquare, Plus, Star, Trash2, CheckCircle2 } from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  stars: number;
  quote: string;
  loanAmount: string;
  bankName: string;
}

export default function AdminTestimonialsCMS() {
  const [reviews, setReviews] = useState<TestimonialItem[]>([
    { id: "1", name: "Rajesh Kumar", role: "Property Buyer", location: "Sanjay Place, Agra", stars: 5, quote: "Approved in 4 days! Process was super smooth.", loanAmount: "₹30 Lakhs", bankName: "PNB" },
    { id: "2", name: "Priya Sharma", role: "Senior Teacher", location: "Naya Bans, Agra", stars: 5, quote: "Saved over ₹14 Lakhs in interest payout via Balance Transfer!", loanAmount: "₹25 Lakhs", bankName: "Central Bank of India" },
    { id: "3", name: "Patel & Co. (Amit Patel)", role: "Real Estate Partner", location: "Fatehabad Road, Agra", stars: 5, quote: "Best partner portal for my clients. Fast approval and prompt commission.", loanAmount: "₹50 Lakhs Avg", bankName: "IDBI Bank" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "Property Buyer",
    location: "Agra",
    stars: "5",
    quote: "",
    loanAmount: "₹30 Lakhs",
    bankName: "PNB"
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.quote) return;

    setReviews([
      ...reviews,
      {
        id: Date.now().toString(),
        name: form.name,
        role: form.role,
        location: form.location,
        stars: parseInt(form.stars),
        quote: form.quote,
        loanAmount: form.loanAmount,
        bankName: form.bankName
      }
    ]);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-900 border border-emerald-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-400" /> Client Testimonials CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage verified customer reviews displayed on user homepage.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg transition"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <div key={r.id} className="bg-emerald-900 border border-emerald-800 p-6 rounded-3xl space-y-3 relative">
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

            <div className="pt-3 border-t border-emerald-800 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-white">{r.name}</div>
                <div className="text-[10px] text-slate-400">{r.role} • {r.location}</div>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-bold block">{r.loanAmount}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">{r.bankName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-emerald-900 border border-emerald-500/40 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
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
                  className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
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
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Sanjay Place, Agra"
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Customer Review Quote *</label>
                <textarea
                  required
                  rows={3}
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder="Approved in 4 days..."
                  className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
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
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sanctioning Bank</label>
                  <input
                    type="text"
                    value={form.bankName}
                    onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                    placeholder="PNB"
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
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
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl"
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
