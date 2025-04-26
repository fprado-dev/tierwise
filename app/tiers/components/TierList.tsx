'use client';

import { useTiers } from '../../../hooks/useTiers';
import { TierCreationSheet } from './tier-creation-sheet';
import { TierCard } from './TierCard';

export function TierList() {
  const { tiers, addTier } = useTiers();

  return (
    <div className="flex flex-col gap-6 bg-primary-foreground">
      <div className="flex justify-end p-4">
        <TierCreationSheet onAddTier={addTier} tiers={tiers} />
      </div>

      <div className="w-full bg-primary-foreground">
        <div className="grid grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>
    </div>
  );
}