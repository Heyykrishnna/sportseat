import { Router } from 'express'
import { z } from 'zod'
import { supabaseAdmin } from '../lib/supabase.js'

const createBookingSchema = z.object({
  customerEmail: z.string().email(),
  eventSlug: z.string().min(1),
  seats: z.array(z.string().min(1)).min(1),
})

const listSchema = z.object({
  email: z.string().email(),
})

function normalizeSeatId(seatId) {
  if (typeof seatId !== 'string') return null
  const normalized = seatId.trim().toUpperCase()
  const match = normalized.match(/^([A-Z]+)-?(\d+)$/)
  if (!match) return null
  return `${match[1]}${match[2]}`
}

export const bookingsRouter = Router()

bookingsRouter.get('/my-tickets', async (req, res) => {
  const parsed = listSchema.safeParse(req.query)

  if (!parsed.success) {
    return res.status(400).json({
      error: 'Valid email query param is required',
      issues: parsed.error.issues,
    })
  }

  const { email } = parsed.data

  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select('booking_reference, status, total_amount, created_at, seats, events(slug, title, event_date, start_time, venue)')
    .eq('customer_email', email)
    .order('created_at', { ascending: false })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.json({ data: data ?? [] })
})

bookingsRouter.post('/', async (req, res) => {
  const parsed = createBookingSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid booking payload',
      issues: parsed.error.issues,
    })
  }

  const { customerEmail, eventSlug, seats } = parsed.data
  const normalizedSeats = seats.map(normalizeSeatId)
  const invalidSeats = normalizedSeats.filter((seat) => !seat)

  if (invalidSeats.length > 0) {
    return res.status(400).json({ error: 'Invalid seat ids provided' })
  }

  const uniqueSeats = [...new Set(normalizedSeats)]
  if (uniqueSeats.length !== normalizedSeats.length) {
    return res.status(400).json({ error: 'Duplicate seat ids in request' })
  }

  const { data: eventData, error: eventError } = await supabaseAdmin
    .from('events')
    .select('id, price_standard, seats_left')
    .eq('slug', eventSlug)
    .maybeSingle()

  if (eventError) {
    return res.status(500).json({ error: eventError.message })
  }

  if (!eventData) {
    return res.status(404).json({ error: 'Event not found' })
  }

  if (eventData.seats_left < uniqueSeats.length) {
    return res.status(409).json({ error: 'Not enough seats available' })
  }

  const { data: existingBookings, error: existingError } = await supabaseAdmin
    .from('bookings')
    .select('seats')
    .eq('event_id', eventData.id)
    .eq('status', 'confirmed')
    .overlaps('seats', uniqueSeats)

  if (existingError) {
    return res.status(500).json({ error: existingError.message })
  }

  const alreadyOccupied = (existingBookings ?? []).flatMap((b) => b.seats)
  const overlappingSeats = uniqueSeats.filter((s) => alreadyOccupied.includes(s))

  if (overlappingSeats.length > 0) {
    return res.status(409).json({
      error: `Seats ${overlappingSeats.join(', ')} are already booked`,
    })
  }


  const subtotal = eventData.price_standard * uniqueSeats.length
  const totalAmount = Math.round(subtotal * 1.13)


  const { data: booking, error: bookingError } = await supabaseAdmin
    .from('bookings')
    .insert({
      customer_email: customerEmail,
      event_id: eventData.id,
      seats: uniqueSeats,
      total_amount: totalAmount,
      status: 'confirmed',
      payment_confirmation_id: crypto.randomUUID(),
    })
    .select('id, booking_reference, status, total_amount, seats')
    .single()

  if (bookingError) {
    return res.status(500).json({ error: bookingError.message })
  }

  const { error: seatUpdateError } = await supabaseAdmin
    .from('events')
    .update({ seats_left: eventData.seats_left - uniqueSeats.length })
    .eq('id', eventData.id)

  if (seatUpdateError) {
    return res.status(500).json({ error: seatUpdateError.message })
  }

  return res.status(201).json({ data: booking })
})

bookingsRouter.get('/occupied/:slug', async (req, res) => {
  const { slug } = req.params

  const { data: event, error: eventError } = await supabaseAdmin
    .from('events')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (eventError) {
    return res.status(500).json({ error: eventError.message })
  }

  if (!event) {
    return res.status(404).json({ error: 'Event not found' })
  }

  const { data: bookings, error: bookingsError } = await supabaseAdmin
    .from('bookings')
    .select('seats')
    .eq('event_id', event.id)
    .eq('status', 'confirmed')

  if (bookingsError) {
    return res.status(500).json({ error: bookingsError.message })
  }

  const allOccupiedSeats = (bookings ?? []).flatMap((b) => b.seats)

  return res.json({ data: allOccupiedSeats })
})

bookingsRouter.get('/:bookingReference', async (req, res) => {
  const { bookingReference } = req.params

  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select(
      'booking_reference, status, total_amount, seats, created_at, customer_email, events(slug, title, event_date, start_time, venue)',
    )
    .eq('booking_reference', bookingReference)
    .maybeSingle()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  if (!data) {
    return res.status(404).json({ error: 'Booking not found' })
  }

  return res.json({ data })
})

