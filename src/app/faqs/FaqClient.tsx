"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Tag, ChevronRight, HelpCircle, Frown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqClient({ initialFaqs, allCategories }: { initialFaqs: any[], allCategories: string[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter logic
  const filteredFaqs = useMemo(() => {
    return initialFaqs.filter((faq) => {
      const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory ? faq.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [initialFaqs, search, selectedCategory]);

  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
  const paginatedFaqs = filteredFaqs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 w-full flex flex-col md:flex-row gap-8 flex-1 relative z-20">
      
      {/* Sidebar / Filters */}
      <aside className="w-full md:w-80 shrink-0 space-y-6">
        {/* Search Box */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
          <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
            <Search className="w-4 h-4 text-purple-500"/> Find Answers
          </h3>
          <div className="relative">
            <input 
              type="text" 
              value={search}
              onChange={handleSearch}
              placeholder="Search by keyword..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 focus:outline-none transition-all"
            />
            <Search className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
            <Tag className="w-4 h-4 text-purple-500"/> Categories
          </h3>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => handleCategoryClick(null)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${!selectedCategory ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 pl-6' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              All Questions
            </button>
            {allCategories.map(c => (
              <button 
                key={c}
                onClick={() => handleCategoryClick(c)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${selectedCategory === c ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 pl-6' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* FAQ List */}
      <div className="flex-1 min-h-[600px]">
        {filteredFaqs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center h-full"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Frown className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">No answers found</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">We couldn't find any FAQs matching your search criteria.</p>
            <button 
              onClick={() => { setSearch(""); setSelectedCategory(null); }} 
              className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-purple-600 transition-colors shadow-lg"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {paginatedFaqs.map((faq, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: idx * 0.02 }}
                    key={faq.id} 
                    className="h-full"
                  >
                    <Link href={`/faqs/${faq.slug}`} className="group bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <HelpCircle className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-purple-700 transition-colors leading-snug line-clamp-2 pt-1">{faq.question}</h3>
                      </div>
                      
                      <div className="text-slate-500 text-sm mb-6 line-clamp-3 pl-14 flex-1">
                        <div dangerouslySetInnerHTML={{ __html: faq.answer.substring(0, 150) + "..." }} />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-slate-50 pl-14">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">{faq.category}</span>
                        <span className="font-bold text-purple-600 group-hover:text-purple-700 flex items-center">
                          View Answer <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"/>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center gap-2 mt-12 pb-8">
                <button 
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-4 h-12 flex items-center justify-center rounded-2xl font-bold transition-all duration-300 bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:pointer-events-none"
                >
                  First
                </button>
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl font-bold transition-all duration-300 bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:pointer-events-none"
                >
                  &lt;
                </button>

                {(() => {
                  let start = Math.max(1, currentPage - 2);
                  let end = Math.min(totalPages, currentPage + 2);
                  if (currentPage <= 3) end = Math.min(totalPages, 5);
                  if (currentPage >= totalPages - 2) start = Math.max(1, totalPages - 4);
                  
                  const pages = [];
                  for (let i = start; i <= end; i++) pages.push(i);
                  
                  return pages.map((pageNum) => (
                    <button 
                      key={pageNum} 
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-12 h-12 flex items-center justify-center rounded-2xl font-black transition-all duration-300 ${currentPage === pageNum ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-110' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                      {pageNum}
                    </button>
                  ));
                })()}

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl font-bold transition-all duration-300 bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:pointer-events-none"
                >
                  &gt;
                </button>
                <button 
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-4 h-12 flex items-center justify-center rounded-2xl font-bold transition-all duration-300 bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Last
                </button>
              </div>
            )}
          </>
        )}
      </div>

    </section>
  );
}
