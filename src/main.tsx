import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Splash from './Splash.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>,
)
