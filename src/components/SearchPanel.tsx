import { useState, useRef, useEffect } from 'react';
import { Search, X, Code, Filter, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useSearch } from '@/hooks/useSearch';
import { BIBLE_BOOKS } from '@/data/bibleData';
import type { SearchResult, SearchFilters } from '@/lib/search';

interface SearchPanelProps {
  onResultClick: (bookId: string, chapter: number, verse: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SearchPanel({ onResultClick, isOpen, onClose }: SearchPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
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
    resultCount,
  } = useSearch({ debounceMs: 150 });
  
  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-x-4 top-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl">
        <div className="bg-card border border-border rounded-xl shadow-soft overflow-hidden animate-scale-in">
          {/* Search Header */}
          <div className="flex items-center gap-2 p-4 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search the Bible... (Press / to focus)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base placeholder:text-muted-foreground/60"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Search Options */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
            <Toggle
              pressed={isRegex}
              onPressedChange={setIsRegex}
              size="sm"
              className="gap-1 text-xs"
            >
              <Code className="w-3 h-3" />
              Regex
            </Toggle>
            
            <FilterPopover filters={filters} onFiltersChange={setFilters} />
            
            <div className="flex-1" />
            
            {isSearching && (
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            )}
            
            {resultCount > 0 && !isSearching && (
              <Badge variant="secondary" className="text-xs">
                {resultCount} result{resultCount !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          
          {/* Error */}
          {error && (
            <div className="px-4 py-2 bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}
          
          {/* Results */}
          <ScrollArea className="max-h-[60vh]">
            {results.length > 0 ? (
              <div className="divide-y divide-border">
                {results.map((result, index) => (
                  <SearchResultItem
                    key={`${result.bookId}-${result.chapter}-${result.verse}-${index}`}
                    result={result}
                    onClick={() => {
                      onResultClick(result.bookId, result.chapter, result.verse);
                      onClose();
                    }}
                  />
                ))}
              </div>
            ) : query && !isSearching ? (
              <div className="p-8 text-center text-muted-foreground">
                <p>No results found</p>
                <p className="text-sm mt-1">Try a different search term or adjust filters</p>
              </div>
            ) : !query ? (
              <div className="p-8 text-center text-muted-foreground">
                <p className="text-sm">Start typing to search</p>
                <p className="text-xs mt-1 opacity-60">
                  Tip: Enable regex for advanced pattern matching
                </p>
              </div>
            ) : null}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

function SearchResultItem({ 
  result, 
  onClick 
}: { 
  result: SearchResult; 
  onClick: () => void;
}) {
  // Highlight matching text
  const highlightedText = result.matches.length > 0 ? (
    highlightMatches(result.text, result.matches)
  ) : (
    result.text
  );
  
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-3 text-left hover:bg-accent/50 transition-colors"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-sm text-primary">
          {result.bookName} {result.chapter}:{result.verse}
        </span>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2 font-scripture">
        {highlightedText}
      </p>
    </button>
  );
}

function highlightMatches(
  text: string, 
  matches: { start: number; end: number }[]
): React.ReactNode {
  if (!matches.length) return text;
  
  const sortedMatches = [...matches].sort((a, b) => a.start - b.start);
  const result: React.ReactNode[] = [];
  let lastEnd = 0;
  
  sortedMatches.forEach((match, index) => {
    if (match.start > lastEnd) {
      result.push(text.slice(lastEnd, match.start));
    }
    result.push(
      <mark key={index} className="bg-highlight-yellow rounded px-0.5">
        {text.slice(match.start, match.end)}
      </mark>
    );
    lastEnd = match.end;
  });
  
  if (lastEnd < text.length) {
    result.push(text.slice(lastEnd));
  }
  
  return result;
}

function FilterPopover({
  filters,
  onFiltersChange,
}: {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}) {
  const hasFilters = filters.testament !== undefined || 
    (filters.bookIds?.length ?? 0) > 0;
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("gap-1 text-xs", hasFilters && "text-primary")}
        >
          <Filter className="w-3 h-3" />
          Filters
          {hasFilters && (
            <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
              Active
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="start">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Testament</h4>
            <div className="flex gap-2">
              {(['all', 'OT', 'NT'] as const).map((testament) => (
                <Button
                  key={testament}
                  variant={
                    (filters.testament ?? 'all') === testament 
                      ? 'default' 
                      : 'outline'
                  }
                  size="sm"
                  onClick={() => onFiltersChange({
                    ...filters,
                    testament: testament === 'all' ? undefined : testament,
                  })}
                >
                  {testament === 'all' ? 'All' : testament === 'OT' ? 'Old' : 'New'}
                </Button>
              ))}
            </div>
          </div>
          
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => onFiltersChange({})}
            >
              Clear filters
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
