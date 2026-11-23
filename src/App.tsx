import { useEffect, useState } from 'react';
import type { NavTab } from './types';
import { useAppProgress } from './state/useAppProgress';
import { subscribeSpeech, stopSpeaking } from './services/speech';
import { Header } from './components/Header';
import { HomeView } from './views/HomeView';
import { QuizView } from './views/QuizView';
import { ExamView } from './views/ExamView';
import { SignsView } from './views/SignsView';
import { GlossaryView } from './views/GlossaryView';

type ActiveRoute =
  | { kind: 'home' }
  | { kind: 'chapter'; chapterId: string }
  | { kind: 'garage' }
  | { kind: 'exam' }
  | { kind: 'signs' }
  | { kind: 'glossary' };

export function App() {
  const {
    progress,
    setComfortMode,
    toggleSoundEffects,
    setPlaybackRate,
    recordPracticeAnswer,
    addManyToGarage,
    toggleMasteredSign,
    recordExamResult,
    importProgress,
    resetProgress,
  } = useAppProgress();

  const [route, setRoute] = useState<ActiveRoute>({ kind: 'home' });
  const [activeSpeechKey, setActiveSpeechKey] = useState<string | null>(null);

  useEffect(() => {
    return subscribeSpeech(setActiveSpeechKey);
  }, []);

  const navigateTab = (tab: NavTab) => {
    stopSpeaking();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setRoute({ kind: tab });
  };

  const activeNavTab: NavTab =
    route.kind === 'exam'
      ? 'exam'
      : route.kind === 'signs'
      ? 'signs'
      : route.kind === 'glossary'
      ? 'glossary'
      : 'home';

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF2]">
      <Header
        activeTab={activeNavTab}
        onNavigate={navigateTab}
        progress={progress}
        onToggleSound={toggleSoundEffects}
        onChangeMode={setComfortMode}
        onImportProgress={importProgress}
        onResetProgress={resetProgress}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-8">
        {route.kind === 'home' && (
          <HomeView
            progress={progress}
            activeSpeechKey={activeSpeechKey}
            onSelectMode={setComfortMode}
            onStartChapter={(chapterId) => {
              stopSpeaking();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setRoute({ kind: 'chapter', chapterId });
            }}
            onStartGarage={() => {
              stopSpeaking();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setRoute({ kind: 'garage' });
            }}
            onNavigate={navigateTab}
          />
        )}

        {route.kind === 'chapter' && (
          <QuizView
            mode={progress.comfortMode}
            chapterId={route.chapterId}
            isGarage={false}
            soundEffects={progress.soundEffects}
            playbackRate={progress.playbackRate}
            activeSpeechKey={activeSpeechKey}
            onChangePlaybackRate={setPlaybackRate}
            onRecordAnswer={recordPracticeAnswer}
            onBackHome={() => navigateTab('home')}
            onOpenNextChapter={(nextId) => {
              stopSpeaking();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setRoute({ kind: 'chapter', chapterId: nextId });
            }}
          />
        )}

        {route.kind === 'garage' && (
          <QuizView
            mode={progress.comfortMode}
            garageIds={Object.keys(progress.reviewGarage)}
            isGarage={true}
            soundEffects={progress.soundEffects}
            playbackRate={progress.playbackRate}
            activeSpeechKey={activeSpeechKey}
            onChangePlaybackRate={setPlaybackRate}
            onRecordAnswer={recordPracticeAnswer}
            onBackHome={() => navigateTab('home')}
          />
        )}

        {route.kind === 'exam' && (
          <ExamView
            examHistory={progress.examHistory}
            soundEffects={progress.soundEffects}
            playbackRate={progress.playbackRate}
            activeSpeechKey={activeSpeechKey}
            onRecordExam={recordExamResult}
            onAddMissedToGarage={addManyToGarage}
            onStartGarage={() => {
              stopSpeaking();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setRoute({ kind: 'garage' });
            }}
          />
        )}

        {route.kind === 'signs' && (
          <SignsView
            masteredSignIds={progress.masteredSignIds}
            soundEffects={progress.soundEffects}
            playbackRate={progress.playbackRate}
            activeSpeechKey={activeSpeechKey}
            onToggleMasteredSign={toggleMasteredSign}
          />
        )}

        {route.kind === 'glossary' && (
          <GlossaryView
            playbackRate={progress.playbackRate}
            activeSpeechKey={activeSpeechKey}
          />
        )}
      </main>

      <footer className="border-t border-[#EAE2D3] py-4 px-4 text-center text-xs font-semibold text-[#5A677B]">
        Drive with Gian-Luigi • Based on the official New York State Driver’s Manual (Class D, Ch. 4–11) • Built with care for Cleopatras 🐐🗽
      </footer>
    </div>
  );
}

export default App;
