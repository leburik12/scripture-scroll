import { useState, useEffect } from 'react';
import { 
  setBibleData, 
  setBibleDataEnglish,
  BIBLE_BOOKS, 
  type Chapter, 
  type RawAmharicBible 
} from '@/data/bibleData';

interface RawEnglishBook {
  abbrev: string;
  chapters: string[][];
}

export function useBibleLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function loadBible() {
      try {
        setIsLoading(true);
        setProgress(10);

        // Fetch both Bibles in parallel
        const [amharicResponse, englishResponse] = await Promise.all([
          fetch('/amharic_bible.json'),
          fetch('/english_bible.json'),
        ]);
        
        if (!amharicResponse.ok) {
          throw new Error('Failed to load Amharic Bible data');
        }
        if (!englishResponse.ok) {
          throw new Error('Failed to load English Bible data');
        }

        setProgress(40);

        const [amharicData, englishData] = await Promise.all([
          amharicResponse.json() as Promise<RawAmharicBible>,
          englishResponse.json() as Promise<RawEnglishBook[]>,
        ]);
        
        setProgress(60);

        // Transform Amharic data
        const bibleData: Record<string, Chapter[]> = {};
        amharicData.books.forEach((rawBook, index) => {
          const bookInfo = BIBLE_BOOKS[index];
          if (!bookInfo) return;

          const chapters: Chapter[] = rawBook.chapters.map((rawChapter) => ({
            number: parseInt(rawChapter.chapter, 10),
            verses: rawChapter.verses.map((text, verseIndex) => ({
              number: verseIndex + 1,
              text: text || '',
            })),
          }));

          bibleData[bookInfo.id] = chapters;
        });

        setProgress(75);

        // Transform English KJV data
        const englishBibleData: Record<string, Chapter[]> = {};
        englishData.forEach((rawBook, index) => {
          const bookInfo = BIBLE_BOOKS[index];
          if (!bookInfo) return;

          const chapters: Chapter[] = rawBook.chapters.map((verses, chapterIndex) => ({
            number: chapterIndex + 1,
            verses: verses.map((text, verseIndex) => ({
              number: verseIndex + 1,
              text: text || '',
            })),
          }));

          englishBibleData[bookInfo.id] = chapters;
        });

        setProgress(90);

        // Set the Bible data globally
        setBibleData(bibleData);
        setBibleDataEnglish(englishBibleData);

        setProgress(100);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading Bible:', err);
        setError(err instanceof Error ? err.message : 'Failed to load Bible');
        setIsLoading(false);
      }
    }

    loadBible();
  }, []);

  return { isLoading, error, progress };
}
