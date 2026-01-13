import { ExamModeConfig } from '@/types/exam';
import { Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExamModeCardProps {
  mode: ExamModeConfig;
  onStart: () => void;
}

export const ExamModeCard = ({ mode, onStart }: ExamModeCardProps) => {
  return (
    <div className="report-card hover:shadow-soft transition-shadow duration-200">
      <div className="flex items-start gap-4">
        <span className="text-3xl">{mode.icon}</span>
        <div className="flex-1">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
            {mode.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {mode.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              <span>{mode.questionCount} questions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{mode.timeLimit} min</span>
            </div>
          </div>

          <Button onClick={onStart} className="w-full">
            Start Practice
          </Button>
        </div>
      </div>
    </div>
  );
};
