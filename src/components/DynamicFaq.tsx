"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function DynamicFaq({ category = "all" }: { category?: string }) {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        // Fetch all published FAQs
        const res = await fetch(`/api/faqs?limit=100&t=${Date.now()}`);
        const data = await res.json();
        
        let fetchedFaqs = data.data || [];
        
        // Filter out drafts
        fetchedFaqs = fetchedFaqs.filter((f: any) => {
           const status = (f.status || 'Published').toLowerCase();
           return status === 'published' || status === 'published';
        });
        
        // Filter by category if specific category is requested
        if (category !== "all") {
          fetchedFaqs = fetchedFaqs.filter((f: any) => {
            const faqCat = (f.category || 'General').toLowerCase();
            return faqCat === category.toLowerCase();
          });
        }
        
        setFaqs(fetchedFaqs);
      } catch (err) {
        console.error("Failed to fetch FAQs");
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, [category]);

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1,2,3,4].map(i => <div key={i} className="h-16 bg-slate-100 dark:bg-emerald-900/50 rounded-xl"></div>)}
      </div>
    );
  }

  if (faqs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <details key={faq.id || idx} className="group bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-slate-900 dark:text-white font-bold text-sm">
            {faq.question}
            <span className="shrink-0 text-slate-500 group-open:-rotate-180 transition-transform duration-300">
              <ChevronDown className="w-4 h-4" />
            </span>
          </summary>
          <div 
            className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: faq.answer }}
          />
        </details>
      ))}
    </div>
  );
}
