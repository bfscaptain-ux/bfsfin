"use client";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight, HeartPulse, Umbrella, Car, Briefcase, Award, Star, Activity, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function InsuranceClient({ heroImageUrl }: { heroImageUrl?: string }) {
  return (
    <>
      {/* 1. HERO SECTION WITH LEAD FORM */}
      <section className="relative bg-slate-950 pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        {heroImageUrl && (
          <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity" style={{ backgroundImage: `url(${heroImageUrl})` }}></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-slate-900 opacity-60 mix-blend-multiply"></div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 10, repeat: Infinity }} 
          className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-[100px]"
        ></motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4" /> 100% Claim Assistance
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Secure Your Family&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Future & Assets</span> Today
              </h1>
              <p className="text-lg text-emerald-50/80 mb-8 max-w-xl leading-relaxed">
                Compare and buy top-rated Life, Health, Motor, and Business insurance policies. Get unbiased advice and lifetime claim support from India&apos;s trusted experts.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-300 font-medium bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Life & Term
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300 font-medium bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Health & Medical
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300 font-medium bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> General & Assets
                </div>
              </div>
            </motion.div>
            
            {/* Right Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:ml-auto w-full max-w-md"
            >
              <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400"></div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Get a Free Quote</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Enter details to check your premium instantly.</p>
                
                <form className="space-y-4" action="/apply">
                  <div>
                    <input type="text" required placeholder="Your Full Name" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-4 py-3 sm:py-3.5 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <input type="tel" required placeholder="Mobile Number" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-4 py-3 sm:py-3.5 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <select required className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-4 py-3 sm:py-3.5 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
                      <option value="">Select Insurance Type</option>
                      <option value="health">Health Insurance</option>
                      <option value="life">Term Life Insurance</option>
                      <option value="motor">Car / Two Wheeler</option>
                      <option value="business">Business / SME Cover</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-1 mt-2">
                    View Instant Quotes
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. INSURANCE CATEGORIES */}
      <section className="py-20 bg-slate-50 dark:bg-[#0a0f1c] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Comprehensive Coverage for Everything</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Explore our wide range of insurance products designed to protect you, your family, and your business.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Product 1 */}
            <Link href="/products/insurance/health-insurance" className="group bg-white dark:bg-[#1e293b] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Health & Medical</h3>
              <ul className="space-y-2 mb-6 flex-1">
                <li className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Individual & Family Floater</li>
                <li className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Pre-existing Disease Cover</li>
                <li className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Cashless Network Hospitals</li>
              </ul>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">View Plans <ArrowRight className="w-4 h-4" /></span>
            </Link>

            {/* Product 2 */}
            <Link href="/products/insurance/term-life" className="group bg-white dark:bg-[#1e293b] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Umbrella className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Term Life Cover</h3>
              <ul className="space-y-2 mb-6 flex-1">
                <li className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" /> High Cover at Low Premium</li>
                <li className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" /> Critical Illness Riders</li>
                <li className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" /> Tax Benefits under 80C</li>
              </ul>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">View Plans <ArrowRight className="w-4 h-4" /></span>
            </Link>

            {/* Product 3 */}
            <Link href="/products/insurance/car-insurance" className="group bg-white dark:bg-[#1e293b] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Car className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">General & Assets</h3>
              <ul className="space-y-2 mb-6 flex-1">
                <li className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Motor (Car/Bike)</li>
                <li className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Commercial Vehicle</li>
                <li className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Home Property Cover</li>
              </ul>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">View Plans <ArrowRight className="w-4 h-4" /></span>
            </Link>

            {/* Product 4 */}
            <Link href="/products/insurance/business-insurance" className="group bg-white dark:bg-[#1e293b] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Business & Loan</h3>
              <ul className="space-y-2 mb-6 flex-1">
                <li className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> Loan Protection Cover</li>
                <li className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> Fire & Shop Insurance</li>
                <li className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> Group Health Plans</li>
              </ul>
              <span className="text-amber-600 dark:text-amber-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">View Plans <ArrowRight className="w-4 h-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US & STATS */}
      <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-emerald-800 rounded-full blur-[80px] sm:blur-[100px] opacity-50 -mr-40 sm:-mr-96 -mt-40 sm:-mt-96 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Why Choose BFSFIN Insurance?</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto text-sm sm:text-base">We don&apos;t just sell policies; we build lifelong relationships through unparalleled support and unbiased advice.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
              <Award className="w-10 h-10 text-emerald-400 mb-4" />
              <h4 className="text-lg font-bold mb-2">Claim Assistance Support</h4>
              <p className="text-emerald-100/70 text-sm">100% guidance during claim settlement. We stand by you when it matters the most.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
              <Star className="w-10 h-10 text-emerald-400 mb-4" />
              <h4 className="text-lg font-bold mb-2">Multiple Insurer Options</h4>
              <p className="text-emerald-100/70 text-sm">Tie-ups with leading PSU and private insurers to get you the best comparative quotes.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
              <Activity className="w-10 h-10 text-emerald-400 mb-4" />
              <h4 className="text-lg font-bold mb-2">Zero Hidden Charges</h4>
              <p className="text-emerald-100/70 text-sm">Unbiased advice based strictly on your needs. Absolutely no hidden fees or markups.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
              <FileCheck className="w-10 h-10 text-emerald-400 mb-4" />
              <h4 className="text-lg font-bold mb-2">Doorstep/Digital Docs</h4>
              <p className="text-emerald-100/70 text-sm">Seamless paperwork and lifelong renewal support from the comfort of your home.</p>
            </motion.div>
          </div>

          {/* Stats Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center border-t border-emerald-800/50 pt-12 sm:pt-16">
            <div>
              <div className="text-3xl sm:text-4xl font-black mb-1">10,000+</div>
              <div className="text-emerald-300 text-[10px] sm:text-sm font-bold uppercase tracking-widest">Happy Families</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black mb-1">15+</div>
              <div className="text-emerald-300 text-[10px] sm:text-sm font-bold uppercase tracking-widest">Years Exp.</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black mb-1">99%</div>
              <div className="text-emerald-300 text-[10px] sm:text-sm font-bold uppercase tracking-widest">Claim Support</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black mb-1">50+</div>
              <div className="text-emerald-300 text-[10px] sm:text-sm font-bold uppercase tracking-widest">Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-50 dark:bg-emerald-950/40 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-emerald-100 dark:border-emerald-900/50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">Need expert guidance?</h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 font-medium leading-relaxed">
            Our insurance advisors are ready to help you navigate through hundreds of policies and find the one that perfectly fits your family&apos;s needs.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-1 active:scale-95"
          >
            Talk to an Expert
            <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
