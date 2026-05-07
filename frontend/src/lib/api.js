const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000').replace(/\/+$/, '')

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options)
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.error || 'Request failed')
  }

  return payload
}

export async function getEvents(params = {}) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value)
    }
  })

  const suffix = searchParams.toString()
  const path = suffix ? `/api/events?${suffix}` : '/api/events'
  const payload = await request(path)
  return payload.data ?? []
}

export async function getEventBySlug(slug) {
  const payload = await request(`/api/events/${slug}`)
  return payload.data ?? null
}

export async function getMyTickets(email) {
  const payload = await request(`/api/bookings/my-tickets?email=${encodeURIComponent(email)}`)
  return payload.data ?? []
}

export async function createEvent(eventData) {
  const payload = await request('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })
  return payload.data
}

export async function createBooking(bookingData) {
  const payload = await request('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  })
  return payload.data
}

export async function getOccupiedSeats(slug) {
  const payload = await request(`/api/bookings/occupied/${slug}`)
  return payload.data ?? []
}


