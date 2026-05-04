import basketballHero from '../../assets/landing/basketball-hero.png'

const stats = [
  ['1,500+', 'Tournaments Hosted'],
  ['2.3M+', 'Participants Engaged'],
  ['50+', 'Sports Organizations'],
]

const tableRows = [
  ['Rangers', '18', '12', '42'],
  ['Falcons', '18', '10', '36'],
  ['Cyclones', '18', '9', '32'],
  ['Warriors', '18', '8', '29'],
]

function StatsSection() {
  return (
    <section id="teams" className="bg-[#eef3f0] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="overflow-hidden rounded-[6px] bg-[#81bdd8]">
        <div className="grid lg:grid-cols-[1fr_0.8fr]">
          <div className="relative min-h-[430px]">
            <img className="absolute inset-0 h-full w-full object-cover object-[50%_42%]" src={basketballHero} alt="Basketball player ready for a tournament" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(33,96,123,0.05),rgba(33,96,123,0.42))]" />
          </div>

          <div className="flex flex-col justify-end p-6 text-white sm:p-9">
            <p className="text-xs font-black uppercase text-white/80">Tournament impact</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.98] sm:text-5xl">
              Success is often the result of bold decisions that show up on game day.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {stats.map(([value, label]) => (
                <article key={label} className="rounded-[6px] bg-white p-4 text-[#172421]">
                  <p className="text-2xl font-black leading-none">{value}</p>
                  <h3 className="mt-2 text-xs font-black uppercase">{label}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.82fr_1fr]">
        <div className="rounded-[6px] bg-[#7fa35c] p-7 text-white">
          <p className="text-xs font-black uppercase text-white/75">Live stats</p>
          <h2 className="mt-4 text-4xl font-black leading-[0.98]">Live Stats & Leaderboards</h2>
          <p className="mt-5 max-w-md text-sm font-semibold leading-6 text-white/82">
            Match outcomes, table movement, points, and qualification progress stay visible while the tournament is running.
          </p>
        </div>

        <div className="rounded-[6px] bg-[#172421] p-5 text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-xs font-black uppercase text-[#99c2d5]">League table</p>
              <h3 className="mt-1 text-2xl font-black">Standings</h3>
            </div>
            <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#172421]">Live</span>
          </div>
          <div className="mt-4 overflow-hidden rounded-[4px] border border-white/10">
            <div className="grid grid-cols-[1fr_48px_48px_48px] bg-white/8 px-4 py-3 text-xs font-black uppercase text-white/60">
              <span>Team</span>
              <span>GP</span>
              <span>W</span>
              <span>Pts</span>
            </div>
            {tableRows.map((row) => (
              <div key={row[0]} className="grid grid-cols-[1fr_48px_48px_48px] border-t border-white/10 px-4 py-4 text-sm font-bold">
                {row.map((cell) => (
                  <span key={cell}>{cell}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
