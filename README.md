# JakSambung

Production-ready landing experience for JakSambung, an Event-to-City Spatial Intelligence Platform.

## Run Locally

Requires Node.js 20.19 or later.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local` when configuration is needed.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Active public origin used by metadata, sitemap, and robots output. Defaults to `https://jaksambung.vercel.app`. |
| `NEXT_PUBLIC_INQUIRY_ENDPOINT` | Optional HTTPS endpoint that accepts pilot inquiry JSON. |
| `NEXT_PUBLIC_INQUIRY_PROVIDER` | Public processor name shown in the privacy notice. Required when an endpoint is configured. |

Production form delivery is enabled only when both a secure HTTPS endpoint and provider name are configured. Without them, production shows direct WhatsApp contact and does not render a working form. Local submissions enter an explicit demo state and transmit no data.

## Architecture

- `src/app`: homepage, privacy notice, metadata routes, and global visual system.
- `src/components`: navigation, brand mark, interactive digital twin, and inquiry form.
- `src/config/site.ts`: public domains, contact details, and verified founding-team profiles.
- `src/data/content.ts`: marketing content collections.
- `src/data/event-scenarios.ts`: running, concert, exhibition, and company event operating models.
- `src/data/mock-scenarios.ts`: illustrative event overlays for GBK, JIS, and JIExpo.
- `src/services/mock-spatial-service.ts`: replaceable local data adapter.
- `src/types/spatial.ts`: product-domain and integration contracts.

Most of the page is server-rendered. Client-side JavaScript is limited to mobile navigation, simulation controls and motion, and inquiry-form behavior.

## Mock Data Boundary

The digital twin uses OpenStreetMap tiles through MapLibre GL with local, illustrative overlays for Jakarta Running Festival, a The Weeknd concert scenario at JIS, and Pestapora at JIExpo. Venue coordinates provide geographic context; crowd values, routes, density, predictions, and recommendations are mock scenario data rather than measured event operations.

The event operating atlas uses original animated SVG artwork and expandable cards. Its impact statements describe modeled product value, not customer results.

OpenStreetMap attribution remains visible in the map. The prototype uses the public OpenStreetMap tile service for low-volume demonstration. A production deployment expecting material traffic should configure a suitable OSM-compatible tile provider while preserving contributor attribution.

The local service is designed to be replaced by adapters for:

- `GET /api/events/:eventId`
- `GET /api/spatial/heatmap`
- `GET /api/spatial/flow`
- `GET /api/predictions`
- `GET /api/recommendations`
- `POST /api/scenarios/simulate`
- `WebSocket /ws/events/:eventId/live`

No production spatial backend or paid map provider is included. The map requires network access to load OpenStreetMap tiles; all scenario overlays remain local.

## Domain Migration

The active deployment is currently `https://jaksambung.vercel.app`. When `https://jaksambung.site` serves the production site:

1. Set `NEXT_PUBLIC_SITE_URL=https://jaksambung.site` in Vercel.
2. Redeploy so canonical, OpenGraph, JSON-LD, sitemap, and robots URLs update together.
3. Configure the old Vercel origin to redirect where platform controls permit.
4. Verify both `/` and `/privacy` before indexing the new origin.

Do not set the planned domain as canonical before it serves the same pages.

## Privacy and Claims

- The product is described as designed with privacy-by-design principles.
- No facial recognition is required.
- Scenario values are illustrative, not live operational data or customer results.
- No formal partnerships, certifications, customer deployments, or measured outcomes are implied.
- The website privacy notice is available at `/privacy`.

## OpenSpec

The approved implementation specification is under:

`openspec/changes/build-jaksambung-landing/`
