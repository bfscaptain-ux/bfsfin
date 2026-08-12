"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase, ChevronRight, Tag, Frown, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CareersClient({ initialJobs, departments }: { initialJobs: any[], departments: string[] }) {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter logic
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                            job.location.toLowerCase().includes(search.toLowerCase());
      const matchesDept = selectedDept ? job.department === selectedDept : true;
      return matchesSearch && matchesDept;
    });
  }, [initialJobs, search, selectedDept]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleDeptClick = (dept: string | null) => {
    setSelectedDept(dept);
    setCurrentPage(1);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 w-full flex flex-col md:flex-row gap-8 flex-1 relative z-20">
      
      {/* Sidebar / Filters */}
      <aside className="w-full md:w-80 shrink-0 space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
          <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-500"/> Find Roles
          </h3>
          <div className="relative">
            <input 
              type="text" 
              value={search}
              onChange={handleSearch}
              placeholder="Search by title or location..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
            />
            <Search className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
            <Tag className="w-4 h-4 text-blue-500"/> Departments
          </h3>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => handleDeptClick(null)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${!selectedDept ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 pl-6' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              All Departments
            </button>
            {departments.map(dept => (
              <button 
                key={dept}
                onClick={() => handleDeptClick(dept)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${selectedDept === dept ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 pl-6' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Jobs List */}
      <div className="flex-1 min-h-[600px]">
        {filteredJobs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center h-full"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Frown className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">No jobs found</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">We couldn't find any open positions matching your search criteria.</p>
            <button 
              onClick={() => { setSearch(""); setSelectedDept(null); }} 
              className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 gap-4">
              <AnimatePresence mode="popLayout">
                {paginatedJobs.map((job, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: idx * 0.02 }}
                    key={job.id} 
                  >
                    <Link href={`/careers/${job.slug}`} className="group bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6">
                      
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Briefcase className="w-7 h-7" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {job.location}</span>
                          <span className="flex items-center gap-1.5"><Tag className="w-4 h-4"/> {job.department}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> {job.type}</span>
                        </div>
                      </div>

                      <div className="shrink-0 mt-4 md:mt-0">
                        <span className="inline-flex items-center justify-center px-6 py-3 bg-slate-50 group-hover:bg-blue-600 text-slate-600 group-hover:text-white font-bold rounded-xl transition-colors">
                          View Details <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"/>
                        </span>
                      </div>
                      
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination with Smart Window */}
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
