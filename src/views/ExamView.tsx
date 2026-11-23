import React, { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ClipboardCheck,
  Languages,
  RotateCcw,
  ShieldCheck,
  Volume2,
  Wrench,
  XCircle,
} from 'lucide-react';
import { ALL_QUESTIONS } from '../data/questions';
import type { ChoiceId, ExamResult, Question } from '../types';
import { MascotBubble } from '../components/MascotBubble';
import { RoadSignSvg } from '../components/RoadSignSvg';
import { playChime, speak, stopSpeaking } from '../services/speech';

interface ExamViewProps {
  examHistory: ExamResult[];
  soundEffects: boolean;
  playbackRate: 1 | 0.85;
  activeSpeechKey: string | null;
  onRecordExam: (result: ExamResult, correctIds: string[], missedIds: string[]) => void;
  onAddMissedToGarage: (questionIds: string[]) => void;
  onStartGarage: () => void;
}

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildNyExamQuestions(): Question[] {
  const signs = shuffleArray(ALL_QUESTIONS.filter((q) => q.isRoadSign)).slice(0, 4);
  const rules = shuffleArray(ALL_QUESTIONS.filter((q) => !q.isRoadSign)).slice(0, 16);
  return shuffleArray([...signs, ...rules]);
}

interface AnswerRecord {
  question: Question;
  selectedId: ChoiceId;
  isCorrect: boolean;
}

