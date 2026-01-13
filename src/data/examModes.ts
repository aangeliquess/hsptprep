import { ExamModeConfig } from '@/types/exam';

export const examModes: ExamModeConfig[] = [
  {
    id: 'full-mock',
    name: 'Full Mock Exam',
    description: 'Complete 300-question practice test simulating the real HSPT experience. Timer runs continuously with auto-save.',
    questionCount: 300,
    timeLimit: 180, // 3 hours
    subjects: ['verbal', 'math', 'reading', 'language'],
    icon: '📝',
    allowPause: false
  },
  {
    id: 'verbal-practice',
    name: 'Verbal Skills Practice',
    description: 'Focus on analogies, vocabulary, classification, and logic reasoning.',
    questionCount: 25,
    timeLimit: 20,
    subjects: ['verbal'],
    icon: '💬',
    allowPause: true
  },
  {
    id: 'math-practice',
    name: 'Math Practice',
    description: 'Practice arithmetic, algebra, geometry, and word problems.',
    questionCount: 25,
    timeLimit: 30,
    subjects: ['math'],
    icon: '🔢',
    allowPause: true
  },
  {
    id: 'reading-practice',
    name: 'Reading Comprehension',
    description: 'Improve your reading comprehension and interpretation skills.',
    questionCount: 20,
    timeLimit: 25,
    subjects: ['reading'],
    icon: '📖',
    allowPause: true
  },
  {
    id: 'language-practice',
    name: 'Language Skills',
    description: 'Master grammar, punctuation, and sentence structure.',
    questionCount: 20,
    timeLimit: 15,
    subjects: ['language'],
    icon: '✏️',
    allowPause: true
  },
  {
    id: 'targeted-practice',
    name: 'Targeted Practice',
    description: 'Choose your section, sub-skill, and question count (10/25/50).',
    questionCount: 25,
    timeLimit: 30,
    subjects: ['verbal', 'math', 'reading', 'language'],
    icon: '🎯',
    allowPause: true
  },
  {
    id: 'quick-drill',
    name: 'Quick Drill',
    description: 'Fast-paced sprint across all subjects. Great for daily practice.',
    questionCount: 15,
    timeLimit: 12,
    subjects: ['verbal', 'math', 'reading', 'language'],
    icon: '⚡',
    allowPause: true
  },
  {
    id: 'pacing-drill',
    name: 'Pacing Drill',
    description: 'Practice with per-question time targets. Get pace warnings when you exceed recommended time.',
    questionCount: 15,
    timeLimit: 15,
    subjects: ['verbal', 'math', 'reading', 'language'],
    icon: '⏱️',
    allowPause: true,
    isPacingMode: true
  }
];

export const QUICK_DRILL_OPTIONS = [5, 10, 15];
export const TARGETED_PRACTICE_OPTIONS = [10, 25, 50];
