const fs = require('fs');
let content = fs.readFileSync('src/components/ReviewsSection.tsx', 'utf8');

const oldBtn = `<button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-600/30"
            >
              <PlusCircle className="w-5 h-5" />
              Write a Review
            </button>`;

const newBtnGroup = `<div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
              <Link href="/reviews" className="flex items-center justify-center gap-2 bg-white dark:bg-emerald-900 hover:bg-slate-50 dark:hover:bg-emerald-800 text-slate-700 dark:text-white border border-slate-200 dark:border-emerald-700 px-6 py-3 rounded-xl font-bold transition-all shadow-sm">
                See All Reviews
              </Link>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-600/30"
              >
                <PlusCircle className="w-5 h-5" />
                Write a Review
              </button>
            </div>`;

content = content.replace(oldBtn, newBtnGroup);
fs.writeFileSync('src/components/ReviewsSection.tsx', content);
console.log('Button added!');
