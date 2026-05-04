const pillars = [
  {
    label: 'Discover',
    title: 'Find open tournaments by sport, city, format, and date.',
  },
  {
    label: 'Register',
    title: 'Join as a player, team, coach, organizer, or venue partner.',
  },
  {
    label: 'Track',
    title: 'Follow brackets, schedules, standings, and live score updates.',
  },
]

function FeatureIntro() {
  return (
    <section id="about" className="grid gap-8 border-b border-[#dfe3dc] px-5 py-10 sm:px-8 lg:grid-cols-[0.72fr_1fr] lg:px-12 lg:py-14">
      <div className="rounded-[6px] bg-[#172421] p-5 text-white">
        <p className="text-xs font-bold uppercase text-[#98c3d6]">Built for sports organizers</p>
        <h2 className="mt-5 text-3xl font-black leading-[0.95] sm:text-4xl">
          Brackets, bookings, and match days in one clean flow.
        </h2>
      </div>

      <div>
        <p className="max-w-2xl text-lg font-semibold leading-8 text-[#455653]">
          Dive into a tournament platform that keeps event creation, registrations, fixtures, score updates, and participant communication organized without clutter.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.label} className="rounded-[6px] border border-[#dfe3dc] bg-white p-5">
              <p className="text-xs font-black uppercase text-[#639cba]">{pillar.label}</p>
              <h3 className="mt-3 text-base font-black leading-snug text-[#172421]">{pillar.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureIntro
