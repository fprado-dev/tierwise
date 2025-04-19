'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Label } from "./ui/label";

type TierEditSheetProps = {
  tier: Tier;
  onUpdateTier: (updatedTier: Tier) => void;
};

export function TierEditSheet({ tier, onUpdateTier }: TierEditSheetProps) {
  const [tierName, setTierName] = useState(tier.name);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTextModel, setSelectedTextModel] = useState<string>(
    tier.models.find(m => 'inputCostPerMillion' in m)?.model || ''
  );
  const [selectedImageModel, setSelectedImageModel] = useState<string>(
    tier.models.find(m => 'costPerImage' in m)?.model || ''
  );
  const [selectedVideoModel, setSelectedVideoModel] = useState<string>(
    tier.models.find(m => 'costPerSecond' in m)?.model || ''
  );

  const handleUpdateTier = () => {
    if (!tierName) return;

    const selectedModels: ModelOption[] = [
      TEXT_MODELS.find(m => m.model === selectedTextModel),
      IMAGE_MODELS.find(m => m.model === selectedImageModel),
      VIDEO_MODELS.find(m => m.model === selectedVideoModel)
    ].filter((model): model is TextModel | ImageModel | VideoModel => model !== undefined);

    const updatedTier: Tier = {
      ...tier,
      name: tierName,
      models: selectedModels,
    };

    onUpdateTier(updatedTier);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">Text Model</Label>
              <Select value={selectedTextModel} onValueChange={setSelectedTextModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a text model" />
                </SelectTrigger>
                <SelectContent>
                  {TEXT_MODELS.map((model) => (
                    <SelectItem key={model.model} value={model.model}>
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Text</span>
                        {model.model}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">Image Model</Label>
              <Select value={selectedImageModel} onValueChange={setSelectedImageModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an image model" />
                </SelectTrigger>
                <SelectContent>
                  {IMAGE_MODELS.map((model) => (
                    <SelectItem key={model.model} value={model.model}>
                      <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">Image</span>
                        {model.model}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">Video Model</Label>
              <Select value={selectedVideoModel} onValueChange={setSelectedVideoModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a video model" />
                </SelectTrigger>
                <SelectContent>
                  {VIDEO_MODELS.map((model) => (
                    <SelectItem key={model.model} value={model.model}>
                      <div className="flex items-center gap-2">
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">Video</span>
                        {model.model}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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