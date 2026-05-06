import { useState } from 'react'
import EventCard from '../components/events/EventCard'
import PageHeader from '../components/shared/PageHeader'
import { events } from '../data/events'
import CTAFooter from '../components/landing/CTAFooter'

const sports = ['All', 'Football', 'Basketball', 'Cricket', 'Tennis']

function EventsListPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? events : events.filter((e) => e.sport === active)

  return (
    <div className="min-h-screen bg-[#f6f5ef] font-sans text-[#172421]">
      <div className="bg-[#172421]">
        <PageHeader />

        <div className="px-5 pb-14 pt-28 sm:px-8 lg:px-12">
          <p className="text-xs font-black uppercase tracking-widest text-[#6fb1d2]">
            Browse All Events
          </p>
          <h1 className="mt-3 max-w-2xl text-5xl font-black leading-[0.92] text-white sm:text-6xl">
            Upcoming Sports Events
          </h1>
          <p className="mt-5 max-w-lg text-sm font-semibold leading-7 text-white/60">
            Discover tournaments, leagues, and championship fixtures across every sport. Filter by
            discipline and book your seat before they sell out.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setActive(sport)}
                className={`rounded-full border px-5 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                  active === sport
                    ? 'border-[#6fb1d2] bg-[#6fb1d2] text-white'
                    : 'border-white/20 bg-white/8 text-white/70 hover:border-white/50 hover:text-white'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-[#68736f]">
            {filtered.length} event{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </main>

      <CTAFooter />
    </div>
  )
}

export default EventsListPage
