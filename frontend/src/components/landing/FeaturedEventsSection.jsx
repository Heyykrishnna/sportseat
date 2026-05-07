import EventCard from '../events/EventCard'
import { events } from '../../data/events'

function FeaturedEventsSection() {
  // Top 3 events by rating
  const featured = events
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 3)

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 bg-gradient-to-r from-[#6fb1d2] to-[#172421]">
      <div className="text-center mb-12">
        <p className="text-xs font-black uppercase tracking-widest text-white">
          ⭐ Featured
        </p>
        <h2 className="mt-2 text-4xl font-black text-white">
          Top Rated Events
        </h2>
        <p className="mt-2 text-white/70">
          These are the most popular and highly-rated events
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedEventsSection