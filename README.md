# 🧭 Bharat Yatra — Discover the Wonder of India

A modern, responsive travel discovery website built with **React**, **TypeScript**, and **Tailwind CSS**. Bharat Yatra lets travelers explore India's most iconic destinations, filter by state or mood, save favorites, view live weather-style stats, and chat with an AI-style travel guide to plan a personalized trip.

> Live demo:https://travel-application-two.vercel.app

---

## ✨ Features

- **Curated destination explorer** — 10 hand-picked Indian destinations (Taj Mahal, Jaipur, Kerala, Ladakh, Goa, and more) with images, descriptions, top places to visit, and best time to travel.
- **Live search & filtering** — Search by place name, state, or mood ("beach", "temple", "mountains") and filter by state with instant results.
- **Save your favorites** — Heart/save any destination; state persists during the session.
- **Weather info strip** — At-a-glance conditions (temperature, feels-like, wind, humidity, best time to visit) for the currently selected destination.
- **AI travel guide chat** — A slide-in chat panel ("Aria") that responds to trip questions and suggests quick-start prompts (e.g. "Golden Triangle trip", "Best beaches?").
- **Day-by-day trip planner** — A sample 3-day itinerary layout that can be extended into a full planning tool.
- **Polished UX details** — Scroll-reveal animations, image loading skeletons with graceful error states, keyboard navigation, focus management, and reduced-motion support.
- **Fully responsive** — Mobile-first layout with a dedicated mobile navigation menu.
- **Accessible by design** — Semantic HTML, ARIA labels/roles, skip-to-content link, and screen-reader-friendly live regions throughout.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite 5](https://vitejs.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + custom CSS |
| Icons | [Lucide React](https://lucide.dev/) |
| Linting | ESLint (typescript-eslint, react-hooks, react-refresh) |
| Backend (ready) | [Supabase JS SDK](https://supabase.com/docs/reference/javascript) — included as a dependency for future persistence (e.g. saved trips, auth) |

---

## 📂 Project Structure

```
project/
├── src/
│   ├── App.tsx          # Main application — all UI, state, and logic
│   ├── main.tsx         # React entry point
│   ├── index.css         # Global & component styles
│   └── vite-env.d.ts
├── index.html            # HTML shell + SEO/OpenGraph meta tags
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig*.json
└── package.json
```

---

## 🚀 Getting Started

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Build an optimized production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run typecheck` | Run TypeScript type checking with no emit |

---

## 🧩 How It Works

- **Destinations** are defined as a typed static dataset (`Destination[]`) inside `App.tsx`, making it easy to swap in a live API or CMS later.
- **Search & filtering** are handled with `useMemo` for efficient re-computation only when the query or selected state changes.
- **Image loading** uses a custom `useImageLoaded` hook to show a skeleton while loading and a fallback icon on error — no layout shift, no broken image icons.
- **Scroll-reveal animations** use the `IntersectionObserver` API via a `useScrollReveal` hook, and respect `prefers-reduced-motion`.
- **The chat guide** currently simulates AI responses on the client (with a short "thinking" delay) — designed as a drop-in point for a real LLM/AI API integration.

---

## 🗺️ Roadmap / Ideas for Extension

- [ ] Connect the chat guide to a real AI API (e.g. Anthropic Claude) for genuinely personalized itineraries
- [ ] Persist saved destinations and trip plans using Supabase (already included as a dependency)
- [ ] Replace static weather data with a live weather API
- [ ] Add user authentication for saving trips across sessions
- [ ] Add a booking/enquiry flow for hotels and experiences
- [ ] Write unit/component tests (e.g. with Vitest + React Testing Library)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues) or open a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- Destination photography sourced from [Pexels](https://www.pexels.com/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/) + [React](https://react.dev/)
