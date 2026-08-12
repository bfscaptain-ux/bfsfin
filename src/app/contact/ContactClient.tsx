"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import SharedContactForm from "@/components/SharedContactForm";
import { 
  MapPin, 
  Mail, 
  Clock, 
  Building,
  PhoneCall,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function ContactClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-emerald-500/30">
      <Header />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-10 lg:pt-12 lg:pb-16 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 z-0 bg-white dark:bg-slate-950 overflow-hidden">
          <motion.div 
            animate={{ 
              x: [0, 100, -50, 0], 
              y: [0, -80, 60, 0],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" 
          />
          <motion.div 
            animate={{ 
              x: [0, -120, 80, 0], 
              y: [0, 100, -80, 0],
              scale: [1, 1.1, 0.8, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" 
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-0 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6"
          >
            <MessageSquare className="w-4 h-4" /> 24/7 Support Helpdesk
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-6"
          >
            Let's build your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400">dream home together.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-10 max-w-2xl mx-auto"
          >
            Reach out to India's top loan consultants. Whether you need a fresh home loan, balance transfer, or project funding, we are here to guide you.
          </motion.p>
        </div>
      </section>

      {/* 2. MAIN CONTENT (CONTACT INFO & FORM) */}
      <section className="py-20 relative z-20 -mt-10 lg:-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Contact Cards */}
            <div className="xl:col-span-5 space-y-6">
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="group bg-white dark:bg-slate-900 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300">
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Headquarters</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">
                  Sanjay Place Commercial Hub,<br />
                  Agra, Uttar Pradesh - 282002<br />
                  India
                </p>
                <Link href="/contact/locations" className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-sm font-bold hover:gap-2.5 transition-all">
                  View all 7+ office locations <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-1">Direct Sales</h3>
                  <a href="tel:+919999999999" className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    +91 999 999 9999
                  </a>
                </motion.div>

                <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:shadow-amber-500/5 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300">
                  <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-1">Email Us</h3>
                  <a href="mailto:info@bhardwajfinance.com" className="text-slate-500 dark:text-slate-400 text-sm hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    info@bhardwajfinance.com
                  </a>
                </motion.div>
              </div>

              <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-md flex items-center gap-5 group">
                <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform duration-300">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-white mb-1">Working Hours</h3>
                  <p className="text-slate-300 text-sm font-light leading-relaxed">Mon - Sat: 10:00 AM - 6:00 PM<br/><span className="text-emerald-400 font-medium">Sunday: Closed</span></p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Detailed Contact Form */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="xl:col-span-7 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-[2.5rem] transform rotate-1 blur-xl" />
              <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <Building className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Request a Callback</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Our loan experts will contact you within 24 hours.</p>
                  </div>
                </div>

                <SharedContactForm variant="default" />
                
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
