import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AdaptLearnSettings {
  isDyslexicFont: boolean;
  lineHeight: number;
  letterSpacing: number;
  sensoryMode: boolean;
}

const DEFAULT_SETTINGS: AdaptLearnSettings = {
  isDyslexicFont: false,
  lineHeight: 1.5,
  letterSpacing: 0,
  sensoryMode: false,
};

interface SettingsContextType {
  settings: AdaptLearnSettings;
  updateSetting: <K extends keyof AdaptLearnSettings>(key: K, value: AdaptLearnSettings[K]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AdaptLearnSettings>(() => {
    try {
      const saved = localStorage.getItem('adaptlearn_settings');
      if (saved) {
        return JSON.parse(saved);
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
    
    // We intentionally removed document.body.style.lineHeight and letterSpacing
    // so they can be explicitly applied only to reading containers
  }, [settings]);

  const updateSetting = <K extends keyof AdaptLearnSettings>(key: K, value: AdaptLearnSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
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
