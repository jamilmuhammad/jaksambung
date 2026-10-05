import type { SimulationScenario } from "@/types/spatial";

const basePoints = [
  { id: "venue", label: "Event venue", kind: "venue" as const, x: 49, y: 42 },
  { id: "exit-a", label: "Exit A", kind: "gate" as const, x: 34, y: 39 },
  { id: "exit-b", label: "Exit B", kind: "gate" as const, x: 62, y: 34 },
  { id: "exit-c", label: "Exit C", kind: "gate" as const, x: 54, y: 57 },
  { id: "station-a", label: "Station A", kind: "transit" as const, x: 16, y: 20 },
  { id: "station-b", label: "Station B", kind: "transit" as const, x: 81, y: 76 },
];

const routes = [
  { id: "a", path: "M 34 39 C 27 34, 25 24, 16 20", direction: "outbound" as const },
  { id: "b", path: "M 62 34 C 74 37, 79 50, 81 76", direction: "outbound" as const },
  { id: "c", path: "M 54 57 C 61 67, 71 73, 81 76", direction: "redirected" as const },
];

export const mockScenarios: SimulationScenario[] = [
  {
    id: "normal",
    label: "Normal operations",
    time: "20:42",
    crowd: "18,420",
    points: basePoints.map((point) => ({ ...point, density: point.kind === "venue" ? "moderate" : "low" })),
    routes: routes.map((route, index) => ({ ...route, load: index === 2 ? 18 : 38, active: index !== 2 })),
    recommendation: {
      severity: "info",
      current: "Flow is balanced across active exits.",
      prediction: "All monitored nodes remain within planned load for 20 minutes.",
      recommendation: "Continue normal operations and monitor outbound demand.",
    },
  },
  {
    id: "event-ending",
    label: "Event ending",
    time: "21:48",
    crowd: "31,860",
    points: basePoints.map((point) => ({ ...point, density: point.kind === "venue" ? "high" : "moderate" })),
    routes: routes.map((route) => ({ ...route, load: route.id === "c" ? 32 : 67, active: route.id !== "c" })),
    recommendation: {
      severity: "warning",
      current: "Outbound movement is rising across the active venue exits.",
      prediction: "Transit demand will peak in approximately 18 minutes.",
      recommendation: "Stage outbound teams and prepare secondary pedestrian routes.",
    },
  },
  {
    id: "exit-a-congestion",
    label: "Exit A congestion",
    time: "21:56",
    crowd: "29,740",
    points: basePoints.map((point) => ({
      ...point,
      density: point.id === "exit-a" || point.id === "station-a" ? "critical" : point.kind === "venue" ? "high" : "moderate",
    })),
    routes: routes.map((route) => ({ ...route, load: route.id === "a" ? 94 : 56, active: route.id !== "c" })),
    recommendation: {
      severity: "critical",
      current: "Exit A density is rising beyond the planned operating range.",
      prediction: "Station A is projected to reach critical load in 12 minutes.",
      recommendation: "Prepare to redirect 25% of outbound traffic through Exit C toward Station B.",
    },
  },
  {
    id: "recommended-redistribution",
    label: "Recommended redistribution",
    time: "21:59",
    crowd: "28,910",
    points: basePoints.map((point) => ({
      ...point,
      density: point.id === "exit-a" || point.id === "station-a" ? "high" : point.id === "exit-c" ? "moderate" : "low",
    })),
    routes: routes.map((route) => ({ ...route, load: route.id === "a" ? 68 : route.id === "c" ? 52 : 49, active: true })),
    recommendation: {
      severity: "resolved",
      current: "Redistribution is active and Exit A load is stabilizing.",
      prediction: "Station A is expected to return below critical threshold in 8 minutes.",
      recommendation: "Redirect 25% of outbound traffic through Exit C toward Station B.",
    },
  },
];
