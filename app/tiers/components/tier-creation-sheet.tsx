'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tier } from "@/lib/tier.types";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

type TierCreationSheetProps = {
  onAddTier: (name: string, inheritModels?: boolean) => void;
  tiers?: Tier[];
};

export function TierCreationSheet({ onAddTier, tiers }: TierCreationSheetProps) {
  const [newTierName, setNewTierName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [inheritModels, setInheritModels] = useState(true);


  // Check if there are existing tiers to inherit from
  const hasPreviousTier = tiers && tiers.length > 0;

  const handleAddTier = () => {
    if (!newTierName) return;
    onAddTier(newTierName, inheritModels);
    setNewTierName('');
    setInheritModels(false);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="border-brand text-white bg-brand hover:bg-brand/90">
          {tiers && tiers?.length <= 0 ? "Create Your First Tier" : "New Tier"}
          <PlusIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-brand">Create New Tier</SheetTitle>
          <SheetDescription>
            Create a new pricing tier to organize your AI model offerings. You can customize which models are available in each tier and optionally inherit models from previous tiers to build a hierarchical structure.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="tierName" className="text-sm text-brand">
              Tier Name
            </Label>
            <Input
              id="tierName"
              type="text"
              value={newTierName}
              onChange={(e) => setNewTierName(e.target.value)}
              placeholder="e.g. Premium/Pro/Enterprise"
              className="focus:ring-2 focus:ring-brand border-brand"
            />
          </div>

          {hasPreviousTier && (
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="inheritModels"
                checked={inheritModels}
                onCheckedChange={() => setInheritModels(!inheritModels)}
                className="data-[state=checked]:bg-brand data-[state=checked]:border-brand"
              />
              <Label htmlFor="inheritModels" className="text-sm font-medium cursor-pointer">
                Use Models from Previous Tier
              </Label>
            </div>
          )}
        </div>
        <SheetFooter>
          <Button
            type="submit"
            size="lg"
            onClick={handleAddTier}
            disabled={!newTierName}
            className="border-brand text-white bg-brand hover:bg-brand/90 w-full"
          >
            Create Tier
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}