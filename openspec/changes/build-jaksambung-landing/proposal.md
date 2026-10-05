# Proposal: Build the JakSambung Landing Experience

## Intent

Create a production-ready landing website that makes JakSambung credible as an early-stage Event-to-City Spatial Intelligence Platform for startup challenges, enterprise pilots, government conversations, and international smart-city ecosystems.

The page must explain a product that connects event operations with public space, transit, and city operations. Its centerpiece will be an interactive event digital twin that demonstrates how spatial signals become predictions and operational recommendations.

## Why Now

JakSambung needs a clear, pitch-ready digital presence for Jakarta Startup Challenge 2026 and possible AsiaBerlin Summit 2026 conversations. The experience must communicate technical depth without looking like a university concept, a CCTV vendor, or a generic SaaS template.

## Scope

- Build a responsive single-page marketing site using Next.js, TypeScript, Tailwind CSS, and Framer Motion.
- Cover the complete narrative from urban problem through platform, operations lifecycle, use cases, privacy, Jakarta-to-Berlin story, customers, and pilot conversion.
- Build an interactive, locally simulated event digital twin with four selectable scenarios.
- Add agency-inspired editorial composition, motion, scenario-study previews, a configurable team showcase, and a pilot contact form.
- Add SEO and OpenGraph metadata, accessible semantics, reduced-motion behavior, and a README.
- Add a first-party privacy notice at `/privacy` and link it from inquiry and footer surfaces.
- Define typed mock-data interfaces that can later map to the documented HTTP and WebSocket APIs.

## Out of Scope

- Production computer-vision processing, forecasting models, or route optimization.
- Live CCTV, sensor, map-provider, transit, or municipal integrations.
- A complex backend, authentication, operator dashboard, CMS, or database.
- Paid map services or API keys.
- Claims of formal partnerships, customers, certifications, deployments, or real operational results.
- A separate creative-agency service offering.

## Product Decisions

### The product remains the protagonist

The creative-agency brief influences visual confidence, art direction, motion, and storytelling. It does not change JakSambung into an agency portfolio. “Case studies” become clearly labeled simulated operational scenarios until verified customer work exists.

### Jakarta is origin, not boundary

The story leads with “Learn in Jakarta. Validate in Berlin. Scale globally.” Jakarta contributes a grounded perspective on dense, multimodal urban movement. Berlin represents cross-border validation and ecosystem exploration. Neither location is presented as a confirmed institutional partner.

### Privacy is operational, not ornamental

Privacy language appears beside the product explanation and data pipeline. It describes data minimization, aggregated anonymous signals, configurable retention, and possible edge processing without claiming certification or guaranteed compliance.

### The digital twin is the proof

The visualization is the page's main creative gesture and primary proof of concept. Other motion remains restrained and primarily responds to visitor interaction.

## Success Criteria

- A first-time visitor can explain JakSambung as the connection between events, public space, transit, and city operations after viewing the hero and platform sections.
- A visitor can switch all four simulation scenarios and see meaningful changes in flow, density, alerts, predictions, and recommendations.
- Simulated content is visibly distinguishable from real deployments or performance evidence.
- Decision-makers can identify applicable event types, operational phases, privacy posture, target customers, and a clear route to discuss a pilot.
- The page is usable on mobile, with a keyboard, and with reduced-motion preferences.
- The application installs and runs with `npm install` and `npm run dev`, and passes the agreed quality checks.

## Risks and Mitigations

- **Risk: style overwhelms trust.** Keep brutalist influence to structure, scale, typography, and purposeful borders; avoid chaotic decoration.
- **Risk: the visualization looks like surveillance.** Center movement paths, spatial nodes, forecasts, and recommendations rather than camera feeds or person-level tracking.
- **Risk: simulated scenarios look like customer evidence.** Label them “Simulated scenario” and avoid customer logos, outcome metrics, and testimonial formatting.
- **Risk: Jakarta framing limits global relevance.** Pair local origin with universal event types and a city-agnostic platform model.
- **Risk: a static contact form is misleading.** Make submission behavior configurable and disclose a demo state when no endpoint is configured.

## Open Questions Before Public Launch

- Confirm individual team role titles, biographies, and portraits; until then, show names and verified LinkedIn links under the collective label “Founding team.”
- Confirm the pilot inquiry form provider; use Muhammad Jamil's WhatsApp contact as the direct-contact fallback.
- Create the privacy notice at `/privacy` on the active public domain.
- Use `https://jaksambung.vercel.app` while it is the active deployment, then change the canonical origin to `https://jaksambung.site` when that domain is live and redirects are configured.
- Confirm the final social preview image.
- Confirm whether Jakarta Startup Challenge and AsiaBerlin names may be shown as participation targets in public copy.

## Verified Public Configuration

- **Current deployment:** `https://jaksambung.vercel.app`
- **Planned primary domain:** `https://jaksambung.site`
- **Privacy notice:** `/privacy` on the active primary domain
- **Founder contact:** Muhammad Jamil, WhatsApp `+62 812-1956-1519`
- **Founding team:** Muhammad Jamil, Muhammad Luthfi Arifin, and Tri Anggi Anggara Saputra
- **Verified profiles:** use only the LinkedIn URLs recorded in `openspec/config.yaml`
