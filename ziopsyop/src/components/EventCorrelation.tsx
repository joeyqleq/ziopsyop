"use client";

import { motion } from "framer-motion";

interface Event {
  window_month: string;
  event_date: string;
  label: string;
  description: string;
  source_title?: string;
}

interface Props {
  events: Event[];
}

export function EventCorrelation({ events }: Props) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-magenta-500/50 to-transparent" />
      <div className="space-y-4 pl-10 max-h-[500px] overflow-y-auto pr-2">
        {events.map((evt, i) => (
          <motion.div
            key={evt.event_date}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative"
          >
            <div className="absolute -left-[26px] top-2 w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#050510] shadow-[0_0_8px_rgba(0,245,255,0.5)]" />
            <div className="glass-panel p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">
                  {evt.event_date}
                </span>
                <span className="text-[10px] text-gray-500">{evt.window_month}</span>
              </div>
              <p className="text-sm font-semibold">{evt.label}</p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{evt.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
