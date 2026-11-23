import React, { useMemo, useState } from 'react';
import { Ruler, Search, Volume2 } from 'lucide-react';
import { GLOSSARY, METRIC_CONVERSIONS } from '../data/glossary';
import type { GlossaryEntry } from '../types';
import { MascotBubble } from '../components/MascotBubble';
import { speak } from '../services/speech';

interface GlossaryViewProps {
  playbackRate: 1 | 0.85;
  activeSpeechKey: string | null;
}

const CATEGORIES: { id: 'all' | GlossaryEntry['category']; label: string }[] = [
  { id: 'all', label: 'All Terms' },
  { id: 'road-rules', label: 'Road Rules' },
  { id: 'signs-lines', label: 'Signs & Lines' },
  { id: 'parking', label: 'Parking & Curbs' },
  { id: 'safety-weather', label: 'Safety & Weather' },
  { id: 'laws-penalties', label: 'NY Laws' },
];

export const GlossaryView: React.FC<GlossaryViewProps> = ({
  playbackRate,
  activeSpeechKey,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | GlossaryEntry['category']>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY.filter((entry) => {
      if (category !== 'all' && entry.category !== category) return false;
      if (!q) return true;
      return (
        entry.termEn.toLowerCase().includes(q) ||
        entry.termPt.toLowerCase().includes(q) ||
        entry.meaningEn.toLowerCase().includes(q) ||
        entry.meaningPt.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <div className="space-y-6">
      <MascotBubble
        mascot="tito"
        mood="happy"
        size="md"
        messageEn="Hi Cleopatras! DMV questions repeat the same ~48 English driving words over and over. Listen to them here and they’ll feel completely natural on test day!"
        messagePt="Oi, Cleopatras! A prova do DMV repete sempre as mesmas ~48 palavras em inglês. Ouça a pronúncia aqui para reconhecer todas na hora do exame!"
        clipIdEn="glossary-intro-en"
        clipIdPt="glossary-intro-pt"
        activeSpeechKey={activeSpeechKey}
        playbackRate={playbackRate}
      />

      {/* Metric <-> Imperial Cheat Sheet for Brazil/Europe Drivers */}
      <section className="rounded-3xl bg-gradient-to-br from-[#E0EEFF]/80 via-white to-[#FEF3C7]/60 border border-[#3B82F6]/30 p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 font-display font-bold text-lg text-[#233044]">
          <Ruler className="w-5 h-5 text-[#3B82F6]" />
          🇧🇷/🇪🇺 Metric ↔ 🗽 NY Imperial Quick Reference
        </div>
        <p className="text-xs font-semibold text-[#5A677B]">
          Since you previously drove in Brazil and Europe, here is how NY test measurements map to centimeters, meters, and km/h:
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {METRIC_CONVERSIONS.map((row) => (
            <div
              key={row.imperial}
              className="rounded-2xl bg-white/95 border border-[#EAE2D3] p-3 space-y-1"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display font-bold text-sm text-[#1D4ED8]">
                  {row.imperial}
                </span>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309]">
                  {row.metric}
                </span>
              </div>
              <p className="text-xs font-semibold text-[#233044]">{row.nyRuleEn}</p>
              <p className="text-[11px] text-[#5A677B]">🇧🇷 {row.nyRulePt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#5A677B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search English or Portuguese (e.g. curb, hidrante, yield)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#EAE2D3] text-sm font-semibold text-[#233044] focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer ${
                category === c.id
                  ? 'bg-[#7C5CFC] text-white border-[#7C5CFC]'
                  : 'bg-white text-[#5A677B] border-[#EAE2D3]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dictionary Grid */}
      <div className="grid sm:grid-cols-2 gap-3.5">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            className="rounded-2xl bg-white border border-[#EAE2D3] p-4 shadow-xs flex flex-col justify-between gap-3"
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display font-bold text-lg text-[#233044]">{entry.termEn}</h3>
                <span className="text-sm font-bold text-[#5B21B6]">🇧🇷 {entry.termPt}</span>
              </div>
              <p className="text-sm text-[#233044] leading-snug">{entry.meaningEn}</p>
              <p className="text-xs text-[#5A677B] leading-snug">{entry.meaningPt}</p>
              <p className="text-xs italic text-[#1D4ED8] bg-[#E0EEFF]/50 rounded-xl px-2.5 py-1.5">
                “{entry.exampleEn}”
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() =>
                  void speak({
                    clipId: `glossary-${entry.id}-en`,
                    text: `${entry.termEn}. ${entry.meaningEn}`,
                    lang: 'en-US',
                    rate: playbackRate,
                  })
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E0EEFF] text-[#1D4ED8] text-xs font-bold cursor-pointer hover:bg-[#CFE4FF]"
              >
                <Volume2 className="w-3.5 h-3.5" /> EN
              </button>
              <button
                type="button"
                onClick={() =>
                  void speak({
                    clipId: `glossary-${entry.id}-en`,
                    text: `${entry.termEn}. ${entry.meaningEn}`,
                    lang: 'en-US',
                    rate: 0.85,
                  })
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EDE9FE] text-[#5B21B6] text-xs font-bold cursor-pointer hover:bg-[#DDD6FE]"
              >
                🐢 0.85× EN
              </button>
              <button
                type="button"
                onClick={() =>
                  void speak({
                    clipId: `glossary-${entry.id}-pt`,
                    text: `${entry.termPt}. ${entry.meaningPt}`,
                    lang: 'pt-BR',
                    rate: playbackRate,
                  })
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-xs font-bold cursor-pointer hover:bg-[#C6F6D5]"
              >
                <Volume2 className="w-3.5 h-3.5" /> PT-BR
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
