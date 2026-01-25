import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { getStorageItem, setStorageItem } from '@/lib/storage';

export type LanguageMode = 'amharic' | 'english';

interface LanguageContextType {
  language: LanguageMode;
  setLanguage: (mode: LanguageMode) => void;
  getDisplayName: (mode: LanguageMode) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = 'bible-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageMode>(() => {
    const stored = getStorageItem<string>(STORAGE_KEY);
    // Reset 'both' to 'amharic' since we removed that option
    if (stored === 'both' || (stored !== 'amharic' && stored !== 'english')) {
      return 'amharic';
    }
    return stored as LanguageMode;
  });

  const setLanguage = useCallback((mode: LanguageMode) => {
    setLanguageState(mode);
    setStorageItem(STORAGE_KEY, mode);
  }, []);

  const getDisplayName = useCallback((mode: LanguageMode): string => {
    switch (mode) {
      case 'amharic':
        return 'አማርኛ';
      case 'english':
        return 'English';
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getDisplayName }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
