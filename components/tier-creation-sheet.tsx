'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ModelOption } from "@/lib/model.types";
import { Tier } from "@/lib/tier.types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "./ui/label";
import MultipleSelector from "./ui/multiselect";

type TierCreationSheetProps = {
  onAddTier: (tier: Tier) => void;
};

export function TierCreationSheet({ onAddTier }: TierCreationSheetProps) {
  const [newTierName, setNewTierName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTextModels, setSelectedTextModels] = useState<string[]>([]);
  const [selectedImageModels, setSelectedImageModels] = useState<string[]>([]);
  const [selectedVideoModels, setSelectedVideoModels] = useState<string[]>([]);



  const handleAddTier = () => {
    if (!newTierName) return;
    const generateTierID = crypto.randomUUID();


    const selectedModels: ModelOption[] = [
      ...TEXT_MODELS.filter(m => selectedTextModels.includes(m.model)),
      ...IMAGE_MODELS.filter(m => selectedImageModels.includes(m.model)),
      ...VIDEO_MODELS.filter(m => selectedVideoModels.includes(m.model))
    ];

    const newTier: Tier = {
      id: generateTierID,
      name: newTierName,
      models: selectedModels,
      useHighestCost: {
        text: true,
        image: true,
        video: true
      }
    };

    onAddTier(newTier);
    setNewTierName('');
    setSelectedTextModels([]);
    setSelectedImageModels([]);
    setSelectedVideoModels([]);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Tier</SheetTitle>
          <SheetDescription>
            Create a new tier with the selected models.
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
                value={newTierName}
                onChange={(e) => setNewTierName(e.target.value)}
                placeholder="e.g. Premium/Pro/Enterprise"
                className="focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">Text Model</Label>
              <div className="flex flex-wrap gap-2">
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
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">Image Model</Label>
              <div className="flex flex-wrap gap-2">
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
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">Video Model</Label>
              <div className="flex flex-wrap gap-2">
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
            onClick={handleAddTier}
            disabled={!newTierName}
          >
            Create Tier
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}