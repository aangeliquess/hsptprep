import { VocabularyWord, VOCAB_STORAGE_KEYS, generateVocabId } from '@/types/vocabulary';

// Initial vocabulary bank with HSPT-relevant words
export const defaultVocabularyBank: VocabularyWord[] = [
  // High-frequency HSPT words
  {
    id: 'v001',
    word: 'abundant',
    partOfSpeech: 'adjective',
    definition: 'existing in large quantities; more than enough',
    synonyms: ['plentiful', 'copious', 'ample', 'numerous'],
    antonyms: ['scarce', 'rare', 'limited', 'sparse'],
    exampleSentence: 'The garden had an abundant supply of fresh vegetables.',
    difficulty: 'easy',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['common', 'hspt-frequent']
  },
  {
    id: 'v002',
    word: 'benevolent',
    partOfSpeech: 'adjective',
    definition: 'well-meaning and kind; showing goodwill',
    synonyms: ['kind', 'generous', 'charitable', 'compassionate'],
    antonyms: ['malevolent', 'cruel', 'unkind', 'selfish'],
    exampleSentence: 'The benevolent donor gave millions to charity.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['character', 'hspt-frequent']
  },
  {
    id: 'v003',
    word: 'concise',
    partOfSpeech: 'adjective',
    definition: 'giving a lot of information clearly in a few words; brief but comprehensive',
    synonyms: ['brief', 'succinct', 'short', 'compact'],
    antonyms: ['lengthy', 'verbose', 'wordy', 'rambling'],
    exampleSentence: 'Her essay was concise and well-organized.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['writing', 'hspt-frequent']
  },
  {
    id: 'v004',
    word: 'diligent',
    partOfSpeech: 'adjective',
    definition: 'having or showing care and effort in work or duties',
    synonyms: ['hardworking', 'industrious', 'careful', 'thorough'],
    antonyms: ['lazy', 'careless', 'negligent', 'idle'],
    exampleSentence: 'The diligent student always completed her homework on time.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['character', 'hspt-frequent']
  },
  {
    id: 'v005',
    word: 'eloquent',
    partOfSpeech: 'adjective',
    definition: 'fluent or persuasive in speaking or writing',
    synonyms: ['articulate', 'expressive', 'fluent', 'persuasive'],
    antonyms: ['inarticulate', 'tongue-tied', 'halting', 'mumbling'],
    exampleSentence: 'The mayor gave an eloquent speech at the ceremony.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['communication', 'hspt-frequent']
  },
  {
    id: 'v006',
    word: 'frugal',
    partOfSpeech: 'adjective',
    definition: 'careful about spending money or using resources',
    synonyms: ['thrifty', 'economical', 'careful', 'sparing'],
    antonyms: ['wasteful', 'extravagant', 'lavish', 'spendthrift'],
    exampleSentence: 'Being frugal allowed her to save for college.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['money', 'hspt-frequent']
  },
  {
    id: 'v007',
    word: 'genuine',
    partOfSpeech: 'adjective',
    definition: 'truly what something is said to be; authentic',
    synonyms: ['authentic', 'real', 'true', 'sincere'],
    antonyms: ['fake', 'false', 'artificial', 'insincere'],
    exampleSentence: 'Her genuine concern for others made her popular.',
    difficulty: 'easy',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['character', 'hspt-frequent']
  },
  {
    id: 'v008',
    word: 'hostile',
    partOfSpeech: 'adjective',
    definition: 'unfriendly; showing opposition or dislike',
    synonyms: ['unfriendly', 'aggressive', 'antagonistic', 'unwelcoming'],
    antonyms: ['friendly', 'welcoming', 'warm', 'hospitable'],
    exampleSentence: 'The hostile environment made it hard to concentrate.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['emotions', 'hspt-frequent']
  },
  {
    id: 'v009',
    word: 'impartial',
    partOfSpeech: 'adjective',
    definition: 'treating all rivals or disputants equally; fair',
    synonyms: ['unbiased', 'fair', 'neutral', 'objective'],
    antonyms: ['biased', 'partial', 'prejudiced', 'unfair'],
    exampleSentence: 'A good judge must be impartial in all cases.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['justice', 'hspt-frequent']
  },
  {
    id: 'v010',
    word: 'jubilant',
    partOfSpeech: 'adjective',
    definition: 'feeling or expressing great happiness and triumph',
    synonyms: ['joyful', 'ecstatic', 'elated', 'thrilled'],
    antonyms: ['sad', 'depressed', 'miserable', 'dejected'],
    exampleSentence: 'The team was jubilant after winning the championship.',
    difficulty: 'medium',
    frequency: 'medium',
    dateAdded: Date.now(),
    tags: ['emotions', 'hspt-frequent']
  },
  {
    id: 'v011',
    word: 'keen',
    partOfSpeech: 'adjective',
    definition: 'having or showing eagerness or enthusiasm',
    synonyms: ['eager', 'enthusiastic', 'sharp', 'intense'],
    antonyms: ['indifferent', 'unenthusiastic', 'apathetic', 'dull'],
    exampleSentence: 'She has a keen interest in science.',
    difficulty: 'easy',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['character', 'hspt-frequent']
  },
  {
    id: 'v012',
    word: 'lethargic',
    partOfSpeech: 'adjective',
    definition: 'lacking energy; sluggish and drowsy',
    synonyms: ['sluggish', 'tired', 'drowsy', 'inactive'],
    antonyms: ['energetic', 'lively', 'active', 'vigorous'],
    exampleSentence: 'The hot weather made everyone feel lethargic.',
    difficulty: 'hard',
    frequency: 'medium',
    dateAdded: Date.now(),
    tags: ['health', 'hspt-frequent']
  },
  {
    id: 'v013',
    word: 'meticulous',
    partOfSpeech: 'adjective',
    definition: 'showing great attention to detail; very careful',
    synonyms: ['careful', 'precise', 'thorough', 'painstaking'],
    antonyms: ['careless', 'sloppy', 'negligent', 'hasty'],
    exampleSentence: 'The artist was meticulous in her brushwork.',
    difficulty: 'hard',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['character', 'hspt-frequent']
  },
  {
    id: 'v014',
    word: 'novel',
    partOfSpeech: 'adjective',
    definition: 'new and original; not like anything seen before',
    synonyms: ['new', 'original', 'fresh', 'innovative'],
    antonyms: ['old', 'familiar', 'common', 'traditional'],
    exampleSentence: 'The scientist proposed a novel solution to the problem.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['ideas', 'hspt-frequent']
  },
  {
    id: 'v015',
    word: 'obsolete',
    partOfSpeech: 'adjective',
    definition: 'no longer produced or used; out of date',
    synonyms: ['outdated', 'old-fashioned', 'antiquated', 'outmoded'],
    antonyms: ['modern', 'current', 'up-to-date', 'new'],
    exampleSentence: 'Typewriters have become obsolete in the digital age.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['technology', 'hspt-frequent']
  },
  {
    id: 'v016',
    word: 'prudent',
    partOfSpeech: 'adjective',
    definition: 'acting with or showing care for the future; wise',
    synonyms: ['wise', 'sensible', 'careful', 'cautious'],
    antonyms: ['reckless', 'foolish', 'careless', 'imprudent'],
    exampleSentence: 'It would be prudent to save money for emergencies.',
    difficulty: 'hard',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['wisdom', 'hspt-frequent']
  },
  {
    id: 'v017',
    word: 'quaint',
    partOfSpeech: 'adjective',
    definition: 'attractively unusual or old-fashioned',
    synonyms: ['charming', 'old-fashioned', 'picturesque', 'unique'],
    antonyms: ['modern', 'ordinary', 'plain', 'commonplace'],
    exampleSentence: 'The quaint village had cobblestone streets.',
    difficulty: 'medium',
    frequency: 'medium',
    dateAdded: Date.now(),
    tags: ['description', 'hspt-frequent']
  },
  {
    id: 'v018',
    word: 'resilient',
    partOfSpeech: 'adjective',
    definition: 'able to recover quickly from difficulties; tough',
    synonyms: ['tough', 'strong', 'adaptable', 'flexible'],
    antonyms: ['fragile', 'weak', 'delicate', 'vulnerable'],
    exampleSentence: 'Children are often more resilient than adults expect.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['character', 'hspt-frequent']
  },
  {
    id: 'v019',
    word: 'serene',
    partOfSpeech: 'adjective',
    definition: 'calm, peaceful, and untroubled',
    synonyms: ['calm', 'peaceful', 'tranquil', 'placid'],
    antonyms: ['agitated', 'anxious', 'turbulent', 'stormy'],
    exampleSentence: 'The lake was serene in the early morning.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['emotions', 'hspt-frequent']
  },
  {
    id: 'v020',
    word: 'tenacious',
    partOfSpeech: 'adjective',
    definition: 'holding firmly to something; persistent',
    synonyms: ['persistent', 'determined', 'stubborn', 'resolute'],
    antonyms: ['weak', 'yielding', 'irresolute', 'wavering'],
    exampleSentence: 'Her tenacious spirit helped her overcome obstacles.',
    difficulty: 'hard',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['character', 'hspt-frequent']
  },
  {
    id: 'v021',
    word: 'unanimous',
    partOfSpeech: 'adjective',
    definition: 'fully in agreement; united in opinion',
    synonyms: ['united', 'agreed', 'harmonious', 'undivided'],
    antonyms: ['divided', 'split', 'disagreeing', 'conflicting'],
    exampleSentence: 'The vote was unanimous in favor of the proposal.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['groups', 'hspt-frequent']
  },
  {
    id: 'v022',
    word: 'vivid',
    partOfSpeech: 'adjective',
    definition: 'producing powerful feelings or strong, clear images in the mind',
    synonyms: ['bright', 'colorful', 'striking', 'intense'],
    antonyms: ['dull', 'faded', 'dim', 'pale'],
    exampleSentence: 'She has vivid memories of her childhood.',
    difficulty: 'easy',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['description', 'hspt-frequent']
  },
  {
    id: 'v023',
    word: 'wary',
    partOfSpeech: 'adjective',
    definition: 'feeling or showing caution about possible dangers',
    synonyms: ['cautious', 'careful', 'watchful', 'alert'],
    antonyms: ['careless', 'reckless', 'unwary', 'trusting'],
    exampleSentence: 'Be wary of strangers who ask for personal information.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['caution', 'hspt-frequent']
  },
  {
    id: 'v024',
    word: 'zealous',
    partOfSpeech: 'adjective',
    definition: 'having or showing great energy or enthusiasm',
    synonyms: ['enthusiastic', 'passionate', 'eager', 'fervent'],
    antonyms: ['apathetic', 'indifferent', 'unenthusiastic', 'passive'],
    exampleSentence: 'The zealous volunteer worked long hours.',
    difficulty: 'hard',
    frequency: 'medium',
    dateAdded: Date.now(),
    tags: ['character', 'hspt-frequent']
  },
  // Verbs
  {
    id: 'v025',
    word: 'abolish',
    partOfSpeech: 'verb',
    definition: 'to formally put an end to; to do away with',
    synonyms: ['eliminate', 'end', 'cancel', 'annul'],
    antonyms: ['establish', 'create', 'institute', 'maintain'],
    exampleSentence: 'The law was passed to abolish unfair practices.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['law', 'hspt-frequent']
  },
  {
    id: 'v026',
    word: 'comprehend',
    partOfSpeech: 'verb',
    definition: 'to understand fully; to grasp mentally',
    synonyms: ['understand', 'grasp', 'fathom', 'perceive'],
    antonyms: ['misunderstand', 'confuse', 'overlook', 'miss'],
    exampleSentence: 'It took time to comprehend the complex theory.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['learning', 'hspt-frequent']
  },
  {
    id: 'v027',
    word: 'diminish',
    partOfSpeech: 'verb',
    definition: 'to make or become less; to reduce',
    synonyms: ['decrease', 'lessen', 'reduce', 'shrink'],
    antonyms: ['increase', 'grow', 'enlarge', 'expand'],
    exampleSentence: 'The storm began to diminish by evening.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['change', 'hspt-frequent']
  },
  {
    id: 'v028',
    word: 'enhance',
    partOfSpeech: 'verb',
    definition: 'to intensify, increase, or improve the quality of',
    synonyms: ['improve', 'boost', 'strengthen', 'heighten'],
    antonyms: ['diminish', 'weaken', 'reduce', 'lessen'],
    exampleSentence: 'The new lighting enhanced the room\'s appearance.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['improvement', 'hspt-frequent']
  },
  {
    id: 'v029',
    word: 'flourish',
    partOfSpeech: 'verb',
    definition: 'to grow or develop in a healthy or vigorous way',
    synonyms: ['thrive', 'prosper', 'bloom', 'succeed'],
    antonyms: ['decline', 'wither', 'fail', 'struggle'],
    exampleSentence: 'Plants flourish in the right conditions.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['growth', 'hspt-frequent']
  },
  {
    id: 'v030',
    word: 'hinder',
    partOfSpeech: 'verb',
    definition: 'to make it difficult for something to happen or progress',
    synonyms: ['obstruct', 'impede', 'block', 'delay'],
    antonyms: ['help', 'assist', 'aid', 'facilitate'],
    exampleSentence: 'Bad weather hindered the rescue efforts.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['obstacles', 'hspt-frequent']
  },
  // Nouns
  {
    id: 'v031',
    word: 'adversity',
    partOfSpeech: 'noun',
    definition: 'difficulties or misfortune',
    synonyms: ['hardship', 'difficulty', 'misfortune', 'trouble'],
    antonyms: ['prosperity', 'fortune', 'success', 'luck'],
    exampleSentence: 'She faced adversity with courage.',
    difficulty: 'hard',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['life', 'hspt-frequent']
  },
  {
    id: 'v032',
    word: 'consensus',
    partOfSpeech: 'noun',
    definition: 'general agreement among a group',
    synonyms: ['agreement', 'accord', 'harmony', 'unity'],
    antonyms: ['disagreement', 'discord', 'dissent', 'conflict'],
    exampleSentence: 'The committee reached a consensus on the budget.',
    difficulty: 'hard',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['groups', 'hspt-frequent']
  },
  {
    id: 'v033',
    word: 'diversity',
    partOfSpeech: 'noun',
    definition: 'the state of being varied or different',
    synonyms: ['variety', 'difference', 'range', 'assortment'],
    antonyms: ['uniformity', 'sameness', 'similarity', 'homogeneity'],
    exampleSentence: 'The school celebrates diversity in its community.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['society', 'hspt-frequent']
  },
  {
    id: 'v034',
    word: 'integrity',
    partOfSpeech: 'noun',
    definition: 'the quality of being honest and having strong moral principles',
    synonyms: ['honesty', 'honor', 'morality', 'virtue'],
    antonyms: ['dishonesty', 'corruption', 'deceit', 'immorality'],
    exampleSentence: 'A person of integrity always tells the truth.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['character', 'hspt-frequent']
  },
  {
    id: 'v035',
    word: 'perseverance',
    partOfSpeech: 'noun',
    definition: 'persistence in doing something despite difficulty',
    synonyms: ['persistence', 'determination', 'tenacity', 'dedication'],
    antonyms: ['weakness', 'giving up', 'quitting', 'surrender'],
    exampleSentence: 'Success requires talent and perseverance.',
    difficulty: 'hard',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['character', 'hspt-frequent']
  },
  // Additional words for variety
  {
    id: 'v036',
    word: 'ambiguous',
    partOfSpeech: 'adjective',
    definition: 'open to more than one interpretation; unclear',
    synonyms: ['unclear', 'vague', 'uncertain', 'doubtful'],
    antonyms: ['clear', 'definite', 'certain', 'unambiguous'],
    exampleSentence: 'The instructions were ambiguous and confusing.',
    difficulty: 'hard',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['communication', 'hspt-frequent']
  },
  {
    id: 'v037',
    word: 'tedious',
    partOfSpeech: 'adjective',
    definition: 'too long, slow, or dull; tiresome',
    synonyms: ['boring', 'dull', 'monotonous', 'tiresome'],
    antonyms: ['exciting', 'interesting', 'engaging', 'stimulating'],
    exampleSentence: 'The tedious lecture put many students to sleep.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['description', 'hspt-frequent']
  },
  {
    id: 'v038',
    word: 'trivial',
    partOfSpeech: 'adjective',
    definition: 'of little value or importance',
    synonyms: ['unimportant', 'minor', 'insignificant', 'petty'],
    antonyms: ['important', 'significant', 'major', 'crucial'],
    exampleSentence: 'Don\'t waste time on trivial matters.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['value', 'hspt-frequent']
  },
  {
    id: 'v039',
    word: 'candid',
    partOfSpeech: 'adjective',
    definition: 'truthful and straightforward; frank',
    synonyms: ['honest', 'frank', 'direct', 'open'],
    antonyms: ['dishonest', 'evasive', 'secretive', 'deceptive'],
    exampleSentence: 'I appreciate your candid feedback.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['character', 'hspt-frequent']
  },
  {
    id: 'v040',
    word: 'skeptical',
    partOfSpeech: 'adjective',
    definition: 'not easily convinced; having doubts',
    synonyms: ['doubtful', 'questioning', 'unconvinced', 'dubious'],
    antonyms: ['trusting', 'gullible', 'believing', 'credulous'],
    exampleSentence: 'Scientists are skeptical of claims without evidence.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['thinking', 'hspt-frequent']
  },
  {
    id: 'v041',
    word: 'elaborate',
    partOfSpeech: 'adjective',
    definition: 'involving many carefully arranged parts; detailed',
    synonyms: ['detailed', 'complex', 'intricate', 'ornate'],
    antonyms: ['simple', 'plain', 'basic', 'minimal'],
    exampleSentence: 'The wedding had an elaborate decoration theme.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['description', 'hspt-frequent']
  },
  {
    id: 'v042',
    word: 'obscure',
    partOfSpeech: 'adjective',
    definition: 'not clearly expressed or easily understood; unknown',
    synonyms: ['unclear', 'vague', 'unknown', 'hidden'],
    antonyms: ['clear', 'obvious', 'famous', 'well-known'],
    exampleSentence: 'The meaning of the ancient text was obscure.',
    difficulty: 'hard',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['understanding', 'hspt-frequent']
  },
  {
    id: 'v043',
    word: 'apathy',
    partOfSpeech: 'noun',
    definition: 'lack of interest, enthusiasm, or concern',
    synonyms: ['indifference', 'unconcern', 'disinterest', 'passivity'],
    antonyms: ['enthusiasm', 'interest', 'passion', 'concern'],
    exampleSentence: 'Voter apathy led to low election turnout.',
    difficulty: 'hard',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['emotions', 'hspt-frequent']
  },
  {
    id: 'v044',
    word: 'fluctuate',
    partOfSpeech: 'verb',
    definition: 'to rise and fall irregularly; to vary',
    synonyms: ['vary', 'change', 'waver', 'oscillate'],
    antonyms: ['stabilize', 'steady', 'remain', 'stay'],
    exampleSentence: 'Prices fluctuate based on supply and demand.',
    difficulty: 'hard',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['change', 'hspt-frequent']
  },
  {
    id: 'v045',
    word: 'accumulate',
    partOfSpeech: 'verb',
    definition: 'to gather or collect over time',
    synonyms: ['gather', 'collect', 'amass', 'build up'],
    antonyms: ['disperse', 'scatter', 'distribute', 'spend'],
    exampleSentence: 'Snow began to accumulate on the sidewalk.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['process', 'hspt-frequent']
  },
  {
    id: 'v046',
    word: 'reluctant',
    partOfSpeech: 'adjective',
    definition: 'unwilling and hesitant; disinclined',
    synonyms: ['unwilling', 'hesitant', 'resistant', 'opposed'],
    antonyms: ['willing', 'eager', 'enthusiastic', 'ready'],
    exampleSentence: 'He was reluctant to share his opinion.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['emotions', 'hspt-frequent']
  },
  {
    id: 'v047',
    word: 'vulnerable',
    partOfSpeech: 'adjective',
    definition: 'exposed to the possibility of being harmed',
    synonyms: ['exposed', 'susceptible', 'defenseless', 'weak'],
    antonyms: ['protected', 'secure', 'safe', 'strong'],
    exampleSentence: 'Young children are vulnerable to illness.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['condition', 'hspt-frequent']
  },
  {
    id: 'v048',
    word: 'compatible',
    partOfSpeech: 'adjective',
    definition: 'able to exist or occur together without conflict',
    synonyms: ['harmonious', 'suitable', 'matching', 'consistent'],
    antonyms: ['incompatible', 'conflicting', 'unsuitable', 'clashing'],
    exampleSentence: 'The software is compatible with most computers.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['relationships', 'hspt-frequent']
  },
  {
    id: 'v049',
    word: 'inevitable',
    partOfSpeech: 'adjective',
    definition: 'certain to happen; unavoidable',
    synonyms: ['unavoidable', 'certain', 'sure', 'inescapable'],
    antonyms: ['avoidable', 'uncertain', 'preventable', 'doubtful'],
    exampleSentence: 'Change is inevitable in any organization.',
    difficulty: 'medium',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['certainty', 'hspt-frequent']
  },
  {
    id: 'v050',
    word: 'profound',
    partOfSpeech: 'adjective',
    definition: 'very great or intense; having deep meaning',
    synonyms: ['deep', 'intense', 'significant', 'meaningful'],
    antonyms: ['shallow', 'superficial', 'trivial', 'slight'],
    exampleSentence: 'The book had a profound effect on readers.',
    difficulty: 'hard',
    frequency: 'high',
    dateAdded: Date.now(),
    tags: ['depth', 'hspt-frequent']
  }
];

