# Project Details

## 1. Overview

This project is an Ochi.design-inspired marketing website built with Next.js App Router.  
It recreates the look, motion style, and page structure of a presentation design agency site.

Core goals:
- Rich visual storytelling
- Heavy motion and scroll interactions
- Data-driven sections for services, work, and insights
- Local asset fallback strategy for reliability

## 2. Tech Stack

- Next.js `16.1.6` (App Router)
- React `19.2.4`
- Tailwind CSS `4.1.18`
- Framer Motion `12.34.0`
- GSAP `3.14.2`
- Lenis `1.3.17`
- Swiper `6.8.4`
- ESLint `9.x` + `eslint-config-next` core web vitals

Supporting tools:
- `cheerio` for scraping/crawling asset URLs
- `playwright`, `pixelmatch`, `pngjs` available in devDependencies

## 3. Project Layout

Top-level folders:
- `app/` route files and global styles
- `components/` UI sections and shared animation/layout primitives
- `data/` page/content models and generated asset manifest
- `public/` fonts and downloaded/static assets
- `scripts/` utility scripts (asset fetch/crawl)

Notable root files:
- `package.json`
- `next.config.mjs`
- `tailwind.config.js`
- `postcss.config.js`
- `eslint.config.mjs`
- `jsconfig.json`

## 4. Routing

Routes implemented:
- `/` home page (`app/page.jsx`)
- `/about` (`app/about/page.jsx`)
- `/services` (`app/services/page.jsx`)
- `/work` (`app/work/page.jsx`)
- `/insights` (`app/insights/page.jsx`)
- `/contact` (`app/contact/page.jsx`)

Global layout:
- `app/layout.jsx` mounts global header and smooth scroll provider
- Main wrapper includes `id="top"` anchor for back-to-top links

## 5. Page Composition

### Home (`/`)

Sections:
- `HeroSection`
- `MarqueeSection`
- `AboutNarrativeSection`
- `EyesShowcaseSection`
- `ProjectsReviewsSection` (featured projects + client reviews)
- `ReadyToStartSection`
- `ContactFooter`

### About (`/about`)

Sections:
- `AboutHeroSection`
- `AboutCommitmentsSection` (stacked Swiper cards)
- `AboutPreCtaSection` (draggable testimonials rail)
- `ReadyToStartSection`
- `ContactFooter`
- `AboutCustomCursor`

### Services (`/services`)

Sections:
- `ServicesHeroSection`
- `HolisticProcessSection` (accordion)
- `CapabilitiesSection` (hover previews + popup details)
- `ServicesReviewsSection` (accordion)
- `WhyUsSection` (open/close cards)
- `ReadyToStartSection`
- `ContactFooter`

### Work (`/work`)

Sections:
- `WorkHeroSection`
- `WorkProjectsSection`
- `WorkPublicationsSection`
- `ReadyToStartSection`
- `ContactFooter`

### Insights (`/insights`)

Sections:
- `InsightsListingSection` (category filter)
- `InsightsInstagramSection`
- `ContactFooter`

### Contact (`/contact`)

Sections:
- `ContactFormSection`
- `ContactSocialBlockSection`
- `ContactFaqSection`
- `ContactFooter`

## 6. Data Layer

Primary data files:
- `data/siteData.js` for shared nav, footer, home content, projects, team, services
- `data/aboutPageData.js` for about page narratives, stats, testimonials, insights
- `data/services-source.json` for raw services content
- `data/servicesPageData.js` maps `services-source.json` into UI-ready structures
- `data/workPageData.js` for work cards and publications
- `data/insightsPageData.js` for categories, articles, Instagram cards
- `data/contactPageData.js` for contact hero and FAQ

### Asset resolution strategy

Most data modules use a `pickAsset(...)` helper:
- First try to match image names from `data/ochi-asset-manifest.json`
- Fallback to local placeholders or remote source URLs

This keeps the UI resilient when crawled assets are missing.

## 7. Visual and Motion System

Global CSS:
- `app/globals.css` defines typography scale, utility classes, buttons, links, effects, and keyframes
- Fonts are loaded from local files in `public/fonts`

Color system:
- Extended Tailwind palette under `ochi.*` in `tailwind.config.js`

Animation primitives:
- `ScrollProgressShift` for parallax/scroll-linked transforms
- `RevealInView` for intersection-based entrance motion
- `AccordionHeight` for animated open/close sections
- `MouseReactiveEyesSvg` for pointer-following eye motion
- `SmoothScrollProvider` for Lenis smooth scroll on desktop

## 8. Navigation and Shell Behavior

Header (`components/site/Header.jsx`):
- Desktop nav with animated links and active route logic
- Mobile full-screen panel menu with Framer Motion
- Scroll-aware hide/show behavior
- Body overflow lock while mobile menu is open

Footer (`components/site/ContactFooter.jsx`):
- Reused on all pages
- Shows nav links, social links, location groups, and mail contact

## 9. Asset Pipeline

Script:
- `scripts/download-ochi-assets.mjs`

What it does:
- Crawls `https://ochi.design` pages and stylesheets
- Extracts image URLs from `img`, `source`, `poster`, meta tags, inline styles, and raw URL matches
- Downloads files into `public/assets/ochi`
- Generates `data/ochi-asset-manifest.json`

Manifest metadata includes:
- `generatedAt`
- `totalFound`
- `totalDownloaded`
- `images` (source, localPath, bytes)
- `skipped`

Current manifest snapshot:
- `generatedAt`: `2026-02-08T21:38:53.788Z`
- `totalFound`: `453`
- `totalDownloaded`: `451`
- `skipped`: `2`

## 10. Developer Commands

From `package.json`:
- `npm run dev` start local dev server
- `npm run build` production build
- `npm run start` run production server
- `npm run lint` lint `app`, `components`, and `data`
- `npm run fetch:assets` crawl and download public Ochi assets

## 11. Config Notes

- `jsconfig.json` defines alias `@/*` -> project root
- `next.config.mjs` enables strict mode and allows remote image host `ochi.design`
- `postcss.config.js` uses `@tailwindcss/postcss`
- `eslint.config.mjs` extends Next core-web-vitals rules

## 12. Current Risks / Gaps

- Contact form currently has UI-only submit behavior (`preventDefault`) and no backend integration.
- Some text strings contain encoding artifacts in data files (for example odd euro/quote characters).
- `components/services/ServicesNumbersSection.jsx` expects `item.detail`, but `data/servicesPageData.js` number objects do not include a `detail` field.
- Playwright is installed but there is no automated test script configured in `package.json`.

## 13. Suggested Next Improvements

1. Wire contact form submission to an API route with validation and spam protection.
2. Normalize text encoding across data files to UTF-8 clean strings.
3. Add missing `detail` fields (or remove rendering) in Services numbers cards.
4. Add basic end-to-end smoke tests (home, nav, services popup, contact form validation).
5. Add this file link inside `README.md` for easier project onboarding.

