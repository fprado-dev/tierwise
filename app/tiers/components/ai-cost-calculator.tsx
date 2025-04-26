'use client';

import { ProcessedTier } from '@/lib/tier.types';
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { GripIcon } from 'lucide-react';
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
      className="flex items-center gap-2"
    >
      <div className="cursor-move" {...listeners}>
        <GripIcon className='w-3 h-3' />
      </div>
      <button
        onClick={onClick}
        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${isActive
          ? 'border-indigo-500 text-indigo-600'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
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

  useEffect(() => {
    if (tiers.length !== initialTiers.length) {
      setTiers(initialTiers);
    }
  }, [initialTiers]);

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
    if (tiers.length > 0 && (!activeTab || !tiers.find(t => t.id === activeTab))) {
      setActiveTab(tiers[0].id);
    }
  }, [tiers]);

  if (isLoading) {
    return (
      <Skeleton />
    );
  }

  if (tiers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">No Tiers Created Yet</h3>
          <p className="text-muted-foreground">Create your first tier to start calculating AI costs.</p>
        </div>
        <TierCreationSheet onAddTier={addTier} tiers={tiers} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 bg-primary-foreground">
      <div className="w-full min-h-screen">
        <div className="border-b border-gray-200">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <nav className="-mb-px flex space-x-8 items-center" aria-label="Tiers">
              <SortableContext items={tiers.map(t => t.id)}>
                {tiers.map((tier) => (
                  <DraggableTierButton
                    key={tier.id}
                    tier={tier}
                    isActive={tier.id === activeTab}
                    onClick={() => setActiveTab(tier.id)}
                  />
                ))}
              </SortableContext>
              <TierCreationSheet onAddTier={addTier} tiers={tiers} />
            </nav>
          </DndContext>
        </div>
        <div>
          {initialTiers.map((tier) => (
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
