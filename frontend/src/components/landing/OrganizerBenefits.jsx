import soccerDetail from '../../assets/landing/soccer-detail.png'

const benefits = [
  {
    title: 'Organizers',
    text: 'Create brackets, publish schedules, manage payments, and keep every participant updated from one dashboard.',
  },
  {
    title: 'Players',
    text: 'Register faster, view fixtures, follow standings, and receive clean tournament updates before match day.',
  },
  {
    title: 'Visitors',
    text: 'Browse upcoming events, compare venues, track scores, and book seats for the sports they follow.',
  },
]

function OrganizerBenefits() {
  return (
    <section id="participants" className="px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.86fr]">
        <div>
          <h2 className="max-w-2xl text-4xl font-black leading-[0.98] sm:text-5xl">
            Organizers, Players, and Visitors Who Found Our Services Beneficial.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="rounded-[6px] bg-white p-5">
                <h3 className="text-xl font-black">{benefit.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-6 text-[#65716d]">{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[6px]">
          <img className="h-full min-h-[360px] w-full object-cover object-[58%_50%]" src={soccerDetail} alt="Soccer player controlling the ball on grass" />
        </div>
      </div>
    </section>
  )
}

export default OrganizerBenefits
