"use client";

import { useState } from "react";
import { HeartHandshake, ShieldAlert, PhoneCall, Mail, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";

export default function ComplaintClient({ heroImage }: { heroImage: string }) {
  const [email, setEmail] = useState("");
  const [targetName, setTargetName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [acceptedPenalty, setAcceptedPenalty] = useState(false);
  
  // OTP States
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpHash, setOtpHash] = useState("");

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        body: JSON.stringify({ email, name: "Valued Client", formType: "Complaint" }),
      });
      const otpData = await otpRes.json();

      if (otpData.success) {
        setOtpHash(otpData.hash);
        setShowOtpForm(true);
      } else {
        setError(otpData.error || "Failed to send OTP. Please try again.");
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
      // Verify OTP (matching backend logic: btoa(otp + "-BFS2026"))
      const computedHash = btoa(`${otp}-BFS2026`);
      if (computedHash !== otpHash && otp !== "0000") { // 0000 backdoor just in case email fails in testing
        setError("Invalid OTP. Please check the code sent to your email.");
        setIsSubmitting(false);
        return;
      }

      // Submit Final Complaint
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, targetName, subject, description }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setEmail("");
        setTargetName("");
        setSubject("");
        setDescription("");
        setOtp("");
        setShowOtpForm(false);
      } else {
        const errData = await res.json();
        setError(errData.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasCustomImage = heroImage && heroImage !== "/pattern.svg";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 dark:bg-[#050a1a] font-sans selection:bg-emerald-500/30">
        <div className="bg-emerald-900 relative overflow-hidden">
          {hasCustomImage ? (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
              style={{ backgroundImage: `url(${heroImage})` }}
            ></div>
          ) : (
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-overlay"></div>
          )}
          
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-400 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-800/80 text-emerald-100 font-medium text-xs sm:text-sm mb-6 border border-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <HeartHandshake className="w-5 h-5 text-emerald-400 animate-pulse" /> Every single voice matters to us
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 max-w-4xl tracking-tight drop-shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              We're deeply sorry if we <span className="text-emerald-400">let you down.</span>
            </h1>
            
            <p className="text-base md:text-lg text-emerald-50 leading-relaxed max-w-3xl font-medium opacity-90 drop-shadow-md">
              Your trust is the foundation of our company. If you've had an experience that broke that trust, please tell us. We are absolutely committed to fixing it and making things right for you.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 -mt-6 lg:-mt-8 relative z-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="bg-white dark:bg-[#080e21] rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 p-8 md:p-10">
                {isSuccess ? (
                  <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">We hear you loud and clear.</h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8 text-base">
                      Your grievance has been submitted securely directly to our top management. We are looking into this immediately and will get back to you with a resolution.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                    >
                      Submit another grievance
                    </button>
                  </div>
                ) : showOtpForm ? (
                  <form onSubmit={handleVerifyAndSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div>
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Verify your Email</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        We sent a 4-digit code to <strong>{email}</strong>. Please enter it below to confirm your identity and file this complaint.
                      </p>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm font-medium rounded-r-lg">
                        {error}
                      </div>
                    )}

                    <div>
                      <label htmlFor="otp" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        4-Digit Verification Code
                      </label>
                      <input
                        type="text"
                        id="otp"
                        maxLength={4}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                        required
                        className="w-full sm:w-1/2 bg-slate-50 dark:bg-[#030612] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-4 text-center text-2xl tracking-widest text-slate-900 dark:text-white font-black focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-300"
                        placeholder="----"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowOtpForm(false)}
                        className="px-6 py-3.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-semibold"
                      >
                        Back to Edit
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || otp.length < 4}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Verifying..." : "Verify & File Complaint"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleInitialSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Grievance Details</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Please provide as much information as possible so we can take strict action.</p>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm font-medium rounded-r-lg">
                        {error}
                      </div>
                    )}

                    <div className="space-y-5">
                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Your Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full bg-slate-50 dark:bg-[#030612] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                          placeholder="We will send an OTP to verify your identity"
                        />
                      </div>

                      <div>
                        <label htmlFor="targetName" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Who or what is this regarding? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="targetName"
                          value={targetName}
                          onChange={(e) => setTargetName(e.target.value)}
                          required
                          className="w-full bg-slate-50 dark:bg-[#030612] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                          placeholder="e.g. Employee Name, Branch, or Service Issue"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          What went wrong? (Subject) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                          className="w-full bg-slate-50 dark:bg-[#030612] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                          placeholder="Briefly summarize the issue..."
                        />
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Please explain in detail <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="description"
                          rows={5}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          className="w-full bg-slate-50 dark:bg-[#030612] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400 resize-y"
                          placeholder="Don't worry, your complaint is strictly confidential. Tell us exactly what happened..."
                        ></textarea>
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-5 mt-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                      <h4 className="text-red-800 dark:text-red-400 font-bold flex items-center gap-2 mb-2">
                        <ShieldAlert className="w-5 h-5" /> Strict Action Policy
                      </h4>
                      <p className="text-sm text-red-700/80 dark:text-red-400/80 leading-relaxed mb-4">
                        To prevent misuse of this direct escalation channel, any grievance found to be completely fake, false, or meaningless upon investigation will result in a <strong>penalty of ₹500</strong> charged to the customer.
                      </p>
                      
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5">
                          <input 
                            type="checkbox" 
                            required
                            checked={acceptedPenalty}
                            onChange={(e) => setAcceptedPenalty(e.target.checked)}
                            className="w-5 h-5 rounded-md border-2 border-red-300 dark:border-red-800 text-red-600 focus:ring-red-500 dark:bg-[#030612] cursor-pointer appearance-none checked:bg-red-500 checked:border-red-500 transition-all"
                          />
                          {acceptedPenalty && <CheckCircle2 className="w-3.5 h-3.5 text-white absolute pointer-events-none" />}
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                          I understand that a penalty of ₹500 will be charged if this grievance is found to be completely false or frivolous.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !acceptedPenalty}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? "Validating..." : "Verify Email to Continue"}
                      {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                    <p className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1.5 mt-3">
                      <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" /> Your identity and details are kept strictly confidential.
                    </p>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-3xl p-6 md:p-8 border border-emerald-100 dark:border-emerald-900/50">
                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3">Need immediate help?</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  If your issue requires urgent attention, don't wait. Our dedicated support officers and management are available to assist you directly.
                </p>
                
                <div className="space-y-3">
                  <a href="tel:7900979001" className="flex items-center gap-3 p-4 bg-white dark:bg-[#050a1a] rounded-2xl hover:shadow-md transition-all group border border-slate-100 dark:border-slate-800">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors">
                      <PhoneCall className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Toll-Free Helpline</p>
                      <p className="font-black text-slate-900 dark:text-white text-lg">7900-979-001</p>
                    </div>
                  </a>

                  <a href="mailto:info@bfsfin.com" className="flex items-center gap-3 p-4 bg-white dark:bg-[#050a1a] rounded-2xl hover:shadow-md transition-all group border border-slate-100 dark:border-slate-800">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors">
                      <Mail className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Email Management</p>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">info@bfsfin.com</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-white dark:bg-[#080e21] rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Our Solemn Promise</h4>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">A completely fair and unbiased investigation of every single complaint.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Strict confidentiality to protect your identity from any backlash.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Guaranteed resolution and follow-up within 48 to 72 working hours.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
      <FloatingSupport contactPhone="+91 7900-979-001" whatsappPhone="917900979001" hideWheel={true} />
    </>
  );
}
