"use client";

import { useState, useEffect } from "react";
import { 
  FileCheck, Search, Eye, Trash2, XCircle, Briefcase, Mail, Phone, MapPin, Calendar, Clock, Star, ExternalLink, GraduationCap, Download, AlertTriangle, FileText
} from "lucide-react";
import Link from "next/link";

interface JobApplication {
  id: string;
  applicationNo: string;
  jobId: string;
  job: { title: string; department: string };
  
  // 1. Basic Info
  fullName: string;
  email: string;
  phone: string;
  hasWhatsapp: boolean;
  address: string;
  gender: string;
  dob: string | null;
  
  // 2. Job Selection
  preferredLocation: string | null;
  jobType: string | null;
  noticePeriod: string | null;
  
  // 3. Education
  qualification: string | null;
  specialization: string | null;
  passingYear: string | null;
  university: string | null;
  
  // 4. Experience & Skills
  experienceYears: string;
  currentCompany: string | null;
  currentCtc: string | null;
  expectedSalary: string | null;
  keySkills: string; // JSON
  
  // 5. Document Uploads
  resumeUrl: string | null;
  photoUrl: string | null;
  hasVehicle: boolean;
  
  // 6. Additional
  whyJoin: string | null;
  fieldComfortable: boolean;
  
  status: string;
  appliedAt: string;
}

