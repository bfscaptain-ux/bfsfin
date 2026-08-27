const fs = require('fs');
let content = fs.readFileSync('src/components/ReviewsSection.tsx', 'utf8');

content = content.replace(
  'import { Star, MapPin, X, PlusCircle } from "lucide-react";',
  'import { Star, MapPin, X, PlusCircle, ArrowRight } from "lucide-react";'
);

const oldButtons = `<div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
              <Link href="/reviews" className="flex items-center justify-center gap-2 bg-white dark:bg-emerald-900 hover:bg-slate-50 dark:hover:bg-emerald-800 text-slate-700 dark:text-white border-2 border-slate-200 dark:border-emerald-700 h-14 px-8 rounded-xl font-bold transition-all shadow-sm">
                See All Reviews
              </Link>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white h-14 px-8 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-600/30"
              >
                <PlusCircle className="w-5 h-5" />
                Write a Review
              </button>
            </div>`;

const newButtons = `<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <Link href="/reviews" className="group flex items-center justify-center gap-2 bg-white dark:bg-emerald-900 hover:bg-emerald-50 dark:hover:bg-emerald-800 text-slate-700 hover:text-emerald-700 dark:text-white border-2 border-slate-200 hover:border-emerald-200 dark:border-emerald-700 dark:hover:border-emerald-600 h-14 px-8 rounded-2xl font-bold transition-all duration-300 shadow-sm hover:shadow-md">
                See All Reviews
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-emerald-600 hover:border-emerald-500 h-14 px-8 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:-translate-y-0.5"
              >
                <PlusCircle className="w-5 h-5" />
                Write a Review
              </button>
            </div>`;

content = content.replace(oldButtons, newButtons);
fs.writeFileSync('src/components/ReviewsSection.tsx', content);
console.log('Updated Buttons!');
