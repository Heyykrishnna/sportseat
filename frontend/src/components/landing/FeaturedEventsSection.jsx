import { useEffect, useState } from 'react'
import EventCard from '../events/EventCard'
import { events as localEvents } from '../../data/events'
import { getEvents } from '../../lib/api'

function FeaturedEventsSection() {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents({ sort: 'rating-desc' })
        if (data && data.length > 0) {
          setEvents(data.slice(0, 3))
        } else {
          setEvents(
            [...localEvents]
              .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
              .slice(0, 3)
          )
        }
      } catch (error) {
        setEvents(
          [...localEvents]
            .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
            .slice(0, 3)
        )
      } finally {
        setIsLoading(false)
      }
    }
    loadEvents()
  }, [])

  if (isLoading) {
    return (
      <section className="px-5 py-20 sm:px-8 lg:px-12 bg-gradient-to-r from-[#6fb1d2] to-[#172421]">
        <div className="text-center mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-white/50 animate-pulse">
            Loading...
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 bg-[#6fb1d2]">
      <div className="text-center mb-12">
        <h2 className="mt-2 text-4xl font-black text-white">
          Top Rated Events
        </h2>
        <p className="mt-2 text-white/70">
          These are the most popular and highly-rated events
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedEventsSection