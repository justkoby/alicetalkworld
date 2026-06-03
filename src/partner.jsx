import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './atw.css'
import PartnerPage from './components/PartnerPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PartnerPage />
  </StrictMode>,
)
