import { ScoreReport as ScoreReportType } from '@/types/exam';
import { generateDiagnosticReport } from '@/lib/diagnostics';
import { OverallSummaryCard } from '@/components/report/OverallSummary';
import { SectionDiagnostics } from '@/components/report/SectionDiagnostics';
import { SubSkillAnalysis } from '@/components/report/SubSkillAnalysis';
import { PatternInsights } from '@/components/report/PatternInsights';
import { ActionPlanCard } from '@/components/report/ActionPlan';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';

interface ScoreReportProps {
  report: ScoreReportType;
  onClose: () => void;
}

export const ScoreReport = ({ report, onClose }: ScoreReportProps) => {
  const diagnostic = useMemo(() => generateDiagnosticReport(report), [report]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold text-center mb-2">
        Practice Complete!
      </h1>
      <p className="text-muted-foreground text-center mb-8">
        Here's your detailed performance analysis
      </p>

      {/* 1. Overall Performance Summary */}
      <OverallSummaryCard summary={diagnostic.overall} />

      {/* 2. Section-Level Diagnostics */}
      <SectionDiagnostics sections={diagnostic.sections} />

      {/* 3. Skill & Sub-Skill Analysis */}
      <SubSkillAnalysis 
        subSkills={diagnostic.subSkills}
        topWeakSkills={diagnostic.topWeakSkills}
        topStrongSkills={diagnostic.topStrongSkills}
      />

      {/* 4. Pattern Insights */}
      <PatternInsights patterns={diagnostic.patterns} />

      {/* 5. Action Plan */}
      <ActionPlanCard plan={diagnostic.actionPlan} />

      {/* Actions */}
      <div className="flex gap-4 mt-8">
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
