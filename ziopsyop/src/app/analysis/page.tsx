"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Navigation } from "@/components/Navigation";
import dynamic from "next/dynamic";

const SankeyDiagram = dynamic(
  () => import("@/components/viz/SankeyDiagram").then((m) => m.SankeyDiagram),
  { ssr: false, loading: () => <LoadingViz /> }
);
const NetworkGraph = dynamic(
  () => import("@/components/viz/NetworkGraph").then((m) => m.NetworkGraph),
  { ssr: false, loading: () => <LoadingViz /> }
);
const WordCloud = dynamic(
  () => import("@/components/viz/WordCloud").then((m) => m.WordCloud),
  { ssr: false, loading: () => <LoadingViz /> }
);
const SentimentDrift = dynamic(
  () => import("@/components/viz/SentimentDrift").then((m) => m.SentimentDrift),
  { ssr: false, loading: () => <LoadingViz /> }
);
const VoteAnomaly = dynamic(
  () => import("@/components/viz/VoteAnomaly").then((m) => m.VoteAnomaly),
  { ssr: false, loading: () => <LoadingViz /> }
);
const InfluenceHeatmap = dynamic(
  () => import("@/components/viz/InfluenceHeatmap").then((m) => m.InfluenceHeatmap),
  { ssr: false, loading: () => <LoadingViz /> }
);
const SwimLaneTimeline = dynamic(
  () => import("@/components/viz/SwimLaneTimeline").then((m) => m.SwimLaneTimeline),
  { ssr: false, loading: () => <LoadingViz /> }
);
const ShiaPivotChart = dynamic(
  () => import("@/components/viz/ShiaPivotChart").then((m) => m.ShiaPivotChart),
  { ssr: false, loading: () => <LoadingViz /> }
);
const CoverageGapMatrix = dynamic(
  () => import("@/components/viz/CoverageGapMatrix").then((m) => m.CoverageGapMatrix),
  { ssr: false, loading: () => <LoadingViz /> }
);

function LoadingViz() {
  return (
    <div className="h-[400px] flex items-center justify-center text-cyan-400 font-mono text-xs animate-pulse">
      RENDERING...
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <main className="relative min-h-screen">
      <AuroraBackground />
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-8 space-y-10">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold glow-text">Psy-Ops Analysis</h1>
          <p className="text-xs text-gray-400 mt-2 font-mono">
            Behavioral forensics, narrative tracking, and influence operation detection
          </p>
        </motion.header>

        {/* VIZ-01: Swimlane Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel-strong p-6"
        >
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
            Annotated Swimlane Timeline
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Multi-lane timeline: IDF actions, Hezbollah actions, UNIFIL incidents, civilian casualties, political events, media divergence, Reddit spikes. Hover for details.
          </p>
          <SwimLaneTimeline />
        </motion.section>

        {/* VIZ-03: Sankey */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel-strong p-6"
        >
          <h2 className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-1">
            IHL Asymmetry — Attacker → Target Flow
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Who attacks whom? Flow width = incident count. Color intensity = casualty weight.
            <span className="text-rose-400 ml-2">Dahiyeh Doctrine</span>: Israeli military strategy of disproportionate force against civilian areas.
          </p>
          <SankeyDiagram />
        </motion.section>

        {/* VIZ-05: Coverage Gap Matrix */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel-strong p-6"
        >
          <h2 className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
            Media Coverage Gap Matrix
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Which atrocities were covered where? Green = prominent coverage. Red = not covered. Rows sorted by casualty count.
          </p>
          <CoverageGapMatrix />
        </motion.section>

        {/* VIZ-06: Network Graph */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel-strong p-6"
        >
          <h2 className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-1">
            User Relationship Network
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Force-directed graph of r/ForbiddenBromance interactions. Node size = activity. Color = flair identity. Border = identity contradiction score.
          </p>
          <NetworkGraph />
        </motion.section>

        {/* VIZ-10: Word Cloud */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel-strong p-6"
        >
          <h2 className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
            Subreddit Lexicon Over Time
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Time-sliced word frequency. Red = dehumanization terms. Orange = Hasbara buzzwords. Green = bridge/empathy terms.
          </p>
          <WordCloud />
        </motion.section>

        {/* VIZ-07: Sentiment Drift */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel-strong p-6"
        >
          <h2 className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
            User Sentiment Drift
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Do sustained downvote campaigns shift user positions? Slope chart tracking top 40 users over time.
          </p>
          <SentimentDrift />
        </motion.section>

        {/* VIZ-08: Vote Anomaly */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel-strong p-6"
        >
          <h2 className="text-xs font-mono text-pink-400 uppercase tracking-widest mb-1">
            Vote Anomaly Detection
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Upvote ratio vs. comment engagement. Points below the threshold line = weaponized downvoting signature.
          </p>
          <VoteAnomaly />
        </motion.section>

        {/* VIZ-12: Influence Heatmap */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel-strong p-6"
        >
          <h2 className="text-xs font-mono text-red-400 uppercase tracking-widest mb-1">
            Influence Operation Fingerprint Matrix
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Behavioral co-occurrence patterns. The bright cluster IS the operation.
          </p>
          <InfluenceHeatmap />
        </motion.section>

        {/* VIZ-13: Shia Pivot */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel-strong p-6 border-l-4 border-l-rose-500"
        >
          <h2 className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-1">
            The 2026 Shia Perception Pivot
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Tracking the documented shift: anti-Shia → pro-Shia framing, correlated with IDF operational failures.
          </p>
          <ShiaPivotChart />
        </motion.section>
      </div>
    </main>
  );
}