// Get vocabulary bank (from localStorage or default)
export function getVocabularyBank(): VocabularyWord[] {
  const stored = localStorage.getItem(VOCAB_STORAGE_KEYS.WORDS);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with default bank
  localStorage.setItem(VOCAB_STORAGE_KEYS.WORDS, JSON.stringify(defaultVocabularyBank));
  return defaultVocabularyBank;
}

// Save vocabulary bank
export function saveVocabularyBank(words: VocabularyWord[]): void {
  localStorage.setItem(VOCAB_STORAGE_KEYS.WORDS, JSON.stringify(words));
}

// Add a new word
export function addVocabularyWord(word: Omit<VocabularyWord, 'id' | 'dateAdded'>): VocabularyWord | null {
  const bank = getVocabularyBank();
  
  // Check for duplicates
  const isDuplicate = bank.some(w => 
    w.word.toLowerCase() === word.word.toLowerCase()
  );
  
  if (isDuplicate) return null;
  
  const newWord: VocabularyWord = {
    ...word,
    id: generateVocabId(),
    dateAdded: Date.now()
  };
  
  bank.push(newWord);
  saveVocabularyBank(bank);
  return newWord;
}

// Bulk add words
export function bulkAddVocabularyWords(words: Omit<VocabularyWord, 'id' | 'dateAdded'>[]): { added: number; duplicates: number } {
  const bank = getVocabularyBank();
  let added = 0;
  let duplicates = 0;
  
  words.forEach(word => {
    const isDuplicate = bank.some(w => 
      w.word.toLowerCase() === word.word.toLowerCase()
    );
    
    if (isDuplicate) {
      duplicates++;
    } else {
      bank.push({
        ...word,
        id: generateVocabId(),
        dateAdded: Date.now()
      });
      added++;
    }
  });
  
  saveVocabularyBank(bank);
  return { added, duplicates };
}

// Delete a word
export function deleteVocabularyWord(wordId: string): boolean {
  const bank = getVocabularyBank();
  const index = bank.findIndex(w => w.id === wordId);
  
  if (index === -1) return false;
  
  bank.splice(index, 1);
  saveVocabularyBank(bank);
  return true;
}

// Update a word
export function updateVocabularyWord(wordId: string, updates: Partial<VocabularyWord>): VocabularyWord | null {
  const bank = getVocabularyBank();
  const index = bank.findIndex(w => w.id === wordId);
  
  if (index === -1) return null;
  
  bank[index] = { ...bank[index], ...updates };
  saveVocabularyBank(bank);
  return bank[index];
}

// Get words by difficulty
export function getWordsByDifficulty(difficulty: VocabularyWord['difficulty']): VocabularyWord[] {
  return getVocabularyBank().filter(w => w.difficulty === difficulty);
}

// Get words by frequency
export function getWordsByFrequency(frequency: 'high' | 'medium' | 'low'): VocabularyWord[] {
  return getVocabularyBank().filter(w => w.frequency === frequency);
}
