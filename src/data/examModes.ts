import { ExamModeConfig } from '@/types/exam';

export const examModes: ExamModeConfig[] = [
  {
    id: 'full-mock',
    name: 'Full Mock Exam',
    description: 'Complete practice test simulating the real HSPT experience with all sections.',
    questionCount: 50,
    timeLimit: 60,
    subjects: ['verbal', 'math', 'reading', 'language'],
    icon: '📝'
  },
  {
    id: 'verbal-practice',
    name: 'Verbal Skills Practice',
    description: 'Focus on analogies, vocabulary, classification, and logic reasoning.',
    questionCount: 20,
    timeLimit: 15,
    subjects: ['verbal'],
    icon: '💬'
  },
  {
    id: 'math-practice',
    name: 'Math Practice',
    description: 'Practice arithmetic, algebra, geometry, and word problems.',
    questionCount: 20,
    timeLimit: 20,
    subjects: ['math'],
    icon: '🔢'
  },
  {
    id: 'reading-practice',
    name: 'Reading Comprehension',
    description: 'Improve your reading comprehension and interpretation skills.',
    questionCount: 15,
    timeLimit: 15,
    subjects: ['reading'],
    icon: '📖'
  },
  {
    id: 'language-practice',
    name: 'Language Skills',
    description: 'Master grammar, punctuation, and sentence structure.',
    questionCount: 15,
    timeLimit: 12,
    subjects: ['language'],
    icon: '✏️'
  },
  {
    id: 'quick-drill',
    name: 'Quick Drill',
    description: 'Fast-paced 10-question sprint across all subjects. Great for daily practice.',
    questionCount: 10,
    timeLimit: 8,
    subjects: ['verbal', 'math', 'reading', 'language'],
    icon: '⚡'
  }
];
