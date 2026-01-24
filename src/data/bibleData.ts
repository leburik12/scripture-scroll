// Bible structure for dual-language Bible (Amharic + English)
// Data loaded from amharic_bible.json and english_bible.json

export interface Verse {
  number: number;
  text: string;
}

export interface DualVerse {
  number: number;
  amharic: string;
  english: string;
}

export interface Chapter {
  number: number;
  verses: Verse[];
}

export interface Book {
  id: string;
  name: string;
  amharicName: string;
  shortName: string;
  testament: 'OT' | 'NT';
  chapters: Chapter[];
}

export interface BibleData {
  books: Book[];
}

export interface RawAmharicBible {
  title: string;
  books: {
    title: string;
    abbv: string;
    chapters: {
      chapter: string;
      title: string;
      verses: string[];
    }[];
  }[];
}

// Complete Bible structure with books (Amharic names)
export const BIBLE_BOOKS: Omit<Book, 'chapters'>[] = [
  // Old Testament - ብሉይ ኪዳን
  { id: 'gen', name: 'ኦሪት ዘፍጥረት', amharicName: 'ኦሪት ዘፍጥረት', shortName: 'ዘፍ', testament: 'OT' },
  { id: 'exo', name: 'ኦሪት ዘጸአት', amharicName: 'ኦሪት ዘጸአት', shortName: 'ዘጸ', testament: 'OT' },
  { id: 'lev', name: 'ኦሪት ዘሌዋውያን', amharicName: 'ኦሪት ዘሌዋውያን', shortName: 'ዘሌ', testament: 'OT' },
  { id: 'num', name: 'ኦሪት ዘኍልቍ', amharicName: 'ኦሪት ዘኍልቍ', shortName: 'ዘኍ', testament: 'OT' },
  { id: 'deu', name: 'ኦሪት ዘዳግም', amharicName: 'ኦሪት ዘዳግም', shortName: 'ዘዳ', testament: 'OT' },
  { id: 'jos', name: 'መጽሐፈ ኢያሱ ወልደ ነዌ', amharicName: 'መጽሐፈ ኢያሱ ወልደ ነዌ', shortName: 'ኢያ', testament: 'OT' },
  { id: 'jdg', name: 'መጽሐፈ መሣፍንት', amharicName: 'መጽሐፈ መሣፍንት', shortName: 'መሣ', testament: 'OT' },
  { id: 'rut', name: 'መጽሐፈ ሩት', amharicName: 'መጽሐፈ ሩት', shortName: 'ሩት', testament: 'OT' },
  { id: '1sa', name: '1ኛ ሳሙኤል', amharicName: '1ኛ ሳሙኤል', shortName: '1ሳሙ', testament: 'OT' },
  { id: '2sa', name: '2ኛ ሳሙኤል', amharicName: '2ኛ ሳሙኤል', shortName: '2ሳሙ', testament: 'OT' },
  { id: '1ki', name: '1ኛ ነገሥት', amharicName: '1ኛ ነገሥት', shortName: '1ነገ', testament: 'OT' },
  { id: '2ki', name: '2ኛ ነገሥት', amharicName: '2ኛ ነገሥት', shortName: '2ነገ', testament: 'OT' },
  { id: '1ch', name: '1ኛ ዜና መዋዕል', amharicName: '1ኛ ዜና መዋዕል', shortName: '1ዜና', testament: 'OT' },
  { id: '2ch', name: '2ኛ ዜና መዋዕል', amharicName: '2ኛ ዜና መዋዕል', shortName: '2ዜና', testament: 'OT' },
  { id: 'ezr', name: 'መጽሐፈ ዕዝራ', amharicName: 'መጽሐፈ ዕዝራ', shortName: 'ዕዝራ', testament: 'OT' },
  { id: 'neh', name: 'መጽሐፈ ነህምያ', amharicName: 'መጽሐፈ ነህምያ', shortName: 'ነህ', testament: 'OT' },
  { id: 'est', name: 'መጽሐፈ አስቴር', amharicName: 'መጽሐፈ አስቴር', shortName: 'አስቴ', testament: 'OT' },
  { id: 'job', name: 'መጽሐፈ ኢዮብ', amharicName: 'መጽሐፈ ኢዮብ', shortName: 'ኢዮብ', testament: 'OT' },
  { id: 'psa', name: 'መዝሙረ ዳዊት', amharicName: 'መዝሙረ ዳዊት', shortName: 'መዝ', testament: 'OT' },
  { id: 'pro', name: 'መጽሐፈ ምሳሌ', amharicName: 'መጽሐፈ ምሳሌ', shortName: 'ምሳ', testament: 'OT' },
  { id: 'ecc', name: 'መጽሐፈ መክብብ', amharicName: 'መጽሐፈ መክብብ', shortName: 'መክ', testament: 'OT' },
  { id: 'sng', name: 'መኃልየ መኃልይ ዘሰሎሞን', amharicName: 'መኃልየ መኃልይ ዘሰሎሞን', shortName: 'መኃ', testament: 'OT' },
  { id: 'isa', name: 'ትንቢተ ኢሳይያስ', amharicName: 'ትንቢተ ኢሳይያስ', shortName: 'ኢሳ', testament: 'OT' },
  { id: 'jer', name: 'ትንቢተ ኤርምያስ', amharicName: 'ትንቢተ ኤርምያስ', shortName: 'ኤር', testament: 'OT' },
  { id: 'lam', name: 'ሰቆቃወ ኤርምያስ', amharicName: 'ሰቆቃወ ኤርምያስ', shortName: 'ሰቆ', testament: 'OT' },
  { id: 'ezk', name: 'ትንቢተ ሕዝቅኤል', amharicName: 'ትንቢተ ሕዝቅኤል', shortName: 'ሕዝ', testament: 'OT' },
  { id: 'dan', name: 'ትንቢተ ዳንኤል', amharicName: 'ትንቢተ ዳንኤል', shortName: 'ዳን', testament: 'OT' },
  { id: 'hos', name: 'ትንቢተ ሆሴዕ', amharicName: 'ትንቢተ ሆሴዕ', shortName: 'ሆሴ', testament: 'OT' },
  { id: 'jol', name: 'ትንቢተ ኢዩኤል', amharicName: 'ትንቢተ ኢዩኤል', shortName: 'ኢዩ', testament: 'OT' },
  { id: 'amo', name: 'ትንቢተ አሞጽ', amharicName: 'ትንቢተ አሞጽ', shortName: 'አሞ', testament: 'OT' },
  { id: 'oba', name: 'ትንቢተ አብድዩ', amharicName: 'ትንቢተ አብድዩ', shortName: 'አብድ', testament: 'OT' },
  { id: 'jon', name: 'ትንቢተ ዮናስ', amharicName: 'ትንቢተ ዮናስ', shortName: 'ዮና', testament: 'OT' },
  { id: 'mic', name: 'ትንቢተ ሚክያስ', amharicName: 'ትንቢተ ሚክያስ', shortName: 'ሚክ', testament: 'OT' },
  { id: 'nam', name: 'ትንቢተ ናሆም', amharicName: 'ትንቢተ ናሆም', shortName: 'ናሆ', testament: 'OT' },
  { id: 'hab', name: 'ትንቢተ ዕንባቆም', amharicName: 'ትንቢተ ዕንባቆም', shortName: 'ዕን', testament: 'OT' },
  { id: 'zep', name: 'ትንቢተ ሶፎንያስ', amharicName: 'ትንቢተ ሶፎንያስ', shortName: 'ሶፎ', testament: 'OT' },
  { id: 'hag', name: 'ትንቢተ ሐጌ', amharicName: 'ትንቢተ ሐጌ', shortName: 'ሐጌ', testament: 'OT' },
  { id: 'zec', name: 'ትንቢተ ዘካርያስ', amharicName: 'ትንቢተ ዘካርያስ', shortName: 'ዘካ', testament: 'OT' },
  { id: 'mal', name: 'ትንቢተ ሚልክያስ', amharicName: 'ትንቢተ ሚልክያስ', shortName: 'ሚል', testament: 'OT' },
  // New Testament - አዲስ ኪዳን
  { id: 'mat', name: 'የማቴዎስ ወንጌል', amharicName: 'የማቴዎስ ወንጌል', shortName: 'ማቴ', testament: 'NT' },
  { id: 'mrk', name: 'የማርቆስ ወንጌል', amharicName: 'የማርቆስ ወንጌል', shortName: 'ማር', testament: 'NT' },
  { id: 'luk', name: 'የሉቃስ ወንጌል', amharicName: 'የሉቃስ ወንጌል', shortName: 'ሉቃ', testament: 'NT' },
  { id: 'jhn', name: 'የዮሐንስ ወንጌል', amharicName: 'የዮሐንስ ወንጌል', shortName: 'ዮሐ', testament: 'NT' },
  { id: 'act', name: 'የሐዋርያት ሥራ', amharicName: 'የሐዋርያት ሥራ', shortName: 'ሐዋ', testament: 'NT' },
  { id: 'rom', name: 'ወደ ሮሜ ሰዎች', amharicName: 'ወደ ሮሜ ሰዎች', shortName: 'ሮሜ', testament: 'NT' },
  { id: '1co', name: '1ኛ ወደ ቆሮንቶስ ሰዎች', amharicName: '1ኛ ወደ ቆሮንቶስ ሰዎች', shortName: '1ቆሮ', testament: 'NT' },
  { id: '2co', name: '2ኛ ወደ ቆሮንቶስ ሰዎች', amharicName: '2ኛ ወደ ቆሮንቶስ ሰዎች', shortName: '2ቆሮ', testament: 'NT' },
  { id: 'gal', name: 'ወደ ገላትያ ሰዎች', amharicName: 'ወደ ገላትያ ሰዎች', shortName: 'ገላ', testament: 'NT' },
  { id: 'eph', name: 'ወደ ኤፌሶን ሰዎች', amharicName: 'ወደ ኤፌሶን ሰዎች', shortName: 'ኤፌ', testament: 'NT' },
  { id: 'php', name: 'ወደ ፊልጵስዩስ ሰዎች', amharicName: 'ወደ ፊልጵስዩስ ሰዎች', shortName: 'ፊል', testament: 'NT' },
  { id: 'col', name: 'ወደ ቆላስይስ ሰዎች', amharicName: 'ወደ ቆላስይስ ሰዎች', shortName: 'ቆላ', testament: 'NT' },
  { id: '1th', name: '1ኛ ወደ ተሰሎንቄ ሰዎች', amharicName: '1ኛ ወደ ተሰሎንቄ ሰዎች', shortName: '1ተሰ', testament: 'NT' },
  { id: '2th', name: '2ኛ ወደ ተሰሎንቄ ሰዎች', amharicName: '2ኛ ወደ ተሰሎንቄ ሰዎች', shortName: '2ተሰ', testament: 'NT' },
  { id: '1ti', name: '1ኛ ወደ ጢሞቴዎስ', amharicName: '1ኛ ወደ ጢሞቴዎስ', shortName: '1ጢሞ', testament: 'NT' },
  { id: '2ti', name: '2ኛ ወደ ጢሞቴዎስ', amharicName: '2ኛ ወደ ጢሞቴዎስ', shortName: '2ጢሞ', testament: 'NT' },
  { id: 'tit', name: 'ወደ ቲቶ', amharicName: 'ወደ ቲቶ', shortName: 'ቲቶ', testament: 'NT' },
  { id: 'phm', name: 'ወደ ፊልሞና', amharicName: 'ወደ ፊልሞና', shortName: 'ፊልሞ', testament: 'NT' },
  { id: 'heb', name: 'ወደ ዕብራውያን', amharicName: 'ወደ ዕብራውያን', shortName: 'ዕብ', testament: 'NT' },
  { id: 'jas', name: 'የያዕቆብ መልእክት', amharicName: 'የያዕቆብ መልእክት', shortName: 'ያዕ', testament: 'NT' },
  { id: '1pe', name: '1ኛ የጴጥሮስ መልእክት', amharicName: '1ኛ የጴጥሮስ መልእክት', shortName: '1ጴጥ', testament: 'NT' },
  { id: '2pe', name: '2ኛ የጴጥሮስ መልእክት', amharicName: '2ኛ የጴጥሮስ መልእክት', shortName: '2ጴጥ', testament: 'NT' },
  { id: '1jn', name: '1ኛ የዮሐንስ መልእክት', amharicName: '1ኛ የዮሐንስ መልእክት', shortName: '1ዮሐ', testament: 'NT' },
  { id: '2jn', name: '2ኛ የዮሐንስ መልእክት', amharicName: '2ኛ የዮሐንስ መልእክት', shortName: '2ዮሐ', testament: 'NT' },
  { id: '3jn', name: '3ኛ የዮሐንስ መልእክት', amharicName: '3ኛ የዮሐንስ መልእክት', shortName: '3ዮሐ', testament: 'NT' },
  { id: 'jud', name: 'የይሁዳ መልእክት', amharicName: 'የይሁዳ መልእክት', shortName: 'ይሁ', testament: 'NT' },
  { id: 'rev', name: 'የዮሐንስ ራእይ', amharicName: 'የዮሐንስ ራእይ', shortName: 'ራእ', testament: 'NT' },
];

