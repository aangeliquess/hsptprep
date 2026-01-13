import { BookOpen, BarChart2 } from 'lucide-react';

interface HeaderProps {
  onShowHistory?: () => void;
  showHistoryButton?: boolean;
}

export const Header = ({ onShowHistory, showHistoryButton = true }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground">
              HSPT Prep
            </h1>
            <p className="text-xs text-muted-foreground">
              High School Placement Test Trainer
            </p>
          </div>
        </div>
        
        {showHistoryButton && onShowHistory && (
          <button 
            onClick={onShowHistory}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <BarChart2 className="h-4 w-4" />
            Progress
          </button>
        )}
      </div>
    </header>
  );
};
