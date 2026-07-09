'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<{
  darkMode: boolean;
  toggleDarkMode: () => void;
}>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize state as false, but run hook on mount to read from local storage
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme-dark-enabled');
      if (stored) {
        setDarkMode(stored === 'true');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme-dark-enabled', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
