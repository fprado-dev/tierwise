'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Model } from '@/lib/supabase/model.service';
import { Check, DollarSign } from 'lucide-react';

interface SelectableModelCardProps {
  model: Model;
  isSelected: boolean;
  onSelect: (model: any) => void;
  isDefault?: boolean;
  isLoading?: boolean;
}

export function SelectableModelCard({ model, isSelected, onSelect, isDefault = false, isLoading = false }: SelectableModelCardProps) {


  // Get model specifications based on type


  // Get pricing information
  const getPricingInfo = () => {
    switch (model.model_type) {
      case 'text':
        return (
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-medium">${model.input_cost_per_million}/1M input tokens</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-medium">${model.output_cost_per_million}/1M output tokens</span>
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="flex items-center gap-1 mt-2">
            <DollarSign className="w-3 h-3 text-emerald-500" />
            <span className="text-xs font-medium">${model.cost_per_image}/image</span>
          </div>
        );
      case 'video':
      case 'audio':
        return (
          <div className="flex items-center gap-1 mt-2">
            <DollarSign className="w-3 h-3 text-emerald-500" />
            <span className="text-xs font-medium">${model.cost_per_second}/second</span>
          </div>
        );
      case 'hardware':
        return (
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-medium">${model.price_per_sec}/second</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-medium">${model.price_per_hour}/hour</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            key={model.id}
            className={`w-full h-full flex flex-col justify-between hover:shadow-md transition-all bg-sidebar relative cursor-pointer ${isLoading ? 'opacity-70 pointer-events-none' : ''
              } ${isSelected ? 'ring-2 ring-primary border-primary' : 'hover:border-primary/50'}`}
            onClick={() => !isLoading && onSelect(model)}
          >
            {isSelected && (
              <div className="absolute top-2 right-2 bg-primary rounded-full p-1 z-10">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}

            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm line-clamp-1">{model.model_name}</h3>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-2 pt-0">
              {getPricingInfo()}
            </CardContent>

            <CardFooter className="pt-0 flex justify-between items-center">

              <Badge variant="default" className="text-[10px]">
                {model.is_custom ? "Custom Model" : "Public Model"}
              </Badge>


            </CardFooter>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to {isSelected ? 'deselect' : 'select'} this model</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
