import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Search, Download, BookOpen, Filter, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type BookCategory =
  | 'Biblical Studies'
  | 'Systematic Theology'
  | 'Prayer & Intercession'
  | 'Christian Living'
  | 'Church History'
  | 'Biographies';

interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  coverColor: string;
  telegramLink: string;
  featured?: boolean;
}

const CATEGORIES: BookCategory[] = [
  'Biblical Studies',
  'Systematic Theology',
  'Prayer & Intercession',
  'Christian Living',
  'Church History',
  'Biographies',
];

const BOOKS: Book[] = [
  {
    id: 'pursuit-of-god',
    title: 'The Pursuit of God',
    author: 'A.W. Tozer',
    category: 'Christian Living',
    coverColor: 'from-amber-700 to-amber-900',
    telegramLink: 'https://t.me/SpiritLib?start=pursuit-of-god',
    featured: true,
  },
  {
    id: 'mere-christianity',
    title: 'Mere Christianity',
    author: 'C.S. Lewis',
    category: 'Systematic Theology',
    coverColor: 'from-blue-800 to-indigo-900',
    telegramLink: 'https://t.me/SpiritLib?start=mere-christianity',
    featured: true,
  },
  {
    id: 'systematic-theology',
    title: 'Systematic Theology',
    author: 'Wayne Grudem',
    category: 'Systematic Theology',
    coverColor: 'from-slate-700 to-slate-900',
    telegramLink: 'https://t.me/SpiritLib?start=systematic-theology',
  },
  {
    id: 'cost-of-discipleship',
    title: 'The Cost of Discipleship',
    author: 'Dietrich Bonhoeffer',
    category: 'Christian Living',
    coverColor: 'from-red-800 to-red-950',
    telegramLink: 'https://t.me/SpiritLib?start=cost-of-discipleship',
    featured: true,
  },
  {
    id: 'knowing-god',
    title: 'Knowing God',
    author: 'J.I. Packer',
    category: 'Systematic Theology',
    coverColor: 'from-emerald-700 to-emerald-900',
    telegramLink: 'https://t.me/SpiritLib?start=knowing-god',
  },
  {
    id: 'power-through-prayer',
    title: 'Power Through Prayer',
    author: 'E.M. Bounds',
    category: 'Prayer & Intercession',
    coverColor: 'from-violet-700 to-violet-900',
    telegramLink: 'https://t.me/SpiritLib?start=power-through-prayer',
  },
  {
    id: 'intercessory-prayer',
    title: 'Intercessory Prayer',
    author: 'Dutch Sheets',
    category: 'Prayer & Intercession',
    coverColor: 'from-sky-700 to-sky-900',
    telegramLink: 'https://t.me/SpiritLib?start=intercessory-prayer',
  },
  {
    id: 'church-history-plain',
    title: 'Church History in Plain Language',
    author: 'Bruce L. Shelley',
    category: 'Church History',
    coverColor: 'from-orange-700 to-orange-900',
    telegramLink: 'https://t.me/SpiritLib?start=church-history-plain',
  },
  {
    id: 'foxes-book-martyrs',
    title: "Foxe's Book of Martyrs",
    author: 'John Foxe',
    category: 'Church History',
    coverColor: 'from-stone-700 to-stone-900',
    telegramLink: 'https://t.me/SpiritLib?start=foxes-book-martyrs',
  },
  {
    id: 'george-muller',
    title: 'The Autobiography of George Müller',
    author: 'George Müller',
    category: 'Biographies',
    coverColor: 'from-teal-700 to-teal-900',
    telegramLink: 'https://t.me/SpiritLib?start=george-muller',
  },
  {
    id: 'shadow-almighty',
    title: 'Shadow of the Almighty',
    author: 'Elisabeth Elliot',
    category: 'Biographies',
    coverColor: 'from-cyan-800 to-cyan-950',
    telegramLink: 'https://t.me/SpiritLib?start=shadow-almighty',
  },
  {
    id: 'how-to-read-bible',
    title: 'How to Read the Bible for All Its Worth',
    author: 'Gordon D. Fee',
    category: 'Biblical Studies',
    coverColor: 'from-rose-700 to-rose-900',
    telegramLink: 'https://t.me/SpiritLib?start=how-to-read-bible',
  },
];

