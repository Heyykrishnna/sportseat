const footerLinks = ['About', 'Events', 'Pricing', 'Support']

function CTAFooter() {
  return (
    <footer id="faq" className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#edf4f7]/80 via-white to-white pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <span className="inline-block rounded-full bg-[#edf4f7] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#78995a] ring-1 ring-[#78995a]/20">
          Ready to host your next tournament?
        </span>
        
        <h2 className="mt-8 text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.8] tracking-tighter text-[#172421] transition-transform duration-700 hover:scale-[1.02]">
          LET'S GO!
        </h2>
        
        <a
          className="group relative mt-12 inline-flex items-center justify-center overflow-hidden rounded-full bg-[#172421] px-10 py-5 text-sm font-black text-white transition-all duration-300 hover:bg-[#253733] hover:shadow-[0_8px_30px_rgb(23,36,33,0.3)] hover:-translate-y-1"
          href="#top"
        >
          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-12">
            Launch SportSeat
          </span>
          <span className="absolute inset-0 z-10 flex translate-y-12 items-center justify-center transition-transform duration-300 group-hover:translate-y-0">
            Launch SportSeat
          </span>
        </a>
      </div>

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
              className="group relative overflow-hidden rounded-full border border-[#dfe3dc] bg-white px-7 py-3 text-sm font-black text-[#172421] transition-all duration-300 hover:border-[#172421] hover:bg-[#172421] hover:text-white hover:-translate-y-1 hover:shadow-lg" 
              href="#top"
            >
              <span className="relative z-10">{link}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="relative z-0 mx-auto mt-24 max-w-7xl flex justify-center text-center">
        <p className="text-[clamp(4rem,20vw,15rem)] font-black leading-[0.72] text-[#86a35f] opacity-20 select-none">
          SPORTSEAT
        </p>
      </div>
    </footer>
  )
}

export default CTAFooter
