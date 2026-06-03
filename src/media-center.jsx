import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './atw.css'
import MediaCenterPage from './components/MediaCenterPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MediaCenterPage />
  </StrictMode>,
)
