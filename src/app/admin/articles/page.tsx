"use client";

import { useState, useEffect } from "react";
import { 
  FileText, Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, Eye, RefreshCw, Clock
} from "lucide-react";
import Link from "next/link";

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string;
  metaTitle: string;
  metaDescription: string;
  isPublished: boolean;
  createdAt: string;
}

export default function AdminArticlesCMS() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
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
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    author: "Admin",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    isPublished: true
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs?admin=true");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSlugify = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug === handleSlugify(prev.title) || prev.slug === "" ? handleSlugify(title) : prev.slug,
      metaTitle: title
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingId ? `/api/blogs/${editingId}` : "/api/blogs";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (data.success) {
        fetchBlogs();
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
    if(!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      fetchBlogs();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (blog: BlogItem) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      content: blog.content,
      coverImage: blog.coverImage || "",
      author: blog.author,
      tags: blog.tags || "",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      isPublished: blog.isPublished
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "", slug: "", excerpt: "", content: "", coverImage: "", 
      author: "Admin", tags: "", metaTitle: "", metaDescription: "", isPublished: true
    });
  };

  const openNewModal = () => {
    setEditingId(null);
    resetForm();
    setShowModal(true);
  };

  // Filter & Pagination logic
  const filtered = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || (b.tags && b.tags.toLowerCase().includes(search.toLowerCase())));
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [search]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-lg">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" /> Content & Articles CMS
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage SEO-optimized blogs, articles, and public content.</p>
        </div>

        <button
          onClick={openNewModal}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> Create New Post
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
            placeholder="Search by title or tags..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Article Info</th>
                <th className="py-4 px-6">SEO & Tags</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr><td colSpan={4} className="py-12 text-center text-slate-500">Loading articles...</td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={4} className="py-12 text-center text-slate-500">No articles found.</td></tr>
              ) : (
                paginated.map(blog => (
                  <tr key={blog.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-white mb-1">{blog.title}</div>
                      <div className="text-xs text-slate-500">/{blog.slug}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags?.split(',').map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">{tag.trim()}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {blog.isPublished 
                        ? <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold"><CheckCircle2 className="w-3 h-3"/> Published</span>
                        : <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold"><Clock className="w-3 h-3"/> Draft</span>
                      }
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/blogs/${blog.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleEdit(blog)} className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(blog.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
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
              <h2 className="text-2xl font-black text-white mb-6">{editingId ? "Edit Article" : "Create New Article"}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Title</label>
                    <input required type="text" value={formData.title} onChange={handleTitleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">URL Slug</label>
                    <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-400 focus:border-emerald-500 focus:outline-none font-mono text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Short Excerpt</label>
                  <input required type="text" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Main Content (HTML / Text)</label>
                  <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={8} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none font-mono text-sm"></textarea>
                </div>

                {/* Meta & SEO */}
                <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-emerald-400">SEO & Metadata</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Meta Title</label>
                      <input type="text" value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Cover Image URL</label>
                      <input type="text" value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tags (Comma Separated)</label>
                    <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="Finance, Loans, Tips" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})} className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900" />
                    <span className="text-sm font-bold text-white">Publish Immediately</span>
                  </label>
                  
                  <button type="submit" disabled={submitting} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl transition flex items-center gap-2">
                    {submitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : (editingId ? "Update Article" : "Publish Article")}
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
