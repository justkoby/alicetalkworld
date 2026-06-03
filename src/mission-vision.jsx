import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './atw.css'
import MissionVisionPage from './components/MissionVisionPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MissionVisionPage />
  </StrictMode>,
)
