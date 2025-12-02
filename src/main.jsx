import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FiberScope } from './fiberscope/FiberScope'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FiberScope>
      <App />
    </FiberScope>
  </StrictMode>,
)
