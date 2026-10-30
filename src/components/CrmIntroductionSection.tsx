"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  MessageSquare,
  Building2,
  UserCheck,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Clock,
  Cpu,
  FileCheck2,
  Share2,
  Smartphone
} from "lucide-react";

export default function CrmIntroductionSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/80 dark:from-emerald-950 dark:via-slate-950 dark:to-emerald-950 text-slate-900 dark:text-white relative overflow-hidden border-t border-slate-200/80 dark:border-emerald-800/80 transition-colors duration-300">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute -bottom-10 right-0 w-80 h-80 bg-teal-500/10 dark:bg-teal-500/15 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700/60 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span>Institutional FinTech Infrastructure</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Powered by <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">BFS Circle™</span> Enterprise Engine
          </h2>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Hum koi aam loan broker nahi hain. BFS par aapki file <strong className="text-slate-900 dark:text-white font-semibold">100% Digital CRM &amp; Client Tracking Engine</strong> ke zariye manage hoti hai — Bank-grade document vault, real-time WhatsApp updates aur zero manual delays ke sath.
          </p>
        </motion.div>

        {/* 2-Column Grid: Left Features, Right Interactive CRM Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: 4 Pillars of BFS CRM */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            {[
              {
                icon: <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
                title: "Bank-Grade Document Vault",
                hindiSubtitle: "256-Bit Encrypted Document Locker",
                desc: "Aapke Aadhaar, PAN, ITR, 6-month bank statements aur registry papers secure ISO-standard cloud vault me store hote hain. Zero document loss, total confidentiality."
              },
              {
                icon: <Smartphone className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
                title: "Real-Time WhatsApp Milestone Alerts",
                hindiSubtitle: "Har Step Ka Instant Update Mobile Par",
                desc: "File login, legal vetting, bank valuation, aur sanction letter approval — client ko baar baar call karne ki zaroorat nahi. Har milestone par direct WhatsApp alert."
              },
              {
                icon: <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
                title: "Dedicated Relationship Manager (RM)",
                hindiSubtitle: "Single Point Verified Officer",
                desc: "Har case ke liye ek certified BFS Relationship Manager mapped hota hai. Doorstep document pickup se lekar bank disbursal tak ek hi dedicated person responsible."
              },
              {
                icon: <Building2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
                title: "Multi-Bank Centralized Sync",
                hindiSubtitle: "15+ Leading Banks & HFCs Real-Time Comparison",
                desc: "SBI, PNB, BOB, Canara, HDFC, Axis aur leading NBFCs ke sath live API sync, taaki aapko hamesha lowest ROI (from 7.15%*) aur highest loan amount mile."
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "80px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-emerald-800/70 shadow-sm hover:shadow-md hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    {pillar.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {pillar.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
                        {pillar.hindiSubtitle}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Live CRM Engine Visual Card Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white shadow-2xl border border-slate-700/80 dark:border-emerald-700/60 overflow-hidden">
              {/* Card Ambient Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

              {/* Mockup Top Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center font-black text-emerald-300 text-lg">
                    B
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                      BFS Circle™ Live Engine
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        Active
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">crm.bfsfin.cloud · Secure Client Node</div>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Security Protocol</div>
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL
                  </div>
                </div>
              </div>

              {/* Live File Pipeline Simulation */}
              <div className="mt-5 space-y-4 relative z-10">
                {/* Active Case Tracker Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-mono text-emerald-400 font-bold">CASE ID: #BFS-8842-HL</span>
                    <span className="text-slate-300 font-semibold">Priority: Fast Track (5 Days)</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-base sm:text-lg font-black text-white">Rohit Verma</div>
                      <div className="text-xs text-slate-300">Home Loan Application · Agra, UP</div>
                    </div>
                    <div className="text-right">
                      <div className="text-base sm:text-lg font-black text-emerald-400">₹45,00,000</div>
                      <div className="text-[11px] text-slate-400">Sanctioned @ 7.15%* ROI</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-slate-300 font-medium">
                      <span>File Progress</span>
                      <span className="text-emerald-400 font-bold">90% Complete (Disbursal Ready)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div className="w-[90%] h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"></div>
                    </div>
                  </div>

                  {/* Step Chips */}
                  <div className="mt-3.5 grid grid-cols-3 gap-2 text-center text-[10px] sm:text-xs">
                    <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 font-semibold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" /> Legal Vetted
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 font-semibold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" /> Valuation OK
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 font-semibold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" /> Sanction Issued
                    </div>
                  </div>
                </div>

                {/* WhatsApp Notification Bubble */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/70 border border-emerald-600/40 relative overflow-hidden">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                      <MessageSquare className="w-4 h-4 fill-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-emerald-300">BFS Circle WhatsApp Alert</span>
                        <span className="text-slate-400 text-[10px]">Just now</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        &quot;Badhai ho! Aapka Home Loan ₹45 Lakh State Bank of India se Sanction ho chuka hai. RM Praveen ji disbursal schedule share kar rahe hain.&quot;
                      </p>
                    </div>
                  </div>
                </div>

                {/* RM Info Card */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      PB
                    </div>
                    <div>
                      <div className="font-bold text-white">Praveen Bhardwaj</div>
                      <div className="text-[10px] text-slate-400">Assigned Senior Loan Officer</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Direct Contact Mapped
                  </span>
                </div>
              </div>

              {/* Portal Access Actions */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row gap-3 relative z-10">
                <Link
                  href="/apply"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3 rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                >
                  <span>Apply with Live Tracking</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://crm.bfsfin.cloud/login.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold px-4 py-3 rounded-xl text-xs sm:text-sm border border-slate-700 transition-all duration-200"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Partner &amp; Staff Login</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-12 sm:mt-16 p-4 sm:p-6 rounded-2xl bg-white dark:bg-emerald-950/60 border border-slate-200/80 dark:border-emerald-800/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mx-auto md:mx-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Zero Upfront Brokerage &amp; 100% Policy Transparency
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                BFS kabhi bhi kisi customer se koi hidden ya advance charges nahi leta. All bank processing fees are paid directly to the lending institution.
              </div>
            </div>
          </div>

          <Link
            href="/appointment"
            className="shrink-0 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 underline decoration-2 underline-offset-4"
          >
            <span>Book In-Person Consultation (Sanjay Place, Agra)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
