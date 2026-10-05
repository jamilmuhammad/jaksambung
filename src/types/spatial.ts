export type ScenarioId = "jakarta-running-festival" | "the-weeknd-jis" | "pestapora";

export type Density = "low" | "moderate" | "high" | "critical";
export type MapCoordinate = [longitude: number, latitude: number];

export interface SpatialPoint {
  id: string;
  label: string;
  detail: string;
  kind: "venue" | "gate" | "transit" | "mobility";
  coordinate: MapCoordinate;
  density: Density;
}

export interface FlowRoute {
  id: string;
  label: string;
  coordinates: MapCoordinate[];
  direction: "outbound" | "redirected";
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
  shortLabel: string;
  venue: string;
  district: string;
  time: string;
  crowd: string;
  transitSummary: string;
  center: MapCoordinate;
  zoom: number;
  points: SpatialPoint[];
  routes: FlowRoute[];
  recommendation: OperationalRecommendation;
}

export interface SpatialIntelligenceService {
  getScenarios(): Promise<SimulationScenario[]>;
  simulateScenario(id: ScenarioId): Promise<SimulationScenario>;
}
