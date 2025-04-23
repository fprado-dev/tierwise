'use client';

import { calculateTierCosts } from '@/app/tiers/cost-calculator';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ImageModel, TextModel, VideoModel } from '@/lib/model.types';
import { Tier } from '@/lib/tier.types';

interface TierSummaryProps {
  tier: Tier;
}

export function TierSummary({ tier }: TierSummaryProps) {
  const costs = calculateTierCosts(tier);

  return (
    <div className="p-4 border-t">
      <div className="space-y-2">
        <h3 className="text-sm font-medium mb-4">Cost Summary</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Base Cost</TableHead>
              <TableHead>Profit</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tier.models.filter((model): model is TextModel => 'inputCostPerMillion' in model).length > 0 && (
              <TableRow>
                <TableCell>Text</TableCell>
                <TableCell>{costs.text.baseCost}</TableCell>
                <TableCell className="text-green-300">{costs.text.profit}</TableCell>
                <TableCell>{costs.text.total}</TableCell>
              </TableRow>
            )}
            {tier.models.filter((model): model is ImageModel => 'costPerImage' in model).length > 0 && (
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>{costs.image.baseCost}</TableCell>
                <TableCell className="text-green-300">{costs.image.profit}</TableCell>
                <TableCell>{costs.image.total}</TableCell>
              </TableRow>
            )}
            {tier.models.filter((model): model is VideoModel => 'costPerSecond' in model).length > 0 && (
              <TableRow>
                <TableCell>Video</TableCell>
                <TableCell>{costs.video.baseCost}</TableCell>
                <TableCell className="text-green-300">{costs.video.profit}</TableCell>
                <TableCell>{costs.video.total}</TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{costs.total.baseCost}</TableCell>
              <TableCell className="text-green-300">{costs.total.profit}</TableCell>
              <TableCell>
                {(parseFloat(costs.total.baseCost.replace('$', '')) + parseFloat(costs.total.profit.replace('$', ''))).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}