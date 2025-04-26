'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProcessedTier } from "@/lib/tier.types";
import NumberFlow from "@number-flow/react";
import { Info, Video } from "lucide-react";
import { useState } from "react";
import { SelectableModelCard } from "./selectable-model-card";

type TabImageProps = {
  tier: ProcessedTier;
  setModelType: (modelType: "text" | "image" | "video") => void;
  getTypeColor: (modelType: string) => string;
};
export function TabImage({ getTypeColor, setModelType, tier }: TabImageProps) {
  const [imageCount, setImageCount] = useState<number>(100);
  const [marginPercentage, setMarginPercentage] = useState<number>(0);
  const [useExpensiveModel, setUseExpensiveModel] = useState(true);

  const getMostExpensiveModel = () => {
    return tier.models
      .filter(model => model.model_type === 'image')
      .reduce((prev, current) => {
        const prevCost = (prev.cost_per_image || 0);
        const currentCost = (current.cost_per_image || 0);
        return prevCost > currentCost ? prev : current;
      }, tier.models[0]);
  };

  const calculateBaseCost = () => {
    const textModels = tier.models.filter(model => model.model_type === 'image');
    if (textModels.length === 0) return 0;

    let baseCost = 0;
    if (useExpensiveModel) {
      const model = getMostExpensiveModel();
      const imageCost = model.cost_per_image! * imageCount;
      baseCost = imageCost;
    } else {
      // Calculate average cost per token across all models (excluding most expensive)
      const sortedModels = textModels.sort((a, b) => {
        const aCost = (a.cost_per_image || 0);
        const bCost = (b.cost_per_image || 0);
        return bCost - aCost;
      });
      const remainingModels = sortedModels;
      if (remainingModels.length === 0) {
        const model = sortedModels[0];
        const inputCost = model.cost_per_image! * imageCount;
        baseCost = inputCost;
      } else {
        const avgImageCost = remainingModels.reduce((sum, model) => sum + (model.cost_per_image || 0), 0) / remainingModels.length;
        baseCost = avgImageCost * imageCount;
      }
    }
    return baseCost;
  };

  const calculateProfitValue = (baseCost: number) => {
    return baseCost * (marginPercentage / 100);
  };

  const calculateTotalCost = (baseCost: number, profitValue: number) => {
    return baseCost + profitValue;
  };

  const totalBaseCost = calculateBaseCost();
  const totalProfitValue = calculateProfitValue(totalBaseCost);
  const totalCost = calculateTotalCost(totalBaseCost, totalProfitValue);

  return (
    <TabsContent value="image">
      <div className='py-4'>
        <h3 className='text-lg font-semibold mb-4'>Cost Breakdown</h3>
        <div className='space-y-4'>
          <div className='grid grid-cols-4 gap-6'>
            <div className='p-4 bg-muted rounded-lg'>
              <p className='text-sm text-muted-foreground mb-1'>Total Estimated Cost</p>
              <p className='text-2xl font-bold'>
                <NumberFlow
                  format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                  value={totalCost} />
              </p>
            </div>
            <div className='p-4 bg-muted rounded-lg'>
              <p className='text-sm text-muted-foreground mb-1'>Base Cost</p>
              <p className='text-2xl font-bold'>
                <NumberFlow
                  format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                  value={totalBaseCost} />
              </p>
            </div>
            <div className='p-4 bg-muted rounded-lg'>
              <p className='text-sm text-muted-foreground mb-1'>Profit Value</p>
              <p className='text-2xl font-bold text-green-400'>
                <NumberFlow
                  format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                  value={totalProfitValue} />
              </p>
            </div>
            <div className='p-4 bg-muted rounded-lg'>
              <p className='text-sm text-muted-foreground mb-1'>Margin Profit</p>
              <p className='text-lg font-semibold'>
                <NumberFlow
                  format={{ style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 }}
                  value={marginPercentage / 100} />
              </p>
            </div>

          </div>


        </div>
      </div>
      <div className='grid grid-cols-6 gap-6'>
        <div
          className='col-span-3 space-y-4 border rounded-lg bg-card p-6' >
          <div className='flex flex-col  items-center justify-start'>
            <div className="flex w-full items-center justify-between">
              <h3 className='text-lg font-semibold'>Image Models</h3>
              <Button size="sm" variant="outline" onClick={() => setModelType("image")} className={`flex items-center gap-2 ${getTypeColor('image')}`}>
                <Video className="h-4 w-4" />
                Manage Models
              </Button>
            </div>
            <div>
              {tier.models.filter(model => model.model_type === 'image').length === 0 && (
                <div className="col-span-3 text-center py-8 text-muted-foreground">
                  No image models added to this tier yet
                </div>)
              }
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            {tier.models
              .filter(model => model.model_type === 'image')
              .map(model => {
                const isExpensiveModel = useExpensiveModel && model.id === getMostExpensiveModel()?.id;
                return (
                  <SelectableModelCard
                    key={model.id}
                    model={model}
                    isSelected={isExpensiveModel}
                    onSelect={() => { }}
                    isDefault
                  />
                );
              })
            }
          </div>
        </div>

        <div className='col-span-3 border rounded-lg bg-card'>
          <div className='p-6'>
            <div className="flex items-center gap-2 mb-4">
              <h3 className='text-lg font-semibold'>Cost Calculator</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Costs are calculated based on your model selection preference:</p>
                    <ul className="mt-2 text-sm">
                      <li>• Most expensive model: Uses the highest cost model for calculation</li>
                      <li>• Average model cost: Calculates using the average cost across all models</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center gap-2 p-3 bg-muted rounded-lg'>
                <Checkbox
                  id="use-expensive"
                  checked={useExpensiveModel}
                  onCheckedChange={(checked) => setUseExpensiveModel(checked as boolean)}
                />
                <label htmlFor="use-expensive" className='text-sm font-medium'>Calculate based on most expensive model</label>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Images</label>
                  <Input
                    type="number"
                    value={imageCount}
                    onChange={(e) => setImageCount(Number(e.target.value))}
                    placeholder="Enter input tokens"
                    className="bg-background"
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Margin Percentage</label>
                <Input
                  type="number"
                  value={marginPercentage}
                  onChange={(e) => setMarginPercentage(Number(e.target.value))}
                  placeholder="Enter margin percentage"
                  className="bg-background"
                />
              </div>
            </div>
          </div>


        </div>
      </div>

    </TabsContent>
  );
}