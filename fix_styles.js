const fs = require('fs');
let content = fs.readFileSync('src/components/ReviewsSection.tsx', 'utf8');

// 1. Fix Button heights and alignment
content = content.replace(
  '<Link href="/reviews" className="flex items-center justify-center gap-2 bg-white dark:bg-emerald-900 hover:bg-slate-50 dark:hover:bg-emerald-800 text-slate-700 dark:text-white border border-slate-200 dark:border-emerald-700 px-6 py-3 rounded-xl font-bold transition-all shadow-sm">',
  '<Link href="/reviews" className="flex items-center justify-center gap-2 bg-white dark:bg-emerald-900 hover:bg-slate-50 dark:hover:bg-emerald-800 text-slate-700 dark:text-white border-2 border-slate-200 dark:border-emerald-700 h-14 px-8 rounded-xl font-bold transition-all shadow-sm">'
);

content = content.replace(
  'className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-600/30"',
  'className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white h-14 px-8 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-600/30"'
);

// 2. Fix Marquee jumping issue by switching from gap to margin-right
content = content.replace(
  '<div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] gap-8">',
  '<div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">'
);
content = content.replace(
  '<Link href={`/reviews/${review.id}`} key={review.id + index} className="block cursor-pointer w-[85vw] max-w-[350px] shrink-0 h-[280px] bg-white dark:bg-emerald-900 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm hover:shadow-lg transition-all duration-300 relative">',
  '<Link href={`/reviews/${review.id}`} key={review.id + index} className="mr-8 block cursor-pointer w-[85vw] max-w-[350px] shrink-0 h-[280px] bg-white dark:bg-emerald-900 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm hover:shadow-lg transition-all duration-300 relative">'
);

// Fix the skeleton loader too
content = content.replace(
  '<div className="flex gap-8 overflow-hidden">',
  '<div className="flex overflow-hidden">'
);
content = content.replace(
  '<div key={i} className="w-[85vw] max-w-[350px] shrink-0 h-[280px] bg-white dark:bg-emerald-900 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm animate-pulse relative">',
  '<div key={i} className="mr-8 w-[85vw] max-w-[350px] shrink-0 h-[280px] bg-white dark:bg-emerald-900 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm animate-pulse relative">'
);


fs.writeFileSync('src/components/ReviewsSection.tsx', content);
console.log('Fixed Buttons and Marquee!');
