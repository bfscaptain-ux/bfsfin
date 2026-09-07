const fs = require('fs');

let content = fs.readFileSync('src/components/ReviewsSection.tsx', 'utf8');

// 1. Add useRef to imports
if (!content.includes('useRef')) {
  content = content.replace('import { useState, useEffect } from "react";', 'import { useState, useEffect, useRef } from "react";');
}

// 2. Add scroll logic state inside the component
const scrollLogic = `  const [hasMore, setHasMore] = useState(false);

  // Smart Marquee Ref and State
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      if (scrollRef.current && !isHovered.current && reviews.length > 0) {
        scrollRef.current.scrollLeft += 0.6; // Slow and readable speed
        
        // Reset to start seamlessly if we hit the cloned end
        if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth / 2)) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    // Start after a tiny delay to let DOM render
    setTimeout(() => {
      animationId = requestAnimationFrame(scroll);
    }, 1000);
    
    return () => cancelAnimationFrame(animationId);
  }, [reviews.length]);
`;

content = content.replace('  const [hasMore, setHasMore] = useState(false);', scrollLogic);

// 3. Update the marquee HTML
// We need to replace the old animate-marquee div with a native scrollable div

const oldMarquee = `<div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (`;

const newMarquee = `<div 
            ref={scrollRef}
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={() => { isHovered.current = false; }}
            onTouchStart={() => { isHovered.current = true; }}
            onTouchEnd={() => { isHovered.current = false; }}
            className="flex overflow-x-auto w-full gap-8 scrollbar-hide py-4 px-4 sm:px-8 snap-x snap-mandatory"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {/* We duplicate the array to allow seamless scrolling */}
            {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (`;

content = content.replace(oldMarquee, newMarquee);

// Fix the card width/margins so it natively scrolls properly
const oldCard = `className="mr-8 block cursor-pointer w-[85vw] max-w-[350px] shrink-0 h-[280px] bg-white dark:bg-emerald-900 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm hover:shadow-lg transition-all duration-300 relative"`;

const newCard = `className="block cursor-pointer w-[85vw] max-w-[350px] shrink-0 h-[280px] bg-white dark:bg-emerald-900 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm hover:shadow-lg transition-all duration-300 relative snap-center"`

content = content.replace(new RegExp('className="mr-8 block cursor-pointer w-\\[85vw\\] max-w-\\[350px\\] shrink-0 h-\\[280px\\] bg-white dark:bg-emerald-900 p-8 rounded-2xl border border-slate-200 dark:border-emerald-800 shadow-sm hover:shadow-lg transition-all duration-300 relative"', 'g'), newCard);

fs.writeFileSync('src/components/ReviewsSection.tsx', content);
console.log('Smart Marquee Activated!');
