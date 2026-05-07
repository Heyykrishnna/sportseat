import { Link } from 'react-router-dom';

function BookingPanel({ event }) {
  return (
    <div className="sticky top-8 overflow-hidden rounded-2xl border border-[#dfe3dc] bg-white shadow-[0_8px_40px_rgba(23,36,33,0.12)]">
      <div className="relative h-44 overflow-hidden">
        <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(23,36,33,0.8))]" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/70">
            {event.sport} · {event.category}
          </p>
          <p className="mt-0.5 text-sm font-black text-white">{event.title}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between rounded-xl bg-[#f6f5ef] px-4 py-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#68736f]">
              Standard
            </p>
            <p className="mt-0.5 text-xl font-black text-[#172421]">{event.price}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#68736f]">Premium</p>
            <p className="mt-0.5 text-xl font-black text-[#172421]">{event.pricePremium}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-xs font-semibold text-[#68736f]">
          <div className="flex items-center gap-2">
            {event.date} · {event.time}
          </div>
          <div className="flex items-center gap-2">
            {event.duration}
          </div>
          <div className="flex items-center gap-2">
            {event.venue}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#86a35c]">{event.seats}</span>
          </div>
        </div>

        <Link 
          to={`/booking/${event.slug}`}
          className="mt-5 block w-full text-center rounded-xl bg-[#6fb1d2] py-3.5 text-sm font-black text-white shadow-[0_8px_24px_rgba(111,177,210,0.4)] transition hover:bg-[#5a9ec2] hover:shadow-[0_12px_32px_rgba(111,177,210,0.5)] active:scale-[0.98]"
        >
          Book Tickets →
        </Link>

        <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#86a35c]/12 px-4 py-3">
          <span className="text-sm">🎟</span>
          <p className="text-xs font-bold text-[#5a7a3a]">
            Buy 1 get 1 free ticket* — Limited offer
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#172421] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white"
            >
              {tag}
            </span>
          ))}
          <span className="rounded-full border border-[#dfe3dc] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#68736f]">
            {event.ageRating}
          </span>
        </div>
      </div>
    </div>
  )
}

export default BookingPanel
