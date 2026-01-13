import { useState, useCallback, useEffect, useRef } from 'react';
import { Question, QuestionAttempt, ExamSession, ExamMode, ScoreReport, Recommendation, Subject, SubSkill, PacingAnalysis, MistakeAnalysis, PACING_BENCHMARKS, RUSHING_THRESHOLD, OVERTHINKING_THRESHOLD } from '@/types/exam';
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

  useEffect(() => {
    if (session && !session.isComplete && !session.isPaused && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
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
  }, [session?.id, session?.isComplete, session?.isPaused]);

  const startSession = useCallback((mode: ExamMode, customQuestionCount?: number) => {
    const modeConfig = examModes.find(m => m.id === mode);
    if (!modeConfig) return;

    const count = customQuestionCount || modeConfig.questionCount;
    const sessionQuestions = getRandomQuestions(count, modeConfig.subjects);
    
    const newSession: ExamSession = {
      id: generateSessionId(),
      mode,
      startTime: Date.now(),
      totalTimeAllowed: modeConfig.timeLimit * 60,
      attempts: [],
      isComplete: false,
      isPaused: false,
      totalPausedTime: 0
    };

    setSession(newSession);
    setQuestions(sessionQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTimeRemaining(modeConfig.timeLimit * 60);
    setQuestionStartTime(Date.now());

    localStorage.setItem('currentSession', JSON.stringify(newSession));
  }, []);

  const submitAnswer = useCallback(() => {
    if (!session || !questions[currentIndex]) return;

    const question = questions[currentIndex];
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    const benchmark = PACING_BENCHMARKS[question.subject];
    const wasOverPace = timeSpent > benchmark;
    
    let mistakeType: 'content-gap' | 'rushing' | 'overthinking' | null = null;
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    if (!isCorrect) {
      if (timeSpent < benchmark * RUSHING_THRESHOLD) {
        mistakeType = 'rushing';
      } else if (timeSpent > benchmark * OVERTHINKING_THRESHOLD) {
        mistakeType = 'overthinking';
      } else {
        mistakeType = 'content-gap';
      }
    }

    const attempt: QuestionAttempt = {
      questionId: question.id,
      subject: question.subject,
      type: question.subSkill,
      subSkill: question.subSkill,
      difficulty: question.difficulty,
      studentAnswer: selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      timeSpent,
      timestamp: Date.now(),
      sessionId: session.id,
      mode: session.mode,
      mistakeType,
      wasOverPace
    };

    const updatedSession = {
      ...session,
      attempts: [...session.attempts, attempt]
    };

    setSession(updatedSession);
    localStorage.setItem('currentSession', JSON.stringify(updatedSession));

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

    // Sub-skill scores
    const subSkillScores: Partial<Record<SubSkill, { correct: number; total: number; accuracy: number }>> = {};
    const allSubSkills = [...new Set(attempts.map(a => a.subSkill))];
    allSubSkills.forEach(subSkill => {
      const subAttempts = attempts.filter(a => a.subSkill === subSkill);
      const correct = subAttempts.filter(a => a.isCorrect).length;
      const total = subAttempts.length;
      subSkillScores[subSkill] = { correct, total, accuracy: total > 0 ? (correct / total) * 100 : 0 };
    });

    const totalTime = attempts.reduce((sum, a) => sum + a.timeSpent, 0);
    const avgTimePerQuestion = totalQuestions > 0 ? totalTime / totalQuestions : 0;

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

    // Pacing analysis
    const questionsOverPace = attempts.filter(a => a.wasOverPace).length;
    const thirdSize = Math.floor(attempts.length / 3);
    const firstThird = attempts.slice(0, thirdSize);
    const lastThird = attempts.slice(-thirdSize);

    const pacingAnalysis: PacingAnalysis = {
      avgTimePerQuestion,
      avgTimeBySubject: {} as Record<Subject, number>,
      avgTimeBySubSkill: {},
      questionsOverPace,
      questionsUnderPace: attempts.length - questionsOverPace,
      percentOverPace: totalQuestions > 0 ? (questionsOverPace / totalQuestions) * 100 : 0,
      fatigueIndicator: {
        firstThirdAccuracy: firstThird.length > 0 ? (firstThird.filter(a => a.isCorrect).length / firstThird.length) * 100 : 0,
        lastThirdAccuracy: lastThird.length > 0 ? (lastThird.filter(a => a.isCorrect).length / lastThird.length) * 100 : 0,
        firstThirdAvgTime: firstThird.length > 0 ? firstThird.reduce((s, a) => s + a.timeSpent, 0) / firstThird.length : 0,
        lastThirdAvgTime: lastThird.length > 0 ? lastThird.reduce((s, a) => s + a.timeSpent, 0) / lastThird.length : 0,
        hasFatigue: false
      },
      accuracyVsTime: {
        fastCorrect: attempts.filter(a => a.isCorrect && a.timeSpent < PACING_BENCHMARKS[a.subject]).length,
        fastIncorrect: attempts.filter(a => !a.isCorrect && a.timeSpent < PACING_BENCHMARKS[a.subject] * RUSHING_THRESHOLD).length,
        slowCorrect: attempts.filter(a => a.isCorrect && a.timeSpent > PACING_BENCHMARKS[a.subject]).length,
        slowIncorrect: attempts.filter(a => !a.isCorrect && a.timeSpent > PACING_BENCHMARKS[a.subject] * OVERTHINKING_THRESHOLD).length
      }
    };
    
    pacingAnalysis.fatigueIndicator.hasFatigue = 
      pacingAnalysis.fatigueIndicator.lastThirdAccuracy < pacingAnalysis.fatigueIndicator.firstThirdAccuracy - 10;

    subjects.forEach(s => {
      const sa = attempts.filter(a => a.subject === s);
      pacingAnalysis.avgTimeBySubject[s] = sa.length > 0 ? sa.reduce((sum, a) => sum + a.timeSpent, 0) / sa.length : 0;
    });

    // Mistake analysis
    const mistakeAnalysis: MistakeAnalysis = {
      contentGaps: attempts.filter(a => a.mistakeType === 'content-gap').length,
      rushingErrors: attempts.filter(a => a.mistakeType === 'rushing').length,
      overthinkingErrors: attempts.filter(a => a.mistakeType === 'overthinking').length
    };

    // Recommendations
    const recommendations: Recommendation[] = [];

    if (sectionScores.verbal.total > 0 && sectionScores.verbal.accuracy < 70) {
      recommendations.push({
        priority: 'high', category: 'verbal',
        title: 'Focus on Verbal Skills',
        description: 'Practice analogies, vocabulary, and logic reasoning daily.'
      });
    }

    if (sectionScores.math.total > 0 && sectionScores.math.accuracy < 70) {
      recommendations.push({
        priority: 'high', category: 'math',
        title: 'Strengthen Math Foundations',
        description: 'Review arithmetic, algebra, and geometry formulas.'
      });
    }

    if (sectionScores.reading.total > 0 && sectionScores.reading.accuracy < 70) {
      recommendations.push({
        priority: 'high', category: 'reading',
        title: 'Improve Reading Comprehension',
        description: 'Practice identifying main ideas and making inferences.'
      });
    }

    if (sectionScores.language.total > 0 && sectionScores.language.accuracy < 70) {
      recommendations.push({
        priority: 'high', category: 'language',
        title: 'Review Grammar Rules',
        description: 'Focus on subject-verb agreement and punctuation.'
      });
    }

    if (mistakeAnalysis.rushingErrors > 3) {
      recommendations.push({
        priority: 'medium', category: 'pacing',
        title: 'Slow Down',
        description: 'You\'re rushing through questions. Take time to read carefully.'
      });
    }

    if (mistakeAnalysis.overthinkingErrors > 3) {
      recommendations.push({
        priority: 'medium', category: 'pacing',
        title: 'Manage Time Better',
        description: 'Don\'t overthink. If stuck for 60+ seconds, skip and return.'
      });
    }

    if (pacingAnalysis.fatigueIndicator.hasFatigue) {
      recommendations.push({
        priority: 'medium', category: 'general',
        title: 'Build Endurance',
        description: 'Your accuracy dropped toward the end. Practice longer sessions.'
      });
    }

    return {
      session,
      totalScore: totalCorrect,
      totalQuestions,
      accuracy,
      sectionScores,
      subSkillScores,
      avgTimePerQuestion,
      slowestSection,
      pacingAnalysis,
      mistakeAnalysis,
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
