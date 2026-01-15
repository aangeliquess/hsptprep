import { SubSkillDiagnostic } from '@/lib/diagnostics';
import { SUBJECT_LABELS, Subject } from '@/types/exam';
import { BarChart3, Clock, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Props {
  subSkills: SubSkillDiagnostic[];
  topWeakSkills: SubSkillDiagnostic[];
  topStrongSkills: SubSkillDiagnostic[];
}

const errorTypeLabels = {
  'content-gap': { label: 'Knowledge Gap', color: 'text-destructive bg-destructive/10' },
  'rushing': { label: 'Rushing', color: 'text-warning bg-warning/10' },
  'overthinking': { label: 'Overthinking', color: 'text-warning bg-warning/10' },
  'mixed': { label: 'Mixed Errors', color: 'text-muted-foreground bg-muted/50' },
  'none': { label: 'No Issues', color: 'text-success bg-success/10' }
};

export function SubSkillAnalysis({ subSkills, topWeakSkills, topStrongSkills }: Props) {
  const [expandedSubject, setExpandedSubject] = useState<Subject | null>(null);
  
  // Group by subject
  const bySubject = subSkills.reduce((acc, skill) => {
    if (!acc[skill.subject]) acc[skill.subject] = [];
    acc[skill.subject].push(skill);
    return acc;
  }, {} as Record<Subject, SubSkillDiagnostic[]>);

  return (
    <div className="report-card mb-6">
      <h2 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-primary" />
        Skill & Sub-Skill Analysis
      </h2>
      
      {/* Top Skills Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Weakest Skills */}
        <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
          <h3 className="font-medium text-destructive flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4" />
            Top 3 Areas to Improve
          </h3>
          {topWeakSkills.length > 0 ? (
            <ul className="space-y-2">
              {topWeakSkills.map((skill, i) => (
                <li key={skill.subSkill} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">
                    {i + 1}. {skill.label}
                  </span>
                  <span className="text-sm font-semibold text-destructive">
                    {Math.round(skill.accuracy)}%
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No weak areas identified</p>
          )}
        </div>
        
        {/* Strongest Skills */}
        <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
          <h3 className="font-medium text-success flex items-center gap-2 mb-3">
            <CheckCircle className="h-4 w-4" />
            Top 3 Strengths
          </h3>
          {topStrongSkills.length > 0 ? (
            <ul className="space-y-2">
              {topStrongSkills.map((skill, i) => (
                <li key={skill.subSkill} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">
                    {i + 1}. {skill.label}
                  </span>
                  <span className="text-sm font-semibold text-success">
                    {Math.round(skill.accuracy)}%
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Complete more questions to identify strengths</p>
          )}
        </div>
      </div>
      
      {/* Detailed Breakdown by Subject */}
      <div className="space-y-3">
        {(Object.entries(bySubject) as [Subject, SubSkillDiagnostic[]][]).map(([subject, skills]) => {
          const isExpanded = expandedSubject === subject;
          const avgAccuracy = skills.reduce((s, sk) => s + sk.accuracy, 0) / skills.length;
          
          return (
            <div key={subject} className="border border-border rounded-lg overflow-hidden">
              {/* Subject Header - Collapsible */}
              <button
                onClick={() => setExpandedSubject(isExpanded ? null : subject)}
                className="w-full flex items-center justify-between p-4 bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">{SUBJECT_LABELS[subject]}</span>
                  <span className="text-sm text-muted-foreground">
                    ({skills.length} sub-skill{skills.length > 1 ? 's' : ''})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-semibold ${avgAccuracy >= 70 ? 'text-success' : avgAccuracy >= 50 ? 'text-foreground' : 'text-destructive'}`}>
                    {Math.round(avgAccuracy)}% avg
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              {/* Sub-skill Details */}
              {isExpanded && (
                <div className="p-4 space-y-4">
                  {skills.map(skill => {
                    const errorInfo = errorTypeLabels[skill.errorType];
                    
                    return (
                      <div key={skill.subSkill} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">{skill.label}</span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 text-xs rounded-full ${errorInfo.color}`}>
                              {errorInfo.label}
                            </span>
                          </div>
                        </div>
                        
                        {/* Accuracy bar */}
                        <div className="h-2 bg-progress-pending rounded-full overflow-hidden mb-3">
                          <div 
                            className={`h-full rounded-full ${
                              skill.accuracy >= 75 ? 'bg-success' : 
                              skill.accuracy >= 50 ? 'bg-progress-complete' : 'bg-destructive'
                            }`}
                            style={{ width: `${skill.accuracy}%` }}
                          />
                        </div>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-2 text-center text-xs">
                          <div>
                            <div className="font-semibold text-foreground">{skill.attempted}</div>
                            <div className="text-muted-foreground">Attempted</div>
                          </div>
                          <div>
                            <div className={`font-semibold ${skill.accuracy >= 70 ? 'text-success' : skill.accuracy < 50 ? 'text-destructive' : 'text-foreground'}`}>
                              {Math.round(skill.accuracy)}%
                            </div>
                            <div className="text-muted-foreground">Correct</div>
                          </div>
                          <div>
                            <div className="flex items-center justify-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="font-semibold text-foreground">{Math.round(skill.avgTime)}s</span>
                            </div>
                            <div className="text-muted-foreground">Avg Time</div>
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{Math.round(skill.recommendedTime)}s</div>
                            <div className="text-muted-foreground">Target</div>
                          </div>
                        </div>
                        
                        {/* Error breakdown */}
                        {(skill.errorBreakdown.contentGaps + skill.errorBreakdown.rushingErrors + skill.errorBreakdown.overthinkingErrors) > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {skill.errorBreakdown.contentGaps > 0 && (
                              <span className="px-2 py-0.5 text-xs bg-destructive/10 text-destructive rounded">
                                {skill.errorBreakdown.contentGaps} content gap{skill.errorBreakdown.contentGaps > 1 ? 's' : ''}
                              </span>
                            )}
                            {skill.errorBreakdown.rushingErrors > 0 && (
                              <span className="px-2 py-0.5 text-xs bg-warning/10 text-warning rounded">
                                {skill.errorBreakdown.rushingErrors} rushing
                              </span>
                            )}
                            {skill.errorBreakdown.overthinkingErrors > 0 && (
                              <span className="px-2 py-0.5 text-xs bg-warning/10 text-warning rounded">
                                {skill.errorBreakdown.overthinkingErrors} overthinking
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
