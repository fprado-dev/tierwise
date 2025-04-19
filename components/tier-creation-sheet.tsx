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
import { ModelOption } from "@/lib/model.types";
import { Tier } from "@/lib/tier.types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "./ui/label";

type TierCreationSheetProps = {
  onAddTier: (tier: Tier) => void;
};

export function TierCreationSheet({ onAddTier }: TierCreationSheetProps) {
  const [newTierName, setNewTierName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTextModel, setSelectedTextModel] = useState<string>('');
  const [selectedImageModel, setSelectedImageModel] = useState<string>('');
  const [selectedVideoModel, setSelectedVideoModel] = useState<string>('');



  const handleAddTier = () => {
    if (!newTierName) return;
    const generateTierID = crypto.randomUUID();


    const selectedModels: ModelOption[] = [
      TEXT_MODELS.find(m => m.model === selectedTextModel),
      IMAGE_MODELS.find(m => m.model === selectedImageModel),
      VIDEO_MODELS.find(m => m.model === selectedVideoModel)
    ].filter((model) => model !== undefined);

    const newTier: Tier = {
      id: generateTierID,
      name: newTierName,
      models: selectedModels
    };

    onAddTier(newTier);
    setNewTierName('');
    setSelectedTextModel("");
    setSelectedImageModel("");
    setSelectedVideoModel("");
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