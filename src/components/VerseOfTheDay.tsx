import { memo, useMemo } from 'react';
import { Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getDualVerse } from '@/lib/verseVerification';
import { useLanguage, type LanguageMode } from '@/contexts/LanguageContext';
import { ENGLISH_BOOK_NAMES, BIBLE_BOOKS } from '@/data/bibleData';
import { cn } from '@/lib/utils';

interface VerseOfTheDayProps {
  bookId: string;
  chapter: number;
  verse: number;
  onNavigate?: (bookId: string, chapter: number, verse: number) => void;
  className?: string;
}

export const VerseOfTheDay = memo(function VerseOfTheDay({
  bookId,
  chapter,
  verse,
  onNavigate,
  className,
}: VerseOfTheDayProps) {
  const { language } = useLanguage();
  
  const verseData = useMemo(() => {
    return getDualVerse(bookId, chapter, verse);
  }, [bookId, chapter, verse]);
  
  const book = useMemo(() => BIBLE_BOOKS.find(b => b.id === bookId), [bookId]);
  
  if (!verseData) {
    return null;
  }
  
  const getReference = (lang: LanguageMode) => {
    const englishName = ENGLISH_BOOK_NAMES[bookId];
    const amharicName = book?.amharicName;
    
    if (lang === 'english') {
      return `${englishName} ${chapter}:${verse}`;
    } else if (lang === 'amharic') {
      return `${amharicName} ${chapter}:${verse}`;
    }
    return `${amharicName} / ${englishName} ${chapter}:${verse}`;
  };
  
  return (
    <Card className={cn(
      "overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5",
      "shadow-lg hover:shadow-xl transition-shadow duration-300",
      className
    )}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-full bg-primary/10">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary">
              {language === 'english' ? "Verse of the Day" : "የዛሬ ጥቅስ"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {getReference(language)}
            </p>
          </div>
        </div>
        
        {/* Verse Content */}
        <div className="space-y-4">
          {language === 'amharic' && verseData.amharic && (
            <blockquote className="relative">
              <div className="absolute -left-2 top-0 bottom-0 w-1 bg-primary/30 rounded-full" />
              <p className="pl-4 text-lg font-scripture leading-relaxed text-foreground">
                "{verseData.amharic}"
              </p>
            </blockquote>
          )}
          
          {language === 'english' && verseData.english && (
            <blockquote className="relative">
              <div className="absolute -left-2 top-0 bottom-0 w-1 bg-accent/50 rounded-full" />
              <p className="pl-4 text-lg leading-relaxed text-foreground">
                "{verseData.english}"
              </p>
            </blockquote>
          )}
        </div>
        
        {/* Navigate Button */}
        {onNavigate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate(bookId, chapter, verse)}
            className="mt-4 text-primary hover:text-primary/80 hover:bg-primary/10 group"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {language === 'english' ? 'Read Full Chapter' : 'ሙሉ ምዕራፍ አንብብ'}
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
});
