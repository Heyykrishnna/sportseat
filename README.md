# SportSeat

SportSeat is a web app for discovering sports events and booking stadium seats—focused on sports only, with a clear flow from browsing matches to choosing seats and confirming tickets.

The repository currently ships a **marketing-style landing experience** in React. A **data model** for users, events, venues, tickets, and bookings is documented under `backend/` for when you connect a real API or database.

## What you get today

- Landing page sections: hero, features, tournaments, stats, guide, and call-to-action
- Responsive layout and styling with **Tailwind CSS v4**
- **Vite** dev server and production build for fast local development

## Planned product surface

Ideas aligned with the domain schema (see `backend/schema.md`):

- Event listings and detail pages with venue and timing information
- Interactive seat map and ticket selection
- Sign-in and profiles; bookings and payment confirmation references

## Tech stack

| Area        | Choice                          |
| ----------- | ------------------------------- |
| UI          | React 19, JSX                   |
| Styling     | Tailwind CSS 4, `@tailwindcss/vite` |
| Tooling     | Vite 8, ESLint                  |
| Compiler    | Babel + React Compiler plugin   |

## Requirements

- **Node.js** — current LTS (e.g. 20.x or 22.x) recommended  
- **npm** (comes with Node)

## Getting started

Clone the repository, then install and run the frontend:

```bash
git clone https://github.com/heyykrishnna/sportseat.git
cd sportseat/frontend
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

### Other scripts

| Command        | Purpose                    |
| -------------- | -------------------------- |
| `npm run dev`  | Start dev server with HMR  |
| `npm run build`| Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint on the project  |

## Repository layout

```
sportseat/
├── frontend/
│   ├── public/                 # Static files (favicon, icons)
│   ├── src/
│   │   ├── components/
│   │   │   └── landing/      # Landing page sections
│   │   ├── assets/           # Images and static media
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/
│   └── schema.md             # Domain / table-oriented data model (reference)
└── README.md
```

## Contributing

Issues and pull requests are welcome. For larger changes, opening an issue first helps align on direction.

## Author

Maintained by [@heyykrishnna](https://github.com/heyykrishnna).
