import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { bookingsRouter } from './routes/bookings.js'
import { eventsRouter } from './routes/events.js'

const app = express()

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: false,
  }),
)
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/events', eventsRouter)
app.use('/api/bookings', bookingsRouter)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(env.PORT, () => {
  console.log(`SportSeat backend running on port ${env.PORT}`)
})
