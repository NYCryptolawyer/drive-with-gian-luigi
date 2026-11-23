import React, { useState } from 'react';
import {
  BookOpen,
  ClipboardCheck,
  Compass,
  Download,
  OctagonAlert,
  Settings,
  Trash2,
  Upload,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import type { AppProgress, ComfortMode, NavTab } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  progress: AppProgress;
  onToggleSound: () => void;
  onChangeMode: (mode: ComfortMode) => void;
  onImportProgress: (json: string) => boolean;
  onResetProgress: () => void;
}

const MODE_BADGE: Record<ComfortMode, { label: string; bg: string; text: string }> = {
  bridge: { label: '🌱 Bridge (EN + PT)', bg: 'bg-[#DCFCE7]', text: 'text-[#15803D]' },
  confidence: { label: '⭐ Guided EN', bg: 'bg-[#E0EEFF]', text: 'text-[#1D4ED8]' },
  exam: { label: '🗽 Exam Mode', bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]' },
};

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  progress,
  onToggleSound,
  onChangeMode,
  onImportProgress,
  onResetProgress,
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Road Trip', icon: <Compass className="w-4 h-4" /> },
    { id: 'exam', label: 'Practice Exam', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'signs', label: 'Road Signs', icon: <OctagonAlert className="w-4 h-4" /> },
    { id: 'glossary', label: 'Dictionary', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleopatras-ny-permit-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const ok = onImportProgress(text);
    setImportStatus(ok ? 'Progress restored!' : 'Could not read backup file.');
    setTimeout(() => setImportStatus(null), 3500);
  };

  const modeBadge = MODE_BADGE[progress.comfortMode];

  return (
    <header className="sticky top-0 z-30 bg-[#FFFBF2]/95 backdrop-blur-md border-b border-[#EAE2D3]">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <img
            src="./images/characters/gianluigi-happy.png"
            alt="Gian-Luigi the Goat"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#F59E0B]/50 shadow-sm group-hover:scale-105 transition-transform bg-[#FFFBF2]"
          />
          <div>
            <div className="font-display font-bold text-lg leading-tight text-[#233044]">
              Drive with Gian-Luigi
            </div>
            <div className="text-xs text-[#5A677B] font-semibold">
              NY Permit Prep for Cleopatras
            </div>
          </div>
        </button>

        <nav className="flex items-center gap-1.5 bg-white/90 p-1 rounded-2xl border border-[#EAE2D3] shadow-xs">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#3B82F6] text-white shadow-xs'
                    : 'text-[#5A677B] hover:bg-[#FEF3C7]/60 hover:text-[#233044]'
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 relative">
          <span
            className={`hidden md:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${modeBadge.bg} ${modeBadge.text}`}
          >
            {modeBadge.label}
          </span>

          <button
            type="button"
            onClick={onToggleSound}
            title={progress.soundEffects ? 'Mute gentle sound chimes' : 'Enable gentle sound chimes'}
            aria-label={progress.soundEffects ? 'Mute sound effects' : 'Unmute sound effects'}
            className="p-2 rounded-xl bg-white border border-[#EAE2D3] text-[#5A677B] hover:text-[#233044] hover:border-[#3B82F6]/40 transition-colors cursor-pointer"
          >
            {progress.soundEffects ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setSettingsOpen((o) => !o)}
            aria-label="Settings and backup"
            className="p-2 rounded-xl bg-white border border-[#EAE2D3] text-[#5A677B] hover:text-[#233044] hover:border-[#3B82F6]/40 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>

          {settingsOpen && (
            <div className="absolute right-0 top-12 w-76 bg-white rounded-2xl border border-[#EAE2D3] shadow-xl p-4 z-50 text-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-base text-[#233044]">
                  Preferences & Backup
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSettingsOpen(false);
                    setConfirmReset(false);
                  }}
                  className="p-1 text-[#5A677B] hover:text-[#233044] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-3">
                <div className="text-xs font-bold uppercase tracking-wide text-[#5A677B] mb-1.5">
                  Learning Mode
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['bridge', 'confidence', 'exam'] as ComfortMode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => onChangeMode(m)}
                      className={`px-2 py-1.5 rounded-lg text-xs font-bold border capitalize cursor-pointer ${
                        progress.comfortMode === m
                          ? 'bg-[#E0EEFF] border-[#3B82F6] text-[#1D4ED8]'
                          : 'bg-[#FFFBF2] border-[#EAE2D3] text-[#5A677B]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#EAE2D3]">
                <button
                  type="button"
                  onClick={handleExport}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#E0EEFF] text-[#1D4ED8] font-bold hover:bg-[#D0E4FF] transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Export Progress Backup
                </button>

                <label className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#DCFCE7] text-[#15803D] font-bold hover:bg-[#C6F6D5] transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Restore from Backup
                  <input type="file" accept=".json" onChange={handleFileChange} className="hidden" />
                </label>

                {importStatus && (
                  <p className="text-xs text-center font-bold text-[#15803D]">{importStatus}</p>
                )}

                {!confirmReset ? (
                  <button
                    type="button"
                    onClick={() => setConfirmReset(true)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#FFE8E3] text-[#C2410C] font-bold hover:bg-[#FFD6CC] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    Reset All Progress
                  </button>
                ) : (
                  <div className="p-2.5 rounded-xl bg-[#FFE8E3] border border-[#EF6C57]/40 space-y-2">
                    <p className="text-xs font-bold text-[#9A3412]">
                      Clear mastered questions, signs, and exam log?
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onResetProgress();
                          setConfirmReset(false);
                          setSettingsOpen(false);
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-[#EF6C57] text-white font-bold text-xs cursor-pointer"
                      >
                        Yes, Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmReset(false)}
                        className="flex-1 py-1.5 rounded-lg bg-white text-[#5A677B] font-bold text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
