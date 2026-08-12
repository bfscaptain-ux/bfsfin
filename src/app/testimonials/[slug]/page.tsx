"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Quote, ShieldCheck, Banknote, Calendar, Landmark, ArrowLeft, Loader2, Play } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  stars: number;
  quote: string;
  detail: string;
  challenge?: string;
  solution?: string;
  result?: string;
  loanAmount: string;
  daysTaken: string;
  bankName: string;
  rate: string;
  videoUrl?: string;
  photoUrl?: string;
  createdAt: string;
}

export default function SingleTestimonialPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [story, setStory] = useState<Testimonial | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(`/api/testimonials/slug/${slug}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setStory(data);
      } catch (error) {
        console.error(error);
        router.push("/testimonials");
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchStory();
  }, [slug, router]);


  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b132b]">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!story) return null;


  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-emerald-500/20 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-blue-500/20 blur-[100px]"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Link href="/testimonials" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-8 font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back to all stories
          </Link>
          
          <motion.div {...fadeIn} className="flex justify-center mb-6">
            <div className="flex gap-1 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              {[...Array(story.stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-8"
          >
            "{story.quote}"
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 text-emerald-100"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center font-black text-white text-2xl shadow-xl">
              {story.name.charAt(0)}
            </div>
            <div className="text-left">
              <div className="font-bold text-xl">{story.name}</div>
              <div className="text-emerald-300/80 text-sm flex items-center gap-2">
                {story.role} from {story.location}
                <span className="flex items-center gap-1 bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300 text-xs">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {story.videoUrl ? (
              <div className="bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800 aspect-video relative group">
                <video 
                  src={story.videoUrl} 
                  className="w-full h-full object-cover absolute inset-0 bg-black"
                  controls
                  controlsList="nodownload"
                ></video>
              </div>
            ) : story.photoUrl ? (
              <div className="bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800 aspect-video relative group">
                <img 
                  src={story.photoUrl} 
                  alt={`${story.name}'s Testimonial`} 
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>
            ) : null}

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 sm:p-10 shadow-xl border border-slate-200 dark:border-slate-800 relative">
              <Quote className="absolute top-8 right-8 w-16 h-16 text-slate-100 dark:text-slate-800/50" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 relative z-10">The Full Story</h3>
              
              <div className="space-y-8 relative z-10">
                {story.challenge && (
                  <div className="bg-amber-50 dark:bg-amber-500/10 border-l-4 border-amber-500 p-6 rounded-r-2xl">
                    <h4 className="text-amber-800 dark:text-amber-400 font-bold text-lg mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-500/30 flex items-center justify-center text-xs">1</span> 
                      The Challenge
                    </h4>
                    <p className="text-amber-900/80 dark:text-amber-200/80 leading-relaxed font-medium">
                      {story.challenge}
                    </p>
                  </div>
                )}

                {story.solution && (
                  <div className="bg-blue-50 dark:bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-r-2xl">
                    <h4 className="text-blue-800 dark:text-blue-400 font-bold text-lg mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-500/30 flex items-center justify-center text-xs">2</span> 
                      The Solution
                    </h4>
                    <p className="text-blue-900/80 dark:text-blue-200/80 leading-relaxed font-medium">
                      {story.solution}
                    </p>
                  </div>
                )}

                {story.result && (
                  <div className="bg-emerald-50 dark:bg-emerald-500/10 border-l-4 border-emerald-500 p-6 rounded-r-2xl">
                    <h4 className="text-emerald-800 dark:text-emerald-400 font-bold text-lg mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-200 dark:bg-emerald-500/30 flex items-center justify-center text-xs">3</span> 
                      The Result
                    </h4>
                    <p className="text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed font-medium">
                      {story.result}
                    </p>
                  </div>
                )}

                {/* Fallback to normal detail if they only filled detail */}
                {!story.challenge && !story.solution && !story.result && story.detail && (
                  <div className="prose prose-lg dark:prose-invert prose-emerald max-w-none text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed font-medium">
                    {story.detail}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar / Loan Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-900 rounded-[2rem] p-8 shadow-xl border border-emerald-100 dark:border-emerald-900/30">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-emerald-200 dark:border-emerald-800/50 pb-4">
                Loan Breakdown
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Sanctioned Amount</div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">{story.loanAmount || "N/A"}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-1">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Bank</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">{story.bankName || "N/A"}</div>
                    {story.rate && <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-1">@ {story.rate} ROI</div>}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-1">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Time Taken</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">{story.daysTaken || "Super Fast"}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden text-center border border-slate-800">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-blue-600/20"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-4">Want a similar experience?</h3>
                <p className="text-slate-300 mb-6 text-sm">Let our experts secure the best loan deal for you, completely hassle-free.</p>
                <Link 
                  href="/apply" 
                  className="block w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 rounded-xl transition-colors text-lg"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </motion.div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
