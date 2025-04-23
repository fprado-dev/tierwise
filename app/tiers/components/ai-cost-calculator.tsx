'use client';

import { useEffect, useState } from 'react';
import { useTiers } from "../../../hooks/useTiers";
import { TierCreationSheet } from "./tier-creation-sheet";
import { TierCard } from "./TierCard";

export default function AICostCalculator() {
  const { addTier, tiers, isLoading } = useTiers();
  const [activeTab, setActiveTab] = useState(tiers[0]?.id);

  useEffect(() => {
    if (tiers.length > 0 && !activeTab) {
      setActiveTab(tiers[0].id);
    }
  }, [tiers, activeTab]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="w-full">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 items-center" aria-label="Tiers">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse h-8 w-24 bg-gray-200 rounded"
                />
              ))}
              <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full" />
            </nav>
          </div>
          <div className="mt-4">
            <div className="animate-pulse space-y-4">
              <div className="h-48 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-2">
      <div className="w-full">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 items-center" aria-label="Tiers">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setActiveTab(tier.id)}
                className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${tier.id === activeTab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
              >
                {tier.name}
              </button>
            ))}
            <TierCreationSheet onAddTier={addTier} tiers={tiers} />
          </nav>
        </div>
        <div >
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`${tier.id === activeTab ? 'block' : 'hidden'}`}
            >
              <TierCard tier={tier} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}





