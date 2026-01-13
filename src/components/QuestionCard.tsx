import { Question } from '@/types/exam';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | null;
  onSelectAnswer: (answer: 'A' | 'B' | 'C' | 'D') => void;
}

const optionLabels = ['A', 'B', 'C', 'D'] as const;

export const QuestionCard = ({ 
  question, 
  selectedAnswer, 
  onSelectAnswer 
}: QuestionCardProps) => {
  return (
    <div className="animate-fade-in">
      {/* Subject badge */}
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground capitalize">
          {question.subject} • {question.type.replace('-', ' ')}
        </span>
      </div>

      {/* Question text */}
      <h2 className="question-text text-foreground mb-8">
        {question.text}
      </h2>

      {/* Answer options */}
      <div className="space-y-3">
        {optionLabels.map((label) => {
          const optionText = question.options[label];
          if (!optionText) return null;
          
          const isSelected = selectedAnswer === label;

          return (
            <button
              key={label}
              onClick={() => onSelectAnswer(label)}
              className={cn(
                "answer-option w-full text-left p-4 rounded-lg border-2 border-border",
                "flex items-start gap-4 focus-ring",
                isSelected && "selected"
              )}
            >
              <span className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                "border-2 transition-colors",
                isSelected 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-secondary text-secondary-foreground border-border"
              )}>
                {label}
              </span>
              <span className="text-foreground text-lg pt-0.5">
                {optionText}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
