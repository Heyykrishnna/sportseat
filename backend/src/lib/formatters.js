const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-IN', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
})

const numberFormatter = new Intl.NumberFormat('en-IN')

function toDateLabel(value) {
  if (!value) return ''
  return dateFormatter.format(new Date(value))
}

function toTimeLabel(value) {
  if (!value) return ''
  const now = new Date().toISOString().slice(0, 10)
  return timeFormatter.format(new Date(`${now}T${value}`))
}

function toVotesLabel(value) {
  if (value >= 1000) {
    const compact = Math.round((value / 1000) * 10) / 10
    return `${compact}K`
  }
  return String(value)
}

function toPriceLabel(value) {
  return `₹${numberFormatter.format(value)}`
}

function toDurationLabel(minutes) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins.toString().padStart(2, '0')}m`
}

function normalizeMediaUrl(url) {
  if (!url) return ''
  return url
}

export function mapEventListRow(row) {
  return {
    slug: row.slug,
    sport: row.sport,
    title: row.title,
    subtitle: row.subtitle,
    venue: row.venue,
    date: toDateLabel(row.event_date),
    time: toTimeLabel(row.start_time),
    duration: toDurationLabel(row.duration_minutes),
    rating: Number(row.rating).toFixed(1),
    votes: toVotesLabel(row.votes_count),
    tags: (row.event_tags ?? []).map((tagRow) => tagRow.tag),
    ageRating: row.age_rating,
    seats: `${row.seats_left} seats left`,
    price: toPriceLabel(row.price_standard),
    pricePremium: toPriceLabel(row.price_premium),
    image: normalizeMediaUrl(row.cover_image_url),
    heroImage: normalizeMediaUrl(row.hero_image_url ?? row.cover_image_url),
    category: row.category,
    description: row.description,
    highlights: row.highlights ?? [],
    gallery: [],
  }
}

export function mapEventDetailRow(row) {
  const base = mapEventListRow(row)
  const gallery = [...(row.event_gallery ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => item.image_url)

  return {
    ...base,
    gallery: gallery.length > 0 ? gallery : [base.heroImage].filter(Boolean),
  }
}
