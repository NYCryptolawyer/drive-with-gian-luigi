import React from 'react';
import { Volume2, Square } from 'lucide-react';
import type { MascotId, MascotMood } from '../types';
import { speak, stopSpeaking } from '../services/speech';

interface MascotMeta {
  name: string;
  roleEn: string;
  rolePt: string;
  images: Record<MascotMood, string>;
  ringClass: string;
}

export const MASCOTS: Record<MascotId, MascotMeta> = {
  gianluigi: {
    name: 'Gian-Luigi',
    roleEn: 'Hudson Valley Co-Pilot',
    rolePt: 'Seu Copiloto no Hudson Valley',
    images: {
      happy: './images/characters/gianluigi-happy.png',
      cheering: './images/characters/gianluigi-cheering.png',
      thinking: './images/characters/gianluigi-thinking.png',
    },
    ringClass: 'border-[#F59E0B]/50 bg-[#FEF3C7]/40',
  },
  luma: {
    name: 'Luma',
    roleEn: 'Signs & Weather Owl',
    rolePt: 'Coruja das Placas e Clima',
    images: {
      happy: './images/characters/luma-owl.png',
      cheering: './images/characters/luma-owl.png',
      thinking: './images/characters/luma-owl.png',
    },
    ringClass: 'border-[#7C5CFC]/40 bg-[#EDE9FE]/50',
  },
  tito: {
    name: 'Tito',
    roleEn: 'NY Bluebird & Words Coach',
    rolePt: 'Guia de Inglês e Leis de NY',
    images: {
      happy: './images/characters/tito-bluebird.png',
      cheering: './images/characters/tito-bluebird.png',
      thinking: './images/characters/tito-bluebird.png',
    },
    ringClass: 'border-[#3B82F6]/40 bg-[#E0EEFF]/50',
  },
  mila: {
    name: 'Mila',
    roleEn: 'Hudson Valley Trail Guide',
    rolePt: 'Guia de Convivência na Estrada',
    images: {
      happy: './images/characters/mila-deer.png',
      cheering: './images/characters/mila-deer.png',
      thinking: './images/characters/mila-deer.png',
    },
    ringClass: 'border-[#2E9E6B]/40 bg-[#DCFCE7]/50',
  },
};

interface MascotBubbleProps {
  mascot?: MascotId;
  mood?: MascotMood;
  messageEn: string;
  messagePt?: string;
  showPt?: boolean;
  clipIdEn?: string;
  clipIdPt?: string;
  activeSpeechKey?: string | null;
  playbackRate?: 1 | 0.85;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MascotBubble: React.FC<MascotBubbleProps> = ({
  mascot = 'gianluigi',
  mood = 'happy',
  messageEn,
  messagePt,
  showPt = true,
  clipIdEn,
  clipIdPt,
  activeSpeechKey,
  playbackRate = 1,
  className = '',
  size = 'md',
}) => {
  const meta = MASCOTS[mascot];
  const imgSrc = meta.images[mood];
  const imgSizeClass =
    size === 'lg' ? 'w-24 h-24 sm:w-28 sm:h-28' : size === 'sm' ? 'w-14 h-14' : 'w-20 h-20';

  const keyEn = clipIdEn ?? `en-US:${messageEn.slice(0, 40)}`;
  const keyPt = messagePt ? clipIdPt ?? `pt-BR:${messagePt.slice(0, 40)}` : '';
  const isSpeakingEn = activeSpeechKey === keyEn;
  const isSpeakingPt = Boolean(keyPt && activeSpeechKey === keyPt);

  return (
    <div className={`flex items-start gap-3.5 ${className}`}>
      <div className="shrink-0 relative">
        <img
          src={imgSrc}
          alt={`${meta.name} (${meta.roleEn})`}
          className={`${imgSizeClass} rounded-3xl object-cover border-3 shadow-sm ${meta.ringClass}`}
        />
        {(isSpeakingEn || isSpeakingPt) && (
          <div
            aria-hidden="true"
            className="absolute -bottom-1 -right-1 flex items-end gap-0.5 bg-[#3B82F6] text-white px-2 py-1 rounded-full shadow-sm"
          >
            <span className="w-1 h-2.5 bg-white rounded-full animate-sound-wave-1" />
            <span className="w-1 h-3.5 bg-white rounded-full animate-sound-wave-2" />
            <span className="w-1 h-2 bg-white rounded-full animate-sound-wave-3" />
          </div>
        )}
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-[#EAE2D3] px-4 py-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-[#233044]">{meta.name}</span>
            <span className="text-xs font-semibold text-[#5A677B]">• {meta.roleEn}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                isSpeakingEn
                  ? stopSpeaking()
                  : void speak({
                      clipId: clipIdEn,
                      text: messageEn,
                      lang: 'en-US',
                      rate: playbackRate,
                    })
              }
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                isSpeakingEn
                  ? 'bg-[#3B82F6] text-white'
                  : 'bg-[#E0EEFF] text-[#1D4ED8] hover:bg-[#CFE4FF]'
              }`}
            >
              {isSpeakingEn ? <Square className="w-3 h-3" /> : <Volume2 className="w-3.5 h-3.5" />}
              EN
            </button>
            {messagePt && showPt && (
              <button
                type="button"
                onClick={() =>
                  isSpeakingPt
                    ? stopSpeaking()
                    : void speak({
                        clipId: clipIdPt,
                        text: messagePt,
                        lang: 'pt-BR',
                        rate: playbackRate,
                      })
                }
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  isSpeakingPt
                    ? 'bg-[#2E9E6B] text-white'
                    : 'bg-[#DCFCE7] text-[#15803D] hover:bg-[#C6F6D5]'
                }`}
              >
                {isSpeakingPt ? <Square className="w-3 h-3" /> : <Volume2 className="w-3.5 h-3.5" />}
                PT
              </button>
            )}
          </div>
        </div>

        <p className="text-[#233044] text-[15px] leading-relaxed font-semibold">{messageEn}</p>
        {messagePt && showPt && (
          <p className="text-[#5A677B] text-sm leading-relaxed mt-1.5 pt-1.5 border-t border-[#EAE2D3]/70">
            🇧🇷 {messagePt}
          </p>
        )}
      </div>
    </div>
  );
};
