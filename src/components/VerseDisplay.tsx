import { memo } from 'react';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Verse } from '@/data/bibleData';

interface VerseDisplayProps {
  verse: Verse;
  isBookmarked?: boolean;
  isHighlighted?: boolean;
  highlightColor?: 'yellow' | 'green' | 'blue' | 'pink';
  matchRanges?: { start: number; end: number }[];
  showVerseNumber?: boolean;
  fontSize?: number;
  lineHeight?: number;
  onClick?: () => void;
  onBookmarkClick?: () => void;
}

function highlightText(text: string, ranges: { start: number; end: number }[]): React.ReactNode {
  if (!ranges || ranges.length === 0) return text;
  
  // Sort ranges by start position
  const sortedRanges = [...ranges].sort((a, b) => a.start - b.start);
  
  const result: React.ReactNode[] = [];
  let lastEnd = 0;
  
  sortedRanges.forEach((range, index) => {
    // Add text before this match
    if (range.start > lastEnd) {
      result.push(text.slice(lastEnd, range.start));
    }
    
    // Add highlighted match
    result.push(
      <mark 
        key={index} 
        className="bg-highlight-yellow rounded px-0.5 -mx-0.5"
      >
        {text.slice(range.start, range.end)}
      </mark>
    );
    
    lastEnd = range.end;
  });
  
  // Add remaining text
  if (lastEnd < text.length) {
    result.push(text.slice(lastEnd));
  }
  
  return result;
}

export const VerseDisplay = memo(function VerseDisplay({
  verse,
  isBookmarked = false,
  isHighlighted = false,
  highlightColor = 'yellow',
  matchRanges,
  showVerseNumber = true,
  fontSize = 18,
  lineHeight = 1.9,
  onClick,
  onBookmarkClick,
}: VerseDisplayProps) {
  const highlightClass = isHighlighted ? `highlight-${highlightColor}` : '';
  
  return (
    <span
      className={cn(
        "group relative inline",
        highlightClass,
        onClick && "cursor-pointer hover:bg-accent/50 rounded transition-colors"
      )}
      onClick={onClick}
      style={{ fontSize: `${fontSize}px`, lineHeight }}
    >
      {showVerseNumber && (
        <sup className="verse-number select-none">{verse.number}</sup>
      )}
      <span className="font-scripture">
        {matchRanges ? highlightText(verse.text, matchRanges) : verse.text}
      </span>
      {isBookmarked && (
        <Bookmark 
          className="inline-block w-3 h-3 ml-1 text-gold fill-gold" 
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkClick?.();
          }}
        />
      )}
      {' '}
    </span>
  );
});

interface ChapterDisplayProps {
  verses: Verse[];
  bookmarkMap?: Set<number>;
  highlightMap?: Map<number, 'yellow' | 'green' | 'blue' | 'pink'>;
  searchMatches?: Map<number, { start: number; end: number }[]>;
  showVerseNumbers?: boolean;
  fontSize?: number;
  lineHeight?: number;
  onVerseClick?: (verseNumber: number) => void;
  onBookmarkClick?: (verseNumber: number) => void;
}

export const ChapterDisplay = memo(function ChapterDisplay({
  verses,
  bookmarkMap = new Set(),
  highlightMap = new Map(),
  searchMatches = new Map(),
  showVerseNumbers = true,
  fontSize = 18,
  lineHeight = 1.9,
  onVerseClick,
  onBookmarkClick,
}: ChapterDisplayProps) {
  return (
    <div 
      className="scripture-text animate-fade-in"
      style={{ fontSize: `${fontSize}px`, lineHeight }}
    >
      {verses.map((verse) => (
        <VerseDisplay
          key={verse.number}
          verse={verse}
          isBookmarked={bookmarkMap.has(verse.number)}
          isHighlighted={highlightMap.has(verse.number)}
          highlightColor={highlightMap.get(verse.number)}
          matchRanges={searchMatches.get(verse.number)}
          showVerseNumber={showVerseNumbers}
          fontSize={fontSize}
          lineHeight={lineHeight}
          onClick={() => onVerseClick?.(verse.number)}
          onBookmarkClick={() => onBookmarkClick?.(verse.number)}
        />
      ))}
    </div>
  );
});
