"use client";

import { CinematicTitle } from "@/components/fx/CinematicTitle";
import { DecryptText } from "@/components/fx/DecryptText";

export function BattlefieldHeader() {
  return (
    <header className="text-center pb-6">
      <p className="font-mono text-[10px] tracking-[0.5em] text-primary mb-3">
        <DecryptText text="//  SECTION 03 — BATTLEFIELD FORENSICS" speed={28} />
      </p>
      <CinematicTitle
        as="h1"
        text="THE GROUND TRUTH"
        className="font-mono font-bold text-[clamp(1.8rem,6vw,3.4rem)] leading-none tracking-[0.08em] text-foreground"
      />
      <p className="mt-4 max-w-2xl mx-auto text-sm text-muted leading-relaxed text-balance">
        Part 1 proved a narrative was manufactured. This section documents what it
        was built to bury: the real conduct, cost and outcome of the 2024–2026
        IDF&ndash;Hezbollah war &mdash; every figure pulled live from the case
        database, every exhibit sourced.
      </p>
    </header>
  );
}
