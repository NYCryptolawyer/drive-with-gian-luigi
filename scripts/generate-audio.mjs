import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHAPTERS } from '../src/data/chapters.ts';
import { GLOSSARY } from '../src/data/glossary.ts';
import { ROAD_SIGNS } from '../src/data/signs.ts';
import { CH04_QUESTIONS } from '../src/data/questions/ch04.ts';
import { CH05_QUESTIONS } from '../src/data/questions/ch05.ts';
import { CH06_QUESTIONS } from '../src/data/questions/ch06.ts';
import { CH07_QUESTIONS } from '../src/data/questions/ch07.ts';
import { CH08_QUESTIONS } from '../src/data/questions/ch08.ts';
import { CH09_QUESTIONS } from '../src/data/questions/ch09.ts';
import { CH10_QUESTIONS } from '../src/data/questions/ch10.ts';
import { CH11_QUESTIONS } from '../src/data/questions/ch11.ts';

const QUESTIONS_BY_CHAPTER = {
  ch04: CH04_QUESTIONS,
  ch05: CH05_QUESTIONS,
  ch06: CH06_QUESTIONS,
  ch07: CH07_QUESTIONS,
  ch08: CH08_QUESTIONS,
  ch09: CH09_QUESTIONS,
  ch10: CH10_QUESTIONS,
  ch11: CH11_QUESTIONS,
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const AUDIO_DIR = path.join(ROOT, 'public', 'audio');
const MANIFEST_PATH = path.join(AUDIO_DIR, 'manifest.json');
const AFCONVERT_BIN = '/usr/bin/afconvert';
const HAS_AFCONVERT = fs.existsSync(AFCONVERT_BIN);

function loadEnvLocal() {
  for (const fileName of ['.env.local', '.env']) {
    const full = path.join(ROOT, fileName);
    if (!fs.existsSync(full)) continue;
    const lines = fs.readFileSync(full, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

loadEnvLocal();

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const PRIMARY_MODEL = process.env.GEMINI_TTS_MODEL || 'gemini-2.5-flash-preview-tts';
const MODEL_CHAIN = Array.from(
  new Set([
    PRIMARY_MODEL,
    'gemini-3.1-flash-tts-preview',
    'gemini-3.8-flash-tts',
    'gemini-3.8-flash-lite-tts',
    'gemini-2.5-pro-preview-tts',
  ])
);
const VOICE_MALE = process.env.GEMINI_VOICE_MALE || 'Iapetus';
const VOICE_FEMALE = process.env.GEMINI_VOICE_FEMALE || 'Aoede';
const CONCURRENCY = 2;
const MIN_REQUEST_INTERVAL_MS = 6100;

const args = new Set(process.argv.slice(2));
const isAudition = args.has('--audition');
const isSample = !isAudition && (args.has('--sample') || !args.has('--all'));
const forceRegen = args.has('--force');

let activeModelIndex = 0;
let cooldownUntil = 0;
let nextSlotAt = 0;
let slotQueue = Promise.resolve();
const fallbackModelsUsed = new Set();

function prepareSpeechPrompt(text, lang) {
  const spoken = text.replace(/~+/g, 'about ');
  const hasName = /\bGian-Luigi\b/i.test(spoken);

  if (lang === 'pt-BR') {
    const nameHint = hasName
      ? `Pronuncie o nome italiano "Gian-Luigi" com pronúncia italiana autêntica (/dʒan luˈiːdʒi/, "Gian" com som de "Djan" leve e "Luígi" italiano natural). `
      : '';
    return (
      `Speak warmly, clearly, and encouragingly in natural Brazilian Portuguese (Português do Brasil). ` +
      `${nameHint}Read exactly:\n${spoken}`
    );
  }
  const nameHint = hasName
    ? `Pronounce the Italian name "Gian-Luigi" with authentic Italian pronunciation (IPA /dʒan luˈiːdʒi/: soft Italian "G" like in "gelato", crisp Italian "a", flowing smoothly into "Loo-EE-jee" — never American "John" and never "Gee-an"). `
    : '';
  return (
    `Speak warmly, clearly, and encouragingly in natural US English at a comfortable pace for a language learner. ` +
    `${nameHint}Read exactly:\n${spoken}`
  );
}

// Wrap raw 24kHz 16-bit mono PCM bytes from Gemini TTS into a valid WAV container
function pcmToWav(pcmBuffer, sampleRate = 24000, channels = 1, bitDepth = 16) {
  const byteRate = (sampleRate * channels * bitDepth) / 8;
  const blockAlign = (channels * bitDepth) / 8;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcmBuffer.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitDepth, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcmBuffer.length, 40);
  return Buffer.concat([header, pcmBuffer]);
}

function saveAudioFile(id, ext, buffer, targetDir = AUDIO_DIR) {
  if (ext === 'wav' && HAS_AFCONVERT) {
    const tmpWav = path.join(os.tmpdir(), `gianluigi-${id}-${Date.now()}-${Math.random().toString(16).slice(2)}.wav`);
    const outM4a = path.join(targetDir, `${id}.m4a`);
    try {
      fs.writeFileSync(tmpWav, buffer);
      execFileSync(AFCONVERT_BIN, ['-f', 'm4af', '-d', 'aac', '-b', '48000', tmpWav, outM4a], {
        stdio: 'pipe',
      });
      return `${id}.m4a`;
    } catch {
      // Fall back to WAV cleanly if afconvert fails
    } finally {
      if (fs.existsSync(tmpWav)) fs.unlinkSync(tmpWav);
    }
  }

  const filename = `${id}.${ext}`;
  fs.writeFileSync(path.join(targetDir, filename), buffer);
  return filename;
}

async function waitForCooldown() {
  while (Date.now() < cooldownUntil) {
    const ms = cooldownUntil - Date.now();
    await new Promise((r) => setTimeout(r, Math.min(ms, 2000)));
  }
}

async function acquireRequestSlot() {
  slotQueue = slotQueue.then(async () => {
    await waitForCooldown();
    const now = Date.now();
    const waitMs = Math.max(0, nextSlotAt - now);
    if (waitMs > 0) {
      await new Promise((r) => setTimeout(r, waitMs));
    }
    nextSlotAt = Math.max(Date.now(), nextSlotAt) + MIN_REQUEST_INTERVAL_MS;
  });
  return slotQueue;
}

async function synthesizeClip({ id, text, lang, voiceName }) {
  const maxAttempts = 8;
  let data;
  let usedModel = MODEL_CHAIN[activeModelIndex];

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await acquireRequestSlot();
    const modelIdx = activeModelIndex;
    const model = MODEL_CHAIN[modelIdx];
    usedModel = model;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const body = {
      contents: [
        {
          parts: [{ text: prepareSpeechPrompt(text, lang) }],
        },
      ],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName,
            },
          },
        },
      },
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      data = await res.json();
      break;
    }

    const errText = await res.text();
    if (
      (res.status === 401 || res.status === 403) &&
      (errText.includes('aiplatform') || errText.toLowerCase().includes('vertex'))
    ) {
      throw new Error(
        `Gemini TTS rejected the key for ${id} (HTTP ${res.status}) with a Vertex AI / aiplatform hint.\n` +
          `Response: ${errText}`
      );
    }

    const isDailyLimit =
      res.status === 429 &&
      (errText.includes('PerDay') || errText.includes('GenerateRequestsPerDay') || errText.includes('FreeTier'));

    const isModelUnavailable = res.status === 404 || (res.status === 400 && errText.toLowerCase().includes('model'));

    if ((isDailyLimit || isModelUnavailable) && activeModelIndex === modelIdx && modelIdx + 1 < MODEL_CHAIN.length) {
      activeModelIndex = modelIdx + 1;
      const nextModel = MODEL_CHAIN[activeModelIndex];
      fallbackModelsUsed.add(nextModel);
      console.log(
        `\n  Model "${model}" hit ${isDailyLimit ? 'daily quota' : 'availability issue'}; switching cleanly to fallback "${nextModel}"...`
      );
      continue;
    }

    if ((isDailyLimit || isModelUnavailable) && activeModelIndex !== modelIdx) {
      // Another worker already advanced activeModelIndex; retry immediately on the new model
      continue;
    }

    if ((res.status === 429 || res.status === 503) && !isDailyLimit && attempt < maxAttempts) {
      const retryMatch = errText.match(/"retryDelay"\s*:\s*"(\d+(?:\.\d+)?)s"/);
      const parsedDelay = retryMatch ? Math.ceil(Number(retryMatch[1])) + 2 : attempt * 10;
      const waitSec = Math.min(68, Math.max(6, parsedDelay));
      const targetUntil = Date.now() + waitSec * 1000;
      if (targetUntil > cooldownUntil) {
        cooldownUntil = targetUntil;
        console.log(`  RPM pause on ${model} (${id}) — cooling down ${waitSec}s across workers...`);
      }
      await waitForCooldown();
      continue;
    }

    throw new Error(`Gemini TTS failed on ${model} for ${id} (HTTP ${res.status}): ${errText}`);
  }

  const part = data?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
  if (!part?.inlineData?.data) {
    throw new Error(`No audio data returned for ${id} (${usedModel}): ${JSON.stringify(data)}`);
  }

  const mime = part.inlineData.mimeType || '';
  const rawBuf = Buffer.from(part.inlineData.data, 'base64');

  if (mime.includes('wav')) {
    return { ext: 'wav', buffer: rawBuf, usedModel };
  }
  if (mime.includes('mp3') || mime.includes('mpeg')) {
    return { ext: 'mp3', buffer: rawBuf, usedModel };
  }
  const rateMatch = mime.match(/rate=(\d+)/);
  const sampleRate = rateMatch ? Number(rateMatch[1]) : 24000;
  return { ext: 'wav', buffer: pcmToWav(rawBuf, sampleRate), usedModel };
}

