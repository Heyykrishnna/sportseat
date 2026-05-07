import { Link } from 'react-router-dom'

const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Events', href: '/events' },
  { label: 'Tournaments', href: '/#tournaments' },
  { label: 'Participants', href: '/#participants' },
  { label: 'FAQ', href: '/#faq' },
]

function PageHeader({ transparent = false, showSearchIcon = false }) {
  const bg = transparent
    ? 'bg-transparent'
    : 'bg-[#172421]/95 backdrop-blur'

  return (
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
      </div>
    </header>
  )
}

export default PageHeader
