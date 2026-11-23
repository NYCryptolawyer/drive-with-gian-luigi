import { CHAPTERS } from '../src/data/chapters.ts';
import { ROAD_SIGNS_BY_ID } from '../src/data/signs.ts';
import { GLOSSARY_BY_ID } from '../src/data/glossary.ts';
import { CH04_QUESTIONS } from '../src/data/questions/ch04.ts';
import { CH05_QUESTIONS } from '../src/data/questions/ch05.ts';
import { CH06_QUESTIONS } from '../src/data/questions/ch06.ts';
import { CH07_QUESTIONS } from '../src/data/questions/ch07.ts';
import { CH08_QUESTIONS } from '../src/data/questions/ch08.ts';
import { CH09_QUESTIONS } from '../src/data/questions/ch09.ts';
import { CH10_QUESTIONS } from '../src/data/questions/ch10.ts';
import { CH11_QUESTIONS } from '../src/data/questions/ch11.ts';

const ALL_QUESTIONS = [
  ...CH04_QUESTIONS,
  ...CH05_QUESTIONS,
  ...CH06_QUESTIONS,
  ...CH07_QUESTIONS,
  ...CH08_QUESTIONS,
  ...CH09_QUESTIONS,
  ...CH10_QUESTIONS,
  ...CH11_QUESTIONS,
];

const errors = [];

// 1. Check Chapters (Ch 4..11)
const expectedChapters = ['ch04', 'ch05', 'ch06', 'ch07', 'ch08', 'ch09', 'ch10', 'ch11'];
const chapterIds = new Set(CHAPTERS.map((c) => c.id));
for (const expected of expectedChapters) {
  if (!chapterIds.has(expected)) {
    errors.push(`Missing expected chapter: ${expected}`);
  }
}

// 2. Check overall counts
if (ALL_QUESTIONS.length < 75) {
  errors.push(`Expected at least 75 total questions, found ${ALL_QUESTIONS.length}`);
}

const signQuestions = ALL_QUESTIONS.filter((q) => q.isRoadSign);
if (signQuestions.length < 14) {
  errors.push(`Expected at least 14 road sign questions, found ${signQuestions.length}`);
}

// 3. Per-question integrity
const seenIds = new Set();
const perChapterCounts = Object.fromEntries(expectedChapters.map((c) => [c, 0]));

for (const q of ALL_QUESTIONS) {
  if (!q.id || seenIds.has(q.id)) {
    errors.push(`Duplicate or missing question id: ${q.id}`);
  }
  seenIds.add(q.id);

  if (!chapterIds.has(q.chapterId)) {
    errors.push(`Question ${q.id} references unknown chapterId: ${q.chapterId}`);
  } else {
    perChapterCounts[q.chapterId] = (perChapterCounts[q.chapterId] || 0) + 1;
  }

  if (!q.promptEn.trim() || !q.promptPt.trim()) {
    errors.push(`Question ${q.id} has empty promptEn or promptPt`);
  }

  if (!q.explanationEn.trim() || !q.explanationPt.trim()) {
    errors.push(`Question ${q.id} has empty explanationEn or explanationPt`);
  }

  if (!q.manualRef.trim()) {
    errors.push(`Question ${q.id} missing manualRef`);
  }

  if (q.isRoadSign) {
    if (!q.signId || !(q.signId in ROAD_SIGNS_BY_ID)) {
      errors.push(`Road sign question ${q.id} has invalid signId: ${q.signId}`);
    }
  }

  if (!Array.isArray(q.choices) || q.choices.length !== 4) {
    errors.push(`Question ${q.id} must have exactly 4 choices`);
  } else {
    const choiceIds = q.choices.map((c) => c.id).sort().join('');
    if (choiceIds !== 'ABCD') {
      errors.push(`Question ${q.id} choices must be A, B, C, D (got ${choiceIds})`);
    }
    if (!['A', 'B', 'C', 'D'].includes(q.correctChoiceId)) {
      errors.push(`Question ${q.id} has invalid correctChoiceId: ${q.correctChoiceId}`);
    }
    for (const c of q.choices) {
      if (!c.textEn.trim() || !c.textPt.trim()) {
        errors.push(`Question ${q.id} choice ${c.id} has empty textEn or textPt`);
      }
    }
  }

  for (const termId of q.glossaryTerms ?? []) {
    if (!(termId in GLOSSARY_BY_ID)) {
      errors.push(`Question ${q.id} references unknown glossary term: "${termId}"`);
    }
  }
}

for (const ch of expectedChapters) {
  if ((perChapterCounts[ch] || 0) < 8) {
    errors.push(`Chapter ${ch} has fewer than 8 questions (${perChapterCounts[ch]})`);
  }
}

console.log('=== Drive with Gian-Luigi — Content Verification ===');
console.log(`Chapters: ${CHAPTERS.length}`);
console.log(`Total questions: ${ALL_QUESTIONS.length}`);
console.log(`Road sign questions: ${signQuestions.length}`);
console.log('Questions per chapter:', perChapterCounts);

if (errors.length > 0) {
  console.error(`\nFAILED with ${errors.length} error(s):`);
  for (const err of errors) {
    console.error(` - ${err}`);
  }
  process.exit(1);
}

console.log('\nPASSED: 0 errors across all chapters, signs, choices, and glossary links.');