// Book ID to index mapping for quick lookup
export const BOOK_ID_TO_INDEX: Record<string, number> = {
  gen: 0, exo: 1, lev: 2, num: 3, deu: 4, jos: 5, jdg: 6, rut: 7,
  '1sa': 8, '2sa': 9, '1ki': 10, '2ki': 11, '1ch': 12, '2ch': 13,
  ezr: 14, neh: 15, est: 16, job: 17, psa: 18, pro: 19, ecc: 20, sng: 21,
  isa: 22, jer: 23, lam: 24, ezk: 25, dan: 26, hos: 27, jol: 28, amo: 29,
  oba: 30, jon: 31, mic: 32, nam: 33, hab: 34, zep: 35, hag: 36, zec: 37, mal: 38,
  mat: 39, mrk: 40, luk: 41, jhn: 42, act: 43, rom: 44, '1co': 45, '2co': 46,
  gal: 47, eph: 48, php: 49, col: 50, '1th': 51, '2th': 52, '1ti': 53, '2ti': 54,
  tit: 55, phm: 56, heb: 57, jas: 58, '1pe': 59, '2pe': 60, '1jn': 61, '2jn': 62,
  '3jn': 63, jud: 64, rev: 65,
};

// Chapter counts for each book
export const CHAPTER_COUNTS: Record<string, number> = {
  gen: 50, exo: 40, lev: 27, num: 36, deu: 34, jos: 24, jdg: 21, rut: 4,
  '1sa': 31, '2sa': 24, '1ki': 22, '2ki': 25, '1ch': 29, '2ch': 36,
  ezr: 10, neh: 13, est: 10, job: 42, psa: 150, pro: 31, ecc: 12, sng: 8,
  isa: 66, jer: 52, lam: 5, ezk: 48, dan: 12, hos: 14, jol: 3, amo: 9,
  oba: 1, jon: 4, mic: 7, nam: 3, hab: 3, zep: 3, hag: 2, zec: 14, mal: 4,
  mat: 28, mrk: 16, luk: 24, jhn: 21, act: 28, rom: 16, '1co': 16, '2co': 13,
  gal: 6, eph: 6, php: 4, col: 4, '1th': 5, '2th': 3, '1ti': 6, '2ti': 4,
  tit: 3, phm: 1, heb: 13, jas: 5, '1pe': 5, '2pe': 3, '1jn': 5, '2jn': 1,
  '3jn': 1, jud: 1, rev: 22,
};

