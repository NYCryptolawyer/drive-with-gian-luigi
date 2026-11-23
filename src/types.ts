export type ComfortMode = 'bridge' | 'confidence' | 'exam';

export type MascotId = 'gianluigi' | 'luma' | 'tito' | 'mila';

export type MascotMood = 'happy' | 'cheering' | 'thinking';

export type ChoiceId = 'A' | 'B' | 'C' | 'D';

export type NavTab = 'home' | 'exam' | 'signs' | 'glossary';

export type SignCategory = 'regulatory' | 'warning' | 'work-zone' | 'guide';

export type RoadSignId =
  | 'stop'
  | 'yield'
  | 'wrong-way'
  | 'do-not-enter'
  | 'no-right-turn'
  | 'no-u-turn'
  | 'one-way'
  | 'speed-limit-55'
  | 'keep-right'
  | 'no-standing'
  | 'school-zone'
  | 'railroad-advance'
  | 'no-passing-zone'
  | 'deer-crossing'
  | 'slippery-when-wet'
  | 'merge'
  | 'divided-highway-begins'
  | 'winding-road'
  | 'signal-ahead'
  | 'pedestrian-crossing'
  | 'road-work-ahead'
  | 'hospital-service';

export interface GlossaryEntry {
  id: string;
  termEn: string;
  aliases?: string[];
  termPt: string;
  meaningEn: string;
  meaningPt: string;
  category:
    | 'road-rules'
    | 'signs-lines'
    | 'parking'
    | 'safety-weather'
    | 'laws-penalties';
  exampleEn: string;
}

export interface MetricConversion {
  imperial: string;
  metric: string;
  nyRuleEn: string;
  nyRulePt: string;
}

export interface RoadSign {
  id: RoadSignId;
  nameEn: string;
  namePt: string;
  category: SignCategory;
  shapeEn: string;
  shapePt: string;
  shapeRuleEn: string;
  shapeRulePt: string;
  meaningEn: string;
  meaningPt: string;
  nyTipEn?: string;
  nyTipPt?: string;
}

export interface ChapterInfo {
  id: string;
  manualChapter: number;
  stopNameEn: string;
  stopNamePt: string;
  subtitleEn: string;
  subtitlePt: string;
  host: MascotId;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  introEn: string;
  introPt: string;
}

export interface QuestionChoice {
  id: ChoiceId;
  textEn: string;
  textPt: string;
}

export interface NyRuleSwitch {
  titleEn: string;
  titlePt: string;
  noteEn: string;
  notePt: string;
}

export interface Question {
  id: string;
  chapterId: string;
  isRoadSign: boolean;
  signId?: RoadSignId;
  promptEn: string;
  promptPt: string;
  choices: QuestionChoice[];
  correctChoiceId: ChoiceId;
  explanationEn: string;
  explanationPt: string;
  glossaryTerms: string[];
  watchOutWords?: string[];
  nyRuleSwitch?: NyRuleSwitch;
  manualRef: string;
}

export interface ExamResult {
  id: string;
  date: string;
  totalCorrect: number;
  signCorrect: number;
  totalQuestions: number;
  signQuestions: number;
  passed: boolean;
  earlyStopped: boolean;
  reasonEn: string;
  reasonPt: string;
}

export interface AppProgress {
  comfortMode: ComfortMode;
  soundEffects: boolean;
  playbackRate: 1 | 0.85;
  masteredQuestionIds: string[];
  reviewGarage: Record<string, number>;
  masteredSignIds: string[];
  examHistory: ExamResult[];
}
