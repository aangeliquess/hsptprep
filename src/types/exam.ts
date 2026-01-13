export type Subject = 'verbal' | 'math' | 'reading' | 'language';

export type QuestionType = 
  | 'analogy' 
  | 'vocabulary' 
  | 'logic' 
  | 'classification'
  | 'arithmetic'
  | 'algebra'
  | 'geometry'
  | 'word-problem'
  | 'grammar'
  | 'punctuation'
  | 'comprehension';

export interface Question {
  id: string;
  subject: Subject;
  type: QuestionType;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
}

export interface QuestionAttempt {
  questionId: string;
  subject: Subject;
  type: QuestionType;
  studentAnswer: 'A' | 'B' | 'C' | 'D' | null;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  timeSpent: number; // in seconds
  timestamp: number;
}

export interface ExamSession {
  id: string;
  mode: ExamMode;
  startTime: number;
  endTime?: number;
  totalTimeAllowed: number; // in seconds
  attempts: QuestionAttempt[];
  isComplete: boolean;
}

export type ExamMode = 
  | 'full-mock'
  | 'verbal-practice'
  | 'math-practice'
  | 'reading-practice'
  | 'language-practice'
  | 'quick-drill';

export interface ExamModeConfig {
  id: ExamMode;
  name: string;
  description: string;
  questionCount: number;
  timeLimit: number; // in minutes
  subjects: Subject[];
  icon: string;
}

export interface ScoreReport {
  session: ExamSession;
  totalScore: number;
  totalQuestions: number;
  accuracy: number;
  sectionScores: Record<Subject, { correct: number; total: number; accuracy: number }>;
  avgTimePerQuestion: number;
  slowestSection: Subject | null;
  recommendations: Recommendation[];
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  category: Subject | 'pacing';
  title: string;
  description: string;
}
