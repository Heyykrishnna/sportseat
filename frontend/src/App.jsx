import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/landing/LandingPage'
import EventsListPage from './pages/EventsListPage'
import EventDetailPage from './pages/EventDetailPage'
import NavEvents from './pages/Navicons/NavEvents'
import Mytickets from './pages/Navicons/Mytickets'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        
        <Route path="/events" element={<NavEvents />} />
        <Route path="/mytickets" element={<Mytickets />} />



        <Route path="/events" element={<EventsListPage />} />
        <Route path="/events/:slug" element={<EventDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
