import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { events as localEvents } from '../../data/events'
import { getEvents } from '../../lib/api'

function TournamentShowcase() {
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

  if (isLoading || events.length === 0) {
    return (
      <section id="tournaments" className="px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
        <div className="h-[400px] w-full animate-pulse rounded-xl bg-gray-200" />
      </section>
    )
  }

  const sortedEvents = [...events].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
  const trendingEvent = sortedEvents[0]
  
  const otherEvents = events.filter(e => e.slug !== trendingEvent.slug)

  return (
    <section id="tournaments" className="px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
      <div className="grid gap-6 lg:grid-cols-[0.58fr_1fr]">
        <div className="flex flex-col justify-between">
          <div>
            <p className="w-fit rounded-full bg-[#6fb1d2] px-4 py-2 text-xs font-black uppercase text-white">
              Trending tournament
            </p>
            <h2 className="mt-4 text-3xl font-black leading-[0.95] sm:text-4xl">
              {trendingEvent.title}: {trendingEvent.subtitle}
            </h2>
          </div>
          <div className="mt-6 max-w-sm">
            <p className="text-sm font-semibold leading-6 text-[#5c6965]">
              {trendingEvent.description.substring(0, 150)}...
            </p>
            <Link
              className="mt-5 inline-flex rounded-full border border-[#172421] px-5 py-3 text-sm font-black text-[#253733] transition hover:bg-[#172421] hover:text-white"
              to={`/events/${trendingEvent.slug}`}
            >
              View Tournament Details
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_0.55fr]">
          <div className="overflow-hidden rounded-[8px] bg-[#6fb1d2]">
            <img 
              className="h-full min-h-[280px] w-full object-cover object-center" 
              src={trendingEvent.heroImage || trendingEvent.image} 
              alt={trendingEvent.title} 
            />
          </div>
          <div className="grid gap-4">
            <article className="relative min-h-[160px] overflow-hidden rounded-[8px] text-white">
              <img className="absolute inset-0 h-full w-full object-cover" src={trendingEvent.gallery?.[1] || trendingEvent.image} alt="" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,19,17,0.1),rgba(10,19,17,0.76))]" />
              <div className="relative flex h-full min-h-[160px] flex-col justify-end p-5">
                <p className="text-3xl font-black leading-none">{trendingEvent.votes}</p>
                <h3 className="mt-2 text-sm font-black">Community Votes</h3>
                <p className="mt-1 text-xs font-semibold leading-5 text-white/82">Highly anticipated match with huge fan following.</p>
              </div>
            </article>
            <article className="relative min-h-[160px] overflow-hidden rounded-[8px] text-white">
              <img className="absolute inset-0 h-full w-full object-cover" src={trendingEvent.gallery?.[2] || trendingEvent.image} alt="" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,19,17,0.1),rgba(10,19,17,0.76))]" />
              <div className="relative flex h-full min-h-[160px] flex-col justify-end p-5">
                <p className="text-3xl font-black leading-none">{trendingEvent.rating}</p>
                <h3 className="mt-2 text-sm font-black">Event Rating</h3>
                <p className="mt-1 text-xs font-semibold leading-5 text-white/82">Consistently rated among the top sports experiences.</p>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-4 scroll-smooth [scrollbar-width:thin]">
        {otherEvents.map((event) => (
          <Link
            key={event.slug}
            className="group relative min-h-[420px] w-[82vw] flex-none snap-start overflow-hidden rounded-[8px] text-white transition duration-300 hover:-translate-y-1 sm:w-[46vw] lg:w-[calc((100vw-9rem)/3.5)]"
            to={`/events/${event.slug}`}
          >
            <img className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" src={event.image} alt="" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,15,0.85),rgba(7,17,15,0.46)_60%,rgba(7,17,15,0.1))]" />
            <div className="absolute right-4 top-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full border border-white/70 bg-white/22 text-lg font-black text-white opacity-0 shadow-[0_14px_34px_rgba(7,17,15,0.22)] backdrop-blur-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              &rarr;
            </div>
            <div className="relative flex min-h-[420px] flex-col justify-between p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">{event.sport}</p>
                <h3 className="mt-3 text-2xl font-black leading-[1.05] text-white sm:text-3xl">{event.title}</h3>
                <p className="mt-4 text-sm font-light text-white/78">{event.venue}</p>
              </div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-white">{event.date}</p>
                  <p className="mt-1 text-xs font-bold text-white/72">{event.seats}</p>
                </div>
                <div className="text-right">
                  <p className="rounded-full bg-[#172421] px-5 py-2.5 text-sm font-black text-white shadow-[0_10px_24px_rgba(49,91,232,0.35)]">
                    {event.price}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default TournamentShowcase
