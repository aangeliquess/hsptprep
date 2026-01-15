// Vocabulary Types for Placement Prep

export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction';

export type VocabDifficulty = 'easy' | 'medium' | 'hard';

export type MasteryLevel = 'new' | 'learning' | 'review' | 'mastered';

export type VocabMode = 'learn' | 'test' | 'review';

export type VocabTestType = 'synonym' | 'antonym' | 'definition';

export interface VocabularyWord {
  id: string;
  word: string;
  partOfSpeech: PartOfSpeech;
  definition: string;
  synonyms: string[];
  antonyms: string[];
  exampleSentence?: string;
  difficulty: VocabDifficulty;
  frequency?: 'high' | 'medium' | 'low'; // exam relevance
  source?: string;
  dateAdded: number;
  tags?: string[];
}

export interface VocabInteraction {
  id: string;
  wordId: string;
  word: string;
  partOfSpeech: PartOfSpeech;
  mode: VocabMode;
  testType?: VocabTestType;
  response: 'correct' | 'incorrect' | 'known' | 'unknown' | 'unsure';
  timeSpentSeconds: number;
  timestamp: number;
  sessionId: string;
}

export interface VocabMastery {
  wordId: string;
  word: string;
  masteryLevel: MasteryLevel;
  correctCount: number;
  incorrectCount: number;
  totalInteractions: number;
  avgTimeSeconds: number;
  lastSeen: number;
  nextReviewDate: number;
  streak: number; // consecutive correct answers
}

export interface VocabSession {
  id: string;
  mode: VocabMode;
  startTime: number;
  endTime?: number;
  interactions: VocabInteraction[];
  wordsAttempted: number;
  wordsCorrect: number;
  accuracy: number;
}

export interface VocabTestQuestion {
  wordId: string;
  word: string;
  testType: VocabTestType;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface VocabReport {
  totalWordsStudied: number;
  totalTimeMinutes: number;
  accuracy: number;
  masteryBreakdown: {
    new: number;
    learning: number;
    review: number;
    mastered: number;
  };
  weakWords: VocabMastery[];
  recentlyMissed: VocabMastery[];
  slowWords: VocabMastery[];
  recommendedReviewCount: number;
}

// Storage keys
export const VOCAB_STORAGE_KEYS = {
  WORDS: 'placementPrep_vocabWords',
  MASTERY: 'placementPrep_vocabMastery',
  SESSIONS: 'placementPrep_vocabSessions',
  ADMIN_PASSCODE: 'placementPrep_adminPasscode'
};

// Default spaced repetition intervals (in days)
export const SPACED_INTERVALS: Record<MasteryLevel, number> = {
  new: 0,
  learning: 1,
  review: 3,
  mastered: 7
};

// Calculate next mastery level based on response
export function getNextMasteryLevel(
  current: MasteryLevel, 
  isCorrect: boolean,
  streak: number
): MasteryLevel {
  if (!isCorrect) {
    // Wrong answer: go back one level
    if (current === 'mastered') return 'review';
    if (current === 'review') return 'learning';
    return 'new';
  }
  
  // Correct answer: progress based on streak
  if (current === 'new' && streak >= 1) return 'learning';
  if (current === 'learning' && streak >= 2) return 'review';
  if (current === 'review' && streak >= 3) return 'mastered';
  
  return current;
}

// Generate unique ID
export function generateVocabId(): string {
  return `vocab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
