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

type TabTextProps = {
  tier: ProcessedTier;
  setModelType: (modelType: "text" | "image" | "video") => void;
  getTypeColor: (modelType: string) => string;
  inputTokens: number;
  outputTokens: number;
  marginPercentage: number;
  useExpensiveModel: boolean;
  setInputTokens: (inputTokens: number) => void;
  setOutputTokens: (outputTokens: number) => void;
  setMarginPercentage: (marginPercentage: number) => void;
  setUseExpensiveModel: (useExpensiveModel: boolean) => void;
  totalBaseCost: number;
  totalProfitValue: number;
  totalCost: number;
  getMostExpensiveModel: () => ProcessedTier['models'][0] | undefined;

};
export function TabText({ tier, getTypeColor, setModelType, inputTokens,
  outputTokens,
  marginPercentage,
  useExpensiveModel,
  setInputTokens,
  setOutputTokens,
  setMarginPercentage,
  setUseExpensiveModel,
  totalBaseCost,
  totalProfitValue,
  totalCost,
  getMostExpensiveModel, }: TabTextProps) {

  return (
    <TabsContent value="text" className="space-y-4">
      <div className='bg-card rounded-xl p-6 shadow-sm border'>
        <div className="flex gap-2 items-center mb-4">

          <h3 className='text-xl md:text-base font-semibold'>Cost Breakdown</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md p-4">
                <p className="text-xs">
                  Costs are calculated based on your model selection preference!
                </p>

              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='px-4  py-6 flex items-center justify-center flex-col bg-primary/5 rounded-xl transition-all hover:bg-primary/10'>
            <p className='text-3xl font-bold text-primary'>
              <NumberFlow
                format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                value={totalCost} />
            </p>
            <p className='text-sm md:text-xs font-medium text-muted-foreground mb-2'>Total Estimated Cost</p>
          </div>
          <div className='px-4  py-6 flex items-center justify-center flex-col bg-primary/5 rounded-xl transition-all hover:bg-primary/10'>
            <p className='text-3xl font-bold text-primary'>
              <NumberFlow
                format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                value={totalBaseCost} />
            </p>
            <p className='text-sm md:text-xs font-medium text-muted-foreground mb-2'>Base Cost</p>
          </div>
          <div className='px-4  py-6 flex items-center justify-center flex-col bg-primary/5 rounded-xl transition-all hover:bg-primary/10'>
            <p className='text-3xl font-bold text-green-500'>
              <NumberFlow
                format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                value={totalProfitValue} />
            </p>
            <p className='text-sm md:text-xs font-medium text-muted-foreground mb-2'>Profit Value</p>
          </div>
          <div className='px-4 py-6 flex items-center justify-center flex-col bg-primary/5 rounded-xl transition-all hover:bg-primary/10'>
            <p className='text-3xl font-bold text-primary'>
              <NumberFlow
                format={{ style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 }}
                value={marginPercentage / 100} />
            </p>
            <p className='text-sm md:text-xs font-medium text-muted-foreground mb-2'>Margin Profit</p>
          </div>
        </div>
      </div>
      <div className='bg-card rounded-xl p-6 shadow-sm border'>
        <div className="flex items-center gap-2 mb-6">
          <h3 className='text-xl md:text-base font-semibold'>Cost Calculator</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md p-4">
                <p className="font-black text-xs">Costs are calculated based on your model selection preference:</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-center gap-2 text-xs">
                    Most expensive model: Uses the highest cost model for calculation
                  </li>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <li className="flex items-center gap-2 text-xs">
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
            <label htmlFor="use-expensive" className='font-medium md:text-xs'>
              Calculate based on most expensive model
            </label>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <label className='font-medium md:text-xs'>Input Tokens</label>
              <Input
                type="number"
                value={inputTokens}
                onChange={(e) => setInputTokens(Number(e.target.value))}
                placeholder="Enter input tokens"
                className="bg-background focus:ring-2 focus:ring-primary/20 md:text-xs"
              />
            </div>
            <div className='space-y-2'>
              <label className='font-medium md:text-xs'>Output Tokens</label>
              <Input
                type="number"
                value={outputTokens}
                onChange={(e) => setOutputTokens(Number(e.target.value))}
                placeholder="Enter output tokens"
                className="bg-background focus:ring-2 focus:ring-primary/20 md:text-xs"
              />
            </div>
            <div className='space-y-2'>
              <label className='font-medium md:text-xs'>Margin Percentage</label>
              <Input
                type="number"
                value={marginPercentage}
                onChange={(e) => setMarginPercentage(Number(e.target.value))}
                placeholder="Enter margin percentage"
                className="bg-background focus:ring-2 focus:ring-primary/20 md:text-xs"
              />
            </div>
          </div>


        </div>
      </div>
      <div className='bg-card rounded-xl p-6 shadow-sm border space-y-6'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl  md:text-base font-semibold'>Text Models</h3>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setModelType("text")}
            className={`flex items-center gap-2 transition-colors ${getTypeColor('text')}`}
          >
            <Video className="h-4 w-4" />
            Manage Models
          </Button>
        </div>

        {tier.models.filter(model => model.model_type === 'text').length === 0 ? (
          <div className="text-center md:text-sm text-muted-foreground rounded-lg">
            No text models added to this tier yet
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-4 md:grid-cols-3 auto-rows-fr">
            {tier.models
              .filter(model => model.model_type === 'text')
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


    </TabsContent>
  );
}