"use client";

import { useState, useEffect } from "react";
import { FileText, Plus, Edit2, Trash2, Eye, EyeOff, X, Save } from "lucide-react";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { BlogPost } from "@/types/blog";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function AdminArticlesCMS() {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Home Loans");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("Adv. Praveen Bhardwaj");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "blog-images");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.url);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    } finally {
      setIsUploading(false);
    }
  };

  const fetchArticles = () => {
    setLoading(true);
    fetch("/api/blogs?limit=50&status=all")
      .then(res => res.json())
      .then(res => {
        setArticles(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load blogs", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCreate = async (e: React.FormEvent, publishStatus: 'draft' | 'published') => {
    e.preventDefault();
    if (!title || !content) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          content,
          excerpt,
          author,
          imageUrl,
          status: publishStatus,
          seoTitle,
          metaDescription
        })
      });

      if (res.ok) {
        fetchArticles();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchArticles();
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("Home Loans");
    setContent("");
    setExcerpt("");
    setImageUrl("");
    setSeoTitle("");
    setMetaDescription("");
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-900 border border-emerald-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" /> Blog & Educational Resources CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">Publish guides and articles to educate homebuyers and improve SEO ranking.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg transition"
        >
          <Plus className="w-4 h-4" /> Publish New Article
        </button>
      </div>

      <div className="bg-emerald-900 border border-emerald-800 rounded-3xl p-6 shadow-xl space-y-4">
        {loading ? (
           <div className="text-center py-10 text-emerald-400 animate-pulse">Loading articles...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-emerald-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-emerald-800">
                <tr>
                  <th className="py-3 px-4">Article Title</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Views</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {articles.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-white max-w-[250px] truncate">{a.title}</td>
                    <td className="py-3.5 px-4">
                      {a.status === 'published' ? (
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
                        {a.category || 'General'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-400 font-bold">{a.views || 0}</td>
                    <td className="py-3.5 px-4 text-slate-400">{a.date}</td>
                    <td className="py-3.5 px-4 flex items-center gap-2">
                      <button onClick={() => handleDelete(a.id)} className="text-red-400 hover:text-red-300 p-1 bg-red-400/10 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-emerald-900 border border-emerald-500/40 rounded-3xl p-6 max-w-4xl w-full my-8 shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-black text-white mb-6">Create New Article</h3>
            
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              
              {/* Main Content Area */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Article Title *</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. How to Save Tax on Home Loan" className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500" />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Article Content *</label>
                  <div className="bg-white rounded-xl overflow-hidden text-slate-900">
                    <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} className="h-64 mb-10" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Short Excerpt</label>
                  <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="A brief summary for the blog listing page..." rows={3} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500" />
                </div>
              </div>

              {/* Sidebar Settings */}
              <div className="space-y-4 bg-emerald-950/50 p-5 rounded-2xl border border-emerald-800/50">
                <h4 className="font-bold text-emerald-400 mb-2 border-b border-emerald-800 pb-2">Publish Settings</h4>
                
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-emerald-950 border border-emerald-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none text-xs">
                    <option value="Home Loans">Home Loans</option>
                    <option value="Tax Guidance">Tax Guidance</option>
                    <option value="Balance Transfer">Balance Transfer</option>
                    <option value="Credit Rating">Credit Rating</option>
                    <option value="Market Trends">Market Trends</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">Author</label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full bg-emerald-950 border border-emerald-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none text-xs" />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">Featured Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload} 
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none text-xs file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-500 file:text-slate-900 hover:file:bg-emerald-400" 
                  />
                  {isUploading && <p className="text-xs text-emerald-400 mt-1 animate-pulse">Uploading...</p>}
                  {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 rounded-lg h-24 w-full object-cover border border-emerald-800" />}
                </div>

                <h4 className="font-bold text-emerald-400 mt-6 mb-2 border-b border-emerald-800 pb-2">SEO Settings</h4>
                
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">SEO Title (Optional)</label>
                  <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Custom title for Google" className="w-full bg-emerald-950 border border-emerald-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none text-xs" />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">Meta Description</label>
                  <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={3} className="w-full bg-emerald-950 border border-emerald-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none text-xs" />
                </div>

                <div className="pt-6 grid grid-cols-2 gap-2">
                  <button type="button" onClick={(e) => handleCreate(e, 'draft')} disabled={isSubmitting} className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition">
                    <Save className="w-4 h-4" /> Save Draft
                  </button>
                  <button type="button" onClick={(e) => handleCreate(e, 'published')} disabled={isSubmitting} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <Plus className="w-4 h-4" /> Publish Live
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
