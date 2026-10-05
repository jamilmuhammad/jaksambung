# Design: JakSambung Landing Experience

## Experience Direction

The concept is **Urban Signal Room**: an editorial city-operations briefing interrupted by one living spatial model. The page should feel designed by a bold studio but trusted by transport operators and public-sector decision-makers.

Brutalist influence appears in oversized type, hard spatial divisions, exposed coordinates, direct copy, and asymmetric composition. It must not become a noisy collage. The interface visualization carries the technical detail; the surrounding page remains disciplined.

## Design Tokens

### Color

| Token | Value | Role |
| --- | --- | --- |
| Asphalt | `#101414` | Main background and command-center field |
| Concrete | `#D9DDDA` | Primary text and light editorial surfaces |
| Signal cyan | `#54D6D0` | Live flow, interactive focus, transit link |
| Jakarta vermilion | `#FF5A36` | Alerts, density escalation, origin accent |
| Transit yellow | `#F2C94C` | Forecast and caution state |
| Deep water | `#143C42` | Secondary surfaces and heatmap depth |

Do not reproduce the +Jakarta palette or imply brand affiliation. The Jakarta reference informs civic optimism and collaboration language, not visual imitation.

### Typography

- **Display:** `Archivo Black` or a similarly forceful open-source grotesk for short hero statements and section pivots.
- **Body/UI:** `Plus Jakarta Sans`, acknowledging the product's origin while remaining highly legible and globally neutral.
- Use sentence case for headings and controls. Reserve uppercase for real abbreviations, map coordinates, and compact status codes.
- Keep body lines below approximately 72 characters.

### Geometry

- Mostly square corners with occasional clipped corners for operational panels.
- Borders communicate zones, routes, states, and grouping rather than decorating every card.
- Use a 12-column desktop grid and a simple 4-column mobile grid.
- Prefer left alignment; center only the final CTA if it improves focus.

## Page Composition

```text
DESKTOP
┌──────────────────────────────────────────────────────────────────┐
│ JakSambung       Platform  Scenarios  Privacy       Discuss pilot│
├───────────────────────────┬──────────────────────────────────────┤
│ FROM CROWD FLOW           │ living event-to-city map             │
│ TO CITY FLOW.             │ venue / gates / routes / stations    │
│ positioning + CTAs        │ status rail + live recommendation    │
├───────────────────────────┴──────────────────────────────────────┤
│ event pressure                         city-system disconnect     │
├──────────────────────────────────────────────────────────────────┤
│ EVENT → PUBLIC SPACE → TRANSIT → CITY OPERATIONS                 │
├──────────────────────────────────────────────────────────────────┤
│ full interactive digital twin + scenario controls               │
├──────────────────────────────────────────────────────────────────┤
│ Sense → Understand → Predict → Orchestrate                       │
├───────────────────┬───────────────────┬──────────────────────────┤
│ Before            │ During            │ After                    │
├──────────────────────────────────────────────────────────────────┤
│ simulated scenario studies / use-case index                      │
├───────────────────────┬──────────────────────────────────────────┤
│ Privacy architecture  │ Jakarta → Berlin → cities worldwide      │
├───────────────────────┴──────────────────────────────────────────┤
│ customer groups / team if configured / pilot inquiry            │
└──────────────────────────────────────────────────────────────────┘

MOBILE
┌──────────────────────────┐
│ compact navigation       │
│ hero statement + CTAs    │
│ simplified live map      │
│ horizontal scenario tabs │
│ recommendation panel     │
│ narrative sections       │
│ pilot inquiry            │
└──────────────────────────┘
```

## Content Architecture

1. **Navigation:** logo wordmark, Platform, Scenarios, Privacy, Origin, and Discuss a pilot.
2. **Hero:** required product name, tagline, positioning line, CTAs, and an immediate animated spatial preview.
3. **Urban problem:** explain why mass-event movement crosses operational boundaries.
4. **Disconnect:** show Event → Public Space → Transit → City Operations as one linked system rather than four disconnected owners.
5. **Platform:** summarize the eight capabilities without an eight-card feature grid; use a spatial capability index tied to the map.
6. **Interactive visualization:** provide the complete digital-twin simulation and recommendation rail.
7. **Pipeline:** present Sense → Understand → Predict → Orchestrate as a true ordered sequence.
8. **Lifecycle:** explain before, during, and after-event value.
9. **Event operating atlas:** use expandable illustrated cards for running, concert, exhibition, and company events. Each card connects event examples to operational pressure, spatial signals, recommended action, and modeled impact.
10. **Privacy:** connect principles to system boundaries and explain that facial recognition is not required.
11. **Jakarta to Berlin:** tell the origin, validation, and global scaling narrative without partnership claims.
12. **Customers and team:** identify buyer groups; present the three verified people as the “Founding team,” with names and LinkedIn links but no invented individual roles, biographies, or portraits.
13. **Pilot CTA and form:** collect qualified inquiry details with transparent submission behavior.
14. **Footer:** positioning, navigation, contact, privacy link, and an explicit prototype status where appropriate.

