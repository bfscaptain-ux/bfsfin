"use client";

import { useState } from "react";
import { 
  Send, CheckCircle2, AlertCircle, Loader2, ChevronRight, ChevronLeft, UploadCloud, FileText, Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function JobApplicationForm({ jobId, jobTitle }: { jobId: string, jobTitle: string }) {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    hasWhatsapp: false,
    address: "",
    gender: "",
    dob: "",
    
    preferredLocation: "",
    jobType: "",
    noticePeriod: "",
    
    qualification: "",
    specialization: "",
    passingYear: "",
    university: "",
    
    experienceYears: "",
    currentCompany: "",
    currentCtc: "",
    expectedSalary: "",
    
    keySkills: [] as string[],
    
    hasVehicle: false,
    whyJoin: "",
    fieldComfortable: false,
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const availableSkills = [
    "Financial Knowledge / Accounting (Tally, Excel)",
    "Sales & Customer Relationship",
    "Loan Processing / Credit Verification",
    "Communication Skills (Hindi, English)",
    "Field Operations / Recovery"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => {
      const skills = prev.keySkills.includes(skill)
        ? prev.keySkills.filter(s => s !== skill)
        : [...prev.keySkills, skill];
      return { ...prev, keySkills: skills };
    });
  };

  const nextStep = () => {
    // Basic Validation per step before proceeding
    setError(null);
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.gender || !formData.dob) {
        setError("Please fill all mandatory fields in Step 1."); return;
      }
    }
    if (step === 2) {
      if (!formData.preferredLocation || !formData.jobType || !formData.noticePeriod) {
        setError("Please fill all mandatory fields in Step 2."); return;
      }
    }
    if (step === 3) {
      if (!formData.qualification || !formData.specialization || !formData.passingYear || !formData.university) {
        setError("Please fill all mandatory fields in Step 3."); return;
      }
    }
    if (step === 4) {
      if (!formData.experienceYears) {
        setError("Please select your total work experience."); return;
      }
    }
    if (step === 5) {
      if (!resumeFile) {
        setError("Please upload your Resume (PDF or DOC)."); return;
      }
    }

    setStep(s => Math.min(s + 1, totalSteps));
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("jobId", jobId);
      
      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "keySkills") {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value.toString());
        }
      });

      // Append files
      if (resumeFile) data.append("resumeFile", resumeFile);
      if (photoFile) data.append("photoFile", photoFile);

      const res = await fetch("/api/job-applications", {
        method: "POST",
        body: data // Don't set Content-Type header when using FormData
      });

      const responseData = await res.json();
      
      if (responseData.success) {
        setSuccess(responseData.application.applicationNo);
      } else {
        setError(responseData.error || "Failed to submit application");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-8 md:p-12 rounded-3xl text-center space-y-6 shadow-xl"
      >
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-black text-emerald-900 dark:text-emerald-400 tracking-tight">Application Submitted!</h3>
        <p className="text-emerald-700 dark:text-emerald-300 max-w-md mx-auto text-lg">
          Thank you for applying for the <strong>{jobTitle}</strong> position at Bhardwaj Finance. Our HR team will review your profile shortly.
        </p>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl inline-block mt-4 border border-emerald-100 dark:border-emerald-800 shadow-sm">
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Your Unique Application ID</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-widest">{success}</p>
        </div>
        <p className="text-sm text-emerald-600 dark:text-emerald-500 mt-4 font-medium">Please save this ID for future reference and communications.</p>
      </motion.div>
    );
  }

  const renderStepIndicators = () => {
    return (
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full -z-10"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full -z-10 transition-all duration-500"
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
        
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i} 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-500 ${
              step >= i + 1 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                : "bg-slate-200 dark:bg-slate-800 text-slate-500"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Apply for this role</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Complete all {totalSteps} steps to submit your application.</p>
      </div>

      {renderStepIndicators()}

      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3 text-red-700 dark:text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            
            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">1. Basic / Personal Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name *</label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="First Name Last Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="you@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="10-digit number" />
                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                      <input type="checkbox" name="hasWhatsapp" checked={formData.hasWhatsapp} onChange={handleInputChange} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-100 border-slate-300" />
                      <span className="text-xs text-slate-500 font-medium">This number is available on WhatsApp</span>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Date of Birth *</label>
                    <input required type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Current Address / Location *</label>
                    <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="City, State, Pincode" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Gender *</label>
                    <select required name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none">
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Job Selection */}
            {step === 2 && (
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">2. Job Selection & Availability</h4>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Applying For</label>
                  <input type="text" disabled value={jobTitle} className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed font-bold" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Preferred Work Location *</label>
                    <input required type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Agra, Mathura, Firozabad, etc." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Job Type *</label>
                    <select required name="jobType" value={formData.jobType} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none">
                      <option value="" disabled>Select Job Type</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Notice Period / Joining Time *</label>
                  <select required name="noticePeriod" value={formData.noticePeriod} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none">
                    <option value="" disabled>How soon can you join?</option>
                    <option value="Immediate">Immediate</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="More than 30 Days">More than 30 Days</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 3: Education */}
            {step === 3 && (
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">3. Educational & Qualification Details</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Highest Qualification *</label>
                    <select required name="qualification" value={formData.qualification} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none">
                      <option value="" disabled>Select Qualification</option>
                      <option value="10th Pass">10th Pass</option>
                      <option value="12th Pass">12th Pass</option>
                      <option value="Graduate (B.Com/BCA/BA/BSc)">Graduate (B.Com/BCA/BA/BSc, etc.)</option>
                      <option value="Post Graduate (MBA/M.Com)">Post Graduate (MBA/M.Com, etc.)</option>
                      <option value="Professional (CA/CS/CMA)">Professional (CA/CS/CMA)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Specialization / Major *</label>
                    <input required type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. Commerce, Finance, Arts" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Passing Year *</label>
                    <input required type="text" name="passingYear" value={formData.passingYear} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="YYYY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">University / Board Name *</label>
                    <input required type="text" name="university" value={formData.university} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. Agra University, UP Board" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Experience */}
            {step === 4 && (
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">4. Work Experience & Skills</h4>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Total Work Experience *</label>
                  <select required name="experienceYears" value={formData.experienceYears} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none">
                    <option value="" disabled>Select experience...</option>
                    <option value="Fresher (0 years)">Fresher (0 years)</option>
                    <option value="0-1 Year">0-1 Year</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>

                {formData.experienceYears !== "Fresher (0 years)" && formData.experienceYears !== "" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Current / Previous Company Name</label>
                      <input type="text" name="currentCompany" value={formData.currentCompany} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Company Name" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Current CTC / Last Salary</label>
                        <input type="text" name="currentCtc" value={formData.currentCtc} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. 25,000/month or 3 LPA" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Expected Salary</label>
                        <input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. 30,000/month" />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-3 pt-4">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Key Skills (Select all that apply)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availableSkills.map(skill => (
                      <label key={skill} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${formData.keySkills.includes(skill) ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}>
                        <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-slate-300" checked={formData.keySkills.includes(skill)} onChange={() => toggleSkill(skill)} />
                        <span className="text-sm font-medium">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Documents */}
            {step === 5 && (
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">5. Document Uploads & Verifications</h4>
                
                <div className="space-y-6">
                  {/* Resume Upload */}
                  <div className="bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:bg-slate-100 transition-colors relative">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${resumeFile ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                        {resumeFile ? <FileText className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
                      </div>
                      <p className="font-bold text-slate-700 dark:text-slate-300">
                        {resumeFile ? resumeFile.name : "Upload Resume / CV *"}
                      </p>
                      <p className="text-xs text-slate-500">PDF or DOC format. Max 5MB.</p>
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:bg-slate-100 transition-colors relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${photoFile ? 'bg-emerald-100 text-emerald-600' : 'bg-purple-100 text-purple-600'}`}>
                        {photoFile ? <CheckCircle2 className="w-6 h-6" /> : <ImageIcon className="w-6 h-6" />}
                      </div>
                      <p className="font-bold text-slate-700 dark:text-slate-300">
                        {photoFile ? photoFile.name : "Upload Passport Size Photo (Optional)"}
                      </p>
                      <p className="text-xs text-slate-500">JPG or PNG format. Clear face required.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="hasVehicle" checked={formData.hasVehicle} onChange={handleInputChange} className="mt-1 w-5 h-5 rounded text-blue-600 focus:ring-blue-500 bg-white border-slate-300" />
                      <div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 block">Do you have a 2-Wheeler and Driving License?</span>
                        <span className="text-xs text-slate-500">Important for sales and field verification roles.</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Declaration */}
            {step === 6 && (
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">6. Additional Questions & Declaration</h4>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Why do you want to join Bhardwaj Finance?</label>
                    <textarea name="whyJoin" value={formData.whyJoin} onChange={handleInputChange} rows={3} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none" placeholder="Short answer..."></textarea>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="fieldComfortable" checked={formData.fieldComfortable} onChange={handleInputChange} className="mt-1 w-5 h-5 rounded text-blue-600 focus:ring-blue-500 bg-white border-slate-300" />
                      <div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 block">Are you comfortable with field work and sales targets?</span>
                        <span className="text-xs text-slate-500">Applicable mainly for Sales and Recovery roles.</span>
                      </div>
                    </label>
                  </div>

                  <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl mt-8">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input required type="checkbox" className="mt-1 w-5 h-5 rounded text-blue-600 focus:ring-blue-500 bg-white border-slate-300" />
                      <div>
                        <span className="text-sm font-bold text-blue-900 dark:text-blue-400 block">Declaration *</span>
                        <span className="text-xs text-blue-700 dark:text-blue-300">I hereby declare that all information provided above is true to the best of my knowledge. I understand that false information may lead to rejection of my application.</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
          {step > 1 ? (
            <button 
              type="button" 
              onClick={prevStep}
              className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : <div></div>}

          {step < totalSteps ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="px-8 py-3 rounded-xl font-bold text-white bg-slate-900 hover:bg-blue-600 transition-colors shadow-lg flex items-center gap-2"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              type="submit" 
              disabled={loading}
              className="px-10 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-black rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
              ) : (
                <>Submit Application <Send className="w-5 h-5" /></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