function buildCorpus() {
  const items = [
    {
      id: 'welcome-en',
      lang: 'en-US',
      voiceName: VOICE_MALE,
      text: 'Olá, Cleopatras! I am Gian-Luigi, your Hudson Valley co-pilot. Take a deep breath—we will master the New York permit test together, step by step.',
    },
    {
      id: 'welcome-pt',
      lang: 'pt-BR',
      voiceName: VOICE_MALE,
      text: 'Olá, Cleopatras! Eu sou o Gian-Luigi, seu copiloto no Hudson Valley. Sem pressa e sem pressão — vamos dominar a prova teórica de Nova York juntos, passo a passo!',
    },
    {
      id: 'exam-intro-en',
      lang: 'en-US',
      voiceName: VOICE_MALE,
      text: 'Ready to test your NY DMV skills in English, Cleopatras? Let’s do a calm 20-question practice exam—just like the real DMV screen!',
    },
    {
      id: 'exam-intro-pt',
      lang: 'pt-BR',
      voiceName: VOICE_MALE,
      text: 'Pronta para testar em inglês como na prova oficial? Este simulado segue exatamente as regras do DMV de NY: 20 questões, sem pressão!',
    },
    {
      id: 'signs-intro-en',
      lang: 'en-US',
      voiceName: VOICE_FEMALE,
      text: 'Welcome to the Road Sign Studio! In New York, sign SHAPES and COLORS give away the answer even when covered by winter snow. Click any sign card to flip it!',
    },
    {
      id: 'signs-intro-pt',
      lang: 'pt-BR',
      voiceName: VOICE_FEMALE,
      text: 'Bem-vinda ao Estúdio de Placas! Em NY, o FORMATO e a COR já entregam o significado mesmo se a neve cobrir as letras. Clique em qualquer placa para virar o cartão!',
    },
    {
      id: 'glossary-intro-en',
      lang: 'en-US',
      voiceName: VOICE_MALE,
      text: 'Hi Cleopatras! DMV questions repeat the same ~48 English driving words over and over. Listen to them here and they’ll feel completely natural on test day!',
    },
    {
      id: 'glossary-intro-pt',
      lang: 'pt-BR',
      voiceName: VOICE_MALE,
      text: 'Oi, Cleopatras! A prova do DMV repete sempre as mesmas ~48 palavras em inglês. Ouça a pronúncia aqui para reconhecer todas na hora do exame!',
    },
  ];

  // Chapters ch04 -> ch11 in order (intro + questions + explanations)
  for (const ch of CHAPTERS) {
    const hostVoice = ch.host === 'luma' || ch.host === 'mila' ? VOICE_FEMALE : VOICE_MALE;
    items.push({ id: `${ch.id}-intro-en`, lang: 'en-US', voiceName: hostVoice, text: ch.introEn });
    items.push({ id: `${ch.id}-intro-pt`, lang: 'pt-BR', voiceName: hostVoice, text: ch.introPt });

    const chQuestions = QUESTIONS_BY_CHAPTER[ch.id] || [];
    for (const q of chQuestions) {
      items.push({ id: `${q.id}-prompt-en`, lang: 'en-US', voiceName: VOICE_FEMALE, text: q.promptEn });
      items.push({ id: `${q.id}-prompt-pt`, lang: 'pt-BR', voiceName: VOICE_FEMALE, text: q.promptPt });
      items.push({ id: `${q.id}-exp-en`, lang: 'en-US', voiceName: VOICE_MALE, text: q.explanationEn });
      items.push({ id: `${q.id}-exp-pt`, lang: 'pt-BR', voiceName: VOICE_MALE, text: q.explanationPt });
    }
  }

  for (const sign of ROAD_SIGNS) {
    items.push({
      id: `sign-${sign.id}-en`,
      lang: 'en-US',
      voiceName: VOICE_FEMALE,
      text: `${sign.nameEn}. ${sign.meaningEn}`,
    });
    items.push({
      id: `sign-${sign.id}-pt`,
      lang: 'pt-BR',
      voiceName: VOICE_FEMALE,
      text: `${sign.namePt}. ${sign.meaningPt}`,
    });
  }

  for (const entry of GLOSSARY) {
    items.push({
      id: `glossary-${entry.id}-en`,
      lang: 'en-US',
      voiceName: VOICE_FEMALE,
      text: `${entry.termEn}. ${entry.meaningEn}`,
    });
    items.push({
      id: `glossary-${entry.id}-pt`,
      lang: 'pt-BR',
      voiceName: VOICE_FEMALE,
      text: `${entry.termPt}. ${entry.meaningPt}`,
    });
  }

  return items;
}

