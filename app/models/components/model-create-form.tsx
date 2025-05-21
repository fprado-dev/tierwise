'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ModelType } from '@/lib/model.types';
import { useState } from 'react';
import { z } from 'zod';

// Zod validation schema
const modelSchema = z.discriminatedUnion('model_type', [
  z.object({
    model_type: z.literal('text'),
    model_name: z.string().min(5, 'Model name must be at least 5 characters'),
    is_public: z.boolean(),
    input_cost_per_million: z.number().min(0.001, 'Input cost must be at least 0.001'),
    output_cost_per_million: z.number().min(0.001, 'Output cost must be at least 0.001'),
  }),
  z.object({
    model_type: z.literal('image'),
    model_name: z.string().min(5, 'Model name must be at least 5 characters'),
    is_public: z.boolean(),
    cost_per_image: z.number().min(0.001, 'Cost per image must be at least 0.001'),
  }),
  z.object({
    model_type: z.literal('video'),
    model_name: z.string().min(5, 'Model name must be at least 5 characters'),
    is_public: z.boolean(),
    cost_per_second: z.number().min(0.001, 'Cost per second must be at least 0.001'),
  }),
  z.object({
    model_type: z.literal('audio'),
    model_name: z.string().min(5, 'Model name must be at least 5 characters'),
    is_public: z.boolean(),
    cost_per_second: z.number().min(0.001, 'Cost per second must be at least 0.001'),
  }),
  z.object({
    model_type: z.literal('hardware'),
    model_name: z.string().min(5, 'Model name must be at least 5 characters'),
    is_public: z.boolean(),
    price_per_sec: z.number().min(0.001, 'Price per second must be at least 0.001'),
    price_per_hour: z.number().min(0.001, 'Price per hour must be at least 0.001'),
    gpu_count: z.number().min(1, 'GPU count must be at least 1'),
    cpu_multiplier: z.number().min(0.1, 'CPU multiplier must be at least 0.1'),
    gpu_ram: z.number().min(1, 'GPU RAM must be at least 1'),
    ram: z.number().min(1, 'RAM must be at least 1'),
  }),
]);

type TCreateModelProps = z.infer<typeof modelSchema> & {
  // Optional fields for easier state management
  input_cost_per_million?: number;
  output_cost_per_million?: number;
  cost_per_image?: number;
  cost_per_second?: number;
  price_per_sec?: number;
  price_per_hour?: number;
  gpu_count?: number;
  cpu_multiplier?: number;
  gpu_ram?: number;
  ram?: number;
};

interface CreateModelModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (model: any) => void;
  isLoading: boolean;
}

