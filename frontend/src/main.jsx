import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes,Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AddEvent from './pages/AddEvent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App/>}/>
    <Route path="/add" element={<AddEvent/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
