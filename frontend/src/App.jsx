import { BrowserRouter, Outlet, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { SearchProvider } from './context/SearchContext'
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

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('auth_user')
  if (!user) {
    return <Navigate to="/auth" replace />
  }
  return children
}

function AppLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isEventDetail = pathname.startsWith('/events/')
  const isBooking = pathname.startsWith('/booking/')
  const isAuth = pathname === '/auth'

  return (
    <><SearchProvider>
      {!isAuth && (
        <PageHeader 
          transparent={isHome || isEventDetail} 
          showSearchIcon={isHome} 
          hideOnScroll={isBooking} 
        />
      )}
      <Outlet />
      </SearchProvider>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/mytickets" 
            element={
              <ProtectedRoute>
                <Mytickets />
              </ProtectedRoute>
            } 
          />
          <Route path="/events" element={<EventsListPage />} />
          <Route path="/events/:slug" element={<EventDetailPage />} />
          <Route path="/booking/:slug" element={<SeatBookingPage />} />
          <Route path="/booking/:slug/confirmation/:bookingReference" element={<SeatBookingPage />} />
          <Route 
            path="/admin/events/new" 
            element={
              <ProtectedRoute>
                <AdminCreateEventPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/terms" element={<TermsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

