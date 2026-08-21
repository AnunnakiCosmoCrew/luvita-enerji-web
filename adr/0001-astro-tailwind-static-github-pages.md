# ADR 0001: Astro + Tailwind static site on GitHub Pages

- Status: accepted
- Date: 2026-08-21

## Context

Luvita Enerji needs a fast, bilingual (TR/EN) lead-generation site with no backend.
Content changes are infrequent and made by the founder. The sister corporate site
(`luvita-web`) already runs Astro 7 on GitHub Pages, so tooling and deploy are known.

## Decision

- **Astro 7, static output**, Astro built-in i18n: TR unprefixed (`/`), EN under `/en/`.
  Localized slugs (`/cozumler/cati-ges` ↔ `/en/solutions/rooftop-solar`) are mapped in
  `src/i18n/ui.ts → routes`, which drives the language switcher and `hreflang`.
- **Tailwind CSS v4** via `@tailwindcss/vite` with brand tokens in `@theme`
  (`src/styles/global.css`). Unlike luvita-web's hand-written CSS, this site has more
  marketing components and benefits from utility classes.
- **Content collections** (`glob` + `file` loaders) for solutions, packages and FAQ so
  copy lives in Markdown/JSON, not in templates. Pages are thin locale wrappers around
  shared `src/views/*`.
- **Lead form via Web3Forms** (fetch POST, honeypot, optional Turnstile). This is the only
  client-side JS besides the mobile menu. No analytics, no web fonts, no map embeds.
- **GitHub Pages** deploy on push to `main` (copied from luvita-web). Cloudflare Pages was
  considered; GitHub Pages keeps one deploy model across both Luvita sites.

## Consequences

- Zero hosting cost, fast TTFB, no server to maintain.
- A price calculator or CMS would require adding an adapter or external service later;
  the structure (views + collections) leaves room for that.
- Form submissions depend on a third-party endpoint; a WhatsApp fallback is always visible.