// Get book by ID
export function getBook(bookId: string): Omit<Book, 'chapters'> | undefined {
  return BIBLE_BOOKS.find(b => b.id === bookId);
}

// Get chapter count for a book
export function getChapterCount(bookId: string): number {
  return CHAPTER_COUNTS[bookId] || 0;
}

// Bible data storage - will be populated from JSON
export let BIBLE_DATA: Record<string, Chapter[]> = {};
export let BIBLE_DATA_EN: Record<string, Chapter[]> = {};

// Set Bible data (called after loading from JSON)
export function setBibleData(data: Record<string, Chapter[]>) {
  BIBLE_DATA = data;
}

export function setBibleDataEnglish(data: Record<string, Chapter[]>) {
  BIBLE_DATA_EN = data;
}

// Get chapter data
export function getChapter(bookId: string, chapterNum: number): Chapter | undefined {
  const chapters = BIBLE_DATA[bookId];
  if (!chapters) return undefined;
  return chapters.find(c => c.number === chapterNum);
}

export function getChapterEnglish(bookId: string, chapterNum: number): Chapter | undefined {
  const chapters = BIBLE_DATA_EN[bookId];
  if (!chapters) return undefined;
  return chapters.find(c => c.number === chapterNum);
}

// Get dual language chapter
export function getDualChapter(bookId: string, chapterNum: number): { number: number; verses: DualVerse[] } | undefined {
  const amharicChapter = getChapter(bookId, chapterNum);
  const englishChapter = getChapterEnglish(bookId, chapterNum);
  
  if (!amharicChapter && !englishChapter) return undefined;
  
  const maxVerses = Math.max(
    amharicChapter?.verses.length || 0,
    englishChapter?.verses.length || 0
  );
  
  const verses: DualVerse[] = [];
  for (let i = 0; i < maxVerses; i++) {
    verses.push({
      number: i + 1,
      amharic: amharicChapter?.verses[i]?.text || '',
      english: englishChapter?.verses[i]?.text || '',
    });
  }
  
  return { number: chapterNum, verses };
}