## Motion Direction

Spend motion on the digital twin:

- On initial load, routes draw once from event venue to public space and transit nodes.
- Crowd particles follow deterministic route paths and change speed/direction by scenario.
- Density fields pulse only when state changes, not continuously at distracting intensity.
- Scenario selection transitions the map, metrics, alert, and recommendation as one coordinated state change.
- Section content should not receive repetitive fade-and-slide animations.
- Under `prefers-reduced-motion: reduce`, show static route lines, fixed crowd clusters, and immediate state changes.

## Digital Twin Architecture

Use MapLibre GL with OpenStreetMap raster tiles to provide recognizable Jakarta geography without a paid API key. Keep all event routes, density values, crowd values, forecasts, and recommendations in the local mock adapter. OpenStreetMap provides geographic context only and must retain visible contributor attribution.

The public OpenStreetMap tile service is suitable only for low-volume prototype demonstration. The data-service and map-style boundaries must allow a production OSM-compatible tile provider to replace it before material traffic.

MapLibre 6 uses a module worker that imports its shared runtime module. A postinstall script copies both generated dependency files into `public/`, and the client configures `/maplibre-gl-worker.mjs` before map initialization. This prevents Next.js HTML fallbacks from being interpreted as worker modules and keeps worker MIME types explicit.

### Domain Types

```ts
type ScenarioId =
  | "jakarta-running-festival"
  | "the-weeknd-jis"
  | "pestapora";

interface SpatialPoint {
  id: string;
  label: string;
  kind: "venue" | "gate" | "transit" | "mobility";
  coordinate: [longitude: number, latitude: number];
  density: "low" | "moderate" | "high" | "critical";
}

interface FlowRoute {
  id: string;
  coordinates: [number, number][];
  direction: "outbound" | "redirected";
  load: number;
}

interface OperationalRecommendation {
  severity: "info" | "warning" | "critical" | "resolved";
  current: string;
  prediction: string;
  recommendation: string;
}

interface SimulationScenario {
  id: ScenarioId;
  label: string;
  center: [number, number];
  zoom: number;
  points: SpatialPoint[];
  routes: FlowRoute[];
  recommendation: OperationalRecommendation;
}
```

Store all mock scenarios under a clearly named data module such as `src/data/mock-scenarios.ts`. Presentation components consume the types rather than importing arbitrary data literals.

### Scenario Behavior

| Scenario | Spatial change | Operational message |
| --- | --- | --- |
| Jakarta Running Festival | GBK and Sudirman corridor with MRT and Palmerah alternatives | Distribute modeled finish-area flow across multiple transit approaches |
| The Weeknd at JIS | Stadium egress connected to nearby rail and Kemayoran shuttle staging | Pulse release and distribute the modeled post-show surge |
| Pestapora | JIExpo gate pressure connected to bus, Rajawali rail, and ride-hail staging | Separate pickup demand and redirect part of modeled flow toward rail feeders |

The scenario timestamp and values must be described as simulated, not live.

## Future Integration Boundary

Define a data-service interface that local mock adapters implement. A later HTTP/WebSocket adapter can preserve component contracts.

```ts
interface SpatialIntelligenceService {
  getEvent(eventId: string): Promise<EventDetail>;
  getHeatmap(eventId: string): Promise<HeatmapFrame>;
  getFlow(eventId: string): Promise<FlowFrame>;
  getPredictions(eventId: string): Promise<Prediction[]>;
  getRecommendations(eventId: string): Promise<OperationalRecommendation[]>;
  simulateScenario(input: ScenarioInput): Promise<SimulationScenario>;
  subscribeToEvent(
    eventId: string,
    onFrame: (frame: LiveEventFrame) => void,
  ): () => void;
}
```

Future mappings:

- `GET /api/events/:eventId`
- `GET /api/spatial/heatmap`
- `GET /api/spatial/flow`
- `GET /api/predictions`
- `GET /api/recommendations`
- `POST /api/scenarios/simulate`
- `WebSocket /ws/events/:eventId/live`

No endpoint is implemented in this change. The README must identify the mock adapter and replacement seam.

## Component Boundaries

