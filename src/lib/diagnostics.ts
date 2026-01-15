import { 
  QuestionAttempt, 
  Subject, 
  SubSkill, 
  ScoreReport, 
  SUBJECT_LABELS, 
  SUBSKILL_LABELS, 
  SUBJECT_SUBSKILLS,
  PACING_BENCHMARKS,
  SUBSKILL_BENCHMARKS
} from '@/types/exam';

// ===== DIAGNOSTIC TYPES =====

export interface OverallSummary {
  totalScore: number;
  totalQuestions: number;
  accuracyPercent: number;
  pacingStatus: 'on-pace' | 'rushing' | 'slow';
  staminaStatus: 'strong' | 'moderate' | 'fatigued';
  plainLanguageSummary: string;
  strengthAreas: string[];
  weaknessAreas: string[];
}

export interface SectionDiagnostic {
  subject: Subject;
  label: string;
  accuracy: number;
  avgTime: number;
  recommendedTime: number;
  percentOverPace: number;
  netScoreImpact: number; // points lost in this section
  totalQuestions: number;
  correctCount: number;
  insight: string;
  errorBreakdown: {
    contentGaps: number;
    rushingErrors: number;
    overthinkingErrors: number;
  };
}

export interface SubSkillDiagnostic {
  subSkill: SubSkill;
  subject: Subject;
  label: string;
  attempted: number;
  correct: number;
  accuracy: number;
  avgTime: number;
  recommendedTime: number;
  errorType: 'content-gap' | 'rushing' | 'overthinking' | 'mixed' | 'none';
  errorBreakdown: {
    contentGaps: number;
    rushingErrors: number;
    overthinkingErrors: number;
  };
  isWeak: boolean;
  isStrong: boolean;
}

export interface PatternInsight {
  type: 'rule-gap' | 'pacing' | 'stamina' | 'accuracy-time' | 'consistency';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affectedSubSkill?: SubSkill;
  affectedSubject?: Subject;
}

export interface ActionPlanItem {
  priority: number;
  subject: Subject;
  subSkill: SubSkill;
  label: string;
  minutesPerDay: number;
  drillType: string;
  maxSecondsPerQuestion: number;
  reason: string;
}

export interface ActionPlan {
  prioritySkills: ActionPlanItem[];
  pacingGuidance: string[];
  dailyTotalMinutes: number;
  summary: string;
}

export interface DiagnosticReport {
  overall: OverallSummary;
  sections: SectionDiagnostic[];
  subSkills: SubSkillDiagnostic[];
  topWeakSkills: SubSkillDiagnostic[];
  topStrongSkills: SubSkillDiagnostic[];
  patterns: PatternInsight[];
  actionPlan: ActionPlan;
}

// ===== HELPER FUNCTIONS =====

function getPacingStatus(attempts: QuestionAttempt[]): 'on-pace' | 'rushing' | 'slow' {
  if (attempts.length === 0) return 'on-pace';
  
  let totalActual = 0;
  let totalBenchmark = 0;
  
  attempts.forEach(a => {
    totalActual += a.timeSpent;
    totalBenchmark += PACING_BENCHMARKS[a.subject];
  });
  
  const ratio = totalActual / totalBenchmark;
  
  if (ratio < 0.7) return 'rushing';
  if (ratio > 1.3) return 'slow';
  return 'on-pace';
}

function getStaminaStatus(attempts: QuestionAttempt[]): 'strong' | 'moderate' | 'fatigued' {
  if (attempts.length < 6) return 'strong';
  
  const thirdSize = Math.floor(attempts.length / 3);
  const firstThird = attempts.slice(0, thirdSize);
  const lastThird = attempts.slice(-thirdSize);
  
  const firstAccuracy = firstThird.filter(a => a.isCorrect).length / firstThird.length * 100;
  const lastAccuracy = lastThird.filter(a => a.isCorrect).length / lastThird.length * 100;
  
  const drop = firstAccuracy - lastAccuracy;
  
  if (drop > 15) return 'fatigued';
  if (drop > 8) return 'moderate';
  return 'strong';
}

