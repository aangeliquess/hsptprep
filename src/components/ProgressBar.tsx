interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="h-2 bg-progress-pending rounded-full overflow-hidden">
        <div 
          className="h-full bg-progress-current rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
