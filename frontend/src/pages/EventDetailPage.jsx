import { useParams, Link } from 'react-router-dom'
import PageHeader from '../components/shared/PageHeader'
import EventRating from '../components/events/EventRating'
import BookingPanel from '../components/events/BookingPanel'
import EventGallery from '../components/events/EventGallery'
import { getEventBySlug } from '../data/events'
import CTAFooter from '../components/landing/CTAFooter'

function EventDetailPage() {
  const { slug } = useParams()
  const event = getEventBySlug(slug)

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f5ef] p-5 text-center">
        <h1 className="text-4xl font-black text-[#172421]">Event Not Found</h1>
        <p className="mt-4 text-[#68736f]">The event you are looking for does not exist or has been removed.</p>
        <Link to="/events" className="mt-8 rounded-full bg-[#172421] px-8 py-3 font-bold text-white transition hover:bg-[#6fb1d2]">
          Back to Events
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#172421]">
      <div className="relative h-[60vh] min-h-[450px] w-full overflow-hidden bg-[#172421]">
        <img
          src={event.heroImage}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#172421] via-[#172421]/20 to-transparent" />
        
        <div className="relative z-10 h-full">
          <PageHeader transparent />
          
          <div className="container mx-auto flex h-[calc(100%-80px)] items-end px-5 pb-12 sm:px-8 lg:px-12">
            <div className="grid w-full gap-8 lg:grid-cols-[1fr_380px]">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#6fb1d2] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                    {event.sport}
                  </span>
                  {event.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="mt-6 text-5xl font-black leading-[0.95] text-white sm:text-6xl md:text-7xl">
                  {event.title}
                </h1>
                <p className="mt-4 text-xl font-bold text-white/80">{event.subtitle}</p>
                
                <div className="mt-8">
                  <EventRating rating={event.rating} votes={event.votes} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-black text-[#172421]">About the event</h2>
              <p className="mt-5 text-lg leading-relaxed text-[#455653]">
                {event.description}
              </p>
            </section>

            <section className="rounded-2xl bg-[#f6f5ef] p-8">
              <h2 className="text-xl font-black text-[#172421]">Top highlights</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {event.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#86a35c] text-[10px] text-white">✓</span>
                    <span className="font-bold text-[#455653]">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            <EventGallery images={event.gallery} title={event.title} />
            
            <section className="border-t border-[#dfe3dc] pt-12">
              <h2 className="text-2xl font-black text-[#172421]">Location & Venue</h2>
              <div className="mt-6 overflow-hidden rounded-2xl bg-[#eef3f0] p-1">
                <div className="flex h-64 items-center justify-center bg-[#dfe3dc] text-xs font-bold uppercase tracking-widest text-[#68736f]">
                  Interactive Map Placeholder
                </div>
                <div className="p-5">
                  <h3 className="font-black text-[#172421]">{event.venue}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#68736f]">Detailed address and parking info goes here.</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="relative">
            <div className="lg:mt-[-180px]">
              <BookingPanel event={event} />
            </div>
          </aside>
        </div>
      </main>

      <CTAFooter />
    </div>
  )
}

export default EventDetailPage
