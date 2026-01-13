export type Subject = 'verbal' | 'math' | 'reading' | 'language';

export type SubSkill = 
  // Verbal sub-skills
  | 'analogy'
  | 'synonym'
  | 'antonym'
  | 'classification'
  | 'logic'
  // Math sub-skills
  | 'arithmetic'
  | 'algebra'
  | 'geometry'
  | 'word-problem'
  | 'fractions'
  | 'percentages'
  // Reading sub-skills
  | 'main-idea'
  | 'inference'
  | 'vocabulary-context'
  | 'detail'
  | 'tone'
  // Language sub-skills
  | 'grammar'
  | 'punctuation'
  | 'sentence-structure'
  | 'usage'
  | 'capitalization';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type QuestionType = SubSkill;

export interface QuestionSourceRef {
  name: string;
  pageNumber?: number;
}

export interface Question {
  id: string;
  subject: Subject;
  type: SubSkill;
  subSkill: SubSkill;
  difficulty: Difficulty;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  source?: QuestionSourceRef;
}

export interface QuestionAttempt {
  questionId: string;
  subject: Subject;
  type: SubSkill;
  subSkill: SubSkill;
  difficulty: Difficulty;
  studentAnswer: 'A' | 'B' | 'C' | 'D' | null;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  timeSpent: number; // in seconds
  timestamp: number;
  sessionId: string;
  mode: ExamMode;
  // Mistake classification
  mistakeType?: 'content-gap' | 'rushing' | 'overthinking' | null;
  wasOverPace?: boolean;
}

export interface ExamSession {
  id: string;
  mode: ExamMode;
  startTime: number;
  endTime?: number;
  totalTimeAllowed: number;
  attempts: QuestionAttempt[];
  isComplete: boolean;
  isPaused?: boolean;
  pausedAt?: number;
  totalPausedTime?: number;
  // Custom session options
  selectedSubjects?: Subject[];
  selectedSubSkills?: SubSkill[];
  questionCount?: number;
  focusOnWeakAreas?: boolean;
  pacingMode?: boolean;
}

export type ExamMode = 
  | 'full-mock'
  | 'verbal-practice'
  | 'math-practice'
  | 'reading-practice'
  | 'language-practice'
  | 'quick-drill'
  | 'targeted-practice'
  | 'pacing-drill';

export interface ExamModeConfig {
  id: ExamMode;
  name: string;
  description: string;
  questionCount: number;
  timeLimit: number;
  subjects: Subject[];
  icon: string;
  allowPause?: boolean;
  isPacingMode?: boolean;
}

// Pacing benchmarks - recommended seconds per question by subject
export const PACING_BENCHMARKS: Record<Subject, number> = {
  verbal: 45,
  math: 60,
  reading: 75,
  language: 40
};

export const SUBSKILL_BENCHMARKS: Partial<Record<SubSkill, number>> = {
  analogy: 40,
  synonym: 30,
  antonym: 30,
  classification: 35,
  logic: 50,
  arithmetic: 45,
  algebra: 60,
  geometry: 70,
  'word-problem': 75,
  'main-idea': 60,
  inference: 80,
  grammar: 35,
  punctuation: 30,
};

// Mistake classification thresholds
export const RUSHING_THRESHOLD = 0.5; // Less than 50% of benchmark time
export const OVERTHINKING_THRESHOLD = 2.0; // More than 200% of benchmark time

export interface MistakeAnalysis {
  contentGaps: number;
  rushingErrors: number;
  overthinkingErrors: number;
}

export interface PacingAnalysis {
  avgTimePerQuestion: number;
  avgTimeBySubject: Record<Subject, number>;
  avgTimeBySubSkill: Partial<Record<SubSkill, number>>;
  questionsOverPace: number;
  questionsUnderPace: number;
  percentOverPace: number;
  fatigueIndicator: {
    firstThirdAccuracy: number;
    lastThirdAccuracy: number;
    firstThirdAvgTime: number;
    lastThirdAvgTime: number;
    hasFatigue: boolean;
  };
  accuracyVsTime: {
    fastCorrect: number;
    fastIncorrect: number;
    slowCorrect: number;
    slowIncorrect: number;
  };
}

