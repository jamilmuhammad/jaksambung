"use client";

import { useReducedMotion } from "framer-motion";
import type { FeatureCollection, LineString, Point } from "geojson";
import * as maplibregl from "maplibre-gl";
import type { GeoJSONSource, Map as MapLibreMap, Marker, StyleSpecification } from "maplibre-gl";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import type { MapCoordinate, ScenarioId, SimulationScenario } from "@/types/spatial";

const mapStyle: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "osm-base",
      type: "raster",
      source: "osm",
      paint: {
        "raster-saturation": -0.86,
        "raster-contrast": 0.22,
        "raster-brightness-min": 0.08,
        "raster-brightness-max": 0.5,
      },
    },
  ],
};

interface AnimatedParticle {
  marker: Marker;
  coordinates: MapCoordinate[];
  offset: number;
  speed: number;
}

function pointAlongRoute(coordinates: MapCoordinate[], progress: number): MapCoordinate {
  if (coordinates.length < 2) return coordinates[0] ?? [0, 0];
  const normalizedProgress = Math.min(1, Math.max(0, progress));
  const section = normalizedProgress * (coordinates.length - 1);
  const index = Math.max(0, Math.min(Math.floor(section), coordinates.length - 2));
  const local = section - index;
  const start = coordinates[index];
  const end = coordinates[index + 1];
  return [start[0] + (end[0] - start[0]) * local, start[1] + (end[1] - start[1]) * local];
}

