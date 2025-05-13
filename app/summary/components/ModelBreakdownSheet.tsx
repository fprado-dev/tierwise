'use client';

import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ProcessedTier } from '@/lib/tier.types';
import NumberFlow from '@number-flow/react';

interface ModelBreakdownSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  tier: ProcessedTier;
  inputTokens: number;
  outputTokens: number;
  textTotalCost: number;
  imageCount: number;
  imageTotalBaseCost: number;
  imageTotalCost: number;
  videoSeconds: number;
  videoTotalBaseCost: number;
  videoTotalCost: number;
  getTypeColor: (type: string) => string;
}

export function ModelBreakdownSheet({
  isOpen,
  onOpenChange,
  tier,
  inputTokens,
  outputTokens,
  textTotalCost,
  imageCount,
  imageTotalBaseCost,
  imageTotalCost,
  videoSeconds,
  videoTotalBaseCost,
  videoTotalCost,
  getTypeColor,
}: ModelBreakdownSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Model Usage Breakdown</SheetTitle>
          <SheetDescription>
            Detailed cost and usage breakdown for the models in the '{tier.name}' tier.
          </SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-6'>
          {/* Check if tier has text models before rendering */}
          {tier.models.some(model => model.model_type === 'text') && (
            <div className='p-5 w-full bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30'>
              <div className="flex items-center justify-between mb-4">
                <Badge className={getTypeColor('text')}>Text</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Input Tokens:</span>
                  <span className="font-medium text-xs">{inputTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Output Tokens:</span>
                  <span className="font-medium text-xs">{outputTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Cost:</span>
                  <span className="font-medium text-primary text-xs">
                    <NumberFlow
                      format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                      value={textTotalCost} />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Check if tier has image models before rendering */}
          {tier.models.some(model => model.model_type === 'image') && (
            <div className='p-5 w-full bg-green-50/50 dark:bg-green-950/20 rounded-xl border border-green-100 dark:border-green-900/30'>
              <div className="flex items-center justify-between mb-4">
                <Badge className={getTypeColor('image')}>Image</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Image Count:</span>
                  <span className="font-medium text-xs">{imageCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Cost per Image:</span>
                  <span className="font-medium text-xs">
                    <NumberFlow
                      format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 4 }}
                      value={imageCount > 0 ? imageTotalBaseCost / imageCount : 0} />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Cost:</span>
                  <span className="font-medium text-xs text-primary">
                    <NumberFlow
                      format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                      value={imageTotalCost} />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Check if tier has video models before rendering */}
          {tier.models.some(model => model.model_type === 'video') && (
            <div className='p-5 w-full bg-purple-50/50 dark:bg-purple-950/20 rounded-xl border border-purple-100 dark:border-purple-900/30'>
              <div className="flex items-center justify-between mb-4">
                <Badge className={getTypeColor('video')}>Video</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Duration:</span>
                  <span className="font-medium text-xs">{videoSeconds.toLocaleString()}s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Cost per Second:</span>
                  <span className="font-medium text-xs">
                    <NumberFlow
                      format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 4 }}
                      value={videoSeconds > 0 ? videoTotalBaseCost / videoSeconds : 0} />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Cost:</span>
                  <span className="font-medium text-xs text-primary">
                    <NumberFlow
                      format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                      value={videoTotalCost} />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}