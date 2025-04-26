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
import { SelectableModelCard } from "./selectable-model-card";

type TabImageProps = {
  tier: ProcessedTier;
  setModelType: (modelType: "text" | "image" | "video") => void;
  getTypeColor: (modelType: string) => string;
  imageCount: number;
  marginPercentage: number;
  useExpensiveModel: boolean;
  setImageCount: (count: number) => void;
  setMarginPercentage: (percentage: number) => void;
  setUseExpensiveModel: (use: boolean) => void;
  totalBaseCost: number;
  totalProfitValue: number;
  totalCost: number;
  getMostExpensiveModel: () => ProcessedTier['models'][0] | undefined;
};
export function TabImage({
  getTypeColor,
  setModelType,
  tier,
  imageCount,
  marginPercentage,
  useExpensiveModel,
  setImageCount,
  setMarginPercentage,
  setUseExpensiveModel,
  totalBaseCost,
  totalProfitValue,
  totalCost,
  getMostExpensiveModel
}: TabImageProps) {

  return (
    <TabsContent value="image" className="space-y-8">
      <div className='bg-card rounded-xl p-6 shadow-sm border'>
        <h3 className='text-xl font-semibold mb-6'>Cost Breakdown</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='p-6 bg-primary/5 rounded-xl transition-all hover:bg-primary/10'>
            <p className='text-sm font-medium text-muted-foreground mb-2'>Total Estimated Cost</p>
            <p className='text-3xl font-bold text-primary'>
              <NumberFlow
                format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                value={totalCost} />
            </p>
          </div>
          <div className='p-6 bg-primary/5 rounded-xl transition-all hover:bg-primary/10'>
            <p className='text-sm font-medium text-muted-foreground mb-2'>Base Cost</p>
            <p className='text-3xl font-bold text-primary'>
              <NumberFlow
                format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                value={totalBaseCost} />
            </p>
          </div>
          <div className='p-6 bg-primary/5 rounded-xl transition-all hover:bg-primary/10'>
            <p className='text-sm font-medium text-muted-foreground mb-2'>Profit Value</p>
            <p className='text-3xl font-bold text-green-500'>
              <NumberFlow
                format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                value={totalProfitValue} />
            </p>
          </div>
          <div className='p-6 bg-primary/5 rounded-xl transition-all hover:bg-primary/10'>
            <p className='text-sm font-medium text-muted-foreground mb-2'>Margin Profit</p>
            <p className='text-3xl font-bold text-primary'>
              <NumberFlow
                format={{ style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 }}
                value={marginPercentage / 100} />
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-card rounded-xl p-6 shadow-sm border space-y-6'>
          <div className='flex items-center justify-between'>
            <h3 className='text-xl font-semibold'>Image Models</h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setModelType("image")}
              className={`flex items-center gap-2 transition-colors ${getTypeColor('image')}`}
            >
              <Video className="h-4 w-4" />
              Manage Models
            </Button>
          </div>

          {tier.models.filter(model => model.model_type === 'image').length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-muted/50 rounded-lg">
              No image models added to this tier yet
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
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
          )}
        </div>

        <div className='bg-card rounded-xl p-6 shadow-sm border'>
          <div className="flex items-center gap-2 mb-6">
            <h3 className='text-xl font-semibold'>Cost Calculator</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p className="font-medium">Costs are calculated based on your model selection preference:</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      Most expensive model: Uses the highest cost model for calculation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      Average model cost: Calculates using the average cost across all models
                    </li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className='space-y-6'>
            <div className='flex items-center gap-3 p-4 bg-primary/5 rounded-xl transition-all hover:bg-primary/10'>
              <Checkbox
                id="use-expensive"
                checked={useExpensiveModel}
                onCheckedChange={(checked) => setUseExpensiveModel(checked as boolean)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label htmlFor="use-expensive" className='font-medium'>
                Calculate based on most expensive model
              </label>
            </div>

            <div className='space-y-2'>
              <label className='font-medium'>Number of Images</label>
              <Input
                type="number"
                value={imageCount}
                onChange={(e) => setImageCount(Number(e.target.value))}
                placeholder="Enter number of images"
                className="bg-background focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className='space-y-2'>
              <label className='font-medium'>Margin Percentage</label>
              <Input
                type="number"
                value={marginPercentage}
                onChange={(e) => setMarginPercentage(Number(e.target.value))}
                placeholder="Enter margin percentage"
                className="bg-background focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}