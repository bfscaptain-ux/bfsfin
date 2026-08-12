"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ModernBackground() {
  const { scrollY } = useScroll();
  
  // 1. "Buttery Smooth" Physics
  const smoothScroll = useSpring(scrollY, { 
    damping: 35, 
    stiffness: 50,
    mass: 1 
  });
  
  // 2. Parallax transforms for the Blurred Orbs
  const orb1Y = useTransform(smoothScroll, [0, 4000], [0, 1000]);
  const orb2Y = useTransform(smoothScroll, [0, 4000], [0, -800]);
  const orb3Y = useTransform(smoothScroll, [0, 4000], [0, 1200]);

  // 3. Cinematic Hero Logo - Prominent & Held
  // Scales very subtly so it stays "held" in the background
  const centerLogoScale = useTransform(smoothScroll, [0, 3000], [1, 1.15]);
  // Subtle rotation
  const centerLogoRotate = useTransform(smoothScroll, [0, 4000], [0, 15]);
  // High opacity so it is "acche se visible" but fades slightly so it isn't distracting
  const centerLogoOpacity = useTransform(smoothScroll, [0, 1500, 4000], [0.25, 0.15, 0.08]);

  // 4. Parallax Floating Logos - Adjusted opacity so they are visible but don't overpower the main logo
  const floatLeftY = useTransform(smoothScroll, [0, 4000], [0, -1000]);
  const floatLeftRotate = useTransform(smoothScroll, [0, 4000], [-10, 60]);
  const floatRightY = useTransform(smoothScroll, [0, 4000], [0, 800]);
  const floatRightRotate = useTransform(smoothScroll, [0, 4000], [10, -45]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      
      {/* --- LAYER 1: PREMIUM GRID --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_50%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]"></div>

      {/* --- LAYER 2: GLOWING ORBS --- */}
      <motion.div 
        style={{ y: orb1Y }}
        className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-emerald-500/15 dark:bg-emerald-600/10 blur-[130px]"
      />
      <motion.div 
        style={{ y: orb2Y }}
        className="absolute top-[40%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[150px]"
      />
      <motion.div 
        style={{ y: orb3Y }}
        className="absolute top-[80%] left-[10%] w-[600px] h-[600px] rounded-full bg-amber-500/10 dark:bg-amber-600/10 blur-[120px]"
      />

      {/* --- LAYER 3: DYNAMIC BRANDING (LOGOS) --- */}
      
      {/* 3A. The Giant Cinematic Anchor Logo - Highly Visible */}
      <motion.div 
        style={{ 
          scale: centerLogoScale, 
          rotate: centerLogoRotate, 
          opacity: centerLogoOpacity,
          y: '-50%', 
          x: '-50%' 
        }}
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px]"
      >
        <img 
          src="/logo.png" 
          alt="Main Background Logo" 
          className="w-full h-full object-contain drop-shadow-2xl" 
        />
      </motion.div>

      {/* 3B. Floating Parallax Logo - Left */}
      <motion.div 
        style={{ y: floatLeftY, rotate: floatLeftRotate }}
        className="absolute top-[60%] left-[-2%] w-48 h-48 md:w-64 md:h-64 opacity-[0.08] dark:opacity-[0.1]"
      >
        <img 
          src="/logo.png" 
          alt="" 
          className="w-full h-full object-contain" 
        />
      </motion.div>

      {/* 3C. Floating Parallax Logo - Right */}
      <motion.div 
        style={{ y: floatRightY, rotate: floatRightRotate }}
        className="absolute top-[15%] right-[2%] w-32 h-32 md:w-48 md:h-48 opacity-[0.1] dark:opacity-[0.12]"
      >
        <img 
          src="/logo.png" 
          alt="" 
          className="w-full h-full object-contain" 
        />
      </motion.div>

      {/* --- LAYER 4: MOUSE SPOTLIGHT --- */}
      <motion.div
        className="hidden lg:block absolute w-[400px] h-[400px] rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 blur-[100px] mix-blend-screen"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.6 }}
      />
    </div>
  );
}
