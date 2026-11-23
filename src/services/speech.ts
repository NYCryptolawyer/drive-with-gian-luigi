export type SpeechLang = 'en-US' | 'pt-BR';

export interface SpeakOptions {
  clipId?: string;
  text: string;
  lang: SpeechLang;
  rate?: 1 | 0.85;
}

type Listener = (activeKey: string | null) => void;

let manifestCache: Record<string, string> | null = null;
let manifestLoading: Promise<Record<string, string>> | null = null;
let currentAudio: HTMLAudioElement | null = null;
let currentKey: string | null = null;
const listeners = new Set<Listener>();

function notify(key: string | null) {
  currentKey = key;
  listeners.forEach((cb) => cb(key));
}

export function subscribeSpeech(listener: Listener): () => void {
  listeners.add(listener);
  listener(currentKey);
  return () => {
    listeners.delete(listener);
  };
}

export function prepareTextForSpeech(text: string, lang: SpeechLang): string {
  const cleaned = text.replace(/~+/g, 'about ');
  if (lang === 'en-US') {
    return cleaned.replace(/\bGian-Luigi\b/gi, 'Jahn-Luigi');
  }
  return cleaned;
}

async function loadManifest(): Promise<Record<string, string>> {
  if (manifestCache) return manifestCache;
  if (manifestLoading) return manifestLoading;
  manifestLoading = fetch('./audio/manifest.json', { cache: 'no-cache' })
    .then(async (res) => {
      if (!res.ok) return {};
      const data = (await res.json()) as Record<string, string>;
      manifestCache = data && typeof data === 'object' ? data : {};
      return manifestCache;
    })
    .catch(() => {
      manifestCache = {};
      return {};
    });
  return manifestLoading;
}

// Kick off manifest preload silently
if (typeof window !== 'undefined') {
  void loadManifest();
}

export function stopSpeaking() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  notify(null);
}

function pickBestVoice(lang: SpeechLang): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const preferredPt = [
    'Luciana (Enhanced)',
    'Luciana',
    'Felipe',
    'Google português do Brasil',
    'Microsoft Francisca',
    'Microsoft Antonio',
  ];
  const preferredEn = [
    'Ava (Premium)',
    'Zoe (Premium)',
    'Samantha (Enhanced)',
    'Allison (Enhanced)',
    'Samantha',
    'Alex',
    'Google US English',
    'Microsoft Aria',
  ];

  const targets = lang === 'pt-BR' ? preferredPt : preferredEn;
  for (const name of targets) {
    const found = voices.find((v) => v.name.includes(name));
    if (found) return found;
  }

  const exactLang = voices.find((v) => v.lang.toLowerCase() === lang.toLowerCase());
  if (exactLang) return exactLang;

  const prefix = lang === 'pt-BR' ? 'pt' : 'en';
  return voices.find((v) => v.lang.toLowerCase().startsWith(prefix)) ?? null;
}

export async function speak({ clipId, text, lang, rate = 1 }: SpeakOptions): Promise<void> {
  const key = clipId ?? `${lang}:${text.slice(0, 40)}`;
  const wasSame = currentKey === key;
  stopSpeaking();
  if (wasSame) return;

  const manifest = await loadManifest();
  const mappedFile = clipId ? manifest[clipId] : undefined;

  if (mappedFile) {
    try {
      const audio = new Audio(`./audio/${mappedFile}`);
      audio.playbackRate = rate;
      currentAudio = audio;
      notify(key);
      audio.onended = () => {
        if (currentAudio === audio) {
          currentAudio = null;
          notify(null);
        }
      };
      audio.onerror = () => {
        if (currentAudio === audio) {
          currentAudio = null;
        }
        speakWithBrowserSynthesis(key, text, lang, rate);
      };
      await audio.play();
      return;
    } catch {
      currentAudio = null;
    }
  }

  speakWithBrowserSynthesis(key, text, lang, rate);
}

function speakWithBrowserSynthesis(
  key: string,
  text: string,
  lang: SpeechLang,
  rate: 1 | 0.85
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    notify(null);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(prepareTextForSpeech(text, lang));
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = 1.02;

  const voice = pickBestVoice(lang);
  if (voice) {
    utterance.voice = voice;
  }

  notify(key);
  utterance.onend = () => {
    if (currentKey === key) notify(null);
  };
  utterance.onerror = () => {
    if (currentKey === key) notify(null);
  };

  window.speechSynthesis.speak(utterance);
}

export function playChime(kind: 'success' | 'gentle' | 'celebrate', enabled: boolean) {
  if (!enabled || typeof window === 'undefined') return;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;

  try {
    const ctx = new AudioCtx();
    const notes =
      kind === 'celebrate'
        ? [523.25, 659.25, 783.99, 1046.5]
        : kind === 'success'
        ? [523.25, 659.25, 783.99]
        : [392.0, 440.0];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * 0.085;
      const dur = kind === 'celebrate' ? 0.35 : 0.24;
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.09, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + dur + 0.02);
    });
  } catch {
    // Ignore autoplay restrictions quietly
  }
}
