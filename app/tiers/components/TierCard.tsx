'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTiers } from '@/hooks/useTiers';
import { ProcessedTier } from '@/lib/tier.types';
import { Cpu, FileText, Image, PencilLineIcon, TrashIcon, Video } from 'lucide-react';
import { useState } from 'react';
import { ModelSelectionSheet } from './model-selection-sheet';
import { SelectableModelCard } from './selectable-model-card';

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
  const { deleteTier, updateTier } = useTiers();


  return (
    <Card className='shadow-none border-none p-0 rounded-none '>
      <CardHeader className='bg-primary-foreground'>
        <div className="flex items-center justify-between">
          <div className='flex gap-2 items-center'>

            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <span className='text-xs'>{tier.models.length} Models</span>
          </div>
          <div className='flex gap-2'>

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
      </div>
      <CardContent className='flex flex-col gap-2 px-0'>
        <ToggleGroup
          type="single"
          value={modelType}
          onValueChange={(value: 'text' | 'image' | 'video') => setModelType(value)}
          className="flex self-start gap-2"
        >
          <ToggleGroupItem value="text" className={getTypeColor('text')}>
            <FileText className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="image" className={getTypeColor('image')}>
            <Image className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="video" className={getTypeColor('video')}>
            <Video className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem disabled value="hardware" className={getTypeColor('hardware')}>
            <Cpu className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>
          <TabsContent value="text">
            <div className='grid grid-cols-3 gap-2'>
              {tier.models
                .filter(model => model.model_type === 'text')
                .map(model => (
                  <SelectableModelCard
                    key={model.id}
                    model={model}
                    isSelected={false}
                    onSelect={() => { }}
                    isDefault
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="image">
            <div className='grid grid-cols-3 gap-2'>
              {tier.models
                .filter(model => model.model_type === 'image')
                .map(model => (
                  <SelectableModelCard
                    key={model.id}
                    model={model}
                    isSelected={false}
                    onSelect={() => { }}
                    isDefault
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="video">
            <div className='grid grid-cols-3 gap-2'>
              {tier.models
                .filter(model => model.model_type === 'video')
                .map(model => (
                  <SelectableModelCard
                    key={model.id}
                    model={model}
                    isSelected={false}
                    onSelect={() => { }}
                    isDefault
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}