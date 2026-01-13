import { useState, useCallback, useEffect, useRef } from 'react';
import { Question, QuestionAttempt, ExamSession, ExamMode, ScoreReport, Recommendation, Subject } from '@/types/exam';
import { examModes } from '@/data/examModes';
import { getRandomQuestions } from '@/data/questions';

const generateSessionId = () => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useExamSession = () => {
  const [session, setSession] = useState<ExamSession | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer logic
  useEffect(() => {
    if (session && !session.isComplete && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up - auto-complete
            endSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [session?.id, session?.isComplete]);

  const startSession = useCallback((mode: ExamMode) => {
    const modeConfig = examModes.find(m => m.id === mode);
    if (!modeConfig) return;

    const sessionQuestions = getRandomQuestions(modeConfig.questionCount, modeConfig.subjects);
    
    const newSession: ExamSession = {
      id: generateSessionId(),
      mode,
      startTime: Date.now(),
      totalTimeAllowed: modeConfig.timeLimit * 60,
      attempts: [],
      isComplete: false
    };

    setSession(newSession);
    setQuestions(sessionQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTimeRemaining(modeConfig.timeLimit * 60);
    setQuestionStartTime(Date.now());

    // Persist to localStorage
    localStorage.setItem('currentSession', JSON.stringify(newSession));
  }, []);

  const submitAnswer = useCallback(() => {
    if (!session || !questions[currentIndex]) return;

    const question = questions[currentIndex];
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);

    const attempt: QuestionAttempt = {
      questionId: question.id,
      subject: question.subject,
      type: question.type,
      studentAnswer: selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect: selectedAnswer === question.correctAnswer,
      timeSpent,
      timestamp: Date.now()
    };

    const updatedSession = {
      ...session,
      attempts: [...session.attempts, attempt]
    };

    setSession(updatedSession);
    localStorage.setItem('currentSession', JSON.stringify(updatedSession));

    // Move to next question or end
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setQuestionStartTime(Date.now());
    } else {
      endSession();
    }
  }, [session, questions, currentIndex, selectedAnswer, questionStartTime]);

  const endSession = useCallback(() => {
    if (!session) return;

    const completedSession = {
      ...session,
      endTime: Date.now(),
      isComplete: true
    };

    setSession(completedSession);
    
    // Save to history
    const history = JSON.parse(localStorage.getItem('examHistory') || '[]');
    history.push(completedSession);
    localStorage.setItem('examHistory', JSON.stringify(history));
    localStorage.removeItem('currentSession');

    if (timerRef.current) clearInterval(timerRef.current);
  }, [session]);

  const generateReport = useCallback((): ScoreReport | null => {
    if (!session) return null;

    const attempts = session.attempts;
    const totalQuestions = attempts.length;
    const totalCorrect = attempts.filter(a => a.isCorrect).length;
    const accuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

    // Section scores
    const subjects: Subject[] = ['verbal', 'math', 'reading', 'language'];
    const sectionScores: Record<Subject, { correct: number; total: number; accuracy: number }> = {} as any;
    
    subjects.forEach(subject => {
      const sectionAttempts = attempts.filter(a => a.subject === subject);
      const correct = sectionAttempts.filter(a => a.isCorrect).length;
      const total = sectionAttempts.length;
      sectionScores[subject] = {
        correct,
        total,
        accuracy: total > 0 ? (correct / total) * 100 : 0
      };
    });

    // Timing analysis
    const totalTime = attempts.reduce((sum, a) => sum + a.timeSpent, 0);
    const avgTimePerQuestion = totalQuestions > 0 ? totalTime / totalQuestions : 0;

    // Find slowest section
    let slowestSection: Subject | null = null;
    let maxAvgTime = 0;
    subjects.forEach(subject => {
      const sectionAttempts = attempts.filter(a => a.subject === subject);
      if (sectionAttempts.length > 0) {
        const avgTime = sectionAttempts.reduce((sum, a) => sum + a.timeSpent, 0) / sectionAttempts.length;
        if (avgTime > maxAvgTime) {
          maxAvgTime = avgTime;
          slowestSection = subject;
        }
      }
    });

    // Generate recommendations
    const recommendations: Recommendation[] = [];

    // Subject-specific recommendations
    if (sectionScores.verbal.total > 0 && sectionScores.verbal.accuracy < 70) {
      recommendations.push({
        priority: 'high',
        category: 'verbal',
        title: 'Focus on Verbal Skills',
        description: 'Practice analogies, vocabulary definitions, and logical reasoning. Review word relationships and synonyms/antonyms.'
      });
    }

    if (sectionScores.math.total > 0 && sectionScores.math.accuracy < 70) {
      recommendations.push({
        priority: 'high',
        category: 'math',
        title: 'Strengthen Math Foundations',
        description: 'Review arithmetic operations, basic algebra, and geometry formulas. Practice word problem translation.'
      });
    }

    if (sectionScores.reading.total > 0 && sectionScores.reading.accuracy < 70) {
      recommendations.push({
        priority: 'high',
        category: 'reading',
        title: 'Improve Reading Comprehension',
        description: 'Practice identifying main ideas, making inferences, and understanding context clues in passages.'
      });
    }

    if (sectionScores.language.total > 0 && sectionScores.language.accuracy < 70) {
      recommendations.push({
        priority: 'high',
        category: 'language',
        title: 'Review Grammar Rules',
        description: 'Focus on subject-verb agreement, punctuation rules, and sentence structure. Practice identifying errors.'
      });
    }

    // Pacing recommendation
    if (avgTimePerQuestion > 60) {
      recommendations.push({
        priority: 'medium',
        category: 'pacing',
        title: 'Improve Your Pace',
        description: 'You\'re spending too long on each question. Practice with timed Quick Drills to build speed.'
      });
    }

    // Logic-specific check
    const logicAttempts = attempts.filter(a => a.type === 'logic');
    if (logicAttempts.length > 0) {
      const logicCorrect = logicAttempts.filter(a => a.isCorrect).length;
      if ((logicCorrect / logicAttempts.length) < 0.6) {
        recommendations.push({
          priority: 'medium',
          category: 'verbal',
          title: 'Practice Logic Reasoning',
          description: 'Use line diagrams to visualize relationships in logic problems. Practice elimination strategies.'
        });
      }
    }

    return {
      session,
      totalScore: totalCorrect,
      totalQuestions,
      accuracy,
      sectionScores,
      avgTimePerQuestion,
      slowestSection,
      recommendations
    };
  }, [session]);

  const resetSession = useCallback(() => {
    setSession(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTimeRemaining(0);
    localStorage.removeItem('currentSession');
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  return {
    session,
    questions,
    currentQuestion: questions[currentIndex],
    currentIndex,
    totalQuestions: questions.length,
    selectedAnswer,
    setSelectedAnswer,
    timeRemaining,
    startSession,
    submitAnswer,
    endSession,
    generateReport,
    resetSession
  };
};
