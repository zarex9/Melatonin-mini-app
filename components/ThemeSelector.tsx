
import React from 'react';
import { THEMES, Theme } from '../constants/themes';

interface ThemeSelectorProps {
  currentThemeId: string;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentThemeId, onThemeChange }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-slate-800 rounded-xl border border-slate-700 mb-4">
      <h3 className="font-bold text-sm text-slate-400 uppercase tracking-wider">Select Theme</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme)}
            className={`px-4 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
              currentThemeId === theme.id
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
