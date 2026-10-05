export const capabilities = [
  ["Live spatial heatmap", "See how pressure forms across venues, gates, routes, and transit nodes."],
  ["Crowd flow direction", "Understand where movement is heading, not only how many people are present."],
  ["Bottleneck forecasting", "Identify critical loads before queues spill into surrounding city systems."],
  ["Event digital twin", "Connect venue operations with streets, public space, and onward transport."],
  ["Scenario simulator", "Test exit plans, route changes, and transit demand before event day."],
  ["Operational recommendations", "Turn predictions into practical actions for teams on the ground."],
  ["Post-event review", "Compare planned and observed movement to improve the next operation."],
  ["API integration", "Create a path toward event, mobility, map, and city operations systems."],
] as const;

export const pipeline = [
  {
    name: "Sense",
    detail: "CCTV, sensors, event configuration, maps, and historical operations.",
  },
  {
    name: "Understand",
    detail: "Count, density, direction, flow rate, and relationships between spatial nodes.",
  },
  {
    name: "Predict",
    detail: "Forecast congestion, bottlenecks, and demand surges before they become critical.",
  },
  {
    name: "Orchestrate",
    detail: "Recommend exits, pedestrian routes, transit nodes, and operator alerts.",
  },
] as const;

export const lifecycle = [
  {
    phase: "Before",
    title: "Plan against pressure",
    copy: "Model event configurations, test egress scenarios, and align venue and mobility teams around one spatial picture.",
  },
  {
    phase: "During",
    title: "See the city respond",
    copy: "Track aggregate movement, anticipate critical nodes, and issue recommendations while teams can still act.",
  },
  {
    phase: "After",
    title: "Make the next event better",
    copy: "Review flow patterns, interventions, and transit demand to create an operational record that compounds.",
  },
] as const;

export const useCases = [
  ["01", "42K city marathon", "Finish-line dispersal across three gates and two rail stations."],
  ["02", "Stadium concert", "Outbound surge forecasting as the final set approaches."],
  ["03", "Waterfront festival", "Flow balancing between stages, public space, and temporary mobility nodes."],
  ["04", "Convention district", "Arrival-wave coordination across halls, curb space, and urban transit."],
] as const;

export const customerGroups = [
  ["Event organizers", "Move from static safety plans to adaptive event operations."],
  ["Venue operators", "Understand how gate decisions affect the district outside the perimeter."],
  ["Mobility operators", "Anticipate surges and distribute demand across nearby nodes."],
  ["City authorities", "Build a shared operating picture across temporary high-density activity."],
] as const;
