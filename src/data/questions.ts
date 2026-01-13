import { Question } from '@/types/exam';

// Real HSPT questions extracted from the practice tests
export const questionBank: Question[] = [
  // Verbal Skills - Analogies
  {
    id: 'v1',
    subject: 'verbal',
    type: 'analogy',
    text: 'Conservative is to liberal as pepper is to',
    options: { A: 'soda', B: 'salt', C: 'seasoning', D: 'spice' },
    correctAnswer: 'B',
    explanation: 'Conservative is the opposite of liberal. Salt is the opposite pairing to pepper.'
  },
  {
    id: 'v2',
    subject: 'verbal',
    type: 'classification',
    text: 'Which of these words does not belong with the others?',
    options: { A: 'restaurant', B: 'house', C: 'condominium', D: 'apartment' },
    correctAnswer: 'A',
    explanation: 'House, condominium, and apartment are places where people live. A restaurant is where they eat.'
  },
  {
    id: 'v3',
    subject: 'verbal',
    type: 'classification',
    text: 'Which of these words does not belong with the others?',
    options: { A: 'wretched', B: 'miserable', C: 'glum', D: 'happy' },
    correctAnswer: 'D',
    explanation: 'Wretched, miserable, and glum are words that mean "sad." Happy is an antonym.'
  },
  {
    id: 'v4',
    subject: 'verbal',
    type: 'analogy',
    text: 'Patient is to hospital as student is to',
    options: { A: 'cave', B: 'bus', C: 'school', D: 'clouds' },
    correctAnswer: 'C',
    explanation: 'A hospital is a structure that houses patients, and a school is a structure that houses students.'
  },
  {
    id: 'v5',
    subject: 'verbal',
    type: 'classification',
    text: 'Which of these words does not belong with the others?',
    options: { A: 'surrender', B: 'yield', C: 'relinquish', D: 'object' },
    correctAnswer: 'D',
    explanation: 'Surrender, yield, and relinquish are synonyms for giving in; object means to resist.'
  },
  {
    id: 'v6',
    subject: 'verbal',
    type: 'vocabulary',
    text: 'Cryptic most nearly means',
    options: { A: 'mysterious', B: 'basic', C: 'frightening', D: 'secure' },
    correctAnswer: 'A',
    explanation: 'Cryptic means hidden, secret, or mysterious.'
  },
  {
    id: 'v7',
    subject: 'verbal',
    type: 'logic',
    text: 'Sommerville is closer to the lake than Derbyville is. Dillon is closer to the lake than Sommerville is. Dillon is closer to the lake than Derbyville is. If the first two statements are true, the third statement is',
    options: { A: 'true', B: 'false', C: 'uncertain', D: '' },
    correctAnswer: 'A',
    explanation: 'From the statements: Dillon → Sommerville → Derbyville. Dillon is the closest, so the third statement is true.'
  },
  {
    id: 'v8',
    subject: 'verbal',
    type: 'analogy',
    text: 'Incarcerate is to jail as deposit is to',
    options: { A: 'account', B: 'store', C: 'apartment', D: 'prison' },
    correctAnswer: 'A',
    explanation: 'To incarcerate is the act of placing someone in jail. To deposit is the act of placing something in an account.'
  },
  {
    id: 'v9',
    subject: 'verbal',
    type: 'vocabulary',
    text: 'Savory most nearly means',
    options: { A: 'bitter', B: 'flavorful', C: 'unattractive', D: 'gutsy' },
    correctAnswer: 'B',
    explanation: 'Savory has to do with how something tastes; a savory taste is pleasant and flavorful.'
  },
  {
    id: 'v10',
    subject: 'verbal',
    type: 'vocabulary',
    text: 'Sinister most nearly means',
    options: { A: 'menacing', B: 'insipid', C: 'zesty', D: 'searing' },
    correctAnswer: 'A',
    explanation: 'Something sinister is evil or threatening. Menacing is the best synonym.'
  },
  {
    id: 'v11',
    subject: 'verbal',
    type: 'vocabulary',
    text: 'Tepid most nearly means',
    options: { A: 'enthusiastic', B: 'scalding', C: 'lukewarm', D: 'calm' },
    correctAnswer: 'C',
    explanation: 'Tepid water is neither hot nor cold; it\'s lukewarm.'
  },
  {
    id: 'v12',
    subject: 'verbal',
    type: 'analogy',
    text: 'Hour is to minute as year is to',
    options: { A: 'century', B: 'clock', C: 'calendar', D: 'day' },
    correctAnswer: 'D',
    explanation: 'An hour is a whole made up of minutes. A year is a whole made up of days.'
  },
  {
    id: 'v13',
    subject: 'verbal',
    type: 'logic',
    text: 'Maggie is younger than David. David is younger than Stuart. Stuart is younger than Maggie. If the first two statements are true, the third statement is',
    options: { A: 'true', B: 'false', C: 'uncertain', D: '' },
    correctAnswer: 'B',
    explanation: 'From youngest to oldest: Maggie → David → Stuart. Stuart is older than Maggie, so the third statement is false.'
  },
  {
    id: 'v14',
    subject: 'verbal',
    type: 'analogy',
    text: 'Field is to wildflower as pond is to',
    options: { A: 'stone', B: 'lily pad', C: 'frog', D: 'river' },
    correctAnswer: 'B',
    explanation: 'A field is a place where wildflowers grow just as a pond is a place where lily pads grow.'
  },
  {
    id: 'v15',
    subject: 'verbal',
    type: 'classification',
    text: 'Which of these words does not belong with the others?',
    options: { A: 'gregarious', B: 'sociable', C: 'introvert', D: 'outgoing' },
    correctAnswer: 'C',
    explanation: 'Gregarious, sociable, and outgoing are synonyms for extrovert. Introvert is the opposite.'
  },
  // More Verbal - Test 4
  {
    id: 'v16',
    subject: 'verbal',
    type: 'classification',
    text: 'Which word does not belong with the others?',
    options: { A: 'sundial', B: 'watch', C: 'time', D: 'clock' },
    correctAnswer: 'C',
    explanation: 'Time is a general classification. The other choices are objects that tell time.'
  },
  {
    id: 'v17',
    subject: 'verbal',
    type: 'analogy',
    text: 'Red is to pink as black is to',
    options: { A: 'beige', B: 'white', C: 'dark', D: 'gray' },
    correctAnswer: 'D',
    explanation: 'The effect of lightening red is pink; the effect of lightening black is gray.'
  },
  {
    id: 'v18',
    subject: 'verbal',
    type: 'logic',
    text: 'Ann reads faster than Sue. Karen reads faster than Ann. Karen reads more slowly than Sue. If the first two statements are true, the third is',
    options: { A: 'true', B: 'false', C: 'uncertain', D: '' },
    correctAnswer: 'B',
    explanation: 'Because Karen reads faster than Ann, who reads faster than Sue, Karen must also read faster than Sue.'
  },
  {
    id: 'v19',
    subject: 'verbal',
    type: 'vocabulary',
    text: 'Create most nearly means',
    options: { A: 'destroy', B: 'build', C: 'discover', D: 'invent' },
    correctAnswer: 'D',
    explanation: 'Create means to bring into existence or to invent.'
  },
  {
    id: 'v20',
    subject: 'verbal',
    type: 'analogy',
    text: 'Youth is to young as age is to',
    options: { A: 'people', B: 'parents', C: 'grandmother', D: 'old' },
    correctAnswer: 'D',
    explanation: 'This is a noun-adjective relationship. Youth relates to young as age relates to old.'
  },
  // Math Questions
  {
    id: 'm1',
    subject: 'math',
    type: 'arithmetic',
    text: 'What is 15% of 80?',
    options: { A: '8', B: '12', C: '15', D: '20' },
    correctAnswer: 'B',
    explanation: '15% of 80 = 0.15 × 80 = 12'
  },
  {
    id: 'm2',
    subject: 'math',
    type: 'algebra',
    text: 'If 3x + 7 = 22, what is the value of x?',
    options: { A: '3', B: '5', C: '7', D: '15' },
    correctAnswer: 'B',
    explanation: '3x + 7 = 22; 3x = 15; x = 5'
  },
  {
    id: 'm3',
    subject: 'math',
    type: 'geometry',
    text: 'What is the area of a rectangle with length 12 and width 5?',
    options: { A: '17', B: '34', C: '60', D: '72' },
    correctAnswer: 'C',
    explanation: 'Area = length × width = 12 × 5 = 60'
  },
  {
    id: 'm4',
    subject: 'math',
    type: 'word-problem',
    text: 'A store sells apples for $0.50 each. How much would 8 apples cost?',
    options: { A: '$3.00', B: '$4.00', C: '$4.50', D: '$8.00' },
    correctAnswer: 'B',
    explanation: '8 × $0.50 = $4.00'
  },
  {
    id: 'm5',
    subject: 'math',
    type: 'arithmetic',
    text: 'What is 144 ÷ 12?',
    options: { A: '10', B: '11', C: '12', D: '14' },
    correctAnswer: 'C',
    explanation: '144 ÷ 12 = 12'
  },
  {
    id: 'm6',
    subject: 'math',
    type: 'geometry',
    text: 'What is the perimeter of a square with side length 9?',
    options: { A: '18', B: '27', C: '36', D: '81' },
    correctAnswer: 'C',
    explanation: 'Perimeter = 4 × side = 4 × 9 = 36'
  },
  {
    id: 'm7',
    subject: 'math',
    type: 'algebra',
    text: 'If y = 2x - 3 and x = 4, what is y?',
    options: { A: '2', B: '5', C: '8', D: '11' },
    correctAnswer: 'B',
    explanation: 'y = 2(4) - 3 = 8 - 3 = 5'
  },
  {
    id: 'm8',
    subject: 'math',
    type: 'word-problem',
    text: 'Tom has 24 marbles. He gives 1/3 of them to his friend. How many marbles does he have left?',
    options: { A: '8', B: '12', C: '16', D: '18' },
    correctAnswer: 'C',
    explanation: '1/3 of 24 = 8. Tom gives away 8, leaving 24 - 8 = 16 marbles.'
  },
  {
    id: 'm9',
    subject: 'math',
    type: 'arithmetic',
    text: 'What is the value of 3² + 4²?',
    options: { A: '14', B: '25', C: '49', D: '7' },
    correctAnswer: 'B',
    explanation: '3² + 4² = 9 + 16 = 25'
  },
  {
    id: 'm10',
    subject: 'math',
    type: 'geometry',
    text: 'A triangle has angles of 45° and 90°. What is the third angle?',
    options: { A: '35°', B: '45°', C: '55°', D: '135°' },
    correctAnswer: 'B',
    explanation: 'Angles in a triangle sum to 180°. 180 - 45 - 90 = 45°'
  },
  // Reading Comprehension
  {
    id: 'r1',
    subject: 'reading',
    type: 'comprehension',
    text: 'Based on context: "The scientist\'s hypothesis was corroborated by the experimental results." What does corroborated mean?',
    options: { A: 'contradicted', B: 'supported', C: 'ignored', D: 'questioned' },
    correctAnswer: 'B',
    explanation: 'Corroborated means confirmed or supported by evidence.'
  },
  {
    id: 'r2',
    subject: 'reading',
    type: 'comprehension',
    text: 'What is the main purpose of a thesis statement in an essay?',
    options: { A: 'To provide background information', B: 'To summarize the conclusion', C: 'To state the main argument', D: 'To list supporting details' },
    correctAnswer: 'C',
    explanation: 'A thesis statement presents the main argument or claim of an essay.'
  },
  {
    id: 'r3',
    subject: 'reading',
    type: 'comprehension',
    text: 'An author who uses sarcasm in their writing is employing which type of language?',
    options: { A: 'literal', B: 'figurative', C: 'technical', D: 'formal' },
    correctAnswer: 'B',
    explanation: 'Sarcasm is a form of figurative language where words convey the opposite of their literal meaning.'
  },
  {
    id: 'r4',
    subject: 'reading',
    type: 'comprehension',
    text: 'Which sentence uses a metaphor?',
    options: { A: 'The wind howled like a wolf.', B: 'Her heart was a frozen stone.', C: 'The stars twinkled brightly.', D: 'He ran very quickly.' },
    correctAnswer: 'B',
    explanation: 'A metaphor directly compares two things without using "like" or "as."'
  },
  {
    id: 'r5',
    subject: 'reading',
    type: 'comprehension',
    text: 'What does it mean to infer information from a text?',
    options: { A: 'To copy it exactly', B: 'To guess randomly', C: 'To draw conclusions from clues', D: 'To summarize the main idea' },
    correctAnswer: 'C',
    explanation: 'To infer means to use evidence and reasoning to reach a logical conclusion.'
  },
  // Language/Grammar
  {
    id: 'l1',
    subject: 'language',
    type: 'grammar',
    text: 'Choose the sentence with correct subject-verb agreement:',
    options: { A: 'The group of students are studying.', B: 'The group of students is studying.', C: 'The group of students were studying.', D: 'The group of students be studying.' },
    correctAnswer: 'B',
    explanation: '"Group" is a collective noun and takes a singular verb "is."'
  },
  {
    id: 'l2',
    subject: 'language',
    type: 'punctuation',
    text: 'Which sentence uses commas correctly?',
    options: { A: 'I need eggs milk and bread.', B: 'I need eggs, milk, and bread.', C: 'I need, eggs milk and bread.', D: 'I need eggs milk, and, bread.' },
    correctAnswer: 'B',
    explanation: 'Items in a series should be separated by commas, including before "and" (Oxford comma).'
  },
  {
    id: 'l3',
    subject: 'language',
    type: 'grammar',
    text: 'Choose the correct word: "Everyone should bring ____ own lunch."',
    options: { A: 'their', B: 'his or her', C: 'they\'re', D: 'there' },
    correctAnswer: 'A',
    explanation: 'In modern usage, "their" is accepted as a singular pronoun for "everyone."'
  },
  {
    id: 'l4',
    subject: 'language',
    type: 'grammar',
    text: 'Which word correctly completes the sentence? "She performed ____ than her competitor."',
    options: { A: 'good', B: 'better', C: 'best', D: 'well' },
    correctAnswer: 'B',
    explanation: '"Better" is the comparative form used when comparing two things.'
  },
  {
    id: 'l5',
    subject: 'language',
    type: 'punctuation',
    text: 'Which sentence correctly uses an apostrophe?',
    options: { A: 'The dog wagged it\'s tail.', B: 'The dogs\' toys were scattered.', C: 'The childrens books were colorful.', D: 'Its a beautiful day.' },
    correctAnswer: 'B',
    explanation: '"Dogs\'" shows possession for plural "dogs." "Its" (no apostrophe) is possessive; "children\'s" needs an apostrophe.'
  },
  {
    id: 'l6',
    subject: 'language',
    type: 'grammar',
    text: 'Identify the sentence with a dangling modifier:',
    options: { A: 'Walking to school, I saw a rainbow.', B: 'Running quickly, the finish line was crossed.', C: 'The teacher, who was tired, dismissed class.', D: 'We ate lunch after the meeting.' },
    correctAnswer: 'B',
    explanation: '"Running quickly" doesn\'t logically modify "the finish line." The sentence should clarify who was running.'
  },
  {
    id: 'l7',
    subject: 'language',
    type: 'grammar',
    text: 'Which sentence is written in passive voice?',
    options: { A: 'The chef prepared the meal.', B: 'The meal was prepared by the chef.', C: 'The chef is preparing the meal.', D: 'The chef will prepare the meal.' },
    correctAnswer: 'B',
    explanation: 'Passive voice: the subject receives the action. "The meal was prepared" puts the object first.'
  },
  {
    id: 'l8',
    subject: 'language',
    type: 'punctuation',
    text: 'Which sentence uses a semicolon correctly?',
    options: { A: 'I love reading; books are my escape.', B: 'I love reading; and books are my escape.', C: 'I love; reading books are my escape.', D: 'I love reading books; my escape.' },
    correctAnswer: 'A',
    explanation: 'A semicolon joins two related independent clauses without a conjunction.'
  },
  // Additional Logic Questions
  {
    id: 'v21',
    subject: 'verbal',
    type: 'logic',
    text: 'All professors are teachers. All teachers are tenured. All professors are tenured. If the first two statements are true, the third statement is',
    options: { A: 'true', B: 'false', C: 'uncertain', D: '' },
    correctAnswer: 'A',
    explanation: 'If all professors are teachers, and all teachers are tenured, then all professors must be tenured.'
  },
  {
    id: 'v22',
    subject: 'verbal',
    type: 'logic',
    text: 'Micky has more trophies than Donald does. Donald has more trophies than Cal does. Cal has more trophies than Micky does. If the first two statements are true, the third statement is',
    options: { A: 'true', B: 'false', C: 'uncertain', D: '' },
    correctAnswer: 'B',
    explanation: 'From most to least: Micky → Donald → Cal. Cal cannot have more than Micky, so the statement is false.'
  },
  {
    id: 'v23',
    subject: 'verbal',
    type: 'vocabulary',
    text: 'A shrewd investment is',
    options: { A: 'naive', B: 'wise', C: 'classy', D: 'recent' },
    correctAnswer: 'B',
    explanation: 'Shrewd means having good judgment, especially in practical matters. A shrewd investment is a wise one.'
  },
  {
    id: 'v24',
    subject: 'verbal',
    type: 'vocabulary',
    text: 'Discipline is the opposite of',
    options: { A: 'regulation', B: 'anarchy', C: 'evil', D: 'rebuke' },
    correctAnswer: 'B',
    explanation: 'Discipline involves order and control; anarchy is the absence of order.'
  },
  {
    id: 'v25',
    subject: 'verbal',
    type: 'analogy',
    text: 'Cloud is to confusion as illuminate is to',
    options: { A: 'shadow', B: 'combustion', C: 'consumption', D: 'clarification' },
    correctAnswer: 'D',
    explanation: 'To cloud something is to confuse it; to illuminate something is to clarify it.'
  },
  // More Math
  {
    id: 'm11',
    subject: 'math',
    type: 'arithmetic',
    text: 'What is 25% of 200?',
    options: { A: '25', B: '50', C: '75', D: '100' },
    correctAnswer: 'B',
    explanation: '25% of 200 = 0.25 × 200 = 50'
  },
  {
    id: 'm12',
    subject: 'math',
    type: 'algebra',
    text: 'Solve for x: 2x - 8 = 10',
    options: { A: '1', B: '9', C: '11', D: '18' },
    correctAnswer: 'B',
    explanation: '2x - 8 = 10; 2x = 18; x = 9'
  },
  {
    id: 'm13',
    subject: 'math',
    type: 'word-problem',
    text: 'A train travels 60 miles per hour. How far does it travel in 2.5 hours?',
    options: { A: '120 miles', B: '135 miles', C: '150 miles', D: '180 miles' },
    correctAnswer: 'C',
    explanation: 'Distance = speed × time = 60 × 2.5 = 150 miles'
  },
  {
    id: 'm14',
    subject: 'math',
    type: 'geometry',
    text: 'What is the circumference of a circle with diameter 10? (Use π ≈ 3.14)',
    options: { A: '15.7', B: '31.4', C: '78.5', D: '314' },
    correctAnswer: 'B',
    explanation: 'Circumference = πd = 3.14 × 10 = 31.4'
  },
  {
    id: 'm15',
    subject: 'math',
    type: 'arithmetic',
    text: 'What is the least common multiple of 4 and 6?',
    options: { A: '2', B: '10', C: '12', D: '24' },
    correctAnswer: 'C',
    explanation: 'The LCM of 4 and 6 is 12 (smallest number divisible by both).'
  },
];

// Helper function to get questions by subject
export const getQuestionsBySubject = (subject: string): Question[] => {
  return questionBank.filter(q => q.subject === subject);
};

// Helper function to get random questions
export const getRandomQuestions = (count: number, subjects?: string[]): Question[] => {
  let pool = subjects 
    ? questionBank.filter(q => subjects.includes(q.subject))
    : questionBank;
  
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
