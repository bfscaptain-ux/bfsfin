const fs = require('fs');

let content = fs.readFileSync('src/app/reviews/page.tsx', 'utf8');

const regex = /<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-8 relative z-20 animate-in fade-in slide-in-from-left-8 duration-700 delay-200">[\s\S]*?Genuine<\/span>\s*<\/div>\s*<\/div>/;

const premiumStats = `<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-8 relative z-20 animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
                
                {/* 5 Solid Stars */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5 drop-shadow-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-white font-black text-xl">{averageRating}<span className="text-white/50 text-base font-bold">/5</span></span>
                </div>
                
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 hidden sm:block"></div>
                
                {/* Micro Avatar Stack */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 drop-shadow-md">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 border-2 border-emerald-900 flex items-center justify-center text-[9px] font-black text-emerald-950">A</div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-300 to-teal-500 border-2 border-emerald-900 flex items-center justify-center text-[9px] font-black text-teal-950">S</div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 border-2 border-emerald-900 flex items-center justify-center text-[9px] font-black text-cyan-950">R</div>
                  </div>
                  <span className="text-white font-black text-xl">{totalCount} <span className="text-emerald-200/80 font-bold text-sm tracking-widest uppercase ml-1">Families</span></span>
                </div>
                
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 hidden sm:block"></div>
                
                {/* Solid Glowing Checkmark */}
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.6)]">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-white font-black text-xl">100% <span className="text-emerald-200/80 font-bold text-sm tracking-widest uppercase ml-1">Genuine</span></span>
                </div>
                
              </div>`;

content = content.replace(regex, premiumStats);
fs.writeFileSync('src/app/reviews/page.tsx', content);
console.log('Upgraded to premium bespoke badges!');
