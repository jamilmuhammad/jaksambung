# Delta for Marketing Site

## ADDED Requirements

### Requirement: Clear Event-to-City positioning

The site SHALL identify JakSambung as an Event-to-City Spatial Intelligence Platform and explain that it connects event operations, public space, transit, and city operations.

#### Scenario: Visitor encounters the hero

- **GIVEN** a visitor opens the homepage
- **WHEN** the hero is visible
- **THEN** the visitor sees “JakSambung” and “From Crowd Flow to City Flow.”
- **AND** the page describes privacy-first spatial intelligence for city-scale events
- **AND** the primary actions are “Explore the Platform” and “Discuss a Pilot”

#### Scenario: Visitor distinguishes the platform from surveillance

- **GIVEN** a visitor reviews the platform narrative
- **WHEN** they read the problem, capability, and privacy sections
- **THEN** the product is framed around aggregate spatial flow, forecasting, and operational orchestration
- **AND** it is not framed merely as CCTV monitoring, facial recognition, or crowd counting

### Requirement: Complete product narrative

The site SHALL explain the urban problem, the event-to-city disconnect, the platform capabilities, the intelligence pipeline, and the event lifecycle.

#### Scenario: Visitor explores platform capabilities

- **WHEN** the visitor reaches the platform section
- **THEN** the site covers live spatial heatmaps, flow direction, bottleneck forecasting, event digital twins, scenario simulation, operational recommendations, post-event review, and API integration

#### Scenario: Visitor reviews the intelligence sequence

- **WHEN** the visitor reaches the process section
- **THEN** Sense, Understand, Predict, and Orchestrate appear as an ordered sequence
- **AND** each step identifies representative inputs, analysis, or outputs

#### Scenario: Visitor reviews the event lifecycle

- **WHEN** the visitor reaches the lifecycle section
- **THEN** the site explains distinct value before, during, and after an event

### Requirement: Broad city-scale event applicability

The site SHALL show that the platform applies across event categories and customer groups without claiming unverified deployments.

#### Scenario: Visitor reviews use cases

- **WHEN** the visitor views use cases
- **THEN** they can identify applicability to running events, concerts, festivals, stadiums, exhibitions, conventions, cultural events, public celebrations, tourism districts, and temporary high-density urban activities

#### Scenario: Visitor reviews buyers

- **WHEN** the visitor views target customers
- **THEN** the site identifies event organizers, venue operators, mobility operators, and city authorities
- **AND** it explains a relevant operational value for each group

### Requirement: Honest scenario-study presentation

The site SHALL use case-study-style previews to demonstrate product thinking while clearly distinguishing simulations from real customer work.

#### Scenario: Visitor opens a scenario preview

- **WHEN** a visitor views any scenario-study preview
- **THEN** it is labeled as simulated or illustrative
- **AND** it does not show a customer logo, testimonial, measured impact, or deployment claim unless verified content is later configured

#### Scenario: Visitor explores event operating models

- **WHEN** a visitor selects running, concert, exhibition, or company events
- **THEN** the selected card expands to show representative event formats, operational pressure, spatial signals, orchestration, and modeled impact
- **AND** only one card is expanded at a time
- **AND** impact language describes product potential rather than a measured customer result

#### Scenario: Visitor explores event cards on mobile

- **WHEN** the event atlas is rendered on a narrow viewport
- **THEN** cards use a vertical accordion that does not depend on hover or pointer tracking
- **AND** the selected card's content remains keyboard and touch accessible

### Requirement: Privacy-by-design communication

The site SHALL communicate the product's privacy posture precisely and without claiming certification.

#### Scenario: Visitor reviews privacy architecture

- **WHEN** the visitor reaches the privacy section
- **THEN** the site states “Designed with privacy-by-design principles”
- **AND** it states that no facial recognition is required
- **AND** it describes aggregated and anonymous spatial signals
- **AND** it may describe edge processing, configurable retention, data minimization, and anonymous telemetry as architecture capabilities

#### Scenario: Visitor looks for compliance claims

- **WHEN** the visitor reviews public copy and metadata
- **THEN** no formal GDPR certification or equivalent unverified compliance claim appears

### Requirement: Local origin and global ambition

The site SHALL present Jakarta as JakSambung's origin and potential living laboratory while positioning the platform for cities worldwide.

#### Scenario: Visitor reads the origin narrative

- **WHEN** the visitor reaches the Jakarta and Berlin section
- **THEN** the site presents “Learn in Jakarta. Validate in Berlin. Scale globally.”
- **AND** Jakarta is described as a potential learning context for dense urban mobility and mass-event operations
- **AND** Berlin and AsiaBerlin are described as opportunities for validation, collaboration, partnerships, and market exploration

#### Scenario: Visitor evaluates affiliations

- **WHEN** the visitor reads the origin narrative, footer, or metadata
- **THEN** the site does not imply an existing formal partnership with Jakarta Smart City, MRT Jakarta, TransJakarta, BVG, Deutsche Bahn, Messe Berlin, AsiaBerlin, or another unconfigured organization

