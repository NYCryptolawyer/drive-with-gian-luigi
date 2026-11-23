import type { Question } from '../../types';
import { CH04_QUESTIONS } from './ch04';
import { CH05_QUESTIONS } from './ch05';
import { CH06_QUESTIONS } from './ch06';
import { CH07_QUESTIONS } from './ch07';
import { CH08_QUESTIONS } from './ch08';
import { CH09_QUESTIONS } from './ch09';
import { CH10_QUESTIONS } from './ch10';
import { CH11_QUESTIONS } from './ch11';

export const ALL_QUESTIONS: Question[] = [
  ...CH04_QUESTIONS,
  ...CH05_QUESTIONS,
  ...CH06_QUESTIONS,
  ...CH07_QUESTIONS,
  ...CH08_QUESTIONS,
  ...CH09_QUESTIONS,
  ...CH10_QUESTIONS,
  ...CH11_QUESTIONS,
];

export const QUESTIONS_BY_ID: Record<string, Question> = Object.fromEntries(
  ALL_QUESTIONS.map((q) => [q.id, q])
);

export function getQuestionsByChapter(chapterId: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.chapterId === chapterId);
}