function getSubSkillErrorType(breakdown: { contentGaps: number; rushingErrors: number; overthinkingErrors: number }): 'content-gap' | 'rushing' | 'overthinking' | 'mixed' | 'none' {
  const total = breakdown.contentGaps + breakdown.rushingErrors + breakdown.overthinkingErrors;
  if (total === 0) return 'none';
  
  const maxType = Math.max(breakdown.contentGaps, breakdown.rushingErrors, breakdown.overthinkingErrors);
  
  if (maxType === breakdown.contentGaps && breakdown.contentGaps > total * 0.5) return 'content-gap';
  if (maxType === breakdown.rushingErrors && breakdown.rushingErrors > total * 0.5) return 'rushing';
  if (maxType === breakdown.overthinkingErrors && breakdown.overthinkingErrors > total * 0.5) return 'overthinking';
  
  return 'mixed';
}

function generateSectionInsight(diag: SectionDiagnostic): string {
  const { subject, accuracy, percentOverPace, errorBreakdown, avgTime, recommendedTime } = diag;
  const label = SUBJECT_LABELS[subject];
  
  // Content gap dominant
  if (errorBreakdown.contentGaps > errorBreakdown.rushingErrors + errorBreakdown.overthinkingErrors) {
    if (accuracy < 60) {
      return `${label} accuracy is low even when taking sufficient time, suggesting concept gaps that need targeted review.`;
    }
    return `${label} shows some content gaps. Focus on understanding core concepts rather than speed.`;
  }
  
  // Rushing dominant
  if (errorBreakdown.rushingErrors > errorBreakdown.contentGaps) {
    return `${label} errors often come from rushing. Slow down and read each question carefully.`;
  }
  
  // Overthinking dominant
  if (errorBreakdown.overthinkingErrors > errorBreakdown.contentGaps) {
    return `${label} questions are taking too long. Trust your first instinct and move on after ${Math.round(recommendedTime)}s.`;
  }
  
  // Pacing issues
  if (percentOverPace > 40) {
    return `${label} pacing needs work. You're spending ${Math.round(avgTime - recommendedTime)}s extra per question on average.`;
  }
  
  // Good performance
  if (accuracy >= 80) {
    return `${label} is a strength! Maintain your approach and use extra time for tougher sections.`;
  }
  
  return `${label} performance is moderate. Consistent practice will improve both accuracy and speed.`;
}

// ===== MAIN DIAGNOSTIC GENERATOR =====

