import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from './components/landing/LandingPage'
import EventsListPage from './pages/EventsListPage'
import EventDetailPage from './pages/EventDetailPage'
import SeatBookingPage from './pages/SeatBookingPage'
import Mytickets from './pages/Navicons/Mytickets'
import AdminCreateEventPage from './pages/AdminCreateEventPage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import PageHeader from './components/shared/PageHeader'
import TermsPage from './pages/TermsPage'




function AppLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isEventDetail = pathname.startsWith('/events/')
  const isBooking = pathname.startsWith('/booking/')
  const isAuth = pathname === '/auth'

  return (
    <>
      {!isAuth && (
        <PageHeader 
          transparent={isHome || isEventDetail} 
          showSearchIcon={isHome} 
          hideOnScroll={isBooking} 
        />
      )}
      <Outlet />
    </>
  )
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mytickets" element={<Mytickets />} />
          <Route path="/events" element={<EventsListPage />} />
          <Route path="/events/:slug" element={<EventDetailPage />} />
          <Route path="/booking/:slug" element={<SeatBookingPage />} />
          <Route path="/booking/:slug/confirmation/:bookingReference" element={<SeatBookingPage />} />
          <Route path="/admin/events/new" element={<AdminCreateEventPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
      </Routes>



    </BrowserRouter>
  )
}

export default App