export default function AdminJobApplicationsCMS() {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/job-applications");
      const data = await res.json();
      if (data.success) {
        setApps(data.applications);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/job-applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchApps();
        if (selectedApp?.id === id) {
          setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!window.confirm("Are you sure you want to delete this application permanently?")) return;
    try {
      await fetch(`/api/job-applications/${id}`, { method: "DELETE" });
      fetchApps();
      if(selectedApp?.id === id) setShowModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  const viewDetails = (app: JobApplication) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  // Filter & Pagination logic
  const filtered = apps.filter(a => 
    a.fullName.toLowerCase().includes(search.toLowerCase()) || 
    a.applicationNo.toLowerCase().includes(search.toLowerCase()) ||
    a.job.title.toLowerCase().includes(search.toLowerCase())
  );
  
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [search]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'NEW': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'REVIEWING': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'SHORTLISTED': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'REJECTED': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'HIRED': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const parseSkills = (skillsJson: string) => {
    try {
      const parsed = JSON.parse(skillsJson);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-lg">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-emerald-400" /> Job Applications CMS
          </h1>
          <p className="text-sm text-slate-400 mt-1">Review candidates and manage hiring pipelines.</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 text-sm shadow-md">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, app ID, or job title..."
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
                <th className="py-4 px-6">Applicant</th>
                <th className="py-4 px-6">Applied For</th>
                <th className="py-4 px-6">Experience / Loc</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr><td colSpan={5} className="py-12 text-center text-slate-500">Loading Applications...</td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-slate-500">No applications found.</td></tr>
              ) : (
                paginated.map(app => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {app.photoUrl ? (
                          <img src={app.photoUrl} alt="Photo" className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                            {app.fullName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-white mb-0.5">{app.fullName}</div>
                          <div className="text-[10px] text-slate-500">{app.applicationNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 max-w-[200px]">
                      <div className="font-medium text-slate-300 truncate">{app.job.title}</div>
                      <div className="text-[10px] text-slate-500 uppercase">{app.job.department}</div>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400">
                      <div className="font-bold text-slate-300">{app.experienceYears}</div>
                      <div>{app.preferredLocation || "-"}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => viewDetails(app)} className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(app.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
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

      {/* Viewer Modal - Super Detailed View */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 bg-slate-800 hover:bg-red-500 hover:text-white text-slate-400 rounded-full transition-colors z-10">
              <XCircle className="w-6 h-6" />
            </button>
            
            <div className="p-8">
              
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8 border-b border-slate-800 pb-8">
                {selectedApp.photoUrl ? (
                  <img src={selectedApp.photoUrl} alt="Candidate" className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-800 shadow-xl" />
                ) : (
                  <div className="w-24 h-24 bg-slate-800 rounded-2xl flex items-center justify-center text-4xl font-black text-slate-500 shadow-xl">
                    {selectedApp.fullName.charAt(0)}
                  </div>
                )}
                
                <div className="flex-1">
                  <h2 className="text-3xl font-black text-white flex items-center gap-3">
                    {selectedApp.fullName}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusColor(selectedApp.status)}`}>
                      {selectedApp.status}
                    </span>
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">Applied for: <strong className="text-white">{selectedApp.job.title}</strong></p>
                  <p className="text-xs text-slate-500 mt-1">Application No: {selectedApp.applicationNo} | Applied: {new Date(selectedApp.appliedAt).toLocaleDateString()}</p>
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    {selectedApp.resumeUrl && (
                      <a href={selectedApp.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors">
                        <Download className="w-4 h-4" /> Download Resume
                      </a>
                    )}
                    <a href={`mailto:${selectedApp.email}`} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors">
                      <Mail className="w-4 h-4" /> Email Candidate
                    </a>
                  </div>
                </div>
              </div>

              {/* Detailed Grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                
                {/* Contact & Personal */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-500"/> Contact Info</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Phone</div>
                      <div className="text-slate-200">{selectedApp.phone} {selectedApp.hasWhatsapp && <span className="text-emerald-500 text-[10px] font-bold ml-1">(WhatsApp)</span>}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Email</div>
                      <div className="text-slate-200">{selectedApp.email}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Location</div>
                      <div className="text-slate-200">{selectedApp.address}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Gender / DOB</div>
                      <div className="text-slate-200">{selectedApp.gender} | {selectedApp.dob ? new Date(selectedApp.dob).toLocaleDateString() : 'N/A'}</div>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-blue-500"/> Education</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Highest Qualification</div>
                      <div className="text-slate-200 font-bold">{selectedApp.qualification || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Specialization</div>
                      <div className="text-slate-200">{selectedApp.specialization || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">University / Board</div>
                      <div className="text-slate-200">{selectedApp.university || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Passing Year</div>
                      <div className="text-slate-200">{selectedApp.passingYear || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                {/* Professional */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Briefcase className="w-4 h-4 text-purple-500"/> Experience</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Total Experience</div>
                      <div className="text-emerald-400 font-bold">{selectedApp.experienceYears}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Current Company</div>
                      <div className="text-slate-200">{selectedApp.currentCompany || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Current CTC</div>
                      <div className="text-slate-200">{selectedApp.currentCtc || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Expected Salary</div>
                      <div className="text-slate-200">{selectedApp.expectedSalary || 'N/A'}</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Skills & Logistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Key Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {parseSkills(selectedApp.keySkills).length > 0 ? parseSkills(selectedApp.keySkills).map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-700">
                        {skill}
                      </span>
                    )) : <span className="text-slate-500 text-sm">No specific skills selected.</span>}
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Logistics & Availability</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Notice Period</div>
                      <div className="text-white font-bold">{selectedApp.noticePeriod || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Pref. Location</div>
                      <div className="text-slate-200">{selectedApp.preferredLocation || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Has 2-Wheeler</div>
                      <div className={selectedApp.hasVehicle ? "text-emerald-400" : "text-slate-400"}>{selectedApp.hasVehicle ? 'Yes' : 'No'}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase">Field Comfort</div>
                      <div className={selectedApp.fieldComfortable ? "text-emerald-400" : "text-slate-400"}>{selectedApp.fieldComfortable ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedApp.whyJoin && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-8">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><FileText className="w-4 h-4 text-blue-500"/> Why Bhardwaj Finance?</h3>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{selectedApp.whyJoin}</p>
                </div>
              )}

              {/* Status Update Bar */}
              <div className="pt-6 border-t border-slate-800">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Update Pipeline Status</h3>
                <div className="flex flex-wrap gap-2">
                  {['NEW', 'REVIEWING', 'SHORTLISTED', 'HIRED', 'REJECTED'].map(status => (
                    <button 
                      key={status}
                      onClick={() => handleUpdateStatus(selectedApp.id, status)}
                      disabled={updatingStatus || selectedApp.status === status}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        selectedApp.status === status 
                          ? getStatusColor(status) 
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
