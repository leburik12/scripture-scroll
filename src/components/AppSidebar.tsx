import { useState } from 'react';
import { 
  BookOpen, 
  Mic2, 
  Music, 
  Sparkles, 
  Mail, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  BookText,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { BibleNavigation } from '@/components/BibleNavigation';
import { cn } from '@/lib/utils';

type SidebarView = 'bible' | 'sermons' | 'songs' | 'ebooks' | 'meetings' | 'verse' | 'contact' | 'help';

interface AppSidebarProps {
  currentBook: string;
  currentChapter: number;
  onSelectBook: (bookId: string) => void;
  onSelectChapter: (bookId: string, chapter: number) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavigateToVerse?: () => void;
  onViewChange?: (view: SidebarView) => void;
}

const NAV_ITEMS: { id: SidebarView; label: string; amharicLabel: string; icon: React.ElementType }[] = [
  { id: 'bible', label: 'Bible', amharicLabel: 'መጽሐፍ ቅዱስ', icon: BookOpen },
  { id: 'sermons', label: 'Sermons', amharicLabel: 'ስብከቶች', icon: Mic2 },
  { id: 'songs', label: 'Free Songs', amharicLabel: 'ነፃ መዝሙሮች', icon: Music },
  { id: 'ebooks', label: 'Free Ebooks', amharicLabel: 'ነፃ መጻሕፍት', icon: BookText },
  { id: 'meetings', label: 'Meetings', amharicLabel: 'ስብሰባዎች', icon: Users },
  { id: 'verse', label: "Today's Verse", amharicLabel: 'የዛሬ ጥቅስ', icon: Sparkles },
  { id: 'contact', label: 'Contact Us', amharicLabel: 'አግኙን', icon: Mail },
  { id: 'help', label: 'Help', amharicLabel: 'እገዛ', icon: HelpCircle },
];

export function AppSidebar({
  currentBook,
  currentChapter,
  onSelectBook,
  onSelectChapter,
  collapsed,
  onToggleCollapse,
  onNavigateToVerse,
  onViewChange,
}: AppSidebarProps) {
  const [activeView, setActiveView] = useState<SidebarView>('bible');

  const handleNavClick = (id: SidebarView) => {
    setActiveView(id);
    if (id === 'verse' && onNavigateToVerse) {
      onNavigateToVerse();
    }
    onViewChange?.(id);
  };

  if (collapsed) {
    return (
      <aside className="flex flex-col w-14 border-r border-sidebar-border bg-sidebar">
        <div className="flex items-center justify-center p-3 border-b border-sidebar-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center py-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              onClick={() => {
                onToggleCollapse();
                handleNavClick(item.id);
              }}
              className={cn(
                "w-10 h-10",
                activeView === item.id && "bg-sidebar-accent text-primary"
              )}
            >
              <item.icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex flex-col w-72 border-r border-sidebar-border bg-sidebar transition-all duration-300">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sidebar-foreground">መጽሐፍ ቅዱስ</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Navigation Links */}
      <div className="px-2 py-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={cn(
              "flex items-center w-full gap-3 px-3 py-2 text-sm rounded-md transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              activeView === item.id 
                ? "bg-sidebar-accent text-primary font-medium" 
                : "text-sidebar-foreground"
            )}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span>{item.amharicLabel}</span>
          </button>
        ))}
      </div>
      
      <Separator className="my-2" />
      
      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'bible' && (
          <BibleNavigation
            currentBook={currentBook}
            currentChapter={currentChapter}
            onSelectBook={onSelectBook}
            onSelectChapter={onSelectChapter}
          />
        )}
        
        {activeView === 'sermons' && (
          <ScrollArea className="h-full">
            <div className="p-4">
              <h3 className="font-semibold text-sidebar-foreground mb-3">ስብከቶች</h3>
              <p className="text-sm text-muted-foreground">
                ስብከቶች በቅርቡ ይመጣሉ። እባክዎ ይጠብቁ።
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Sermons coming soon. Please check back later.
              </p>
            </div>
          </ScrollArea>
        )}
        
        {activeView === 'songs' && (
          <ScrollArea className="h-full">
            <div className="p-4">
              <h3 className="font-semibold text-sidebar-foreground mb-3">ነፃ መዝሙሮች</h3>
              <p className="text-sm text-muted-foreground">
                ነፃ መዝሙሮች በቅርቡ ይመጣሉ። እባክዎ ይጠብቁ።
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Free songs coming soon. Please check back later.
              </p>
            </div>
          </ScrollArea>
        )}
        
        {activeView === 'ebooks' && (
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              📚 ነፃ መጻሕፍት በዋናው ገጽ ላይ ይታያሉ።
            </p>
          </div>
        )}
        
        {activeView === 'meetings' && (
          <ScrollArea className="h-full">
            <div className="p-4">
              <h3 className="font-semibold text-sidebar-foreground mb-3">ስብሰባዎች</h3>
              <p className="text-sm text-muted-foreground">
                ስብሰባዎች በቅርቡ ይመጣሉ። እባክዎ ይጠብቁ።
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Meetings coming soon. Please check back later.
              </p>
            </div>
          </ScrollArea>
        )}
        
        {activeView === 'verse' && (
          <ScrollArea className="h-full">
            <div className="p-4">
              <h3 className="font-semibold text-sidebar-foreground mb-3">የዛሬ ጥቅስ</h3>
              <p className="text-sm text-muted-foreground">
                ዮሐንስ 14:23 ላይ ለመሄድ ጠቅ ያድርጉ።
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Click to navigate to John 14:23.
              </p>
            </div>
          </ScrollArea>
        )}
        
        {activeView === 'contact' && (
          <ScrollArea className="h-full">
            <div className="p-4">
              <h3 className="font-semibold text-sidebar-foreground mb-3">አግኙን</h3>
              <p className="text-sm text-muted-foreground">
                ለማንኛውም ጥያቄ ወይም አስተያየት እባክዎ ያግኙን።
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Contact us for any questions or feedback.
              </p>
            </div>
          </ScrollArea>
        )}
        
        {activeView === 'help' && (
          <ScrollArea className="h-full">
            <div className="p-4">
              <h3 className="font-semibold text-sidebar-foreground mb-3">እገዛ</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• ← → ቀስት ቁልፎችን ተጠቅመው ምዕራፎችን ይቀያይሩ</p>
                <p>• / ተጭነው ይፈልጉ</p>
                <p>• ቁጥሮችን ጠቅ አድርገው ዕልባት ያድርጉ</p>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground mt-4">
                <p>• Use ← → arrow keys to navigate chapters</p>
                <p>• Press / to search</p>
                <p>• Click verse numbers to bookmark</p>
              </div>
            </div>
          </ScrollArea>
        )}
      </div>
    </aside>
  );
}
