import basketballHero from '../../assets/landing/basketball-hero.png'
import { useSearch } from '../../context/SearchContext'

function Hero() {
  const { openSearch } = useSearch()

  return (
    <section id="top" className="relative min-h-[640px] overflow-hidden bg-[#6fb1d2] text-white md:min-h-[760px]">
      <img
        className="absolute inset-0 h-full w-full object-cover object-[58%_40%]"
        src={basketballHero}
        alt="Basketball player holding a ball against a blue sky"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,106,145,0.62),rgba(36,106,145,0.12)_56%,rgba(36,106,145,0.3))]" />

      <div className="relative z-20 flex min-h-[640px] items-end px-5 pb-10 pt-32 sm:px-8 md:min-h-[760px] lg:px-12 lg:pb-14">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(240px,0.28fr)] lg:items-end">
          <div className="max-w-xl">
            <h1 className="text-6xl font-bold leading-[0.88]">
              Organize and Join The Tournaments
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={openSearch}
                className="inline-flex items-center gap-2 rounded-full bg-[#172421] px-6 py-3 text-sm font-black text-white transition hover:bg-[#6fb1d2]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                Search Events
              </button>
              <a
                className="rounded-full border font-light border-[#172421] px-6 py-3 text-sm text-[#172421] transition"
                href="#tournaments"
              >
                Create Tournament
              </a>
              <a
                className="rounded-full border border-white/60 px-6 py-3 text-sm font-light text-white backdrop-blur transition hover:bg-white/12"
                href="#guide"
              >
                See The Flow
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

