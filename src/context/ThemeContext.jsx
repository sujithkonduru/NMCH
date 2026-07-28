import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => localStorage.getItem('canteen_theme') === 'dark');

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('canteen_theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('canteen_theme', 'light');
    }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
