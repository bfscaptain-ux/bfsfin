import { Loader2 } from "lucide-react";

export default function LoadingScreen({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-[999] bg-white/80 dark:bg-[#0B1121]/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
      <div className="relative">
        {/* Outer glowing ring */}
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center animate-pulse">
          {/* Inner spinning loader */}
          <Loader2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 animate-spin" />
        </div>
        {/* Decorative tiny spinning circle */}
        <div className="absolute top-0 right-0 w-5 h-5 bg-blue-500 rounded-full animate-bounce flex items-center justify-center shadow-lg shadow-blue-500/50">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
      <h2 className="mt-6 text-xl font-bold text-slate-800 dark:text-slate-200 animate-pulse tracking-wide">
        {text}
      </h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
        Please wait a moment
      </p>
    </div>
  );
}
