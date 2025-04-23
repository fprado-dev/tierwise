'use client';

import { TierList } from './TierList';

export default function AICostCalculator() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">AI Cost Calculator</h1>
          <p className="text-muted-foreground">
            Calculate costs for different AI service tiers including text, image, and video processing.
          </p>
        </div>
        <TierList />
      </div>
    </div>
  );
}