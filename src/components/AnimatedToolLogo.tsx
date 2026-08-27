"use client";

import { motion } from "framer-motion";

export default function AnimatedToolLogo() {
  return (
    <div className="flex flex-col items-center sm:items-end absolute top-6 right-6 pointer-events-none opacity-20 sm:opacity-30 mix-blend-luminosity dark:mix-blend-lighten z-0">
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-32 h-12"
      >
        <img
          src="/logo.png"
          alt="Bhardwaj Financial Services"
          className="w-full h-full object-contain filter grayscale dark:invert-[0.8]"
        />
      </motion.div>
      <div className="flex gap-2 mt-1">
        <span className="text-[10px] font-bold text-slate-500 tracking-wider">
          bfsfin.com
        </span>
        <span className="text-[10px] text-slate-400">|</span>
        <span className="text-[10px] font-bold text-slate-500 tracking-wider">
          bfsfin.in
        </span>
      </div>
    </div>
  );
}
