// Local storage utilities for bookmarks, notes, and reading progress

export interface Bookmark {
  id: string;
  bookId: string;
  chapter: number;
  verse: number;
  createdAt: number;
}

export interface VerseNote {
  id: string;
  bookId: string;
  chapter: number;
  verse: number;
  text: string;
  highlight?: 'yellow' | 'green' | 'blue' | 'pink';
  createdAt: number;
  updatedAt: number;
}

export interface ReadingProgress {
  bookId: string;
  chapter: number;
  verse: number;
  timestamp: number;
}

const STORAGE_KEYS = {
  BOOKMARKS: 'bible-app-bookmarks',
  NOTES: 'bible-app-notes',
  READING_PROGRESS: 'bible-app-reading-progress',
  THEME: 'bible-app-theme',
  READING_SETTINGS: 'bible-app-reading-settings',
};

// Bookmarks
export function getBookmarks(): Bookmark[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addBookmark(bookmark: Omit<Bookmark, 'id' | 'createdAt'>): Bookmark {
  const bookmarks = getBookmarks();
  const newBookmark: Bookmark = {
    ...bookmark,
    id: `${bookmark.bookId}-${bookmark.chapter}-${bookmark.verse}-${Date.now()}`,
    createdAt: Date.now(),
  };
  bookmarks.push(newBookmark);
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  return newBookmark;
}

export function removeBookmark(id: string): void {
  const bookmarks = getBookmarks().filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
}

export function isVerseBookmarked(bookId: string, chapter: number, verse: number): boolean {
  return getBookmarks().some(
    b => b.bookId === bookId && b.chapter === chapter && b.verse === verse
  );
}

// Notes
export function getNotes(): VerseNote[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.NOTES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getVerseNote(bookId: string, chapter: number, verse: number): VerseNote | undefined {
  return getNotes().find(
    n => n.bookId === bookId && n.chapter === chapter && n.verse === verse
  );
}

export function saveNote(note: Omit<VerseNote, 'id' | 'createdAt' | 'updatedAt'>): VerseNote {
  const notes = getNotes();
  const existing = notes.findIndex(
    n => n.bookId === note.bookId && n.chapter === note.chapter && n.verse === note.verse
  );
  
  const now = Date.now();
  
  if (existing >= 0) {
    notes[existing] = {
      ...notes[existing],
      ...note,
      updatedAt: now,
    };
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    return notes[existing];
  }
  
  const newNote: VerseNote = {
    ...note,
    id: `${note.bookId}-${note.chapter}-${note.verse}-${now}`,
    createdAt: now,
    updatedAt: now,
  };
  notes.push(newNote);
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  return newNote;
}

export function deleteNote(id: string): void {
  const notes = getNotes().filter(n => n.id !== id);
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
}

// Reading Progress
export function getReadingProgress(): ReadingProgress | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.READING_PROGRESS);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveReadingProgress(progress: Omit<ReadingProgress, 'timestamp'>): void {
  const data: ReadingProgress = {
    ...progress,
    timestamp: Date.now(),
  };
  localStorage.setItem(STORAGE_KEYS.READING_PROGRESS, JSON.stringify(data));
}

// Theme
export type Theme = 'light' | 'dark' | 'sepia';

export function getTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    return (stored as Theme) || 'light';
  } catch {
    return 'light';
  }
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  document.documentElement.classList.remove('light', 'dark', 'sepia');
  document.documentElement.classList.add(theme);
}

// Reading Settings
export interface ReadingSettings {
  fontSize: number;
  lineHeight: number;
  showVerseNumbers: boolean;
}

const DEFAULT_READING_SETTINGS: ReadingSettings = {
  fontSize: 18,
  lineHeight: 1.9,
  showVerseNumbers: true,
};

export function getReadingSettings(): ReadingSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.READING_SETTINGS);
    return stored ? { ...DEFAULT_READING_SETTINGS, ...JSON.parse(stored) } : DEFAULT_READING_SETTINGS;
  } catch {
    return DEFAULT_READING_SETTINGS;
  }
}

export function saveReadingSettings(settings: Partial<ReadingSettings>): void {
  const current = getReadingSettings();
  localStorage.setItem(STORAGE_KEYS.READING_SETTINGS, JSON.stringify({ ...current, ...settings }));
}