export const ExamView: React.FC<ExamViewProps> = ({
  examHistory,
  soundEffects,
  playbackRate,
  activeSpeechKey,
  onRecordExam,
  onAddMissedToGarage,
  onStartGarage,
}) => {
  const [stage, setStage] = useState<'setup' | 'running' | 'results'>('setup');
  const [earlyStopMode, setEarlyStopMode] = useState(false);
  const [allowAudioDuringExam, setAllowAudioDuringExam] = useState(true);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<ChoiceId | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [latestResult, setLatestResult] = useState<ExamResult | null>(null);
  const [showReviewPt, setShowReviewPt] = useState(true);
  const [garageSavedNotice, setGarageSavedNotice] = useState(false);

  const startExam = () => {
    stopSpeaking();
    const deck = buildNyExamQuestions();
    setExamQuestions(deck);
    setCurrentIdx(0);
    setSelectedChoice(null);
    setAnswers([]);
    setLatestResult(null);
    setGarageSavedNotice(false);
    setStage('running');
  };

  const finishExam = (finalAnswers: AnswerRecord[], earlyStopped: boolean) => {
    stopSpeaking();
    const totalCorrect = finalAnswers.filter((a) => a.isCorrect).length;
    const signAnswers = finalAnswers.filter((a) => a.question.isRoadSign);
    const signCorrect = signAnswers.filter((a) => a.isCorrect).length;
    const signWrong = signAnswers.filter((a) => !a.isCorrect).length;
    const totalWrong = finalAnswers.filter((a) => !a.isCorrect).length;

    const passed = totalCorrect >= 14 && signCorrect >= 2 && signWrong <= 2 && totalWrong <= 6;

    let reasonEn = passed
      ? 'You reached at least 14 correct answers overall AND at least 2 road signs right!'
      : signCorrect < 2
      ? 'NY requires at least 2 out of 4 road sign questions correct (even if your overall score is 14+).'
      : 'NY requires at least 14 out of 20 correct answers overall (at least 70%).';

    let reasonPt = passed
      ? 'Você alcançou pelo menos 14 acertos no total E acertou pelo menos 2 placas!'
      : signCorrect < 2
      ? 'Em NY é obrigatório acertar pelo menos 2 das 4 perguntas de placas (mesmo acertando 14+ no total).'
      : 'Em NY é necessário acertar pelo menos 14 das 20 questões (70%).';

    const result: ExamResult = {
      id: `exam-${Date.now()}`,
      date: new Date().toISOString(),
      totalCorrect,
      signCorrect,
      totalQuestions: finalAnswers.length,
      signQuestions: signAnswers.length,
      passed,
      earlyStopped,
      reasonEn,
      reasonPt,
    };

    const correctIds = finalAnswers.filter((a) => a.isCorrect).map((a) => a.question.id);
    const missedIds = finalAnswers.filter((a) => !a.isCorrect).map((a) => a.question.id);

    onRecordExam(result, correctIds, missedIds);
    setLatestResult(result);
    setStage('results');

    if (passed) {
      playChime('celebrate', soundEffects);
      confetti({
        particleCount: 95,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#F59E0B', '#2E9E6B', '#7C5CFC'],
      });
    } else {
      playChime('gentle', soundEffects);
    }
  };

  const handleConfirmChoice = () => {
    if (!selectedChoice) return;
    const q = examQuestions[currentIdx];
    const isCorrect = selectedChoice === q.correctChoiceId;
    const updated = [...answers, { question: q, selectedId: selectedChoice, isCorrect }];
    setAnswers(updated);
    setSelectedChoice(null);
    stopSpeaking();

    if (earlyStopMode) {
      const correctTotal = updated.filter((a) => a.isCorrect).length;
      const wrongTotal = updated.filter((a) => !a.isCorrect).length;
      const signCorrect = updated.filter((a) => a.question.isRoadSign && a.isCorrect).length;
      const signWrong = updated.filter((a) => a.question.isRoadSign && !a.isCorrect).length;
      const remainingSigns = examQuestions
        .slice(currentIdx + 1)
        .filter((rem) => rem.isRoadSign).length;

      const guaranteedPass = correctTotal >= 14 && signCorrect >= 2;
      const guaranteedFail =
        wrongTotal >= 7 || signWrong >= 3 || signCorrect + remainingSigns < 2;

      if (guaranteedPass || guaranteedFail) {
        finishExam(updated, true);
        return;
      }
    }

    if (currentIdx + 1 >= examQuestions.length) {
      finishExam(updated, false);
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  const missedRecords = useMemo(
    () => answers.filter((a) => !a.isCorrect),
    [answers]
  );

  if (stage === 'setup') {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="rounded-3xl bg-white border border-[#EAE2D3] p-6 sm:p-8 shadow-sm space-y-6">
          <MascotBubble
            mascot="gianluigi"
            mood="happy"
            size="lg"
            messageEn="Ready to test your NY DMV skills in English, Cleopatras? Let’s do a calm 20-question practice exam—just like the real DMV screen!"
            messagePt="Pronta para testar em inglês como na prova oficial? Este simulado segue exatamente as regras do DMV de NY: 20 questões, sem pressão!"
            clipIdEn="exam-intro-en"
            clipIdPt="exam-intro-pt"
            activeSpeechKey={activeSpeechKey}
            playbackRate={playbackRate}
          />

          {/* Official NY Rules Box */}
          <div className="rounded-2xl bg-[#E0EEFF]/65 border border-[#3B82F6]/35 p-4 grid sm:grid-cols-3 gap-3 text-center">
            <div className="bg-white/90 rounded-xl p-3">
              <div className="font-display text-2xl font-bold text-[#1D4ED8]">20</div>
              <div className="text-xs font-bold text-[#5A677B]">
                Total Questions (16 Rules + 4 Road Signs)
              </div>
            </div>
            <div className="bg-white/90 rounded-xl p-3">
              <div className="font-display text-2xl font-bold text-[#2E9E6B]">14 / 20</div>
              <div className="text-xs font-bold text-[#5A677B]">
                Minimum Overall Score (70%)
              </div>
            </div>
            <div className="bg-white/90 rounded-xl p-3">
              <div className="font-display text-2xl font-bold text-[#B45309]">2 / 4</div>
              <div className="text-xs font-bold text-[#5A677B]">
                Minimum Road Signs Correct
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="text-sm font-display font-bold text-[#233044]">
              Choose Exam Scoring Style
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEarlyStopMode(false)}
                className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                  !earlyStopMode
                    ? 'bg-[#DCFCE7]/55 border-[#2E9E6B]'
                    : 'bg-[#FFFBF2] border-[#EAE2D3]'
                }`}
              >
                <div className="font-display font-bold text-[#233044]">
                  Full 20 Questions (Recommended)
                </div>
                <p className="text-xs text-[#5A677B] mt-1">
                  Answer all 20 questions so you get the full practice & bilingual review at the end.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setEarlyStopMode(true)}
                className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                  earlyStopMode
                    ? 'bg-[#FEF3C7]/65 border-[#F59E0B]'
                    : 'bg-[#FFFBF2] border-[#EAE2D3]'
                }`}
              >
                <div className="font-display font-bold text-[#233044]">
                  Real DMV Early-Stop Mode
                </div>
                <p className="text-xs text-[#5A677B] mt-1">
                  Stops the moment pass (14+ right & 2+ signs) or fail (7 wrong or 3 wrong signs) is decided—just like the DMV!
                </p>
              </button>
            </div>

            <label className="flex items-center gap-2.5 text-sm font-semibold text-[#233044] pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={allowAudioDuringExam}
                onChange={(e) => setAllowAudioDuringExam(e.target.checked)}
                className="w-4 h-4 accent-[#3B82F6]"
              />
              Allow English Read-Aloud audio button during practice exam
            </label>
          </div>

          <button
            type="button"
            onClick={startExam}
            className="w-full py-3.5 rounded-2xl bg-[#3B82F6] hover:bg-[#2563EB] text-white font-display font-bold text-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <ClipboardCheck className="w-5 h-5" />
            Start 20-Question NY Practice Exam (English)
          </button>
        </div>

        {examHistory.length > 0 && (
          <div className="rounded-3xl bg-white border border-[#EAE2D3] p-5 space-y-3">
            <h3 className="font-display font-bold text-lg text-[#233044]">
              Recent Exam Passport Stamps
            </h3>
            <div className="space-y-2">
              {examHistory.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#FFFBF2] border border-[#EAE2D3] text-sm"
                >
                  <div className="flex items-center gap-2">
                    {item.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#2E9E6B]" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#EF6C57]" />
                    )}
                    <span className="font-bold text-[#233044]">
                      {item.passed ? 'PASSED' : 'Keep Practicing'} — {item.totalCorrect}/
                      {item.totalQuestions}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309]">
                      Signs: {item.signCorrect}/{item.signQuestions}
                    </span>
                  </div>
                  <span className="text-xs text-[#5A677B] font-semibold">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (stage === 'running') {
    const q = examQuestions[currentIdx];
    const pct = Math.round(((currentIdx + 1) / examQuestions.length) * 100);

    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] text-xs font-extrabold">
            <ShieldCheck className="w-4 h-4" />
            NY DMV English Simulator {q.isRoadSign ? '• Road Sign' : '• Rules'}
          </span>
          <span className="text-sm font-bold text-[#5A677B]">
            Question {currentIdx + 1} of {examQuestions.length}
          </span>
        </div>

        <div className="h-2.5 rounded-full bg-[#EAE2D3]/70 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#3B82F6] transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="rounded-3xl bg-white border border-[#EAE2D3] p-5 sm:p-7 shadow-sm space-y-5">
          {allowAudioDuringExam && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  void speak({
                    clipId: `${q.id}-prompt-en`,
                    text: q.promptEn,
                    lang: 'en-US',
                    rate: playbackRate,
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E0EEFF] text-[#1D4ED8] text-xs font-bold hover:bg-[#CFE4FF] cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Listen (EN)
              </button>
            </div>
          )}

          {q.isRoadSign && q.signId && (
            <div className="flex justify-center py-3 rounded-2xl bg-[#FFFBF2] border border-[#EAE2D3]">
              <RoadSignSvg signId={q.signId} size={142} hideLabel />
            </div>
          )}

          <h2 className="text-lg sm:text-xl font-bold text-[#233044] leading-snug">
            {q.promptEn}
          </h2>

          <div className="space-y-2.5">
            {q.choices.map((c) => {
              const active = selectedChoice === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedChoice(c.id)}
                  className={`w-full text-left rounded-2xl border-2 p-3.5 sm:p-4 transition-all flex items-start gap-3 cursor-pointer ${
                    active
                      ? 'bg-[#E0EEFF]/75 border-[#3B82F6]'
                      : 'bg-[#FFFBF2]/70 border-[#EAE2D3] hover:border-[#3B82F6]/50'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center font-display font-bold text-sm shrink-0 ${
                      active
                        ? 'bg-[#3B82F6] border-[#3B82F6] text-white'
                        : 'bg-white border-[#EAE2D3] text-[#233044]'
                    }`}
                  >
                    {c.id}
                  </span>
                  <span className="text-[15px] font-bold text-[#233044] leading-snug pt-0.5">
                    {c.textEn}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => {
                stopSpeaking();
                setStage('setup');
              }}
              className="text-xs font-bold text-[#5A677B] hover:text-[#233044] cursor-pointer"
            >
              Cancel Exam
            </button>

            <button
              type="button"
              disabled={!selectedChoice}
              onClick={handleConfirmChoice}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${
                selectedChoice
                  ? 'bg-[#3B82F6] hover:bg-[#2563EB] text-white cursor-pointer'
                  : 'bg-[#EAE2D3] text-[#5A677B] cursor-not-allowed'
              }`}
            >
              {currentIdx + 1 >= examQuestions.length ? 'Submit Answer & Finish' : 'Confirm & Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results & Bilingual Review
  if (!latestResult) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div
        className={`rounded-3xl border-2 p-6 sm:p-8 shadow-sm space-y-5 ${
          latestResult.passed
            ? 'bg-gradient-to-br from-[#DCFCE7]/80 to-white border-[#2E9E6B]/60'
            : 'bg-gradient-to-br from-[#FFE8E3]/80 to-white border-[#EF6C57]/50'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE2D3] text-xs font-extrabold text-[#233044]">
            <Award className="w-4 h-4 text-[#F59E0B]" />
            {latestResult.passed ? 'PASSPORT STAMP EARNED!' : 'PRACTICE RUN COMPLETE'}
            {latestResult.earlyStopped && ' (Early-Stop Triggered)'}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold ${
              latestResult.signCorrect >= 2
                ? 'bg-[#DCFCE7] text-[#15803D]'
                : 'bg-[#FFE8E3] text-[#C2410C]'
            }`}
          >
            Road Signs: {latestResult.signCorrect} / {latestResult.signQuestions}{' '}
            {latestResult.signCorrect >= 2 ? '✓' : '✗'}
          </span>
        </div>

        <MascotBubble
          mascot="gianluigi"
          mood={latestResult.passed ? 'cheering' : 'thinking'}
          size="lg"
          messageEn={
            latestResult.passed
              ? `Parabéns, Cleopatras! You passed with ${latestResult.totalCorrect}/${latestResult.totalQuestions} (${latestResult.signCorrect}/${latestResult.signQuestions} signs). ${latestResult.reasonEn}`
              : `Nice effort, Cleopatras! You scored ${latestResult.totalCorrect}/${latestResult.totalQuestions}. ${latestResult.reasonEn}`
          }
          messagePt={
            latestResult.passed
              ? `Você passou com ${latestResult.totalCorrect}/${latestResult.totalQuestions}! ${latestResult.reasonPt}`
              : `Bom treino! Você fez ${latestResult.totalCorrect}/${latestResult.totalQuestions}. ${latestResult.reasonPt}`
          }
          activeSpeechKey={activeSpeechKey}
          playbackRate={playbackRate}
        />

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={startExam}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#3B82F6] text-white font-bold text-sm hover:bg-[#2563EB] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Take Another Practice Exam
          </button>

          {missedRecords.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => {
                  onAddMissedToGarage(missedRecords.map((m) => m.question.id));
                  setGarageSavedNotice(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FFE8E3] text-[#C2410C] font-bold text-sm hover:bg-[#FFD6CC] cursor-pointer"
              >
                <Wrench className="w-4 h-4" />
                {garageSavedNotice
                  ? 'Saved in Extra Practice Garage!'
                  : `Send ${missedRecords.length} Missed to Garage`}
              </button>

              <button
                type="button"
                onClick={onStartGarage}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FEF3C7] text-[#B45309] font-bold text-sm hover:bg-[#FDE68A] cursor-pointer"
              >
                Practice Missed Now
              </button>
            </>
          )}
        </div>
      </div>

      {/* Question-by-Question Bilingual Review */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display font-bold text-xl text-[#233044]">
            Bilingual Answer Review
          </h3>
          <button
            type="button"
            onClick={() => setShowReviewPt((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EDE9FE] text-[#5B21B6] text-xs font-bold cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5" />
            {showReviewPt ? 'Hide Portuguese' : 'Show Portuguese'}
          </button>
        </div>

        {answers.map((rec, i) => {
          const correctChoice = rec.question.choices.find(
            (c) => c.id === rec.question.correctChoiceId
          );
          const selectedObj = rec.question.choices.find((c) => c.id === rec.selectedId);

          return (
            <div
              key={rec.question.id}
              className={`rounded-2xl bg-white border-2 p-4 space-y-2 ${
                rec.isCorrect ? 'border-[#2E9E6B]/35' : 'border-[#EF6C57]/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="font-bold text-sm text-[#233044]">
                  {i + 1}. {rec.question.promptEn}
                </div>
                <span
                  className={`shrink-0 text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                    rec.isCorrect
                      ? 'bg-[#DCFCE7] text-[#15803D]'
                      : 'bg-[#FFE8E3] text-[#C2410C]'
                  }`}
                >
                  {rec.isCorrect ? 'Correct ✓' : `You picked ${rec.selectedId}`}
                </span>
              </div>

              {rec.question.isRoadSign && rec.question.signId && (
                <div className="pt-1">
                  <RoadSignSvg signId={rec.question.signId} size={74} />
                </div>
              )}

              {!rec.isCorrect && selectedObj && (
                <p className="text-xs font-semibold text-[#C2410C]">
                  Your answer ({selectedObj.id}): {selectedObj.textEn}
                </p>
              )}

              <p className="text-xs font-bold text-[#15803D]">
                Correct answer ({correctChoice?.id}): {correctChoice?.textEn}
              </p>

              <p className="text-xs text-[#233044] leading-relaxed">
                {rec.question.explanationEn}
              </p>

              {showReviewPt && (
                <p className="text-xs text-[#5A677B] leading-relaxed">
                  🇧🇷 {rec.question.explanationPt}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
