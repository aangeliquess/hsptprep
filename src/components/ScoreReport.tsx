import { ScoreReport as ScoreReportType, Subject } from '@/types/exam';
import { CheckCircle2, XCircle, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScoreReportProps {
  report: ScoreReportType;
  onClose: () => void;
}

const subjectLabels: Record<Subject, string> = {
  verbal: 'Verbal Skills',
  math: 'Mathematics',
  reading: 'Reading',
  language: 'Language'
};

const priorityColors = {
  high: 'border-destructive bg-destructive/5',
  medium: 'border-warning bg-warning/5',
  low: 'border-muted bg-muted/20'
};

export const ScoreReport = ({ report, onClose }: ScoreReportProps) => {
  const scorePercent = report.accuracy;
  const scoreGrade = 
    scorePercent >= 90 ? 'Excellent' :
    scorePercent >= 80 ? 'Great' :
    scorePercent >= 70 ? 'Good' :
    scorePercent >= 60 ? 'Fair' : 'Needs Work';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold text-center mb-2">
        Practice Complete!
      </h1>
      <p className="text-muted-foreground text-center mb-8">
        Here's how you performed
      </p>

      {/* Main Score */}
      <div className="report-card text-center mb-6">
        <div 
          className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(
              hsl(var(--progress-complete)) ${scorePercent}%,
              hsl(var(--progress-pending)) ${scorePercent}%
            )`
          }}
        >
          <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center">
            <div>
              <div className="text-3xl font-bold text-foreground">
                {Math.round(scorePercent)}%
              </div>
              <div className="text-sm text-muted-foreground">
                {scoreGrade}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-8 text-sm">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-4 w-4" />
            <span>{report.totalScore} correct</span>
          </div>
          <div className="flex items-center gap-2 text-destructive">
            <XCircle className="h-4 w-4" />
            <span>{report.totalQuestions - report.totalScore} incorrect</span>
          </div>
        </div>
      </div>

      {/* Section Breakdown */}
      <div className="report-card mb-6">
        <h2 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Section Scores
        </h2>
        <div className="space-y-4">
          {Object.entries(report.sectionScores).map(([subject, score]) => {
            if (score.total === 0) return null;
            return (
              <div key={subject}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{subjectLabels[subject as Subject]}</span>
                  <span className="text-muted-foreground">
                    {score.correct}/{score.total} ({Math.round(score.accuracy)}%)
                  </span>
                </div>
                <div className="h-2 bg-progress-pending rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-progress-complete rounded-full transition-all"
                    style={{ width: `${score.accuracy}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timing Analysis */}
      <div className="report-card mb-6">
        <h2 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Timing Analysis
        </h2>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-secondary rounded-lg">
            <div className="text-2xl font-bold text-foreground">
              {Math.round(report.avgTimePerQuestion)}s
            </div>
            <div className="text-sm text-muted-foreground">Avg. per question</div>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <div className="text-2xl font-bold text-foreground capitalize">
              {report.slowestSection || 'N/A'}
            </div>
            <div className="text-sm text-muted-foreground">Slowest section</div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {report.recommendations.length > 0 && (
        <div className="report-card mb-6">
          <h2 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Recommendations
          </h2>
          <div className="space-y-3">
            {report.recommendations.map((rec, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-l-4 ${priorityColors[rec.priority]}`}
              >
                <h3 className="font-medium text-foreground mb-1">{rec.title}</h3>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Back to Home
        </Button>
        <Button onClick={onClose} className="flex-1">
          Practice Again
        </Button>
      </div>
    </div>
  );
};
