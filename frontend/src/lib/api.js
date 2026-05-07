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

function normalizeSeatForGrid(seatId) {
  if (!seatId || typeof seatId !== 'string') return seatId
  const value = seatId.toUpperCase().trim()
  const match = value.match(/^([A-Z]+)-?(\d+)$/)
  if (!match) return value
  return `${match[1]}-${match[2]}`
}

export async function getOccupiedSeats(slug) {
  const payload = await request(`/api/bookings/occupied/${slug}`)
  return (payload.data ?? []).map(normalizeSeatForGrid)
}

export async function getBookingByReference(bookingReference) {
  const payload = await request(`/api/bookings/${bookingReference}`)
  return payload.data ?? null
}


const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export async function login(email, password) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ email, password }),
  })
  
  const payload = await response.json()
  if (!response.ok) throw new Error(payload.error_description || payload.error || 'Login failed')
  
  return {
    session: {
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      expires_at: payload.expires_at,
    },
    user: payload.user,
  }
}

export async function signup(email, password, displayName) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      email,
      password,
      data: { display_name: displayName },
    }),
  })

  const payload = await response.json()
  if (!response.ok) throw new Error(payload.msg || payload.error || 'Signup failed')
  
  return payload
}




