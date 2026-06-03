import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './atw.css'
import Atw5HighlightsPage from './components/Atw5HighlightsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Atw5HighlightsPage />
  </StrictMode>,
)
