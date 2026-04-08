import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Track current product/page for theme restrictions
  const [currentProduct, setCurrentProduct] = useState('support');

  // Agent status — always starts as 'away' so the demo transition is visible
  const [agentStatus, setAgentStatus] = useState('away');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme: 'light',
      currentProduct,
      setCurrentProduct,
      isDarkModeAllowed: false,
      agentStatus,
      setAgentStatus,
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






