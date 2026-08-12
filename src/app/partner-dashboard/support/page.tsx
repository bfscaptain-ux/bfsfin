'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LifeBuoy, MessageSquare, PhoneCall, Mail, ChevronDown, CheckCircle2, Video, Calendar } from 'lucide-react';

const faqs = [
  { id: 1, q: 'How long does loan approval take?', a: 'Typically, a home loan takes 5-7 working days for sanction after all documents are submitted.' },
  { id: 2, q: 'When do I get my referral commission?', a: 'Commissions are credited to your registered bank account on the 10th of every month for all loans disbursed in the previous month.' },
  { id: 3, q: 'Can I change my registered bank account?', a: 'Yes, you can update your bank details from the Settings page. It requires OTP verification.' },
];

export default function SupportPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [ticketSent, setTicketSent] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => setTicketSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center">
          <LifeBuoy className="w-8 h-8 text-blue-500 mr-3" />
          Help & Support
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Get assistance, view FAQs, or contact your Relationship Manager.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact RM */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Your Relationship Manager</h2>
          
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-blue-500/50 p-1 mr-4">
              <img src="https://i.pravatar.cc/150?img=11" alt="RM" className="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Rahul Verma</h3>
              <p className="text-sm font-bold text-blue-400">Senior RM, Delhi NCR</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <a href="tel:+919876543210" className="flex items-center p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-colors group/link">
              <div className="bg-blue-500/10 p-2 rounded-lg mr-4 group-hover/link:bg-blue-500/20">
                <PhoneCall className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase">Call Directly</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">+91 98765 43210</p>
              </div>
            </a>
            
            <a href="mailto:rahul.v@bfsfin.com" className="flex items-center p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-colors group/link">
              <div className="bg-blue-500/10 p-2 rounded-lg mr-4 group-hover/link:bg-blue-500/20">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase">Email Support</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">rahul.v@bfsfin.com</p>
              </div>
            </a>
            <button onClick={() => alert('Opening Video Call Scheduler...')} className="w-full flex items-center p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors group/link text-left">
              <div className="bg-emerald-500 p-2 rounded-lg mr-4 shadow-lg shadow-emerald-500/30">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase">Live RM Connect</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Book Video Consultation</p>
              </div>
              <Calendar className="w-5 h-5 text-emerald-500" />
            </button>
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 relative">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Raise a Support Ticket</h2>
          
          {ticketSent ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-64 text-center"
            >
              <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Ticket Submitted Successfully!</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm">Your RM has been notified and will get back to you within 24 hours. Ticket ID: #TKT-8901</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Issue Type</label>
                  <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                    <option>Commission / Payout Issue</option>
                    <option>Lead Status Update</option>
                    <option>Account Settings</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Related Lead ID (Optional)</label>
                  <input type="text" placeholder="e.g. LD-1001" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder-slate-600" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Description</label>
                <textarea rows={4} placeholder="Please describe your issue in detail..." className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder-slate-600 resize-none"></textarea>
              </div>
              
              <div className="flex justify-end pt-2">
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-slate-900 dark:text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Submit Ticket
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 mt-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(faq => (
            <div key={faq.id} className="border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/50 overflow-hidden transition-all">
              <button 
                onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
              >
                <span className="font-bold text-slate-700 dark:text-slate-300">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 dark:text-slate-500 transition-transform ${activeFaq === faq.id ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeFaq === faq.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-800/50 pt-4"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
