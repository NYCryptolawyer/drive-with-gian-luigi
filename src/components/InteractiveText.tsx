import React, { useMemo, useState } from 'react';
import { Volume2, X } from 'lucide-react';
import { GLOSSARY_BY_ID } from '../data/glossary';
import type { GlossaryEntry } from '../types';
import { speak } from '../services/speech';

interface InteractiveTextProps {
  text: string;
  glossaryTermIds?: string[];
  watchOutWords?: string[];
  highlightGlossary?: boolean;
  highlightWatchOut?: boolean;
  playbackRate?: 1 | 0.85;
  className?: string;
}

interface TextSegment {
  text: string;
  glossary?: GlossaryEntry;
  isWatchOut?: boolean;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const InteractiveText: React.FC<InteractiveTextProps> = ({
  text,
  glossaryTermIds = [],
  watchOutWords = [],
  highlightGlossary = true,
  highlightWatchOut = true,
  playbackRate = 1,
  className = '',
}) => {
  const [selectedEntry, setSelectedEntry] = useState<GlossaryEntry | null>(null);

  const segments = useMemo<TextSegment[]>(() => {
    const matchers: { pattern: string; glossary?: GlossaryEntry; isWatchOut?: boolean }[] = [];

    if (highlightGlossary && glossaryTermIds.length > 0) {
      for (const id of glossaryTermIds) {
        const entry = GLOSSARY_BY_ID[id];
        if (!entry) continue;
        // Strip parenthetical hints like "BAC (Blood Alcohol Content)" -> "BAC"
        const baseTerm = entry.termEn.replace(/\s*\([^)]*\)/g, '').trim();
        const variants = [baseTerm, ...(entry.aliases ?? [])].filter(Boolean);
        for (const variant of variants) {
          matchers.push({ pattern: variant, glossary: entry });
        }
      }
    }

    if (highlightWatchOut && watchOutWords.length > 0) {
      for (const word of watchOutWords) {
        if (word.trim()) {
          matchers.push({ pattern: word.trim(), isWatchOut: true });
        }
      }
    }

    if (matchers.length === 0) {
      return [{ text }];
    }

    // Longest-match-first prevents partial word collisions
    matchers.sort((a, b) => b.pattern.length - a.pattern.length);

    const combinedRegex = new RegExp(
      `\\b(${matchers.map((m) => escapeRegex(m.pattern)).join('|')})\\b`,
      'gi'
    );

    const out: TextSegment[] = [];
    let lastIndex = 0;

    for (const match of text.matchAll(combinedRegex)) {
      const idx = match.index ?? 0;
      const matchedText = match[0];

      if (idx > lastIndex) {
        out.push({ text: text.slice(lastIndex, idx) });
      }

      const lower = matchedText.toLowerCase();
      const found = matchers.find((m) => m.pattern.toLowerCase() === lower);

      out.push({
        text: matchedText,
        glossary: found?.glossary,
        isWatchOut: found?.isWatchOut,
      });

      lastIndex = idx + matchedText.length;
    }

    if (lastIndex < text.length) {
      out.push({ text: text.slice(lastIndex) });
    }

    return out.length > 0 ? out : [{ text }];
  }, [text, glossaryTermIds, watchOutWords, highlightGlossary, highlightWatchOut]);

  return (
    <div className="relative">
      <span className={className}>
        {segments.map((seg, idx) => {
          if (seg.glossary) {
            const entry = seg.glossary;
            return (
              <button
                key={`${idx}-${seg.text}`}
                type="button"
                onClick={() =>
                  setSelectedEntry((prev) => (prev?.id === entry.id ? null : entry))
                }
                title={`Click for Portuguese meaning: ${entry.termPt}`}
                className="inline underline decoration-dotted decoration-2 decoration-[#7C5CFC] underline-offset-4 hover:bg-[#EDE9FE] rounded px-0.5 text-inherit font-inherit cursor-pointer transition-colors"
              >
                {seg.text}
              </button>
            );
          }

          if (seg.isWatchOut) {
            return (
              <span
                key={`${idx}-${seg.text}`}
                title="DMV Watch-Out Word — pay special attention to this word!"
                className="inline-block bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/40 rounded-md px-1.5 py-0.5 mx-0.5 font-extrabold"
              >
                {seg.text}
              </span>
            );
          }

          return <React.Fragment key={idx}>{seg.text}</React.Fragment>;
        })}
      </span>

      {selectedEntry && (
        <div className="mt-3 p-3.5 rounded-2xl bg-[#EDE9FE]/70 border border-[#7C5CFC]/35 shadow-sm text-left">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <img
                src="./images/characters/tito-bluebird.png"
                alt="Tito the Bluebird"
                className="w-9 h-9 rounded-full object-cover border border-[#3B82F6]/40 bg-[#FFFBF2]"
              />
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-[#5B21B6]">
                  Tito’s Word Card
                </div>
                <div className="font-display font-bold text-base text-[#233044]">
                  {selectedEntry.termEn} →{' '}
                  <span className="text-[#5B21B6]">{selectedEntry.termPt}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedEntry(null)}
              aria-label="Close word card"
              className="p-1 rounded-lg text-[#5A677B] hover:text-[#233044] hover:bg-white/70 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-[#233044] mt-2 leading-snug">{selectedEntry.meaningEn}</p>
          <p className="text-sm text-[#5A677B] mt-1 leading-snug">🇧🇷 {selectedEntry.meaningPt}</p>

          <div className="flex flex-wrap gap-2 mt-2.5">
            <button
              type="button"
              onClick={() =>
                void speak({
                  clipId: `glossary-${selectedEntry.id}-en`,
                  text: `${selectedEntry.termEn}. ${selectedEntry.meaningEn}`,
                  lang: 'en-US',
                  rate: playbackRate,
                })
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[#1D4ED8] text-xs font-bold border border-[#3B82F6]/30 hover:bg-[#E0EEFF] cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Listen EN
            </button>
            <button
              type="button"
              onClick={() =>
                void speak({
                  clipId: `glossary-${selectedEntry.id}-pt`,
                  text: `${selectedEntry.termPt}. ${selectedEntry.meaningPt}`,
                  lang: 'pt-BR',
                  rate: playbackRate,
                })
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[#15803D] text-xs font-bold border border-[#2E9E6B]/30 hover:bg-[#DCFCE7] cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Ouvir em Português
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
