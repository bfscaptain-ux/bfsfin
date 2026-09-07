const fs = require('fs');
let content = fs.readFileSync('src/app/reviews/page.tsx', 'utf8');

const regex = /<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl mt-8 relative z-20">[\s\S]*?100%<\/div>\s*<\/div>\s*<\/div>/;

const minimalistStats = `<div className="flex flex-wrap items-center gap-6 sm:gap-10 mt-10 relative z-20">
                {/* Rating */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="text-4xl font-bold text-white tracking-tight">4.9<span className="text-xl text-emerald-100/50 font-medium">/5</span></span>
                  </div>
                  <span className="text-emerald-200/70 text-[11px] tracking-[0.2em] uppercase font-bold pl-7">Average Rating</span>
                </div>
                
                <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
                
                {/* Clients */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex -space-x-2">
                      {['bg-emerald-400', 'bg-teal-400', 'bg-emerald-500'].map((bg, i) => (
                        <div key={i} className={\`w-6 h-6 rounded-full border-2 border-emerald-950 \${bg}\`}></div>
                      ))}
                    </div>
                    <span className="text-4xl font-bold text-white tracking-tight">{totalCount}+</span>
                  </div>
                  <span className="text-emerald-200/70 text-[11px] tracking-[0.2em] uppercase font-bold pl-9">Happy Families</span>
                </div>

                <div className="w-px h-12 bg-white/10 hidden sm:block"></div>

                {/* Genuine */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <span className="text-4xl font-bold text-white tracking-tight">100%</span>
                  </div>
                  <span className="text-emerald-200/70 text-[11px] tracking-[0.2em] uppercase font-bold pl-7">Authentic</span>
                </div>
              </div>`;

content = content.replace(regex, minimalistStats);

fs.writeFileSync('src/app/reviews/page.tsx', content);
console.log('Switched to minimalist stats!');
