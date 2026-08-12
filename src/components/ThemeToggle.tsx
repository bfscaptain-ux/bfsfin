"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="relative p-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-emerald-400 hover:text-blue-600 dark:hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_15px_rgba(52,211,153,0.15)] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
    >
      {theme === "dark" ? (
        <Sun className="w-[14px] h-[14px] transition-transform duration-500 group-hover:rotate-[45deg]" />
      ) : (
        <Moon className="w-[14px] h-[14px] transition-transform duration-500 group-hover:-rotate-[25deg]" />
      )}
    </button>
  );
}