export function DigitalTwin({ scenarios }: { scenarios: SimulationScenario[] }) {
  const [scenarioId, setScenarioId] = useState<ScenarioId>(scenarios[0].id);
  const [mapReady, setMapReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const particlesRef = useRef<AnimatedParticle[]>([]);
  const animationRef = useRef<number | null>(null);
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];

  function moveScenario(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const offset = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (index + offset + scenarios.length) % scenarios.length;
    setScenarioId(scenarios[nextIndex].id);
    document.getElementById(`scenario-${scenarios[nextIndex].id}`)?.focus();
  }

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: scenarios[0].center,
      zoom: scenarios[0].zoom,
      attributionControl: { compact: true },
      maxZoom: 18,
      minZoom: 11,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.on("load", () => setMapReady(true));
    mapRef.current = map;

    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      markersRef.current.forEach((marker) => marker.remove());
      particlesRef.current.forEach(({ marker }) => marker.remove());
      map.remove();
      mapRef.current = null;
    };
  }, [scenarios]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    markersRef.current.forEach((marker) => marker.remove());
    particlesRef.current.forEach(({ marker }) => marker.remove());
    markersRef.current = [];
    particlesRef.current = [];

    const flowData: FeatureCollection<LineString> = {
      type: "FeatureCollection",
      features: scenario.routes.filter((route) => route.active).map((route) => ({
        type: "Feature",
        properties: { direction: route.direction, load: route.load, label: route.label },
        geometry: { type: "LineString", coordinates: route.coordinates },
      })),
    };
    const pointData: FeatureCollection<Point> = {
      type: "FeatureCollection",
      features: scenario.points.map((point) => ({
        type: "Feature",
        properties: {
          density: point.density,
          weight: point.density === "critical" ? 1 : point.density === "high" ? 0.76 : point.density === "moderate" ? 0.5 : 0.25,
        },
        geometry: { type: "Point", coordinates: point.coordinate },
      })),
    };

    if (!map.getSource("scenario-flows")) {
      map.addSource("scenario-flows", { type: "geojson", data: flowData, lineMetrics: true });
      map.addLayer({
        id: "flow-shadow",
        type: "line",
        source: "scenario-flows",
        paint: { "line-color": "#08100f", "line-width": 9, "line-opacity": 0.72 },
      });
      map.addLayer({
        id: "flow-routes",
        type: "line",
        source: "scenario-flows",
        paint: {
          "line-color": ["match", ["get", "direction"], "redirected", "#f2c94c", "#54d6d0"],
          "line-width": ["interpolate", ["linear"], ["get", "load"], 30, 3, 100, 7],
          "line-opacity": 0.9,
          "line-dasharray": [1.3, 1.1],
        },
      });
    } else {
      (map.getSource("scenario-flows") as GeoJSONSource).setData(flowData);
    }

    if (!map.getSource("scenario-density")) {
      map.addSource("scenario-density", { type: "geojson", data: pointData });
      map.addLayer({
        id: "density-heat",
        type: "heatmap",
        source: "scenario-density",
        paint: {
          "heatmap-weight": ["get", "weight"],
          "heatmap-intensity": 1.25,
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 11, 22, 16, 44],
          "heatmap-opacity": 0.72,
          "heatmap-color": [
            "interpolate", ["linear"], ["heatmap-density"],
            0, "rgba(20,60,66,0)", 0.25, "rgba(84,214,208,.35)",
            0.55, "rgba(242,201,76,.58)", 0.8, "rgba(255,90,54,.72)", 1, "rgba(255,90,54,.92)",
          ],
        },
      });
    } else {
      (map.getSource("scenario-density") as GeoJSONSource).setData(pointData);
    }

    scenario.points.forEach((point) => {
      const element = document.createElement("button");
      element.type = "button";
      element.className = `map-node map-node-${point.kind} map-density-${point.density}`;
      element.setAttribute("aria-label", `${point.label}. ${point.detail}`);
      element.innerHTML = `<i aria-hidden="true"></i><span>${point.label}</span>`;

      const popupContent = document.createElement("div");
      const title = document.createElement("strong");
      const detail = document.createElement("p");
      title.textContent = point.label;
      detail.textContent = point.detail;
      popupContent.append(title, detail);

      const popup = new maplibregl.Popup({ offset: 18, closeButton: false }).setDOMContent(popupContent);
      const marker = new maplibregl.Marker({ element, anchor: "center" }).setLngLat(point.coordinate).setPopup(popup).addTo(map);
      markersRef.current.push(marker);
    });

    if (!reduceMotion) {
      scenario.routes.filter((route) => route.active).forEach((route, routeIndex) => {
        [0, 0.5].forEach((offset) => {
          const element = document.createElement("span");
          element.className = `map-particle map-particle-${route.direction}`;
          element.setAttribute("aria-hidden", "true");
          const marker = new maplibregl.Marker({ element }).setLngLat(route.coordinates[0]).addTo(map);
          particlesRef.current.push({ marker, coordinates: route.coordinates, offset, speed: 0.000045 + routeIndex * 0.000004 });
        });
      });

      const started = performance.now();
      const animate = (now: number) => {
        particlesRef.current.forEach((particle) => {
          const rawProgress = Math.max(0, now - started) * particle.speed + particle.offset;
          const progress = ((rawProgress % 1) + 1) % 1;
          particle.marker.setLngLat(pointAlongRoute(particle.coordinates, progress));
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    map.flyTo({ center: scenario.center, zoom: scenario.zoom, duration: reduceMotion ? 0 : 1100, essential: false });
  }, [mapReady, reduceMotion, scenario]);

  return (
    <div className={`twin twin-${scenario.recommendation.severity}`}>
      <div className="twin-toolbar">
        <div><span className="status-dot" />OpenStreetMap simulation</div>
        <div>{scenario.district}</div>
        <div>{scenario.time} WIB</div>
      </div>

      <div className="scenario-tabs scenario-tabs-events" role="radiogroup" aria-label="Jakarta event scenario">
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
            <span>{String(index + 1).padStart(2, "0")} / {item.shortLabel}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="twin-grid">
        <div className="map-wrap osm-map-wrap" role="region" aria-label={`${scenario.label} spatial simulation map`}>
          <div ref={mapContainer} className="osm-map" />
          {!mapReady && <div className="map-loading">Loading Jakarta map…</div>}
          <div className="map-legend" aria-hidden="true">
            <span><i className="legend-flow" /> Primary flow</span>
            <span><i className="legend-redirect" /> Redistribution</span>
            <span><i className="legend-density" /> Density</span>
          </div>
        </div>

        <aside className="operations-panel" aria-live="polite" aria-atomic="true">
          <div className="event-identity"><span>Modeled event</span><strong>{scenario.label}</strong><small>{scenario.venue}</small></div>
          <div className="metric-pair">
            <div><span>Scenario scale</span><strong>{scenario.crowd}</strong></div>
            <div><span>Connected modes</span><strong>{scenario.transitSummary}</strong></div>
          </div>
          <div className="ops-block"><span>Current</span><p>{scenario.recommendation.current}</p></div>
          <div className="ops-block prediction"><span>Prediction</span><p>{scenario.recommendation.prediction}</p></div>
          <div className="ops-block recommendation"><span>Recommended action</span><p>{scenario.recommendation.recommendation}</p></div>
          <p className="simulation-note">Illustrative prototype overlays on © OpenStreetMap. Not live event, attendance, or transit data.</p>
        </aside>
      </div>
    </div>
  );
}
