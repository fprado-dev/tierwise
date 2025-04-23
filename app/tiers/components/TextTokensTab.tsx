'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tier } from '@/lib/tier.types';

interface TextTokensTabProps {
  tier: Tier;
  onUpdateQuantity: (field: string, value: number) => void;
  onUpdateMargin: (value: number) => void;
  onUpdateHighestCost: (value: boolean) => void;
}

export function TextTokensTab({ tier, onUpdateQuantity, onUpdateMargin, onUpdateHighestCost }: TextTokensTabProps) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="inputTokens">Input Tokens</Label>
            <Input
              id="inputTokens"
              type="number"
              value={tier.quantity?.textTokens?.input || 0}
              onChange={(e) => onUpdateQuantity('input', parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputTokens">Output Tokens</Label>
            <Input
              id="outputTokens"
              type="number"
              value={tier.quantity?.textTokens?.output || 0}
              onChange={(e) => onUpdateQuantity('output', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="margin">Margin (%)</Label>
          <Input
            id="margin"
            type="number"
            value={tier.margins?.text || 0}
            onChange={(e) => onUpdateMargin(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="useHighestCost"
            checked={tier.useHighestCost?.text || false}
            onCheckedChange={onUpdateHighestCost}
          />
          <Label htmlFor="useHighestCost">Use Highest Cost Model</Label>
        </div>
      </CardContent>
    </Card>
  );
}