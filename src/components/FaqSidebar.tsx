"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { FAQ } from "@/types/faq";

export default function FaqSidebar({ allFaqs, currentSlug }: { allFaqs: FAQ[], currentSlug: string }) {
  const [search, setSearch] = useState("");

  const filteredFaqs = allFaqs.filter(f => 
    f.status !== 'draft' && 
    (f.question.toLowerCase().includes(search.toLowerCase()) || 
     (f.category || 'General').toLowerCase().includes(search.toLowerCase()))
  );

  const groupedFaqs = filteredFaqs.reduce((acc: any, f: any) => {
    const cat = f.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(f);
    return acc;
  }, {});

  return (
    <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-28 h-fit lg:max-h-[calc(100vh-8rem)] overflow-y-auto hidden lg:block pr-6 hide-scrollbar flex flex-col">
      <div className="mb-6">
        <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition">
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Search
        </Link>
      </div>
      
      <h3 className="font-black text-xl text-slate-900 dark:text-white mb-4">
        Browse Topics
      </h3>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Filter questions..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-emerald-900/50 border border-slate-200 dark:border-emerald-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-medium text-slate-800 dark:text-slate-200"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-6">
        {Object.keys(groupedFaqs).length === 0 ? (
          <div className="text-slate-500 text-sm italic">No matching questions found.</div>
        ) : (
          Object.entries(groupedFaqs).map(([cat, faqsList]: [string, any]) => (
            <div key={cat}>
              <h4 className="text-emerald-600 dark:text-emerald-400 font-bold mb-3 uppercase tracking-wider text-[11px]">
                {cat}
              </h4>
              <ul className="space-y-1">
                {faqsList.map((f: any) => {
                  const isActive = f.slug === currentSlug;
                  return (
                    <li key={f.id}>
                      <Link 
                        href={`/faq/${f.slug}`} 
                        className={`text-sm block py-2 px-3 rounded-lg transition-all leading-snug ${
                          isActive 
                            ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold border-l-4 border-emerald-500' 
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-emerald-900/30'
                        }`}
                      >
                        {f.question}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
