import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider as GardenThemeProvider } from '@zendeskgarden/react-theming'
import { ThemeProvider, useTheme } from './contexts'
import './index.css'
import App from './App.jsx'

// Resolve public-folder assets against Vite's base URL so paths work on sub-path deployments
const BASE = import.meta.env.BASE_URL;
document.documentElement.style.setProperty(
  '--external-link-icon',
  `url('${BASE}assets/External%20link.svg')`
);

function GardenThemeWrapper({ children }) {
  const { theme, currentProduct } = useTheme()
  const effectiveTheme = currentProduct === 'support' ? theme : 'light'
  return (
    <GardenThemeProvider colorScheme={effectiveTheme}>
      {children}
    </GardenThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <GardenThemeWrapper>
        <App />
      </GardenThemeWrapper>
    </ThemeProvider>
  </StrictMode>,
)
