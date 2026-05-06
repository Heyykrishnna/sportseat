const navItems = [
  {name: 'About', path: "/about"},
  {name: 'Tournaments', path: "/tournaments"},
  {name: 'Participants', path: "/participants"},
  {name: 'Teams', path: "/teams"}, 
  {name: 'FAQ', path: "/faq"}
]

function Header() {
  return (
    <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-5 text-white sm:px-8 lg:px-12">
      <Link className="text-sm font-black uppercase" to="/">
        SportSeat
      </Link>

      <nav className="hidden items-center gap-7 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold backdrop-blur md:flex">
        {navItems.map((item) => (
          <a key={item.name} className="transition hover:text-[#d9ecf7]" href={item.path}>
            {item.name}
          </a>
        ))}
      </nav>

      <Link
        className="rounded-full bg-[#172421] px-5 py-2 text-xs font-bold text-white shadow-[0_10px_24px_rgba(23,36,33,0.24)] transition hover:bg-[#253733]"
        to="/events"
      >
        Browse Events
      </Link>
    </header>
  )
}

export default Header
