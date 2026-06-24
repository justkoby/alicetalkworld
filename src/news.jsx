import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './atw.css'
import NewsPage from './components/NewsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NewsPage />
  </StrictMode>,
)
