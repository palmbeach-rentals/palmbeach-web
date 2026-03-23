import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import { initWebVitals } from './app/performance/webVitals';
import './styles/index.css';

if (import.meta.env.PROD) {
  initWebVitals();
}

createRoot(document.getElementById('root')!).render(<App />);
