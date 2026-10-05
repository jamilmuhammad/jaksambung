import { mockScenarios } from "@/data/mock-scenarios";
import type { ScenarioId, SpatialIntelligenceService } from "@/types/spatial";

export const mockSpatialService: SpatialIntelligenceService = {
  async getScenarios() {
    return mockScenarios;
  },
  async simulateScenario(id: ScenarioId) {
    return mockScenarios.find((scenario) => scenario.id === id) ?? mockScenarios[0];
  },
};
