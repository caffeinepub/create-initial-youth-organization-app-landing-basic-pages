import { useState, useEffect } from 'react';
import { getStoredTheme, setStoredTheme, applyTheme, type Theme } from '@/utils/theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setStoredTheme(newTheme);
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };
}
