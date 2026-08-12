"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Tag, Calendar, ChevronRight, FileText, Frown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogListClient({ initialBlogs, allTags }: { initialBlogs: any[], allTags: string[] }) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter logic
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase()) || 
                            (blog.excerpt && blog.excerpt.toLowerCase().includes(search.toLowerCase()));
      const matchesTag = selectedTag ? blog.tags?.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [initialBlogs, search, selectedTag]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 w-full flex flex-col md:flex-row gap-8 flex-1 relative z-20">
      
      {/* Sidebar / Filters */}
      <aside className="w-full md:w-72 shrink-0 space-y-6">
        {/* Search Box */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
          <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><Search className="w-4 h-4 text-emerald-500"/> Search</h3>
          <div className="relative">
            <input 
              type="text" 
              value={search}
              onChange={handleSearch}
              placeholder="Search articles, guides..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
            />
            <Search className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><Tag className="w-4 h-4 text-emerald-500"/> Popular Topics</h3>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleTagClick(null)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${!selectedTag ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              All Topics
            </button>
            {allTags.map(t => (
              <button 
                key={t}
                onClick={() => handleTagClick(t)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${selectedTag === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Blog Grid */}
      <div className="flex-1 min-h-[600px]">
        {filteredBlogs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center h-full"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Frown className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">No articles found</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">We couldn't find any articles matching your search criteria.</p>
            <button 
              onClick={() => { setSearch(""); setSelectedTag(null); }} 
              className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {paginatedBlogs.map((blog, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    key={blog.id} 
                    className="h-full"
                  >
                    <Link href={`/blogs/${blog.slug}`} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">
                      {/* Cover Image */}
                      <div className="aspect-[4/3] w-full bg-slate-100 relative overflow-hidden">
                        {blog.coverImage ? (
                          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center">
                            <FileText className="w-12 h-12 text-blue-200" />
                          </div>
                        )}
                        {blog.tags && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className="bg-white/95 backdrop-blur-sm shadow-sm text-blue-700 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                              {blog.tags.split(',')[0]}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="p-6 md:p-8 flex-1 flex flex-col bg-white">
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold mb-4">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald-500"/> {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">{blog.title}</h3>
                        <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-1 leading-relaxed">{blog.excerpt}</p>
                        
                        <div className="flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-700 mt-auto pt-4 border-t border-slate-50">
                          Read Full Article <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"/>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center gap-2 mt-16 pb-8">
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
