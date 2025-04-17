'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { IMAGE_MODELS, TEXT_MODELS, VIDEO_MODELS } from '@/lib/constants';
import { Image, Plus, Text, Trash2, Video } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "./ui/toggle-group";

// Define model category type for better type safety
type ModelCategory = 'image-model' | 'text-model' | 'video-model';

// Define a type for selected models in a tier
type TierModelSelection = {
  category: ModelCategory;
  selectedModel?: string; // The selected model ID
  price?: number;
  imageCount?: number; // For image models
  textInputTokens?: number; // For text models
  textOutputTokens?: number; // For text models
  videoSeconds?: number; // For video models
};

type Tier = {
  id: string;
  name: string;
  modelSelections: TierModelSelection[];
  // imagesPerUser is removed as it's now handled per model selection
};

const modelOptionsCategory = [
  { id: "image-model" as ModelCategory, label: 'Image', icon: <Image className='w-4 h-4' />, models: IMAGE_MODELS },
  { id: "text-model" as ModelCategory, label: 'Text', icon: <Text className='w-4 h-4' />, models: TEXT_MODELS },
  { id: "video-model" as ModelCategory, label: 'Video', icon: <Video className='w-4 h-4' />, models: VIDEO_MODELS },
];

// Helper function to get models by category
const getModelsByCategory = (category: ModelCategory) => {
  const categoryData = modelOptionsCategory.find(c => c.id === category);
  return categoryData ? categoryData.models : [];
};