export function generateDiagnosticReport(report: ScoreReport): DiagnosticReport {
  const attempts = report.session.attempts;
  
  // ===== 1. OVERALL SUMMARY =====
  const pacingStatus = getPacingStatus(attempts);
  const staminaStatus = getStaminaStatus(attempts);
  
  // Find strengths and weaknesses
  const sectionEntries = Object.entries(report.sectionScores)
    .filter(([_, s]) => s.total > 0)
    .sort((a, b) => b[1].accuracy - a[1].accuracy);
  
  const strengthAreas = sectionEntries
    .filter(([_, s]) => s.accuracy >= 70)
    .map(([subj]) => SUBJECT_LABELS[subj as Subject]);
  
  const weaknessAreas = sectionEntries
    .filter(([_, s]) => s.accuracy < 70)
    .map(([subj]) => SUBJECT_LABELS[subj as Subject]);
  
  // Generate plain language summary
  let summary = '';
  if (strengthAreas.length > 0 && weaknessAreas.length > 0) {
    summary = `You perform best on ${strengthAreas.slice(0, 2).join(' and ')}. Most score loss comes from ${weaknessAreas.join(' and ')}`;
    if (pacingStatus === 'slow') {
      summary += ' where time runs long.';
    } else if (pacingStatus === 'rushing') {
      summary += ' where you may be rushing.';
    } else {
      summary += '.';
    }
  } else if (strengthAreas.length === sectionEntries.length) {
    summary = `Excellent overall performance across all sections! ${staminaStatus === 'fatigued' ? 'Focus on building endurance for longer tests.' : 'Keep up the great work.'}`;
  } else {
    summary = `There are opportunities for improvement in all sections. Focus on the fundamentals and consistent practice.`;
  }
  
  const overall: OverallSummary = {
    totalScore: report.totalScore,
    totalQuestions: report.totalQuestions,
    accuracyPercent: report.accuracy,
    pacingStatus,
    staminaStatus,
    plainLanguageSummary: summary,
    strengthAreas,
    weaknessAreas
  };
  
  // ===== 2. SECTION DIAGNOSTICS =====
  const sections: SectionDiagnostic[] = (['verbal', 'math', 'reading', 'language'] as Subject[])
    .map(subject => {
      const sectionAttempts = attempts.filter(a => a.subject === subject);
      const total = sectionAttempts.length;
      if (total === 0) return null;
      
      const correct = sectionAttempts.filter(a => a.isCorrect).length;
      const accuracy = (correct / total) * 100;
      const avgTime = sectionAttempts.reduce((s, a) => s + a.timeSpent, 0) / total;
      const recommendedTime = PACING_BENCHMARKS[subject];
      const overPaceCount = sectionAttempts.filter(a => a.timeSpent > recommendedTime).length;
      const percentOverPace = (overPaceCount / total) * 100;
      
      const errorBreakdown = {
        contentGaps: sectionAttempts.filter(a => a.mistakeType === 'content-gap').length,
        rushingErrors: sectionAttempts.filter(a => a.mistakeType === 'rushing').length,
        overthinkingErrors: sectionAttempts.filter(a => a.mistakeType === 'overthinking').length
      };
      
      // Net score impact: how many points could have been gained
      const incorrectCount = total - correct;
      const netScoreImpact = incorrectCount;
      
      const diag: SectionDiagnostic = {
        subject,
        label: SUBJECT_LABELS[subject],
        accuracy,
        avgTime,
        recommendedTime,
        percentOverPace,
        netScoreImpact,
        totalQuestions: total,
        correctCount: correct,
        insight: '',
        errorBreakdown
      };
      
      diag.insight = generateSectionInsight(diag);
      
      return diag;
    })
    .filter((s): s is SectionDiagnostic => s !== null);
  
  // ===== 3. SUB-SKILL ANALYSIS =====
  const subSkillMap = new Map<SubSkill, QuestionAttempt[]>();
  attempts.forEach(a => {
    const existing = subSkillMap.get(a.subSkill) || [];
    existing.push(a);
    subSkillMap.set(a.subSkill, existing);
  });
  
  const subSkills: SubSkillDiagnostic[] = [];
  subSkillMap.forEach((subAttempts, subSkill) => {
    const attempted = subAttempts.length;
    const correct = subAttempts.filter(a => a.isCorrect).length;
    const accuracy = (correct / attempted) * 100;
    const avgTime = subAttempts.reduce((s, a) => s + a.timeSpent, 0) / attempted;
    const recommendedTime = SUBSKILL_BENCHMARKS[subSkill] || PACING_BENCHMARKS[subAttempts[0].subject];
    
    const errorBreakdown = {
      contentGaps: subAttempts.filter(a => a.mistakeType === 'content-gap').length,
      rushingErrors: subAttempts.filter(a => a.mistakeType === 'rushing').length,
      overthinkingErrors: subAttempts.filter(a => a.mistakeType === 'overthinking').length
    };
    
    subSkills.push({
      subSkill,
      subject: subAttempts[0].subject,
      label: SUBSKILL_LABELS[subSkill],
      attempted,
      correct,
      accuracy,
      avgTime,
      recommendedTime,
      errorType: getSubSkillErrorType(errorBreakdown),
      errorBreakdown,
      isWeak: accuracy < 60 && attempted >= 3,
      isStrong: accuracy >= 80 && attempted >= 3
    });
  });
  
  // Sort by accuracy for top weak/strong
  const sortedByAccuracy = [...subSkills].sort((a, b) => a.accuracy - b.accuracy);
  const topWeakSkills = sortedByAccuracy.filter(s => s.attempted >= 2).slice(0, 3);
  const topStrongSkills = [...sortedByAccuracy].reverse().filter(s => s.attempted >= 2 && s.accuracy >= 70).slice(0, 3);
  
  // ===== 4. PATTERN INSIGHTS =====
  const patterns: PatternInsight[] = [];
  
  // Check for specific sub-skill patterns (rule gaps)
  subSkills.forEach(skill => {
    if (skill.attempted >= 3 && skill.accuracy < 50 && skill.errorType === 'content-gap') {
      const incorrect = skill.attempted - skill.correct;
      patterns.push({
        type: 'rule-gap',
        severity: 'high',
        title: `${skill.label} Needs Focus`,
        description: `You missed ${incorrect} of ${skill.attempted} ${skill.label.toLowerCase()} questions, even when taking sufficient time. This indicates a knowledge gap that practice can fix.`,
        affectedSubSkill: skill.subSkill,
        affectedSubject: skill.subject
      });
    }
    
    // Rushing pattern
    if (skill.attempted >= 3 && skill.errorBreakdown.rushingErrors >= 2) {
      patterns.push({
        type: 'pacing',
        severity: 'medium',
        title: `Rushing on ${skill.label}`,
        description: `${skill.errorBreakdown.rushingErrors} errors in ${skill.label.toLowerCase()} came from rushing. Aim for at least ${Math.round(skill.recommendedTime * 0.7)}s per question.`,
        affectedSubSkill: skill.subSkill
      });
    }
    
    // Overthinking pattern
    if (skill.attempted >= 3 && skill.errorBreakdown.overthinkingErrors >= 2) {
      patterns.push({
        type: 'pacing',
        severity: 'medium',
        title: `Overthinking ${skill.label}`,
        description: `You're spending too much time on ${skill.label.toLowerCase()} questions. Trust your instinct and move on after ${Math.round(skill.recommendedTime)}s.`,
        affectedSubSkill: skill.subSkill
      });
    }
  });
  
  // Stamina/fatigue pattern
  if (attempts.length >= 20) {
    const thirdSize = Math.floor(attempts.length / 3);
    const firstThird = attempts.slice(0, thirdSize);
    const lastThird = attempts.slice(-thirdSize);
    
    const firstAccuracy = (firstThird.filter(a => a.isCorrect).length / firstThird.length) * 100;
    const lastAccuracy = (lastThird.filter(a => a.isCorrect).length / lastThird.length) * 100;
    const drop = firstAccuracy - lastAccuracy;
    
    if (drop > 10) {
      const dropQuestion = Math.floor(attempts.length * 0.66);
      patterns.push({
        type: 'stamina',
        severity: drop > 20 ? 'high' : 'medium',
        title: 'Accuracy Drops Late in Test',
        description: `Accuracy drops by ${Math.round(drop)}% after Question ${dropQuestion}, indicating stamina fatigue. Build endurance with timed practice sessions.`
      });
    }
  }
  
  // Speed vs accuracy correlation
  const fastIncorrect = attempts.filter(a => !a.isCorrect && a.timeSpent < PACING_BENCHMARKS[a.subject] * 0.5).length;
  const slowIncorrect = attempts.filter(a => !a.isCorrect && a.timeSpent > PACING_BENCHMARKS[a.subject] * 1.5).length;
  const incorrectTotal = attempts.filter(a => !a.isCorrect).length;
  
  if (incorrectTotal >= 5 && fastIncorrect > incorrectTotal * 0.4) {
    patterns.push({
      type: 'accuracy-time',
      severity: 'high',
      title: 'Speed Causing Errors',
      description: `${Math.round((fastIncorrect / incorrectTotal) * 100)}% of your mistakes happen when you rush. Slow down and read questions carefully.`
    });
  }
  
  if (incorrectTotal >= 5 && slowIncorrect > incorrectTotal * 0.4) {
    patterns.push({
      type: 'accuracy-time',
      severity: 'medium',
      title: 'Overthinking Causing Errors',
      description: `${Math.round((slowIncorrect / incorrectTotal) * 100)}% of mistakes happen on questions where you spent extra time. First instincts are often correct.`
    });
  }
  
  // Strong accuracy but slow
  if (report.accuracy >= 75 && pacingStatus === 'slow') {
    patterns.push({
      type: 'pacing',
      severity: 'medium',
      title: 'Good Accuracy, Needs Speed',
      description: 'Your accuracy is strong, but you may run out of time on full tests. Practice with stricter time limits.'
    });
  }
  
  // Fast but low accuracy
  if (report.accuracy < 60 && pacingStatus === 'rushing') {
    patterns.push({
      type: 'pacing',
      severity: 'high',
      title: 'Slow Down for Better Accuracy',
      description: 'You have time to spare but accuracy is suffering. Take an extra 10-15 seconds per question to read carefully.'
    });
  }
  
  // Sort patterns by severity
  patterns.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });
  
  // ===== 5. ACTION PLAN =====
  const actionPlan = generateActionPlan(topWeakSkills, subSkills, patterns, sections);
  
  return {
    overall,
    sections,
    subSkills,
    topWeakSkills,
    topStrongSkills,
    patterns: patterns.slice(0, 5), // Limit to top 5 insights
    actionPlan
  };
}

