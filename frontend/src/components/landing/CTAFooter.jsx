import { Link } from 'react-router-dom'
const footerLinks = ['About', 'Events', 'Pricing', 'Support']

function CTAFooter() {
  return (
    <footer id="faq" className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#edf4f7]/80 via-white to-white pointer-events-none" />

      <div className="relative z-10 mx-auto mt-28 max-w-7xl grid gap-10 border-t border-[#dfe3dc] pt-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <div className="max-w-md text-left">
          <p className="text-lg font-black uppercase tracking-wider text-[#172421]">SportSeat</p>
          <p className="mt-5 text-sm font-semibold leading-relaxed text-[#68736f]">
            A clean tournament landing page for organizing sports events, participant registration, match tracking, and seat booking. Elevate your sports management experience.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <a 
              key={link} 
              className="rounded-full border border-[#dfe3dc] bg-white px-7 py-3 text-sm font-black text-[#172421] transition-all duration-300 hover:border-[#172421] hover:bg-[#172421] hover:text-white hover:-translate-y-1 hover:shadow-lg" 
              href="#top"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="relative z-0 mx-auto mt-24 max-w-7xl flex justify-center text-center">
        <p className="text-[clamp(4rem,20vw,15rem)] font-black leading-[0.72] text-[#86a35f] opacity-20 select-none">
          SPORTSEAT
        </p>
      </div>
      <div className="relative z-10 mx-auto mt-12 max-w-7xl border-t border-[#dfe3dc] pt-8 text-center">
  <p className="text-xs font-semibold text-[#68736f] mb-3">
    © 2026 SportSeat. All rights reserved.
  </p>
  <div className="flex justify-center gap-6">
    <Link 
      to="/terms" 
      className="text-sm font-bold text-[#6fb1d2] hover:underline transition"
    >
      Terms & Conditions
    </Link>
    <Link 
      to="/admin/events/new" 
      className="text-sm font-bold text-[#6fb1d2] hover:underline transition"
    >
      Admin Dashboard
    </Link>
  </div>
</div>


    </footer>
  )
}

export default CTAFooter
