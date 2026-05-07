import PageHeader from '../components/shared/PageHeader'
import CTAFooter from '../components/landing/CTAFooter'

function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f6f5ef] font-sans text-[#172421]">
      <div className="bg-[#172421]">
        <PageHeader />
        <div className="px-5 py-20 sm:px-8 lg:px-12">
          <h1 className="text-4xl font-black text-white">
            Terms & Conditions
          </h1>
        </div>
      </div>

      <main className="px-5 py-12 sm:px-8 lg:px-12 max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-4">1. User Agreement</h2>
          <p className="text-gray-600 leading-7">
            By using SportSeat, you agree to our terms and conditions. 
            These terms govern your use of our platform and services.
            You must be at least 18 years old to book events.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black mb-4">2. Privacy Policy</h2>
          <p className="text-gray-600 leading-7">
            We protect your personal information seriously. Your data is 
            encrypted and never shared with third parties without your consent.
            We collect data to improve your experience on SportSeat.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black mb-4">3. Refund Policy</h2>
          <p className="text-gray-600 leading-7">
            Tickets can be refunded within 7 days of purchase.
            Event cancellations will result in full refunds.
            No refunds for no-shows or late cancellations.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black mb-4">4. Liability</h2>
          <p className="text-gray-600 leading-7">
            SportSeat is not liable for injuries or disputes at events.
            Event organizers are responsible for safety measures.
            Attendees assume all responsibility for their safety.
          </p>
        </section>
      </main>

      <CTAFooter />
    </div>
  )
}

export default TermsPage