const fs = require('fs');

let content = fs.readFileSync('src/app/reviews/page.tsx', 'utf8');

if (!content.includes('Users')) {
  content = content.replace(
    'import { Star, MapPin, ArrowLeft, ShieldCheck, ThumbsUp } from "lucide-react";',
    'import { Star, MapPin, ArrowLeft, ShieldCheck, ThumbsUp, Users } from "lucide-react";'
  );
}

const regex = /<div className="flex flex-wrap items-center gap-6 sm:gap-10 mt-10 relative z-20">[\s\S]*?Authentic<\/span>\s*<\/div>\s*<\/div>/;

const newStats = `<div className="inline-flex flex-wrap items-center gap-4 sm:gap-6 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3.5 rounded-full shadow-lg relative z-20 mt-8 animate-float-soft">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-black text-sm sm:text-base tracking-wide">4.9/5.0 <span className="text-emerald-100/70 font-medium ml-1">Rating</span></span>
                </div>
                
                <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block"></div>
                
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-300" />
                  <span className="text-white font-black text-sm sm:text-base tracking-wide">{totalCount}+ <span className="text-emerald-100/70 font-medium ml-1">Families</span></span>
                </div>
                
                <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block"></div>
                
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-300" />
                  <span className="text-white font-black text-sm sm:text-base tracking-wide">100% <span className="text-emerald-100/70 font-medium ml-1">Genuine</span></span>
                </div>
              </div>`;

content = content.replace(regex, newStats);
fs.writeFileSync('src/app/reviews/page.tsx', content);
console.log('Fixed Stats to slim pill!');