const ITEMS_PER_PAGE = 4;

function BookCover({ book }: { book: Book }) {
  return (
    <div
      className={cn(
        'relative w-full h-52 rounded-md shadow-lg overflow-hidden bg-gradient-to-br',
        book.coverColor
      )}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <BookOpen className="w-8 h-8 text-white/40 mb-3" />
        <h4 className="text-white font-bold text-sm leading-tight line-clamp-3">
          {book.title}
        </h4>
        <p className="text-white/60 text-xs mt-2">{book.author}</p>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-black/20" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent" />
    </div>
  );
}

function BookCard({ book, style }: { book: Book; style?: React.CSSProperties }) {
  return (
    <div className="group flex flex-col h-full animate-fade-in" style={style}>
      {/* Cover - fixed height */}
      <div className="relative mb-3 transition-transform duration-200 group-hover:scale-[1.03] group-hover:-translate-y-1">
        <BookCover book={book} />
      </div>

      {/* Info - flex grow to push button down */}
      <div className="flex flex-col flex-1">
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug mb-1 h-10">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
        <Badge variant="secondary" className="w-fit text-[10px] mb-3">
          {book.category}
        </Badge>

        <div className="mt-auto">
          <Button
            size="sm"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium text-xs shadow-sm"
            onClick={() => window.open(book.telegramLink, '_blank')}
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download on Telegram
          </Button>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      <div className="w-full h-52 rounded-md bg-muted mb-3" />
      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
      <div className="h-3 bg-muted rounded w-1/2 mb-2" />
      <div className="h-5 bg-muted rounded-full w-20 mb-3" />
      <div className="mt-auto h-8 bg-muted rounded" />
    </div>
  );
}

export function EbooksLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<BookCategory | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      const matchesSearch =
        !searchQuery ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !activeCategory || book.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, activeCategory]);

  const hasMore = visibleCount < filteredBooks.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    // Simulate network fetch delay
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredBooks.length));
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore, filteredBooks.length]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const visibleBooks = filteredBooks.slice(0, visibleCount);
  const featuredBooks = useMemo(() => BOOKS.filter((b) => b.featured), []);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
      {/* Header */}
      <div className="rounded-xl border border-border bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 px-6 py-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground tracking-tight">SpiritLib</h2>
          <span className="text-sm text-muted-foreground ml-2">Free Spiritual Library</span>
        </div>

        {/* Search */}
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9 h-10 text-sm bg-background/80"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Categories
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
              !activeCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            )}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Rail */}
      {!searchQuery && !activeCategory && (
        <div className="mb-6 pb-6 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            ✨ Featured Books
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {featuredBooks.map((book) => (
              <div key={book.id} className="flex-shrink-0 w-32">
                <BookCover book={book} />
                <p className="text-xs font-medium text-foreground mt-2 line-clamp-1">
                  {book.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground">
          Showing {visibleBooks.length} of {filteredBooks.length}{' '}
          {filteredBooks.length === 1 ? 'book' : 'books'}
          {activeCategory && <span> in "{activeCategory}"</span>}
        </p>
      </div>

      {/* Book Grid - equal height cards */}
      {visibleBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {visibleBooks.map((book, i) => (
            <BookCard
              key={book.id}
              book={book}
              style={{ animationDelay: `${(i % ITEMS_PER_PAGE) * 80}ms` }}
            />
          ))}
          {/* Loading skeletons */}
          {isLoading &&
            Array.from({ length: Math.min(ITEMS_PER_PAGE, filteredBooks.length - visibleCount) }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">No books found</p>
          <p className="text-xs text-muted-foreground mt-1">
            Try adjusting your search or filter
          </p>
        </div>
      )}

      {/* Infinite scroll sentinel */}
      {hasMore && (
        <div ref={sentinelRef} className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
          <span className="text-xs text-muted-foreground ml-2">Loading more books...</span>
        </div>
      )}

      {/* End of list */}
      {!hasMore && visibleBooks.length > 0 && (
        <div className="text-center py-8 border-t border-border mt-6">
          <p className="text-xs text-muted-foreground">
            📚 All books are free for spiritual growth
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">
            Request books via our Telegram channel
          </p>
        </div>
      )}
    </div>
  );
}
