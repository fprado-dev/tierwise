'use client';

import { useImageModelCalculator } from "@/app/hooks/useImageModelCalculator";
import { useTextModelCalculator } from "@/app/hooks/useTextModelCalculator";
import { useVideoModelCalculator } from "@/app/hooks/useVideoModelCalculator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { ProcessedTier } from "@/lib/tier.types";
import NumberFlow from "@number-flow/react";
import { useState } from "react";

type ModelCalculatorSheetProps = {
  tier: ProcessedTier;
  isOpen: boolean;
  modelType: 'text' | 'image' | 'video';
  onOpenChange: (open: boolean) => void;
};

export function ModelCalculatorSheet({ tier, isOpen, modelType, onOpenChange }: ModelCalculatorSheetProps) {
  // Separate hooks and state for each model type
  // TEXT
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
  } = useTextModelCalculator(tier);

  // For syncing margin input and slider for text
  const [textMarginInput, setTextMarginInput] = useState(textMarginPercentage);
  const handleTextMarginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (isNaN(value)) value = 0;
    value = Math.max(0, Math.min(100, value));
    setTextMarginInput(value);
    setTextMarginPercentage(value);
  };
  const handleTextMarginSlider = (value: number) => {
    setTextMarginInput(value);
    setTextMarginPercentage(value);
  };

  // IMAGE
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
  } = useImageModelCalculator(tier);

  const [imageMarginInput, setImageMarginInput] = useState(imageMarginPercentage);
  const handleImageMarginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (isNaN(value)) value = 0;
    value = Math.max(0, Math.min(100, value));
    setImageMarginInput(value);
    setImageMarginPercentage(value);
  };
  const handleImageMarginSlider = (value: number) => {
    setImageMarginInput(value);
    setImageMarginPercentage(value);
  };

  // VIDEO
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
  } = useVideoModelCalculator(tier);

  const [videoMarginInput, setVideoMarginInput] = useState(videoMarginPercentage);
  const handleVideoMarginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (isNaN(value)) value = 0;
    value = Math.max(0, Math.min(100, value));
    setVideoMarginInput(value);
    setVideoMarginPercentage(value);
  };
  const handleVideoMarginSlider = (value: number) => {
    setVideoMarginInput(value);
    setVideoMarginPercentage(value);
  };

  // Title and model presence
  const getTitle = () => `${modelType.charAt(0).toUpperCase() + modelType.slice(1)} Model Calculator`;
  const hasModels = tier.models.filter(model => model.model_type === modelType).length > 0;

  // Brand input style
  const inputClass = "w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-base transition";

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[500px] sm:max-w-full overflow-y-auto bg-white">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-brand">{getTitle()}</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Calculate costs and set margins for your <span className="capitalize">{modelType}</span> models.
          </SheetDescription>
        </SheetHeader>

        {!hasModels ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-8">
            <h3 className="font-semibold text-lg mb-1 text-brand">
              No {modelType} models found
            </h3>
            <p className="text-muted-foreground max-w-md">
              Add {modelType} models to this tier to use the calculator.
            </p>
          </div>
        ) : (
          <div className="py-6 space-y-8">
            {/* TEXT MODEL */}
            {modelType === 'text' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="inputTokens" className="mb-1 block">Input Tokens</Label>
                  <Input
                    id="inputTokens"
                    type="number"
                    className={inputClass}
                    value={inputTokens}
                    min={0}
                    onChange={(e) => setInputTokens(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="outputTokens" className="mb-1 block">Output Tokens</Label>
                  <Input
                    id="outputTokens"
                    type="number"
                    className={inputClass}
                    value={outputTokens}
                    min={0}
                    onChange={(e) => setOutputTokens(Number(e.target.value))}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="textMargin" className="block">Margin Percentage</Label>
                    <span className="text-sm text-brand font-medium">{textMarginInput}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      id="textMargin"
                      type="number"
                      className="w-20 px-2 py-1 rounded border border-gray-200 focus:border-brand focus:ring-brand"
                      min={0}
                      max={100}
                      value={textMarginInput}
                      onChange={handleTextMarginInput}
                    />
                    <Slider
                      value={[textMarginInput]}
                      onValueChange={(v) => handleTextMarginSlider(v[0])}
                      max={100}
                      step={1}
                      className="flex-1 ml-2"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="textUseExpensiveModel"
                    checked={textUseExpensiveModel}
                    onCheckedChange={(checked) => setTextUseExpensiveModel(!!checked)}
                    className="accent-brand"
                  />
                  <Label htmlFor="textUseExpensiveModel">
                    Use most expensive model for calculation
                  </Label>
                </div>
              </div>
            )}

            {/* IMAGE MODEL */}
            {modelType === 'image' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="imageCount" className="mb-1 block">Number of Images</Label>
                  <Input
                    id="imageCount"
                    type="number"
                    className={inputClass}
                    value={imageCount}
                    min={0}
                    onChange={(e) => setImageCount(Number(e.target.value))}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="imageMargin" className="block">Margin Percentage</Label>
                    <span className="text-sm text-brand font-medium">{imageMarginInput}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      id="imageMargin"
                      type="number"
                      className="w-20 px-2 py-1 rounded border border-gray-200 focus:border-brand focus:ring-brand"
                      min={0}
                      max={100}
                      value={imageMarginInput}
                      onChange={handleImageMarginInput}
                    />
                    <Slider
                      value={[imageMarginInput]}
                      onValueChange={(v) => handleImageMarginSlider(v[0])}
                      max={100}
                      step={1}
                      className="flex-1 ml-2"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="imageUseExpensiveModel"
                    checked={imageUseExpensiveModel}
                    onCheckedChange={(checked) => setImageUseExpensiveModel(!!checked)}
                    className="accent-brand"
                  />
                  <Label htmlFor="imageUseExpensiveModel">
                    Use most expensive model for calculation
                  </Label>
                </div>
              </div>
            )}

            {/* VIDEO MODEL */}
            {modelType === 'video' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="videoSeconds" className="mb-1 block">Video Duration (seconds)</Label>
                  <Input
                    id="videoSeconds"
                    type="number"
                    className={inputClass}
                    value={videoSeconds}
                    min={0}
                    onChange={(e) => setVideoSeconds(Number(e.target.value))}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="videoMargin" className="block">Margin Percentage</Label>
                    <span className="text-sm text-brand font-medium">{videoMarginInput}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      id="videoMargin"
                      type="number"
                      className="w-20 px-2 py-1 rounded border border-gray-200 focus:border-brand focus:ring-brand"
                      min={0}
                      max={100}
                      value={videoMarginInput}
                      onChange={handleVideoMarginInput}
                    />
                    <Slider
                      value={[videoMarginInput]}
                      onValueChange={(v) => handleVideoMarginSlider(v[0])}
                      max={100}
                      step={1}
                      className="flex-1 ml-2"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="videoUseExpensiveModel"
                    checked={videoUseExpensiveModel}
                    onCheckedChange={(checked) => setVideoUseExpensiveModel(!!checked)}
                    className="accent-brand"
                  />
                  <Label htmlFor="videoUseExpensiveModel">
                    Use most expensive model for calculation
                  </Label>
                </div>
              </div>
            )}

            {/* RESULTS */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="font-semibold text-lg text-brand">
                Cost Breakdown
              </h4>
              <div className="grid grid-cols-2 gap-2 text-base">
                <div className="text-gray-400">Base Cost:</div>
                <div className="font-medium text-right">
                  <NumberFlow
                    value={
                      modelType === 'text'
                        ? textTotalBaseCost
                        : modelType === 'image'
                          ? imageTotalBaseCost
                          : videoTotalBaseCost
                    }
                    format={{
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2, trailingZeroDisplay: 'stripIfInteger'
                    }}
                  />
                </div>
                <div className="text-gray-400">Profit Margin:</div>
                <div className="font-medium text-right">
                  <NumberFlow
                    value={
                      modelType === 'text'
                        ? textTotalProfitValue
                        : modelType === 'image'
                          ? imageTotalProfitValue
                          : videoTotalProfitValue
                    }
                    format={{
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 3, trailingZeroDisplay: 'stripIfInteger'
                    }}
                  />
                </div>
                <div className="font-bold">Total Cost:</div>
                <div className="font-bold text-right text-brand">
                  <NumberFlow
                    value={
                      modelType === 'text'
                        ? textTotalCost
                        : modelType === 'image'
                          ? imageTotalCost
                          : videoTotalCost
                    }
                    format={{
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2, trailingZeroDisplay: 'stripIfInteger'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <SheetFooter className="pt-6">
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-brand text-white hover:bg-brand/90"
          >
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
