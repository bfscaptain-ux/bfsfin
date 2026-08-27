const fs = require('fs');

let content = fs.readFileSync('src/app/reviews/page.tsx', 'utf8');

const regex = /<div className="inline-flex flex-wrap items-center gap-4 sm:gap-6 bg-white\/5 backdrop-blur-xl border border-white\/10 px-6 py-3.5 rounded-full shadow-lg relative z-20 mt-8 animate-float-soft">[\s\S]*?Genuine<\/span><\/span>\s*<\/div>\s*<\/div>/;

const noBorderStats = `<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-8 relative z-20 animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
                <div className="flex items-center gap-2.5">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-white font-black text-xl">4.9<span className="text-white/60 text-base">/5</span></span>
                  <span className="text-emerald-200/90 font-bold text-sm tracking-widest uppercase ml-1">Rating</span>
                </div>
                
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 hidden sm:block shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                
                <div className="flex items-center gap-2.5">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-black text-xl">{totalCount}+</span>
                  <span className="text-emerald-200/90 font-bold text-sm tracking-widest uppercase ml-1">Families</span>
                </div>
                
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 hidden sm:block shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-black text-xl">100%</span>
                  <span className="text-emerald-200/90 font-bold text-sm tracking-widest uppercase ml-1">Genuine</span>
                </div>
              </div>`;

content = content.replace(regex, noBorderStats);

fs.writeFileSync('src/app/reviews/page.tsx', content);
console.log('Removed all borders completely!');
