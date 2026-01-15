import { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  VocabularyWord, 
  VocabInteraction, 
  VocabMastery, 
  VocabSession,
  VocabTestQuestion,
  VocabMode,
  VocabTestType,
  VocabReport,
  VOCAB_STORAGE_KEYS,
  SPACED_INTERVALS,
  getNextMasteryLevel,
  generateVocabId
} from '@/types/vocabulary';
import { getVocabularyBank } from '@/data/vocabularyBank';

interface UseVocabularyReturn {
  // Data
  words: VocabularyWord[];
  mastery: VocabMastery[];
  currentSession: VocabSession | null;
  
  // Flashcard state
  currentWord: VocabularyWord | null;
  currentWordIndex: number;
  isFlipped: boolean;
  
  // Test state
  currentTestQuestion: VocabTestQuestion | null;
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | null;
  
  // Actions
  startSession: (mode: VocabMode, wordCount?: number, focusOnWeak?: boolean) => void;
  endSession: () => VocabReport | null;
  
  // Flashcard actions
  flipCard: () => void;
  markWord: (response: 'known' | 'unknown' | 'unsure') => void;
  nextWord: () => void;
  previousWord: () => void;
  
  // Test actions
  generateTestQuestion: () => void;
  submitTestAnswer: (answer: 'A' | 'B' | 'C' | 'D') => boolean;
  
  // Stats
  getWordMastery: (wordId: string) => VocabMastery | undefined;
  getReport: () => VocabReport;
  getWordsForReview: () => VocabularyWord[];
  getWeakWords: () => VocabularyWord[];
  
  // Progress
  sessionProgress: { current: number; total: number };
  sessionAccuracy: number;
}

// Helper to get mastery data
function getMasteryData(): VocabMastery[] {
  const stored = localStorage.getItem(VOCAB_STORAGE_KEYS.MASTERY);
  return stored ? JSON.parse(stored) : [];
}

// Helper to save mastery data
function saveMasteryData(mastery: VocabMastery[]): void {
  localStorage.setItem(VOCAB_STORAGE_KEYS.MASTERY, JSON.stringify(mastery));
}

// Helper to get sessions
function getSessionHistory(): VocabSession[] {
  const stored = localStorage.getItem(VOCAB_STORAGE_KEYS.SESSIONS);
  return stored ? JSON.parse(stored) : [];
}

