import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { bookingsRouter } from './routes/bookings.js'
import { eventsRouter } from './routes/events.js'
import { authRouter } from './routes/auth.js'

const app = express()


const normalizeOrigin = (origin) => origin.replace(/\/+$/, '')
const allowedOrigins = new Set([
  normalizeOrigin(env.FRONTEND_URL),
  ...env.FRONTEND_URLS.map(normalizeOrigin),
  'http://localhost:5173',
  'https://sportseat.vercel.app',
])

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true)
        return
      }

      if (allowedOrigins.has(normalizeOrigin(origin))) {
        callback(null, true)
        return
      }

      callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: false,
  }),
)
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/', (_req, res) => {
  res.json({ message: 'SportSeat API is running' })
})


app.use('/api/events', eventsRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/auth', authRouter)


app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(env.PORT, () => {
  console.log(`SportSeat backend running on port ${env.PORT}`)
})
