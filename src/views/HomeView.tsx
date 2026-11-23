import React from 'react';
import {
  Award,
  Car,
  ClipboardCheck,
  OctagonAlert,
  Play,
  Sparkles,
  Star,
  Wrench,
} from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { ROAD_SIGNS } from '../data/signs';
import { ALL_QUESTIONS, getQuestionsByChapter } from '../data/questions';
import type { AppProgress, ComfortMode, NavTab } from '../types';
import { MASCOTS, MascotBubble } from '../components/MascotBubble';

interface HomeViewProps {
  progress: AppProgress;
  activeSpeechKey: string | null;
  onSelectMode: (mode: ComfortMode) => void;
  onStartChapter: (chapterId: string) => void;
  onStartGarage: () => void;
  onNavigate: (tab: NavTab) => void;
}

const COMFORT_MODES: {
  id: ComfortMode;
  badge: string;
  titleEn: string;
  titlePt: string;
  descEn: string;
  descPt: string;
  activeClass: string;
}[] = [
  {
    id: 'bridge',
    badge: '🌱 Start Here',
    titleEn: 'Bridge Mode (EN + PT)',
    titlePt: 'Modo Ponte (Português como apoio)',
    descEn: 'English questions with a one-click Portuguese toggle & bilingual explanations.',
    descPt: 'Perguntas em inglês com botão "Ver em Português" e explicações nos dois idiomas.',
    activeClass: 'border-[#2E9E6B] bg-[#DCFCE7]/55 shadow-sm',
  },
  {
    id: 'confidence',
    badge: '⭐ Next Step',
    titleEn: 'Confidence Mode (Guided EN)',
    titlePt: 'Modo Confiança (Inglês Guiado)',
    descEn: 'Pure English prompts with clickable lavender word cards & watch-out highlights.',
    descPt: 'Treino em inglês com cards clicáveis nas palavras difíceis e destaques de atenção.',
    activeClass: 'border-[#3B82F6] bg-[#E0EEFF]/60 shadow-sm',
  },
  {
    id: 'exam',
    badge: '🗽 Test Ready',
    titleEn: 'Exam Readiness Mode',
    titlePt: 'Modo Prova Real (Sem Dicas)',
    descEn: 'Clean English-only prompts just like the official NY DMV screen.',
    descPt: 'Simula a tela oficial em inglês, sem traduções nem destaques.',
    activeClass: 'border-[#F59E0B] bg-[#FEF3C7]/65 shadow-sm',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  activeSpeechKey,
  onSelectMode,
  onStartChapter,
  onStartGarage,
  onNavigate,
}) => {
  const garageIds = Object.keys(progress.reviewGarage);
  const totalQuestions = ALL_QUESTIONS.length;
  const masteredCount = progress.masteredQuestionIds.length;
  const masteredPct = Math.round((masteredCount / totalQuestions) * 100);
  const passedExams = progress.examHistory.filter((e) => e.passed).length;

  const welcomeEn =
    'Olá, Cleopatras! I am Gian-Luigi, your Hudson Valley co-pilot. Take a deep breath—we will master the New York permit test together, step by step.';
  const welcomePt =
    'Olá, Cleopatras! Eu sou o Gian-Luigi, seu copiloto no Hudson Valley. Sem pressa e sem pressão — vamos dominar a prova teórica de Nova York juntos, passo a passo!';

  return (
    <div className="space-y-8">
      {/* Warm Personalized Welcome + Test Readiness Meter */}
      <section className="rounded-3xl bg-gradient-to-br from-[#FEF3C7]/75 via-white to-[#E0EEFF]/70 border border-[#EAE2D3] p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#F59E0B]/35 text-xs font-extrabold text-[#B45309]">
              <Sparkles className="w-3.5 h-3.5" />
              Hudson Valley Road Trip • NYS Class D Permit
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#233044] leading-tight">
              Ready for a calm drive, Cleopatras?
            </h1>

            <MascotBubble
              mascot="gianluigi"
              mood="happy"
              size="lg"
              messageEn={welcomeEn}
              messagePt={welcomePt}
              showPt={progress.comfortMode !== 'exam'}
              clipIdEn="welcome-en"
              clipIdPt="welcome-pt"
              activeSpeechKey={activeSpeechKey}
              playbackRate={progress.playbackRate}
            />
          </div>

          {/* Driver's Passport / Readiness Card */}
          <div className="lg:w-76 bg-white/95 rounded-2xl border border-[#EAE2D3] p-4 shadow-xs space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-[#233044] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#F59E0B]" />
                Driver’s Passport
              </span>
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D]">
                {masteredPct}% Ready
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#5A677B] mb-1">
                <span>Questions Mastered</span>
                <span>
                  {masteredCount} / {totalQuestions}
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-[#EAE2D3]/60 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#2E9E6B] transition-all duration-500"
                  style={{ width: `${masteredPct}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="rounded-xl bg-[#FEF3C7]/60 p-2">
                <div className="font-display font-bold text-lg text-[#B45309]">
                  {progress.masteredSignIds.length}/{ROAD_SIGNS.length}
                </div>
                <div className="text-[11px] font-bold text-[#5A677B]">Signs</div>
              </div>
              <div className="rounded-xl bg-[#E0EEFF]/70 p-2">
                <div className="font-display font-bold text-lg text-[#1D4ED8]">{passedExams}</div>
                <div className="text-[11px] font-bold text-[#5A677B]">Exams Passed</div>
              </div>
              <div className="rounded-xl bg-[#FFE8E3]/70 p-2">
                <div className="font-display font-bold text-lg text-[#C2410C]">
                  {garageIds.length}
                </div>
                <div className="text-[11px] font-bold text-[#5A677B]">In Garage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comfort Mode Selector */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl font-bold text-[#233044]">
            1. Choose Your English Comfort Level
          </h2>
          <span className="text-xs font-semibold text-[#5A677B]">
            Switch anytime—Portuguese is always here when you want it!
          </span>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {COMFORT_MODES.map((m) => {
            const active = progress.comfortMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectMode(m.id)}
                className={`text-left rounded-2xl border-2 p-4 transition-all cursor-pointer ${
                  active
                    ? m.activeClass
                    : 'bg-white border-[#EAE2D3] hover:border-[#3B82F6]/40'
                }`}
              >
                <div className="text-xs font-extrabold uppercase tracking-wide text-[#5A677B] mb-1">
                  {m.badge}
                </div>
                <div className="font-display font-bold text-base text-[#233044]">{m.titleEn}</div>
                <div className="text-xs font-bold text-[#5B21B6] mt-0.5">{m.titlePt}</div>
                <p className="text-xs text-[#5A677B] mt-2 leading-relaxed">{m.descEn}</p>
                {m.id === 'bridge' && (
                  <p className="text-[11px] text-[#15803D] mt-1 leading-snug font-semibold">
                    🇧🇷 {m.descPt}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Quick Action Strip */}
      <section className="grid sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => onNavigate('exam')}
          className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#E0EEFF]/80 border border-[#3B82F6]/35 hover:bg-[#D5E7FF] transition-colors text-left cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#3B82F6] text-white flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="font-display font-bold text-base text-[#233044]">
              20-Q NY Exam Simulator
            </div>
            <div className="text-xs text-[#1D4ED8] font-bold">
              Pass 14/20 + at least 2/4 signs
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('signs')}
          className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FEF3C7]/80 border border-[#F59E0B]/40 hover:bg-[#FDE68A]/70 transition-colors text-left cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#F59E0B] text-white flex items-center justify-center shrink-0">
            <OctagonAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="font-display font-bold text-base text-[#233044]">
              Luma’s Road Sign Studio
            </div>
            <div className="text-xs text-[#B45309] font-bold">
              {ROAD_SIGNS.length} NY signs + Sign Blitz game
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={onStartGarage}
          disabled={garageIds.length === 0}
          className={`flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-colors ${
            garageIds.length > 0
              ? 'bg-[#FFE8E3]/85 border-[#EF6C57]/45 hover:bg-[#FFD8CF] cursor-pointer'
              : 'bg-white/70 border-[#EAE2D3] opacity-75 cursor-default'
          }`}
        >
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
              garageIds.length > 0 ? 'bg-[#EF6C57] text-white' : 'bg-[#EAE2D3] text-[#5A677B]'
            }`}
          >
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display font-bold text-base text-[#233044]">
              Extra Practice Garage
            </div>
            <div className="text-xs font-bold text-[#5A677B]">
              {garageIds.length > 0
                ? `${garageIds.length} question(s) queued to lock in`
                : 'Empty — no missed questions right now!'}
            </div>
          </div>
        </button>
      </section>

      {/* Hudson Valley Road Trip Map (8 Chapters: Ch 4..11) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#233044] flex items-center gap-2">
              <Car className="w-6 h-6 text-[#3B82F6]" />
              2. Hudson Valley Road Trip Map (Chapters 4–11)
            </h2>
            <p className="text-sm text-[#5A677B]">
              Every official tested chapter of the NYS Driver’s Manual, turned into 8 friendly stops.
            </p>
          </div>
        </div>

        <div className="relative space-y-4">
          {/* Decorative winding road line on desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-8 bottom-8 w-1.5 -translate-x-1/2 border-l-4 border-dashed border-[#F59E0B]/40 pointer-events-none"
          />

          <div className="grid md:grid-cols-2 gap-4 relative">
            {CHAPTERS.map((ch, idx) => {
              const chQuestions = getQuestionsByChapter(ch.id);
              const chMastered = chQuestions.filter((q) =>
                progress.masteredQuestionIds.includes(q.id)
              ).length;
              const pct = chQuestions.length
                ? Math.round((chMastered / chQuestions.length) * 100)
                : 0;
              const isCompleted = chQuestions.length > 0 && chMastered === chQuestions.length;
              const hostMeta = MASCOTS[ch.host];

              return (
                <div
                  key={ch.id}
                  className={`rounded-3xl bg-white border-2 ${ch.accentBorder} p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={hostMeta.images.happy}
                        alt={hostMeta.name}
                        className={`w-14 h-14 rounded-2xl object-cover border-2 shrink-0 ${hostMeta.ringClass}`}
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`text-[11px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full ${ch.accentBg} ${ch.accentText}`}
                          >
                            Stop {idx + 1} • Manual Ch. {ch.manualChapter}
                          </span>
                          {isCompleted && (
                            <span className="inline-flex items-center gap-0.5 text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D]">
                              <Star className="w-3 h-3 fill-current" /> Mastered
                            </span>
                          )}
                        </div>
                        <h3 className="font-display font-bold text-lg text-[#233044] mt-1">
                          {ch.stopNameEn}
                        </h3>
                        <p className="text-xs font-bold text-[#5B21B6]">🇧🇷 {ch.stopNamePt}</p>
                        <p className="text-xs text-[#5A677B] mt-1">{ch.subtitleEn}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#5A677B] mb-1">
                        <span>
                          Host: {hostMeta.name} • {chQuestions.length} questions
                        </span>
                        <span>
                          {chMastered}/{chQuestions.length} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#EAE2D3]/60 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#3B82F6] transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onStartChapter(ch.id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-[#FFFBF2] hover:bg-[#3B82F6] text-[#233044] hover:text-white border border-[#EAE2D3] hover:border-[#3B82F6] font-bold text-sm transition-colors cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      {chMastered > 0 && !isCompleted
                        ? 'Continue This Stop'
                        : isCompleted
                        ? 'Review This Stop'
                        : 'Start This Stop'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
