import { useCallback, useEffect, useState } from 'react';
import type { AppProgress, ComfortMode, ExamResult } from '../types';

const STORAGE_KEY = 'gianluigi_ny_permit_v1';

const DEFAULT_PROGRESS: AppProgress = {
  comfortMode: 'bridge',
  soundEffects: true,
  playbackRate: 1,
  masteredQuestionIds: [],
  reviewGarage: {},
  masteredSignIds: [],
  examHistory: [],
};

function loadProgress(): AppProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<AppProgress>;
    return {
      comfortMode:
        parsed.comfortMode === 'bridge' ||
        parsed.comfortMode === 'confidence' ||
        parsed.comfortMode === 'exam'
          ? parsed.comfortMode
          : 'bridge',
      soundEffects: typeof parsed.soundEffects === 'boolean' ? parsed.soundEffects : true,
      playbackRate: parsed.playbackRate === 0.85 ? 0.85 : 1,
      masteredQuestionIds: Array.isArray(parsed.masteredQuestionIds)
        ? parsed.masteredQuestionIds
        : [],
      reviewGarage:
        parsed.reviewGarage && typeof parsed.reviewGarage === 'object'
          ? parsed.reviewGarage
          : {},
      masteredSignIds: Array.isArray(parsed.masteredSignIds) ? parsed.masteredSignIds : [],
      examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : [],
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function useAppProgress() {
  const [progress, setProgress] = useState<AppProgress>(loadProgress);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore private browsing quota errors
    }
  }, [progress]);

  const setComfortMode = useCallback((comfortMode: ComfortMode) => {
    setProgress((prev) => ({ ...prev, comfortMode }));
  }, []);

  const toggleSoundEffects = useCallback(() => {
    setProgress((prev) => ({ ...prev, soundEffects: !prev.soundEffects }));
  }, []);

  const setPlaybackRate = useCallback((playbackRate: 1 | 0.85) => {
    setProgress((prev) => ({ ...prev, playbackRate }));
  }, []);

  const recordPracticeAnswer = useCallback(
    (questionId: string, isCorrect: boolean, isGarageSession = false) => {
      setProgress((prev) => {
        const mastered = new Set(prev.masteredQuestionIds);
        const garage = { ...prev.reviewGarage };

        if (isCorrect) {
          mastered.add(questionId);
          if (questionId in garage) {
            const nextRemaining = garage[questionId] - 1;
            if (nextRemaining <= 0) {
              delete garage[questionId];
            } else {
              garage[questionId] = nextRemaining;
            }
          }
        } else {
          // Require 2 clean hits to graduate back out of the Extra Practice Garage
          garage[questionId] = isGarageSession ? 2 : Math.max(garage[questionId] ?? 0, 2);
        }

        return {
          ...prev,
          masteredQuestionIds: Array.from(mastered),
          reviewGarage: garage,
        };
      });
    },
    []
  );

  const addManyToGarage = useCallback((questionIds: string[]) => {
    if (!questionIds.length) return;
    setProgress((prev) => {
      const garage = { ...prev.reviewGarage };
      questionIds.forEach((id) => {
        garage[id] = Math.max(garage[id] ?? 0, 2);
      });
      return { ...prev, reviewGarage: garage };
    });
  }, []);

  const toggleMasteredSign = useCallback((signId: string) => {
    setProgress((prev) => {
      const set = new Set(prev.masteredSignIds);
      if (set.has(signId)) set.delete(signId);
      else set.add(signId);
      return { ...prev, masteredSignIds: Array.from(set) };
    });
  }, []);

  const recordExamResult = useCallback(
    (result: ExamResult, correctIds: string[], missedIds: string[]) => {
      setProgress((prev) => {
        const mastered = new Set(prev.masteredQuestionIds);
        const garage = { ...prev.reviewGarage };
        correctIds.forEach((id) => mastered.add(id));
        missedIds.forEach((id) => {
          garage[id] = Math.max(garage[id] ?? 0, 2);
        });
        return {
          ...prev,
          masteredQuestionIds: Array.from(mastered),
          reviewGarage: garage,
          examHistory: [result, ...prev.examHistory].slice(0, 25),
        };
      });
    },
    []
  );

  const importProgress = useCallback((jsonText: string): boolean => {
    try {
      const parsed = JSON.parse(jsonText) as Partial<AppProgress>;
      if (!parsed || typeof parsed !== 'object') return false;
      setProgress({
        comfortMode:
          parsed.comfortMode === 'bridge' ||
          parsed.comfortMode === 'confidence' ||
          parsed.comfortMode === 'exam'
            ? parsed.comfortMode
            : 'bridge',
        soundEffects: typeof parsed.soundEffects === 'boolean' ? parsed.soundEffects : true,
        playbackRate: parsed.playbackRate === 0.85 ? 0.85 : 1,
        masteredQuestionIds: Array.isArray(parsed.masteredQuestionIds)
          ? parsed.masteredQuestionIds
          : [],
        reviewGarage:
          parsed.reviewGarage && typeof parsed.reviewGarage === 'object'
            ? parsed.reviewGarage
            : {},
        masteredSignIds: Array.isArray(parsed.masteredSignIds) ? parsed.masteredSignIds : [],
        examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : [],
      });
      return true;
    } catch {
      return false;
    }
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
  }, []);

  return {
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
  };
}
