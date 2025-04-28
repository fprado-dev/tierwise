'use client';

import { useImageModelCalculator } from '@/app/hooks/useImageModelCalculator';
import { useTextModelCalculator } from '@/app/hooks/useTextModelCalculator';
import { useVideoModelCalculator } from '@/app/hooks/useVideoModelCalculator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useTiers } from '@/hooks/useTiers';
import { useTierSummary } from '@/hooks/useTierSummary';
import { ProcessedTier } from '@/lib/tier.types';
import NumberFlow from '@number-flow/react';
import { ChartNoAxesCombinedIcon, CogIcon, PencilLineIcon, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FlippableCard } from './FlippableCard';
import { ModelSelectionSheet } from './model-selection-sheet';
import { TierEditSheet } from './tier-edit-sheet';

interface TierCardProps {
  tier: ProcessedTier;
}


export const getTypeColor = (type: string) => {
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
  const [isSummaryVisible, setSummaryVisible] = useState(false);
  const [operationalOverheadPercentage, setOperationalOverheadPercentage] = useState<number>(20);


  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { deleteTier, updateTier } = useTiers();
  const { summary, saveSummary, updateSummary, isLoading: isSummaryLoading, isUpdating } = useTierSummary(tier.id);
  const {
    inputTokens,
    outputTokens,
    marginPercentage: textMarginPercentage,
    useExpensiveModel: textUseExpensiveModel,
    setInputTokens,
    setOutputTokens,
    setMarginPercentage: setTextMarginPercentage,
    setUseExpensiveModel: setTextUseExpensiveModel,
    totalBaseCost: textTotalBaseCost,
    totalProfitValue: textTotalProfitValue,
    totalCost: textTotalCost,
    getMostExpensiveModel: getTextMostExpensiveModel,
  } = useTextModelCalculator(tier);

  const {
    imageCount,
    marginPercentage: imageMarginPercentage,
    useExpensiveModel: imageUseExpensiveModel,
    setImageCount,
    setMarginPercentage: setImageMarginPercentage,
    setUseExpensiveModel: setImageUseExpensiveModel,
    totalBaseCost: imageTotalBaseCost,
    totalProfitValue: imageTotalProfitValue,
    totalCost: imageTotalCost,
    getMostExpensiveModel: getImageMostExpensiveModel,
  } = useImageModelCalculator(tier);

  const {
    videoSeconds,
    marginPercentage: videoMarginPercentage,
    useExpensiveModel: videoUseExpensiveModel,
    setVideoSeconds,
    setMarginPercentage: setVideoMarginPercentage,
    setUseExpensiveModel: setVideoUseExpensiveModel,
    totalBaseCost: videoTotalBaseCost,
    totalProfitValue: videoTotalProfitValue,
    totalCost: videoTotalCost,
    getMostExpensiveModel: getVideoMostExpensiveModel,
  } = useVideoModelCalculator(tier);

  // Load saved summary data when component mounts
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


  const handleSummary = () => {
    const newSummaryVisible = !isSummaryVisible;
    setSummaryVisible(newSummaryVisible);
    setIsTabsVisible(false);

    // Save summary data when showing the summary
    if (newSummaryVisible) {
      saveSummary({
        tier_id: tier.id,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        image_count: imageCount,
        video_seconds: videoSeconds,
        text_margin_percentage: textMarginPercentage,
        image_margin_percentage: imageMarginPercentage,
        video_margin_percentage: videoMarginPercentage,
        text_use_expensive_model: textUseExpensiveModel,
        image_use_expensive_model: imageUseExpensiveModel,
        video_use_expensive_model: videoUseExpensiveModel,
        operational_overhead_percentage: operationalOverheadPercentage,

      });
    }
  };
  return (
    <div className='bg-transparent border-none mt-4'>
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
              size="sm"
              variant="outline"
              onClick={handleSummary}
              className='hover:bg-primary/10 hover:text-primary transition-colors'
            >
              Summary
              <ChartNoAxesCombinedIcon className='h-4 w-4' />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className='hover:bg-primary/10 hover:text-primary transition-colors'
              onClick={() => {
                setSummaryVisible(false);
                setIsTabsVisible(prev => !prev);
              }
              }
            >
              Models Config
              <CogIcon className='h-4 w-4' />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className='hover:bg-primary/10 hover:text-primary transition-colors'
              onClick={() => setEditSheetopen(prev => !prev)}
            >
              Update
              <PencilLineIcon className='h-4 w-4' />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className='hover:bg-destructive/10 hover:text-destructive transition-colors'
              onClick={() => setIsDeleteConfirmOpen(true)}
            >
              Delete
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
      <CardContent className='flex flex-col gap-4 px-4'>

        {isTabsVisible && (

          <div className="flex flex-col gap-4">

            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">



              <FlippableCard
                cardColor="bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30"
                frontContent={
                  <div className="h-full flex flex-col">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-blue-700 dark:text-blue-400">Cost Breakdown</h3>
                          <Badge className={getTypeColor('text')}>Text</Badge>
                        </div>
                        <div className='flex gap-2'>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={(e) => { e.stopPropagation(); setModelType("text"); }}
                            className={`flex items-center gap-2 transition-colors`}
                          >
                            <CogIcon className='w-4 h-4' />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">

                        <div className="p-4 flex flex-col justify-center items-center bg-primary/5 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground mb-1">Base Cost</p>
                          <p className="font-bold text-primary">
                            <NumberFlow
                              format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                              value={textTotalBaseCost} />
                          </p>
                        </div>
                        <div className="p-4 flex flex-col justify-center items-center bg-primary/5 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground mb-1">Total Cost</p>
                          <p className="font-bold text-primary">
                            <NumberFlow
                              format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                              value={textTotalCost} />
                          </p>
                        </div>
                        <div className="p-4 flex flex-col justify-center items-center bg-primary/5 rounded-lg">
                          <p className="text-sm font-medium text-green-700 mb-1">Total Profit</p>
                          <p className="font-bold text-primary">
                            <NumberFlow
                              format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                              value={textTotalProfitValue} />
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 min-h-32">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Input Tokens:</span>
                          <span className="font-medium">{inputTokens.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Output Tokens:</span>
                          <span className="font-medium">{outputTokens.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Cost per Million Tokens:</span>
                          <span className="font-medium">
                            <NumberFlow
                              format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 4 }}
                              value={(inputTokens + outputTokens) > 0 ? textTotalBaseCost / ((inputTokens + outputTokens) / 1000000) : 0} />
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Margin:</span>
                          <span className="font-medium">{textMarginPercentage}%</span>
                        </div>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-blue-700 dark:text-blue-400">Text Calculator</h3>
                    </div>

                    <div className="space-y-6 flex-1">
                      <div className="flex items-center gap-2 rounded-xl transition-all">
                        <Checkbox
                          id="text-use-expensive"
                          checked={textUseExpensiveModel}
                          onCheckedChange={(checked) => setTextUseExpensiveModel(checked as boolean)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label htmlFor="text-use-expensive" className="font-medium text-xs">
                          Use most expensive model
                        </label>
                      </div>

                      <div className='flex items-center gap-4'>
                        <div className="space-y-2 text-xs flex flex-col w-full">
                          <label className="font-medium">Input Tokens</label>
                          <Input
                            type="number"
                            value={inputTokens}
                            onChange={(e) => setInputTokens(Number(e.target.value))}
                            className="bg-background focus:ring-2 focus:ring-primary/20 w-full"
                          />
                        </div>

                        <div className="space-y-2 text-xs flex flex-col w-full">
                          <label className="font-medium">Output Tokens</label>
                          <Input
                            type="number"
                            value={outputTokens}
                            onChange={(e) => setOutputTokens(Number(e.target.value))}
                            className="bg-background focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                      </div>
                      <div className="space-y-2">
                        <label className="font-medium">Margin Percentage</label>
                        <Input
                          type="number"
                          value={textMarginPercentage}
                          onChange={(e) => setTextMarginPercentage(Number(e.target.value))}
                          className="bg-background focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>
                }
              />


              <FlippableCard
                cardColor="bg-green-50/50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30"
                frontContent={
                  <div className="h-full flex flex-col">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-green-700 dark:text-green-400">Cost Breakdown</h3>
                          <Badge className={getTypeColor('image')}>Image</Badge>
                        </div>
                        <div className='flex gap-2'>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={(e) => { e.stopPropagation(); setModelType("image"); }}
                            className={`flex items-center gap-2 transition-colors`}
                          >
                            <CogIcon className='w-4 h-4' />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">

                        <div className="p-4 flex flex-col justify-center items-center bg-primary/5 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground mb-1">Base Cost</p>
                          <p className="font-bold text-primary">
                            <NumberFlow
                              format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                              value={imageTotalBaseCost} />
                          </p>
                        </div>
                        <div className="p-4 flex flex-col justify-center items-center bg-primary/5 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground mb-1">Total Cost</p>
                          <p className="font-bold text-primary">
                            <NumberFlow
                              format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                              value={imageTotalCost} />
                          </p>
                        </div>
                        <div className="p-4 flex flex-col justify-center items-center bg-primary/5 rounded-lg">
                          <p className="text-sm font-medium text-green-700 mb-1">Total Profit</p>
                          <p className="font-bold text-primary">
                            <NumberFlow
                              format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                              value={imageTotalProfitValue} />
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 min-h-32">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Image Count:</span>
                          <span className="font-medium">{imageCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Cost per Image:</span>
                          <span className="font-medium">
                            <NumberFlow
                              format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 4 }}
                              value={imageCount > 0 ? imageTotalBaseCost / imageCount : 0} />
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Margin:</span>
                          <span className="font-medium">{imageMarginPercentage}%</span>
                        </div>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-green-700 dark:text-green-400">Image Calculator</h3>
                    </div>

                    <div className="space-y-6 flex-1">
                      <div className="flex items-center gap-2 rounded-xl transition-all">
                        <Checkbox
                          id="image-use-expensive"
                          checked={imageUseExpensiveModel}
                          onCheckedChange={(checked) => setImageUseExpensiveModel(checked as boolean)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label htmlFor="image-use-expensive" className="font-medium text-xs">
                          Use most expensive model
                        </label>
                      </div>

                      <div className="space-y-2 text-xs">
                        <label className="font-medium">Image Count</label>
                        <Input
                          type="number"
                          value={imageCount}
                          onChange={(e) => setImageCount(Number(e.target.value))}
                          className="bg-background focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-medium">Margin Percentage</label>
                        <Input
                          type="number"
                          value={imageMarginPercentage}
                          onChange={(e) => setImageMarginPercentage(Number(e.target.value))}
                          className="bg-background focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>
                }
              />



              <FlippableCard
                cardColor="bg-purple-50/50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30"
                frontContent={
                  <div className="h-full flex flex-col">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-purple-700 dark:text-purple-400">Cost Breakdown</h3>
                          <Badge className={getTypeColor('video')}>Video</Badge>
                        </div>
                        <div className='flex gap-2'>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={(e) => { e.stopPropagation(); setModelType("video"); }}
                            className={`flex items-center gap-2 transition-colors`}
                          >
                            <CogIcon className='w-4 h-4' />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">

                        <div className="p-4 flex flex-col justify-center items-center bg-primary/5 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground mb-1">Base Cost</p>
                          <p className="font-bold text-primary">
                            <NumberFlow
                              format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                              value={videoTotalBaseCost} />
                          </p>
                        </div>
                        <div className="p-4 flex flex-col justify-center items-center bg-primary/5 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground mb-1">Total Cost</p>
                          <p className="font-bold text-primary">
                            <NumberFlow
                              format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                              value={videoTotalCost} />
                          </p>
                        </div>
                        <div className="p-4 flex flex-col justify-center items-center bg-primary/5 rounded-lg">
                          <p className="text-sm font-medium text-green-700 mb-1">Total Profit</p>
                          <p className="font-bold text-primary">
                            <NumberFlow
                              format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                              value={videoTotalProfitValue} />
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 min-h-32">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Duration:</span>
                          <span className="font-medium">{videoSeconds.toLocaleString()}s</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Cost per Second:</span>
                          <span className="font-medium">
                            <NumberFlow
                              format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 4 }}
                              value={videoSeconds > 0 ? videoTotalBaseCost / videoSeconds : 0} />
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Margin:</span>
                          <span className="font-medium">{videoMarginPercentage}%</span>
                        </div>
                      </div>



                    </div>
                    <Separator className='my-4' />
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-purple-700 dark:text-purple-400">Video Calculator</h3>
                    </div>

                    <div className="space-y-6 flex-1">
                      <div className="flex items-center gap-2 rounded-xl transition-all">
                        <Checkbox
                          id="video-use-expensive"
                          checked={videoUseExpensiveModel}
                          onCheckedChange={(checked) => setVideoUseExpensiveModel(checked as boolean)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label htmlFor="video-use-expensive" className="font-medium text-xs">
                          Use most expensive model
                        </label>
                      </div>

                      <div className="space-y-2 text-xs">
                        <label className="font-medium ">Video Seconds</label>
                        <Input
                          type="number"
                          value={videoSeconds}
                          onChange={(e) => setVideoSeconds(Number(e.target.value))}
                          className="bg-background focus:ring-2 focus:ring-primary/20 "
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-medium">Margin Percentage</label>
                        <Input
                          type="number"
                          value={videoMarginPercentage}
                          onChange={(e) => setVideoMarginPercentage(Number(e.target.value))}
                          className="bg-background focus:ring-2 focus:ring-primary/20 "
                        />
                      </div>
                    </div>


                  </div>
                }
              />

            </div>
          </div>
        )}

      </CardContent >
      {isSummaryVisible && <CardFooter className="px-0">
        <div className='w-full bg-card rounded-xl p-8 shadow-md border border-primary/10 overflow-hidden relative'>
          {/* Decorative background element */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50 z-0"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50 z-0"></div>

          <div className="relative z-10">
            {/* Header section with tier name and badge */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className='text-2xl font-bold tracking-tight mb-2'>{tier.name} Pricing</h2>
                <p className='text-sm text-muted-foreground'>Complete cost breakdown based on your configuration</p>
              </div>
              <Badge variant="outline" className='px-3 py-1.5 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'>
                {tier.models.length} AI Models Included
              </Badge>
            </div>

            {/* Main pricing card */}
            <div className="grid grid-cols-1 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 shadow-sm my-4">
              <div className='grid grid-cols-1 gap-4 p-8'>
                <div className="col-span-2 flex flex-col items-center text-center mb-4">
                  <Badge variant="outline" className="text-sm font-normal border-green-500 bg-green-300 px-8 border  mb-1">Recommended Price</Badge>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-primary">
                      <NumberFlow
                        format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                        value={(textTotalCost + imageTotalCost + videoTotalCost) * (1 + operationalOverheadPercentage / 100)} />
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border p-2 rounded-md">
                    <span className="text-sm">Operational Buffer:</span>
                    <div className="w-16">
                      <Input
                        type="number"
                        value={operationalOverheadPercentage}
                        onChange={(e) => setOperationalOverheadPercentage(Number(e.target.value))}
                        className="text-sm px-2 py-1 bg-background focus:ring-1 focus:ring-primary/20"
                      />
                    </div>
                    <span className="text-sm">%</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 px-2 py-1 text-xs text-primary"
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
                <div className='grid col-span-2 grid-cols-3 gap-4 '>
                  <div className="flex flex-col items-center justify-center p-4 bg-background/80 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-1">BASE COST</p>
                    <p className="text-xl font-bold text-primary">
                      <NumberFlow
                        format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                        value={textTotalBaseCost + imageTotalBaseCost + videoTotalBaseCost} />
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Raw price of each model</p>
                  </div>

                  <div className="flex flex-col items-center justify-center p-4 bg-background/80 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-1">TOTAL COST</p>
                    <p className="text-xl font-bold text-primary">
                      <NumberFlow
                        format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                        value={textTotalCost + imageTotalCost + videoTotalCost} />
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Includes % margin for each model</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-background/80 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-1">PROFIT MARGIN</p>
                    <p className="text-xl font-bold text-green-500">
                      <NumberFlow
                        format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                        value={(textTotalProfitValue + imageTotalProfitValue + videoTotalProfitValue) + (textTotalCost + imageTotalCost + videoTotalCost) * (operationalOverheadPercentage / 100)} />

                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Includes {operationalOverheadPercentage}% buffer for operational overhead</p>
                  </div>
                </div>
              </div>


            </div>

            {/* Model breakdown section */}
            <h3 className='text-lg font-semibold mb-4'>Model Usage Breakdown</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              {/* Text models */}
              <div className='p-5 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30'>
                <div className="flex items-center justify-between mb-4">
                  <h4 className='font-medium text-blue-700 dark:text-blue-400'>Text Processing</h4>
                  <Badge className={getTypeColor('text')}>Text</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Input Tokens:</span>
                    <span className="font-medium">{inputTokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Output Tokens:</span>
                    <span className="font-medium">{outputTokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cost:</span>
                    <span className="font-medium text-primary">
                      <NumberFlow
                        format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                        value={textTotalCost} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Image models */}
              <div className='p-5 bg-green-50/50 dark:bg-green-950/20 rounded-xl border border-green-100 dark:border-green-900/30'>
                <div className="flex items-center justify-between mb-4">
                  <h4 className='font-medium text-green-700 dark:text-green-400'>Image Generation</h4>
                  <Badge className={getTypeColor('image')}>Image</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Image Count:</span>
                    <span className="font-medium">{imageCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cost per Image:</span>
                    <span className="font-medium">
                      <NumberFlow
                        format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 4 }}
                        value={imageCount > 0 ? imageTotalBaseCost / imageCount : 0} />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cost:</span>
                    <span className="font-medium text-primary">
                      <NumberFlow
                        format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                        value={imageTotalCost} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Video models */}
              <div className='p-5 bg-purple-50/50 dark:bg-purple-950/20 rounded-xl border border-purple-100 dark:border-purple-900/30'>
                <div className="flex items-center justify-between mb-4">
                  <h4 className='font-medium text-purple-700 dark:text-purple-400'>Video Processing</h4>
                  <Badge className={getTypeColor('video')}>Video</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Duration:</span>
                    <span className="font-medium">{videoSeconds.toLocaleString()}s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cost per Second:</span>
                    <span className="font-medium">
                      <NumberFlow
                        format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 4 }}
                        value={videoSeconds > 0 ? videoTotalBaseCost / videoSeconds : 0} />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cost:</span>
                    <span className="font-medium text-primary">
                      <NumberFlow
                        format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                        value={videoTotalCost} />
                    </span>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
      </CardFooter>}
      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        onConfirm={() => deleteTier(tier.id)}
        title="Delete Tier"
        description="Are you sure you want to delete this tier? This action cannot be undone."
        confirmText="Delete"
      />
    </div >
  );
};;;