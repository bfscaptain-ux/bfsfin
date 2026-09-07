const fs = require('fs');

let content = fs.readFileSync('src/components/InteractiveReviewGrid.tsx', 'utf8');

const regex = /<div className="bg-white\/10 dark:bg-emerald-950\/80 backdrop-blur-xl border border-white\/20 dark:border-emerald-800\/50 p-2 sm:p-4 rounded-2xl md:rounded-full shadow-2xl mb-12 flex flex-col md:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const pristineSearchBar = `<div className="bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 p-2 rounded-2xl md:rounded-full shadow-xl mb-12 flex flex-col md:flex-row items-center gap-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 relative z-40">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-emerald-500" />
          <input 
            type="text" 
            placeholder="Search reviews by name or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-emerald-500/70 py-3.5 pl-14 pr-4 outline-none font-medium"
          />
        </div>
        
        <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-emerald-800"></div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto px-2 pb-2 md:pb-0 hide-scrollbar shrink-0">
          {[0, 5, 4].map(stars => (
            <button 
              key={stars}
              onClick={() => setRatingFilter(stars)}
              className={\`px-5 py-2.5 text-sm font-bold rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap \${ratingFilter === stars ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 dark:bg-emerald-950/50 text-slate-600 dark:text-emerald-300 hover:bg-slate-200 dark:hover:bg-emerald-800'}\`}
            >
              {stars === 0 ? 'All Reviews' : <><Star className="w-4 h-4 fill-current" /> {stars}+ Stars</>}
            </button>
          ))}
        </div>
      </div>`;

content = content.replace(regex, pristineSearchBar);

fs.writeFileSync('src/components/InteractiveReviewGrid.tsx', content);
console.log('Fixed search bar design!');
