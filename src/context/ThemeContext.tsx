"use client";

import React, { createContext, useContext } from "react";

// Forced Light Theme for entire app
type Theme = "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void; // dummy
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Ensure the dark class is completely removed
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }

  const toggleTheme = () => {
    // Theme toggling disabled. App is light-only.
  };

  return (
    <ThemeContext.Provider value={{ theme: "light", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
