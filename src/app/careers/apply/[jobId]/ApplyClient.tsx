"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Briefcase, Upload, CheckCircle2, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function ApplyClient({ job }: { job: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
    currentSalary: "",
    coverText: ""
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      let uploadedResumeUrl = "";

      // 1. Upload Resume if provided
      if (resumeFile) {
        const formData = new FormData();
        formData.append("file", resumeFile);
        formData.append("folder", "resumes");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        
        if (uploadData.success) {
          uploadedResumeUrl = uploadData.url;
        } else {
          throw new Error("Failed to upload resume. Please try again.");
        }
      }

      // 2. Submit Application
      const res = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          ...form,
          resumeUrl: uploadedResumeUrl
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/careers");
      }, 5000);

    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Application Received!</h2>
          <p className="text-slate-600 mb-6">Thank you for applying for the <strong>{job.title}</strong> position. Our HR team will review your profile and contact you soon.</p>
          <Link href="/careers" className="text-emerald-600 font-bold hover:underline">
            ← Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500/30">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/careers" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-semibold mb-6 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-emerald-900 p-8 text-white">
            <h1 className="text-3xl font-black mb-2">Apply for {job.title}</h1>
            <p className="text-emerald-100">{job.department} • {job.location}</p>
          </div>

          <div className="p-8">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 font-semibold text-sm">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                  <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-slate-900" placeholder="Rahul Sharma" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number *</label>
                  <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-slate-900" placeholder="9876543210" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-slate-900" placeholder="rahul@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Current City *</label>
                  <input required type="text" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-slate-900" placeholder="E.g. Agra, Delhi" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Total Experience *</label>
                  <select required value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-slate-900">
                    <option value="">Select Experience</option>
                    <option value="Fresher">Fresher (0 Years)</option>
                    <option value="1-3 Years">1 - 3 Years</option>
                    <option value="3-5 Years">3 - 5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Current CTC (Optional)</label>
                  <input type="text" value={form.currentSalary} onChange={e => setForm({...form, currentSalary: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-slate-900" placeholder="E.g. 3.5 LPA" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Upload Resume (PDF/DOC) *</label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-6 bg-emerald-50/50 flex flex-col items-center justify-center">
                  <input 
                    type="file" 
                    required 
                    accept=".pdf,.doc,.docx"
                    onChange={e => setResumeFile(e.target.files?.[0] || null)}
                    className="hidden" 
                    id="resume-upload" 
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-8 h-8 text-emerald-500 mb-2" />
                    <span className="text-emerald-700 font-bold hover:underline">Click to browse file</span>
                    <span className="text-xs text-slate-500 mt-1">{resumeFile ? resumeFile.name : "Max file size: 5MB"}</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Cover Letter / Why should we hire you? (Optional)</label>
                <textarea rows={4} value={form.coverText} onChange={e => setForm({...form, coverText: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-slate-900" placeholder="Briefly describe your skills and why you are a fit for this role..." />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-black text-lg rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Submitting Application..." : <>Submit Application <Send className="w-5 h-5" /></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
