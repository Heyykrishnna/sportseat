import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  Shield, 
  Clock, 
  Ticket,
  Users,
  Award
} from 'lucide-react'

function MembershipPage() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState('premium')

  const perks = [
    {
      icon: Star,
      title: 'Priority Seating',
      description: 'Access to premium and VIP sections before general public'
    },
    {
      icon: Zap,
      title: 'Early Bird Discounts',
      description: 'Get exclusive discounts on ticket prices for members only'
    },
    {
      icon: Clock,
      title: 'Early Access',
      description: 'Book tickets 24 hours before public release'
    },
    {
      icon: Ticket,
      title: 'Exclusive Events',
      description: 'Access to private member-only sporting events'
    },
    {
      icon: Users,
      title: 'Group Bookings',
      description: 'Special rates for group ticket purchases and group events'
    },
    {
      icon: Award,
      title: 'Loyalty Rewards',
      description: 'Earn points on every purchase and redeem for tickets'
    },
    {
      icon: Shield,
      title: 'Buyer Protection',
      description: 'Full refund guarantee and secure payment protection'
    },
    {
      icon: Crown,
      title: 'VIP Support',
      description: '24/7 priority customer support dedicated to members'
    }
  ]

  const plans = [
    {
      id: 'silver',
      name: 'Silver',
      price: 499,
      period: 'month',
      features: [
        '5% discount on all tickets',
        'Early access (12 hours)',
        'Basic group discounts',
        'Email support',
        'Up to 100 loyalty points/month'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 999,
      period: 'month',
      features: [
        '15% discount on all tickets',
        'Early access (24 hours)',
        'Premium seating access',
        'Advanced group discounts',
        'Priority email & chat support',
        'Up to 500 loyalty points/month',
        'Exclusive member events'
      ],
      badge: 'Most Popular'
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 1999,
      period: 'month',
      features: [
        '25% discount on all tickets',
        'Early access (48 hours)',
        'VIP seating access',
        'Unlimited group discounts',
        '24/7 VIP phone & priority support',
        'Up to 1000 loyalty points/month',
        'All exclusive member events',
        'Dedicated account manager',
        'Quarterly meet & greet events'
      ]
    }
  ]

  const handlePurchase = (planId) => {
    alert(`Processing ${planId.charAt(0).toUpperCase() + planId.slice(1)} membership purchase...`)
  }

  return (
    <main className="min-h-screen bg-[#f6f5ef] pt-32 pb-16 font-sans text-[#172421]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6fb1d2]">
              Premium Membership
            </p>
            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              Unlock Exclusive Benefits
            </h1>
            <p className="mt-4 text-lg font-semibold text-[#68736f]">
              Join SportSeat premium and get priority access to the best seats and exclusive deals
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            
            <div className="flex flex-col justify-start">
              <div className="mb-8">
                <h2 className="text-2xl font-black">Membership Perks</h2>
                <p className="mt-1 text-sm font-semibold text-[#68736f]">
                  Everything you need for the ultimate sports fan experience
                </p>
              </div>

              <div className="space-y-4">
                {perks.map((perk, index) => (
                  <div 
                    key={index}
                    className="flex gap-4 rounded-2xl border border-[#dfe3dc] bg-white p-5 transition hover:border-[#6fb1d2] hover:shadow-md"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf4f7]">
                        <perk.icon className="h-5 w-5 text-[#6fb1d2]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-[#172421]">{perk.title}</h3>
                      <p className="mt-1 text-xs font-semibold text-[#68736f]">
                        {perk.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl font-black">Pricing Plans</h2>
                <p className="mt-1 text-sm font-semibold text-[#68736f]">
                  Choose the plan that works best for you
                </p>
              </div>

              <div className="space-y-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative cursor-pointer rounded-2xl border-2 transition ${
                      selectedPlan === plan.id
                        ? 'border-[#6fb1d2] bg-[#edf4f7]'
                        : 'border-[#dfe3dc] bg-white hover:border-[#6fb1d2]'
                    }`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-block rounded-full bg-[#6fb1d2] px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                          {plan.badge}
                        </span>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-black">{plan.name}</h3>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-3xl font-black">₹{plan.price}</span>
                        <span className="text-xs font-bold text-[#68736f]">/ {plan.period}</span>
                      </div>

                      <div className="mt-6 space-y-3">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className="h-4 w-4 flex-shrink-0 text-[#6fb1d2] mt-0.5" />
                            <span className="text-sm font-semibold text-[#172421]">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handlePurchase(plan.id)}
                        className={`mt-6 w-full rounded-xl py-3 text-xs font-black uppercase tracking-widest transition ${
                          selectedPlan === plan.id
                            ? 'bg-[#172421] text-white hover:bg-[#2a3c38]'
                            : 'bg-[#6fb1d2] text-white hover:bg-[#5a9ec2]'
                        }`}
                      >
                        Get {plan.name}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[#dfe3dc] bg-white p-6">
                <h4 className="font-black text-[#172421]">Need Help?</h4>
                <p className="mt-2 text-sm font-semibold text-[#68736f]">
                  Our support team is available 24/7 to help you choose the right plan
                </p>
                <button className="mt-4 rounded-full border border-[#6fb1d2] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#6fb1d2] transition hover:bg-[#6fb1d2] hover:text-white">
                  Contact Support
                </button>
              </div>
            </div>

          </div>

          <div className="mt-16 rounded-3xl bg-[#172421] p-8 text-white sm:p-12">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-2xl font-black">30-Day</h3>
                <p className="mt-2 text-sm font-semibold text-white/70">
                  Money-back guarantee. No questions asked.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-black">Cancel Anytime</h3>
                <p className="mt-2 text-sm font-semibold text-white/70">
                  No long-term contracts. Cancel your membership whenever you want.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-black">Secure Payment</h3>
                <p className="mt-2 text-sm font-semibold text-white/70">
                  Your payment information is encrypted and secure.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm font-semibold text-[#68736f]">
              Already a member? <span className="font-black text-[#172421]">Check your benefits in your profile</span>
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}

export default MembershipPage
