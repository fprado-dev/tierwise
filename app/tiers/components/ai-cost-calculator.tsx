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
    <div className="flex flex-col gap-6 px-4">
      <div className="w-full">
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





