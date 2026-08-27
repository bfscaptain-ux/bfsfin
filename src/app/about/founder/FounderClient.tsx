"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Award, ShieldCheck, CheckCircle2, Users, Rocket, TrendingUp, ChevronRight, Briefcase, Linkedin, Mail, Target, Zap } from "lucide-react";

export default function FounderClient({ ownerConfig }: { ownerConfig?: any }) {

    const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/team")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTeamMembers(data);
      })
      .catch(console.error);
  }, []);

  const owner = ownerConfig || {
    name: "Vineeta Sharma",
    role: "Founder & Managing Director, BFS",
    quote: "We don't just secure loans; we legally vet your lifetime investment. Total transparency, zero hidden brokerage.",
    image: "/owner.png"
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 font-sans selection:bg-emerald-500/30">
      <Header />
      
      <main>
        {/* PREMIUM HERO SECTION */}
        <section className="relative flex items-center justify-center overflow-hidden pt-12 pb-24">
          {/* Abstract Background Elements */}
          <div className="absolute inset-0 bg-slate-50 dark:bg-emerald-900 z-0">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/20 blur-[120px] rounded-full opacity-40 dark:opacity-60 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/20 blur-[100px] rounded-full opacity-30 dark:opacity-50 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-bold tracking-wide uppercase mb-3 shadow-inner"
                >
                  <Award className="w-3.5 h-3.5" /> Leadership & Vision
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-3"
                >
                  The Minds Behind Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500">Dream Home.</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-5 max-w-xl"
                >
                  With over a decade of banking expertise, our leadership team is dedicated to breaking down financial barriers and making loan approvals faster, transparent, and hassle-free.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-wrap gap-3"
                >
                  <button className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105">Meet the Team</button>
                  <button className="px-6 py-2.5 bg-emerald-900/5 hover:bg-emerald-900/10 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-900/10 dark:border-white/10 rounded-xl font-bold text-sm transition-all backdrop-blur-md hover:scale-105 flex items-center gap-2">Join BFS <ChevronRight className="w-4 h-4" /></button>
                </motion.div>
              </div>

              {/* Right Side: Professional Stats / Graphics */}
              <div className="relative hidden lg:block h-[160px]">
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute top-0 right-0 w-[300px] bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 rounded-2xl p-4 shadow-xl dark:shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">₹500Cr+</div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Loans Disbursed</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute bottom-0 left-6 w-[300px] bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 rounded-2xl p-4 shadow-xl dark:shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">2,500+</div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Happy Families</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full blur-[80px] opacity-40 -z-10"
                />
              </div>
            </div>
          </div>

          {/* Bottom Wave Divider */}
          <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-10">
            <svg className="relative block w-full h-[40px] md:h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="wave-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,111.47,192.39,84.44Z" className="fill-slate-50 dark:fill-slate-950"></path>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,111.47,192.39,84.44Z" fill="none" stroke="url(#wave-stroke)" strokeWidth="4" className="opacity-80 dark:opacity-100"></path>
            </svg>
          </div>
        </section>

        {/* FOUNDER'S DESK DEEP DIVE */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Column */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-200 dark:border-emerald-800 shadow-2xl bg-white dark:bg-emerald-900 flex items-center justify-center group-hover:shadow-emerald-500/10 transition-shadow">
                <Image src={owner.image} alt={owner.name} fill className="object-cover" />
                
                {/* Experience Badge overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-emerald-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl translate-y-4 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900 dark:text-white">15+ Years</div>
                      <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Banking Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-sm font-black text-emerald-600 dark:text-emerald-400 tracking-widest uppercase mb-2">From the Founder's Desk</h2>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1]">
                  {owner.name}
                </h3>
                <p className="text-xl text-slate-500 dark:text-slate-400 mt-2 font-medium">{owner.role}</p>
              </div>

              <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300">
                <p>
                  Before founding Bhardwaj Financial Services, {owner.name} spent over a decade working closely within India's top banking institutions. They witnessed firsthand the anxiety, delays, and lack of transparency ordinary families faced when applying for home loans. 
                </p>
                <p>
                  Driven by a vision to simplify the complex mortgage landscape, he established BFS with a single mission: <strong>To make funding accessible, fast, and completely transparent.</strong>
                </p>
              </div>

              <blockquote className="relative p-8 bg-emerald-50 dark:bg-emerald-950/30 rounded-3xl border border-emerald-100 dark:border-emerald-900/50">
                <div className="absolute top-0 left-8 -translate-y-1/2 text-6xl text-emerald-300 dark:text-emerald-800 font-serif">"</div>
                <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 italic leading-relaxed relative z-10">
                  We don't just process loan files; we are helping families unlock the doors to their dream homes. Speed and integrity are the cornerstones of everything we do at BFS.
                </p>
              </blockquote>
              
              <div className="flex gap-4 pt-4">
                <a href="#" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-slate-500">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:director@bhardwajfinance.com" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-slate-500">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CORE LEADERSHIP TEAM */}
        <section className="py-24 bg-slate-100/50 dark:bg-emerald-900/20 border-y border-slate-200 dark:border-emerald-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Core Leadership Team</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                A powerhouse of banking veterans and dynamic professionals working tirelessly to secure the best financial deals for you across India.
              </p>
            </motion.div>

            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {teamMembers.length > 0 ? teamMembers.map((member, i) => {
                  const color = member.color || "emerald";
                  
                  const colorClasses: Record<string, { bg: string, text: string }> = {
                    emerald: { bg: "from-emerald-500 to-emerald-600", text: "text-emerald-600 dark:text-emerald-400" },
                    orange: { bg: "from-orange-500 to-red-500", text: "text-orange-600 dark:text-orange-400" },
                    purple: { bg: "from-purple-500 to-pink-500", text: "text-purple-600 dark:text-purple-400" },
                    blue: { bg: "from-blue-500 to-cyan-500", text: "text-blue-600 dark:text-blue-400" },
                  };
                  const currentColors = colorClasses[color] || colorClasses.emerald;

                  return (
                    <motion.div key={member.id || i} variants={fadeInUp} className="group relative bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-3xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)] text-center shadow-sm">
                      <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${currentColors.bg} p-1 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-full h-full rounded-full bg-white dark:bg-emerald-900 flex items-center justify-center text-3xl font-black text-slate-800 dark:text-white shadow-inner overflow-hidden relative">
                          {member.imageUrl ? (
                            <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                          ) : (
                            member.initials
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                      <div className={`${currentColors.text} font-semibold text-sm uppercase tracking-wide mb-3`}>{member.role}</div>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                        {member.desc}
                      </p>
                    </motion.div>
                  );
                }) : (
                  <div className="col-span-full text-center text-slate-500 py-12">
                    No team members found. Add them in the Admin Panel.
                  </div>
                )}
              </motion.div>

          </div>
        </section>

        {/* COMPANY PHILOSOPHY */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Our Core Philosophy</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">The principles that guide our every action.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-emerald-900 p-8 rounded-3xl border border-slate-200 dark:border-emerald-800 shadow-lg hover:border-emerald-500/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">100% Transparency</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We despise hidden charges as much as you do. Our team lays out every single fee, ROI, and processing cost upfront before you even sign a document.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-emerald-900 p-8 rounded-3xl border border-slate-200 dark:border-emerald-800 shadow-lg hover:border-emerald-500/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Execution Speed</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                In real estate, time is money. Our direct bank portal access and pre-screening expertise means we get loans sanctioned in 5 days, not 5 weeks.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-emerald-900 p-8 rounded-3xl border border-slate-200 dark:border-emerald-800 shadow-lg hover:border-amber-500/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Client First</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We work for you, not the banks. Our loyalty lies in negotiating the absolute lowest interest rates for our clients across our network.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-emerald-900 rounded-[3rem] overflow-hidden p-12 md:p-20 text-center shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-emerald-600/20" />
              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl font-black text-white">Ready to work with the best?</h2>
                <p className="text-xl text-slate-300">Let our expert team handle the banking bureaucracy while you focus on choosing the perfect home.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95">
                    Speak to Leadership
                  </button>
                  <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95">
                    Apply for Loan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}



