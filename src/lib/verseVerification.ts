// Verse verification utility to check content alignment between English and Amharic Bibles

import { BIBLE_DATA, BIBLE_DATA_EN, BIBLE_BOOKS, ENGLISH_BOOK_NAMES } from '@/data/bibleData';

export interface VerseDiscrepancy {
  bookId: string;
  bookName: string;
  chapter: number;
  amharicCount: number;
  englishCount: number;
  difference: number;
  type: 'missing_amharic' | 'missing_english' | 'count_mismatch';
}

export interface VerificationReport {
  totalBooks: number;
  booksChecked: number;
  totalChapters: number;
  chaptersWithIssues: number;
  discrepancies: VerseDiscrepancy[];
  timestamp: number;
}

/**
 * Verify verse alignment between English and Amharic Bible versions
 * Returns a detailed report of any discrepancies found
 */
export function verifyBibleContent(): VerificationReport {
  const discrepancies: VerseDiscrepancy[] = [];
  let totalChapters = 0;
  let chaptersWithIssues = 0;
  let booksChecked = 0;

  for (const book of BIBLE_BOOKS) {
    const amharicChapters = BIBLE_DATA[book.id] || [];
    const englishChapters = BIBLE_DATA_EN[book.id] || [];
    
    if (amharicChapters.length === 0 && englishChapters.length === 0) {
      continue;
    }
    
    booksChecked++;
    const maxChapters = Math.max(amharicChapters.length, englishChapters.length);
    
    for (let i = 0; i < maxChapters; i++) {
      totalChapters++;
      const amharicChapter = amharicChapters[i];
      const englishChapter = englishChapters[i];
      
      const amharicVerseCount = amharicChapter?.verses?.length || 0;
      const englishVerseCount = englishChapter?.verses?.length || 0;
      
      if (amharicVerseCount !== englishVerseCount) {
        chaptersWithIssues++;
        const chapterNum = i + 1;
        
        let type: VerseDiscrepancy['type'];
        if (amharicVerseCount === 0) {
          type = 'missing_amharic';
        } else if (englishVerseCount === 0) {
          type = 'missing_english';
        } else {
          type = 'count_mismatch';
        }
        
        discrepancies.push({
          bookId: book.id,
          bookName: ENGLISH_BOOK_NAMES[book.id] || book.name,
          chapter: chapterNum,
          amharicCount: amharicVerseCount,
          englishCount: englishVerseCount,
          difference: Math.abs(englishVerseCount - amharicVerseCount),
          type,
        });
      }
    }
  }

  return {
    totalBooks: BIBLE_BOOKS.length,
    booksChecked,
    totalChapters,
    chaptersWithIssues,
    discrepancies,
    timestamp: Date.now(),
  };
}

/**
 * Log verification report to console with formatting
 */
export function logVerificationReport(report: VerificationReport): void {
  console.group('📖 Bible Content Verification Report');
  console.log(`📚 Books checked: ${report.booksChecked}/${report.totalBooks}`);
  console.log(`📄 Total chapters: ${report.totalChapters}`);
  console.log(`⚠️ Chapters with issues: ${report.chaptersWithIssues}`);
  
  if (report.discrepancies.length > 0) {
    console.group('🔍 Discrepancies Found:');
    
    // Group by book
    const byBook = report.discrepancies.reduce((acc, d) => {
      if (!acc[d.bookName]) acc[d.bookName] = [];
      acc[d.bookName].push(d);
      return acc;
    }, {} as Record<string, VerseDiscrepancy[]>);
    
    for (const [bookName, issues] of Object.entries(byBook)) {
      console.group(`📕 ${bookName} (${issues.length} issues)`);
      for (const issue of issues) {
        const icon = issue.type === 'missing_amharic' ? '🔴' : 
                     issue.type === 'missing_english' ? '🔵' : '🟡';
        console.log(
          `${icon} Chapter ${issue.chapter}: EN=${issue.englishCount} vs AM=${issue.amharicCount} (diff: ${issue.difference})`
        );
      }
      console.groupEnd();
    }
    console.groupEnd();
  } else {
    console.log('✅ All verses are aligned between English and Amharic versions!');
  }
  
  console.groupEnd();
}

/**
 * Get a specific verse from both versions
 */
export function getDualVerse(
  bookId: string, 
  chapter: number, 
  verse: number
): { amharic: string; english: string; bookName: string } | null {
  const amharicChapters = BIBLE_DATA[bookId];
  const englishChapters = BIBLE_DATA_EN[bookId];
  
  const amharicChapter = amharicChapters?.find(c => c.number === chapter);
  const englishChapter = englishChapters?.find(c => c.number === chapter);
  
  const amharicVerse = amharicChapter?.verses?.find(v => v.number === verse);
  const englishVerse = englishChapter?.verses?.find(v => v.number === verse);
  
  if (!amharicVerse && !englishVerse) {
    return null;
  }
  
  const book = BIBLE_BOOKS.find(b => b.id === bookId);
  
  return {
    amharic: amharicVerse?.text || '',
    english: englishVerse?.text || '',
    bookName: book?.amharicName || ENGLISH_BOOK_NAMES[bookId] || bookId,
  };
}
