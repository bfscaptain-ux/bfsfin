"use client";

import { useState, useEffect } from "react";
import { 
  Briefcase, Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, Eye, RefreshCw, Clock
} from "lucide-react";
import Link from "next/link";

interface CareerJob {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string | null;
  isActive: boolean;
  createdAt: string;
}

export default function AdminCareersCMS() {
  const [jobs, setJobs] = useState<CareerJob[]>([]);
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
    department: "Sales",
    location: "Agra, UP",
    type: "Full-Time",
    description: "",
    requirements: "",
    isActive: true
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/careers");
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
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
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingId ? `/api/careers/${editingId}` : "/api/careers";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (data.success) {
        fetchJobs();
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
    if(!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await fetch(`/api/careers/${id}`, { method: "DELETE" });
      fetchJobs();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (job: CareerJob) => {
    setEditingId(job.id);
    setFormData({
      title: job.title,
      slug: job.slug,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements || "",
      isActive: job.isActive
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "", slug: "", department: "Sales", location: "Agra, UP", type: "Full-Time", description: "", requirements: "", isActive: true
    });
  };

  const openNewModal = () => {
    setEditingId(null);
    resetForm();
    setShowModal(true);
  };

  // Filter & Pagination logic
  const filtered = jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.department.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [search]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-lg">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-400" /> Career & Job Postings CMS
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage open positions and career opportunities.</p>
        </div>

        <button
          onClick={openNewModal}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> Add New Job
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
            placeholder="Search by title or department..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Job Details</th>
                <th className="py-4 px-6">Department</th>
                <th className="py-4 px-6">Location / Type</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr><td colSpan={5} className="py-12 text-center text-slate-500">Loading Jobs...</td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-slate-500">No Jobs found.</td></tr>
              ) : (
                paginated.map(job => (
                  <tr key={job.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 max-w-sm">
                      <div className="font-bold text-white mb-1 truncate">{job.title}</div>
                      <div className="text-xs text-slate-500 truncate">/{job.slug}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">{job.department}</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400">
                      <div>{job.location}</div>
                      <div className="text-[10px]">{job.type}</div>
                    </td>
                    <td className="py-4 px-6">
                      {job.isActive 
                        ? <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold"><CheckCircle2 className="w-3 h-3"/> Active</span>
                        : <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold"><Clock className="w-3 h-3"/> Closed</span>
                      }
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/careers/${job.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleEdit(job)} className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(job.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
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
              <h2 className="text-2xl font-black text-white mb-6">{editingId ? "Edit Job Posting" : "Add New Job"}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Info */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Job Title</label>
                    <input required type="text" value={formData.title} onChange={handleTitleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">URL Slug</label>
                      <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-400 focus:border-blue-500 focus:outline-none font-mono text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Department</label>
                      <input required type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" placeholder="e.g. Sales, Operations, IT" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</label>
                      <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Job Type</label>
                      <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none appearance-none">
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Description (HTML / Text)</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={6} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-mono text-sm"></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Requirements (HTML / Text)</label>
                  <textarea value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} rows={5} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-mono text-sm"></textarea>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" />
                    <span className="text-sm font-bold text-white">Active (Accepting Applications)</span>
                  </label>
                  
                  <button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition flex items-center gap-2">
                    {submitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : (editingId ? "Update Job" : "Publish Job")}
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
