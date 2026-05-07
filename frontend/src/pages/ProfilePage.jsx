import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getMyTickets } from '../lib/api'
import { 
  User, 
  Ticket, 
  Settings, 
  PlusCircle, 
  LogOut, 
  ChevronRight, 
  Mail, 
  Calendar,
  MapPin,
  ShieldCheck
} from 'lucide-react'

function ProfilePage() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('account')
  const [user, setUser] = useState(null)
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user')
    if (!savedUser) {
      navigate('/auth')
      return
    }
    const userData = JSON.parse(savedUser)
    setUser(userData)

    // Load tickets if account or tickets section is active
    loadTickets(userData.email)
  }, [navigate])

  async function loadTickets(email) {
    setIsLoading(true)
    try {
      const data = await getMyTickets(email)
      setTickets(data)
    } catch (error) {
      console.error('Failed to load tickets:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_session')
    navigate('/')
  }

  if (!user) return null

  const navItems = [
    { id: 'account', label: 'Account Details', icon: User },
    { id: 'tickets', label: 'My Bookings', icon: Ticket },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <main className="min-h-screen bg-[#f6f5ef] pt-32 pb-16 font-sans text-[#172421]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          
          {/* Left Sidebar Navigation */}
          <aside className="w-full lg:w-80">
            <div className="rounded-3xl border border-[#dfe3dc] bg-white p-6 shadow-[0_8px_30px_rgba(23,36,33,0.05)]">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-[#f6f5ef]">
                  <img 
                    src="https://i.pinimg.com/736x/f4/fe/5a/f4fe5ad553f1f29d88a33451cd75c334.jpg" 
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h2 className="mt-4 text-xl font-black">{user.user_metadata?.display_name || 'User'}</h2>
                <p className="text-xs font-bold text-[#68736f]">{user.email}</p>
                
                <Link 
                  to="/admin/events/new"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6fb1d2] py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-[#5a9ec2]"
                >
                  <PlusCircle className="h-4 w-4" />
                  Create Event
                </Link>
              </div>

              <nav className="mt-8 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold transition ${
                      activeSection === item.id 
                        ? 'bg-[#172421] text-white' 
                        : 'text-[#68736f] hover:bg-[#f6f5ef] hover:text-[#172421]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </div>
                    <ChevronRight className={`h-4 w-4 opacity-30 ${activeSection === item.id ? 'opacity-100' : ''}`} />
                  </button>
                ))}
                
                <button
                  onClick={handleSignOut}
                  className="mt-4 flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Right Content Area */}
          <div className="flex-1">
            <div className="min-h-[500px] rounded-3xl border border-[#dfe3dc] bg-white p-8 shadow-[0_8px_30px_rgba(23,36,33,0.05)] sm:p-10">
              
              {activeSection === 'account' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6fb1d2]">Overview</p>
                  <h1 className="mt-2 text-3xl font-black">Account Details</h1>
                  
                  <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#dfe3dc] bg-[#f9faf8] p-5">
                      <div className="flex items-center gap-3 text-[#68736f]">
                        <User className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Display Name</span>
                      </div>
                      <p className="mt-2 text-lg font-bold">{user.user_metadata?.display_name || 'Not set'}</p>
                    </div>

                    <div className="rounded-2xl border border-[#dfe3dc] bg-[#f9faf8] p-5">
                      <div className="flex items-center gap-3 text-[#68736f]">
                        <Mail className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Email Address</span>
                      </div>
                      <p className="mt-2 text-lg font-bold">{user.email}</p>
                    </div>

                    <div className="rounded-2xl border border-[#dfe3dc] bg-[#f9faf8] p-5">
                      <div className="flex items-center gap-3 text-[#68736f]">
                        <ShieldCheck className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Account Status</span>
                      </div>
                      <p className="mt-2 text-lg font-bold">Verified Member</p>
                    </div>

                    <div className="rounded-2xl border border-[#dfe3dc] bg-[#f9faf8] p-5">
                      <div className="flex items-center gap-3 text-[#68736f]">
                        <Calendar className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Joined</span>
                      </div>
                      <p className="mt-2 text-lg font-bold">{new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="mt-12 rounded-2xl bg-[#172421] p-8 text-white">
                    <h3 className="text-xl font-black">Membership Perks</h3>
                    <p className="mt-2 text-sm font-semibold text-white/70">As a SportSeat member, you get priority access to premium stadium seating and early bird discounts.</p>
                    <button className="mt-6 rounded-full bg-[#6fb1d2] px-6 py-3 text-xs font-black uppercase tracking-widest transition hover:bg-white hover:text-[#172421]">
                      Upgrade to Premium
                    </button>
                  </div>
                </div>
              )}

              {activeSection === 'tickets' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6fb1d2]">Bookings</p>
                  <h1 className="mt-2 text-3xl font-black">Your Tickets</h1>
                  
                  {isLoading ? (
                    <div className="mt-12 flex items-center justify-center py-20">
                      <p className="text-sm font-bold text-[#68736f]">Loading your tickets...</p>
                    </div>
                  ) : tickets.length > 0 ? (
                    <div className="mt-10 grid gap-4">
                      {tickets.map((ticket) => (
                        <div key={ticket.booking_reference} className="group relative flex flex-col items-start gap-6 rounded-3xl border border-[#dfe3dc] bg-white p-6 transition hover:border-[#6fb1d2] sm:flex-row sm:items-center">
                          <div className="h-20 w-20 overflow-hidden rounded-2xl bg-[#f6f5ef]">
                             <div className="flex h-full w-full items-center justify-center text-2xl">🎟</div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#6fb1d2]">
                                {ticket.booking_reference}
                              </span>
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-emerald-600">
                                {ticket.status}
                              </span>
                            </div>
                            <h3 className="mt-2 text-lg font-black">{ticket.events?.title}</h3>
                            <div className="mt-1 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[#68736f]">
                              <span className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                {ticket.events?.venue}
                              </span>
                              <span className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                {ticket.events?.event_date}
                              </span>
                            </div>
                          </div>

                          <div className="w-full text-left sm:w-auto sm:text-right">
                             <p className="text-xs font-bold text-[#68736f]">Seats</p>
                             <p className="mt-1 text-sm font-black">{(ticket.seats || []).join(', ')}</p>
                          </div>
                          
                          <Link 
                            to={`/events/${ticket.events?.slug}`}
                            className="absolute inset-0 z-0"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-12 rounded-3xl border border-dashed border-[#dfe3dc] py-20 text-center">
                       <Ticket className="mx-auto h-12 w-12 text-[#dfe3dc]" />
                       <h3 className="mt-4 text-lg font-black text-[#172421]">No tickets found</h3>
                       <p className="mt-1 text-sm font-semibold text-[#68736f]">You haven't booked any matches yet.</p>
                       <Link 
                         to="/events"
                         className="mt-6 inline-block rounded-full border border-[#6fb1d2] px-8 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-[#6fb1d2]"
                       >
                         Explore Events
                       </Link>
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'settings' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6fb1d2]">Preferences</p>
                  <h1 className="mt-2 text-3xl font-black">Settings</h1>
                  
                  <div className="mt-10 space-y-8">
                    <section>
                      <h3 className="text-lg font-black">Profile Visibility</h3>
                      <p className="text-sm font-semibold text-[#68736f]">Control who can see your booking history and achievements.</p>
                      <div className="mt-4 flex items-center gap-4">
                         <div className="h-6 w-11 rounded-full bg-[#172421] p-1">
                            <div className="h-4 w-4 rounded-full bg-white ml-auto" />
                         </div>
                         <span className="text-sm font-bold">Public Profile</span>
                      </div>
                    </section>

                    <section className="pt-8 border-t border-[#dfe3dc]">
                      <h3 className="text-lg font-black">Security</h3>
                      <p className="text-sm font-semibold text-[#68736f]">Manage your password and authentication methods.</p>
                      <button className="mt-4 rounded-xl border border-[#dfe3dc] px-6 py-3 text-xs font-black uppercase tracking-widest transition hover:border-[#172421]">
                        Change Password
                      </button>
                    </section>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default ProfilePage
