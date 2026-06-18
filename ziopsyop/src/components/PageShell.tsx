"use client";

import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { ShaderBackdrop } from "@/components/fx/ShaderBackdrop";
import { AsciiEye } from "@/components/fx/AsciiEye";
import { GlitchWordmark } from "@/components/fx/GlitchWordmark";

/**
 * Uniform page chrome: living nav, brand shader backdrop, dossier footer.
 * New pages/sections plug straight in — keeping proportions, padding and
 * sequencing identical site-wide, on every screen size.
 *
 * backdrop: "warp" | "waves" | "none" — alternate between pages so the two
 * shaders are evenly distributed across the site.
 */
export function PageShell({
  children,
  backdrop = "warp",
}: {
  children: React.ReactNode;
  backdrop?: "warp" | "waves" | "none";
}) {
  return (
    <main className="relative min-h-screen">
      {backdrop !== "none" && (
        <ShaderBackdrop variant={backdrop} className="fixed inset-0" opacity={0.55} />
      )}
      <Navigation />
      <div className="relative z-10">{children}</div>
      <SiteFooter />
    </main>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-borderc mt-4">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex flex-col items-center gap-6 text-center">
        <AsciiEye />
        <div className="space-y-2">
          <p className="flex items-center justify-center font-mono text-[11px] tracking-[0.3em] text-foreground">
            <GlitchWordmark className="text-[11px] tracking-[0.3em]" />
            <span className="text-primary">.ME</span>
          </p>
          <p className="font-mono text-[10px] tracking-[0.15em] text-muted-2">
            SIGNAL FROM NOISE — INFLUENCE OPERATION FORENSICS
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
          {[
            { href: "/", label: "DASHBOARD" },
            { href: "/analysis", label: "ANALYSIS" },
            { href: "/battlefield", label: "BATTLEFIELD" },
            { href: "/map", label: "ATTACK MAP" },
            { href: "/about", label: "DOSSIER" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[10px] tracking-[0.2em] text-muted hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="max-w-xl text-[11px] leading-relaxed text-muted-2 text-pretty">
          All data sourced from publicly available Reddit archives via the Arctic
          Shift API. Analysis covers r/ForbiddenBromance from September 2019
          through March 2026. Methodology, raw data and source code are open —
          verify everything yourself.
        </p>
        <p className="font-mono text-[9px] tracking-[0.2em] text-muted-2/60">
          [ DATASET LIVE — PIPELINES UPDATE DAILY ]
        </p>
      </div>
    </footer>
  );
}
