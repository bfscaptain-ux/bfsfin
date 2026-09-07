"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Avoid re-tracking admin dashboard actions
    if (pathname && pathname.startsWith("/admin")) return;

    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // Use requestIdleCallback or setTimeout to ensure zero impact on page load speed
    const timeoutId = setTimeout(() => {
      try {
        fetch("/api/track-visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: pathname || "/",
            referrer: typeof document !== "undefined" ? document.referrer : "",
          }),
        }).catch(() => {});
      } catch (e) {}
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
