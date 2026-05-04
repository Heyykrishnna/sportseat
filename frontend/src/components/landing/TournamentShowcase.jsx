import tennisAction from '../../assets/landing/tennis-action.png'

function TournamentShowcase() {
  return (
    <section id="tournaments" className="grid gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.72fr_1fr] lg:px-12 lg:py-16">
      <div className="flex flex-col justify-between">
        <div>
          <p className="w-fit rounded-full bg-[#6fb1d2] px-4 py-2 text-xs font-black uppercase text-white">
            Trending tournament
          </p>
          <h2 className="mt-5 text-4xl font-black leading-[0.95] sm:text-5xl">
            Tennis Clash: The Ultimate Showdown!
          </h2>
        </div>
        <div className="mt-8 max-w-sm">
          <p className="text-sm font-semibold leading-6 text-[#5c6965]">
            Serve, score, and scale your competition with seedings, match slots, player registrations, and automated standings.
          </p>
          <a
            className="mt-6 inline-flex rounded-full border border-[#172421] px-5 py-3 text-sm font-black text-[#253733] transition"
            href="#guide"
          >
            Plan An Event
          </a>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_0.55fr]">
        <div className="overflow-hidden rounded-[6px] bg-[#6fb1d2]">
          <img className="h-full min-h-[420px] w-full object-cover object-center" src={tennisAction} alt="Tennis player jumping for a shot" />
        </div>
        <div className="grid gap-4">
          <article className="rounded-[6px] bg-white p-5">
            <p className="text-4xl font-black leading-none">128</p>
            <h3 className="mt-3 text-base font-black">Open player slots</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#66736f]">Waitlists and team approvals keep registrations controlled.</p>
          </article>
          <article className="rounded-[6px] bg-[#ddebc7] p-5">
            <p className="text-4xl font-black leading-none">24</p>
            <h3 className="mt-3 text-base font-black">Court sessions</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#5d6d52]">Time blocks are organized for players and spectators.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default TournamentShowcase
