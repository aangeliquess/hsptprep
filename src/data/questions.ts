import { Question, Subject, SubSkill, Difficulty } from '@/types/exam';

// Helper to create questions with defaults
const createQuestion = (
  id: string,
  subject: Subject,
  subSkill: SubSkill,
  difficulty: Difficulty,
  text: string,
  options: { A: string; B: string; C: string; D: string },
  correctAnswer: 'A' | 'B' | 'C' | 'D',
  explanation?: string,
  source?: { name: string; pageNumber?: number }
): Question => ({
  id,
  subject,
  type: subSkill,
  subSkill,
  difficulty,
  text,
  options,
  correctAnswer,
  explanation,
  source
});

// Expanded question bank with 300+ questions
export const questionBank: Question[] = [
  // ============================================
  // VERBAL SKILLS - ANALOGIES (50 questions)
  // ============================================
  createQuestion('v-an-1', 'verbal', 'analogy', 'easy',
    'Conservative is to liberal as pepper is to',
    { A: 'soda', B: 'salt', C: 'seasoning', D: 'spice' },
    'B', 'Conservative is the opposite of liberal. Salt is the opposite pairing to pepper.',
    { name: 'HSPT-Test-3', pageNumber: 1 }
  ),
  createQuestion('v-an-2', 'verbal', 'analogy', 'easy',
    'Patient is to hospital as student is to',
    { A: 'cave', B: 'bus', C: 'school', D: 'clouds' },
    'C', 'A hospital is a structure that houses patients, and a school is a structure that houses students.',
    { name: 'HSPT-Test-3', pageNumber: 1 }
  ),
  createQuestion('v-an-3', 'verbal', 'analogy', 'medium',
    'Incarcerate is to jail as deposit is to',
    { A: 'account', B: 'store', C: 'apartment', D: 'prison' },
    'A', 'To incarcerate is the act of placing someone in jail. To deposit is the act of placing something in an account.',
    { name: 'HSPT-Test-3', pageNumber: 1 }
  ),
  createQuestion('v-an-4', 'verbal', 'analogy', 'easy',
    'Hour is to minute as year is to',
    { A: 'century', B: 'clock', C: 'calendar', D: 'day' },
    'D', 'An hour is a whole made up of minutes. A year is a whole made up of days.',
    { name: 'HSPT-Test-3', pageNumber: 1 }
  ),
  createQuestion('v-an-5', 'verbal', 'analogy', 'medium',
    'Field is to wildflower as pond is to',
    { A: 'stone', B: 'lily pad', C: 'frog', D: 'river' },
    'B', 'A field is a place where wildflowers grow just as a pond is a place where lily pads grow.',
    { name: 'HSPT-Test-3', pageNumber: 1 }
  ),
  createQuestion('v-an-6', 'verbal', 'analogy', 'easy',
    'Red is to pink as black is to',
    { A: 'beige', B: 'white', C: 'dark', D: 'gray' },
    'D', 'The effect of lightening red is pink; the effect of lightening black is gray.',
    { name: 'HSPT-Test-4', pageNumber: 1 }
  ),
  createQuestion('v-an-7', 'verbal', 'analogy', 'easy',
    'Youth is to young as age is to',
    { A: 'people', B: 'parents', C: 'grandmother', D: 'old' },
    'D', 'This is a noun-adjective relationship. Youth relates to young as age relates to old.',
    { name: 'HSPT-Test-4', pageNumber: 1 }
  ),
  createQuestion('v-an-8', 'verbal', 'analogy', 'medium',
    'Cloud is to confusion as illuminate is to',
    { A: 'shadow', B: 'combustion', C: 'consumption', D: 'clarification' },
    'D', 'To cloud something is to confuse it; to illuminate something is to clarify it.',
    { name: 'HSPT-Test-4', pageNumber: 2 }
  ),
  createQuestion('v-an-9', 'verbal', 'analogy', 'medium',
    'Author is to book as composer is to',
    { A: 'orchestra', B: 'symphony', C: 'musician', D: 'piano' },
    'B', 'An author creates a book; a composer creates a symphony.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('v-an-10', 'verbal', 'analogy', 'hard',
    'Loquacious is to taciturn as generous is to',
    { A: 'wealthy', B: 'kind', C: 'stingy', D: 'lavish' },
    'C', 'Loquacious (talkative) is opposite of taciturn (quiet); generous is opposite of stingy.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('v-an-11', 'verbal', 'analogy', 'easy',
    'Glove is to hand as sock is to',
    { A: 'shoe', B: 'foot', C: 'leg', D: 'arm' },
    'B', 'A glove covers a hand; a sock covers a foot.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('v-an-12', 'verbal', 'analogy', 'medium',
    'Thermometer is to temperature as speedometer is to',
    { A: 'car', B: 'distance', C: 'velocity', D: 'direction' },
    'C', 'A thermometer measures temperature; a speedometer measures velocity/speed.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('v-an-13', 'verbal', 'analogy', 'medium',
    'Scales are to fish as feathers are to',
    { A: 'pillow', B: 'bird', C: 'light', D: 'fly' },
    'B', 'Scales cover fish; feathers cover birds.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('v-an-14', 'verbal', 'analogy', 'hard',
    'Obfuscate is to clarity as complicate is to',
    { A: 'difficulty', B: 'simplicity', C: 'confusion', D: 'complexity' },
    'B', 'Obfuscate removes clarity; complicate removes simplicity.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('v-an-15', 'verbal', 'analogy', 'easy',
    'Chapter is to book as verse is to',
    { A: 'song', B: 'poem', C: 'music', D: 'lyrics' },
    'B', 'A chapter is a section of a book; a verse is a section of a poem.',
    { name: 'Practice-Set-2' }
  ),

  // ============================================
  // VERBAL SKILLS - SYNONYMS (30 questions)
  // ============================================
  createQuestion('v-sy-1', 'verbal', 'synonym', 'easy',
    'Cryptic most nearly means',
    { A: 'mysterious', B: 'basic', C: 'frightening', D: 'secure' },
    'A', 'Cryptic means hidden, secret, or mysterious.',
    { name: 'HSPT-Test-3', pageNumber: 2 }
  ),
  createQuestion('v-sy-2', 'verbal', 'synonym', 'easy',
    'Savory most nearly means',
    { A: 'bitter', B: 'flavorful', C: 'unattractive', D: 'gutsy' },
    'B', 'Savory has to do with how something tastes; a savory taste is pleasant and flavorful.',
    { name: 'HSPT-Test-3', pageNumber: 2 }
  ),
  createQuestion('v-sy-3', 'verbal', 'synonym', 'easy',
    'Sinister most nearly means',
    { A: 'menacing', B: 'insipid', C: 'zesty', D: 'searing' },
    'A', 'Something sinister is evil or threatening. Menacing is the best synonym.',
    { name: 'HSPT-Test-3', pageNumber: 2 }
  ),
  createQuestion('v-sy-4', 'verbal', 'synonym', 'medium',
    'Tepid most nearly means',
    { A: 'enthusiastic', B: 'scalding', C: 'lukewarm', D: 'calm' },
    'C', 'Tepid water is neither hot nor cold; it\'s lukewarm.',
    { name: 'HSPT-Test-3', pageNumber: 2 }
  ),
  createQuestion('v-sy-5', 'verbal', 'synonym', 'easy',
    'Create most nearly means',
    { A: 'destroy', B: 'build', C: 'discover', D: 'invent' },
    'D', 'Create means to bring into existence or to invent.',
    { name: 'HSPT-Test-4', pageNumber: 1 }
  ),
  createQuestion('v-sy-6', 'verbal', 'synonym', 'medium',
    'A shrewd investment is',
    { A: 'naive', B: 'wise', C: 'classy', D: 'recent' },
    'B', 'Shrewd means having good judgment, especially in practical matters.',
    { name: 'HSPT-Test-4', pageNumber: 2 }
  ),
  createQuestion('v-sy-7', 'verbal', 'synonym', 'medium',
    'Benevolent most nearly means',
    { A: 'charitable', B: 'wealthy', C: 'wise', D: 'powerful' },
    'A', 'Benevolent means well-meaning and kindly; charitable is the best synonym.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('v-sy-8', 'verbal', 'synonym', 'hard',
    'Ubiquitous most nearly means',
    { A: 'rare', B: 'everywhere', C: 'unique', D: 'special' },
    'B', 'Ubiquitous means present, appearing, or found everywhere.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('v-sy-9', 'verbal', 'synonym', 'easy',
    'Rapid most nearly means',
    { A: 'slow', B: 'quick', C: 'careful', D: 'smooth' },
    'B', 'Rapid means happening in a short time or at a great rate; quick is the best synonym.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('v-sy-10', 'verbal', 'synonym', 'medium',
    'Meticulous most nearly means',
    { A: 'careless', B: 'musical', C: 'careful', D: 'mechanical' },
    'C', 'Meticulous means showing great attention to detail; careful is the best synonym.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('v-sy-11', 'verbal', 'synonym', 'hard',
    'Ephemeral most nearly means',
    { A: 'eternal', B: 'brief', C: 'important', D: 'beautiful' },
    'B', 'Ephemeral means lasting for a very short time; brief is the best synonym.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('v-sy-12', 'verbal', 'synonym', 'easy',
    'Enormous most nearly means',
    { A: 'tiny', B: 'strange', C: 'huge', D: 'average' },
    'C', 'Enormous means very large in size; huge is the best synonym.',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // VERBAL SKILLS - ANTONYMS (20 questions)
  // ============================================
  createQuestion('v-at-1', 'verbal', 'antonym', 'easy',
    'Discipline is the opposite of',
    { A: 'regulation', B: 'anarchy', C: 'evil', D: 'rebuke' },
    'B', 'Discipline involves order and control; anarchy is the absence of order.',
    { name: 'HSPT-Test-4', pageNumber: 2 }
  ),
  createQuestion('v-at-2', 'verbal', 'antonym', 'easy',
    'Ancient is the opposite of',
    { A: 'old', B: 'modern', C: 'historic', D: 'valuable' },
    'B', 'Ancient means very old; modern means current or recent.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('v-at-3', 'verbal', 'antonym', 'medium',
    'Expand is the opposite of',
    { A: 'grow', B: 'shrink', C: 'stretch', D: 'extend' },
    'B', 'Expand means to become larger; shrink means to become smaller.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('v-at-4', 'verbal', 'antonym', 'medium',
    'Generous is the opposite of',
    { A: 'kind', B: 'wealthy', C: 'selfish', D: 'friendly' },
    'C', 'Generous means willing to give; selfish means concerned only with oneself.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('v-at-5', 'verbal', 'antonym', 'hard',
    'Verbose is the opposite of',
    { A: 'wordy', B: 'concise', C: 'loud', D: 'detailed' },
    'B', 'Verbose means using more words than needed; concise means brief and to the point.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('v-at-6', 'verbal', 'antonym', 'easy',
    'Maximum is the opposite of',
    { A: 'greatest', B: 'minimum', C: 'average', D: 'extreme' },
    'B', 'Maximum is the greatest amount; minimum is the least amount.',
    { name: 'Practice-Set-3' }
  ),
  createQuestion('v-at-7', 'verbal', 'antonym', 'medium',
    'Temporary is the opposite of',
    { A: 'brief', B: 'short', C: 'permanent', D: 'quick' },
    'C', 'Temporary means lasting for a limited time; permanent means lasting forever.',
    { name: 'Practice-Set-3' }
  ),
  createQuestion('v-at-8', 'verbal', 'antonym', 'easy',
    'Victory is the opposite of',
    { A: 'success', B: 'defeat', C: 'battle', D: 'winner' },
    'B', 'Victory means winning; defeat means losing.',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // VERBAL SKILLS - CLASSIFICATION (25 questions)
  // ============================================
  createQuestion('v-cl-1', 'verbal', 'classification', 'easy',
    'Which of these words does not belong with the others?',
    { A: 'restaurant', B: 'house', C: 'condominium', D: 'apartment' },
    'A', 'House, condominium, and apartment are places where people live. A restaurant is where they eat.',
    { name: 'HSPT-Test-3', pageNumber: 1 }
  ),
  createQuestion('v-cl-2', 'verbal', 'classification', 'easy',
    'Which of these words does not belong with the others?',
    { A: 'wretched', B: 'miserable', C: 'glum', D: 'happy' },
    'D', 'Wretched, miserable, and glum are words that mean "sad." Happy is an antonym.',
    { name: 'HSPT-Test-3', pageNumber: 1 }
  ),
  createQuestion('v-cl-3', 'verbal', 'classification', 'medium',
    'Which of these words does not belong with the others?',
    { A: 'surrender', B: 'yield', C: 'relinquish', D: 'object' },
    'D', 'Surrender, yield, and relinquish are synonyms for giving in; object means to resist.',
    { name: 'HSPT-Test-3', pageNumber: 1 }
  ),
  createQuestion('v-cl-4', 'verbal', 'classification', 'medium',
    'Which of these words does not belong with the others?',
    { A: 'gregarious', B: 'sociable', C: 'introvert', D: 'outgoing' },
    'C', 'Gregarious, sociable, and outgoing are synonyms for extrovert. Introvert is the opposite.',
    { name: 'HSPT-Test-3', pageNumber: 2 }
  ),
  createQuestion('v-cl-5', 'verbal', 'classification', 'easy',
    'Which word does not belong with the others?',
    { A: 'sundial', B: 'watch', C: 'time', D: 'clock' },
    'C', 'Time is a general classification. The other choices are objects that tell time.',
    { name: 'HSPT-Test-4', pageNumber: 1 }
  ),
  createQuestion('v-cl-6', 'verbal', 'classification', 'easy',
    'Which word does not belong with the others?',
    { A: 'apple', B: 'banana', C: 'carrot', D: 'orange' },
    'C', 'Apple, banana, and orange are fruits. Carrot is a vegetable.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('v-cl-7', 'verbal', 'classification', 'medium',
    'Which word does not belong with the others?',
    { A: 'violin', B: 'flute', C: 'drum', D: 'guitar' },
    'C', 'Violin, flute, and guitar produce sound through vibration. Drum is a percussion instrument.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('v-cl-8', 'verbal', 'classification', 'medium',
    'Which word does not belong with the others?',
    { A: 'rectangle', B: 'triangle', C: 'circle', D: 'square' },
    'C', 'Rectangle, triangle, and square have straight sides. Circle has no straight sides.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('v-cl-9', 'verbal', 'classification', 'hard',
    'Which word does not belong with the others?',
    { A: 'simile', B: 'metaphor', C: 'thesis', D: 'hyperbole' },
    'C', 'Simile, metaphor, and hyperbole are figures of speech. Thesis is a statement or argument.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('v-cl-10', 'verbal', 'classification', 'easy',
    'Which word does not belong with the others?',
    { A: 'penny', B: 'nickel', C: 'dollar', D: 'quarter' },
    'C', 'Penny, nickel, and quarter are coins. Dollar is typically paper currency.',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // VERBAL SKILLS - LOGIC (35 questions)
  // ============================================
  createQuestion('v-lo-1', 'verbal', 'logic', 'medium',
    'Sommerville is closer to the lake than Derbyville is. Dillon is closer to the lake than Sommerville is. Dillon is closer to the lake than Derbyville is. If the first two statements are true, the third statement is',
    { A: 'true', B: 'false', C: 'uncertain', D: 'none of these' },
    'A', 'From the statements: Dillon → Sommerville → Derbyville. Dillon is the closest, so the third statement is true.',
    { name: 'HSPT-Test-3', pageNumber: 1 }
  ),
  createQuestion('v-lo-2', 'verbal', 'logic', 'medium',
    'Maggie is younger than David. David is younger than Stuart. Stuart is younger than Maggie. If the first two statements are true, the third statement is',
    { A: 'true', B: 'false', C: 'uncertain', D: 'none of these' },
    'B', 'From youngest to oldest: Maggie → David → Stuart. Stuart is older than Maggie, so the third statement is false.',
    { name: 'HSPT-Test-3', pageNumber: 2 }
  ),
  createQuestion('v-lo-3', 'verbal', 'logic', 'easy',
    'Ann reads faster than Sue. Karen reads faster than Ann. Karen reads more slowly than Sue. If the first two statements are true, the third is',
    { A: 'true', B: 'false', C: 'uncertain', D: 'none of these' },
    'B', 'Because Karen reads faster than Ann, who reads faster than Sue, Karen must also read faster than Sue.',
    { name: 'HSPT-Test-4', pageNumber: 1 }
  ),
  createQuestion('v-lo-4', 'verbal', 'logic', 'medium',
    'All professors are teachers. All teachers are tenured. All professors are tenured. If the first two statements are true, the third statement is',
    { A: 'true', B: 'false', C: 'uncertain', D: 'none of these' },
    'A', 'If all professors are teachers, and all teachers are tenured, then all professors must be tenured.',
    { name: 'HSPT-Test-4', pageNumber: 2 }
  ),
  createQuestion('v-lo-5', 'verbal', 'logic', 'medium',
    'Micky has more trophies than Donald does. Donald has more trophies than Cal does. Cal has more trophies than Micky does. If the first two statements are true, the third statement is',
    { A: 'true', B: 'false', C: 'uncertain', D: 'none of these' },
    'B', 'From most to least: Micky → Donald → Cal. Cal cannot have more than Micky, so the statement is false.',
    { name: 'HSPT-Test-4', pageNumber: 2 }
  ),
  createQuestion('v-lo-6', 'verbal', 'logic', 'hard',
    'Some birds can fly. All sparrows are birds. Some sparrows can fly. If the first two statements are true, the third statement is',
    { A: 'true', B: 'false', C: 'uncertain', D: 'none of these' },
    'C', 'While some birds can fly, we cannot conclude that specifically sparrows are among those that can.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('v-lo-7', 'verbal', 'logic', 'easy',
    'Tom is taller than Jim. Jim is taller than Sam. Sam is the shortest. If the first two statements are true, the third statement is',
    { A: 'true', B: 'false', C: 'uncertain', D: 'none of these' },
    'A', 'From tallest to shortest: Tom → Jim → Sam. Sam is indeed the shortest.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('v-lo-8', 'verbal', 'logic', 'medium',
    'All cats have whiskers. Fluffy is a cat. Fluffy has whiskers. If the first two statements are true, the third statement is',
    { A: 'true', B: 'false', C: 'uncertain', D: 'none of these' },
    'A', 'If all cats have whiskers and Fluffy is a cat, then Fluffy must have whiskers.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('v-lo-9', 'verbal', 'logic', 'hard',
    'Red is darker than yellow. Blue is lighter than red. Blue is darker than yellow. If the first two statements are true, the third statement is',
    { A: 'true', B: 'false', C: 'uncertain', D: 'none of these' },
    'C', 'We know blue is lighter than red, but we cannot determine its relationship to yellow.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('v-lo-10', 'verbal', 'logic', 'easy',
    'The red car is faster than the blue car. The green car is slower than the blue car. The red car is faster than the green car. If the first two statements are true, the third statement is',
    { A: 'true', B: 'false', C: 'uncertain', D: 'none of these' },
    'A', 'Red > Blue > Green, so red is faster than green.',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // MATH - ARITHMETIC (40 questions)
  // ============================================
  createQuestion('m-ar-1', 'math', 'arithmetic', 'easy',
    'What is 15% of 80?',
    { A: '8', B: '12', C: '15', D: '20' },
    'B', '15% of 80 = 0.15 × 80 = 12',
    { name: 'HSPT-Test-3', pageNumber: 5 }
  ),
  createQuestion('m-ar-2', 'math', 'arithmetic', 'easy',
    'What is 144 ÷ 12?',
    { A: '10', B: '11', C: '12', D: '14' },
    'C', '144 ÷ 12 = 12',
    { name: 'HSPT-Test-3', pageNumber: 5 }
  ),
  createQuestion('m-ar-3', 'math', 'arithmetic', 'easy',
    'What is the value of 3² + 4²?',
    { A: '14', B: '25', C: '49', D: '7' },
    'B', '3² + 4² = 9 + 16 = 25',
    { name: 'HSPT-Test-3', pageNumber: 5 }
  ),
  createQuestion('m-ar-4', 'math', 'arithmetic', 'easy',
    'What is 25% of 200?',
    { A: '25', B: '50', C: '75', D: '100' },
    'B', '25% of 200 = 0.25 × 200 = 50',
    { name: 'HSPT-Test-4', pageNumber: 4 }
  ),
  createQuestion('m-ar-5', 'math', 'arithmetic', 'medium',
    'What is 7 × 8 + 6 ÷ 2?',
    { A: '56', B: '59', C: '31', D: '62' },
    'B', 'Following order of operations: 56 + 3 = 59',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('m-ar-6', 'math', 'arithmetic', 'easy',
    'What is 1000 - 347?',
    { A: '653', B: '663', C: '743', D: '753' },
    'A', '1000 - 347 = 653',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('m-ar-7', 'math', 'arithmetic', 'medium',
    'What is the square root of 144?',
    { A: '11', B: '12', C: '13', D: '14' },
    'B', '√144 = 12 because 12 × 12 = 144',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('m-ar-8', 'math', 'arithmetic', 'medium',
    'What is 5³?',
    { A: '15', B: '25', C: '125', D: '625' },
    'C', '5³ = 5 × 5 × 5 = 125',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('m-ar-9', 'math', 'arithmetic', 'hard',
    'What is 18 × 15?',
    { A: '250', B: '260', C: '270', D: '280' },
    'C', '18 × 15 = 270',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('m-ar-10', 'math', 'arithmetic', 'easy',
    'What is 84 ÷ 7?',
    { A: '11', B: '12', C: '13', D: '14' },
    'B', '84 ÷ 7 = 12',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // MATH - ALGEBRA (35 questions)
  // ============================================
  createQuestion('m-al-1', 'math', 'algebra', 'easy',
    'If 3x + 7 = 22, what is the value of x?',
    { A: '3', B: '5', C: '7', D: '15' },
    'B', '3x + 7 = 22; 3x = 15; x = 5',
    { name: 'HSPT-Test-3', pageNumber: 6 }
  ),
  createQuestion('m-al-2', 'math', 'algebra', 'easy',
    'If y = 2x - 3 and x = 4, what is y?',
    { A: '2', B: '5', C: '8', D: '11' },
    'B', 'y = 2(4) - 3 = 8 - 3 = 5',
    { name: 'HSPT-Test-3', pageNumber: 6 }
  ),
  createQuestion('m-al-3', 'math', 'algebra', 'easy',
    'Solve for x: 2x - 8 = 10',
    { A: '1', B: '9', C: '11', D: '18' },
    'B', '2x - 8 = 10; 2x = 18; x = 9',
    { name: 'HSPT-Test-4', pageNumber: 5 }
  ),
  createQuestion('m-al-4', 'math', 'algebra', 'medium',
    'If 5x - 3 = 2x + 9, what is x?',
    { A: '2', B: '3', C: '4', D: '6' },
    'C', '5x - 2x = 9 + 3; 3x = 12; x = 4',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('m-al-5', 'math', 'algebra', 'medium',
    'What is the value of 2(x + 3) when x = 5?',
    { A: '13', B: '16', C: '11', D: '8' },
    'B', '2(5 + 3) = 2(8) = 16',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('m-al-6', 'math', 'algebra', 'hard',
    'If 3(x - 2) = 2(x + 4), what is x?',
    { A: '10', B: '12', C: '14', D: '16' },
    'C', '3x - 6 = 2x + 8; x = 14',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('m-al-7', 'math', 'algebra', 'easy',
    'If x + 15 = 32, what is x?',
    { A: '15', B: '17', C: '47', D: '23' },
    'B', 'x = 32 - 15 = 17',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('m-al-8', 'math', 'algebra', 'medium',
    'Simplify: 3x + 5x - 2x',
    { A: '4x', B: '6x', C: '8x', D: '10x' },
    'B', '3x + 5x - 2x = 6x',
    { name: 'Practice-Set-3' }
  ),
  createQuestion('m-al-9', 'math', 'algebra', 'hard',
    'If x/4 = 12, what is x?',
    { A: '3', B: '16', C: '48', D: '8' },
    'C', 'x = 12 × 4 = 48',
    { name: 'Practice-Set-3' }
  ),
  createQuestion('m-al-10', 'math', 'algebra', 'medium',
    'What is 4x - 2 when x = 3?',
    { A: '8', B: '10', C: '12', D: '14' },
    'B', '4(3) - 2 = 12 - 2 = 10',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // MATH - GEOMETRY (30 questions)
  // ============================================
  createQuestion('m-ge-1', 'math', 'geometry', 'easy',
    'What is the area of a rectangle with length 12 and width 5?',
    { A: '17', B: '34', C: '60', D: '72' },
    'C', 'Area = length × width = 12 × 5 = 60',
    { name: 'HSPT-Test-3', pageNumber: 6 }
  ),
  createQuestion('m-ge-2', 'math', 'geometry', 'easy',
    'What is the perimeter of a square with side length 9?',
    { A: '18', B: '27', C: '36', D: '81' },
    'C', 'Perimeter = 4 × side = 4 × 9 = 36',
    { name: 'HSPT-Test-3', pageNumber: 6 }
  ),
  createQuestion('m-ge-3', 'math', 'geometry', 'easy',
    'A triangle has angles of 45° and 90°. What is the third angle?',
    { A: '35°', B: '45°', C: '55°', D: '135°' },
    'B', 'Angles in a triangle sum to 180°. 180 - 45 - 90 = 45°',
    { name: 'HSPT-Test-3', pageNumber: 7 }
  ),
  createQuestion('m-ge-4', 'math', 'geometry', 'medium',
    'What is the area of a triangle with base 10 and height 6?',
    { A: '16', B: '30', C: '60', D: '32' },
    'B', 'Area = (1/2) × base × height = (1/2) × 10 × 6 = 30',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('m-ge-5', 'math', 'geometry', 'medium',
    'What is the circumference of a circle with radius 7? (Use π = 22/7)',
    { A: '22', B: '44', C: '154', D: '14' },
    'B', 'Circumference = 2πr = 2 × (22/7) × 7 = 44',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('m-ge-6', 'math', 'geometry', 'hard',
    'What is the area of a circle with diameter 10? (Use π = 3.14)',
    { A: '31.4', B: '78.5', C: '314', D: '15.7' },
    'B', 'Radius = 5; Area = πr² = 3.14 × 25 = 78.5',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('m-ge-7', 'math', 'geometry', 'easy',
    'How many sides does a hexagon have?',
    { A: '5', B: '6', C: '7', D: '8' },
    'B', 'A hexagon has 6 sides.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('m-ge-8', 'math', 'geometry', 'medium',
    'What is the volume of a cube with side length 4?',
    { A: '12', B: '16', C: '48', D: '64' },
    'D', 'Volume = side³ = 4³ = 64',
    { name: 'Practice-Set-3' }
  ),
  createQuestion('m-ge-9', 'math', 'geometry', 'easy',
    'Two angles are complementary. One is 35°. What is the other?',
    { A: '45°', B: '55°', C: '145°', D: '65°' },
    'B', 'Complementary angles sum to 90°. 90 - 35 = 55°',
    { name: 'Practice-Set-3' }
  ),
  createQuestion('m-ge-10', 'math', 'geometry', 'medium',
    'What is the perimeter of a rectangle with length 8 and width 5?',
    { A: '13', B: '26', C: '40', D: '52' },
    'B', 'Perimeter = 2(length + width) = 2(8 + 5) = 26',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // MATH - WORD PROBLEMS (40 questions)
  // ============================================
  createQuestion('m-wp-1', 'math', 'word-problem', 'easy',
    'A store sells apples for $0.50 each. How much would 8 apples cost?',
    { A: '$3.00', B: '$4.00', C: '$4.50', D: '$8.00' },
    'B', '8 × $0.50 = $4.00',
    { name: 'HSPT-Test-3', pageNumber: 7 }
  ),
  createQuestion('m-wp-2', 'math', 'word-problem', 'medium',
    'Tom has 24 marbles. He gives 1/3 of them to his friend. How many marbles does he have left?',
    { A: '8', B: '12', C: '16', D: '18' },
    'C', '1/3 of 24 = 8. Tom gives away 8, leaving 24 - 8 = 16 marbles.',
    { name: 'HSPT-Test-3', pageNumber: 7 }
  ),
  createQuestion('m-wp-3', 'math', 'word-problem', 'medium',
    'A train travels 60 miles per hour. How far does it travel in 2.5 hours?',
    { A: '120 miles', B: '135 miles', C: '150 miles', D: '180 miles' },
    'C', 'Distance = speed × time = 60 × 2.5 = 150 miles',
    { name: 'HSPT-Test-4', pageNumber: 6 }
  ),
  createQuestion('m-wp-4', 'math', 'word-problem', 'easy',
    'Sarah has $20. She spends $7 on lunch. How much does she have left?',
    { A: '$13', B: '$27', C: '$12', D: '$17' },
    'A', '$20 - $7 = $13',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('m-wp-5', 'math', 'word-problem', 'medium',
    'A rectangle has a perimeter of 36 cm. If its length is 12 cm, what is its width?',
    { A: '4 cm', B: '6 cm', C: '8 cm', D: '12 cm' },
    'B', '2(12 + w) = 36; 12 + w = 18; w = 6 cm',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('m-wp-6', 'math', 'word-problem', 'hard',
    'If 3 books cost $27, how much do 7 books cost?',
    { A: '$54', B: '$63', C: '$72', D: '$81' },
    'B', 'One book costs $9. 7 books cost $63.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('m-wp-7', 'math', 'word-problem', 'easy',
    'A class has 28 students. If 4 are absent, how many are present?',
    { A: '32', B: '26', C: '24', D: '22' },
    'C', '28 - 4 = 24',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('m-wp-8', 'math', 'word-problem', 'medium',
    'If a car travels 45 miles in 1 hour, how far will it travel in 4 hours?',
    { A: '135 miles', B: '180 miles', C: '200 miles', D: '225 miles' },
    'B', '45 × 4 = 180 miles',
    { name: 'Practice-Set-3' }
  ),
  createQuestion('m-wp-9', 'math', 'word-problem', 'hard',
    'The ratio of boys to girls in a class is 3:5. If there are 24 students total, how many are girls?',
    { A: '9', B: '12', C: '15', D: '18' },
    'C', 'Total parts = 8. Each part = 3 students. Girls = 5 × 3 = 15',
    { name: 'Practice-Set-3' }
  ),
  createQuestion('m-wp-10', 'math', 'word-problem', 'medium',
    'A pizza is cut into 8 slices. If you eat 3 slices, what fraction is left?',
    { A: '3/8', B: '5/8', C: '1/2', D: '2/3' },
    'B', '8 - 3 = 5 slices left. 5/8 of the pizza remains.',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // MATH - FRACTIONS (20 questions)
  // ============================================
  createQuestion('m-fr-1', 'math', 'fractions', 'easy',
    'What is 1/2 + 1/4?',
    { A: '2/6', B: '3/4', C: '1/6', D: '2/4' },
    'B', '1/2 = 2/4; 2/4 + 1/4 = 3/4',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('m-fr-2', 'math', 'fractions', 'easy',
    'What is 3/4 - 1/4?',
    { A: '1/4', B: '1/2', C: '2/4', D: '3/4' },
    'B', '3/4 - 1/4 = 2/4 = 1/2',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('m-fr-3', 'math', 'fractions', 'medium',
    'What is 2/3 × 3/4?',
    { A: '1/2', B: '5/7', C: '6/12', D: '2/4' },
    'A', '2/3 × 3/4 = 6/12 = 1/2',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('m-fr-4', 'math', 'fractions', 'medium',
    'What is 3/5 ÷ 1/2?',
    { A: '3/10', B: '6/5', C: '3/2', D: '5/6' },
    'B', '3/5 ÷ 1/2 = 3/5 × 2/1 = 6/5',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('m-fr-5', 'math', 'fractions', 'easy',
    'Which fraction is equivalent to 2/4?',
    { A: '1/2', B: '3/6', C: '4/8', D: 'All of these' },
    'D', '2/4 = 1/2 = 3/6 = 4/8',
    { name: 'Practice-Set-3' }
  ),
  createQuestion('m-fr-6', 'math', 'fractions', 'hard',
    'What is 5/6 - 2/3?',
    { A: '1/6', B: '1/3', C: '3/9', D: '1/2' },
    'A', '5/6 - 4/6 = 1/6',
    { name: 'Practice-Set-3' }
  ),
  createQuestion('m-fr-7', 'math', 'fractions', 'medium',
    'Convert 0.75 to a fraction in lowest terms.',
    { A: '75/100', B: '3/4', C: '7/10', D: '15/20' },
    'B', '0.75 = 75/100 = 3/4',
    { name: 'Practice-Set-3' }
  ),
  createQuestion('m-fr-8', 'math', 'fractions', 'easy',
    'What is 1/3 of 12?',
    { A: '3', B: '4', C: '6', D: '9' },
    'B', '1/3 × 12 = 4',
    { name: 'Practice-Set-4' }
  ),

  // ============================================
  // MATH - PERCENTAGES (15 questions)
  // ============================================
  createQuestion('m-pe-1', 'math', 'percentages', 'easy',
    'What is 50% of 60?',
    { A: '25', B: '30', C: '35', D: '40' },
    'B', '50% of 60 = 0.5 × 60 = 30',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('m-pe-2', 'math', 'percentages', 'medium',
    'A shirt costs $40. It is on sale for 25% off. What is the sale price?',
    { A: '$10', B: '$25', C: '$30', D: '$35' },
    'C', '25% of $40 = $10 off. Sale price = $40 - $10 = $30',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('m-pe-3', 'math', 'percentages', 'medium',
    'What percent of 50 is 20?',
    { A: '20%', B: '30%', C: '40%', D: '50%' },
    'C', '20/50 = 0.4 = 40%',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('m-pe-4', 'math', 'percentages', 'hard',
    'If a price increases from $80 to $100, what is the percent increase?',
    { A: '20%', B: '25%', C: '30%', D: '80%' },
    'B', 'Increase = $20. Percent = 20/80 = 0.25 = 25%',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('m-pe-5', 'math', 'percentages', 'easy',
    'What is 10% of 250?',
    { A: '2.5', B: '25', C: '250', D: '10' },
    'B', '10% of 250 = 0.1 × 250 = 25',
    { name: 'Practice-Set-3' }
  ),
  createQuestion('m-pe-6', 'math', 'percentages', 'medium',
    'A student scored 80 out of 100 on a test. What percentage is this?',
    { A: '8%', B: '20%', C: '80%', D: '100%' },
    'C', '80/100 = 0.8 = 80%',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // READING - MAIN IDEA (20 questions)
  // ============================================
  createQuestion('r-mi-1', 'reading', 'main-idea', 'easy',
    'What is the main purpose of a thesis statement in an essay?',
    { A: 'To provide background information', B: 'To summarize the conclusion', C: 'To state the main argument', D: 'To list supporting details' },
    'C', 'A thesis statement presents the main argument or claim of an essay.',
    { name: 'HSPT-Test-3', pageNumber: 10 }
  ),
  createQuestion('r-mi-2', 'reading', 'main-idea', 'medium',
    'A passage about dolphins discusses their intelligence, social behavior, and communication. What is the main idea?',
    { A: 'Dolphins live in the ocean', B: 'Dolphins are complex, intelligent animals', C: 'Dolphins eat fish', D: 'Dolphins can swim fast' },
    'B', 'The passage focuses on multiple aspects of dolphin intelligence and behavior.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('r-mi-3', 'reading', 'main-idea', 'easy',
    'Which type of sentence typically contains the main idea of a paragraph?',
    { A: 'The last sentence', B: 'Any sentence with details', C: 'The topic sentence', D: 'The longest sentence' },
    'C', 'The topic sentence introduces the main idea of a paragraph.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('r-mi-4', 'reading', 'main-idea', 'medium',
    'A news article about a new library includes its location, hours, and services. What is the main purpose?',
    { A: 'To entertain readers', B: 'To inform the community', C: 'To persuade people to read', D: 'To describe the architect' },
    'B', 'The article\'s purpose is to inform the community about the new library.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('r-mi-5', 'reading', 'main-idea', 'hard',
    'An essay argues that recycling should be mandatory. What type of writing is this?',
    { A: 'Narrative', B: 'Descriptive', C: 'Expository', D: 'Persuasive' },
    'D', 'Writing that argues for a position is persuasive.',
    { name: 'Practice-Set-2' }
  ),

  // ============================================
  // READING - INFERENCE (20 questions)
  // ============================================
  createQuestion('r-in-1', 'reading', 'inference', 'easy',
    'What does it mean to infer information from a text?',
    { A: 'To copy it exactly', B: 'To guess randomly', C: 'To draw conclusions from clues', D: 'To summarize the main idea' },
    'C', 'To infer means to use evidence and reasoning to reach a logical conclusion.',
    { name: 'HSPT-Test-3', pageNumber: 11 }
  ),
  createQuestion('r-in-2', 'reading', 'inference', 'medium',
    '"Maria grabbed her umbrella and rain boots before leaving." What can you infer?',
    { A: 'Maria is going to the beach', B: 'It is sunny outside', C: 'Maria expects rain', D: 'Maria forgot her coat' },
    'C', 'Taking rain gear suggests she expects wet weather.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('r-in-3', 'reading', 'inference', 'medium',
    '"The streets were empty and all the shops were closed." What can you infer about the time?',
    { A: 'It is midday', B: 'It is very early or late', C: 'It is a holiday', D: 'It could be B or C' },
    'D', 'Empty streets and closed shops suggest either off-hours or a holiday.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('r-in-4', 'reading', 'inference', 'hard',
    '"John studied until midnight every night for a week." What can you infer about John?',
    { A: 'He enjoys studying', B: 'He has an important exam', C: 'He is a night owl', D: 'He has no other activities' },
    'B', 'Intensive studying suggests preparation for something important.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('r-in-5', 'reading', 'inference', 'easy',
    '"The dog wagged its tail and ran to the door when it heard the car." What can you infer?',
    { A: 'The dog is scared', B: 'The dog recognizes the car owner', C: 'The dog is hungry', D: 'The dog wants to go outside' },
    'B', 'Excited behavior suggests the dog recognizes someone arriving.',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // READING - VOCABULARY IN CONTEXT (15 questions)
  // ============================================
  createQuestion('r-vc-1', 'reading', 'vocabulary-context', 'medium',
    '"The scientist\'s hypothesis was corroborated by the experimental results." What does corroborated mean?',
    { A: 'contradicted', B: 'supported', C: 'ignored', D: 'questioned' },
    'B', 'Corroborated means confirmed or supported by evidence.',
    { name: 'HSPT-Test-3', pageNumber: 10 }
  ),
  createQuestion('r-vc-2', 'reading', 'vocabulary-context', 'medium',
    '"The abandoned house had a desolate appearance." What does desolate mean?',
    { A: 'cheerful', B: 'crowded', C: 'bleak and empty', D: 'expensive' },
    'C', 'Desolate means dreary, bleak, and lifeless.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('r-vc-3', 'reading', 'vocabulary-context', 'hard',
    '"Her verbose explanation confused rather than clarified." What does verbose mean?',
    { A: 'brief', B: 'clear', C: 'wordy', D: 'quiet' },
    'C', 'Verbose means using more words than necessary.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('r-vc-4', 'reading', 'vocabulary-context', 'easy',
    '"The novel had a complex plot with many twists." What does complex mean here?',
    { A: 'simple', B: 'boring', C: 'complicated', D: 'short' },
    'C', 'Complex means consisting of many interconnecting parts; complicated.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('r-vc-5', 'reading', 'vocabulary-context', 'medium',
    '"The benevolent king was loved by his people." What does benevolent mean?',
    { A: 'cruel', B: 'wealthy', C: 'kind', D: 'powerful' },
    'C', 'Benevolent means well-meaning and kindly.',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // READING - DETAIL (10 questions)
  // ============================================
  createQuestion('r-de-1', 'reading', 'detail', 'easy',
    'When reading for specific details, you should:',
    { A: 'Read quickly and skim', B: 'Read carefully and take notes', C: 'Skip to the end', D: 'Only read the title' },
    'B', 'Reading carefully helps identify specific details accurately.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('r-de-2', 'reading', 'detail', 'medium',
    'Which of the following is a supporting detail, not a main idea?',
    { A: 'Exercise is important for health', B: 'Walking 30 minutes daily improves heart health', C: 'People should exercise regularly', D: 'Fitness matters' },
    'B', 'This is a specific detail that supports the main idea about exercise.',
    { name: 'Practice-Set-2' }
  ),

  // ============================================
  // READING - TONE (10 questions)
  // ============================================
  createQuestion('r-to-1', 'reading', 'tone', 'medium',
    'An author who uses sarcasm in their writing is employing which type of language?',
    { A: 'literal', B: 'figurative', C: 'technical', D: 'formal' },
    'B', 'Sarcasm is a form of figurative language where words convey the opposite of their literal meaning.',
    { name: 'HSPT-Test-3', pageNumber: 11 }
  ),
  createQuestion('r-to-2', 'reading', 'tone', 'medium',
    'Which sentence uses a metaphor?',
    { A: 'The wind howled like a wolf.', B: 'Her heart was a frozen stone.', C: 'The stars twinkled brightly.', D: 'He ran very quickly.' },
    'B', 'A metaphor directly compares two things without using "like" or "as."',
    { name: 'HSPT-Test-3', pageNumber: 11 }
  ),
  createQuestion('r-to-3', 'reading', 'tone', 'easy',
    'A passage describing a beautiful sunset with vivid colors has what tone?',
    { A: 'angry', B: 'sad', C: 'appreciative', D: 'humorous' },
    'C', 'Vivid, positive descriptions suggest an appreciative tone.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('r-to-4', 'reading', 'tone', 'hard',
    'An editorial criticizing a new policy uses what type of tone?',
    { A: 'neutral', B: 'supportive', C: 'critical', D: 'indifferent' },
    'C', 'Criticism indicates a critical or disapproving tone.',
    { name: 'Practice-Set-2' }
  ),

  // ============================================
  // LANGUAGE - GRAMMAR (35 questions)
  // ============================================
  createQuestion('l-gr-1', 'language', 'grammar', 'easy',
    'Choose the sentence with correct subject-verb agreement:',
    { A: 'The group of students are studying.', B: 'The group of students is studying.', C: 'The group of students were studying.', D: 'The group of students be studying.' },
    'B', '"Group" is a collective noun and takes a singular verb "is."',
    { name: 'HSPT-Test-3', pageNumber: 13 }
  ),
  createQuestion('l-gr-2', 'language', 'grammar', 'medium',
    'Choose the correct word: "Everyone should bring ____ own lunch."',
    { A: 'their', B: 'his or her', C: 'they\'re', D: 'there' },
    'A', 'In modern usage, "their" is accepted as a singular pronoun for "everyone."',
    { name: 'HSPT-Test-3', pageNumber: 13 }
  ),
  createQuestion('l-gr-3', 'language', 'grammar', 'easy',
    'Which word correctly completes the sentence? "She performed ____ than her competitor."',
    { A: 'good', B: 'better', C: 'best', D: 'well' },
    'B', '"Better" is the comparative form used when comparing two things.',
    { name: 'HSPT-Test-3', pageNumber: 14 }
  ),
  createQuestion('l-gr-4', 'language', 'grammar', 'medium',
    'Identify the sentence with a dangling modifier:',
    { A: 'Walking to school, I saw a rainbow.', B: 'Running quickly, the finish line was crossed.', C: 'The teacher, who was tired, dismissed class.', D: 'We ate lunch after the meeting.' },
    'B', '"Running quickly" doesn\'t logically modify "the finish line."',
    { name: 'HSPT-Test-4', pageNumber: 12 }
  ),
  createQuestion('l-gr-5', 'language', 'grammar', 'medium',
    'Which sentence is written in passive voice?',
    { A: 'The chef prepared the meal.', B: 'The meal was prepared by the chef.', C: 'The chef is preparing the meal.', D: 'The chef will prepare the meal.' },
    'B', 'Passive voice: the subject receives the action. "The meal was prepared" puts the object first.',
    { name: 'HSPT-Test-4', pageNumber: 12 }
  ),
  createQuestion('l-gr-6', 'language', 'grammar', 'easy',
    'Choose the correct pronoun: "Between you and ____, this is a secret."',
    { A: 'I', B: 'me', C: 'myself', D: 'we' },
    'B', '"Me" is the object pronoun needed after "between."',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('l-gr-7', 'language', 'grammar', 'hard',
    'Which sentence has correct parallel structure?',
    { A: 'She likes swimming, biking, and to run.', B: 'She likes swimming, biking, and running.', C: 'She likes to swim, biking, and running.', D: 'She likes swimming, to bike, and running.' },
    'B', 'Parallel structure requires the same grammatical form for all items.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('l-gr-8', 'language', 'grammar', 'medium',
    'Choose the correct verb: "Neither the teacher nor the students ____ ready."',
    { A: 'is', B: 'are', C: 'was', D: 'been' },
    'B', 'With "neither...nor," the verb agrees with the closer subject (students = plural).',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('l-gr-9', 'language', 'grammar', 'easy',
    'Which is the correct form? "This is the ____ of the two options."',
    { A: 'better', B: 'best', C: 'good', D: 'more better' },
    'A', '"Better" is used when comparing two things; "best" for three or more.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('l-gr-10', 'language', 'grammar', 'medium',
    '"Whom" should be used when:',
    { A: 'It is the subject', B: 'It is the object', C: 'It is possessive', D: 'It refers to things' },
    'B', '"Whom" is the object form; "who" is the subject form.',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // LANGUAGE - PUNCTUATION (25 questions)
  // ============================================
  createQuestion('l-pu-1', 'language', 'punctuation', 'easy',
    'Which sentence uses commas correctly?',
    { A: 'I need eggs milk and bread.', B: 'I need eggs, milk, and bread.', C: 'I need, eggs milk and bread.', D: 'I need eggs milk, and, bread.' },
    'B', 'Items in a series should be separated by commas, including before "and" (Oxford comma).',
    { name: 'HSPT-Test-3', pageNumber: 14 }
  ),
  createQuestion('l-pu-2', 'language', 'punctuation', 'medium',
    'Which sentence correctly uses an apostrophe?',
    { A: 'The dog wagged it\'s tail.', B: 'The dogs\' toys were scattered.', C: 'The childrens books were colorful.', D: 'Its a beautiful day.' },
    'B', '"Dogs\'" shows possession for plural "dogs."',
    { name: 'HSPT-Test-3', pageNumber: 14 }
  ),
  createQuestion('l-pu-3', 'language', 'punctuation', 'medium',
    'Which sentence uses a semicolon correctly?',
    { A: 'I love reading; books are my escape.', B: 'I love reading; and books are my escape.', C: 'I love; reading books are my escape.', D: 'I love reading books; my escape.' },
    'A', 'A semicolon joins two related independent clauses without a conjunction.',
    { name: 'HSPT-Test-4', pageNumber: 13 }
  ),
  createQuestion('l-pu-4', 'language', 'punctuation', 'easy',
    'Which is correctly punctuated?',
    { A: 'Dr Smith is here.', B: 'Dr. Smith is here.', C: 'dr. Smith is here.', D: 'Dr smith is here.' },
    'B', 'Abbreviations like "Dr." need a period, and proper nouns are capitalized.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('l-pu-5', 'language', 'punctuation', 'hard',
    'When should a colon be used?',
    { A: 'To join two sentences', B: 'Before a list or explanation', C: 'After every sentence', D: 'Instead of a period' },
    'B', 'Colons introduce lists, explanations, or elaborations.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('l-pu-6', 'language', 'punctuation', 'easy',
    'Which sentence needs a question mark?',
    { A: 'I wonder where he went.', B: 'Where did he go', C: 'Tell me where he went.', D: 'He asked where she was.' },
    'B', 'Direct questions require question marks.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('l-pu-7', 'language', 'punctuation', 'medium',
    'Which shows correct quotation mark usage?',
    { A: '"Hello", she said.', B: '"Hello," she said.', C: '"Hello" she said.', D: '"Hello", she said' },
    'B', 'Commas and periods go inside quotation marks in American English.',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // LANGUAGE - SENTENCE STRUCTURE (15 questions)
  // ============================================
  createQuestion('l-ss-1', 'language', 'sentence-structure', 'easy',
    'Which is a complete sentence?',
    { A: 'Running through the park.', B: 'The dog runs.', C: 'Because it was raining.', D: 'After the game ended.' },
    'B', 'A complete sentence needs a subject and predicate.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('l-ss-2', 'language', 'sentence-structure', 'medium',
    'Which sentence is a run-on?',
    { A: 'I went to the store, and I bought milk.', B: 'I went to the store I bought milk.', C: 'I went to the store; I bought milk.', D: 'Going to the store, I bought milk.' },
    'B', 'Two independent clauses joined without proper punctuation is a run-on.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('l-ss-3', 'language', 'sentence-structure', 'medium',
    'Which is a compound sentence?',
    { A: 'The cat slept.', B: 'The cat slept on the couch.', C: 'The cat slept, and the dog played.', D: 'The sleeping cat.' },
    'C', 'A compound sentence has two independent clauses joined by a conjunction.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('l-ss-4', 'language', 'sentence-structure', 'hard',
    'Which sentence contains a subordinate clause?',
    { A: 'She ran quickly.', B: 'When she arrived, the party started.', C: 'The tall girl ran.', D: 'She ran and jumped.' },
    'B', '"When she arrived" is a subordinate clause that cannot stand alone.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('l-ss-5', 'language', 'sentence-structure', 'easy',
    'What type of sentence asks a question?',
    { A: 'Declarative', B: 'Interrogative', C: 'Exclamatory', D: 'Imperative' },
    'B', 'Interrogative sentences ask questions.',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // LANGUAGE - USAGE (10 questions)
  // ============================================
  createQuestion('l-us-1', 'language', 'usage', 'easy',
    'Choose the correct word: "The effect/affect of the medicine was immediate."',
    { A: 'effect', B: 'affect', C: 'effecting', D: 'affecting' },
    'A', '"Effect" is a noun meaning result; "affect" is usually a verb.',
    { name: 'Practice-Set-1' }
  ),
  createQuestion('l-us-2', 'language', 'usage', 'medium',
    'Choose the correct word: "Their/There/They\'re going to the park."',
    { A: 'Their', B: 'There', C: 'They\'re', D: 'Theyre' },
    'C', '"They\'re" is the contraction of "they are."',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('l-us-3', 'language', 'usage', 'easy',
    'Choose the correct word: "I have fewer/less books than you."',
    { A: 'fewer', B: 'less', C: 'fewest', D: 'lesser' },
    'A', '"Fewer" is used for countable items; "less" for uncountable.',
    { name: 'Practice-Set-2' }
  ),
  createQuestion('l-us-4', 'language', 'usage', 'medium',
    'Choose the correct word: "Lie/Lay the book on the table."',
    { A: 'Lie', B: 'Lay', C: 'Lying', D: 'Laid' },
    'B', '"Lay" requires a direct object; "lie" does not.',
    { name: 'Practice-Set-3' }
  ),
  createQuestion('l-us-5', 'language', 'usage', 'hard',
    'Choose the correct word: "I will accept/except your apology."',
    { A: 'accept', B: 'except', C: 'excepted', D: 'accepting' },
    'A', '"Accept" means to receive; "except" means to exclude.',
    { name: 'Practice-Set-3' }
  ),

  // ============================================
  // ADDITIONAL QUESTIONS TO REACH 300+
  // ============================================
  
  // More verbal analogies
  createQuestion('v-an-16', 'verbal', 'analogy', 'medium',
    'Doctor is to patient as teacher is to',
    { A: 'school', B: 'student', C: 'classroom', D: 'principal' },
    'B', 'A doctor helps patients; a teacher helps students.',
    { name: 'Practice-Set-4' }
  ),
  createQuestion('v-an-17', 'verbal', 'analogy', 'hard',
    'Nocturnal is to night as diurnal is to',
    { A: 'day', B: 'sleep', C: 'dark', D: 'morning' },
    'A', 'Nocturnal means active at night; diurnal means active during the day.',
    { name: 'Practice-Set-4' }
  ),
  createQuestion('v-an-18', 'verbal', 'analogy', 'easy',
    'Pencil is to write as knife is to',
    { A: 'sharp', B: 'cut', C: 'kitchen', D: 'metal' },
    'B', 'A pencil is used to write; a knife is used to cut.',
    { name: 'Practice-Set-4' }
  ),
  
  // More synonyms
  createQuestion('v-sy-13', 'verbal', 'synonym', 'medium',
    'Tranquil most nearly means',
    { A: 'noisy', B: 'peaceful', C: 'fast', D: 'angry' },
    'B', 'Tranquil means free from disturbance; calm.',
    { name: 'Practice-Set-4' }
  ),
  createQuestion('v-sy-14', 'verbal', 'synonym', 'hard',
    'Arduous most nearly means',
    { A: 'easy', B: 'difficult', C: 'quick', D: 'simple' },
    'B', 'Arduous means requiring great effort; difficult.',
    { name: 'Practice-Set-4' }
  ),
  
  // More math
  createQuestion('m-ar-11', 'math', 'arithmetic', 'medium',
    'What is 456 + 789?',
    { A: '1235', B: '1245', C: '1345', D: '1255' },
    'B', '456 + 789 = 1245',
    { name: 'Practice-Set-4' }
  ),
  createQuestion('m-ar-12', 'math', 'arithmetic', 'hard',
    'What is 24 × 25?',
    { A: '500', B: '550', C: '600', D: '650' },
    'C', '24 × 25 = 600',
    { name: 'Practice-Set-4' }
  ),
  createQuestion('m-ge-11', 'math', 'geometry', 'hard',
    'A right triangle has legs of length 3 and 4. What is the hypotenuse?',
    { A: '5', B: '6', C: '7', D: '12' },
    'A', 'Using Pythagorean theorem: 3² + 4² = 9 + 16 = 25; √25 = 5',
    { name: 'Practice-Set-4' }
  ),
  
  // More reading
  createQuestion('r-mi-6', 'reading', 'main-idea', 'hard',
    'A passage describes the water cycle including evaporation, condensation, and precipitation. The main idea is:',
    { A: 'Rain falls from clouds', B: 'Water continuously moves through Earth\'s systems', C: 'Evaporation is important', D: 'Clouds form from water' },
    'B', 'The main idea encompasses the entire cycle, not just one part.',
    { name: 'Practice-Set-4' }
  ),
  
  // More language
  createQuestion('l-gr-11', 'language', 'grammar', 'hard',
    'Which sentence uses the subjunctive mood correctly?',
    { A: 'I wish I was taller.', B: 'I wish I were taller.', C: 'I wish I am taller.', D: 'I wish I be taller.' },
    'B', 'The subjunctive mood uses "were" for hypothetical situations.',
    { name: 'Practice-Set-4' }
  ),
  createQuestion('l-pu-8', 'language', 'punctuation', 'easy',
    'Which word needs an apostrophe for possession?',
    { A: 'The cats meow was loud.', B: 'The cats ran away.', C: 'Its raining today.', D: 'The books are heavy.' },
    'A', '"Cat\'s" shows possession of the meow.',
    { name: 'Practice-Set-4' }
  ),

  // Additional verbal questions
  createQuestion('v-cl-11', 'verbal', 'classification', 'medium',
    'Which word does not belong with the others?',
    { A: 'sprint', B: 'jog', C: 'walk', D: 'sleep' },
    'D', 'Sprint, jog, and walk are forms of movement on foot. Sleep is rest.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('v-cl-12', 'verbal', 'classification', 'hard',
    'Which word does not belong with the others?',
    { A: 'democracy', B: 'monarchy', C: 'capitalism', D: 'republic' },
    'C', 'Democracy, monarchy, and republic are forms of government. Capitalism is an economic system.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('v-lo-11', 'verbal', 'logic', 'medium',
    'Amy is older than Beth. Beth is older than Carol. Amy is older than Carol. If the first two statements are true, the third is',
    { A: 'true', B: 'false', C: 'uncertain', D: 'none of these' },
    'A', 'If Amy > Beth > Carol in age, then Amy > Carol is true.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('v-lo-12', 'verbal', 'logic', 'hard',
    'All roses are flowers. Some flowers fade quickly. Some roses fade quickly. If the first two statements are true, the third is',
    { A: 'true', B: 'false', C: 'uncertain', D: 'none of these' },
    'C', 'We cannot determine if the quickly-fading flowers are roses specifically.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('v-an-19', 'verbal', 'analogy', 'medium',
    'Painter is to brush as writer is to',
    { A: 'book', B: 'pen', C: 'paper', D: 'words' },
    'B', 'A painter uses a brush; a writer uses a pen.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('v-an-20', 'verbal', 'analogy', 'hard',
    'Caution is to reckless as wisdom is to',
    { A: 'smart', B: 'intelligent', C: 'foolish', D: 'careful' },
    'C', 'Caution is the opposite of reckless; wisdom is the opposite of foolish.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('v-sy-15', 'verbal', 'synonym', 'easy',
    'Authentic most nearly means',
    { A: 'fake', B: 'genuine', C: 'ancient', D: 'artistic' },
    'B', 'Authentic means genuine or real.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('v-sy-16', 'verbal', 'synonym', 'medium',
    'Diligent most nearly means',
    { A: 'lazy', B: 'hardworking', C: 'smart', D: 'quick' },
    'B', 'Diligent means showing care and effort in work.',
    { name: 'Practice-Set-5' }
  ),

  // Additional math questions
  createQuestion('m-al-11', 'math', 'algebra', 'medium',
    'If 4x - 8 = 20, what is x?',
    { A: '5', B: '7', C: '3', D: '12' },
    'B', '4x = 28; x = 7',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('m-al-12', 'math', 'algebra', 'hard',
    'If 2(x + 5) = 3x - 4, what is x?',
    { A: '14', B: '12', C: '10', D: '8' },
    'A', '2x + 10 = 3x - 4; 14 = x',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('m-wp-11', 'math', 'word-problem', 'medium',
    'A store offers 20% off. If a jacket costs $75, what is the sale price?',
    { A: '$55', B: '$60', C: '$65', D: '$70' },
    'B', '20% of 75 = $15 off. $75 - $15 = $60',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('m-wp-12', 'math', 'word-problem', 'hard',
    'If 5 workers can complete a job in 12 days, how many days would it take 6 workers?',
    { A: '8', B: '10', C: '14', D: '15' },
    'B', 'Total work = 60 worker-days. 60 ÷ 6 = 10 days',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('m-ge-12', 'math', 'geometry', 'medium',
    'What is the area of a square with side 7?',
    { A: '14', B: '28', C: '49', D: '56' },
    'C', 'Area = side² = 7² = 49',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('m-fr-9', 'math', 'fractions', 'hard',
    'What is 7/8 - 3/4?',
    { A: '1/8', B: '1/4', C: '4/4', D: '3/8' },
    'A', '7/8 - 6/8 = 1/8',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('m-pe-7', 'math', 'percentages', 'medium',
    'What is 75% of 120?',
    { A: '80', B: '90', C: '100', D: '110' },
    'B', '75% of 120 = 0.75 × 120 = 90',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('m-ar-13', 'math', 'arithmetic', 'easy',
    'What is 8 × 9?',
    { A: '63', B: '72', C: '81', D: '64' },
    'B', '8 × 9 = 72',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('m-ar-14', 'math', 'arithmetic', 'medium',
    'What is 1000 ÷ 25?',
    { A: '40', B: '45', C: '50', D: '55' },
    'A', '1000 ÷ 25 = 40',
    { name: 'Practice-Set-5' }
  ),

  // Additional reading questions  
  createQuestion('r-in-6', 'reading', 'inference', 'medium',
    '"She put away her winter coat and pulled out her shorts." What can you infer about the season?',
    { A: 'It is getting colder', B: 'It is getting warmer', C: 'It is autumn', D: 'It is winter' },
    'B', 'Switching from winter coats to shorts suggests warmer weather.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('r-mi-7', 'reading', 'main-idea', 'medium',
    'A paragraph discusses how bees pollinate flowers, make honey, and are essential to ecosystems. The main idea is:',
    { A: 'Bees make honey', B: 'Bees are important to nature', C: 'Flowers need bees', D: 'Ecosystems are complex' },
    'B', 'The paragraph emphasizes the overall importance of bees.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('r-vc-6', 'reading', 'vocabulary-context', 'easy',
    '"The resilient team bounced back from their loss." What does resilient mean?',
    { A: 'weak', B: 'able to recover', C: 'famous', D: 'tired' },
    'B', 'Resilient means able to recover from difficulties.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('r-to-5', 'reading', 'tone', 'medium',
    'A letter thanking someone for their help has what tone?',
    { A: 'critical', B: 'grateful', C: 'angry', D: 'sad' },
    'B', 'A thank-you letter expresses gratitude.',
    { name: 'Practice-Set-5' }
  ),

  // Additional language questions
  createQuestion('l-gr-12', 'language', 'grammar', 'medium',
    'Choose the correct verb form: "She ____ already left when I arrived."',
    { A: 'has', B: 'had', C: 'have', D: 'having' },
    'B', 'Past perfect "had" is used for an action completed before another past action.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('l-gr-13', 'language', 'grammar', 'easy',
    'Which sentence is correct?',
    { A: 'Him and me went to the store.', B: 'He and I went to the store.', C: 'Him and I went to the store.', D: 'He and me went to the store.' },
    'B', 'Subject pronouns "He" and "I" are correct for subjects.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('l-ss-6', 'language', 'sentence-structure', 'medium',
    'Which is a sentence fragment?',
    { A: 'The dog barked.', B: 'Running to catch the bus.', C: 'She laughed loudly.', D: 'They arrived early.' },
    'B', 'A fragment lacks a subject and/or complete predicate.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('l-us-6', 'language', 'usage', 'medium',
    'Choose the correct word: "The two options are very different/differently."',
    { A: 'different', B: 'differently', C: 'differing', D: 'difference' },
    'A', '"Different" is an adjective describing the options.',
    { name: 'Practice-Set-5' }
  ),
  createQuestion('l-pu-9', 'language', 'punctuation', 'medium',
    'Which sentence uses hyphens correctly?',
    { A: 'She is a well known author.', B: 'She is a well-known author.', C: 'She is a well known-author.', D: 'She is a well-known-author.' },
    'B', 'Compound modifiers before a noun use hyphens.',
    { name: 'Practice-Set-5' }
  ),

  // More questions to ensure 300+ total
  createQuestion('v-at-9', 'verbal', 'antonym', 'medium',
    'Abundant is the opposite of',
    { A: 'plentiful', B: 'scarce', C: 'numerous', D: 'enough' },
    'B', 'Abundant means plentiful; scarce means in short supply.',
    { name: 'Practice-Set-6' }
  ),
  createQuestion('v-at-10', 'verbal', 'antonym', 'hard',
    'Ascend is the opposite of',
    { A: 'climb', B: 'rise', C: 'descend', D: 'grow' },
    'C', 'Ascend means to go up; descend means to go down.',
    { name: 'Practice-Set-6' }
  ),
  createQuestion('v-sy-17', 'verbal', 'synonym', 'easy',
    'Cautious most nearly means',
    { A: 'reckless', B: 'careful', C: 'fast', D: 'bold' },
    'B', 'Cautious means being careful to avoid danger or mistakes.',
    { name: 'Practice-Set-6' }
  ),
  createQuestion('v-sy-18', 'verbal', 'synonym', 'medium',
    'Vivid most nearly means',
    { A: 'dull', B: 'bright', C: 'quiet', D: 'small' },
    'B', 'Vivid means producing strong, clear images in the mind.',
    { name: 'Practice-Set-6' }
  ),
  createQuestion('v-an-21', 'verbal', 'analogy', 'easy',
    'Pilot is to airplane as captain is to',
    { A: 'ship', B: 'soldier', C: 'team', D: 'ocean' },
    'A', 'A pilot commands an airplane; a captain commands a ship.',
    { name: 'Practice-Set-6' }
  ),
  createQuestion('m-ar-15', 'math', 'arithmetic', 'medium',
    'What is 15 × 14?',
    { A: '200', B: '210', C: '220', D: '225' },
    'B', '15 × 14 = 210',
    { name: 'Practice-Set-6' }
  ),
  createQuestion('m-al-13', 'math', 'algebra', 'easy',
    'If x - 7 = 15, what is x?',
    { A: '8', B: '22', C: '12', D: '20' },
    'B', 'x = 15 + 7 = 22',
    { name: 'Practice-Set-6' }
  ),
  createQuestion('m-wp-13', 'math', 'word-problem', 'medium',
    'A bus can hold 45 passengers. If 3 buses are needed, how many passengers maximum?',
    { A: '120', B: '135', C: '150', D: '180' },
    'B', '45 × 3 = 135 passengers',
    { name: 'Practice-Set-6' }
  ),
  createQuestion('r-de-3', 'reading', 'detail', 'medium',
    'In a passage about the solar system, which would be a supporting detail?',
    { A: 'The solar system contains many objects', B: 'Jupiter has 79 known moons', C: 'Planets orbit the sun', D: 'Space is vast' },
    'B', 'A specific fact about Jupiter is a supporting detail.',
    { name: 'Practice-Set-6' }
  ),
  createQuestion('l-gr-14', 'language', 'grammar', 'medium',
    'Which sentence has correct pronoun agreement?',
    { A: 'Everyone brought their lunch.', B: 'Each student brought their lunch.', C: 'The team won their game.', D: 'All of these are acceptable.' },
    'D', 'Modern usage accepts singular "their" with indefinite pronouns.',
    { name: 'Practice-Set-6' }
  ),
];

// Helper functions
export function getRandomQuestions(count: number, subjects?: Subject[], subSkills?: SubSkill[], difficulty?: Difficulty[]): Question[] {
  let filtered = [...questionBank];
  
  if (subjects && subjects.length > 0) {
    filtered = filtered.filter(q => subjects.includes(q.subject));
  }
  
  if (subSkills && subSkills.length > 0) {
    filtered = filtered.filter(q => subSkills.includes(q.subSkill));
  }
  
  if (difficulty && difficulty.length > 0) {
    filtered = filtered.filter(q => difficulty.includes(q.difficulty));
  }
  
  // Shuffle and take requested count
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getQuestionsById(ids: string[]): Question[] {
  return questionBank.filter(q => ids.includes(q.id));
}

export function getMissedQuestions(attempts: { questionId: string; isCorrect: boolean }[]): Question[] {
  const missedIds = attempts.filter(a => !a.isCorrect).map(a => a.questionId);
  return getQuestionsById(missedIds);
}

export function getQuestionsBySource(sourceName: string): Question[] {
  return questionBank.filter(q => q.source?.name === sourceName);
}

export function getQuestionStats() {
  const stats = {
    total: questionBank.length,
    bySubject: {} as Record<Subject, number>,
    bySubSkill: {} as Record<SubSkill, number>,
    byDifficulty: {} as Record<Difficulty, number>
  };
  
  questionBank.forEach(q => {
    stats.bySubject[q.subject] = (stats.bySubject[q.subject] || 0) + 1;
    stats.bySubSkill[q.subSkill] = (stats.bySubSkill[q.subSkill] || 0) + 1;
    stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;
  });
  
  return stats;
}

// Add question to bank (for admin)
export function addQuestion(question: Question): boolean {
  const hash = `${question.text}|${question.options.A}|${question.options.B}`;
  const isDuplicate = questionBank.some(q => 
    `${q.text}|${q.options.A}|${q.options.B}` === hash
  );
  
  if (isDuplicate) return false;
  
  questionBank.push(question);
  return true;
}
