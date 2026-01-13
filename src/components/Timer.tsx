import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerProps {
  seconds: number;
  warningThreshold?: number;
  criticalThreshold?: number;
}

export const Timer = ({ 
  seconds, 
  warningThreshold = 300, 
  criticalThreshold = 60 
}: TimerProps) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const isWarning = seconds <= warningThreshold && seconds > criticalThreshold;
  const isCritical = seconds <= criticalThreshold;

  return (
    <div className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary",
      isWarning && "bg-warning/10 text-warning",
      isCritical && "bg-destructive/10 text-destructive"
    )}>
      <Clock className={cn(
        "h-5 w-5",
        isCritical && "animate-pulse"
      )} />
      <span className={cn(
        "timer-display font-medium",
        isWarning && "timer-warning",
        isCritical && "timer-critical"
      )}>
        {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </span>
    </div>
  );
};
