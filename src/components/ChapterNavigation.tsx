import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChapterNavigationProps {
  bookName: string;
  chapter: number;
  totalChapters: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export function ChapterNavigation({
  bookName,
  chapter,
  totalChapters,
  onPrevious,
  onNext,
  className,
}: ChapterNavigationProps) {
  const isFirst = chapter === 1;
  const isLast = chapter === totalChapters;
  
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrevious}
        className="gap-1 text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>
      
      <div className="text-center">
        <h1 className="text-lg md:text-xl font-semibold text-foreground">
          {bookName}
        </h1>
        <p className="text-sm text-muted-foreground">
          Chapter {chapter} of {totalChapters}
        </p>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        className="gap-1 text-muted-foreground hover:text-foreground"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
