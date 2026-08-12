"use client";

import { useState, useEffect } from "react";
import { Star, ShieldCheck, Quote } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  content: string;
}

export default function ReviewMarquee() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        // Take up to 10 latest reviews
        setReviews(data.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch reviews for marquee");
      }
    };
    fetchReviews();
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0b132b] overflow-hidden border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Thousands</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Hear what our verified customers have to say about their experience with us.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex gap-6 items-stretch px-3">
          {[...reviews, ...reviews].map((review, i) => (
            <div 
              key={`${review.id}-${i}`}
              className="w-[350px] shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm whitespace-normal flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'}`} />
                  ))}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{review.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 relative">
                  <Quote className="w-4 h-4 text-slate-200 dark:text-slate-700 inline-block mr-1 -mt-1" />
                  {review.content}
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center font-black text-emerald-600 dark:text-emerald-400 text-xs">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1">
                    {review.name}
                    <ShieldCheck className="w-3 h-3 text-blue-500" />
                  </p>
                  <p className="text-[10px] text-slate-500">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#0b132b] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#0b132b] to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
}
