import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { LangProvider } from './i18n.tsx';

// No StrictMode — it double-runs canvas/GSAP effects (react-dev.md).
createRoot(document.getElementById('root')!).render(
  <LangProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LangProvider>,
);
