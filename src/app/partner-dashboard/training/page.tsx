'use client';

import React from 'react';
import { BookOpen, Video, FileText, Download, PlayCircle } from 'lucide-react';

const courses = [
  { id: 1, title: 'Mastering Home Loans Sales', duration: '45 mins', type: 'Video', icon: Video },
  { id: 2, title: 'LAP Product Guidelines 2026', duration: 'Read', type: 'Document', icon: FileText },
  { id: 3, title: 'How to pitch Business Loans to MSMEs', duration: '30 mins', type: 'Video', icon: Video },
  { id: 4, title: 'Latest Interest Rates & Bank Offers', duration: 'Read', type: 'Document', icon: FileText },
];

export default function TrainingPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center">
          <BookOpen className="w-8 h-8 text-emerald-500 mr-3" />
          Training & Knowledge Center
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Enhance your skills with our curated courses and product guidelines.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Featured Video */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 relative group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>
          <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=1932&auto=format&fit=crop" alt="Training" className="w-full h-80 object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
          
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-20 h-20 bg-emerald-500/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-500/50">
              <PlayCircle className="w-12 h-12 text-emerald-400" />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 p-8 z-20">
            <span className="bg-rose-500 text-slate-900 dark:text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block shadow-[0_0_10px_rgba(244,63,94,0.5)]">Featured</span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">The Ultimate Guide to Selling Financial Products</h2>
            <p className="text-slate-700 dark:text-slate-300 font-medium max-w-2xl">Learn the top strategies used by our Platinum partners to convert leads into successful disbursals. Featuring real-world case studies and objection handling techniques.</p>
          </div>
        </div>

        {/* Resources Grid */}
        {courses.map(course => (
          <div key={course.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 flex items-start hover:border-emerald-500/30 transition-colors group">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 mr-5 border
              ${course.type === 'Video' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}
            `}>
              <course.icon className="w-8 h-8" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-400 transition-colors">{course.title}</h3>
              <div className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-500 mb-4">
                <span>{course.type}</span>
                <span className="mx-2">•</span>
                <span>{course.duration}</span>
              </div>
              
              <button className="text-sm font-bold flex items-center transition-colors
                ${course.type === 'Video' ? 'text-blue-400 hover:text-blue-300' : 'text-emerald-400 hover:text-emerald-300'}
              ">
                {course.type === 'Video' ? (
                  <><PlayCircle className="w-4 h-4 mr-2" /> Watch Now</>
                ) : (
                  <><Download className="w-4 h-4 mr-2" /> Download PDF</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
