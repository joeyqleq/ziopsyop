import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { BattlefieldHeader } from "@/components/battlefield/BattlefieldHeader";
import { BattlefieldSections } from "@/components/battlefield/BattlefieldSections";
import {
  getTargetingDisparity,
  getCostAsymmetry,
  getHardwareAttrition,
  getIHLMatrix,
  getWeaponInnovation,
  getObjectivesScorecard,
  getQuoteWall,
  getStrikeTaxonomy,
} from "@/lib/battlefield";

export const metadata: Metadata = {
  title: "Battlefield Forensics — The Ground Truth | ZIOPSYOP",
  description:
    "The documented conduct, cost and outcome of the 2024–2026 IDF–Hezbollah war: targeting disparity, IHL compliance, cost asymmetry, hardware attrition and strategic failure — every figure sourced.",
};

// data is read server-side with the service-role key; never shipped as creds
export const revalidate = 3600;

export default async function BattlefieldPage() {
  const [targeting, cost, hardware, ihl, weapons, objectives, quotes, taxonomy] =
    await Promise.all([
      getTargetingDisparity(),
      getCostAsymmetry(),
      getHardwareAttrition(),
      getIHLMatrix(),
      getWeaponInnovation(),
      getObjectivesScorecard(),
      getQuoteWall(),
      getStrikeTaxonomy(),
    ]);

  return (
    <PageShell backdrop="warp">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 pb-10">
        <BattlefieldHeader />
        <BattlefieldSections
          data={{ targeting, cost, hardware, ihl, weapons, objectives, quotes, taxonomy }}
        />
      </div>
    </PageShell>
  );
}
