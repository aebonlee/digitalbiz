import { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextValue {
  theme: string;
  mode: ThemeMode;
  toggleTheme: () => void;
  colorTheme: string;
  setColorTheme: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const getTimeBasedTheme = () => {
  const hour = new Date().getHours();
  return (hour >= 6 && hour < 18) ? 'light' : 'dark';
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('auto');

  const [theme, setTheme] = useState(() => getTimeBasedTheme());

  const [colorTheme, setColorTheme] = useState('blue');

  useEffect(() => {
    if (mode !== 'auto') {
      setTheme(mode);
      return;
    }
    setTheme(getTimeBasedTheme());
    const interval = setInterval(() => {
      setTheme(getTimeBasedTheme());
    }, 60000);
    return () => clearInterval(interval);
  }, [mode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-color', colorTheme);
  }, [colorTheme]);

  const toggleTheme = () => {
    setMode(prev => {
      if (prev === 'auto') return 'light';
      if (prev === 'light') return 'dark';
      return 'auto';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
