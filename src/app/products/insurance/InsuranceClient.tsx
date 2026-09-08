"use client";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight, HeartPulse, Umbrella, Car, Briefcase, Award, Star, Activity, FileCheck, Users, ActivitySquare, ShieldAlert, Bike, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function InsuranceClient({ heroImageUrl }: { heroImageUrl?: string }) {
  // 8 Specific Insurance Products mapped for SEO and better backlinking
  const insuranceProducts = [
    {
      slug: "health-insurance",
      title: "Health & Medical",
      desc: "Comprehensive health cover for medical emergencies.",
      icon: HeartPulse,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      features: ["Individual & Family Floater", "Pre-existing Disease Cover", "Cashless Network Hospitals"]
    },
    {
      slug: "term-life",
      title: "Term Life Cover",
      desc: "High life cover at an affordable premium.",
      icon: Umbrella,
      color: "text-teal-500",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      features: ["High Cover at Low Premium", "Critical Illness Riders", "Tax Benefits under 80C"]
    },
    {
      slug: "family-floater",
      title: "Family Floater",
      desc: "One policy to cover your entire family's health.",
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-600/10",
      features: ["Single Premium for Family", "Shared Sum Insured", "Maternity Cover Options"]
    },
    {
      slug: "critical-illness",
      title: "Critical Illness",
      desc: "Lump-sum payout on diagnosis of major illnesses.",
      icon: ActivitySquare,
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      features: ["Covers Cancer, Heart Attack etc.", "Lump-sum Tax-free Payout", "No Hospital Bills Required"]
    },
    {
      slug: "car-insurance",
      title: "Car Insurance",
      desc: "Comprehensive protection for your four-wheeler.",
      icon: Car,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      features: ["Zero Depreciation Cover", "24x7 Roadside Assistance", "Cashless Garage Network"]
    },
    {
      slug: "two-wheeler-insurance",
      title: "Two-Wheeler Cover",
      desc: "Stay safe on the roads with bike/scooter insurance.",
      icon: Bike,
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
      features: ["Third-Party & Own Damage", "Instant Policy Issuance", "No Claim Bonus Protection"]
    },
    {
      slug: "home-insurance",
      title: "Home Property",
      desc: "Protect your house and belongings from natural disasters.",
      icon: Home,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      features: ["Fire & Burglary Cover", "Natural Calamity Protection", "Valuables Cover"]
    },
    {
      slug: "business-insurance",
      title: "Business & SME",
      desc: "Safeguard your enterprise against operational risks.",
      icon: Briefcase,
      color: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-100 dark:bg-slate-700/30",
      features: ["Shop & Office Insurance", "Group Health Plans", "Liability Covers"]
    }
  ];

  return (
    <>
      {/* 1. HERO SECTION WITH LEAD FORM */}
      <section className="relative bg-emerald-950 pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        {heroImageUrl && (
          <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity" style={{ backgroundImage: `url(${heroImageUrl})` }}></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 to-emerald-900/60 opacity-80 mix-blend-multiply"></div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/30 rounded-full mix-blend-screen filter blur-[120px]"
        ></motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-sm">
                <ShieldCheck className="w-4 h-4" /> 100% Cashless Claim Assistance
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Secure Your Family&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Future & Assets</span>
              </h1>
              <p className="text-lg md:text-xl text-emerald-50/80 mb-8 max-w-xl leading-relaxed font-medium">
                Compare and buy top-rated Life, Health, Motor, and Business insurance policies. Get unbiased advice and lifetime claim support from India&apos;s trusted experts.
              </p>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-emerald-100 font-bold bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 backdrop-blur shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Life & Term
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-100 font-bold bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 backdrop-blur shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Health & Medical
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-100 font-bold bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 backdrop-blur shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> General & Assets
                </div>
              </div>
            </motion.div>
            
            {/* Right Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:ml-auto w-full max-w-md relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-[2rem] blur opacity-30"></div>
              <div className="bg-white/95 dark:bg-emerald-950/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40 dark:border-emerald-800/50 relative overflow-hidden">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Get a Free Quote</h3>
                <p className="text-slate-500 dark:text-emerald-200/80 text-sm mb-6 font-medium">Enter details to check your premium instantly.</p>
                
                <form className="space-y-4" action="/apply">
                  <div>
                    <input type="text" required placeholder="Your Full Name" className="w-full bg-slate-50 dark:bg-emerald-900/40 border border-slate-200 dark:border-emerald-800/80 px-4 py-3 sm:py-3.5 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
                  </div>
                  <div>
                    <input type="tel" required placeholder="Mobile Number" className="w-full bg-slate-50 dark:bg-emerald-900/40 border border-slate-200 dark:border-emerald-800/80 px-4 py-3 sm:py-3.5 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
                  </div>
                  <div>
                    <select required className="w-full bg-slate-50 dark:bg-emerald-900/40 border border-slate-200 dark:border-emerald-800/80 px-4 py-3 sm:py-3.5 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none transition-all font-medium cursor-pointer">
                      <option value="">Select Insurance Type</option>
                      <option value="health">Health Insurance</option>
                      <option value="life">Term Life Insurance</option>
                      <option value="motor">Car / Two Wheeler</option>
                      <option value="business">Business / SME Cover</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 mt-2">
                    View Instant Quotes <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. INSURANCE CATEGORIES (Dynamic 8-Grid) */}
      <section className="py-24 bg-slate-50 dark:bg-emerald-950/40 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Comprehensive Coverage for Everything</h2>
            <p className="text-slate-600 dark:text-emerald-200/80 max-w-2xl mx-auto text-lg font-medium">Explore our wide range of insurance products designed to protect you, your family, and your business.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {insuranceProducts.map((product, idx) => {
              const Icon = product.icon;
              return (
                <Link 
                  key={product.slug}
                  href={`/products/insurance/${product.slug}`} 
                  className="group relative bg-white dark:bg-emerald-950 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)] dark:shadow-none border border-slate-200/60 dark:border-emerald-800/50 hover:border-emerald-400/50 transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden"
                >
                  {/* Decorative Gradient Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/10 dark:bg-teal-500/20 rounded-full blur-2xl -ml-5 -mb-5 transition-transform duration-700 group-hover:scale-150"></div>
                  
                  {/* Premium Top Line Accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-16 h-16 rounded-2xl ${product.bg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm border border-emerald-100 dark:border-emerald-800/50`}>
                        <Icon className={`w-8 h-8 ${product.color} filter drop-shadow-sm`} />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-emerald-900/50 flex items-center justify-center border border-slate-100 dark:border-emerald-800/50 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white text-slate-400 transition-colors duration-300">
                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{product.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-emerald-200/70 mb-6 font-medium leading-relaxed">{product.desc}</p>
                    
                    <div className="mt-auto">
                      <div className="h-px w-full bg-gradient-to-r from-slate-100 via-slate-200 to-transparent dark:from-emerald-800/50 dark:via-emerald-700/50 mb-5"></div>
                      <ul className="space-y-3">
                        {product.features.map((feature, fIdx) => (
                          <li key={fIdx} className="text-xs font-semibold text-slate-600 dark:text-emerald-100/90 flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 drop-shadow-sm" /> 
                            <span className="leading-tight pt-0.5">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Bottom Action Button (appears on hover) */}
                  <div className="relative z-10 mt-8 pt-4 overflow-hidden h-0 group-hover:h-12 opacity-0 group-hover:opacity-100 transition-all duration-300">
                     <div className="w-full bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-bold text-sm text-center py-3 rounded-xl border border-emerald-100 dark:border-emerald-800/80">
                       Explore {product.title} Details
                     </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US & STATS */}
      <section className="py-24 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-emerald-800 rounded-full blur-[80px] sm:blur-[120px] opacity-60 -mr-40 sm:-mr-96 -mt-40 sm:-mt-96 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-950 rounded-full blur-[100px] opacity-80 -ml-40 -mb-40 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Why Choose BFSFIN Insurance?</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto text-lg font-medium">We don&apos;t just sell policies; we build lifelong relationships through unparalleled support and unbiased advice.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-emerald-950/40 backdrop-blur-md p-8 rounded-3xl border border-emerald-800/80 shadow-xl hover:-translate-y-2 transition-transform">
              <Award className="w-12 h-12 text-emerald-400 mb-6 drop-shadow-md" />
              <h4 className="text-xl font-bold mb-3">Claim Assistance</h4>
              <p className="text-emerald-100/80 text-sm font-medium leading-relaxed">100% guidance during claim settlement. We stand by you when it matters the most.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-emerald-950/40 backdrop-blur-md p-8 rounded-3xl border border-emerald-800/80 shadow-xl hover:-translate-y-2 transition-transform">
              <Star className="w-12 h-12 text-emerald-400 mb-6 drop-shadow-md" />
              <h4 className="text-xl font-bold mb-3">Multiple Insurers</h4>
              <p className="text-emerald-100/80 text-sm font-medium leading-relaxed">Tie-ups with leading PSU and private insurers to get you the best comparative quotes.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-emerald-950/40 backdrop-blur-md p-8 rounded-3xl border border-emerald-800/80 shadow-xl hover:-translate-y-2 transition-transform">
              <Activity className="w-12 h-12 text-emerald-400 mb-6 drop-shadow-md" />
              <h4 className="text-xl font-bold mb-3">Zero Hidden Charges</h4>
              <p className="text-emerald-100/80 text-sm font-medium leading-relaxed">Unbiased advice based strictly on your needs. Absolutely no hidden fees or markups.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-emerald-950/40 backdrop-blur-md p-8 rounded-3xl border border-emerald-800/80 shadow-xl hover:-translate-y-2 transition-transform">
              <FileCheck className="w-12 h-12 text-emerald-400 mb-6 drop-shadow-md" />
              <h4 className="text-xl font-bold mb-3">Digital Processing</h4>
              <p className="text-emerald-100/80 text-sm font-medium leading-relaxed">Seamless paperwork and lifelong renewal support from the comfort of your home.</p>
            </motion.div>
          </div>

          {/* Stats Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center border-t border-emerald-800/50 pt-16">
            <div className="p-4 rounded-2xl hover:bg-emerald-800/30 transition-colors">
              <div className="text-4xl md:text-5xl font-black mb-2 text-white">10,000+</div>
              <div className="text-emerald-300 text-xs md:text-sm font-bold uppercase tracking-widest">Happy Families</div>
            </div>
            <div className="p-4 rounded-2xl hover:bg-emerald-800/30 transition-colors">
              <div className="text-4xl md:text-5xl font-black mb-2 text-white">15+</div>
              <div className="text-emerald-300 text-xs md:text-sm font-bold uppercase tracking-widest">Years Exp.</div>
            </div>
            <div className="p-4 rounded-2xl hover:bg-emerald-800/30 transition-colors">
              <div className="text-4xl md:text-5xl font-black mb-2 text-white">99%</div>
              <div className="text-emerald-300 text-xs md:text-sm font-bold uppercase tracking-widest">Claim Support</div>
            </div>
            <div className="p-4 rounded-2xl hover:bg-emerald-800/30 transition-colors">
              <div className="text-4xl md:text-5xl font-black mb-2 text-white">50+</div>
              <div className="text-emerald-300 text-xs md:text-sm font-bold uppercase tracking-widest">Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-50 dark:bg-emerald-950/60 py-24 px-4 sm:px-6 lg:px-8 border-y border-emerald-100 dark:border-emerald-900/50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Need expert guidance?</h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-emerald-100/80 mb-10 font-medium leading-relaxed max-w-3xl mx-auto">
            Our insurance advisors are ready to help you navigate through hundreds of policies and find the one that perfectly fits your family&apos;s needs.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-2xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:-translate-y-1 active:scale-95"
          >
            Talk to an Expert
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
