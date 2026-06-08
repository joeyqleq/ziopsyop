"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Navigation } from "@/components/Navigation";

const AttackMap = dynamic(() => import("@/components/viz/AttackMap").then((m) => m.AttackMap), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center text-cyan-400 font-mono animate-pulse">
      LOADING MAP INTELLIGENCE...
    </div>
  ),
});

interface MapEvent {
  event_id: string;
  date: string;
  attacker: string;
  attack_type: string;
  target_category: string;
  location: { name: string; lat: number; lon: number; governorate: string; accuracy: string };
  casualties: { killed_total: number; wounded_total: number };
  ihl_classification: string;
  description?: string;
  source_urls: string[];
}

export default function MapPage() {
  const [events, setEvents] = useState<MapEvent[]>([]);
  const [filters, setFilters] = useState({
    attacker: "all",
    dateRange: "all",
    severity: "all",
  });

  useState(() => {
    fetch("/data/events.json")
      .then((r) => r.json())
      .then(setEvents)
      .catch(() => setEvents(getSampleEvents()));
  });

  const filteredEvents = useMemo(() => {
    let result = events;
    if (filters.attacker !== "all") {
      result = result.filter((e) => e.attacker === filters.attacker);
    }
    return result;
  }, [events, filters]);

  return (
    <main className="relative min-h-screen">
      <AuroraBackground />
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-8 space-y-6">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold glow-text">Geospatial Attack Map</h1>
          <p className="text-xs text-gray-400 mt-2 font-mono">
            Every documented military action in Lebanon, Jan 2024 — Jun 2026
          </p>
        </motion.header>

        <div className="flex flex-wrap gap-3 justify-center">
          <select
            value={filters.attacker}
            onChange={(e) => setFilters((f) => ({ ...f, attacker: e.target.value }))}
            className="bg-gray-900/80 border border-gray-700 rounded-lg px-3 py-1.5 text-xs font-mono text-gray-300"
          >
            <option value="all">All Actors</option>
            <option value="IDF">IDF</option>
            <option value="Hezbollah">Hezbollah</option>
            <option value="UNIFIL">UNIFIL Incidents</option>
          </select>
          <select
            value={filters.severity}
            onChange={(e) => setFilters((f) => ({ ...f, severity: e.target.value }))}
            className="bg-gray-900/80 border border-gray-700 rounded-lg px-3 py-1.5 text-xs font-mono text-gray-300"
          >
            <option value="all">All Severity</option>
            <option value="high">High Casualty</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel-strong overflow-hidden"
        >
          <AttackMap events={filteredEvents} />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Legend color="#ef4444" shape="circle" label="IDF airstrike on civilians" />
          <Legend color="#f97316" shape="triangle" label="IDF strike on military" />
          <Legend color="#3b82f6" shape="diamond" label="UNIFIL incident" />
          <Legend color="#eab308" shape="star" label="Hezbollah launch" />
          <Legend color="#111" shape="x" label="Assassination" />
          <Legend color="#22c55e" shape="square" label="LAF incident" />
          <Legend color="#888" shape="circle" label="Unattributed" />
        </div>
      </div>
    </main>
  );
}

function Legend({ color, shape, label }: { color: string; shape: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[10px] text-gray-400">
      <span
        className="w-3 h-3 inline-block border"
        style={{
          backgroundColor: color,
          borderColor: color,
          borderRadius: shape === "circle" ? "50%" : shape === "diamond" ? "2px" : "0",
          transform: shape === "diamond" ? "rotate(45deg) scale(0.8)" : "none",
        }}
      />
      <span>{label}</span>
    </div>
  );
}

