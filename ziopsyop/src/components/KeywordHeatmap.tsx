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

interface KeywordData {
  month: string;
  hezbollah: number;
  iran: number;
  peace: number;
  sectarian: number;
  gaza_palestine: number;
  identity: number;
}

interface Props {
  data: KeywordData[];
}

const KEYWORD_COLORS: Record<string, string> = {
  hezbollah: "#ff3333",
  iran: "#ff8800",
  peace: "#00cc88",
  sectarian: "#ff00aa",
  gaza_palestine: "#ffcc00",
  identity: "#8b5cf6",
};

export function KeywordHeatmap({ data }: Props) {
  const chartData = useMemo(
    () => data.map((d) => ({ ...d, label: d.month.slice(2) })),
    [data]
  );

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          {Object.entries(KEYWORD_COLORS).map(([key, color]) => (
            <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        <XAxis
          dataKey="label"
          tick={{ fill: "#666", fontSize: 9 }}
          interval={7}
          axisLine={{ stroke: "#222" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#666", fontSize: 9 }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(10,10,30,0.95)",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: 8,
            fontSize: 11,
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
          iconType="circle"
          iconSize={8}
        />
        {Object.entries(KEYWORD_COLORS).map(([key, color]) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={color}
            strokeWidth={1.2}
            fill={`url(#grad-${key})`}
            dot={false}
            stackId="1"
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
