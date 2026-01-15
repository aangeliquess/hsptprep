import { useState } from 'react';
import { Header } from './Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useVocabulary } from '@/hooks/useVocabulary';
import { VocabMode } from '@/types/vocabulary';
import { 
  BookOpen, 
  GraduationCap, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  Check,
  X,
  HelpCircle,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VocabularyViewProps {
  onBack: () => void;
}

type VocabViewState = 'menu' | 'learn' | 'test' | 'review' | 'complete';

export const VocabularyView = ({ onBack }: VocabularyViewProps) => {
  const [viewState, setViewState] = useState<VocabViewState>('menu');
  const [wordCount, setWordCount] = useState(10);
  
  const {
    currentSession,
    currentWord,
    isFlipped,
    currentTestQuestion,
    selectedAnswer,
    startSession,
    endSession,
    flipCard,
    markWord,
    nextWord,
    previousWord,
    submitTestAnswer,
    sessionProgress,
    sessionAccuracy,
    getReport,
    currentWordIndex,
    mastery
  } = useVocabulary();

  const handleStartSession = (mode: VocabMode) => {
    startSession(mode, wordCount, mode === 'review');
    setViewState(mode);
  };

  const handleEndSession = () => {
    endSession();
    setViewState('complete');
  };

  const handleBackToMenu = () => {
    if (currentSession) {
      if (confirm('End current session?')) {
        endSession();
        setViewState('menu');
      }
    } else {
      setViewState('menu');
    }
  };

  const report = getReport();

  // Menu View
  if (viewState === 'menu') {
    return (
      <div className="min-h-screen bg-background">
        <Header showHistoryButton={false} />
        
        <main className="max-w-3xl mx-auto px-4 py-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>

          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Vocabulary Practice</h1>
            <p className="text-muted-foreground">Build your word power for the HSPT</p>
          </div>

          {/* Stats Summary */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{report.masteryBreakdown.mastered}</p>
                  <p className="text-xs text-muted-foreground">Mastered</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent-foreground">{report.masteryBreakdown.review}</p>
                  <p className="text-xs text-muted-foreground">Review</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">{report.masteryBreakdown.learning}</p>
                  <p className="text-xs text-muted-foreground">Learning</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-muted-foreground">{report.masteryBreakdown.new}</p>
                  <p className="text-xs text-muted-foreground">New</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Word Count Selector */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">Words per session:</p>
            <div className="flex gap-2">
              {[5, 10, 15, 25].map(count => (
                <Button
                  key={count}
                  variant={wordCount === count ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setWordCount(count)}
                >
                  {count}
                </Button>
              ))}
            </div>
          </div>

          {/* Mode Cards */}
          <div className="space-y-4">
            <Card 
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleStartSession('learn')}
            >
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Learn Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Flashcards with flip. Mark words as known, unsure, or unknown.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleStartSession('test')}
            >
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/50 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Test Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiple-choice questions: synonyms, antonyms, definitions.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleStartSession('review')}
            >
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
                  <RotateCcw className="h-6 w-6 text-warning" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Review Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Focus on words you've missed or haven't seen recently.
                  </p>
                </div>
                {report.recommendedReviewCount > 0 && (
                  <Badge variant="secondary">{report.recommendedReviewCount} due</Badge>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Learn/Review Mode - Flashcards
  if ((viewState === 'learn' || viewState === 'review') && currentWord) {
    const wordMastery = mastery.find(m => m.wordId === currentWord.id);
    
    return (
      <div className="min-h-screen bg-background">
        <Header showHistoryButton={false} />
        
        <main className="max-w-2xl mx-auto px-4 py-8">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={handleBackToMenu} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="text-sm text-muted-foreground">
              {sessionProgress.current} of {sessionProgress.total}
            </div>
            <Button variant="outline" size="sm" onClick={handleEndSession}>
              End
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-secondary rounded-full mb-8">
            <div 
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(sessionProgress.current / sessionProgress.total) * 100}%` }}
            />
          </div>

          {/* Flashcard */}
          <div 
            className={cn(
              "relative cursor-pointer perspective-1000",
              "min-h-[300px] mb-6"
            )}
            onClick={flipCard}
          >
            <Card className={cn(
              "absolute inset-0 backface-hidden transition-transform duration-500",
              isFlipped && "rotate-y-180"
            )}>
              <CardContent className="h-full flex flex-col items-center justify-center py-12">
                <Badge variant="outline" className="mb-4">{currentWord.partOfSpeech}</Badge>
                <h2 className="font-serif text-4xl font-bold text-center mb-4">
                  {currentWord.word}
                </h2>
                <p className="text-sm text-muted-foreground">Tap to flip</p>
                {wordMastery && (
                  <Badge className="mt-4" variant="secondary">
                    {wordMastery.masteryLevel}
                  </Badge>
                )}
              </CardContent>
            </Card>

            <Card className={cn(
              "absolute inset-0 backface-hidden transition-transform duration-500 rotate-y-180",
              isFlipped && "rotate-y-0"
            )}>
              <CardContent className="h-full flex flex-col items-center justify-center py-8 text-center">
                <p className="text-lg mb-4">{currentWord.definition}</p>
                
                {currentWord.synonyms.length > 0 && (
                  <div className="mb-3">
                    <span className="text-xs text-muted-foreground">Synonyms: </span>
                    <span className="text-sm">{currentWord.synonyms.slice(0, 3).join(', ')}</span>
                  </div>
                )}
                
                {currentWord.antonyms.length > 0 && (
                  <div className="mb-3">
                    <span className="text-xs text-muted-foreground">Antonyms: </span>
                    <span className="text-sm">{currentWord.antonyms.slice(0, 3).join(', ')}</span>
                  </div>
                )}
                
                {currentWord.exampleSentence && (
                  <p className="text-sm italic text-muted-foreground mt-2">
                    "{currentWord.exampleSentence}"
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Mark Buttons */}
          <div className="flex gap-3 justify-center mb-6">
            <Button 
              variant="outline" 
              className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => markWord('unknown')}
            >
              <X className="h-4 w-4 mr-2" />
              Don't Know
            </Button>
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => markWord('unsure')}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Unsure
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary/10"
              onClick={() => markWord('known')}
            >
              <Check className="h-4 w-4 mr-2" />
              Know It
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="ghost" 
              onClick={previousWord}
              disabled={currentWordIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="ghost" 
              onClick={nextWord}
              disabled={currentWordIndex >= sessionProgress.total - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Test Mode
  if (viewState === 'test' && currentTestQuestion) {
    const isAnswered = selectedAnswer !== null;
    const isCorrect = selectedAnswer === currentTestQuestion.correctAnswer;
    
    return (
      <div className="min-h-screen bg-background">
        <Header showHistoryButton={false} />
        
        <main className="max-w-2xl mx-auto px-4 py-8">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={handleBackToMenu} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {sessionProgress.current} of {sessionProgress.total}
              </span>
              <span className="text-sm font-medium">
                {Math.round(sessionAccuracy)}% correct
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleEndSession}>
              End
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-secondary rounded-full mb-8">
            <div 
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(sessionProgress.current / sessionProgress.total) * 100}%` }}
            />
          </div>

          {/* Question */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <Badge variant="outline" className="mb-3">{currentTestQuestion.testType}</Badge>
              <h2 className="text-xl font-medium">{currentTestQuestion.questionText}</h2>
            </CardContent>
          </Card>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {(['A', 'B', 'C', 'D'] as const).map(letter => {
              const isSelected = selectedAnswer === letter;
              const isCorrectAnswer = currentTestQuestion.correctAnswer === letter;
              
              return (
                <button
                  key={letter}
                  className={cn(
                    "w-full p-4 rounded-lg border text-left transition-colors",
                    !isAnswered && "hover:border-primary hover:bg-primary/5",
                    isAnswered && isCorrectAnswer && "border-primary bg-primary/10",
                    isAnswered && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                    !isAnswered && "cursor-pointer",
                    isAnswered && "cursor-default"
                  )}
                  onClick={() => !isAnswered && submitTestAnswer(letter)}
                  disabled={isAnswered}
                >
                  <span className="font-medium mr-3">{letter}.</span>
                  {currentTestQuestion.options[letter]}
                </button>
              );
            })}
          </div>

          {/* Result & Next */}
          {isAnswered && (
            <div className="text-center">
              <p className={cn(
                "text-lg font-medium mb-4",
                isCorrect ? "text-primary" : "text-destructive"
              )}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              
              {currentWordIndex < sessionProgress.total - 1 ? (
                <Button onClick={nextWord}>
                  Next Word
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleEndSession}>
                  See Results
                  <Sparkles className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          )}
        </main>
      </div>
    );
  }

  // Complete View
  if (viewState === 'complete') {
    return (
      <div className="min-h-screen bg-background">
        <Header showHistoryButton={false} />
        
        <main className="max-w-2xl mx-auto px-4 py-8 text-center">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="font-serif text-3xl font-bold mb-2">Session Complete!</h1>
          <p className="text-muted-foreground mb-8">Great work on your vocabulary practice.</p>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-bold text-primary">{Math.round(sessionAccuracy)}%</p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{sessionProgress.total}</p>
                  <p className="text-sm text-muted-foreground">Words Studied</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Back to Home
            </Button>
            <Button onClick={() => setViewState('menu')} className="flex-1">
              Practice More
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
};
