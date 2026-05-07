# SportSeat

SportSeat is split into:

- `frontend`: React + Vite UI
- `backend`: Express API + Supabase integration

## Backend setup (Supabase + API)

1. Go to `backend`.
2. Copy `.env.example` to `.env` and fill values.
3. Install dependencies and run API.

```bash
cd backend
npm install
npm run dev
```

### Supabase CLI flow

From `backend`:

```bash
supabase start
supabase db push
supabase db seed
```

For remote push:

```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase db push
supabase db seed
```

## Frontend setup

1. Go to `frontend`.
2. Copy `.env.example` to `.env`.
3. Run the app.

```bash
cd frontend
npm install
npm run dev
```

The frontend reads API base URL from:

- `VITE_API_BASE_URL` (default `http://localhost:4000`)

## API routes

- `GET /health`
- `GET /api/events?q=&sport=&category=&sort=`
- `GET /api/events/:slug`
- `GET /api/bookings/my-tickets?email=`
- `POST /api/bookings`
