import { Link } from 'react-router-dom'

function EventCard({ event }) {
  return (
    <Link
      to={`/events/${event.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(23,36,33,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(23,36,33,0.18)]"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,15,0.0),rgba(7,17,15,0.55))]" />
        <span className="absolute left-4 top-4 rounded-full bg-[#172421]/80 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-sm">
          {event.sport}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-[#6fb1d2] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6fb1d2]">
            {event.date} · {event.time}
          </p>
          <h3 className="mt-1.5 text-lg font-black leading-snug text-[#172421]">{event.title}</h3>
          <p className="mt-0.5 text-xs font-semibold text-[#68736f]">{event.subtitle}</p>
          <p className="mt-2 text-xs font-bold text-[#68736f]">
           {event.venue}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#eef0ed] pt-4">
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-amber-400">★</span>
            <span className="text-sm font-black text-[#172421]">{event.rating}</span>
            <span className="text-xs text-[#68736f]">({event.votes} votes)</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#68736f]">from</p>
            <p className="text-sm font-black text-[#172421]">{event.price}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-[#86a35c]">{event.seats}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#172421] px-4 py-2 text-xs font-black text-white transition group-hover:bg-[#6fb1d2]">
            Book Seats
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default EventCard
