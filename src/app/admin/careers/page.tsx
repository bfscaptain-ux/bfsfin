"use client";

import { useState, useEffect } from "react";
import { Briefcase, Plus, Users, CheckCircle2, XCircle, FileText } from "lucide-react";

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null); // For viewing applicants
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const [newJob, setNewJob] = useState({
    title: "", department: "", location: "Agra", type: "Full-Time",
    salary: "₹15,000 - ₹25,000 / month", incentive: "Uncapped Incentives up to ₹50,000",
    experience: "", description: "", requirements: "", expiresAt: ""
  });

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      if (data.success && data.jobs) {
        setJobs(data.jobs);
      }
    } catch (e) {
      console.log("Failed to fetch jobs");
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob)
      });
      if (res.ok) {
        setShowAddModal(false);
        fetchJobs();
      }
    } catch (e) {
      console.log("Failed to create job");
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-900 border border-emerald-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-emerald-400" /> Career & Jobs Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">Formal management console for job postings and applications.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg transition"
        >
          <Plus className="w-4 h-4" /> Post New Job
        </button>
      </div>

      <div className="bg-emerald-900 border border-emerald-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-950/50 text-slate-400 text-xs uppercase tracking-wider border-b border-emerald-800">
                <th className="p-4 font-bold">Job Title / Dept</th>
                <th className="p-4 font-bold">Location & Type</th>
                <th className="p-4 font-bold">Status / Deadline</th>
                <th className="p-4 font-bold text-center">Applications</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-800/50">
              {currentJobs.length > 0 ? currentJobs.map(job => (
                <tr key={job.id} className="hover:bg-emerald-800/20 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-white text-sm">{job.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{job.department}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-slate-200">{job.location}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{job.type}</p>
                  </td>
                  <td className="p-4">
                    {job.isActive && (!job.expiresAt || new Date(job.expiresAt) >= new Date()) ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> ACTIVE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                        <XCircle className="w-3 h-3" /> EXPIRED / CLOSED
                      </span>
                    )}
                    {job.expiresAt && (
                      <p className="text-[10px] text-slate-400 mt-1.5">
                        By: {new Date(job.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </p>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className="bg-emerald-950 text-emerald-400 font-black px-3 py-1.5 rounded-lg border border-emerald-800 inline-block">
                      {job.applications?.length || 0}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setSelectedJob(job)}
                      className="bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 text-indigo-400 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ml-auto"
                    >
                      <Users className="w-4 h-4" /> View Applicants
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 text-sm">No jobs posted yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-emerald-800 flex items-center justify-between bg-emerald-950/30">
            <p className="text-xs text-slate-400">Showing {indexOfFirstJob + 1} to {Math.min(indexOfLastJob, jobs.length)} of {jobs.length} jobs</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg bg-emerald-900 border border-emerald-800 text-slate-300 disabled:opacity-50 text-xs font-bold hover:bg-emerald-800"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg bg-emerald-900 border border-emerald-800 text-slate-300 disabled:opacity-50 text-xs font-bold hover:bg-emerald-800"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Applicants Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-emerald-900 border border-emerald-500/40 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-emerald-800 flex justify-between items-center bg-emerald-950/50">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" /> Applicants for {selectedJob.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">Total {selectedJob.applications?.length || 0} applications received</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-white bg-slate-800 hover:bg-red-500 p-2 rounded-full transition">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {selectedJob.applications?.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {selectedJob.applications.map((app: any) => (
                    <div key={app.id} className="bg-emerald-950 p-5 rounded-2xl border border-emerald-800 relative">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                        <div>
                          <p className="font-black text-white text-lg">{app.name}</p>
                          <p className="text-xs text-slate-400 font-mono mt-1">{app.email} • {app.phone}</p>
                          <div className="flex flex-wrap gap-2 mt-3 text-xs">
                            {app.city && <span className="bg-emerald-900/50 text-emerald-300 px-2 py-1 rounded border border-emerald-800">City: {app.city}</span>}
                            {app.experience && <span className="bg-emerald-900/50 text-emerald-300 px-2 py-1 rounded border border-emerald-800">Exp: {app.experience}</span>}
                            {app.currentSalary && <span className="bg-emerald-900/50 text-emerald-300 px-2 py-1 rounded border border-emerald-800">CTC: {app.currentSalary}</span>}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                            Status: {app.status}
                          </span>
                          {app.resumeUrl && (
                            <a 
                              href={app.resumeUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-lg"
                            >
                              <FileText className="w-4 h-4" /> Download Resume
                            </a>
                          )}
                        </div>
                      </div>

                      {app.coverText && (
                        <div className="mt-4 text-xs text-slate-300 bg-emerald-900/30 p-4 rounded-xl border border-emerald-800/50">
                          <strong className="block text-emerald-500 mb-1.5">Cover Letter / Summary:</strong>
                          <span className="leading-relaxed">"{app.coverText}"</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-800">
                    <Users className="w-8 h-8 text-emerald-700" />
                  </div>
                  <p className="text-slate-400 font-medium">No applications received yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Post New Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-emerald-900 border border-emerald-500/40 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Post New Job</h3>
            <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Job Title *</label>
                <input
                  type="text" required
                  value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  placeholder="e.g. Senior Loan Officer"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <input
                    type="text" required
                    value={newJob.department} onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                    placeholder="e.g. Sales"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Experience</label>
                  <input
                    type="text" required
                    value={newJob.experience} onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                    placeholder="e.g. 2-5 Years"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text" required
                    value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                    placeholder="e.g. Pan India"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Employment Type</label>
                  <select
                    value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Commission">Commission-Based</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Base Salary</label>
                  <input
                    type="text" required
                    value={newJob.salary} onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                    placeholder="e.g. ₹15,000 - ₹25,000 / month"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Incentives / Perks</label>
                  <input
                    type="text"
                    value={newJob.incentive} onChange={(e) => setNewJob({ ...newJob, incentive: e.target.value })}
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                    placeholder="e.g. Up to ₹50,000 based on targets"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  required rows={3}
                  value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Requirements</label>
                <textarea
                  required rows={3}
                  value={newJob.requirements} onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                  className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  placeholder="Bullets or comma separated..."
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Closing Date / Deadline (Optional)</label>
                <input
                  type="date"
                  value={newJob.expiresAt} onChange={(e) => setNewJob({ ...newJob, expiresAt: e.target.value })}
                  className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none [color-scheme:dark]"
                />
                <p className="text-[10px] text-slate-500 mt-1">If set, the job will automatically hide from the website after this date.</p>
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl">Cancel</button>
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl">Post Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
