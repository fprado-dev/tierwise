'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTiers } from '@/hooks/useTiers';
import { ProcessedTier } from '@/lib/tier.types';
import { CogIcon, PencilLineIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { ModelSelectionSheet } from './model-selection-sheet';
import { TabImages } from './tab-image';
import { TabText } from './tab-text';
import { TabVideos } from './tab-videos';
import { TierEditSheet } from './tier-edit-sheet';

interface TierCardProps {
  tier: ProcessedTier;
}


const getTypeColor = (type: string) => {
  switch (type) {
    case 'text': return 'bg-blue-100 text-blue-800';
    case 'image': return 'bg-green-100 text-green-800';
    case 'video': return 'bg-purple-100 text-purple-800';
    case 'audio': return 'bg-yellow-100 text-yellow-800';
    case 'hardware': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function TierCard({ tier }: TierCardProps) {
  const [isEditing, setEditSheetopen] = useState(false);
  const [modelType, setModelType] = useState<'text' | 'image' | 'video' | undefined>();
  const [isTabsVisible, setIsTabsVisible] = useState(true);
  const { deleteTier, updateTier, isLoading, isFetching } = useTiers();


  return (
    <Card className='shadow-none border-none p-0 rounded-none '>
      <CardHeader className='bg-primary-foreground'>
        <div className="flex items-center justify-between">
          <div className='flex gap-2 items-center'>

            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <Badge className='text-xs'>{tier.models.length} Models</Badge>
          </div>
          <div className='flex gap-2'>
            <Button size="icon" variant="outline" onClick={() => setIsTabsVisible(prev => !prev)}>
              <CogIcon />
            </Button>
            <Button size="icon" variant="outline" onClick={() => setEditSheetopen(prev => !prev)}>
              <PencilLineIcon />
            </Button>
            <Button variant="destructive" onClick={() => deleteTier(tier.id)}>
              <TrashIcon />
            </Button>
          </div>
        </div>
      </CardHeader>

      <div className="flex gap-4 mt-4">
        {modelType && (
          <ModelSelectionSheet
            tier={tier}
            modelType={modelType}
            isOpen={modelType !== undefined}
            onOpenChange={(open) => !open && setModelType(undefined)}
            onUpdateTier={updateTier}
          />
        )}
        <TierEditSheet
          tier={tier}
          isOpen={isEditing}
          onOpenChange={setEditSheetopen}
          onUpdateTier={updateTier}
        />
      </div>
      <CardContent className='flex flex-col gap-2 px-0'>
        {isTabsVisible && (
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
            </TabsList>
            <TabText tier={tier} getTypeColor={getTypeColor} setModelType={(modelType) => setModelType(modelType)} />
            <TabImages tier={tier} getTypeColor={getTypeColor} setModelType={(modelType) => setModelType(modelType)} />
            <TabVideos tier={tier} getTypeColor={getTypeColor} setModelType={(modelType) => setModelType(modelType)} />
          </Tabs>
        )}

        <div>
          <h1>Summary Tier</h1>
        </div>
      </CardContent>
    </Card>
  );
}