const fs = require('fs');
let content = fs.readFileSync('src/app/reviews/page.tsx', 'utf8');

const regex = /<div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mt-10 relative z-20">[\s\S]*?100%<\/div>\s*<\/div>\s*<\/div>/;

const smallerStats = `<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl mt-8 relative z-20">
                {/* Rating Card */}
                <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform text-left">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-400/20 blur-2xl rounded-full group-hover:bg-amber-400/30 transition-colors"></div>
                  <div className="flex items-center gap-2 mb-2 relative z-10">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-emerald-100 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Rating</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-white relative z-10">4.9<span className="text-sm md:text-lg text-white/50 font-bold">/5</span></div>
                </div>

                {/* Clients Card */}
                <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform text-left">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-400/20 blur-2xl rounded-full group-hover:bg-emerald-400/30 transition-colors"></div>
                  <div className="flex items-center gap-2 mb-2 relative z-10">
                    <div className="flex -space-x-1.5">
                      {['bg-gradient-to-br from-emerald-400 to-emerald-600', 'bg-gradient-to-br from-teal-400 to-teal-600', 'bg-gradient-to-br from-green-400 to-green-600'].map((bg, i) => (
                        <div key={i} className={\`w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-emerald-900 \${bg} shadow-sm\`}></div>
                      ))}
                    </div>
                    <span className="text-emerald-100 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Families</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-white relative z-10">{totalCount}+</div>
                </div>

                {/* Genuine Card */}
                <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform text-left">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-400/20 blur-2xl rounded-full group-hover:bg-blue-400/30 transition-colors"></div>
                  <div className="flex items-center gap-2 mb-2 relative z-10">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span className="text-emerald-100 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Authentic</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-white relative z-10">100%</div>
                </div>
              </div>`;

content = content.replace(regex, smallerStats);

fs.writeFileSync('src/app/reviews/page.tsx', content);
console.log('Stats size reduced!');
