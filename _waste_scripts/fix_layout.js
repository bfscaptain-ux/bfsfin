const fs = require('fs');

let content = fs.readFileSync('src/app/reviews/page.tsx', 'utf8');

// Replace pt-28 pb-48 with pt-32 pb-56 for a bigger hero
content = content.replace('pt-28 pb-48', 'pt-36 pb-64');

const regex = /<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">[\s\S]*?Genuine<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

const newLayout = `<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-50 to-emerald-200 mb-6 tracking-tight drop-shadow-sm">
                Client Success Stories
              </h1>
              <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto lg:mx-0 font-medium mb-12 leading-relaxed">
                Don't just take our word for it. See why {totalCount}+ families trust Bhardwaj Financial Services with their dreams.
              </p>

              <div className="inline-flex flex-col md:flex-row items-center justify-start gap-8 md:gap-12 bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-2xl relative z-20 animate-float-soft">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-800/80 flex items-center justify-center shadow-inner ring-1 ring-white/10">
                    <Star className="w-7 h-7 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-black text-white">4.9/5.0</div>
                    <div className="text-emerald-200 text-xs font-bold uppercase tracking-widest mt-1">Average Rating</div>
                  </div>
                </div>
                
                <div className="hidden md:block w-px h-16 bg-white/10"></div>
                
                <div className="flex items-center gap-5">
                  <div className="flex -space-x-4">
                    {['R', 'S', 'A', 'P'].map((initial, i) => (
                      <div key={i} className={\`w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg ring-4 ring-emerald-900 shadow-md \${['bg-blue-500', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500'][i]}\`}>
                        {initial}
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-black text-white">{totalCount}+</div>
                    <div className="text-emerald-200 text-xs font-bold uppercase tracking-widest mt-1">Happy Families</div>
                  </div>
                </div>
                
                <div className="hidden md:block w-px h-16 bg-white/10"></div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-800/80 flex items-center justify-center shadow-inner ring-1 ring-white/10">
                    <ShieldCheck className="w-7 h-7 text-emerald-300" />
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-black text-white">100%</div>
                    <div className="text-emerald-200 text-xs font-bold uppercase tracking-widest mt-1">Genuine</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Large Logo */}
            <div className="hidden lg:flex justify-end items-center animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-[100px] rounded-full"></div>
                <img src="/logo.png" alt="BFS Official" className="relative z-10 w-full max-w-[450px] h-auto object-contain brightness-0 invert opacity-90 drop-shadow-2xl animate-float-soft" style={{ animationDelay: '1s' }} />
              </div>
            </div>

          </div>
        </div>`;

content = content.replace(regex, newLayout);

fs.writeFileSync('src/app/reviews/page.tsx', content);
console.log('Fixed hero layout!');
