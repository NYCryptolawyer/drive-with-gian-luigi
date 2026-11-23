import React, { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { Check, RotateCw, Sparkles, Volume2, Zap } from 'lucide-react';
import { ROAD_SIGNS } from '../data/signs';
import type { RoadSign, SignCategory } from '../types';
import { MascotBubble } from '../components/MascotBubble';
import { RoadSignSvg } from '../components/RoadSignSvg';
import { playChime, speak } from '../services/speech';

interface SignsViewProps {
  masteredSignIds: string[];
  soundEffects: boolean;
  playbackRate: 1 | 0.85;
  activeSpeechKey: string | null;
  onToggleMasteredSign: (signId: string) => void;
}

const CATEGORIES: { id: 'all' | SignCategory; labelEn: string; labelPt: string }[] = [
  { id: 'all', labelEn: 'All Signs', labelPt: 'Todas' },
  { id: 'regulatory', labelEn: 'Regulatory (Law)', labelPt: 'Regulamentares' },
  { id: 'warning', labelEn: 'Warning (Hazard)', labelPt: 'Advertência' },
  { id: 'work-zone', labelEn: 'Work Zone', labelPt: 'Obras' },
  { id: 'guide', labelEn: 'Services & Guide', labelPt: 'Serviços' },
];

interface BlitzItem {
  target: RoadSign;
  options: RoadSign[];
}

function buildBlitzRound(): BlitzItem[] {
  const shuffled = [...ROAD_SIGNS].sort(() => Math.random() - 0.5).slice(0, 8);
  return shuffled.map((target) => {
    const distractors = [...ROAD_SIGNS]
      .filter((s) => s.id !== target.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [target, ...distractors].sort(() => Math.random() - 0.5);
    return { target, options };
  });
}

export const SignsView: React.FC<SignsViewProps> = ({
  masteredSignIds,
  soundEffects,
  playbackRate,
  activeSpeechKey,
  onToggleMasteredSign,
}) => {
  const [subTab, setSubTab] = useState<'explore' | 'blitz'>('explore');
  const [category, setCategory] = useState<'all' | SignCategory>('all');
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  // Quick Sign Blitz mini-game
  const [blitzItems, setBlitzItems] = useState<BlitzItem[]>(buildBlitzRound);
  const [blitzIdx, setBlitzIdx] = useState(0);
  const [blitzScore, setBlitzScore] = useState(0);
  const [blitzPicked, setBlitzPicked] = useState<string | null>(null);
  const [blitzDone, setBlitzDone] = useState(false);

  const filteredSigns = useMemo(
    () =>
      category === 'all' ? ROAD_SIGNS : ROAD_SIGNS.filter((s) => s.category === category),
    [category]
  );

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const startNewBlitz = () => {
    setBlitzItems(buildBlitzRound());
    setBlitzIdx(0);
    setBlitzScore(0);
    setBlitzPicked(null);
    setBlitzDone(false);
  };

  const handleBlitzPick = (signId: string) => {
    if (blitzPicked !== null) return;
    setBlitzPicked(signId);
    const current = blitzItems[blitzIdx];
    const ok = signId === current.target.id;
    if (ok) {
      setBlitzScore((s) => s + 1);
      playChime('success', soundEffects);
    } else {
      playChime('gentle', soundEffects);
    }
  };

  const handleBlitzNext = () => {
    if (blitzIdx + 1 >= blitzItems.length) {
      setBlitzDone(true);
      playChime('celebrate', soundEffects);
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#F59E0B', '#3B82F6', '#2E9E6B'],
      });
    } else {
      setBlitzIdx((i) => i + 1);
      setBlitzPicked(null);
    }
  };

  return (
    <div className="space-y-6">
      <MascotBubble
        mascot="luma"
        mood="happy"
        size="md"
        messageEn="Welcome to the Road Sign Studio! In New York, sign SHAPES and COLORS give away the answer even when covered by winter snow. Click any sign card to flip it!"
        messagePt="Bem-vinda ao Estúdio de Placas! Em NY, o FORMATO e a COR já entregam o significado mesmo se a neve cobrir as letras. Clique em qualquer placa para virar o cartão!"
        clipIdEn="signs-intro-en"
        clipIdPt="signs-intro-pt"
        activeSpeechKey={activeSpeechKey}
        playbackRate={playbackRate}
      />

      {/* Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex bg-white p-1 rounded-2xl border border-[#EAE2D3]">
          <button
            type="button"
            onClick={() => setSubTab('explore')}
            className={`px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-colors ${
              subTab === 'explore'
                ? 'bg-[#F59E0B] text-white'
                : 'text-[#5A677B] hover:text-[#233044]'
            }`}
          >
            Explore & Flashcards ({masteredSignIds.length}/{ROAD_SIGNS.length})
          </button>
          <button
            type="button"
            onClick={() => setSubTab('blitz')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-colors ${
              subTab === 'blitz'
                ? 'bg-[#7C5CFC] text-white'
                : 'text-[#5A677B] hover:text-[#233044]'
            }`}
          >
            <Zap className="w-4 h-4" />
            Quick Sign Blitz (8 Signs)
          </button>
        </div>

        {subTab === 'explore' && (
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-colors ${
                  category === c.id
                    ? 'bg-[#233044] text-white border-[#233044]'
                    : 'bg-white text-[#5A677B] border-[#EAE2D3] hover:border-[#3B82F6]/40'
                }`}
              >
                {c.labelEn}
              </button>
            ))}
          </div>
        )}
      </div>

      {subTab === 'explore' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSigns.map((sign) => {
            const flipped = Boolean(flippedIds[sign.id]);
            const mastered = masteredSignIds.includes(sign.id);

            return (
              <div
                key={sign.id}
                className={`rounded-3xl border-2 p-4 bg-white transition-all flex flex-col justify-between gap-3 ${
                  mastered ? 'border-[#2E9E6B]/60' : 'border-[#EAE2D3]'
                }`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleFlip(sign.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlip(sign.id);
                    }
                  }}
                  className="cursor-pointer space-y-3"
                >
                  {!flipped ? (
                    <div className="py-4 rounded-2xl bg-[#FFFBF2] border border-[#EAE2D3] flex flex-col items-center justify-center gap-2.5 min-h-48">
                      <RoadSignSvg signId={sign.id} size={118} label={sign.nameEn} />
                      <div className="text-center px-2">
                        <div className="font-display font-bold text-base text-[#233044]">
                          {sign.nameEn}
                        </div>
                        <div className="text-xs font-bold text-[#5B21B6]">🇧🇷 {sign.namePt}</div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5A677B]">
                        <RotateCw className="w-3 h-3" /> Tap card to see shape rule & meaning
                      </span>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-[#FEF3C7]/45 border border-[#F59E0B]/35 space-y-2 min-h-48">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#B45309]">
                          {sign.shapeEn}
                        </span>
                        <RotateCw className="w-3.5 h-3.5 text-[#5A677B]" />
                      </div>
                      <div className="font-display font-bold text-sm text-[#233044]">
                        {sign.shapeRuleEn}
                      </div>
                      <p className="text-xs text-[#233044] leading-relaxed">{sign.meaningEn}</p>
                      <p className="text-xs text-[#5A677B] leading-relaxed pt-1 border-t border-[#EAE2D3]">
                        🇧🇷 {sign.meaningPt}
                      </p>
                      {sign.nyTipPt && (
                        <p className="text-[11px] font-bold text-[#1D4ED8] bg-[#E0EEFF]/80 rounded-lg p-2">
                          🗽 {sign.nyTipPt}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        void speak({
                          clipId: `sign-${sign.id}-en`,
                          text: `${sign.nameEn}. ${sign.meaningEn}`,
                          lang: 'en-US',
                          rate: playbackRate,
                        })
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E0EEFF] text-[#1D4ED8] text-xs font-bold cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> EN
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        void speak({
                          clipId: `sign-${sign.id}-pt`,
                          text: `${sign.namePt}. ${sign.meaningPt}`,
                          lang: 'pt-BR',
                          rate: playbackRate,
                        })
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-xs font-bold cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> PT
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleMasteredSign(sign.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                      mastered
                        ? 'bg-[#2E9E6B] text-white'
                        : 'bg-[#FFFBF2] border border-[#EAE2D3] text-[#5A677B] hover:border-[#2E9E6B]'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {mastered ? 'Mastered' : 'Mark Known'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-xl mx-auto rounded-3xl bg-white border border-[#EAE2D3] p-6 shadow-sm space-y-5">
          {blitzDone ? (
            <div className="text-center space-y-4 py-3">
              <img
                src="./images/characters/gianluigi-cheering.png"
                alt="Gian-Luigi cheering"
                className="w-24 h-24 rounded-3xl mx-auto object-cover border-2 border-[#2E9E6B]/40"
              />
              <div className="font-display text-2xl font-bold text-[#233044]">
                Sign Blitz Complete: {blitzScore} / {blitzItems.length}!
              </div>
              <p className="text-sm text-[#5A677B]">
                Remember: on the NY permit test you get 4 road signs and need at least 2 right.
                You’re building lightning-fast recognition!
              </p>
              <button
                type="button"
                onClick={startNewBlitz}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#7C5CFC] text-white font-bold text-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Play Another 8-Sign Blitz
              </button>
            </div>
          ) : (
            (() => {
              const current = blitzItems[blitzIdx];
              return (
                <>
                  <div className="flex items-center justify-between text-xs font-extrabold text-[#5A677B]">
                    <span>
                      Sign {blitzIdx + 1} of {blitzItems.length}
                    </span>
                    <span className="text-[#2E9E6B]">Score: {blitzScore}</span>
                  </div>

                  <div className="flex justify-center py-4 rounded-2xl bg-[#FFFBF2] border border-[#EAE2D3]">
                    <RoadSignSvg signId={current.target.id} size={146} hideLabel />
                  </div>

                  <div className="text-center font-display font-bold text-lg text-[#233044]">
                    Which meaning matches this NY sign?
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {current.options.map((opt) => {
                      const picked = blitzPicked !== null;
                      const isCorrect = opt.id === current.target.id;
                      const isSelected = blitzPicked === opt.id;
                      let cls =
                        'bg-[#FFFBF2] border-[#EAE2D3] hover:border-[#7C5CFC] cursor-pointer';
                      if (picked) {
                        if (isCorrect) cls = 'bg-[#DCFCE7] border-[#2E9E6B] cursor-default';
                        else if (isSelected)
                          cls = 'bg-[#FFE8E3] border-[#EF6C57] cursor-default';
                        else cls = 'bg-white border-[#EAE2D3] opacity-60 cursor-default';
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={picked}
                          onClick={() => handleBlitzPick(opt.id)}
                          className={`text-left rounded-2xl border-2 p-3.5 transition-all ${cls}`}
                        >
                          <div className="font-bold text-sm text-[#233044]">{opt.nameEn}</div>
                          {picked && (
                            <div className="text-xs text-[#5A677B] mt-0.5">🇧🇷 {opt.namePt}</div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {blitzPicked !== null && (
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={handleBlitzNext}
                        className="px-5 py-2 rounded-2xl bg-[#3B82F6] text-white font-bold text-sm cursor-pointer"
                      >
                        {blitzIdx + 1 >= blitzItems.length ? 'See Blitz Score' : 'Next Sign →'}
                      </button>
                    </div>
                  )}
                </>
              );
            })()
          )}
        </div>
      )}
    </div>
  );
};
