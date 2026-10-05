export type ScenarioId =
  | "normal"
  | "event-ending"
  | "exit-a-congestion"
  | "recommended-redistribution";

export type Density = "low" | "moderate" | "high" | "critical";

export interface SpatialPoint {
  id: string;
  label: string;
  kind: "venue" | "gate" | "crowd" | "transit";
  x: number;
  y: number;
  density?: Density;
}

export interface FlowRoute {
  id: string;
  path: string;
  direction: "inbound" | "outbound" | "redirected";
  load: number;
  active: boolean;
}

export interface OperationalRecommendation {
  severity: "info" | "warning" | "critical" | "resolved";
  current: string;
  prediction: string;
  recommendation: string;
}

export interface SimulationScenario {
  id: ScenarioId;
  label: string;
  time: string;
  crowd: string;
  points: SpatialPoint[];
  routes: FlowRoute[];
  recommendation: OperationalRecommendation;
}

export interface SpatialIntelligenceService {
  getScenarios(): Promise<SimulationScenario[]>;
  simulateScenario(id: ScenarioId): Promise<SimulationScenario>;
}
