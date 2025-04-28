'use client';

import { useImageModelCalculator } from '@/app/hooks/useImageModelCalculator';
import { useTextModelCalculator } from '@/app/hooks/useTextModelCalculator';
import { useVideoModelCalculator } from '@/app/hooks/useVideoModelCalculator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTiers } from '@/hooks/useTiers';
import { useTierSummary } from '@/hooks/useTierSummary';
import { ProcessedTier } from '@/lib/tier.types';
import NumberFlow from '@number-flow/react';
import { ChartNoAxesCombinedIcon, CogIcon, PencilLineIcon, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const [isTabsVisible, setIsTabsVisible] = useState(false);
  const [isSummaryVisible, setSummaryVisible] = useState(false);
  const [operationalOverheadPercentage, setOperationalOverheadPercentage] = useState<number>(20);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { deleteTier, updateTier, isLoading, isFetching } = useTiers();
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
      <CardContent className='flex flex-col gap-4 px-0'>

        {isTabsVisible && (
          <Tabs defaultValue="text" className="w-ful px-4">
            <TabsList className="grid w-full grid-cols-3 border">
              <TabsTrigger className='hover:bg-foreground/5' value="text">Text</TabsTrigger>
              <TabsTrigger className='hover:bg-foreground/5' value="image">Image</TabsTrigger>
              <TabsTrigger className='hover:bg-foreground/5' value="video">Video</TabsTrigger>
            </TabsList>
            <TabText tier={tier}
              getTypeColor={getTypeColor}
              setModelType={(modelType) => setModelType(modelType)}
              inputTokens={inputTokens}
              outputTokens={outputTokens}
              marginPercentage={textMarginPercentage}
              useExpensiveModel={textUseExpensiveModel}
              setInputTokens={setInputTokens}
              setOutputTokens={setOutputTokens}
              setMarginPercentage={setTextMarginPercentage}
              setUseExpensiveModel={setTextUseExpensiveModel}
              totalBaseCost={textTotalBaseCost}
              totalProfitValue={textTotalProfitValue}
              totalCost={textTotalCost}
              getMostExpensiveModel={getTextMostExpensiveModel}

            />
            <TabImage
              tier={tier}
              getTypeColor={getTypeColor}
              setModelType={(modelType) => setModelType(modelType)}
              imageCount={imageCount}
              marginPercentage={imageMarginPercentage}
              useExpensiveModel={imageUseExpensiveModel}
              setImageCount={setImageCount}
              setMarginPercentage={setImageMarginPercentage}
              setUseExpensiveModel={setImageUseExpensiveModel}
              totalBaseCost={imageTotalBaseCost}
              totalProfitValue={imageTotalProfitValue}
              totalCost={imageTotalCost}
              getMostExpensiveModel={getImageMostExpensiveModel}
            />
            <TabVideo
              tier={tier}
              getTypeColor={getTypeColor}
              setModelType={(modelType) => setModelType(modelType)}
              videoSeconds={videoSeconds}
              marginPercentage={videoMarginPercentage}
              useExpensiveModel={videoUseExpensiveModel}
              setVideoSeconds={setVideoSeconds}
              setMarginPercentage={setVideoMarginPercentage}
              setUseExpensiveModel={setVideoUseExpensiveModel}
              totalBaseCost={videoTotalBaseCost}
              totalProfitValue={videoTotalProfitValue}
              totalCost={videoTotalCost}
              getMostExpensiveModel={getVideoMostExpensiveModel}
            />
          </Tabs>
        )}
      </CardContent>
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
            <div className="mb-8 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 shadow-sm">
              <div className="flex flex-col items-center text-center mb-4">
                <p className="text-sm font-medium text-muted-foreground mb-1">RECOMMENDED PRICE</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-primary">
                    <NumberFlow
                      format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                      value={(textTotalCost + imageTotalCost + videoTotalCost) * (1 + operationalOverheadPercentage / 100)} />
                  </span>

                </div>
                <p className="text-xs text-muted-foreground mt-2">Includes {operationalOverheadPercentage}% buffer for operational overhead</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center p-4 bg-background/80 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-1">BASE COST</p>
                  <p className="text-xl font-bold text-primary">
                    <NumberFlow
                      format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                      value={textTotalBaseCost + imageTotalBaseCost + videoTotalBaseCost} />
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-background/80 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-1">PROFIT MARGIN</p>
                  <p className="text-xl font-bold text-green-500">
                    <NumberFlow
                      format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                      value={(textTotalProfitValue + imageTotalProfitValue + videoTotalProfitValue) + (textTotalCost + imageTotalCost + videoTotalCost) * (operationalOverheadPercentage / 100)} />

                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-background/80 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-1">TOTAL COST</p>
                  <p className="text-xl font-bold text-primary">
                    <NumberFlow
                      format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                      value={textTotalCost + imageTotalCost + videoTotalCost} />
                  </p>
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

            {/* Features and comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-background rounded-xl border shadow-sm">
                <h4 className="font-semibold mb-3">Included Features</h4>
                <ul className="space-y-2">
                  {tier.models.filter(model => model.model_type === 'text').length > 0 && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span>Text Generation & Processing</span>
                    </li>
                  )}
                  {tier.models.filter(model => model.model_type === 'image').length > 0 && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>Image Generation</span>
                    </li>
                  )}
                  {tier.models.filter(model => model.model_type === 'video').length > 0 && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                      <span>Video Processing</span>
                    </li>
                  )}
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Custom Margin Configuration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Detailed Cost Breakdown</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-background rounded-xl border shadow-sm">
                <h4 className="font-semibold mb-3">Pricing Comparison</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Base Provider Cost:</span>
                    <span className="font-medium">
                      <NumberFlow
                        format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                        value={textTotalBaseCost + imageTotalBaseCost + videoTotalBaseCost} />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Your Margin ({Math.max(textMarginPercentage, imageMarginPercentage, videoMarginPercentage)}%):</span>
                    <span className="font-medium text-green-500">
                      <NumberFlow
                        format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                        value={textTotalProfitValue + imageTotalProfitValue + videoTotalProfitValue} />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Operational Buffer:</span>
                      <div className="w-16">
                        <Input
                          type="number"
                          value={operationalOverheadPercentage}
                          onChange={(e) => setOperationalOverheadPercentage(Number(e.target.value))}
                          className="h-6 text-xs px-2 py-1 bg-background focus:ring-1 focus:ring-primary/20"
                        />
                      </div>
                      <span className="text-sm">%</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 px-2 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary"
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
                    <span className="font-medium">
                      <NumberFlow
                        format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                        value={(textTotalCost + imageTotalCost + videoTotalCost) * (operationalOverheadPercentage / 100)} />
                    </span>
                  </div>
                  <div className="h-px bg-border my-2"></div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Recommended Price:</span>
                    <span className="text-primary">
                      <NumberFlow
                        format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                        value={(textTotalCost + imageTotalCost + videoTotalCost) * (1 + operationalOverheadPercentage / 100)} />
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
    </div>
  );
}