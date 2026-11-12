import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import './App.scss'
import routes from './routes'

const container = document.getElementById('root')

if (container) createRoot(container).render(<>{routes}</>)
