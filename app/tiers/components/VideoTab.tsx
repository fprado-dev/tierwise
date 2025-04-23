'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tier } from '@/lib/tier.types';

interface VideoTabProps {
  tier: Tier;
  onUpdateQuantity: (value: number) => void;
  onUpdateMargin: (value: number) => void;
  onUpdateHighestCost: (value: boolean) => void;
}

export function VideoTab({ tier, onUpdateQuantity, onUpdateMargin, onUpdateHighestCost }: VideoTabProps) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="videoSeconds">Video Duration (seconds)</Label>
          <Input
            id="videoSeconds"
            type="number"
            value={tier.quantity?.videoSeconds || 0}
            onChange={(e) => onUpdateQuantity(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="margin">Margin (%)</Label>
          <Input
            id="margin"
            type="number"
            value={tier.margins?.video || 0}
            onChange={(e) => onUpdateMargin(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="useHighestCost"
            checked={tier.useHighestCost?.video || false}
            onCheckedChange={onUpdateHighestCost}
          />
          <Label htmlFor="useHighestCost">Use Highest Cost Model</Label>
        </div>
      </CardContent>
    </Card>
  );
}