"use client";

import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

export default function SecurityGuard() {
  const [toastVisible, setToastVisible] = useState(false);

  const triggerSecurityWarning = () => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 1400);
  };

  useEffect(() => {
    // 1. Disable Right Click globally across the entire website
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerSecurityWarning();
      return false;
    };

    // 2. Disable Keyboard Shortcuts (Inspect, View Source, Save Page, F12)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
        triggerSecurityWarning();
        return false;
      }

      // Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        triggerSecurityWarning();
        return false;
      }

      // Ctrl+S / Cmd+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        triggerSecurityWarning();
        return false;
      }

      // Ctrl+Shift+I / J / C (Inspect / Console)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")
      ) {
        e.preventDefault();
        triggerSecurityWarning();
        return false;
      }
    };

    // 3. Prevent dragging images to desktop or folder
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === "IMG") {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu, { capture: true });
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    document.addEventListener("dragstart", handleDragStart, { capture: true });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.removeEventListener("dragstart", handleDragStart, { capture: true });
    };
  }, []);

  return (
    <>
      {/* Global CSS to prevent mobile long-press image saving and visual selection artifacts */}
      <style dangerouslySetInnerHTML={{
        __html: `
          img {
            -webkit-touch-callout: none !important;
            -webkit-user-drag: none !important;
            user-drag: none !important;
          }
        `
      }} />

      {/* Security Red Icon Pulse Indicator (Pure Red Icon Only, Without Background) */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[99999] transition-all duration-300 pointer-events-none ${
          toastVisible 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-4 scale-75"
        }`}
        aria-hidden="true"
      >
        <ShieldAlert className="w-8 h-8 text-red-600 drop-shadow-[0_0_15px_rgba(239,68,68,0.85)] animate-pulse" />
      </div>
    </>
  );
}
