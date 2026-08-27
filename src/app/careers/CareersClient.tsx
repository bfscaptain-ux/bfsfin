"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  MapPin, 
  Clock, 
  Banknote, 
  ChevronRight,
  Mail,
  Send
} from "lucide-react";
import Link from "next/link";

export default function CareersClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const jobs = [
    {
      id: 1,
      title: "Relationship Manager - Home Loans",
      department: "Sales & Marketing",
      location: "Pan India",
      type: "Full-Time",
      salary: "₹15,000 - ₹45,000 / month + Incentives",
      desc: "Drive home loan sales by building relationships with real estate developers and clients. Responsible for end-to-end file processing and loan disbursement.",
      reqs: ["Min. 1-2 years experience in Banking/DSA sales.", "Strong communication skills.", "Two-wheeler mandatory."]
    },
    {
      id: 2,
      title: "Telecalling Executive",
      department: "Customer Outreach",
      location: "Pan India",
      type: "Full-Time",
      salary: "₹10,000 - ₹25,000 / month + Incentives",
      desc: "Connect with prospective clients, explain our loan products (Home Loan, LAP), and generate high-quality leads for the sales team.",
      reqs: ["Freshers can apply.", "Fluent in Hindi and basic English.", "Good persuasion and listening skills."]
    },
    {
      id: 3,
      title: "Credit Analyst / File Processing Officer",
      department: "Operations",
      location: "Pan India",
      type: "Full-Time",
      salary: "Industry Standard",
      desc: "Analyze customer financial profiles, CIBIL reports, and KYC documents to ensure quick file login and sanctioning from partner banks.",
      reqs: ["Experience in login/processing in a Bank/NBFC.", "Knowledge of banking software and portals.", "High attention to detail."]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 font-sans selection:bg-emerald-500/30">
      <Header />
      
      {/* 1. HERO SECTION */}
      <section className="relative flex items-center justify-center overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32 border-b border-slate-200 dark:border-emerald-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-0 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 shadow-inner"
            >
              <Briefcase className="w-4 h-4" /> We are Hiring
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-6"
            >
              Build your career with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600 dark:from-emerald-400 dark:to-emerald-400">India's #1 Finance Firm.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-10 max-w-2xl mx-auto"
            >
              Join Bhardwaj Financial Services. Work directly with 50+ top banks, earn uncapped incentives, and grow your career in a high-energy environment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a href="#openings" className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2">
                View Open Positions <ChevronRight className="w-5 h-5" />
              </a>
              <a href="mailto:hr@bhardwajfinance.com" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                Email Resume <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CULTURE & PERKS */}
      <section className="py-20 bg-white dark:bg-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Why join BFS?</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">We don't just offer jobs, we build careers. Here is what you get when you become part of our family.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Banknote, title: "Uncapped Incentives", desc: "Your hard work translates directly into your bank account. High salary plus performance-based commissions." },
              { icon: GraduationCap, title: "Expert Training", desc: "Get mentored directly by industry veteran Mr. Praveen Bhardwaj and learn the secrets of banking sales." },
              { icon: TrendingUp, title: "Fast-Track Growth", desc: "Perform well and get promoted. We believe in promoting from within based entirely on merit." },
              { icon: Users, title: "Top Bank Exposure", desc: "Build relationships and network with officials from SBI, HDFC, ICICI, and 50+ other leading financial institutions." }
            ].map((perk, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp} transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 text-center hover:border-emerald-500 transition-colors"
              >
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <perk.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{perk.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CURRENT OPENINGS */}
      <section id="openings" className="py-20 bg-slate-50 dark:bg-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Current Openings</h2>
              <p className="text-slate-600 dark:text-slate-400">Find the perfect role that matches your skills.</p>
            </div>
            <div className="mt-4 md:mt-0 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm font-bold border border-emerald-200 dark:border-emerald-800/50">
              {jobs.length} Open Positions
            </div>
          </div>

          <div className="space-y-6">
            {jobs.map((job, idx) => (
              <motion.div 
                key={job.id}
                {...fadeInUp} transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-emerald-900 rounded-2xl border border-slate-200 dark:border-emerald-800 p-6 md:p-8 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm hover:shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">{job.department}</span>
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-full flex items-center gap-1"><MapPin className="w-3 h-3"/> {job.location}</span>
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-full flex items-center gap-1"><Clock className="w-3 h-3"/> {job.type}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{job.title}</h3>
                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm mb-4">{job.salary}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed max-w-3xl">{job.desc}</p>
                    
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {job.reqs.map((req, i) => (
                          <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                            <span className="text-emerald-500 mt-1">•</span> {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="shrink-0 pt-4 lg:pt-0">
                    <a href={`mailto:hr@bhardwajfinance.com?subject=Application for ${job.title}`} className="inline-flex items-center justify-center gap-2 w-full lg:w-auto px-6 py-3 bg-emerald-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white transition-colors">
                      Apply Now <Send className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CAN'T FIND ROLE CTA */}
      <section className="py-24 bg-emerald-600 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Don't see the right role?</h2>
        <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">We are always on the lookout for talented individuals. Send us your resume, and we'll reach out if a suitable position opens up.</p>
        <a href="mailto:hr@bhardwajfinance.com" className="inline-flex items-center gap-2 bg-white text-emerald-600 font-bold px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-transform">
          Drop your Resume <Mail className="w-5 h-5" />
        </a>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
