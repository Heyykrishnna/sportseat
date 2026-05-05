const upcomingEvents = [
  { name: 'Intercity Football League', date: '12 Jun 2026', venue: 'North Arena' },
  { name: 'National Basketball Cup', date: '18 Jun 2026', venue: 'Downtown Dome' },
  { name: 'Champions Cricket Clash', date: '26 Jun 2026', venue: 'Grand Oval' },
]

function EventsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Upcoming Events</h1>
      <p className="mt-2 text-slate-600">
        Browse what is coming next and choose your seats early.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((event) => (
          <article key={event.name} className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">{event.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{event.date}</p>
            <p className="text-sm text-slate-600">{event.venue}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default EventsPage
