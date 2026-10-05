export type EventScenarioKind = "running" | "concert" | "exhibition" | "company";

export interface EventScenarioCard {
  id: EventScenarioKind;
  number: string;
  title: string;
  descriptor: string;
  examples: readonly string[];
  challenge: string;
  signals: string;
  action: string;
  impact: string;
  accent: string;
}

export const eventScenarioCards: readonly EventScenarioCard[] = [
  {
    id: "running",
    number: "01",
    title: "Running events",
    descriptor: "The route is the venue",
    examples: ["City marathon", "Fun run", "Triathlon", "Finish festival"],
    challenge: "Participants, spectators, road closures, finish-line services, and transit demand converge along a moving footprint.",
    signals: "Pace waves, finish density, crossing pressure, gate load, and station approach flow.",
    action: "Sequence finish release, protect crossing points, and distribute people across alternative stations and pickup zones.",
    impact: "Turn a fragmented route plan into one event-to-transit operating picture.",
    accent: "#8a4fff",
  },
  {
    id: "concert",
    number: "02",
    title: "Concert events",
    descriptor: "One finale, thousands moving",
    examples: ["Stadium show", "Arena concert", "Music festival", "Fan zone"],
    challenge: "A predictable show ending can create an immediate, highly concentrated outbound surge around a venue district.",
    signals: "Gate density, set timing, pedestrian direction, curb demand, and transit-node load.",
    action: "Forecast the surge window, pulse gate release, and redirect part of the audience before a primary node becomes critical.",
    impact: "Give venue and mobility teams time to coordinate before the final song ends.",
    accent: "#ff5a36",
  },
  {
    id: "exhibition",
    number: "03",
    title: "Exhibitions",
    descriptor: "Many halls, repeated waves",
    examples: ["Trade fair", "Convention", "Public expo", "Cultural showcase"],
    challenge: "Registration peaks, hall turnovers, lunch periods, and closing times generate repeated movement waves across a district.",
    signals: "Hall occupancy, arrival batches, concourse flow, curb queues, and transit arrivals.",
    action: "Rebalance entrances, stagger programmed moments, and connect hall-level decisions to streets and public transport.",
    impact: "Move from hall-by-hall monitoring to coordinated district operations.",
    accent: "#f2c94c",
  },
  {
    id: "company",
    number: "04",
    title: "Company events",
    descriptor: "Guest experience meets operations",
    examples: ["Town hall", "Product launch", "Leadership summit", "Corporate gathering"],
    challenge: "Scheduled arrivals, security checks, shuttle fleets, guests, and staff create temporary pressure beyond the event space.",
    signals: "Check-in rate, lobby density, shuttle ETA, pickup demand, and route accessibility.",
    action: "Coordinate arrival windows, adapt check-in capacity, and route guests toward available mobility options.",
    impact: "Protect the guest experience while giving operators a shared live plan.",
    accent: "#4b9cff",
  },
] as const;
