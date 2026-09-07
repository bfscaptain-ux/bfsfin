const fs = require('fs');

let content = fs.readFileSync('src/app/reviews/page.tsx', 'utf8');

const regex = /<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-8 relative z-20 animate-in fade-in slide-in-from-left-8 duration-700 delay-200">[\s\S]*?Genuine<\/span>\s*<\/div>\s*<\/div>/;

const pristineStats = `<div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 mt-10 relative z-20 animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
                
                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-1 drop-shadow-md bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-white font-black text-2xl leading-none tracking-tight">{averageRating}<span className="text-white/50 text-lg">/5</span></span>
                    <span className="text-emerald-200/70 text-[10px] tracking-[0.2em] uppercase font-bold mt-1">Average Rating</span>
                  </div>
                </div>
                
                <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
                
                {/* Families */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2 drop-shadow-md">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 border-2 border-emerald-900 flex items-center justify-center text-[10px] font-black text-emerald-950 shadow-md z-30">A</div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-300 to-teal-500 border-2 border-emerald-900 flex items-center justify-center text-[10px] font-black text-teal-950 shadow-md z-20">S</div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 border-2 border-emerald-900 flex items-center justify-center text-[10px] font-black text-cyan-950 shadow-md z-10">R</div>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-white font-black text-2xl leading-none tracking-tight">{totalCount}</span>
                    <span className="text-emerald-200/70 text-[10px] tracking-[0.2em] uppercase font-bold mt-1">Happy Families</span>
                  </div>
                </div>
                
                <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
                
                {/* Genuine */}
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.6)] border-2 border-emerald-900">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-white font-black text-2xl leading-none tracking-tight">100%</span>
                    <span className="text-emerald-200/70 text-[10px] tracking-[0.2em] uppercase font-bold mt-1">Genuine Reviews</span>
                  </div>
                </div>
                
              </div>`;

content = content.replace(regex, pristineStats);
fs.writeFileSync('src/app/reviews/page.tsx', content);
console.log('Fixed typography and alignment!');
