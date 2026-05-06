import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/landing/LandingPage'
import EventsListPage from './pages/EventsListPage'
import EventDetailPage from './pages/EventDetailPage'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />

        <Route path="/events" element={<EventsListPage />} />
        <Route path="/events/:slug" element={<EventDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
