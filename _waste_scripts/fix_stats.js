const fs = require('fs');

let content = fs.readFileSync('src/app/reviews/page.tsx', 'utf8');

const regex = /<div className="inline-flex flex-col md:flex-row items-center justify-start gap-8 md:gap-12 bg-white\/5 backdrop-blur-xl border border-white\/10 p-6 md:p-8 rounded-\[2rem\] shadow-2xl relative z-20 animate-float-soft">[\s\S]*?Genuine<\/div>\s*<\/div>\s*<\/div>/;

const newStats = `<div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mt-10 relative z-20">
                {/* Rating Card */}
                <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/20 blur-3xl rounded-full group-hover:bg-amber-400/30 transition-colors"></div>
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Rating</span>
                  </div>
                  <div className="text-4xl font-black text-white relative z-10">4.9<span className="text-2xl text-white/50 font-bold">/5</span></div>
                </div>

                {/* Clients Card */}
                <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-400/20 blur-3xl rounded-full group-hover:bg-emerald-400/30 transition-colors"></div>
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="flex -space-x-2">
                      {['bg-gradient-to-br from-emerald-400 to-emerald-600', 'bg-gradient-to-br from-teal-400 to-teal-600', 'bg-gradient-to-br from-green-400 to-green-600'].map((bg, i) => (
                        <div key={i} className={\`w-6 h-6 rounded-full border-2 border-emerald-900 \${bg} shadow-sm\`}></div>
                      ))}
                    </div>
                    <span className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Families</span>
                  </div>
                  <div className="text-4xl font-black text-white relative z-10">{totalCount}+</div>
                </div>

                {/* Genuine Card */}
                <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/20 blur-3xl rounded-full group-hover:bg-blue-400/30 transition-colors"></div>
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <span className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Authentic</span>
                  </div>
                  <div className="text-4xl font-black text-white relative z-10">100%</div>
                </div>
              </div>`;

content = content.replace(regex, newStats);

fs.writeFileSync('src/app/reviews/page.tsx', content);
console.log('Fixed Stats design!');
