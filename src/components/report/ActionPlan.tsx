import { ActionPlan as ActionPlanType } from '@/lib/diagnostics';
import { SUBJECT_LABELS } from '@/types/exam';
import { Target, Clock, BookOpen, Zap } from 'lucide-react';

interface Props {
  plan: ActionPlanType;
}

export function ActionPlanCard({ plan }: Props) {
  if (plan.prioritySkills.length === 0) {
    return (
      <div className="report-card mb-6">
        <h2 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Your Action Plan
        </h2>
        <p className="text-muted-foreground text-sm">
          Great job! Keep practicing to maintain your performance.
        </p>
      </div>
    );
  }

  return (
    <div className="report-card mb-6 bg-gradient-to-br from-primary/5 to-transparent">
      <h2 className="font-serif text-lg font-semibold mb-2 flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        Your Action Plan
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Based on your performance, here's what to focus on next.
      </p>
      
      {/* Priority Skills */}
      <div className="space-y-4 mb-6">
        {plan.prioritySkills.map((skill, index) => (
          <div 
            key={skill.subSkill}
            className="p-4 bg-card border border-border rounded-lg"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-medium text-foreground">
                    {SUBJECT_LABELS[skill.subject]} – {skill.label}
                  </h3>
                  <p className="text-xs text-muted-foreground">{skill.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded text-xs font-medium text-primary">
                <Clock className="h-3 w-3" />
                {skill.minutesPerDay} min/day
              </div>
            </div>
            
            <div className="mt-3 p-3 bg-secondary rounded text-sm">
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="text-foreground">{skill.drillType}</span>
                  <span className="text-muted-foreground"> • Target: {skill.maxSecondsPerQuestion}s/question</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Daily Time Summary */}
      <div className="flex items-center justify-center gap-2 p-3 bg-secondary rounded-lg mb-6">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">
          <span className="font-semibold text-foreground">{plan.dailyTotalMinutes} minutes</span>
          <span className="text-muted-foreground"> of focused practice per day</span>
        </span>
      </div>
      
      {/* Pacing Guidance */}
      {plan.pacingGuidance.length > 0 && (
        <div className="p-4 bg-accent/50 border border-accent rounded-lg">
          <h3 className="font-medium text-foreground flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-warning" />
            Pacing Tips
          </h3>
          <ul className="space-y-2">
            {plan.pacingGuidance.map((tip, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
