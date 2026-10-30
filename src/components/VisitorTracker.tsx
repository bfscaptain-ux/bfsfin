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

    // Check session storage to avoid spamming the server on rapid back-forth navigation
    try {
      const sessionKey = `bfs_tracked_${pathname || "/"}`;
      const lastSessionTrack = sessionStorage.getItem(sessionKey);
      if (lastSessionTrack && Date.now() - parseInt(lastSessionTrack, 10) < 60000) {
        return; // Already tracked within the last 60 seconds
      }
      sessionStorage.setItem(sessionKey, Date.now().toString());
    } catch {}

    // Use setTimeout to ensure zero impact on initial page paint
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
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
