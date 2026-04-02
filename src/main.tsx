import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import '@/index.css'

// Suppress known upstream warnings
const originalWarn = console.warn
console.warn = (...args) => {
  if (typeof args[0] === 'string') {
    if (args[0].includes('THREE.Clock: This module has been deprecated')) return
    if (args[0].includes('The width(') && args[0].includes('and height(')) return
  }
  originalWarn(...args)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
