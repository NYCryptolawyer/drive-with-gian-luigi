import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Languages,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Square,
  Volume2,
} from 'lucide-react';
import { CHAPTERS_BY_ID } from '../data/chapters';
import { getQuestionsByChapter, QUESTIONS_BY_ID } from '../data/questions';
import type { ChoiceId, ComfortMode, Question } from '../types';
import { playChime, speak, stopSpeaking } from '../services/speech';
import { InteractiveText } from '../components/InteractiveText';
import { MascotBubble } from '../components/MascotBubble';
import { RoadSignSvg } from '../components/RoadSignSvg';

interface QuizViewProps {
  mode: ComfortMode;
  chapterId?: string;
  garageIds?: string[];
  isGarage: boolean;
  soundEffects: boolean;
  playbackRate: 1 | 0.85;
  activeSpeechKey: string | null;
  onChangePlaybackRate: (rate: 1 | 0.85) => void;
  onRecordAnswer: (questionId: string, isCorrect: boolean, isGarage: boolean) => void;
  onBackHome: () => void;
  onOpenNextChapter?: (nextChapterId: string) => void;
}

const NEXT_CHAPTER: Record<string, string> = {
  ch04: 'ch05',
  ch05: 'ch06',
  ch06: 'ch07',
  ch07: 'ch08',
  ch08: 'ch09',
  ch09: 'ch10',
  ch10: 'ch11',
};

