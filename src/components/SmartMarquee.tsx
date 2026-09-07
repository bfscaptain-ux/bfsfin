"use client";

import { useEffect, useRef, useState } from "react";

export default function SmartMarquee({ items, speed = 1 }: { items: any[], speed?: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto scroll logic
  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      if (scrollRef.current && !isHovered && !isDragging) {
        scrollRef.current.scrollLeft += speed;
        // Check if we reached the halfway point (end of original list)
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging, speed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    
    // Wrap around for infinite scrolling while dragging
    if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
      scrollRef.current.scrollLeft -= scrollRef.current.scrollWidth / 2;
    } else if (scrollRef.current.scrollLeft <= 0) {
      scrollRef.current.scrollLeft += scrollRef.current.scrollWidth / 2;
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    
    if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
      scrollRef.current.scrollLeft -= scrollRef.current.scrollWidth / 2;
    } else if (scrollRef.current.scrollLeft <= 0) {
      scrollRef.current.scrollLeft += scrollRef.current.scrollWidth / 2;
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div 
      className="w-full overflow-hidden cursor-grab active:cursor-grabbing relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      <div 
        ref={scrollRef} 
        className="flex overflow-x-hidden whitespace-nowrap will-change-scroll"
        style={{ scrollBehavior: 'auto' }}
      >
        <div className="flex shrink-0 items-center justify-around min-w-full">
          {items.map((logo, idx) => (
            <div key={`first-${idx}`} className="flex-shrink-0 mx-2 sm:mx-4 flex items-center justify-center h-5 sm:h-7 w-14 sm:w-20 grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300">
              <img
                src={logo.logoUrl || logo.logo || logo}
                alt={logo.bankName || logo.name || 'Bank'}
                title={logo.bankName || logo.name || 'Bank'}
                className="max-h-full max-w-full object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center justify-around min-w-full">
          {items.map((logo, idx) => (
            <div key={`second-${idx}`} className="flex-shrink-0 mx-2 sm:mx-4 flex items-center justify-center h-5 sm:h-7 w-14 sm:w-20 grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300">
              <img
                src={logo.logoUrl || logo.logo || logo}
                alt={logo.bankName || logo.name || 'Bank'}
                title={logo.bankName || logo.name || 'Bank'}
                className="max-h-full max-w-full object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
