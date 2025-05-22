'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Model } from '@/lib/supabase/model.service';
import { CheckCircle2, DollarSign } from 'lucide-react';

interface SelectableModelCardProps {
  model: Model;
  isSelected: boolean;
  onSelect: (model: any) => void;
  isDefault?: boolean;
  isLoading?: boolean;
}

export function SelectableModelCard({ model, isSelected, onSelect, isLoading = false }: SelectableModelCardProps) {


  // Get model specifications based on type


  // Get pricing information
  const getPricingInfo = () => {
    switch (model.model_type) {
      case 'text':
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-medium text-muted-foreground">${model.input_cost_per_million}/1M input tokens</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-medium text-muted-foreground">${model.output_cost_per_million}/1M output tokens</span>
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="flex items-center gap-1 mt-2">
            <DollarSign className="w-3 h-3 text-emerald-500" />
            <span className="text-xs font-medium text-muted-foreground">${model.cost_per_image}/image</span>
          </div>
        );
      case 'video':
      case 'audio':
        return (
          <div className="flex items-center gap-1 mt-2">
            <DollarSign className="w-3 h-3 text-emerald-500" />
            <span className="text-xs font-medium text-muted-foreground">${model.cost_per_second}/second</span>
          </div>
        );
      case 'hardware':
        return (
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-medium text-muted-foreground">${model.price_per_sec}/second</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-medium text-muted-foreground">${model.price_per_hour}/hour</span>
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
            className={`
              w-full h-full flex flex-col justify-between  gap-2
              transition-all 
              bg-sidebar relative cursor-pointer 
              `}
            onClick={() => !isLoading && onSelect(model)}
          >


            <CardHeader className='p-0'>
              <div className='p-4 flex items-center justify-between w-full gap-2'>
                <Badge variant="default" className="text-[10px] bg-brand">
                  {model.is_custom ? "Custom Model" : "Public Model"}
                </Badge>


                <CheckCircle2 className={`w-6 h-6 font-semibold ${isSelected ? "text-brand" : "text-brand/20"}`} />

              </div>
            </CardHeader>

            <CardContent className="p-0 px-4 ">
              {getPricingInfo()}
            </CardContent>
            <CardFooter className='p-4 border-t mt-2'>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm line-clamp-1  text-brand">{model.model_name}</h3>
                </div>
              </div>
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
