const guideItems = [
  'How do I create a tournament on SportSeat?',
  'Can I upload fixtures, teams, and venues?',
  'What do teams need before joining my tournament?',
]

function GuideSection() {
  return (
    <section id="guide" className="px-5 py-12 text-center sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-black uppercase text-[#6f9db4]">Setup guide</p>
        <h2 className="mt-4 text-4xl font-black leading-[1] sm:text-5xl">
          Guide to Setting Up Events, Tracking Progress, and Managing Participants.
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-2xl rounded-[6px] bg-white p-4 text-left shadow-[0_20px_48px_rgba(23,36,33,0.08)]">
        {guideItems.map((item, index) => (
          <details key={item} className="group border-b border-[#e2e6df] last:border-0" open={index === 0}>
            <summary className="cursor-pointer list-none py-5 text-base font-black text-[#172421] marker:hidden">
              <span className="flex items-center justify-between gap-5">
                <span>{item}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#edf4f7] text-sm font-black text-[#4c7890]">
                  {index + 1}
                </span>
              </span>
            </summary>
            <p className="pb-5 pr-12 text-sm font-semibold leading-6 text-[#697670]">
              Set tournament rules, registration windows, fixtures, seat inventory, and leaderboard visibility before publishing your event.
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default GuideSection
