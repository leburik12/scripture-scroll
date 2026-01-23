import { useState, useEffect } from 'react';
import { 
  setBibleData, 
  BIBLE_BOOKS, 
  BOOK_ID_TO_INDEX, 
  type Chapter, 
  type RawAmharicBible 
} from '@/data/bibleData';

export function useBibleLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function loadBible() {
      try {
        setIsLoading(true);
        setProgress(10);

        // Fetch the Amharic Bible JSON
        const response = await fetch('/amharic_bible.json');
        if (!response.ok) {
          throw new Error('Failed to load Bible data');
        }

        setProgress(40);

        const rawData: RawAmharicBible = await response.json();
        
        setProgress(60);

        // Transform the raw data into our format
        const bibleData: Record<string, Chapter[]> = {};

        rawData.books.forEach((rawBook, index) => {
          // Find the matching book ID from our BIBLE_BOOKS array
          const bookInfo = BIBLE_BOOKS[index];
          if (!bookInfo) return;

          const chapters: Chapter[] = rawBook.chapters.map((rawChapter) => ({
            number: parseInt(rawChapter.chapter, 10),
            verses: rawChapter.verses.map((text, verseIndex) => ({
              number: verseIndex + 1,
              text: text || '', // Handle empty verses (combined verses in Amharic)
            })),
          }));

          bibleData[bookInfo.id] = chapters;
        });

        setProgress(90);

        // Set the Bible data globally
        setBibleData(bibleData);

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
