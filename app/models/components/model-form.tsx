'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ModelType } from '@/lib/model.types';
import { CreateModelParams } from '@/lib/supabase/model.service';

interface ModelFormProps {
  model: CreateModelParams & { id?: string; };
  onSubmit: () => Promise<void>;
  onModelChange: (model: CreateModelParams & { id?: string; }) => void;
  isLoading: boolean;
  mode: 'create' | 'edit';
}

export function ModelForm({
  model,
  onSubmit,
  onModelChange,
  isLoading,
  mode
}: ModelFormProps) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{mode === 'create' ? 'Create New Model' : 'Edit Model'}</SheetTitle>
      </SheetHeader>
      <div className="mt-6 flex flex-col gap-2 space-y-4">
        <div className="space-y-2">
          <Label>Model Name</Label>
          <Input
            placeholder="Model name"
            value={model.model_name}
            onChange={(e) => onModelChange({ ...model, model_name: e.target.value })}
            disabled={isLoading}
            required
          />
        </div>
        {mode === "create" && <div className="space-y-2">
          <Label>Model Type</Label>
          <Select
            value={model.model_type}
            onValueChange={(value) => onModelChange({ ...model, model_type: value as ModelType })}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a model type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="video">Video</SelectItem>
            </SelectContent>
          </Select>
        </div>}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="public-model"
              checked={model.is_public}
              onCheckedChange={(checked) => onModelChange({ ...model, is_public: checked as boolean })}
              disabled={isLoading}
            />
            <Label htmlFor="public-model">Public Model</Label>
          </div>
        </div>
        {model.model_type === 'text' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Input Cost (per million tokens)</label>
              <Input
                type="number"
                placeholder="Input cost"
                step={0.001}
                value={model.input_cost_per_million || ''}
                onChange={(e) => onModelChange({ ...model, input_cost_per_million: parseFloat(e.target.value) })}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Output Cost (per million tokens)</label>
              <Input
                type="number"
                placeholder="Output cost"
                step={0.001}
                value={model.output_cost_per_million || ''}
                onChange={(e) => onModelChange({ ...model, output_cost_per_million: parseFloat(e.target.value) })}
                disabled={isLoading}
              />
            </div>
          </>
        )}
        {model.model_type === 'image' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Cost per Image</label>
            <Input
              type="number"
              placeholder="Cost per image"
              step={0.001}
              value={model.cost_per_image || ''}
              onChange={(e) => onModelChange({ ...model, cost_per_image: parseFloat(e.target.value) })}
              disabled={isLoading}
            />
          </div>
        )}
        {(model.model_type === 'video' || model.model_type === 'audio') && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Cost per Second</label>
            <Input
              type="number"
              placeholder="Cost per second"
              step={0.001}
              value={model.cost_per_second || ''}
              onChange={(e) => onModelChange({ ...model, cost_per_second: parseFloat(e.target.value) })}
              disabled={isLoading}
            />
          </div>
        )}
        {model.model_type === 'hardware' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price per Second</label>
              <Input
                type="number"
                placeholder="Price per second"
                step={0.001}
                value={model.price_per_sec || ''}
                onChange={(e) => onModelChange({ ...model, price_per_sec: parseFloat(e.target.value) })}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price per Hour</label>
              <Input
                type="number"
                placeholder="Price per hour"
                step={0.001}
                value={model.price_per_hour || ''}
                onChange={(e) => onModelChange({ ...model, price_per_hour: parseFloat(e.target.value) })}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">GPU Count</label>
              <Input
                type="number"
                placeholder="GPU count"
                step={0.001}
                value={model.gpu_count || ''}
                onChange={(e) => onModelChange({ ...model, gpu_count: parseInt(e.target.value) })}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">CPU Multiplier</label>
              <Input
                placeholder="CPU multiplier"
                step={0.001}
                value={model.cpu_multiplier || ''}
                onChange={(e) => onModelChange({ ...model, cpu_multiplier: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">GPU RAM</label>
              <Input
                placeholder="GPU RAM"
                step={0.001}
                value={model.gpu_ram || ''}
                onChange={(e) => onModelChange({ ...model, gpu_ram: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">RAM</label>
              <Input
                placeholder="RAM"
                step={0.001}
                value={model.ram || ''}
                onChange={(e) => onModelChange({ ...model, ram: e.target.value })}
                disabled={isLoading}
              />
            </div>
          </>
        )}
        <Button
          onClick={onSubmit}
          disabled={isLoading || !model.model_name.trim()}
        >
          {isLoading
            ? mode === 'create' ? 'Creating...' : 'Updating...'
            : mode === 'create' ? 'Create Model' : 'Update Model'}
        </Button>
      </div>
    </SheetContent>
  );
}