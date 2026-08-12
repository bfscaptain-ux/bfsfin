"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Heart, Loader2, ChevronLeft, ChevronRight, Banknote, ShieldCheck, PlayCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  stars: number;
  quote: string;
  loanAmount: string;
  bankName: string;
  slug?: string;
  videoUrl?: string;
  photoUrl?: string;
}

export default function TestimonialsPage() {
  const [stories, setStories] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStories = async (p = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/testimonials?page=${p}&limit=10`);
      const data = await res.json();
      setStories(data.data);
      setTotalPages(data.meta.totalPages || 1);
      setPage(p);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-900 dark:to-[#0b132b] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full font-bold text-sm">
            <Heart className="w-4 h-4" /> 5,000+ Happy Families
          </motion.div>
          
          <motion.h1 {...fadeIn} className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Stories</span>
          </motion.h1>
          <motion.p {...fadeIn} className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Real experiences from real customers. See how we've helped thousands of families secure their dream homes with zero hidden fees.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20">
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {stories.map((story, idx) => (
                <motion.div 
                  key={story.id}
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 rounded-[2rem] p-8 shadow-lg hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                    <Quote className="w-32 h-32 text-slate-900 dark:text-white" />
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex gap-1">
                      {[...Array(story.stars)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                      ))}
                    </div>
                    <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-emerald-100 dark:border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                    {story.videoUrl && (
                      <span className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-blue-100 dark:border-blue-500/20">
                        <PlayCircle className="w-3 h-3" /> Video Review
                      </span>
                    )}
                  </div>

                  <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic flex-grow relative z-10 font-medium">
                    "{story.quote}"
                  </p>

                  {story.videoUrl ? (
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 relative z-10 aspect-video">
                      <video 
                        src={story.videoUrl} 
                        className="w-full h-full object-cover absolute inset-0 bg-black"
                        controls
                        controlsList="nodownload"
                      ></video>
                    </div>
                  ) : story.photoUrl ? (
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 relative z-10 aspect-video">
                      <img 
                        src={story.photoUrl} 
                        alt={`${story.name}'s Testimonial`} 
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    </div>
                  ) : null}
                  
                  <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap gap-4 items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/40 dark:to-blue-900/40 flex items-center justify-center font-black text-slate-700 dark:text-white shadow-inner border border-white/50 dark:border-slate-700/50 text-lg">
                        {story.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white text-lg">{story.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{story.role} • {story.location}</p>
                      </div>
                    </div>

                    {(story.loanAmount || story.bankName) && (
                      <div className="bg-slate-50 dark:bg-slate-950/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800 text-right min-w-[120px]">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center justify-end gap-1">
                          <Banknote className="w-3 h-3" /> Loan Details
                        </p>
                        <p className="font-black text-emerald-600 dark:text-emerald-400 text-lg leading-none">{story.loanAmount}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">{story.bankName}</p>
                      </div>
                    )}
                  </div>

                  {story.slug && (
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/50 relative z-10 flex justify-end">
                      <Link 
                        href={`/testimonials/${story.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group/link"
                      >
                        Read Full Story <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              ))}

              {stories.length === 0 && (
                <div className="col-span-1 md:col-span-2 text-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                  <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">More success stories coming soon...</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-16">
                <button 
                  onClick={() => fetchStories(page - 1)} 
                  disabled={page === 1}
                  className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2 font-bold text-slate-500">
                  <span className="w-8 h-8 flex items-center justify-center bg-emerald-600 text-white rounded-lg shadow-md">
                    {page}
                  </span>
                  <span className="text-slate-400 mx-1">of</span>
                  <span className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    {totalPages}
                  </span>
                </div>
                <button 
                  onClick={() => fetchStories(page + 1)} 
                  disabled={page === totalPages}
                  className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
