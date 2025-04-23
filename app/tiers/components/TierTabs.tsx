'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tier } from '@/lib/tier.types';
import { useTiers } from '../../../hooks/useTiers';
import { ImageTab } from './ImageTab';
import { TextTokensTab } from './TextTokensTab';
import { VideoTab } from './VideoTab';

interface TierTabsProps {
  tier: Tier;
}

export function TierTabs({ tier }: TierTabsProps) {
  const { updateTierQuantity, updateTierMargin, updateTierHighestCost } = useTiers();

  return (
    <Tabs defaultValue="text" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="text">Text</TabsTrigger>
        <TabsTrigger value="image">Image</TabsTrigger>
        <TabsTrigger value="video">Video</TabsTrigger>
      </TabsList>
      <TabsContent value="text">
        <TextTokensTab
          tier={tier}
          onUpdateQuantity={(field, value) => updateTierQuantity(tier.id, 'text', field, value)}
          onUpdateMargin={(value) => updateTierMargin(tier.id, 'text', value)}
          onUpdateHighestCost={(value) => updateTierHighestCost(tier.id, 'text', value)}
        />
      </TabsContent>
      <TabsContent value="image">
        <ImageTab
          tier={tier}
          onUpdateQuantity={(value) => updateTierQuantity(tier.id, 'image', 'imageCount', value)}
          onUpdateMargin={(value) => updateTierMargin(tier.id, 'image', value)}
          onUpdateHighestCost={(value) => updateTierHighestCost(tier.id, 'image', value)}
        />
      </TabsContent>
      <TabsContent value="video">
        <VideoTab
          tier={tier}
          onUpdateQuantity={(value) => updateTierQuantity(tier.id, 'video', 'videoSeconds', value)}
          onUpdateMargin={(value) => updateTierMargin(tier.id, 'video', value)}
          onUpdateHighestCost={(value) => updateTierHighestCost(tier.id, 'video', value)}
        />
      </TabsContent>
    </Tabs>
  );
}