import { useState } from 'react'

const faqItems = [
  {
    question: 'How do I book seats for an event on SportSeat?',
    answer:
      'Open the event page, choose your preferred section, and confirm your seats at checkout. You can complete payment securely and receive your booking reference instantly.',
  },
  {
    question: 'Can I cancel or change my booking after payment?',
    answer:
      'Yes, depending on the organizer cancellation policy. Go to your booking details to request cancellation or seat changes where allowed.',
  },
  {
    question: 'Where can I find my tickets and booking history?',
    answer:
      'All your active and past bookings are available in the My Tickets section after you sign in. Each ticket includes event details, seat numbers, and booking status.',
  },
  {
    question: 'Do I need an account to make a booking?',
    answer:
      'Creating an account is recommended so your bookings, profile, and event updates stay synced across devices. It also makes refunds and support requests faster.',
  },
  {
    question: 'How do organizers manage seat layouts and availability?',
    answer:
      'Organizers can configure venue sections, seat counts, pricing tiers, and booking windows from the dashboard. Availability updates in real time as bookings are made.',
  },
  {
    question: 'Is online payment on SportSeat safe?',
    answer:
      'Yes. Payments are processed through secure, encrypted channels. We do not expose sensitive payment details inside the app interface.',
  },
  {
    question: 'Will I receive updates if event details change?',
    answer:
      'Yes, important updates such as schedule changes, venue updates, or booking confirmations are shown in your account and can also be communicated by organizers.',
  },
  {
    question: 'How can I contact support for booking issues?',
    answer:
      'Use the Support option in the footer or contact the event organizer from your booking page. Include your booking reference for faster assistance.',
  },
]

function GuideSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="px-5 py-12 text-center sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-black uppercase text-[#6f9db4]">FAQ</p>
        <h2 className="mt-4 text-4xl font-black leading-none sm:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-sm font-semibold leading-6 text-[#68736f] sm:text-base">
          Quick answers to help you book faster, manage events better, and use SportSeat with confidence.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl rounded-[6px] bg-white p-4 text-left shadow-[0_20px_48px_rgba(23,36,33,0.08)]">
        {faqItems.map((item, index) => (
          <article key={item.question} className="border-b border-[#e2e6df] last:border-0">
            <button
              type="button"
              onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
              className="flex w-full items-center justify-between gap-5 py-5 text-left"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-base font-black text-[#172421]">{item.question}</span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#edf4f7] text-sm font-black text-[#4c7890] transition-transform duration-300 ${
                  openIndex === index ? 'rotate-45' : 'rotate-0'
                }`}
              >
                +
              </span>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`grid overflow-hidden transition-all duration-300 ease-out ${
                openIndex === index ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <p className="min-h-0 pr-12 text-sm font-semibold leading-6 text-[#697670]">{item.answer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default GuideSection
