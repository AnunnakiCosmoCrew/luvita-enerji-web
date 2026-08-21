# ADR 0002: Separate consumer brand; no registered street address on the site

- Status: accepted
- Date: 2026-08-21

## Context

luvita-web (corporate, software-only) decided in its ADR-0003 that the solar business is
presented "under its own brand, elsewhere", and that the registered office — a residential
address — is never published. This site is that "elsewhere".

## Decision

- This site is the **Luvita Enerji** vitrine. It states "Bir Luvita Teknoloji kuruluşudur"
  in the footer and about page as plain text, **without linking to luvita.tr**, so the two
  sites do not cross-position each other (solar ↔ enterprise software).
- The full trade name appears only in the footer legal line.
- `site.address` is **city-level only** ("Bodrum, Muğla / Türkiye"). JSON-LD uses
  `addressLocality`/`addressRegion` without `streetAddress`. No map embed. The contact page
  shows the service area instead.
- Brand name is a single constant (`site.name`) — if the working brand is renamed (e.g.
  to "Luvi Energy", the name used in luvita-web's ADR and in the Luvi engine repos), the
  change is one edit plus the logo wordmark.

## Consequences

- Consistent with luvita-web's privacy stance; no home address on either site.
- Local-SEO signals are weaker without a street address; mitigated by `areaServed`,
  district names in copy and the service-area box. Revisit when an office exists.
