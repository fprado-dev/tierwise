'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BotOffIcon, PlusIcon } from 'lucide-react';

interface ModelEmptyProps {
  onCreateModel: () => void;
}

export function ModelEmpty({ onCreateModel }: ModelEmptyProps) {
  return (
    <Card className="w-full border-dashed shadow-none">
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <BotOffIcon className="h-8 w-8 text-brand" />
        </div>

        <h3 className="text-lg text-brand font-semibold mb-2">No models added yet</h3>

        <p className="text-muted-foreground max-w-md mb-6">
          You haven't added any AI models to your project. Add models to start calculating costs and creating tiers.
        </p>

        <Button onClick={onCreateModel} className="gap-1 bg-brand hover:bg-brand/90">
          <PlusIcon className="h-4 w-4" />
          Create New Model
        </Button>
      </CardContent>
    </Card>
  );
}