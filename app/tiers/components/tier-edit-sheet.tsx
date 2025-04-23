'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector from "@/components/ui/multiselect";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IMAGE_MODELS, TEXT_MODELS, VIDEO_MODELS } from "@/lib/constants";
import { ImageModel, ModelOption, TextModel, VideoModel } from "@/lib/model.types";
import { Tier } from "@/lib/tier.types";
import { Cog } from "lucide-react";
import { useState } from "react";

type TierEditSheetProps = {
  tier: Tier;
  onUpdateTier: (updatedTier: Tier) => void;
  isEditing: boolean;
  setEditSheetopen: (isEditing: boolean) => void;
};

export function TierEditSheet({ tier, onUpdateTier, isEditing, setEditSheetopen }: TierEditSheetProps) {
  const [tierName, setTierName] = useState(tier.name);
  const [selectedTextModels, setSelectedTextModels] = useState<string[]>(
    tier.models.filter((m): m is TextModel => 'inputCostPerMillion' in m).map(m => m.model)
  );
  const [selectedImageModels, setSelectedImageModels] = useState<string[]>(
    tier.models.filter((m): m is ImageModel => 'costPerImage' in m).map(m => m.model)
  );
  const [selectedVideoModels, setSelectedVideoModels] = useState<string[]>(
    tier.models.filter((m): m is VideoModel => 'costPerSecond' in m).map(m => m.model)
  );

  const handleUpdateTier = () => {
    if (!tierName) return;

    const selectedModels: ModelOption[] = [
      ...TEXT_MODELS.filter(m => selectedTextModels.includes(m.model)),
      ...IMAGE_MODELS.filter(m => selectedImageModels.includes(m.model)),
      ...VIDEO_MODELS.filter(m => selectedVideoModels.includes(m.model))
    ];

    const updatedTier: Tier = {
      ...tier,
      name: tierName,
      models: selectedModels,
    };

    onUpdateTier(updatedTier);
    setEditSheetopen(false);
  };

  return (
    <Sheet open={isEditing} onOpenChange={setEditSheetopen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="p-2 transition-all hover:bg-primary-foreground"
        >
          <Cog className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Tier</SheetTitle>
          <SheetDescription>
            Modify the tier settings and models.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="tierName" className="text-sm font-medium">
                Tier Name
              </Label>
              <Input
                id="tierName"
                type="text"
                value={tierName}
                onChange={(e) => setTierName(e.target.value)}
                placeholder="e.g. Premium/Pro/Enterprise"
                className="focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Text Models</Label>
                <MultipleSelector
                  value={selectedTextModels.map(model => ({ value: model, label: model }))}
                  options={TEXT_MODELS.map(model => ({
                    value: model.model,
                    label: model.model,
                  }))}
                  onChange={(options) => setSelectedTextModels(options.map(o => o.value))}
                  placeholder="Select text models"
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Image Models</Label>
                <MultipleSelector
                  value={selectedImageModels.map(model => ({ value: model, label: model }))}
                  options={IMAGE_MODELS.map(model => ({
                    value: model.model,
                    label: model.model,
                  }))}
                  onChange={(options) => setSelectedImageModels(options.map(o => o.value))}
                  placeholder="Select image models"
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Video Models</Label>
                <MultipleSelector
                  value={selectedVideoModels.map(model => ({ value: model, label: model }))}
                  options={VIDEO_MODELS.map(model => ({
                    value: model.model,
                    label: model.model,
                  }))}
                  onChange={(options) => setSelectedVideoModels(options.map(o => o.value))}
                  placeholder="Select video models"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button
            type="submit"
            onClick={handleUpdateTier}
            disabled={!tierName}
          >
            Update Tier
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}