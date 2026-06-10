"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SpaceBackground } from "@/components/fx/SpaceBackground";
import { CinematicTitle } from "@/components/fx/CinematicTitle";
import { DecryptText } from "@/components/fx/DecryptText";

const TICKER_ITEMS = [
  "93,247 DATA POINTS INGESTED",
  "79 MONTHS UNDER OBSERVATION",
  "28 ACTORS TRACKED",
  "1,269 HEBREW-LANGUAGE ARTIFACTS",
  "ACTIVITY SPIKES CORRELATE WITH MILITARY OPERATIONS",
  "FLAIR RATIO 3:1 — INCONSISTENT WITH STATED PURPOSE",
  "2026 NARRATIVE PIVOT DETECTED",
  "FPV DRONE TOPIC BLACKOUT CONFIRMED",
];

/**
 * Hero — locked to exactly one viewport (100svh minus nothing; the nav
 * floats above it). The orbiting-particle field renders only here, and
 * the eye sits dead center of the particle ring.
 */
export function Hero() {
  return (
    <section className="relative h-svh min-h-[560px] flex flex-col overflow-hidden">
      {/* particle field — scoped to hero only */}
      <SpaceBackground />

      {/* center stack */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 text-center">
        {/* the eye, dead center of the orbit ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-7"
        >
          <div
            className="absolute -inset-10 rounded-full animate-pulse-soft"
            style={{
              background:
                "radial-gradient(circle, rgba(62,230,193,0.16), transparent 70%)",
            }}
            aria-hidden="true"
          />
          <Image
            src="/assets/eye_logo_1.svg"
            alt="The ZIOPSYOP eye"
            width={108}
            height={108}
            priority
            className="relative drop-shadow-[0_0_24px_rgba(62,230,193,0.35)]"
          />
        </motion.div>

        <p className="font-mono text-[10px] md:text-[11px] tracking-[0.5em] text-primary mb-4">
          <DecryptText text="//  SIGNAL FROM NOISE" speed={34} delay={300} />
        </p>

        <CinematicTitle
          as="h1"
          text="ZIOPSYOP"
          className="font-mono font-bold text-[clamp(3rem,11vw,7.5rem)] leading-none tracking-[0.06em] text-foreground"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-5 max-w-2xl text-sm md:text-base text-muted leading-relaxed text-balance"
        >
          A forensic dissection of a coordinated influence operation targeting
          Lebanese communities on Reddit. Every chart below is one piece of a
          larger puzzle — together they show a conversation that{" "}
          <span className="text-foreground">was never organic</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.18em] text-muted-2"
        >
          <span className="px-2.5 py-1 border border-borderc rounded bg-black/40">
            r/ForbiddenBromance
          </span>
          <span className="text-primary/60">/</span>
          <span>SEPT 2019 — MAR 2026</span>
          <span className="text-primary/60">/</span>
          <span>CASE STATUS: <span className="text-threat glow-threat">ACTIVE</span></span>
        </motion.div>
      </div>

      {/* evidence ticker — pinned to hero bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
        className="relative border-t border-b border-borderc bg-black/45 backdrop-blur-sm overflow-hidden"
      >
        <div className="ticker-track flex w-max items-center py-2.5">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
              {TICKER_ITEMS.map((item, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center font-mono text-[10px] tracking-[0.22em] text-muted whitespace-nowrap"
                >
                  <span className="mx-5 text-primary">▮</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1 }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] text-muted-2">
          BEGIN REVIEW
        </span>
        <motion.span
          animate={{ y: [0, 5, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-primary text-xs"
        >
          ▼
        </motion.span>
      </motion.div>
    </section>
  );
}