export interface ScoreReport {
  session: ExamSession;
  totalScore: number;
  totalQuestions: number;
  accuracy: number;
  sectionScores: Record<Subject, { correct: number; total: number; accuracy: number }>;
  subSkillScores: Partial<Record<SubSkill, { correct: number; total: number; accuracy: number }>>;
  avgTimePerQuestion: number;
  slowestSection: Subject | null;
  pacingAnalysis: PacingAnalysis;
  mistakeAnalysis: MistakeAnalysis;
  recommendations: Recommendation[];
  dailyPrescription?: DailyPrescription;
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  category: Subject | SubSkill | 'pacing' | 'general';
  title: string;
  description: string;
}

export interface DailyPrescription {
  skills: {
    subject: Subject;
    subSkill: SubSkill;
    minutes: number;
    reason: string;
  }[];
  pacingAdvice: string[];
  totalMinutes: number;
}

// Training Plan Types
export interface TrainingDay {
  day: number;
  date: Date;
  tasks: TrainingTask[];
  isComplete: boolean;
  actualPerformance?: {
    completedTasks: number;
    avgAccuracy: number;
  };
}

export interface TrainingTask {
  id: string;
  type: 'targeted' | 'pacing' | 'review';
  title: string;
  description: string;
  subject?: Subject;
  subSkill?: SubSkill;
  questionCount: number;
  timeMinutes: number;
  isComplete: boolean;
  questionIds?: string[];
}

export interface TrainingPlan {
  id: string;
  createdAt: number;
  startDate: Date;
  endDate: Date;
  days: TrainingDay[];
  weakAreas: { subject: Subject; subSkill: SubSkill; accuracy: number }[];
  baselineAccuracy: number;
  targetAccuracy: number;
}

// Admin Types
export interface QuestionSource {
  id: string;
  name: string;
  dateAdded: number;
  notes?: string;
  questionCount: number;
}

export interface QuestionImport {
  stem: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  subject: Subject;
  subSkill: SubSkill;
  difficulty: Difficulty;
  explanation?: string;
  sourceName: string;
  pageNumber?: number;
}

// Helper function to generate question hash for duplicate detection
export function generateQuestionHash(stem: string, options: { A: string; B: string; C: string; D: string }): string {
  const normalized = `${stem.toLowerCase().trim()}|${options.A.toLowerCase().trim()}|${options.B.toLowerCase().trim()}|${options.C.toLowerCase().trim()}|${options.D.toLowerCase().trim()}`;
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

// Subject labels
export const SUBJECT_LABELS: Record<Subject, string> = {
  verbal: 'Verbal Skills',
  math: 'Mathematics',
  reading: 'Reading',
  language: 'Language'
};

export const SUBSKILL_LABELS: Record<SubSkill, string> = {
  analogy: 'Analogies',
  synonym: 'Synonyms',
  antonym: 'Antonyms',
  classification: 'Classification',
  logic: 'Logic',
  arithmetic: 'Arithmetic',
  algebra: 'Algebra',
  geometry: 'Geometry',
  'word-problem': 'Word Problems',
  fractions: 'Fractions',
  percentages: 'Percentages',
  'main-idea': 'Main Idea',
  inference: 'Inference',
  'vocabulary-context': 'Vocabulary in Context',
  detail: 'Details',
  tone: 'Tone & Purpose',
  grammar: 'Grammar',
  punctuation: 'Punctuation',
  'sentence-structure': 'Sentence Structure',
  usage: 'Word Usage',
  capitalization: 'Capitalization'
};

export const SUBJECT_SUBSKILLS: Record<Subject, SubSkill[]> = {
  verbal: ['analogy', 'synonym', 'antonym', 'classification', 'logic'],
  math: ['arithmetic', 'algebra', 'geometry', 'word-problem', 'fractions', 'percentages'],
  reading: ['main-idea', 'inference', 'vocabulary-context', 'detail', 'tone'],
  language: ['grammar', 'punctuation', 'sentence-structure', 'usage', 'capitalization']
};