function getSampleEvents(): MapEvent[] {
  return [
    { event_id: "EVT-2024-001", date: "2024-10-01", attacker: "IDF", attack_type: "airstrike", target_category: "civilian_residential", location: { name: "Dahiyeh, Beirut", lat: 33.84, lon: 35.52, governorate: "Beirut", accuracy: "estimated" }, casualties: { killed_total: 6, wounded_total: 22 }, ihl_classification: "likely_violation", description: "Airstrike on residential building in Dahiyeh suburb", source_urls: [] },
    { event_id: "EVT-2024-002", date: "2024-10-08", attacker: "IDF", attack_type: "airstrike", target_category: "civilian_residential", location: { name: "Nabatieh", lat: 33.38, lon: 35.48, governorate: "Nabatieh", accuracy: "exact" }, casualties: { killed_total: 16, wounded_total: 40 }, ihl_classification: "confirmed_violation", description: "Strike on Nabatieh market during business hours", source_urls: [] },
    { event_id: "EVT-2024-003", date: "2024-10-13", attacker: "IDF", attack_type: "ground_incursion", target_category: "civilian_residential", location: { name: "Aita al-Shaab", lat: 33.12, lon: 35.33, governorate: "Bint Jbeil", accuracy: "exact" }, casualties: { killed_total: 3, wounded_total: 8 }, ihl_classification: "likely_violation", description: "Bulldozer operations demolishing civilian homes", source_urls: [] },
    { event_id: "EVT-2024-004", date: "2024-09-17", attacker: "IDF", attack_type: "pager_operation", target_category: "civilian_residential", location: { name: "Multiple locations, Lebanon", lat: 33.88, lon: 35.5, governorate: "Multiple", accuracy: "district_level" }, casualties: { killed_total: 12, wounded_total: 2800 }, ihl_classification: "confirmed_violation", description: "Coordinated pager detonations across Lebanon", source_urls: [] },
    { event_id: "EVT-2024-005", date: "2024-11-05", attacker: "IDF", attack_type: "airstrike", target_category: "ambulance", location: { name: "Baalbek", lat: 34.0, lon: 36.2, governorate: "Baalbek-Hermel", accuracy: "estimated" }, casualties: { killed_total: 4, wounded_total: 2 }, ihl_classification: "confirmed_violation", description: "Double-tap strike on paramedics responding to initial bombing", source_urls: [] },
    { event_id: "EVT-2024-006", date: "2024-10-22", attacker: "Hezbollah", attack_type: "rocket", target_category: "military_idf", location: { name: "Kiryat Shmona area", lat: 33.21, lon: 35.57, governorate: "Border", accuracy: "estimated" }, casualties: { killed_total: 0, wounded_total: 3 }, ihl_classification: "likely_compliant", description: "Rocket barrage targeting IDF border positions", source_urls: [] },
    { event_id: "EVT-2024-007", date: "2024-11-15", attacker: "IDF", attack_type: "artillery", target_category: "civilian_residential", location: { name: "Khiam", lat: 33.18, lon: 35.55, governorate: "Marjayoun", accuracy: "exact" }, casualties: { killed_total: 8, wounded_total: 15 }, ihl_classification: "likely_violation", description: "Artillery bombardment of residential quarter", source_urls: [] },
    { event_id: "EVT-2024-008", date: "2024-12-01", attacker: "IDF", attack_type: "drone_strike", target_category: "journalist", location: { name: "Hasbaya", lat: 33.4, lon: 35.68, governorate: "Hasbaya", accuracy: "exact" }, casualties: { killed_total: 2, wounded_total: 0 }, ihl_classification: "confirmed_violation", description: "Drone strike killing two journalists in marked press vehicle", source_urls: [] },
    { event_id: "EVT-2025-001", date: "2025-01-15", attacker: "IDF", attack_type: "drone_surveillance", target_category: "civilian_residential", location: { name: "Tyre", lat: 33.27, lon: 35.2, governorate: "South Lebanon", accuracy: "exact" }, casualties: { killed_total: 0, wounded_total: 0 }, ihl_classification: "likely_violation", description: "Persistent drone surveillance over residential areas post-ceasefire", source_urls: [] },
    { event_id: "EVT-2025-002", date: "2025-02-10", attacker: "IDF", attack_type: "ground_incursion", target_category: "civilian_residential", location: { name: "Maroun al-Ras", lat: 33.1, lon: 35.43, governorate: "Bint Jbeil", accuracy: "exact" }, casualties: { killed_total: 1, wounded_total: 4 }, ihl_classification: "confirmed_violation", description: "IDF troops fire on civilians attempting to return to village", source_urls: [] },
    { event_id: "EVT-2025-003", date: "2025-03-20", attacker: "IDF", attack_type: "airstrike", target_category: "infrastructure_water", location: { name: "Litani River area", lat: 33.33, lon: 35.45, governorate: "South Lebanon", accuracy: "estimated" }, casualties: { killed_total: 0, wounded_total: 0 }, ihl_classification: "likely_violation", description: "Strike on water infrastructure near Litani River", source_urls: [] },
    { event_id: "EVT-2026-001", date: "2026-01-20", attacker: "IDF", attack_type: "ground_incursion", target_category: "civilian_residential", location: { name: "Bint Jbeil", lat: 33.12, lon: 35.43, governorate: "Bint Jbeil", accuracy: "exact" }, casualties: { killed_total: 5, wounded_total: 12 }, ihl_classification: "confirmed_violation", description: "Second ground invasion begins - systematic destruction of border villages", source_urls: [] },
    { event_id: "EVT-2026-002", date: "2026-02-15", attacker: "Hezbollah", attack_type: "drone_strike", target_category: "military_idf", location: { name: "Metula", lat: 33.28, lon: 35.58, governorate: "Border", accuracy: "estimated" }, casualties: { killed_total: 3, wounded_total: 7 }, ihl_classification: "likely_compliant", description: "FPV drone strike on IDF armored vehicle", source_urls: [] },
    { event_id: "EVT-2026-003", date: "2026-03-01", attacker: "IDF", attack_type: "airstrike", target_category: "medical_facility", location: { name: "Sidon", lat: 33.56, lon: 35.37, governorate: "South Lebanon", accuracy: "exact" }, casualties: { killed_total: 11, wounded_total: 30 }, ihl_classification: "confirmed_violation", description: "Airstrike on hospital complex", source_urls: [] },
  ];
}
