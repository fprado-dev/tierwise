'use client';

import { Badge } from "@/components/ui/badge";
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
import { SearchX } from "lucide-react";
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
  const { defaultModels } = useModels();
  const { addModelToTier, removeModelFromTier, isLoading } = useTiers();

  const [selectedModels, setSelectedModels] = useState<string[]>(() => {
    const modelsByType = tier.models.filter(model => model.model_type === modelType);
    return modelsByType.map(model => model.id);
  });

  const getModelOptions = () => {
    const availableModels = [...defaultModels];
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
      <SheetContent side="right" className="w-[800px] sm:max-w-full p-0 overflow-hidden flex flex-col">

        {/* Header Section */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
          <SheetHeader className="flex flex-row justify-between items-center p-4 gap-4">
            <div className="flex flex-col">
              <SheetTitle className="text-xl font-semibold">{getTitle()}</SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                Select the models you want to include in this tier.
              </SheetDescription>
              <div className="flex items-center gap-1 mt-2">
                <Badge variant={selectedModels.length >= 6 ? "destructive" : "secondary"} className="text-xs">
                  {selectedModels.length}/6
                </Badge>
                <span className="text-sm text-muted-foreground">Models per category</span>
              </div>
            </div>
          </SheetHeader>
        </div>

        {/* Model Cards Grid - Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {getModelOptions().length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="rounded-full bg-muted p-3 mb-4">
                <SearchX className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-1">No models found</h3>
              <p className="text-muted-foreground max-w-md">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-2  auto-rows-fr">
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
          )}
        </div>

        {/* Optional: Footer with Actions */}
        <div className="border-t p-4 bg-background/95 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => setSelectedModels([])}
                disabled={selectedModels.length === 0 || isLoading}
              >
                Clear Selection
              </Button>
              <Button
                onClick={handleUpdateModels}
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Models'}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>

  );
}