// Helper to save session
function saveSession(session: VocabSession): void {
  const sessions = getSessionHistory();
  sessions.push(session);
  // Keep only last 50 sessions
  if (sessions.length > 50) sessions.shift();
  localStorage.setItem(VOCAB_STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
}

// Generate a test question from a word
function createTestQuestion(
  word: VocabularyWord, 
  allWords: VocabularyWord[], 
  testType: VocabTestType
): VocabTestQuestion {
  const getDistractors = (correctAnswers: string[], allOptions: string[]): string[] => {
    const available = allOptions.filter(o => 
      !correctAnswers.some(c => c.toLowerCase() === o.toLowerCase())
    );
    // Shuffle and take 3
    return available.sort(() => Math.random() - 0.5).slice(0, 3);
  };
  
  let questionText = '';
  let correctAnswerText = '';
  let distractors: string[] = [];
  
  switch (testType) {
    case 'synonym':
      questionText = `Which word is a synonym of \"${word.word}\"?`;
      correctAnswerText = word.synonyms[Math.floor(Math.random() * word.synonyms.length)];
      distractors = getDistractors(
        word.synonyms, 
        allWords.flatMap(w => w.synonyms).filter(s => s)
      );
      break;
      
    case 'antonym':
      if (word.antonyms.length === 0) {
        // Fallback to synonym if no antonyms
        return createTestQuestion(word, allWords, 'synonym');
      }
      questionText = `Which word is an antonym of \"${word.word}\"?`;
      correctAnswerText = word.antonyms[Math.floor(Math.random() * word.antonyms.length)];
      distractors = getDistractors(
        word.antonyms,
        allWords.flatMap(w => w.antonyms).filter(a => a)
      );
      break;
      
    case 'definition':
      questionText = `What is the meaning of \"${word.word}\"?`;
      correctAnswerText = word.definition;
      distractors = getDistractors(
        [word.definition],
        allWords.map(w => w.definition)
      );
      break;
  }
  
  // If not enough distractors, add generic ones
  while (distractors.length < 3) {
    const fallback = allWords[Math.floor(Math.random() * allWords.length)];
    const fallbackText = testType === 'definition' ? fallback.definition : 
      testType === 'synonym' ? (fallback.synonyms[0] || 'none') :
      (fallback.antonyms[0] || fallback.synonyms[0] || 'none');
    if (!distractors.includes(fallbackText) && fallbackText !== correctAnswerText) {
      distractors.push(fallbackText);
    }
  }
  
  // Shuffle options
  const allOptions = [correctAnswerText, ...distractors.slice(0, 3)];
  const shuffled = allOptions.sort(() => Math.random() - 0.5);
  const correctIndex = shuffled.indexOf(correctAnswerText);
  const labels: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  
  return {
    wordId: word.id,
    word: word.word,
    testType,
    questionText,
    options: {
      A: shuffled[0],
      B: shuffled[1],
      C: shuffled[2],
      D: shuffled[3]
    },
    correctAnswer: labels[correctIndex]
  };
}

export function useVocabulary(): UseVocabularyReturn {
  const [words] = useState<VocabularyWord[]>(() => getVocabularyBank());
  const [mastery, setMastery] = useState<VocabMastery[]>(() => getMasteryData());
  const [currentSession, setCurrentSession] = useState<VocabSession | null>(null);
  
  // Flashcard state
  const [sessionWords, setSessionWords] = useState<VocabularyWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  
  // Test state
  const [currentTestQuestion, setCurrentTestQuestion] = useState<VocabTestQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  
  const currentWord = useMemo(() => 
    sessionWords[currentWordIndex] || null
  , [sessionWords, currentWordIndex]);
  
  // Start a vocabulary session
  const startSession = useCallback((
    mode: VocabMode, 
    wordCount: number = 10,
    focusOnWeak: boolean = false
  ) => {
    let selectedWords: VocabularyWord[] = [];
    
    if (mode === 'review') {
      // Get words that need review
      const reviewWords = words.filter(w => {
        const m = mastery.find(ma => ma.wordId === w.id);
        if (!m) return true; // New words need review
        return m.nextReviewDate <= Date.now() || m.masteryLevel !== 'mastered';
      });
      selectedWords = reviewWords.sort(() => Math.random() - 0.5).slice(0, wordCount);
    } else if (focusOnWeak) {
      // Focus on weak words (low mastery)
      const weakWords = words.filter(w => {
        const m = mastery.find(ma => ma.wordId === w.id);
        return !m || m.masteryLevel === 'new' || m.masteryLevel === 'learning';
      });
      selectedWords = weakWords.sort(() => Math.random() - 0.5).slice(0, wordCount);
    } else {
      // Random selection
      selectedWords = [...words].sort(() => Math.random() - 0.5).slice(0, wordCount);
    }
    
    // Ensure we have enough words
    if (selectedWords.length < wordCount) {
      const remaining = words.filter(w => !selectedWords.includes(w));
      selectedWords.push(...remaining.sort(() => Math.random() - 0.5).slice(0, wordCount - selectedWords.length));
    }
    
    const session: VocabSession = {
      id: generateVocabId(),
      mode,
      startTime: Date.now(),
      interactions: [],
      wordsAttempted: 0,
      wordsCorrect: 0,
      accuracy: 0
    };
    
    setCurrentSession(session);
    setSessionWords(selectedWords);
    setCurrentWordIndex(0);
    setIsFlipped(false);
    setQuestionStartTime(Date.now());
    setCurrentTestQuestion(null);
    setSelectedAnswer(null);
    
    // Generate first test question if in test mode
    if (mode === 'test' && selectedWords.length > 0) {
      const testTypes: VocabTestType[] = ['synonym', 'antonym', 'definition'];
      const randomType = testTypes[Math.floor(Math.random() * testTypes.length)];
      setCurrentTestQuestion(createTestQuestion(selectedWords[0], words, randomType));
    }
  }, [words, mastery]);
  
  // Record an interaction and update mastery
  const recordInteraction = useCallback((
    word: VocabularyWord,
    response: VocabInteraction['response'],
    testType?: VocabTestType
  ) => {
    if (!currentSession) return;
    
    const timeSpent = (Date.now() - questionStartTime) / 1000;
    const isCorrect = response === 'correct' || response === 'known';
    
    // Create interaction
    const interaction: VocabInteraction = {
      id: generateVocabId(),
      wordId: word.id,
      word: word.word,
      partOfSpeech: word.partOfSpeech,
      mode: currentSession.mode,
      testType,
      response,
      timeSpentSeconds: timeSpent,
      timestamp: Date.now(),
      sessionId: currentSession.id
    };
    
    // Update session
    const updatedSession = {
      ...currentSession,
      interactions: [...currentSession.interactions, interaction],
      wordsAttempted: currentSession.wordsAttempted + 1,
      wordsCorrect: currentSession.wordsCorrect + (isCorrect ? 1 : 0)
    };
    updatedSession.accuracy = (updatedSession.wordsCorrect / updatedSession.wordsAttempted) * 100;
    setCurrentSession(updatedSession);
    
    // Update mastery
    const existingMastery = mastery.find(m => m.wordId === word.id);
    const currentStreak = existingMastery ? (isCorrect ? existingMastery.streak + 1 : 0) : (isCorrect ? 1 : 0);
    const currentLevel = existingMastery?.masteryLevel || 'new';
    const newLevel = getNextMasteryLevel(currentLevel, isCorrect, currentStreak);
    
    const newMastery: VocabMastery = {
      wordId: word.id,
      word: word.word,
      masteryLevel: newLevel,
      correctCount: (existingMastery?.correctCount || 0) + (isCorrect ? 1 : 0),
      incorrectCount: (existingMastery?.incorrectCount || 0) + (isCorrect ? 0 : 1),
      totalInteractions: (existingMastery?.totalInteractions || 0) + 1,
      avgTimeSeconds: existingMastery 
        ? (existingMastery.avgTimeSeconds * existingMastery.totalInteractions + timeSpent) / (existingMastery.totalInteractions + 1)
        : timeSpent,
      lastSeen: Date.now(),
      nextReviewDate: Date.now() + (SPACED_INTERVALS[newLevel] * 24 * 60 * 60 * 1000),
      streak: currentStreak
    };
    
    const updatedMastery = existingMastery 
      ? mastery.map(m => m.wordId === word.id ? newMastery : m)
      : [...mastery, newMastery];
    
    setMastery(updatedMastery);
    saveMasteryData(updatedMastery);
    
    // Reset timer for next word
    setQuestionStartTime(Date.now());
  }, [currentSession, mastery, questionStartTime]);
  
  // Flashcard actions
  const flipCard = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped]);
  
  const markWord = useCallback((response: 'known' | 'unknown' | 'unsure') => {
    if (!currentWord) return;
    recordInteraction(currentWord, response);
    
    // Auto-advance to next word
    if (currentWordIndex < sessionWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setIsFlipped(false);
    }
  }, [currentWord, currentWordIndex, sessionWords.length, recordInteraction]);
  
  const nextWord = useCallback(() => {
    if (currentWordIndex < sessionWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setIsFlipped(false);
      setQuestionStartTime(Date.now());
      
      // Generate next test question if in test mode
      if (currentSession?.mode === 'test') {
        const nextWord = sessionWords[currentWordIndex + 1];
        const testTypes: VocabTestType[] = ['synonym', 'antonym', 'definition'];
        const randomType = testTypes[Math.floor(Math.random() * testTypes.length)];
        setCurrentTestQuestion(createTestQuestion(nextWord, words, randomType));
        setSelectedAnswer(null);
      }
    }
  }, [currentWordIndex, sessionWords, currentSession, words]);
  
  const previousWord = useCallback(() => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setIsFlipped(false);
    }
  }, [currentWordIndex]);
  
  // Test actions
  const generateTestQuestion = useCallback(() => {
    if (!currentWord) return;
    const testTypes: VocabTestType[] = ['synonym', 'antonym', 'definition'];
    const randomType = testTypes[Math.floor(Math.random() * testTypes.length)];
    setCurrentTestQuestion(createTestQuestion(currentWord, words, randomType));
    setSelectedAnswer(null);
  }, [currentWord, words]);
  
  const submitTestAnswer = useCallback((answer: 'A' | 'B' | 'C' | 'D'): boolean => {
    if (!currentTestQuestion || !currentWord) return false;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === currentTestQuestion.correctAnswer;
    recordInteraction(currentWord, isCorrect ? 'correct' : 'incorrect', currentTestQuestion.testType);
    
    return isCorrect;
  }, [currentTestQuestion, currentWord, recordInteraction]);
  
  // End session
  const endSession = useCallback((): VocabReport | null => {
    if (!currentSession) return null;
    
    const finalSession: VocabSession = {
      ...currentSession,
      endTime: Date.now()
    };
    
    saveSession(finalSession);
    setCurrentSession(null);
    setSessionWords([]);
    setCurrentWordIndex(0);
    setCurrentTestQuestion(null);
    
    return getReport();
  }, [currentSession]);
  
  // Get word mastery
  const getWordMastery = useCallback((wordId: string): VocabMastery | undefined => {
    return mastery.find(m => m.wordId === wordId);
  }, [mastery]);
  
  // Get report
  const getReport = useCallback((): VocabReport => {
    const sessions = getSessionHistory();
    const totalTime = sessions.reduce((sum, s) => 
      sum + ((s.endTime || Date.now()) - s.startTime) / 1000 / 60, 0
    );
    
    const masteryBreakdown = {
      new: 0,
      learning: 0,
      review: 0,
      mastered: 0
    };
    
    mastery.forEach(m => {
      masteryBreakdown[m.masteryLevel]++;
    });
    
    // Words not in mastery are \"new\"
    masteryBreakdown.new += words.length - mastery.length;
    
    const totalCorrect = mastery.reduce((sum, m) => sum + m.correctCount, 0);
    const totalAttempts = mastery.reduce((sum, m) => sum + m.totalInteractions, 0);
    
    const weakWords = mastery
      .filter(m => m.masteryLevel === 'new' || m.masteryLevel === 'learning')
      .sort((a, b) => a.correctCount / Math.max(a.totalInteractions, 1) - b.correctCount / Math.max(b.totalInteractions, 1))
      .slice(0, 10);
    
    const recentlyMissed = mastery
      .filter(m => m.incorrectCount > 0)
      .sort((a, b) => b.lastSeen - a.lastSeen)
      .slice(0, 10);
    
    const slowWords = mastery
      .filter(m => m.avgTimeSeconds > 10)
      .sort((a, b) => b.avgTimeSeconds - a.avgTimeSeconds)
      .slice(0, 10);
    
    const needsReview = mastery.filter(m => m.nextReviewDate <= Date.now()).length;
    
    return {
      totalWordsStudied: mastery.length,
      totalTimeMinutes: Math.round(totalTime),
      accuracy: totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0,
      masteryBreakdown,
      weakWords,
      recentlyMissed,
      slowWords,
      recommendedReviewCount: Math.min(needsReview + 5, 15)
    };
  }, [mastery, words]);
  
  // Get words for review
  const getWordsForReview = useCallback((): VocabularyWord[] => {
    const reviewMastery = mastery.filter(m => m.nextReviewDate <= Date.now());
    return words.filter(w => reviewMastery.some(m => m.wordId === w.id));
  }, [words, mastery]);
  
  // Get weak words
  const getWeakWords = useCallback((): VocabularyWord[] => {
    const weakMastery = mastery.filter(m => 
      m.masteryLevel === 'new' || m.masteryLevel === 'learning'
    );
    return words.filter(w => weakMastery.some(m => m.wordId === w.id));
  }, [words, mastery]);
  
  // Progress
  const sessionProgress = useMemo(() => ({
    current: currentWordIndex + 1,
    total: sessionWords.length
  }), [currentWordIndex, sessionWords.length]);
  
  const sessionAccuracy = useMemo(() => 
    currentSession?.accuracy || 0
  , [currentSession]);
  
  return {
    words,
    mastery,
    currentSession,
    currentWord,
    currentWordIndex,
    isFlipped,
    currentTestQuestion,
    selectedAnswer,
    startSession,
    endSession,
    flipCard,
    markWord,
    nextWord,
    previousWord,
    generateTestQuestion,
    submitTestAnswer,
    getWordMastery,
    getReport,
    getWordsForReview,
    getWeakWords,
    sessionProgress,
    sessionAccuracy
  };
}
