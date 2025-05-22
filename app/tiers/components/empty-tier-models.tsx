'use client';

import { Card, CardContent } from '@/components/ui/card';
import { BotOffIcon } from 'lucide-react';

interface EmptyTierModelsProps {
  tierName: string;
}

export function EmptyTierModels({ tierName }: EmptyTierModelsProps) {
  return (
    <Card className="w-full border-none shadow-none">
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <BotOffIcon className="h-8 w-8 text-brand" />
        </div>

        <h3 className="text-lg text-brand font-semibold mb-2">No models in {tierName} Tier</h3>

        <p className="text-muted-foreground max-w-md mb-6 text-balance">
          This tier doesn't have any AI models yet. Add models to start calculating costs and pricing for this tier.
        </p>

      </CardContent>
    </Card>
  );
}