### Requirement: Distinctive and restrained visual identity

The site SHALL use a dark, technical, premium, minimal, and urban visual system with deliberate brutalist and editorial influence.

#### Scenario: Visitor views the full page

- **WHEN** the page is rendered on a desktop viewport
- **THEN** typography, hard spatial divisions, route geometry, and asymmetric composition create a distinctive identity
- **AND** generic stock photography, repetitive SaaS cards, and decorative dashboard metrics are absent

#### Scenario: Visitor uses a mobile viewport

- **WHEN** the viewport narrows to a common mobile width
- **THEN** content remains readable without horizontal page scrolling
- **AND** navigation, calls to action, visualization controls, and forms remain operable

### Requirement: Purposeful motion

The site SHALL concentrate motion on explaining spatial flow and user-triggered state changes.

#### Scenario: Visitor allows motion

- **GIVEN** the visitor has not requested reduced motion
- **WHEN** the hero or simulator initializes
- **THEN** route and flow motion reinforces the event-to-city model
- **AND** unrelated sections do not all repeat generic entrance animations

#### Scenario: Visitor requests reduced motion

- **GIVEN** the visitor prefers reduced motion
- **WHEN** the page loads or a scenario changes
- **THEN** routes, densities, and recommendations remain understandable in a static or immediate state
- **AND** nonessential continuous motion is disabled

### Requirement: Accessible page structure

The site SHALL provide semantic, keyboard-operable access to navigation, content, controls, and calls to action.

#### Scenario: Keyboard visitor navigates the page

- **WHEN** a visitor uses only a keyboard
- **THEN** they can skip to main content, open and close mobile navigation, follow section links, operate calls to action, and reach the inquiry form
- **AND** focus is always visibly indicated

#### Scenario: Screen-reader visitor reviews the page

- **WHEN** a visitor navigates by landmarks and headings
- **THEN** the page exposes a logical hierarchy and descriptive action names
- **AND** decorative visual elements do not add redundant announcements

### Requirement: Configurable team presentation

The site SHALL present the verified founding team without inventing role titles, biographies, credentials, or portraits.

#### Scenario: Visitor reviews the founding team

- **WHEN** the page renders
- **THEN** the team showcase identifies Muhammad Jamil, Muhammad Luthfi Arifin, and Tri Anggi Anggara Saputra as the founding team
- **AND** each person links to their verified LinkedIn profile
- **AND** no unapproved individual title, biography, credential, or portrait is shown

#### Scenario: Additional profile details are later approved

- **GIVEN** a team member has approved role, biography, or portrait data in configuration
- **WHEN** the page renders
- **THEN** the site may display those fields for that person
- **AND** profiles without equivalent approved fields remain valid and visually complete

### Requirement: First-party privacy notice

The site SHALL provide a privacy notice at `/privacy` on the active public origin.

#### Scenario: Visitor opens the privacy notice

- **WHEN** a visitor follows a privacy link from the form or footer
- **THEN** they reach `/privacy` without leaving the JakSambung site
- **AND** the notice describes inquiry data, purpose, configured processors, retention or deletion contact, third-party links, privacy contact, and its last-updated date
- **AND** it does not claim GDPR certification or unreviewed legal guarantees

#### Scenario: Visitor follows an external profile or messaging link

- **WHEN** the visitor reviews the privacy notice
- **THEN** it explains that LinkedIn and WhatsApp are third-party services with their own privacy practices

### Requirement: Search and social metadata

The site SHALL provide accurate metadata suitable for search results and link previews.

#### Scenario: A crawler reads the homepage

- **WHEN** the homepage metadata is evaluated
- **THEN** it includes the configured title, description, canonical URL, and OpenGraph fields
- **AND** structured data contains only verified organization and product facts

#### Scenario: Current Vercel deployment is active

- **GIVEN** `jaksambung.site` does not yet serve the production site
- **WHEN** metadata, sitemap, or robots URLs are generated
- **THEN** `https://jaksambung.vercel.app` is used as the active origin

#### Scenario: Planned domain becomes active

- **GIVEN** `https://jaksambung.site` serves the corresponding production pages
- **WHEN** the active origin configuration is migrated
- **THEN** canonical, OpenGraph, sitemap, and robots URLs use `https://jaksambung.site`
- **AND** the old origin is redirected where deployment controls permit

### Requirement: Local development and documentation

The project SHALL run locally without paid API keys and document the prototype architecture.

#### Scenario: Developer starts the project

- **GIVEN** a supported Node.js version and a fresh checkout
- **WHEN** the developer runs `npm install` followed by `npm run dev`
- **THEN** the site starts without requiring a paid service or production backend

#### Scenario: Developer reviews integration boundaries

- **WHEN** the developer reads the README
- **THEN** it identifies mock-data modules, interactive component boundaries, environment variables, and the planned HTTP and WebSocket mappings