export default function AICostCalculator() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [newTierName, setNewTierName] = useState('');
  const [modelSelectionMode, setModelSelectionMode] = useState<ModelCategory[]>(["image-model"]);

  const handleAddTier = () => {
    if (!newTierName) return;
    const generateTierID = crypto.randomUUID();

    // Create model selections based on selected categories with default quantities
    const modelSelections: TierModelSelection[] = modelSelectionMode.map(category => {
      const defaults: Partial<TierModelSelection> = {};
      switch (category) {
        case 'image-model':
          defaults.imageCount = 100;
          break;
        case 'text-model':
          defaults.textInputTokens = 1000000;
          defaults.textOutputTokens = 1000000;
          break;
        case 'video-model':
          defaults.videoSeconds = 5;
          break;
      }
      return {
        category,
        selectedModel: undefined, // Initially no model is selected
        ...defaults
      };
    });

    const newTier: Tier = {
      id: generateTierID,
      name: newTierName,
      // imagesPerUser is removed as it's now handled per model selection
      modelSelections
    };

    setTiers([...tiers, newTier]);
    setNewTierName('');
    setModelSelectionMode([]);
  };

  const handleDeleteTier = (id: string) => {
    setTiers(tiers.filter(tier => tier.id !== id));
  };

  const handleQuantityChange = (
    tierId: string,
    categoryIndex: number,
    field: keyof TierModelSelection,
    value: number
  ) => {
    setTiers(tiers.map(tier => {
      if (tier.id === tierId) {
        const updatedSelections = [...tier.modelSelections];
        if (updatedSelections[categoryIndex]) {
          updatedSelections[categoryIndex] = {
            ...updatedSelections[categoryIndex],
            [field]: value,
          };
        }
        return { ...tier, modelSelections: updatedSelections };
      }
      return tier;
    }));
  };

  const handleModelSelect = (tierId: string, categoryIndex: number, modelId: string) => {
    setTiers(tiers.map(tier => {
      if (tier.id === tierId) {
        const updatedSelections = [...tier.modelSelections];
        if (updatedSelections[categoryIndex]) {
          updatedSelections[categoryIndex] = {
            ...updatedSelections[categoryIndex],
            selectedModel: modelId,
          };
        }
        return { ...tier, modelSelections: updatedSelections };
      }
      return tier;
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm bg-card">
        <div className="flex gap-4 items-end max-w-xl">
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="tierName" className="text-sm font-medium">Tier</label>
            <Input
              id="tierName"
              type="text"
              value={newTierName}
              onChange={(e) => setNewTierName(e.target.value)}
              placeholder="e.g. Premium/Pro/Enterprise"
              className="focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Initial Models</label>
            <ToggleGroup
              type="multiple"
              variant="outline"
              size="sm"
              value={modelSelectionMode}
              onValueChange={(value) => {
                if (value.length > 0) setModelSelectionMode(value as ModelCategory[]);
              }}
            >
              {modelOptionsCategory.map(model => (
                <ToggleGroupItem
                  key={model.id}
                  value={model.id}
                  aria-label={`Include ${model.label} models`}
                >
                  {model.icon}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <Button
            size="icon"
            onClick={handleAddTier}
            className="flex items-center gap-2 transition-all hover:scale-105"
            disabled={!newTierName}
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>

      <div className="w-full">
        <TierCardList
          tiers={tiers}
          handleDeleteTier={handleDeleteTier}
          handleModelSelect={handleModelSelect}
          handleQuantityChange={handleQuantityChange} // Pass the new handler
        />
      </div>
    </div>
  );
}

type TTierCardList = {
  tiers: Tier[];
  handleDeleteTier: (id: string) => void;
  handleModelSelect: (tierId: string, categoryIndex: number, modelId: string) => void;
  handleQuantityChange: (
    tierId: string,
    categoryIndex: number,
    field: keyof TierModelSelection,
    value: number
  ) => void; // Add the new handler prop type
};

function TierCardList({ tiers, handleDeleteTier, handleModelSelect, handleQuantityChange }: TTierCardList) {
  // Helper function to render model selection for a category
  const renderModelSelection = (tier: Tier, categoryId: ModelCategory, index: number) => {
    const models = getModelsByCategory(categoryId);
    const selection = tier.modelSelections.find(s => s.category === categoryId);
    const categoryInfo = modelOptionsCategory.find(c => c.id === categoryId);
    if (!selection) return null;

    return (
      <div className="flex flex-col gap-2 mb-4 w-full" key={categoryId}>
        <div className="flex items-center gap-2 text-sm font-medium">
          {categoryInfo?.icon}
          <span>{categoryInfo?.label} Model</span>
        </div>
        <Select
          value={selection.selectedModel || ""}
          onValueChange={(value) => handleModelSelect(tier.id, index, value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select a ${categoryInfo?.label.toLowerCase()} model`} />
          </SelectTrigger>
          <SelectContent>
            {models.map(model => (
              <SelectItem key={model.model} value={model.model}>
                {model.model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Quantity Inputs based on category */}
        {categoryId === 'image-model' && selection.selectedModel && (
          <div className="flex flex-col gap-1">
            <label htmlFor={`${tier.id}-${categoryId}-images`} className="text-xs text-muted-foreground">Images per User</label>
            <Input
              id={`${tier.id}-${categoryId}-images`}
              type="number"
              min={0}
              value={selection.imageCount ?? ''}
              onChange={(e) => handleQuantityChange(tier.id, index, 'imageCount', parseInt(e.target.value) || 0)}
              className="h-8 text-sm"
              placeholder="e.g. 100"
            />
          </div>
        )}
        {categoryId === 'text-model' && selection.selectedModel && (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor={`${tier.id}-${categoryId}-input`} className="text-xs text-muted-foreground">Input Tokens</label>
              <Input
                id={`${tier.id}-${categoryId}-input`}
                type="number"
                min={0}
                value={selection.textInputTokens ?? ''}
                onChange={(e) => handleQuantityChange(tier.id, index, 'textInputTokens', parseInt(e.target.value) || 0)}
                className="h-8 text-sm"
                placeholder="e.g. 1M"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor={`${tier.id}-${categoryId}-output`} className="text-xs text-muted-foreground">Output Tokens</label>
              <Input
                id={`${tier.id}-${categoryId}-output`}
                type="number"
                min={0}
                value={selection.textOutputTokens ?? ''}
                onChange={(e) => handleQuantityChange(tier.id, index, 'textOutputTokens', parseInt(e.target.value) || 0)}
                className="h-8 text-sm"
                placeholder="e.g. 1M"
              />
            </div>
          </div>
        )}
        {categoryId === 'video-model' && selection.selectedModel && (
          <div className="flex flex-col gap-1">
            <label htmlFor={`${tier.id}-${categoryId}-seconds`} className="text-xs text-muted-foreground">Seconds per User</label>
            <Input
              id={`${tier.id}-${categoryId}-seconds`}
              type="number"
              min={0}
              value={selection.videoSeconds ?? ''}
              onChange={(e) => handleQuantityChange(tier.id, index, 'videoSeconds', parseInt(e.target.value) || 0)}
              className="h-8 text-sm"
              placeholder="e.g. 5"
            />
          </div>
        )}
      </div>
    );
  };

  if (tiers.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-10 text-muted-foreground">
          No tiers added yet. Add a tier to get started.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tiers.map((tier) => (
        <Card key={tier.id} className="overflow-hidden transition-all hover:shadow-md flex flex-col justify-between">
          <CardHeader className="bg-muted/30 pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold text-primary">{tier.name}</CardTitle>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteTier(tier.id)}
                className="h-8 w-8 transition-all hover:bg-destructive/90"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <CardDescription>
              Configure AI models for this tier
            </CardDescription>
          </CardHeader>
          <CardContent className=" h-full flex flex-col gap-2 items-start justify-start">
            {/* Render model selections for each category */}
            {/* Render model selections for each category present in the tier */}
            {tier.modelSelections.map((selection, index) =>
              renderModelSelection(tier, selection.category, index)
            )}
          </CardContent>
          {/* Footer can be used for other tier-specific actions or info if needed */}
          {/* <CardFooter className="bg-muted/10 border-t pt-4">
             <p className="text-xs text-muted-foreground">Footer content if needed</p>
          </CardFooter> */}
        </Card>
      ))}
    </div>
  );
}
