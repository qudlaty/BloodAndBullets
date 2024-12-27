import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './DEFAULT-index.css'
import App from 'DEFAULT-App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
