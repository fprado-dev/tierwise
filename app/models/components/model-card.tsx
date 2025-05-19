'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { ModelType } from '@/lib/model.types';
import { Model } from '@/lib/supabase/model.service';
import { useState } from 'react';
import { ModelConfirmDelete } from './model-confirm';

interface ModelCardProps {
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
  onEdit: (model: any) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isDefault?: boolean;
}

export function ModelCard({ model, onEdit, onDelete, isDeleting, isDefault = false }: ModelCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text': return 'bg-blue-100 text-blue-800';
      case 'image': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'audio': return 'bg-yellow-100 text-yellow-800';
      case 'hardware': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
    <Card key={model.id} className={`w-full min-h-60 flex flex-col justify-between gap-2 p-0 hover:shadow-md transition-shadow bg-sidebar ${isDeleting && "opacity-25"}`}>

      <CardHeader className='max-h-28'>
        <CardDescription className='my-2'>
          <Badge className={`${getTypeColor(model.model_type)}`}>
            {model.model_type}
          </Badge>
        </CardDescription>
        <div className="flexflex-col gap-2">
          <h3 className="font-semibold text-primary mb-2">{model.model_name}</h3>
          {getCostDisplay(model)}
        </div>
      </CardHeader>

      <CardFooter className='border-t py-4'>
        <div className='flex justify-between gap-4 w-full items-center'>
          <div className="text-xs ">
            {new Date(model.created_at).toLocaleDateString()}
          </div>
          {!isDefault && <div className="flex gap-2 h-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(model)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isDeleting}
            >
              Delete
            </Button>

            <ModelConfirmDelete
              isOpen={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
              onConfirm={() => onDelete(model.id)}
              modelName={model.model_name}
              isDeleting={isDeleting}
            />
          </div>}
        </div>
      </CardFooter>

    </Card>
  );
}