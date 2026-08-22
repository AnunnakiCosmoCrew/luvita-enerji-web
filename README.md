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

## Launch checklist

- [x] Phone, WhatsApp number, contact e-mail (`src/i18n/ui.ts → site`)
- [x] Web3Forms access key — live, verified end to end (real submission delivers mail)
- [x] Domain `luvitaenerji.com` — GitHub Pages, HTTPS enforced, `www` redirects to apex
- [ ] Cloudflare Turnstile site key (`turnstileSiteKey`) — only if spam appears
- [ ] Corporate mailbox `info@luvitaenerji.com` (Cloudflare Email Routing) instead of the personal address
- [ ] Legal texts (`/kvkk`, `/gizlilik`, `/en/privacy`) reviewed by counsel
- [ ] Permission to use CW Enerji / TommaTech names as "authorised partner"

## Editorial rules

See `CLAUDE.md` and `adr/`. In short: no street address, no prices, no hype, keep the
solar brand separate from the corporate software site (luvita.tr).
