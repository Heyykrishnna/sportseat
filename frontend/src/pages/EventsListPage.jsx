import { useEffect, useMemo, useState } from 'react'
import EventCard from '../components/events/EventCard'
import CTAFooter from '../components/landing/CTAFooter'
import { getEvents } from '../lib/api'

const sports = ['All', 'Football', 'Basketball', 'Cricket', 'Tennis']

const sortOptions = [
  { value: 'date-asc', label: 'Date: Soonest' },
  { value: 'date-desc', label: 'Date: Latest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
]

function EventsListPage() {
  const [active, setActive] = useState('All')
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('date-asc')
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadEvents() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getEvents({
          q: search,
          sport: active,
          category,
          sort: sortBy,
        })

        if (!controller.signal.aborted) {
          setEvents(data)
        }
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setEvents([])
          setError(fetchError.message || 'Could not load events')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadEvents()

    return () => {
      controller.abort()
    }
  }, [active, category, search, sortBy])

  const categories = useMemo(() => {
    return ['All', ...new Set(events.map((event) => event.category))]
  }, [events])

  return (
    <div className="min-h-screen bg-[#f6f5ef] font-sans text-[#172421]">
      <div className="bg-[#172421]">
        <div className="px-5 pb-14 pt-32 sm:px-8 lg:px-12">
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

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_200px_220px]">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by event, venue, or tag"
              className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white placeholder:text-white/60 outline-none transition focus:border-[#6fb1d2]"
            />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white outline-none transition focus:border-[#6fb1d2]"
            >
              {categories.map((item) => (
                <option key={item} value={item} className="bg-[#172421] text-white">
                  {item === 'All' ? 'All Categories' : item}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white outline-none transition focus:border-[#6fb1d2]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#172421] text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
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
            {events.length} event{events.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {isLoading && (
          <p className="mt-6 text-sm font-semibold text-[#68736f]">Loading events...</p>
        )}

        {error && !isLoading && (
          <p className="mt-6 text-sm font-semibold text-red-600">{error}</p>
        )}

        {!isLoading && !error && events.length === 0 && (
          <p className="mt-6 text-sm font-semibold text-[#68736f]">No events matched your filters.</p>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </main>

      <CTAFooter />
    </div>
  )
}

export default EventsListPage
