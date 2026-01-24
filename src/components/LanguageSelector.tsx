import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, type LanguageMode } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const LANGUAGE_OPTIONS: { value: LanguageMode; label: string; flag: string }[] = [
  { value: 'amharic', label: 'አማርኛ ብቻ', flag: '🇪🇹' },
  { value: 'english', label: 'English Only', flag: '🇺🇸' },
  { value: 'both', label: 'Side by Side', flag: '📖' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0">
          <Languages className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-popover border border-border z-50">
        {LANGUAGE_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setLanguage(option.value)}
            className={cn(
              "cursor-pointer flex items-center gap-2",
              language === option.value && "bg-accent"
            )}
          >
            <span>{option.flag}</span>
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