function generateActionPlan(
  weakSkills: SubSkillDiagnostic[],
  allSkills: SubSkillDiagnostic[],
  patterns: PatternInsight[],
  sections: SectionDiagnostic[]
): ActionPlan {
  const prioritySkills: ActionPlanItem[] = [];
  const pacingGuidance: string[] = [];
  
  // Add top 3 weak skills as priorities
  weakSkills.slice(0, 3).forEach((skill, index) => {
    let minutesPerDay = 15;
    let drillType = `${skill.attempted <= 10 ? 10 : 15} ${skill.label.toLowerCase()} questions`;
    
    if (skill.errorType === 'rushing') {
      drillType += ' with focus on careful reading';
      minutesPerDay = 10;
    } else if (skill.errorType === 'overthinking') {
      drillType += ` under ${Math.round(skill.recommendedTime)}s each`;
      pacingGuidance.push(`Cap ${skill.label.toLowerCase()} at ${Math.round(skill.recommendedTime)}s; skip and return after ${Math.round(skill.recommendedTime * 1.5)}s`);
    } else {
      drillType += ' with answer explanations review';
    }
    
    prioritySkills.push({
      priority: index + 1,
      subject: skill.subject,
      subSkill: skill.subSkill,
      label: skill.label,
      minutesPerDay,
      drillType,
      maxSecondsPerQuestion: Math.round(skill.recommendedTime),
      reason: skill.accuracy < 50 
        ? `Only ${Math.round(skill.accuracy)}% accuracy needs improvement`
        : `Moderate accuracy (${Math.round(skill.accuracy)}%) can be improved`
    });
  });
  
  // Add pacing guidance based on patterns
  const hasPacingPatterns = patterns.filter(p => p.type === 'pacing' || p.type === 'accuracy-time');
  if (hasPacingPatterns.length > 0) {
    if (patterns.some(p => p.title.includes('Rushing') || p.title.includes('Speed Causing'))) {
      pacingGuidance.push('Add 10-15 seconds to your average question time');
      pacingGuidance.push('Read each question twice before selecting an answer');
    }
    if (patterns.some(p => p.title.includes('Overthinking'))) {
      pacingGuidance.push('Mark difficult questions and return to them');
      pacingGuidance.push('Trust your first instinct on questions you understand');
    }
  }
  
  // Add stamina guidance
  if (patterns.some(p => p.type === 'stamina')) {
    pacingGuidance.push('Practice with full-length timed sessions to build endurance');
    pacingGuidance.push('Take brief mental pauses every 25-30 questions');
  }
  
  // Generate daily total
  const dailyTotalMinutes = prioritySkills.reduce((sum, s) => sum + s.minutesPerDay, 0);
  
  // Generate summary
  let summary = 'Next focus:\n';
  prioritySkills.forEach((skill, i) => {
    summary += `${i + 1}. ${SUBJECT_LABELS[skill.subject]} – ${skill.label.toLowerCase()} (${skill.minutesPerDay} min/day)\n`;
  });
  
  return {
    prioritySkills,
    pacingGuidance: pacingGuidance.slice(0, 4),
    dailyTotalMinutes,
    summary: summary.trim()
  };
}
