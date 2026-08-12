"use client";

import { useState, useEffect } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Modern home
  "https://images.unsplash.com/photo-1560518883-ce09059eeefa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Beautiful Interior
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Premium Villa
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Modern Architecture
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 3500); // Change image every 3.5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {IMAGES.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Beautiful Home ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out group-hover/cards:scale-110 ${
            index === currentIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/30 to-blue-100/30 dark:from-[#0b132b]/60 dark:to-emerald-900/50 pointer-events-none"></div>
    </>
  );
}
