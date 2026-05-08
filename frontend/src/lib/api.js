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
  try {
    const payload = await request('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
    return payload.data
  } catch (apiError) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw apiError
    }
    return createEventViaSupabase(eventData, apiError)
  }
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
  try {
    const payload = await request(`/api/bookings/occupied/${slug}`)
    return (payload.data ?? []).map(normalizeSeatForGrid)
  } catch (apiError) {
    try {
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw apiError
      }

      const eventResp = await fetch(`${SUPABASE_URL}/rest/v1/events?slug=eq.${slug}&select=id`, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      })

      if (!eventResp.ok) {
        throw new Error('Could not load event for occupied seats', { cause: apiError })
      }

      const events = await eventResp.json()
      if (!events?.length) {
        return []
      }

      const eventId = events[0].id
      const bookingResp = await fetch(
        `${SUPABASE_URL}/rest/v1/bookings?event_id=eq.${eventId}&status=eq.confirmed&select=seats`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        },
      )

      if (!bookingResp.ok) {
        throw new Error('Could not load occupied seats', { cause: apiError })
      }

      const bookings = await bookingResp.json()
      return (bookings ?? [])
        .flatMap((booking) => booking.seats ?? [])
        .map(normalizeSeatForGrid)
    } catch (fallbackError) {
      console.error('Error fetching occupied seats:', fallbackError)
      return []
    }
  }
}

export async function getBookingByReference(bookingReference) {
  try {
    const payload = await request(`/api/bookings/${bookingReference}`)
    return payload.data ?? null
  } catch (apiError) {
    try {
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw apiError
      }

      const bookingResp = await fetch(
        `${SUPABASE_URL}/rest/v1/bookings?booking_reference=eq.${encodeURIComponent(bookingReference)}&select=booking_reference,status,total_amount,seats,created_at,customer_email,event_id`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        },
      )

      if (!bookingResp.ok) {
        throw new Error('Could not load booking details', { cause: apiError })
      }

      const bookingRows = await bookingResp.json()
      const booking = bookingRows?.[0]

      if (!booking) {
        return null
      }

      let event = null
      if (booking.event_id) {
        const eventResp = await fetch(
          `${SUPABASE_URL}/rest/v1/events?id=eq.${booking.event_id}&select=slug,title,event_date,start_time,venue`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
          },
        )

        if (eventResp.ok) {
          const eventRows = await eventResp.json()
          event = eventRows?.[0] ?? null
        }
      }

      return {
        ...booking,
        seats: (booking.seats ?? []).map((seat) => String(seat).toUpperCase()),
        events: event,
      }
    } catch (fallbackError) {
      console.error('Error fetching booking confirmation:', fallbackError)
      throw apiError
    }
  }
}


const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

function getStoredSession() {
  try {
    const rawSession = localStorage.getItem('auth_session')
    if (rawSession) {
      return JSON.parse(rawSession)
    }
  } catch {
    return null
  }
  return null
}

async function getSupabaseAccessToken() {
  const session = getStoredSession()

  if (!session?.access_token) {
    return SUPABASE_ANON_KEY
  }

  const now = Math.floor(Date.now() / 1000)
  const hasFreshToken = typeof session.expires_at === 'number' && session.expires_at > now + 30
  if (hasFreshToken) {
    return session.access_token
  }

  if (!session.refresh_token) {
    localStorage.removeItem('auth_session')
    throw new Error('Session expired. Please sign in again.')
  }

  const refreshResp = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ refresh_token: session.refresh_token }),
  })

  const refreshPayload = await refreshResp.json().catch(() => ({}))

  if (!refreshResp.ok || !refreshPayload?.access_token) {
    localStorage.removeItem('auth_session')
    localStorage.removeItem('auth_user')
    throw new Error('Session expired. Please sign in again.')
  }

  const nextSession = {
    access_token: refreshPayload.access_token,
    refresh_token: refreshPayload.refresh_token || session.refresh_token,
    expires_at: refreshPayload.expires_at,
  }

  localStorage.setItem('auth_session', JSON.stringify(nextSession))
  if (refreshPayload.user) {
    localStorage.setItem('auth_user', JSON.stringify(refreshPayload.user))
  }

  return nextSession.access_token
}

async function getSupabaseAuthHeaders(extraHeaders = {}) {
  const authToken = await getSupabaseAccessToken()

  return {
    'Content-Type': 'application/json',
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${authToken}`,
    ...extraHeaders,
  }
}

async function createEventViaSupabase(eventData, apiError) {
  const { tags, gallery, highlights, ...eventCore } = eventData

  const eventPayload = {
    ...eventCore,
    highlights: Array.isArray(highlights) ? highlights : [],
  }

  const eventHeaders = await getSupabaseAuthHeaders({ Prefer: 'return=representation' })
  const eventResp = await fetch(`${SUPABASE_URL}/rest/v1/events`, {
    method: 'POST',
    headers: eventHeaders,
    body: JSON.stringify(eventPayload),
  })

  if (!eventResp.ok) {
    const errorPayload = await eventResp.json().catch(() => ({}))
    throw new Error(errorPayload.message || errorPayload.error || apiError.message || 'Failed to create event')
  }

  const rows = await eventResp.json()
  const createdEvent = rows?.[0]

  if (!createdEvent?.id) {
    throw new Error('Event was created but no event ID was returned')
  }

  if (Array.isArray(tags) && tags.length > 0) {
    const tagHeaders = await getSupabaseAuthHeaders()
    const tagResp = await fetch(`${SUPABASE_URL}/rest/v1/event_tags`, {
      method: 'POST',
      headers: tagHeaders,
      body: JSON.stringify(tags.map((tag) => ({ event_id: createdEvent.id, tag }))),
    })

    if (!tagResp.ok) {
      console.error('Error creating event tags via Supabase fallback')
    }
  }

  if (Array.isArray(gallery) && gallery.length > 0) {
    const galleryHeaders = await getSupabaseAuthHeaders()
    const galleryResp = await fetch(`${SUPABASE_URL}/rest/v1/event_gallery`, {
      method: 'POST',
      headers: galleryHeaders,
      body: JSON.stringify(
        gallery.map((imageUrl, index) => ({
          event_id: createdEvent.id,
          image_url: imageUrl,
          sort_order: index,
        })),
      ),
    })

    if (!galleryResp.ok) {
      console.error('Error creating event gallery via Supabase fallback')
    }
  }

  return createdEvent
}

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




