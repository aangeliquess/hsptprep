import { OverallSummary as OverallSummaryType } from '@/lib/diagnostics';
import { CheckCircle2, XCircle, Timer, Zap, Battery, TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  summary: OverallSummaryType;
}

const pacingLabels = {
  'on-pace': { label: 'On Pace', icon: Timer, color: 'text-success' },
  'rushing': { label: 'Rushing', icon: Zap, color: 'text-warning' },
  'slow': { label: 'Slow', icon: Timer, color: 'text-warning' }
};

const staminaLabels = {
  'strong': { label: 'Strong Stamina', icon: Battery, color: 'text-success' },
  'moderate': { label: 'Moderate Stamina', icon: Battery, color: 'text-warning' },
  'fatigued': { label: 'Fatigued', icon: Battery, color: 'text-destructive' }
};

export function OverallSummaryCard({ summary }: Props) {
  const pacing = pacingLabels[summary.pacingStatus];
  const stamina = staminaLabels[summary.staminaStatus];
  const PacingIcon = pacing.icon;
  const StaminaIcon = stamina.icon;
  
  const scorePercent = summary.accuracyPercent;
  const scoreGrade = 
    scorePercent >= 90 ? 'Excellent' :
    scorePercent >= 80 ? 'Great' :
    scorePercent >= 70 ? 'Good' :
    scorePercent >= 60 ? 'Fair' : 'Needs Work';

  return (
    <div className="report-card mb-6">
      <h2 className="font-serif text-xl font-bold text-center mb-6">Overall Performance</h2>
      
      {/* Score Circle */}
      <div className="flex justify-center mb-6">
        <div 
          className="w-36 h-36 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(
              hsl(var(--progress-complete)) ${scorePercent}%,
              hsl(var(--progress-pending)) ${scorePercent}%
            )`
          }}
        >
          <div className="w-28 h-28 bg-card rounded-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">
                {Math.round(scorePercent)}%
              </div>
              <div className="text-sm text-muted-foreground">
                {scoreGrade}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <div>
            <div className="text-lg font-semibold">{summary.totalScore}</div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
          <XCircle className="h-5 w-5 text-destructive" />
          <div>
            <div className="text-lg font-semibold">{summary.totalQuestions - summary.totalScore}</div>
            <div className="text-xs text-muted-foreground">Incorrect</div>
          </div>
        </div>
      </div>
      
      {/* Pacing & Stamina Badges */}
      <div className="flex justify-center gap-4 mb-6">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-full bg-secondary ${pacing.color}`}>
          <PacingIcon className="h-4 w-4" />
          <span className="text-sm font-medium">{pacing.label}</span>
        </div>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-full bg-secondary ${stamina.color}`}>
          <StaminaIcon className="h-4 w-4" />
          <span className="text-sm font-medium">{stamina.label}</span>
        </div>
      </div>
      
      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {summary.strengthAreas.length > 0 && (
          <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">Strengths</span>
            </div>
            <ul className="text-sm text-foreground space-y-1">
              {summary.strengthAreas.map(area => (
                <li key={area}>• {area}</li>
              ))}
            </ul>
          </div>
        )}
        {summary.weaknessAreas.length > 0 && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">Focus Areas</span>
            </div>
            <ul className="text-sm text-foreground space-y-1">
              {summary.weaknessAreas.map(area => (
                <li key={area}>• {area}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Plain Language Summary */}
      <div className="p-4 bg-accent/50 rounded-lg border border-accent">
        <p className="text-sm text-foreground leading-relaxed">
          {summary.plainLanguageSummary}
        </p>
      </div>
    </div>
  );
}
