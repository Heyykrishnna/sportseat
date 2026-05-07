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

  if (eventData.seats_left < seats.length) {
    return res.status(409).json({ error: 'Not enough seats available' })
  }

  const totalAmount = eventData.price_standard * seats.length

  const { data: booking, error: bookingError } = await supabaseAdmin
    .from('bookings')
    .insert({
      customer_email: customerEmail,
      event_id: eventData.id,
      seats,
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
    .update({ seats_left: eventData.seats_left - seats.length })
    .eq('id', eventData.id)

  if (seatUpdateError) {
    return res.status(500).json({ error: seatUpdateError.message })
  }

  return res.status(201).json({ data: booking })
})
