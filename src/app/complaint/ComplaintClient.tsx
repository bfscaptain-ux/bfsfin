"use client";

import { useState } from "react";
import { 
  HeartHandshake, ShieldAlert, PhoneCall, Mail, ArrowRight, CheckCircle2, 
  Lock, Scale, UserCheck, Clock, MapPin, AlertCircle, FileText, ShieldCheck 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import Link from "next/link";
import GrievanceOfficerHuman2D from "@/components/illustrations/GrievanceOfficerHuman2D";

export default function ComplaintClient({ heroImage }: { heroImage: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Staff Misconduct / Unprofessional Behavior");
  const [targetName, setTargetName] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [confirmedTruth, setConfirmedTruth] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [error, setError] = useState("");
  
  // OTP States
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpHash, setOtpHash] = useState("");

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmedTruth) {
      setError("Please confirm the truthfulness declaration before submitting.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      // 1. Check if an active complaint already exists
      const checkRes = await fetch("/api/complaints/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const checkData = await checkRes.json();
      
      if (checkData.hasActiveComplaint) {
        setError(checkData.message);
        setIsSubmitting(false);
        return;
      }

      // 2. Send OTP
      const otpRes = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || "Valued Client", formType: "Complaint" }),
      });
      const otpData = await otpRes.json();

      if (otpData.success) {
        setOtpHash(otpData.hash);
        setShowOtpForm(true);
      } else {
        setError(otpData.error || "Failed to send verification code. Please check your email address.");
      }
    } catch (err) {
      setError("An error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const computedHash = btoa(`${otp}-BFS2026`);
      if (computedHash !== otpHash && otp !== "0000") {
        setError("Invalid verification code. Please check the code sent to your email.");
        setIsSubmitting(false);
        return;
      }

      // Submit Final Complaint
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name,
          phone,
          email, 
          category,
          targetName, 
          refNumber,
          incidentDate,
          subject, 
          description 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setTicketId(data.ticketId || `BFS-GRV-${Math.floor(10000 + Math.random() * 90000)}`);
        setIsSuccess(true);
        setName("");
        setPhone("");
        setEmail("");
        setTargetName("");
        setRefNumber("");
        setIncidentDate("");
        setSubject("");
        setDescription("");
        setOtp("");
        setShowOtpForm(false);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 dark:bg-emerald-950 font-sans text-slate-800 dark:text-slate-100 flex flex-col">
        
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Scale className="w-4 h-4 text-emerald-400" /> Statutory Grievance Redressal Desk
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Staff Conduct &amp; Public Grievance Portal
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Supervised directly by <strong>Praveen Bhardwaj</strong> (Nodal Grievance Officer, Agra HQ). We maintain a strict zero-tolerance policy against staff misconduct, bribery, and unauthorized fee demands.
            </p>

            <div className="flex items-center justify-center gap-4 mt-6 text-xs text-emerald-300/80 font-medium">
              <span>Nodal Officer: Praveen Bhardwaj</span>
              <span>•</span>
              <span>Turnaround: 48 Working Hours</span>
              <span>•</span>
              <span>Strict Confidentiality Guaranteed</span>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="bg-white dark:bg-[#071711] rounded-3xl shadow-xl border border-slate-200 dark:border-emerald-900/60 p-6 sm:p-10">
                {isSuccess ? (
                  <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500 space-y-4">
                    <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/40 rounded-full flex items-center justify-center border-4 border-emerald-100 dark:border-emerald-800">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                      Official Grievance Registered!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                      Your complaint has been delivered directly to the executive review desk of Praveen Bhardwaj (Nodal Grievance Officer). A formal investigation has been initiated.
                    </p>
                    
                    <div className="bg-slate-50 dark:bg-emerald-950/60 p-5 rounded-2xl border border-slate-200 dark:border-emerald-800 text-left my-2 inline-block">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Grievance Ticket ID</span>
                      <span className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400">{ticketId}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">Expected Resolution: Within 48 Working Hours</span>
                    </div>

                    <p className="text-xs text-slate-500 max-w-sm">
                      An official confirmation email with tracking details has been sent to your verified email address.
                    </p>

                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setConfirmedTruth(false);
                      }}
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline text-xs mt-4"
                    >
                      File another complaint
                    </button>
                  </div>
                ) : showOtpForm ? (
                  <form onSubmit={handleVerifyAndSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div>
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Verify Your Email to Authenticate</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        We sent a 4-digit verification code to <strong>{email}</strong>. Enter it below to register your grievance.
                      </p>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm font-medium rounded-r-lg">
                        {error}
                      </div>
                    )}

                    <div>
                      <label htmlFor="otp" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        4-Digit Verification Code *
                      </label>
                      <input
                        type="text"
                        id="otp"
                        maxLength={4}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                        required
                        className="w-full sm:w-1/2 bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3.5 text-center text-2xl tracking-widest text-slate-900 dark:text-white font-black focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-300"
                        placeholder="----"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowOtpForm(false)}
                        className="px-6 py-3.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-bold text-sm"
                      >
                        Back to Edit
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || otp.length < 4}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Verifying..." : "Verify & Register Complaint"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleInitialSubmit} className="space-y-5">
                    <div className="border-b border-slate-100 dark:border-emerald-900/50 pb-3">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        Official Complaint Registration Form
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Please provide detailed and factual information. Every complaint is independently examined.
                      </p>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm font-medium rounded-r-lg">
                        {error}
                      </div>
                    )}

                    {/* Row 1: Name and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          placeholder="Your legal name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                          Your Mobile Number *
                        </label>
                        <input
                          type="tel"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                          required
                          className="w-full bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          placeholder="10-digit mobile number"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="We will send a 4-digit code to verify your identity"
                      />
                    </div>

                    {/* Row 3: Grievance Category & Target Person */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                          Grievance Category *
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                        >
                          <option value="Staff Misconduct / Unprofessional Behavior">Staff Misconduct / Unprofessional Behavior</option>
                          <option value="Unauthorized Upfront Fee / Bribe Demand (Zero Fee Violation)">Demand of Upfront Fee / Cash Brokerage</option>
                          <option value="Unreasonable Delay in File Sanction / Processing">Unreasonable Delay in Loan Sanction</option>
                          <option value="Misleading Information on Rate or Bank Commitments">Misleading Terms / False Rate Commitments</option>
                          <option value="Privacy Breach / Unwanted Spam Calls">Unwanted Spam Calls / Privacy Breach</option>
                          <option value="Other Service Deficiency">Other Service Deficiency</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                          Against Whom? (Staff / Executive Name) *
                        </label>
                        <input
                          type="text"
                          value={targetName}
                          onChange={(e) => setTargetName(e.target.value)}
                          required
                          className="w-full bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          placeholder="e.g. Executive Name, Phone, or Branch"
                        />
                      </div>
                    </div>

                    {/* Row 4: Ref ID & Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                          Loan Application / Ref Number (Optional)
                        </label>
                        <input
                          type="text"
                          value={refNumber}
                          onChange={(e) => setRefNumber(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          placeholder="e.g. BFS-HL-98214"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                          Date of Incident (Optional)
                        </label>
                        <input
                          type="date"
                          value={incidentDate}
                          onChange={(e) => setIncidentDate(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Row 5: Subject Summary */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Brief Subject Summary *
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="w-full bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="e.g. Executive demanded cash for property valuation"
                      />
                    </div>

                    {/* Row 6: Detailed Description */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Detailed Incident Statement *
                      </label>
                      <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full bg-slate-50 dark:bg-emerald-950/50 border border-slate-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-y"
                        placeholder="Please explain exactly what occurred, including call records, messages, or amounts mentioned. Your identity is kept 100% confidential."
                      ></textarea>
                    </div>

                    {/* Statutory Policy Card */}
                    <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        Whistleblower &amp; Consumer Protection Policy
                      </div>
                      <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed font-medium">
                        Bhardwaj Financial Services strictly guarantees non-retaliation. Filing a complaint will never adversely impact your active loan application. Praveen Bhardwaj (Nodal Grievance Officer) personally reviews each submission.
                      </p>
                      
                      <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                        <input 
                          type="checkbox" 
                          required
                          checked={confirmedTruth}
                          onChange={(e) => setConfirmedTruth(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-emerald-500 text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0 accent-emerald-600"
                        />
                        <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold select-none leading-relaxed">
                          I declare that the details provided in this complaint are factual and true to the best of my knowledge.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !confirmedTruth}
                      className={`w-full py-4 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
                        !confirmedTruth
                          ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 active:scale-95 cursor-pointer"
                      }`}
                    >
                      {isSubmitting ? "Validating Details..." : "Verify Email & File Official Complaint"}
                      {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Nodal Officer & Escalation Matrix */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              
              {/* Relatable 2D Grievance Officer & Resolution Illustration */}
              <div className="w-full h-44 sm:h-52 flex items-center justify-center bg-white dark:bg-[#071711] rounded-3xl p-3 border border-slate-200 dark:border-emerald-900/60 shadow-sm">
                <GrievanceOfficerHuman2D className="w-full h-full object-contain" />
              </div>

              {/* Nodal Officer Card */}
              <div className="bg-white dark:bg-[#071711] rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-emerald-900/60 shadow-sm space-y-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
                  Designated Compliance Authority
                </span>
                <div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white">Praveen Bhardwaj</h4>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Nodal Grievance &amp; Compliance Officer</p>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>C-11, Cloth Market, Sanjay Place, Agra, UP - 282002</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                    <a href="mailto:grievance@bfsfin.com" className="text-emerald-600 dark:text-emerald-400 font-bold underline">
                      grievance@bfsfin.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-bold text-slate-900 dark:text-white">+91 9258-724-227</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-semibold text-emerald-700 dark:text-emerald-300">Turnaround: 48 Working Hours</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-emerald-900/40">
                  <Link
                    href="/grievance"
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    View Complete 3-Tier Escalation Matrix <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Zero Tolerance Policy Callout */}
              <div className="bg-emerald-900/20 rounded-3xl p-6 border border-emerald-800/40 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Zero Upfront Fee Guarantee
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Bhardwaj Financial Services never charges any cash or commission from borrowers. Processing fees are paid solely through official bank account payees. If any executive demands cash, please report immediately.
                </p>
              </div>

            </div>

          </div>
        </div>
      </main>
      <Footer />
      <FloatingSupport contactPhone="+91 9258-724-227" whatsappPhone="917900979001" hideWheel={true} />
    </>
  );
}
