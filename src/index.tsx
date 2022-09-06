import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const rootEl = document.getElementById('root')!
const container = createRoot(rootEl)
container.render(<App />)
