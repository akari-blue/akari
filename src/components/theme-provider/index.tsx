import { useEffect, useState } from 'react';
import { Theme, ThemeProviderContext } from './context';

type ColorScheme = 'light' | 'dark';
type ColorSchemeCallback = (scheme: ColorScheme) => void;

function useColorScheme(callback?: ColorSchemeCallback) {
  // Initialize state with current color scheme
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    // Check if window is defined (for SSR)
    if (typeof window === 'undefined') return 'light';

    // Get initial color scheme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Handler function to update state and call callback
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const newScheme: ColorScheme = e.matches ? 'dark' : 'light';
      setColorScheme(newScheme);
      callback?.(newScheme);
    };

    // Add listener and call it immediately to set initial value
    mediaQuery.addEventListener('change', handleChange);
    handleChange(mediaQuery);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [callback]);

  return colorScheme;
}

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);
  useColorScheme((systemTheme) => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
