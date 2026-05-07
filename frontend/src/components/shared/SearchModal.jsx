import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEvents } from '../../lib/api'

function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const data = await getEvents({ q: query })
        setResults(data.slice(0, 5))
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-[#172421]/60 px-5 pt-20 backdrop-blur-sm">
      <div className="w-full max-w-2xl animate-in fade-in zoom-in duration-200">
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="relative flex items-center border-b border-gray-100 p-4">
            <svg viewBox="0 0 24 24" className="ml-2 h-5 w-5 fill-none stroke-gray-400 stroke-2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              autoFocus
              type="text"
              placeholder="Search events, sports, or venues..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2 text-lg font-semibold text-[#172421] outline-none placeholder:text-gray-400"
              onKeyDown={(e) => {
                if (e.key === 'Escape') onClose()
                if (e.key === 'Enter' && query.trim()) {
                   navigate(`/events?q=${encodeURIComponent(query)}`)
                   onClose()
                }
              }}
            />
            <button
              onClick={onClose}
              className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-200"
            >
              ESC
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {isLoading && (
              <div className="p-8 text-center text-sm font-bold text-gray-400">Searching...</div>
            )}
            
            {!isLoading && results.length > 0 && (
              <div className="space-y-1">
                <p className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Events</p>
                {results.map((event) => (
                  <button
                    key={event.slug}
                    onClick={() => {
                      navigate(`/events/${event.slug}`)
                      onClose()
                    }}
                    className="flex w-full items-center gap-4 rounded-2xl p-3 text-left transition hover:bg-gray-50"
                  >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-200">
                      <img src={event.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-[#172421]">{event.title}</h4>
                      <p className="text-xs font-semibold text-gray-500">{event.venue} · {event.sport}</p>
                    </div>
                    <span className="text-xs font-black text-[#6fb1d2]">{event.price}</span>
                  </button>
                ))}
              </div>
            )}

            {!isLoading && query && results.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-sm font-bold text-gray-400">No events found for "{query}"</p>
              </div>
            )}

            {!query && (
              <div className="p-8 text-center">
                <p className="text-sm font-bold text-gray-400">Start typing to search for events...</p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-6 py-3 text-[10px] font-bold text-gray-400">
            Press <span className="text-[#172421]">Enter</span> to see all results
          </div>
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  )
}

export default SearchModal
