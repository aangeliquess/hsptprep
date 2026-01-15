import { PatternInsight } from '@/lib/diagnostics';
import { Lightbulb, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface Props {
  patterns: PatternInsight[];
}

const severityConfig = {
  high: { 
    icon: AlertCircle, 
    border: 'border-l-destructive',
    bg: 'bg-destructive/5',
    iconColor: 'text-destructive'
  },
  medium: { 
    icon: AlertTriangle, 
    border: 'border-l-warning',
    bg: 'bg-warning/5',
    iconColor: 'text-warning'
  },
  low: { 
    icon: Info, 
    border: 'border-l-muted-foreground',
    bg: 'bg-muted/20',
    iconColor: 'text-muted-foreground'
  }
};

export function PatternInsights({ patterns }: Props) {
  if (patterns.length === 0) {
    return (
      <div className="report-card mb-6">
        <h2 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Patterns Noticed
        </h2>
        <p className="text-muted-foreground text-sm">
          Complete more questions to identify patterns in your performance.
        </p>
      </div>
    );
  }

  return (
    <div className="report-card mb-6">
      <h2 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-primary" />
        Patterns Noticed
      </h2>
      
      <div className="space-y-3">
        {patterns.map((pattern, index) => {
          const config = severityConfig[pattern.severity];
          const Icon = config.icon;
          
          return (
            <div 
              key={index}
              className={`p-4 rounded-lg border-l-4 ${config.border} ${config.bg}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
                <div>
                  <h3 className="font-medium text-foreground mb-1">
                    {pattern.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pattern.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
