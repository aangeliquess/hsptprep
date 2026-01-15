import { SectionDiagnostic } from '@/lib/diagnostics';
import { TrendingUp, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  sections: SectionDiagnostic[];
}

export function SectionDiagnostics({ sections }: Props) {
  if (sections.length === 0) return null;

  return (
    <div className="report-card mb-6">
      <h2 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        Section-Level Diagnostics
      </h2>
      
      <div className="space-y-6">
        {sections.map((section) => {
          const isStrong = section.accuracy >= 75;
          const isWeak = section.accuracy < 60;
          
          return (
            <div key={section.subject} className="border-b border-border pb-4 last:border-0 last:pb-0">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">{section.label}</h3>
                <div className={`text-lg font-bold ${
                  isStrong ? 'text-success' : isWeak ? 'text-destructive' : 'text-foreground'
                }`}>
                  {Math.round(section.accuracy)}%
                </div>
              </div>
              
              {/* Accuracy Bar */}
              <div className="h-2 bg-progress-pending rounded-full overflow-hidden mb-3">
                <div 
                  className={`h-full rounded-full transition-all ${
                    isStrong ? 'bg-success' : isWeak ? 'bg-destructive' : 'bg-progress-complete'
                  }`}
                  style={{ width: `${section.accuracy}%` }}
                />
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-3">
                <div className="p-2 bg-secondary rounded">
                  <div className="text-sm font-semibold text-foreground">
                    {section.correctCount}/{section.totalQuestions}
                  </div>
                  <div className="text-xs text-muted-foreground">Correct</div>
                </div>
                <div className="p-2 bg-secondary rounded">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">
                      {Math.round(section.avgTime)}s
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Time</div>
                </div>
                <div className="p-2 bg-secondary rounded">
                  <div className="text-sm font-semibold text-foreground">
                    {Math.round(section.recommendedTime)}s
                  </div>
                  <div className="text-xs text-muted-foreground">Target</div>
                </div>
                <div className="p-2 bg-secondary rounded">
                  <div className={`text-sm font-semibold ${
                    section.percentOverPace > 40 ? 'text-warning' : 'text-foreground'
                  }`}>
                    {Math.round(section.percentOverPace)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Over Pace</div>
                </div>
              </div>
              
              {/* Error Breakdown */}
              {section.netScoreImpact > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {section.errorBreakdown.contentGaps > 0 && (
                    <span className="px-2 py-1 text-xs bg-destructive/10 text-destructive rounded-full">
                      {section.errorBreakdown.contentGaps} content gap{section.errorBreakdown.contentGaps > 1 ? 's' : ''}
                    </span>
                  )}
                  {section.errorBreakdown.rushingErrors > 0 && (
                    <span className="px-2 py-1 text-xs bg-warning/10 text-warning rounded-full">
                      {section.errorBreakdown.rushingErrors} rushing error{section.errorBreakdown.rushingErrors > 1 ? 's' : ''}
                    </span>
                  )}
                  {section.errorBreakdown.overthinkingErrors > 0 && (
                    <span className="px-2 py-1 text-xs bg-warning/10 text-warning rounded-full">
                      {section.errorBreakdown.overthinkingErrors} overthinking
                    </span>
                  )}
                </div>
              )}
              
              {/* Insight */}
              <div className={`p-3 rounded-lg text-sm ${
                isStrong ? 'bg-success/10 text-success' : 
                isWeak ? 'bg-destructive/10 text-destructive' : 
                'bg-muted/50 text-muted-foreground'
              }`}>
                <div className="flex items-start gap-2">
                  {isStrong ? (
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  <p>{section.insight}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
