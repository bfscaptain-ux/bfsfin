"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Clock, 
  ShieldCheck, 
  FileWarning, 
  HeartHandshake, 
  TrendingDown, 
  ArrowRight,
  AlertOctagon,
  XCircle,
  ThumbsUp,
  Landmark,
  BadgePercent,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";

export default function WhyUsClient() {
  const problemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 }
    })
  };

  const solutionVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 font-sans selection:bg-emerald-500/30">
      <Header />
      
      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative flex items-center justify-center overflow-hidden pt-12 pb-24">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-slate-50 dark:bg-emerald-900 z-0">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-500/20 blur-[120px] rounded-full opacity-40 dark:opacity-60 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-emerald-600/20 blur-[100px] rounded-full opacity-30 dark:opacity-50 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-bold tracking-wide uppercase mb-6 shadow-inner"
          >
            <HeartHandshake className="w-3.5 h-3.5" /> Your Trust, Our Priority
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-6"
          >
            Stop fighting for a loan. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500">Start building your home.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-8 max-w-2xl mx-auto"
          >
            Getting a home loan in India shouldn't feel like a battle. We bypass the red tape, hidden fees, and bank rejections to get you approved in as little as 5 days.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/apply" className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105 flex items-center gap-2">
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom Simple Curve Divider */}
        <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[30px] md:h-[50px]" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wave-stroke-why" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {/* The fill to match the next section's background (emerald-50/50) */}
            <path d="M0,0 Q720,100 1440,0 L1440,100 L0,100 Z" className="fill-emerald-50/50"></path>
            {/* The elegant simple stroke line */}
            <path d="M0,0 Q720,100 1440,0" fill="none" stroke="url(#wave-stroke-why)" strokeWidth="2" className="opacity-60"></path>
          </svg>
        </div>
      </section>

      {/* 2. THE "BANK VS BFS" INTERACTIVE COMPARISON */}
      <section className="py-20 md:py-32 relative bg-emerald-50/50 border-b border-emerald-100">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
              Why Going Direct to a Bank is a <span className="text-rose-500">Mistake</span>
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              Don't fight the banking system alone. Here is the reality of trying to get a home loan directly versus having BFS fight for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Bank Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-rose-200 p-8 rounded-3xl relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -z-10" />
              <div className="flex items-center gap-4 mb-8 border-b border-rose-100 pb-6">
                <div className="w-14 h-14 bg-rose-50 text-rose-500 flex items-center justify-center rounded-2xl border border-rose-100">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Going Direct to Bank</h3>
                  <p className="text-rose-500 text-sm font-bold uppercase tracking-wider">The Old Way</p>
                </div>
              </div>
              <ul className="space-y-6">
                {[
                  "You visit the branch 10+ times.",
                  "You get exactly what they offer. No negotiation.",
                  "Hidden processing fees and login charges.",
                  "Minor CIBIL issues lead to flat rejections.",
                  "30-45 Days average processing time."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <XCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* The BFS Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-600 border border-emerald-500 p-8 rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(16,185,129,0.3)] transform md:-translate-y-4"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/50 rounded-bl-full -z-10" />
              <div className="flex items-center gap-4 mb-8 border-b border-emerald-500/50 pb-6">
                <div className="w-14 h-14 bg-white text-emerald-600 flex items-center justify-center rounded-2xl shadow-lg">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Using BFS (DSA)</h3>
                  <p className="text-emerald-100 text-sm font-bold uppercase tracking-wider">The Smart Way</p>
                </div>
              </div>
              <ul className="space-y-6">
                {[
                  "Zero branch visits. 100% Doorstep service.",
                  "We force 50+ banks to compete for your loan.",
                  "We negotiate 100% processing fee waivers.",
                  "We fix CIBIL issues before applying.",
                  "5-Day Guaranteed Approval."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-white shrink-0 mt-0.5" />
                    <span className="text-emerald-50 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE "TIME & MONEY SAVED" CALCULATOR */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-50/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-[0.2em] mb-6">
                <Clock className="w-4 h-4" /> Live Calculator
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Calculate Your <span className="text-emerald-600">Savings</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Every hour you spend waiting in a bank branch is time away from your business or family. Use our interactive calculator to see exactly what you save when you let our experts handle the bureaucracy.
              </p>
              
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)] relative overflow-hidden border border-emerald-100">
                {/* Decorative Elements */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60" />
                <div className="absolute right-4 top-4 opacity-5">
                  <Landmark className="w-48 h-48 text-emerald-900" />
                </div>
                
                <h3 className="text-2xl font-black mb-10 text-slate-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                  If you choose BFS today:
                </h3>
                
                <div className="space-y-8 relative z-10">
                  {/* Metric 1 */}
                  <div className="group">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Hours of Paperwork Saved</span>
                      <span className="text-emerald-600 font-black text-xl">48+ Hours</span>
                    </div>
                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }} whileInView={{ width: "85%" }} transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] relative"
                      >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="group">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Unnecessary Bank Visits</span>
                      <span className="text-emerald-600 font-black text-xl">Reduced to 0</span>
                    </div>
                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] relative"
                      >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="group">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Processing Fees Saved</span>
                      <span className="text-emerald-600 font-black text-xl">Upto ₹25,000</span>
                    </div>
                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }} whileInView={{ width: "95%" }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] relative"
                      >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute inset-0 bg-emerald-400/10 blur-3xl -z-10 rounded-full" />
              
              <div className="space-y-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-100 flex flex-col items-center justify-center text-center aspect-square">
                  <div className="text-4xl font-black text-emerald-600 mb-2">15+</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Years Experience</div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-emerald-600 p-6 rounded-3xl shadow-xl shadow-emerald-600/30 text-white flex flex-col items-center justify-center text-center aspect-square transform translate-x-4 border border-emerald-500">
                  <div className="text-4xl font-black mb-2">5-Day</div>
                  <div className="text-xs font-bold text-emerald-100 uppercase tracking-widest">Avg. Approval</div>
                </motion.div>
              </div>
              <div className="space-y-6 mt-12">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-100 flex flex-col items-center justify-center text-center aspect-square transform -translate-x-4">
                  <div className="text-4xl font-black text-emerald-600 mb-2">50+</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bank Partners</div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-emerald-50 p-6 rounded-3xl shadow-xl border border-emerald-100 flex flex-col items-center justify-center text-center aspect-square">
                  <div className="text-4xl font-black text-emerald-600 mb-2">₹0</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Hidden Fees</div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CORE BENEFITS GRID */}
      <section className="py-20 md:py-32 relative bg-slate-50 dark:bg-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              Our Commitments to You
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              When you choose BFS, you aren't just getting a loan agent; you're getting a dedicated financial partner for life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "5-Day Guaranteed Approval",
                desc: "We process applications in parallel directly with bank credit managers to slash wait times."
              },
              {
                icon: TrendingDown,
                title: "Lowest Interest Rates",
                desc: "We leverage our high volume to negotiate lower ROI than you would get walking into a branch directly."
              },
              {
                icon: Building2,
                title: "Doorstep Service",
                desc: "From picking up your KYC documents to finalizing signatures, we come to your home or office."
              },
              {
                icon: Landmark,
                title: "All Banks Under One Roof",
                desc: "SBI, HDFC, ICICI, PNB, Bajaj... we check your eligibility across all of them with a single file."
              },
              {
                icon: ShieldCheck,
                title: "100% Transparent",
                desc: "We show you the exact breakdown of EMIs, processing fees, and insurance before you sign anything."
              },
              {
                icon: BadgePercent,
                title: "Zero Hidden Consultation Fees",
                desc: "We are paid by the banks for bringing them good customers. Our expert consultation is entirely free for you."
              }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={solutionVariants}
                className="bg-white border border-emerald-100/50 p-8 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-[2px] mb-8 shadow-lg shadow-emerald-500/30 group-hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                    <benefit.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{benefit.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
