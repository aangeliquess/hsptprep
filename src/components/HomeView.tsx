import { Header } from './Header';
import { ExamModeCard } from './ExamModeCard';
import { examModes } from '@/data/examModes';
import { ExamMode } from '@/types/exam';
import { Target, Zap, BookOpen, BookText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface HomeViewProps {
  onStartExam: (mode: ExamMode) => void;
  onShowHistory: () => void;
  onShowVocabulary?: () => void;
}

export const HomeView = ({ onStartExam, onShowHistory, onShowVocabulary }: HomeViewProps) => {
  const fullMock = examModes.find(m => m.id === 'full-mock')!;
  const practiceExams = examModes.filter(m => m.id !== 'full-mock' && m.id !== 'quick-drill');
  const quickDrill = examModes.find(m => m.id === 'quick-drill')!;

  return (
    <div className="min-h-screen bg-background">
      <Header onShowHistory={onShowHistory} />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-3">
            Welcome to Placement Prep
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice makes perfect. Choose a study mode below to start preparing for the 
            High School Placement Test.
          </p>
        </div>

        {/* Full Mock Exam - Featured */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold">Full Practice Test</h2>
          </div>
          <div className="bg-gradient-to-br from-primary/5 to-accent rounded-xl p-1">
            <ExamModeCard 
              mode={fullMock} 
              onStart={() => onStartExam('full-mock')} 
            />
          </div>
        </section>

        {/* Vocabulary Practice - NEW */}
        {onShowVocabulary && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <BookText className="h-5 w-5 text-primary" />
              <h2 className="font-serif text-xl font-semibold">Vocabulary Builder</h2>
            </div>
            <Card 
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={onShowVocabulary}
            >
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Flashcards & Practice</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn HSPT vocabulary with flashcards, quizzes, and spaced repetition.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Targeted Practice */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold">Targeted Practice</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Focus on specific subjects to strengthen your weak areas
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {practiceExams.map(mode => (
              <ExamModeCard 
                key={mode.id}
                mode={mode} 
                onStart={() => onStartExam(mode.id)} 
              />
            ))}
          </div>
        </section>

        {/* Quick Drill */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-warning" />
            <h2 className="font-serif text-xl font-semibold">Quick Drill</h2>
          </div>
          <ExamModeCard 
            mode={quickDrill} 
            onStart={() => onStartExam('quick-drill')} 
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Practice regularly. Stay focused. You've got this! 💪</p>
        </div>
      </footer>
    </div>
  );
};
