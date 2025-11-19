import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Appf from './App_f.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Appf />
    <App />
  </StrictMode>
);
