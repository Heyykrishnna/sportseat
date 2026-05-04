import basketballHero from '../../assets/landing/basketball-hero.png'
import Header from './Header'

function Hero() {
  return (
    <section id="top" className="relative min-h-[640px] overflow-hidden bg-[#6fb1d2] text-white md:min-h-[760px]">
      <Header />

      <img
        className="absolute inset-0 h-full w-full object-cover object-[58%_40%]"
        src={basketballHero}
        alt="Basketball player holding a ball against a blue sky"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,106,145,0.62),rgba(36,106,145,0.12)_56%,rgba(36,106,145,0.3))]" />

      <div className="relative z-20 flex min-h-[640px] items-end px-5 pb-10 pt-32 sm:px-8 md:min-h-[760px] lg:px-12 lg:pb-14">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(240px,0.28fr)] lg:items-end">
          <div className="max-w-xl">
            <h1 className="text-4xl font-light leading-[0.88]">
              Organize and Join The Tournaments
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                className="rounded-full bg-white px-6 py-3 text-sm font-black text-[#172421] shadow-[0_16px_32px_rgba(23,36,33,0.2)] transition hover:bg-[#edf4f7]"
                href="#tournaments"
              >
                Create Tournament
              </a>
              <a
                className="rounded-full border border-white/60 px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/12"
                href="#guide"
              >
                See The Flow
              </a>
            </div>
          </div>

          <div className="rounded-[6px] bg-white/90 p-3 text-[#172421] shadow-[0_18px_48px_rgba(20,58,72,0.22)] backdrop-blur">
            <div className="rounded-[4px] bg-[#dfede8] p-4">
              <p className="text-xs font-black uppercase text-[#5f8151]">Featured</p>
              <h2 className="mt-2 text-2xl font-black leading-none">City Hoops League</h2>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[0.68rem] font-bold">
                <span className="rounded-[4px] bg-white px-2 py-3">64 Teams</span>
                <span className="rounded-[4px] bg-white px-2 py-3">8 Venues</span>
                <span className="rounded-[4px] bg-white px-2 py-3">Live Draw</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
