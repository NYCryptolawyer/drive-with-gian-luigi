# Drive with Gian-Luigi

A calm, playful, bilingual (**Brazilian Portuguese + English**) web app designed for **Cleopatras** to prepare comfortably for and pass the **New York State Class D Learner's Permit** exam in English.

Hosted by **Gian-Luigi** (our driving-goggled goat co-pilot) alongside Hudson Valley friends **Luma**, **Tito**, and **Mila**, the app pairs gentle pastel visuals, official vector NY road signs, and pre-rendered Gemini TTS audio (`Iapetus` + `Aoede`) across all 8 tested chapters of the NYS Driver's Manual (Chapters 4–11).

## Adding to Your MacBook Air Dock

1. Open the hosted URL in **Safari** on macOS.
2. Choose **File → Add to Dock…** in the menu bar.
3. Click **Add** — **Drive with Gian-Luigi** now launches like a dedicated Mac app with its own Dock icon!

## Features

- **3 Comfort Modes:** **Bridge Mode** (English prompts with one-click *Ver em Português* & bilingual explanations), **Confidence Mode** (clickable lavender vocabulary cards & DMV watch-out word highlights), and **Exam Readiness Mode** (clean English-only DMV screen).
- **8 Hudson Valley Road Trip Stops (82 Questions):** Complete coverage of NYS Driver's Manual Chapters 4–11 with **"🇧🇷/🇪🇺 → 🗽 NY Rule Switch"** callouts for drivers with prior experience in Brazil or Europe.
- **20-Question NY DMV Exam Simulator:** Mirrors NY's **14/20 overall + at least 2/4 road signs** requirement (including optional Real DMV Early-Stop mode).
- **Luma's Road Sign Studio & Tito's Dictionary:** 22 crisp SVG NY road signs + Quick Sign Blitz mini-game, and 48 bilingual driving terms with a Metric ↔ NY Imperial cheat sheet.

## Local Development

```bash
npm install
npm run dev             # Start local dev server at http://localhost:5173
npm run verify-content  # Validate all chapters, signs, choices, and glossary links
npm run build           # Type-check and build production bundle into dist/
```

## Regenerating Voice Audio (Optional)

All 492 `.m4a` voice clips are already pre-rendered in `public/audio/`. To regenerate clips using Gemini TTS:

1. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY=...`.
2. Run `npm run generate-audio -- --all` (requires macOS `/usr/bin/afconvert` for `.m4a`, otherwise writes `.wav`).
