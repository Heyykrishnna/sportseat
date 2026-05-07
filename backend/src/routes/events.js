import { Router } from 'express'
import { z } from 'zod'
import { mapEventDetailRow, mapEventListRow } from '../lib/formatters.js'
import { supabaseAdmin } from '../lib/supabase.js'

const querySchema = z.object({
  q: z.string().trim().max(100).optional(),
  sport: z.string().trim().max(50).optional(),
  category: z.string().trim().max(50).optional(),
  sort: z
    .enum(['date-asc', 'date-desc', 'price-asc', 'price-desc', 'rating-desc'])
    .default('date-asc'),
})

function applySort(query, sort) {
  if (sort === 'date-desc') {
    return query.order('event_date', { ascending: false }).order('start_time', { ascending: false })
  }
  if (sort === 'price-asc') {
    return query.order('price_standard', { ascending: true })
  }
  if (sort === 'price-desc') {
    return query.order('price_standard', { ascending: false })
  }
  if (sort === 'rating-desc') {
    return query.order('rating', { ascending: false })
  }
  return query.order('event_date', { ascending: true }).order('start_time', { ascending: true })
}

function includesSearch(event, searchTerm) {
  if (!searchTerm) return true
  const normalized = searchTerm.toLowerCase()
  const inTitle = event.title.toLowerCase().includes(normalized)
  const inVenue = event.venue.toLowerCase().includes(normalized)
  const inTags = event.tags.some((tag) => tag.toLowerCase().includes(normalized))
  return inTitle || inVenue || inTags
}

export const eventsRouter = Router()

eventsRouter.get('/', async (req, res) => {
  const parsed = querySchema.safeParse(req.query)

  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid query params',
      issues: parsed.error.issues,
    })
  }

  const { sport, category, q, sort } = parsed.data

  let query = supabaseAdmin
    .from('events')
    .select('*, event_tags(tag)')

  if (sport && sport !== 'All') {
    query = query.eq('sport', sport)
  }

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  query = applySort(query, sort)

  const { data, error } = await query

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  const mapped = (data ?? []).map(mapEventListRow)
  const filteredBySearch = mapped.filter((event) => includesSearch(event, q))

  return res.json({
    data: filteredBySearch,
    meta: { count: filteredBySearch.length },
  })
})

eventsRouter.get('/:slug', async (req, res) => {
  const slug = req.params.slug

  const { data, error } = await supabaseAdmin
    .from('events')
    .select('*, event_tags(tag), event_gallery(image_url, sort_order)')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  if (!data) {
    return res.status(404).json({ error: 'Event not found' })
  }

  return res.json({ data: mapEventDetailRow(data) })
})
