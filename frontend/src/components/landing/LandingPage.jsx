import CTAFooter from './CTAFooter'
import FeatureIntro from './FeatureIntro'
import GuideSection from './GuideSection'
import Hero from './Hero'
import StatsSection from './StatsSection'
import TournamentShowcase from './TournamentShowcase'
import FeaturedEventsSection from './FeaturedEventsSection'

function LandingPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#f6f5ef] font-sans text-[#172421]">
      <Hero />
      <FeaturedEventsSection />
      <TournamentShowcase />
      <FeatureIntro />
      <StatsSection />
      <GuideSection />
      <CTAFooter />
    </main>
  )
}

export default LandingPage
