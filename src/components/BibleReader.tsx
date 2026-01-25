import { useState, useMemo, useCallback } from 'react';
import { 
  Search, 
  Menu, 
  Bookmark, 
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AppSidebar } from '@/components/AppSidebar';
import { BibleNavigation } from '@/components/BibleNavigation';
import { ChapterDisplay } from '@/components/VerseDisplay';
import { ChapterNavigation } from '@/components/ChapterNavigation';
import { SearchPanel } from '@/components/SearchPanel';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSelector } from '@/components/LanguageSelector';
import { BookmarksList } from '@/components/BookmarksList';
import { useBible } from '@/hooks/useBible';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { getChapter, ENGLISH_BOOK_NAMES } from '@/data/bibleData';
import { cn } from '@/lib/utils';

// Today's verse configuration - John 14:23
const VERSE_OF_THE_DAY = {
  bookId: 'jhn',
  chapter: 14,
  verse: 23,
};

export function BibleReader() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  const {
    currentBook,
    currentChapter,
    chapter,
    bookName,
    chapterCount,
    goToBook,
    goToChapter,
    goToLocation,
    nextChapter,
    prevChapter,
    bookmarks,
    toggleBookmark,
    isBookmarked,
    canResume,
    resumeReading,
  } = useBible();
  
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  
  // Get chapter based on language
  const displayChapter = useMemo(() => {
    return getChapter(currentBook, currentChapter, language);
  }, [currentBook, currentChapter, language]);
  
  // Get display book name based on language
  const displayBookName = useMemo(() => {
    if (language === 'english') {
      return ENGLISH_BOOK_NAMES[currentBook] || bookName;
    }
    return bookName;
  }, [language, currentBook, bookName]);
  
  // Keyboard navigation
  useKeyboardNavigation({
    onLeft: prevChapter,
    onRight: nextChapter,
    onSearch: () => setSearchOpen(true),
    onEscape: () => {
      setSearchOpen(false);
      setBookmarksOpen(false);
    },
  }, !searchOpen);
  
  // Handle search result navigation
  const handleSearchResultClick = useCallback((bookId: string, chapterNum: number, verse: number) => {
    goToLocation(bookId, chapterNum, verse);
    setSearchOpen(false);
  }, [goToLocation]);
  
  // Handle bookmark navigation
  const handleBookmarkClick = useCallback((bookId: string, chapterNum: number, verse: number) => {
    goToLocation(bookId, chapterNum, verse);
    setBookmarksOpen(false);
  }, [goToLocation]);
  
  // Handle today's verse navigation
  const handleNavigateToVerse = useCallback(() => {
    goToLocation(VERSE_OF_THE_DAY.bookId, VERSE_OF_THE_DAY.chapter, VERSE_OF_THE_DAY.verse);
  }, [goToLocation]);
  
  // Create bookmark map for current chapter
  const bookmarkSet = useMemo(() => {
    return new Set(
      bookmarks
        .filter(b => b.bookId === currentBook && b.chapter === currentChapter)
        .map(b => b.verse)
    );
  }, [bookmarks, currentBook, currentChapter]);
  
  return (
    <div className="flex min-h-screen w-full bg-background transition-theme">
      {/* Desktop Sidebar */}
      <AppSidebar
        currentBook={currentBook}
        currentChapter={currentChapter}
        onSelectBook={goToBook}
        onSelectChapter={goToLocation}
        collapsed={!sidebarOpen}
        onToggleCollapse={() => setSidebarOpen(!sidebarOpen)}
        onNavigateToVerse={handleNavigateToVerse}
      />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile Menu */}
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex items-center gap-2 p-4 border-b border-border">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="font-semibold">መጽሐፍ ቅዱስ</span>
                </div>
                <BibleNavigation
                  currentBook={currentBook}
                  currentChapter={currentChapter}
                  onSelectBook={(bookId) => {
                    goToBook(bookId);
                    setMobileNavOpen(false);
                  }}
                  onSelectChapter={(bookId, chapter) => {
                    goToLocation(bookId, chapter);
                    setMobileNavOpen(false);
                  }}
                />
              </SheetContent>
            </Sheet>
            
            {/* Chapter Navigation */}
            <ChapterNavigation
              bookName={displayBookName}
              chapter={currentChapter}
              totalChapters={chapterCount}
              onPrevious={prevChapter}
              onNext={nextChapter}
              className="flex-1 mx-4"
            />
            
            {/* Actions */}
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchOpen(true)}
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>ፈልግ (Press /)</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setBookmarksOpen(true)}
                    className="relative"
                  >
                    <Bookmark className="w-5 h-5" />
                    {bookmarks.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                        {bookmarks.length > 9 ? '9+' : bookmarks.length}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>ዕልባቶች</TooltipContent>
              </Tooltip>
              
              <LanguageSelector />
              <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
            </div>
          </div>
        </header>
        
        {/* Scripture Content */}
        <ScrollArea className="flex-1">
          <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12">
            {displayChapter ? (
              <ChapterDisplay
                verses={displayChapter.verses}
                bookmarkMap={bookmarkSet}
                showVerseNumbers={true}
                onVerseClick={(verseNum) => toggleBookmark(verseNum)}
                onBookmarkClick={(verseNum) => toggleBookmark(verseNum)}
              />
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  ምዕራፍ አልተገኘም
                </h2>
                <p className="text-muted-foreground">
                  ይህ ምዕራፍ ገና አልተጫነም። ኦሪት ዘፍጥረት 1 ወይም የዮሐንስ ወንጌል 1 ይምረጡ።
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Resume Reading Banner */}
        {canResume && (
          <div className="sticky bottom-4 mx-4">
            <Button
              onClick={resumeReading}
              className="w-full md:w-auto md:mx-auto shadow-soft"
            >
              ማንበብ ቀጥል
            </Button>
          </div>
        )}
      </main>
      
      {/* Search Panel */}
      <SearchPanel
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onResultClick={handleSearchResultClick}
      />
      
      {/* Bookmarks Sheet */}
      <Sheet open={bookmarksOpen} onOpenChange={setBookmarksOpen}>
        <SheetContent>
          <BookmarksList
            bookmarks={bookmarks}
            onBookmarkClick={handleBookmarkClick}
            onRemoveBookmark={(id) => {
              const bookmark = bookmarks.find(b => b.id === id);
              if (bookmark) {
                toggleBookmark(bookmark.verse);
              }
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
