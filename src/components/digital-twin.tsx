"use client";

import { motion, useReducedMotion } from "framer-motion";
import { KeyboardEvent, useId, useState } from "react";
import type { Density, ScenarioId, SimulationScenario } from "@/types/spatial";

const densityRadius: Record<Density, number> = {
  low: 2.6,
  moderate: 4,
  high: 5.8,
  critical: 7.4,
};

const particlePaths: Record<string, { x: number[]; y: number[] }> = {
  a: { x: [34, 29, 23, 16], y: [39, 34, 26, 20] },
  b: { x: [62, 72, 78, 81], y: [34, 41, 55, 76] },
  c: { x: [54, 62, 72, 81], y: [57, 67, 73, 76] },
};

export function DigitalTwin({ scenarios }: { scenarios: SimulationScenario[] }) {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("normal");
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];

  function moveScenario(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const offset = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (index + offset + scenarios.length) % scenarios.length;
    setScenarioId(scenarios[nextIndex].id);
    document.getElementById(`scenario-${scenarios[nextIndex].id}`)?.focus();
  }

  return (
    <div className={`twin twin-${scenario.recommendation.severity}`}>
      <div className="twin-toolbar">
        <div>
          <span className="status-dot" />
          Simulated operation
        </div>
        <div>JKT / DISTRICT 08</div>
        <div>{scenario.time} WIB</div>
      </div>

      <div className="scenario-tabs" role="radiogroup" aria-label="Simulation scenario">
        {scenarios.map((item, index) => (
          <button
            id={`scenario-${item.id}`}
            key={item.id}
            type="button"
            role="radio"
            aria-checked={scenarioId === item.id}
            tabIndex={scenarioId === item.id ? 0 : -1}
            onClick={() => setScenarioId(item.id)}
            onKeyDown={(event) => moveScenario(event, index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="twin-grid">
        <div className="map-wrap">
          <svg viewBox="0 0 100 88" role="img" aria-labelledby={titleId} className="city-map">
            <title id={titleId}>{scenario.label}: event venue flow toward Station A and Station B</title>
            <defs>
              <pattern id="micro-grid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="currentColor" strokeWidth=".12" />
              </pattern>
              <filter id="soft-glow">
                <feGaussianBlur stdDeviation="1.6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <marker id="flow-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M0 0L8 4L0 8Z" className="marker-flow" />
              </marker>
              <marker id="redirect-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M0 0L8 4L0 8Z" className="marker-redirect" />
              </marker>
            </defs>
            <rect width="100" height="88" fill="url(#micro-grid)" className="map-grid" />
            <path d="M2 15L36 15L41 7L96 7M3 67L28 67L38 79L96 79M8 3L8 84M90 3L90 84" className="street" />
            <path d="M25 4L25 84M72 4L72 84M3 28L97 28M3 61L97 61" className="street secondary" />
            <rect x="37" y="29" width="25" height="27" className="venue-block" />
            <path d="M42 34h15v17H42zM46 38h7v9h-7z" className="venue-core" />
            {scenario.routes.map((route) => (
              <g key={route.id}>
                <motion.path
                  d={route.path}
                  className={`flow-route route-${route.direction} ${route.active ? "active" : ""}`}
                  markerEnd={route.direction === "redirected" ? "url(#redirect-arrow)" : "url(#flow-arrow)"}
                  initial={false}
                  animate={{ opacity: route.active ? 1 : 0.14, pathLength: route.active ? 1 : 0.6 }}
                  transition={{ duration: reduceMotion ? 0 : 0.65 }}
                />
                {route.active && !reduceMotion && [0, 1, 2].map((particle) => (
                  <motion.circle
                    key={particle}
                    r=".65"
                    className={`particle particle-${route.direction}`}
                    animate={particlePaths[route.id]}
                    transition={{
                      duration: 3.8 - route.load / 60,
                      repeat: Infinity,
                      ease: "linear",
                      delay: particle * 0.75,
                    }}
                  />
                ))}
              </g>
            ))}
            {scenario.points.map((point) => {
              const density = point.density ?? "low";
              const radius = densityRadius[density];
              return (
                <g key={point.id} className={`point point-${point.kind} density-${density}`}>
                  {point.kind !== "venue" && (
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r={radius}
                      className="density-ring"
                      initial={false}
                      animate={{ r: radius, opacity: density === "critical" ? 0.7 : 0.34 }}
                    />
                  )}
                  {point.kind === "transit" && <rect x={point.x - 2} y={point.y - 2} width="4" height="4" className="station" />}
                  {point.kind === "gate" && <circle cx={point.x} cy={point.y} r="1.2" className="gate" />}
                  <text x={point.x + (point.id === "station-b" ? -2 : 2.5)} y={point.y - 3.8} textAnchor={point.id === "station-b" ? "end" : "start"}>{point.label}</text>
                </g>
              );
            })}
            <text x="49.5" y="45" textAnchor="middle" className="venue-label">EVENT</text>
            <text x="4" y="85" className="coordinate">-6.2088 / 106.8456</text>
          </svg>
          <div className="map-legend" aria-hidden="true">
            <span><i className="legend-flow" /> Active flow</span>
            <span><i className="legend-density" /> Density</span>
            <span><i className="legend-transit" /> Transit</span>
          </div>
        </div>

        <aside className="operations-panel" aria-live="polite" aria-atomic="true">
          <div className="metric-pair">
            <div><span>People in model</span><strong>{scenario.crowd}</strong></div>
            <div><span>Scenario time</span><strong>{scenario.time}</strong></div>
          </div>
          <div className="ops-block">
            <span>Current</span>
            <p>{scenario.recommendation.current}</p>
          </div>
          <div className="ops-block prediction">
            <span>Prediction</span>
            <p>{scenario.recommendation.prediction}</p>
          </div>
          <div className="ops-block recommendation">
            <span>Recommended action</span>
            <p>{scenario.recommendation.recommendation}</p>
          </div>
          <p className="simulation-note">Illustrative prototype data. Not a live operational feed.</p>
        </aside>
      </div>
    </div>
  );
}
