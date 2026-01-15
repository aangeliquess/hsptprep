import { useState } from 'react';
import { HomeView } from '@/components/HomeView';
import { ExamView } from '@/components/ExamView';
import { ScoreReport } from '@/components/ScoreReport';
import { HistoryView } from '@/components/HistoryView';
import { VocabularyView } from '@/components/VocabularyView';
import { useExamSession } from '@/hooks/useExamSession';
import { ExamMode } from '@/types/exam';

type View = 'home' | 'exam' | 'report' | 'history' | 'vocabulary';

const Index = () => {
  const [view, setView] = useState<View>('home');
  
  const {
    session,
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedAnswer,
    setSelectedAnswer,
    timeRemaining,
    startSession,
    submitAnswer,
    generateReport,
    resetSession
  } = useExamSession();

  const handleStartExam = (mode: ExamMode) => {
    startSession(mode);
    setView('exam');
  };

  const handleSubmitAnswer = () => {
    submitAnswer();
    if (currentIndex === totalQuestions - 1) {
      setTimeout(() => setView('report'), 100);
    }
  };

  const handleQuitExam = () => {
    if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
      resetSession();
      setView('home');
    }
  };

  const handleCloseReport = () => {
    resetSession();
    setView('home');
  };

  const report = generateReport();

  if (view === 'vocabulary') {
    return <VocabularyView onBack={() => setView('home')} />;
  }

  if (view === 'history') {
    return <HistoryView onBack={() => setView('home')} />;
  }

  if (view === 'report' && report) {
    return <ScoreReport report={report} onClose={handleCloseReport} />;
  }

  if (view === 'exam' && session && currentQuestion) {
    return (
      <ExamView
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={setSelectedAnswer}
        onSubmit={handleSubmitAnswer}
        onQuit={handleQuitExam}
        timeRemaining={timeRemaining}
      />
    );
  }

  return (
    <HomeView 
      onStartExam={handleStartExam}
      onShowHistory={() => setView('history')}
      onShowVocabulary={() => setView('vocabulary')}
    />
  );
};

export default Index;
