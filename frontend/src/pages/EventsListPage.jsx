import { useMemo, useState } from 'react'
import EventCard from '../components/events/EventCard'
import { events } from '../data/events'
import CTAFooter from '../components/landing/CTAFooter'

const sports = ['All', 'Football', 'Basketball', 'Cricket', 'Tennis']
const categories = ['All', ...new Set(events.map((event) => event.category))]

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

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    const filteredEvents = events.filter((event) => {
      const sportMatch = active === 'All' || event.sport === active
      const categoryMatch = category === 'All' || event.category === category
      const searchMatch =
        normalizedSearch.length === 0 ||
        event.title.toLowerCase().includes(normalizedSearch) ||
        event.venue.toLowerCase().includes(normalizedSearch) ||
        event.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch))

      return sportMatch && categoryMatch && searchMatch
    })

    const parsePrice = (price) => Number(price.replace(/[^\d]/g, ''))
    const parseDate = (date) => new Date(date).getTime()
    const parseRating = (rating) => Number(rating)

    return filteredEvents.toSorted((a, b) => {
      if (sortBy === 'date-desc') return parseDate(b.date) - parseDate(a.date)
      if (sortBy === 'price-asc') return parsePrice(a.price) - parsePrice(b.price)
      if (sortBy === 'price-desc') return parsePrice(b.price) - parsePrice(a.price)
      if (sortBy === 'rating-desc') return parseRating(b.rating) - parseRating(a.rating)
      return parseDate(a.date) - parseDate(b.date)
    })
  }, [active, category, search, sortBy])

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
          <div className="mt-6 w-full">
  <input
    type="text"
    placeholder="🔍 Search events by name, sport, or venue..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/60 text-sm font-semibold focus:outline-none focus:border-[#6fb1d2] transition"
  />
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
