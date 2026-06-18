"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/Hero";
import { StatsOverview } from "@/components/StatsOverview";
import { TimelineChart } from "@/components/TimelineChart";
import { AnomalyDetector } from "@/components/AnomalyDetector";
import { KeywordHeatmap } from "@/components/KeywordHeatmap";
import { FlairComposition } from "@/components/FlairComposition";
import { TopActors } from "@/components/TopActors";
import { EventCorrelation } from "@/components/EventCorrelation";
import { ChartFrame } from "@/components/fx/ChartFrame";
import { TracedCard } from "@/components/fx/TracedCard";
import { DecryptText } from "@/components/fx/DecryptText";
import { PixelReveal } from "@/components/fx/PixelReveal";

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
    flair?: string;
    posts: number;
    comments: number;
    total: number;
  }>;
}

/** Section label — the narrative spine connecting exhibits into one case. */
function CaseStep({
  step,
  title,
  lede,
}: {
  step: string;
  title: string;
  lede: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="flex items-start gap-4 pt-10 pb-2"
    >
      <span className="font-mono text-[clamp(1.6rem,4vw,2.4rem)] leading-none font-bold text-primary/20 select-none">
        {step}
      </span>
      <div className="pt-0.5">
        <DecryptText
          text={title}
          as="h2"
          startOnView
          speed={20}
          className="font-mono text-base md:text-lg font-bold tracking-[0.12em] text-foreground uppercase"
        />
        <p className="mt-1.5 text-sm text-muted leading-relaxed max-w-3xl text-pretty">
          {lede}
        </p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [data, setData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    fetch("/data/analysis.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  return (
    <PageShell backdrop="warp">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
        {!data ? (
          <div className="py-32 flex items-center justify-center">
            <p className="font-mono text-xs tracking-[0.3em] text-primary caret">
              DECRYPTING DATASET
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* ledger */}
            <section aria-label="Dataset overview" className="pt-10">
              <StatsOverview overview={data.overview} />
            </section>

            {/* intelligence brief */}
            <PixelReveal>
              <TracedCard traceColor="var(--archive)" className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="stamp text-archive">CASE FILE</span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-muted-2">
                    ZIO-PSYOP / r/ForbiddenBromance
                  </span>
                </div>
                <div className="space-y-4 text-sm text-muted leading-relaxed">
                  <p>
                    <strong className="text-foreground">r/ForbiddenBromance</strong>{" "}
                    presents itself as a grassroots bridge for Lebanese-Israeli
                    dialogue. We treated that claim as a testable hypothesis and
                    ingested every post and comment the community ever produced —
                    93,000+ artifacts across 79 months. An organic community
                    leaves an organic fingerprint: noisy, seasonal, demographically
                    plausible. This one does not.
                  </p>
                  <p className="text-foreground font-medium">
                    The case below is built from five falsifiable claims. Each
                    exhibit tests one of them. Read them in order — every chart is
                    one piece of the same puzzle.
                  </p>
                  <ol className="grid gap-2 md:grid-cols-2 font-mono text-xs">
                    {[
                      "H1 — Activity is driven by military events, not community growth",
                      "H2 — Volume spikes are statistically anomalous, not seasonal",
                      "H3 — The narrative agenda is set top-down, not by users",
                      "H4 — The 'Lebanese dialogue' community is not Lebanese",
                      "H5 — A small cadre of actors produces the bulk of content",
                    ].map((h) => (
                      <li
                        key={h}
                        className="flex gap-2 rounded-md border border-borderc bg-black/25 px-3 py-2"
                      >
                        <span className="text-primary shrink-0">▸</span>
                        <span className="text-muted">{h}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </TracedCard>
            </PixelReveal>

            {/* H1 */}
            <CaseStep
              step="01"
              title="The pulse follows the war, not the people"
              lede="If this community were organic, its activity would track user growth and slow news cycles. Instead, every major surge lines up with an Israeli military operation. The conversation breathes with the battlefield."
            />
            <ChartFrame
              exhibit="EX-01"
              title="ACTIVITY TIMELINE — 79 MONTHS UNDER OBSERVATION"
              subtitle="Posts and comments per month. Dashed red verticals mark real-world military events. Toggle to Hebrew-only traffic to see who the surge actually is."
              accent="var(--primary)"
              commentary={{
                reads:
                  "Monthly volume of posts and comments from Sept 2019 to Mar 2026, with military events overlaid. The Hebrew-only view isolates artifacts written in Hebrew script.",
                means:
                  "Volume is flat for years, then erupts in lockstep with October 2023 and the 2024 Lebanon escalation. Organic communities grow in curves; this one moves in steps that match an operations calendar. Hebrew-language traffic surges at exactly the same moments — the 'Lebanese dialogue space' speaks Hebrew when it matters.",
                puzzle:
                  "This is hypothesis H1 and the foundation of the case: the community's heartbeat is external. Every exhibit that follows asks who is pumping the blood.",
              }}
            >
              <TimelineChart
                data={data.monthly_activity}
                events={data.event_timeline}
              />
            </ChartFrame>

            {/* H2 */}
            <CaseStep
              step="02"
              title="The spikes are statistically impossible"
              lede="Eyeballing a chart can deceive. Z-scores cannot. We measured how far each month deviates from the community's own baseline — anything beyond +1.5σ is an anomaly demanding explanation."
            />
            <ChartFrame
              exhibit="EX-02"
              title="ANOMALY DETECTOR — DEVIATION FROM BASELINE"
              subtitle="Each bar is one month's z-score against the full 79-month baseline. Red bars breach the +1.5σ anomaly threshold."
              accent="var(--threat)"
              classification="STATISTICAL"
              commentary={{
                reads:
                  "Standard-score deviation of monthly activity. A z-score of +2 means that month was two standard deviations busier than this community's normal life.",
                means:
                  "The anomalous months are not randomly distributed — they cluster precisely around military operations. Random user enthusiasm produces scattered noise; coordinated mobilization produces exactly this clustered signature.",
                puzzle:
                  "H2 confirmed: the surges in EX-01 aren't just visually striking, they're mathematically aberrant. Something external switches this community on and off.",
              }}
            >
              <AnomalyDetector data={data.monthly_spikes} />
            </ChartFrame>

            {/* H3 */}
            <CaseStep
              step="03"
              title="Someone sets the agenda"
              lede="What a community talks about — and when it stops talking about it — reveals who is steering. Track six narrative threads across the full archive and watch topics get switched on like floodlights."
            />
            <ChartFrame
              exhibit="EX-03"
              title="NARRATIVE TRACKING — KEYWORD FREQUENCY BY MONTH"
              subtitle="Stacked frequency of six topic clusters. Switch to % Share to see narrative dominance independent of raw volume."
              accent="var(--viz-violet)"
              commentary={{
                reads:
                  "Monthly mention counts for Hezbollah, Iran, sectarian framing, Gaza/Palestine, peace messaging and identity talk — stacked to show the shape of the conversation.",
                means:
                  "'Hezbollah' mentions explode to ~40x baseline during operations, then vanish. 'Peace' language surges in windows when softening Lebanese sentiment is strategically useful. Organic discourse drifts; managed discourse snaps between talking points.",
                puzzle:
                  "H3: the agenda moves first, the 'community' follows. Combined with EX-01's timing evidence, the conversation looks scripted around an information-operations calendar.",
              }}
            >
              <KeywordHeatmap data={data.keyword_trends} />
            </ChartFrame>

            {/* H4 + H5 side pair */}
            <CaseStep
              step="04"
              title="Who is actually in the room?"
              lede="A Lebanese-Israeli dialogue space should be roughly balanced. Self-reported flairs and per-actor output tell a different story: the room is Israeli-majority and a small cadre does most of the talking."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartFrame
                exhibit="EX-04"
                title="FLAIR COMPOSITION — WHO SPEAKS"
                subtitle="Share of monthly activity by self-reported identity flair."
                accent="var(--viz-blue)"
                commentary={{
                  reads:
                    "Monthly percentage of activity from Israeli, Jewish/Diaspora, Lebanese and unflaired accounts.",
                  means:
                    "Israeli-flaired users outnumber Lebanese roughly 3:1 across the entire archive — in a subreddit ostensibly built for Lebanese voices. The Lebanese share never reaches parity, even at peak 'dialogue' periods.",
                  puzzle:
                    "H4: the audience is the cover story; the operators are the population. A dialogue space where one side is permanently outnumbered 3:1 is a stage, not a bridge.",
                }}
              >
                <FlairComposition data={data.flair_monthly} />
              </ChartFrame>

              <ChartFrame
                exhibit="EX-05"
                title="TOP ACTORS — CONCENTRATION OF VOICE"
                subtitle="The 20 highest-volume accounts. Sort by posts vs comments to see role specialization."
                accent="var(--archive)"
                commentary={{
                  reads:
                    "Ranked output of the most active accounts with their flair and post/comment split.",
                  means:
                    "A handful of accounts generates a wildly disproportionate share of all content. Several show role separation — some seed posts, others flood comments — a hallmark of coordinated amplification cells rather than hobbyist users.",
                  puzzle:
                    "H5: you don't need thousands of operators to simulate a community. You need twenty disciplined ones. These are them.",
                }}
              >
                <TopActors data={data.top_authors} />
              </ChartFrame>
            </div>

            {/* event ledger */}
            <CaseStep
              step="05"
              title="The correlation ledger"
              lede="Every anomalous window from EX-02, matched to the real-world event that opened it. This is the case's chain of custody — each entry links a statistical spike to a documented operation."
            />
            <ChartFrame
              exhibit="EX-06"
              title="EVENT CORRELATION — SPIKE-TO-OPERATION LEDGER"
              subtitle="Thirteen documented real-world events mapped to the activity windows they triggered."
              accent="var(--threat)"
              classification="CORROBORATED"
              commentary={{
                reads:
                  "A chronological ledger pairing each military or political event with the subreddit activity window that immediately followed it.",
                means:
                  "Thirteen for thirteen. Every significant activity window has a corresponding kinetic or political trigger. The probability of that mapping arising from organic interest alone is negligible.",
                puzzle:
                  "This ledger stitches EX-01 through EX-05 into a single chain: events trigger anomalous volume, produced by a concentrated Israeli-majority cadre, pushing a centrally-set narrative.",
              }}
            >
              <EventCorrelation events={data.event_timeline} />
            </ChartFrame>

            {/* smoking gun */}
            <CaseStep
              step="06"
              title="The smoking gun: the 2026 pivot"
              lede="The strongest evidence of central direction isn't what the community said — it's what it suddenly, perfectly, stopped saying."
            />
            <PixelReveal>
              <TracedCard
                traceColor="var(--threat)"
                className="p-6 md:p-8 border-l-2 border-l-threat"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="stamp text-threat">PRIORITY FINDING</span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-muted-2">
                    EX-07 / BEHAVIORAL
                  </span>
                </div>
                <div className="space-y-4 text-sm text-muted leading-relaxed">
                  <p>
                    In early 2026, Israel launched a second ground invasion of
                    Lebanon. For the first time, Hezbollah deployed fiber-optic
                    FPV kamikaze drones — unjammable, launched from 40km away.
                    Daily compilation videos of IDF losses went viral worldwide.
                  </p>
                  <p className="text-foreground font-medium">
                    Despite being the most-discussed military development on
                    Earth, not a single post about FPV drones appeared on
                    r/ForbiddenBromance.
                  </p>
                  <p>
                    Instead the subreddit pivoted overnight: anti-Hezbollah and
                    anti-Shia content — the dominant theme for over five years —
                    ceased entirely. Posts praising Shia communities appeared for
                    the first time in the archive.
                  </p>
                  <div className="mt-2 rounded-md border border-borderc bg-black/40 p-4 font-mono text-xs leading-relaxed">
                    <p className="text-primary tracking-[0.2em] mb-3">
                      BEHAVIORAL INDICATORS:
                    </p>
                    <div className="space-y-1.5 text-muted">
                      <p>▸ Topic blackout on globally-viral FPV drone footage</p>
                      <p>▸ Instantaneous cessation of 5+ years of anti-Shia rhetoric</p>
                      <p>▸ Emergence of unprecedented pro-Shia content</p>
                      <p>▸ Timing correlates precisely with IDF operational failures</p>
                    </div>
                    <p className="mt-4 text-threat">
                      ASSESSMENT: Narrative shift directed by operational command,
                      not organic sentiment change.
                    </p>
                  </div>
                  <p className="text-xs text-muted-2">
                    Full pivot analysis, sentiment drift and network forensics
                    continue on the{" "}
                    <a
                      href="/analysis"
                      className="text-primary hover:glow-primary transition-all"
                    >
                      Psy-Ops Analysis
                    </a>{" "}
                    page. The reality the pivot was built to bury — the war&apos;s
                    real conduct, cost and outcome — is documented in{" "}
                    <a
                      href="/battlefield"
                      className="text-accent-yellow hover:glow-primary transition-all"
                    >
                      Battlefield Forensics
                    </a>
                    ; kinetic context lives on the{" "}
                    <a
                      href="/map"
                      className="text-primary hover:glow-primary transition-all"
                    >
                      Attack Map
                    </a>
                    .
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href="/battlefield"
                      className="group inline-flex items-center gap-2 rounded-md border border-accent-yellow/40 bg-accent-yellow/5 px-4 py-2.5 font-mono text-[11px] tracking-[0.2em] text-accent-yellow transition-all hover:bg-accent-yellow/10"
                    >
                      ENTER PART II — BATTLEFIELD FORENSICS
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
              </TracedCard>
            </PixelReveal>
          </div>
        )}
      </div>
    </PageShell>
  );
}
