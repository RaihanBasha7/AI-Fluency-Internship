import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './app/App.tsx';
import { siteConfig } from './data/site.ts';
import './index.css';

document.title = `${siteConfig.name} — ${siteConfig.role}`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);
