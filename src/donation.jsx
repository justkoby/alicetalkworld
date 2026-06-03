import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './atw.css'
import DonationPage from './components/DonationPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DonationPage />
  </StrictMode>,
)
