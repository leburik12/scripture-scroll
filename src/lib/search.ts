// Search engine with regex support and safety guards
import { BIBLE_BOOKS, SAMPLE_BIBLE_DATA, type Verse } from '@/data/bibleData';

export interface SearchResult {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  matches: { start: number; end: number }[];
}

export interface SearchFilters {
  testament?: 'OT' | 'NT' | 'all';
  bookIds?: string[];
  chapterRange?: { min: number; max: number };
}

// Safety guard for regex - prevent ReDoS
const MAX_REGEX_LENGTH = 100;
const MAX_RESULTS = 500;
const DANGEROUS_PATTERNS = [
  /(\+\+|\*\*|\?\?)/,  // Nested quantifiers
  /\(\?[^:]/,          // Lookahead/lookbehind
  /\{[0-9]{3,}\}/,     // Very large repetitions
];

export function validateRegex(pattern: string): { valid: boolean; error?: string } {
  if (pattern.length > MAX_REGEX_LENGTH) {
    return { valid: false, error: 'Pattern too long (max 100 characters)' };
  }
  
  for (const dangerous of DANGEROUS_PATTERNS) {
    if (dangerous.test(pattern)) {
      return { valid: false, error: 'Pattern contains potentially dangerous constructs' };
    }
  }
  
  try {
    new RegExp(pattern, 'gi');
    return { valid: true };
  } catch (e) {
    return { valid: false, error: `Invalid regex: ${(e as Error).message}` };
  }
}

export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function search(
  query: string,
  filters: SearchFilters = {},
  isRegex: boolean = false
): SearchResult[] {
  if (!query.trim()) return [];
  
  const results: SearchResult[] = [];
  
  // Prepare the search pattern
  let pattern: RegExp;
  if (isRegex) {
    const validation = validateRegex(query);
    if (!validation.valid) {
      console.warn('Invalid regex:', validation.error);
      return [];
    }
    pattern = new RegExp(query, 'gi');
  } else {
    pattern = new RegExp(escapeRegex(query), 'gi');
  }
  
  // Filter books based on testament
  let booksToSearch = BIBLE_BOOKS;
  if (filters.testament && filters.testament !== 'all') {
    booksToSearch = booksToSearch.filter(b => b.testament === filters.testament);
  }
  if (filters.bookIds?.length) {
    booksToSearch = booksToSearch.filter(b => filters.bookIds!.includes(b.id));
  }
  
  // Search through books
  for (const book of booksToSearch) {
    const chapters = SAMPLE_BIBLE_DATA[book.id];
    if (!chapters) continue;
    
    for (const chapter of chapters) {
      // Apply chapter range filter
      if (filters.chapterRange) {
        if (chapter.number < filters.chapterRange.min || chapter.number > filters.chapterRange.max) {
          continue;
        }
      }
      
      for (const verse of chapter.verses) {
        // Reset regex lastIndex for each verse
        pattern.lastIndex = 0;
        
        const matches: { start: number; end: number }[] = [];
        let match: RegExpExecArray | null;
        
        // Use a timeout-like approach with max iterations
        let iterations = 0;
        const MAX_ITERATIONS = 100;
        
        while ((match = pattern.exec(verse.text)) !== null && iterations < MAX_ITERATIONS) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
          });
          iterations++;
          
          // Prevent infinite loops on zero-length matches
          if (match[0].length === 0) {
            pattern.lastIndex++;
          }
        }
        
        if (matches.length > 0) {
          results.push({
            bookId: book.id,
            bookName: book.name,
            chapter: chapter.number,
            verse: verse.number,
            text: verse.text,
            matches,
          });
          
          if (results.length >= MAX_RESULTS) {
            return results;
          }
        }
      }
    }
  }
  
  return results;
}

// Build an inverted index for faster searching (would be pre-built in production)
export function buildSearchIndex(): Map<string, Set<string>> {
  const index = new Map<string, Set<string>>();
  
  for (const book of BIBLE_BOOKS) {
    const chapters = SAMPLE_BIBLE_DATA[book.id];
    if (!chapters) continue;
    
    for (const chapter of chapters) {
      for (const verse of chapter.verses) {
        const words = verse.text.toLowerCase().split(/\W+/).filter(w => w.length > 2);
        const verseKey = `${book.id}:${chapter.number}:${verse.number}`;
        
        for (const word of words) {
          if (!index.has(word)) {
            index.set(word, new Set());
          }
          index.get(word)!.add(verseKey);
        }
      }
    }
  }
  
  return index;
}
