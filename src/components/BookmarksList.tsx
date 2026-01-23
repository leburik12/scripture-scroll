import { Bookmark, Trash2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getBook } from '@/data/bibleData';
import type { Bookmark as BookmarkType } from '@/lib/storage';

interface BookmarksListProps {
  bookmarks: BookmarkType[];
  onBookmarkClick: (bookId: string, chapter: number, verse: number) => void;
  onRemoveBookmark: (id: string) => void;
}

export function BookmarksList({
  bookmarks,
  onBookmarkClick,
  onRemoveBookmark,
}: BookmarksListProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-center">
        <Bookmark className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Bookmarks Yet</h3>
        <p className="text-sm text-muted-foreground max-w-[200px]">
          Click on any verse while reading to bookmark it
        </p>
      </div>
    );
  }
  
  // Group bookmarks by book
  const groupedBookmarks = bookmarks.reduce((acc, bookmark) => {
    if (!acc[bookmark.bookId]) {
      acc[bookmark.bookId] = [];
    }
    acc[bookmark.bookId].push(bookmark);
    return acc;
  }, {} as Record<string, BookmarkType[]>);
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Bookmarks</h2>
        <span className="ml-auto text-sm text-muted-foreground">
          {bookmarks.length} saved
        </span>
      </div>
      
      <ScrollArea className="flex-1 -mx-4 px-4">
        <div className="space-y-4">
          {Object.entries(groupedBookmarks).map(([bookId, bookBookmarks]) => {
            const book = getBook(bookId);
            if (!book) return null;
            
            return (
              <div key={bookId}>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  {book.name}
                </h3>
                <div className="space-y-1">
                  {bookBookmarks
                    .sort((a, b) => a.chapter - b.chapter || a.verse - b.verse)
                    .map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className="flex items-center group"
                      >
                        <button
                          onClick={() => onBookmarkClick(bookmark.bookId, bookmark.chapter, bookmark.verse)}
                          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors text-left"
                        >
                          <Bookmark className="w-4 h-4 text-gold fill-gold shrink-0" />
                          <span className="text-sm">
                            Chapter {bookmark.chapter}:{bookmark.verse}
                          </span>
                        </button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveBookmark(bookmark.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
