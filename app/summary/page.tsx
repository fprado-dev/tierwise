'use client';

import { useImageModelCalculator } from '@/app/hooks/useImageModelCalculator';
import { useTextModelCalculator } from '@/app/hooks/useTextModelCalculator';
import { useVideoModelCalculator } from '@/app/hooks/useVideoModelCalculator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';
import { useTiers } from '@/hooks/useTiers';
import { useTierSummary } from '@/hooks/useTierSummary';
import { ProcessedTier } from '@/lib/tier.types';
import NumberFlow from '@number-flow/react';
import { InfoIcon, Layers2Icon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

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

function TierSummaryCard({ tier }: { tier: ProcessedTier; }) {
  if (tier.models.length === 0) {
    toast({
      title: `No models found for the tier ${tier.name}`,
      description: 'Please add some models to this tier',
      variant: 'destructive',
    });
    redirect('/tiers');

  }
  const { summary, isLoading: isSummaryLoading, updateSummary, isUpdating } = useTierSummary(tier.id);
  const [operationalOverheadPercentage, setOperationalOverheadPercentage] = useState<number>(20);

  const {
    inputTokens,
    outputTokens,
    setInputTokens,
    setOutputTokens,
    setMarginPercentage: setTextMarginPercentage,
    setUseExpensiveModel: setTextUseExpensiveModel,
    totalBaseCost: textTotalBaseCost,
    totalProfitValue: textTotalProfitValue,
    totalCost: textTotalCost,
  } = useTextModelCalculator(tier);

  const {
    imageCount,
    setImageCount,
    setMarginPercentage: setImageMarginPercentage,
    setUseExpensiveModel: setImageUseExpensiveModel,
    totalBaseCost: imageTotalBaseCost,
    totalProfitValue: imageTotalProfitValue,
    totalCost: imageTotalCost,
  } = useImageModelCalculator(tier);

  const {
    videoSeconds,
    setVideoSeconds,
    setMarginPercentage: setVideoMarginPercentage,
    setUseExpensiveModel: setVideoUseExpensiveModel,
    totalBaseCost: videoTotalBaseCost,
    totalProfitValue: videoTotalProfitValue,
    totalCost: videoTotalCost,
  } = useVideoModelCalculator(tier);

  useEffect(() => {
    if (summary) {
      setInputTokens(summary.input_tokens);
      setOutputTokens(summary.output_tokens);
      setImageCount(summary.image_count);
      setVideoSeconds(summary.video_seconds);
      setTextMarginPercentage(summary.text_margin_percentage);
      setImageMarginPercentage(summary.image_margin_percentage);
      setVideoMarginPercentage(summary.video_margin_percentage);
      setTextUseExpensiveModel(summary.text_use_expensive_model);
      setImageUseExpensiveModel(summary.image_use_expensive_model);
      setVideoUseExpensiveModel(summary.video_use_expensive_model);
      setOperationalOverheadPercentage(summary.operational_overhead_percentage);
    }
  }, [summary]);

  return (
    <div className='w-full bg-sidebar rounded-xl p-8 shadow-md border border-primary/10 overflow-hidden relative'>
      <div className="relative z-10">
        <h2 className='text-xl font-bold tracking-tight mb-2'>{tier.name} Pricing</h2>
        <p className='text-sm text-muted-foreground'>Complete cost breakdown based on your configuration</p>
        {/* Header section with tier name and badge */}
        <div className="flex items-start justify-between mt-6">
          <Badge variant="outline" className='text-xs px-4 py-2 rounded-md mb-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'>
            {tier.models.length} AI Models
          </Badge>



          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-3 w-3 text-muted-foreground hover:text-primary transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-xs">Operational Buffer</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="w-16">
              <Input
                type="number"
                value={operationalOverheadPercentage}
                onChange={(e) => setOperationalOverheadPercentage(Number(e.target.value))}
                className="text-sm px-2  bg-background focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <Button
              size="sm"
              variant="outline"
              className="px-2 py-1 min-w-16 text-xs bg-sidebar-foreground text-primary-foreground hover:text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={() => {
                updateSummary({
                  tier_id: tier.id,
                  operational_overhead_percentage: operationalOverheadPercentage,
                });
              }}
              disabled={isSummaryLoading}
            >
              {isSummaryLoading || isUpdating ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>

        {/* Main pricing card */}
        <div className='grid grid-cols-4 gap-4 my-4 min-h-40'>
          <div className="flex col-span-4 flex-col items-center border justify-center bg-sidebar rounded-lg">
            <div className='flex items-center justify-center gap-1'>
              <p className="text-xs font-medium text-muted-foreground ">SUGGESTED</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-3 w-3 text-muted-foreground hover:text-primary transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs text-center text-muted-foreground ">Including {operationalOverheadPercentage}% operational overhead</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-xl font-bold text-primary">
              <NumberFlow
                format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                value={(textTotalCost + imageTotalCost + videoTotalCost) * (1 + operationalOverheadPercentage / 100)} />

            </p>
          </div>
          {/* BASE COST */}
          <div className="col-span-2 flex flex-col items-center border justify-center bg-sidebar rounded-lg">
            <div className='flex items-center justify-center gap-1'>
              <p className="text-xs font-medium text-muted-foreground ">BASE COST</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-3 w-3 text-muted-foreground hover:text-primary transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs text-center text-muted-foreground ">Raw price of each model</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-xl font-bold text-primary">
              <NumberFlow
                format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                value={textTotalBaseCost + imageTotalBaseCost + videoTotalBaseCost} />
            </p>
          </div>

          {/* PROFIT MARGIN */}
          <div className="col-span-2 flex flex-col items-center justify-center border bg-sidebar rounded-lg">
            <div className='flex items-center justify-center gap-1'>
              <p className="text-xs font-medium text-muted-foreground ">PROFIT MARGIN
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-3 w-3 text-muted-foreground hover:text-primary transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Includes {operationalOverheadPercentage}% buffer for operational overhead</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-xl font-bold text-green-500">
              <NumberFlow
                format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                value={(textTotalProfitValue + imageTotalProfitValue + videoTotalProfitValue) + (textTotalCost + imageTotalCost + videoTotalCost) * (operationalOverheadPercentage / 100)} />

            </p>
          </div>
        </div>

        {/* Model breakdown section */}
        <h3 className='text-lg font-semibold mb-4'>Model Usage Breakdown</h3>
        <div className='grid gap-2 grid-cols-1'>
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

      </div>
    </div>
  );
}

export default function SummaryPage() {
  const { tiers } = useTiers();
  console.log({ tiers });
  if (tiers.length <= 0) {
    return (
      <div className="p-4 h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="rounded-full bg-primary/10 p-6">
            <Layers2Icon className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">No Tiers Created</h2>
          <p className="text-muted-foreground">
            Get started by creating your first tier. Add AI models and configure pricing to see your cost breakdown.
          </p>
          <Button
            onClick={() => window.location.href = '/tiers'}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Create Your First Tier
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tier Summaries</h1>
            <p className="text-muted-foreground">Overview of all your tier configurations and costs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <TierSummaryCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>
    </div>
  );
}