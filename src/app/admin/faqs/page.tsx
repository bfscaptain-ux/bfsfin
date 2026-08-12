"use client";

import { useState, useEffect } from "react";
import { 
  HelpCircle, Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, Eye, RefreshCw, Clock
} from "lucide-react";
import Link from "next/link";

interface FaqItem {
  id: string;
  question: string;
  slug: string;
  answer: string;
  category: string;
  isPublished: boolean;
  createdAt: string;
}

export default function AdminFaqsCMS() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    question: "",
    slug: "",
    answer: "",
    category: "General",
    isPublished: true
  });

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/faqs?admin=true");
      const data = await res.json();
      if (data.success) {
        setFaqs(data.faqs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSlugify = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const question = e.target.value;
    setFormData(prev => ({
      ...prev,
      question,
      slug: prev.slug === handleSlugify(prev.question) || prev.slug === "" ? handleSlugify(question) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingId ? `/api/faqs/${editingId}` : "/api/faqs";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (data.success) {
        fetchFaqs();
        setShowModal(false);
        setEditingId(null);
        resetForm();
      } else {
        alert(data.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!window.confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      fetchFaqs();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (faq: FaqItem) => {
    setEditingId(faq.id);
    setFormData({
      question: faq.question,
      slug: faq.slug,
      answer: faq.answer,
      category: faq.category || "General",
      isPublished: faq.isPublished
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      question: "", slug: "", answer: "", category: "General", isPublished: true
    });
  };

  const openNewModal = () => {
    setEditingId(null);
    resetForm();
    setShowModal(true);
  };

  // Filter & Pagination logic
  const filtered = faqs.filter(f => f.question.toLowerCase().includes(search.toLowerCase()) || (f.category && f.category.toLowerCase().includes(search.toLowerCase())));
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [search]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-lg">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-purple-400" /> FAQ Management CMS
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage SEO-optimized Frequently Asked Questions.</p>
        </div>

        <button
          onClick={openNewModal}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> Add New FAQ
        </button>
      </div>

      {/* Filter */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 text-sm shadow-md">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by question or category..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-slate-200 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">FAQ Details</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr><td colSpan={4} className="py-12 text-center text-slate-500">Loading FAQs...</td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={4} className="py-12 text-center text-slate-500">No FAQs found.</td></tr>
              ) : (
                paginated.map(faq => (
                  <tr key={faq.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 max-w-md">
                      <div className="font-bold text-white mb-1 truncate">{faq.question}</div>
                      <div className="text-xs text-slate-500 truncate">/{faq.slug}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">{faq.category}</span>
                    </td>
                    <td className="py-4 px-6">
                      {faq.isPublished 
                        ? <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold"><CheckCircle2 className="w-3 h-3"/> Published</span>
                        : <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold"><Clock className="w-3 h-3"/> Draft</span>
                      }
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/faqs/${faq.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleEdit(faq)} className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(faq.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
            <p className="text-xs text-slate-400">Page {currentPage} of {totalPages}</p>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg disabled:opacity-50">Prev</button>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 bg-slate-800 hover:bg-red-500 hover:text-white text-slate-400 rounded-full transition-colors">
              <XCircle className="w-6 h-6" />
            </button>
            
            <div className="p-8">
              <h2 className="text-2xl font-black text-white mb-6">{editingId ? "Edit FAQ" : "Add New FAQ"}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Info */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Question</label>
                    <input required type="text" value={formData.question} onChange={handleQuestionChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">URL Slug</label>
                      <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-400 focus:border-purple-500 focus:outline-none font-mono text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Category</label>
                      <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none appearance-none">
                        <option value="General">General</option>
                        <option value="Home Loans">Home Loans</option>
                        <option value="Business Loans">Business Loans</option>
                        <option value="Credit Score">Credit Score</option>
                        <option value="Personal Loans">Personal Loans</option>
                        <option value="Loan Against Property">Loan Against Property</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Answer (HTML / Text)</label>
                  <textarea required value={formData.answer} onChange={e => setFormData({...formData, answer: e.target.value})} rows={8} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none font-mono text-sm"></textarea>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})} className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-purple-500 focus:ring-purple-500 focus:ring-offset-slate-900" />
                    <span className="text-sm font-bold text-white">Publish Immediately</span>
                  </label>
                  
                  <button type="submit" disabled={submitting} className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-xl transition flex items-center gap-2">
                    {submitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : (editingId ? "Update FAQ" : "Publish FAQ")}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
