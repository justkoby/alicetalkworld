import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './atw.css'
import VolunteerPage from './components/VolunteerPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VolunteerPage />
  </StrictMode>,
)
