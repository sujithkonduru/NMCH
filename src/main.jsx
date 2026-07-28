import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Enable mock API when VITE_USE_MOCK=true (dev / demo mode)
if (import.meta.env.VITE_USE_MOCK === 'true') {
  await import('./api/mockAdapter.js');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
