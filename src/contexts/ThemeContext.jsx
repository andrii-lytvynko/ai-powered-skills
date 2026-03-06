import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved;

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Track current product/page for theme restrictions
  const [currentProduct, setCurrentProduct] = useState('support');

  useEffect(() => {
    // Only apply saved dark theme if on support page
    const effectiveTheme = currentProduct === 'support' ? theme : 'light';
    console.log('[Theme Debug] currentProduct:', currentProduct, 'theme:', theme, 'effectiveTheme:', effectiveTheme, 'isDarkModeAllowed:', currentProduct === 'support');
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    // Keep localStorage preference even on other pages
    localStorage.setItem('theme', theme);
  }, [theme, currentProduct]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Helper property to check if dark mode is allowed on current page
  const isDarkModeAllowed = currentProduct === 'support';

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      currentProduct,
      setCurrentProduct,
      isDarkModeAllowed
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}






