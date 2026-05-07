import { Link } from 'react-router-dom'
import SearchModal from './SearchModal'
import { useSearch } from '../../context/SearchContext'

const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Events', href: '/events' },
  { label: 'Tournaments', href: '/#tournaments' },
  { label: 'Participants', href: '/#participants' },
  { label: 'FAQ', href: '/#faq' },
]

function PageHeader({ transparent = false, showSearchIcon = false }) {
  const { isSearchOpen, openSearch, closeSearch } = useSearch()
  
  const bg = transparent
    ? 'bg-transparent'
    : 'bg-[#172421]/95 backdrop-blur'

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-5 ${bg} text-white sm:px-8 lg:px-12`}
      >
        <Link className="text-sm font-black uppercase tracking-widest" to="/">
          SportSeat
        </Link>

        <nav className="hidden items-center gap-7 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold backdrop-blur md:flex">
          {navItems.map((item) => (
            <Link key={item.label} className="transition hover:text-[#98c3d6]" to={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {showSearchIcon && (
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search events"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </button>
          )}
          <Link
            className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-bold text-white backdrop-blur transition hover:bg-white/20"
            to="/events"
          >
            Browse Events
          </Link>
          
          {localStorage.getItem('auth_user') ? (
            <Link to="/profile" className="relative h-9 w-9 overflow-hidden rounded-full border border-white/30 transition hover:border-white/60">
              <img 
                src="https://i.pinimg.com/736x/f4/fe/5a/f4fe5ad553f1f29d88a33451cd75c334.jpg" 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            </Link>
          ) : (
            <Link
              className="rounded-full bg-[#6fb1d2] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#5a9ec2]"
              to="/auth"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  )
}

export default PageHeader