- `SiteHeader`: navigation and responsive menu.
- `Hero`: core positioning and compact spatial preview.
- `CitySystemChain`: event-to-city relationship.
- `CapabilityIndex`: eight platform capabilities tied to spatial concepts.
- `DigitalTwin`: OpenStreetMap view, local spatial overlays, event state, controls, legend, attribution, and status.
- `RecommendationPanel`: current state, prediction, and prescribed action.
- `IntelligencePipeline`: Sense through Orchestrate.
- `EventLifecycle`: before, during, and after.
- `EventScenarioShowcase`: animated running, concert, exhibition, and company cards with one active expanded operating model.
- `PrivacyArchitecture`: privacy principles and data handling capabilities.
- `GlobalNarrative`: Jakarta, Berlin, and global city relevance.
- `CustomerGroups`: target buyers and operational value.
- `TeamShowcase`: verified founding-team names and LinkedIn links, with optional roles, biographies, and portraits only when approved content is later supplied.
- `PilotInquiryForm`: validation, submission states, and privacy notice.
- `PrivacyNotice`: first-party explanation of inquiry data, prototype telemetry, retention, third-party processors, and contact rights.
- `SiteFooter`: supporting navigation and status language.

Keep section components server-rendered where possible. Limit client components to navigation behavior, the simulator, and form interaction.

## Inquiry Submission

The form collects name, work email, organization, role/customer type, city, event type, event scale, and pilot objective. Use an environment-configured HTTPS form endpoint. When it is absent in development, show a deliberate demo success state that says no inquiry was transmitted. In production, the form must not claim success unless the configured endpoint confirms receipt.

Do not log form values in the browser or server. Link `/privacy` near submission. Add an anti-spam honeypot and leave room for a provider-specific protection mechanism later. If submission delivery is not configured, provide a WhatsApp link to Muhammad Jamil at `https://wa.me/6281219561519` with concise prefilled pilot-inquiry text. Display the human-readable number as `+62 812-1956-1519`.

## Site and Domain Configuration

Keep public origins in one typed site configuration rather than scattering hostnames through components:

```ts
const siteConfig = {
  currentOrigin: "https://jaksambung.vercel.app",
  plannedOrigin: "https://jaksambung.site",
  privacyPath: "/privacy",
  founderWhatsApp: "6281219561519",
} as const;
```

Use the current origin for `metadataBase`, canonical URLs, OpenGraph URLs, sitemap, and robots output until `jaksambung.site` is deployed and verified. At migration, change the active origin in one place and configure permanent redirects from the Vercel hostname where platform controls allow it. Do not publish a canonical URL on the planned domain before it serves the corresponding page.

## Privacy Notice Content

Create a readable, dated privacy notice at `/privacy`. It must distinguish the website inquiry workflow from the product's conceptual privacy architecture and cover:

- what inquiry fields are collected and why;
- whether analytics or anonymous telemetry is enabled;
- the configured form provider and other processors, once selected;
- retention and deletion/contact procedures without promising an unimplemented timeframe;
- that WhatsApp and LinkedIn links lead to third-party services governed by their own notices;
- the contact channel for privacy questions;
- a last-updated date and a route back to the main site.

Do not copy a GDPR template, claim certification, or assert legal bases and rights that have not been reviewed for the operating entity and applicable jurisdictions.

## Accessibility and Performance

- Use landmarks, logical heading levels, descriptive button names, and visible keyboard focus.
- Implement scenario controls as an accessible single-selection control with state announced to assistive technology.
- Provide a text summary of every visualization state; do not rely on color or animation alone.
- Ensure alert colors meet contrast requirements and also use labels/shapes.
- Make the mobile navigation keyboard-operable and restore focus when closed.
- Respect reduced motion and avoid autoplay behavior that cannot be paused when it conveys essential information.
- Use `next/font`, inline SVG, and no stock-photo payload.
- Keep the initial page mostly server-rendered and isolate animation code to interactive islands.

## SEO and Metadata

- Title: `JakSambung | Spatial Intelligence for City-Scale Events`
- Description: `Privacy-first spatial intelligence to understand, predict, and orchestrate crowd flow across events, public space, transit, and city operations.`
- Configure canonical URL, metadata base, OpenGraph image, and social card via a central site configuration, using `https://jaksambung.vercel.app` until the planned `.site` domain is active.
- Add Organization and SoftwareApplication JSON-LD only with verifiable fields. Do not add ratings, customers, awards, or partner organizations.

## Self-Critique Against the References

- **Generic dark-tech risk:** a near-black background with a bright accent is common. The revision uses a civic material palette, large editorial pacing, transit-derived route geometry, and Jakarta-origin typography rather than neon gradients and glass cards.
- **Generic agency risk:** portfolio grids, awards, and invented case results would damage trust. The revision uses “simulated scenario studies,” an optional real-team module, and no vanity metrics.
- **Motion overload risk:** scattered section reveals would feel templated. The revision concentrates motion in one operational model and uses static editorial rhythm elsewhere.
- **Local imitation risk:** copying +Jakarta colors or program naming could imply affiliation. The revision borrows only the broad collaborative-city narrative and explicitly keeps JakSambung globally framed.
