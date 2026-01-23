import { useState, useEffect, useCallback } from 'react';
import { getTheme, setTheme as saveTheme, type Theme } from '@/lib/storage';

interface UseThemeReturn {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>('light');
  
  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = getTheme();
    setThemeState(savedTheme);
    document.documentElement.classList.remove('light', 'dark', 'sepia');
    document.documentElement.classList.add(savedTheme);
  }, []);
  
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
    document.documentElement.classList.remove('light', 'dark', 'sepia');
    document.documentElement.classList.add(newTheme);
  }, []);
  
  const toggleTheme = useCallback(() => {
    const themes: Theme[] = ['light', 'sepia', 'dark'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme, setTheme]);
  
  return {
    theme,
    setTheme,
    toggleTheme,
  };
}
