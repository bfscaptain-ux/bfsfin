"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ProgressInternal() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Route changed, complete and hide progress
    setProgress(100);
    const timer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 280);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      
      const href = target.getAttribute("href");
      // Check if internal navigation
      if (
        href && 
        href.startsWith("/") && 
        !href.startsWith("/#") && 
        !href.startsWith("//") &&
        href !== pathname &&
        !target.hasAttribute("download") &&
        target.getAttribute("target") !== "_blank"
      ) {
        setLoading(true);
        setProgress(35);
        setTimeout(() => setProgress(75), 100);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  if (!loading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-1 bg-transparent">
      <div 
        className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
        style={{ 
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100 ? "width 0.15s ease-out, opacity 0.3s ease-out 0.1s" : "width 0.3s ease-out"
        }}
      />
    </div>
  );
}

export default function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <ProgressInternal />
    </Suspense>
  );
}