async function runAudition() {
  const auditionDir = path.join(AUDIO_DIR, 'audition');
  fs.mkdirSync(auditionDir, { recursive: true });

  const candidates = ['Achird', 'Umbriel', 'Algieba', 'Iapetus', 'Charon'];
  const lineEn =
    'Olá, Cleopatras! I am Gian-Luigi, your Hudson Valley co-pilot. Take a deep breath—we will master the New York permit test together, step by step.';
  const linePt =
    'Olá, Cleopatras! Eu sou o Gian-Luigi, seu copiloto no Hudson Valley. Sem pressa e sem pressão — vamos dominar a prova teórica de Nova York juntos, passo a passo!';

  const items = [];
  for (const voiceName of candidates) {
    items.push({ id: `${voiceName.toLowerCase()}-en`, lang: 'en-US', voiceName, text: lineEn });
    items.push({ id: `${voiceName.toLowerCase()}-pt`, lang: 'pt-BR', voiceName, text: linePt });
  }

  let done = 0;
  let skipped = 0;
  for (const item of items) {
    const existingM4a = path.join(auditionDir, `${item.id}.m4a`);
    if (!forceRegen && fs.existsSync(existingM4a)) {
      skipped++;
      done++;
      continue;
    }
    const { ext, buffer } = await synthesizeClip(item);
    const filename = saveAudioFile(item.id, ext, buffer, auditionDir);
    done++;
    console.log(`  [${done}/${items.length}] Saved audition/${filename}`);
    await new Promise((r) => setTimeout(r, 650));
  }
  console.log(`\nAudition clips ready (${items.length - skipped} generated, ${skipped} kept).`);
}

