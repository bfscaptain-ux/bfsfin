"use client";
import Link from "next/link";
import { CheckCircle2, ChevronRight, ArrowRight, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

const topCards = [
  {
    id: "hdfc-millennia",
    name: "Millennia Credit Card",
    issuer: "HDFC Bank",
    category: "Cashback & Shopping",
    fee: "?1,000 / year",
    benefits: ["5% Cashback on Amazon, Flipkart", "1% Cashback on offline spends", "4 Complimentary Lounge visits"],
    color: "bg-gradient-to-br from-blue-800 to-indigo-900",
    chipColor: "bg-yellow-200/70",
    logo: "HDFC BANK"
  },
  {
    id: "sbi-simplyclick",
    name: "SimplyCLICK",
    issuer: "SBI Card",
    category: "Online Shopping",
    fee: "?499 / year",
    benefits: ["10X Reward Points on online partners", "5X Reward Points on other online spends", "Amazon Gift Card on joining"],
    color: "bg-gradient-to-br from-sky-500 to-blue-700",
    chipColor: "bg-slate-200/70",
    logo: "SBI Card"
  },
  {
    id: "axis-flipkart",
    name: "Flipkart Axis Bank",
    issuer: "Axis Bank",
    category: "Co-branded / Cashback",
    fee: "?500 / year",
    benefits: ["5% Unlimited Cashback on Flipkart", "4% Cashback on Swiggy, Uber", "4 Complimentary Lounge visits"],
    color: "bg-gradient-to-br from-rose-600 to-pink-800",
    chipColor: "bg-yellow-200/70",
    logo: "AXIS BANK"
  },
  {
    id: "icici-amazon-pay",
    name: "Amazon Pay ICICI",
    issuer: "ICICI Bank",
    category: "Lifetime Free / Rewards",
    fee: "Lifetime Free",
    benefits: ["5% Cashback for Prime members", "2% Cashback on bill payments", "1% Cashback on other spends"],
    color: "bg-gradient-to-br from-orange-500 to-amber-700",
    chipColor: "bg-slate-200/70",
    logo: "ICICI Bank"
  }
];

export default function CreditCardsClient({ heroImageUrl }: { heroImageUrl?: string }) {
  return (
    <>
      {/* ANIMATED HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-24">
        {/* Deep Premium Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-950 to-slate-950"></div>
        {heroImageUrl && (
          <div className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity" style={{ backgroundImage: `url(${heroImageUrl})` }}></div>
        )}
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, #000 40%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, #000 40%, transparent 100%)" }}></div>

        {/* Animated Glowing Orbs */}
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-500/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none mix-blend-screen"></motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[-10%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-teal-700/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none mix-blend-screen"></motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          
          {/* Hero Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Trusted by 10,000+ Users
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight mb-6">
              Unlock Premium <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 drop-shadow-sm">
                Lifestyle Benefits
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium">
              Compare India&apos;s top credit cards instantly. Zero joining fees, maximum cashback, and exclusive travel perks curated just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <Link 
                href="#compare" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:shadow-[0_0_30px_rgba(52,211,153,0.6)] hover:-translate-y-1 active:scale-95"
              >
                Explore Top Cards <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-white">4.9</div>
                  <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-slate-950 flex items-center justify-center">
                    <Star className="w-3.5 h-3.5 text-white fill-current" />
                  </div>
                </div>
                <span>Rated Excellent</span>
              </div>
            </div>
          </motion.div>

          {/* Hero 3D Card Mockups (Hidden on small screens, shown on md+) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative h-[350px] perspective-1000 hidden md:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[350px] h-full">
              {/* Card 1 (Back) */}
              <div className="absolute top-4 left-0 w-72 aspect-[1.58/1] bg-gradient-to-tr from-emerald-900 to-slate-900 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] transform rotate-12 -translate-z-10 opacity-40 border border-white/5"></div>
              
              {/* Card 2 (Middle) */}
              <div className="absolute top-10 left-8 w-72 aspect-[1.58/1] bg-gradient-to-tr from-teal-800 to-slate-900 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)] transform rotate-6 translate-z-10 opacity-60 border border-white/10"></div>
              
              {/* Card 3 (Front - Focus) */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 left-16 w-72 aspect-[1.58/1] bg-gradient-to-br from-emerald-950 via-slate-900 to-black rounded-2xl shadow-[0_30px_60px_-15px_rgba(16,185,129,0.3)] transform -rotate-6 translate-z-50 border border-emerald-500/30 p-6 flex flex-col justify-between overflow-hidden z-20 backdrop-blur-xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/30 rounded-full blur-3xl -mr-8 -mt-8"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl -ml-8 -mb-8"></div>
                
                <div className="relative z-10 flex justify-between items-start">
                  <div className="font-black text-[16px] text-emerald-50 tracking-widest italic flex items-center gap-1.5">
                    Bhardwaj <span className="text-emerald-400 font-light text-xs">FINANCE</span>
                  </div>
                  <div className="w-12 h-8 bg-yellow-400/80 rounded-md flex flex-col justify-around px-1.5 py-1.5 shadow-inner border border-yellow-500/50">
                    <div className="w-full h-px bg-yellow-600/50"></div>
                    <div className="w-full h-px bg-yellow-600/50"></div>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="font-mono text-xl tracking-[0.2em] text-white/90 mb-1.5 drop-shadow-md">•••• •••• •••• 8892</div>
                  <div className="flex justify-between items-end">
                    <div className="font-bold text-xs text-emerald-100/70 uppercase tracking-widest">Aman Sharma</div>
                    <div className="text-[10px] font-black text-emerald-400 tracking-widest border border-emerald-500/30 px-2.5 py-0.5 rounded-full bg-emerald-950/50">PLATINUM</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Cards Grid */}
      <section id="compare" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0a0f1c] relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">India&apos;s Best Credit Cards</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Handpicked by our experts based on rewards, joining fees, and real-world value.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {topCards.map((card, idx) => (
              <motion.div 
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col group hover:-translate-y-2"
              >
                {/* CSS Card Mockup */}
                <div className={`w-full aspect-[1.58/1] ${card.color} rounded-2xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden mb-8 transform transition-transform duration-500 group-hover:scale-105 group-hover:shadow-xl`}>
                  {/* Glossy Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full blur-xl -ml-5 -mb-5 pointer-events-none"></div>
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="font-black tracking-widest text-sm text-white/90 drop-shadow-sm">{card.logo}</div>
                    <div className={`w-10 h-7 ${card.chipColor} rounded-[4px] shadow-sm flex flex-col justify-around p-[2px]`}>
                      <div className="w-full h-px bg-black/20"></div>
                      <div className="w-full h-px bg-black/20"></div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 text-white">
                    <div className="font-mono text-[15px] tracking-[0.2em] mb-1 opacity-90 drop-shadow-md">•••• •••• •••• XXXX</div>
                    <div className="font-bold text-xs truncate uppercase tracking-widest drop-shadow-sm">{card.name}</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{card.issuer} {card.name}</h3>
                <div className="inline-flex items-center px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs font-bold rounded-md uppercase tracking-wider w-fit mb-6">
                  {card.category}
                </div>
                
                <div className="mb-8 flex-grow">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Key Benefits</h4>
                  <ul className="space-y-3">
                    {card.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start text-sm font-medium text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2.5 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-slate-100 dark:border-slate-800 mt-auto">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Annual Fee</span>
                    <span className="font-black text-lg text-slate-900 dark:text-white">{card.fee}</span>
                  </div>
                  <Link 
                    href={`/products/credit-cards/${card.id}`}
                    className="w-full flex items-center justify-center py-3.5 px-4 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-md active:scale-95"
                  >
                    View Details & Apply
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-50 dark:bg-emerald-950/40 py-24 px-4 sm:px-6 lg:px-8 border-y border-emerald-100 dark:border-emerald-900/50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">Not sure which one to pick?</h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 font-medium leading-relaxed">
            We have an extensive catalog of over 50+ credit cards across all major banks. Let our Smart AI recommend the perfect card based on your spending habits.
          </p>
          <Link 
            href="/compare-cards" 
            className="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-1 active:scale-95"
          >
            Compare All 50+ Cards
            <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
