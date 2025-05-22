'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Layers } from 'lucide-react';
import { TierCreationSheet } from './tier-creation-sheet';

interface TiersEmptyProps {
  onAddTier: (name: string, inheritModels?: boolean) => void;
}

export function TiersEmpty({ onAddTier }: TiersEmptyProps) {
  return (
    <Card className="w-full border-dashed shadow-none">
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Layers className="h-8 w-8 text-brand" />
        </div>

        <h3 className="text-lg text-brand font-semibold mb-2">No tiers created yet</h3>

        <p className="text-muted-foreground max-w-md mb-6">
          You haven't created any pricing tiers yet. Add tiers to start organizing your AI model pricing structure.
        </p>

        <TierCreationSheet tiers={[]} onAddTier={onAddTier} />
      </CardContent>
    </Card>
  );
}