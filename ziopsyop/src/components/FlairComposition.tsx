"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface FlairMonth {
  month: string;
  categories: Record<string, { posts: number; comments: number; total: number }>;
}

interface Props {
  data: FlairMonth[];
}

const FLAIR_COLORS: Record<string, string> = {
  Israeli: "#0066ff",
  Lebanese: "#00cc44",
  "Jewish/Diaspora": "#6644ff",
  "Unflaired/Other": "#555555",
  "Other Arab": "#ffaa00",
  Palestinian: "#cc0000",
  Iranian: "#ff6600",
};

export function FlairComposition({ data }: Props) {
  const chartData = useMemo(() => {
    return data.map((d) => {
      const row: Record<string, string | number> = { month: d.month.slice(2) };
      const total = Object.values(d.categories).reduce((s, c) => s + c.total, 0) || 1;
      Object.entries(FLAIR_COLORS).forEach(([cat]) => {
        const val = d.categories[cat]?.total || 0;
        row[cat] = Math.round((val / total) * 100);
      });
      return row;
    });
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <XAxis
          dataKey="month"
          tick={{ fill: "#666", fontSize: 9 }}
          interval={7}
          axisLine={{ stroke: "#222" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#666", fontSize: 9 }}
          axisLine={false}
          tickLine={false}
          width={35}
          domain={[0, 100]}
          unit="%"
        />
        <Tooltip
          contentStyle={{
            background: "rgba(10,10,30,0.95)",
            border: "1px solid rgba(0,102,255,0.3)",
            borderRadius: 8,
            fontSize: 11,
          }}
formatter={(value) => `${Number(value ?? 0)}%`}
        />
        <Legend
          wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
          iconType="circle"
          iconSize={8}
        />
        {Object.entries(FLAIR_COLORS).map(([cat, color]) => (
          <Area
            key={cat}
            type="monotone"
            dataKey={cat}
            stroke={color}
            strokeWidth={0}
            fill={color}
            fillOpacity={0.7}
            stackId="1"
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
