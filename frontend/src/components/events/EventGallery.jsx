function EventGallery({ images, title }) {
  return (
    <div>
      <h2 className="text-xl font-black text-[#172421]">Event Gallery</h2>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {images.map((src, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img
              src={src}
              alt={`${title} gallery ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              style={{ minHeight: i === 0 ? '220px' : '100px' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventGallery
