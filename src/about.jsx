import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './atw.css'
import AboutPage from './components/AboutPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AboutPage />
  </StrictMode>,
)
