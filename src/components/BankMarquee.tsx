"use client";

import { motion } from "framer-motion";

const bankLogos = [
  { name: "HDFC Bank",         src: "/bank logo/hdfc bank logo bhardwaj finance.jpg" },
  { name: "ICICI Bank",        src: "/bank logo/icici.jpg" },
  { name: "Axis Bank",         src: "/bank logo/axis.jpg" },
  { name: "Kotak Mahindra",    src: "/bank logo/kotak.jpg" },
  { name: "Punjab National",   src: "/bank logo/pnb.jpg" },
  { name: "Bank of Baroda",    src: "/bank logo/bank of baroda.jpg" },
  { name: "AU Small Finance",  src: "/bank logo/au bank.jpg" },
  { name: "Canara Bank",       src: "/bank logo/canara.jpg" },
  { name: "Union Bank",        src: "/bank logo/union.jpg" },
];

// Duplicate so the loop feels seamless
const logos = [...bankLogos, ...bankLogos];

export default function BankMarquee() {
  return (
    <div className="relative z-10 w-full overflow-hidden border-y border-slate-200/60 dark:border-slate-800/60 py-4 sm:py-6 bg-slate-50 dark:bg-slate-950/40 backdrop-blur-sm">

      {/* Left & Right edge fade for smooth entry/exit */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10" />

      {/* Single scrolling row */}
      <motion.div
        className="flex items-center gap-4 sm:gap-8 w-max will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
      >
        {logos.map((logo, idx) => (
          <div
            key={idx}
            className="
              flex-shrink-0 flex items-center justify-center
              h-14 w-32 sm:h-16 sm:w-40 p-2 sm:p-4 rounded-xl sm:rounded-2xl
              bg-white 
              border border-slate-200 dark:border-slate-700/50
              shadow-sm
              opacity-80 hover:opacity-100
              hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-500
              hover:-translate-y-1
              transition-all duration-300 group cursor-default
            "
          >
            <img
              src={logo.src}
              alt={logo.name}
              title={logo.name}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
