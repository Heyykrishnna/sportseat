const venues = [
  { name: 'North Arena', city: 'Mumbai', capacity: '42,000 seats' },
  { name: 'Downtown Dome', city: 'Bengaluru', capacity: '26,500 seats' },
  { name: 'Grand Oval', city: 'Delhi', capacity: '55,000 seats' },
]

function VenuesPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Popular Venues</h1>
      <p className="mt-2 text-slate-600">
        Explore stadiums where SportSeat bookings are available.
      </p>

      <div className="mt-8 space-y-4">
        {venues.map((venue) => (
          <article
            key={venue.name}
            className="flex flex-col justify-between gap-2 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"
          >
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{venue.name}</h2>
              <p className="text-sm text-slate-600">{venue.city}</p>
            </div>
            <p className="text-sm font-medium text-slate-700">{venue.capacity}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default VenuesPage
