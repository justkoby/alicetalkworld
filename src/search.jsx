import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './atw.css'
import SearchPage from './components/SearchPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchPage />
  </StrictMode>,
)
