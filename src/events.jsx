import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './atw.css';
import EventsPage from './components/EventsPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EventsPage />
  </StrictMode>
);
