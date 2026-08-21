import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LearnerProfile = 'dyslexia' | 'adhd' | 'visual' | 'multiple' | null;
export type OverlayColor = 'none' | 'cream' | 'blue' | 'mint' | 'rose';

export interface AdaptLearnSettings {
  isDyslexicFont: boolean;
  lineHeight: number;
  letterSpacing: number;
  sensoryMode: boolean;
  fontSize: number;
  overlayColor: OverlayColor;
  syllableHighlight: boolean;
  readingRuler: boolean;
  profile: LearnerProfile;
  focusTimerMinutes: number;
  studentName: string;
  totalSessions: number;
  totalConceptsMastered: number;
  totalFocusMinutes: number;
  streakDays: number;
}

const DEFAULT_SETTINGS: AdaptLearnSettings = {
  isDyslexicFont: false,
  lineHeight: 1.5,
  letterSpacing: 0,
  sensoryMode: false,
  fontSize: 16,
  overlayColor: 'none',
  syllableHighlight: false,
  readingRuler: false,
  profile: null,
  focusTimerMinutes: 25,
  studentName: 'Learner',
  totalSessions: 0,
  totalConceptsMastered: 0,
  totalFocusMinutes: 0,
  streakDays: 3,
};

interface SettingsContextType {
  settings: AdaptLearnSettings;
  updateSetting: <K extends keyof AdaptLearnSettings>(key: K, value: AdaptLearnSettings[K]) => void;
  applyProfile: (profile: LearnerProfile) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AdaptLearnSettings>(() => {
    try {
      const saved = localStorage.getItem('adaptlearn_settings');
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to parse settings', e);
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('adaptlearn_settings', JSON.stringify(settings));

    if (settings.isDyslexicFont) {
      document.body.classList.add('font-dyslexic');
    } else {
      document.body.classList.remove('font-dyslexic');
    }

    if (settings.sensoryMode) {
      document.body.classList.add('sensory-mode');
    } else {
      document.body.classList.remove('sensory-mode');
    }

    // Apply overlay color to root
    document.documentElement.setAttribute('data-overlay', settings.overlayColor);
  }, [settings]);

  const updateSetting = <K extends keyof AdaptLearnSettings>(key: K, value: AdaptLearnSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const applyProfile = (profile: LearnerProfile) => {
    const presets: Partial<AdaptLearnSettings> = {};
    if (profile === 'dyslexia') {
      presets.isDyslexicFont = true;
      presets.lineHeight = 2.0;
      presets.letterSpacing = 1.5;
      presets.overlayColor = 'cream';
      presets.syllableHighlight = true;
      presets.fontSize = 18;
    } else if (profile === 'adhd') {
      presets.sensoryMode = true;
      presets.focusTimerMinutes = 15;
      presets.overlayColor = 'blue';
      presets.readingRuler = true;
    } else if (profile === 'visual') {
      presets.fontSize = 20;
      presets.lineHeight = 2.2;
      presets.overlayColor = 'mint';
      presets.readingRuler = true;
      presets.letterSpacing = 1;
    } else if (profile === 'multiple') {
      presets.isDyslexicFont = true;
      presets.lineHeight = 2.0;
      presets.letterSpacing = 1.5;
      presets.overlayColor = 'cream';
      presets.syllableHighlight = true;
      presets.sensoryMode = true;
      presets.focusTimerMinutes = 15;
      presets.fontSize = 18;
      presets.readingRuler = true;
    }
    setSettings(prev => ({ ...prev, ...presets, profile }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, applyProfile }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
