'use client';

import { useImageModelCalculator } from '@/app/hooks/useImageModelCalculator';
import { useTextModelCalculator } from '@/app/hooks/useTextModelCalculator';
import { useVideoModelCalculator } from '@/app/hooks/useVideoModelCalculator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTiers } from '@/hooks/useTiers';
import { useTierSummary } from '@/hooks/useTierSummary';
import { ProcessedTier } from '@/lib/tier.types';
import NumberFlow from '@number-flow/react';
import { CogIcon, PencilLineIcon, SaveIcon, TrashIcon } from 'lucide-react';
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { deleteTier, updateTier } = useTiers();
  const { summary, isLoading, saveSummary } = useTierSummary(tier.id);

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




  // Load summary data when component mounts
  useEffect(() => {
    if (summary) {
      // Populate text model calculator fields
      setInputTokens(summary.input_tokens);
      setOutputTokens(summary.output_tokens);
      setTextMarginPercentage(summary.text_margin_percentage);
      setTextUseExpensiveModel(summary.text_use_expensive_model);

      // Populate image model calculator fields
      setImageCount(summary.image_count);
      setImageMarginPercentage(summary.image_margin_percentage);
      setImageUseExpensiveModel(summary.image_use_expensive_model);

      // Populate video model calculator fields
      setVideoSeconds(summary.video_seconds);
      setVideoMarginPercentage(summary.video_margin_percentage);
      setVideoUseExpensiveModel(summary.video_use_expensive_model);

      // Reset unsaved changes flag when loading from summary
      setHasUnsavedChanges(false);
    }
  }, [summary, setInputTokens, setOutputTokens, setTextMarginPercentage, setTextUseExpensiveModel,
    setImageCount, setImageMarginPercentage, setImageUseExpensiveModel,
    setVideoSeconds, setVideoMarginPercentage, setVideoUseExpensiveModel]);

  const handleSummary = () => {
    // Save summary data when showing the summary
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
      operational_overhead_percentage: 0,
    });
    setHasUnsavedChanges(false);
  };

  // Track changes in calculator values
  useEffect(() => {
    if (summary) {
      const hasTextChanges =
        inputTokens !== summary.input_tokens ||
        outputTokens !== summary.output_tokens ||
        textMarginPercentage !== summary.text_margin_percentage ||
        textUseExpensiveModel !== summary.text_use_expensive_model;

      const hasImageChanges =
        imageCount !== summary.image_count ||
        imageMarginPercentage !== summary.image_margin_percentage ||
        imageUseExpensiveModel !== summary.image_use_expensive_model;

      const hasVideoChanges =
        videoSeconds !== summary.video_seconds ||
        videoMarginPercentage !== summary.video_margin_percentage ||
        videoUseExpensiveModel !== summary.video_use_expensive_model;

      setHasUnsavedChanges(hasTextChanges || hasImageChanges || hasVideoChanges);
    }
  }, [summary, inputTokens, outputTokens, textMarginPercentage, textUseExpensiveModel,
    imageCount, imageMarginPercentage, imageUseExpensiveModel,
    videoSeconds, videoMarginPercentage, videoUseExpensiveModel]);


  const hasTextModel = tier.models.some(model => model.model_type === 'text');
  const hasImageModel = tier.models.some(model => model.model_type === 'image');
  const hasVideoModel = tier.models.some(model => model.model_type === 'video');
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
              size="icon"
              variant={hasUnsavedChanges ? "default" : "outline"}
              onClick={handleSummary}
              className={`${hasUnsavedChanges
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse'
                : 'hover:bg-sidebar-foreground/90 bg-sidebar hover:text-white text-primary'} transition-colors relative`}
              title={hasUnsavedChanges ? "You have unsaved changes" : "Save changes"}
            >
              <SaveIcon className='h-4 w-4' />
              {hasUnsavedChanges && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setModelType('text')}
              className='hover:bg-primary/10 hover:text-primary transition-colors'
            >
              <CogIcon className='h-4 w-4' />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className='hover:bg-primary/10 hover:text-primary transition-colors'
              onClick={() => setEditSheetopen(prev => !prev)}
            >
              <PencilLineIcon className='h-4 w-4' />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              className='hover:bg-destructive/10 hover:text-destructive transition-colors'
              onClick={() => setIsDeleteConfirmOpen(true)}
            >
              <TrashIcon className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardHeader>
      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        onConfirm={() => deleteTier(tier.id)}
        title="Delete Tier"
        description="Are you sure you want to delete this tier? This action cannot be undone."
        confirmText="Delete"
      />
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
        {(!hasTextModel && !hasImageModel && !hasVideoModel) ? (

          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="rounded-full bg-muted p-3 mb-4">
              <CogIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-1">No models found</h3>
            <p className="text-muted-foreground max-w-md">
              Add models to your tier to get started.
            </p>
          </div>
        ) : (


          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {hasTextModel && <TabsTrigger value="text" >Text</TabsTrigger>}
              {hasImageModel && <TabsTrigger value="image">Image</TabsTrigger>}
              {hasVideoModel && <TabsTrigger value="video" >Video</TabsTrigger>}
            </TabsList>
            <TabsContent value="text">
              {hasTextModel && (
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


              )}
            </TabsContent>
            <TabsContent value="image">
              {hasImageModel && (
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



              )}
            </TabsContent>
            <TabsContent value="video">
              {hasVideoModel && (
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

              )}
            </TabsContent>
          </Tabs>)}
      </CardContent>


    </div >
  );
};