export const QuizView: React.FC<QuizViewProps> = ({
  mode,
  chapterId,
  garageIds = [],
  isGarage,
  soundEffects,
  playbackRate,
  activeSpeechKey,
  onChangePlaybackRate,
  onRecordAnswer,
  onBackHome,
  onOpenNextChapter,
}) => {
  const [questions, setQuestions] = useState<Question[]>(() => {
    if (isGarage) {
      return garageIds.map((id) => QUESTIONS_BY_ID[id]).filter(Boolean);
    }
    return chapterId ? getQuestionsByChapter(chapterId) : [];
  });

  const [index, setIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<ChoiceId | null>(null);
  const [showPortuguese, setShowPortuguese] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [missedSessionIds, setMissedSessionIds] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  // Reset session when chapter changes
  useEffect(() => {
    stopSpeaking();
    const list = isGarage
      ? garageIds.map((id) => QUESTIONS_BY_ID[id]).filter(Boolean)
      : chapterId
      ? getQuestionsByChapter(chapterId)
      : [];
    setQuestions(list);
    setIndex(0);
    setSelectedChoice(null);
    setShowPortuguese(false);
    setCorrectCount(0);
    setMissedSessionIds([]);
    setCompleted(false);
  }, [chapterId, isGarage]);

  const currentQuestion = questions[index];
  const chapter = chapterId ? CHAPTERS_BY_ID[chapterId] : undefined;

  const handleSelectChoice = (choiceId: ChoiceId) => {
    if (!currentQuestion || selectedChoice !== null) return;
    setSelectedChoice(choiceId);
    const isCorrect = choiceId === currentQuestion.correctChoiceId;
    onRecordAnswer(currentQuestion.id, isCorrect, isGarage);

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      playChime('success', soundEffects);
      confetti({
        particleCount: 36,
        spread: 55,
        origin: { y: 0.72 },
        colors: ['#3B82F6', '#F59E0B', '#2E9E6B', '#EF6C57'],
      });
    } else {
      setMissedSessionIds((prev) => [...prev, currentQuestion.id]);
      playChime('gentle', soundEffects);
    }
  };

  const handleNext = () => {
    stopSpeaking();
    if (index + 1 >= questions.length) {
      setCompleted(true);
      playChime('celebrate', soundEffects);
      confetti({
        particleCount: 70,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#3B82F6', '#F59E0B', '#2E9E6B', '#7C5CFC'],
      });
      return;
    }
    setIndex((i) => i + 1);
    setSelectedChoice(null);
    setShowPortuguese(false);
  };

  // Keyboard shortcuts (A-D / 1-4 and Enter)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (completed || !currentQuestion) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      const keyMap: Record<string, ChoiceId> = {
        a: 'A',
        '1': 'A',
        b: 'B',
        '2': 'B',
        c: 'C',
        '3': 'C',
        d: 'D',
        '4': 'D',
      };
      const lower = e.key.toLowerCase();
      if (selectedChoice === null && lower in keyMap) {
        e.preventDefault();
        handleSelectChoice(keyMap[lower]);
      } else if (selectedChoice !== null && e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto rounded-3xl bg-white border border-[#EAE2D3] p-8 text-center space-y-4">
        <img
          src="./images/characters/gianluigi-cheering.png"
          alt="Gian-Luigi cheering"
          className="w-28 h-28 rounded-3xl mx-auto object-cover border-2 border-[#2E9E6B]/40"
        />
        <h2 className="font-display text-2xl font-bold text-[#233044]">
          Extra Practice Garage is Spotless!
        </h2>
        <p className="text-[#5A677B]">
          You don’t have any missed questions waiting for review right now, Cleopatras.
        </p>
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#3B82F6] text-white font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Road Trip Map
        </button>
      </div>
    );
  }

  if (completed) {
    const pct = Math.round((correctCount / questions.length) * 100);
    const nextChapterId = chapterId ? NEXT_CHAPTER[chapterId] : undefined;

    return (
      <div className="max-w-2xl mx-auto rounded-3xl bg-white border-2 border-[#2E9E6B]/40 p-6 sm:p-8 shadow-sm space-y-6">
        <MascotBubble
          mascot="gianluigi"
          mood="cheering"
          size="lg"
          messageEn={`Parabéns, Cleopatras! You finished ${
            isGarage ? 'your Garage tune-up' : chapter?.stopNameEn ?? 'this stop'
          } with ${correctCount} out of ${questions.length} (${pct}%)!`}
          messagePt={`Parabéns, Cleopatras! Você concluiu ${
            isGarage ? 'a revisão na Garagem' : chapter?.stopNamePt ?? 'esta etapa'
          } com ${correctCount} de ${questions.length} (${pct}%)!`}
          showPt={mode !== 'exam'}
          playbackRate={playbackRate}
          activeSpeechKey={activeSpeechKey}
        />

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-2xl bg-[#DCFCE7]/70 p-4">
            <div className="font-display text-3xl font-bold text-[#15803D]">
              {correctCount}/{questions.length}
            </div>
            <div className="text-xs font-bold text-[#5A677B] mt-1">Answered Correctly</div>
          </div>
          <div className="rounded-2xl bg-[#FEF3C7]/70 p-4">
            <div className="font-display text-3xl font-bold text-[#B45309]">
              {missedSessionIds.length}
            </div>
            <div className="text-xs font-bold text-[#5A677B] mt-1">
              Queued to Practice Again
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-between pt-2">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FFFBF2] border border-[#EAE2D3] text-[#233044] font-bold hover:bg-[#FEF3C7]/60 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Road Trip Map
          </button>

          <div className="flex flex-wrap gap-2.5">
            {missedSessionIds.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  const retryList = missedSessionIds
                    .map((id) => QUESTIONS_BY_ID[id])
                    .filter(Boolean);
                  setQuestions(retryList);
                  setIndex(0);
                  setSelectedChoice(null);
                  setShowPortuguese(false);
                  setCorrectCount(0);
                  setMissedSessionIds([]);
                  setCompleted(false);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FFE8E3] text-[#C2410C] font-bold hover:bg-[#FFD6CC] cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Retry {missedSessionIds.length} Missed Now
              </button>
            )}

            {nextChapterId && onOpenNextChapter && (
              <button
                type="button"
                onClick={() => onOpenNextChapter(nextChapterId)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#3B82F6] text-white font-bold hover:bg-[#2563EB] cursor-pointer"
              >
                Next Stop: {CHAPTERS_BY_ID[nextChapterId]?.stopNameEn}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const promptClipEn = `${currentQuestion.id}-prompt-en`;
  const promptClipPt = `${currentQuestion.id}-prompt-pt`;
  const expClipEn = `${currentQuestion.id}-exp-en`;
  const expClipPt = `${currentQuestion.id}-exp-pt`;
  const isSpeakingPromptEn = activeSpeechKey === promptClipEn;
  const isSpeakingPromptPt = activeSpeechKey === promptClipPt;

  const progressPct = Math.round(((index + (selectedChoice ? 1 : 0)) / questions.length) * 100);
  const isCorrect = selectedChoice === currentQuestion.correctChoiceId;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            stopSpeaking();
            onBackHome();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EAE2D3] text-sm font-bold text-[#5A677B] hover:text-[#233044] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Road Trip Map
        </button>

        <div className="text-center">
          <div className="font-display font-bold text-base text-[#233044]">
            {isGarage
              ? '🔧 Extra Practice Garage'
              : `Stop: ${chapter?.stopNameEn} (Ch. ${chapter?.manualChapter})`}
          </div>
          <div className="text-xs font-bold text-[#5A677B]">
            Question {index + 1} of {questions.length}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onChangePlaybackRate(playbackRate === 1 ? 0.85 : 1)}
          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-colors cursor-pointer ${
            playbackRate === 0.85
              ? 'bg-[#EDE9FE] border-[#7C5CFC] text-[#5B21B6]'
              : 'bg-white border-[#EAE2D3] text-[#5A677B]'
          }`}
          title="Toggle slower voice speed"
        >
          🐢 {playbackRate === 0.85 ? '0.85× Slow ON' : '1.0× Normal Speed'}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-2.5 rounded-full bg-[#EAE2D3]/65 overflow-hidden">
        <div
          className="h-full rounded-full bg-[#3B82F6] transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Intro banner on first question */}
      {index === 0 && chapter && (
        <MascotBubble
          mascot={chapter.host}
          mood="happy"
          size="sm"
          messageEn={chapter.introEn}
          messagePt={chapter.introPt}
          showPt={mode !== 'exam'}
          clipIdEn={`${chapter.id}-intro-en`}
          clipIdPt={`${chapter.id}-intro-pt`}
          playbackRate={playbackRate}
          activeSpeechKey={activeSpeechKey}
        />
      )}

      {/* Main Question Card */}
      <div className="rounded-3xl bg-white border border-[#EAE2D3] p-5 sm:p-7 shadow-sm space-y-5">
        {/* Audio & Portuguese Support Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#EAE2D3]/70">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                isSpeakingPromptEn
                  ? stopSpeaking()
                  : void speak({
                      clipId: promptClipEn,
                      text: currentQuestion.promptEn,
                      lang: 'en-US',
                      rate: playbackRate,
                    })
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                isSpeakingPromptEn
                  ? 'bg-[#3B82F6] text-white'
                  : 'bg-[#E0EEFF] text-[#1D4ED8] hover:bg-[#CFE4FF]'
              }`}
            >
              {isSpeakingPromptEn ? (
                <Square className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
              Listen (EN)
            </button>

            {mode === 'bridge' && (
              <button
                type="button"
                onClick={() =>
                  isSpeakingPromptPt
                    ? stopSpeaking()
                    : void speak({
                        clipId: promptClipPt,
                        text: currentQuestion.promptPt,
                        lang: 'pt-BR',
                        rate: playbackRate,
                      })
                }
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  isSpeakingPromptPt
                    ? 'bg-[#2E9E6B] text-white'
                    : 'bg-[#DCFCE7] text-[#15803D] hover:bg-[#C6F6D5]'
                }`}
              >
                {isSpeakingPromptPt ? (
                  <Square className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
                🇧🇷 Ouvir em Português
              </button>
            )}
          </div>

          {mode === 'bridge' && (
            <button
              type="button"
              onClick={() => setShowPortuguese((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold border transition-colors cursor-pointer ${
                showPortuguese
                  ? 'bg-[#EDE9FE] border-[#7C5CFC] text-[#5B21B6]'
                  : 'bg-[#FFFBF2] border-[#EAE2D3] text-[#5A677B] hover:border-[#7C5CFC]/50'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              {showPortuguese ? 'Ocultar Português' : 'Ver em Português'}
            </button>
          )}
        </div>

        {/* Road Sign Artwork (if applicable) */}
        {currentQuestion.isRoadSign && currentQuestion.signId && (
          <div className="flex justify-center py-3 rounded-2xl bg-[#FFFBF2] border border-[#EAE2D3]">
            <RoadSignSvg signId={currentQuestion.signId} size={142} hideLabel />
          </div>
        )}

        {/* Question Prompt */}
        <div className="space-y-2">
          <div className="text-lg sm:text-xl font-bold text-[#233044] leading-snug">
            <InteractiveText
              text={currentQuestion.promptEn}
              glossaryTermIds={currentQuestion.glossaryTerms}
              watchOutWords={currentQuestion.watchOutWords}
              highlightGlossary={mode !== 'exam'}
              highlightWatchOut={mode !== 'exam'}
              playbackRate={playbackRate}
            />
          </div>

          {mode !== 'exam' && currentQuestion.glossaryTerms.length > 0 && (
            <p className="text-xs font-semibold text-[#7C5CFC]">
              Tip: Click any dotted lavender word for Tito’s Portuguese Word Card!
            </p>
          )}

          {mode === 'bridge' && showPortuguese && (
            <p className="text-sm font-semibold text-[#5B21B6] bg-[#EDE9FE]/55 rounded-xl px-3.5 py-2 border border-[#7C5CFC]/25">
              🇧🇷 {currentQuestion.promptPt}
            </p>
          )}
        </div>

        {/* Choices */}
        <div className="space-y-2.5">
          {currentQuestion.choices.map((choice) => {
            const isSelected = selectedChoice === choice.id;
            const isAnswer = choice.id === currentQuestion.correctChoiceId;
            const answered = selectedChoice !== null;

            let cardStyle =
              'bg-[#FFFBF2]/70 border-[#EAE2D3] hover:border-[#3B82F6] hover:bg-[#E0EEFF]/35';
            let badgeStyle = 'bg-white border-[#EAE2D3] text-[#233044]';

            if (answered) {
              if (isAnswer) {
                cardStyle = 'bg-[#DCFCE7]/80 border-[#2E9E6B]';
                badgeStyle = 'bg-[#2E9E6B] border-[#2E9E6B] text-white';
              } else if (isSelected) {
                cardStyle = 'bg-[#FFE8E3]/80 border-[#EF6C57]';
                badgeStyle = 'bg-[#EF6C57] border-[#EF6C57] text-white';
              } else {
                cardStyle = 'bg-white/60 border-[#EAE2D3]/60 opacity-65';
              }
            }

            return (
              <button
                key={choice.id}
                type="button"
                disabled={answered}
                onClick={() => handleSelectChoice(choice.id)}
                className={`w-full text-left rounded-2xl border-2 p-3.5 sm:p-4 transition-all flex items-start gap-3 ${cardStyle} ${
                  answered ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center font-display font-bold text-sm shrink-0 ${badgeStyle}`}
                >
                  {choice.id}
                </span>
                <div className="flex-1 space-y-1">
                  <div className="text-[15px] font-bold text-[#233044] leading-snug">
                    {choice.textEn}
                  </div>
                  {mode === 'bridge' && (showPortuguese || answered) && (
                    <div className="text-xs font-semibold text-[#5A677B]">🇧🇷 {choice.textPt}</div>
                  )}
                </div>
                {answered && isAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-[#2E9E6B] shrink-0 mt-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Warm Feedback Card */}
        {selectedChoice !== null && (
          <div
            className={`rounded-2xl border-2 p-4 sm:p-5 space-y-4 ${
              isCorrect
                ? 'bg-[#DCFCE7]/55 border-[#2E9E6B]/50'
                : 'bg-[#FFE8E3]/65 border-[#EF6C57]/45'
            }`}
          >
            <div className="flex items-center gap-2 font-display font-bold text-lg text-[#233044]">
              <Sparkles
                className={`w-5 h-5 ${isCorrect ? 'text-[#2E9E6B]' : 'text-[#EF6C57]'}`}
              />
              {isCorrect
                ? 'Muito bem, Cleopatras! Great job!'
                : 'Quase lá, Cleopatras! Let’s lock this one in.'}
            </div>

            <MascotBubble
              mascot="gianluigi"
              mood={isCorrect ? 'cheering' : 'thinking'}
              size="sm"
              messageEn={currentQuestion.explanationEn}
              messagePt={currentQuestion.explanationPt}
              showPt={true}
              clipIdEn={expClipEn}
              clipIdPt={expClipPt}
              activeSpeechKey={activeSpeechKey}
              playbackRate={playbackRate}
            />

            {currentQuestion.nyRuleSwitch && (
              <div className="rounded-2xl bg-[#E0EEFF]/80 border border-[#3B82F6]/35 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-[#1D4ED8]">
                  <Lightbulb className="w-4 h-4" />
                  🇧🇷/🇪🇺 → 🗽 NY Rule Switch: {currentQuestion.nyRuleSwitch.titleEn}
                </div>
                <p className="text-sm text-[#233044] font-semibold leading-snug">
                  {currentQuestion.nyRuleSwitch.noteEn}
                </p>
                <p className="text-xs text-[#1E3A8A] leading-snug">
                  🇧🇷 {currentQuestion.nyRuleSwitch.notePt}
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 border border-[#EAE2D3] text-[#5A677B]">
                📖 {currentQuestion.manualRef}
              </span>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-sm shadow-xs cursor-pointer"
              >
                {index + 1 >= questions.length ? 'Finish Stop' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
