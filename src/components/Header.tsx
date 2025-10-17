import { Download, Upload, Sparkles, Image as ImageIcon, PlayCircle, LayoutGrid, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './ui/dropdown-menu';
import { THEMES } from '../lib/constants';

interface HeaderProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  onExportPNG: () => void;
  onExportJSON: () => void;
  onImportJSON: () => void;
  viewMode: 'canvas' | 'affirmations';
  onViewModeChange: (mode: 'canvas' | 'affirmations') => void;
  onOpenHelp: () => void;
  onResetToHome: () => void;
}

export function Header({
  currentTheme,
  onThemeChange,
  onExportPNG,
  onExportJSON,
  onImportJSON,
  viewMode,
  onViewModeChange,
  onResetToHome,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-3 backdrop-blur-xl bg-black/20 border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400" />
          <h1 className="text-white text-base sm:text-lg cursor-pointer hover:text-yellow-400 transition-colors" onClick={onResetToHome}>Life Designer</h1>
          <p className="text-white/60 text-sm hidden lg:block">Your Future, Visualized</p>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* View Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange(viewMode === 'canvas' ? 'affirmations' : 'canvas')}
            className="text-white hover:bg-white/10 px-2 sm:px-3"
          >
            {viewMode === 'canvas' ? (
              <>
                <PlayCircle className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Affirmations</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Canvas</span>
              </>
            )}
          </Button>

          {/* Theme Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 px-2 sm:px-3">
                <Sparkles className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.entries(THEMES).map(([key, theme]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => onThemeChange(key)}
                  className={currentTheme === key ? 'bg-accent' : ''}
                >
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.gradient} mr-2`} />
                  {theme.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
