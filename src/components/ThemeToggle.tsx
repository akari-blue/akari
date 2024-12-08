import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useBlueskyStore } from '../lib/bluesky/store';

export function ThemeToggle() {
  const { theme, toggleTheme } = useBlueskyStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg ${
        isDark
          ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}