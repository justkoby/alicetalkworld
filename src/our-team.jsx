import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './atw.css'
import OurTeamPage from './components/OurTeamPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OurTeamPage />
  </StrictMode>,
)
