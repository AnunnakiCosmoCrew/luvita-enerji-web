# luvita-enerji-web

Marketing website for **Luvita Enerji** — rooftop solar, energy storage and heat-pump
solutions for homes and businesses on the Bodrum peninsula. Part of Luvita Teknoloji.

## Stack

- Astro 7 (static) + Tailwind CSS v4 + `@astrojs/sitemap`
- Bilingual: Turkish default at `/`, English at `/en/` (Astro built-in i18n)
- Content collections for solutions, packages and FAQ (`src/content/`)
- Lead form → Web3Forms (no backend), optional Cloudflare Turnstile
- Deployed to GitHub Pages via `.github/workflows/deploy.yml`

## Development

```bash
nvm use
npm install
npm run dev
npm run check && npm run build
```

## Before launch (TODOs in `src/i18n/ui.ts → site`)

1. Phone, WhatsApp number, contact e-mail
2. Web3Forms access key (`web3formsKey`) and, optionally, Turnstile site key
3. Domain: set `site` in `astro.config.mjs`, add `public/CNAME`, update `public/robots.txt`
4. Legal texts (`/kvkk`, `/gizlilik`, `/en/privacy`) reviewed by counsel
5. Permission to use CW Enerji / TommaTech names as "authorised partner"

## Editorial rules

See `CLAUDE.md` and `adr/`. In short: no street address, no prices, no hype, keep the
solar brand separate from the corporate software site (luvita.tr).
