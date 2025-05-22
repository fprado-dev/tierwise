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
import { Model } from "@/lib/supabase/model.service";
import { ProcessedTier } from "@/lib/tier.types";
import { SearchCheckIcon, SearchX } from "lucide-react";
import { useState } from "react";
import { SelectableModelCard } from "./selectable-model-card";

type ModelSelectionSheetProps = {
  tier: ProcessedTier;
  isOpen: boolean;
  modelType: 'text' | 'image' | 'video';
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onRemoveModelsFromTier: (tierId: string, modelIds: string[]) => void;
  onAddModelsToTier: (tierId: string, modelIds: string[]) => void;
};

export function ModelSelectionSheet({ tier, isOpen, modelType, isLoading, onOpenChange, onAddModelsToTier, onRemoveModelsFromTier }: ModelSelectionSheetProps) {
  const { defaultModels, loading } = useModels();

  // Track selected models for each category separately
  const [selectedModelsByCategory, setSelectedModelsByCategory] = useState<{
    text: string[];
    image: string[];
    video: string[];
  }>(() => {
    // Initialize with current models in the tier for each category
    const textModels = tier.models.filter(model => model.model_type === 'text').map(model => model.id);
    const imageModels = tier.models.filter(model => model.model_type === 'image').map(model => model.id);
    const videoModels = tier.models.filter(model => model.model_type === 'video').map(model => model.id);

    return {
      text: textModels,
      image: imageModels,
      video: videoModels
    };
  });

  // Get selected models for the current active tab
  const selectedModels = selectedModelsByCategory[modelType];

  const getModelOptions = () => {
    const availableModels = [...defaultModels];
    return availableModels.filter(m => m.model_type === modelType);
  };

  const handleModelSelect = async (model: Model) => {
    const isSelected = selectedModels.includes(model.id);

    if (isSelected) {
      // Remove model from the current category
      setSelectedModelsByCategory(prev => ({
        ...prev,
        [modelType]: prev[modelType].filter(id => id !== model.id)
      }));
    } else if (selectedModels.length < 6) {
      // Add model to the current category if under the limit
      setSelectedModelsByCategory(prev => ({
        ...prev,
        [modelType]: [...prev[modelType], model.id]
      }));
    }
  };

  const handleUpdateModels = () => {
    // Get current selected models for the active tab
    const currentSelectedModels = selectedModelsByCategory[modelType];

    // Validate selection count
    if (currentSelectedModels.length > 6) return;

    // Get existing models of the current type in the tier
    const modelsByType = tier.models.filter(model => model.model_type === modelType);
    const modelsInTier = modelsByType.map(model => model.id);

    // Find models to add and remove
    const modelsToAdd = currentSelectedModels.filter(model => !modelsInTier.includes(model));
    const modelsToRemove = modelsInTier.filter(model => !currentSelectedModels.includes(model));

    // Update the tier with added and removed models
    if (modelsToAdd.length > 0) {
      onAddModelsToTier(tier.id, modelsToAdd);
    }
    if (modelsToRemove.length > 0) {
      onRemoveModelsFromTier(tier.id, modelsToRemove);
    }

    // onOpenChange(false);
  };

  const getTitle = () => `Select ${modelType.charAt(0).toUpperCase() + modelType.slice(1)} Models`;




  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[800px] sm:max-w-full p-0 overflow-hidden flex flex-col">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="rounded-full bg-muted p-3 mb-4">
              <SearchCheckIcon className="h-6 w-6 text-muted-foreground" />
            </div>

            <SheetTitle className="text-xl font-semibold">Loading...</SheetTitle>


            <p className="text-muted-foreground max-w-md">
              Fetching models...
            </p>
          </div>
        ) : (
          <>
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
            <div className="border-t p-4 bg-background/95 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedModelsByCategory(prev => ({
                      ...prev,
                      [modelType]: []
                    }))}
                    disabled={selectedModels.length === 0}
                  >
                    Clear Selection
                  </Button>
                  <Button
                    onClick={handleUpdateModels}
                  >
                    {isLoading ? "Updating Models" : "Update Models"}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}