# SalesVision Consulting

## Scripts (npm)

- `npm install` — install dependencies
- `npm run dev` — Vite dev server
- `npm run build` — production client (`dist/public`) + Node server bundle (`dist/index.js`)
- `npm run start` — serve the built SPA with Express (uses `dist/public`)

## Netlify

This site is configured as a **static SPA** in [`netlify.toml`](netlify.toml):

- **Build command:** `npm run build`
- **Publish directory:** `dist/public`
- **Redirects:** all routes → `index.html` (client-side routing)

Connect the repo in the Netlify UI; no extra plugins are required. Node **20+** is set via `NODE_VERSION` in `netlify.toml` and `engines` in `package.json`.

Optional: run `npm install` locally and commit `package-lock.json` for reproducible Netlify installs.
