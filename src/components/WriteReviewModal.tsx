"use client";

import { useState } from "react";
import { X, Star, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function WriteReviewModal({ isOpen, onClose, onSuccess }: WriteReviewModalProps) {
  const [step, setStep] = useState(1);
  const [appIdOrPhone, setAppIdOrPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [verifiedData, setVerifiedData] = useState<{name: string, phone: string, applicationId?: string} | null>(null);
  
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appIdOrPhone) return;
    
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reviews/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appIdOrPhone })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }
      
      setVerifiedData(data);
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !verifiedData) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: verifiedData.name,
          rating,
          title,
          content,
          applicationId: verifiedData.applicationId,
          phone: verifiedData.phone
        })
      });
      
      if (!res.ok) throw new Error("Failed to submit review");
      
      const data = await res.json();
      
      // Save ID to local storage so user can delete later
      const stored = JSON.parse(localStorage.getItem("my_reviews") || "[]");
      stored.push(data.id);
      localStorage.setItem("my_reviews", JSON.stringify(stored));
      
      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (step === 3) onSuccess();
    onClose();
    setTimeout(() => {
      setStep(1);
      setAppIdOrPhone("");
      setError("");
      setTitle("");
      setContent("");
      setRating(5);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleClose}></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden border border-slate-200 dark:border-slate-800"
      >
        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleVerify}>
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Verify Customer</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Only verified customers can leave a review. Please enter your Loan Application Number or Registered Phone Number.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Application No. or Phone</label>
                    <input 
                      type="text" 
                      value={appIdOrPhone}
                      onChange={(e) => setAppIdOrPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow text-slate-900 dark:text-white"
                      placeholder="e.g., HL-12345 or 9999999999"
                      required
                    />
                  </div>
                  
                  {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                  
                  <button 
                    disabled={isLoading}
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Identity"}
                  </button>
                </div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleSubmitReview}>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Write Review</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Verified as <strong className="text-slate-900 dark:text-white">{verifiedData?.name}</strong>
                </p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-1 transition-transform hover:scale-110 ${rating >= star ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}`}
                        >
                          <Star className={`w-8 h-8 ${rating >= star ? 'fill-amber-400' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Review Title</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow text-slate-900 dark:text-white"
                      placeholder="Summarize your experience"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Detailed Review</label>
                    <textarea 
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow text-slate-900 dark:text-white min-h-[120px] resize-none"
                      placeholder="Tell others about the process, interest rates, and staff behavior..."
                      required
                    />
                  </div>
                  
                  {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                  
                  <button 
                    disabled={isLoading}
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Post Review"}
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Review Published!</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Thank you for sharing your experience. Your feedback helps us serve you better.
                </p>
                <button 
                  onClick={handleClose}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3.5 rounded-xl transition-colors"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
