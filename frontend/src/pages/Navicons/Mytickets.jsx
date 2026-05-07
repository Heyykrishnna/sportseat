import { useState } from 'react'
import { getMyTickets } from '../../lib/api'

function Mytickets() {
  const [email, setEmail] = useState('')
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(event) {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const data = await getMyTickets(email)
      setTickets(data)
    } catch (fetchError) {
      setTickets([])
      setError(fetchError.message || 'Could not load tickets')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f5ef] px-5 pb-16 pt-32 font-sans text-[#172421] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#dfe3dc] bg-white p-8 shadow-[0_16px_40px_rgba(23,36,33,0.08)]">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#6fb1d2]">My Tickets</p>
        <h1 className="mt-3 text-4xl font-black leading-tight">Your bookings will appear here</h1>
        <p className="mt-4 text-sm font-semibold leading-7 text-[#68736f]">
          Track confirmed seats, upcoming matches, and booking history in one place.
        </p>

        <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your booking email"
            required
            className="w-full rounded-full border border-[#dfe3dc] bg-white px-5 py-3 text-sm font-semibold text-[#172421] outline-none transition focus:border-[#6fb1d2]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-[#172421] px-6 py-3 text-sm font-black text-white transition hover:bg-[#253733] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Searching...' : 'Find Tickets'}
          </button>
        </form>

        {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}

        {!error && tickets.length > 0 && (
          <div className="mt-6 space-y-3">
            {tickets.map((ticket) => (
              <article key={ticket.booking_reference} className="rounded-2xl border border-[#dfe3dc] bg-[#f9faf8] p-4">
                <p className="text-[11px] font-black uppercase tracking-widest text-[#6fb1d2]">
                  {ticket.booking_reference}
                </p>
                <h2 className="mt-2 text-lg font-black">{ticket.events?.title}</h2>
                <p className="text-xs font-semibold text-[#68736f]">
                  {ticket.events?.venue} • {ticket.events?.event_date}
                </p>
                <p className="mt-2 text-xs font-bold uppercase text-[#455653]">
                  Status: {ticket.status} • Seats: {(ticket.seats || []).join(', ')}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Mytickets