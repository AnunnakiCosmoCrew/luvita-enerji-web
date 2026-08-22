# luvita-enerji-web

Public marketing site for **Luvita Enerji** — the consumer-facing solar / storage /
heat-pump brand of Luvita Teknoloji Enerji Yazılım San. ve Tic. Ltd. Şti. (Bodrum).
Astro 7 static + Tailwind v4, TR (default, unprefixed) / EN (`/en/`), GitHub Pages.
Sister repo: `AnunnakiCosmoCrew/luvita-web` (software-only corporate site, luvita.tr).

## Hard rules

- **Never publish the registered street address.** It is a residential address.
  `site.address` in `src/i18n/ui.ts` stays city-level (`Bodrum, Muğla`). No map embeds.
  (Same rule as luvita-web; see `adr/0002`.)
- **Keep the two vitrines separate.** This site may say it is "a Luvita Teknoloji
  company" in the footer/about text, but must NOT link to luvita.tr or present the
  software business as a division. luvita-web's ADR-0003 forbids solar copy there.
- **No prices on the site.** Supply costs are USD-based; the site never shows TL or
  USD prices. Packages are described by capacity + components; price comes via quote.
- **Brand voice** (see `adr/0003`): technical-but-plain, no hype, benefit-led
  (efficiency, accessibility, reliability, cost). Sustainability is a side benefit,
  never the headline. Never promise "%100 bağımsızlık" / "bedava elektrik".
- **Minimal external requests.** No analytics SDKs, no web fonts, no CDN embeds.
  The only third parties are the form endpoint (Web3Forms) and optional Cloudflare
  Turnstile, both loaded only on the quote page.
- Every page exists in both locales; `src/i18n/ui.ts → routes` maps slug pairs and
  drives the language switcher + hreflang. Add both entries when adding a page.

## Layout

- `src/i18n/ui.ts` — UI strings (TR/EN), route map, `site` constants (phone,
  WhatsApp, e-mail, form keys — **fill the TODOs before launch**).
- `src/content/{solutions,packages}/{tr,en}/*.md` + `faq/faq.json` — content
  collections (`src/content.config.ts`). Quote every frontmatter string.
- `src/views/*.astro` — one shared view per page type; `src/pages/**` are thin
  locale wrappers.
- `src/components/` — Header, Footer, Logo (inline SVG), QuoteForm, cards, CTA.
- `scripts/gen-qr.py` → `src/data/qr.json` — pre-rendered QR paths for the
  business-card page (`adr/0004`). Re-run when contact details change.

## Commands

```
npm run dev      # http://localhost:4321/
npm run check    # astro check — must pass
npm run build    # static build to dist/
```

Node ≥ 24 (`nvm use`). CI (`.github/workflows/deploy.yml`) runs check + build and
deploys to GitHub Pages on push to `main`. Branch naming `feature/le-N-slug`; PRs
to `main`. ADRs live in `adr/` (site-scoped decisions).
