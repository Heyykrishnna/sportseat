function EventRating({ rating, votes }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm">
        <span className="text-lg text-amber-400">★</span>
        <div>
          <p className="text-lg font-black leading-none text-white">{rating}/10</p>
          <p className="mt-0.5 text-[10px] font-semibold text-white/60">{votes} Votes</p>
        </div>
      </div>
      <button className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-black text-white backdrop-blur-sm transition hover:bg-white/20">
        Rate now
      </button>
    </div>
  )
}

export default EventRating
