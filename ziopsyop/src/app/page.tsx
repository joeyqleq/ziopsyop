"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Navigation } from "@/components/Navigation";
import { TimelineChart } from "@/components/TimelineChart";
import { KeywordHeatmap } from "@/components/KeywordHeatmap";
import { FlairComposition } from "@/components/FlairComposition";
import { TopActors } from "@/components/TopActors";
import { StatsOverview } from "@/components/StatsOverview";
import { EventCorrelation } from "@/components/EventCorrelation";
import Image from "next/image";

interface AnalysisData {
  overview: {
    posts: number;
    comments: number;
    hebrew_posts: number;
    hebrew_comments: number;
    downloaded_user_histories: number;
  };
  monthly_activity: Array<{
    month: string;
    posts: number;
    comments: number;
    hebrew_posts: number;
    hebrew_comments: number;
  }>;
  keyword_trends: Array<{
    month: string;
    hezbollah: number;
    iran: number;
    peace: number;
    sectarian: number;
    gaza_palestine: number;
    identity: number;
  }>;
  monthly_spikes: Array<{
    month: string;
    posts: number;
    comments: number;
    total: number;
    post_zscore: number;
    comment_zscore: number;
  }>;
  flair_monthly: Array<{
    month: string;
    categories: Record<string, { posts: number; comments: number; total: number }>;
  }>;
  event_timeline: Array<{
    window_month: string;
    event_date: string;
    label: string;
    description: string;
    source_title?: string;
    source_url?: string;
  }>;
  top_authors: Array<{
    author: string;
    flair: string;
    posts: number;
    comments: number;
    total: number;
  }>;
}

export default function Home() {
  const [data, setData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    fetch("/data/analysis.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-cyan-400 font-mono">LOADING INTELLIGENCE...</div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen">
      <AuroraBackground />
      <Navigation />

      {/* Wireframe overlay */}
      <div className="wireframe-bg">
        <Image src="/assets/lines-4.svg" alt="" fill className="object-cover" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-8 space-y-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-12"
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/eye_logo_1.svg"
              alt="ZIOPSYOP"
              width={80}
              height={80}
              className="animate-pulse-glow"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter glow-text">
            ZIOPSYOP
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Data-driven counter-intelligence analysis of coordinated Israeli psychological
            operations targeting Lebanese communities on Reddit
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-xs font-mono text-gray-500">
            <span className="px-2 py-1 rounded border border-gray-700 bg-gray-900/50">r/ForbiddenBromance</span>
            <span className="text-cyan-400">|</span>
            <span>Sept 2019 — Mar 2026</span>
            <span className="text-cyan-400">|</span>
            <span>93,000+ data points</span>
          </div>
        </motion.header>

        {/* Stats Overview */}
        <section>
          <StatsOverview overview={data.overview} />
        </section>

        {/* Executive Brief */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-panel-strong p-6 md:p-8"
        >
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            Intelligence Brief
          </h2>
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">r/ForbiddenBromance</strong> presents itself as a
              platform for Lebanese-Israeli dialogue. Analysis of 93,000+ posts and comments across
              79 months reveals systematic patterns inconsistent with organic community behavior:
            </p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-0.5">&#9656;</span>
                <span>Activity spikes correlate precisely with Israeli military operations, not organic user growth</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-0.5">&#9656;</span>
                <span>Israeli-flaired users consistently outnumber Lebanese users 3:1 despite the sub&apos;s stated purpose</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-0.5">&#9656;</span>
                <span>Keyword analysis shows coordinated topic flooding: &quot;Hezbollah&quot; mentions spike 40x baseline during operations</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-0.5">&#9656;</span>
                <span>The 2026 rhetoric pivot — from anti-Hezbollah to pro-Shia — coincides exactly with IDF drone losses</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 mt-0.5">&#9656;</span>
                <span>Top 20 users account for disproportionate content volume, indicating coordinated amplification</span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Activity Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel-strong p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Activity Timeline
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Posts and comments per month — vertical lines mark real-world military events
              </p>
            </div>
            <div className="flex gap-3 text-[10px]">
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-cyan-400 inline-block" /> Comments
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-pink-500 inline-block" /> Posts
              </span>
            </div>
          </div>
          <TimelineChart data={data.monthly_activity} events={data.event_timeline} />
        </motion.section>

        {/* Two-column: Keywords + Flair */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel-strong p-6"
          >
            <h2 className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-1">
              Narrative Tracking
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Keyword frequency by month — stacked to show topic dominance shifts
            </p>
            <KeywordHeatmap data={data.keyword_trends} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel-strong p-6"
          >
            <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">
              Flair Composition
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Who is actually talking? Percentage breakdown by self-reported identity
            </p>
            <FlairComposition data={data.flair_monthly} />
          </motion.section>
        </div>

        {/* Two-column: Top Actors + Events */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel-strong p-6"
          >
            <h2 className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-1">
              Top Actors
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Highest-volume contributors — note flair distribution and post/comment ratios
            </p>
            <TopActors data={data.top_authors} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel-strong p-6"
          >
            <h2 className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
              Event Correlation
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Real-world events mapped to subreddit activity spikes
            </p>
            <EventCorrelation events={data.event_timeline} />
          </motion.section>
        </div>

        {/* The Smoking Gun Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-panel-strong p-6 md:p-8 border-l-4 border-l-red-500"
        >
          <h2 className="text-xs font-mono text-red-400 uppercase tracking-widest mb-3">
            The 2026 Pivot — Smoking Gun
          </h2>
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              In early 2026, Israel launched a second ground invasion of Lebanon. For the first time,
              Hezbollah deployed fiber-optic FPV kamikaze drones — unjammable, launched from 40km away.
              Daily compilation videos of IDF soldiers and equipment being destroyed went viral globally.
            </p>
            <p className="text-white font-medium">
              Despite this being the most discussed military development worldwide, not a single post
              about FPV drones appeared on r/ForbiddenBromance.
            </p>
            <p>
              Instead, the subreddit&apos;s rhetoric underwent an immediate, coordinated pivot:
              anti-Hezbollah and anti-Shia content — which had been the dominant theme for 5+ years —
              ceased entirely. Posts praising Shia communities appeared for the first time.
            </p>
            <div className="mt-4 p-4 neo-inset text-xs font-mono text-gray-400">
              <p className="text-cyan-400 mb-2">BEHAVIORAL INDICATORS:</p>
              <p>&#8226; Topic blackout on globally-viral FPV drone footage</p>
              <p>&#8226; Instantaneous cessation of anti-Shia rhetoric</p>
              <p>&#8226; Emergence of unprecedented pro-Shia content</p>
              <p>&#8226; Timing correlates precisely with IDF operational failures</p>
              <p className="mt-2 text-rose-400">
                ASSESSMENT: Narrative shift directed by operational command, not organic sentiment change.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="text-center py-12 space-y-4">
          <div className="flex justify-center">
            <Image
              src="/assets/eye_logo_2.png"
              alt="ZIOPSYOP"
              width={40}
              height={40}
              className="opacity-60"
            />
          </div>
          <p className="text-xs text-gray-500 font-mono">
            ZIOPSYOP.me — Counter-Intelligence Sentiment Analysis
          </p>
          <p className="text-[10px] text-gray-600 max-w-lg mx-auto">
            All data sourced from publicly available Reddit archives via Arctic Shift API.
            Analysis covers r/ForbiddenBromance activity from September 2019 through March 2026.
          </p>
        </footer>
      </div>
    </main>
  );
}
