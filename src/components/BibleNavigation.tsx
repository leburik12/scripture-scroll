import { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Book, ScrollText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BIBLE_BOOKS, getChapterCount } from '@/data/bibleData';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BibleNavigationProps {
  currentBook: string;
  currentChapter: number;
  onSelectBook: (bookId: string) => void;
  onSelectChapter: (bookId: string, chapter: number) => void;
  collapsed?: boolean;
}

export function BibleNavigation({
  currentBook,
  currentChapter,
  onSelectBook,
  onSelectChapter,
  collapsed = false,
}: BibleNavigationProps) {
  const [expandedTestament, setExpandedTestament] = useState<'OT' | 'NT' | null>(() => {
    const book = BIBLE_BOOKS.find(b => b.id === currentBook);
    return book?.testament ?? 'OT';
  });
  const [expandedBook, setExpandedBook] = useState<string | null>(currentBook);
  
  const otBooks = useMemo(() => BIBLE_BOOKS.filter(b => b.testament === 'OT'), []);
  const ntBooks = useMemo(() => BIBLE_BOOKS.filter(b => b.testament === 'NT'), []);
  
  if (collapsed) {
    return (
      <div className="flex flex-col items-center py-4 space-y-4">
        <Book className="w-5 h-5 text-muted-foreground" />
      </div>
    );
  }
  
  const renderTestament = (
    testament: 'OT' | 'NT',
    label: string,
    books: typeof BIBLE_BOOKS
  ) => (
    <Collapsible
      open={expandedTestament === testament}
      onOpenChange={(open) => setExpandedTestament(open ? testament : null)}
    >
      <CollapsibleTrigger className="flex items-center w-full px-3 py-2 text-sm font-semibold text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors">
        {expandedTestament === testament ? (
          <ChevronDown className="w-4 h-4 mr-2 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 mr-2 text-muted-foreground" />
        )}
        <ScrollText className="w-4 h-4 mr-2 text-primary" />
        {label}
      </CollapsibleTrigger>
      
      <CollapsibleContent className="animate-accordion-down">
        <div className="ml-2 border-l border-sidebar-border">
          {books.map((book) => (
            <Collapsible
              key={book.id}
              open={expandedBook === book.id}
              onOpenChange={(open) => setExpandedBook(open ? book.id : null)}
            >
              <CollapsibleTrigger
                className={cn(
                  "flex items-center w-full px-3 py-1.5 text-sm hover:bg-sidebar-accent rounded-md transition-colors ml-2",
                  currentBook === book.id && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                )}
              >
                {expandedBook === book.id ? (
                  <ChevronDown className="w-3 h-3 mr-2 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="w-3 h-3 mr-2 text-muted-foreground shrink-0" />
                )}
                <span className="truncate">{book.name}</span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="animate-accordion-down">
                <div className="grid grid-cols-5 gap-1 px-3 py-2 ml-6">
                  {Array.from({ length: getChapterCount(book.id) }, (_, i) => i + 1).map((chapter) => (
                    <button
                      key={chapter}
                      onClick={() => onSelectChapter(book.id, chapter)}
                      className={cn(
                        "w-8 h-8 text-xs rounded-md hover:bg-primary hover:text-primary-foreground transition-colors",
                        currentBook === book.id && currentChapter === chapter
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "bg-sidebar-accent/50 text-sidebar-foreground"
                      )}
                    >
                      {chapter}
                    </button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
  
  return (
    <ScrollArea className="h-full">
      <div className="p-2 space-y-1">
        {renderTestament('OT', 'Old Testament', otBooks)}
        {renderTestament('NT', 'New Testament', ntBooks)}
      </div>
    </ScrollArea>
  );
}
