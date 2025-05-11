'use client';

import { ProcessedTier } from '@/lib/tier.types';
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { GripIcon, Layers3 } from 'lucide-react'; // Modified: Removed BarChartIcon, LightbulbIcon
import { useEffect, useState } from 'react';
import { useTiers } from "../../../hooks/useTiers";
import { TierCreationSheet } from "./tier-creation-sheet";
import { TierCard } from "./TierCard";

function DraggableTierButton({ tier, isActive, onClick }: { tier: ProcessedTier, isActive: boolean, onClick: () => void; }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: tier.id });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transition,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center group"
    >
      <div className="cursor-move p-2 opacity-50 group-hover:opacity-100 transition-opacity" {...listeners}>
        <GripIcon className='w-4 h-4 text-gray-400 group-hover:text-gray-600' />
      </div>
      <button
        onClick={onClick}
        className={`whitespace-nowrap border-b-2 py-3 px-3 text-sm font-medium rounded-t-md transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${isActive
          ? 'border-indigo-600 text-indigo-700 bg-indigo-50 shadow-sm'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50'
          }`}
      >
        {tier.name}
      </button>
    </div>
  );
}

export default function AICostCalculator() {
  const { addTier, tiers: initialTiers, isLoading } = useTiers();
  const [tiers, setTiers] = useState(initialTiers);
  const [activeTab, setActiveTab] = useState(initialTiers[0]?.id);

  // New state and logic for Revenue Simulator
  const [projectedUsers, setProjectedUsers] = useState<{ [tierId: string]: string; }>({});
  const [revenueDetails, setRevenueDetails] = useState<{ [tierId: string]: { name: string, projectedRevenue: number; }; }>({});
  const [totalProjectedRevenue, setTotalProjectedRevenue] = useState<number>(0);



  useEffect(() => {
    let calculatedTotalRevenue = 0;
    const calculatedNewRevenueDetails: { [tierId: string]: { name: string, projectedRevenue: number; }; } = {};

    initialTiers.forEach(tier => {
      const users = parseInt(projectedUsers[tier.id] || '0', 10);
      // IMPORTANT: Assuming tier.price exists and is a number representing monthly price.
      // This might need adjustment based on the actual structure of ProcessedTier (e.g., tier.calculatedPricing.monthly).
      // Using (tier as any).price for flexibility if 'price' is not strictly on ProcessedTier type.
      const price = (tier as any).price && typeof (tier as any).price === 'number' ? (tier as any).price : 0;
      const tierRevenue = users * price;
      calculatedNewRevenueDetails[tier.id] = { name: tier.name, projectedRevenue: tierRevenue };
      calculatedTotalRevenue += tierRevenue;
    });

    // Only update state if the calculated values have actually changed
    if (JSON.stringify(calculatedNewRevenueDetails) !== JSON.stringify(revenueDetails)) {
      setRevenueDetails(calculatedNewRevenueDetails);
    }
    if (calculatedTotalRevenue !== totalProjectedRevenue) {
      setTotalProjectedRevenue(calculatedTotalRevenue);
    }
  }, [projectedUsers, initialTiers]);

  useEffect(() => {
    if (JSON.stringify(tiers) !== JSON.stringify(initialTiers)) {
      setTiers(initialTiers);
    }
  }, [initialTiers]); // REMOVED tiers from dependency array

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTiers((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    if (tiers.length > 0) {
      const currentTabIsValid = tiers.some(t => t.id === activeTab);
      // If there's no activeTab, or the current activeTab is no longer valid
      if (!activeTab || !currentTabIsValid) {
        setActiveTab(tiers[0].id); // Set to the first available tier
      }
    } else {
      // If there are no tiers, ensure activeTab is cleared
      if (activeTab !== undefined) { // Only set if it's not already undefined
        setActiveTab("");
      }
    }
  }, [tiers]); // Only depend on tiers

  if (isLoading) {
    return (
      <Skeleton />
    );
  }

  if (tiers.length === 0) {
    return (
      <div className="p-4 h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="rounded-full bg-primary/10 p-6">
            <Layers3 className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">No Tiers Created</h2>
          <p className="text-muted-foreground">
            Get started by creating your first tier. Add AI models and configure pricing to see your cost breakdown.
          </p>
          <TierCreationSheet onAddTier={addTier} tiers={tiers} />
        </div>
      </div>

    );
  }

  return (
    <div className="flex flex-col gap-6 px-4  mt-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tier Builder</h1>
          <p className="text-muted-foreground">Create and manage your AI service tiers and pricing</p>
        </div>
      </div>
      <div className="w-full min-h-screen">
        <div className="border-b border-gray-200">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <nav className="-mb-px flex space-x-2 items-center border-b border-gray-200 pb-px" aria-label="Tiers">
              <SortableContext items={tiers.map(t => t.id)}>
                <div className="flex flex-grow space-x-2 overflow-x-auto scrollbar-hide">
                  {tiers.map((tier) => (
                    <DraggableTierButton
                      key={tier.id}
                      tier={tier}
                      isActive={tier.id === activeTab}
                      onClick={() => setActiveTab(tier.id)}
                    />
                  ))}
                </div>
              </SortableContext>
              <div className="ml-auto pl-4">
                <TierCreationSheet onAddTier={addTier} tiers={tiers} />
              </div>
            </nav>
          </DndContext>
        </div>
        <div>
          {tiers.map((tier) => ( // Changed from initialTiers to tiers
            <div
              key={tier.id}
              className={`${tier.id === activeTab ? 'block' : 'hidden'}`}
            >
              <TierCard tier={tier} />
            </div>
          ))}
        </div>
      </div> {/* This closes w-full min-h-screen */}
      {/* Revenue Simulator Section Removed */}
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-col gap-6 px-6 bg-primary-foreground animate-pulse py-4">
    <div className="w-full min-h-screen">
      {/* Navigation Skeleton */}
      <div className='px-4'>
        <nav className="flex space-x-8 items-center" aria-label="Tiers">
          {/* Skeleton tabs - 4 placeholders */}
          {[1].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-md"></div>
          ))}
          {/* Add tier button skeleton */}
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        </nav>
        <div className='w-full h-0.5 bg-gray-200 my-2 px-4' />
      </div>

      {/* Content Skeleton */}
      <div>
        <div className="block">
          <div className="border-none shadow-none overflow-hidden ">
            {/* Card Header Skeleton */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-40 bg-gray-200 rounded-md"></div>
                    <div className="h-7 w-24 bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Action buttons skeleton */}
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 bg-gray-200 rounded-md"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Content Skeleton */}
            <div className="flex flex-col gap-2 px-0">
              {/* Tabs Skeleton */}
              <div className="w-full px-4">
                <div className="grid w-full grid-cols-5 h-10 bg-gray-200 rounded-md mb-6"></div>

                {/* Cost Breakdown Skeleton */}
                <div className="bg-card rounded-xl p-6 shadow-sm border mb-8">
                  <div className="h-7 w-48 bg-gray-200 rounded-md mb-6"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="p-6 bg-gray-100 rounded-xl">
                        <div className="h-4 w-32 bg-gray-200 rounded-md mb-2"></div>
                        <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Two Column Layout Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Text Models Skeleton */}
                  <div className="bg-card rounded-xl p-6 shadow-sm border space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="h-7 w-32 bg-gray-200 rounded-md"></div>
                      <div className="h-9 w-36 bg-gray-200 rounded-md"></div>
                    </div>

                    {/* Model Cards Skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-40 bg-gray-100 rounded-xl"></div>
                      ))}
                    </div>
                  </div>

                  {/* Cost Calculator Skeleton */}
                  <div className="bg-card rounded-xl p-6 shadow-sm border">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="h-7 w-40 bg-gray-200 rounded-md"></div>
                      <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl">
                        <div className="h-5 w-5 bg-gray-200 rounded-sm"></div>
                        <div className="h-5 w-64 bg-gray-200 rounded-md"></div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[1, 2].map((i) => (
                          <div key={i} className="space-y-2">
                            <div className="h-5 w-28 bg-gray-200 rounded-md"></div>
                            <div className="h-10 w-full bg-gray-200 rounded-md"></div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="h-5 w-36 bg-gray-200 rounded-md"></div>
                        <div className="h-10 w-full bg-gray-200 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

);
