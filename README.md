# Ochi-Inspired Next.js Website

Next.js 16 App Router project that recreates the public look and interaction style of `ochi.design` using Tailwind CSS and Framer Motion.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Framer Motion

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Download Public Ochi Assets

This project uses local paths under `/assets/*` (`public/assets/*` on disk).

Run:

```bash
npm run fetch:assets
```

What this does:

- crawls `https://ochi.design` for publicly reachable image URLs
- downloads image files into `public/assets/ochi`
- writes a manifest to `data/ochi-asset-manifest.json`

The UI reads `data/ochi-asset-manifest.json` first and falls back to bundled placeholders in `public/assets/placeholders` when needed.

## Routes

- `/` homepage with hero, featured projects, team/about, services, and contact footer
- `/about` secondary about page

## Full Project Documentation

For complete architecture, data-flow, component breakdown, and implementation notes, see:

- `PROJECT_DETAILS.md`

