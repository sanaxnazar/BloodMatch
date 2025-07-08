import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'emergency' | 'healthcare';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('bloodmatch-theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme classes to document
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('dark', 'emergency', 'healthcare');
    
    // Apply current theme
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'emergency') {
      root.classList.add('emergency');
    } else if (theme === 'healthcare') {
      root.classList.add('healthcare');
    }
    
    // Save to localStorage
    localStorage.setItem('bloodmatch-theme', theme);
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDarkMode = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};