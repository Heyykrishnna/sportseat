const footerLinks = ['About', 'Events', 'Pricing', 'Support']

function CTAFooter() {
  return (
    <footer id="faq" className="bg-white px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="text-center">
        <p className="text-sm font-black uppercase text-[#78995a]">Ready to host your next tournament?</p>
        <h2 className="mt-3 text-[clamp(3rem,9vw,8rem)] font-black leading-[0.78] text-[#172421]">LET'S GO!</h2>
        <a
          className="mt-8 inline-flex rounded-full bg-[#172421] px-8 py-4 text-sm font-black text-white transition hover:bg-[#253733]"
          href="#top"
        >
          Launch SportSeat
        </a>
      </div>

      <div className="mt-14 grid gap-8 border-t border-[#dfe3dc] pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-sm">
          <p className="text-sm font-black uppercase">SportSeat</p>
          <p className="mt-4 text-sm font-semibold leading-6 text-[#68736f]">
            A clean tournament landing page for organizing sports events, participant registration, match tracking, and seat booking.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {footerLinks.map((link) => (
            <a key={link} className="rounded-full border border-[#dfe3dc] px-5 py-2 text-sm font-black text-[#172421] transition hover:bg-[#edf4f7]" href="#top">
              {link}
            </a>
          ))}
        </div>
      </div>

      <p className="mt-10 text-[clamp(4rem,18vw,14rem)] font-black leading-[0.72] text-[#86a35f]">SPORTSEAT</p>
    </footer>
  )
}

export default CTAFooter
