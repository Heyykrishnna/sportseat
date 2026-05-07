import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login, signup } from '../lib/api'
import { ChevronLeft, ArrowRight, Mail, Lock, User as UserIcon } from 'lucide-react'

function AuthPage() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password)
        localStorage.setItem('auth_session', JSON.stringify(result.session))
        localStorage.setItem('auth_user', JSON.stringify(result.user))
        navigate('/events')
      } else {
        await signup(formData.email, formData.password, formData.displayName)
        setIsLogin(true)
        setError('Account created! Please sign in.')
      }
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-white font-sans text-[#172421]">
      <div className="relative flex w-full flex-col justify-between p-8 sm:p-12 lg:w-[450px] xl:w-[500px]">

        <Link to="/" className="mt-12 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#68736f] transition hover:text-[#172421]">
          <ChevronLeft className="h-4 w-4" />
          Home page
        </Link>

        <div className="my-auto max-w-sm py-12">
          <h1 className="text-4xl font-black leading-tight tracking-tight text-[#172421]">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="mt-4 text-sm font-semibold leading-relaxed text-[#68736f]">
            {isLogin 
              ? 'Enter your credentials to access your dashboard and manage your bookings.' 
              : 'Join SportSeat to book exclusive tickets and track your favorite tournaments.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {error && (
              <div className={`rounded-xl border p-4 text-xs font-bold ${error.includes('Account created') ? 'border-emerald-100 bg-emerald-50 text-emerald-600' : 'border-red-100 bg-red-50 text-red-600'}`}>
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="relative">
                <UserIcon className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#68736f]" />
                <input
                  required
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full rounded-2xl border border-[#dfe3dc] bg-white py-4 pl-12 pr-5 text-sm font-semibold outline-none transition focus:border-[#172421]"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#68736f]" />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full rounded-2xl border border-[#dfe3dc] bg-white py-4 pl-12 pr-5 text-sm font-semibold outline-none transition focus:border-[#172421]"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#68736f]" />
              <input
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full rounded-2xl border border-[#dfe3dc] bg-white py-4 pl-12 pr-5 text-sm font-semibold outline-none transition focus:border-[#172421]"
              />
            </div>

            <button
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#172421] py-5 text-sm font-black uppercase tracking-widest text-white transition hover:bg-[#6fb1d2] disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Get Started'}
              {!isLoading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <p className="mt-8 text-center text-xs font-bold text-[#68736f]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#172421] underline underline-offset-4 hover:text-[#6fb1d2]"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>

        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 w-12 rounded-full ${
                (isLogin && i <= 2) || (!isLogin && i <= 4) ? 'bg-[#6fb1d2]' : 'bg-[#dfe3dc]'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative hidden flex-1 overflow-hidden lg:block">
        <img
          src="https://ik.imagekit.io/yatharth/pexels-slendyalex-3648850.jpg?updatedAt=1774806604718"
          alt="Authentication background"
          className="h-full w-full object-cover grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-[#172421]/10 mix-blend-multiply" />


        <div className="absolute bottom-12 left-12 right-12 text-white">
          <p className="text-4xl font-black leading-tight tracking-tight drop-shadow-2xl">
            "The future of sporting events, <br />
            starting with your seat."
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
