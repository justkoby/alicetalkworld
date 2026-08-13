import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './atw.css'
import ResourcesPage from './components/ResourcesPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResourcesPage />
  </StrictMode>,
)
