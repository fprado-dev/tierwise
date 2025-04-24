'use client';

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { useModels } from "@/hooks/use-models";
import { useTiers } from "@/hooks/useTiers";
import { Model } from "@/lib/supabase/model.service";
import { ProcessedTier } from "@/lib/tier.types";
import { useState } from "react";
import { SelectableModelCard } from "./selectable-model-card";

type ModelSelectionSheetProps = {
  tier: ProcessedTier;
  modelType: 'text' | 'image' | 'video';
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateTier: (name: string, id: string) => void;
};

export function ModelSelectionSheet({ tier, modelType, isOpen, onOpenChange }: ModelSelectionSheetProps) {
  const { models: allModels, defaultModels } = useModels();
  const { addModelToTier, removeModelFromTier, isLoading } = useTiers();

  const [selectedModels, setSelectedModels] = useState<string[]>(() => {
    const modelsByType = tier.models.filter(model => model.model_type === modelType);
    return modelsByType.map(model => model.id);
  });

  const getModelOptions = () => {
    const availableModels = [...allModels, ...defaultModels];
    return availableModels.filter(m => m.model_type === modelType);
  };

  const handleModelSelect = async (model: Model) => {
    const isSelected = selectedModels.includes(model.id);

    if (isSelected) {
      setSelectedModels(prev => prev.filter(id => id !== model.id));
    } else if (selectedModels.length < 6) {
      setSelectedModels(prev => [...prev, model.id]);
    }
  };

  const handleUpdateModels = () => {
    if (selectedModels.length > 6) return;
    const modelsByType = tier.models.filter(model => model.model_type === modelType);
    const modelsInTier = modelsByType.map(model => model.id);

    // Find models to add and remove
    const modelsToAdd = selectedModels.filter(model => !modelsInTier.includes(model));
    const modelsToRemove = modelsInTier.filter(model => !selectedModels.includes(model));

    // Update the tier with added and removed models
    if (modelsToAdd.length > 0) {
      addModelToTier(tier.id, modelsToAdd);
    }
    if (modelsToRemove.length > 0) {
      removeModelFromTier(tier.id, modelsToRemove);
    }

    onOpenChange(false);
  };

  const getTitle = () => {
    switch (modelType) {
      case 'text':
        return 'Select Text Models';
      case 'image':
        return 'Select Image Models';
      case 'video':
        return 'Select Video Models';
      default:
        return 'Select Models';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full h-full max-w-full sm:max-w-full">
        <SheetHeader className="flex flex-row mt-4 px-4 justify-between items-center">
          <div className="flex flex-col">
            <SheetTitle>{getTitle()}</SheetTitle>
            <SheetDescription>
              Select the models you want to include in this tier.
            </SheetDescription>
          </div>
          <Button onClick={handleUpdateModels} disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Models'}
          </Button>
        </SheetHeader>


        <Alert className="mx-4 mt-4 bg-sidebar">
          <AlertDescription>
            {`You can only select up to ${selectedModels.length}/6 models per category.`}
          </AlertDescription>
        </Alert>
        <div className="grid gap-4 px-4 pt-8 pb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto h-[calc(100vh-50px)]">
          {getModelOptions().map((model) => (
            <SelectableModelCard
              key={model.id}
              model={model}
              isSelected={selectedModels.includes(model.id)}
              onSelect={handleModelSelect}
              isLoading={isLoading}
            />
          ))}
        </div>

      </SheetContent>
    </Sheet>
  );
}