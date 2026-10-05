# Delta for Digital Twin Demo

## ADDED Requirements

### Requirement: Event-to-city spatial model

The interactive demo SHALL depict an event venue connected through pedestrian routes and gates to surrounding public space and multiple transit stations.

#### Scenario: Visitor views the default model

- **WHEN** the demo first becomes visible
- **THEN** it shows an event venue, multiple gates, crowd nodes, pedestrian routes, and at least two named transit stations
- **AND** route direction and node density are distinguishable without relying on color alone
- **AND** the interface identifies the data as simulated

### Requirement: Scenario controls

The demo SHALL offer Normal Operations, Event Ending, Exit A Congestion, and Recommended Redistribution as mutually exclusive scenarios.

#### Scenario: Visitor selects Event Ending

- **WHEN** the visitor selects “Event Ending”
- **THEN** outbound flow increases across the relevant gates and transit routes
- **AND** the status and recommendation content describes increased outbound demand

#### Scenario: Visitor selects Exit A Congestion

- **WHEN** the visitor selects “Exit A Congestion”
- **THEN** Exit A visibly reaches a higher density state
- **AND** the prediction states that critical load is projected in 12 minutes
- **AND** the recommendation identifies a redistribution action

#### Scenario: Visitor selects Recommended Redistribution

- **WHEN** the visitor selects “Recommended Redistribution”
- **THEN** the route from Exit C toward Station B becomes the recommended flow path
- **AND** the recommendation says to redirect 25% of outbound traffic through Exit C toward Station B
- **AND** the affected load indicators show the intended recovery direction

### Requirement: Coordinated operational response

The demo SHALL update spatial state and written operational guidance as one coherent scenario change.

#### Scenario: Scenario state changes

- **WHEN** a visitor selects a different scenario
- **THEN** crowd density, active routes, movement direction, alerts, prediction, and recommendation update to the selected scenario
- **AND** stale values from the previous scenario are not presented as current

### Requirement: Accessible simulation state

The demo SHALL provide keyboard and assistive-technology access to scenario selection and its resulting state.

#### Scenario: Keyboard visitor changes a scenario

- **WHEN** a keyboard visitor moves through and selects a scenario control
- **THEN** the selected state is programmatically exposed
- **AND** focus remains predictable
- **AND** the updated scenario summary is announced without moving focus unexpectedly

#### Scenario: Visitor cannot perceive animation

- **WHEN** a visitor reads the text summary or uses reduced motion
- **THEN** they receive the same current condition, prediction, and recommendation conveyed by the animated visualization

### Requirement: Replaceable mock-data boundary

The demo SHALL consume typed domain contracts through a local mock service that can later be replaced by HTTP and WebSocket adapters.

#### Scenario: Prototype operates locally

- **GIVEN** no API server is available
- **WHEN** the demo loads and scenarios are selected
- **THEN** all required states are returned by local mock data
- **AND** no paid map or data-provider key is required

#### Scenario: Future adapter is introduced

- **GIVEN** an adapter implements the documented spatial-intelligence service contract
- **WHEN** components consume that adapter
- **THEN** visualization components do not require their display contract to be redesigned

### Requirement: Resilient visualization layout

The demo SHALL preserve useful spatial and operational information across supported viewport sizes.

#### Scenario: Demo appears on mobile

- **WHEN** the available width is constrained
- **THEN** the map remains legible or provides a purpose-designed simplified composition
- **AND** scenario controls and recommendation text are not clipped
- **AND** visitors do not need to horizontally scroll the whole page
