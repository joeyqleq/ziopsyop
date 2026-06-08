"use client";

import { motion } from "framer-motion";

interface Author {
  author: string;
  flair: string;
  posts: number;
  comments: number;
  total: number;
}

interface Props {
  data: Author[];
}

const FLAIR_BADGE: Record<string, string> = {
  Israeli: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Lebanese: "bg-green-500/20 text-green-300 border-green-500/30",
  "Diaspora Jew": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Diaspora Lebanese": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Diaspora Israeli": "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

function getFlairStyle(flair: string | undefined) {
  if (!flair) return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  for (const [key, cls] of Object.entries(FLAIR_BADGE)) {
    if (flair.toLowerCase().includes(key.toLowerCase())) return cls;
  }
  return "bg-gray-500/20 text-gray-300 border-gray-500/30";
}

export function TopActors({ data }: Props) {
  const maxTotal = data[0]?.total || 1;

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
      {data.slice(0, 20).map((author, i) => (
        <motion.div
          key={author.author}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.03 }}
          className="flex items-center gap-3 p-2 rounded-lg neo-inset"
        >
          <span className="text-xs font-mono text-gray-500 w-5">{i + 1}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium truncate">u/{author.author}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded border ${getFlairStyle(author.flair)}`}
              >
                {author.flair || "Unknown"}
              </span>
            </div>
            <div className="mt-1 h-1.5 bg-black/30 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                style={{ width: `${(author.total / maxTotal) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-cyan-400">{author.total.toLocaleString()}</span>
            <span className="text-[10px] text-gray-500 block">
              {author.posts}p / {author.comments}c
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
