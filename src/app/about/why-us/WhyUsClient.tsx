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
  BadgePercent
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-emerald-500/30">
      <Header />
      
      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative flex items-center justify-center overflow-hidden pt-12 pb-24">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 z-0">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full opacity-40 dark:opacity-60 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-emerald-600/20 blur-[100px] rounded-full opacity-30 dark:opacity-50 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] sm:text-xs font-bold tracking-wide uppercase mb-6 shadow-inner"
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500">Start building your home.</span>
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

        {/* Bottom Wave Divider */}
        <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[40px] md:h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wave-stroke-why" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,111.47,192.39,84.44Z" className="fill-slate-50 dark:fill-slate-950"></path>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,111.47,192.39,84.44Z" fill="none" stroke="url(#wave-stroke-why)" strokeWidth="4" className="opacity-80 dark:opacity-100"></path>
          </svg>
        </div>
      </section>

      {/* 2. THE PROBLEM (EMOTIONAL CONNECTION) */}
      <section className="py-20 md:py-32 relative bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              Why Getting a Loan Feels Like a <span className="text-rose-500">Nightmare</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              We've spoken to thousands of families. We know the pain of running from bank to bank, only to be met with confusing terms and sudden rejections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FileWarning, title: "Endless Paperwork", desc: "Banks ask for documents you've never heard of, creating delays that stretch for months." },
              { icon: AlertOctagon, title: "Hidden Charges", desc: "Processing fees, login fees, legal fees—suddenly your loan costs lakhs more than you planned." },
              { icon: XCircle, title: "Unexplained Rejections", desc: "A minor CIBIL issue or technicality results in a flat rejection, breaking your dream home plans." }
            ].map((problem, idx) => (
              <motion.div 
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={problemVariants}
                className="bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-900/30 p-8 rounded-3xl shadow-lg relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-full -z-10 group-hover:bg-rose-500/10 transition-colors" />
                <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-6">
                  <problem.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{problem.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {problem.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE SOLUTION (THE BFS DIFFERENCE) */}
      <section className="py-20 md:py-32 relative bg-white dark:bg-slate-900 overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold tracking-wide uppercase mb-6">
                <ShieldCheck className="w-4 h-4" /> The BFS Advantage
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                We make banks work <span className="text-emerald-500">for you</span>.
              </h2>
              <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400 mb-8">
                <p>
                  As an authorized DSA (Direct Selling Agent) for all major Indian Banks and NBFCs, we don't work for one specific bank—<strong>we work for you</strong>. 
                </p>
                <p>
                  Our system is simple: You tell us your need, we analyze your profile, and we force the banks to compete to give you the lowest interest rate and the highest loan amount.
                </p>
              </div>
              
              <ul className="space-y-4">
                {[
                  "We handle 100% of the paperwork and bank visits.",
                  "We compare rates across 50+ lenders instantly.",
                  "We negotiate processing fee waivers on your behalf.",
                  "We provide parallel processing to guarantee 5-day approval."
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/50 p-1 rounded-full text-emerald-600 dark:text-emerald-400">
                      <ThumbsUp className="w-4 h-4" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-3xl transform rotate-3 blur-2xl opacity-20 dark:opacity-40" />
              <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-3xl shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <div className="text-4xl font-black text-emerald-500 mb-2">15+</div>
                    <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Years Experience</div>
                  </div>
                  <div className="text-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <div className="text-4xl font-black text-blue-500 mb-2">50+</div>
                    <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Bank Partners</div>
                  </div>
                  <div className="text-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <div className="text-4xl font-black text-amber-500 mb-2">2.5k</div>
                    <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Families Funded</div>
                  </div>
                  <div className="text-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <div className="text-4xl font-black text-purple-500 mb-2">₹0</div>
                    <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Hidden Charges</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CORE BENEFITS GRID */}
      <section className="py-20 md:py-32 relative bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              Our Commitments to You
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              When you choose BFS, you aren't just getting a loan agent; you're getting a dedicated financial partner for life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "5-Day Guaranteed Approval",
                desc: "We process applications in parallel directly with bank credit managers to slash wait times.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: TrendingDown,
                title: "Lowest Interest Rates",
                desc: "We leverage our high volume to negotiate lower ROI than you would get walking into a branch directly.",
                color: "from-emerald-500 to-teal-500"
              },
              {
                icon: Building2,
                title: "Doorstep Service",
                desc: "From picking up your KYC documents to finalizing signatures, we come to your home or office.",
                color: "from-purple-500 to-indigo-500"
              },
              {
                icon: Landmark,
                title: "All Banks Under One Roof",
                desc: "SBI, HDFC, ICICI, PNB, Bajaj... we check your eligibility across all of them with a single file.",
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: ShieldCheck,
                title: "100% Transparent",
                desc: "We show you the exact breakdown of EMIs, processing fees, and insurance before you sign anything.",
                color: "from-rose-500 to-pink-500"
              },
              {
                icon: BadgePercent,
                title: "Zero Hidden Consultation Fees",
                desc: "We are paid by the banks for bringing them good customers. Our expert consultation is entirely free for you.",
                color: "from-emerald-400 to-green-500"
              }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={solutionVariants}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} p-[2px] mb-6`}>
                  <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-slate-800 dark:text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-20 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-600/30 to-blue-600/30 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Ready to unlock your dream home?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
            Join 2,500+ families who trusted Bhardwaj Financial Services for a stress-free home loan experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 flex items-center justify-center gap-2">
              Apply For Loan <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-xl font-bold transition-all flex items-center justify-center">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
