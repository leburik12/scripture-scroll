import { memo } from 'react';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DualVerse } from '@/data/bibleData';
import type { LanguageMode } from '@/contexts/LanguageContext';

interface DualVerseDisplayProps {
  verse: DualVerse;
  language: LanguageMode;
  isBookmarked?: boolean;
  showVerseNumber?: boolean;
  fontSize?: number;
  lineHeight?: number;
  onClick?: () => void;
  onBookmarkClick?: () => void;
}

export const DualVerseDisplay = memo(function DualVerseDisplay({
  verse,
  language,
  isBookmarked = false,
  showVerseNumber = true,
  fontSize = 18,
  lineHeight = 1.9,
  onClick,
  onBookmarkClick,
}: DualVerseDisplayProps) {
  if (language === 'both') {
    return (
      <div 
        className={cn(
          "group grid grid-cols-2 gap-4 py-2 px-2 -mx-2 rounded-lg transition-colors border-b border-border/30",
          onClick && "cursor-pointer hover:bg-accent/30"
        )}
        onClick={onClick}
      >
        {/* Amharic Column */}
        <div className="pr-4 border-r border-border/50" style={{ fontSize: `${fontSize}px`, lineHeight }}>
          {showVerseNumber && (
            <sup className="verse-number select-none text-primary font-medium mr-1">
              {verse.number}
            </sup>
          )}
          <span className="font-scripture">{verse.amharic || '—'}</span>
        </div>
        
        {/* English Column */}
        <div style={{ fontSize: `${fontSize}px`, lineHeight }}>
          {showVerseNumber && (
            <sup className="verse-number select-none text-primary font-medium mr-1">
              {verse.number}
            </sup>
          )}
          <span className="font-sans text-foreground/90">{verse.english || '—'}</span>
          {isBookmarked && (
            <Bookmark 
              className="inline-block w-3 h-3 ml-2 text-gold fill-gold" 
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkClick?.();
              }}
            />
          )}
        </div>
      </div>
    );
  }
  
  const text = language === 'amharic' ? verse.amharic : verse.english;
  const fontClass = language === 'amharic' ? 'font-scripture' : 'font-sans';
  
  return (
    <span
      className={cn(
        "group relative inline",
        onClick && "cursor-pointer hover:bg-accent/50 rounded transition-colors"
      )}
      onClick={onClick}
      style={{ fontSize: `${fontSize}px`, lineHeight }}
    >
      {showVerseNumber && (
        <sup className="verse-number select-none">{verse.number}</sup>
      )}
      <span className={fontClass}>{text || '—'}</span>
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

interface DualChapterDisplayProps {
  verses: DualVerse[];
  language: LanguageMode;
  bookmarkMap?: Set<number>;
  showVerseNumbers?: boolean;
  fontSize?: number;
  lineHeight?: number;
  onVerseClick?: (verseNumber: number) => void;
  onBookmarkClick?: (verseNumber: number) => void;
}

export const DualChapterDisplay = memo(function DualChapterDisplay({
  verses,
  language,
  bookmarkMap = new Set(),
  showVerseNumbers = true,
  fontSize = 18,
  lineHeight = 1.9,
  onVerseClick,
  onBookmarkClick,
}: DualChapterDisplayProps) {
  return (
    <div className="animate-fade-in">
      {language === 'both' && (
        <div className="grid grid-cols-2 gap-4 mb-4 pb-2 border-b-2 border-primary/20 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
          <h3 className="text-sm font-semibold text-primary">አማርኛ</h3>
          <h3 className="text-sm font-semibold text-primary">English (KJV)</h3>
        </div>
      )}
      <div className={language === 'both' ? 'space-y-0' : 'scripture-text'} style={language !== 'both' ? { fontSize: `${fontSize}px`, lineHeight } : undefined}>
        {verses.map((verse) => (
          <DualVerseDisplay
            key={verse.number}
            verse={verse}
            language={language}
            isBookmarked={bookmarkMap.has(verse.number)}
            showVerseNumber={showVerseNumbers}
            fontSize={fontSize}
            lineHeight={lineHeight}
            onClick={() => onVerseClick?.(verse.number)}
            onBookmarkClick={() => onBookmarkClick?.(verse.number)}
          />
        ))}
      </div>
    </div>
  );
});
