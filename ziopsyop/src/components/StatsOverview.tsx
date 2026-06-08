"use client";

import { motion } from "framer-motion";

interface Props {
  overview: {
    posts: number;
    comments: number;
    hebrew_posts: number;
    hebrew_comments: number;
    downloaded_user_histories: number;
  };
}

export function StatsOverview({ overview }: Props) {
  const stats = [
    { label: "Total Posts", value: overview.posts.toLocaleString(), color: "text-cyan-400" },
    { label: "Total Comments", value: overview.comments.toLocaleString(), color: "text-violet-400" },
    { label: "Hebrew Content", value: (overview.hebrew_posts + overview.hebrew_comments).toLocaleString(), color: "text-amber-400" },
    { label: "Tracked Actors", value: overview.downloaded_user_histories.toString(), color: "text-rose-400" },
    { label: "Months Analyzed", value: "79", color: "text-emerald-400" },
    { label: "Data Points", value: "93K+", color: "text-pink-400" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-panel p-4 text-center"
        >
          <p className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
