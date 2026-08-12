'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle2, FileText, IndianRupee } from 'lucide-react';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddLeadModal({ isOpen, onClose }: AddLeadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-50 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative"
            >
              {/* Decorative Glow */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 relative z-10">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center">
                  <span className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl mr-3 border border-emerald-500/30">
                    <FileText className="w-5 h-5" />
                  </span>
                  Submit New Lead
                </h2>
                <button 
                  onClick={onClose}
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 relative z-10">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Lead Submitted!</h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                      We have successfully received the lead details. Our team will contact them shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Client Name <span className="text-rose-500">*</span></label>
                        <input required type="text" placeholder="e.g. Rahul Verma" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-slate-600 shadow-inner" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Phone Number <span className="text-rose-500">*</span></label>
                        <input required type="tel" placeholder="+91 90000 00000" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-slate-600 shadow-inner" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Loan Type <span className="text-rose-500">*</span></label>
                        <select required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner appearance-none">
                          <option value="">Select Loan Type</option>
                          <option value="home">Home Loan</option>
                          <option value="lap">Loan Against Property (LAP)</option>
                          <option value="business">Business Loan</option>
                          <option value="personal">Personal Loan</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Required Loan Amount <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-500 w-5 h-5" />
                          <input required type="number" placeholder="5000000" className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-slate-600 shadow-inner" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Upload Documents (Optional but recommended)</label>
                      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center bg-slate-50 dark:bg-slate-950/50 hover:bg-slate-100 dark:bg-slate-800/50 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                          <Upload className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-emerald-400" />
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 font-bold mb-1">Click to upload or drag & drop</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">PAN Card, Aadhar Card, or Salary Slips (PDF, JPG up to 10MB)</p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
                      <button 
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white mr-4 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : 'Submit Lead'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
