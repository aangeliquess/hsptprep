import { Timer } from './Timer';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { Button } from '@/components/ui/button';
import { Question } from '@/types/exam';
import { X } from 'lucide-react';

interface ExamViewProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | null;
  onSelectAnswer: (answer: 'A' | 'B' | 'C' | 'D') => void;
  onSubmit: () => void;
  onQuit: () => void;
  timeRemaining: number;
}

export const ExamView = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onSubmit,
  onQuit,
  timeRemaining
}: ExamViewProps) => {
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Exam Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <Timer seconds={timeRemaining} />
            <button 
              onClick={onQuit}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="h-4 w-4" />
              Exit
            </button>
          </div>
          <ProgressBar current={currentIndex} total={totalQuestions} />
        </div>
      </header>

      {/* Question Content */}
      <main className="flex-1 test-container">
        <QuestionCard
          question={question}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
        />
      </main>

      {/* Submit Button */}
      <footer className="border-t border-border bg-card sticky bottom-0">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Button 
            onClick={onSubmit}
            disabled={!selectedAnswer}
            className="w-full py-6 text-lg"
          >
            {isLastQuestion ? 'Finish Exam' : 'Next Question'}
          </Button>
        </div>
      </footer>
    </div>
  );
};
