import { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  BIBLE_BOOKS, 
  getBook, 
  getChapter, 
  getChapterCount,
  type Chapter,
  type Verse 
} from '@/data/bibleData';
import { 
  getReadingProgress, 
  saveReadingProgress,
  getBookmarks,
  addBookmark,
  removeBookmark,
  isVerseBookmarked,
  type Bookmark
} from '@/lib/storage';

interface UseBibleReturn {
  // Current position
  currentBook: string;
  currentChapter: number;
  currentVerse: number;
  
  // Data
  chapter: Chapter | undefined;
  bookName: string;
  chapterCount: number;
  
  // Navigation
  goToBook: (bookId: string) => void;
  goToChapter: (chapter: number) => void;
  goToVerse: (verse: number) => void;
  goToLocation: (bookId: string, chapter: number, verse?: number) => void;
  nextChapter: () => void;
  prevChapter: () => void;
  
  // Bookmarks
  bookmarks: Bookmark[];
  toggleBookmark: (verse: number) => void;
  isBookmarked: (verse: number) => boolean;
  
  // Resume
  canResume: boolean;
  resumeReading: () => void;
}

export function useBible(): UseBibleReturn {
  const [currentBook, setCurrentBook] = useState('gen');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  
  // Load bookmarks on mount
  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);
  
  // Get current chapter data
  const chapter = useMemo(() => 
    getChapter(currentBook, currentChapter),
    [currentBook, currentChapter]
  );
  
  const book = useMemo(() => getBook(currentBook), [currentBook]);
  const bookName = book?.name ?? '';
  const chapterCount = getChapterCount(currentBook);
  
  // Save reading progress when position changes
  useEffect(() => {
    if (currentBook && currentChapter) {
      saveReadingProgress({
        bookId: currentBook,
        chapter: currentChapter,
        verse: currentVerse,
      });
    }
  }, [currentBook, currentChapter, currentVerse]);
  
  // Navigation functions
  const goToBook = useCallback((bookId: string) => {
    const newBook = getBook(bookId);
    if (newBook) {
      setCurrentBook(bookId);
      setCurrentChapter(1);
      setCurrentVerse(1);
    }
  }, []);
  
  const goToChapter = useCallback((chapterNum: number) => {
    const maxChapter = getChapterCount(currentBook);
    if (chapterNum >= 1 && chapterNum <= maxChapter) {
      setCurrentChapter(chapterNum);
      setCurrentVerse(1);
    }
  }, [currentBook]);
  
  const goToVerse = useCallback((verseNum: number) => {
    setCurrentVerse(verseNum);
  }, []);
  
  const goToLocation = useCallback((bookId: string, chapterNum: number, verseNum: number = 1) => {
    const newBook = getBook(bookId);
    if (newBook) {
      setCurrentBook(bookId);
      setCurrentChapter(chapterNum);
      setCurrentVerse(verseNum);
    }
  }, []);
  
  const nextChapter = useCallback(() => {
    const maxChapter = getChapterCount(currentBook);
    if (currentChapter < maxChapter) {
      setCurrentChapter(prev => prev + 1);
      setCurrentVerse(1);
    } else {
      // Go to next book
      const currentIndex = BIBLE_BOOKS.findIndex(b => b.id === currentBook);
      if (currentIndex < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[currentIndex + 1];
        setCurrentBook(nextBook.id);
        setCurrentChapter(1);
        setCurrentVerse(1);
      }
    }
  }, [currentBook, currentChapter]);
  
  const prevChapter = useCallback(() => {
    if (currentChapter > 1) {
      setCurrentChapter(prev => prev - 1);
      setCurrentVerse(1);
    } else {
      // Go to previous book
      const currentIndex = BIBLE_BOOKS.findIndex(b => b.id === currentBook);
      if (currentIndex > 0) {
        const prevBook = BIBLE_BOOKS[currentIndex - 1];
        const prevBookChapters = getChapterCount(prevBook.id);
        setCurrentBook(prevBook.id);
        setCurrentChapter(prevBookChapters);
        setCurrentVerse(1);
      }
    }
  }, [currentBook, currentChapter]);
  
  // Bookmark functions
  const toggleBookmark = useCallback((verse: number) => {
    const bookmarked = isVerseBookmarked(currentBook, currentChapter, verse);
    
    if (bookmarked) {
      const bookmark = bookmarks.find(
        b => b.bookId === currentBook && b.chapter === currentChapter && b.verse === verse
      );
      if (bookmark) {
        removeBookmark(bookmark.id);
      }
    } else {
      addBookmark({
        bookId: currentBook,
        chapter: currentChapter,
        verse,
      });
    }
    
    setBookmarks(getBookmarks());
  }, [currentBook, currentChapter, bookmarks]);
  
  const isBookmarked = useCallback((verse: number) => {
    return bookmarks.some(
      b => b.bookId === currentBook && b.chapter === currentChapter && b.verse === verse
    );
  }, [currentBook, currentChapter, bookmarks]);
  
  // Resume reading
  const savedProgress = useMemo(() => getReadingProgress(), []);
  const canResume = useMemo(() => {
    return !!savedProgress && (
      savedProgress.bookId !== currentBook ||
      savedProgress.chapter !== currentChapter
    );
  }, [savedProgress, currentBook, currentChapter]);
  
  const resumeReading = useCallback(() => {
    if (savedProgress) {
      goToLocation(savedProgress.bookId, savedProgress.chapter, savedProgress.verse);
    }
  }, [savedProgress, goToLocation]);
  
  return {
    currentBook,
    currentChapter,
    currentVerse,
    chapter,
    bookName,
    chapterCount,
    goToBook,
    goToChapter,
    goToVerse,
    goToLocation,
    nextChapter,
    prevChapter,
    bookmarks,
    toggleBookmark,
    isBookmarked,
    canResume,
    resumeReading,
  };
}