async function main() {
  if (!API_KEY) {
    console.error('Missing GEMINI_API_KEY in .env.local or environment.');
    process.exit(1);
  }

  if (isAudition) {
    await runAudition();
    return;
  }

  fs.mkdirSync(AUDIO_DIR, { recursive: true });
  const existingManifest = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
    : {};

  const fullCorpus = buildCorpus();
  const sampleIds = new Set([
    'welcome-en',
    'welcome-pt',
    'ch04-q01-prompt-en',
    'ch04-q01-prompt-pt',
    'ch11-q01-exp-en',
    'ch11-q01-exp-pt',
  ]);

  const targets = isSample ? fullCorpus.filter((item) => sampleIds.has(item.id)) : fullCorpus;

  const pending = [];
  let skipped = 0;
  for (const item of targets) {
    const prevFile = existingManifest[item.id];
    if (!forceRegen && prevFile && fs.existsSync(path.join(AUDIO_DIR, prevFile))) {
      skipped++;
    } else {
      pending.push(item);
    }
  }

  console.log(
    `Generating ${pending.length} pending clip(s) (${skipped} already present, ${targets.length} total) ` +
      `using model "${MODEL_CHAIN[activeModelIndex]}" (voices: ${VOICE_MALE} / ${VOICE_FEMALE}, ` +
      `concurrency: ${CONCURRENCY}, format: ${HAS_AFCONVERT ? 'm4a' : 'wav'}, ${isSample ? 'SAMPLE' : 'FULL'})...`
  );

  let nextIdx = 0;
  let generated = 0;

  async function worker() {
    while (true) {
      const idx = nextIdx++;
      if (idx >= pending.length) return;
      const item = pending[idx];
      const { ext, buffer, usedModel } = await synthesizeClip(item);
      const filename = saveAudioFile(item.id, ext, buffer);
      existingManifest[item.id] = filename;
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(existingManifest, null, 2));
      generated++;
      if (generated <= 6 || generated % 25 === 0 || generated === pending.length) {
        console.log(
          `  [${skipped + generated}/${targets.length}] Saved ${filename} (${item.voiceName}, ${usedModel})`
        );
      }
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  const fallbackSummary =
    fallbackModelsUsed.size > 0
      ? ` Fallbacks used: ${Array.from(fallbackModelsUsed).join(', ')}.`
      : ' All generated on primary model.';
  console.log(
    `\nDone! Generated ${generated}, kept ${skipped} existing. Total in manifest: ${
      Object.keys(existingManifest).length
    }.${fallbackSummary}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
