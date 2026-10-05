# Delta for Digital Twin Demo

## ADDED Requirements

### Requirement: OpenStreetMap event context

The interactive demo SHALL place illustrative event operations over recognizable Jakarta geography using OpenStreetMap data without requiring a paid API key.

#### Scenario: Visitor views the map

- **WHEN** the demo becomes visible with network access
- **THEN** it loads an interactive Jakarta map with venue, gate, density, route, transit, and mobility overlays
- **AND** OpenStreetMap contributor attribution remains visible
- **AND** the interface identifies overlays as simulated rather than live operational data

#### Scenario: Map tiles are unavailable

- **WHEN** OpenStreetMap tiles cannot be loaded
- **THEN** event controls and written current-state, prediction, and recommendation content remain available
- **AND** the page does not represent the map as a live operational feed

### Requirement: Jakarta event selection

The demo SHALL offer Jakarta Running Festival, a The Weeknd concert scenario at Jakarta International Stadium, and Pestapora as mutually exclusive event contexts.

#### Scenario: Visitor selects Jakarta Running Festival

- **WHEN** the visitor selects “Jakarta Running Festival”
- **THEN** the map moves to the GBK and Sudirman area
- **AND** it shows illustrative flow toward MRT Istora Mandiri, MRT Senayan, and Palmerah Station
- **AND** the recommendation describes distributing modeled finish-area demand

#### Scenario: Visitor selects The Weeknd concert

- **WHEN** the visitor selects “The Weeknd concert”
- **THEN** the map moves to Jakarta International Stadium
- **AND** it shows illustrative rail alternatives and Kemayoran shuttle staging
- **AND** the recommendation describes pulsed release and modeled demand redistribution

#### Scenario: Visitor selects Pestapora

- **WHEN** the visitor selects “Pestapora”
- **THEN** the map moves to JIExpo and Gambir Expo
- **AND** it shows illustrative bus, Rajawali rail, and ride-hail staging connections
- **AND** the recommendation separates modeled pickup and transit demand

### Requirement: Coordinated operational response

The demo SHALL update map position, spatial overlays, event identity, metrics, alert, prediction, and recommendation as one coherent event change.

#### Scenario: Selected event changes

- **WHEN** a visitor selects a different event
- **THEN** stale overlays and particles from the previous event are removed
- **AND** the new venue, nodes, routes, densities, and written guidance are displayed

### Requirement: Honest simulation boundaries

The demo SHALL distinguish geographic context from local mock operational data.

#### Scenario: Visitor reviews event values

- **WHEN** crowd scale, routes, densities, predictions, or recommendations are displayed
- **THEN** they are identified as illustrative model values
- **AND** they are not presented as measured attendance, official event plans, current transit commitments, or customer outcomes

### Requirement: Accessible simulation state

The demo SHALL provide keyboard and assistive-technology access to event selection and resulting state.

#### Scenario: Keyboard visitor changes an event

- **WHEN** a keyboard visitor uses arrow keys on the event radio group
- **THEN** the selected event changes and remains programmatically exposed
- **AND** focus remains on the selected event control
- **AND** the updated operational summary is announced without moving focus unexpectedly

#### Scenario: Visitor requests reduced motion

- **WHEN** a visitor has enabled reduced motion
- **THEN** route lines, nodes, density overlays, and written recommendations remain visible
- **AND** moving route particles and animated map travel are disabled

### Requirement: Replaceable map and mock-data boundaries

The demo SHALL keep OpenStreetMap style configuration and typed local event overlays replaceable for future production services.

#### Scenario: Prototype operates locally

- **GIVEN** no spatial API server or paid map key is available
- **WHEN** the demo loads
- **THEN** local typed data supplies all event overlays and operational guidance
- **AND** OpenStreetMap supplies map context over the network

#### Scenario: Production traffic is planned

- **WHEN** the prototype is prepared for material production traffic
- **THEN** documentation directs operators to configure a suitable OSM-compatible tile provider
- **AND** contributor attribution is preserved

### Requirement: Resilient map layout

The demo SHALL preserve useful map and operational information across supported viewport sizes.

#### Scenario: Demo appears on mobile

- **WHEN** the available width is constrained
- **THEN** the map, event controls, attribution, and recommendation text are not clipped
- **AND** visitors do not need to horizontally scroll the whole page
