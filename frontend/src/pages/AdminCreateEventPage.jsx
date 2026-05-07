import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEvent } from '../lib/api'
import CTAFooter from '../components/landing/CTAFooter'

function AdminCreateEventPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    sport: '',
    category: '',
    venue: '',
    event_date: '',
    start_time: '',
    duration_minutes: 120,
    description: '',
    price_standard: 499,
    price_premium: 1499,
    seats_left: 100,
    cover_image_url: '',
    hero_image_url: '',
    age_rating: 'U',
    highlights: '',
    tags: '',
    gallery: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && !prev.slug ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-') } : {}),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const payload = {
        ...formData,
        duration_minutes: parseInt(formData.duration_minutes),
        price_standard: parseFloat(formData.price_standard),
        price_premium: parseFloat(formData.price_premium),
        seats_left: parseInt(formData.seats_left),
        highlights: formData.highlights.split(',').map((s) => s.trim()).filter(Boolean),
        tags: formData.tags.split(',').map((s) => s.trim()).filter(Boolean),
        gallery: formData.gallery.split(',').map((s) => s.trim()).filter(Boolean),
      }

      await createEvent(payload)
      navigate('/events')
    } catch (err) {
      setError(err.message || 'Failed to create event')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f5ef] font-sans text-[#172421]">
      <div className="bg-[#172421]">
        <div className="px-5 pb-14 pt-32 sm:px-8 lg:px-12">
          <p className="text-xs font-black uppercase tracking-widest text-[#6fb1d2]">
            Admin Dashboard
          </p>
          <h1 className="mt-3 max-w-2xl text-5xl font-black leading-[0.92] text-white sm:text-6xl">
            Create New Event
          </h1>
          <p className="mt-5 max-w-lg text-sm font-semibold leading-7 text-white/60">
            Fill in the details below to list a new sporting event on the platform. Ensure all high-fidelity assets are correctly linked.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:px-12">
        <form onSubmit={handleSubmit} className="grid gap-10">
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          <section className="grid gap-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">Basic Information</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Event Title</label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Champions League Final"
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">URL Slug</label>
                <input
                  required
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="e.g. champions-league-final"
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Subtitle / Short Description</label>
                <input
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="e.g. The biggest night in European football"
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
            </div>
          </section>

          <section className="grid gap-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">Categorization & Venue</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Sport</label>
                <input
                  required
                  name="sport"
                  value={formData.sport}
                  onChange={handleChange}
                  placeholder="e.g. Football"
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Category</label>
                <input
                  required
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Tournament"
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Venue Name</label>
                <input
                  required
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="e.g. Wembley Stadium"
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
            </div>
          </section>

          <section className="grid gap-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">Schedule & Logistics</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Event Date</label>
                <input
                  required
                  type="date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Start Time</label>
                <input
                  required
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Duration (mins)</label>
                <input
                  required
                  type="number"
                  name="duration_minutes"
                  value={formData.duration_minutes}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
            </div>
          </section>

          <section className="grid gap-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">Pricing & Availability</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Standard Price (₹)</label>
                <input
                  required
                  type="number"
                  name="price_standard"
                  value={formData.price_standard}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Premium Price (₹)</label>
                <input
                  required
                  type="number"
                  name="price_premium"
                  value={formData.price_premium}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Initial Seats</label>
                <input
                  required
                  type="number"
                  name="seats_left"
                  value={formData.seats_left}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
            </div>
          </section>

          <section className="grid gap-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">Media & Content</h2>
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Cover Image URL</label>
                <input
                  name="cover_image_url"
                  value={formData.cover_image_url}
                  onChange={handleChange}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Hero Image URL</label>
                <input
                  name="hero_image_url"
                  value={formData.hero_image_url}
                  onChange={handleChange}
                  placeholder="https://example.com/hero.jpg"
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Gallery Images (comma separated URLs)</label>
                <textarea
                  name="gallery"
                  value={formData.gallery}
                  onChange={handleChange}
                  rows={3}
                  placeholder="url1, url2, url3"
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2] resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Detailed event description..."
                  className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2] resize-none"
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Highlights (comma separated)</label>
                  <input
                    name="highlights"
                    value={formData.highlights}
                    onChange={handleChange}
                    placeholder="Exciting Match, Live Music, Food Stalls"
                    className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#68736f]">Tags (comma separated)</label>
                  <input
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Final, Championship, Live"
                    className="w-full rounded-2xl border border-[#172421]/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#6fb1d2]"
                  />
                </div>
              </div>
            </div>
          </section>

          <button
            disabled={isLoading}
            className="mt-10 w-full rounded-full bg-[#172421] py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-[#6fb1d2] disabled:opacity-50"
          >
            {isLoading ? 'Creating Event...' : 'Launch Event'}
          </button>
        </form>
      </main>

      <CTAFooter />
    </div>
  )
}

export default AdminCreateEventPage
