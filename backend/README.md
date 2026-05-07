# SportSeat Backend (Supabase + Express)

This backend keeps Supabase schema and seed scripts in the `backend/supabase` folder and exposes API routes from `backend/src`.

## 1) Environment setup

1. Copy `.env.example` to `.env` in `backend`.
2. Fill all Supabase values from your project settings.

Required variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`
- `PORT`
- `FRONTEND_URL`

## 2) Supabase CLI workflow

Run from the `backend` directory:

```bash
supabase start
supabase db push
supabase db seed
```

For remote projects:

```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase db push
supabase db seed
```

## 3) Run backend API

```bash
npm install
npm run dev
```

Default API base URL: `http://localhost:4000`

## 4) API routes

- `GET /health`
- `GET /api/events?q=&sport=&category=&sort=`
- `GET /api/events/:slug`
- `GET /api/bookings/my-tickets?email=`
- `POST /api/bookings`
