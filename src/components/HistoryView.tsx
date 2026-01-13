import { ExamSession } from '@/types/exam';
import { Header } from './Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { examModes } from '@/data/examModes';

interface HistoryViewProps {
  onBack: () => void;
}

export const HistoryView = ({ onBack }: HistoryViewProps) => {
  const history: ExamSession[] = JSON.parse(localStorage.getItem('examHistory') || '[]');
  
  const sortedHistory = [...history].sort((a, b) => (b.endTime || 0) - (a.endTime || 0));

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getModeName = (mode: string) => {
    return examModes.find(m => m.id === mode)?.name || mode;
  };

  const calculateScore = (session: ExamSession) => {
    const correct = session.attempts.filter(a => a.isCorrect).length;
    const total = session.attempts.length;
    return { correct, total, percent: total > 0 ? Math.round((correct / total) * 100) : 0 };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showHistoryButton={false} />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Practice
        </button>

        <h1 className="font-serif text-3xl font-bold mb-2">Practice History</h1>
        <p className="text-muted-foreground mb-8">
          Track your progress over time
        </p>

        {sortedHistory.length === 0 ? (
          <div className="report-card text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-serif text-xl font-semibold mb-2">No practice sessions yet</h2>
            <p className="text-muted-foreground mb-6">
              Complete a practice test to see your history here
            </p>
            <Button onClick={onBack}>Start Practicing</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedHistory.map((session, index) => {
              const score = calculateScore(session);
              const duration = session.endTime 
                ? Math.round((session.endTime - session.startTime) / 60000)
                : 0;

              return (
                <div key={session.id || index} className="report-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {getModeName(session.mode)}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(session.endTime || session.startTime)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {duration} min
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`h-4 w-4 ${score.percent >= 70 ? 'text-success' : 'text-warning'}`} />
                        <span className="text-xl font-bold">{score.percent}%</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {score.correct}/{score.total} correct
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {sortedHistory.length > 0 && (
          <div className="mt-8 p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-2">Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {sortedHistory.length}
                </div>
                <div className="text-xs text-muted-foreground">Tests Taken</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {Math.round(sortedHistory.reduce((sum, s) => {
                    const score = calculateScore(s);
                    return sum + score.percent;
                  }, 0) / sortedHistory.length)}%
                </div>
                <div className="text-xs text-muted-foreground">Avg Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {sortedHistory.reduce((sum, s) => sum + s.attempts.length, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Questions</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
