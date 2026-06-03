import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './atw.css'
import GetInvolvedPage from './components/GetInvolvedPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GetInvolvedPage />
  </StrictMode>,
)
