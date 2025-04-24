'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { ModelType } from '@/lib/model.types';
import { Model } from '@/lib/supabase/model.service';
import { Check } from 'lucide-react';

interface SelectableModelCardProps {
  model: {
    id: string;
    model_name: string;
    model_type: ModelType;
    is_public: boolean;
    created_at: string;
    input_cost_per_million?: number;
    output_cost_per_million?: number;
    cost_per_image?: number;
    cost_per_second?: number;
    price_per_sec?: number;
    price_per_hour?: number;
    gpu_count?: number;
  };
  isSelected: boolean;
  onSelect: (model: any) => void;
  isDefault?: boolean;
  isLoading?: boolean;
}

export function SelectableModelCard({ model, isSelected, onSelect, isDefault = false, isLoading = false }: SelectableModelCardProps) {

  const getCostDisplay = (model: Partial<Model>) => {
    switch (model.model_type) {
      case 'text':
        return (
          <div className="text-xs text-muted-foreground">
            <div>${model.input_cost_per_million}/1M Input tokens</div>
            <div>${model.output_cost_per_million}/1M Output tokens</div>
          </div>
        );
      case 'image':
        return <div className="text-xs text-muted-foreground">${model.cost_per_image}/image</div>;
      case 'video':
      case 'audio':
        return <div className="text-xs text-muted-foreground">${model.cost_per_second}/second</div>;
      case 'hardware':
        return (
          <div className="text-xs text-muted-foreground">
            <div>${model.price_per_sec}/second</div>
            <div>{model.cpu_multiplier} Multiplier</div>
            {<div>{model.gpu_count} GPU(s)</div>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      key={model.id}
      className={`w-full min-h-32 flex flex-col justify-between gap-2 p-0 hover:shadow-md transition-shadow bg-sidebar relative cursor-pointer ${isSelected ? 'ring-2 ring-primary' : ''} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !isLoading && onSelect(model)}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
      <CardHeader>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-sm text-primary mb-2">{model.model_name}</h3>
          {getCostDisplay(model)}
        </div>
      </CardHeader>
    </Card>
  );
}