const fs = require('fs');
let content = fs.readFileSync('src/components/ReviewsSection.tsx', 'utf8');

const oldStart = '{/* Reviews Marquee - Full Width */}';
const oldEnd = '{/* Fading Edges for Marquee effect */}';

const startIndex = content.indexOf(oldStart);
const endIndex = content.indexOf(oldEnd);

const newBlock = `{/* Reviews Marquee - Full Width */}
        <div className="relative overflow-hidden w-full py-4 group">
          {loading && page === 1 ? (
            <div className="flex gap-8 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-[85vw] max-w-[350px] shrink-0 h-[280px] bg-white dark:bg-emerald-900 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm animate-pulse relative">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map((_, idx) => <div key={idx} className="w-4 h-4 bg-slate-200 dark:bg-emerald-800 rounded-sm" />)}
                  </div>
                  <div className="h-4 bg-slate-200 dark:bg-emerald-800 rounded mb-3 w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-emerald-800 rounded mb-3 w-5/6" />
                  <div className="h-4 bg-slate-200 dark:bg-emerald-800 rounded mb-6 w-4/6" />
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-emerald-800 absolute bottom-8 left-8 right-8">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-emerald-800 shrink-0" />
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200 dark:bg-emerald-800 rounded w-24" />
                      <div className="h-2 bg-slate-200 dark:bg-emerald-800 rounded w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] gap-8">
              {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
                <div key={review.id + index} className="w-[85vw] max-w-[350px] shrink-0 h-[280px] bg-white dark:bg-emerald-900 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm hover:shadow-lg transition-all duration-300 relative">
                  <div className="absolute top-6 right-6">
                    <img src="/logo.png" alt="BFS" className="h-6 w-auto opacity-30 grayscale transition-opacity" />
                  </div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={\`w-4 h-4 \${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-100 dark:fill-slate-700 dark:text-slate-700'}\`} />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 font-medium leading-relaxed text-sm line-clamp-4">"{review.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-emerald-800 absolute bottom-8 left-8 right-8">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-black text-sm uppercase shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{review.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {review.location || "India"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 w-full">
              No reviews yet. Be the first to share your experience!
            </div>
          )}
          
          `;
          
const replaced = content.substring(0, startIndex) + newBlock + content.substring(endIndex);
fs.writeFileSync('src/components/ReviewsSection.tsx', replaced);
console.log('Restored!');
