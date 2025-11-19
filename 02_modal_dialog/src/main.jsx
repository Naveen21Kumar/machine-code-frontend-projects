import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App_f from './App_f.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App_f />
    <App />
  </StrictMode>
);
