import { Link } from 'react-router-dom'

const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Events', href: '/events' },
  { label: 'Tournaments', href: '/#tournaments' },
  { label: 'Participants', href: '/#participants' },
  { label: 'FAQ', href: '/#faq' },
]

function PageHeader({ transparent = false }) {
  const bg = transparent
    ? 'bg-transparent'
    : 'bg-[#172421]'

  return (
    <header
      className={`left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-5 ${bg} text-white sm:px-8 lg:px-12`}
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

      <Link
        className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-bold text-white backdrop-blur transition hover:bg-white/20"
        to="/events"
      >
        Browse Events
      </Link>
    </header>
  )
}

export default PageHeader
