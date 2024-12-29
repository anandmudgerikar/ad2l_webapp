import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Rankings from './rankings.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rankings />
  </StrictMode>,
)
