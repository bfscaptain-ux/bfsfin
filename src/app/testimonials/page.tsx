"use client";

import { motion } from "framer-motion";
import { Star, Quote, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";

export default function TestimonialsPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stories = [
    { name: "Rahul Sharma", role: "Software Engineer", review: "Bhardwaj Financial Services got my HDFC home loan approved in just 4 days. The zero processing fee offer was completely genuine!", stars: 5 },
    { name: "Priya Patel", role: "Business Owner", review: "Being self-employed, I faced rejections from two banks. BFS analyzed my ITR perfectly and secured a loan from ICICI with an overdraft facility.", stars: 5 },
    { name: "Anand Verma", role: "Government Employee", review: "Excellent service! They transferred my existing expensive home loan to PNB at 8.40%. Saved me lakhs in interest.", stars: 5 },
    { name: "Sneha Gupta", role: "Doctor", review: "Very professional and transparent process. No hidden charges and complete support from documentation to disbursement.", stars: 5 }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-emerald-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full font-bold text-sm">
            <Heart className="w-4 h-4" /> 5,000+ Happy Families
          </motion.div>
          
          <motion.h1 {...fadeIn} className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600">Stories</span>
          </motion.h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 relative z-20 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {stories.map((story, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <Quote className="w-10 h-10 text-emerald-200 dark:text-emerald-900/50 mb-4" />
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic">"{story.review}"</p>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white">{story.name}</h4>
                  <p className="text-sm text-slate-500">{story.role}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(story.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