export function CreateModelModal({ open, onClose, onSubmit, isLoading }: CreateModelModalProps) {
  const [step, setStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [model, setModel] = useState<TCreateModelProps>({
    model_type: 'text',
    model_name: '',
    is_public: false,
    input_cost_per_million: 0,
    output_cost_per_million: 0,
    cost_per_image: 0,
    cost_per_second: 0,
    price_per_sec: 0,
    price_per_hour: 0,
    gpu_count: 0,
    cpu_multiplier: 0,
    gpu_ram: 0,
    ram: 0,
  });

  // Step validation (fixes .pick() bug)
  const validateStep = () => {
    try {
      if (step === 1) {
        // Only validate model_type, model_name, is_public
        z.object({
          model_type: z.string().min(1, 'Model type is required'),
          model_name: z.string().min(5, 'Model name must be at least 5 characters'),
          is_public: z.boolean(),
        }).parse(model);
        return true;
      }
      // Full validation for step 2
      modelSchema.parse(model);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;
        const errorMap = Object.entries(errors).reduce((acc, [key, value]) => {
          acc[key] = value?.[0] || 'Invalid value';
          return acc;
        }, {} as Record<string, string>);
        setValidationErrors(errorMap);
      }
      return false;
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => s + 1);
    setValidationErrors({});
  };

  const handlePrev = () => {
    setStep((s) => s - 1);
    setValidationErrors({});
  };

  const handleInput = (field: string, value: any) => {
    setModel((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Prepare payload: only relevant fields as numbers, rest as null
  const prepareModelPayload = (model: TCreateModelProps) => {
    const base = {
      model_name: model.model_name.trim(),
      model_type: model.model_type,
      is_public: model.is_public,
      input_cost_per_million: null,
      output_cost_per_million: null,
      cost_per_image: null,
      cost_per_second: null,
      price_per_sec: null,
      price_per_hour: null,
      gpu_count: null,
      cpu_multiplier: null,
      gpu_ram: null,
      ram: null,
    };

    switch (model.model_type) {
      case 'text':
        return {
          ...base,
          input_cost_per_million: Number(model.input_cost_per_million),
          output_cost_per_million: Number(model.output_cost_per_million),
        };
      case 'image':
        return { ...base, cost_per_image: Number(model.cost_per_image) };
      case 'video':
      case 'audio':
        return { ...base, cost_per_second: Number(model.cost_per_second) };
      case 'hardware':
        return {
          ...base,
          price_per_sec: Number(model.price_per_sec),
          price_per_hour: Number(model.price_per_hour),
          gpu_count: Number(model.gpu_count),
          cpu_multiplier: Number(model.cpu_multiplier),
          gpu_ram: Number(model.gpu_ram),
          ram: Number(model.ram),
        };
      default:
        return base;
    }
  };

  const handleSubmit = async () => {
    try {
      const validated = modelSchema.parse(model);
      onSubmit(prepareModelPayload(validated));
      setModel({
        model_type: 'text',
        model_name: '',
        is_public: false,
        input_cost_per_million: 0,
        output_cost_per_million: 0,
        cost_per_image: 0,
        cost_per_second: 0,
        price_per_sec: 0,
        price_per_hour: 0,
        gpu_count: 0,
        cpu_multiplier: 0,
        gpu_ram: 0,
        ram: 0,
      });
      setStep(1);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;
        const errorMap = Object.entries(errors).reduce((acc, [key, value]) => {
          acc[key] = value?.[0] || 'Invalid value';
          return acc;
        }, {} as Record<string, string>);
        setValidationErrors(errorMap);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Model</DialogTitle>
        </DialogHeader>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label>Model Name</Label>
              <Input
                placeholder="Model name"
                value={model.model_name}
                onChange={(e) => handleInput('model_name', e.target.value)}
                disabled={isLoading}
                required
              />
              {validationErrors.model_name && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.model_name}</p>
              )}
            </div>
            <div>
              <Label>Model Type</Label>
              <Select
                value={model.model_type}
                onValueChange={(value) => handleInput('model_type', value as ModelType)}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a model type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.model_type && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.model_type}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Cost Details */}
        {step === 2 && (
          <div className="space-y-4">
            {model.model_type === 'text' && (
              <>
                <div>
                  <Label>Input Cost (per million tokens)</Label>
                  <Input
                    type="number"
                    placeholder="Input cost"
                    step={0.001}
                    min={0.001}
                    value={model.input_cost_per_million}
                    onChange={(e) => handleInput('input_cost_per_million', Number(e.target.value))}
                    disabled={isLoading}
                  />
                  {validationErrors.input_cost_per_million && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.input_cost_per_million}</p>
                  )}
                </div>
                <div>
                  <Label>Output Cost (per million tokens)</Label>
                  <Input
                    type="number"
                    placeholder="Output cost"
                    step={0.001}
                    min={0.001}
                    value={model.output_cost_per_million}
                    onChange={(e) => handleInput('output_cost_per_million', Number(e.target.value))}
                    disabled={isLoading}
                  />
                  {validationErrors.output_cost_per_million && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.output_cost_per_million}</p>
                  )}
                </div>
              </>
            )}

            {model.model_type === 'image' && (
              <div>
                <Label>Cost per Image</Label>
                <Input
                  type="number"
                  placeholder="Cost per image"
                  step={0.001}
                  min={0.001}
                  value={model.cost_per_image}
                  onChange={(e) => handleInput('cost_per_image', Number(e.target.value))}
                  disabled={isLoading}
                />
                {validationErrors.cost_per_image && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.cost_per_image}</p>
                )}
              </div>
            )}

            {(model.model_type === 'video' || model.model_type === 'audio') && (
              <div>
                <Label>Cost per Second</Label>
                <Input
                  type="number"
                  placeholder="Cost per second"
                  step={0.001}
                  min={0.001}
                  value={model.cost_per_second}
                  onChange={(e) => handleInput('cost_per_second', Number(e.target.value))}
                  disabled={isLoading}
                />
                {validationErrors.cost_per_second && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.cost_per_second}</p>
                )}
              </div>
            )}

            {model.model_type === 'hardware' && (
              <>
                <div>
                  <Label>Price per Second</Label>
                  <Input
                    type="number"
                    placeholder="Price per second"
                    step={0.001}
                    min={0.001}
                    value={model.price_per_sec}
                    onChange={(e) => handleInput('price_per_sec', Number(e.target.value))}
                    disabled={isLoading}
                  />
                  {validationErrors.price_per_sec && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.price_per_sec}</p>
                  )}
                </div>
                <div>
                  <Label>Price per Hour</Label>
                  <Input
                    type="number"
                    placeholder="Price per hour"
                    step={0.001}
                    min={0.001}
                    value={model.price_per_hour}
                    onChange={(e) => handleInput('price_per_hour', Number(e.target.value))}
                    disabled={isLoading}
                  />
                  {validationErrors.price_per_hour && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.price_per_hour}</p>
                  )}
                </div>
                <div>
                  <Label>GPU Count</Label>
                  <Input
                    type="number"
                    placeholder="GPU count"
                    step={1}
                    min={1}
                    value={model.gpu_count}
                    onChange={(e) => handleInput('gpu_count', Number(e.target.value))}
                    disabled={isLoading}
                  />
                  {validationErrors.gpu_count && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.gpu_count}</p>
                  )}
                </div>
                <div>
                  <Label>CPU Multiplier</Label>
                  <Input
                    type="number"
                    placeholder="CPU multiplier"
                    step={0.1}
                    min={0.1}
                    value={model.cpu_multiplier}
                    onChange={(e) => handleInput('cpu_multiplier', Number(e.target.value))}
                    disabled={isLoading}
                  />
                  {validationErrors.cpu_multiplier && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.cpu_multiplier}</p>
                  )}
                </div>
                <div>
                  <Label>GPU RAM</Label>
                  <Input
                    type="number"
                    placeholder="GPU RAM"
                    step={1}
                    min={1}
                    value={model.gpu_ram}
                    onChange={(e) => handleInput('gpu_ram', Number(e.target.value))}
                    disabled={isLoading}
                  />
                  {validationErrors.gpu_ram && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.gpu_ram}</p>
                  )}
                </div>
                <div>
                  <Label>RAM</Label>
                  <Input
                    type="number"
                    placeholder="RAM"
                    step={1}
                    min={1}
                    value={model.ram}
                    onChange={(e) => handleInput('ram', Number(e.target.value))}
                    disabled={isLoading}
                  />
                  {validationErrors.ram && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.ram}</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        <DialogFooter className="mt-8 flex justify-between">
          {step > 1 && (
            <Button variant="secondary" onClick={handlePrev} disabled={isLoading}>
              Back
            </Button>
          )}
          {step === 1 && (
            <Button onClick={handleNext} disabled={isLoading}>
              Next
            </Button>
          )}
          {step === 2 && (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Model'}
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
