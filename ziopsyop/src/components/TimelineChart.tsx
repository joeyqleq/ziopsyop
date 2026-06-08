"use client";

import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface TimelineData {
  month: string;
  posts: number;
  comments: number;
  hebrew_posts: number;
  hebrew_comments: number;
}

interface Event {
  window_month: string;
  event_date: string;
  label: string;
  description: string;
}

interface Props {
  data: TimelineData[];
  events: Event[];
}

export function TimelineChart({ data, events }: Props) {
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);

  const chartData = useMemo(
    () =>
      data.map((d) => ({
        ...d,
        total: d.posts + d.comments,
        label: d.month.slice(2),
      })),
    [data]
  );

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f5ff" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#00f5ff" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradPosts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff00aa" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#ff00aa" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            tick={{ fill: "#666", fontSize: 10 }}
            interval={5}
            axisLine={{ stroke: "#222" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#666", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={45}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(10,10,30,0.95)",
              border: "1px solid rgba(0,245,255,0.3)",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: "#00f5ff" }}
          />
          {events.map((evt) => (
            <ReferenceLine
              key={evt.event_date}
              x={evt.window_month.slice(2)}
              stroke="rgba(255,0,170,0.4)"
              strokeDasharray="3 3"
              onMouseEnter={() => setHoveredEvent(evt)}
              onMouseLeave={() => setHoveredEvent(null)}
            />
          ))}
          <Area
            type="monotone"
            dataKey="comments"
            stroke="#00f5ff"
            strokeWidth={1.5}
            fill="url(#gradTotal)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="posts"
            stroke="#ff00aa"
            strokeWidth={1.5}
            fill="url(#gradPosts)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      {hoveredEvent && (
        <div className="absolute top-4 right-4 glass-panel p-3 max-w-xs z-10">
          <p className="text-xs text-cyan-400 font-mono">{hoveredEvent.event_date}</p>
          <p className="text-sm font-semibold mt-1">{hoveredEvent.label}</p>
          <p className="text-xs text-gray-400 mt-1">{hoveredEvent.description}</p>
        </div>
      )}
    </div>
  );
}
