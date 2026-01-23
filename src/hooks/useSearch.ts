import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { search, validateRegex, type SearchResult, type SearchFilters } from '@/lib/search';

interface UseSearchOptions {
  debounceMs?: number;
  isRegex?: boolean;
  filters?: SearchFilters;
}

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
  error: string | null;
  isRegex: boolean;
  setIsRegex: (value: boolean) => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  clearSearch: () => void;
  resultCount: number;
}

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const { debounceMs = 150 } = options;
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegex, setIsRegex] = useState(options.isRegex ?? false);
  const [filters, setFilters] = useState<SearchFilters>(options.filters ?? {});
  
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const searchRef = useRef<AbortController>();
  
  const executeSearch = useCallback((searchQuery: string, searchFilters: SearchFilters, useRegex: boolean) => {
    // Abort any pending search
    if (searchRef.current) {
      searchRef.current.abort();
    }
    
    if (!searchQuery.trim()) {
      setResults([]);
      setError(null);
      setIsSearching(false);
      return;
    }
    
    // Validate regex if needed
    if (useRegex) {
      const validation = validateRegex(searchQuery);
      if (!validation.valid) {
        setError(validation.error || 'Invalid regex pattern');
        setResults([]);
        setIsSearching(false);
        return;
      }
    }
    
    setIsSearching(true);
    setError(null);
    
    // Create a new abort controller for this search
    searchRef.current = new AbortController();
    
    // Use setTimeout to simulate async (would use Web Worker in production)
    setTimeout(() => {
      try {
        const searchResults = search(searchQuery, searchFilters, useRegex);
        setResults(searchResults);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 0);
  }, []);
  
  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      executeSearch(query, filters, isRegex);
    }, debounceMs);
    
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, filters, isRegex, debounceMs, executeSearch]);
  
  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
    setIsSearching(false);
  }, []);
  
  return {
    query,
    setQuery,
    results,
    isSearching,
    error,
    isRegex,
    setIsRegex,
    filters,
    setFilters,
    clearSearch,
    resultCount: results.length,
  };
}
