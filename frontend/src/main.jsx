import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes,Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AddEvent from './pages/AddEvent.jsx'
import EventPage from './pages/EventPage.jsx'
import ArchivedEvents from './pages/ArchivedEvents.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App/>}/>
    <Route path="/add" element={<AddEvent/>}/>
    <Route path="/event-page/:id" element={<EventPage/>}/>
    <Route path='/archive' element={<ArchivedEvents/>}/>

    
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
