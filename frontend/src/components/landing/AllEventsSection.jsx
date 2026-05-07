import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../events/EventCard'
import { events as localEvents } from '../../data/events'
import { getEvents } from '../../lib/api'

function AllEventsSection() {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents()
        if (data && data.length > 0) {
          setEvents(data)
        } else {
          setEvents(localEvents)
        }
      } catch (error) {
        setEvents(localEvents)
      } finally {
        setIsLoading(false)
      }
    }
    loadEvents()
  }, [])

  if (isLoading) return null

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 bg-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#6fb1d2]">
            Explore More
          </p>
          <h2 className="mt-2 text-4xl font-black text-[#172421]">
            Upcoming Matches & Events
          </h2>
          <p className="mt-2 text-[#68736f] max-w-xl">
            Don't miss out on these upcoming sports spectacles. Book your tickets now to secure your spot in the stands.
          </p>
        </div>
        <Link 
          to="/events" 
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#172421] px-6 py-3 text-sm font-black text-[#172421] transition hover:bg-[#172421] hover:text-white"
        >
          View All Events
          <span>→</span>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.slice(0, 8).map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </section>
  )
}

export default AllEventsSection
