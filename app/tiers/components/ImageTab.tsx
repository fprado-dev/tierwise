'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tier } from '@/lib/tier.types';

interface ImageTabProps {
  tier: Tier;
  onUpdateQuantity: (value: number) => void;
  onUpdateMargin: (value: number) => void;
  onUpdateHighestCost: (value: boolean) => void;
}

export function ImageTab({ tier, onUpdateQuantity, onUpdateMargin, onUpdateHighestCost }: ImageTabProps) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="imageCount">Number of Images</Label>
          <Input
            id="imageCount"
            type="number"
            value={tier.quantity?.imageCount || 0}
            onChange={(e) => onUpdateQuantity(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="margin">Margin (%)</Label>
          <Input
            id="margin"
            type="number"
            value={tier.margins?.image || 0}
            onChange={(e) => onUpdateMargin(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="useHighestCost"
            checked={tier.useHighestCost?.image || false}
            onCheckedChange={onUpdateHighestCost}
          />
          <Label htmlFor="useHighestCost">Use Highest Cost Model</Label>
        </div>
      </CardContent>
    </Card>
  );
}