// Check if Bible data is loaded
export function isBibleDataLoaded(): boolean {
  return Object.keys(BIBLE_DATA).length > 0;
}

export function isEnglishBibleLoaded(): boolean {
  return Object.keys(BIBLE_DATA_EN).length > 0;
}

// English book names for display
export const ENGLISH_BOOK_NAMES: Record<string, string> = {
  gen: 'Genesis', exo: 'Exodus', lev: 'Leviticus', num: 'Numbers', deu: 'Deuteronomy',
  jos: 'Joshua', jdg: 'Judges', rut: 'Ruth', '1sa': '1 Samuel', '2sa': '2 Samuel',
  '1ki': '1 Kings', '2ki': '2 Kings', '1ch': '1 Chronicles', '2ch': '2 Chronicles',
  ezr: 'Ezra', neh: 'Nehemiah', est: 'Esther', job: 'Job', psa: 'Psalms',
  pro: 'Proverbs', ecc: 'Ecclesiastes', sng: 'Song of Solomon', isa: 'Isaiah',
  jer: 'Jeremiah', lam: 'Lamentations', ezk: 'Ezekiel', dan: 'Daniel', hos: 'Hosea',
  jol: 'Joel', amo: 'Amos', oba: 'Obadiah', jon: 'Jonah', mic: 'Micah',
  nam: 'Nahum', hab: 'Habakkuk', zep: 'Zephaniah', hag: 'Haggai', zec: 'Zechariah', mal: 'Malachi',
  mat: 'Matthew', mrk: 'Mark', luk: 'Luke', jhn: 'John', act: 'Acts',
  rom: 'Romans', '1co': '1 Corinthians', '2co': '2 Corinthians', gal: 'Galatians',
  eph: 'Ephesians', php: 'Philippians', col: 'Colossians', '1th': '1 Thessalonians',
  '2th': '2 Thessalonians', '1ti': '1 Timothy', '2ti': '2 Timothy', tit: 'Titus',
  phm: 'Philemon', heb: 'Hebrews', jas: 'James', '1pe': '1 Peter', '2pe': '2 Peter',
  '1jn': '1 John', '2jn': '2 John', '3jn': '3 John', jud: 'Jude', rev: 'Revelation',
};
