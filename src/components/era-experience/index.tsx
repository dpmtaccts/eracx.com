"use client";

import SignalHero from "./signal-hero";
import ProblemStats from "./problem-stats";
import LoopHorizontal from "./loop-horizontal";
import ModelShift from "./model-shift";

export default function EraExperience() {
  return (
    <div className="relative">
      <SignalHero />
      <ProblemStats />
      <LoopHorizontal />
      <ModelShift />
    </div>
  );
}

export { SignalHero, ProblemStats, LoopHorizontal, ModelShift };
