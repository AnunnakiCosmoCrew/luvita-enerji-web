# ADR 0004: QR codes are pre-generated at build time, not rendered at runtime

- Status: accepted
- Date: 2026-08-22

## Context

The business-card page (`/kartvizit/`, `/en/card/`) shows QR codes (vCard, WhatsApp,
site, page link). Options: a hosted QR image API, a client-side JS QR library, or
pre-rendering. ADR-0001 / CLAUDE.md require minimal external requests and no CDN embeds.

## Decision

`scripts/gen-qr.py` (Python + `segno`) renders each payload to compact SVG path data
in `src/data/qr.json`, which is committed and inlined into the page. No runtime
library, no third-party request; the page stays a single static HTML document.

## Consequences

- Contact details are duplicated in the script; when `site.phone` / e-mail / URLs
  change, re-run `python3 scripts/gen-qr.py` and commit the JSON.
- Adds a Python dev-time dependency that CI does not run (the JSON is the source of
  truth for the build). Acceptable for a handful of rarely-changing codes.
- vCard QR is version 12 (65×65 modules); keep the vCard minimal so it stays scannable.
