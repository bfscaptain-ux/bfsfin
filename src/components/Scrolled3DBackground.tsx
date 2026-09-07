"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

export default function Scrolled3DBackground() {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll();

  // Smooth out scroll progression using spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Parallax transformations for various 3D layers
  const yLayer1 = useTransform(smoothProgress, [0, 1], [0, -650]);
  const yLayer2 = useTransform(smoothProgress, [0, 1], [0, -1200]);
  const yLayer3 = useTransform(smoothProgress, [0, 1], [0, -1800]);

  // 3D Rotations driven by scroll
  const cubeRotateX = useTransform(smoothProgress, [0, 1], [15, 375]);
  const cubeRotateY = useTransform(smoothProgress, [0, 1], [25, 420]);
  const cubeRotateZ = useTransform(smoothProgress, [0, 1], [0, 180]);

  const ringRotateX = useTransform(smoothProgress, [0, 1], [65, 140]);
  const ringRotateZ = useTransform(smoothProgress, [0, 1], [0, 360]);

  const coinRotateY = useTransform(smoothProgress, [0, 1], [0, 720]);
  const coinY = useTransform(smoothProgress, [0, 1], [100, -800]);

  const shieldRotateY = useTransform(smoothProgress, [0, 1], [-30, 330]);
  const shieldY = useTransform(smoothProgress, [0, 1], [250, -950]);

  // Ambient gradient shifts
  const orb1Y = useTransform(smoothProgress, [0, 1], [0, 400]);
  const orb2Y = useTransform(smoothProgress, [0, 1], [0, -500]);
  const orbScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 0.95]);

  if (!isMounted || prefersReducedMotion || (typeof window !== "undefined" && window.innerWidth < 768)) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ perspective: "1400px" }}
    >
      {/* ================= 1. AMBIENT GLOWING AURORA MESH ================= */}
      <motion.div
        style={{ y: orb1Y, scale: orbScale }}
        className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-gradient-to-br from-emerald-400/10 via-teal-400/8 to-transparent rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: orb2Y, scale: orbScale }}
        className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-teal-400/10 via-emerald-500/8 to-transparent rounded-full blur-[130px] pointer-events-none"
      />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[450px] bg-gradient-to-tr from-amber-400/5 via-emerald-400/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* ================= 2. 3D ISOMETRIC GLASS FINTECH CUBE (TOP RIGHT) ================= */}
      <motion.div
        style={{
          y: yLayer1,
          rotateX: cubeRotateX,
          rotateY: cubeRotateY,
          rotateZ: cubeRotateZ,
          transformStyle: "preserve-3d",
        }}
        className="absolute top-[18%] right-[5%] sm:right-[9%] w-20 h-20 sm:w-28 sm:h-28 opacity-40 dark:opacity-60 hidden md:block"
      >
        {/* Cube Face 1 - Front */}
        <div
          style={{ transform: "translateZ(56px)" }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-600/10 border border-emerald-400/40 backdrop-blur-md flex items-center justify-center shadow-[0_8px_32px_rgba(16,185,129,0.15)]"
        >
          <div className="w-8 h-8 rounded-full border border-emerald-300/40 bg-emerald-400/20 flex items-center justify-center text-[10px] font-black text-emerald-700 dark:text-emerald-300">
            ₹
          </div>
        </div>
        {/* Cube Face 2 - Back */}
        <div
          style={{ transform: "rotateY(180deg) translateZ(56px)" }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-600/20 to-emerald-700/10 border border-teal-400/40 backdrop-blur-md flex items-center justify-center shadow-[0_8px_32px_rgba(20,184,166,0.15)]"
        >
          <div className="w-5 h-5 rounded-md bg-teal-400/30 border border-teal-300/40"></div>
        </div>
        {/* Cube Face 3 - Right */}
        <div
          style={{ transform: "rotateY(90deg) translateZ(56px)" }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/15 to-teal-500/10 border border-emerald-300/30 backdrop-blur-md"
        />
        {/* Cube Face 4 - Left */}
        <div
          style={{ transform: "rotateY(-90deg) translateZ(56px)" }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/15 to-emerald-500/10 border border-teal-300/30 backdrop-blur-md"
        />
        {/* Cube Face 5 - Top */}
        <div
          style={{ transform: "rotateX(90deg) translateZ(56px)" }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/25 to-emerald-300/10 border border-white/40 backdrop-blur-md"
        />
        {/* Cube Face 6 - Bottom */}
        <div
          style={{ transform: "rotateX(-90deg) translateZ(56px)" }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-slate-900/20 border border-emerald-500/20 backdrop-blur-md"
        />
      </motion.div>

      {/* ================= 3. 3D DUAL CONCENTRIC ORBIT RINGS (LEFT MIDGROUND) ================= */}
      <motion.div
        style={{
          y: yLayer2,
          rotateX: ringRotateX,
          rotateZ: ringRotateZ,
          transformStyle: "preserve-3d",
        }}
        className="absolute top-[42%] left-[2%] sm:left-[5%] w-36 h-36 sm:w-48 sm:h-48 opacity-30 dark:opacity-50 pointer-events-none"
      >
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/40 dark:border-emerald-400/50 shadow-[0_0_25px_rgba(16,185,129,0.2)]"></div>
        {/* Inner Solid Ring */}
        <div className="absolute inset-4 rounded-full border border-teal-400/50 dark:border-teal-300/60 bg-gradient-to-tr from-emerald-500/5 to-transparent"></div>
        {/* Orbiting Satellite Node */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] border border-white"></div>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-teal-300 shadow-[0_0_10px_#5eead4] border border-white"></div>
      </motion.div>

      {/* ================= 4. 3D GLASS SHIELD NODE (RIGHT CENTER - INSURANCE SECTION) ================= */}
      <motion.div
        style={{
          y: shieldY,
          rotateY: shieldRotateY,
          transformStyle: "preserve-3d",
        }}
        className="absolute top-[58%] right-[4%] sm:right-[7%] w-24 h-28 sm:w-32 sm:h-36 opacity-35 dark:opacity-55 hidden sm:block"
      >
        <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-b from-teal-400/20 via-emerald-500/10 to-transparent border border-teal-400/40 backdrop-blur-md shadow-[0_12px_40px_rgba(20,184,166,0.18)] p-3 flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-2xl bg-white/30 dark:bg-white/10 border border-white/40 flex items-center justify-center shadow-inner">
            <svg
              className="w-5 h-5 text-teal-600 dark:text-teal-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="text-[9px] font-black tracking-widest uppercase text-teal-700 dark:text-teal-300 mt-2">
            SECURE
          </span>
        </div>
      </motion.div>

      {/* ================= 5. 3D ROTATING BFS GOLD COIN / MEDALLION (LEFT LOWER SECTION) ================= */}
      <motion.div
        style={{
          y: coinY,
          rotateY: coinRotateY,
          transformStyle: "preserve-3d",
        }}
        className="absolute top-[75%] left-[6%] sm:left-[8%] w-20 h-20 sm:w-24 sm:h-24 opacity-40 dark:opacity-60 hidden md:block"
      >
        {/* Coin Rim Front */}
        <div
          style={{ transform: "translateZ(8px)" }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/30 via-yellow-300/20 to-amber-600/30 border-2 border-amber-400/50 backdrop-blur-md shadow-[0_10px_30px_rgba(245,158,11,0.25)] flex items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full border border-amber-300/60 flex items-center justify-center font-black text-xs text-amber-700 dark:text-amber-300 tracking-wider">
            BFS
          </div>
        </div>
        {/* Coin Edge 3D Thickness */}
        <div
          style={{ transform: "translateZ(-8px)" }}
          className="absolute inset-0 rounded-full bg-gradient-to-bl from-amber-600/30 via-amber-400/20 to-yellow-500/30 border-2 border-amber-500/50 backdrop-blur-md flex items-center justify-center shadow-inner"
        >
          <div className="text-[9px] font-mono font-bold text-amber-700 dark:text-amber-300">★ 7.15% ★</div>
        </div>
      </motion.div>

      {/* ================= 6. FLOATING 3D DEPTH PARTICLES (ACROSS PAGE) ================= */}
      <motion.div
        style={{ y: yLayer3 }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Particle 1 */}
        <div className="absolute top-[25%] left-[20%] w-2 h-2 rounded-full bg-emerald-400/60 shadow-[0_0_8px_#34d399] animate-pulse"></div>
        {/* Particle 2 */}
        <div className="absolute top-[35%] right-[25%] w-3 h-3 rounded-md rotate-45 border border-teal-400/50 bg-teal-400/20 backdrop-blur-sm"></div>
        {/* Particle 3 */}
        <div className="absolute top-[55%] left-[30%] w-2.5 h-2.5 rounded-full bg-amber-400/60 shadow-[0_0_8px_#fbbf24]"></div>
        {/* Particle 4 */}
        <div className="absolute top-[70%] right-[18%] w-3 h-3 rounded-full bg-emerald-500/40 shadow-[0_0_10px_#10b981]"></div>
        {/* Particle 5 */}
        <div className="absolute top-[85%] left-[15%] w-2 h-2 rounded-md rotate-12 border border-emerald-400/40 bg-emerald-400/20"></div>
        {/* Particle 6 */}
        <div className="absolute top-[92%] right-[35%] w-2.5 h-2.5 rounded-full bg-teal-400/50 shadow-[0_0_8px_#2dd4bf]"></div>
      </motion.div>
    </div>
  );
}
