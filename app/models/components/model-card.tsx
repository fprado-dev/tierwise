'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ModelType } from '@/lib/model.types';
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

export function ModelCard({
  model,
  onEdit,
  onDelete,
  isDeleting,
  isDefault = false,
}: ModelCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'image':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'video':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'audio':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'hardware':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCostDisplay = (model: ModelCardProps['model']) => {
    switch (model.model_type) {
      case 'text':
        return (
          <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
            <span>
              ${model.input_cost_per_million}/1M Input tokens
            </span>
            <span>
              ${model.output_cost_per_million}/1M Output tokens
            </span>
          </div>
        );
      case 'image':
        return (
          <span className="text-xs text-muted-foreground">
            ${model.cost_per_image}/image
          </span>
        );
      case 'video':
      case 'audio':
        return (
          <span className="text-xs text-muted-foreground">
            ${model.cost_per_second}/second
          </span>
        );
      case 'hardware':
        return (
          <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
            <span>${model.price_per_sec}/second</span>
            {model.gpu_count !== undefined && (
              <span>{model.gpu_count} GPU(s)</span>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      className={`flex flex-col justify-between rounded-xl border border-brand/40 shadow-sm transition-all duration-150 hover:shadow-lg bg-white ${isDeleting ? 'opacity-50 pointer-events-none' : ''
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <Badge className={getTypeColor(model.model_type)}>
          {model.model_type}
        </Badge>
        <div className="flex gap-2 items-center">
          {model.is_public && (
            <Badge variant="outline" className="border-brand text-brand">
              Public
            </Badge>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div className="px-5 pb-2">
        <h3 className="font-semibold text-xs sm:text-sm text-primary truncate">
          {model.model_name}
        </h3>
        <div className="mt-1">{getCostDisplay(model)}</div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between border-t px-5 py-3 bg-brand/10 rounded-b-xl">
        <span className="text-xs text-brand">
          {new Date(model.created_at).toLocaleDateString()}
        </span>
        {!isDefault && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(model)}
              disabled={isDeleting}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
            <ModelConfirmDelete
              isOpen={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
              onConfirm={() => onDelete(model.id)}
              modelName={model.model_name}
              isDeleting={isDeleting}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
