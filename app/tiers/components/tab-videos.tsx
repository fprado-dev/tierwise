'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { ProcessedTier } from "@/lib/tier.types";
import { Video } from "lucide-react";
import { useState } from "react";
import { SelectableModelCard } from "./selectable-model-card";

type TabVideosProps = {
  tier: ProcessedTier;
  setModelType: (modelType: "text" | "image" | "video") => void;
  getTypeColor: (modelType: string) => string;
};
export function TabVideos({ getTypeColor, setModelType, tier }: TabVideosProps) {
  const [seconds, setSeconds] = useState<number>(15);
  const [marginPercentage, setMarginPercentage] = useState<number>(0);
  const [useExpensiveModel, setUseExpensiveModel] = useState(true);

  const getMostExpensiveModel = () => {
    return tier.models
      .filter(model => model.model_type === 'video')
      .reduce((prev, current) => {
        const prevCost = prev.cost_per_second || 0;
        const currentCost = current.cost_per_second || 0;
        return prevCost > currentCost ? prev : current;
      }, tier.models[0]);
  };

  const calculateCost = () => {
    const videoModels = tier.models.filter(model => model.model_type === 'video');
    if (videoModels.length === 0) return 0;

    let baseCost = 0;
    if (useExpensiveModel) {
      const model = getMostExpensiveModel();
      baseCost = (model.cost_per_second || 0) * seconds;
    } else {
      baseCost = videoModels.reduce((total, model) => {
        return total + (model.cost_per_second || 0) * seconds;
      }, 0);
    }

    const margin = baseCost * (marginPercentage / 100);
    return baseCost + margin;
  };

  return (
    <TabsContent value="video">
      {tier.models.filter(model => model.model_type === 'video').length === 0 && (
        <div className="col-span-3 text-center py-8 text-muted-foreground">
          No video models added to this tier yet
        </div>)
      }
      <div className='grid grid-cols-6 gap-6'>
        <div className='col-span-3 space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold'>Video Models</h3>
            <Button size="sm" variant="outline" onClick={() => setModelType("video")} className={`flex items-center gap-2 ${getTypeColor('video')}`}>
              <Video className="h-4 w-4" />
              Manage Models
            </Button>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {tier.models
              .filter(model => model.model_type === 'video')
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
                <label className='text-sm font-medium'>Duration (seconds)</label>
                <Input
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(Number(e.target.value))}
                  placeholder="Enter duration in seconds"
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
                  <p className='text-lg font-semibold'>${calculateCost().toFixed(4)}</p>
                </div>
                <div className='p-4 bg-muted rounded-lg'>
                  <p className='text-sm text-muted-foreground mb-1'>Profit Value</p>
                  <p className='text-lg font-semibold'>${(calculateCost() * (marginPercentage / 100)).toFixed(4)}</p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='p-4 bg-muted rounded-lg'>
                  <p className='text-sm text-muted-foreground mb-1'>Models Count</p>
                  <p className='text-lg font-semibold'>{tier.models.filter(model => model.model_type === 'video').length}</p>
                </div>
                <div className='p-4 bg-muted rounded-lg'>
                  <p className='text-sm text-muted-foreground mb-1'>Margin</p>
                  <p className='text-lg font-semibold'>{marginPercentage}%</p>
                </div>
              </div>
              <div className='mt-6 p-4 bg-primary/5 rounded-lg'>
                <p className='text-sm text-muted-foreground mb-1'>Total Estimated Cost</p>
                <p className='text-2xl font-bold'>${(calculateCost() * (1 + marginPercentage / 100)).toFixed(4)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}