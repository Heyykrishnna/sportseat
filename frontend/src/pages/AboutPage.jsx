import CTAFooter from '../components/landing/CTAFooter'

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f6f5ef] font-sans text-[#172421]">
      <section className="bg-[#172421] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#6fb1d2]">
            About SportSeat
          </p>

          <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Making sports event discovery and seat booking simple.
          </h1>

          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/70 sm:text-lg">
            SportSeat is a sports-focused ticket booking platform where users can explore events,
            view tournament details, select seats, and manage bookings in one clean experience.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#dfe3dc] bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black">What is SportSeat?</h2>
            <p className="mt-4 leading-7 text-[#68736f]">
              SportSeat helps users find upcoming sports events and book seats without confusion.
              The platform focuses only on sports, making the experience cleaner and easier than
              general ticket booking websites.
            </p>
          </div>

          <div className="rounded-3xl border border-[#dfe3dc] bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black">Why we built it?</h2>
            <p className="mt-4 leading-7 text-[#68736f]">
              Sports fans often need a simple place to discover matches, check event details,
              and book tickets quickly. SportSeat solves this with a focused and user-friendly
              booking interface.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#6fb1d2]">
            Key Features
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Built for a better sports booking experience.
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Sports event discovery',
              'Interactive seat booking',
              'Tournament showcase',
              'User booking management',
            ].map((feature) => (
              <div
                key={feature}
                className="rounded-3xl border border-[#dfe3dc] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#edf4f7] text-lg font-black text-[#6fb1d2]">
                  ✓
                </div>
                <h3 className="text-lg font-black">{feature}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] bg-[#172421] p-8 text-white sm:p-10">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#86a35f]">
            Our Mission
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            To make sports ticket booking fast, clear, and enjoyable.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-white/70">
            Our goal is to provide a smooth platform for fans, organizers, and participants
            where sports events can be explored and booked with confidence.
          </p>
        </section>
      </main>

      <CTAFooter />
    </div>
  )
}

export default AboutPage