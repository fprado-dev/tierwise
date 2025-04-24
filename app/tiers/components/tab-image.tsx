'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { ProcessedTier } from "@/lib/tier.types";
import NumberFlow from "@number-flow/react";
import { Video } from "lucide-react";
import { useState } from "react";
import { SelectableModelCard } from "./selectable-model-card";

type TabImagesProps = {
  tier: ProcessedTier;
  setModelType: (modelType: "text" | "image" | "video") => void;
  getTypeColor: (modelType: string) => string;
};
export function TabImages({ getTypeColor, setModelType, tier }: TabImagesProps) {
  const [images, setImages] = useState<number>(100);
  const [marginPercentage, setMarginPercentage] = useState<number>(0);
  const [useExpensiveModel, setUseExpensiveModel] = useState(true);

  const getMostExpensiveModel = () => {
    return tier.models
      .filter(model => model.model_type === 'image')
      .reduce((prev, current) => {
        const prevCost = prev.cost_per_image || 0;
        const currentCost = current.cost_per_image || 0;
        return prevCost > currentCost ? prev : current;
      }, tier.models[0]);
  };

  const calculateBaseCost = () => {
    const imageModels = tier.models.filter(model => model.model_type === 'image');
    if (imageModels.length === 0) return 0;

    let baseCost = 0;
    if (useExpensiveModel) {
      const model = getMostExpensiveModel();
      baseCost = (model.cost_per_image || 0) * images;
    } else {
      baseCost = imageModels.reduce((total, model) => {
        return total + (model.cost_per_image || 0) * images;
      }, 0);
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
      <div className='grid grid-cols-6 gap-6'>
        <div className='col-span-3 space-y-4'>
          <div className='flex flex-col items-center justify-start'>
            <div className="flex w-full items-center justify-between">
              <h3 className='text-lg font-semibold'>Text Models</h3>
              <Button size="sm" variant="outline" onClick={() => setModelType("text")} className={`flex items-center gap-2 ${getTypeColor('text')}`}>
                <Video className="h-4 w-4" />
                Manage Models
              </Button>
            </div>
            <div>
              {tier.models.filter(model => model.model_type === 'image').length === 0 && (
                <div className="col-span-3 text-center py-8 text-muted-foreground">
                  No video models added to this tier yet
                </div>)
              }
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
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
          <div className='p-6 border-b'>
            <h3 className='text-lg font-semibold mb-4'>Cost Calculator</h3>
            <div className='space-y-4'>
              <div className='flex items-center gap-2 p-3 bg-muted rounded-lg'>
                <Checkbox
                  id="use-expensive"
                  checked={useExpensiveModel}
                  onCheckedChange={(checked) => setUseExpensiveModel(checked as boolean)}
                />
                <label htmlFor="use-expensive" className='text-sm font-medium'>Calculate based on most expensive model</label>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Number of Images</label>
                <Input
                  type="number"
                  value={images}
                  onChange={(e) => setImages(Number(e.target.value))}
                  placeholder="Enter number of images"
                  className="bg-background"
                />
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

          <div className='p-6'>
            <h3 className='text-lg font-semibold mb-4'>Cost Breakdown</h3>
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='p-4 bg-muted rounded-lg'>
                  <p className='text-sm text-muted-foreground mb-1'>Base Cost</p>
                  <p className='text-lg font-semibold'>
                    <NumberFlow
                      format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                      value={totalBaseCost} />
                  </p>
                </div>
                <div className='p-4 bg-muted rounded-lg'>
                  <p className='text-sm text-muted-foreground mb-1'>Profit Value</p>
                  <p className='text-lg font-semibold text-green-500'>
                    <NumberFlow
                      format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                      value={totalProfitValue} />
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='p-4 bg-muted rounded-lg'>
                  <p className='text-sm text-muted-foreground mb-1'>Models Count</p>
                  <p className='text-lg font-semibold'>{tier.models.filter(model => model.model_type === 'image').length}</p>
                </div>
                <div className='p-4 bg-muted rounded-lg'>
                  <p className='text-sm text-muted-foreground mb-1'>Margin {marginPercentage}</p>
                  <p className='text-lg font-semibold'>
                    <NumberFlow
                      format={{ style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 }}
                      value={marginPercentage / 100} />
                  </p>
                </div>
              </div>
              <div className='mt-6 p-4 bg-primary/5 rounded-lg'>
                <p className='text-sm text-muted-foreground mb-1'>Total Estimated Cost</p>
                <p className='text-2xl font-bold'>
                  <NumberFlow
                    format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                    value={totalCost} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}