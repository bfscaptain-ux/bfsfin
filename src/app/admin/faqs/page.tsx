"use client";

import { useState, useEffect } from "react";
import { HelpCircle, Plus, Trash2, Eye, EyeOff, X, Save } from "lucide-react";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { FAQ } from "@/types/faq";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function AdminFaqsCMS() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFaqs, setTotalFaqs] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("Home Loans");
  const [answer, setAnswer] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const fetchFaqs = (page = 1) => {
    setLoading(true);
    fetch(`/api/faqs?page=${page}&limit=15&status=all`)
      .then(res => res.json())
      .then(res => {
        setFaqs(res.data || []);
        setTotalPages(res.meta?.totalPages || 1);
        setTotalFaqs(res.meta?.total || 0);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load FAQs", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFaqs(currentPage);
  }, [currentPage]);

  const handleCreate = async (e: React.FormEvent, publishStatus: 'draft' | 'published') => {
    e.preventDefault();
    if (!question || !answer) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          category,
          answer,
          status: publishStatus,
          seoTitle,
          metaDescription
        })
      });

      if (res.ok) {
        fetchFaqs(currentPage);
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error creating FAQ:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const res = await fetch(`/api/faqs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchFaqs(currentPage);
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const resetForm = () => {
    setQuestion("");
    setCategory("Home Loans");
    setAnswer("");
    setSeoTitle("");
    setMetaDescription("");
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-900 border border-emerald-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-400" /> FAQ & AEO CMS
            <span className="bg-emerald-800 text-emerald-300 text-sm px-3 py-0.5 rounded-full border border-emerald-700/50">{totalFaqs} Total</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage FAQs with Rich Text and SEO to rank in AI Answer Engines (GEO/AEO).</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg transition"
        >
          <Plus className="w-4 h-4" /> Add New FAQ
        </button>
      </div>

      <div className="bg-emerald-900 border border-emerald-800 rounded-3xl p-6 shadow-xl space-y-4">
        {loading ? (
           <div className="text-center py-10 text-emerald-400 animate-pulse">Loading FAQs...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-emerald-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-emerald-800">
                <tr>
                  <th className="py-3 px-4">Question</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Views</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {faqs.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-white max-w-[300px] truncate">{f.question}</td>
                    <td className="py-3.5 px-4">
                      {f.status === 'published' ? (
                        <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30 text-[10px] flex items-center gap-1 w-max">
                          <Eye className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30 text-[10px] flex items-center gap-1 w-max">
                          <EyeOff className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded border border-slate-700 text-[10px]">
                        {f.category || 'General'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-400 font-bold">{f.views || 0}</td>
                    <td className="py-3.5 px-4 flex items-center gap-2">
                      <button onClick={() => handleDelete(f.id)} className="text-red-400 hover:text-red-300 p-1 bg-red-400/10 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-emerald-800 pt-4 mt-4 px-2">
              <div className="text-xs text-slate-400">
                Showing page <span className="text-white font-bold">{currentPage}</span> of <span className="text-white font-bold">{totalPages}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-emerald-950 border border-emerald-800 text-slate-300 disabled:opacity-50 hover:bg-emerald-900 transition-colors text-xs font-bold shadow-sm"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-emerald-950 border border-emerald-800 text-slate-300 disabled:opacity-50 hover:bg-emerald-900 transition-colors text-xs font-bold shadow-sm"
                >
                  Next
                </button>
              </div>
            </div>
            
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-emerald-900 border border-emerald-500/40 rounded-3xl p-6 max-w-4xl w-full my-8 shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-black text-white mb-6">Create New FAQ</h3>
            
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              
              {/* Main Content Area */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Question (H1) *</label>
                  <input type="text" required value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="e.g. What is the minimum CIBIL score for a home loan?" className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500" />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Detailed Answer *</label>
                  <div className="bg-white rounded-xl overflow-hidden text-slate-900">
                    <ReactQuill theme="snow" value={answer} onChange={setAnswer} modules={modules} className="h-64 mb-10" />
                  </div>
                </div>
              </div>

              {/* Sidebar Settings */}
              <div className="space-y-4 bg-emerald-950/50 p-5 rounded-2xl border border-emerald-800/50">
                <h4 className="font-bold text-emerald-400 mb-2 border-b border-emerald-800 pb-2">Publish Settings</h4>
                
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">Assign to Page (Category)</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-emerald-950 border border-emerald-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none text-xs">
                    <optgroup label="General Pages">
                      <option value="General">Home & About Us (General)</option>
                    </optgroup>
                    <optgroup label="Product Pages">
                      <option value="Home Loan">Home Loan</option>
                      <option value="Balance Transfer">Balance Transfer</option>
                      <option value="Loan Against Property">Loan Against Property</option>
                      <option value="Business Loan">Business Loan</option>
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Car Loan">Car Loan</option>
                      <option value="Education Loan">Education Loan</option>
                      <option value="Gold Loan">Gold Loan</option>
                      <option value="Plot Loan">Plot Loan</option>
                      <option value="Construction Loan">Construction Loan</option>
                      <option value="Home Renovation">Home Renovation</option>
                      <option value="Top Up Loan">Top-Up Loan</option>
                      <option value="NRI Home Loan">NRI Home Loan</option>
                      <option value="Loan Against Securities">Loan Against Securities</option>
                      <option value="Working Capital">Working Capital</option>
                    </optgroup>
                    <optgroup label="Bank Pages">
                      <option value="PNB">PNB</option>
                      <option value="SBI">SBI</option>
                      <option value="HDFC">HDFC</option>
                      <option value="ICICI">ICICI</option>
                      <option value="Bank of Baroda">Bank of Baroda</option>
                      <option value="Central Bank of India">Central Bank of India</option>
                    </optgroup>
                  </select>
                </div>

                <h4 className="font-bold text-emerald-400 mt-6 mb-2 border-b border-emerald-800 pb-2">SEO / AEO Settings</h4>
                
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">SEO Title (Optional)</label>
                  <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Custom title for Google" className="w-full bg-emerald-950 border border-emerald-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none text-xs" />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">Meta Description</label>
                  <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={3} placeholder="Crucial for AEO context..." className="w-full bg-emerald-950 border border-emerald-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none text-xs" />
                </div>

                <div className="pt-6 grid grid-cols-2 gap-2">
                  <button type="button" onClick={(e) => handleCreate(e, 'draft')} disabled={isSubmitting} className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition">
                    <Save className="w-4 h-4" /> Draft
                  </button>
                  <button type="button" onClick={(e) => handleCreate(e, 'published')} disabled={isSubmitting} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <Plus className="w-4 h-4" /> Publish
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
