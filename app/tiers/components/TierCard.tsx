'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTiers } from '@/hooks/useTiers';
import { ProcessedTier } from '@/lib/tier.types';
import { CogIcon, PencilLineIcon, SaveAllIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { ModelSelectionSheet } from './model-selection-sheet';
import { TabImage } from './tab-image';
import { TabText } from './tab-text';
import { TabVideo } from './tab-videos';
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
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { deleteTier, updateTier, isLoading, isFetching } = useTiers();


  return (
    <Card className=' border-none shadow-none overflow-hidden bg-gradient-to-b from-primary-foreground to-background'>
      <CardHeader className='p-6'>
        <div className="flex items-center justify-between">
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3'>
              <h3 className="text-xl font-bold tracking-tight">{tier.name}</h3>
              <Badge variant="secondary" className='px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors'>
                {tier.models.length} Models
              </Badge>
            </div>
            <p className='text-sm text-muted-foreground'>Manage your AI models and pricing configuration</p>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              size="icon"
              variant="ghost"
              className='hover:bg-primary/10 hover:text-primary transition-colors'
            >
              <SaveAllIcon className='h-4 w-4' />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className='hover:bg-primary/10 hover:text-primary transition-colors'
              onClick={() => setIsTabsVisible(prev => !prev)}
            >
              <CogIcon className='h-4 w-4' />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className='hover:bg-primary/10 hover:text-primary transition-colors'
              onClick={() => setEditSheetopen(prev => !prev)}
            >
              <PencilLineIcon className='h-4 w-4' />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className='hover:bg-destructive/10 hover:text-destructive transition-colors'
              onClick={() => setIsDeleteConfirmOpen(true)}
            >
              <TrashIcon className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardHeader>

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
      <CardContent className='flex flex-col gap-2 px-0 bg-vard'>
        {isTabsVisible && (
          <Tabs defaultValue="text" className="w-ful px-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger className='hover:bg-foreground/5' value="text">Text</TabsTrigger>
              <TabsTrigger className='hover:bg-foreground/5' value="image">Image</TabsTrigger>
              <TabsTrigger className='hover:bg-foreground/5' value="video">Video</TabsTrigger>
              <TabsTrigger className='hover:bg-foreground/5' value="audio" disabled>Audio <Badge className={`ml-2 ${getTypeColor("audio")}`}>Soon</Badge></TabsTrigger>
              <TabsTrigger className='hover:bg-foreground/5' value="harware" disabled>Hardware <Badge className={`ml-2 ${getTypeColor("hardware")}`}>Soon</Badge></TabsTrigger>
            </TabsList>
            <TabText tier={tier} getTypeColor={getTypeColor} setModelType={(modelType) => setModelType(modelType)} />
            <TabImage tier={tier} getTypeColor={getTypeColor} setModelType={(modelType) => setModelType(modelType)} />
            <TabVideo tier={tier} getTypeColor={getTypeColor} setModelType={(modelType) => setModelType(modelType)} />
          </Tabs>
        )}
      </CardContent>
      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        onConfirm={() => deleteTier(tier.id)}
        title="Delete Tier"
        description="Are you sure you want to delete this tier? This action cannot be undone."
        confirmText="Delete"
      />
    </Card>
  );
}